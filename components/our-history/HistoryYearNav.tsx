"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { milestones } from "./HistoryTimeline";

/* Year chips mirror the milestone order — duplicates are cycled on click */
const years = milestones.map((milestone) => milestone.year);

export default function HistoryYearNav() {
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

  return (
    /* ── Year navigation bar ── */
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
                  className="font-medium text-sm sm:text-[1.25rem] text-neutral-800 font-neue-montreal underline cursor-pointer bg-transparent border-none p-0 whitespace-nowrap"
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
  );
}
