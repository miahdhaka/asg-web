"use client";

import { useState, useRef, useCallback } from "react";

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
