"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface LitTextProps {
  /** Text whose words brighten one-by-one as you scroll through it. */
  text: string;
  /** Element/tag to render. Default "p" (typed as `any` so the rendered tag
   *  accepts a concrete ref and children without JSX union errors) */
  as?: any;
  className?: string;
  /** Opacity of an unlit word. Default 0.16 (reference `.lw`) */
  dim?: number;
}

/**
 * Replicates the reference site's `.statement [data-lit]` effect: every word
 * starts dim (opacity .16) and words light up in reading order, driven
 * directly by scroll progress (scrubbed) between the viewport's 88% and 38%
 * lines — the sentence "illuminates" as you scroll it. Reduced-motion safe.
 */
export default function LitText({ text, as: Tag = "p", className, dim = 0.16 }: LitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.trim().split(/\s+/);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const spans = gsap.utils.toArray<HTMLElement>("[data-lit-word]", ref.current);
        gsap.fromTo(
          spans,
          { opacity: dim },
          {
            opacity: 1,
            ease: "none",
            // distribute the lighting across the whole scroll range
            duration: 0.15,
            stagger: 0.85 / spans.length,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              end: "bottom 38%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} data-lit-word className="inline-block">
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
