"use client";

import StatGrid, { type StatItem } from "@/components/common/StatGrid";

const paragraphs = [
  "M/s Helal & Brothers, the flagship concern of the Amanat Shah Group, stands as a pioneer in Bangladesh\u2019s textile industry. With over 40 years of excellence, the company has transformed local textile heritage into a global success story. Beyond its role as a manufacturer and exporter of premium-quality products like lungi, sharee, and voile, the company operates through a deeply rooted social business model.",
  "We actively empower rural artisans by providing essential financial support and raw materials for production. Upon completion, we purchase these handcrafted textiles at fair market prices, ensuring sustainable livelihoods for weavers. These products are then refined for the international market, bridging the gap between traditional craftsmanship and global demand. Driven by ethical practices, M/s Helal & Brothers continues to connect Bangladesh\u2019s rich artisanal legacy with international consumers through a robust, trusted, and community-focused distribution network.",
];

const stats: StatItem[] = [
  { value: 10, suffix: "k", label: "Artisans Empowered" },
  { value: 40, suffix: "+", label: "Years Experience" },
  { value: 12, label: "National Awards" },
  { value: 18, label: "Countries Reached" },
  { value: 5, suffix: "k", label: "Employee" },
];

/**
 * Intro copy and the five-up stat cards that sit between the hero image and
 * the social-business band.
 */
export default function HelalIntro() {
  return (
    <section
      id="helal-intro"
      className="w-full bg-white px-4 sm:px-6 lg:px-[5em] py-6 sm:py-10 lg:py-[5em]"
    >
      {/* 707px design width at 30px type → 23.57em in the heading's own em */}
      <h2 className="max-w-3xl lg:max-w-[23.57em] text-xl sm:text-3xl lg:text-[2.5em] text-neutral-800 font-test-tiempos-fine lg:leading-[1.2] font-medium">
        One of the most reputable and diverse corporate empires in Bangladesh,
        Amanat Shah Group has been Family business legacy.
      </h2>

      {/* Copy block — pushed toward the right column on desktop */}
      <div className="mt-6 flex flex-col gap-4 lg:mt-[3em] lg:ml-[23.5em] lg:w-[53.08em] lg:gap-[1.33em]">
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
      <StatGrid stats={stats} columns={5} />
    </section>
  );
}
