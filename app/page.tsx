"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplashScreen from "@/components/homepage/SplashScreen";
import Hero from "@/components/homepage/Hero";
import OurBusiness from "@/components/homepage/OurBusiness";
import GlobalFootprint from "@/components/homepage/GlobalFootprint";
import GreenerFuture from "@/components/homepage/GreenerFuture";
import Sustainability from "@/components/homepage/Sustainability";
import CertificationsCompliance from "@/components/homepage/CertificationsCompliance";
import LegacyOfLeadership from "@/components/homepage/LegacyOfLeadership";
import WeAreASG from "@/components/homepage/WeAreASG";
import Newsroom from "@/components/homepage/Newsroom";
import IntroSection from "@/components/homepage/IntroSection";
import ASGHighlight from "@/components/homepage/ASGHighlight";
import AboutUs from "@/components/homepage/AboutUs";
import RockSteadySection from "@/components/about/globe/Section";

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
  // Defer main content mount so the logo animation has the main thread
  const [mainMounted, setMainMounted] = useState(false);

  useLayoutEffect(() => {
    const id = setTimeout(() => setMainMounted(true), 1500);
    return () => clearTimeout(id);
  }, []);

  // Shared ref connecting ASGHighlight's slide change to Hero's side content
  const heroSlideChangeRef = useRef<((idx: number) => void) | null>(null);
  const handleHighlightSlideChange = useCallback((concernIdx: number) => {
    heroSlideChangeRef.current?.(concernIdx);
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
          <Hero heroSlideChangeRef={heroSlideChangeRef} />
          <ASGHighlight onSlideChange={handleHighlightSlideChange} />
          <AboutUs />
          <RockSteadySection />
          <GreenerFuture />
          <CertificationsCompliance />
          <LegacyOfLeadership />
          <Newsroom />
        </main>
      )}
    </>
  );
}