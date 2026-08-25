"use client";

import StatGrid, { type StatItem } from "@/components/common/StatGrid";

const paragraphs = [
  "Amanat Shah Weaving Processing Ltd. is a specialized textile manufacturing unit dedicated to producing high-quality greige fabrics with expertise in advanced weaving and fabric processing solutions. With a strong foundation built on generations of textile craftsmanship, the company combines traditional weaving expertise with modern technology to deliver precision, consistency, and superior fabric quality.",
  "As a sister concern of the Amanat Shah Group, the company represents innovation, technical excellence, and a deep commitment to the global textile supply chain. By integrating rigorous quality control from yarn selection to fabric construction, we ensure that every product meets international performance standards, providing durable and high-performing textiles that exceed the expectations of global apparel brands.",
  "Our vision is to establish Amanat Shah Weaving Processing Ltd. as a globally recognized fabric manufacturing partner by combining heritage craftsmanship, advanced technology, and sustainable textile practices. We aim to contribute to Bangladesh’s textile excellence by delivering high-quality fabric solutions and creating long-term value for our international buyers.",
];

const stats: StatItem[] = [
  { value: 1.6, decimals: 1, unit: "Million yards per month.", label: "Monthly Production Capacity" },
  { value: 700, unit: "RPM", label: "Machine Speed Capability" },
  { value: 650000, grouped: true, unit: "Sft", label: "Floor" },
  { value: 1200, unit: "", label: "Employees" },
];

/**
 * Intro copy and the four-up production stat cards that sit between the
 * hero image and the capabilities band (Figma node 2604-31283).
 */
export default function WeavingIntro() {
  return (
    <section
      id="weaving-intro"
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
