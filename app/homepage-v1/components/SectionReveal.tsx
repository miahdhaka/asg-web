"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Entry reveal for the /homepage-test sandbox.
   The hero owns the opening sequence (its four gesture-driven phases end with
   the IntroSection settling), so these triggers stay disarmed until the hero
   hands the page back to native scrolling — while the intro is pinned a full
   screen is out of the flow and triggers built then would measure against the
   wrong document height and fire behind the overlay. */
export type RevealVariant =
  | "maskUp"
  | "slideLeft"
  | "zoomBlur"
  | "curtainSide"
  | "flipUp"
  | "slideRight"
  | "riseScale";

interface SectionRevealProps {
  variant: RevealVariant;
  children: React.ReactNode;
}

/* from → to pairs per variant. `autoAlpha` flips visibility as well as
   opacity, which is what keeps the section genuinely hidden beforehand. */
const VARIANTS: Record<
  RevealVariant,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  // Wipes upward from its own bottom edge while easing into place
  maskUp: {
    from: { autoAlpha: 0, y: 70, clipPath: "inset(100% 0% 0% 0%)" },
    to: {
      autoAlpha: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.15,
      ease: "power3.out",
    },
  },
  // Glides in from the right
  slideLeft: {
    from: { autoAlpha: 0, x: 140 },
    to: { autoAlpha: 1, x: 0, duration: 1.1, ease: "power3.out" },
  },
  // Pulls focus: oversized and out of focus, then settles sharp
  zoomBlur: {
    from: { autoAlpha: 0, scale: 1.14, filter: "blur(14px)" },
    to: {
      autoAlpha: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.25,
      ease: "power2.out",
    },
  },
  // Curtain opens from the left edge across the section
  curtainSide: {
    from: { autoAlpha: 0, clipPath: "inset(0% 100% 0% 0%)" },
    to: {
      autoAlpha: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      ease: "power2.inOut",
    },
  },
  // Tips up into the viewport like a card being laid flat
  flipUp: {
    from: {
      autoAlpha: 0,
      y: 90,
      rotationX: -22,
      transformPerspective: 1400,
      transformOrigin: "50% 100%",
    },
    to: {
      autoAlpha: 1,
      y: 0,
      rotationX: 0,
      duration: 1.2,
      ease: "power3.out",
    },
  },
  // Glides in from the left
  slideRight: {
    from: { autoAlpha: 0, x: -140 },
    to: { autoAlpha: 1, x: 0, duration: 1.1, ease: "power3.out" },
  },
  // Rises from below while scaling up to full size
  riseScale: {
    from: { autoAlpha: 0, y: 130, scale: 0.92 },
    to: {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
    },
  },
};

export default function SectionReveal({
  variant,
  children,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const { from, to } = VARIANTS[variant];
      let tween: gsap.core.Tween | null = null;

      const build = () => {
        // Softer travel on small screens so nothing overflows sideways
        const mobile = window.matchMedia("(max-width: 1023px)").matches;
        const scaled = { ...from };
        if (mobile) {
          if (typeof scaled.x === "number") scaled.x = scaled.x * 0.45;
          if (typeof scaled.y === "number") scaled.y = scaled.y * 0.55;
        }

        tween = gsap.fromTo(el, scaled, {
          ...to,
          // Drop the inline transform/filter/clip once the entrance is done so
          // the section behaves like plain static markup afterwards.
          clearProps: "filter,clipPath,transform",
          scrollTrigger: {
            trigger: el,
            start: mobile ? "top 92%" : "top 82%",
            once: true,
          },
        });
        // The intro just returned to the flow — re-measure every start point
        ScrollTrigger.refresh();
      };

      // Already handed over (e.g. this component remounted later)? Arm now.
      if (document.documentElement.dataset.asgTestNative === "1") build();
      else window.addEventListener("asg-test-native", build);

      return () => {
        window.removeEventListener("asg-test-native", build);
        tween?.scrollTrigger?.kill();
        tween?.kill();
      };
    },
    { scope: ref, dependencies: [variant] }
  );

  return (
    <div ref={ref} className="asg-reveal overflow-hidden">
      {children}
    </div>
  );
}
