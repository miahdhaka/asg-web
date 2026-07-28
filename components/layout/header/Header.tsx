"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Search from "./Search";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  // On the homepage the center logo starts hidden — the Hero scroll timeline
  // reveals it once the hero logo finishes its flight into the navbar.
  const isHome = usePathname() === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    // Hero plays its phases while the page is scroll-locked at the top,
    // so it broadcasts its state for the navbar background to follow
    const handleHeroPhase = (e: Event) => {
      setScrolled((e as CustomEvent).detail === true || window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hero-phase", handleHeroPhase);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hero-phase", handleHeroPhase);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-border backdrop-blur transition-colors duration-500 ease-in-out ${
      scrolled ? "bg-white" : "bg-background/60"
    }`}>
      <div className="grid grid-cols-3 items-center px-6">
        {/* Navigation - left */}
        <div className="h-full flex items-center py-5">
          <Navigation />
        </div>

        {/* Logo - center (hidden on homepage load; revealed by the Hero scroll timeline) */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            id="header-logo"
            className="flex items-center"
            style={isHome ? { opacity: 0 } : undefined}
          >
            <Image
              src="/logo/ASG-logo.png"
              alt="Amanat Shah Group"
              width={104}
              height={64}
              priority
              className="w-26 h-16 object-contain"
            />
          </Link>
        </div>

        {/* Search - right */}
        <div className="flex items-center justify-end py-5">
          <Search />
        </div>
      </div>
    </header>
  );
}
