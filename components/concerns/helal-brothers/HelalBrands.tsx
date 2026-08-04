"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

type BrandRowProps = {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
  /** Which side of the carousel the text column sits on (desktop). */
  textSide: "left" | "right";
};

/* Three identical copies of the set keep the loop seamless — the track
   teleports by one whole set whenever it nears either end. */
const COPIES = [0, 1, 2];

/* One brand row: a text column beside a windowed carousel that shows one full
   547px card plus a peek of the next. The track loops infinitely in both
   directions, scrolls by mouse drag, and the counter below tracks the card
   nearest the window's left edge. */
function BrandRow({ title, description, images, textSide }: BrandRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = images.length;

  /* CSS snap must be off while dragging — snap-mandatory re-snaps every
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
  const normalizeLoop = useCallback(
    (track: HTMLDivElement) => {
      const step = cardStep(track);
      const setWidth = step * count;
      if (!setWidth) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      let delta = 0;
      if (track.scrollLeft < step) delta = setWidth;
      else if (track.scrollLeft > maxScroll - step) delta = -setWidth;
      if (delta) {
        track.scrollLeft += delta;
        if (drag.current.active) drag.current.startScrollLeft += delta;
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
  const glideTo = (track: HTMLDivElement, left: number) => {
    slideTween.current?.kill();
    slideTween.current = gsap.to(track, {
      scrollLeft: left,
      duration: 0.6,
      ease: "power2.inOut",
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
      // Glide to the nearest card, then re-enable CSS snap once settled
      const step = cardStep(track);
      const target = Math.round(track.scrollLeft / step) * step;
      glideTo(track, target);
      snapRestoreTimer.current = setTimeout(() => setIsDragging(false), 700);
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

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const stepWidth = cardStep(track);
    setIndex(
      ((Math.round(track.scrollLeft / stepWidth) % count) + count) % count
    );
  };

  const textCol = (
    <div
      className={`shrink-0 self-center ${
        textSide === "left" ? "lg:w-[29.33em]" : "lg:w-[25em]"
      }`}
    >
      <h3 className="font-test-tiempos-fine text-xl font-medium uppercase tracking-[0.04em] text-neutral-800 sm:text-2xl lg:text-[2em] lg:leading-[1.33]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-neutral-800 lg:mt-[0.67em] lg:text-[1.17em] lg:leading-[1.43]">
        {description}
      </p>
    </div>
  );

  const carousel = (
    <div className="min-w-0 flex-1 lg:w-[60.08em] lg:flex-none">
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          className={`flex gap-3 overflow-x-auto no-scrollbar select-none cursor-grab active:cursor-grabbing lg:gap-[1.33em] ${
            isDragging ? "snap-none" : "snap-x snap-mandatory"
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
                className="pointer-events-none w-[85%] shrink-0 snap-start object-cover lg:h-[29.67em] lg:w-[45.58em]"
              />
            ))
          )}
        </div>

        {/* Step arrows — pinned inside the window edges */}
        <button
          type="button"
          aria-label={`Previous ${title} image`}
          onClick={() => scrollByCard(-1)}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-2 text-white cursor-pointer lg:left-[0.58em]"
        >
          <svg width="2.25em" height="2.25em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={`Next ${title} image`}
          onClick={() => scrollByCard(1)}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-2 text-white cursor-pointer lg:right-[0.58em]"
        >
          <svg width="2.25em" height="2.25em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p className="mt-2 text-right text-sm text-neutral-800 lg:mt-[0.92em] lg:text-[1.33em] lg:leading-[1.5]">
        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </p>
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

const row1Images = [1, 2, 3, 4, 5].map((n) => ({
  src: `/images/concerns/helal-brothers/brand-1-${n}.webp`,
  alt: "Amanat Shah lungi, gamcha and fabric collection",
}));

const row2Images = [1, 2, 3, 4, 5, 6].map((n) => ({
  src: `/images/concerns/helal-brothers/brand-2-${n}.webp`,
  alt: "Standard lungi, sharee, three piece, voile and poplin collection",
}));

/**
 * "Our Brands" — section header plus two mirrored brand carousels divided by
 * a hairline (Figma frame 2147227356).
 */
export default function HelalBrands() {
  return (
    <section
      id="helal-brands"
      className="w-full bg-white px-4 py-10 sm:px-6 lg:px-[5em] lg:py-[5em]"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <h2 className="font-test-tiempos-fine text-3xl text-neutral-800 sm:text-4xl lg:text-[4em] lg:leading-[1]">
          Our Brands
        </h2>
        {/* 359px design width at 14px type → 25.64em in the paragraph's own em */}
        <p className="text-sm text-neutral-800 lg:w-[25.64em] lg:text-[1.17em] lg:leading-[1.43]">
          From heritage lungis to contemporary sharees, each brand under
          Amanat Shah Group carries forward a distinct craft tradition —
          rooted in Bangladesh&apos;s textile heritage, made for the modern
          wardrobe.
        </p>
      </div>

      <div className="mt-8 lg:mt-[2.67em] lg:ml-[7.58em]">
        <BrandRow
          title="Amanat Shah Lungi, Gamcha, Fabric"
          description="Experience unparalleled comfort with our premium, authentically crafted lungis. Woven from high-quality yarns, these traditional garments embody the timeless elegance and heritage of Bangladeshi textiles, designed for durability and a sophisticated feel."
          images={row1Images}
          textSide="left"
        />

        <div aria-hidden className="my-8 border-t border-neutral-200 lg:my-[2.67em]" />

        <BrandRow
          title="Standard Lungi, Sharee, Three Piece, Voile & Poplin"
          description="Celebrate grace with our exquisite collection of traditional ethnic sharees. Each piece reflects meticulous craftsmanship and artistic detailing, offering a perfect blend of classic aesthetics and contemporary appeal for every occasion."
          images={row2Images}
          textSide="right"
        />
      </div>
    </section>
  );
}
