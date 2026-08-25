"use client";

import StatGrid, { type StatItem } from "@/components/common/StatGrid";

const paragraphs = [
  "Trust Knitwear Industries Ltd. is a fully vertically integrated knit composite manufacturing facility specializing in high-quality knit fabric production, dyeing, finishing, and export-oriented garment manufacturing. Established in 2003, the company delivers premium knit apparel solutions with a strong emphasis on quality, sustainability, and ethical production practices.",
  "As a trusted sister concern of the Amanat Shah Group, Trust Knitwear combines advanced technology, vertical integration, and a customer-centric approach to serve leading global fashion brands. Our vision is to be a trusted global leader in sustainable knitwear manufacturing by delivering superior quality, ethical production, and complete customer satisfaction through innovation and transparency.",
];

const stats: StatItem[] = [
  { value: 1200, grouped: true, unit: "Tons", label: "Spinning" },
  { value: 260, unit: "Tons", label: "Knitting" },
  { value: 750, unit: "Tons", label: "Dyeing" },
  { value: 2.3, decimals: 1, unit: "Million pcs.", label: "Garments" },
];

/**
 * Intro copy and the four-up production stat cards that sit between the
 * hero image and the capabilities band (Figma node 2604-31654).
 */
export default function TrustKnitwearIntro() {
  return (
    <section
      id="trustknitwear-intro"
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
