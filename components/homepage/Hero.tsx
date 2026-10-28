"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { SquareArrowOutUpRight, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

export interface SisterConcern {
  sector: string;
  sectorDesc: string;
  concernDesc: string;
  logo: string;
  link: string;
}

const sisterConcerns: SisterConcern[] = [
  {
    sector: "TEXTILE",
    sectorDesc: "Trusted as a long-term partner for consistent and brand-match quality, helping them to grow on a global scale.",
    concernDesc: "Consistent, high-quality yarn for reliable textile production.",
    logo: "/logo/sister-concern-update/spinning-mills-clr.png",
    link: "/concerns/hazrat-amanat-shah-spinning-mills",
  },
  {
    sector: "TEXTILE",
    sectorDesc: "Trusted as a long-term partner for consistent and brand-match quality, helping them to grow on a global scale.",
    concernDesc: "Precision weaving and processing for quality woven fabrics.",
    logo: "/logo/sister-concern-update/weaving-clr.png",
    link: "/concerns/amanat-shah-weaving-processing",
  },
  {
    sector: "TEXTILE",
    sectorDesc: "Trusted as a long-term partner for consistent and brand-match quality, helping them to grow on a global scale.",
    concernDesc: "Premium woven fabrics made for global fashion brands.",
    logo: "/logo/sister-concern-update/fabrics-clr.png",
    link: "/concerns/amanat-shah-fabrics",
  },
  {
    sector: "RETAIL",
    sectorDesc: "Spread Amanot Shah Group's own brand helps national and traditional consumers to experience high-end clothing all year long.",
    concernDesc: "Traditional apparel crafted for local and global markets.",
    logo: "/logo/sister-concern-update/helal-brothers-clr.png",
    link: "/concerns/helal-brothers",
  },
  {
    sector: "ECOMMERCE",
    sectorDesc: "Spread Amanot Shah Group's own brand helps national and traditional consumers to experience high-end clothing all year long.",
    concernDesc: "Bangladeshi fashion rooted in heritage and modern style.",
    logo: "/logo/sister-concern-update/miah-clr.png",
    link: "/concerns/miah",
  },


  {
    sector: "APPAREL",
    sectorDesc: "Scale with superior apparel customized to your brand. Create unique market ownership leveraging speed and timely delivery.",
    concernDesc: "High-quality knit fabrics made for global fashion brands.",
    logo: "/logo/sister-concern-update/trust-knitwear-clr.png",
    link: "/concerns/trust-knitwear-industries",
  },
  {
    sector: "FINANCE",
    sectorDesc: "Expand capital market expertise, investment solutions, when supporting clients with trusted financial guidance zeroing in investment mistakes from the beginning.",
    concernDesc: "Trusted investment services for confident capital market decisions.",
    logo: "/logo/sister-concern-update/securities-clr.png",
    link: "/concerns/hazrat-amanat-shah-securities",
  },
  {
    sector: "AGRICULTURE",
    sectorDesc: "Producing premium-quality tea through advanced farming practices adding agricultural heritage with modern cultivation strategies.",
    concernDesc: "Quality tea grown with care, rooted in Bangladesh\u2019s tea heritage.",
    logo: "/logo/sister-concern-update/farm2farm-clr.png",
    link: "/concerns/farm2firm",
  },
  {
    sector: "CHEMICAL",
    sectorDesc: "Deliver best-in-class chemical solutions for industrial manufacturing. Maintain end-to-end global safety compliance across every action.",
    concernDesc: "Reliable chemical solutions for safe and efficient textile production.",
    logo: "/logo/sister-concern-update/tex-solution-clr.png",
    link: "/concerns/amanat-shah-tex-solution",
  },
  {
    sector: "TECHNOLOGY",
    sectorDesc: "Build Enterprise Software, ERP Solutions, and Digital products to equip business for sustainable growth.",
    concernDesc: "ERP, enterprise software and digital business solutions.",
    logo: "/logo/sister-concern-update/asg-dynamic.png",
    link: "/concerns/asg-dynamic",
  },
];

interface HeroProps {
  /** Ref exposing a function to change the Hero's side content (from ASGHighlight) */
  heroSlideChangeRef?: MutableRefObject<((idx: number) => void) | null>;
}

export default function Hero({ heroSlideChangeRef }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [activeConcern, setActiveConcern] = useState(0);
  const activeConcernRef = useRef(0);
  const leftSlideRef = useRef<HTMLDivElement>(null);
  const rightSlideRef = useRef<HTMLDivElement>(null);
  // Mobile-only heading (OUR BUSINESS / AN ECOSYSTEM…) shown above the card.
  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  // Mobile concern sheet block — a static normal-flow block under the
  // collapsed video card. Arrow-driven concerns, never scroll-driven.
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  // Mobile concern content (sector / logo / description) that slides on step.
  const mobileSlideRef = useRef<HTMLDivElement>(null);
  const mobileStepRef = useRef<((dir: number) => void) | null>(null);
  // Mobile sheet: starts collapsed (shows the + button, description hidden);
  // clicking the +/− toggle expands the sector description.
  const [descOpen, setDescOpen] = useState(false);

  useEffect(() => {
    const tickers: Array<() => void> = [];
    const cleanups: Array<() => void> = [];
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        const i = timers.indexOf(id);
        if (i > -1) timers.splice(i, 1);
        fn();
      }, ms);
      timers.push(id);
      return id;
    };
    const dropTimer = (id: ReturnType<typeof setTimeout> | null) => {
      if (!id) return;
      clearTimeout(id);
      const i = timers.indexOf(id);
      if (i > -1) timers.splice(i, 1);
    };
    const ctx = gsap.context(() => {
      // Desktop keeps the scroll-driven video shrink + rising side panels
      // (unchanged). Mobile rises the centre text with the scroll, then plays the
      // video collapse as one smooth time-based animation (like it did before) —
      // the scroll is held at the pin's end until the shrink finishes, then the
      // page hands over to native scroll. The sheet below is arrow-driven.
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      let mobileCollapsed = false;
      // True while the mobile collapse animation is mid-flight — the scroll is
      // held at the pin's end until the video has fully shrunk.
      let collapseRunning = false;

      // Mobile collapsed-card geometry: the video keeps its ORIGINAL portrait
      // size (width-driven), sitting right under the heading with no gap above.
      // cardBottom feeds syncSheet() so the concern block hugs the video's
      // bottom edge too. Mobile only — desktop never calls this.
      const mobileCardGeom = () => {
        const rect = sectionRef.current?.getBoundingClientRect();
        const sectionH = rect?.height || window.innerHeight;
        const sectionW = rect?.width || window.innerWidth;
        const sideMargin = 16; // matches px-4 (1rem) on each side
        const cardW = sectionW - sideMargin * 2;
        const cardH = cardW * 1.11; // fully-shrunk height
        // Top edge hugs the heading's measured bottom (+ a small breathing gap).
        const header = mobileHeaderRef.current;
        const headerBottom = header
          ? header.offsetTop + header.offsetHeight
          : sectionH * 0.28;
        const topPx = headerBottom + sideMargin;
        const cardBottom = topPx + cardH;
        const centerPx = topPx + cardH / 2;
        return {
          wPct: (cardW / sectionW) * 100,
          hPct: (cardH / sectionH) * 100,
          topPct: (centerPx / sectionH) * 100,
          cardBottom,
          sectionH,
        };
      };

      // The section keeps full viewport height for the video intro, so after the
      // card shrinks there is a band of empty section below it. Pull the flow
      // sheet up with a negative margin so it rests ~8px under the card. The
      // value comes from the stable 100lvh section box, so it never shifts while
      // the URL bar shows/hides (no bounce). Mobile only.
      const syncSheet = () => {
        if (isDesktop) return;
        const sheet = mobileSheetRef.current;
        if (!sheet) return;
        const g = mobileCardGeom();
        gsap.set(sheet, { marginTop: g.cardBottom + 8 - g.sectionH });
      };

      // Video wrapper: centered, full-size
      gsap.set(videoWrapRef.current, {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "100%",
        height: "100%",
      });

      // Side content: hidden until revealed
      if (isDesktop) {
        gsap.set(leftContentRef.current, { y: "100vh", opacity: 0 });
        gsap.set(rightContentRef.current, { y: "100vh", opacity: 0 });
      } else {
        gsap.set([leftContentRef.current, rightContentRef.current], { y: 0, opacity: 0 });
        // The concern sheet starts hidden and rises up into place with the
        // collapse; it is pulled up under the card by syncSheet() (a fixed
        // margin from the stable section box, so it never bobs while scrolling).
        // Header + sheet are kept hidden here; animate.css drives their
        // slide+fade enter/exit once the video collapses.
        gsap.set(mobileHeaderRef.current, { autoAlpha: 0 });
        gsap.set(mobileSheetRef.current, { autoAlpha: 0 });
        syncSheet();
      }

      // Center text: visible at natural position
      gsap.set(textRef.current, { y: 0, opacity: 1 });

      const videoEnd = 0.30;   // video fully shrunk at 7th scroll
      const PER_SCROLL = videoEnd / 7; // ≈ 0.042857 progress per scroll
      const sideStart = PER_SCROLL * 2; // side content starts at exact 2nd scroll
      const sideEnd = 0.55; // side content fully risen (wide = slow)
      // The card keeps gliding past the 7th scroll until here, so it is still
      // settling as the panels land — the intro reads as one continuous motion
      // instead of a shrink that stops dead followed by a rise.
      const videoGone = 0.40;

      // Follow strength per 60fps frame. The lerp below is made frame-rate
      // independent (see tick) so a 120/144Hz display settles at the same speed
      // as 60Hz instead of double-firing — that uneven settle was the flutter.
      // Lower = silkier/slower follow, higher = snappier.
      const SMOOTH = 0.1;
      // clearly visible from the 4th scroll) then decelerates smoothly to rest.
      const sideEase = gsap.parseEase("power2.out");
      // The video shrink rides the same decelerating curve, so it eases into its
      // resting size instead of hitting the clamp at constant speed.
      const videoEase = gsap.parseEase("power2.out");
      let targetProgress = 0;
      let scrollProgress = 0; // smoothed progress used everywhere

      // ── Side content: one concern per scroll ───────────────────────────────
      // One deliberate scroll — a mouse notch, or a trackpad push of the same
      // weight — moves the panels exactly one concern. The deltas accumulate
      // while the input keeps coming, pulling ten notches at once never plays ten
      // changes, and the change lands where the scrolling stopped. Every concern
      // then holds for 0.4s.
      const LAST_IDX = sisterConcerns.length - 1;
      const STEP_MS = 400;          // a concern stays shown for at least 0.4s
      const GESTURE_IDLE_MS = 160;  // this quiet gap ends the current scroll gesture

      // ── Same stepping on every OS ─────────────────────────────────────────
      // Hardware is measured in TRAVEL, never in event timing. A Windows mouse
      // wheel fires a handful of big deltas (≈100px per notch in Chrome, whole
      // lines in Firefox) and stops dead once the event is canceled. A Mac
      // trackpad fires a dense stream of tiny deltas that keeps flowing while the
      // finger moves and for roughly a second after it lifts — Safari drags
      // scrollY along even though every one of those events was canceled.
      // Waiting only for the burst to go quiet therefore stalls on a trackpad (a
      // continuous push never goes quiet, so no step plays while the pin holds),
      // and the leftover inertia then reads as extra scrolls and doubles the
      // steps. So one notch is one notch either way: a big single delta is a
      // notch by itself, a stream of small ones steps once enough of them add up
      // to a notch of travel.
      const WHEEL_NOTCH_PX = 100;    // one mouse notch ≈ 100px of native scroll
      const TRACKPAD_NOTCH_PX = 280; // a deliberate trackpad push, in px
      const STRONG_DELTA = 50;       // one delta this big is already a wheel notch
      const IDLE_NOTCH_PX = 24;      // a wheel burst that went quiet steps at this much
      const INERTIA_QUIET_MS = 260;  // input quieter than this is not a real scroll
      let trackpad = false;          // dense sub-notch stream seen → Mac-style input
      let notchPx = WHEEL_NOTCH_PX;  // travel that buys one step, on this hardware
      let lastDeltaAt = 0;           // when the last wheel event arrived
      let peakDelta = 0;             // hardest push of the current burst

      let busy = false;             // a step transition or its hold is running
      let lastStepAt = 0;           // when the current step began (0 = never)
      let pendingDir = 0;           // at most one step waits for the current one
      let gestureSum = 0;
      let gestureTimer: ReturnType<typeof setTimeout> | null = null;
      let cadenceTimer: ReturnType<typeof setTimeout> | null = null;
      let wheelSeen = false;        // wheel device → gesture stepping, else position

      // Concern band on the scroll timeline — used only by the wheel-less
      // fallback (touch, keyboard, scrollbar drag send no wheel events).
      const concernStart = sideEnd;
      const segLen = (1 - concernStart) / sisterConcerns.length;
      const idxFromProgress = (p: number) =>
        p > concernStart
          ? Math.min(LAST_IDX, Math.floor((p - concernStart) / segLen))
          : 0;

      // Slide transition for sector/desc when switching concerns.
      // direction: 1 = forward (scroll down) → out-top, in-from-bottom
      //           -1 = backward (scroll up)  → out-bottom, in-from-top
      const runSlide = (idx: number, done: () => void, direction: 1 | -1 = 1) => {
        const panelEls = [leftSlideRef.current, rightSlideRef.current].filter(Boolean);
        const mobileEls = [mobileSlideRef.current].filter(Boolean);
        if (panelEls.length === 0 && mobileEls.length === 0) {
          activeConcernRef.current = idx;
          setActiveConcern(idx);
          done();
          return;
        }
        // Desktop side panels glide vertically; the mobile sheet's content slides
        // in from the side. The arrow buttons live outside mobileSlideRef, so they
        // stay put while the content below them changes.
        const outY = direction === 1 ? "-40px" : "40px";
        const inY = direction === 1 ? "40px" : "-40px";
        const outX = direction === 1 ? "-40px" : "40px";
        const inX = direction === 1 ? "40px" : "-40px";
        const leave = gsap.timeline({
          onComplete: () => {
            activeConcernRef.current = idx;
            setActiveConcern(idx);
            requestAnimationFrame(() => {
              gsap.set(panelEls, { y: inY });
              gsap.set(mobileEls, { x: inX });
              const enter = gsap.timeline({ onComplete: done });
              if (panelEls.length)
                enter.to(panelEls, { y: 0, opacity: 1, duration: 0.18, ease: "power3.out" }, 0);
              if (mobileEls.length)
                enter.to(mobileEls, { x: 0, opacity: 1, duration: 0.18, ease: "power3.out" }, 0);
            });
          },
        });
        if (panelEls.length)
          leave.to(panelEls, { y: outY, opacity: 0, duration: 0.18, ease: "power3.in" }, 0);
        if (mobileEls.length)
          leave.to(mobileEls, { x: outX, opacity: 0, duration: 0.18, ease: "power3.in" }, 0);
      };

      let st: ScrollTrigger | null = null;

      // When the Hero's pin is left downward (scrolling past it), set to true.
      // This blocks ASGHighlight from changing the Hero's concern while it's
      // off-screen, so re-entering the pin from below shows the exact concern
      // the user last saw — no flicker of concern 0.
      let pinLeft = false;

      // Where the scroll waits: at the point the side panels finish rising until
      // every concern has been shown, then at the very bottom of the pin — so the
      // next pixel of downward travel hands the page to the next section at once.
      // Nothing visual changes between those two points, so moving along the band
      // is invisible.
      const bandStart = () => st!.start + (st!.end - st!.start) * sideEnd + 1;
      const holdY = () =>
        activeConcernRef.current === LAST_IDX ? st!.end - 1 : bandStart();
      const park = () => {
        const y = holdY();
        if (Math.abs(window.scrollY - y) > 1) window.scrollTo(0, y);
      };

      // Play the waiting step once the current concern has had its turn.
      const stepNow = () => {
        dropTimer(cadenceTimer);
        cadenceTimer = null;
        if (pendingDir === 0) return;
        const wait = STEP_MS - (performance.now() - lastStepAt);
        if (wait > 0) {
          cadenceTimer = later(stepNow, wait);
          return;
        }
        const dir = pendingDir;
        pendingDir = 0;
        // Clamp here, not in requestStep: the index can already have moved on
        // while this step waited for its turn, and a stale direction would walk
        // past the last concern into an empty card.
        const next = Math.min(LAST_IDX, Math.max(0, activeConcernRef.current + dir));
        if (next === activeConcernRef.current) return;
        busy = true;
        lastStepAt = performance.now();
        runSlide(next, () => {
          busy = false;
          if (pendingDir !== 0) stepNow();
          // Re-arm the waiting point for the concern that is now up: the last one
          // puts it at the bottom of the pin, so leaving needs no further scroll.
          else if (wheelSeen) park();
        }, dir > 0 ? 1 : -1);
      };

      const requestStep = (dir: number) => {
        const next = activeConcernRef.current + dir;
        if (next < 0 || next > LAST_IDX) return;
        if (pendingDir === dir) return; // another step this way is already waiting
        pendingDir = dir;
        if (!busy) stepNow();
      };

      // Travel is spent in notch-sized chunks. A trackpad has to answer while the
      // finger is still moving — a continuous stream never goes quiet, so only
      // waiting for the idle gap is what left the pin feeling dead on a Mac. A
      // mouse wheel already breathes between notches, so it keeps the rhythm it
      // always had on Windows: one burst, one step, plus whatever the burst
      // summed to once it went quiet (a stray pixel doesn't count as a scroll).
      const addGesture = (dy: number) => {
        gestureSum += dy;
        if (trackpad) {
          while (Math.abs(gestureSum) >= notchPx) {
            const dir = Math.sign(gestureSum);
            gestureSum -= dir * notchPx;
            requestStep(dir);
          }
        }
        dropTimer(gestureTimer);
        gestureTimer = later(() => {
          gestureTimer = null;
          const sum = gestureSum;
          gestureSum = 0;
          peakDelta = 0;
          // A quiet push still owes one step. A trackpad only counts if it was a
          // good half-notch, since the mid-burst loop already spent the rest of it.
          const min = trackpad ? notchPx * 0.5 : IDLE_NOTCH_PX;
          if (Math.abs(sum) >= min) requestStep(Math.sign(sum));
        }, GESTURE_IDLE_MS);
      };

      // Direct set for the moments the panels are hidden (intro, ASGHighlight):
      // no point spending seconds stepping where nothing is visible.
      const setConcern = (idx: number) => {
        if (idx === activeConcernRef.current && !busy) return;
        dropTimer(gestureTimer);
        dropTimer(cadenceTimer);
        gestureTimer = null;
        cadenceTimer = null;
        pendingDir = 0;
        gestureSum = 0;
        peakDelta = 0;
        busy = false;
        const els = [leftSlideRef.current, rightSlideRef.current, mobileSlideRef.current].filter(Boolean);
        gsap.killTweensOf(els);
        gsap.set(els, { x: 0, y: 0, opacity: 1 });
        activeConcernRef.current = idx;
        setActiveConcern(idx);
      };

      // Wheel-less fallback: the concern follows the scroll phase, one slide at a
      // time, exactly the way the section behaved before gesture stepping.
      const moveConcernTo = (idx: number, forceDir?: 1 | -1) => {
        if (busy || idx === activeConcernRef.current) return;
        const direction = forceDir ?? (idx > activeConcernRef.current ? 1 : -1);
        busy = true;
        lastStepAt = performance.now();
        runSlide(idx, () => {
          busy = false;
        }, direction);
      };

      // The mobile sheet's arrow buttons step concerns by hand — the short
      // mobile pin no longer walks them with the scroll phase. Infinite style:
      // next past the last wraps to the first, prev before the first wraps to
      // the last, and the slide direction follows the button pressed.
      mobileStepRef.current = (dir: number) => {
        const d: 1 | -1 = dir > 0 ? 1 : -1;
        const total = LAST_IDX + 1;
        const next = (((activeConcernRef.current + d) % total) + total) % total;
        moveConcernTo(next, d);
      };

      // Scrolls 1-3: text fades equally; scroll 4: fully gone.
      const textStart = 0.0;
      // Desktop keeps 0.2. Mobile's pin is short (66%), so the end is widened to
      // 0.75 to preserve the SAME ~50vh of scroll travel for the rising centre
      // text. The collapse fires at that point; the hold below keeps the release
      // waiting until the shrink animation has finished, then native scroll runs.
      const textEnd = isDesktop ? 0.2 : 0.75;

      // Expose function for ASGHighlight to change side content. While the Hero
      // is off-screen (pinLeft) the concern stays untouched so re-entry shows
      // the last concern the user was looking at.
      if (heroSlideChangeRef) {
        heroSlideChangeRef.current = (idx: number) => {
          if (pinLeft) return;
          setConcern(idx);
        };
      }

      // animate.css-driven enter/exit for the mobile header + concern sheet.
      // GSAP only hides them before the first collapse; the slide + fade motion
      // is delegated to animate.css keyframes (fadeInUp / fadeOutDown / fadeOutUp).
      // animate.css uses `animation-fill-mode: both`, so a delay keeps the element
      // on the 0% frame (hidden) until the video has started shrinking.
      const MOBILE_ANIM_CLASSES = [
        "animate__animated",
        "animate__fadeInUp",
        "animate__fadeOutDown",
        "animate__fadeOutUp",
        "animate__fadeOut",
      ];
      const runMobileAnim = (
        el: HTMLElement | null,
        cls: string,
        delay = 0,
        duration = "1s"
      ) => {
        if (!el) return;
        // Drop GSAP's inline hidden state so the CSS keyframes own the motion.
        gsap.set(el, { clearProps: "opacity,visibility,transform" });
        MOBILE_ANIM_CLASSES.forEach((c) => el.classList.remove(c));
        // Force reflow so re-adding the class restarts the animation.
        void el.offsetWidth;
        el.style.setProperty("--animate-duration", duration);
        el.style.animationDelay = delay ? `${delay}s` : "0s";
        // Gentle ease-out so the content is seen travelling all the way from
        // behind the video instead of snapping into place.
        el.style.animationTimingFunction = "cubic-bezier(0.16, 1, 0.3, 1)";
        el.classList.add("animate__animated", cls);
      };

      // Mobile collapse/expand are driven from the REAL ScrollTrigger progress in
      // onUpdate (not the smoothed `scrollProgress` in tick). On a fast touch
      // scroll the smoothed value lags behind, so a scroll triggered from it could
      // never cross `textEnd` before the pin released — the video then scrolled
      // away un-shrunk and visibly cut. Firing here sets `collapseRunning` in the
      // same frame the real scroll reaches the point, so the hold catches it before
      // the section can leave. Desktop never calls either function.
      const triggerMobileCollapse = () => {
        if (isDesktop || mobileCollapsed) return;
        mobileCollapsed = true;
        // Snap the smoothed value up so the centre text reads fully gone as the
        // video starts shrinking, instead of still mid-rise on a fast scroll.
        if (scrollProgress < textEnd) scrollProgress = textEnd;
        const g = mobileCardGeom();
        collapseRunning = true;
        // Freeze the sheet's resting offset ONCE here, before it fades in. It is
        // never recomputed while scrolling, so the concern block just sits under
        // the card instead of drifting up/down with the scroll.
        syncSheet();
        // Ride ABOVE the fixed header bar (z-50) for the whole animation so its
        // text never bleeds over the shrinking video. Restored below on complete —
        // the settled card sits under the bar, so no overlap once it stops.
        gsap.set(videoWrapRef.current, { zIndex: 60 });
        gsap.to(videoWrapRef.current, {
          width: `${g.wPct}%`,
          height: `${g.hPct}%`,
          top: `${g.topPct}%`,
          borderRadius: 24,
          duration: 1.1,
          ease: "power2.inOut",
          overwrite: "auto",
          onComplete: () => {
            collapseRunning = false;
            gsap.set(videoWrapRef.current, { zIndex: "" });
          },
        });
        // Header + sheet glide up from just below the card into place
        // (animate.css fadeInUp). Slower + delayed so it reads as content emerging
        // from behind the still-shrinking video, not a snap.
        runMobileAnim(mobileHeaderRef.current, "animate__fadeInUp", 0.35, "1.1s");
        runMobileAnim(mobileSheetRef.current, "animate__fadeInUp", 0.35, "1.1s");
      };

      // Reverse: the user scrolled back up past `textEnd`, so grow the video again
      // and glide the header/sheet away behind it.
      const triggerMobileExpand = () => {
        if (isDesktop || !mobileCollapsed) return;
        mobileCollapsed = false;
        collapseRunning = false;
        gsap.set(mobileSheetRef.current, { marginTop: 0 });
        // Same as collapse: stay above the fixed header bar while the video grows
        // back to fullscreen, then drop below it so the bar sits over the hero again.
        gsap.set(videoWrapRef.current, { zIndex: 60 });
        gsap.to(videoWrapRef.current, {
          width: "100%",
          height: "100%",
          top: "50%",
          borderRadius: 0,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(videoWrapRef.current, { zIndex: "" });
          },
        });
        // Header + sheet vanish INSTANTLY, before the video starts growing. The
        // video's top edge sweeps up THROUGH the header (the card sits only ~16px
        // under it), so any header still mid-fade gets wiped bottom-to-top and
        // reads as "sinking into the video". Forcing inline autoAlpha:0 removes it
        // at t=0 so the video grows over empty space — and unlike a CSS fade this
        // is a hard guarantee (no reliance on animate.css fill-mode holding). The
        // next collapse re-shows them: runMobileAnim clears these props first.
        MOBILE_ANIM_CLASSES.forEach((c) => {
          mobileHeaderRef.current?.classList.remove(c);
          mobileSheetRef.current?.classList.remove(c);
        });
        gsap.set(mobileHeaderRef.current, { autoAlpha: 0 });
        gsap.set(mobileSheetRef.current, { autoAlpha: 0 });
      };

      // ── Desktop card geometry ──────────────────────────────────────────────
      // The resting card is measured in whole CSS pixels, not percentages: a
      // fractional width makes the edge, the rounded corners and the object-cover
      // crop re-antialias every frame, which reads as a shake as the shrink
      // settles. Sizes are also only written when a rounded value actually
      // changes, so the ±1px scrollY oscillation from the pin hold repaints
      // nothing at all. The box is re-measured on resize so px stay responsive.
      let cardBoxW = 0;
      let cardBoxH = 0;
      const measureCardBox = () => {
        const rect = sectionRef.current?.getBoundingClientRect();
        cardBoxW = rect?.width || window.innerWidth;
        cardBoxH = rect?.height || window.innerHeight;
      };
      measureCardBox();
      window.addEventListener("resize", measureCardBox);
      cleanups.push(() => window.removeEventListener("resize", measureCardBox));
      let lastCardW = -1;
      let lastCardH = -1;
      let lastCardBr = -1;

      const tick = (_time?: number, delta?: number) => {
        // A ticker frame can slip in after React detaches the refs on unmount
        // but before the cleanup below removes the ticker; gsap.set([null, …])
        // then throws reading `._gsap`. Skip those stray frames.
        if (!sectionRef.current) return;
        // Frame-rate independent smoothing: scale the follow by how long this
        // frame actually took vs a 60fps baseline. A fixed per-frame factor makes
        // high-refresh displays lerp in uneven micro-steps (the flutter); this
        // exponent keeps the settle identical whether the tab runs at 60 or 144Hz.
        const dt = Math.min((delta ?? 16.667) / 16.667, 4);
        const k = 1 - Math.pow(1 - SMOOTH, dt);
        scrollProgress += (targetProgress - scrollProgress) * k;
        // Snap when effectively settled to avoid endless sub-pixel drift
        if (Math.abs(targetProgress - scrollProgress) < 0.0005) {
          scrollProgress = targetProgress;
        }
        const p = scrollProgress;

        // Fades equally across scrolls 1-3, fully gone by scroll 4.
        if (p <= textStart) {
          gsap.set(textRef.current, { y: 0, opacity: 1, scale: 1 });
        } else if (p >= textEnd) {
          gsap.set(textRef.current, { y: "-35vh", opacity: 0, scale: 0.5 });
        } else {
          const t = (p - textStart) / (textEnd - textStart);
          gsap.set(textRef.current, {
            y: `${-35 * t}vh`,
            opacity: 1 - t,
            scale: 1 - 0.5 * t,
          });
        }

        // ── Video + side panels ───────────────────────────────────────────────
        // Desktop: video shrinks and side panels rise purely scroll-driven
        // (unchanged). Mobile: the video collapse/expand is driven from the REAL
        // scroll progress in ScrollTrigger.onUpdate (triggerMobileCollapse /
        // triggerMobileExpand), NOT from this smoothed value — so a fast scroll
        // can't release the pin before the shrink plays. On mobile `tick` only
        // fades the centre text (above); there is nothing else to do here.
        if (isDesktop) {
          // Eased travel into the resting card (23% × 56% of the section box).
          const vt = videoEase(Math.min(p, videoGone) / videoGone);
          const vw = Math.round(cardBoxW * (1 - 0.77 * vt));
          const vh = Math.round(cardBoxH * (1 - 0.44 * vt));
          // Square (0 radius) at full-screen; corners round in only as it shrinks.
          const br = Math.round(28 * vt);
          if (vw !== lastCardW || vh !== lastCardH || br !== lastCardBr) {
            lastCardW = vw;
            lastCardH = vh;
            lastCardBr = br;
            gsap.set(videoWrapRef.current, {
              width: `${vw}px`,
              height: `${vh}px`,
              borderRadius: `${br}px`,
            });
          }

          // Side content rises per scroll (slow) and reverse on scroll up.
          if (p <= sideStart) {
            gsap.set([leftContentRef.current, rightContentRef.current], {
              y: "100vh",
              opacity: 0,
            });
          } else if (p >= sideEnd) {
            gsap.set([leftContentRef.current, rightContentRef.current], {
              y: 0,
              opacity: 1,
            });
          } else {
            const rawT = (p - sideStart) / (sideEnd - sideStart);
            const t = sideEase(rawT);
            gsap.set([leftContentRef.current, rightContentRef.current], {
              y: `${100 * (1 - t)}vh`,
              opacity: t,
            });
          }
        }
      };

      // ── Scroll experience: desktop panels + mobile collapse ──────────────────────────────────
      // Pin the section and drive the video/panels with scroll; step concerns on
      // wheel/scroll gestures (desktop). Mobile collapses the video once and its
      // concern sheet is arrow-driven only. Re-centre the collapsed mobile card
      // when the browser UI shows/hides.
      const syncCard = () => {
        if (isDesktop || !mobileCollapsed) return;
        if (!videoWrapRef.current) return;
        const g = mobileCardGeom();
        gsap.set(videoWrapRef.current, {
          width: `${g.wPct}%`,
          height: `${g.hPct}%`,
          top: `${g.topPct}%`,
        });
        // NOTE: the sheet's offset is intentionally NOT recomputed here — it is
        // frozen at collapse so a URL-bar resize can't nudge it up/down.
      };
      window.visualViewport?.addEventListener("resize", syncCard);
      window.addEventListener("resize", syncCard);
      cleanups.push(() => {
        window.visualViewport?.removeEventListener("resize", syncCard);
        window.removeEventListener("resize", syncCard);
      });

      // Hold the release: while the mobile collapse is mid-flight the page waits
      // at the pin's end, so the section never scrolls away until the video has
      // fully shrunk. When the animation completes the hold lifts and native
      // scroll carries on into the next section on its own.
      const holdRelease = () => {
        if (isDesktop || !collapseRunning || !st) return;
        if (window.scrollY > st.end - 2) window.scrollTo(0, st.end - 2);
      };
      window.addEventListener("scroll", holdRelease, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", holdRelease));

      tickers.push(tick);
      gsap.ticker.add(tick);

      // Desktop pins long enough to walk every concern by scroll. Mobile pins
      // only through its intro (~50vh of rising text + a short buffer); the
      // collapse hold keeps the release waiting until the shrink has finished,
      // then native scroll takes over. The concern sheet below changes ONLY via
      // the left/right arrow buttons.
      const pinEnd = isDesktop
        ? "+=" + (80 + sisterConcerns.length * 17) + "%"
        : "+=66%";

      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: pinEnd,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          targetProgress = self.progress;
          if (isDesktop) {
            // Desktop without a wheel (rare) keeps the concern on the scroll phase.
            if (!wheelSeen) moveConcernTo(idxFromProgress(self.progress));
          } else {
            // Mobile: drive the collapse/expand from the REAL progress so a fast
            // swipe can't blow past the pin before the smoothed tick catches up.
            if (self.progress >= textEnd) triggerMobileCollapse();
            else triggerMobileExpand();
          }
        },
        // Block side-content changes while the Hero is off-screen below.
        onLeave: (self) => {
          pinLeft = true;
          // Fast-swipe safety: if the collapse is still playing (or somehow never
          // fired), hold the scroll just inside the pin so the section can't
          // scroll away with a half-shrunk / un-shrunk video. Once the shrink has
          // finished this no longer pulls back, so leaving is instant.
          if (!isDesktop && (collapseRunning || !mobileCollapsed)) {
            if (!mobileCollapsed) triggerMobileCollapse();
            window.scrollTo(0, self.end - 2);
          }
        },
        // Keep the concern frozen from ASGHighlight's influence on re-entry.
        // The Hero's own wheel handler steps concerns; ASGHighlight residual
        // ticks would otherwise jump the index to 0/1/4/6 on upward scroll.
        onEnterBack: () => {
          // pinLeft stays true — prevent ASGHighlight from overriding concern
        },
      });

      // ── Hold the pin until every concern has been shown ────────────────────
      // The intro (video shrink, centre text, panels rising) stays purely
      // scroll-driven. Once the panels are up the scroll waits at that point and
      // each scroll gesture steps one concern. The step that shows the last
      // concern moves the waiting point to the bottom of the pin, so scrolling on
      // from there leaves right away — no glide, no pause in between.
      // The hold lives strictly inside the pin: below the pin the Hero has nothing
      // to say about where the page scrolls, otherwise the next section (which
      // pushes its own concern index here) would get dragged back up.
      let lastY = 0;

      const onWheel = (e: WheelEvent) => {
        if (!st || !e.deltaY || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        wheelSeen = true;
        const scale = e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? window.innerHeight : 1;
        const dy = e.deltaY * scale;
        const ady = Math.abs(dy);

        // Which hardware is this? Dense sub-notch deltas arriving back to back can
        // only be a trackpad, so its notch of travel is measured wider — otherwise
        // one swipe would spend itself on six concerns at once. A mouse wheel
        // keeps the plain 100px notch, exactly like it always did on Windows.
        const now = performance.now();
        if (now - lastDeltaAt < 60 && ady < STRONG_DELTA) {
          trackpad = true;
          notchPx = TRACKPAD_NOTCH_PX;
        }
        lastDeltaAt = now;
        if (ady > peakDelta) peakDelta = ady;
        // Momentum tail: the shrunken residue that keeps arriving after the finger
        // has left the trackpad. It is decay, not intent, so it never feeds the
        // accumulator — the pin is re-anchored below either way.
        const inertia = ady < 8 && ady < peakDelta * 0.25;

        // Already past the pin: the Hero is behind the viewer, leave the page be.
        if (window.scrollY > st.end) return;

        if (window.scrollY < bandStart() - 1) {
          // Still inside the intro: the scroll drives it as before, but this
          // gesture is parked the moment it would cross into the concern band.
          if (dy > 0 && window.scrollY + dy >= bandStart()) {
            e.preventDefault();
            park();
          }
          return;
        }

        const atLast = activeConcernRef.current === LAST_IDX;
        const atFirst = activeConcernRef.current === 0;
        // All concerns shown going down, or nothing to undo going up: the scroll
        // carries on by itself, which is what releases (or rewinds) the section.
        if ((dy > 0 && atLast) || (dy < 0 && atFirst)) return;

        e.preventDefault();
        park();
        if (!inertia) addGesture(dy);
      };

      // Holds the line for travel that escapes the wheel gate (keyboard,
      // scrollbar, touch). Safari never cancels trackpad inertia on
      // preventDefault(), so scrollY keeps creeping past the anchor here even
      // though every wheel event was canceled — that drift is re-anchored only,
      // and is counted as a scroll just for input that sends no wheel events at
      // all, so momentum can no longer queue steps the user never made.
      const onScroll = () => {
        if (!st || !wheelSeen) return;
        const y = window.scrollY;
        const down = y > lastY;
        lastY = y;

        if (y > st.end) return; // past the pin: nothing to hold anymore
        if (y < bandStart() - 1) {
          // Fast upward drift can push scrollY above the band even when the
          // wheel was prevented — only treat it as a real intro entry when
          // the user is already at concern 0 (legitimate backward exit).
          if (activeConcernRef.current !== 0) {
            park(); // re-anchor the drift
          }
          return;
        }
        if (down && activeConcernRef.current !== LAST_IDX) {
          const beyondAnchor = y > bandStart() + notchPx * 0.6;
          const wheelIsSilent = performance.now() - lastDeltaAt > INERTIA_QUIET_MS;
          if (beyondAnchor && wheelIsSilent) requestStep(1);
          park();
        }
        // Park upward drift: if scrollY crept below the anchor (not at first
        // concern), re-anchor so the fast scroll can't skip back to concern 0.
        if (!down && activeConcernRef.current !== 0) {
          park();
        }
      };

      // The wheel-gesture hold (park + step one concern per notch) is DESKTOP
      // only. Attaching it on mobile lets a mouse wheel — DevTools device
      // emulation or a narrow window — freeze the scroll mid-intro and walk the
      // concerns by scroll, which must never happen there.
      const section = sectionRef.current;
      if (section && isDesktop) {
        section.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("scroll", onScroll, { passive: true });
        cleanups.push(() => {
          section.removeEventListener("wheel", onWheel);
          window.removeEventListener("scroll", onScroll);
        });
      }
    });

    return () => {
      tickers.forEach((t) => gsap.ticker.remove(t));
      cleanups.forEach((c) => c());
      timers.forEach((t) => clearTimeout(t));
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative w-full h-[var(--vh)] lg:h-screen overflow-hidden">
      {/* Video wrapper */}
      <div ref={videoWrapRef} className="absolute inset-0 overflow-hidden mt-5 sm:mt-0">
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
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered content — overflow-hidden clips text during rise/fall */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Mobile: the headline sits low on the video (justify-end). Desktop
            (lg+) keeps the original centred placement untouched. */}
        <div className="flex flex-col items-center justify-end h-full text-center text-white px-4 pb-48 lg:justify-center lg:pb-0">
          <div ref={textRef} className="mt-28 pointer-events-auto select-text">
          {/* Subtitle — Space Mono */}
          <div className="font-space-mono font-medium tracking-wider text-[13px] sm:text-sm lg:text-base text-white flex items-center justify-center gap-2 mb-4">
            <span className="w-4 h-[1.5px] bg-white shrink-0 uppercase" />
            <span className="uppercase">Journey of ASG From Late <span className="lowercase"> 70's</span></span>
            {/* <span
              className="w-2 h-2 rounded-full shrink-0 uppercase"
              style={{ background: "var(--primary-gradient)" }}
            /> */}
            {/* <span>EST. 1890s</span> */}
            <span className="w-4 h-[1.5px] bg-white shrink-0" />
          </div>

          {/* Title — Archivo Black, 3 lines */}
          <h1 className="font-archivo-black uppercase text-[25px] sm:text-5xl lg:text-[6rem] leading-[1.25] sm:leading-[1.05]">
            <span className="block">GENERATIONS OF <span className="animate__tada" style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>TRUST.</span></span>
            <span className="block">ENGINEERED FOR</span>
            <span className="block">THE <span style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>FUTURE.</span></span>
          </h1>
          </div>
        </div>
      </div>

      {/* Left side content — desktop column only (mobile uses the sheet below) */}
      <div ref={leftContentRef} className="absolute left-4 right-4 top-0 bottom-0 z-20 hidden items-start pt-24 lg:flex lg:left-[4%] lg:right-auto lg:max-w-[28rem] lg:items-center lg:pt-0 text-[var(--neutral-800)]">
        <div className="lg:h-[20rem]">
          <div className="text-sm sm:text-base inline-flex items-center gap-1 sm:gap-1.5 font-space-mono font-medium text-[var(--neutral-800)] uppercase tracking-wider mb-2 sm:mb-5">
            <span>OUR BUSINESS</span>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--primary-gradient)" }} />
          </div>
          <h2 className="font-archivo-black uppercase text-3xl lg:text-[3rem] leading-[1.05]">
            {["AN ECOSYSTEM", "NOT A FACTORY"].map((line, i) => (
              <span className="block" key={i}>{line}</span>
            ))}
          </h2>
          <div className="border-b border-[#EBEBEB] my-4" />
          <div ref={leftSlideRef}>
            <div>
              <span
                className="font-neue-montreal uppercase font-medium text-xs sm:text-sm lg:text-[1.6rem]"
                style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {sisterConcerns[activeConcern]?.sector ?? "TEXTILE"}
              </span>
            </div>
            <p className="w-full font-neue-montreal text-xs sm:text-sm lg:text-[1.15rem] text-[var(--neutral-600)] mt-2 lg:w-[90%]">
              {sisterConcerns[activeConcern]?.sectorDesc ?? ""}
            </p>
          </div>
        </div>
      </div>

      {/* Right side content — desktop column only (mobile uses the sheet below) */}
      <div ref={rightContentRef} className="absolute left-4 right-4 top-0 bottom-0 z-20 hidden items-end pb-6 lg:flex lg:left-auto lg:right-[4%] lg:w-[28rem] lg:items-center lg:pb-0 text-[var(--neutral-800)]">
        <div className="w-full text-left">
          <div ref={rightSlideRef}>
            <img
              src={sisterConcerns[activeConcern]?.logo ?? ""}
              alt="Sister concern"
              className="h-10 w-36 object-contain sm:h-14 sm:w-44 lg:h-[5rem] lg:w-56"
            />
            <p className="w-full font-neue-montreal text-xs sm:text-sm lg:text-[1.15rem] text-[var(--neutral-600)] mt-1 lg:w-[90%]">
              {sisterConcerns[activeConcern]?.concernDesc ?? ""}
            </p>
          </div>
          <a
            href={sisterConcerns[activeConcern]?.link ?? "#"}
            className="group relative inline-flex w-fit items-center justify-center self-start overflow-hidden rounded-full border border-transparent px-5 py-2.5 text-xs font-medium leading-none lg:self-auto lg:px-[1.75em] lg:py-[0.9em] lg:text-[1.08em] mt-10"
            style={{
              background:
                "linear-gradient(#F3F3F1, #F3F3F1) padding-box, linear-gradient(97.37deg, #8BC34A 1.29%, #1AA179 92.01%) border-box",
            }}
          >
            {/* Invisible spacer — preserves the button's intrinsic width/height */}
            <span className="invisible inline-flex items-center gap-1 whitespace-nowrap lg:gap-[0.33em]">
              Visit Details
              <SquareArrowOutUpRight className="w-4 h-4" />
            </span>

            {/* Default: gradient text — slides down and out on hover */}
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center gap-1 whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:translate-y-full lg:gap-[0.33em]"
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--primary-gradient)" }}
              >
                Visit Details
              </span>
              <SquareArrowOutUpRight className="w-4 h-4" color="#1AA179" />
            </span>

            {/* Hover: gradient fill + white text — slides in from the top */}
            <span
              aria-hidden
              className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0 lg:gap-[0.33em]"
              style={{ background: "var(--primary-gradient)" }}
            >
              Visit Details
              <SquareArrowOutUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>

      {/* Mobile heading — sits above the collapsed video card, fades in with
          the sheet. Desktop keeps its own left panel, so this is mobile-only. */}
      <div
        ref={mobileHeaderRef}
        className="absolute left-4 right-4 top-[calc(var(--header-height)+1rem)] z-30 text-[var(--neutral-800)] lg:hidden mt-5 sm:mt-0 z-50"
      >
        <div className="text-sm inline-flex items-center gap-2.5 sm:gap-1.5 font-space-mono font-medium uppercase tracking-wider mb-4.5">
          <span>OUR BUSINESS</span>
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--primary-gradient)" }} />
        </div>
        <h2 className="font-archivo-black uppercase text-[32px] leading-[1.05]">
          {["AN ECOSYSTEM", "NOT A FACTORY"].map((line, i) => (
            <span className="block" key={i}>{line}</span>
          ))}
        </h2>
      </div>

    </section>

    {/* Mobile concern sheet — a block in normal flow AFTER the Hero section.
        syncSheet() pulls it up with a fixed negative margin so it rests right
        under the shrunk video (no gap). The margin comes from the stable
        100lvh section box, so it never bobs while scrolling, and the sheet
        still flows in the document so it can't ride over the next section. */}
    <div ref={mobileSheetRef} className="relative lg:hidden">
      <div className="mx-4 pt-2 pb-8 mt-8 sm:mt-0">
          {/* Concern navigation — right-aligned row under the card.
              Lives OUTSIDE mobileSlideRef so the arrows never animate. */}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              aria-label="Previous concern"
              onClick={() => mobileStepRef.current?.(-1)}
              className="group relative grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-neutral-300 bg-white text-[var(--neutral-800)]"
            >
              {/* Gradient wash fades in — background can't transition solid→gradient */}
              <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" style={{ background: "var(--primary-gradient)" }} />
              <ChevronLeft className="relative h-5 w-5 transition-colors duration-300 group-hover:text-white" />
            </button>
            <button
              type="button"
              aria-label="Next concern"
              onClick={() => mobileStepRef.current?.(1)}
              className="group relative grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-neutral-300 bg-white text-[var(--neutral-800)]"
            >
              <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" style={{ background: "var(--primary-gradient)" }} />
              <ChevronRight className="relative h-5 w-5 transition-colors duration-300 group-hover:text-white" />
            </button>
          </div>

          <div ref={mobileSlideRef} className="mt-2">
            {/* Sector + toggle for the longer sector description */}
            <button
              type="button"
              onClick={() => setDescOpen((v) => !v)}
              aria-expanded={descOpen}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span
                className="font-neue-montreal uppercase font-semibold text-[22px]"
                style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {sisterConcerns[activeConcern]?.sector ?? "TEXTILE"}
              </span>
              {descOpen ? (
                <Minus className="h-5 w-5 shrink-0 rounded-full border border-[#1AA179] p-0.5" color="#1AA179" strokeWidth={2.5} />
              ) : (
                <Plus className="h-5 w-5 shrink-0 rounded-full border border-[#1AA179] p-0.5" color="#1AA179" strokeWidth={2.5} />
              )}
            </button>

            {/* Expandable sector description — slides down smoothly right under the button */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                descOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pt-3 font-neue-montreal text-base leading-relaxed text-[var(--neutral-600)]">
                  {sisterConcerns[activeConcern]?.sectorDesc ?? ""}
                </p>
              </div>
            </div>

            <div className="my-4 border-b border-[#EBEBEB]" />

            <img
              src={sisterConcerns[activeConcern]?.logo ?? ""}
              alt="Sister concern"
              className="h-18 w-64 object-contain"
            />

            {/* Concern description — always shown under the logo */}
            <p className="pt-3 font-neue-montreal text-base leading-relaxed text-[var(--neutral-600)]">
              {sisterConcerns[activeConcern]?.concernDesc ?? ""}
            </p>

            <a
              href={sisterConcerns[activeConcern]?.link ?? "#"}
              className="group relative mt-6 inline-flex w-fit items-center justify-center self-start overflow-hidden rounded-full border border-transparent px-6 py-3 text-base font-medium leading-none"
              style={{
                background:
                  "linear-gradient(#F3F3F1, #F3F3F1) padding-box, linear-gradient(97.37deg, #8BC34A 1.29%, #1AA179 92.01%) border-box",
              }}
            >
              {/* Invisible spacer — preserves the button's intrinsic width/height */}
              <span className="invisible inline-flex items-center gap-1.5 whitespace-nowrap">
                Visit website
                <SquareArrowOutUpRight className="h-5 w-5" />
              </span>

              {/* Default: gradient text — slides down and out on hover */}
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center gap-1.5 whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:translate-y-full"
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--primary-gradient)" }}
                >
                  Visit website
                </span>
                <SquareArrowOutUpRight className="h-5 w-5" color="#1AA179" />
              </span>

              {/* Hover: gradient fill + white text — slides in from the top */}
              <span
                aria-hidden
                className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1.5 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0"
                style={{ background: "var(--primary-gradient)" }}
              >
                Visit website
                <SquareArrowOutUpRight className="h-5 w-5" />
              </span>
            </a>
          </div>
        </div>
    </div>
    </>
  );
}
