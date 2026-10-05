"use client";

import Image from "next/image";
import gsap from "gsap";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";

const achievements = [
  {
    value: "15",
    label: "Dhaka international trade fair award",
    image: "/images/about-us/award-1.png",
  },
  {
    value: "7",
    label: "Commercially Important Person (CIP)",
    image: "/images/about-us/award-4.png",
  },
  {
    value: "2",
    label: "National export trophy",
    image: "/images/about-us/award-3.png",
  },
  {
    value: "1",
    label: "President's Award for industrial development",
    image: "/images/about-us/award-4.png",
  },
];

export default function Achievements() {
  const trackRef = useRef<HTMLDivElement>(null);
  // The GSAP tween gliding the track after a drag — matches GreenerFuture.
  const slideTween = useRef<gsap.core.Tween | null>(null);
  // Mouse-drag state: dragging scrubs the track 1:1, then settles to the nearest card.
  const dragRef = useRef({ down: false, startX: 0, scrollLeft: 0 });

  // One-card pitch measured from live geometry so the gap width never skews the settle.
  const cardStep = (track: HTMLDivElement) => {
    const els = track.querySelectorAll<HTMLElement>("[data-card]");
    return els.length > 1 ? els[1].offsetLeft - els[0].offsetLeft : 0;
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    // Only the mouse scrubs manually; touch keeps native overflow scrolling.
    if (!track || e.pointerType !== "mouse") return;
    slideTween.current?.kill();
    dragRef.current = { down: true, startX: e.clientX, scrollLeft: track.scrollLeft };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    track.scrollLeft = dragRef.current.scrollLeft - dx;
  };

  const endDrag = () => {
    const track = trackRef.current;
    if (!track || !dragRef.current.down) return;
    dragRef.current.down = false;
    // Settle onto the nearest card boundary — one card at a time, like GreenerFuture.
    const step = cardStep(track);
    if (step <= 0) return;
    const max = track.scrollWidth - track.clientWidth;
    const target = Math.min(Math.max(Math.round(track.scrollLeft / step) * step, 0), max);
    slideTween.current?.kill();
    slideTween.current = gsap.to(track, {
      scrollLeft: target,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
    });
  };

  return (
    <section id="about-achievements" className="w-full px-4 sm:px-6 lg:px-[5em] py-16 lg:py-[5rem]">
      <h2 className="font-archivo-black text-3xl sm:text-5xl lg:text-[3rem] leading-[1.1] text-[#262626] uppercase">
        Achievement
      </h2>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="mt-8 sm:mt-10 lg:mt-[3.5rem] flex gap-2.5 sm:gap-5 overflow-x-auto touch-pan-x sm:touch-auto pb-2 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:cursor-default sm:active:cursor-default sm:select-auto"
      >
        {achievements.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            data-card
            className="group flex flex-col rounded-2xl overflow-hidden shrink-0 w-[calc((100%-1rem)/2.2)] sm:w-auto"
          >
            {/* Image area */}
            <div className="flex items-center justify-center bg-white sm:h-[230px] px-4 py-6 sm:h-[300px] sm:px-5 sm:py-7">
              <Image
                src={item.image}
                alt={item.label}
                width={164}
                height={184}
                quality={90}
                draggable={false}
                className="w-auto h-auto max-w-[80%] max-h-full object-contain"
              />
            </div>
            {/* Number + label */}
            <div className="relative flex flex-col items-center justify-center gap-1.5 bg-[#F9FAFB] h-[120px] sm:h-[160px] px-3 py-6 sm:gap-2 sm:h-[200px] sm:px-4 sm:py-6">
              {/* Smooth gradient hover wash — background-image isn't animatable, so fade an overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(150deg,rgba(139,195,74,0.2)_0%,rgba(26,161,121,0.2)_81%)] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
              />
              <span className="relative font-archivo-black text-4xl sm:text-6xl lg:text-[4rem] leading-[1.1] text-[#262626]">
                {item.value}
              </span>
              <span className="relative font-neue-montreal text-sm sm:text-base leading-5 sm:leading-6 text-center text-[#262626] sm:text-[1.375rem] sm:leading-8 sm:max-w-[220px]">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
