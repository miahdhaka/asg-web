"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { scheduleScrollTriggerRefresh } from "./layoutRefresh";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ImageRevealProps {
  /** The picture to reveal — put a next/image (or any visual) as the only
   *  child filling the wrapper; it starts zoomed in and settles to scale 1. */
  children: ReactNode;
  /** Corner radius used by the clip-path mask. Default 1rem */
  radius?: string;
  /** Classes on the clipping wrapper (set the size/aspect here). */
  className?: string;
}

/**
 * Reveals a picture the way the reference site's `.rv-img` does: the wrapper
 * starts clipped inward (inset) and the child starts zoomed-in, then the mask
 * opens to full and the child settles to scale 1 as it scrolls into view.
 * Content-agnostic — works with any image (or block) you put inside.
 * GSAP ScrollTrigger, plays once, reduced-motion safe.
 */
export default function ImageReveal({ children, radius = "1rem", className }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Re-measure trigger positions once post-hydration layout shifts settle,
      // so the reveal never plays while the section is still off screen.
      scheduleScrollTriggerRefresh();

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const inner = ref.current?.firstElementChild;

        // One timeline so the mask opening and the zoom-out always start
        // together when the wrapper scrolls into view.
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
        });

        tl.fromTo(
          ref.current,
          { clipPath: `inset(14% 10% 14% 10% round ${radius})` },
          {
            clipPath: `inset(0% 0% 0% 0% round ${radius})`,
            duration: 1.9,
            ease: "power3.out",
          },
          0
        );

        if (inner) {
          tl.fromTo(
            inner,
            { scale: 1.22 },
            { scale: 1, duration: 2.4, ease: "power3.out" },
            0
          );
        }
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      {children}
    </div>
  );
}
