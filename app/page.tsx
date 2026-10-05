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
import RockSteadySection from "@/components/about/globe/Section";

export default function HomePage() {
  // Clean up residual ScrollTrigger state from a previous visit
  // (e.g. browser back button). useGSAP in child components handles their own
  // tween cleanup; ScrollTrigger may leave pinned styles on <html>/<body>.
  // NOTE: do NOT call gsap.globalTimeline.clear() here — it kills ALL
  // animations globally, including the Header's mega-close tween that is
  // mid-flight when the user navigates away, leaving the panel stuck open.
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

  // Wrapper handed to ASGHighlight so its cover phase can drive About Us's
  // slow, eased rise over the still-pinned section. The z-20 sits on the
  // wrapper (not just the section) because the transform ASGHighlight applies
  // makes this a stacking context — it has to outrank the pinned section.
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
            // Own GPU layer — ASGHighlight writes this transform every frame
            // during the cover, and compositing it keeps the glide from
            // re-rasterizing the whole section.
            style={{ transform: "translateZ(0)", willChange: "transform" }}
          >
            <AboutUs />
          </div>
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