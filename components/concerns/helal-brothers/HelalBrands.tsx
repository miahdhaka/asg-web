"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type BrandRowProps = {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
  /** Which side of the carousel the text column sits on (desktop). */
  textSide: "left" | "right";
};

/* One brand row: a text column beside a windowed carousel that shows one full
   547px card plus a peek of the next. Arrows step one card (wrapping at the
   ends) and the counter below tracks the card nearest the window's left edge. */
function BrandRow({ title, description, images, textSide }: BrandRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = images.length;

  // Card width + flex gap = one slide step
  const cardStep = (track: HTMLDivElement) => {
    const card = track.firstElementChild as HTMLElement | null;
    if (!card) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.offsetWidth + gap;
  };

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const stepWidth = cardStep(track);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const next = index + dir;
    if (next < 0) {
      track.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else if (next > count - 1) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollTo({
        left: Math.min(next * stepWidth, maxScroll),
        behavior: "smooth",
      });
    }
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const stepWidth = cardStep(track);
    const maxScroll = track.scrollWidth - track.clientWidth;
    // The final card never reaches the left edge — count a full scroll as it
    const atEnd = maxScroll > 0 && track.scrollLeft >= maxScroll - 2;
    const next = atEnd
      ? count - 1
      : Math.min(count - 1, Math.round(track.scrollLeft / stepWidth));
    setIndex(next);
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
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto no-scrollbar lg:gap-[1.33em]"
        >
          {images.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={547}
              height={356}
              quality={90}
              draggable={false}
              className="w-[85%] shrink-0 snap-start object-cover lg:h-[29.67em] lg:w-[45.58em]"
            />
          ))}
        </div>

        {/* Step arrows — pinned inside the window edges */}
        <button
          type="button"
          aria-label={`Previous ${title} image`}
          onClick={() => step(-1)}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-1 text-white cursor-pointer lg:left-[0.58em]"
        >
          <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={`Next ${title} image`}
          onClick={() => step(1)}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-1 text-white cursor-pointer lg:right-[0.58em]"
        >
          <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" aria-hidden>
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
