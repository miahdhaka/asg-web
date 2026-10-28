"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface BarGrowProps {
  /** Bar heights as percentages (0–100), left to right. */
  values: number[];
  /** Classes on the flex row (set height/width here). */
  className?: string;
  /** Classes for each bar. Defaults to the site's primary gradient. */
  barClassName?: string;
}

/**
 * Replicates the reference `.energy-bars` reveal: bars start almost flat
 * (scaleY 0.08) pinned to their bottom edge, then spring up to full height
 * one after another (≈22ms apart) when the block scrolls into view.
 * Plays once, reduced-motion safe (bars render at full height immediately).
 */
export default function BarGrow({ values, className, barClassName }: BarGrowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const bars = gsap.utils.toArray<HTMLElement>("[data-bar]", ref.current);
        gsap.fromTo(
          bars,
          { scaleY: 0.08 },
          {
            scaleY: 1,
            transformOrigin: "bottom",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.022,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`flex items-end gap-[3px] ${className ?? ""}`}>
      {values.map((v, i) => (
        <i
          key={i}
          data-bar
          style={{ height: `${v}%` }}
          className={`block flex-1 rounded-[2px] bg-[image:var(--primary-gradient)] ${barClassName ?? ""}`}
        />
      ))}
    </div>
  );
}
