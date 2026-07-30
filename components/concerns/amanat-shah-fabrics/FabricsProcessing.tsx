"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

/* The track renders three copies of the image set and keeps the scroll
   position inside the middle copy, so the strip loops endlessly both ways. */
const COPIES = [0, 1, 2] as const;

const slides = [1, 2, 3, 4].map((n) => ({
  src: `/images/concerns/amanat-shah-fabrics/processing-${n}.webp`,
  alt: "Fabric processing at the Amanat Shah Fabrics facility",
}));

/**
 * "Amanat Shah Fabrics Processing Excellence" — heading over a full-bleed,
 * edge-to-edge looping strip of process photography (~2.4 frames visible).
 */
export default function FabricsProcessing() {
  const trackRef = useRef<HTMLDivElement>(null);

  const cardStep = (track: HTMLDivElement) => {
    const card = track.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth : track.clientWidth;
  };

  // Teleport by one whole copy when nearing either end — content is
  // identical one set away, so the jump is invisible
  const normalizeLoop = useCallback((track: HTMLDivElement) => {
    const step = cardStep(track);
    const setWidth = step * slides.length;
    if (!setWidth) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft < step) track.scrollLeft += setWidth;
    else if (track.scrollLeft > maxScroll - step) track.scrollLeft -= setWidth;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Start at the middle copy so both directions have room immediately
    track.scrollLeft = cardStep(track) * slides.length;
    const onScroll = () => normalizeLoop(track);
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [normalizeLoop]);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    normalizeLoop(track);
    track.scrollBy({ left: dir * cardStep(track), behavior: "smooth" });
  };

  return (
    <section
      id="fabrics-processing"
      className="w-full bg-white py-10 lg:py-[5em]"
    >
      <h2 className="px-4 font-test-tiempos-fine text-3xl text-neutral-800 sm:px-6 sm:text-4xl lg:px-[5em] lg:text-[4em] lg:leading-[1]">
        Amanat Shah Fabrics
        <br />
        Processing Excellence
      </h2>

      <div className="relative mt-6 lg:mt-[2.67em]">
        <div
          ref={trackRef}
          className="flex overflow-x-auto no-scrollbar"
        >
          {COPIES.map((copy) =>
            slides.map((slide, i) => (
              <Image
                key={`${copy}-${slide.src}`}
                src={slide.src}
                alt={copy === 0 ? slide.alt : ""}
                aria-hidden={copy === 0 ? undefined : true}
                width={608}
                height={250}
                quality={90}
                draggable={false}
                priority={copy === 1 && i < 3}
                className="w-[70%] shrink-0 object-cover sm:w-[45%] lg:h-[20.83em] lg:w-[50.67em]"
              />
            ))
          )}
        </div>

        {/* Edge chevrons */}
        <button
          type="button"
          aria-label="Previous processing image"
          onClick={() => scrollByCard(-1)}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-1 text-white cursor-pointer lg:left-[2.67em]"
        >
          <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next processing image"
          onClick={() => scrollByCard(1)}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-1 text-white cursor-pointer lg:right-[2.67em]"
        >
          <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
