import type { StatItem } from "@/components/common/StatGrid";
import type { CoreValueCard } from "@/components/concerns/common/ConcernCoreValues";

/* All Farm2Firm Management page content in one place — the page passes these
   into the reusable Concern* components, same pattern as weavingData.ts. */

/* ── Hero ── */
export const farmHero = {
  title: "Modern Tea-processing",
  subtitle: "Professionally managed tea cultivation and processing, from estate to market.",
  videoSrc: "/videos/concerns/farm to farm_out.webm",
  alt: "Farm2Firm Management Ltd. production footage",
};

/* ── Intro ── */
export const farmCompany = {
  name: "Farm2Firm Management Ltd",
  logoSrc: "/logo/sister-concern-update/farm2farm-clr.png",
  logoAlt: "Farm2Firm Management Ltd logo",
  websiteUrl: "#",
};

export const farmIntroParagraphs = [
  "Farm2Firm represents Amanat Shah Group’s expansion into agricultural and tea-estate operations, managing the Baikunthapur Tea Estate in Madhabpur, Habiganj.",
  "ASG acquired the estate in 2005, developing it through professional estate management, plantation development and modern tea-processing capabilities.",
  "Spanning 875.78 hectares, including 330.56 hectares of tea plantation, the estate integrates cultivation, harvesting and factory processing.",
  "Farm2Firm manages the sequences from plantation to processed tea.",
  "Its factory operates modern processing equipment, including a Rotavane, CTC machine, Continuous Fermentation Machine and VFBD dryer. Which supports controlled production and consistent black-tea quality.",
  "The entire operation is supported by around 700 daily workers and 14 supervisory staff. The company also builds worker welfare facilities including housing, medical services, literacy programs and schools for employees’ children.",
  "Under Amanat Shah Group’s umbrella, Farm2Firm represents the Group’s agricultural capability, producing quality black tea for its trusted consumers for the last decade."
];

export const farmIntroStats: StatItem[] = [
  { value: 420, suffix: "K", grouped: true, unit: " Annually", label: "Tea Leaves Processed Annually" },
  { value: 955, unit: "", label: "Aces Land Area" },
  { value: 420, unit: "", label: "Employees" },
  { value: 1955, unit: "", label: "Establishment" },
];

/* ── Core values (capabilities) ── */
export const farmCoreValues = {
  heading: "Core Strengths & Competencies",
  description: "Celestial Securities leverages modern technology to provide a seamless, secure, and user-friendly trading experience",
  cards: [
    {
      title: "Sustainable Farming",
      body: "Implement environmentally responsible practices that protect the land, promote biodiversity and shaping a greener future.",
      icon: "/icons/concern/farm-core_value-4.png",
    },
    {
      title: "Excellence in Results",
      body: "Committed to delivering consistency and premium quality at every stage of harvesting and manufacturing like every other concern.",
      icon: "/icons/concern/farm-core_value-3.png",
    },
    {
      title: "Community Empowerment",
      body: "Supporting local development and social responsibility through ethical practices across the entire operation.",
      icon: "/icons/concern/farm-core_value-2.png",
    },
    {
      title: "Innovation-Backed Heritage",
      body: "Combining traditional agricultural expertise with modern industrial efficiency to build a sustainable legacy providing lasting value.",
      icon: "/icons/concern/farm-core_value-1.png",
    },
  ] as CoreValueCard[],
};

/* ── Processing strip ── */
export const farmProcessing = {
  title: "Farm2Firm Management Processing\nExcellence",
  slides: [1, 2, 3, 4].map((n) => ({
    src: `/images/concerns/farm2firm/processing-${n}.jpg`,
    alt: "Tea processing at the Farm2Firm facility",
  })),
};
