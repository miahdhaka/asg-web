"use client";

import Image from "next/image";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { esgStatCards, type EsgStatCard } from "./esgData";

function StatCard({ card }: { card: EsgStatCard }) {
  return (
    <div className="relative aspect-[320/420] w-[320px] shrink-0 overflow-hidden rounded-[1rem] bg-[#D9D9D9] sm:w-auto">
      <Image
        src={card.image}
        alt={card.alt}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover"
        quality={85}
      />
      {/* Bottom dark gradient for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(12,12,12,0.9) 0%, rgba(0,0,0,0) 63%)",
        }}
      />
      {/* Overlaid text — bottom-left */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 pt-5 pr-5 pb-7 pl-7 sm:pt-6 sm:pr-6 sm:pb-9 sm:pl-9">
        <span className="font-archivo-black text-white text-[1.75rem] sm:text-[2.5rem] leading-tight">
          {card.value}
        </span>
        <span className="font-neue-montreal text-[1.05rem] sm:text-xl text-white/90">
          {card.label}
        </span>
      </div>
    </div>
  );
}

/* Three overlay stat cards — mobile drag strip (grab cursor), desktop 3-col grid */
export default function EsgStatCards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ down: false, startX: 0, scrollLeft: 0 });

  // Mouse-drag to scrub the strip (GreenerFuture / Certifications pattern).
  // Touch keeps the browser's native overflow scroll, so the layout is identical.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    dragRef.current = { down: true, startX: e.clientX, scrollLeft: el.scrollLeft };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    el.scrollLeft = dragRef.current.scrollLeft - dx;
  };

  const endDrag = () => {
    dragRef.current.down = false;
  };

  return (
    <section className="px-4 sm:px-8 py-10 sm:py-14 lg:py-[5rem]">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="no-scrollbar mx-auto flex w-full max-w-[80rem] cursor-grab select-none gap-3 overflow-x-auto pb-2 active:cursor-grabbing sm:grid sm:cursor-default sm:grid-cols-3 sm:select-auto sm:overflow-visible sm:pb-0"
      >
        {esgStatCards.map((card) => (
          <StatCard key={card.value} card={card} />
        ))}
      </div>
    </section>
  );
}
