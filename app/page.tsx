"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplashScreen from "@/components/homepage/SplashScreen";
import Hero from "@/components/homepage/Hero";
import OurBusiness from "@/components/homepage/OurBusiness";
import GlobalFootprint from "@/components/homepage/GlobalFootprint";
import Sustainability from "@/components/homepage/Sustainability";
import Certifications from "@/components/homepage/Certifications";
import WeAreASG from "@/components/homepage/WeAreASG";
import Newsroom from "@/components/homepage/Newsroom";
import IntroSection from "@/components/homepage/IntroSection";

export default function HomePage() {
  // Clean up any residual GSAP/ScrollTrigger state from a previous visit
  // (e.g. browser back button). useGSAP in child components handles their own
  // cleanup, but ScrollTrigger may leave pinned styles on <html>/<body>.
  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  // Always start from the top of the page
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [splashDone, setSplashDone] = useState(false);
  // Keep SplashScreen mounted during its fade-out so the overlay dissolves
  // smoothly into the homepage — no abrupt unmount flash
  const [splashMounted, setSplashMounted] = useState(true);
  // Defer main content mount so the logo rise has the main thread.
  // Logo rise: 0.3s delay + ~2.1s rise = 2.4s, mount at 1.8s (Hero
  // renders before the overlay starts fading at ~2.8s)
  const [mainMounted, setMainMounted] = useState(false);

  useLayoutEffect(() => {
    const id = setTimeout(() => setMainMounted(true), 1500);
    return () => clearTimeout(id);
  }, []);

  // C2 fix: shared refs connecting WeAreASG's count-up trigger/reset to
  // the homepage scroll stepper in Hero.tsx
  const waaTriggerRef = useRef<(() => void) | null>(null);
  const waaResetRef = useRef<(() => void) | null>(null);
  const handleWaaReady = useCallback((trigger: () => void, reset: () => void) => {
    waaTriggerRef.current = trigger;
    waaResetRef.current = reset;
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
    <>
      {splashMounted && (
        <SplashScreen
          onFadeStart={() => setSplashDone(true)}
          onFadeComplete={() => setSplashMounted(false)}
        />
      )}
      {mainMounted && (
        <main style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <Hero waaTriggerRef={waaTriggerRef} waaResetRef={waaResetRef} />
          <IntroSection />
          <OurBusiness />
          <GlobalFootprint />
          <Sustainability />
          <Certifications />
          <WeAreASG onReady={handleWaaReady} />
          <Newsroom />
        </main>
      )}
    </>
  );
}