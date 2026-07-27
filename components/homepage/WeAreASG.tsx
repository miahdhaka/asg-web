"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StatCard {
  label: string;
  value: number;
  /** Rendered after the animated number, e.g. "+" */
  suffix?: string;
  icon: React.ReactNode;
}

// Thin-line stat icons, stroke follows currentColor so the card hover can tint them.
const iconProps = {
  width: 44,
  height: 44,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const stats: StatCard[] = [
  {
    label: "Years Experience",
    value: 130,
    icon: (
      <svg {...iconProps}>
        <circle cx="7.5" cy="5.5" r="2.5" />
        <path d="M3 20v-.5A4.5 4.5 0 0 1 7.5 15H9" />
        <path d="M11 19l9-9" />
        <path d="M15 10h5v5" />
      </svg>
    ),
  },
  {
    label: "Employee",
    value: 15000,
    suffix: "+",
    icon: (
      <svg {...iconProps}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Government Award",
    value: 15,
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="6" />
        <path d="M12 5.5l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 7.6l2-.3z" />
        <path d="M15.5 13l1.5 8-5-3-5 3 1.5-8" />
      </svg>
    ),
  },
  {
    label: "Countries Reached",
    value: 17,
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function WeAreASG() {
  const sectionRef = useRef<HTMLElement>(null);

  // Count each card's number up from 0 whenever the section scrolls into
  // view; leaving the section (either direction) resets the numbers to 0
  // so the count-up replays on every visit.
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: "power2.out",
          paused: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom top",
            toggleActions: "restart reset restart reset",
          },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col overflow-hidden"
      style={{ height: "calc(100vh - var(--header-height, 4.55rem))" }}
    >
      {/* Aerial background — swap with the real asset once it lands in
          /public/images/we-are-asg/. */}
      <Image
        src="/images/we-are-asg.png"
        alt=""
        fill
        sizes="100vw"
        draggable={false}
        className="pointer-events-none object-cover"
        quality={80}
      />
      {/* Soft dark tint so the cards and type stay legible */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/25" />

      {/* Oversized gradient type — behind the cards */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[10%] left-[10%] z-10 font-serif text-[160px] leading-none uppercase bg-[image:var(--primary-gradient)] bg-clip-text text-transparent"
      >
        We Are
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] right-[19%] z-10 font-serif text-[160px] leading-none uppercase bg-[image:var(--primary-gradient)] bg-clip-text text-transparent"
      >
        ASG
      </span>

      {/* Stat cards */}
      <div className="relative z-20 flex min-h-0 flex-1 items-center px-20">
        <div className="grid w-full grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex h-[min(46vh,420px)] flex-col bg-[#f5f4ef]"
            >
              {/* Top part — icon + label, own padding */}
              <div className="flex flex-1 flex-col justify-between p-6">
                {/* Icon — zooms slightly and tints brand green on card hover */}
                <div className="w-fit text-neutral-700 transition-[transform,color] duration-500 ease-in-out group-hover:scale-115 group-hover:text-[#1AA179]">
                  {stat.icon}
                </div>

                <span className="font-neue-montreal text-sm font-medium tracking-widest text-neutral-800 uppercase">
                  {stat.label}
                </span>
              </div>

              {/* Divider — spans the full card width, darkens on card hover */}
              <div
                aria-hidden
                className="h-px bg-[#F3F4F6] transition-colors duration-500 ease-in-out group-hover:bg-black"
              />

              {/* Bottom part — count pinned to the card bottom, own padding */}
              <p className="p-6 font-serif text-[56px] leading-none text-neutral-900">
                <span data-count={stat.value}>0</span>
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
