"use client";

import Image from "next/image";
import { useRef, useCallback, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const years = [
  "1896", "1983", "1983", "2004", "2005", "2007",
  "2009", "2009", "2014", "2015", "2017", "2019",
  "2019", "2025",
];

export default function OurHistoryHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Map each year to its occurrence indices in the milestones array
  const yearIndexMap = useRef<Record<string, number[]>>({});
  // Track next occurrence index for each year (for duplicate year cycling)
  const yearClickMap = useRef<Record<string, number>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    updateArrows();
    return () => el.removeEventListener("scroll", updateArrows);
  }, [updateArrows]);

  const scrollBy = useCallback((dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  }, []);

  // Build the year→indices map once
  if (Object.keys(yearIndexMap.current).length === 0) {
    years.forEach((year, i) => {
      if (!yearIndexMap.current[year]) yearIndexMap.current[year] = [];
      yearIndexMap.current[year].push(i);
    });
  }

  const handleYearClick = useCallback((year: string) => {
    const indices = yearIndexMap.current[year];
    if (!indices) return;

    // Get current click count for this year
    const current = yearClickMap.current[year] ?? 0;

    // Find the milestone element for this occurrence
    const targetIndex = indices[current];
    const target = document.querySelector(
      `[data-milestone="${targetIndex}"]`,
    );

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Advance to next occurrence (cycle back to 0 after last)
    yearClickMap.current[year] = indices.length > 1 ? (current + 1) % indices.length : 0;
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Title fades up from below
      tl.fromTo(
        titleRef.current,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        0.2,
      );

      // Subtitle follows shortly after
      tl.fromTo(
        subtitleRef.current,
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7 },
        0.45,
      );
    },
    { scope: sectionRef },
  );

  return (
    <>
      {/* ── Hero ── */}
      <section ref={sectionRef} className="relative w-full">
        {/* Background image — mobile-only below lg */}
        <Image
          src="/images/our-history/history-hero.png"
          alt="Our History"
          width={1920}
          height={1068}
          priority
          quality={90}
          className="block lg:hidden min-h-[28rem] w-full h-auto object-cover object-[50%_40%]"
        />

        {/* Background image — desktop */}
        <Image
          src="/images/our-history/history-hero.png"
          alt="Our History"
          width={1920}
          height={1068}
          priority
          quality={90}
          className="hidden lg:block lg:h-[41.5625rem] w-full object-cover object-[50%_40%]"
        />

        {/* Dark bottom gradient overlay for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(12,12,12,1) 6%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Title + subtitle — bottom-left */}
        <div className="flex flex-col gap-1 lg:gap-0.5 absolute left-4 sm:left-8 lg:left-[5em] bottom-6 sm:bottom-10 lg:bottom-[5em] z-10 max-w-[33.625rem]">
          <h1
            ref={titleRef}
            className="text-2xl sm:text-4xl lg:text-6xl leading-[1] text-white font-test-tiempos-fine font-normal tracking-wider opacity-0"
          >
            Our History
          </h1>
          <p
            ref={subtitleRef}
            className="text-xs sm:text-sm lg:text-base text-white/90 font-neue-montreal font-normal tracking-wider font-light opacity-0"
          >
            At A Glance into The History of Amanat Shah Group
          </p>
        </div>
      </section>

      {/* ── Year navigation bar ── */}
      <div className="sticky top-[var(--header-height)] z-30 w-full border-b border-gray-100 bg-white">
        <div className="relative flex items-center">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="absolute left-0 z-10 flex items-center justify-center w-8 h-full bg-gradient-to-r from-white via-white/80 to-transparent lg:hidden cursor-pointer"
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-500">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Scrollable year list */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-x-auto lg:overflow-visible scrollbar-hide py-4 px-5 sm:px-2.5"
          >
            <div className="flex items-center gap-1.5 lg:gap-3 flex-nowrap lg:flex-wrap lg:justify-center">
              {years.map((year, i) => (
                <div key={`${year}-${i}`} className="flex items-center gap-2 lg:gap-4.5 last:pr-5">
                  {i > 0 && (
                    <span className="block size-1.5 sm:size-2 bg-neutral-100" />
                  )}
                  <button
                    type="button"
                    onClick={() => handleYearClick(year)}
                    className="text-sm sm:text-[1.25rem] text-neutral-800 font-neue-montreal underline cursor-pointer bg-transparent border-none p-0 whitespace-nowrap"
                  >
                    {year}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="absolute right-0 z-10 flex items-center justify-center w-8 h-full bg-gradient-to-l from-white via-white/80 to-transparent lg:hidden cursor-pointer"
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-500">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
