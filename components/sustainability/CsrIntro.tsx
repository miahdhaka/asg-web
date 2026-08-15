"use client";

import { useState } from "react";
import { csrIntroStatement, csrParagraphs } from "./csrData";

export default function CsrIntro() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Intro statement */}
      <section className="px-4 sm:px-8 lg:px-[5rem] pt-6 sm:pt-10 lg:pt-[5rem]">
        <h2 className="max-w-[58.8rem] font-test-tiempos-fine text-xl lg:text-[2.5rem] leading-[1.5] lg:leading-[3rem] text-neutral-800 font-medium">
          {csrIntroStatement}
        </h2>
      </section>

      {/* CSR paragraphs */}
      <section className="flex flex-col gap-6 px-4 sm:px-8 lg:px-0 py-4 sm:py-10 lg:py-[3rem]">
        <div className="flex flex-col gap-8 w-full max-w-[63rem] mx-auto">
          <div className="flex flex-col gap-1 lg:gap-6">
            <div
              className="overflow-hidden lg:overflow-visible transition-[max-height] duration-700 ease-in-out"
              style={{ maxHeight: expanded ? "100rem" : "10rem" }}
            >
              <p className={`text-justify text-sm sm:text-[1.11rem] leading-[1.4rem] sm:leading-[1.7rem] text-neutral-800 line-clamp-animate ${expanded ? "clamp-expanded" : "clamp-collapsed"}`}>
                {csrParagraphs.join(" ")}
              </p>
            </div>

            {/* Gradient "Read more" — mobile only */}
            {!expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="gradient-text-showmore group ml-auto flex lg:hidden cursor-pointer items-center gap-1.5 tracking-wider text-sm sm:text-[0.95rem] font-medium"
              >
                <span className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:origin-right after:bg-[var(--primary-gradient)] after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-left">
                  Read more
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&#8594;</span>
              </button>
            )}

            {/* "Show less" — mobile only */}
            {expanded && (
              <button
                onClick={() => setExpanded(false)}
                className="gradient-text-showmore group ml-auto flex lg:hidden cursor-pointer items-center gap-1.5 tracking-wider text-sm sm:text-[0.95rem] font-medium"
              >
                <span className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:origin-right after:bg-[var(--primary-gradient)] after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-left">
                  Show less
                </span>
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5">&#8593;</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
