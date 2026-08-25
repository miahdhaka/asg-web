"use client";

import { useEffect, useLayoutEffect } from "react";
import Hero from "./components/Hero";
import OurBusiness from "./components/OurBusiness";
import GlobalFootprint from "./components/GlobalFootprint";
import Sustainability from "./components/Sustainability";
import Certifications from "./components/Certifications";
import WeAreASG from "./components/WeAreASG";
import Newsroom from "./components/Newsroom";
import IntroSection from "./components/IntroSection";
import SectionReveal from "./components/SectionReveal";
import "./homepage-test.css";

/* /homepage-test sandbox — the real homepage's opening, then native scroll.
   Hero drives the same four gesture phases as the live site and ends with the
   IntroSection settled, then releases the page to the browser: every section
   after the intro arrives with the zoom-blur entrance on native scroll. */
export default function HomePageTest() {
  // Same full-reload-on-mount behavior as the real homepage, but with a
  // separate sessionStorage key so `/` and `/homepage-test` never
  // interfere with each other's reload loop.
  useLayoutEffect(() => {
    const KEY = "__asg_home_test_reloaded";
    const now = Date.now();
    const last = parseInt(sessionStorage.getItem(KEY) || "0", 10);
    if (now - last > 5000) {
      sessionStorage.setItem(KEY, String(now));
      window.location.reload();
    }
  }, []);

  // Always start from the top on mount
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
      // Remove the style when leaving the test homepage
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main>
      {/* Hide the navbar centre logo from the very first paint on this
          route: Header's opacity:0 only ships on "/", and Hero takes over
          with inline styles once its effect runs (inline beats this rule).
          SSR'd, so it applies before hydration — no flash on refresh.
          Everything else in the navbar is the shared Header, exactly as
          the main site renders it. */}
      <style>{"#header-logo{opacity:0}"}</style>
      {/* Kill the browser's scroll restoration before first paint, so a
          refresh never paints the page mid-scroll before React re-seats
          it at the top. */}
      <script
        dangerouslySetInnerHTML={{
          __html: "if(window.scrollY>0)window.scrollTo(0,0);",
        }}
      />
      <Hero />
      {/* Not wrapped: the Hero's 4th phase owns the intro's curtain reveal */}
      <IntroSection />
      <SectionReveal variant="zoomBlur">
        <OurBusiness />
      </SectionReveal>
      <SectionReveal variant="zoomBlur">
        <GlobalFootprint />
      </SectionReveal>
      <SectionReveal variant="zoomBlur">
        <Sustainability />
      </SectionReveal>
      <SectionReveal variant="zoomBlur">
        <Certifications />
      </SectionReveal>
      <SectionReveal variant="zoomBlur">
        <WeAreASG />
      </SectionReveal>
      <SectionReveal variant="zoomBlur">
        <Newsroom />
      </SectionReveal>
    </main>
  );
}
