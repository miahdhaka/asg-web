"use client";

import { useState } from "react";
import type { FaqEntry } from "./faqData";

interface FaqAccordionProps {
  /** Section heading — the category name, e.g. "ASG Group" */
  title: string;
  items: FaqEntry[];
}

export default function FaqAccordion({ title, items }: FaqAccordionProps) {
  /* Single-open accordion: holds the index of the expanded row, or null */
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq-accordion"
      className="px-4 py-10 sm:px-8 lg:px-20 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[72.75rem]">
        <h1 className="font-archivo-black uppercase text-xl font-normal text-neutral-800 lg:text-[2.75rem] lg:leading-[3rem]">
          {title}
        </h1>

        <div className="mt-8 flex flex-col gap-3 lg:mt-[4rem] lg:gap-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`border-b border-gray-100 transition-all duration-500 ease-in-out ${
                  isOpen
                    ? "rounded-[1.5rem] border-transparent bg-gray-50"
                    : "bg-transparent"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="group flex w-full cursor-pointer items-center gap-[0.8333rem] px-4 py-4 text-left lg:p-[2rem] rounded-[1.5rem] transition-colors duration-300 ease-in-out hover:bg-gray-50"
                >
                  <span
                    className={`flex shrink-0 items-center justify-center p-2 transition-colors duration-500 ease-in-out lg:p-[0.6667rem] ${
                      isOpen ? "bg-background" : "bg-gray-50 group-hover:bg-background"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="size-4 text-neutral-800 lg:size-[2rem]"
                    >
                      {/* Horizontal bar — always present */}
                      <path
                        d="M5 12h14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      {/* Vertical bar — rotates away to turn "+" into "−" */}
                      <path
                        d="M12 5v14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className={`origin-center transition-transform duration-500 ease-in-out ${
                          isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                        }`}
                      />
                    </svg>
                  </span>
                  <span className="font-archivo-black text-base sm:text-lg font-medium text-neutral-800 lg:text-[2rem] lg:leading-[2.6667rem]">
                    {item.question}
                  </span>
                </button>

                {/* grid-rows trick animates to the content's natural height */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 px-4 text-xs leading-5 sm:leading-6 text-neutral-800 lg:pb-[2rem] lg:px-[2rem] lg:text-[1.125rem] lg:leading-[1.7rem]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
