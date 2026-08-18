"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface BusinessCard {
  label: string;
  image: string;
  /** Sister-concern logo revealed on card hover */
  logo: string;
}

const businessCards: BusinessCard[] = [
  { label: "Retail", image: "/images/our-business/img-1.webp", logo: "/logo/sister-concern/helal-&-brothers-white.png" },
  { label: "Textile", image: "/images/our-business/img-2.webp", logo: "/logo/sister-concern/spinning-mills-white.png" },
  { label: "Textile", image: "/images/our-business/img-3.webp", logo: "/logo/sister-concern/fabrics-white.png" },
  { label: "Textile", image: "/images/our-business/img-4.webp", logo: "/logo/sister-concern/weaving-white.png" },
  { label: "Germane", image: "/images/our-business/img-5.webp", logo: "/logo/sister-concern/trust-knitwear-white.png" },
  { label: "Ecommerce", image: "/images/our-business/img-6.webp", logo: "/logo/sister-concern/miah-white.png" },
  { label: "Agriculture", image: "/images/our-business/img-7.webp", logo: "/logo/sister-concern/farm2farm-white.png" },
  { label: "Finance", image: "/images/our-business/img-8.webp", logo: "/logo/sister-concern/securities-white.png" },
];
 
const GAP = "1rem"; // gap between cards — rem so it rides the fluid scale
const SCROLL_SPEED = 0.5; // Slider speed control

export default function OurBusiness() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Interaction flags kept in refs so the animation loop reads fresh values.
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  // Render the list twice so we can loop seamlessly.
  const loopedCards = [...businessCards, ...businessCards];

  // Keep scrollLeft normalized within the first copy [0, halfWidth).
  const wrap = (el: HTMLDivElement, value: number) => {
    const half = el.scrollWidth / 2;
    let v = value;
    while (v < 0) v += half;
    while (v >= half) v -= half;
    return v;
  };

  // Continuous, infinite auto-scroll via requestAnimationFrame.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;

    const tick = () => {
      if (!isHoveredRef.current && !isDraggingRef.current && !isTouchingRef.current) {
        el.scrollLeft = wrap(el, el.scrollLeft + SCROLL_SPEED);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // --- Touch pause: stop auto-scroll the moment a finger lands ----------
  // Native touch-scroll and the rAF loop fight each other on mobile,
  // producing the jank / black-gap the user sees.  Pausing the loop for
  // the entire touch lifetime lets the browser glide smoothly.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onTouchStart = () => { isTouchingRef.current = true; };
    const onTouchEnd = () => { isTouchingRef.current = false; };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  // --- Mouse / pointer drag to scroll ---
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !isDraggingRef.current) return;
    const delta = e.clientX - dragStartX.current;
    el.scrollLeft = wrap(el, dragStartScroll.current - delta);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  return (
    <section
      id="our-business"
      className="bg-background relative flex w-full flex-col overflow-hidden pt-4 pb-8 lg:pt-0 lg:pb-18 h-[calc(100dvh-var(--header-height))] lg:h-[calc(100vh-var(--header-height))]"
    >
      {/* Header row — title left, description right */}
      <div className="px-4 pb-3 lg:pt-18 lg:px-20 lg:pb-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-3 lg:gap-8 w-full lg:max-w-[90%]">
          {/* Title — drops in from above via the Hero's phase-5 timeline */}
          <h2
            id="our-business-title"
            className="font-serif text-[2rem] sm:text-4xl lg:text-[4rem] leading-[1] text-neutral-800 shrink-0"
          >
            Our Business
          </h2>

          {/* Description */}
          <p className="max-w-[38.75rem] text-sm sm:text-base lg:text-xl leading-[1.5] tracking-wide text-neutral-800">
            With a 130-year legacy, Amanat Shah Group is a premier, multi-sector
            conglomerate. We drive sustainable growth across textiles, finance,
            and technology by integrating innovation, integrity.
          </p>
        </div>
      </div>

      {/* Full-bleed infinite carousel — drag with the mouse to scroll.
          The section now has a definite height on every breakpoint, so the
          track simply fills the space left under the header row instead of
          guessing a vh fraction that could overflow the screen. */}
      <div
        className="relative min-h-0 flex-1 lg:flex-none lg:h-auto lg:max-h-[58vh] overflow-hidden bg-[#0C0C0C]"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        {/* Draggable track */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex h-full cursor-grab items-stretch overflow-x-auto select-none active:cursor-grabbing overscroll-x-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {loopedCards.map((card, index) => (
            <div
              key={`${card.image}-${index}`}
              data-card
              className="group relative h-full w-[calc(100vw-2.5rem)] sm:w-[calc((100vw-1.875rem)/2.3)] flex-shrink-0 overflow-hidden"
              style={{ marginRight: GAP }}
            >
              {/* Background image.
                  `sizes` must track the card width per breakpoint, not just the
                  desktop one: below sm a card is nearly the full viewport
                  (calc(100vw-2.5rem) ≈ 90vw), so a flat 40vw made the browser
                  pick a 384 px file for a 350 px card on a DPR-2 phone — a ~2x
                  upscale that rendered the cards visibly soft. The >=1024px
                  slot stays 40vw, so desktop requests the same file as before. */}
              <Image
                src={card.image}
                alt={card.label}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 44vw, 92vw"
                draggable={false}
                className="pointer-events-none object-cover"
                quality={80}
              />

              {/* Gradient overlay */}
              <div
                aria-hidden
                className="overlay-linear-subtle pointer-events-none absolute inset-0"
              />

              {/* Sister-concern logo — parked one card-height below (clipped by
                  overflow-hidden), slides up to the card's middle on hover and
                  back down when the cursor leaves. group-active keeps it up
                  while dragging: pointer capture on the track suppresses
                  :hover, but :active persists for the whole press. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-y-0 group-active:translate-y-0"
              >
                <Image
                  src={card.logo}
                  alt=""
                  width={320}
                  height={120}
                  draggable={false}
                  className="h-[3rem] sm:h-[4rem] lg:h-[7.5rem] w-[9rem] sm:w-[12rem] lg:w-[20rem] object-contain"
                />
              </div>

              {/* Category label */}
              <span className="pointer-events-none uppercase text-xl sm:text-2xl lg:text-3xl tracking-[0.12em] absolute bottom-5 lg:bottom-10 left-1/2 -translate-x-1/2 text-white"
              >
                {card.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
