"use client";

import StatGrid, { type StatItem } from "@/components/common/StatGrid";

const paragraphs = [
  "Hazrat Amanat Shah Securities Limited (HASSL) is a licensed stock brokerage house providing comprehensive capital market services in Bangladesh. Established in 2009, HASSL offers reliable and transparent trading solutions through the Dhaka Stock Exchange (DSE) and Chittagong Stock Exchange (CSE). As a respected member of the Amanat Shah Group, the company is committed to upholding the highest standards of integrity, client service, and regulatory compliance in the financial services sector.",
  "Our vision is to contribute to the development of a dynamic capital market in Bangladesh by delivering international-standard brokerage services grounded in trust, transparency, and value creation for clients and shareholders, while promoting retail investor empowerment and financial inclusion.",
];

const stats: StatItem[] = [
  { value: 14000, grouped: true, unit: "", label: "Happy Clients" },
  { value: 12, unit: "", label: "Service Booth" },
  { value: 100, unit: "", label: "Support Team" },
  { value: 38, unit: "", label: "Ranking" },
];

/**
 * Intro copy and the four-up stat cards that sit between the
 * hero image and the capabilities band (Figma node 2604-32050).
 */
export default function HasslIntro() {
  return (
    <section
      id="hassl-intro"
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
