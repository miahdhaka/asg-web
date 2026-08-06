"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const paragraphs = [
  "Hazrat Amanat Shah Securities Limited (HASSL) is a licensed stock brokerage house providing comprehensive capital market services in Bangladesh. Established in 2009, HASSL offers reliable and transparent trading solutions through the Dhaka Stock Exchange (DSE) and Chittagong Stock Exchange (CSE). As a respected member of the Amanat Shah Group, the company is committed to upholding the highest standards of integrity, client service, and regulatory compliance in the financial services sector.",
  "Our vision is to contribute to the development of a dynamic capital market in Bangladesh by delivering international-standard brokerage services grounded in trust, transparency, and value creation for clients and shareholders, while promoting retail investor empowerment and financial inclusion.",
];

interface Stat {
  value: number;
  /** Thousands grouping (14000 → "14,000") */
  grouped?: boolean;
  unit: string;
  label: string;
}

const stats: Stat[] = [
  { value: 14000, grouped: true, unit: "", label: "Happy Clients" },
  { value: 12, unit: "", label: "Service Booth" },
  { value: 100, unit: "", label: "Support Team" },
  { value: 38, unit: "", label: "Ranking" },
];

/**
 * Intro copy and the four-up stat cards that sit between the
 * hero image and the capabilities band (Figma node 2604-32050).
 */
export default function HasslIntro() {
  const statsRef = useRef<HTMLDivElement>(null);

  // Count each number up from 0 whenever the stat cards scroll into view;
  // leaving the grid (either direction) resets so the count-up replays.
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const grouped = el.dataset.grouped === "1";
        const format = (v: number) =>
          v.toLocaleString("en-US", {
            useGrouping: grouped,
          });
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
      id="hassl-intro"
      className="w-full bg-white px-4 py-10 sm:px-6 lg:px-[5em] lg:py-[5em]"
    >
      <h2 className="max-w-3xl font-test-tiempos-fine text-2xl text-neutral-800 sm:text-3xl lg:max-w-[23.57em] lg:text-[2.5em] lg:leading-[1.2]">
        One of the most reputable and diverse corporate empires in Bangladesh,
        Amanat Shah Group has been Family business legacy.
      </h2>

      {/* Copy block — pushed toward the right column on desktop */}
      <div className="mt-6 flex flex-col gap-4 lg:mt-[3em] lg:ml-[23.83em] lg:w-[57em] lg:gap-[1.33em]">
        {paragraphs.map((text) => (
          <p
            key={text.slice(0, 24)}
            className="text-sm text-neutral-800 lg:text-justify lg:text-[1.17em] lg:leading-[1.43]"
          >
            {text}
          </p>
        ))}
      </div>

      {/* Stat cards */}
      <div
        ref={statsRef}
        className="mt-8 grid grid-cols-2 gap-3 lg:mt-[5em] lg:grid-cols-4 lg:gap-[1.33em]"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <div className="flex items-baseline gap-2 border border-gray-100 bg-gray-50 px-4 pt-6 pb-4 lg:h-[11.17em] lg:gap-[0.67em] lg:px-[1.33em] lg:pt-[2.67em] lg:pb-0">
              <span className="font-test-tiempos-fine text-4xl font-medium text-neutral-800 lg:text-[5em] lg:leading-[1.17]">
                <span
                  data-count={stat.value}
                  data-grouped={stat.grouped ? "1" : "0"}
                >
                  0
                </span>
              </span>
              {stat.unit && (
                <span className="text-xs whitespace-nowrap text-neutral-800 sm:text-sm lg:text-[1.17em] lg:leading-[1.43]">
                  {stat.unit}
                </span>
              )}
            </div>
            <div className="flex items-center border border-t-0 border-gray-100 bg-gray-50 px-4 py-3 lg:h-[4.67em] lg:px-[1.33em] lg:py-0">
              <span className="text-xs uppercase text-neutral-800 sm:text-sm lg:text-[1.33em] lg:leading-[1.5]">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
