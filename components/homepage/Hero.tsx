"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { SquareArrowOutUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SisterConcern {
  sector: string;
  description: string;
  logo: string;
  link: string;
}

const sisterConcerns: SisterConcern[] = [
  {
    sector: "TEXTILE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/spinning-mills-clr.png",
    link: "https://www.asg-bd.com/HASSML.php",
  },
  {
    sector: "RETAIL",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/helal-brothers-clr.png",
    link: "https://www.asg-bd.com/H&B",
  },
  {
    sector: "TEXTILE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/fabrics-clr.png",
    link: "https://amanatshahfabrics.com/",
  },
  {
    sector: "GERMANE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/trust-knitwear-clr.png",
    link: "https://www.trustknitwear.com/index.html",
  },
  {
    sector: "FINANCE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/securities-clr.png",
    link: "https://www.hasslbd.com/",
  },
  {
    sector: "AGRICULTURE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/farm2farm-clr.png",
    link: "https://asg-bd.com/Farm2Firm.php",
  },
  {
    sector: "ECOMMERCE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/miah-clr.png",
    link: "https://miahbd.com/",
  },
  {
    sector: "CHEMICAL",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/tex-solution-clr.png",
    link: "#",
  },
  {
    sector: "TEXTILE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/weaving-clr.png",
    link: "https://www.asg-bd.com/ASWPL.php",
  },
  {
    sector: "TECHNOLOGY",
    description: "Digital transformation, custom software, ERP solutions and business analytics.",
    logo: "/logo/sister-concern/asg-dynamic.png",
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

      // ── Side content: one concern per scroll gesture ───────────────────────
      // A whole burst of wheel events counts as ONE scroll. The deltas accumulate
      // while the input keeps coming and the panels step exactly once after it
      // goes quiet — pulling ten notches at once never plays ten changes, and the
      // change lands where the scrolling stopped. Every concern then holds for
      // 0.4s.
      const LAST_IDX = sisterConcerns.length - 1;
      const STEP_MS = 400;          // a concern stays shown for at least 0.4s
      const GESTURE_IDLE_MS = 160;  // this quiet gap ends the current scroll gesture

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

      // Slide transition for sector/desc when switching concerns
      const runSlide = (idx: number, done: () => void) => {
        const els = [leftSlideRef.current, rightSlideRef.current].filter(Boolean);
        if (els.length === 0) {
          activeConcernRef.current = idx;
          setActiveConcern(idx);
          done();
          return;
        }
        gsap.to(els, {
          y: "-40px",
          opacity: 0,
          duration: 0.18, // keeps the whole swap inside the 0.4s a concern is up
          ease: "power3.in",
          onComplete: () => {
            activeConcernRef.current = idx;
            setActiveConcern(idx);
            requestAnimationFrame(() => {
              gsap.set(els, { y: "40px" });
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
        });
      };

      const requestStep = (dir: number) => {
        const next = activeConcernRef.current + dir;
        if (next < 0 || next > LAST_IDX) return;
        if (pendingDir === dir) return; // another step this way is already waiting
        pendingDir = dir;
        if (!busy) stepNow();
      };

      // One burst → one intent: the step fires when the wheel goes quiet.
      const addGesture = (dy: number) => {
        gestureSum += dy;
        dropTimer(gestureTimer);
        gestureTimer = later(() => {
          gestureTimer = null;
          const dir = Math.sign(gestureSum);
          gestureSum = 0;
          if (dir !== 0) requestStep(dir);
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
        busy = true;
        lastStepAt = performance.now();
        runSlide(idx, () => {
          busy = false;
        });
      };

      // Scrolls 1-3: text fades equally; scroll 4: fully gone
      const textStart = 0.0;
      const textEnd = 0.2; // fully invisible early

      // Expose function for ASGHighlight to change side content. The Hero is off
      // screen while that section runs, so the change is applied directly.
      if (heroSlideChangeRef) {
        heroSlideChangeRef.current = (idx: number) => setConcern(idx);
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
        addGesture(dy);
      };

      // Holds the line for travel that escapes the wheel gate (keyboard,
      // scrollbar, momentum) — and counts that push as one scroll gesture too.
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
        if (down && y > bandStart() + 1 && activeConcernRef.current !== LAST_IDX) {
          park();
          addGesture(1);
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
              {sisterConcerns[activeConcern]?.description ?? ""}
            </p>
          </div>
        </div>
      </div>

      {/* Right side content — rises from below */}
      <div ref={rightContentRef} className="max-w-[28rem] absolute right-6 lg:right-[4%] top-0 bottom-0 z-20 flex items-center text-[var(--neutral-800)]">
        <div className="text-left">
          <div ref={rightSlideRef}>
            <img
              src={sisterConcerns[activeConcern]?.logo ?? ""}
              alt="Sister concern"
              className="h-9 sm:h-12 lg:h-[4.5rem] w-auto object-contain"
            />
            <p className="w-[90%] font-neue-montreal text-xs sm:text-sm lg:text-[1.15rem] text-[var(--neutral-600)] mt-1">
              {sisterConcerns[activeConcern]?.description ?? ""}
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
              Visit Website
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
                Visit Website
              </span>
              <SquareArrowOutUpRight className="w-4 h-4" color="#1AA179" />
            </span>

            {/* Hover: gradient fill + white text — slides in from the top */}
            <span
              aria-hidden
              className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0 lg:gap-[0.33em]"
              style={{ background: "var(--primary-gradient)" }}
            >
              Visit Website
              <SquareArrowOutUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
