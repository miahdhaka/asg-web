"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import Hero from "@/components/homepage/Hero";
import OurBusiness from "@/components/homepage/OurBusiness";
import GlobalFootprint from "@/components/homepage/GlobalFootprint";
import Sustainability from "@/components/homepage/Sustainability";
import Certifications from "@/components/homepage/Certifications";
import WeAreASG from "@/components/homepage/WeAreASG";
import Newsroom from "@/components/homepage/Newsroom";
import IntroSection from "@/components/homepage/IntroSection";

export default function HomePage() {
  // C2 fix: shared refs connecting WeAreASG's count-up trigger/reset to
  // the homepage scroll stepper in Hero.tsx
  const waaTriggerRef = useRef<(() => void) | null>(null);
  const waaResetRef = useRef<(() => void) | null>(null);
  // useLayoutEffect fires BEFORE any child useEffect/useGSAP — guarantees
  // the Hero sees scrollY === 0 on mount, so it always starts from step 0
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Hide scrollbar visually but keep scroll functionality
    const style = document.createElement("style");
    style.innerHTML = `
      html::-webkit-scrollbar, body::-webkit-scrollbar {
        display: none;
      }
      html, body {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Remove the style when leaving homepage
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main>
      <Hero waaTriggerRef={waaTriggerRef} waaResetRef={waaResetRef} />
      <IntroSection />
      <OurBusiness />
      <GlobalFootprint />
      <Sustainability />
      <Certifications />
      <WeAreASG onReady={useCallback((trigger: () => void, reset: () => void) => {
        waaTriggerRef.current = trigger;
        waaResetRef.current = reset;
      }, [])} />
      <Newsroom />
    </main>
  );
}