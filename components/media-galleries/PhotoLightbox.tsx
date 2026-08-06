"use client";

import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Fullscreen lightbox with prev/next navigation and download.        */
/*  Works for photos, logos and director portraits.                    */
/* ------------------------------------------------------------------ */

export interface LightboxItem {
  image: string;
  caption: string;
  subCaption?: string;
}

export default function PhotoLightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: LightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const item = items[index];

  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(index);
  const closingRef = useRef(false);
  const mountedRef = useRef(false);
  const dragStartXRef = useRef<number | null>(null);

  const goPrev = useCallback(
    () => onIndexChange((index - 1 + items.length) % items.length),
    [index, items.length, onIndexChange]
  );
  const goNext = useCallback(
    () => onIndexChange((index + 1) % items.length),
    [index, items.length, onIndexChange]
  );

  /* Mouse drag on the image to switch slides — drag left for next,
     right for previous. Anything shorter than the threshold is treated
     as a non-gesture and ignored. */
  const handlePointerDown = useCallback((e: ReactPointerEvent<HTMLImageElement>) => {
    if (e.button !== 0) return;
    dragStartXRef.current = e.clientX;
  }, []);
  const handlePointerUp = useCallback(
    (e: ReactPointerEvent<HTMLImageElement>) => {
      if (dragStartXRef.current === null) return;
      const dx = e.clientX - dragStartXRef.current;
      dragStartXRef.current = null;
      if (Math.abs(dx) < 40) return;
      if (dx < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev]
  );
  const cancelDrag = useCallback(() => {
    dragStartXRef.current = null;
  }, []);

  /* Close with a short exit animation before unmounting */
  const dismiss = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    gsap
      .timeline({ onComplete: onClose })
      .to(contentRef.current, {
        opacity: 0,
        scale: 0.97,
        y: 10,
        duration: 0.22,
        ease: "power2.in",
      })
      .to(rootRef.current, { opacity: 0, duration: 0.22, ease: "power1.in" }, "<0.04");
  }, [onClose]);

  /* Open animation: backdrop fade + content settle-in. Skipped entirely
     under prefers-reduced-motion. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap
      .timeline()
      .fromTo(rootRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" })
      .fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.96, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" },
        "<"
      );
    return () => {
      tl.kill();
    };
  }, []);

  /* Kill any running animations on unmount so a pending exit/enter tween
     never touches removed DOM nodes. */
  useEffect(
    () => () => {
      gsap.killTweensOf([rootRef.current, contentRef.current, imgRef.current, captionRef.current]);
      [rootRef.current, contentRef.current].forEach((el) => {
        if (el) el.removeAttribute("style");
      });
    },
    []
  );

  /* Direction-aware slide + cross-fade when navigating between images.
     The incoming image and caption glide in from the direction of travel
     (next → from the right, prev → from the left) with a soft scale-settle. */
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      prevIndexRef.current = index;
      return;
    }
    // +1 = moving forward, -1 = moving backward (handles the wraparound)
    const prev = prevIndexRef.current;
    prevIndexRef.current = index;
    const dir = (index - prev + items.length) % items.length === 1 ? 1 : -1;

    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, x: 56 * dir, scale: 0.985 },
        { opacity: 1, x: 0, scale: 1, duration: 0.55, ease: "power3.out", overwrite: true }
      );
    }
    if (captionRef.current) {
      gsap.fromTo(
        captionRef.current,
        { opacity: 0, x: 32 * dir },
        { opacity: 1, x: 0, duration: 0.55, ease: "power3.out", overwrite: true }
      );
    }
  }, [index, items.length]);

  /* Keyboard: Esc closes, arrows navigate */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dismiss, goPrev, goNext]);

  /* Lock page scroll while open WITHOUT hiding the scrollbar — hiding it
     would shift the page content by the scrollbar's width. Instead we block
     scroll gestures (wheel / touch / scroll keys) and snap back any residual
     scroll (e.g. dragging the scrollbar thumb) to the locked position.
     Listeners are registered on document with capture so they fire even
     during the backdrop fade-in, before the overlay is fully visible. */
  useEffect(() => {
    const lockedY = window.scrollY;

    const blockWheel = (e: WheelEvent) => e.preventDefault();
    const blockTouch = (e: TouchEvent) => e.preventDefault();
    // Only keys that scroll the page — Esc/ArrowLeft/ArrowRight stay free
    // for the lightbox's own close/navigate shortcuts.
    const SCROLL_KEYS = [" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
    const blockKeys = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.includes(e.key)) e.preventDefault();
    };
    const snapBack = () => {
      if (window.scrollY !== lockedY) window.scrollTo(0, lockedY);
    };

    document.addEventListener("wheel", blockWheel, { passive: false, capture: true });
    document.addEventListener("touchmove", blockTouch, { passive: false, capture: true });
    document.addEventListener("keydown", blockKeys, true);
    document.addEventListener("scroll", snapBack, { passive: true, capture: true });
    return () => {
      document.removeEventListener("wheel", blockWheel, true);
      document.removeEventListener("touchmove", blockTouch, true);
      document.removeEventListener("keydown", blockKeys, true);
      document.removeEventListener("scroll", snapBack, true);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
    >
      <div
        ref={contentRef}
        className="flex w-fit max-w-[90vw] flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top bar: download + close ─────────────────────────── */}
        <div className="flex items-center justify-between">
          {/* Primary gradient-filled button — on hover it lifts with a
              gradient glow and a soft shine sweeps across the surface */}
          <a
            href={item.image}
            download
            className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden px-[1.5rem] py-[0.8rem] font-medium leading-none text-white shadow-lg shadow-black/30 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0.75rem_2rem_-0.375rem_rgba(26,161,121,0.6)]"
            style={{ background: "var(--primary-gradient)" }}
          >
            {/* Shine sweep — parked off the left edge, glides across on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-[60%] w-[40%] -skew-x-[20deg] bg-white/30 blur-[6px] transition-transform duration-700 ease-out group-hover:translate-x-[460%]"
            />
            <Download className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
            Download image
          </a>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close lightbox"
            className="cursor-pointer p-2 text-white transition-all duration-200 hover:rotate-90 hover:opacity-70"
          >
            <X className="h-[2rem] w-[2rem]" strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Image stage — a single fixed-size box for every slide so
               photos, logos and PNGs all occupy the same frame; each
               image is contained inside it, never cropped or stretched.
               The top bar spans the same width, keeping the download and
               close buttons aligned with the stage edges on every slide. */}
        <div className="relative h-[min(62vh,46rem)] w-[58vw] max-w-[86vw] bg-white">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#D9D9D9] text-neutral-800 shadow-lg shadow-black/20 transition duration-200 hover:scale-105 hover:bg-white sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2} />
          </button>

          <div className="flex h-full w-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              key={item.image}
              src={item.image}
              alt={item.caption}
              draggable={false}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={cancelDrag}
              className="h-full w-full cursor-grab select-none object-contain active:cursor-grabbing"
            />
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#D9D9D9] text-neutral-800 shadow-lg shadow-black/20 transition duration-200 hover:scale-105 hover:bg-white sm:right-4"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>

        {/* ── Caption ───────────────────────────────────────────── */}
        <div ref={captionRef} className="flex flex-col items-center gap-1">
          <p className="text-center font-test-tiempos-fine text-[1.25rem] leading-[1.75rem] text-white lg:text-[1.5rem]">
            {item.caption}
          </p>
          {item.subCaption && (
            <p className="text-center font-neue-montreal text-[1rem] leading-[1.5rem] text-white/80">
              {item.subCaption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}