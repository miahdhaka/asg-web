"use client";

import Image from "next/image";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

interface GallerySliderProps {
  images: string[];
  heading: string;
}

/**
 * Full-bleed gallery slider — cards run edge-to-edge with no horizontal
 * padding, so the cards on both sides are clipped by the viewport. Arrows
 * sit on the left/right edges and advance exactly one card with a smooth
 * GSAP glide (same scroll/arrow behaviour as GreenerFuture).
 */
export default function GallerySlider({ images, heading }: GallerySliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  // The GSAP tween currently gliding the track — every arrow slide animates
  // with GSAP for a consistent, interruptible ease (matches GreenerFuture).
  const slideTween = useRef<gsap.core.Tween | null>(null);
  // Mouse-drag state: dragging scrubs the track 1:1 (same pattern as GreenerFuture).
  const dragRef = useRef({ down: false, startX: 0, scrollLeft: 0 });

  // Width of one card step and of one full image copy (measured from the DOM
  // so gaps never skew the wrap seam) — same loop engine as GreenerFuture.
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

  // Keep the position normalized within the first copy [0, pitch).
  const wrap = (track: HTMLDivElement, value: number) => {
    const { pitch } = pitches(track);
    if (pitch <= 0) return value;
    let v = value;
    while (v < 0) v += pitch;
    while (v >= pitch) v -= pitch;
    return v;
  };

  // Re-base into the first copy — visually identical, but guarantees there is
  // always another full copy ahead in the step direction.
  const rebase = (track: HTMLDivElement) => {
    const wrapped = wrap(track, track.scrollLeft);
    if (wrapped !== track.scrollLeft) track.scrollLeft = wrapped;
  };

  // Arrows advance exactly one card with a GSAP glide — a single, smooth,
  // interruptible ease (power2.inOut) — wrapping over the copy seam so the
  // loop stays infinite in both directions.
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const { step, pitch } = pitches(track);
    if (step <= 0 || pitch <= 0) return;

    rebase(track);
    let target = track.scrollLeft + direction * step;
    if (target < 0) {
      track.scrollLeft += pitch;
      target += pitch;
    }
    slideTween.current?.kill();
    slideTween.current = gsap.to(track, {
      scrollLeft: target,
      duration: 0.6,
      ease: "power2.inOut",
      overwrite: true,
    });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || e.pointerType !== "mouse") return;
    // Stop any in-flight glide so the manual scrub takes immediate control.
    slideTween.current?.kill();
    dragRef.current = { down: true, startX: e.clientX, scrollLeft: track.scrollLeft };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    const next = dragRef.current.scrollLeft - dx;
    const wrapped = wrap(track, next);
    if (wrapped !== next) {
      // Crossed the copy seam: jump instantly and shift the drag base by the
      // same amount so the scrub stays continuous.
      track.scrollLeft = wrapped;
      dragRef.current.scrollLeft += wrapped - next;
    } else {
      track.scrollLeft = wrapped;
    }
  };

  const endDrag = () => {
    const track = trackRef.current;
    if (!track || !dragRef.current.down) return;
    dragRef.current.down = false;
    // Settle onto the nearest card boundary with a smooth GSAP glide —
    // matching GreenerFuture — so a released drag never rests mid-card.
    const { step } = pitches(track);
    if (step <= 0) return;
    const target = Math.round(track.scrollLeft / step) * step;
    slideTween.current?.kill();
    slideTween.current = gsap.to(track, {
      scrollLeft: target,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
    });
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
        className="flex cursor-grab active:cursor-grabbing gap-2 overflow-x-auto select-none sm:gap-4 lg:gap-[1.5rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

      {/* Prev / next controls pinned to the viewport edges */}
      <button
        type="button"
        aria-label="Previous photo"
        onClick={() => scrollByCard(-1)}
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 hover:scale-110 lg:left-10 lg:h-12 lg:w-12"
      >
        <ChevronLeft className="h-6 w-6 text-neutral-900 lg:h-7 lg:w-7" strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={() => scrollByCard(1)}
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 hover:scale-110 lg:right-10 lg:h-12 lg:w-12"
      >
        <ChevronRight className="h-6 w-6 text-neutral-900 lg:h-7 lg:w-7" strokeWidth={2} />
      </button>
    </section>
  );
}
