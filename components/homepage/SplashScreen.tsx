"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface SplashScreenProps {
  /** Called when the logo rise animation ends — triggers overlay fade-out */
  onFadeStart?: () => void;
  /** Called after the overlay fade-out completes — safe to unmount */
  onFadeComplete?: () => void;
}

export default function SplashScreen({ onFadeStart, onFadeComplete }: SplashScreenProps) {
  const [fading, setFading] = useState(false);
  const onFadeStartRef = useRef(onFadeStart);
  const onFadeCompleteRef = useRef(onFadeComplete);
  onFadeStartRef.current = onFadeStart;
  onFadeCompleteRef.current = onFadeComplete;

  // Lock page scroll while splash screen is mounted — restore on unmount.
  // Uses position: fixed + scroll preservation (reliable under GSAP/Tailwind).
  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    const prevBodyStyle = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    const prevOverflow = html.style.overflow;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    html.style.overflow = "hidden";

    const prevent = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", prevent, { passive: false, capture: true });
    window.addEventListener("touchmove", prevent, { passive: false, capture: true });
    window.addEventListener("keydown", prevent, { capture: true });

    return () => {
      body.style.position = prevBodyStyle.position;
      body.style.top = prevBodyStyle.top;
      body.style.left = prevBodyStyle.left;
      body.style.right = prevBodyStyle.right;
      body.style.width = prevBodyStyle.width;
      html.style.overflow = prevOverflow;
      window.scrollTo(0, scrollY);
      window.removeEventListener("wheel", prevent, { capture: true });
      window.removeEventListener("touchmove", prevent, { capture: true });
      window.removeEventListener("keydown", prevent, { capture: true });
    };
  }, []);

  // Phase 1: Logo rise animation ends → start overlay fade-out (Phase 2)
  const handleLogoAnimationEnd = useCallback(() => {
    setFading(true);
    onFadeStartRef.current?.();
  }, []);

  // Phase 2: Overlay CSS transition ends → safe to unmount
  const handleOverlayTransitionEnd = useCallback(() => {
    onFadeCompleteRef.current?.();
  }, []);

  return (
    <div
      className={`splash-overlay-fade fixed inset-0 z-[100] flex items-center justify-center ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#F3F3F1" }}
      onTransitionEnd={handleOverlayTransitionEnd}
    >
      {/* Decorative blurred background — static, no animation */}
      <img
        src="/images/hero/splash-bg.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <img
        src="/logo/ASG-logo.png"
        alt="Amanat Shah Group"
        onAnimationEnd={handleLogoAnimationEnd}
        className="splash-logo relative z-10 object-contain"
        style={{ width: 200, height: 99 }}
      />
    </div>
  );
}
