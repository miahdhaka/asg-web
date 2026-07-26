"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface BusinessCard {
  label: string;
  image: string;
}

const businessCards: BusinessCard[] = [
  { label: "Retail", image: "/images/our-business/retail.png" },
  { label: "Textile", image: "/images/our-business/spinning-mills.png" },
  { label: "Textile", image: "/images/our-business/fabric.png" },
  { label: "Textile", image: "/images/our-business/weaving.png" },
  { label: "Germane", image: "/images/our-business/trust.png" },
  { label: "Ecommerce", image: "/images/our-business/miah.png" },
  { label: "Agriculture", image: "/images/our-business/agriculture.png" },
  { label: "Finance", image: "/images/our-business/finance.png" },
];

const GAP = 16; // px gap between cards
const SCROLL_SPEED = 0.5; // Slider speed control

export default function OurBusiness() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Interaction flags kept in refs so the animation loop reads fresh values.
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
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
      if (!isHoveredRef.current && !isDraggingRef.current) {
        el.scrollLeft = wrap(el, el.scrollLeft + SCROLL_SPEED);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
    <section className="relative flex h-screen w-full flex-col overflow-hidden pb-10">
      {/* Header row — title left, description right */}
      <div className="pt-40 px-20 pb-18">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 max-w-[90%]">
          {/* Title */}
          <h2 className="font-serif text-[64px] leading-[48px] font-normal text-neutral-800 shrink-0">
            Our Business
          </h2>

          {/* Description */}
          <p className="max-w-[620px] text-lg tracking-wider text-neutral-800">
            With a 130-year legacy, Amanat Shah Group is a premier, multi-sector
            conglomerate. We drive sustainable growth across textiles, finance,
            and technology by integrating innovation, integrity.
          </p>
        </div>
      </div>

      {/* Full-bleed infinite carousel — drag with the mouse to scroll */}
      <div
        className="relative min-h-0 flex-1"
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
          className="no-scrollbar flex h-full cursor-grab touch-pan-y items-start overflow-x-auto select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {loopedCards.map((card, index) => (
            <div
              key={`${card.image}-${index}`}
              data-card
              className="relative aspect-[3/2] max-h-full w-[calc((100vw-30px)/2.3)] flex-shrink-0 overflow-hidden"
              style={{ marginRight: `${GAP}px` }}
            >
              {/* Background image */}
              <Image
                src={card.image}
                alt={card.label}
                fill
                sizes="40vw"
                draggable={false}
                className="pointer-events-none object-cover"
                quality={80}
              />

              {/* Gradient overlay */}
              <div
                aria-hidden
                className="overlay-linear-subtle pointer-events-none absolute inset-0"
              />

              {/* Category label */}
              <span
                className="pointer-events-none absolute bottom-[24px] left-1/2 -translate-x-1/2 text-white"
                style={{
                  fontFamily: "var(--font-neue-montreal)",
                  fontSize: "20px",
                  lineHeight: "28px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
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
