"use client";

import Link from "next/link";
import { useState } from "react";

const paragraphs = [
  "For generations, we have remained committed to one direction: building a sustainable, skilled, creative and technology-driven organization for the next generation.",
  "Amanat Shah Group carries 130 years of Bangladeshi heritage, growing from a trusted name in textiles into a diversified business enterprise spanning Textiles, Agriculture, Finance and Technology.",
  "Today, we deliver high-impact products across national and global markets, partnering with leading brands and businesses worldwide.",
  "Driven by technology, innovation and leadership, we continue to evolve with changing markets, businesses and consumers.",
  "Trust, quality, transparency and technology are embedded in our culture.",
  "For more than a century, we have helped carry traditional Bangladeshi clothing to global markets. Connecting heritage with modern fashion, living and lifestyle.",
];

const quickLinks = [
  { label: "OUR CONCERNS", href: "/concerns" },
  { label: "LEADERSHIP", href: "/board-of-directors" },
  { label: "OUR HISTORY", href: "/our-history" },
];

export default function AboutIntro() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about-intro" className="w-ful px-4 sm:px-6 lg:px-[5em] pt-14 sm:pt-16 lg:pt-[5.5rem] pb-10 sm:pb-16 lg:pb-[2rem]">
      <div className="mx-auto max-w-[1080px]">
        {/* Title block */}
        <div className="flex flex-col gap-4 max-w-[700px]">
          <h2 className="font-archivo-black text-2xl sm:text-[1.85rem] lg:text-[2.1rem] leading-tight text-[#262626]">
            A Traditional Clothing Heritage Growing Generation After Generation.
          </h2>
          <div className="border-b border-[#EAEAEA]" />
        </div>

        {/* Body paragraphs */}
        <div className="mt-6">
          <div className="flex flex-col gap-4">
            {paragraphs.slice(0, 2).map((text, i) => (
              <p
                key={i}
                className="font-neue-montreal text-base sm:text-lg leading-7 sm:leading-8 lg:leading-9 text-[#262626]"
              >
                {text}
                {i === 1 && !expanded && (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="cursor-pointer lg:hidden ml-1 font-medium bg-clip-text text-transparent transition-opacity duration-300"
                    style={{ backgroundImage: "var(--primary-gradient)" }}
                  >
                    ...Show more
                  </button>
                )}
              </p>
            ))}
          </div>

          {/* Mobile-collapsible remaining paragraphs (always visible on desktop) */}
          <div
            className={`grid transition-all duration-500 ease-in-out lg:!mt-4 lg:!grid-rows-[1fr] lg:!opacity-100 ${
              expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-4">
                {paragraphs.slice(2).map((text, i) => (
                  <p
                    key={i}
                    className="font-neue-montreal text-base sm:text-lg leading-7 sm:leading-8 lg:leading-9 text-[#262626]"
                  >
                    {text}
                  </p>
                ))}
              </div>

              {/* Quick links */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-10 gap-y-2 mt-6">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-neue-montreal text-base text-[#262626] bg-clip-text underline decoration-[#262626] underline-offset-2 transition-all duration-500 hover:text-transparent hover:decoration-[#1AA179]"
                    style={{ backgroundImage: "var(--primary-gradient)" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Show less (mobile only, appears under the quick links when expanded) */}
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="lg:hidden cursor-pointer mt-6 font-medium bg-clip-text text-transparent transition-opacity duration-300"
                style={{ backgroundImage: "var(--primary-gradient)" }}
              >
                ...Show less
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
