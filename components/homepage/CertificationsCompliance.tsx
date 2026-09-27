"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

interface CertLogo {
  label: string;
  src: string;
}

// Certification logos reused from /public/images/certification/.
const certLogos: CertLogo[] = [
  { label: "Cotton Made in Africa", src: "/images/certification/certificate1.png" },
  { label: "BSCI", src: "/images/certification/certificate2.png" },
  { label: "Cotton USA", src: "/images/certification/certificate-3.png" },
  { label: "Regenerated Cellulosics", src: "/images/certification/certificate4.png" },
  { label: "Higg Index", src: "/images/certification/certificate5.png" },
  { label: "BCI", src: "/images/certification/certificate6.png" },
  { label: "GOTS", src: "/images/certification/certificate7.png" },
  { label: "OEKO-TEX Standard 100", src: "/images/certification/certificate8.png" },
  { label: "Organic 100", src: "/images/certification/certificate-9.png" },
  { label: "Claim Standard", src: "/images/certification/certificate-10.png" },
  { label: "USGBC", src: "/images/certification/certificate-11.png" },
];

// Slider speed control — higher = faster, lower = slower.
// Kept deliberately small so the logo strip drifts very slowly.
const SCROLL_SPEED = 0.65;

export default function CertificationsCompliance() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  // Float scroll position. `el.scrollLeft` is rounded to whole pixels by the
  // browser, so adding a sub-pixel speed (0.25) directly to it and writing it
  // back would snap to the same integer every frame and never move. We keep
  // the true fractional position here and only push it out to scrollLeft.
  const posRef = useRef(0);
  const isArrowScrollingRef = useRef(false);
  const arrowTimerRef = useRef<number | null>(null);

  // Mouse-drag state (mirrors GreenerFuture): dragging scrubs the strip and
  // pauses the auto-play for the duration of the press.
  const dragRef = useRef({ down: false, startX: 0, startPos: 0 });

  // Render the list twice so the strip can loop seamlessly.
  const loopedLogos = [...certLogos, ...certLogos];

  // Keep scrollLeft normalized within the first copy [0, halfWidth).
  const wrap = (el: HTMLDivElement, value: number) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return value;
    let v = value;
    while (v < 0) v += half;
    while (v >= half) v -= half;
    return v;
  };

  // Continuous, very slow infinite auto-scroll + progress-bar sync.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    posRef.current = el.scrollLeft;
    let raf = 0;

    const tick = () => {
      if (isArrowScrollingRef.current) {
        posRef.current = wrap(el, el.scrollLeft);
      } else if (!isHoveredRef.current && !dragRef.current.down) {
        posRef.current = wrap(el, posRef.current + SCROLL_SPEED);
        el.scrollLeft = posRef.current;
      }
      // Drive the bottom progress segment from the wrapped position.
      const half = el.scrollWidth / 2;
      if (half > 0 && progressRef.current) {
        const p = posRef.current / half;
        // Segment is 1/3 of the line; sliding it 0→200% of its own width
        // sweeps it across the remaining 2/3 of the track.
        progressRef.current.style.transform = `translateX(${p * 200}%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (arrowTimerRef.current !== null) {
        window.clearTimeout(arrowTimerRef.current);
      }
    };
  }, []);

  // Smoothly advance by one tile, matching the GreenerFuture arrows.
  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 0;
    const step = card ? card.offsetWidth + gap : el.clientWidth;
    const half = el.scrollWidth / 2;
    let start = el.scrollLeft;

    // Move to the equivalent position in the duplicate set before scrolling
    // backward from the first tile, preserving the seamless loop.
    if (direction === -1 && half > 0 && start < step) {
      start += half;
      el.scrollLeft = start;
    }

    isArrowScrollingRef.current = true;
    el.scrollTo({ left: start + direction * step, behavior: "smooth" });

    if (arrowTimerRef.current !== null) {
      window.clearTimeout(arrowTimerRef.current);
    }
    arrowTimerRef.current = window.setTimeout(() => {
      posRef.current = wrap(el, el.scrollLeft);
      el.scrollLeft = posRef.current;
      isArrowScrollingRef.current = false;
    }, 500);
  };

  // --- Mouse / pointer drag to scroll (GreenerFuture-style) --------------
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    dragRef.current = { down: true, startX: e.clientX, startPos: posRef.current };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    posRef.current = wrap(el, dragRef.current.startPos - dx);
    el.scrollLeft = posRef.current;
  };

  const endDrag = () => {
    dragRef.current.down = false;
  };

  return (
    <section
      id="certifications-compliance"
      className="base-gradient relative w-full overflow-hidden py-16 lg:py-22"
    >
      {/* Header — eyebrow + heading, sized to match the About Us header */}
      <div className="px-6 md:px-12 lg:px-20">
        <span className="inline-flex items-center gap-1.5 font-space-mono font-medium text-[var(--neutral-800)] uppercase">
          Our Certifications{" "}
          <span className="text-2xl leading-none bg-gradient-to-b from-[#4a9e4a] to-[#2d6b2d] bg-clip-text text-transparent">
            •
          </span>
        </span>
        <h2 className="mt-7 font-archivo-black uppercase text-2xl sm:text-4xl lg:text-[3rem] leading-[1.1] text-[var(--neutral-800)]">
          Certifications
          <br />
          and Compliance
        </h2>
      </div>

      {/* Full-bleed, very slow auto-scrolling logo strip */}
      <div
        className="relative mt-12 py-5 lg:mt-16 lg:py-7"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="no-scrollbar flex cursor-grab active:cursor-grabbing items-stretch overflow-x-auto select-none overscroll-x-none"
        >
          {loopedLogos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              data-card
              className="relative h-40 w-56 sm:h-44 sm:w-64 lg:h-56 lg:w-88 shrink-0 overflow-hidden border-b-[1.55px] border-transparent"
              style={{
                borderImageSource:
                  "linear-gradient(120.96deg, rgba(255, 255, 255, 0.75) 0.39%, rgba(26, 161, 121, 0.75) 44.92%, rgba(255, 255, 255, 0.75) 102.76%)",
                borderImageSlice: 1,
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[1.25px] opacity-45"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(26, 161, 121, 0.08) 0%, rgba(26, 161, 121, 0.75) 50%, rgba(26, 161, 121, 0.75) 100%)",
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-[1.55px] opacity-45"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26, 161, 121, 0.08) 0%, rgba(26, 161, 121, 0.75) 50%, rgba(26, 161, 121, 0.75) 100%)",
                }}
              />

              <div className="absolute inset-4 sm:inset-5 lg:inset-6">
                <Image
                  src={logo.src}
                  alt={logo.label}
                  fill
                  sizes="(min-width: 1024px) 15rem, 12rem"
                  draggable={false}
                  className="pointer-events-none scale-75 object-contain"
                  quality={90}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom slider control — prev arrow, progress line, next arrow */}
      <div className="mt-10 lg:mt-14 flex items-center justify-center gap-6 lg:gap-8">
        <button
          type="button"
          aria-label="Previous certification"
          onClick={() => scrollByCard(-1)}
          className="cursor-pointer text-[#1AA179] transition-transform duration-300 hover:scale-110"
        >
          <ArrowLeft className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={2} />
        </button>

        {/* Progress line with a green segment tracking scroll position */}
        <div className="relative h-[2px] w-28 lg:w-44 overflow-hidden bg-neutral-500/10">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#8BC34A] to-[#1AA179]"
          />
        </div>

        <button
          type="button"
          aria-label="Next certification"
          onClick={() => scrollByCard(1)}
          className="cursor-pointer text-[#1AA179] transition-transform duration-300 hover:scale-110"
        >
          <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
