"use client";

import Image from "next/image";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySliderProps {
  images: string[];
  heading: string;
}

/**
 * Full-bleed gallery slider — cards run edge-to-edge with no horizontal
 * padding, so the cards on both sides are clipped by the viewport. Arrows
 * sit on the left/right edges and advance exactly one card with native smooth
 * scrolling; the track follows a free 1:1 pointer drag (certification-strip
 * sliding mechanic).
 */
export default function GallerySlider({ images, heading }: GallerySliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Drag bookkeeping (refs — no re-render per move), mirroring the
  // certification strip: a 1:1 pointer scrub that follows the cursor freely.
  const dragRef = useRef({ down: false, startX: 0, startPos: 0 });

  // Width of one card step and of one full image copy (measured from the DOM
  // so gaps never skew the wrap seam).
  const pitches = (track: HTMLDivElement) => {
    const els = track.children;
    const step =
      els.length > 1
        ? (els[1] as HTMLElement).offsetLeft -
          (els[0] as HTMLElement).offsetLeft
        : track.clientWidth;
    const pitch =
      els.length > images.length
        ? (els[images.length] as HTMLElement).offsetLeft -
          (els[0] as HTMLElement).offsetLeft
        : track.scrollWidth / 2;
    return { step, pitch };
  };

  // Keep the position normalized within the first copy [0, pitch). Content is
  // identical one copy away, so wrapping the position is invisible.
  const wrap = (track: HTMLDivElement, value: number) => {
    const { pitch } = pitches(track);
    if (pitch <= 0) return value;
    let v = value;
    while (v < 0) v += pitch;
    while (v >= pitch) v -= pitch;
    return v;
  };

  // Arrow paging that always lands a full card flush to the edge you're
  // scrolling toward, so no trailing half-card peeks in beyond it:
  //   • next  → the card clipped at the right edge becomes fully visible,
  //             aligned to the viewport's right edge (nothing after it peeks);
  //   • prev  → the card clipped at the left edge becomes fully visible,
  //             aligned to the viewport's left edge.
  // The position is first re-based into the first copy so the doubled list
  // keeps the loop seamless in both directions.
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const { step, pitch } = pitches(track);
    if (step <= 0 || pitch <= 0) return;

    // Re-base into the first copy (invisible — the copies are identical).
    const start = wrap(track, track.scrollLeft);
    if (start !== track.scrollLeft) track.scrollLeft = start;

    const card = track.firstElementChild as HTMLElement | null;
    const cardW = card ? card.offsetWidth : step;
    const cw = track.clientWidth;

    let target: number;
    if (direction === 1) {
      // scrollLeft where a card's right edge meets the viewport's right edge,
      // just ahead of the current position.
      target =
        (Math.floor((start + cw - cardW) / step) + 1) * step + cardW - cw;
      if (target <= start) target += step;
    } else {
      // Snap the left-clipped card's left edge to the viewport's left edge.
      target = (Math.ceil(start / step) - 1) * step;
      if (target < 0) {
        track.scrollLeft = start + pitch;
        target += pitch;
      }
    }

    track.scrollTo({ left: target, behavior: "smooth" });
  };

  // --- Pointer drag-to-scroll (same mechanic as the certification strip) ---
  // Scrub for any pointer (mouse, pen, touch). `touch-pan-y` on the track
  // disables the browser's native horizontal pan so JS scrolling never fights
  // it; the track simply follows the cursor and stays where it is released.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { down: true, startX: e.clientX, startPos: track.scrollLeft };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    track.scrollLeft = wrap(track, dragRef.current.startPos - dx);
  };

  const endDrag = () => {
    dragRef.current.down = false;
  };

  return (
    <section className="relative w-full">
      {/* Scroll track — flush to both viewport edges */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="flex cursor-grab touch-pan-y select-none gap-2 overflow-x-auto overscroll-x-none active:cursor-grabbing sm:gap-4 lg:gap-[1.5rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Rendered twice so the one-card stepping can wrap seamlessly */}
        {[...images, ...images].map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative aspect-[291/250] w-[80vw] shrink-0 overflow-hidden rounded-[1rem] bg-[#D9D9D9] sm:aspect-[16/10] sm:rounded-[1.25rem] sm:w-[calc((100vw-1rem)/1.6)] lg:w-[calc((100vw-3rem)/2.3)]"
          >
            <Image
              src={src}
              alt={`${heading} — photo ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 70vw"
              draggable={false}
              className="pointer-events-none object-cover"
              quality={85}
            />
          </div>
        ))}
      </div>

      {/* Prev / next controls pinned to the viewport edges — desktop only.
          Hover paints the brand gradient over the white disc via an opacity
          fade (CSS can't transition a solid colour into a gradient). */}
      <button
        type="button"
        aria-label="Previous photo"
        onClick={() => scrollByCard(-1)}
        className="group absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 hover:scale-110 lg:left-10 lg:flex lg:h-12 lg:w-12"
      >
        <span
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          style={{ background: "var(--primary-gradient)" }}
        />
        <ChevronLeft className="relative h-6 w-6 text-neutral-900 transition-colors duration-300 group-hover:text-white lg:h-7 lg:w-7" strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={() => scrollByCard(1)}
        className="group absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 hover:scale-110 lg:right-10 lg:flex lg:h-12 lg:w-12"
      >
        <span
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          style={{ background: "var(--primary-gradient)" }}
        />
        <ChevronRight className="relative h-6 w-6 text-neutral-900 transition-colors duration-300 group-hover:text-white lg:h-7 lg:w-7" strokeWidth={2} />
      </button>
    </section>
  );
}
