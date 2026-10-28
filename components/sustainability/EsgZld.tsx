"use client";

import Image from "next/image";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { esgZld } from "./esgData";

/* Zero Liquid Discharge — heading + paragraph split, 3-image tile module below.
   Desktop: one tall tile on the left, two stacked tiles on the right.
   Mobile: the same three images as a horizontal drag slider (EsgStatCards pattern). */
export default function EsgZld() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ down: false, startX: 0, scrollLeft: 0 });

  // Mouse-drag to scrub the mobile strip (GreenerFuture / Certifications pattern).
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
    <section className="px-4 sm:px-8 pb-10">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-8 lg:gap-12">
        <hr className="border-0 border-t border-gray-200" />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 className="whitespace-pre-line font-archivo-black uppercase text-neutral-900 text-2xl sm:text-3xl lg:text-[2.5rem] leading-[1.1] lg:max-w-[55%]">
            {esgZld.heading}
          </h2>
          <p className="font-neue-montreal text-lg md:text-[1.25rem] lg:max-w-[52%] lg:pt-2 text-[#1A1A1A]">
            {esgZld.paragraph}
          </p>
        </div>

        {/* Mobile: three images as a slider — desktop: 1 tall + 2 stacked tiles */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="no-scrollbar flex cursor-grab select-none gap-3 overflow-x-auto touch-auto pb-2 active:cursor-grabbing sm:grid sm:grid-cols-[1.15fr_1fr] sm:grid-rows-[1fr_1fr] sm:gap-4 sm:overflow-visible sm:pb-0 sm:cursor-default sm:select-auto"
        >
          {esgZld.images.map((img, index) => (
            <div
              key={img.src}
              className={`relative w-[85vw] max-w-[22rem] shrink-0 overflow-hidden rounded-[1rem] bg-[#D9D9D9] sm:w-auto sm:max-w-none sm:shrink sm:rounded-[1.5rem] ${
                index === 0
                  ? "aspect-[3/2] sm:aspect-auto sm:h-auto sm:row-span-2 sm:self-stretch"
                  : "aspect-[3/2] sm:aspect-[2/1]"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) and (min-width: 1024px) 42rem, (min-width: 640px) 50vw, 85vw"
                className="object-cover"
                quality={90}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
