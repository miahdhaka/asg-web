"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplashScreen from "@/components/homepage/SplashScreen";
import Hero from "@/components/homepage/Hero";
import GreenerFuture from "@/components/homepage/GreenerFuture";
import CertificationsCompliance from "@/components/homepage/CertificationsCompliance";
import LegacyOfLeadership from "@/components/homepage/LegacyOfLeadership";
import Newsroom from "@/components/homepage/Newsroom";
import ASGHighlight from "@/components/homepage/ASGHighlight";
import AboutUs from "@/components/homepage/AboutUs";
import GlobeHero from "@/components/about/globe/GlobeHero";

export default function HomePage() {
  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Always start from the top of the page
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [splashDone, setSplashDone] = useState(false);
  // Keep SplashScreen mounted during its fade-out so the overlay dissolves smoothly into the homepage — no abrupt unmount flash
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

  const aboutRiseRef = useRef<HTMLDivElement>(null);

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
          <ASGHighlight onSlideChange={handleHighlightSlideChange} nextSectionRef={aboutRiseRef} />
          <div
            ref={aboutRiseRef}
            className="relative z-20"
            style={{ transform: "translateZ(0)", willChange: "transform" }}
          >
            <AboutUs />
          </div>
          <GlobeHero />
          <GreenerFuture />
          <CertificationsCompliance />
          <LegacyOfLeadership />
          <Newsroom />
        </main>
      )}
    </>
  );
}