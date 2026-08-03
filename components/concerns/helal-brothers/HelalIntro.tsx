"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const paragraphs = [
  "M/s Helal & Brothers, the flagship concern of the Amanat Shah Group, stands as a pioneer in Bangladesh\u2019s textile industry. With over 40 years of excellence, the company has transformed local textile heritage into a global success story. Beyond its role as a manufacturer and exporter of premium-quality products like lungi, sharee, and voile, the company operates through a deeply rooted social business model.",
  "We actively empower rural artisans by providing essential financial support and raw materials for production. Upon completion, we purchase these handcrafted textiles at fair market prices, ensuring sustainable livelihoods for weavers. These products are then refined for the international market, bridging the gap between traditional craftsmanship and global demand. Driven by ethical practices, M/s Helal & Brothers continues to connect Bangladesh\u2019s rich artisanal legacy with international consumers through a robust, trusted, and community-focused distribution network.",
];

interface Stat {
  value: number;
  /** Rendered after the animated number, e.g. "k" or "+" */
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 10, suffix: "k", label: "Artisans Empowered" },
  { value: 40, suffix: "+", label: "Years Experience" },
  { value: 12, label: "National Awards" },
  { value: 18, label: "Countries Reached" },
  { value: 5, suffix: "k", label: "Employee" },
];

/**
 * Intro copy and the five-up stat cards that sit between the hero image and
 * the social-business band.
 */
export default function HelalIntro() {
  const statsRef = useRef<HTMLDivElement>(null);

  // Count each number up from 0 whenever the stat cards scroll into view;
  // leaving the grid (either direction) resets so the count-up replays.
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
            trigger: statsRef.current,
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
    { scope: statsRef }
  );

  return (
    <section
      id="helal-intro"
      className="w-full bg-white px-4 py-10 sm:px-6 lg:px-[5em] lg:py-[5em]"
    >
      {/* 707px design width at 30px type → 23.57em in the heading's own em */}
      <h2 className="max-w-3xl font-test-tiempos-fine text-2xl text-neutral-800 sm:text-3xl lg:max-w-[23.57em] lg:text-[2.5em] lg:leading-[1.2]">
        One of the most reputable and diverse corporate empires in Bangladesh,
        Amanat Shah Group has been Family business legacy.
      </h2>

      {/* Copy block — pushed toward the right column on desktop */}
      <div className="mt-6 flex flex-col gap-4 lg:mt-[3em] lg:ml-[23.5em] lg:w-[53.08em] lg:gap-[1.33em]">
        {paragraphs.map((text) => (
          <p
            key={text.slice(0, 24)}
            className="text-justify text-sm text-neutral-800 lg:text-[1.17em] lg:leading-[1.43]"
          >
            {text}
          </p>
        ))}
      </div>

      {/* Stat cards */}
      <div
        ref={statsRef}
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-[1.33em] lg:grid-cols-5 lg:gap-[1.33em]"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <div className="border border-gray-100 bg-gray-50 px-4 pt-6 pb-4 lg:h-[11.17em] lg:px-[1.33em] lg:pt-[2.67em] lg:pb-0">
              <span className="font-test-tiempos-fine text-4xl font-medium text-neutral-800 lg:text-[5em] lg:leading-[1.17]">
                <span data-count={stat.value}>0</span>
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
