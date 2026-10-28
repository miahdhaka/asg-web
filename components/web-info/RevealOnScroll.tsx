"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { scheduleScrollTriggerRefresh } from "./layoutRefresh";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealOnScrollProps {
  children: ReactNode;
  /** Extra classes on the wrapper (layout only — never set opacity/transform here) */
  className?: string;
  /** Distance in px the section rises from while hidden. Default 34 */
  y?: number;
  /** Tween duration in seconds once triggered. Default 1.15 */
  duration?: number;
  /** Extra stagger (seconds) applied to the targets when > 0. Default 0 */
  stagger?: number;
  /**
   * CSS selector (scoped to this wrapper) for the elements to animate. When
   * set, those descendants fade/stagger in; otherwise the whole wrapper moves
   * as one block. e.g. "h2, .grid > div" reveals a heading then its cards.
   */
  selector?: string;
  /** Extra delay (seconds) before the reveal starts — mirrors the reference
   *  `--d` stagger between sibling blocks. Default 0 */
  delay?: number;
}

/**
 * Wraps a section and reveals it smoothly on scroll: it starts hidden, faded
 * and slightly blurred, then rises into focus as it enters the viewport — the
 * same look as the reference site's `.rv` class. Reveals once (no replay).
 * Uses GSAP ScrollTrigger (the site-wide animation choice) and honours
 * reduced-motion.
 */
export default function RevealOnScroll({
  children,
  className,
  y = 34,
  duration = 1.15,
  stagger = 0,
  selector,
  delay = 0,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Re-measure trigger positions once post-hydration layout shifts settle.
      scheduleScrollTriggerRefresh();

      // Respect the user's reduced-motion preference: show everything, no tween.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // With a selector, animate the matching descendants (so a heading and
        // its cards can stagger); otherwise move the whole wrapper as one.
        const targets = selector
          ? gsap.utils.toArray(selector, ref.current)
          : ref.current;

        gsap.fromTo(
          targets,
          { autoAlpha: 0, y, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration,
            ease: "power3.out",
            stagger,
            delay,
            scrollTrigger: {
              trigger: ref.current,
              // Fire when the section is clearly in view; "top 85%" fired while
              // only a sliver was visible, so fast scrollers reached the
              // section after the reveal had already finished.
              start: "top 78%",
              // reveal once as the section comes into view
              once: true,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
