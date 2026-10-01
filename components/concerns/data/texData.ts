import type { StatItem } from "@/components/common/StatGrid";
import type { CoreValueCard } from "@/components/concerns/common/ConcernCoreValues";

/* All Amanat Shah Tex Solution page content in one place — the page passes
   these into the reusable Concern* components, same pattern as weavingData.ts. */

/* ── Hero ── */
export const texHero = {
  title: "Specialized Chemicals For\nHigh-Performance Textile",
  subtitle: "Your end-to-end textile chemical solution for every processing need",
  videoSrc: "/videos/concerns/asg update.webm",
  alt: "Amanat Shah Tex Solution overview footage",
};

/* ── Intro ── */
export const texCompany = {
  name: "Amanat Shah Tex Solution",
  logoSrc: "/logo/sister-concern/tex-solution-clr.png",
  logoAlt: "Amanat Shah Tex Solution logo",
  websiteUrl: "#",
};

export const texIntroParagraphs = [
  "To strengthen the textile value chain and support consistent international product quality, Amanat Shah Tex Solution was established as a trusted textile-chemicals partner in 2025.",
  "As part of ASG’s textile innovation ecosystem, ASTS delivers reliable, high-performance and cost-effective chemical solutions for textile manufacturers.",
  "Starting from specialized manufacturing to customized formulations, ASTS combines both research and development. Whether its quality assurance or technical operation all run under one centralized system.",
  "Every solution is developed with a focus on performance and consistency. And specific textile applications.",
  "Which is built from understanding traditional to modern consumers needs,",
  "developing right solutions and delivery with precision.",
  "With a monthly production capacity of 600 metric tons and a team of 50+ employees, ASTS is expanding the capabilities to support growing textile-chemical requirements.",
  "Built on ASG’s heritage of textile excellence, ASTS carries the legacy forward through chemistry, innovation and experts' decisions."
];

export const texIntroStats: StatItem[] = [
  { value: 2025, label: "ESTABLISHMENT" },
  { value: 600, unit: "MT/Month", label: "PRODUCTION CAPACITY" },
  { value: 99.8, suffix: "%", decimals: 1, label: "TECHNICAL COMPLIANCE RATE" },
  { value: 50, suffix: "+", label: "EMPLOYEES" },
];

/* ── Core values (capabilities) ── */
export const texCoreValues = {
  heading: "Chemistry That Moves Textile Manufacturing Forward",
  description:
    "Gain greater control over quality, performance and efficiency with comprehensive solutions for modern textile processing",
  cards: [
    {
      title: "R&D & Innovation",
      body: "Efficiently develop high-performing products with predictability",
      icon: "/icons/concern/miah-core_value-1.png",
    },
    {
      title: "Textile Customized Solutions",
      body: "All formulations developed around specific textile applications",
      icon: "/icons/concern/miah-core_value-2.png",
    },
    {
      title: "Advanced Chemical Manufacturing",
      body: "Produce high-quality surfactants and emulsifiers for large volume production",
      icon: "/icons/concern/miah-core_value-3.png",
    },
    {
      title: "Consistent Quality",
      body: "Reliable chemical quality  and assurance across every order and application",
      icon: "/icons/concern/miah-core_value-4.png",
    },
  ] as CoreValueCard[],
};
