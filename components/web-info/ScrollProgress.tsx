"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The reference site's top scroll-progress bar: a thin fixed gradient line
 * that scales left→right in direct proportion to page scroll (scrubbed).
 * Reduced-motion safe (bar simply stays hidden).
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.3,
          },
        }
      );
    });
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[3px]">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[image:var(--primary-gradient)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
