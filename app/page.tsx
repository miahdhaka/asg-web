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
  // Force a full page reload every time the homepage mounts.
  // The homepage's custom scroll system, GSAP timelines, and logo animations
  // require a pristine initial state — client-side navigation (including the
  // browser back button) can leave residual styles from the previous page.
  // A hard reload guarantees the homepage always starts completely fresh.
  //
  // A sessionStorage timestamp prevents infinite reload loops: if the page
  // was reloaded within the last 5 seconds we skip the reload.  After 5 s
  // the flag expires so a later back-button return triggers a new reload.
  useLayoutEffect(() => {
    const KEY = "__asg_home_reloaded";
    const now = Date.now();
    const last = parseInt(sessionStorage.getItem(KEY) || "0", 10);
    if (now - last > 5000) {
      sessionStorage.setItem(KEY, String(now));
      window.location.reload();
    }
  }, []);

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