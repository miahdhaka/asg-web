"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

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

/* Three identical copies of the set keep the loop seamless — the track
   teleports by one whole set whenever it nears either end. */
const COPIES = [0, 1, 2];

/* One brand row: a text column beside a windowed carousel that shows one full
   547px card plus a peek of the next. The track loops infinitely in both
   directions and scrolls by mouse drag. */
function BrandRow({ title, description, images, textSide }: BrandRowData) {
  const trackRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  /* CSS snap must be off while dragging — scroll-snap re-snaps every
     scrollLeft assignment, which freezes the track under the cursor */
  const [isDragging, setIsDragging] = useState(false);
  const snapRestoreTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* The GSAP tween currently gliding the track (native smooth-scroll fights
     with snap-mandatory, so every slide is animated with GSAP instead) */
  const slideTween = useRef<gsap.core.Tween | null>(null);
  // Mouse-drag bookkeeping (refs — no re-render needed per move)
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startScrollLeft: 0,
    /* Flick sampling: previous scroll position, its timestamp, and the
       resulting velocity in px per ms (positive = advancing) */
    lastScroll: 0,
    lastTime: 0,
    vx: 0,
  });

  // Card width + flex gap = one slide step
  const cardStep = (track: HTMLDivElement) => {
    const card = track.firstElementChild as HTMLElement | null;
    if (!card) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.offsetWidth + gap;
  };

  // Teleport by one whole copy when nearing either end — content is
  // identical one set away, so the jump is invisible
  const isNormalizing = useRef(false);
  const normalizeLoop = useCallback(
    (track: HTMLDivElement) => {
      if (isNormalizing.current) return;
      const step = cardStep(track);
      const setWidth = step * count;
      if (!setWidth) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      let delta = 0;
      if (track.scrollLeft < step) delta = setWidth;
      else if (track.scrollLeft > maxScroll - step) delta = -setWidth;
      if (delta) {
        isNormalizing.current = true;
        // Disable snap during teleport to prevent jitter
        track.style.scrollSnapType = "none";
        track.scrollLeft += delta;
        if (drag.current.active) drag.current.startScrollLeft += delta;
        // Restore snap on next frame
        requestAnimationFrame(() => {
          track.style.scrollSnapType = "";
          isNormalizing.current = false;
        });
      }
    },
    [count]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Start at the middle copy so both directions have room immediately
    track.scrollLeft = cardStep(track) * count;
    const onScroll = () => normalizeLoop(track);
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      slideTween.current?.kill();
      if (snapRestoreTimer.current) clearTimeout(snapRestoreTimer.current);
    };
  }, [normalizeLoop, count]);

  // GSAP glide to an absolute scrollLeft — smooth, interruptible, and immune
  // to the snap-mandatory re-snap that stutters native smooth-scroll
  const glideTo = (
    track: HTMLDivElement,
    left: number,
    duration = 0.6,
    ease = "power2.inOut"
  ) => {
    slideTween.current?.kill();
    slideTween.current = gsap.to(track, {
      scrollLeft: left,
      duration,
      ease,
      overwrite: true,
    });
  };

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Re-center first so there is always a full copy of room to scroll into
    normalizeLoop(track);
    // Snap off while the glide runs, then restore once it settles
    if (snapRestoreTimer.current) clearTimeout(snapRestoreTimer.current);
    setIsDragging(true);
    glideTo(track, track.scrollLeft + dir * cardStep(track));
    snapRestoreTimer.current = setTimeout(() => setIsDragging(false), 700);
  };

  // --- Mouse drag-to-scroll (touch keeps native scrolling + CSS snap) ---
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    slideTween.current?.kill();
    if (snapRestoreTimer.current) clearTimeout(snapRestoreTimer.current);
    normalizeLoop(track);
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startScrollLeft: track.scrollLeft,
      lastScroll: track.scrollLeft,
      lastTime: e.timeStamp,
      vx: 0,
    };
    setIsDragging(true);
  };

  /* The rest of the drag is tracked on window rather than via
     setPointerCapture: capturing the pointer retargets the follow-up click to
     the track. Window listeners keep the drag alive when the cursor leaves
     the track just the same. */
  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: PointerEvent) => {
      const track = trackRef.current;
      if (!track || !drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      if (Math.abs(dx) > 5) drag.current.moved = true;
      track.scrollLeft = drag.current.startScrollLeft - dx;
      /* Keep a smoothed velocity of the track itself. A gap of more than
         ~80ms means the pointer paused, so the flick is treated as none. */
      const dt = e.timeStamp - drag.current.lastTime;
      if (dt > 0 && dt < 80) {
        const instant = (track.scrollLeft - drag.current.lastScroll) / dt;
        drag.current.vx = drag.current.vx * 0.5 + instant * 0.5;
      } else {
        drag.current.vx = 0;
      }
      drag.current.lastScroll = track.scrollLeft;
      drag.current.lastTime = e.timeStamp;
      // Keep looping even mid-drag (adjusts startScrollLeft alongside)
      normalizeLoop(track);
    };

    const onUp = () => {
      const track = trackRef.current;
      if (!track || !drag.current.active) return;
      drag.current.active = false;
      if (!drag.current.moved) {
        // Plain click — nothing scrolled, restore snap right away
        setIsDragging(false);
        return;
      }
      /* Free-scroll release: let the flick carry the track (capped at 2½
         cards), settle on the nearest card, and ease out rather than stop */
      const step = cardStep(track);
      const carry = Math.max(
        -2.5 * step,
        Math.min(2.5 * step, drag.current.vx * 150)
      );
      const target = Math.round((track.scrollLeft + carry) / step) * step;
      const duration = Math.min(
        0.9,
        0.45 + (Math.abs(target - track.scrollLeft) / step) * 0.18
      );
      glideTo(track, target, duration, "power3.out");
      snapRestoreTimer.current = setTimeout(
        () => setIsDragging(false),
        duration * 1000 + 80
      );
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [isDragging, normalizeLoop]);

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
          className={`flex gap-2 overflow-x-auto no-scrollbar select-none cursor-grab active:cursor-grabbing lg:gap-[1.33em] lg:rounded-[1.25rem] ${
            isDragging ? "snap-none" : "snap-x snap-proximity"
          }`}
        >
          {COPIES.map((copy) =>
            images.map((image) => (
              <Image
                key={`${copy}-${image.src}`}
                src={image.src}
                alt={copy === 0 ? image.alt : ""}
                aria-hidden={copy === 0 ? undefined : true}
                width={547}
                height={356}
                quality={90}
                draggable={false}
                className="pointer-events-none w-[85%] shrink-0 snap-start rounded-[1.25rem] object-cover lg:h-[29.67em] lg:w-[45.58em] lg:rounded-[1.25rem]"
              />
            ))
          )}
        </div>

        {/* Step arrows — pinned inside the window edges */}
        <button
          type="button"
          aria-label={`Previous ${title} image`}
          onClick={() => scrollByCard(-1)}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 p-1.5 text-[1.25em] text-white cursor-pointer lg:left-[0.58em] lg:p-2 lg:text-[2.25em]"
        >
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={`Next ${title} image`}
          onClick={() => scrollByCard(1)}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 p-1.5 text-[1.25em] text-white cursor-pointer lg:right-[0.58em] lg:p-2 lg:text-[2.25em]"
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
