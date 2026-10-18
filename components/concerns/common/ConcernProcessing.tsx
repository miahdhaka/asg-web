"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";

type ConcernProcessingProps = {
  /** Optional anchor id for the section (e.g. "helal-processing"). */
  sectionId?: string;
  /** Section heading; each "\n" starts a new line. */
  title: string;
  slides: { src: string; alt: string }[];
};

/* The track renders two copies of the image set and wraps scrollLeft within
   the first copy, so it loops seamlessly in both directions — exactly like the
   homepage Certifications strip. */

/**
 * "<Concern> Processing Excellence" — heading over a full-bleed,
 * edge-to-edge looping strip of process photography (~2.4 frames visible).
 * Sister-concern reusable version of HelalProcessing — design identical,
 * heading and slides come from props.
 */
export default function ConcernProcessing({
  sectionId,
  title,
  slides,
}: ConcernProcessingProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Drag bookkeeping (refs — no re-render per move), mirroring the
  // certification strip: a 1:1 pointer scrub that follows the cursor freely.
  const dragRef = useRef({ down: false, startX: 0, startPos: 0 });

  // Two copies so the track can loop endlessly in both directions.
  const loopedSlides = [...slides, ...slides];

  // Card width = one slide step
  const cardStep = (track: HTMLDivElement) => {
    const card = track.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth : track.clientWidth;
  };

  // Keep scrollLeft normalized within the first copy [0, halfWidth). Content
  // is identical one set away, so wrapping the position is invisible.
  const wrap = (el: HTMLDivElement, value: number) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return value;
    let v = value;
    while (v < 0) v += half;
    while (v >= half) v -= half;
    return v;
  };

  // Arrow paging that always lands a full card flush to the edge you're
  // scrolling toward, so no trailing half-card peeks in beyond it:
  //   • next → the card clipped at the right edge becomes fully visible,
  //            aligned to the viewport's right edge (nothing after it peeks);
  //   • prev → the card clipped at the left edge becomes fully visible,
  //            aligned to the viewport's left edge.
  // The position is first re-based into the first copy so the doubled list
  // keeps the loop seamless in both directions.
  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const step = cardStep(track);
    if (step <= 0) return;
    const half = track.scrollWidth / 2;

    // Re-base into the first copy (invisible — the copies are identical).
    const start = wrap(track, track.scrollLeft);
    if (start !== track.scrollLeft) track.scrollLeft = start;

    const card = track.firstElementChild as HTMLElement | null;
    const cardW = card ? card.offsetWidth : step;
    const cw = track.clientWidth;

    let target: number;
    if (dir === 1) {
      // scrollLeft where a card's right edge meets the viewport's right edge,
      // just ahead of the current position.
      target =
        (Math.floor((start + cw - cardW) / step) + 1) * step + cardW - cw;
      if (target <= start) target += step;
    } else {
      // Snap the left-clipped card's left edge to the viewport's left edge.
      target = (Math.ceil(start / step) - 1) * step;
      if (target < 0) {
        track.scrollLeft = start + half;
        target += half;
      }
    }

    track.scrollTo({ left: target, behavior: "smooth" });
  };

  // --- Pointer drag-to-scroll (same mechanic as the certification strip) ---
  // Scrub for any pointer (mouse, pen, touch). `touch-pan-y` on the track
  // disables the browser's native horizontal pan so JS scrolling never fights
  // it; the track simply follows the cursor and stays where it is released.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { down: true, startX: e.clientX, startPos: track.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    track.scrollLeft = wrap(track, dragRef.current.startPos - dx);
  };

  const endDrag = () => {
    dragRef.current.down = false;
  };

  return (
    <section id={sectionId} className="w-full pt-8 lg:pt-[5em]">
      <h2 className="px-4 font-archivo-black uppercase text-lg sm:text-4xl text-neutral-800 sm:px-6 lg:px-[5rem] lg:text-[3em] lg:leading-[1.2]">
        {title.split("\n").map((line, i) => (
          <Fragment key={line}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </h2>


      <div className="relative mt-6 lg:mt-[2.67em]">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex cursor-grab touch-pan-y select-none overflow-x-auto overscroll-x-none no-scrollbar active:cursor-grabbing"
        >
          {loopedSlides.map((slide, index) => (
            <Image
              key={`${index}-${slide.src}`}
              src={slide.src}
              alt={index < slides.length ? slide.alt : ""}
              aria-hidden={index < slides.length ? undefined : true}
              width={608}
              height={250}
              quality={90}
              draggable={false}
              priority={index < 3}
              className="pointer-events-none w-[70%] shrink-0 object-cover h-[8rem] sm:w-[45%] sm:h-[16rem] lg:h-[20.83em] lg:w-[50.67em]"
            />
          ))}
        </div>

        {/* Edge chevrons */}
        <button
          type="button"
          aria-label="Previous processing image"
          onClick={() => scrollByCard(-1)}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 p-2 text-[1.375em] text-white cursor-pointer lg:left-[2rem] lg:p-2.5 lg:text-[2.375em]"
        >
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next processing image"
          onClick={() => scrollByCard(1)}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 p-2 text-[1.375em] text-white cursor-pointer lg:right-[2rem] lg:p-2.5 lg:text-[2.375em]"
        >
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
