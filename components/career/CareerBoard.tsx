"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { departments, jobs, locations } from "./careerData";
import JobCard from "./JobCard";

export default function CareerBoard() {
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      if (location && job.location !== location) return false;
      if (department && job.department !== department) return false;
      if (q && !`${job.title} ${job.department}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, location, department]);

  return (
    <section id="career-board" className="bg-white">
      {/* Heading + search controls */}
      <div className="mx-auto w-full max-w-[66rem] px-4 pt-10 sm:px-8 lg:pt-[3.3333rem]">
        <h2 className="text-center font-test-tiempos-fine text-2xl tracking-wide text-neutral-800 sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem]">
          AVAILABLE JOBS - {filtered.length}
        </h2>

        {/* Search bar with embedded gradient button */}
        <form
          className="mt-5 flex h-11 items-stretch bg-gray-50 lg:mt-[1.3333rem] lg:h-[3.6667rem]"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(draft);
          }}
        >
          <div className="flex flex-1 items-center gap-2 px-3.5 lg:gap-[0.6667rem] lg:px-[1.1667rem]">
            <Image src="/icons/career/search.svg" alt="" width={20} height={20} quality={100} className="size-4 shrink-0 lg:size-[1.6667rem]" />
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Search job title"
              className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-600 focus:outline-none lg:text-[1.3333rem]"
            />
          </div>
          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center gap-1 bg-[image:var(--primary-gradient)] px-5 text-sm font-medium text-white lg:gap-[0.3333rem] lg:px-[1.6667rem]"
          >
            <Image src="/icons/career/search.svg" alt="" width={16} height={16} quality={100} className="size-3.5 brightness-0 invert lg:size-[1.3333rem]" />
            Search
          </button>
        </form>

        {/* Location + department filters */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center lg:mt-[2.6667rem] lg:gap-[1.3333rem]">
          <label className="flex w-full flex-col gap-2 sm:max-w-[32.3333rem]">
            <span className="text-sm text-neutral-800 lg:text-[1.1667rem]">Location</span>
            <span className="relative block">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none border border-neutral-100 bg-white px-3.5 py-2.5 text-xs text-neutral-600 focus:outline-none lg:px-[1.1667rem] lg:py-[0.8333rem] lg:text-[1rem]"
              >
                <option value="">Select your location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <Image
                src="/icons/career/chevron-down.svg"
                alt=""
                width={20}
                height={20}
                quality={100}
                aria-hidden
                className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 lg:right-[1.1667rem] lg:size-[1.6667rem]"
              />
            </span>
          </label>

          <label className="flex w-full flex-col gap-2 sm:max-w-[32.3333rem]">
            <span className="text-sm text-neutral-800 lg:text-[1.1667rem]">Department</span>
            <span className="relative block">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full appearance-none border border-neutral-100 bg-white px-3.5 py-2.5 text-xs text-neutral-600 focus:outline-none lg:px-[1.1667rem] lg:py-[0.8333rem] lg:text-[1rem]"
              >
                <option value="">Select work area</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <Image
                src="/icons/career/chevron-down.svg"
                alt=""
                width={20}
                height={20}
                quality={100}
                aria-hidden
                className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 lg:right-[1.1667rem] lg:size-[1.6667rem]"
              />
            </span>
          </label>
        </div>
      </div>

      {/* Divider above the grid */}
      <hr className="mt-8 border-t border-gray-100 lg:mt-[3.5rem]" />

      {/* Jobs grid */}
      <div className="mx-auto w-full max-w-[110rem] px-4 pb-10 sm:px-8 lg:px-[5rem]">
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-[3.3333rem] lg:grid-cols-4 lg:gap-[1.3333rem]">
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
