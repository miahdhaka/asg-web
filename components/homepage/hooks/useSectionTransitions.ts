"use client";

import { useRef, type MutableRefObject } from "react";
import gsap from "gsap";

/**
 * Section-transition orchestration extracted from Hero.tsx.
 *
 * Builds the transitions array that maps each stepper index to a GSAP
 * timeline + enter/land/landBack callbacks.  Knows the *order* and
 * *coordination* of transitions but nothing about DOM queries, timeline
 * creation, or scroll state — those stay in Hero.tsx and are passed in
 * as small focused callbacks.
 *
 * Dependency flow (one-directional):
 *
 *   Hero GSAP timelines + DOM helpers
 *              ↓
 *   useSectionTransitions  →  transitions array
 *              ↓
 *   useScrollStepper callbacks (onProgress / onStage / onLand / onLandBack)
 */

// ── Minimal fade-chain link shape the hook needs ──
// Hero defines the fuller FadeLink type; this is structurally compatible.
interface FadeLinkInput {
  tl: gsap.core.Timeline;
  from: HTMLElement | null;
  to: HTMLElement | null;
  pinZ?: number;
  onPrep?: () => void;
  onSettle?: () => void;
  onUnsettle?: () => void;
}

interface TransitionHelpers {
  syncHeader: (active: boolean) => void;
  fixIntro: () => void;
  releaseIntro: () => void;
  fixOurBusiness: () => void;
  releaseOurBusiness: () => void;
  /** Controlled scroll that marks a landing in progress (C3 + C4). */
  controlledScrollTo: (top: number) => void;
  /** Scroll position where a settled section sits below the navbar. */
  topY: (el: HTMLElement) => number;
  /** Pin an element under the current overlay. */
  pinUnder: (el: HTMLElement, z?: number) => void;
  /** Release a pinned element back to normal flow. */
  releasePin: (el: HTMLElement) => void;
  /** Scroll position where OurBusiness sits below the navbar. */
  ourBusinessTopY: () => number;
  /** Restore intro element visibility for future replays. */
  restoreIntroVisibility: () => void;
  /** Restore slot logo visibility on mobile after timeline reverse. */
  restoreSlotLogo?: () => void;
}

export interface UseSectionTransitionsOptions {
  tl: gsap.core.Timeline;
  tl2: gsap.core.Timeline;
  tl3: gsap.core.Timeline;
  tl4: gsap.core.Timeline;
  tl5: gsap.core.Timeline;
  fadeChain: FadeLinkInput[];
  helpers: TransitionHelpers;
}

export interface SectionTransitionsHandle {
  /** Read the designed duration (seconds) of transition `i`. */
  getTransitionDuration: (i: number) => number;
  /**
   * Connect the transitions array to the stepper's callback refs.
   * Must be called inside useGSAP after timelines + helpers exist.
   */
  wireStepper: (args: {
    onProgress: MutableRefObject<(i: number, p: number) => void>;
    onStage: MutableRefObject<(i: number, fromAbove: boolean) => void>;
    onLand: MutableRefObject<(i: number) => void>;
    onLandBack: MutableRefObject<(i: number) => void>;
  }) => {
    /** Wrap onLandBack to also call `fn` when transition 3 lands back. */
    correctLogoOnLandBack: (fn: () => void) => void;
  };
  /** Call landBack() on every transition up to `step` (cleanup on unmount). */
  landBackAll: (step: number) => void;
  /** Kill any orphan GSAP tweens (e.g. smooth-scroll) before unmount. */
  cleanup: () => void;
}

export function useSectionTransitions(
  options: UseSectionTransitionsOptions
): SectionTransitionsHandle {
  const durationsRef = useRef<number[]>([]);

  // Stable accessor the stepper hook can call at any time.
  // Before wireStepper() runs the array is empty so it always returns 1.
  const getTransitionDuration = (i: number) =>
    durationsRef.current[i] || 1;

  // ── Internal transitions array (rebuilt on each wireStepper call) ──
  let _transitions: { tl: gsap.core.Timeline; enter: (fromAbove: boolean) => void; land: () => void; landBack: () => void }[] = [];

  // Smooth-scroll tween for boundary handoff (killed on new gesture)
  let _scrollTween: gsap.core.Tween | null = null;

  // ── wireStepper ──
  // Builds the transitions array from the supplied timelines + helpers,
  // extracts durations, and connects the stepper callback refs.
  const wireStepperRef = useRef<
    SectionTransitionsHandle["wireStepper"] | null
  >(null);

  wireStepperRef.current = ({
    onProgress,
    onStage,
    onLand,
    onLandBack,
  }) => {
    // Read helpers at call time — the getter returns null during the
    // initial hook call; it is only populated later inside useGSAP.
    const {
      syncHeader,
      fixIntro,
      releaseIntro,
      fixOurBusiness,
      releaseOurBusiness,
      controlledScrollTo,
      topY,
      pinUnder,
      releasePin,
      ourBusinessTopY,
      restoreIntroVisibility,
      restoreSlotLogo,
    } = options.helpers;

    // Snap timelines at call time (they exist by now — wireStepper
    // is invoked inside useGSAP after the timelines are created).
    const { tl, tl2, tl3, tl4, tl5, fadeChain } = options;

    const noop = () => {};

    type Transition = {
      tl: gsap.core.Timeline;
      enter: (fromAbove: boolean) => void;
      land: () => void;
      landBack: () => void;
    };

    /* Entry i carries resting state i over into resting state i+1 */
    const transitions: typeof _transitions = [
      {
        tl,
        enter: () => syncHeader(true),
        land: noop,
        landBack: () => {
          syncHeader(false);
          // Mobile: restore the slot logo when the timeline fully reverses
          // back to step 0.  At this point the flying logo has returned to
          // the slot position and faded out, so the slot logo takes over.
          restoreSlotLogo?.();
        },
      },
      { tl: tl2, enter: noop, land: noop, landBack: noop },
      { tl: tl3, enter: noop, land: noop, landBack: noop },
      {
        tl: tl4,
        enter: (fromAbove) => {
          fixIntro();
          /* Re-measure the logo flight for the current viewport — forward
             only. Invalidating from the finished side would make the `.to()`
             tweens record start === end and the flight would die. */
          if (!fromAbove) tl4.invalidate();
        },
        land: noop, // the intro stays pinned — that IS the step-4 rest state
        landBack: releaseIntro,
      },
      {
        tl: tl5,
        enter: (fromAbove) => {
          fixIntro();
          fixOurBusiness();
          if (fromAbove) {
            // Coming back up: the page drops silently to the top behind the
            // two pinned overlays, so the visible frame never jumps
            controlledScrollTo(0);
            syncHeader(true);
          } else {
            tl5.invalidate();
          }
        },
        land: () => {
          // Swap the pinned overlays for the real in-flow section — same
          // visual frame — then native scrolling takes over from there
          releaseIntro();
          restoreIntroVisibility();
          releaseOurBusiness();
          controlledScrollTo(ourBusinessTopY());
          /* This is the only landing that returns TWO full-screen overlays to
             the flow at once, i.e. inserts two screens of content above the
             viewport. The browser can finish that layout a frame later and
             leave the page off the anchor — the section then shows a strip of
             the previous one under the navbar. Re-apply the anchor on the
             next frame: same frame the user first sees, so no visible jump. */
          requestAnimationFrame(() => controlledScrollTo(ourBusinessTopY()));
        },
        landBack: releaseOurBusiness,
      },
      ...fadeChain.map<Transition>((link) => ({
        tl: link.tl,
        enter: (fromAbove) => {
          if (!link.from || !link.to) return;
          gsap.set(link.from, { zIndex: 40 }); // top layer during the fade
          if (fromAbove) {
            // Boundary handoff: smoothly glide the document to the previous
            // section's anchor instead of an instant jump.  The transition
            // animation plays alongside the scroll, so the user perceives
            // one continuous motion rather than a snap.
            const target = topY(link.from);
            _scrollTween?.kill();
            _scrollTween = gsap.to(
              { y: window.scrollY },
              {
                y: target,
                duration: 0.35,
                ease: "power2.out",
                onUpdate: function () {
                  window.scrollTo(0, this.targets()[0].y);
                },
                onComplete: () => {
                  _scrollTween = null;
                  controlledScrollTo(target); // ensure exact position
                },
              }
            );
          }
          pinUnder(link.to, link.pinZ);
          link.onPrep?.(); // stage the extra tweens *before* re-measuring
          link.tl.invalidate();
        },
        land: () => {
          if (!link.to) return;
          releasePin(link.to);
          if (link.from) {
            // Restore the faded section (off-screen above) for future replays
            gsap.set(link.from, { autoAlpha: 1, clearProps: "zIndex" });
          }
          controlledScrollTo(topY(link.to));
          link.onSettle?.();
        },
        landBack: () => {
          if (link.to) releasePin(link.to);
          if (link.from) {
            gsap.set(link.from, { clearProps: "zIndex,opacity,visibility" });
          }
          link.onUnsettle?.();
        },
      })),
    ];

    // Store for landBackAll (cleanup)
    _transitions = transitions;

    // Populate durations so the stepper hook can read real timeline durations
    durationsRef.current = transitions.map((t) => t.tl.duration() || 1);

    // Wire stepper callbacks
    onProgress.current = (i, p) => transitions[i].tl.progress(p);
    onStage.current = (i, fromAbove) => {
      // A new transition starting — kill any in-flight smooth scroll so
      // the old glide doesn't fight the new transition's positioning.
      _scrollTween?.kill();
      _scrollTween = null;
      transitions[i].enter(fromAbove);
    };
    onLand.current = (i) => transitions[i].land();
    onLandBack.current = (i) => transitions[i].landBack();

    // Return a helper so the caller can append logo-correction to onLandBack
    const correctLogoOnLandBack = (fn: () => void) => {
      const prev = onLandBack.current;
      onLandBack.current = (i) => {
        prev(i);
        if (i === 3) fn();
      };
    };

    return { correctLogoOnLandBack };
  };

  const landBackAll = (step: number) => {
    _transitions.forEach((t, i) => {
      if (i <= step) t.landBack();
    });
  };

  // Kill the smooth-scroll tween so it cannot survive homepage unmount.
  // Idempotent — safe to call when no tween is active.
  const cleanup = () => {
    _scrollTween?.kill();
    _scrollTween = null;
  };

  return { getTransitionDuration, wireStepper: wireStepperRef.current, landBackAll, cleanup };
}
