"use client";

import StatGrid, { type StatItem } from "@/components/common/StatGrid";

const paragraphs = [
  "Amanat Shah Tex Solution is a specialized manufacturer and supplier of a wide range of surfactants, emulsifiers, and specialty chemicals, catering to the diverse needs of the textile industry. Established in 2025, we are committed to delivering exceptional performance, reliability, and innovation in every chemical formulation. As a trusted partner for businesses, we build strong relationships by understanding client needs and delivering customized, cost-effective solutions with speed and precision.",
];

const clients = [
  "Amanat Shah Lungi",
  "Standard Lungi",
  "Amanat Shah Fabrics",
];

const stats: StatItem[] = [
  { value: 0, numeric: false, staticValue: "2025", label: "ESTABLISHMENT" },
  { value: 600, numeric: true, numericValue: 600, label: "PRODUCTION CAPACITY", subLabel: "Metric tons monthly" },
  { value: 0, numeric: false, staticValue: "99.8%", label: "TECHNICAL COMPLIANCE RATE" },
  { value: 0, numeric: false, staticValue: "50+", label: "EMPLOYEES" },
];

/**
 * Intro copy, client list, and the four-up stat cards for the
 * Amanat Shah Tex Solution concern page (Figma node 1692-10970).
 */
export default function TexSolutionIntro() {
  return (
    <section
      id="tex-solution-intro"
      className="w-full bg-white px-4 sm:px-6 lg:px-[5em] py-6 sm:py-10 lg:py-[5em]"
    >
      <h2 className="max-w-3xl font-test-tiempos-fine text-xl sm:text-3xl text-neutral-800 lg:max-w-[23.57em] lg:text-[2.5em] lg:leading-[1.2]">
        One of the most reputable and diverse corporate empires in Bangladesh,
        Amanat Shah Group has been Family business legacy.
      </h2>

      {/* Copy block — pushed toward the right column on desktop */}
      <div className="mt-6 flex flex-col gap-4 lg:mt-[3em] lg:ml-[23.83em] lg:w-[57em] lg:gap-[1.33em]">
        {paragraphs.map((text) => (
          <p
            key={text.slice(0, 24)}
            className="text-justify text-sm text-neutral-500 lg:text-[1.17em] lg:leading-[1.43]"
          >
            {text}
          </p>
        ))}

        {/* Client list with check-mark icons */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:gap-x-[2em]">
          {clients.map((name) => (
            <div key={name} className="flex items-center gap-1.5 lg:gap-[0.5em]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
                className="h-3.5 w-3.5 lg:h-[1em] lg:w-[1em]"
              >
                <path
                  d="M11.5 3.5L5.5 9.5L2.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs text-neutral-800 sm:text-sm lg:text-[1em] lg:leading-[1.33]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <StatGrid stats={stats} />
    </section>
  );
}
