import type { StatItem } from "@/components/common/StatGrid";
import type { CoreValueCard } from "@/components/concerns/common/ConcernCoreValues";

/* All Farm2Firm Management page content in one place — the page passes these
   into the reusable Concern* components, same pattern as weavingData.ts. */

/* ── Hero ── */
export const farmHero = {
  title: "Sustainable Agriculture\nPremium Tea Production",
  subtitle: "Integrating agricultural heritage with modern, responsible farming since 1955.",
  videoSrc: "/videos/concerns/farm to farm_out.webm",
  alt: "Farm2Firm Management Ltd. production footage",
};

/* ── Intro ── */
export const farmCompany = {
  name: "Farm2Firm Management Ltd",
  logoSrc: "/logo/sister-concern/farm2farm-clr.png",
  logoAlt: "Farm2Firm Management Ltd logo",
  websiteUrl: "https://asg-bd.com/Farm2Firm.php",
};

export const farmIntroParagraphs = [
  "Amanat Shah Fabrics Ltd. is a trusted signature in worldwide Woven Manufacturing. Integrating latest technology along with human touch, living the legacy as a partner in delivering the world’s finest fabric and 100% export-oriented manufacturing with decades of expertise.",
  "Blending Technology, Expertise and Quality to produce the finest fabric is the goal of everything we do. From  sourcing to customer satisfaction, we help international brands get the highest quality fabrics for samplingbulk orders, samples and customized fabric requirements.",
  "With 400,000 square feet of specialized production space and 4,000+ highly skilled employees, ASFL maintains high standards of safety and global compliance while consistently serving elite brands across Europe, North America, Africa, Australia and the Middle East.",
  "As a part of a century-old legacy and leading family-owned conglomerate in BD, ASFL aims to become the world’s trusted name in quality and sustainable fabric manufacturing for Global Brands."
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
      body: "Implementing environmentally responsible practices that protect the land and promote biodiversity",
      icon: "/icons/concern/farm-core_value-1.png",
    },
    {
      title: "Quality Excellence",
      body: "A rigorous commitment to consistency and premium standards throughout the harvesting and manufacturing stages",
      icon: "/icons/concern/farm-core_value-2.png",
    },
    {
      title: "Community Empowerment",
      body: "Fostering local growth and social responsibility through ethical supply chain management",
      icon: "/icons/concern/farm-core_value-3.png",
    },
    {
      title: "Heritage & Innovation",
      body: "Combining traditional agricultural expertise with modern industrial efficiency",
      icon: "/icons/concern/farm-core_value-4.png",
    },
  ] as CoreValueCard[],
};
