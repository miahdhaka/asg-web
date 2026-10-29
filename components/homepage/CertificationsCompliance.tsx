"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { certLogos } from "@/components/certificates/certData";

// The PDF preview lightbox pulls in pdf.js and only ever renders on the
// client once a certificate is clicked, so keep it out of the server render.
const CertLightbox = dynamic(() => import("./CertLightbox"), { ssr: false });

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
  // pauses the auto-play for the duration of the press. `moved` distinguishes
  // an actual drag from a plain click, so scrubbing the strip never fires the
  // preview of whichever tile the pointer happens to be over on release.
  const dragRef = useRef({ down: false, startX: 0, startPos: 0, moved: false });

  // Index (into certLogos) of the certificate currently previewed, or null.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
    // Smoothed progress value. The raw p teleports 1 → 0 when the strip
    // wraps back to the first tile; lerping the displayed value makes the
    // segment glide back across the track smoothly instead of snapping.
    let displayP = posRef.current / (el.scrollWidth / 2 || 1);

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
        displayP += (p - displayP) * 0.12;
        // Snap once settled so an idle bar doesn't drift sub-pixel forever.
        if (Math.abs(p - displayP) < 0.001) displayP = p;
        // Segment is 1/3 of the line; sliding it 0→200% of its own width
        // sweeps it across the remaining 2/3 of the track.
        progressRef.current.style.transform = `translateX(${displayP * 200}%)`;
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

  // --- Pointer drag to scroll (GreenerFuture-style) ----------------------
  // Scrub for any pointer (mouse, pen, touch) so a cursor can drag the strip
  // exactly like on desktop. `touch-pan-y` on the track disables the browser's
  // native horizontal pan, so JS-controlled scrolling never fights it (that
  // fight was what looked like a stutter/flicker on mobile).
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = { down: true, startX: e.clientX, startPos: posRef.current, moved: false };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 6) dragRef.current.moved = true;
    posRef.current = wrap(el, dragRef.current.startPos - dx);
    el.scrollLeft = posRef.current;
  };

  const endDrag = () => {
    if (!dragRef.current.down) return;
    dragRef.current.down = false;
    // Re-sync the auto-scroll position to wherever the strip actually is after
    // a drag, so playback resumes smoothly instead of snapping.
    const el = trackRef.current;
    if (el) posRef.current = wrap(el, el.scrollLeft);
  };

  return (
    <section
      id="certifications-compliance"
      className="base-gradient relative w-full overflow-hidden pt-0 pb-16 lg:pt-22 lg:pb-22"
    >
      {/* Header — eyebrow + heading with the "View all" link top-right on
          wide screens; stacked (button below the heading) on mobile so the
          long single-word title never forces the pill to overflow/clip. */}
      <div className="flex flex-col gap-4 px-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:max-w-[55%]">
          <div className="text-sm inline-flex items-center gap-2.5 sm:gap-1.5 font-space-mono font-medium uppercase tracking-wider mb-4.5">
            <span>Our Certificate</span>
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--primary-gradient)" }} />
          </div>

          <h2 className="font-archivo-black uppercase text-[1.75rem] sm:text-4xl lg:text-[3rem] leading-[1.2] text-[var(--neutral-800)] word-space-4">
            Certifications
            <br />
            and Compliance
          </h2>
        </div>

        {/* Rounded pill with a 1px gradient ring and the same `top`-based flip
            hover as the Newsroom "More news" button — linking to the full
            certificates page. */}
        <Link
          href="/all-certificates"
          aria-label="View All Certificates"
          className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-transparent self-start px-3.5 py-3.5 text-[0.75rem] font-medium leading-none sm:mt-1 sm:px-[1.4rem] sm:py-3 sm:text-[0.95rem] lg:py-4 lg:text-[1.05rem]"
          style={{
            background:
              'linear-gradient(#F3F3F1, #F3F3F1) padding-box, linear-gradient(97.37deg, #8BC34A 1.29%, #1AA179 92.01%) border-box',
          }}
        >
          {/* Invisible spacer — preserves the button's intrinsic size */}
          <span className="invisible inline-flex items-center whitespace-nowrap tracking-wider">
            View All Certificates
          </span>

          {/* Default: gradient text — slides down and out on hover.
              Animated via `top` (not translate/transform): transform-animated
              children get composited into their own layer, which makes
              Chrome's rounded overflow clip degrade to a rectangle and the
              panels visibly poke outside the pill mid-slide. */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 flex h-full items-center justify-center whitespace-nowrap transition-[top] duration-500 ease-in-out group-hover:top-full"
          >
            <span
              className="bg-clip-text text-transparent tracking-wider"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              View All Certificates
            </span>
          </span>

          {/* Hover: gradient fill + white text — slides in from the top */}
          <span
            aria-hidden
            className="absolute inset-x-0 -top-full flex h-full items-center justify-center whitespace-nowrap text-white transition-[top] duration-500 ease-in-out group-hover:top-0"
            style={{ background: "var(--primary-gradient)" }}
          >
            <span className="tracking-wider">View All Certificates</span>
          </span>
        </Link>
      </div>

      {/* Full-bleed, very slow auto-scrolling logo strip */}
      <div
        className="relative mt-4 sm:mt-12 py-5 lg:mt-16 lg:py-7"
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
          className="no-scrollbar flex cursor-grab touch-pan-y select-none items-stretch overflow-x-auto overscroll-x-none active:cursor-grabbing"
        >
          {loopedLogos.map((logo, index) => {
            // Map the duplicated loop back to the real certificate index.
            const certIndex = index % certLogos.length;
            const previewable = Boolean(logo.pdf);
            const openPreview = () => {
              // Ignore the click if it was really the tail end of a drag.
              if (dragRef.current.moved) return;
              if (logo.pdf) setActiveIndex(certIndex);
            };
            return (
              <div
                key={`${logo.src}-${index}`}
                data-card
                role={previewable ? "button" : undefined}
                tabIndex={previewable ? 0 : undefined}
                aria-label={previewable ? `View ${logo.label} certificate` : undefined}
                onClick={previewable ? openPreview : undefined}
                onKeyDown={
                  previewable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveIndex(certIndex);
                        }
                      }
                    : undefined
                }
                className={`relative h-36 w-48 shrink-0 overflow-hidden sm:h-44 sm:w-64 lg:h-56 lg:w-88 ${
                  previewable ? "cursor-pointer" : ""
                }`}
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

              {/* Bottom edge — reverse of the top: gradient on the left fading to white on the right */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.25px] opacity-45"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(26, 161, 121, 0.75) 0%, rgba(26, 161, 121, 0.75) 50%, rgba(26, 161, 121, 0.08) 100%)",
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
                  unoptimized={logo.src.endsWith(".svg")}
                />
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Bottom slider control — prev arrow, progress line, next arrow */}
      <div className="mt-6 sm:mt-10 lg:mt-14 flex items-center justify-center gap-6 lg:gap-8">
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

      {/* Certificate PDF preview — only mounted while a tile is active */}
      {activeIndex !== null && certLogos[activeIndex].pdf && (
        <CertLightbox
          key={certLogos[activeIndex].pdf}
          pdfUrl={certLogos[activeIndex].pdf!}
          caption={certLogos[activeIndex].label}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}
