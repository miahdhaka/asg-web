"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface StatItem {
  value: number;
  /** Rendered after the animated number, e.g. "k" or "+" */
  suffix?: string;
  /** Rendered below/after the number as a unit label */
  unit?: string;
  /** Alternative to unit — rendered as a sub-label */
  subLabel?: string;
  label: string;
  /** For decimal counting animation */
  decimals?: number;
  /** For grouped number formatting (e.g. 1,000) */
  grouped?: boolean;
  /** For conditional numeric vs text display (TexSolution pattern) */
  numeric?: boolean;
  numericValue?: number;
  /** Static text value for non-animated display (used with numeric:false) */
  staticValue?: string;
}

interface StatGridProps {
  stats: StatItem[];
  /** Grid columns on lg breakpoint: 4 or 5. Default 4 */
  columns?: 4 | 5;
  /** Custom className for the grid container */
  className?: string;
}

/**
 * Reusable animated stat card grid used across concern intro pages.
 * Numbers count up from 0 when scrolled into view.
 */
export default function StatGrid({ stats, columns = 4, className }: StatGridProps) {
  const statsRef = useRef<HTMLDivElement>(null);

  // Count each number up from 0 whenever the stat cards scroll into view;
  // leaving the grid (either direction) resets so the count-up replays.
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals) || 0;
        const grouped = el.dataset.grouped === "1";
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
            let formatted: string;
            if (decimals > 0) {
              formatted = counter.value.toFixed(decimals);
            } else {
              formatted = String(Math.round(counter.value));
            }
            if (grouped) {
              formatted = Number(formatted).toLocaleString("en-US");
            }
            el.textContent = formatted;
          },
        });
      });
    },
    { scope: statsRef }
  );

  const gridCols = columns === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";

  return (
    <div
      ref={statsRef}
      className={`mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-[1.33em] ${gridCols} lg:gap-[1.33em] ${className ?? ""}`}
    >
      {stats.map((stat) => {
        // Handle conditional numeric/text display (TexSolution pattern)
        const isNumeric = stat.numeric !== false;
        const displayValue = isNumeric ? (stat.numericValue ?? stat.value) : 0;

        return (
          <div key={stat.label} className="flex flex-col">
            <div className="border border-gray-100 bg-gray-50 lg:h-[11.17em] pt-6 lg:pt-[2.67em] px-3 sm:px-4 lg:px-[1.33em] pb-4 lg:pb-0 overflow-hidden">
              <span className="font-test-tiempos-fine text-3xl sm:text-4xl lg:text-[5em] font-medium text-neutral-800 lg:leading-[1.17]">
                {isNumeric ? (
                  <span
                    data-count={displayValue}
                    data-decimals={stat.decimals ?? 0}
                    data-grouped={stat.grouped ? "1" : "0"}
                  >
                    0
                  </span>
                ) : (
                  stat.staticValue
                )}
                {stat.suffix}
              </span>
              {(stat.unit || stat.subLabel) && (
                <span className="text-xs whitespace-nowrap text-neutral-800 sm:text-sm lg:text-[1.17em] lg:leading-[1.43]">
                  {stat.unit || stat.subLabel}
                </span>
              )}
            </div>
            <div className="flex items-center border border-t-0 border-gray-100 bg-gray-50 lg:h-[4.67em] px-3 sm:px-4 lg:px-[1.33em] py-3 lg:py-0">
              <span className="text-xs sm:text-sm lg:text-[1.33em] capitalize sm:uppercase text-neutral-800 lg:leading-[1.5]">
                {stat.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
