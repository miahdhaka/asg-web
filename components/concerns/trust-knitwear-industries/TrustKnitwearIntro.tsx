"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const paragraphs = [
  "Trust Knitwear Industries Ltd. is a fully vertically integrated knit composite manufacturing facility specializing in high-quality knit fabric production, dyeing, finishing, and export-oriented garment manufacturing. Established in 2003, the company delivers premium knit apparel solutions with a strong emphasis on quality, sustainability, and ethical production practices.",
  "As a trusted sister concern of the Amanat Shah Group, Trust Knitwear combines advanced technology, vertical integration, and a customer-centric approach to serve leading global fashion brands. Our vision is to be a trusted global leader in sustainable knitwear manufacturing by delivering superior quality, ethical production, and complete customer satisfaction through innovation and transparency.",
];

interface Stat {
  value: number;
  /** Decimal places shown while counting (2.3 → 1) */
  decimals?: number;
  /** Thousands grouping (1200 → "1,200") */
  grouped?: boolean;
  unit: string;
  label: string;
}

const stats: Stat[] = [
  { value: 1200, grouped: true, unit: "Tons", label: "Spinning" },
  { value: 260, unit: "Tons", label: "Knitting" },
  { value: 750, unit: "Tons", label: "Dyeing" },
  { value: 2.3, decimals: 1, unit: "Million pcs.", label: "Garments" },
];

/**
 * Intro copy and the four-up production stat cards that sit between the
 * hero image and the capabilities band (Figma node 2604-31654).
 */
export default function TrustKnitwearIntro() {
  const statsRef = useRef<HTMLDivElement>(null);

  // Count each number up from 0 whenever the stat cards scroll into view;
  // leaving the grid (either direction) resets so the count-up replays.
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
      id="trustknitwear-intro"
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
                  data-decimals={stat.decimals || 0}
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
