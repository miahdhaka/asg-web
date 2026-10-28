"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    number: 130,
    icon: "/icons/employee_experience.png",
    titleLine1: "YEARS OF",
    titleLine2: "EXPERIENCE",
    description: "Carrying Bangladesh's textile trust to global landscapes and lifestyles, built on 130 years of experience.",
    concernIdx: 0,
  },
  {
    number: 15000,
    icon: "/icons/employee.png",
    titleLine1: "EMPLOYEE",
    titleLine2: "",
    description: "Our 15,000+ employees lead the Group's legacy forward, decade after decades, as a trusted family.",
    concernIdx: 1,
  },
  {
    number: 15,
    icon: "/icons/award.png",
    titleLine1: "GOVERNMENT",
    titleLine2: "AWARD",
    description: "Recognized with 15+ government awards, we are a proud partner in Bangladesh's socio-economic development.",
    concernIdx: 4,
  },
  {
    number: 17,
    icon: "/icons/fun-world.png",
    titleLine1: "COUNTRIES",
    titleLine2: "REACHED",
    description: "From Bangladesh to 17+ countries, delivering quality fashion and regular textile products and reliable service to customers worldwide.",
    concernIdx: 6,
  },
];

interface ASGHighlightProps {
  onSlideChange?: (concernIdx: number) => void;
  /** Wrapper around the section that follows (About Us) — its slow rise over
      this pinned section is driven from the cover phase in the tick below. */
  nextSectionRef?: RefObject<HTMLElement | null>;
}

const COVER_SLOW = 0;

export default function ASGHighlight({ onSlideChange, nextSectionRef }: ASGHighlightProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const numGradRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const gradientOverlay4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tick: (() => void) | null = null;
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const cleanups: Array<() => void> = [];
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
      const isTouch = ScrollTrigger.isTouch;
      const capsuleH = capsuleRef.current!.offsetHeight;
      const slotEl = stripRef.current!.firstElementChild as HTMLElement | null;
      const itemH = slotEl?.offsetHeight || capsuleH * 0.5;
      const centerY = (capsuleH - itemH) / 2;
      const n = SLIDES.length - 1;

      // Numbers start centered on the first slide.
      gsap.set(stripRef.current, { y: centerY });
      gsap.set(gradientOverlay4Ref.current, { opacity: 0 });
      slidesRef.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
      });

      const vhPx = sectionRef.current!.offsetHeight;
      const riseEl = nextSectionRef?.current ?? null;
      const coverStart = n / (n + 1 + COVER_SLOW);
      const COVER_TAIL = isTouch ? 0.5 : 0.32;
      const riseTo = riseEl
        ? gsap.quickTo(riseEl, "y", { duration: COVER_TAIL, ease: "power3.out" })
        : null;
      const fadeTo = gsap.quickTo(sectionRef.current, "opacity", { duration: COVER_TAIL, ease: "power3.out" });

      const applyCover = (p: number) => {
        const fade =
          p > coverStart
            ? Math.min(1, ((p - coverStart) * (n + 1 + COVER_SLOW)) / (1 + COVER_SLOW))
            : 0;
        fadeTo(1 - fade);
        if (riseTo) riseTo(-COVER_SLOW * vhPx * (1 - fade));
      };

      const snapCover = (p: number) => {
        const fade =
          p > coverStart
            ? Math.min(1, ((p - coverStart) * (n + 1 + COVER_SLOW)) / (1 + COVER_SLOW))
            : 0;
        const y = -COVER_SLOW * vhPx * (1 - fade);
        // Kill any in-flight quickTo tween so the immediate set sticks.
        gsap.killTweensOf(sectionRef.current);
        if (riseEl) gsap.killTweensOf(riseEl);
        gsap.set(sectionRef.current, { opacity: 1 - fade });
        if (riseEl) gsap.set(riseEl, { y });
      };

      // ── One shared driver moves the number strip, the background cross-fade and
      // the right-side content together, exactly one slide at a time. This is what
      // removes the dead scroll: a step is triggered by an input gesture (desktop)
      // or a progress crossing (touch), never scrubbed continuously.
      const GLIDE = isTouch ? 0.9 : 0.8;
      const stripTo = gsap.quickTo(stripRef.current, "y", { duration: GLIDE, ease: "power2.inOut" });
      const bgTo = gsap.quickTo(gradientOverlay4Ref.current, "opacity", { duration: GLIDE, ease: "power2.inOut" });
      let activeStep = 0;
      let rawProgress = 0;

      const applyStep = (
        idx: number,
        dir: number,
        immediate = false,
        done?: () => void
      ) => {
        const prev = activeStep;
        activeStep = idx;
        const targetY = centerY - itemH * idx;
        if (immediate) {
          gsap.killTweensOf(stripRef.current);
          gsap.set(stripRef.current, { y: targetY });
        } else {
          stripTo(targetY);
        }
        bgTo(n === 0 ? 0 : idx / n);

        if (idx === prev) {
          done?.();
          return;
        }
        const d = dir || (idx > prev ? 1 : -1); // down: out↑ / in from below
        const prevEl = slidesRef.current[prev];
        const nextEl = slidesRef.current[idx];
        slidesRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.killTweensOf(el);
          if (i !== prev && i !== idx) gsap.set(el, { opacity: 0, y: 0 });
        });
        if (prevEl) {
          gsap.to(prevEl, { y: -40 * d, opacity: 0, duration: 0.45, ease: "power2.inOut" });
        }
        if (nextEl) {
          gsap.fromTo(
            nextEl,
            { y: 40 * d, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.2, onComplete: done }
          );
        } else {
          done?.();
        }
        onSlideChange?.(SLIDES[idx].concernIdx);
      };

      // The number gradient overlay tracks the live strip position every frame so
      // it stays in sync while a step glide is still running.
      const updateNumGrad = () => {
        const stripY = gsap.getProperty(stripRef.current!, "y") as number;
        const halfH = capsuleH / 2;
        const WHITE_BAND = itemH * 0.15;
        numGradRefs.current.forEach((el, i) => {
          if (!el) return;
          const numCenterY = stripY + i * itemH + itemH / 2;
          const dist = Math.abs(numCenterY - halfH);
          const t = Math.min(1, Math.max(0, dist - WHITE_BAND) / (halfH - WHITE_BAND));
          gsap.set(el, { opacity: t });
        });
      };

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${(n + 1 + COVER_SLOW) * 100}%`,
        pin: true,
        pinSpacing: false,
        anticipatePin: isTouch ? 1 : 0,
        onUpdate: (self) => {
          rawProgress = self.progress;
          applyCover(self.progress);
        },
        onRefresh: (self) => snapCover(self.progress),
      });
      snapCover(st.progress);

      if (isTouch) {
        // ── Touch: continuous native scroll; the step is derived from smoothed
        // progress and lands one number at a time through applyStep.
        let scrollProgress = 0;
        let lastRendered = -1;
        const SMOOTH = 0.5;
        tick = () => {
          scrollProgress += (rawProgress - scrollProgress) * SMOOTH;
          if (Math.abs(rawProgress - scrollProgress) < 0.0005) scrollProgress = rawProgress;
          if (scrollProgress !== lastRendered) {
            lastRendered = scrollProgress;
            const animProgress = Math.min(1, scrollProgress * ((n + 1 + COVER_SLOW) / n));
            const idx = Math.min(n, Math.max(0, Math.floor(animProgress * n + 0.5)));
            if (idx !== activeStep) applyStep(idx, idx > activeStep ? 1 : -1);
          }
          updateNumGrad();
        };
        gsap.ticker.add(tick);
        tick();

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: () => `+=${(n + 1 + COVER_SLOW) * 100 + 200}%`,
          onToggle: (self) => ScrollTrigger.normalizeScroll(self.isActive),
        });
      } else {
        // ── Desktop: one wheel gesture = one number. The pin is frozen
        // (preventDefault + park) while gestures step the numbers, so there is no
        // dead scroll between steps. Ported from Hero.tsx's side-content gate.
        const WHEEL_NOTCH_PX = 100;    // one mouse notch ≈ 100px of native scroll
        const TRACKPAD_NOTCH_PX = 280; // a deliberate trackpad push, in px
        const STRONG_DELTA = 50;       // one delta this big is already a wheel notch
        const IDLE_NOTCH_PX = 24;      // a wheel burst that went quiet steps at this much
        const INERTIA_QUIET_MS = 260;  // input quieter than this is not a real scroll
        const GESTURE_IDLE_MS = 160;   // this quiet gap ends the current scroll gesture
        const STEP_MS = 600;           // a middle number stays shown for at least 0.6s
        const EDGE_MS = 1000;          // the first/last number holds ~1s
        const STRIP_GLIDE_MS = GLIDE * 1000;

        let trackpad = false;
        let notchPx = WHEEL_NOTCH_PX;
        let lastDeltaAt = 0;
        let peakDelta = 0;
        let busy = false;
        let lastStepAt = 0;
        let pendingDir = 0;
        let gestureSum = 0;
        let gestureTimer: ReturnType<typeof setTimeout> | null = null;
        let cadenceTimer: ReturnType<typeof setTimeout> | null = null;
        let wheelSeen = false;
        let lastY = window.scrollY;

        // Where the scroll waits while numbers step: at the top of the band for
        // every number except the last, which parks where the cover fade begins so
        // the next pixel of native scroll hands straight over to About Us.
        const bandStartY = () => st.start + 1;
        const numberEndY = () => st.start + (st.end - st.start) * coverStart;
        const holdY = () => (activeStep === n ? numberEndY() : bandStartY());
        const park = () => {
          const y = holdY();
          if (Math.abs(window.scrollY - y) > 1) window.scrollTo(0, y);
        };
        const holdMs = () => (activeStep === 0 || activeStep === n ? EDGE_MS : STEP_MS);

        const stepNow = () => {
          dropTimer(cadenceTimer);
          cadenceTimer = null;
          if (pendingDir === 0) return;
          const wait = holdMs() - (performance.now() - lastStepAt);
          if (wait > 0) {
            cadenceTimer = later(stepNow, wait);
            return;
          }
          const dir = pendingDir;
          pendingDir = 0;
          const next = Math.min(n, Math.max(0, activeStep + dir));
          if (next === activeStep) return;
          busy = true;
          lastStepAt = performance.now();
          applyStep(next, dir > 0 ? 1 : -1, false, () => {
            busy = false;
            if (pendingDir !== 0) stepNow();
            else if (wheelSeen) park();
          });
        };

        const requestStep = (dir: number) => {
          const next = activeStep + dir;
          if (next < 0 || next > n) return;
          if (pendingDir === dir) return; // another step this way is already waiting
          pendingDir = dir;
          if (!busy) stepNow();
        };

        // Travel is spent in notch-sized chunks. A trackpad answers mid-burst (a
        // continuous stream never goes quiet); a mouse fires ONE step when the
        // burst goes quiet, so one wheel event can never spend two numbers.
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
            const min = trackpad ? notchPx * 0.5 : IDLE_NOTCH_PX;
            if (Math.abs(sum) >= min) requestStep(Math.sign(sum));
          }, GESTURE_IDLE_MS);
        };

        const onWheel = (e: WheelEvent) => {
          if (!st || !e.deltaY || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
          wheelSeen = true;
          const scale = e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? window.innerHeight : 1;
          const dy = e.deltaY * scale;
          const ady = Math.abs(dy);

          const now = performance.now();
          if (now - lastDeltaAt < 60 && ady < STRONG_DELTA) {
            trackpad = true;
            notchPx = TRACKPAD_NOTCH_PX;
          }
          lastDeltaAt = now;
          if (ady > peakDelta) peakDelta = ady;
          // Momentum tail: decay, not intent — never feeds the accumulator.
          const inertia = ady < 8 && ady < peakDelta * 0.25;

          if (window.scrollY > st.end) return; // past the pin: leave the page be

          // Entering the band from above: let native scroll bring the section in,
          // then freeze on the first number (snapped in instantly, so it keeps the
          // plain EDGE_MS hold rather than a glide-compensated one).
          if (window.scrollY < bandStartY() - 1) {
            if (dy > 0 && window.scrollY + dy >= bandStartY()) {
              e.preventDefault();
              if (activeStep !== 0) applyStep(0, -1, true);
              lastStepAt = now;
              park();
            }
            return;
          }

          const atLast = activeStep === n;
          const atFirst = activeStep === 0;

          // Down at the last number: hold it fully visible for glide + beat, then
          // let the user's OWN native scroll travel the cover band into About Us
          // (no programmatic scroll — About Us is a normal, non-pinned section).
          if (dy > 0 && atLast) {
            if (now - lastStepAt < EDGE_MS + STRIP_GLIDE_MS) {
              e.preventDefault();
              park();
            }
            return;
          }
          // Up at the first number: hold briefly, then release to native scroll.
          if (dy < 0 && atFirst) {
            if (now - lastStepAt < EDGE_MS) {
              e.preventDefault();
              park();
            }
            return;
          }

          // Up at the last number while still inside the cover band: let native
          // scroll slide About Us back down and fade ASG in smoothly — mirroring
          // the downward release — instead of snapping to the hold point. The
          // stepper re-engages once the scroll reaches numberEndY.
          if (dy < 0 && atLast && window.scrollY > numberEndY() + 1) return;

          e.preventDefault();
          park();
          if (!inertia) addGesture(dy);
        };

        // Re-anchor travel that escapes the wheel gate (keyboard, scrollbar) and
        // count it as a step only when the wheel has gone quiet.
        const onScroll = () => {
          if (!st || !wheelSeen) return;
          const y = window.scrollY;
          const down = y > lastY;
          lastY = y;
          if (y > st.end) return;
          // Inside the cover band at the last number the scroll is handed back to
          // the browser (both the downward release and the upward re-entry), so
          // never re-anchor it here — that would fight the smooth About Us slide.
          if (activeStep === n && y > numberEndY() + 1) return;
          if (y < bandStartY() - 1) {
            if (activeStep !== 0) park();
            return;
          }
          if (down && activeStep !== n) {
            const beyondAnchor = y > bandStartY() + notchPx * 0.6;
            const wheelIsSilent = performance.now() - lastDeltaAt > INERTIA_QUIET_MS;
            if (beyondAnchor && wheelIsSilent) requestStep(1);
            park();
          }
          if (!down && activeStep !== 0) park();
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

        // Keep the gradient overlay glued to the strip while it glides.
        tick = () => updateNumGrad();
        gsap.ticker.add(tick);
        updateNumGrad();
      }
    });

    return () => {
      if (tick) gsap.ticker.remove(tick);
      cleanups.forEach((c) => c());
      timers.forEach((t) => clearTimeout(t));
      ScrollTrigger.normalizeScroll(false);
      ctx.revert();
    };
  }, []);
  return (
    <>
    <section
      ref={sectionRef}
      className="relative w-full h-[var(--vh)] lg:h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F3F3F1 -7.28%, #F3F4F1 16.35%, #D0E3CE 87.23%)",
      }}
    >
      <div
        ref={gradientOverlay4Ref}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #F3F3F1 -7.28%, #F3F4F1 16.35%, #B3D9AF 87.23%)",
          opacity: 0,
          transform: "translateZ(0)",
          willChange: "opacity",
        }}
        aria-hidden="true"
      />
      {/* Splash background */}
      <img
        src="/images/hero/splash-bg.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40 pointer-events-none"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 lg:px-[4%]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-evenly lg:justify-center gap-5 lg:gap-32 h-full w-full pb-10 sm:pb-0">
          <div className="lg:flex-1 text-left mt-32 lg:mt-0">
            <h2 className="font-archivo-black uppercase text-[2rem] sm:text-4xl lg:text-[3rem] leading-[1.2] text-[var(--neutral-800)] word-space-4">
              <span className="text-nowrap block">ASG AT A</span>
              <span className="block">GLANCE</span>
            </h2>
          </div>

          {/* Center — Capsule with lens-shaped number scroll */}
          <div
            ref={capsuleRef}
            className="relative w-[calc(100vw-2rem)] h-[clamp(178px,25vw,378px)] shrink-0 self-center overflow-hidden rounded-full lg:w-[clamp(280px,52vw,760px)] lg:h-[clamp(170px,24vw,360px)] my-8 sm:my-0"
            style={{
              backgroundImage: "url(/images/we-are-asg.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            <div
              ref={stripRef}
              className="absolute inset-0 flex flex-col items-center"
              style={{ willChange: "transform" }}
            >
              {SLIDES.map((s, i) => (
                <div
                  key={s.number}
                  className="relative shrink-0 flex items-center justify-center"
                  style={{ height: "clamp(85px, 12vw, 180px)" }}
                >
                  {/* Base layer — always solid white, reads clean at the center */}
                  <span className="font-archivo-black text-white text-[clamp(3.5rem,0.96rem+8.4vw,8.5rem)] leading-none">
                    {s.number}
                  </span>

                  <span
                    ref={(el) => { numGradRefs.current[i] = el; }}
                    className="font-archivo-black text-[clamp(3.5rem,0.96rem+8.4vw,8.5rem)] leading-none absolute inset-0 flex items-center justify-center"
                    style={{
                      backgroundImage: "var(--primary-gradient)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      opacity: 0,
                      willChange: "opacity",
                    }}
                  >
                    {s.number}
                  </span>
                </div>
              ))}
            </div>
            {/* Top dark overlay */}
            <div
              className="absolute inset-x-0 top-0 h-[35%] pointer-events-none z-10"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
              }}
            />
            {/* Bottom dark overlay */} 
            <div
              className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none z-10"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
              }}
            />
          </div>

          <div className="lg:flex-1 max-w-[28rem] grid text-left">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                ref={(el) => { slidesRef.current[i] = el; }}
                className="col-start-1 row-start-1"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                {/* Gradient icon */}
                <div
                  className="w-12.5 sm:w-16 h-12.5 sm:h-16 mx-0 mb-2 sm:mb-4"
                  style={{
                    backgroundImage: "var(--primary-gradient)",
                    maskImage: `url(${slide.icon})`,
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskImage: `url(${slide.icon})`,
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                />
                {/* Title */}
                <h3 className="font-archivo-black uppercase text-[1.4rem] sm:text-2xl lg:text-[2rem] leading-[1.05] text-[var(--neutral-800)]">
                  <span className="block">{slide.titleLine1}</span>
                  {slide.titleLine2 && <span className="block">{slide.titleLine2}</span>}
                </h3>
                {/* Description */}
                <p className="max-w-[90%] font-neue-montreal text-[1rem] sm:text-[1rem] lg:text-[1.1rem] text-[var(--neutral-600)] mt-2">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <div
      aria-hidden
      className="pointer-events-none w-full"
      style={{ height: `calc(var(--vh, 100vh) * ${SLIDES.length - 1 + COVER_SLOW})` }}
    />
    </>
  );
}