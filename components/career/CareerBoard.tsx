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
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      if (location && job.location !== location) return false;
      if (department && job.department !== department) return false;
      if (q && !`${job.title} ${job.department}`.toLowerCase().includes(q)) return false;
      return true;
    });
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
      <div className="w-full max-w-[70rem] mx-auto pt-10 lg:pt-[3.3333rem] px-4 sm:px-8">
        <h2 className="text-center font-test-tiempos-fine text-neutral-800 text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem]">
          AVAILABLE JOBS - {filtered.length}
        </h2>

        {/* Search bar with embedded gradient button */}
        <div className="input-gradient-border-hover mt-5 bg-gray-50 lg:mt-[1.3333rem]">
          <div className="flex h-11 items-stretch lg:h-[3.6667rem]">
          <div className="flex flex-1 items-center gap-2 px-3.5 lg:gap-[0.6667rem] lg:px-[1.1667rem]">
            <Image src="/icons/career/search.svg" alt="" width={20} height={20} quality={100} className="size-4 shrink-0 lg:size-[1.6667rem]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search job title"
              className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-600 focus:outline-none lg:text-[1.3333rem]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="shrink-0 cursor-pointer text-neutral-500 transition-all duration-300 hover:rotate-90 hover:text-neutral-800"
                aria-label="Clear search"
              >
                <X className="size-4 lg:size-5" />
              </button>
            )}
          </div>
          <button
            type="button"
            className="group relative flex items-center justify-center gap-1 lg:gap-[0.3333rem] text-sm lg:text-[1.1667rem] text-white cursor-pointer bg-[image:var(--primary-gradient)] px-5 lg:px-[1.6667rem] transition-all duration-300 ease-out"
          >
            {/* Shine sweep — parked off the left edge, glides across on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-[60%] w-[40%] -skew-x-[20deg] bg-white/30 blur-[6px] transition-transform duration-700 ease-out group-hover:translate-x-[460%]"
            />
            <Image src="/icons/career/search.svg" alt="" width={16} height={16} quality={100} className="size-3.5 brightness-0 invert lg:size-[1.3333rem]" />
            Search
          </button>
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
      <div className="w-full px-4 sm:px-8 lg:px-[5rem] pb-10">
        {filtered.length > 0 ? (
          <div ref={gridRef} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-[3.3333rem] lg:grid-cols-4 lg:gap-[1.3333rem]">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="mt-8 pb-4 text-center text-sm text-neutral-500 lg:mt-[3.3333rem] lg:text-[1.1667rem]">
            No jobs match your search. Try a different keyword or clear the filters.
          </p>
        )}
      </div>
    </section>
  );
}
