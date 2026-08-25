"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useGestureInput } from "./hooks/useGestureInput";
import { useScrollStepper } from "./hooks/useScrollStepper";

gsap.registerPlugin(useGSAP);

/* Intrinsic aspect ratio of the ASG logo images (ASG-logo.png and
   ASG-logo-mixed.png are both 320×160) — needed for the letterbox-aware
   navbar handoff so the flying logo lands at its real rendered size. */
const LOGO_ASPECT = 320 / 160;

/* /homepage-test hero — the real homepage's opening sequence, re-tuned.
   The opening video shrink is scrubbed from the scroll distance — the video
   gets smaller bit by bit as the user scrolls — then the three headings
   arrive one gesture each, and the IntroSection reveal is scrubbed the same
   way: it opens by exactly as much as the user scrolls and closes by exactly
   as much on the way back.
   The moment the intro lands, it is dropped back into normal flow, the page
   is seated on it, and the browser takes the scroll back over — every
   section below then arrives through SectionReveal on native scroll. */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoSlotRef = useRef<HTMLDivElement>(null);
  const slotImgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const familyRef = useRef<HTMLHeadingElement>(null);
  const legacyRef = useRef<HTMLHeadingElement>(null);
  const moreRef = useRef<HTMLHeadingElement>(null);
  const introFlyRef = useRef<HTMLDivElement>(null);
  const flyDarkRef = useRef<HTMLImageElement>(null);
  const flyMixedRef = useRef<HTMLImageElement>(null);

  /* Three gesture-driven transitions: 0 → tlFB ("Family Business"),
     1 → tl2, 2 → tl3. The hero shrink (tl) and the intro curtain (tl4) are
     deliberately NOT stepper phases — both are scrubbed from the raw scroll
     distance instead, so the shrink opens the sequence and resting state 3
     is the boundary the intro hangs off. */
  const TRANSITION_COUNT = 3;
  const durationsRef = useRef<number[]>([]);
  const onProgressRef = useRef<(i: number, p: number) => void>(() => {});
  const onStageRef = useRef<(i: number, fromAbove: boolean) => void>(() => {});
  const onLandRef = useRef<(i: number) => void>(() => {});
  const onLandBackRef = useRef<(i: number) => void>(() => {});
  const stepper = useScrollStepper({
    transitionCount: TRANSITION_COUNT,
    getTransitionDuration: (i) => durationsRef.current[i] || 1,
    onProgress: onProgressRef,
    onStage: onStageRef,
    onLand: onLandRef,
    onLandBack: onLandBackRef,
  });

  const onGestureRef = useRef<(dir: number, fire: boolean) => boolean>(
    () => false
  );
  const onScrubRef = useRef<(deltaPx: number) => boolean>(() => false);
  const resetWheelIntentRef = useRef<() => void>(() => {});
  const { isLandingRef, anchorCorrectedRef } = useGestureInput({
    onGesture: onGestureRef,
    sweeping: stepper.sweeping,
    onScrub: onScrubRef,
    resetWheelIntent: resetWheelIntentRef,
  });

  useGSAP(
    () => {
      const SCROLL_TOP_THRESHOLD = 4;

      const controlledScrollTo = (top: number) => {
        isLandingRef.current = true;
        window.scrollTo({ top, behavior: "auto" });
      };

      const headerLogo = document.getElementById("header-logo");

      // The Header persists across navigation, so the navbar logo can still
      // carry opacity: 1 from the previous page — hide it until phase 1
      // hands the hero logo over.
      if (headerLogo) {
        gsap.set(headerLogo, { clearProps: "all" });
        headerLogo.style.opacity = "0";
      }

      const rootPx = () =>
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

      /* The flying logo lives outside the section (fixed, above the navbar).
         Pin it onto its invisible slot in the hero's centered content. */
      const placeLogo = () => {
        if (!logoRef.current || !logoSlotRef.current) return;
        gsap.set(logoRef.current, { clearProps: "all" });
        const slot = logoSlotRef.current.getBoundingClientRect();
        gsap.set(logoRef.current, {
          left: slot.left,
          top: slot.top,
          autoAlpha: 1,
        });
      };
      placeLogo();

      // Deltas from the hero logo's centre to the navbar logo's centre,
      // measured lazily so they always match the current viewport
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

      /* ── The hero shrink — scrubbed rather than stepped: tl takes the video
         from full-bleed to its card while the overlay clears and the logo
         flies to the navbar, and its progress follows the scroll distance at
         the same speed/smoothness as the intro curtain (see scrubHero).
         "Family Business" lives in its own stepped timeline instead, so the
         headings still arrive one scroll each. ── */
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut" },
      });

      const isMobile = window.innerWidth < 1024;

      /* Shift the video's vertical centre down by half the header height so
         the scaled-down card sits in the visible area below the navbar —
         without this the top gap is smaller because the navbar covers part
         of the viewport, making the card look off-centre. */
      const headerH = () =>
        document.querySelector("header")?.getBoundingClientRect().height ?? 0;

      gsap.set(videoWrapRef.current, {
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "100%",
        height: "100%",
      });

      /* ease "power2.in" on purpose: the text stays solid for most of the
         fade and then plunges to zero at the end — an "out" ease leaves a
         long faint tail (opacity ~10% hanging around the last half), and
         the text must be FULLY gone before that point. */
      tl.to(
        [textRef.current, hintRef.current],
        { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" },
        0
      );
      tl.to(overlayRef.current, { opacity: 0, duration: 0.75 }, 0.05);

      /* Shrink to the exact card size the main site lands on —
         33.4vw × 18.79vw on desktop, 70vw × 80vw on mobile. The
         wrapper stays centred at 50% of the section (xPercent/yPercent
         −50 re-centres it as the width/height animate), so the card
         ends with equal gap above and below. */
      const videoWidth = isMobile ? "70vw" : "33.4vw";
      const videoHeight = isMobile ? "80vw" : "18.79vw";
      tl.to(
        videoWrapRef.current,
        { width: videoWidth, height: videoHeight, duration: 1, ease: "power2.inOut" },
        0.05
      );

      /* Logo handoff flight — deliberately NOT part of the scrubbed tl.
         It is its own time-based timeline that plays in one smooth go
         (like the main site) the exact instant the scrubbed title/tagline
         fade completes, and reverses once they are halfway back on the
         way up. */
      const flight = gsap.timeline({ paused: true });
      // Mobile: the slot logo hides the instant the flight takes off so
      // every play hides it and every full reverse restores it — never two
      // icons at once.
      if (slotImgRef.current && isMobile) {
        flight.set(slotImgRef.current, { autoAlpha: 0 }, 0);
      }
      flight.to(
        logoRef.current,
        {
          x: flyX,
          y: flyY,
          scale: flyScale,
          transformOrigin: "center center",
          duration: 0.95,
        },
        0
      );
      // …lands on the navbar logo, fades out as the navbar logo fades in
      flight.to(logoRef.current, { opacity: 0, duration: 0.35, ease: "power1.out" }, 1.1);
      if (headerLogo) {
        flight.to(headerLogo, { opacity: 1, duration: 0.4, ease: "power1.inOut" }, 1.25);
      }

      /* Takeoff is the exact instant the title/tagline fade completes
         (their fade ends at timeline time 0.5) — the logo rises together
         with the text leaving, never while it is still visible.
         Landing uses the same boundary in reverse: the moment the text
         STARTS showing again, the logo comes down with it.
         renderHero triggers both (see FLIGHT_AT/FLIGHT_BACK_AT). */
      const FLIGHT_AT = 0.5 / (tl.duration() || 1);
      const FLIGHT_BACK_AT = FLIGHT_AT;

      gsap.set(familyRef.current, { left: "50%", xPercent: -50 });

      /* First stepped heading — arrives one scroll after the shrink settles */
      const tlFB = gsap.timeline({ paused: true });
      tlFB.fromTo(
        familyRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0
      );

      /* ── Phase 2 (2nd scroll): heading rises & left-aligns with the video,
         the video dips down, "Legacy For" slides into the gap ── */
      const tl2 = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut" },
      });

      const GAP_TEXT = () => (isMobile ? rootPx() * 0.5 : rootPx() * 0.25);
      const GAP_VIDEO = () => (isMobile ? rootPx() * 0.75 : rootPx() * 2.5);
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

      const videoLeftEdge = isMobile ? "15vw" : "33.3vw";
      tl2.to(
        familyRef.current,
        {
          left: videoLeftEdge,
          xPercent: 0,
          y: () => -metrics().rise,
          duration: 1.1,
        },
        0
      );
      tl2.to(videoWrapRef.current, { y: () => metrics().drop, duration: 1.1 }, 0);
      tl2.set(legacyRef.current, { top: () => metrics().lfTop }, 0);
      tl2.fromTo(
        legacyRef.current,
        { x: "70vw", autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1.3, ease: "power3.out" },
        0.3
      );

      /* ── Phase 3 (3rd scroll): "More Then 130 Years" rises from below ── */
      const tl3 = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut" },
      });
      gsap.set(moreRef.current, { left: "50%", xPercent: -50 });
      tl3.set(
        moreRef.current,
        {
          top: () =>
            (videoWrapRef.current?.getBoundingClientRect().bottom ?? 0) +
            (isMobile ? rootPx() * 0.75 : GAP_VIDEO()),
        },
        0
      );
      tl3.fromTo(
        moreRef.current,
        { y: 90, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" },
        0.5
      );

      /* ── Phase 4 — the IntroSection, scrubbed exactly like the hero
         shrink: same scroll system, same follow speed/smoothness — but
         instead of shrinking, the section RISES UP from below the
         viewport while the navbar logo flies down onto it ── */
      const intro = document.getElementById("intro-section");

      // Pin the intro over the hero in exactly the geometry it has in normal
      // flow below the navbar, so the later fixed→flow swap is pixel-perfect
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
      const releaseIntro = () => {
        if (!intro) return;
        gsap.set(intro, {
          clearProps:
            "position,top,left,width,zIndex,transform,filter,opacity,visibility",
        });
        intro.style.clipPath = "";
      };
      // Scroll position where the released intro sits below the navbar
      const introTopY = () => (intro ? intro.offsetTop - headerH() : 0);

      const tl4 = gsap.timeline({ paused: true });
      if (intro) {
        /* Rise from below — the section starts one viewport below its
           pinned slot and slides up into it, scrubbed 1:1 with the
           scroll distance exactly like the phase-1 shrink. */
        tl4.fromTo(
          intro,
          { y: () => window.innerHeight },
          { y: 0, duration: 1.3, ease: "power2.inOut" },
          0
        );
      }

      /* Logo handoff to the intro — mirror of the hero→navbar flight:
         its own time-based timeline that plays in one smooth self-playing
         go and reverses on the way back — never scrubbed pixel-by-pixel
         (renderIntro triggers it, see copyInView). */
      const introFlight = gsap.timeline({ paused: true });
      const introLogo = document.getElementById("intro-logo");
      if (intro && introLogo && headerLogo && introFlyRef.current) {
        /* The intro logo's FINAL resting geometry — offset-based, so the
           measurements stay correct even while the section is still
           sliding up (live rects would include the mid-slide offset).
           Accumulate through the whole positioned-ancestor chain up to
           the pinned section: intro-logo has a positioned wrapper in
           between, so a bare .offsetLeft/.offsetTop would measure
           against that wrapper and the flight would land off-target. */
        const offIn = (el: HTMLElement) => {
          let x = 0;
          let y = 0;
          let cur: HTMLElement | null = el;
          while (cur && cur !== intro) {
            x += cur.offsetLeft;
            y += cur.offsetTop;
            cur = cur.offsetParent as HTMLElement | null;
          }
          return { x, y };
        };
        const iW = () => introLogo.offsetWidth;
        const iH = () => introLogo.offsetHeight;
        const iCX = () => offIn(introLogo).x + iW() / 2;
        const iCY = () => headerH() + offIn(introLogo).y + iH() / 2;
        const nRect = () => headerLogo.getBoundingClientRect();
        const dX = () => nRect().left + nRect().width / 2 - iCX();
        const dY = () => nRect().top + nRect().height / 2 - iCY();
        // Scale to the navbar logo's *visible* height — the img is
        // object-contain, so on desktop it letterboxes and renders shorter
        // than its box; matching the box would pop at the handoff.
        const dScale = () =>
          Math.min(nRect().height, nRect().width / LOGO_ASPECT) /
          Math.max(iH(), 1);

        introFlight.set(
          introFlyRef.current,
          {
            left: () => offIn(introLogo).x,
            top: () => headerH() + offIn(introLogo).y,
            width: iW,
            height: iH,
            x: dX,
            y: dY,
            scale: dScale,
            transformOrigin: "center center",
          },
          0
        );
        introFlight.set(introFlyRef.current, { autoAlpha: 1 }, 0.02);
        introFlight.set(flyDarkRef.current, { opacity: 1 }, 0.02);
        introFlight.set(flyMixedRef.current, { opacity: 0 }, 0.02);
        introFlight.set(headerLogo, { opacity: 0 }, 0.02);
        introFlight.set(introLogo, { autoAlpha: 0 }, 0.02);
        introFlight.to(
          introFlyRef.current,
          {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.95,
            /* The descent takes off mid-rise, so the section is still
               climbing while the logo flies down. Add the section's
               current rise to the landing position, ramping the
               compensation in with the flight's own progress — zero at
               takeoff (the navbar departure stays exact), full at
               landing, so the logo touches down exactly ON the intro
               logo wherever the section happens to be, and the 0.97
               handoff swaps with no jump. On reverse the same ramp
               lifts the takeoff off the section's live position. */
            modifiers: {
              y: (y) =>
                `${
                  parseFloat(y) +
                  (gsap.getProperty(intro, "y") as number) *
                    introFlight.progress()
                }px`,
            },
          },
          0.02
        );
        // The colour follows the background: black over the white navbar,
        // white once the descent carries it onto the dark intro
        introFlight.to(
          flyDarkRef.current,
          { opacity: 0, duration: 0.5, ease: "power1.inOut" },
          0.45
        );
        introFlight.to(
          flyMixedRef.current,
          { opacity: 1, duration: 0.5, ease: "power1.inOut" },
          0.45
        );
        // …lands on the intro logo and hands over
        introFlight.set(introFlyRef.current, { autoAlpha: 0 }, 0.97);
        introFlight.set(introLogo, { autoAlpha: 1 }, 0.97);
      }

      /* While the logo flies down, the intro's paragraph and About Us button
         rise from the bottom — same duration, same ease, landing together */
      const introCopy = document.getElementById("intro-copy");

      /* The descent boundary is GEOMETRY, not progress: the flight takes
         off the instant the paragraph's top edge enters the viewport from
         below, and reverses the instant it leaves again. Measured live —
         during the scrub the rect already reflects the section's current
         rise. renderIntro triggers the flight from it. */
      const copyInView = () => {
        const r = introCopy?.getBoundingClientRect();
        return r ? r.top <= window.innerHeight : false;
      };
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

      // Let the Header mirror its "scrolled" style while the page can't scroll
      const syncHeader = (active: boolean) =>
        window.dispatchEvent(new CustomEvent("hero-phase", { detail: active }));

      /* Hand the page over to the browser. SectionReveal waits for this flag
         before arming its ScrollTriggers — pinning the intro takes a full
         screen out of the flow, so triggers created earlier would measure
         against the wrong document height and fire behind the overlay. */
      const enableNative = () => {
        document.documentElement.dataset.asgTestNative = "1";
        window.dispatchEvent(new Event("asg-test-native"));
      };
      const disableNative = () => {
        delete document.documentElement.dataset.asgTestNative;
      };

      // Mobile: restore the slot logo once the timeline is fully reversed
      const restoreSlotLogo = () => {
        if (slotImgRef.current && isMobile) {
          gsap.set(slotImgRef.current, { autoAlpha: 1 });
          placeLogo();
        }
      };

      const noop = () => {};
      const transitions: {
        tl: gsap.core.Timeline;
        enter: (fromAbove: boolean) => void;
        land: () => void;
        landBack: () => void;
      }[] = [
        { tl: tlFB, enter: noop, land: noop, landBack: noop },
        { tl: tl2, enter: noop, land: noop, landBack: noop },
        { tl: tl3, enter: noop, land: noop, landBack: noop },
      ];

      /* ── The intro curtain as a continuous scrub ──
         tl4 is driven straight from the raw scroll distance: REVEAL_PX of
         wheel or finger travel equals the full curtain, so the section opens
         by exactly as much as the user scrolls and closes by exactly as much
         on the way back — no snapping to a whole step.
           "closed"    — phase 3 is resting, the intro waits in flow
           "scrubbing" — pinned over the hero, mid-reveal
           "open"      — settled in flow, the browser owns the scroll */
      /* Hero shrink scrub state — mirrors the intro curtain below:
           "idle"      — untouched full-bleed hero
           "scrubbing" — mid-shrink, pinned to the scroll distance
           "done"      — shrink settled, the stepper owns the headings */
      let heroState: "idle" | "scrubbing" | "done" = "idle";
      let heroPos = 0; // progress painted on tl, smoothed
      let heroTarget = 0; // progress the scroll has asked for

      let introState: "closed" | "scrubbing" | "open" = "closed";
      let introPos = 0; // progress painted on tl4, smoothed
      let introTarget = 0; // progress the scroll has asked for
      /* REVEAL_PX of wheel/finger travel equals the full reveal — a generous
         multiple of the viewport, so the section creeps up a little at a time.
         The painted progress trails the scroll target by a constant fraction
         per frame (SMOOTH), which is what softens the motion; because the
         fraction never changes, the rate is identical in both directions — no
         slow-in or fast reversal. */
      const REVEAL_PX = () => Math.max(window.innerHeight * 2.8, 2000);
      const SMOOTH = 0.22;

      /* Paint the shrink and settle the state at either end: "done" hands
         the page to the stepper, "idle" gives it back to the untouched hero
         (restoring the header style and, on mobile, the slot logo). */
      const renderHero = () => {
        tl.progress(heroPos);
        /* The logo takes off the exact instant the title/tagline fade
           completes and comes back down the instant they start showing
           again — each in one smooth self-playing transition. Guards stop
           play()/reverse() from retriggering once the flight has settled
           at either end. */
        if (heroPos >= FLIGHT_AT) {
          if (flight.progress() < 1 && (!flight.isActive() || flight.reversed()))
            flight.play();
        } else if (
          heroPos <= FLIGHT_BACK_AT &&
          flight.progress() > 0 &&
          (!flight.isActive() || !flight.reversed())
        ) {
          flight.reverse();
        }
        if (heroState !== "scrubbing") return;
        if (heroPos >= 0.999) {
          heroPos = 1;
          heroTarget = 1;
          tl.progress(1);
          heroState = "done";
          /* The shrink can settle MID-gesture (trackpad stream / inertia
             tail) — the rest of that gesture would then die inside the
             swallow window and the user's "next scroll" does nothing.
             Reset the wheel tracker so the very next scroll is a fresh
             gesture and "Family Business" starts on it immediately. */
          resetWheelIntentRef.current();
        } else if (heroPos <= 0.001) {
          heroPos = 0;
          heroTarget = 0;
          tl.progress(0);
          heroState = "idle";
          // Set scrolled=false FIRST (while GSAP inline styles still hold
          // the transparent background), then clear inline styles — so the
          // CSS class never flashes white for a frame.
          syncHeader(false);
          // If the flight is still reversing home, its own position-0 set
          // restores the slot logo on landing — restoring here too would
          // flash two icons at once. Only restore immediately when the
          // flight is already fully back.
          if (!flight.isActive() && flight.progress() === 0) restoreSlotLogo();
        }
      };

      /* Paint the current position and settle the state at either end. Called
         from the ticker, so the open/closed handoff happens the instant the
         painted progress — not the raw target — reaches the boundary. */
      const renderIntro = () => {
        tl4.progress(introPos);
        /* Mirror of the hero flight: the navbar logo descends onto the
           intro the instant the paragraph enters the viewport, and climbs
           back the instant it leaves again — each in one smooth
           self-playing transition. Guards stop play()/reverse() from
           retriggering once the flight has settled at either end. */
        if (copyInView()) {
          if (
            introFlight.progress() < 1 &&
            (!introFlight.isActive() || introFlight.reversed())
          )
            introFlight.play();
        } else if (
          introFlight.progress() > 0 &&
          (!introFlight.isActive() || !introFlight.reversed())
        ) {
          introFlight.reverse();
        }
        if (introState !== "scrubbing") return;
        if (introPos >= 0.999) {
          introPos = 1;
          introTarget = 1;
          tl4.progress(1);
          /* Swap the pinned overlay for the real in-flow section — same
             visual frame — then native scrolling owns the page. The browser
             can finish that layout a frame later, so the anchor is applied
             again on the next frame. */
          releaseIntro();
          gsap.set(intro, { autoAlpha: 1 });
          controlledScrollTo(introTopY());
          requestAnimationFrame(() => controlledScrollTo(introTopY()));
          syncHeader(false);
          enableNative();
          introState = "open";
        } else if (introPos <= 0.001) {
          introPos = 0;
          introTarget = 0;
          tl4.progress(0);
          releaseIntro();
          disableNative();
          introState = "closed";
        }
        syncTouchLock();
      };

      /* Glide the painted progress toward the scroll target by the same
         fraction every frame — a constant-rate follow, so it reads smooth
         without ever speeding up on a reversal. FOLLOW_MIN is a per-frame
         movement floor: with a tiny gap the fraction alone produces almost
         nothing, which read as a dead delay at the start of a scroll — the
         floor guarantees motion from the very first frame. One follower
         drives both the hero shrink and the intro curtain. */
      const FOLLOW_MIN = 0.001; // progress/frame floor — kills the slow start
      const glide = (pos: number, target: number): number => {
        const diff = target - pos;
        if (Math.abs(diff) < 0.0004) return target;
        const step = Math.max(Math.abs(diff) * SMOOTH, FOLLOW_MIN);
        return Math.abs(diff) <= step ? target : pos + Math.sign(diff) * step;
      };
      const followTick = () => {
        if (heroState === "scrubbing") {
          const next = glide(heroPos, heroTarget);
          if (next !== heroPos) {
            heroPos = next;
            renderHero();
          }
        }
        if (introState === "scrubbing") {
          const next = glide(introPos, introTarget);
          if (next !== introPos) {
            introPos = next;
            renderIntro();
          }
        }
      };
      gsap.ticker.add(followTick);

      const scrubHero = (deltaPx: number): boolean => {
        const dir = Math.sign(deltaPx);
        if (!dir) return false;

        if (heroState === "done") {
          if (dir > 0) return false; // stepper owns the headings onwards
          if (stepper.stepRef.current !== 0) return false; // headings reversing
          /* Scrolling back up through the settled shrink re-arms the scrub */
          heroState = "scrubbing";
          heroPos = 1;
          heroTarget = 1;
        } else if (heroState === "idle") {
          if (dir < 0) return false; // nothing above the hero
          heroState = "scrubbing";
          syncHeader(true);
        }
        if (heroState !== "scrubbing") return false;

        /* The scroll has already asked for the full shrink — while the
           painted glide is still settling, hand further downward input to
           the stepper so "Family Business" starts on the very next scroll
           instead of dying inside the settling glide. */
        if (dir > 0 && heroTarget >= 1) return false;

        heroTarget = gsap.utils.clamp(0, 1, heroTarget + deltaPx / REVEAL_PX());
        /* The very event that completes the shrink resets the wheel tracker:
           the gesture that finished it leaves a swallow/cooldown window
           behind, and a scroll landing before the glide settles would die
           inside that window — one dead scroll before the headings could
           start. Resetting here makes the next scroll a fresh gesture. */
        if (heroTarget >= 1) resetWheelIntentRef.current();
        return true;
      };

      const scrubIntro = (deltaPx: number): boolean => {
        if (!intro) return false;
        // Only the boundary above the intro scrubs — the earlier phases stay
        // gesture-stepped exactly like the live site. `atLastGoal` lets the
        // scrub claim the input even while the phase-3 landing glide is still
        // in flight, so the first scroll past the stepper moves the curtain
        // immediately instead of dying inside the chase.
        if (
          stepper.stepRef.current !== TRANSITION_COUNT &&
          !stepper.atLastGoal.current()
        )
          return false;
        const dir = Math.sign(deltaPx);
        if (!dir) return false;

        if (introState === "open") {
          if (dir > 0) return false; // native scroll onwards
          const anchor = introTopY();
          if (window.scrollY > anchor + 4) return false; // still deep in the page
          if (window.scrollY < anchor - 1) controlledScrollTo(anchor);
          /* Re-pin over the hero: the page drops silently to the top behind
             the pinned intro, so the visible frame never jumps. */
          fixIntro();
          controlledScrollTo(0);
          syncHeader(true);
          disableNative();
          introState = "scrubbing";
          introPos = 1;
          introTarget = 1;
        } else if (introState === "closed") {
          if (dir < 0) return false; // hand back, so the stepper reverses phase 3
          fixIntro();
          // The section rises with an empty logo slot — the logo only
          // appears once the flight lands on it (see copyInView)
          if (introLogo) gsap.set(introLogo, { autoAlpha: 0 });
          tl4.invalidate(); // re-measure the rise for the current viewport
          introFlight.invalidate(); // …and the flight's handoff geometry
          introState = "scrubbing";
          introPos = 0;
          introTarget = 0;
          /* The gesture that finished phase 3 leaves a swallow/cooldown
             window behind — clear the wheel tracker so the rise answers
             the very next scroll with no dead travel in between. */
          resetWheelIntentRef.current();
        }

        /* Continuous: the target moves 1:1 with the scroll travel and the
           ticker walks the painted progress up to it a little at a time. */
        introTarget = gsap.utils.clamp(0, 1, introTarget + deltaPx / REVEAL_PX());
        return true;
      };
      onScrubRef.current = (deltaPx) => scrubHero(deltaPx) || scrubIntro(deltaPx);

      /* Pace reference per phase — the stepper stretches each designed
         duration by the same TEMPO the main site uses, so matching the
         main site's phase lengths here matches its speed/smoothness.
         "Family Business" lives inside the main site's 1.65s phase-1
         timeline (shrink + heading); here it is its own 0.6s timeline,
         which would play ~2.75× faster — override its pace reference to
         the main site's phase length so it arrives at the same speed. */
      durationsRef.current = transitions.map((t, i) =>
        i === 0 ? 1.65 : t.tl.duration() || 1
      );
      onProgressRef.current = (i, p) => transitions[i].tl.progress(p);
      onStageRef.current = (i, fromAbove) => transitions[i].enter(fromAbove);
      onLandRef.current = (i) => {
        transitions[i].land();
        syncTouchLock();
      };
      onLandBackRef.current = (i) => {
        transitions[i].landBack();
        syncTouchLock();
      };

      /* ── Mobile touch parity ──
         Touch panning cannot be canceled once the browser owns it, so the
         lock keeps it out of the way for every stepper phase and for the
         intro scrub, and releases once the intro is settled in flow, where
         the page scrolls natively. */
      function syncTouchLock() {
        document.documentElement.classList.toggle(
          "asg-touch-lock",
          introState !== "open"
        );
      }
      syncTouchLock();

      const atTop = () => window.scrollY <= SCROLL_TOP_THRESHOLD;

      /* ── Gesture routing (wheel + keyboard + touch) ──
         Steps 0–2 hold the page at the very top and answer every gesture.
         Step 3 is the intro boundary, which the scrub above owns — so a
         gesture reaching here at that step is either an upward reversal of
         phase 3 or a scroll past the settled intro, which the browser keeps. */
      const routeGesture = (dir: number, fire: boolean): boolean => {
        if (!dir) return false;

        // The scrub declined it: the intro is settled and the page is the
        // browser's from here on
        if (introState === "open") return false;

        /* Mobile reload race — a finger landing before hydration pans the
           page natively (no touch lock yet) and leaves the stepper awake
           away from the top, where gestures fall through forever. The
           opening phases always hold the top, so snap back and answer. */
        if (isMobile && !atTop()) {
          window.scrollTo({ top: 0, behavior: "auto" });
        }

        if (!atTop()) return false;

        if (dir > 0) {
          if (fire) stepper.advanceRef.current(1);
          return true;
        }
        if (dir < 0 && stepper.stepRef.current > 0) {
          if (fire) stepper.advanceRef.current(-1);
          return true;
        }
        return false;
      };

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

      // Keep the flying logo glued to its slot before the sequence starts —
      // on viewport resize AND whenever the Header's async --header-height
      // publish shifts the hero's centered content (that shift is what makes
      // the logo visibly jump on refresh if the slot is not re-measured)
      const onResize = () => {
        if (heroState === "idle") placeLogo();
      };
      const headerEl = document.querySelector("header");
      const headerWatcher = headerEl ? new ResizeObserver(onResize) : null;
      if (headerEl && headerWatcher) headerWatcher.observe(headerEl);
      // One extra frame-late re-place: layout keeps settling right after the
      // effect runs (header height publish, image decode)
      const rePlaceRaf = requestAnimationFrame(() => {
        if (heroState === "idle") placeLogo();
      });

      /* After the handoff the navbar centre is empty — the intro carries the
         logo. Bring the navbar logo back once the intro has scrolled up past
         the header, and hide it again when the intro returns. */
      let navLogoBack = false;
      const onScroll = () => {
        syncTouchLock();
        if (!headerLogo) return;
        if (introState !== "open") return;
        if (stepper.sweeping.current()) return;
        const show = intro
          ? intro.getBoundingClientRect().bottom <= headerH() + 8
          : true;
        if (show !== navLogoBack) {
          navLogoBack = show;
          gsap.to(headerLogo, {
            opacity: show ? 1 : 0,
            duration: 0.3,
            overwrite: "auto",
          });
        }
      };

      // Mobile reload race: a scroll started while hydrating beats page.tsx's
      // scroll reset — re-seat at the top so the stepper starts clean.
      if (isMobile && window.scrollY > SCROLL_TOP_THRESHOLD) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }

      window.addEventListener("resize", onResize);
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        document.documentElement.classList.remove("asg-touch-lock");
        gsap.ticker.remove(followTick);
        flight.kill();
        introFlight.kill();
        disableNative();
        releaseIntro();
        if (headerLogo) gsap.set(headerLogo, { clearProps: "opacity" });
        headerWatcher?.disconnect();
        cancelAnimationFrame(rePlaceRaf);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);
      };
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full h-[var(--vh)] lg:h-screen overflow-hidden bg-white"
      >
        {/* Video wrapper — shrinks from full-bleed to a centered card on scroll */}
        <div ref={videoWrapRef} className="absolute inset-0 overflow-hidden">
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
          className="absolute top-[20%] z-20 font-test-tiempos-fine text-[2rem] sm:text-[2.5rem] lg:text-[4.0625rem] leading-10 sm:leading-12 lg:leading-20 text-[var(--primary-black)] whitespace-nowrap opacity-0"
        >
          Family Business
        </h2>

        {/* "Legacy For" — slides in from the right on the 2nd scroll */}
        <h2
          ref={legacyRef}
          className="absolute top-[24%] right-[15vw] sm:right-[25vw] lg:right-[33.3vw] z-20 font-test-tiempos-fine text-[2rem] sm:text-[2.5rem] lg:text-[4.0625rem] leading-10 sm:leading-12 lg:leading-16 text-[var(--primary-black)] whitespace-nowrap opacity-0"
        >
          Legacy For
        </h2>

        {/* "More Then 130 Years" — rises from below the video on the 3rd scroll */}
        <h2
          ref={moreRef}
          className="absolute top-[60%] z-20 font-test-tiempos-fine text-[2rem] sm:text-[2.5rem] lg:text-[4.0625rem] leading-10 sm:leading-12 lg:leading-16 text-[var(--primary-black)] whitespace-nowrap opacity-0"
        >
          More Then 130 Years
        </h2>

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          {/* Logo — static on mobile, flying logo covers this slot on desktop */}
          <div
            ref={logoSlotRef}
            className="mb-4 lg:mb-6 w-[4.5rem] h-[3.75rem] sm:w-[6rem] sm:h-[5rem] lg:w-[8.125rem] lg:h-[6.875rem] flex items-center justify-center"
          >
            <Image
              ref={slotImgRef}
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

            {/* Mobile-only auto-scrolling tagline marquee */}
            <div className="lg:hidden w-full px-4">
              <div className="w-full overflow-hidden">
                <div
                  className="whitespace-nowrap inline-flex"
                  style={{ animation: "marquee-third 18s linear infinite" }}
                >
                  <span className="font-neue-montreal word-space-4 uppercase tracking-wider text-xs text-white shrink-0 mr-1.5">
                    Textile | RMG | Chemical | Trading | IT | E-Commerce | Real Estate | Finance | Agriculture | 
                  </span>
                  <span className="font-neue-montreal word-space-4 uppercase tracking-wider text-xs text-white shrink-0 mr-1.5">
                    Textile | RMG | Chemical | Trading | IT | E-Commerce | Real Estate | Finance | Agriculture | 
                  </span>
                  <span className="font-neue-montreal word-space-4 uppercase tracking-wider text-xs text-white shrink-0 mr-1.5">
                    Textile | RMG | Chemical | Trading | IT | E-Commerce | Real Estate | Finance | Agriculture | 
                  </span>
                </div>
              </div>
            </div>
            {/* Desktop static tagline */}
            <p className="hidden lg:block text-white font-neue-montreal word-space-4 uppercase tracking-wider max-w-4xl text-xs sm:text-sm lg:text-base">
              Textile | RMG | Chemical | Trading | IT | E-Commerce | Real Estate | Finance | Agriculture
            </p>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div
          ref={hintRef}
          className="absolute bottom-15 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:gap-3 text-white"
        >
          <Image
            src="/icons/mouse-scroll-wheel.gif"
            alt="Scroll down"
            width={28}
            height={38}
            quality={100}
            className="w-[1.6rem] sm:w-[1.375rem] h-[1.6rem] sm:h-[2.375rem] object-contain"
          />
          <span className="text-sm sm:text-base font-neue-montreal font-light uppercase tracking-widest">
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
        className="pointer-events-none invisible fixed left-0 top-0 z-60 w-[4.5rem] h-[3.75rem] sm:w-[6rem] sm:h-[5rem] lg:w-[8.125rem] lg:h-[6.875rem] object-contain"
      />

      {/* Flying intro logo — carries the navbar logo down onto the intro
          section's logo during the curtain reveal. Two stacked variants
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
