"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { SquareArrowOutUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    sectorDesc: "Trusted as a long term partner for consistent, brand-match quality, helping them to grow at global scale.",
    concernDesc: "Consistent, high-quality yarn for reliable textile production.",
    logo: "/logo/sister-concern-update/spinning-mills-clr.png",
    link: "/concerns/hazrat-amanat-shah-spinning-mills",
  },
  {
    sector: "TEXTILE",
    sectorDesc: "Trusted as a long term partner for consistent, brand-match quality, helping them to grow at global scale.",
    concernDesc: "Precision weaving and processing for quality woven fabrics.",
    logo: "/logo/sister-concern-update/weaving-clr.png",
    link: "/concerns/amanat-shah-weaving-processing",
  },
  {
    sector: "TEXTILE",
    sectorDesc: "Trusted as a long term partner for consistent, brand-match quality, helping them to grow at global scale.",
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
      // Video wrapper: centered, full-size
      gsap.set(videoWrapRef.current, {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "100%",
        height: "100%",
      });

      // Side content: hidden below viewport
      gsap.set(leftContentRef.current, { y: "100vh", opacity: 0 });
      gsap.set(rightContentRef.current, { y: "100vh", opacity: 0 });

      // Center text: visible at natural position
      gsap.set(textRef.current, { y: 0, opacity: 1 });

      const videoEnd = 0.30;   // video fully shrunk at 7th scroll
      const PER_SCROLL = videoEnd / 7; // ≈ 0.042857 progress per scroll
      const sideStart = PER_SCROLL * 2; // side content starts at exact 2nd scroll
      const sideEnd = 0.55; // side content fully risen (wide = slow)

      // on each wheel/trackpad tick while remaining tied to scroll position.
      const SMOOTH = 0.12;
      // clearly visible from the 4th scroll) then decelerates smoothly to rest.
      const sideEase = gsap.parseEase("power2.out");
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
        const els = [leftSlideRef.current, rightSlideRef.current].filter(Boolean);
        if (els.length === 0) {
          activeConcernRef.current = idx;
          setActiveConcern(idx);
          done();
          return;
        }
        const outY = direction === 1 ? "-40px" : "40px";
        const inY = direction === 1 ? "40px" : "-40px";
        gsap.to(els, {
          y: outY,
          opacity: 0,
          duration: 0.18,
          ease: "power3.in",
          onComplete: () => {
            activeConcernRef.current = idx;
            setActiveConcern(idx);
            requestAnimationFrame(() => {
              gsap.set(els, { y: inY });
              gsap.to(els, {
                y: 0,
                opacity: 1,
                duration: 0.18,
                ease: "power3.out",
                onComplete: done,
              });
            });
          },
        });
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
        const els = [leftSlideRef.current, rightSlideRef.current].filter(Boolean);
        gsap.killTweensOf(els);
        gsap.set(els, { y: 0, opacity: 1 });
        activeConcernRef.current = idx;
        setActiveConcern(idx);
      };

      // Wheel-less fallback: the concern follows the scroll phase, one slide at a
      // time, exactly the way the section behaved before gesture stepping.
      const moveConcernTo = (idx: number) => {
        if (busy || idx === activeConcernRef.current) return;
        const direction = idx > activeConcernRef.current ? 1 : -1;
        busy = true;
        lastStepAt = performance.now();
        runSlide(idx, () => {
          busy = false;
        }, direction);
      };

      // Scrolls 1-3: text fades equally; scroll 4: fully gone
      const textStart = 0.0;
      const textEnd = 0.2; // fully invisible early

      // Expose function for ASGHighlight to change side content. While the Hero
      // is off-screen (pinLeft) the concern stays untouched so re-entry shows
      // the last concern the user was looking at.
      if (heroSlideChangeRef) {
        heroSlideChangeRef.current = (idx: number) => {
          if (pinLeft) return;
          setConcern(idx);
        };
      }

      const tick = () => {
        scrollProgress += (targetProgress - scrollProgress) * SMOOTH;
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

        // Video: directly interpolated 0%→35% (full-size → small)
        const vw = p <= videoEnd
          ? 100 - (100 - 23) * (p / videoEnd)
          : 23;
        const vh = p <= videoEnd
          ? 100 - (100 - 56) * (p / videoEnd)
          : 56;
        const br = p <= videoEnd ? 16 * (p / videoEnd) : 16;
        gsap.set(videoWrapRef.current, {
          width: `${vw}%`,
          height: `${vh}%`,
          borderRadius: `${br}px`,
        });

        // per scroll (slow) and reverse straight back down on scroll up.
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
      };
      tickers.push(tick);
      gsap.ticker.add(tick);

      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=" + (80 + sisterConcerns.length * 17) + "%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          targetProgress = self.progress;
          // No wheel events on this device → no gesture source, so there the
          // concern keeps following the scroll phase and the pin is left alone.
          if (!wheelSeen) moveConcernTo(idxFromProgress(self.progress));
        },
        // Block side-content changes while the Hero is off-screen below.
        onLeave: () => {
          pinLeft = true;
        },
        // Unmute on re-entry — the concern never changed so it's still the last one.
        onEnterBack: () => {
          pinLeft = false;
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
          // Back in the intro: the story starts over from the first concern.
          if (activeConcernRef.current !== 0) setConcern(0);
          return;
        }
        if (down && activeConcernRef.current !== LAST_IDX) {
          const beyondAnchor = y > bandStart() + notchPx * 0.6;
          const wheelIsSilent = performance.now() - lastDeltaAt > INERTIA_QUIET_MS;
          if (beyondAnchor && wheelIsSilent) requestStep(1);
          park();
        }
      };

      const section = sectionRef.current;
      if (section) {
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
    <section ref={sectionRef} className="relative w-full h-[var(--vh)] lg:h-screen overflow-hidden">
      {/* Video wrapper */}
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
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered content — overflow-hidden clips text during rise/fall */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="flex flex-col items-center justify-center h-full text-center text-white px-4 pb-14 sm:pb-0">
          <div ref={textRef} className="mt-28 select-none">
          {/* Subtitle — Space Mono */}
          <div className="font-space-mono font-medium uppercase tracking-wider text-xs sm:text-sm lg:text-base text-white flex items-center justify-center gap-2 mb-4">
            <span className="w-4 h-[1.5px] bg-white shrink-0" />
            <span>AMANAT SHAH GROUP</span>
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: "var(--primary-gradient)" }}
            />
            <span>EST. 1890s</span>
            <span className="w-4 h-[1.5px] bg-white shrink-0" />
          </div>

          {/* Title — Archivo Black, 3 lines */}
          <h1 className="font-archivo-black uppercase text-[28px] sm:text-5xl lg:text-[6rem] leading-[1.05]">
            <span className="block">GENERATIONS OF <span className="animate__tada" style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>TRUST.</span></span>
            <span className="block">ENGINEERED FOR</span>
            <span className="block">THE <span style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>FUTURE.</span></span>
          </h1>
          </div>
        </div>
      </div>

      {/* Left side content — rises from below */}
      <div ref={leftContentRef} className="max-w-[28rem] absolute left-6 lg:left-[4%] top-0 bottom-0 z-20 flex items-center text-[var(--neutral-800)]">
        <div>
          <div className="font-space-mono font-medium uppercase tracking-wider text-xs sm:text-sm lg:text-base flex items-center gap-2 mb-3">
            <span>OUR BUSINESS</span>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--primary-gradient)" }} />
          </div>
          <h2 className="font-archivo-black uppercase text-lg sm:text-2xl lg:text-[3rem] leading-[1.05]">
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
            <p className="w-[90%] font-neue-montreal text-xs sm:text-sm lg:text-[1.15rem] text-[var(--neutral-600)] mt-2">
              {sisterConcerns[activeConcern]?.sectorDesc ?? ""}
            </p>
          </div>
        </div>
      </div>

      {/* Right side content — rises from below */}
      <div ref={rightContentRef} className="w-[15rem] sm:w-[20rem] lg:w-[28rem] absolute right-6 lg:right-[4%] top-0 bottom-0 z-20 flex items-start lg:items-center text-[var(--neutral-800)]">
        <div className="w-full text-left">
          <div ref={rightSlideRef}>
            <img
              src={sisterConcerns[activeConcern]?.logo ?? ""}
              alt="Sister concern"
              className="h-10 w-36 object-contain sm:h-14 sm:w-44 lg:h-[5rem] lg:w-56"
            />
            <p className="w-[90%] font-neue-montreal text-xs sm:text-sm lg:text-[1.15rem] text-[var(--neutral-600)] mt-1">
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
    </section>
  );
}
