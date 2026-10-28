"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StrokeDrawProps {
  /** An <svg> (or block containing one) whose strokes draw themselves in.
   *  Every path/circle/etc. must use pathLength={1} strokeDasharray={1}. */
  children: ReactNode;
  className?: string;
  /** Seconds the draw takes. Default 1.8 */
  duration?: number;
  /** Delay after entering the viewport, in seconds. Default 0.2 */
  delay?: number;
}

/**
 * Replicates the reference site's SVG line-drawing reveals (`.ring .r-fg`
 * progress circle and the hero underline): strokes start fully dashed-away
 * (stroke-dashoffset 1) and draw to 0 when scrolled into view. Tag children
 * with pathLength={1} + strokeDasharray={1} so one dash covers the whole
 * shape regardless of its real length. Plays once, reduced-motion safe.
 */
export default function StrokeDraw({
  children,
  className,
  duration = 1.8,
  delay = 0.2,
}: StrokeDrawProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const shapes = gsap.utils.toArray<SVGElement>(
          "path, circle, rect, line, polyline, ellipse",
          ref.current
        );
        gsap.fromTo(
          shapes,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration,
            delay,
            ease: "power2.inOut",
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
    <div ref={ref} className={`block ${className ?? ""}`}>
      {children}
    </div>
  );
}
