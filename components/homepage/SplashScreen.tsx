"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { AnimationEvent, CSSProperties } from "react";
import "animate.css";

interface SplashScreenProps {
  /** Called when the logo animation ends — triggers the overlay fade-out */
  onFadeStart?: () => void;
  /** Called after the overlay fade-out completes — safe to unmount */
  onFadeComplete?: () => void;
}

export default function SplashScreen({ onFadeStart, onFadeComplete }: SplashScreenProps) {
  const [fading, setFading] = useState(false);
  const onFadeStartRef = useRef(onFadeStart);
  const onFadeCompleteRef = useRef(onFadeComplete);
  const holdTimer = useRef<number | null>(null);
  const fadeStarted = useRef(false);
  const doneNotified = useRef(false);
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

  // Clear any pending hold timer on unmount
  useEffect(
    () => () => {
      if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    },
    []
  );

  // Phase 1 → 2: start the overlay fade-out (guarded so event + fallback
  // timers can both call it safely).
  const startFade = useCallback(() => {
    if (fadeStarted.current) return;
    fadeStarted.current = true;
    setFading(true);
    onFadeStartRef.current?.();
  }, []);

  // Safety net: the whole sequence normally advances on `animationend`
  // events, but those never fire when animations are disabled
  // (prefers-reduced-motion) or are skipped while the tab is hidden.
  // These hard deadlines guarantee the splash always dismisses.
  useEffect(() => {
    // Logo rise is 2s + 450ms hold — allow generous slack for slow main threads
    const fadeFallback = window.setTimeout(startFade, 4000);
    return () => window.clearTimeout(fadeFallback);
  }, [startFade]);

  useEffect(() => {
    if (!fading) return;
    // Overlay fade is 0.8s — unmount shortly after even without animationend
    const completeFallback = window.setTimeout(() => {
      if (doneNotified.current) return;
      doneNotified.current = true;
      onFadeCompleteRef.current?.();
    }, 1500);
    return () => window.clearTimeout(completeFallback);
  }, [fading]);

  // Phase 1: logo rise animation ends → hold briefly → start the overlay fade-out (Phase 2)
  const handleLogoAnimationEnd = useCallback(() => {
    if (fadeStarted.current) return;
    if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(startFade, 450);
  }, [startFade]);

  // Phase 2: overlay fade-out animation ends → safe to unmount.
  // Ignores animationend events bubbled up from child elements (e.g. the logo).
  const handleOverlayAnimationEnd = useCallback(
    (e: AnimationEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (doneNotified.current) return;
      doneNotified.current = true;
      onFadeCompleteRef.current?.();
    },
    []
  );

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center ${
        fading ? "animate__animated animate__fadeOut" : ""
      }`}
      style={{
        backgroundColor: "#F3F3F1",
        ...(fading ? ({ "--animate-duration": "0.8s" } as CSSProperties) : {}),
      }}
      onAnimationEnd={handleOverlayAnimationEnd}
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
        className="animate__animated animate__fadeInUpBig relative z-10 object-contain"
        style={
          {
            width: 200,
            height: 99,
            "--animate-duration": "2s",
            animationDelay: "0s",
          } as CSSProperties
        }
      />
    </div>
  );
}
