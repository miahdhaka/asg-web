"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import gsap from "gsap";

/**
 * Generic scroll-stepper state machine extracted from Hero.tsx.
 *
 * Owns the imperative animation state (goal, scrub, step, staged, sweep)
 * and the chase-tween logic that drives `scrub.pos` toward `goal`.  Knows
 * nothing about DOM sections, GSAP timelines, or visual transitions —
 * those are delegated to the caller through callbacks.
 *
 * Dependency flow (one-directional, no cycles):
 *
 *   useGestureInput → Hero onGesture → stepper.advance()
 *                                      → stepper sweep/render
 *                                      → Hero callbacks (tl.progress, land, etc.)
 */

interface UseScrollStepperOptions {
  /** Total number of transitions (= deepest resting state index). */
  transitionCount: number;
  /** Returns the designed duration (seconds) of transition `i`. */
  getTransitionDuration: (i: number) => number;

  // ── Transition callbacks ──
  // Called from render() which fires on every GSAP onUpdate tick.
  // They must be fast and side-effect-free beyond the timeline/DOM update.

  /** Set `tl.progress(p)` for the transition being scrubbed. */
  onProgress: MutableRefObject<(index: number, progress: number) => void>;
  /** Stage transition `i` — called when scrub.pos crosses into a new range. */
  onStage: MutableRefObject<(index: number, fromAbove: boolean) => void>;
  /** Forward landing at transition `i` (scrub.pos reached i+1). */
  onLand: MutableRefObject<(index: number) => void>;
  /** Backward landing at transition `i` (scrub.pos fell back to i). */
  onLandBack: MutableRefObject<(index: number) => void>;
}

export interface ScrollStepperHandle {
  /** Current resting state (0 … transitionCount). Read-only from outside. */
  stepRef: { current: number };
  /** True while the GSAP chase tween is in flight. */
  sweeping: MutableRefObject<() => boolean>;
  /** Advance the goal by `dir` (+1 or −1) and start a new chase. */
  advanceRef: MutableRefObject<(dir: number) => void>;
}

export function useScrollStepper({
  transitionCount,
  getTransitionDuration,
  onProgress,
  onStage,
  onLand,
  onLandBack,
}: UseScrollStepperOptions): ScrollStepperHandle {
  const stepRef = useRef(0);
  const advanceRef = useRef<(dir: number) => void>(() => {});
  const sweepingRef = useRef<() => boolean>(() => false);

  // The callback props are already MutableRefObjects — use them directly.
  // Hero populates their .current inside its own useGSAP, which runs before
  // this useEffect, so the latest closures are always visible at event time.

  useEffect(() => {
    const LAST = transitionCount;

    // ── Pacing constants ──
    // A single deliberate gesture scrubs its phase at (roughly) the designed
    // timeline length — long enough to read as a smooth glide, short enough
    // to never feel sluggish.  TEMPO adds a hair of extra ease.
    const TEMPO = 2.2; // slower, more deliberate glide
    const LAG_EXP = -0.03; // negative → further behind = shorter chase
    const RATE_MAX = 0.85; // resting states per second — ceiling on a wild fling

    // ── Core stepper state ──
    const scrub = { pos: 0 }; // where the screen is (animated)
    let goal = 0; // where the gestures have asked it to be
    let staged: number | null = null; // transition currently mid-scrub
    let sweep: gsap.core.Tween | null = null;

    const sweeping = () => sweep !== null;
    sweepingRef.current = sweeping;

    /* Paint the current position. Crossing a whole number commits that
       transition's end state and stages the next one, so a single chase
       runs clean through as many phases as it needs to. */
    const render = () => {
      // Bounded: one pass per boundary crossed, never an open loop.
      // M5: each iteration processes exactly one boundary — `staged` is
      // set then consumed, `step` changes at most once per boundary.
      // The guard bound (LAST*2) prevents runaway if state is corrupt.
      for (let guard = 0; guard <= LAST * 2; guard++) {
        if (staged !== null) {
          const i = staged;
          if (scrub.pos >= i + 1) {
            onProgress.current(i, 1);
            staged = null;
            stepRef.current = i + 1;
            onLand.current(i);
            continue;
          }
          if (scrub.pos <= i) {
            onProgress.current(i, 0);
            staged = null;
            stepRef.current = i;
            onLandBack.current(i);
            continue;
          }
          onProgress.current(i, scrub.pos - i);
          return;
        }
        if (scrub.pos > stepRef.current && stepRef.current < LAST) {
          onStage.current(stepRef.current, false);
          staged = stepRef.current;
          continue;
        }
        if (scrub.pos < stepRef.current && stepRef.current > 0) {
          onStage.current(stepRef.current - 1, true);
          staged = stepRef.current - 1;
          continue;
        }
        return;
      }
    };

    const retarget = () => {
      sweep?.kill();
      sweep = null;
      const dist = Math.abs(goal - scrub.pos);
      if (dist < 0.0005) {
        scrub.pos = goal;
        render();
        return;
      }
      /* The phase about to be scrubbed sets the reference pace, so each one
         keeps its own designed length at a distance of exactly one */
      const lead = Math.min(
        LAST - 1,
        Math.max(
          0,
          goal > scrub.pos ? Math.floor(scrub.pos) : Math.ceil(scrub.pos) - 1
        )
      );
      const base = getTransitionDuration(lead) || 1;
      /* Up to one unit the chase is simply proportional, so a single
         deliberate gesture runs on that phase's own designed length,
         stretched by TEMPO for a smooth, unhurried feel.  Past one unit
         the hand is ahead of the screen, and the chase gets shorter the
         further behind it is.  The rate ceiling (dist / RATE_MAX) is NOT
         stretched by TEMPO — it caps how slow a multi-step sweep can get,
         so a burst of scrolls sweeps through them at a readable pace
         instead of leaving the user watching sections crawl by. */
      const duration =
        dist <= 1
          ? TEMPO * base * dist
          : Math.max(
              TEMPO * base * Math.pow(dist, LAG_EXP),
              dist / RATE_MAX
            );
      sweep = gsap.to(scrub, {
        pos: goal,
        duration,
        /* Lenis-style glide: the chase answers the gesture at speed and
           then decays softly into the landing, instead of moving at one
           flat mechanical rate — that soft settle is what reads as a
           smooth, controlled scroll */
        ease: "power3.out",
        onUpdate: render,
        onComplete: () => {
          scrub.pos = goal;
          render();
          sweep = null;
        },
      });
    };

    /* One gesture = one resting state further along. Turning around mid
       chase abandons the rest of the old goal and heads back from where the
       screen actually is, so a reversal answers at once instead of waiting
       out whatever was still in flight. */
    const advance = (dir: number) => {
      const reversing = (goal - scrub.pos) * dir < 0;
      const from = reversing
        ? dir > 0
          ? Math.floor(scrub.pos)
          : Math.ceil(scrub.pos)
        : goal;
      goal = Math.min(LAST, Math.max(0, from + dir));
      retarget();
    };

    advanceRef.current = advance;

    // Always start from the top
    goal = 0;
    scrub.pos = 0;

    return () => {
      sweep?.kill();
      sweep = null;
    };
  }, [transitionCount]);

  return { stepRef, sweeping: sweepingRef, advanceRef };
}
