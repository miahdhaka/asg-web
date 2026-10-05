"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Stat {
  label: string;
  value: number;
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
    <section ref={sectionRef} id="about-stats" className="w-full px-4 sm:px-6 lg:px-[5em] py-6 sm:py-10 lg:py-[3rem] mb-[2.2rem]">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl overflow-hidden">
            <div className="border-b border-[#F3F4F6] bg-white px-3 py-8 sm:px-4 sm:py-14 lg:px-5 lg:py-[3rem]">
              <p className="font-archivo-black text-4xl sm:text-6xl lg:text-[4rem] leading-[1.2] text-[#262626]">
                <span data-count={stat.value}>0</span>
                {stat.suffix}
              </p>
            </div>
            <div className="bg-white px-3 py-6 sm:px-4 sm:py-10 lg:px-5 lg:py-9">
              <span className="font-neue-montreal text-base sm:text-xl lg:text-[1.35rem] leading-6 text-[#262626]">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
