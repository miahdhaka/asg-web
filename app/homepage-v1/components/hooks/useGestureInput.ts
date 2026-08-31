"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * Extracted from Hero.tsx — owns every raw input event the custom scroll
 * stepper needs (wheel, touch, keyboard) and normalises them into a single
 * `onGesture(dir, fire)` callback.
 *
 * The hook knows nothing about GSAP timelines, scrub position, step, or
 * section pinning.  All animation-state queries are delegated to the caller
 * through mutable ref objects whose `.current` is set inside the caller's
 * useGSAP callback — the hook reads them at event time, so the listeners
 * never need re-subscribing.
 *
 * Scroll-stability refs (`isLandingRef`, `anchorCorrectedRef`) are created
 * here because the hook resets them on every deliberate gesture; the caller
 * receives them and uses them for anchor-floor logic in its own handlers.
 */

interface UseGestureInputOptions {
  /** Called once per detected gesture.
   *  `dir`  — +1 (down / forward) or −1 (up / back).
   *  `fire` — true when the input has crossed the gesture threshold
   *           (wheel notch, trackpad swipe, touch swipe) and the caller
   *           should advance the scroll stepper.
   *  Returns true when the caller handled the gesture and the originating
   *  DOM event must be `preventDefault()`-ed. */
  onGesture: MutableRefObject<(dir: number, fire: boolean) => boolean>;
  /** Returns true while a GSAP chase tween is in flight — the hook uses
   *  this to swallow events that would otherwise cause drift. */
  sweeping: MutableRefObject<() => boolean>;
}

export function useGestureInput({
  onGesture,
  sweeping,
}: UseGestureInputOptions) {
  /* ── Scroll-stability refs (shared with the caller) ──
     isLanding: a controlled scrollTo is in flight — the onScroll handler
     must not run anchor correction while this is true.
     anchorCorrected: after a landing settles, one correction has already
     been applied — suppress further corrections during the same momentum
     burst.  Both are reset on every deliberate gesture below. */
  const isLandingRef = useRef(false);
  const anchorCorrectedRef = useRef(false);

  /* The caller passes mutable ref objects so the real callbacks can be
     wired inside a useGSAP block (which runs after this hook's useEffect).
     The refs are read at event time — no re-subscription needed. */

  useEffect(() => {
    /* ── Cross-device wheel gesture detection ──
       Mouse wheels fire one big delta per notch; trackpads stream dozens of
       tiny deltas plus a decaying inertia tail.  Two rules cover both:
         • a big delta (≥ NOTCH_DELTA) is always a deliberate notch → fires
           immediately, every time
         • small deltas accumulate; once they cross INTENT_DISTANCE the
           gesture fires and a short swallow window (SWALLOW_MS) eats the
           rest of the stream so one flick = exactly one step
       Deltas are normalized across deltaMode first. */
    const NOTCH_DELTA = 40; // |delta| at/above this is a discrete notch
    const INTENT_DISTANCE = 50; // accumulated px that count as a swipe
    const SWALLOW_MS = 400; // ms to ignore the active stream after a gesture
    const COOLDOWN_MS = 700; // ms total guard — drops residual momentum after swallow
    let wheelAccum = 0;
    let lastGestureTime = 0;

    // deltaMode: 0 = pixels, 1 = lines (Firefox), 2 = pages
    const normalizeWheel = (e: WheelEvent) =>
      e.deltaMode === 1
        ? e.deltaY * 16
        : e.deltaMode === 2
          ? e.deltaY * window.innerHeight
          : e.deltaY;

    /* Feed one wheel event into the tracker; returns true when it
       completes a deliberate gesture (the caller then plays exactly one
       phase while the rest of the stream is ignored).

       Two-tier post-gesture guard keeps Mac trackpad momentum from
       re-triggering:
         1. SWALLOW (≤ 400 ms) — drops every event, drains the active
            stream so the accumulator stays at zero.
         2. COOLDOWN (400–700 ms) — drops small trackpad residuals but
            still lets a large mouse-wheel notch break through so a
            deliberate second scroll is never delayed. */
    const wheelIntent = (e: WheelEvent) => {
      const now = performance.now();
      const delta = normalizeWheel(e);
      const abs = Math.abs(delta);
      if (!abs) return false;

      const since = now - lastGestureTime;

      // A direction flip always restarts the accumulation — even
      // inside the swallow / cooldown windows, so a reversal answers
      // the very next event
      if ((delta > 0 && wheelAccum < 0) || (delta < 0 && wheelAccum > 0)) {
        wheelAccum = 0;
      }

      // Tier 1 — swallow: drop everything, keep the accumulator at zero
      // so the active trackpad stream cannot re-arm the gesture
      if (since < SWALLOW_MS) {
        wheelAccum = 0;
        return false;
      }

      // Tier 2 — cooldown: drop small trackpad residuals (momentum
      // tail) but let a large mouse-wheel notch break through so a
      // deliberate second scroll fires without lag
      if (since < COOLDOWN_MS && abs < NOTCH_DELTA) {
        wheelAccum = 0;
        return false;
      }

      // Mouse notch — big delta = deliberate gesture, fires immediately
      if (abs >= NOTCH_DELTA) {
        wheelAccum = 0;
        lastGestureTime = now;
        return true;
      }

      // Trackpad accumulation — small deltas add up to one gesture
      wheelAccum += delta;
      if (Math.abs(wheelAccum) >= INTENT_DISTANCE) {
        wheelAccum = 0;
        lastGestureTime = now;
        return true;
      }

      return false;
    };

    const onWheel = (e: WheelEvent) => {
      // Trackpad pinch-zoom arrives as ctrl+wheel — never a scroll gesture
      if (e.ctrlKey) return;

      const dir = Math.sign(normalizeWheel(e));
      if (!dir) return;

      // Always fed, so the stream tracker stays in sync even over stretches
      // the router leaves to native scrolling
      const isGesture = wheelIntent(e);

      /* A chase is in flight — the page still must not drift, but the
         gesture is real, so push the goal further out instead of dropping
         it. That is what lets a fast burst sweep several phases at once. */
      if (sweeping.current()) {
        e.preventDefault();
        if (isGesture) {
          anchorCorrectedRef.current = false;
          isLandingRef.current = false;
          onGesture.current(dir, true);
        }
        return;
      }

      if (onGesture.current(dir, isGesture)) {
        e.preventDefault();
        if (isGesture) {
          anchorCorrectedRef.current = false;
          isLandingRef.current = false;
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      // Keys are already discrete — every press is a deliberate gesture,
      // and held auto-repeat simply drives the goal further, like a fast
      // scroll
      const dir = ["ArrowDown", "PageDown", " "].includes(e.key)
        ? 1
        : ["ArrowUp", "PageUp"].includes(e.key)
          ? -1
          : 0;
      if (!dir) return;

      // A chase is in flight — swallow the scroll but keep the intent
      if (sweeping.current()) {
        e.preventDefault();
        anchorCorrectedRef.current = false;
        isLandingRef.current = false;
        onGesture.current(dir, true);
        return;
      }

      if (onGesture.current(dir, true)) {
        e.preventDefault();
        anchorCorrectedRef.current = false;
        isLandingRef.current = false;
      }
    };

    /* ── Touch (tablets, touchscreen laptops, mobile) ──
       Wheel events never fire for touch scrolling, so swipes are tracked
       directly: one swipe = one gesture. The first move that crosses the
       threshold fires the step; the rest of the swipe is swallowed.
       Native touch scrolling stays untouched wherever the wheel handler
       wouldn't block either. */
    const TOUCH_DISTANCE = 28; // swipe px that count as a gesture — low enough
    // to answer as promptly as a desktop wheel notch, high enough to never
    // misfire on taps or tiny adjustment drags
    let touchStartY = 0;
    let touchHandled = false;
    const touchPrevDir = { current: 0 as number };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchHandled = false;
      touchPrevDir.current = 0;
      anchorCorrectedRef.current = false;
      isLandingRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return; // pinch-zoom — not a scroll
      // Finger up = page down (matches wheel deltaY sign)
      const dy = touchStartY - e.touches[0].clientY;
      const dir = Math.sign(dy);

      // M1: direction reversal — if the finger flips direction past the
      // threshold, un-latch the handled flag so the new direction can fire
      if (
        touchHandled &&
        dir !== 0 &&
        dir !== touchPrevDir.current &&
        Math.abs(dy) >= TOUCH_DISTANCE
      ) {
        touchHandled = false;
        touchStartY = e.touches[0].clientY;
      }

      const fire = !touchHandled && Math.abs(dy) >= TOUCH_DISTANCE;

      if (sweeping.current()) {
        if (e.cancelable) e.preventDefault();
        if (fire) {
          onGesture.current(dir, true);
          touchHandled = true;
          touchPrevDir.current = dir;
        }
        return;
      }

      if (onGesture.current(dir, fire)) {
        if (e.cancelable) e.preventDefault();
        if (fire) {
          touchHandled = true;
          touchPrevDir.current = dir;
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return { isLandingRef, anchorCorrectedRef };
}
