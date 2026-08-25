"use client";

import StatGrid, { type StatItem } from "@/components/common/StatGrid";

const paragraphs = [
  "MIAH is a contemporary fashion brand that transforms passion into timeless style. Inspired by Bangladesh's rich cultural heritage and blended with modern fashion trends, MIAH creates clothing that reflects elegance, comfort, and individuality. As a sister concern of the Amanat Shah Group, MIAH represents creativity, quality, and innovation in the fashion industry.",
  "The brand focuses on delivering premium clothing experiences through thoughtfully designed collections for men, women, and kids, backed by a seamless and customer-focused shopping experience. MIAH proudly draws on the Amanat Shah Group's legacy of trust, quality, and business excellence, strengthening its commitment to ethical operations and responsible growth.",
];

const stats: StatItem[] = [
  { value: 7, suffix: "+", label: "YEARS IN BUSINESS" },
  { value: 23000, grouped: true, suffix: "+", label: "TOTAL CUSTOMERS SERVED" },
  { value: 30000, grouped: true, suffix: "+", label: "TOTAL ORDERS DELIVERED" },
  { value: 98, suffix: "%", label: "HAPPY CUSTOMER RATE" },
];

/**
 * Intro copy and the four-up business stat cards that sit between the
 * hero image and the core-values band (Figma node 1631-8349).
 */
export default function MiahIntro() {
  return (
    <section
      id="miah-intro"
      className="w-full bg-white px-4 sm:px-6 lg:px-[5em] py-6 sm:py-10 lg:py-[5em]"
    >
      <h2 className="max-w-3xl font-test-tiempos-fine text-xl sm:text-3xl text-neutral-800 lg:max-w-[23.57em] lg:text-[2.5em] lg:leading-[1.2]">
        One of the most reputable and diverse corporate empires in Bangladesh,
        Amanat Shah Group has been Family business legacy.
      </h2>

      {/* Copy block — pushed toward the right column on desktop */}
      <div className="mt-6 flex flex-col gap-4 lg:mt-[3em] lg:ml-[23.83em] lg:w-[53.08em] lg:gap-[1.33em]">
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
