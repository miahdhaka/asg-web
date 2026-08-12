"use client";

import { useEffect } from "react";
import Hero from "@/components/homepage/Hero";
import OurBusiness from "@/components/homepage/OurBusiness";
import GlobalFootprint from "@/components/homepage/GlobalFootprint";
import Sustainability from "@/components/homepage/Sustainability";
import Certifications from "@/components/homepage/Certifications";
import WeAreASG from "@/components/homepage/WeAreASG";
import Newsroom from "@/components/homepage/Newsroom";
import IntroSection from "@/components/homepage/IntroSection";

export default function HomePage() {
  useEffect(() => {
    // Always start the homepage from the top
    window.scrollTo(0, 0);

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
      <Hero />
      <IntroSection />
      <OurBusiness />
      <GlobalFootprint />
      <Sustainability />
      <Certifications />
      <WeAreASG />
      <Newsroom />
    </main>
  );
}