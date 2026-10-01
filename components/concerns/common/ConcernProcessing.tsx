"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

type ConcernProcessingProps = {
  /** Optional anchor id for the section (e.g. "helal-processing"). */
  sectionId?: string;
  /** Section heading; each "\n" starts a new line. */
  title: string;
  slides: { src: string; alt: string }[];
};

/* The track renders three copies of the image set and keeps the scroll
   position inside the middle copy, so the strip loops endlessly both ways. */
const COPIES = [0, 1, 2] as const;

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
  /* The GSAP tween currently gliding the track — every slide animates with
     GSAP for a consistent, interruptible ease */
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
  const [isDragging, setIsDragging] = useState(false);

  const cardStep = (track: HTMLDivElement) => {
    const card = track.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth : track.clientWidth;
  };

  // Teleport by one whole copy when nearing either end — content is
  // identical one set away, so the jump is invisible
  const isNormalizing = useRef(false);
  const normalizeLoop = useCallback(
    (track: HTMLDivElement) => {
      if (isNormalizing.current) return;
      const step = cardStep(track);
      const setWidth = step * slides.length;
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
    [slides.length]
  );

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
  }, [normalizeLoop, slides.length]);

  // GSAP glide to an absolute scrollLeft — smooth and interruptible
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
      lastScroll: track.scrollLeft,
      lastTime: e.timeStamp,
      vx: 0,
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
    <section id={sectionId} className="w-full pt-10 lg:pt-[5em]">
      <h2 className="px-4 font-archivo-black uppercase text-2xl sm:text-4xl text-neutral-800 sm:px-6 lg:px-[5rem] lg:text-[3em] lg:leading-[1]">
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
                className="pointer-events-none w-[70%] shrink-0 object-cover h-[8rem] sm:w-[45%] sm:h-[16rem] lg:h-[20.83em] lg:w-[50.67em]"
              />
            ))
          )}
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
