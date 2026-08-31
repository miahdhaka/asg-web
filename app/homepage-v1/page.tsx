"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import Hero from "./components/Hero";
import OurBusiness from "./components/OurBusiness";
import GlobalFootprint from "./components/GlobalFootprint";
import Sustainability from "./components/Sustainability";
import Certifications from "./components/Certifications";
import WeAreASG from "./components/WeAreASG";
import Newsroom from "./components/Newsroom";
import IntroSection from "./components/IntroSection";
import "./homepage-v1.css";

export default function HomePageV1() {
  // Force a full page reload every time the page mounts — same as the real homepage.
  useLayoutEffect(() => {
    const KEY = "__asg_home_v1_reloaded";
    const now = Date.now();
    const last = parseInt(sessionStorage.getItem(KEY) || "0", 10);
    if (now - last > 5000) {
      sessionStorage.setItem(KEY, String(now));
      window.location.reload();
    }
  }, []);

  // Scroll to top on mount
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Shared refs connecting WeAreASG's count-up trigger/reset to Hero scroll stepper
  const waaTriggerRef = useRef<(() => void) | null>(null);
  const waaResetRef = useRef<(() => void) | null>(null);

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
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main>
      <style>{"#header-logo{opacity:0}"}</style>
      <script
        dangerouslySetInnerHTML={{
          __html: "if(window.scrollY>0)window.scrollTo(0,0);",
        }}
      />
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
