"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const paragraphs = [
  "At HASSML, we are committed to delivering world-class yarn solutions through excellence in quality, innovation, sustainability, and responsible manufacturing practices. With more than two decades of expertise in the spinning industry, we have established ourselves as a trusted textile manufacturing partner for leading global fashion and apparel brands.",
  "Our advanced production capabilities, customer-focused approach, and commitment to international standards enable us to deliver high-performance yarn solutions that meet the evolving demands of the global textile industry. Driven by a vision to be a globally recognized spinning company, we integrate advanced technology and operational excellence to support the growth of the textile sector.",
  "Our mission is to contribute to the global fashion supply chain by maintaining rigorous international quality standards and fostering long-term partnerships with renowned brands. By combining our rich legacy of over 20 years with continuous innovation, HASSML remains a cornerstone of reliable, sustainable, and premium yarn production.",
];

interface Stat {
  value: number;
  /** Thousands grouping (137000 → "137,000") */
  grouped?: boolean;
  /** Rendered after the animated number, e.g. "+" */
  suffix?: string;
  unit: string;
  label: string;
}

const stats: Stat[] = [
  { value: 72, unit: "Ton/Day", label: "Yarn" },
  { value: 137000, grouped: true, unit: "Rotor 5nos", label: "Spindles" },
  { value: 650000, grouped: true, unit: "Sft", label: "Floor" },
  { value: 2200, grouped: true, suffix: "+", unit: "", label: "Employees" },
];

/**
 * Intro copy and the four-up production stat cards that sit between the
 * hero image and the capabilities band (Figma node 2604-30912).
 */
export default function SpinningIntro() {
  const statsRef = useRef<HTMLDivElement>(null);

  // Count each number up from 0 whenever the stat cards scroll into view;
  // leaving the grid (either direction) resets so the count-up replays.
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const grouped = el.dataset.grouped === "1";
        const format = (v: number) =>
          Math.round(v).toLocaleString("en-US", { useGrouping: grouped });
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: "power2.out",
          paused: true,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 75%",
            end: "bottom top",
            toggleActions: "restart reset restart reset",
          },
          onUpdate: () => {
            el.textContent = format(counter.value);
          },
        });
      });
    },
    { scope: statsRef }
  );

  return (
    <section
      id="spinning-intro"
      className="w-full bg-white px-4 sm:px-6 lg:px-[5em] py-6 sm:py-10 lg:py-[5em]"
    >
      <h2 className="max-w-3xl font-test-tiempos-fine text-xl sm:text-3xl text-neutral-800 lg:max-w-[23.57em] lg:text-[2.5em] lg:leading-[1.2]">
        One of the most reputable and diverse corporate empires in Bangladesh,
        Amanat Shah Group has been Family business legacy.
      </h2>

      {/* Copy block — pushed toward the right column on desktop */}
      <div className="mt-6 flex flex-col gap-4 lg:mt-[3em] lg:ml-[23.83em] lg:w-[57em] lg:gap-[1.33em]">
        {paragraphs.map((text) => (
          <p
            key={text.slice(0, 24)}
            className="text-justify text-sm text-neutral-500 lg:text-[1.17em] lg:leading-[1.43]"
          >
            {text}
          </p>
        ))}
      </div>

      {/* Stat cards */}
      <div
        ref={statsRef}
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-[1.33em] lg:grid-cols-4 lg:gap-[1.33em]"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <div className="border border-gray-100 bg-gray-50 lg:h-[11.17em] pt-6 lg:pt-[2.67em] px-3 sm:px-4 lg:px-[1.33em] pb-4 lg:pb-0 overflow-hidden">
              <span className="font-test-tiempos-fine text-3xl sm:text-4xl lg:text-[5em] font-medium text-neutral-800 lg:leading-[1.17]">
                <span
                  data-count={stat.value}
                  data-grouped={stat.grouped ? "1" : "0"}
                >
                  0
                </span>
                {stat.suffix}
              </span>
              {stat.unit && (
                <span className="text-xs whitespace-nowrap text-neutral-800 sm:text-sm lg:text-[1.17em] lg:leading-[1.43]">
                  {stat.unit}
                </span>
              )}
            </div>
            <div className="flex items-center border border-t-0 border-gray-100 bg-gray-50 lg:h-[4.67em] px-3 sm:px-4 lg:px-[1.33em] py-3 lg:py-0">
              <span className="text-xs sm:text-sm lg:text-[1.33em] capitalize sm:uppercase text-neutral-800 lg:leading-[1.5]">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
