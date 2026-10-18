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
