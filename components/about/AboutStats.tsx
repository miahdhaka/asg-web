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
    <section ref={sectionRef} id="about-stats" className="w-full bg-white px-[5em] pb-[5em]">
      <div className="grid grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <div className="border-b border-gray-100 bg-gray-50 px-5.5 py-16">
              <p className="font-serif text-6xl font-medium leading-none text-neutral-900">
                <span data-count={stat.value}>0</span>
                {stat.suffix}
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-7">
              <span className="text-xl text-neutral-800">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
