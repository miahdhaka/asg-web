"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
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
  const waaCapsuleRef = useRef<HTMLDivElement>(null);
  const waaWhiteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
        { opacity: 0, y: -40, duration: 0.35, ease: "power2.out" },
        0
      );

      // Dark overlay clears while the video shrinks into its card
      tl.to(overlayRef.current, { opacity: 0, duration: 0.55 }, 0.05);
      tl.to(
        videoWrapRef.current,
        {
          width: "33.4vw",
          height: "18.79vw",
          duration: 0.75,
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
          duration: 0.7,
        },
        0.05
      );
      // …pauses there, fades out…
      tl.to(logoRef.current, { opacity: 0, duration: 0.25, ease: "power1.out" }, 0.85);
      // …and the navbar logo takes over
      if (headerLogo) {
        tl.to(headerLogo, { opacity: 1, duration: 0.3, ease: "power1.inOut" }, 0.95);
      }

      // "Family Business" settles in above the shrunken video
      tl.fromTo(
        familyRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        0.6
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
          duration: 0.6,
        },
        0
      );

      // The video card dips down to widen the gap
      tl2.to(
        videoWrapRef.current,
        { y: () => metrics().drop, duration: 0.6 },
        0
      );

      // "Legacy For" glides in from beyond the right edge, landing
      // centred in the space between the heading and the video
      tl2.set(legacyRef.current, { top: () => metrics().lfTop }, 0);
      tl2.fromTo(
        legacyRef.current,
        { x: "70vw", autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
        0.1
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
        { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
        0
      );

      /* ── Phase 4 (4th scroll): the IntroSection opens over the hero as an
         expanding circle from the viewport centre, then the page settles on
         it seamlessly ── */
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
          clearProps: "position,top,left,width,zIndex,clipPath",
        });
      };

      const tl4 = gsap.timeline({ paused: true });
      if (intro) {
        // 75% of the clip-path reference box ≳ half the viewport diagonal,
        // so the circle fully swallows the corners
        tl4.fromTo(
          intro,
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(75% at 50% 50%)",
            duration: 1,
            ease: "power2.inOut",
          }
        );
      }

      /* Logo handoff to the intro — mirror of the phase-1 hero→navbar flight:
         while the circle opens, the navbar logo detaches, flies down and
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
        // Fly down while the circle opens…
        tl4.to(
          introFlyRef.current,
          { x: 0, y: 0, scale: 1, duration: 0.98, ease: "power2.inOut" },
          0.02
        );
        // …cross-fading dark → mixed variant mid-flight
        tl4.to(flyDarkRef.current, { opacity: 0, duration: 0.35 }, 0.4);
        tl4.to(flyMixedRef.current, { opacity: 1, duration: 0.35 }, 0.4);
        // Land: the intro's own logo takes over
        tl4.set(introFlyRef.current, { autoAlpha: 0 }, 1.0);
        tl4.set(introLogo, { autoAlpha: 1 }, 1.0);
      }

      /* While the logo flies down from the top, the intro's paragraph and
         About Us button rise from the bottom — same duration, same ease, so
         both motions land together (reversing tl4 plays the exact mirror) */
      const introCopy = document.getElementById("intro-copy");
      const introCta = document.getElementById("intro-cta");
      const introRisers = [introCopy, introCta].filter(Boolean) as HTMLElement[];
      if (intro && introRisers.length) {
        tl4.fromTo(
          introRisers,
          { y: 120, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.98, ease: "power2.inOut" },
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
          clearProps: "position,top,left,width,zIndex,opacity,visibility",
        });
      };

      const tl5 = gsap.timeline({ paused: true });
      if (intro && ourBusiness) {
        // Only the top layer fades: the intro dissolves away over the solid
        // OurBusiness underneath, so nothing behind ever shows through
        tl5.to(
          intro,
          { autoAlpha: 0, duration: 1, ease: "power2.inOut" },
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
          { x: uX, y: uY, scale: uScale, duration: 0.98, ease: "power2.inOut" },
          0.02
        );
        // …cross-fading mixed → dark variant mid-flight
        tl5.to(flyMixedRef.current, { opacity: 0, duration: 0.35 }, 0.4);
        tl5.to(flyDarkRef.current, { opacity: 1, duration: 0.35 }, 0.4);
        // Land: the navbar logo takes over again
        tl5.set(introFlyRef.current, { autoAlpha: 0 }, 1.0);
        tl5.set(headerLogo, { opacity: 1 }, 1.0);
        // Restore the intro's own logo for future replays/reverses
        tl5.set(introLogo, { autoAlpha: 1 }, 1.0);
      }

      /* Mirror of the phase-4 entrance: while the logo flies back up to the
         navbar, the paragraph and About Us button sink down and fade out —
         same duration, same ease (reversing tl5 brings them back up) */
      if (intro && introRisers.length) {
        tl5.fromTo(
          introRisers,
          { y: 0, autoAlpha: 1 },
          { y: 120, autoAlpha: 0, duration: 0.98, ease: "power2.inOut" },
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
            duration: 0.98,
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
          { autoAlpha: 0, duration: 1, ease: "power2.inOut" },
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
            duration: 1,
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
            duration: 1,
            ease: "power2.inOut",
            stagger: 0.08,
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
          { x: 0, y: 0, duration: 1, ease: "power2.inOut" },
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
            duration: 1,
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

      /* 9th-scroll custom reveal: a proper capsule showing ONLY WeAreASG's
         bg image (a fixed pill "window" onto the full-bleed aerial shot)
         rises from bottom-center to screen-center (1s) while the page
         behind it fades to full white, holds there a moment, then the
         capsule fades away while the full section — with "WE ARE" nudging
         in from the right and "ASG" from the left — cross-fades in (1s).
         Reversing plays the exact mirror: section fades out to the white
         backdrop, capsule reappears, holds, sinks down as the page returns. */
      const waaLink = fadeChain.find((l) => l.to === weAreASG);
      const waaCapsule = waaCapsuleRef.current;
      const waaWhite = waaWhiteRef.current;
      if (waaLink && weAreASG && waaCapsule && waaWhite) {
        const weAreTxt = document.getElementById("waa-we-are");
        const asgTxt = document.getElementById("waa-asg");
        const texts = [weAreTxt, asgTxt].filter(Boolean) as HTMLElement[];
        waaLink.onPrep = () => {
          // Stage the start frame: capsule parked below the viewport, white
          // backdrop transparent over cert, the section itself invisible on
          // top, headline halves offset
          gsap.set(waaCapsule, {
            display: "block",
            autoAlpha: 1,
            xPercent: -50,
            yPercent: -50,
            y: window.innerHeight,
          });
          gsap.set(waaWhite, { display: "block", autoAlpha: 0 });
          gsap.set(weAreASG, { autoAlpha: 0 });
          if (weAreTxt) gsap.set(weAreTxt, { x: 90 });
          if (asgTxt) gsap.set(asgTxt, { x: -90 });
        };
        // Stage 1 — the bg-image capsule glides bottom-center → screen-center
        // while the page behind it dissolves to full white
        waaLink.tl.to(
          waaCapsule,
          { y: 0, duration: 1, ease: "power2.inOut" },
          0
        );
        waaLink.tl.to(
          waaWhite,
          { autoAlpha: 1, duration: 1, ease: "power2.inOut" },
          0
        );
        // …stays a little bit at the center (0.35s hold)…
        // Stage 2 — the capsule fades away while the full section fades in
        waaLink.tl.to(
          waaCapsule,
          { autoAlpha: 0, duration: 1, ease: "power2.inOut" },
          1.35
        );
        waaLink.tl.to(
          weAreASG,
          { autoAlpha: 1, duration: 1, ease: "power2.inOut" },
          1.35
        );
        // …while the two headline halves slide into place
        if (weAreTxt) {
          waaLink.tl.to(weAreTxt, { x: 0, duration: 1, ease: "power2.inOut" }, 1.35);
        }
        if (asgTxt) {
          waaLink.tl.to(asgTxt, { x: 0, duration: 1, ease: "power2.inOut" }, 1.35);
        }
        // Landing (either direction) — park the capsule and the white
        // backdrop away and drop the leftover values so the in-flow
        // section is always clean
        const resetWaa = () => {
          gsap.set(waaCapsule, { display: "none", clearProps: "opacity,visibility,transform" });
          gsap.set(waaWhite, { display: "none", clearProps: "opacity,visibility" });
          gsap.set(weAreASG, { clearProps: "opacity,visibility" });
          if (texts.length) gsap.set(texts, { clearProps: "transform" });
        };
        waaLink.onSettle = resetWaa;
        waaLink.onUnsettle = resetWaa;
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
            duration: 1,
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

      /* ── Discrete scroll stepping ──
         While the page sits at the very top, scrolling is locked and each
         downward gesture plays exactly one phase (1st scroll → phase 1,
         2nd scroll → phase 2, 3rd scroll → phase 3, 4th scroll → the intro
         circle-reveal). Only after all phases does native scrolling resume.
         Scrolling up at the top reverses one phase per gesture. */
      let step = 0; // 0 = full hero, 1/2/3/4 = phases done
      let animating = false;

      /* ── Cross-device wheel gesture detection ──
         Windows mice fire one big delta per notch, but Mac/Linux trackpads
         and free-spinning wheels stream dozens of tiny deltas plus a long
         inertia tail, so a fixed time gap alone misses real gestures.
         Deltas are normalized across deltaMode, accumulated until they add
         up to a deliberate gesture, and after each handled gesture the
         rest of the stream is swallowed until it either goes quiet or
         clearly re-accelerates (a fresh flick mid-tail). */
      const INTENT_DISTANCE = 30; // accumulated px that count as a gesture
      const STREAM_GAP = 200; // ms of silence that ends an event stream
      let wheelAccum = 0;
      let lastWheelTime = 0;
      let inertiaLock = false; // swallowing the tail of a handled stream
      let wheelSamples: number[] = []; // recent |delta|s of the locked tail

      // deltaMode: 0 = pixels, 1 = lines (Firefox), 2 = pages
      const normalizeWheel = (e: WheelEvent) =>
        e.deltaMode === 1
          ? e.deltaY * 16
          : e.deltaMode === 2
            ? e.deltaY * window.innerHeight
            : e.deltaY;

      /* Feed one wheel event into the tracker; returns true when it
         completes a deliberate gesture (the caller then plays exactly one
         phase while the rest of the stream is ignored) */
      const wheelIntent = (e: WheelEvent) => {
        const now = performance.now();
        const gap = now - lastWheelTime;
        lastWheelTime = now;
        const delta = normalizeWheel(e);
        const abs = Math.abs(delta);
        if (!abs) return false;

        // A long-enough pause always starts a fresh gesture stream
        if (gap > STREAM_GAP) {
          inertiaLock = false;
          wheelAccum = 0;
          wheelSamples = [];
        }

        wheelSamples.push(abs);
        if (wheelSamples.length > 12) wheelSamples.shift();

        if (inertiaLock) {
          // Inertia tails only ever decay — a clear re-acceleration means
          // the user flicked again mid-tail, so unlock and start over
          const n = wheelSamples.length;
          if (n < 6) return false;
          const avgNew =
            (wheelSamples[n - 1] + wheelSamples[n - 2] + wheelSamples[n - 3]) / 3;
          const avgOld =
            (wheelSamples[n - 4] + wheelSamples[n - 5] + wheelSamples[n - 6]) / 3;
          if (!(avgNew > avgOld * 1.5 && avgNew > 6)) return false;
          inertiaLock = false;
          wheelAccum = 0;
        }

        // A direction flip restarts the accumulation
        if ((delta > 0 && wheelAccum < 0) || (delta < 0 && wheelAccum > 0)) {
          wheelAccum = 0;
        }
        wheelAccum += delta;
        if (Math.abs(wheelAccum) < INTENT_DISTANCE) return false;

        // Gesture confirmed — swallow the rest of this stream
        wheelAccum = 0;
        wheelSamples = [];
        inertiaLock = true;
        return true;
      };

      // Let the Header mirror its "scrolled" style while the page can't scroll
      const syncHeader = (active: boolean) =>
        window.dispatchEvent(new CustomEvent("hero-phase", { detail: active }));

      tl.eventCallback("onComplete", () => {
        animating = false;
      });
      tl.eventCallback("onReverseComplete", () => {
        animating = false;
        syncHeader(false);
      });
      tl2.eventCallback("onComplete", () => {
        animating = false;
      });
      tl2.eventCallback("onReverseComplete", () => {
        animating = false;
      });
      tl3.eventCallback("onComplete", () => {
        animating = false;
      });
      tl3.eventCallback("onReverseComplete", () => {
        animating = false;
      });
      tl4.eventCallback("onComplete", () => {
        animating = false;
        // The intro stays pinned (step 4 rest state) — the next down-gesture
        // plays the phase-5 cross-fade into OurBusiness
      });
      tl4.eventCallback("onReverseComplete", () => {
        animating = false;
        releaseIntro();
      });
      tl5.eventCallback("onComplete", () => {
        animating = false;
        // Swap the pinned overlays for the real in-flow OurBusiness section
        settleOnOurBusiness();
      });
      tl5.eventCallback("onReverseComplete", () => {
        animating = false;
        // Back on the pinned intro (step 4) — drop the OurBusiness overlay
        releaseOurBusiness();
        step = 4;
      });
      for (const link of fadeChain) {
        link.tl.eventCallback("onComplete", () => {
          animating = false;
          // Swap the pinned overlay for the real in-flow section
          settleOnNext(link);
          link.onSettle?.();
        });
        link.tl.eventCallback("onReverseComplete", () => {
          animating = false;
          // Back on the settled `from` section — drop the `to` overlay
          if (link.to) releasePin(link.to);
          if (link.from) {
            gsap.set(link.from, { clearProps: "zIndex,opacity,visibility" });
          }
          step = link.step;
          link.onUnsettle?.();
        });
      }

      const stepForward = () => {
        if (animating || step >= 5) return;
        animating = true;
        if (step === 0) {
          syncHeader(true);
          tl.play();
        } else if (step === 1) {
          tl2.play();
        } else if (step === 2) {
          tl3.play();
        } else if (step === 3) {
          fixIntro();
          // invalidate → re-measure the logo flight for the current viewport
          tl4.invalidate().play(0);
        } else {
          // 5th scroll: cross-fade the pinned intro into OurBusiness
          fixIntro();
          fixOurBusiness();
          // invalidate → re-measure the logo flight for the current viewport
          tl5.invalidate().play(0);
        }
        step++;
      };

      const stepBack = () => {
        if (animating || step <= 0) return;
        animating = true;
        if (step === 4) {
          fixIntro();
          tl4.reverse();
        } else if (step === 3) tl3.reverse();
        else if (step === 2) tl2.reverse();
        else tl.reverse();
        step--;
      };

      /* Leaving the pinned pair: drop both sections back into the flow and
         land the page on OurBusiness — same visual frame — then native
         scrolling takes over from there. */
      const settleOnOurBusiness = () => {
        if (animating || !ourBusiness) return;
        releaseIntro();
        gsap.set(intro, { autoAlpha: 1 }); // restore for future replays
        releaseOurBusiness();
        window.scrollTo({
          top: ourBusiness.offsetTop - headerH(),
          behavior: "auto",
        });
        step = 5;
      };

      // The scroll position where settled OurBusiness sits below the navbar
      const ourBusinessTopY = () =>
        ourBusiness ? ourBusiness.offsetTop - headerH() : 0;

      /* Mirror of settleOnOurBusiness: scrolling up from the settled
         OurBusiness re-pins both sections (page silently jumps back to the
         top behind them) and the cross-fade plays in reverse to the intro */
      const unsettleFromOurBusiness = () => {
        if (animating || !intro || !ourBusiness) return;
        animating = true;
        fixIntro();
        fixOurBusiness();
        window.scrollTo({ top: 0, behavior: "auto" });
        syncHeader(true);
        tl5.progress(1).reverse(); // onReverseComplete lands on step 4
      };

      /* Next gesture down a chain link: raise the in-flow `from` section
         above the freshly pinned `to` section and dissolve it — scroll
         position never moves, so the navbar (and its logo) stay untouched */
      const fadeToNext = (link: FadeLink) => {
        if (animating || !link.from || !link.to) return;
        animating = true;
        gsap.set(link.from, { zIndex: 40 }); // top layer during the fade
        pinUnder(link.to, link.pinZ);
        link.onPrep?.(); // stage extra per-section tweens (fresh measures)
        link.tl.invalidate().play(0);
      };

      /* Swap the pinned overlay for the real in-flow section — same visual
         frame — then native scrolling takes over from there */
      const settleOnNext = (link: FadeLink) => {
        if (animating || !link.to) return;
        releasePin(link.to);
        if (link.from) {
          // Restore the faded section (off-screen above) for future replays
          gsap.set(link.from, { autoAlpha: 1, clearProps: "zIndex" });
        }
        window.scrollTo({ top: topY(link.to), behavior: "auto" });
        step = link.step + 1;
      };

      /* Mirror: scrolling up from the settled `to` section re-pins it, the
         page silently jumps back to `from` behind it, and the dissolve
         plays in reverse */
      const unsettleToPrev = (link: FadeLink) => {
        if (animating || !link.from || !link.to) return;
        animating = true;
        pinUnder(link.to, link.pinZ);
        gsap.set(link.from, { zIndex: 40 });
        window.scrollTo({ top: topY(link.from), behavior: "auto" });
        // Re-stage extra tweens, re-record start values, jump to the end
        // frame (identical to the settled view) and play backwards
        link.onPrep?.();
        link.tl.invalidate().progress(1).reverse(); // lands on link.step
      };

      const atTop = () => window.scrollY <= 2;

      /* The scroll position the page is anchored to at the current step — the
         top of the section currently settled below the navbar. Every section
         above it is a pinned overlay, so this doubles as a hard floor: while
         the chain is engaged the page must never travel above it. Returns
         null during the opening phases, which hold the page at the very top. */
      const anchorY = () => {
        if (step === 5) return ourBusiness ? ourBusinessTopY() : null;
        const link = fadeChain.find((l) => step === l.step + 1);
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

        /* Fade-chain zone: a down-gesture on a settled section dissolves it
           into the next one pinned beneath it */
        for (const link of fadeChain) {
          if (
            dir > 0 &&
            step === link.step &&
            link.from &&
            Math.abs(window.scrollY - topY(link.from)) <= 4
          ) {
            if (fire) fadeToNext(link);
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
        if (dir < 0 && step >= 5 && !atTop()) {
          const anchor = anchorY();
          if (anchor !== null && window.scrollY <= anchor + 4) {
            if (window.scrollY < anchor - 1) {
              // The arriving gesture overshot above the section — clamp back
              window.scrollTo({ top: anchor, behavior: "auto" });
            } else if (fire) {
              if (step === 5) {
                unsettleFromOurBusiness();
              } else {
                const link = fadeChain.find((l) => step === l.step + 1);
                if (link) unsettleToPrev(link);
              }
            }
            return true;
          }
        }

        if (!atTop()) return false;

        if (dir > 0 && step < 5) {
          if (fire) stepForward();
          return true;
        }
        if (dir < 0 && step > 0) {
          if (fire) stepBack();
          return true;
        }
        return false;
      };

      const onWheel = (e: WheelEvent) => {
        // Trackpad pinch-zoom arrives as ctrl+wheel — never a scroll gesture
        if (e.ctrlKey) return;

        // A phase is playing — swallow everything so the page can't drift
        // (the phase-6 fade runs away from the top, so this must come first)
        if (animating) {
          e.preventDefault();
          // Fold the stream into the handled gesture so its inertia tail
          // can't re-trigger the moment the phase finishes
          lastWheelTime = performance.now();
          inertiaLock = true;
          wheelAccum = 0;
          wheelSamples = [];
          return;
        }

        // Trackpads/free wheels stream dozens of events per swipe — only a
        // completed deliberate gesture counts as one scroll step
        const isNewGesture = wheelIntent(e);

        if (routeGesture(Math.sign(e.deltaY), isNewGesture)) {
          e.preventDefault();
        }
      };

      const onKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement | null;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

        // A phase is playing — swallow everything so the page can't drift
        if (animating) {
          e.preventDefault();
          return;
        }

        // Keys are already discrete — every press is a deliberate gesture
        const dir = ["ArrowDown", "PageDown", " "].includes(e.key)
          ? 1
          : ["ArrowUp", "PageUp"].includes(e.key)
            ? -1
            : 0;
        if (dir && routeGesture(dir, true)) {
          e.preventDefault();
        }
      };

      /* ── Touch (tablets, touchscreen laptops, mobile) ──
         Wheel events never fire for touch scrolling, so swipes are tracked
         directly: one swipe = one gesture. The first move that crosses the
         threshold fires the step; the rest of the swipe is swallowed.
         Native touch scrolling stays untouched wherever the wheel handler
         wouldn't block either. */
      const TOUCH_DISTANCE = 40; // swipe px that count as a gesture
      let touchStartY = 0;
      let touchHandled = false;
      const onTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
        touchHandled = false;
      };
      const onTouchMove = (e: TouchEvent) => {
        if (e.touches.length !== 1) return; // pinch-zoom — not a scroll
        if (animating) {
          if (e.cancelable) e.preventDefault();
          return;
        }
        // Finger up = page down (matches wheel deltaY sign)
        const dy = touchStartY - e.touches[0].clientY;
        const fire = !touchHandled && Math.abs(dy) >= TOUCH_DISTANCE;
        if (routeGesture(Math.sign(dy), fire)) {
          if (e.cancelable) e.preventDefault();
          if (fire) touchHandled = true;
        }
      };

      // Keep the flying logo glued to its slot before the sequence starts
      const onResize = () => {
        if (step === 0 && !animating) placeLogo();
      };

      /* After the handoff the navbar centre is empty — bring its logo back
         once the page actually scrolls (settled on OurBusiness or deeper),
         hide it again when we return to the pinned states at the top */
      let navLogoBack = false;
      const onScroll = () => {
        /* Anchor floor — the last line of defence for the settled sections.
           A hard flick up can outrun the wheel handler (the browser's own
           smooth-scroll momentum keeps moving the page after the events are
           swallowed), and scrollbar drags, Home and autoscroll never fire a
           wheel event at all. Any of those could carry the page above the
           settled section while `step` stayed deep in the chain, which broke
           the animation and left plain native scrolling behind. Re-clamping
           here holds the page at its anchor until a real gesture reverses. */
        if (!animating && step >= 5) {
          const anchor = anchorY();
          if (anchor !== null && window.scrollY < anchor - 1) {
            window.scrollTo({ top: anchor, behavior: "auto" });
          }
        }

        if (!headerLogo || tl4.progress() < 1) return;
        const past = window.scrollY > 2;
        if (past !== navLogoBack) {
          navLogoBack = past;
          gsap.to(headerLogo, {
            opacity: past ? 1 : 0,
            duration: 0.3,
            overwrite: "auto",
          });
        }
      };

      // Page loaded already scrolled (e.g. refresh mid-page): jump to end state
      // (everything lives in normal flow, native scrolling active; land on the
      // deepest chain step whose section the page has reached, else step 5)
      if (!atTop()) {
        step = 5;
        for (const link of fadeChain) {
          if (link.to && window.scrollY >= topY(link.to) - 4) {
            step = link.step + 1;
          }
        }
        tl.progress(1);
        tl2.progress(1);
        tl3.progress(1);
        syncHeader(true);

        /* Start out exactly on that step's anchor, so the floor the router
           and the scroll guard both rely on holds from the very first frame */
        const anchor = anchorY();
        if (anchor !== null && window.scrollY < anchor) {
          window.scrollTo({ top: anchor, behavior: "auto" });
        }
      }

      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("resize", onResize);
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);
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
        className="absolute top-[20%] z-20 font-test-tiempos-fine text-[4.0625rem] leading-20 text-[var(--primary-black)] whitespace-nowrap opacity-0"
      >
        Family Business
      </h2>

      {/* "Legacy For" — slides in from the right on the 2nd scroll,
          right-aligned to the video's right edge */}
      <h2
        ref={legacyRef}
        className="absolute top-[24%] right-[33.3vw] z-20 font-test-tiempos-fine text-[4.0625rem] leading-16 text-[var(--primary-black)] whitespace-nowrap opacity-0"
      >
        Legacy For
      </h2>

      {/* "More Then 130 Years" — rises from below the video on the 3rd scroll,
          centred with the same gap as above the video */}
      <h2
        ref={moreRef}
        className="absolute top-[60%] z-20 font-test-tiempos-fine text-[4.0625rem] leading-16 text-[var(--primary-black)] whitespace-nowrap opacity-0"
      >
        More Then 130 Years
      </h2>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Invisible slot marking where the flying logo starts from */}
        <div ref={logoSlotRef} className="mb-6 w-[8.125rem] h-[6.875rem]" />

        <div ref={textRef}>
          <h1 className="font-test-tiempos-fine uppercase text-6xl font-medium mb-4">
            Amanat Shah Group
          </h1>

          <p className="text-white font-neue-montreal font-light word-space-4 uppercase tracking-wider max-w-4xl">
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
          src="/icon/mouse-scroll-wheel.gif"
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
        className="pointer-events-none invisible fixed left-0 top-0 z-60 w-[8.125rem] h-[6.875rem] object-contain"
      />

      {/* Flying intro logo — carries the navbar logo down onto the intro
          section's logo during the circle reveal. Two stacked variants
          cross-fade mid-flight (dark navbar logo → mixed intro logo) */}
      <div
        ref={introFlyRef}
        className="pointer-events-none invisible fixed left-0 top-0 z-60"
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

      {/* 9th-scroll white backdrop — sits between Certifications (z-40) and
          the WeAreASG reveal (z-50): the page behind the rising capsule
          dissolves into this full-white layer, leaving only the capsule
          visible. GSAP fades it in/out around the capsule's travel. */}
      <div
        ref={waaWhiteRef}
        className="pointer-events-none fixed inset-0 z-45 hidden bg-white"
      />

      {/* 9th-scroll capsule — a fixed tall pill that acts as a "window"
          showing only WeAreASG's full-bleed bg image (the viewport-sized
          image is centered inside, the pill crops it). GSAP raises it from
          below the screen, holds it at the center, then fades it away. */}
      <div
        ref={waaCapsuleRef}
        className="pointer-events-none fixed left-1/2 top-1/2 z-60 hidden h-[52vh] w-[14vw] min-w-55 overflow-hidden rounded-full"
      >
        <div className="absolute left-1/2 top-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/we-are-asg.webp"
            alt=""
            fill
            sizes="100vw"
            draggable={false}
            className="pointer-events-none object-cover"
            quality={80}
          />
        </div>
      </div>
    </>
  );
}
