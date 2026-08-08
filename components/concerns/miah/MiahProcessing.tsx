"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* The track renders three copies of the image set and keeps the scroll
   position inside the middle copy, so the strip loops endlessly both ways. */
const COPIES = [0, 1, 2] as const;

const slides = [1, 2, 3, 4].map((n) => ({
  src: `/images/concerns/miah/processing-${n}.png`,
  alt: "Fashion processing at MIAH",
}));

/**
 * "MIAH Processing Excellence" — heading over a full-bleed,
 * edge-to-edge looping strip of process photography (~2.4 frames visible).
 */
export default function MiahProcessing() {
  const trackRef = useRef<HTMLDivElement>(null);
  /* The GSAP tween currently gliding the track — every slide animates with
     GSAP for a consistent, interruptible ease */
  const slideTween = useRef<gsap.core.Tween | null>(null);
  // Mouse-drag bookkeeping (refs — no re-render needed per move)
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

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
    let delta = 0;
    if (track.scrollLeft < step) delta = setWidth;
    else if (track.scrollLeft > maxScroll - step) delta = -setWidth;
    if (delta) {
      track.scrollLeft += delta;
      if (drag.current.active) drag.current.startScrollLeft += delta;
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Start at the middle copy so both directions have room immediately
    track.scrollLeft = cardStep(track) * slides.length;
    const onScroll = () => normalizeLoop(track);
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      slideTween.current?.kill();
    };
  }, [normalizeLoop]);

  // GSAP glide to an absolute scrollLeft — smooth and interruptible
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
    normalizeLoop(track);
    glideTo(track, track.scrollLeft + dir * cardStep(track));
  };

  // --- Mouse drag-to-scroll (touch keeps native scrolling) ---
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    slideTween.current?.kill();
    normalizeLoop(track);
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startScrollLeft: track.scrollLeft,
    };
    setIsDragging(true);
  };

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
        setIsDragging(false);
        return;
      }
      // Glide to the nearest card once the pointer lets go
      const step = cardStep(track);
      glideTo(track, Math.round(track.scrollLeft / step) * step);
      setIsDragging(false);
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

  return (
    <section
      id="miah-processing"
      className="w-full bg-white pt-10 lg:pt-[5em]"
    >
      <h2 className="px-4 font-test-tiempos-fine text-3xl text-neutral-800 sm:px-6 sm:text-4xl lg:px-[5em] lg:text-[4em] lg:leading-[1]">
        MIAH
        <br />
        Processing Excellence
      </h2>

      <div className="relative mt-6 lg:mt-[2.67em]">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          className="flex overflow-x-auto no-scrollbar select-none cursor-grab active:cursor-grabbing"
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
                className="pointer-events-none w-[70%] shrink-0 object-cover sm:w-[45%] lg:h-[20.83em] lg:w-[50.67em]"
              />
            ))
          )}
        </div>

        {/* Edge chevrons */}
        <button
          type="button"
          aria-label="Previous processing image"
          onClick={() => scrollByCard(-1)}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-2 text-white cursor-pointer lg:left-[2.67em]"
        >
          <svg width="2.25em" height="2.25em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next processing image"
          onClick={() => scrollByCard(1)}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-2 text-white cursor-pointer lg:right-[2.67em]"
        >
          <svg width="2.25em" height="2.25em" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
