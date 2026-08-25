"use client";

import StatGrid, { type StatItem } from "@/components/common/StatGrid";

const paragraphs = [
  "At HASSML, we are committed to delivering world-class yarn solutions through excellence in quality, innovation, sustainability, and responsible manufacturing practices. With more than two decades of expertise in the spinning industry, we have established ourselves as a trusted textile manufacturing partner for leading global fashion and apparel brands.",
  "Our advanced production capabilities, customer-focused approach, and commitment to international standards enable us to deliver high-performance yarn solutions that meet the evolving demands of the global textile industry. Driven by a vision to be a globally recognized spinning company, we integrate advanced technology and operational excellence to support the growth of the textile sector.",
  "Our mission is to contribute to the global fashion supply chain by maintaining rigorous international quality standards and fostering long-term partnerships with renowned brands. By combining our rich legacy of over 20 years with continuous innovation, HASSML remains a cornerstone of reliable, sustainable, and premium yarn production.",
];

const stats: StatItem[] = [
  { value: 72, unit: "Ton/Day", label: "Yarn" },
  { value: 137000, grouped: true, unit: "Rotor 5nos", label: "Spindles" },
  { value: 650000, grouped: true, unit: "Sft", label: "Floor" },
  { value: 2200, grouped: true, suffix: "+", unit: "", label: "Employees" },
];

/**
 * Intro copy and the four-up production stat cards that sit between the
 * hero image and the capabilities band (Figma node 2604-30912).
 */
export default function SpinningIntro() {
  return (
    <section
      id="spinning-intro"
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
