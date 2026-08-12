"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const paragraphs = [
  "MIAH is a contemporary fashion brand that transforms passion into timeless style. Inspired by Bangladesh's rich cultural heritage and blended with modern fashion trends, MIAH creates clothing that reflects elegance, comfort, and individuality. As a sister concern of the Amanat Shah Group, MIAH represents creativity, quality, and innovation in the fashion industry.",
  "The brand focuses on delivering premium clothing experiences through thoughtfully designed collections for men, women, and kids, backed by a seamless and customer-focused shopping experience. MIAH proudly draws on the Amanat Shah Group's legacy of trust, quality, and business excellence, strengthening its commitment to ethical operations and responsible growth.",
];

interface Stat {
  value: number;
  decimals?: number;
  grouped?: boolean;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 7, suffix: "+", label: "YEARS IN BUSINESS" },
  { value: 23000, grouped: true, suffix: "+", label: "TOTAL CUSTOMERS SERVED" },
  { value: 30000, grouped: true, suffix: "+", label: "TOTAL ORDERS DELIVERED" },
  { value: 98, suffix: "%", label: "HAPPY CUSTOMER RATE" },
];

/**
 * Intro copy and the four-up business stat cards that sit between the
 * hero image and the core-values band (Figma node 1631-8349).
 */
export default function MiahIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  // Count each number up from 0 whenever the section scrolls into view;
  // leaving the section (either direction) resets so the count-up replays.
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals || 0);
        const grouped = el.dataset.grouped === "1";
        const format = (v: number) =>
          v.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping: grouped,
          });
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
            el.textContent = format(counter.value);
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="miah-intro"
      className="w-full bg-white px-4 py-10 sm:px-6 lg:px-[5em] lg:py-[5em]"
    >
      <h2 className="max-w-3xl font-test-tiempos-fine text-2xl text-neutral-800 sm:text-3xl lg:max-w-[58.9em] lg:text-[2.5em] lg:leading-[1.2]">
        One of the most reputable and diverse corporate empires in Bangladesh,
        Amanat Shah Group has been Family business legacy.
      </h2>

      {/* Copy block — pushed toward the right column on desktop */}
      <div className="mt-6 flex flex-col gap-4 lg:mt-[3em] lg:ml-[23.83em] lg:w-[53.08em] lg:gap-[1.33em]">
        {paragraphs.map((text) => (
          <p
            key={text.slice(0, 24)}
            className="text-sm text-neutral-800 lg:text-[1.17em] lg:leading-[1.43]"
          >
            {text}
          </p>
        ))}
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-[5em] lg:grid-cols-4 lg:gap-[1.33em]">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <div className="flex items-baseline gap-2 border border-gray-100 bg-gray-50 px-4 pt-6 pb-4 lg:h-[11.17em] lg:gap-[0.67em] lg:px-[1.33em] lg:pt-[2.67em] lg:pb-0">
              <span className="font-test-tiempos-fine text-4xl font-medium text-neutral-800 lg:text-[5em] lg:leading-[1.17]">
                <span
                  data-count={stat.value}
                  data-decimals={stat.decimals ?? 0}
                  data-grouped={stat.grouped ? "1" : "0"}
                >
                  0
                </span>
                {stat.suffix}
              </span>
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
