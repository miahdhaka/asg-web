"use client";

import Image from "next/image";
import { useRef } from "react";

export type BrandRowData = {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
  /** Which side of the carousel the text column sits on (desktop). */
  textSide: "left" | "right";
};

type ConcernBrandsProps = {
  /** Optional anchor id for the section (e.g. "helal-brands"). */
  sectionId?: string;
  heading: string;
  /** Copy shown beside the section heading. */
  intro: string;
  /** One entry per carousel row; consecutive rows are split by a hairline. */
  rows: BrandRowData[];
};

/* Two identical copies of the set keep the loop seamless — scrollLeft wraps
   within the first copy, exactly like the homepage Certifications strip. */

/* One brand row: a text column beside a windowed carousel that shows one full
   547px card plus a peek of the next. The track loops infinitely in both
   directions and scrolls by free 1:1 pointer drag. */
function BrandRow({ title, description, images, textSide }: BrandRowData) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Drag bookkeeping (refs — no re-render per move), mirroring the
  // certification strip: a 1:1 pointer scrub that follows the cursor freely.
  const dragRef = useRef({ down: false, startX: 0, startPos: 0 });

  // Two copies so the track can loop endlessly in both directions.
  const loopedImages = [...images, ...images];

  // One-card step = card width + gap. Measured from the DOM (offsetLeft diff
  // between the first two children) so the doubled-list seam stays clean —
  // the duplicated list has 2N cards and 2N-1 gaps, so `scrollWidth / 2` isn't
  // the true pitch once a gap is present.
  const cardStep = (track: HTMLDivElement) => {
    const els = track.children;
    if (els.length > 1) {
      return (
        (els[1] as HTMLElement).offsetLeft - (els[0] as HTMLElement).offsetLeft
      );
    }
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
  // keeps the loop seamless in both directions. Identical mechanic to the
  // Processing Excellence strip.
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

  const textCol = (
    <div
      className={`order-2 shrink-0 self-center lg:order-none ${
        textSide === "left" ? "lg:w-[29.33em]" : "lg:w-[25em]"
      }`}
    >
      <h3 className="font-archivo-black text-lg sm:text-2xl lg:text-[2em] tracking-[0.04em] text-neutral-800 lg:leading-[1.33]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-neutral-800 lg:mt-[0.67em] lg:text-[1.17em] lg:leading-[1.43]">
        {description}
      </p>
    </div>
  );

  const carousel = (
    <div className="order-1 -mr-4 min-w-0 flex-1 sm:-mr-6 lg:order-none lg:mr-0 lg:w-[60.08em] lg:flex-none">
      <div className="relative">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex cursor-grab touch-pan-y select-none gap-2 overflow-x-auto overscroll-x-none no-scrollbar active:cursor-grabbing lg:gap-[1.33em] lg:rounded-[1.25rem]"
        >
          {loopedImages.map((image, index) => (
            <Image
              key={`${index}-${image.src}`}
              src={image.src}
              alt={index < images.length ? image.alt : ""}
              aria-hidden={index < images.length ? undefined : true}
              width={547}
              height={356}
              quality={90}
              draggable={false}
              className="pointer-events-none w-[85%] shrink-0 rounded-[1.25rem] object-cover lg:h-[29.67em] lg:w-[45.58em] lg:rounded-[1.25rem]"
            />
          ))}
        </div>

        {/* Edge chevrons — same styling as the Processing Excellence strip */}
        <button
          type="button"
          aria-label="Previous brand image"
          onClick={() => scrollByCard(-1)}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 p-2 text-[1.375em] text-white cursor-pointer lg:left-[2rem] lg:p-2.5 lg:text-[2.375em]"
        >
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next brand image"
          onClick={() => scrollByCard(1)}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 p-2 text-[1.375em] text-white cursor-pointer lg:right-[2rem] lg:p-2.5 lg:text-[2.375em]"
        >
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-[5.33em]">
      {textSide === "left" ? (
        <>
          {textCol}
          {carousel}
        </>
      ) : (
        <>
          {carousel}
          {textCol}
        </>
      )}
    </div>
  );
}

/**
 * Section header plus mirrored brand carousels divided by hairlines
 * (Figma frame 2147227356). Sister-concern reusable version of HelalBrands —
 * design identical, heading/intro/rows all come from props.
 */
export default function ConcernBrands({
  sectionId,
  heading,
  intro,
  rows,
}: ConcernBrandsProps) {
  return (
    <section
      id={sectionId}
      className="w-full px-4 pt-10 sm:px-6 lg:px-[5em] lg:pt-[5em] pb-6"
    >
      <div className="flex flex-col gap-2 sm:gap-4 lg:flex-row lg:justify-between">
        <h2 className="font-archivo-black text-2xl sm:text-4xl lg:text-[3em] uppercase text-neutral-800 lg:leading-[1]">
          {heading}
        </h2>
        {/* Measure tuned so this copy always breaks into 4 lines; both the type
            size and the width are em, so the break point holds at any lg width */}
        <p className="text-sm text-neutral-800 lg:mr-[14em] lg:w-[30em] lg:text-[1.17em] lg:leading-[1.43]">
          {intro}
        </p>
      </div>

      <div className="mt-10 lg:mt-[2.67em] lg:ml-[7.58em]">
        {rows.map((row, index) => (
          <div key={row.title}>
            {index > 0 && (
              <div aria-hidden className="my-8 border-t border-neutral-200 lg:my-[4em]" />
            )}
            <BrandRow
              title={row.title}
              description={row.description}
              images={row.images}
              textSide={row.textSide}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
