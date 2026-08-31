"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { X } from "lucide-react";
import { departments, jobs, locations } from "./careerData";
import JobCard from "./JobCard";
import SearchableSelect from "./SearchableSelect";

export default function CareerBoard() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const loadingTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Typing-animation for the search-input placeholder
  const PLACEHOLDER_FULL = "Search job title";
  const TYPING_SPEED = 100;
  const PAUSE_AFTER_FULL = 2200;
  const DELETING_SPEED = 50;

  const [placeholder, setPlaceholder] = useState("");
  const placeholderIdx = useRef(0);
  const placeholderDir = useRef<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;

    const tick = () => {
      const dir = placeholderDir.current;
      if (dir === "typing") {
        const next = placeholderIdx.current + 1;
        setPlaceholder(PLACEHOLDER_FULL.slice(0, next));
        placeholderIdx.current = next;
        if (next >= PLACEHOLDER_FULL.length) {
          placeholderDir.current = "pausing";
          tid = setTimeout(tick, PAUSE_AFTER_FULL);
        } else {
          tid = setTimeout(tick, TYPING_SPEED);
        }
      } else if (dir === "pausing") {
        placeholderDir.current = "deleting";
        tid = setTimeout(tick, DELETING_SPEED);
      } else {
        const next = placeholderIdx.current - 1;
        setPlaceholder(PLACEHOLDER_FULL.slice(0, next));
        placeholderIdx.current = next;
        if (next <= 0) {
          placeholderDir.current = "typing";
          tid = setTimeout(tick, TYPING_SPEED); // immediately re-type
        } else {
          tid = setTimeout(tick, DELETING_SPEED);
        }
      }
    };

    tid = setTimeout(tick, TYPING_SPEED);
    return () => clearTimeout(tid);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      if (location && job.location !== location) return false;
      if (department && job.department !== department) return false;
      if (q && !`${job.title} ${job.department}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, location, department]);

  // Show brief loader on every filter change
  useEffect(() => {
    setLoading(true);
    clearTimeout(loadingTimeout.current);
    loadingTimeout.current = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(loadingTimeout.current);
  }, [query, location, department]);

  // Animate cards on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-job-card]");
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }
    );
  }, [filtered]);

  return (
    <section id="career-board" className="bg-white">
      {/* Heading + search controls */}
      <div className="relative z-10 w-full max-w-[70rem] mx-auto pt-6 sm:pt-10 lg:pt-[5rem] px-4 sm:px-8">
        <h2 className="text-center font-test-tiempos-fine text-neutral-800 text-xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem]">
          AVAILABLE JOBS - {filtered.length}
        </h2>

        {/* Search bar with embedded gradient button */}
        <div className="mt-5 lg:mt-[1.3333rem]">
          <div className="input-gradient-border-hover bg-gray-50">
            <div className="flex items-stretch h-12 sm:h-12 lg:h-[4rem]">
              {/* Input area */}
              <div className="flex flex-1 items-center gap-2 px-3.5 lg:gap-[0.6667rem] lg:px-[1.1667rem]">
                <Image src="/icons/career/search.svg" alt="" width={20} height={20} quality={100} className="shrink-0 size-4 lg:size-[1.6667rem]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder}
                  className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none lg:text-[1.3333rem]"
                />
              </div>

              {/* Clear button — shown when there's text */}
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="flex items-center justify-center px-2 text-neutral-400 transition-all duration-300 hover:rotate-90 hover:text-neutral-700 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="size-4 lg:size-5" />
                </button>
              )}

              {/* Gradient search button */}
              <button
                type="button"
                className="group relative flex h-full shrink-0 items-center justify-center gap-1 lg:gap-[0.3333rem] text-sm text-white cursor-pointer bg-[image:var(--primary-gradient)] px-5 lg:px-[1.6667rem] lg:text-[1.1667rem] transition-all duration-300 ease-out tracking-wider"
              >
                {/* Shine sweep — parked off the left edge, glides across on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-[60%] w-[40%] -skew-x-[20deg] bg-white/30 blur-[6px] transition-transform duration-700 ease-out group-hover:translate-x-[460%]"
                />
                <Image src="/icons/career/search.svg" alt="" width={16} height={16} quality={100} className="size-4 brightness-0 invert sm:size-3.5 lg:size-[1.3333rem]" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Location + department filters */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center lg:mt-[2.6667rem] lg:gap-[1.3333rem]">
          <SearchableSelect
            label="Location"
            placeholder="Select your location"
            searchPlaceholder="Search location..."
            value={location}
            onChange={setLocation}
            options={locations}
          />

          <SearchableSelect
            label="Department"
            placeholder="Select work area"
            searchPlaceholder="Search department..."
            value={department}
            onChange={setDepartment}
            options={departments}
          />
        </div>
      </div>

      {/* Divider above the grid */}
      <hr className="mt-8 border-t border-gray-100 lg:mt-[3.5rem]" />

      {/* Jobs grid */}
      <div className="w-full px-4 sm:px-8 lg:px-[5rem] pb-10 lg:pb-[5rem]">
        {/* Gradient spinner */}
        <div
          className={`flex justify-center py-12 transition-opacity duration-300 ${
            loading ? "opacity-100" : "opacity-0 pointer-events-none h-0 overflow-hidden"
          }`}
        >
          <svg className="size-10 lg:size-12 animate-spin" viewBox="0 0 50 50">
            <defs>
              <linearGradient id="spinner-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8BC34A" />
                <stop offset="100%" stopColor="#1AA179" />
              </linearGradient>
            </defs>
            <circle
              cx="25" cy="25" r="20"
              fill="none"
              stroke="url(#spinner-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="90 150"
            />
          </svg>
        </div>

        {!loading && (
        <>
        {filtered.length > 0 ? (
          <div ref={gridRef} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-[3.3333rem] lg:grid-cols-4 lg:gap-[1.3333rem]">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-6 flex w-full max-w-3xl flex-col items-center justify-center rounded-lg bg-gray-50 px-6 py-12 text-center lg:mt-[3.5rem] lg:py-14">
            <svg
              className="size-9 lg:size-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#no-jobs-gradient)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <defs>
                <linearGradient id="no-jobs-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8BC34A" />
                  <stop offset="1" stopColor="#1AA179" />
                </linearGradient>
              </defs>
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              <rect width="20" height="14" x="2" y="6" rx="2" />
            </svg>
            <h3 className="mt-2 text-base text-neutral-700 lg:text-[1.25rem]">
              No roles available right now
            </h3>
            <p className="mx-auto max-w-sm text-xs text-neutral-400 lg:max-w-md lg:text-sm">
              We couldn&apos;t find any roles matching your search. Try adjusting your filters, or check back soon for new openings.
            </p>
          </div>
        )}
        </>
        )}
      </div>
    </section>
  );
}
