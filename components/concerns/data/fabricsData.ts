import type { StatItem } from "@/components/common/StatGrid";
import type { CoreValueCard } from "@/components/concerns/common/ConcernCoreValues";

/* All Amanat Shah Fabrics page content in one place — the page passes these
   into the reusable Concern* components, same pattern as weavingData.ts. */

/* ── Hero ── */
export const fabricsHero = {
  title: "World's Finest Woven\nManufacturing",
  subtitle: "Engineering Woven Fabric manufacturing for Global Fashion Since 2017",
  videoSrc: "/videos/concerns/asg update.webm",
  alt: "Amanat Shah Fabrics Ltd. production footage",
};

/* ── Intro ── */
export const fabricsCompany = {
  name: "Amanat Shah Fabrics Ltd.",
  logoSrc: "/logo/sister-concern/fabrics-clr.png",
  logoAlt: "Amanat Shah Fabrics Ltd. logo",
  websiteUrl: "https://amanatshahfabrics.com/",
};

export const fabricsIntroParagraphs = [
  "Amanat Shah Fabrics Ltd. is a trusted signature in worldwide Woven Manufacturing. Integrating latest technology along with human touch, living the legacy as a partner in delivering the world’s finest fabric and 100% export-oriented manufacturing with decades of expertise.",
  "Blending Technology, Expertise and Quality to produce the finest fabric is the goal of everything we do. From  sourcing to customer satisfaction, we help international brands get the highest quality fabrics for samplingbulk orders, samples and customized fabric requirements.",
  "With 400,000 square feet of specialized production space and 4,000+ highly skilled employees, ASFL maintains high standards of safety and global compliance while consistently serving elite brands across Europe, North America, Africa, Australia and the Middle East.",
  "As a part of a century-old legacy and leading family-owned conglomerate in BD, ASFL aims to become the world’s trusted name in quality and sustainable fabric manufacturing for Global Brands."
];

export const fabricsIntroStats: StatItem[] = [
  { value: 2.2, suffix: "K", decimals: 1, unit: "Ton/Month", label: "Yarn" },
  { value: 1.6, suffix: "M", decimals: 1, unit: "Yard/Month", label: "Weaving" },
  { value: 3.2, suffix: "M", decimals: 1, unit: "Yard/Month", label: "Dyeing / Printing / Finishing" },
  { value: 1.2, suffix: "K+", decimals: 1, unit: "Skilled & Happy", label: "Employees" },
];

/* ── Core values (capabilities) ── */
export const fabricsCoreValues = {
  heading: "A Journey Built On Global Brand Trust",
  description:
    "At Amanat Shah Fabrics Ltd. (ASFL), we employ state-of-the-art European and advanced machinery across our entire production chain to ensure superior quality, efficiency, and consistency",
  cards: [
    {
      title: "Advanced Warping & Sizing",
      body: "We utilize state-of-the-art machinery sourced from Germany and Switzerland to ensure efficient, high-precision operations",
      icon: "/icons/concern/fabrics-core_value-1.png",
    },
    {
      title: "High-Performance Weaving",
      body: "Operating state-of-the-art Rapier and Airjet looms from Belgium",
      icon: "/icons/concern/fabrics-core_value-2.png",
    },
    {
      title: "Computerized Processing",
      body: "Featuring advanced dyeing and finishing lines equipped with computerized Color Kitchen and auto-dosing systems from Europe",
      icon: "/icons/concern/fabrics-core_value-3.png",
    },
    {
      title: "Printing & Dyeing Excellence",
      body: "Implementing cutting-edge rotary screen and digital printing technology from Italy",
      icon: "/icons/concern/fabrics-core_value-4.png",
    },
  ] as CoreValueCard[],
};

/* ── Processing strip ── */
export const fabricsProcessing = {
  title: "Amanat Shah Fabrics Processing\nExcellence",
  slides: [1, 2, 3, 4].map((n) => ({
    src: `/images/concerns/amanat-shah-fabrics/processing-${n}.webp`,
    alt: "Fabric processing at the Amanat Shah Fabrics facility",
  })),
};
