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
  { label: "Retail", image: "/images/our-business/img-1.png ", logo: "/logo/sister-concern/helal-&-brothers.png" },
  { label: "Textile", image: "/images/our-business/img-2.png", logo: "/logo/sister-concern/spinning-mills.png" },
  { label: "Textile", image: "/images/our-business/img-3.png", logo: "/logo/sister-concern/fabrics.png" },
  { label: "Textile", image: "/images/our-business/img-4.png", logo: "/logo/sister-concern/weaving.png" },
  { label: "Germane", image: "/images/our-business/img-5.png", logo: "/logo/sister-concern/trust-knitwear.png" },
  { label: "Ecommerce", image: "/images/our-business/img-6.png", logo: "/logo/sister-concern/miah-white.png" },
  { label: "Agriculture", image: "/images/our-business/img-7.png", logo: "/logo/sister-concern/farm2farm.png" },
  { label: "Finance", image: "/images/our-business/img-8.png", logo: "/logo/sister-concern/securities.png" },
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
    <section
      id="our-business"
      className="bg-background relative flex w-full flex-col overflow-hidden pb-18"
      style={{ height: "calc(100vh - var(--header-height, 4.55rem))" }}
    >
      {/* Header row — title left, description right */}
      <div className="pt-18 px-20 pb-12">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 max-w-[90%]">
          {/* Title */}
          <h2 className="font-serif text-[64px] leading-[1] text-neutral-800 shrink-0">
            Our Business
          </h2>

          {/* Description */}
          <p className="max-w-[620px] text-xl leading-[1.5] tracking-wide text-neutral-800">
            With a 130-year legacy, Amanat Shah Group is a premier, multi-sector
            conglomerate. We drive sustainable growth across textiles, finance,
            and technology by integrating innovation, integrity.
          </p>
        </div>
      </div>

      {/* Full-bleed infinite carousel — drag with the mouse to scroll */}
      <div
        className="relative min-h-0 max-h-[58vh] flex-1"
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
          className="no-scrollbar flex h-full cursor-grab touch-pan-y items-stretch overflow-x-auto select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {loopedCards.map((card, index) => (
            <div
              key={`${card.image}-${index}`}
              data-card
              className="group relative h-full w-[calc((100vw-30px)/2.3)] flex-shrink-0 overflow-hidden"
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
                  width={260}
                  height={100}
                  draggable={false}
                  className="h-[100px] w-[260px] object-contain"
                />
              </div>

              {/* Category label */}
              <span className="pointer-events-none uppercase text-3xl tracking-[0.12em] absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
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
