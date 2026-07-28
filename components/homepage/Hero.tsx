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

  useGSAP(
    () => {
      const headerLogo = document.getElementById("header-logo");

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
      const GAP_TEXT = 4; // between the two headings
      const GAP_VIDEO = 40; // between "Legacy For" and the video card
      const metrics = () => {
        const fbBottom =
          familyRef.current?.getBoundingClientRect().bottom ?? 0;
        const videoTop =
          videoWrapRef.current?.getBoundingClientRect().top ?? 0;
        const lfH = legacyRef.current?.offsetHeight ?? 80;
        const extra = Math.max(
          0,
          lfH + GAP_TEXT + GAP_VIDEO - (videoTop - fbBottom)
        );
        const rise = extra * 0.45;
        const drop = extra * 0.55;
        const lfTop = fbBottom - rise + GAP_TEXT;
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
            GAP_VIDEO,
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

      /* ── Discrete scroll stepping ──
         While the page sits at the very top, scrolling is locked and each
         downward gesture plays exactly one phase (1st scroll → phase 1,
         2nd scroll → phase 2, 3rd scroll → phase 3, 4th scroll → the intro
         circle-reveal). Only after all phases does native scrolling resume.
         Scrolling up at the top reverses one phase per gesture. */
      let step = 0; // 0 = full hero, 1/2/3/4 = phases done
      let animating = false;
      let lastWheelTime = 0;

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

      const atTop = () => window.scrollY <= 2;

      const onWheel = (e: WheelEvent) => {
        const now = performance.now();
        // Trackpad/wheel inertia streams events — only a fresh gesture counts
        const isNewGesture = now - lastWheelTime > 250;
        lastWheelTime = now;

        /* Scrolling up at (or overshooting past) the settled OurBusiness:
           hold the page there, and a fresh up-gesture reverses the fade */
        if (e.deltaY < 0 && step === 5 && !atTop() && ourBusiness) {
          const target = ourBusinessTopY();
          const y = window.scrollY;
          if (y <= target + 4 && y >= target - 300) {
            e.preventDefault();
            if (animating) return;
            if (y < target - 1) {
              // The arriving gesture overshot above the section — clamp back
              window.scrollTo({ top: target, behavior: "auto" });
            } else if (isNewGesture) {
              unsettleFromOurBusiness();
            }
            return;
          }
        }

        if (!atTop()) return;

        // Swallow inertia while a phase is playing so the page can't drift
        if (animating) {
          e.preventDefault();
          return;
        }

        if (e.deltaY > 0) {
          if (step < 5) {
            e.preventDefault();
            if (isNewGesture) stepForward();
          }
        } else if (e.deltaY < 0 && step > 0) {
          e.preventDefault();
          if (isNewGesture) stepBack();
        }
      };

      const onKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement | null;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

        // Keyboard equivalent of scrolling up out of settled OurBusiness
        if (
          ["ArrowUp", "PageUp"].includes(e.key) &&
          step === 5 &&
          !atTop() &&
          ourBusiness &&
          Math.abs(window.scrollY - ourBusinessTopY()) <= 4
        ) {
          e.preventDefault();
          unsettleFromOurBusiness();
          return;
        }

        if (!atTop()) return;

        if (["ArrowDown", "PageDown", " "].includes(e.key) && step < 5) {
          e.preventDefault();
          stepForward();
        } else if (["ArrowUp", "PageUp"].includes(e.key) && step > 0) {
          e.preventDefault();
          stepBack();
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
      // (step 5 — everything lives in normal flow, native scrolling active)
      if (!atTop()) {
        step = 5;
        tl.progress(1);
        tl2.progress(1);
        tl3.progress(1);
        syncHeader(true);
      }

      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("resize", onResize);
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("keydown", onKeyDown);
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
        className="absolute top-[20%] z-20 font-test-tiempos-fine text-[65px] leading-20 text-[var(--primary-black)] whitespace-nowrap opacity-0"
      >
        Family Business
      </h2>

      {/* "Legacy For" — slides in from the right on the 2nd scroll,
          right-aligned to the video's right edge */}
      <h2
        ref={legacyRef}
        className="absolute top-[24%] right-[33.3vw] z-20 font-test-tiempos-fine text-[65px] leading-16 text-[var(--primary-black)] whitespace-nowrap opacity-0"
      >
        Legacy For
      </h2>

      {/* "More Then 130 Years" — rises from below the video on the 3rd scroll,
          centred with the same gap as above the video */}
      <h2
        ref={moreRef}
        className="absolute top-[60%] z-20 font-test-tiempos-fine text-[65px] leading-16 text-[var(--primary-black)] whitespace-nowrap opacity-0"
      >
        More Then 130 Years
      </h2>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Invisible slot marking where the flying logo starts from */}
        <div ref={logoSlotRef} className="mb-6 w-[130px] h-[110px]" />

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
          className="w-[28px] h-[38px] object-contain"
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
        className="pointer-events-none invisible fixed left-0 top-0 z-60 w-[130px] h-[110px] object-contain"
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
    </>
  );
}
