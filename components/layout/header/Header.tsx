"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import Search from "./Search";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

        {/* Logo - center */}
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center">
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
