"use client";

import { useRef, type MutableRefObject } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useGestureInput } from "./hooks/useGestureInput";
import { useScrollStepper } from "./hooks/useScrollStepper";
import { useSectionTransitions } from "./hooks/useSectionTransitions";

gsap.registerPlugin(useGSAP);

interface HeroProps {
  /** Shared refs connecting WeAreASG's count-up to the stepper */
  waaTriggerRef?: MutableRefObject<(() => void) | null>;
  waaResetRef?: MutableRefObject<(() => void) | null>;
}

export default function Hero({ waaTriggerRef, waaResetRef }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoSlotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const familyRef = useRef<HTMLHeadingElement>(null);
  const legacyRef = useRef<HTMLHeadingElement>(null);
  const moreRef = useRef<HTMLHeadingElement>(null);
  const introFlyRef = useRef<HTMLDivElement>(null);
  const flyDarkRef = useRef<HTMLImageElement>(null);
  const flyMixedRef = useRef<HTMLImageElement>(null);
  const waaWhiteRef = useRef<HTMLDivElement>(null);

  // ── Section-transition orchestration (extracted) ──
  const transitionHelpersRef = useRef<{
    syncHeader: (active: boolean) => void;
    fixIntro: () => void;
    releaseIntro: () => void;
    fixOurBusiness: () => void;
    releaseOurBusiness: () => void;
    controlledScrollTo: (top: number) => void;
    topY: (el: HTMLElement) => number;
    pinUnder: (el: HTMLElement, z?: number) => void;
    releasePin: (el: HTMLElement) => void;
    ourBusinessTopY: () => number;
    restoreIntroVisibility: () => void;
  }>(null!);
  const fadeChainRef = useRef<{ tl: gsap.core.Timeline; from: HTMLElement | null; to: HTMLElement | null; pinZ?: number; onPrep?: () => void; onSettle?: () => void; onUnsettle?: () => void }[]>([]);
  const timelinesRef = useRef({ tl: null as unknown as gsap.core.Timeline, tl2: null as unknown as gsap.core.Timeline, tl3: null as unknown as gsap.core.Timeline, tl4: null as unknown as gsap.core.Timeline, tl5: null as unknown as gsap.core.Timeline });
  const transitionsHandle = useSectionTransitions({
    get tl() { return timelinesRef.current.tl; },
    get tl2() { return timelinesRef.current.tl2; },
    get tl3() { return timelinesRef.current.tl3; },
    get tl4() { return timelinesRef.current.tl4; },
    get tl5() { return timelinesRef.current.tl5; },
    get fadeChain() { return fadeChainRef.current; },
    get helpers() { return transitionHelpersRef.current; },
  });

  // ── Scroll-stepper state machine (extracted) ──
  const TRANSITION_COUNT = 10;
  const onProgressRef = useRef<(i: number, p: number) => void>(() => {});
  const onStageRef = useRef<(i: number, fromAbove: boolean) => void>(() => {});
  const onLandRef = useRef<(i: number) => void>(() => {});
  const onLandBackRef = useRef<(i: number) => void>(() => {});
  const stepper = useScrollStepper({
    transitionCount: TRANSITION_COUNT,
    getTransitionDuration: transitionsHandle.getTransitionDuration,
    onProgress: onProgressRef,
    onStage: onStageRef,
    onLand: onLandRef,
    onLandBack: onLandBackRef,
  });

  // Extracted gesture input — owns wheel / touch / keyboard event handling.
  const onGestureRef = useRef<(dir: number, fire: boolean) => boolean>(() => false);
  const { isLandingRef, anchorCorrectedRef } = useGestureInput({
    onGesture: onGestureRef,
    sweeping: stepper.sweeping,
  });

  useGSAP(
    () => {
      // Skip scroll phases on mobile — let the page scroll naturally
      if (window.innerWidth < 1024) return;

      /* ── Scroll-stability state (C3 + C4) ── */
      const SCROLL_TOP_THRESHOLD = 4;
      const FADE_CHAIN_TOLERANCE = 6;
      const ANCHOR_DRIFT_LIMIT = 20;

      const controlledScrollTo = (top: number) => {
        isLandingRef.current = true;
        window.scrollTo({ top, behavior: "auto" });
      };

      const headerLogo = document.getElementById("header-logo");

      /* Current root font size — the whole layout is scaled through it (see
         the fluid scale in globals.css), so the hard gaps below are read as
         multiples of it instead of raw pixels and stay proportional on
         laptops and big screens alike. */
      const rootPx = () =>
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

      /* The flying logo lives outside the section (fixed, above the navbar).
         Pin it onto its invisible slot in the hero's centered content. */
      const placeLogo = () => {
        if (!logoRef.current || !logoSlotRef.current) return;
        const slot = logoSlotRef.current.getBoundingClientRect();
        gsap.set(logoRef.current, {
          left: slot.left,
          top: slot.top,
          autoAlpha: 1,
        });
      };
      placeLogo();

      /* Delta from the hero logo's centre to the navbar logo's centre,
         computed lazily so it always matches the current viewport */
      const flyX = () => {
        if (!headerLogo || !logoRef.current) return 0;
        const n = headerLogo.getBoundingClientRect();
        const l = logoRef.current.getBoundingClientRect();
        return n.left + n.width / 2 - (l.left + l.width / 2);
      };
      const flyY = () => {
        if (!headerLogo || !logoRef.current) return 0;
        const n = headerLogo.getBoundingClientRect();
        const l = logoRef.current.getBoundingClientRect();
        return n.top + n.height / 2 - (l.top + l.height / 2);
      };
      const flyScale = () => {
        if (!headerLogo || !logoRef.current) return 1;
        return (
          headerLogo.getBoundingClientRect().height /
          logoRef.current.getBoundingClientRect().height
        );
      };

      /* ── Phase 1 (1st scroll): video shrinks, logo flies to the navbar ── */
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut" },
      });

      /* Anchor the video wrapper to the viewport centre from the start —
         full-bleed at 100%×100%, then only width/height shrink, so it
         collapses evenly from all four sides with zero drift */
      gsap.set(videoWrapRef.current, {
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "100%",
        height: "100%",
      });

      // Headline, tagline & scroll hint fade away first
      tl.to(
        [textRef.current, hintRef.current],
        { opacity: 0, y: -40, duration: 0.5, ease: "power2.out" },
        0
      );

      // Dark overlay clears while the video shrinks into its card
      tl.to(overlayRef.current, { opacity: 0, duration: 0.75 }, 0.05);
      tl.to(
        videoWrapRef.current,
        {
          width: "33.4vw",
          height: "18.79vw",
          duration: 1,
        },
        0.05
      );

      // Hero logo flies up over the navbar and stops at the navbar logo's size…
      tl.to(
        logoRef.current,
        {
          x: flyX,
          y: flyY,
          scale: flyScale,
          transformOrigin: "center center",
          duration: 0.95,
        },
        0.05
      );
      // …pauses there, fades out…
      tl.to(logoRef.current, { opacity: 0, duration: 0.35, ease: "power1.out" }, 1.1);
      // …and the navbar logo takes over
      if (headerLogo) {
        tl.to(headerLogo, { opacity: 1, duration: 0.4, ease: "power1.inOut" }, 1.25);
      }

      // "Family Business" settles in above the shrunken video
      tl.fromTo(
        familyRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.8
      );

      /* Centre-anchor the heading via GSAP so phase 2 can re-align it
         to the video's left edge without transform conflicts */
      gsap.set(familyRef.current, { left: "50%", xPercent: -50 });

      /* ── Phase 2 (2nd scroll): heading rises & left-aligns with the video,
         the video dips down, and "Legacy For" slides into the gap between
         them, right-aligned to the video ── */
      const tl2 = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut" },
      });

      /* Spacing solver — measures the REAL phase-1 resting rects (so any
         class-level top/line-height tweaks are respected) and moves the
         heading up / video down only as much as needed so "Legacy For" sits
         tightly under "Family Business" with a small gap to the video.
         Evaluated lazily on the 2nd gesture, when both are at rest. */
      const GAP_TEXT = () => rootPx() * 0.25; // 4px @1920 — between the two headings
      const GAP_VIDEO = () => rootPx() * 2.5; // 40px @1920 — heading ↔ video card
      const metrics = () => {
        const fbBottom =
          familyRef.current?.getBoundingClientRect().bottom ?? 0;
        const videoTop =
          videoWrapRef.current?.getBoundingClientRect().top ?? 0;
        const lfH = legacyRef.current?.offsetHeight ?? 80;
        const extra = Math.max(
          0,
          lfH + GAP_TEXT() + GAP_VIDEO() - (videoTop - fbBottom)
        );
        const rise = extra * 0.45;
        const drop = extra * 0.55;
        const lfTop = fbBottom - rise + GAP_TEXT();
        return { rise, drop, lfTop };
      };

      // "Family Business" moves up and aligns to the video's left edge
      tl2.to(
        familyRef.current,
        {
          left: "33.3vw",
          xPercent: 0,
          y: () => -metrics().rise,
          duration: 1.1,
        },
        0
      );

      // The video card dips down to widen the gap
      tl2.to(
        videoWrapRef.current,
        { y: () => metrics().drop, duration: 1.1 },
        0
      );

      // "Legacy For" glides in from beyond the right edge, landing
      // centred in the space between the heading and the video
      tl2.set(legacyRef.current, { top: () => metrics().lfTop }, 0);
      tl2.fromTo(
        legacyRef.current,
        { x: "70vw", autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1.3, ease: "power3.out" },
        0.3
      );

      /* ── Phase 3 (3rd scroll): "More Then 130 Years" rises from the bottom,
         centred, landing under the video with the same gap ── */
      const tl3 = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut" },
      });

      // Centre anchor, mirroring the technique used for "Family Business"
      gsap.set(moreRef.current, { left: "50%", xPercent: -50 });

      // Land just under the video — measured lazily on the 3rd gesture,
      // after the video's phase-2 dip has settled
      tl3.set(
        moreRef.current,
        {
          top: () =>
            (videoWrapRef.current?.getBoundingClientRect().bottom ?? 0) +
            GAP_VIDEO(),
        },
        0
      );
      tl3.fromTo(
        moreRef.current,
        { y: 90, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" },
        0.5
      );

      /* ── Phase 4 (4th scroll): the IntroSection scales up over the hero
         from a smaller size, then the page settles on it seamlessly ── */
      const intro = document.getElementById("intro-section");

      const headerH = () =>
        document.querySelector("header")?.getBoundingClientRect().height ?? 0;

      /* Pin the intro over the hero in exactly the geometry it will have
         in normal flow below the navbar — its inline height/padding stay
         untouched, so the later fixed→flow swap is pixel-perfect */
      const fixIntro = () => {
        if (!intro) return;
        gsap.set(intro, {
          position: "fixed",
          top: headerH(),
          left: 0,
          width: "100%",
          zIndex: 40,
        });
      };
      // Drop it back into normal document flow
      const releaseIntro = () => {
        if (!intro) return;
        gsap.set(intro, {
          clearProps: "position,top,left,width,zIndex,transform,filter,opacity,visibility",
        });
        intro.style.clipPath = "";
      };

      const tl4 = gsap.timeline({ paused: true });
      if (intro) {
        // Circle reveal: expands from the centre in all directions
        gsap.set(intro, { clipPath: "circle(0% at 50% 50%)" });
        const circleReveal = { r: 0 };
        tl4.to(
          circleReveal,
          {
            r: 80,
            duration: 1.3,
            ease: "power2.inOut",
            onUpdate() {
              intro.style.clipPath = `circle(${circleReveal.r}% at 50% 50%)`;
            },
          },
        );
      }

      /* Logo handoff to the intro — mirror of the phase-1 hero→navbar flight:
         while the intro scales up, the navbar logo detaches, flies down and
         lands exactly on the intro's logo (same spot, same size), cross-
         fading from the dark navbar variant to the intro's mixed variant */
      const introLogo = document.getElementById("intro-logo");
      if (intro && introLogo && headerLogo && introFlyRef.current) {
        const iRect = () => introLogo.getBoundingClientRect();
        const nRect = () => headerLogo.getBoundingClientRect();
        // Start deltas: from the navbar logo's centre, scaled to its height
        const dX = () => {
          const n = nRect(), i = iRect();
          return n.left + n.width / 2 - (i.left + i.width / 2);
        };
        const dY = () => {
          const n = nRect(), i = iRect();
          return n.top + n.height / 2 - (i.top + i.height / 2);
        };
        const dScale = () => nRect().height / Math.max(iRect().height, 1);

        // Park the flyer on the intro logo's final rect (measured pinned)
        tl4.set(
          introFlyRef.current,
          {
            left: () => iRect().left,
            top: () => iRect().top,
            width: () => iRect().width,
            height: () => iRect().height,
            x: dX,
            y: dY,
            scale: dScale,
            transformOrigin: "center center",
          },
          0
        );
        // The flyer takes over at the navbar; the real logos hide
        tl4.set(introFlyRef.current, { autoAlpha: 1 }, 0.02);
        tl4.set(flyDarkRef.current, { opacity: 1 }, 0.02);
        tl4.set(flyMixedRef.current, { opacity: 0 }, 0.02);
        tl4.set(headerLogo, { opacity: 0 }, 0.02);
        tl4.set(introLogo, { autoAlpha: 0 }, 0.02);
        // Fly down while the intro scales up…
        tl4.to(
          introFlyRef.current,
          { x: 0, y: 0, scale: 1, duration: 1.3, ease: "power2.inOut" },
          0.02
        );
        // …cross-fading dark → mixed variant near the end of flight
        tl4.to(flyDarkRef.current, { opacity: 0, duration: 0.4 }, 0.8);
        tl4.to(flyMixedRef.current, { opacity: 1, duration: 0.4 }, 0.8);
        // Land: the intro's own logo takes over
        tl4.set(introFlyRef.current, { autoAlpha: 0 }, 1.2);
        tl4.set(introLogo, { autoAlpha: 1 }, 1.2);
      }

      /* While the logo flies down from the top, the intro's paragraph and
         About Us button rise from the bottom — same duration, same ease,
         both motions land together (reversing tl4 plays the exact mirror) */
      const introCopy = document.getElementById("intro-copy");
      const introCta = document.getElementById("intro-cta");
      const introRisers = [introCopy, introCta].filter(Boolean) as HTMLElement[];
      if (intro && introRisers.length) {
        tl4.fromTo(
          introRisers,
          { y: 120, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.3, ease: "power2.inOut" },
          0.02
        );
      }

      /* ── Phase 5 (5th scroll): the intro cross-fades away over the pinned
         OurBusiness section, then the page settles on it seamlessly ── */
      const ourBusiness = document.getElementById("our-business");

      /* Pin OurBusiness under the intro (z-30 < intro's z-40) in the exact
         geometry it has in normal flow below the navbar. Fully opaque from
         the start — the opaque intro on top hides it until the fade, and it
         must stay solid so the hero can never bleed through mid-fade. */
      const fixOurBusiness = () => {
        if (!ourBusiness) return;
        gsap.set(ourBusiness, {
          position: "fixed",
          top: headerH(),
          left: 0,
          width: "100%",
          zIndex: 30,
          autoAlpha: 1,
        });
      };
      // Drop it back into normal document flow, fully visible
      const releaseOurBusiness = () => {
        if (!ourBusiness) return;
        gsap.set(ourBusiness, {
          clearProps: "position,top,left,width,zIndex,transform,filter,opacity,visibility",
        });
      };

      const tl5 = gsap.timeline({ paused: true });
      if (intro && ourBusiness) {
        // Only the top layer fades: the intro dissolves away over the solid
        // OurBusiness underneath, so nothing behind ever shows through
        tl5.to(
          intro,
          { autoAlpha: 0, duration: 1.3, ease: "power2.inOut" },
          0
        );
      }

      /* Logo handoff back to the navbar — exact mirror of the phase-4
         flight: as the intro fades, its logo detaches (the flyer stays at
         full opacity outside the section), flies up and lands on the navbar
         centre at the navbar logo's size, cross-fading from the mixed intro
         variant back to the dark navbar variant */
      if (intro && introLogo && headerLogo && introFlyRef.current) {
        const iRect = () => introLogo.getBoundingClientRect();
        const nRect = () => headerLogo.getBoundingClientRect();
        // End deltas: up to the navbar logo's centre, scaled to its height
        const uX = () => {
          const n = nRect(), i = iRect();
          return n.left + n.width / 2 - (i.left + i.width / 2);
        };
        const uY = () => {
          const n = nRect(), i = iRect();
          return n.top + n.height / 2 - (i.top + i.height / 2);
        };
        const uScale = () => nRect().height / Math.max(iRect().height, 1);

        // Park the flyer on the intro logo's rect (measured while pinned)
        tl5.set(
          introFlyRef.current,
          {
            left: () => iRect().left,
            top: () => iRect().top,
            width: () => iRect().width,
            height: () => iRect().height,
            x: 0,
            y: 0,
            scale: 1,
            transformOrigin: "center center",
          },
          0
        );
        // The flyer takes over from the intro's logo (mixed variant showing)
        tl5.set(introFlyRef.current, { autoAlpha: 1 }, 0.02);
        tl5.set(flyMixedRef.current, { opacity: 1 }, 0.02);
        tl5.set(flyDarkRef.current, { opacity: 0 }, 0.02);
        tl5.set(introLogo, { autoAlpha: 0 }, 0.02);
        // Fly up to the navbar while the intro fades away…
        tl5.to(
          introFlyRef.current,
          { x: uX, y: uY, scale: uScale, duration: 1.3, ease: "power2.inOut" },
          0.02
        );
        // …cross-fading mixed → dark variant near the end of flight
        tl5.to(flyMixedRef.current, { opacity: 0, duration: 0.4 }, 0.8);
        tl5.to(flyDarkRef.current, { opacity: 1, duration: 0.4 }, 0.8);
        // Land: the navbar logo takes over again
        tl5.set(introFlyRef.current, { autoAlpha: 0 }, 1.2);
        tl5.set(headerLogo, { opacity: 1 }, 1.2);
        // Restore the intro's own logo for future replays/reverses
        tl5.set(introLogo, { autoAlpha: 1 }, 1.2);
      }

      /* Mirror of the phase-4 entrance: while the logo flies back up to the
         navbar, the paragraph and About Us button sink down and fade out —
         same duration, same ease (reversing tl5 brings them back up) */
      if (intro && introRisers.length) {
        tl5.fromTo(
          introRisers,
          { y: 0, autoAlpha: 1 },
          { y: 120, autoAlpha: 0, duration: 1.3, ease: "power2.inOut" },
          0.02
        );
      }

      /* The "Our Business" title drops in from a bit above while the intro
         dissolves, growing from small to its actual size — same duration,
         same ease (reversing tl5 sends it back up, shrinking again) */
      const obTitle = document.getElementById("our-business-title");
      if (ourBusiness && obTitle) {
        tl5.fromTo(
          obTitle,
          { y: -80, scale: 0.6, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            transformOrigin: "left center",
            duration: 1.3,
            ease: "power2.inOut",
          },
          0.02
        );
      }

      /* ── Fade chain (6th+ scrolls): each settled section dissolves into
         the next one pinned beneath it — same fade as phase 5, but scroll
         position never moves, so the navbar (and its logo) stay untouched ── */
      const globalFootprint = document.getElementById("global-footprint");
      const sustainability = document.getElementById("sustainability");
      const certifications = document.getElementById("certifications");
      const weAreASG = document.getElementById("we-are-asg");
      const newsroom = document.getElementById("newsroom");

      // The scroll position where a settled section sits below the navbar
      const topY = (el: HTMLElement) => el.offsetTop - headerH();

      /* Pin the next section under the fading one (z-30 by default), solid
         from the start, in the exact geometry it has in flow below the
         navbar. A custom z lets a reveal ride ON TOP instead. */
      const pinUnder = (el: HTMLElement, z = 30) => {
        gsap.set(el, {
          position: "fixed",
          top: headerH(),
          left: 0,
          width: "100%",
          zIndex: z,
          autoAlpha: 1,
        });
      };
      // Drop it back into normal document flow, fully visible
      const releasePin = (el: HTMLElement) => {
        gsap.set(el, {
          clearProps: "position,top,left,width,zIndex,opacity,visibility",
        });
      };

      /* Each link: at `step`, a down-gesture on the settled `from` section
         dissolves it into `to` (6th scroll → GlobalFootprint, 7th →
         Sustainability, 8th → Certifications, 9th → WeAreASG capsule
         reveal); an up-gesture at settled `to` reverses it */
      type FadeLink = {
        step: number;
        from: HTMLElement | null;
        to: HTMLElement | null;
        tl: gsap.core.Timeline;
        /** Pin `to` at this z-index (default 30 = beneath the fading
            section; 50 = reveal riding on top of a static `from`) */
        pinZ?: number;
        /** Skip the default `from` dissolve (custom reveal owns the tl) */
        noFade?: boolean;
        /** Optional hook run right before the fade plays/reverses (fresh
            measurements for extra per-section tweens) */
        onPrep?: () => void;
        /** Optional extra cleanup once the swap lands (either direction) */
        onSettle?: () => void;
        onUnsettle?: () => void;
      };
      const fadeChain: FadeLink[] = [
        { step: 5, from: ourBusiness, to: globalFootprint, tl: gsap.timeline({ paused: true }) },
        { step: 6, from: globalFootprint, to: sustainability, tl: gsap.timeline({ paused: true }) },
        { step: 7, from: sustainability, to: certifications, tl: gsap.timeline({ paused: true }) },
        { step: 8, from: certifications, to: weAreASG, tl: gsap.timeline({ paused: true }), pinZ: 50, noFade: true },
        { step: 9, from: weAreASG, to: newsroom, tl: gsap.timeline({ paused: true }) },
      ];
      for (const link of fadeChain) {
        if (!link.from || !link.to || link.noFade) continue;
        /* The `from` section stays in flow (it already fills the viewport at
           its settled spot) — raised above the pinned `to` section, it simply
           dissolves over it: same top-layer-only fade as phase 5 */
        link.tl.to(
          link.from,
          { autoAlpha: 0, duration: 1.3, ease: "power2.inOut" },
          0
        );
      }

      /* 7th-scroll extra: as GlobalFootprint dissolves into Sustainability
         its title drops in from a bit above, growing small → actual size —
         same 1s power2.inOut as the fade; reversing the fade sends it back
         up, shrinking again (same choreography as the OurBusiness title) */
      const susTitle = document.getElementById("sustainability-title");
      const susLink = fadeChain.find((l) => l.to === sustainability);
      if (susLink && susTitle) {
        susLink.tl.fromTo(
          susTitle,
          { y: -80, scale: 0.6, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            transformOrigin: "left center",
            duration: 1.3,
            ease: "power2.inOut",
          },
          0
        );
        // Once landed (either direction) drop the leftovers so the in-flow
        // title is always clean
        const resetSusTitle = () =>
          gsap.set(susTitle, { clearProps: "transform,opacity,visibility" });
        susLink.onSettle = resetSusTitle;
        susLink.onUnsettle = resetSusTitle;
      }

      /* 7th-scroll extra: the accordion panels rise from below one after
         another (a light left→right stagger) while the fade reveals the
         section — mirroring the title dropping in from above. Reversing
         the fade sinks them back down in the opposite order. */
      const susPanels = document.getElementById("sustainability-panels");
      if (susLink && susPanels && susPanels.children.length > 0) {
        const panelEls = Array.from(susPanels.children) as HTMLElement[];
        susLink.tl.fromTo(
          panelEls,
          { y: 160, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.3,
            ease: "power2.inOut",
            stagger: 0.1,
          },
          0
        );
        // Compose with the title cleanup so both run on settle/unsettle
        const prevSettle = susLink.onSettle;
        const prevUnsettle = susLink.onUnsettle;
        const resetSusPanels = () =>
          gsap.set(panelEls, { clearProps: "transform,opacity,visibility" });
        susLink.onSettle = () => {
          prevSettle?.();
          resetSusPanels();
        };
        susLink.onUnsettle = () => {
          prevUnsettle?.();
          resetSusPanels();
        };
      }

      /* 8th-scroll extra: the certification tiles start stacked on the
         bottom-right tile and scatter out to their grid spots in sync with
         the fade (same 1s power2.inOut) — reversing the fade pulls them all
         back into that corner. onPrep measures and stacks the tiles right
         before each play so the deltas are always fresh. */
      const certGrid = document.getElementById("cert-grid");
      const certLink = fadeChain.find((l) => l.to === certifications);
      if (certGrid && certLink && certGrid.children.length > 0) {
        const tiles = Array.from(certGrid.children) as HTMLElement[];
        const anchor = tiles[tiles.length - 1];
        certLink.onPrep = () => {
          // Stack every tile on the anchor's corner spot (delta measured
          // transform-free so repeated preps stay accurate)
          gsap.set(tiles, { clearProps: "transform" });
          const a = anchor.getBoundingClientRect();
          tiles.forEach((tile) => {
            const r = tile.getBoundingClientRect();
            gsap.set(tile, { x: a.left - r.left, y: a.top - r.top });
          });
        };
        // Timeline just travels back to identity — reverse restacks them
        certLink.tl.to(
          tiles,
          { x: 0, y: 0, duration: 1.3, ease: "power2.inOut" },
          0
        );
        // Once landed (either direction) drop the leftover transforms so
        // the in-flow grid is always clean
        const resetTiles = () => gsap.set(tiles, { clearProps: "transform" });
        certLink.onSettle = resetTiles;
        certLink.onUnsettle = resetTiles;
      }

      /* 8th-scroll extra: as Sustainability dissolves into Certifications
         its eyebrow ("Certification .") and title drop in together from a
         bit above, growing small → actual size — same 1s power2.inOut as
         the fade; reversing the fade sends them back up, shrinking again
         (same choreography as the other titles). Wraps the tile callbacks
         so both cleanups run on settle/unsettle. */
      const certTitle = document.getElementById("certifications-title");
      const certEyebrow = document.getElementById("certifications-eyebrow");
      const certHeading = [certEyebrow, certTitle].filter(Boolean) as HTMLElement[];
      if (certLink && certHeading.length) {
        certLink.tl.fromTo(
          certHeading,
          { y: -80, scale: 0.6, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            transformOrigin: "left center",
            duration: 1.3,
            ease: "power2.inOut",
          },
          0
        );
        const prevSettle = certLink.onSettle;
        const prevUnsettle = certLink.onUnsettle;
        const resetCertTitle = () =>
          gsap.set(certHeading, { clearProps: "transform,opacity,visibility" });
        certLink.onSettle = () => {
          prevSettle?.();
          resetCertTitle();
        };
        certLink.onUnsettle = () => {
          prevUnsettle?.();
          resetCertTitle();
        };
      }

      /* 9th-scroll custom reveal: WeAreASG emerges from a blurred,
         scaled-up state into crisp focus — a cinematic depth-of-field
         effect. The white backdrop fades in, the section de-blurs and
         settles from 1.15× scale to 1×, while "WE ARE" sweeps in from
         the right and "ASG" from the left. Reversing plays the mirror:
         section blurs and zooms out, texts fly away. */
      const waaLink = fadeChain.find((l) => l.to === weAreASG);
      const waaWhite = waaWhiteRef.current;
      if (waaLink && weAreASG && waaWhite) {
        const weAreTxt = document.getElementById("waa-we-are");
        const asgTxt = document.getElementById("waa-asg");
        const texts = [weAreTxt, asgTxt].filter(Boolean) as HTMLElement[];
        waaLink.onPrep = () => {
          // Stage the start frame: section large and blurred, texts
          // offset to their respective sides, backdrop hidden
          gsap.set(waaWhite, { display: "block", autoAlpha: 0 });
          gsap.set(weAreASG, {
            scale: 1.15,
            filter: "blur(30px)",
            autoAlpha: 0,
            transformOrigin: "center center",
          });
          if (weAreTxt) gsap.set(weAreTxt, { x: 200, autoAlpha: 0 });
          if (asgTxt) gsap.set(asgTxt, { x: -200, autoAlpha: 0 });
        };
        // White backdrop fades in
        waaLink.tl.to(
          waaWhite,
          { autoAlpha: 1, duration: 1.3, ease: "power2.inOut" },
          0
        );
        // Section de-blurs, scales down, and fades in — cinematic focus
        waaLink.tl.to(
          weAreASG,
          {
            scale: 1,
            filter: "blur(0px)",
            autoAlpha: 1,
            duration: 1.3,
            ease: "power2.inOut",
          },
          0
        );
        // "WE ARE" sweeps in from the right
        if (weAreTxt) {
          waaLink.tl.to(weAreTxt, { x: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" }, 0.2);
        }
        // "ASG" sweeps in from the left
        if (asgTxt) {
          waaLink.tl.to(asgTxt, { x: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" }, 0.2);
        }
        // Landing (either direction) — park the backdrop and drop
        // all leftover props so the in-flow section is always clean
        const resetWaa = () => {
          gsap.set(waaWhite, { display: "none", clearProps: "opacity,visibility" });
          gsap.set(weAreASG, { clearProps: "transform,filter,opacity,visibility" });
          if (texts.length) gsap.set(texts, { clearProps: "transform,opacity,visibility" });
        };
        waaLink.onSettle = () => {
          resetWaa();
          // C2 fix: trigger count-up only when WeAreASG is fully settled
          // (step 9 = the WeAreASG rest state, forward reveal complete)
          if (stepper.stepRef.current === 9) {
            waaTriggerRef?.current?.();
          }
        };
        waaLink.onUnsettle = () => {
          resetWaa();
          // C2 fix: reset count-up when reversing away from WeAreASG
          // (step 8 = Certifications rest state, WeAreASG no longer visible)
          if (stepper.stepRef.current === 8) {
            waaResetRef?.current?.();
          }
        };
      }

      /* 10th-scroll extra: as WeAreASG dissolves into Newsroom its eyebrow
         ("Newsroom .") and title drop in together from a bit above, growing
         small → actual size — same 1s power2.inOut as the fade; reversing
         the fade sends them back up, shrinking again (same choreography as
         the Certifications heading). */
      const newsTitle = document.getElementById("newsroom-title");
      const newsEyebrow = document.getElementById("newsroom-eyebrow");
      const newsHeading = [newsEyebrow, newsTitle].filter(Boolean) as HTMLElement[];
      const newsLink = fadeChain.find((l) => l.to === newsroom);
      if (newsLink && newsHeading.length) {
        newsLink.tl.fromTo(
          newsHeading,
          { y: -80, scale: 0.6, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            transformOrigin: "left center",
            duration: 1.3,
            ease: "power2.inOut",
          },
          0
        );
        // Once landed (either direction) drop the leftovers so the in-flow
        // heading is always clean
        const resetNewsHeading = () =>
          gsap.set(newsHeading, { clearProps: "transform,opacity,visibility" });
        newsLink.onSettle = resetNewsHeading;
        newsLink.onUnsettle = resetNewsHeading;
      }

      /* C1 fix — After a reverse of tl4, correct the flying logo position. */
      const correctLogoPosition = () => {
        if (!introLogo || !headerLogo || !logoRef.current) return;
        const iRect = introLogo.getBoundingClientRect();
        const nRect = headerLogo.getBoundingClientRect();
        const dx = nRect.left + nRect.width / 2 - (iRect.left + iRect.width / 2);
        const dy = nRect.top + nRect.height / 2 - (iRect.top + iRect.height / 2);
        const scale = nRect.height / Math.max(iRect.height, 1);
        gsap.set(logoRef.current, {
          left: iRect.left, top: iRect.top, x: dx, y: dy, scale,
          transformOrigin: "center center", opacity: 1, autoAlpha: 1,
        });
      };

            // Let the Header mirror its "scrolled" style while the page can't scroll
      const syncHeader = (active: boolean) =>
        window.dispatchEvent(new CustomEvent("hero-phase", { detail: active }));

      // The scroll position where settled OurBusiness sits below the navbar
      const ourBusinessTopY = () =>
        ourBusiness ? ourBusiness.offsetTop - headerH() : 0;

      // ── Populate refs for the extracted transition hook ──
      timelinesRef.current = { tl, tl2, tl3, tl4, tl5 };
      fadeChainRef.current = fadeChain;
      transitionHelpersRef.current = {
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
        restoreIntroVisibility: () => {
          if (intro) gsap.set(intro, { autoAlpha: 1 });
        },
      };

      // Wire the stepper callbacks to the transitions array
      const { correctLogoOnLandBack } = transitionsHandle.wireStepper({
        onProgress: onProgressRef,
        onStage: onStageRef,
        onLand: onLandRef,
        onLandBack: onLandBackRef,
      });
      correctLogoOnLandBack(correctLogoPosition);

      const atTop = () => window.scrollY <= SCROLL_TOP_THRESHOLD;

      /* The scroll position the page is anchored to at the current step — the
         top of the section currently settled below the navbar. Every section
         above it is a pinned overlay, so this doubles as a hard floor: while
         the chain is engaged the page must never travel above it. Returns
         null during the opening phases, which hold the page at the very top. */
      const anchorY = () => {
        if (stepper.stepRef.current === 5) return ourBusiness ? ourBusinessTopY() : null;
        const link = fadeChain.find((l) => stepper.stepRef.current === l.step + 1);
        return link?.to ? topY(link.to) : null;
      };

      /* ── Shared gesture routing (wheel + keyboard + touch) ──
         Given a direction, decide whether the input must be blocked (the
         page is holding at a locked spot) and — when `fire` is true — play
         exactly one step. One router keeps every input device perfectly
         consistent across OSes. Returns true when the event should be
         prevented. */
      const routeGesture = (dir: number, fire: boolean): boolean => {
        if (!dir) return false;

        // At the last step and scrolling down? Allow native scrolling to footer
        if (dir > 0 && stepper.stepRef.current === TRANSITION_COUNT) {
          return false;
        }

        /* Fade-chain zone: a down-gesture on a settled section dissolves it
           into the next one pinned beneath it */
        for (const link of fadeChain) {
          if (
            dir > 0 &&
            stepper.stepRef.current === link.step &&
            link.from &&
            Math.abs(window.scrollY - topY(link.from)) <= FADE_CHAIN_TOLERANCE
          ) {
            if (fire) stepper.advanceRef.current(1);
            return true;
          }
        }

        /* Up-gesture on the settled section: hold the page at its anchor and
           let a fresh gesture reverse the dissolve. Capture is deliberately
           unbounded above the anchor — a fast flick up from the footer clears
           hundreds of px between two wheel events, and a bounded window let
           the gesture slip through, stranding `step` deep in the chain while
           the page ran on to the top (the next gesture then replayed a hero
           phase from the wrong state). Anything at or past the anchor is ours. */
        if (dir < 0 && stepper.stepRef.current >= 5 && !atTop()) {
          const anchor = anchorY();
          if (anchor !== null && window.scrollY <= anchor + 4) {
            if (window.scrollY < anchor - 1) {
              // The arriving gesture overshot above the section — clamp back
              controlledScrollTo(anchor);
            }
            if (fire) stepper.advanceRef.current(-1);
            return true;
          }
        }

        if (!atTop()) return false;

        if (dir > 0 && stepper.stepRef.current < 5) {
          if (fire) stepper.advanceRef.current(1);
          return true;
        }
        if (dir < 0 && stepper.stepRef.current > 0) {
          if (fire) stepper.advanceRef.current(-1);
          return true;
        }
        return false;
      };

      /* ── Wire the extracted gesture-input hook to the animation state ── */
      onGestureRef.current = (dir, fire) => {
        if (stepper.sweeping.current()) {
          if (fire) {
            anchorCorrectedRef.current = false;
            isLandingRef.current = false;
            stepper.advanceRef.current(dir);
          }
          return true;
        }
        const handled = routeGesture(dir, fire);
        if (handled && fire) {
          anchorCorrectedRef.current = false;
          isLandingRef.current = false;
        }
        return handled;
      };

      // Keep the flying logo glued to its slot before the sequence starts
      const onResize = () => {
        if (stepper.stepRef.current === 0 && !stepper.sweeping.current()) placeLogo();
      };

      /* After the handoff the navbar centre is empty — bring its logo back
         once the page actually scrolls (settled on OurBusiness or deeper),
         hide it again when we return to the pinned states at the top */
      let navLogoBack = false;
      const onScroll = () => {
        /* Anchor floor (C3 + C4 fix) —
           During a controlled landing, skip correction entirely.
           After one correction per momentum burst, suppress further
           corrections to avoid fighting browser inertia (jitter). */
        if (!stepper.sweeping.current() && stepper.stepRef.current >= 5) {
          if (isLandingRef.current) {
            isLandingRef.current = false;
          } else if (anchorCorrectedRef.current) {
            const anchor = anchorY();
            if (anchor !== null && window.scrollY < anchor - ANCHOR_DRIFT_LIMIT) {
              anchorCorrectedRef.current = false;
            }
          } else {
            const anchor = anchorY();
            if (anchor !== null && window.scrollY < anchor - 1) {
              window.scrollTo({ top: anchor, behavior: "auto" });
              anchorCorrectedRef.current = true;
            }
          }
        }

        if (!headerLogo || tl4.progress() < 1) return;
        const past = window.scrollY > SCROLL_TOP_THRESHOLD;
        if (past !== navLogoBack) {
          navLogoBack = past;
          gsap.to(headerLogo, {
            opacity: past ? 1 : 0,
            duration: 0.3,
            overwrite: "auto",
          });
        }
      };

      // Always start from the top — page.tsx's useLayoutEffect guarantees
      // scrollY === 0 before this effect runs, so step 0 is the only case

      window.addEventListener("resize", onResize);
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        // TEMP DEBUG
        console.log("[HOME] CLEANUP START", { scrollY: window.scrollY, time: performance.now() });

        // Kill the smooth-scroll tween first — it lives outside the GSAP
        // context and would otherwise survive unmount, calling scrollTo()
        // on the new page.
        transitionsHandle.cleanup();

        // Drop every pinned section back into normal flow — without this
        // the next page inherits fixed-position overlays that block scroll
        transitionsHandle.landBackAll(stepper.stepRef.current);

        // Reset the header logo to its default navbar state so the
        // next page doesn't start with a hidden/stuck logo
        if (headerLogo) {
          gsap.set(headerLogo, { clearProps: "opacity" });
        }

        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);

        // TEMP DEBUG
        console.log("[HOME] CLEANUP END", { scrollY: window.scrollY, time: performance.now() });
      };
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-white">
      {/* Video wrapper — shrinks from full-bleed to a centered card on scroll */}
      <div ref={videoWrapRef} className="absolute inset-0 overflow-hidden">
        {/* Hero Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero/hero-bg-vid.webm" type="video/webm" />
        </video>

        {/* Dark overlay for text readability */}
        <div ref={overlayRef} className="absolute inset-0 bg-black/40" />
      </div>

      {/* "Family Business" heading — revealed by the scroll timeline */}
      <h2
        ref={familyRef}
        className="hidden lg:block absolute top-[20%] z-20 font-test-tiempos-fine text-[4.0625rem] leading-20 text-[var(--primary-black)] whitespace-nowrap opacity-0"
      >
        Family Business
      </h2>

      {/* "Legacy For" — slides in from the right on the 2nd scroll,
          right-aligned to the video's right edge */}
      <h2
        ref={legacyRef}
        className="hidden lg:block absolute top-[24%] right-[33.3vw] z-20 font-test-tiempos-fine text-[4.0625rem] leading-16 text-[var(--primary-black)] whitespace-nowrap opacity-0"
      >
        Legacy For
      </h2>

      {/* "More Then 130 Years" — rises from below the video on the 3rd scroll,
          centred with the same gap as above the video */}
      <h2
        ref={moreRef}
        className="hidden lg:block absolute top-[60%] z-20 font-test-tiempos-fine text-[4.0625rem] leading-16 text-[var(--primary-black)] whitespace-nowrap opacity-0"
      >
        More Then 130 Years
      </h2>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Logo — static on mobile, flying logo covers this slot on desktop */}
        <div ref={logoSlotRef} className="mb-4 lg:mb-6 w-[6rem] h-[5rem] lg:w-[8.125rem] lg:h-[6.875rem] flex items-center justify-center">
          <Image
            src="/logo/asg-icon.png"
            alt="ASG Logo"
            width={130}
            height={110}
            quality={100}
            priority
            className="w-full h-full object-contain lg:hidden"
          />
        </div>

        <div ref={textRef}>
          <h1 className="font-test-tiempos-fine uppercase text-3xl sm:text-4xl lg:text-6xl font-medium mb-2 lg:mb-4">
            Amanat Shah Group
          </h1>

          <p className="text-white font-neue-montreal font-light word-space-4 uppercase tracking-wider max-w-4xl text-xs sm:text-sm lg:text-base">
            Textile | RMG | Chemical | Trading | IT | E-Commerce | Real Estate | Finance | Agriculture
          </p>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div
        ref={hintRef}
        className="absolute bottom-15 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 text-white"
      >
        <Image
          src="/icons/mouse-scroll-wheel.gif"
          alt="Scroll down"
          width={28}
          height={38}
          quality={100}
          className="w-[1.75rem] h-[2.375rem] object-contain"
        />
        <span className="font-neue-montreal font-light uppercase tracking-widest">
          Scroll Down
        </span>
      </div>
      </section>

      {/* Flying logo — fixed above the navbar (z-60 > header's z-50) so it
          passes over it before handing off to the navbar logo */}
      <Image
        ref={logoRef}
        src="/logo/asg-icon.png"
        alt="ASG Logo"
        width={110}
        height={90}
        quality={100}
        priority
        className="pointer-events-none invisible fixed left-0 top-0 z-60 hidden lg:block w-[8.125rem] h-[6.875rem] object-contain"
      />

      {/* Flying intro logo — carries the navbar logo down onto the intro
          section's logo during the circle reveal. Two stacked variants
          cross-fade mid-flight (dark navbar logo → mixed intro logo) */}
      <div
        ref={introFlyRef}
        className="pointer-events-none invisible fixed left-0 top-0 z-60 hidden lg:block"
      >
        <Image
          ref={flyDarkRef}
          src="/logo/ASG-logo.png"
          alt=""
          width={300}
          height={120}
          quality={100}
          className="absolute inset-0 w-full h-full object-contain"
        />
        <Image
          ref={flyMixedRef}
          src="/logo/ASG-logo-mixed.png"
          alt=""
          width={300}
          height={120}
          quality={100}
          className="absolute inset-0 w-full h-full object-contain opacity-0"
        />
      </div>

      {/* 9th-scroll white backdrop — sits between Certifications (z-40)
          and the WeAreASG reveal (z-50): Certifications dissolves into
          this full-white layer while the circular clip-path reveals the
          section underneath. */}
      <div
        ref={waaWhiteRef}
        className="pointer-events-none fixed inset-0 z-45 hidden bg-white"
      />
    </>
  );
}
