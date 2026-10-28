"use client";

import {
  useRef,
  type ComponentType,
  type ElementType,
  type HTMLAttributes,
  type Ref,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { scheduleScrollTriggerRefresh } from "./layoutRefresh";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SplitRevealProps {
  /** Text revealed piece by piece as it scrolls into view. */
  text: string;
  /** Element/tag to render. Default "h2" */
  as?: ElementType;
  className?: string;
  /**
   * Split granularity:
   * "word" — each word rises out of a mask (reference `[data-split]` headers)
   * "char" — each letter rises + fades in (reference `.f-word` wordmark)
   * Default "word"
   */
  by?: "word" | "char";
  /** Seconds per piece. Defaults: word 1.1, char 1.2 */
  duration?: number;
  /** Delay between pieces in seconds. Defaults: word 0.055, char 0.045 */
  stagger?: number;
  /** Extra delay before the reveal starts, in seconds. Default 0 */
  delay?: number;
}

/**
 * Reveals text piece-by-piece on scroll. Word mode: every word sits in an
 * overflow-hidden mask and rises from below with a slight rotation (the
 * reference site's `[data-split]` header effect). Char mode: every letter
 * rises and fades (its `.f-word` wordmark effect). GSAP ScrollTrigger,
 * plays once, reduced-motion safe (renders as plain text immediately).
 */
export default function SplitReveal({
  text,
  as = "h2",
  className,
  by = "word",
  duration,
  stagger,
  delay = 0,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const units = by === "word" ? text.trim().split(/\s+/) : [...text];

  // `ElementType` on its own leaves ref/className/children resolving to `never`
  // (TS can't pick one prop type across the whole tag union), and parameterizing
  // it explodes the union complexity. Bind the tag to a single ComponentType
  // with concrete props so JSX accepts the ref and mapped children; a string tag
  // like "h2" still renders as an intrinsic element at runtime.
  const Tag = as as ComponentType<HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }>;

  useGSAP(
    () => {
      // Re-measure trigger positions once post-hydration layout shifts settle.
      scheduleScrollTriggerRefresh();

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const spans = gsap.utils.toArray<HTMLElement>("[data-split-piece]", ref.current);
        const dur = duration ?? (by === "word" ? 1.15 : 1.25);
        const step = stagger ?? (by === "word" ? 0.05 : 0.045);
        const from =
          by === "word"
            ? { yPercent: 105, rotation: 4 }
            : { yPercent: 60, autoAlpha: 0 };
        const to =
          by === "word" ? { yPercent: 0, rotation: 0 } : { yPercent: 0, autoAlpha: 1 };

        gsap.fromTo(spans, from, {
          ...to,
          transformOrigin: "0 100%",
          duration: dur,
          ease: "power3.out",
          stagger: step,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            // fire with the heading well inside the viewport (matches
            // RevealOnScroll) so the word-rise is actually seen
            start: "top 78%",
            once: true,
          },
        });
      });
    },
    { scope: ref }
  );

  const maskClass = "inline-block overflow-hidden align-top pb-[0.08em] -mb-[0.08em]";

  return (
    <Tag ref={ref} className={className}>
      {by === "word"
        ? units.map((unit, i) => (
            <span key={i} className={maskClass}>
              <span data-split-piece className="inline-block">
                {unit}
                {i < units.length - 1 ? "\u00A0" : ""}
              </span>
            </span>
          ))
        : units.map((unit, i) =>
            unit === " " ? (
              <span key={i} className="inline-block w-[0.24em]" />
            ) : (
              <span key={i} className={maskClass}>
                <span data-split-piece className="inline-block">
                  {unit}
                </span>
              </span>
            )
          )}
    </Tag>
  );
}
