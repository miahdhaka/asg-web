"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SustainabilityPanel {
  label: string;
  description: string;
  image: string;
  href: string;
}

// Placeholder images — swap with real assets once they land in
// /public/images/sustainability/.
const panels: SustainabilityPanel[] = [
  {
    label: "Sustainability",
    description:
      "Driving eco-conscious manufacturing through renewable energy and closed-loop water systems, we minimize environmental impact to shape a cleaner, greener tomorrow for global fashion.",
    image: "/images/sustainability/sustainability.webp",
    href: "",
  },
  {
    label: "Innovation",
    description:
      "Embracing digitalization, we are transforming the fashion industry to be future-ready. By integrating advanced technologies, we enhance design, production, and customer experiences. ",
    image: "/images/sustainability/innovation.webp",
    href: "",
  },
  {
    label: "Quality & Compliance",
    description:
      "Upholding rigorous international standards and ethical practices, we guarantee premium product integrity, complete transparency, and flawless compliance for world-class brands.",
    image: "/images/sustainability/quality-&-compliance.webp",
    href: "",
  },
  {
    label: "Social Business Commitment",
    description:
      "By optimizing raw material consumption and minimizing waste across our supply chain, we maximize output while reducing our overall environmental impact and promoting responsible production.",
    image: "/images/sustainability/social-business-commitment.webp",
    href: "",
  },
];

// Width of a collapsed strip is set via `basis-[7.5rem]` on each panel.

export default function Sustainability() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="sustainability"
      className="relative flex w-full flex-col overflow-hidden bg-white pb-8 lg:pb-16 min-h-[calc(100vh-var(--header-height))] lg:h-[calc(100vh-var(--header-height))]"
    >
      {/* Header row — title left, description right */}
      <div className="pt-8 px-4 pb-6 lg:pt-18 lg:px-20 lg:pb-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-4 lg:gap-8 max-w-[90%]">
          {/* Title — drops in from above via the Hero's fade-chain reveal */}
          <h2
            id="sustainability-title"
            className="font-serif text-3xl sm:text-4xl lg:text-[4rem] leading-[1] text-neutral-800 shrink-0"
          >
            Shaping a Greener
            <br />
            Future in Textiles
          </h2>

          {/* Description */}
          <p className="max-w-[38.75rem] text-sm sm:text-base lg:text-xl leading-[1.5] tracking-wide text-neutral-800">
            Amanat Shah Group integrates eco-conscious manufacturing tailored
            to the compliance demands of global fashion. From renewable energy
            to closed-loop water systems.
          </p>
        </div>
      </div>

      {/* Expandable accordion panels — each panel rises in with a slight
          stagger via the Hero's fade-chain reveal */}
      <div
        id="sustainability-panels"
        className="flex min-h-0 flex-1 gap-3 lg:gap-5 px-4 lg:px-18 w-[90%] lg:w-[90%] mx-auto"
      >
        {panels.map((panel, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={panel.label}
              onClick={() => setActiveIndex(index)}
              className={`group relative h-full min-w-0 shrink-0 basis-[3.5rem] sm:basis-[4rem] lg:basis-[7.5rem] overflow-hidden select-none transition-[flex-grow] duration-700 ease-in-out ${
                isActive ? "grow cursor-default" : "grow-0 cursor-pointer"
              }`}
            >
              {/* Background image — fixed at the expanded-panel width (inner row
                  width minus 3 collapsed strips + gaps) so opening only reveals
                  more of it; no object-cover rescale/zoom while the width animates */}
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[calc(92vw-14rem)] lg:w-[calc(92vw-34.375rem)] -translate-x-1/2">
                <Image
                  src={panel.image}
                  alt={panel.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  draggable={false}
                  className={`object-cover ${
                    isActive
                      ? ""
                      : "transition-transform duration-700 ease-in-out group-hover:scale-110"
                  }`}
                  quality={80}
                />
              </div>

              {/* Gradient overlay — always on so collapsed strips share the same tint */}
              <div
                aria-hidden
                className="overlay-linear-subtle pointer-events-none absolute inset-0"
              />

              {/* Arrow button — only on the expanded panel */}
              <Link href={panel.href}>
                <div
                  className={`absolute top-2 right-2 lg:top-3 lg:right-3 flex h-12 w-14 lg:h-20 lg:w-22 items-center justify-center bg-[image:var(--primary-gradient)] cursor-pointer transition-opacity duration-500 ${
                    isActive ? "opacity-100 delay-[400ms]" : "opacity-0 delay-0"
                  }`}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="square"
                    className="size-5 lg:size-7"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M9 7h8v8" />
                  </svg>
                </div>
              </Link>

              {/* Expanded content — title + description, bottom left */}
              <div
                className={`pointer-events-none absolute bottom-3 left-3 lg:bottom-5 lg:left-5 max-w-[40rem] p-4 lg:p-8 transition-opacity duration-500 ${
                  isActive ? "opacity-100 delay-300" : "opacity-0 delay-0"
                }`}
              >
                <h3 className="font-neue-montreal text-lg lg:text-2xl font-bold text-white tracking-wider">
                  {panel.label}
                </h3>
                <p className="mt-2 lg:mt-4 text-xs sm:text-sm lg:text-lg leading-[1.5] tracking-wider text-white/90">
                  {panel.description}
                </p>
              </div>

              {/* Collapsed label — vertical text at the bottom */}
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-4 lg:bottom-8 flex justify-center transition-opacity duration-300 ${
                  isActive ? "opacity-0 delay-0" : "opacity-100 delay-[400ms]"
                }`}
              >
                <span className="font-neue-montreal text-sm lg:text-[1.375rem] tracking-widest font-bold whitespace-nowrap text-white [writing-mode:vertical-rl] rotate-180">
                  {panel.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
