"use client";

import StatGrid, { type StatItem } from "@/components/common/StatGrid";

const paragraphs = [
  "Farm2Firm Management Ltd. is a premier tea estate entity dedicated to the art of sustainable agriculture and high-quality tea production. Established with a vision to integrate agricultural heritage with modern, responsible farming practices, we strive to create products that benefit people, the planet, and profit.",
  "As a sister concern of the Amanat Shah Group, we are committed to being an authority in the tea industry, supplying premium-quality goods while fostering farmer revenue, social corporate responsibility, and community development. Our operations are grounded in ethical business strategies and transparent collaborations, ensuring that we deliver excellence in every leaf while driving long-term socio-economic value.",
];

const stats: StatItem[] = [
  { value: 420000, grouped: true, unit: "", label: "Tea Leaves Processed Annually" },
  { value: 955, unit: "Acres", label: "Land Area" },
  { value: 420, unit: "", label: "Employees" },
  { value: 1955, unit: "", label: "Establishment" },
];

/**
 * Intro copy and the four-up stat cards that sit between the
 * hero image and the capabilities band (Figma node 2604-32706).
 */
export default function Farm2FirmIntro() {
  return (
    <section
      id="farm2firm-intro"
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
      </div>

      {/* Stat cards */}
      <StatGrid stats={stats} />
    </section>
  );
}
