"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Stat {
  label: string;
  value: number;
  /** Rendered after the animated number, e.g. "+" */
  suffix?: string;
}

const stats: Stat[] = [
  { value: 15000, suffix: "+", label: "EMPLOYEE" },
  { value: 15, label: "AWARD RECEIVED" },
  { value: 130, label: "YEARS EXPERIENCE" },
  { value: 17, label: "COUNTRIES REACHED" },
];

export default function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null);

  // Count each number up from 0 whenever the section scrolls into view;
  // leaving the section (either direction) resets so the count-up replays.
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
    <section ref={sectionRef} id="about-stats" className="w-full bg-white px-4 sm:px-6 lg:px-[5em] pb-10 sm:pb-12 lg:pb-[5em]">
      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-5 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <div className="border-b border-gray-100 bg-gray-50 px-3 sm:px-5 lg:px-5.5 py-4 sm:py-8 lg:py-16">
              <p className="text-3xl sm:text-5xl lg:text-6xl text-neutral-900 font-serif font-medium leading-none">
                <span data-count={stat.value}>0</span>
                {stat.suffix}
              </p>
            </div>
            <div className="bg-gray-50 px-2.5 sm:px-5 lg:px-6 py-3 sm:py-5 lg:py-7">
              <span className="text-[11px] sm:text-base lg:text-xl text-neutral-800 tracking-wide sm:tracking-wider">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
