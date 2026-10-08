"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    number: 130,
    icon: "/icons/employee_experience.png",
    titleLine1: "YEARS",
    titleLine2: "EXPERIENCE",
    description: "Carrying Bangladesh's textile trust to global landscapes and lifestyles, built on 130 years of experience.",
    concernIdx: 0,
  },
  {
    number: 15000,
    icon: "/icons/employee.png",
    titleLine1: "EMPLOYEE",
    titleLine2: "",
    description: "Our 15,000+ employees lead the Group's legacy forward, decade after decade, as a trusted family.",
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
    description: "From Bangladesh to 17+ countries, delivering quality products and reliable service to customers worldwide.",
    concernIdx: 6,
  },
];

interface ASGHighlightProps {
  onSlideChange?: (concernIdx: number) => void;
  /** Wrapper around the section that follows (About Us) — its slow rise over
      this pinned section is driven from the cover phase in the tick below. */
  nextSectionRef?: RefObject<HTMLElement | null>;
}

// Extra scroll (as a fraction of one viewport height) given to the cover phase.
// The rising section always has to travel exactly one viewport height, so the
// only way to make it move SLOWER than the scroll is to widen the window it
// travels in: 1 viewport of rise now spans (1 + COVER_SLOW) viewports of
// scrolling, i.e. the rise runs at 1 / (1 + COVER_SLOW) of native speed.
// Set to 0 so the About Us wrapper's y stays pinned at 0 through the whole
// cover — About Us then rides its natural document slot at 1:1 scroll speed
// like every other homepage section instead of getting an extra slow-rise
// glide over the pinned section (that added motion was reading as a bounce
// on top of the pin release, especially on fast wheel deltas). The cover
// fade on this section still runs across the last 100vh of the pin range,
// which now exactly matches the About Us entry window (about-top hits the
// viewport bottom when ScrollTrigger progress reaches coverStart = n/(n+1)).
const COVER_SLOW = 0;

export default function ASGHighlight({ onSlideChange, nextSectionRef }: ASGHighlightProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  // Per-number gradient layer. Its opacity is driven by how far the number sits
  // from the capsule center, so a number is white/transparent at the center and
  // fades into the brand gradient as it moves toward the top/bottom overlay
  // zones (where the black gradient overlays sit above it).
  const numGradRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const gradientOverlay4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tick: (() => void) | null = null;
    const ctx = gsap.context(() => {
      const capsuleH = capsuleRef.current!.offsetHeight;
      /* Measure the REAL slot height from the DOM instead of assuming
         capsuleH/2 — the two CSS clamps (tube 170/24vw/360, slot 85/12vw/180)
         don't resolve proportionally everywhere (e.g. viewports between
         708–833px hit the tube's min but not the slot's), and any mismatch
         accumulated across 3 steps, leaving the last number resting off
         center ("17" sitting high). With the true pitch the reel always
         lands each number dead-center in the tube. */
      const slotEl = stripRef.current!.firstElementChild as HTMLElement | null;
      const itemH = slotEl?.offsetHeight || capsuleH * 0.5;
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
      // The gradients share the SAME top stops and differ only in the bottom
      // color. The base (1st, lightest) gradient lives on the section itself
      // and never repaints; the last (darkest) one is a single overlay whose
      // OPACITY ramps 0 → 1 LINEARLY across the whole reel — so the
      // background keeps deepening scroll-for-scroll from #D0E3CE all the way
      // to #B3D9AF instead of settling in three per-slide steps. Opacity on a
      // GPU-promoted layer is compositor-only — zero repaint, zero
      // main-thread work — so it never delays the page's synchronous
      // (passive:false) wheel handler and the number reel stays smooth.
      // (Animating backgroundColor instead repainted the full screen every
      // frame and caused the "atkay atkay" stutter.)
      tl.fromTo(gradientOverlay4Ref.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: n }, 0);

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

      /* Touch devices fling through the pin range far faster than a wheel
         scrolls it — with the loose 0.12 chase the strip trails the scroll by
         ~250ms and then drifts in to catch up, which reads as the incoming
         number "lafalafi"-wobbling. Tighter follow makes the reel track the
         scroll as 1:1-smooth as it does with a desktop wheel. Desktop keeps
         its exact original 0.12. */
      const SMOOTH = ScrollTrigger.isTouch ? 0.3 : 0.12;
      let targetProgress = 0;
      let scrollProgress = 0;
      let currentSlide = 0;
      let lastRendered = -1;

      // One viewport height in px — the exact distance About Us has to travel
      // during the cover phase (from the viewport bottom edge to fully covering
      // this section). Used to scale the slow-rise offset below.
      const vhPx = sectionRef.current!.offsetHeight;
      const riseEl = nextSectionRef?.current ?? null;
      const coverStart = n / (n + 1 + COVER_SLOW);

      /* Cover phase: this section fades 1 → 0 while About Us rides up over it.
         About Us is held COVER_SLOW viewports ABOVE its real layout slot for the
         animation phase — that is what parks its top edge exactly at the viewport
         bottom when the cover begins — and the pull-up decays to 0 linearly across
         the cover, so it lands precisely on its natural position with no snap and
         no gap/overlap with the sections below. Linear in progress on purpose: the
         rise keeps a constant 1/(1+COVER_SLOW) of scroll speed and maps identically
         in both directions, so it reads as ordinary scrolling, just slower.
         This runs from INSIDE ScrollTrigger's own update cycle, not the separate
         gsap.ticker: the pin is applied there, so writing the compensating offset
         from anywhere else leaves it a frame out of phase with the pin, which is
         what made the section heave forward in one burst on each scroll tick. */
      /* A longer quickTo tail retargets every scroll tick instead of gsap.set-ing
         instantly. Fast wheel deltas (100+ px per tick) otherwise snapped the rise
         from -30px → 0 in a single frame — the visible "bari" on arrival. 320 ms
         with power3.out gives enough inertia that a burst of wheel ticks settles
         softly while still tracking the scroll so the pin and the rise stay
         visually in phase. */
      const riseTo = riseEl
        ? gsap.quickTo(riseEl, "y", { duration: 0.32, ease: "power3.out" })
        : null;
      const fadeTo = gsap.quickTo(sectionRef.current, "opacity", { duration: 0.32, ease: "power3.out" });

      const applyCover = (p: number) => {
        const fade =
          p > coverStart
            ? Math.min(1, ((p - coverStart) * (n + 1 + COVER_SLOW)) / (1 + COVER_SLOW))
            : 0;
        fadeTo(1 - fade);
        if (riseTo) riseTo(-COVER_SLOW * vhPx * (1 - fade));
      };

      /* Snap variant — writes state immediately with no tween tail. Used for the
         initial mount and every ScrollTrigger refresh/resize, where the smoothed
         follower would otherwise animate the section into place over 150 ms
         (visible drop-in on load, or a slide after a viewport resize). */
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

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        // n segments drive the content animation; then ONE extra segment plus
        // the COVER_SLOW tail keeps the section pinned while the About Us
        // section slides up and covers it (cover-stack effect). pinSpacing:false
        // means the scroll distance comes from the real spacer div rendered
        // after the section ((n + COVER_SLOW) * 100vh) — About Us's top is held
        // at the viewport bottom exactly when the animation finishes, then rides
        // over the fixed section across the widened cover window below.
        end: `+=${(n + 1 + COVER_SLOW) * 100}%`,
        pin: true,
        pinSpacing: false,
        /* Mobile-only: touch scrolling arrives in uneven bursts (finger drag +
           fling momentum) so the pinned reel's incoming number "lafalafi"
           wobbles, while desktop's wheel feeds it a steady stream. GSAP's
           scroll normalizer intercepts touch input and synthesizes the same
           smooth, wheel-like scroll desktop gets. It's toggled ONLY while this
           section is pinned (and only on touch devices) so the Hero's mobile
           stepper and every other section keep native behavior; desktop never
           activates it at all. */
        onToggle: (self) => {
          if (ScrollTrigger.isTouch) ScrollTrigger.normalizeScroll(self.isActive);
        },
        onUpdate: (self) => {
          // Raw 0→1 across the whole pin range. The content timeline chases it
          // through the smoothed follower below; the cover applies it directly.
          targetProgress = self.progress;
          applyCover(self.progress);
        },
        // Re-assert the cover position after any refresh/resize, when ScrollTrigger
        // has just recalculated the pin range from the (transformed) layout.
        // Snap so the correction is instantaneous — a tween here would slide
        // the section visibly every time the window is resized.
        onRefresh: (self) => snapCover(self.progress),
      });
      snapCover(st.progress);

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

        // The content timeline only occupies the first n/(n+1+COVER_SLOW) of the
        // pin range; everything after it is the widened About Us cover.
        const animProgress = Math.min(1, scrollProgress * ((n + 1 + COVER_SLOW) / n));
        tl.progress(animProgress);

        // Number gradient: read the strip's current Y and fade each number's
        // gradient layer in by its distance from the capsule center. White is
        // kept over a small band around the center (a bit below → a bit above
        // the middle line); once a number drifts past that band it ramps into
        // the brand green gradient with distance, reaching full gradient at
        // the capsule edge — same as before, just a slightly wider white zone.
        const stripY = gsap.getProperty(stripRef.current!, "y") as number;
        const halfH = capsuleH / 2;
        // Half-height of the white dead zone around the center (~15% of one
        // item slot above AND below the middle line).
        const WHITE_BAND = itemH * 0.15;
        numGradRefs.current.forEach((el, i) => {
          if (!el) return;
          const numCenterY = stripY + i * itemH + itemH / 2;
          const dist = Math.abs(numCenterY - halfH);
          // Flat 0 (white) inside the band, then the same linear ramp so the
          // full green gradient (1) is still reached exactly at the edge.
          const t = Math.min(1, Math.max(0, dist - WHITE_BAND) / (halfH - WHITE_BAND));
          gsap.set(el, { opacity: t });
        });

        // Cover phase (this section's fade-out + About Us's slow rise) is not here
        // on purpose — it is applied synchronously from ScrollTrigger's own update
        // cycle in applyCover() above, so it can never fall a frame out of phase
        // with the pin. See the comment there.

        // Content-change trigger. Number i is centered at t = i; adding a
        // half-segment offset fires the change at t = i − 0.5, i.e. while the
        // incoming number is still down in the BOTTOM of the capsule (≈75% of
        // its height) rather than waiting for it to reach the center. Same
        // threshold in both directions, so reverse scrolling changes back when
        // the number reaches the bottom again.
        const idx = Math.min(n, Math.max(0, Math.floor(animProgress * n + 0.5)));
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
      // The trigger is gone, so its onToggle will never fire to release the
      // touch normalizer — kill it here so route changes don't leave the
      // whole page on normalized (synthetic) touch scrolling.
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
        // Base = 1st gradient (shown with the 1st number). Static — painted
        // once and cached; it is never animated, so it never repaints.
        background:
          "linear-gradient(180deg, #F3F3F1 -7.28%, #F3F4F1 16.35%, #D0E3CE 87.23%)",
      }}
    >
      {/* Final (darkest) gradient overlay. GPU-promoted (translateZ(0) +
          will-change:opacity) so its gradient is rasterized ONCE into a cached
          texture; animating its opacity happens purely on the compositor with
          zero repaint and zero main-thread cost. It ramps 0 → 1 across the
          whole reel, deepening the background from the 1st gradient into this
          one continuously. */}
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
        {/* Mobile: the three blocks (title · tube · stats) fill the section
            height and distribute evenly on the y-axis (h-full +
            justify-evenly), left-aligned. lg: restores the original centered
            row exactly — there h-full changes nothing because the row's
            children are vertically centered, and lg:justify-center keeps the
            horizontal centering. */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-evenly lg:justify-center gap-6 lg:gap-32 h-full w-full ">
          {/* Left side — Title (flex-1 only at lg: on mobile it must stay
              content-sized so justify-evenly can distribute the y-space) */}
          <div className="lg:flex-1 text-left mt-10 lg:mt-0">
            <h2 className="font-archivo-black uppercase text-[1.75rem] sm:text-4xl lg:text-[3rem] leading-[1.2] text-[var(--neutral-800)] word-space-4">
              <span className="text-nowrap block">ASG AT A</span>
              <span className="block">GLANCE</span>
            </h2>
          </div>

          {/* Center — Capsule with lens-shaped number scroll */}
          <div
            ref={capsuleRef}
            className="relative w-[calc(100vw-3rem)] shrink-0 self-center overflow-hidden rounded-full lg:w-[clamp(280px,52vw,760px)]"
            style={{
              // Mobile: the tube spans the full x-axis (viewport minus the
              // px-6 content padding). lg: keeps the original fluid clamp —
              // desktop is completely unchanged. Min back to 170px (150 read
              // as too short); 24vw only reaches 200px at ≥833px viewports,
              // so lg+ (245px+) never touches the min.
              height: "clamp(170px, 24vw, 360px)",
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
              {SLIDES.map((s, i) => (
                <div
                  key={s.number}
                  className="relative shrink-0 flex items-center justify-center"
                  style={{ height: "clamp(85px, 12vw, 180px)" }}
                >
                  {/* Base layer — always solid white, reads clean at the center */}
                  <span className="font-archivo-black text-white text-[clamp(3.5rem,0.96rem+8.4vw,8.5rem)] leading-none select-none">
                    {s.number}
                  </span>
                  {/* Gradient layer — opacity driven by distance from center. At
                      the top/bottom zones it reaches full brand gradient and the
                      black overlays above tint it to the "gradient + black" look. */}
                  <span
                    ref={(el) => { numGradRefs.current[i] = el; }}
                    className="font-archivo-black text-[clamp(3.5rem,0.96rem+8.4vw,8.5rem)] leading-none select-none absolute inset-0 flex items-center justify-center"
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

          {/* Right side — Stats (all slides pre-rendered & grid-stacked;
              opacity cross-faded by the scrubbed timeline — no DOM writes
              during scroll, so the number reel never jitters). */}
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
                  className="w-16 h-16 mx-0 mb-2"
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
    {/* Flow spacer — with pinSpacing:false this div (not a GSAP pin-spacer)
        supplies the scroll distance. --vh is the FULL viewport height
        (100lvh), and the section is one --vh tall, so (n + COVER_SLOW) × --vh
        = the animation range plus the extra tail the widened cover needs. That
        tail is what lets About Us take (1 + COVER_SLOW) viewports of scrolling
        for its one-viewport rise, i.e. the slower, smoother entrance. */}
    <div
      aria-hidden
      className="pointer-events-none w-full"
      style={{ height: `calc(var(--vh, 100vh) * ${SLIDES.length - 1 + COVER_SLOW})` }}
    />
    </>
  );
}
