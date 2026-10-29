"use client";

import {
  useRef,
  type ComponentType,
  type CSSProperties,
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
  /** Seconds per piece. Defaults: word 1.25, char 1.35 */
  duration?: number;
  /** Delay between pieces in seconds. Defaults: word 0.055, char 0.05 */
  stagger?: number;
  /** Extra delay before the reveal starts, in seconds. Default 0 */
  delay?: number;
}

/**
 * Reveals text piece-by-piece on scroll. Word mode: every word sits in an
 * overflow-hidden mask and rises from below with a slight rotation (the
 * reference site's `[data-split]` header effect). Char mode: every letter
 * rises and fades (its `.f-word` wordmark effect). Both modes also fade
 * through `autoAlpha`, because a mask alone cannot be trusted to hide the
 * piece: with tight leading the glyph ink overflows the line box, so the
 * start position leaves a slice of the caps poking out of the slit.
 * GSAP ScrollTrigger, plays once, reduced-motion safe (plain text immediately).
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

  // The same start values GSAP will tween from, published as CSS variables so
  // globals.css can pre-position the pieces during server render. Without them
  // the words paint finished for a beat, jump down on hydration and then rise.
  const fromVars = {
    "--split-from-y": by === "word" ? "118%" : "60%",
    "--split-from-rot": by === "word" ? "4deg" : "0deg",
    "--split-from-opacity": "0",
  } as CSSProperties;

  useGSAP(
    () => {
      // Re-measure trigger positions once post-hydration layout shifts settle.
      scheduleScrollTriggerRefresh();

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const spans = gsap.utils.toArray<HTMLElement>("[data-split-piece]", ref.current);

        // Hand ownership of the start position to GSAP. The globals.css rule
        // only pre-positions pieces that are still unarmed, so marking them
        // here makes CSS step back the moment a tween exists — GSAP's own
        // from-state then drives the hidden look until the trigger plays.
        // If GSAP never runs at all, the heading is never locked invisible.
        spans.forEach((span) => span.setAttribute("data-split-armed", ""));

        const dur = duration ?? (by === "word" ? 1.25 : 1.35);
        const step = stagger ?? (by === "word" ? 0.055 : 0.05);
        const from =
          by === "word"
            ? { yPercent: 118, rotation: 4, autoAlpha: 0 }
            : { yPercent: 60, autoAlpha: 0 };
        const to =
          by === "word"
            ? { yPercent: 0, rotation: 0, autoAlpha: 1 }
            : { yPercent: 0, autoAlpha: 1 };

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
    <Tag ref={ref} className={className} style={fromVars}>
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
