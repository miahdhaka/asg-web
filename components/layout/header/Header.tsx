"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu } from "lucide-react";
import Navigation from "./Navigation";
import Search from "./Search";
import MobileSidebar from "./MobileSidebar";

gsap.registerPlugin(useGSAP);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayTweenRef = useRef<gsap.core.Tween | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  // On the homepage the center logo starts hidden — the Hero scroll timeline
  // reveals it once the hero logo finishes its flight into the navbar.
  const isHome = pathname === "/";

  /* Publish the navbar's real height as --header-height. Every full-height
     section sizes itself with calc(100vh - var(--header-height)), and the
     header grows/shrinks with the fluid root font size, so a hard-coded
     value would leave the sections a few pixels off on every screen. */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const publish = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${el.getBoundingClientRect().height}px`
      );
    }; 
    publish();

    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  // Lock body scroll while search is open
  useEffect(() => {
    if (searchOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [searchOpen]);

  // Close search when navigating (Next.js client-side route change)
  useEffect(() => {
    if (searchOpen) setSearchOpen(false);
  }, [pathname]);

  // Animate the full-page overlay in/out when search opens/closes
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      overlayTweenRef.current?.kill();

      if (searchOpen) {
        overlayTweenRef.current = gsap.fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power3.out" },
        );
      } else {
        overlayTweenRef.current = gsap.to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [searchOpen] },
  );

  return (
    <>
      {/* Full-page dark overlay — sits behind the navbar (z-50) and search panel */}
      {searchOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-black/50 cursor-pointer"
          style={{ opacity: 0 }}
          onClick={() => setSearchOpen(false)}
        />
      )}

      <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-border backdrop-blur transition-colors duration-500 ease-in-out ${
        scrolled || searchOpen ? "bg-white" : "bg-background/60"
      }`}>
      <div className="grid grid-cols-3 items-center px-6">
        {/* Left: hamburger on mobile, full navigation on desktop */}
        <div className="h-full flex items-center py-5">
          {/* Mobile hamburger icon */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden cursor-pointer rounded-full p-1.5 transition-colors hover:bg-neutral-100"
            aria-label="Open menu"
          >
            <Menu className="size-6 text-neutral-800" />
          </button>
          {/* Desktop navigation */}
          <div className="hidden lg:block">
            <Navigation />
          </div>
        </div>

        {/* Logo - center */}
        <div className="flex items-center justify-center">
          {isHome ? (
            <a
              href="/"
              id="header-logo"
              className="flex items-center"
              style={{ opacity: 0 }}
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              <Image
                src="/logo/ASG-logo.png"
                alt="Amanat Shah Group"
                width={104}
                height={64}
                priority
                className="w-[5.5rem] h-[2.5rem] sm:w-26 sm:h-16 object-contain"
              />
            </a>
          ) : (
            <Link
              href="/"
              id="header-logo"
              scroll={true}
              className="flex items-center"
            >
              <Image
                src="/logo/ASG-logo.png"
                alt="Amanat Shah Group"
                width={104}
                height={64}
                priority
                className="w-[5.5rem] h-[2.5rem] sm:w-26 sm:h-16 object-contain"
              />
            </Link>
          )}
        </div>

        {/* Search - right */}
        <div className="flex items-center justify-end py-5">
          <Search onOpenChange={setSearchOpen} />
        </div>
      </div>
    </header>

      {/* Mobile sidebar navigation — rendered outside <header> so its z-index is not trapped */}
      <MobileSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
    </>
  );
}
