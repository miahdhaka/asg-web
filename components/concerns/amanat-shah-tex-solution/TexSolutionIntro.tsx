"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const paragraphs = [
  "Amanat Shah Tex Solution is a specialized manufacturer and supplier of a wide range of surfactants, emulsifiers, and specialty chemicals, catering to the diverse needs of the textile industry. Established in 2025, we are committed to delivering exceptional performance, reliability, and innovation in every chemical formulation. As a trusted partner for businesses, we build strong relationships by understanding client needs and delivering customized, cost-effective solutions with speed and precision.",
];

const clients = [
  "Amanat Shah Lungi",
  "Standard Lungi",
  "Amanat Shah Fabrics",
];

interface Stat {
  value: string;
  /** Whether the value is a plain number (for count-up animation) */
  numeric: boolean;
  numericValue?: number;
  label: string;
  subLabel?: string;
}

const stats: Stat[] = [
  { value: "2025", numeric: false, label: "ESTABLISHMENT" },
  { value: "600", numeric: true, numericValue: 600, label: "PRODUCTION CAPACITY", subLabel: "Metric tons monthly" },
  { value: "99.8%", numeric: false, label: "TECHNICAL COMPLIANCE RATE" },
  { value: "50+", numeric: false, label: "EMPLOYEES" },
];

/**
 * Intro copy, client list, and the four-up stat cards for the
 * Amanat Shah Tex Solution concern page (Figma node 1692-10970).
 */
export default function TexSolutionIntro() {
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const format = (v: number) =>
          v.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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
      id="tex-solution-intro"
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

        {/* Client list with check-mark icons */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:gap-x-[2em]">
          {clients.map((name) => (
            <div key={name} className="flex items-center gap-1.5 lg:gap-[0.5em]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
                className="h-3.5 w-3.5 lg:h-[1em] lg:w-[1em]"
              >
                <path
                  d="M11.5 3.5L5.5 9.5L2.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs text-neutral-800 sm:text-sm lg:text-[1em] lg:leading-[1.33]">
                {name}
              </span>
            </div>
          ))}
        </div>
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
                {stat.numeric ? (
                  <span data-count={stat.numericValue}>0</span>
                ) : (
                  stat.value
                )}
              </span>
              {stat.subLabel && (
                <span className="text-xs whitespace-nowrap text-neutral-800 sm:text-sm lg:text-[1.17em] lg:leading-[1.43]">
                  {stat.subLabel}
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
