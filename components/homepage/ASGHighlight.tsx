"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    number: 130,
    icon: "/icons/employee_experience.png",
    titleLine1: "YEARS",
    titleLine2: "EXPERIENCE",
    description: "Building trust across Bangladesh's textile and business landscape since our founding.",
    concernIdx: 0,
  },
  {
    number: 15000,
    icon: "/icons/employee.png",
    titleLine1: "EMPLOYEE",
    titleLine2: "",
    description: "Building trust across Bangladesh's textile and business landscape since our founding.",
    concernIdx: 1,
  },
  {
    number: 15,
    icon: "/icons/award.png",
    titleLine1: "GOVERNMENT",
    titleLine2: "AWARD",
    description: "Building trust across Bangladesh's textile and business landscape since our founding.",
    concernIdx: 4,
  },
  {
    number: 17,
    icon: "/icons/fun-world.png",
    titleLine1: "COUNTRIES",
    titleLine2: "REACHED",
    description: "Building trust across Bangladesh's textile and business landscape since our founding.",
    concernIdx: 6,
  },
];

interface ASGHighlightProps {
  onSlideChange?: (concernIdx: number) => void;
}

export default function ASGHighlight({ onSlideChange }: ASGHighlightProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const gradientOverlayRef = useRef<HTMLDivElement>(null);
  const gradientOverlay3Ref = useRef<HTMLDivElement>(null);
  const gradientOverlay4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tick: (() => void) | null = null;
    const ctx = gsap.context(() => {
      const capsuleH = capsuleRef.current!.offsetHeight;
      const itemH = capsuleH * 0.5;
      const centerY = (capsuleH - itemH) / 2;
      const endY = centerY - itemH * (SLIDES.length - 1);

      // Numbers start centered
      gsap.set(stripRef.current, { y: centerY });

      const n = SLIDES.length - 1;

      const tl = gsap.timeline();

      for (let i = 0; i < n; i++) {
        tl.to(stripRef.current, {
          y: centerY - itemH * (i + 1),
          ease: "none",
          duration: 1,
        }, i);
      }

      // Background cross-fade.
      // The four gradients share the SAME top stops and differ only in the
      // bottom color. The base (1st) gradient lives on the section itself and
      // never repaints; the 2nd/3rd/4th are overlay divs whose OPACITY we
      // animate. Opacity on a GPU-promoted layer is compositor-only — zero
      // repaint, zero main-thread work — so it never delays the page's
      // synchronous (passive:false) wheel handler and the number reel stays
      // smooth. (Animating backgroundColor instead repainted the full screen
      // every frame and caused the "atkay atkay" stutter.)
      tl.fromTo(gradientOverlayRef.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 1 }, 0);
      tl.fromTo(gradientOverlay3Ref.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 1 }, 1);
      tl.fromTo(gradientOverlay4Ref.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 1 }, 2);

      // Content panels are pre-rendered & grid-stacked, but NOT tied to the
      // scrubbed timeline. They use the slide transition (outgoing slides up &
      // fades out, incoming slides up from below & fades in) triggered
      // discretely when the active number changes — see the tick handler below.
      // Only transform + opacity animate, so it stays compositor-only/smooth.
      // Initial state: first panel visible, the rest hidden.
      slidesRef.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
      });

      // Drive the whole timeline with a manual per-frame glide follower — the
      // SAME smoothing model the Hero section uses for its rising content —
      // instead of ScrollTrigger's `scrub`. The raw scroll position is captured
      // in onUpdate, then a lerp eases `scrollProgress` toward it every frame
      // and feeds the timeline. This removes the per-tick snapping so the
      // number reel, background color and content all glide smoothly.
      tl.pause();

      const SMOOTH = 0.12;
      let targetProgress = 0;
      let scrollProgress = 0;
      let currentSlide = 0;
      let lastRendered = -1;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${n * 100}%`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => { targetProgress = self.progress; },
      });

      tick = () => {
        scrollProgress += (targetProgress - scrollProgress) * SMOOTH;
        // Snap when effectively settled to avoid endless sub-pix
        // el drift.
        if (Math.abs(targetProgress - scrollProgress) < 0.0005) {
          scrollProgress = targetProgress;
        }
        // Skip the render entirely when the smoothed value hasn't moved, so an
        // idle section doesn't repaint the full-screen background every frame.
        if (scrollProgress === lastRendered) return;
        lastRendered = scrollProgress;
        tl.progress(scrollProgress);

        // Content-change trigger. Number i is centered at t = i; adding a
        // half-segment offset fires the change at t = i − 0.5, i.e. while the
        // incoming number is still down in the BOTTOM of the capsule (≈75% of
        // its height) rather than waiting for it to reach the center. Same
        // threshold in both directions, so reverse scrolling changes back when
        // the number reaches the bottom again.
        const idx = Math.min(n, Math.max(0, Math.floor(scrollProgress * n + 0.5)));
        if (idx !== currentSlide) {
          const prevIdx = currentSlide;
          const dir = idx > prevIdx ? 1 : -1; // down: out↑ / in from below
          const prevEl = slidesRef.current[prevIdx];
          const nextEl = slidesRef.current[idx];
          // Reset any panel not involved (guards fast multi-step jumps so no
          // half-faded ghost panel is left visible).
          slidesRef.current.forEach((el, i) => {
            if (!el) return;
            gsap.killTweensOf(el);
            if (i !== prevIdx && i !== idx) gsap.set(el, { opacity: 0, y: 0 });
          });
          // Outgoing: slide up & fade out — matches the Hero's side-content
          // transition (0.3s, 40px travel) so the change feels slower/smoother.
          if (prevEl) {
            gsap.to(prevEl, { y: -40 * dir, opacity: 0, duration: 0.3, ease: "power3.in" });
          }
          // Incoming: start below, slide up & fade in (after the outgoing).
          if (nextEl) {
            gsap.fromTo(
              nextEl,
              { y: 40 * dir, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.3, ease: "power3.out", delay: prevEl ? 0.3 : 0 }
            );
          }
          currentSlide = idx;
          onSlideChange?.(SLIDES[idx].concernIdx);
        }
      };
      gsap.ticker.add(tick);
      tick();
    });

    return () => {
      if (tick) gsap.ticker.remove(tick);
      ctx.revert();
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[var(--vh)] lg:h-screen overflow-hidden"
      style={{
        // Base = 1st gradient (shown with the 1st number). Static — painted
        // once and cached; it is never animated, so it never repaints.
        background:
          "linear-gradient(180deg, #F3F3F1 -7.28%, #F3F4F1 16.35%, #D0E3CE 87.23%)",
      }}
    >
      {/* 2nd/3rd/4th gradient overlays. Each is GPU-promoted (translateZ(0) +
          will-change:opacity) so its gradient is rasterized ONCE into a cached
          texture; animating opacity then happens purely on the compositor with
          zero repaint and zero main-thread cost. They fade in one-by-one over
          the scrubbed timeline as each number comes into view. */}
      <div
        ref={gradientOverlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #F3F3F1 -7.28%, #F3F4F1 16.35%, #C6E2C3 87.23%)",
          opacity: 0,
          transform: "translateZ(0)",
          willChange: "opacity",
        }}
        aria-hidden="true"
      />
      <div
        ref={gradientOverlay3Ref}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #F3F3F1 -7.28%, #F3F4F1 16.35%, #BCDDB9 87.23%)",
          opacity: 0,
          transform: "translateZ(0)",
          willChange: "opacity",
        }}
        aria-hidden="true"
      />
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
      <div className="relative z-10 flex items-center justify-center h-full px-6 lg:px-[4%]">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 w-full ">
          {/* Left side — Title */}
          <div className="flex-1 text-left">
            <h2 className="font-archivo-black uppercase text-2xl sm:text-4xl lg:text-[3rem] leading-[1.2] text-[var(--neutral-800)] word-space-4">
              <span className="text-nowrap block">ASG AT A</span>
              <span className="block">GLANCE</span>
            </h2>
          </div>

          {/* Center — Capsule with lens-shaped number scroll */}
          <div
            ref={capsuleRef}
            className="relative shrink-0 overflow-hidden rounded-full"
            style={{
              width: "clamp(400px, 52vw, 760px)",
              height: "clamp(200px, 24vw, 360px)",
              backgroundImage: "url(/images/we-are-asg.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              // Own GPU layer so the rounded clip + moving number strip are
              // composited on the GPU instead of re-rasterizing the huge
              // glyphs every frame.
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            <div
              ref={stripRef}
              className="absolute inset-0 flex flex-col items-center"
              style={{ willChange: "transform" }}
            >
              {SLIDES.map((s) => (
                <span
                  key={s.number}
                  className="font-archivo-black text-5xl sm:text-7xl lg:text-[8.5rem] leading-none select-none shrink-0"
                  style={{
                    color: "white",
                    height: "clamp(100px, 12vw, 180px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {s.number}
                </span>
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

          {/* Right side — Stats (all slides pre-rendered & grid-stacked;
              opacity cross-faded by the scrubbed timeline — no DOM writes
              during scroll, so the number reel never jitters). */}
          <div className="flex-1 max-w-[28rem] grid text-center lg:text-left">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                ref={(el) => { slidesRef.current[i] = el; }}
                className="col-start-1 row-start-1"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                {/* Gradient icon */}
                <div
                  className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto lg:mx-0 mb-2"
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
                <h3 className="font-archivo-black uppercase text-xl sm:text-2xl lg:text-[2rem] leading-[1.05] text-[var(--neutral-800)]">
                  <span className="block">{slide.titleLine1}</span>
                  {slide.titleLine2 && <span className="block">{slide.titleLine2}</span>}
                </h3>
                {/* Description */}
                <p className="max-w-[90%] font-neue-montreal text-xs sm:text-sm lg:text-[1.1rem] text-[var(--neutral-600)] mt-2">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
