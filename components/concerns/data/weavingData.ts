import type { StatItem } from "@/components/common/StatGrid";
import type { CoreValueCard } from "@/components/concerns/common/ConcernCoreValues";

/* All Amanat Shah Weaving Processing page content in one place — the page
   passes these into the reusable Concern* components, same pattern as
   miahData.ts. */

/* ── Hero ── */
export const weavingHero = {
  title: "Precision in\nEvery Weave",
  subtitle: "Advanced weaving and fabric processing with consistent quality.",
  videoSrc: "/videos/concerns/asg update.webm",
  alt: "Amanat Shah Weaving Processing facility footage",
};

/* ── Intro ── */
export const weavingCompany = {
  name: "Amanat Shah Weaving Processing Ltd.",
  logoSrc: "/logo/sister-concern/weaving-clr.png",
  logoAlt: "Amanat Shah Weaving Processing Ltd. logo",
  websiteUrl: "https://www.asg-bd.com/ASWPL.php",
};

export const weavingIntroParagraphs = [
  "Generations of weaving expertise meet industrial-scale precision.",
  "With over a decade of weaving and processing expertise, Amanat Shah Weaving Processing Ltd. (ASWPL) carries forward Amanat Shah Group’s long-standing heritage in textiles.",
  "From traditional handlooms to modern industrial manufacturing, ASWPL specializes in woven fabric manufacturing and processing.",
  "Its 500,000-square-foot facility houses 360 shuttle looms and 150 Rapier and Airjet looms, supporting the production of around 30,000 yards of twill and greige fabric and a processing capacity of up to 120,000 yards of fabric.",
  "ASWPL’s expertise covers key stages of fabric production, from yarn selection and weaving to impurity removal, physical property control and chemical treatment. These processes help transform greige fabric into finished fabrics suited to different textile applications.",
  "With 208 production workers, 39 staff and 45 security personnel, ASWPL combines technical expertise, production scale and process control to support consistent fabric manufacturing.",
  "As part of ASG’s integrated textile ecosystem, ASWPL plays a critical role in transforming yarn into quality woven fabric for modern fashion and lifestyle.",
  "Across Amanat Shah Group’s integrated textile ecosystem, ASWPL plays a critical role in transforming yarn into quality woven fabric at scale"
];

export const weavingIntroStats: StatItem[] = [
  { value: 1.6, suffix: "M", decimals: 1, unit: " yards per month.", label: "Monthly Production Capacity" },
  { value: 700, unit: " RPM", label: "Machine Speed Capability" },
  { value: 650, suffix: "K", unit: " Sft", label: "Floor" },
  { value: 2.2, suffix: "K", decimals: 1, label: "Employees" },
];

/* ── Core values (capabilities) ── */
export const weavingCoreValues = {
  heading: "Technical Infrastructure & Quality Assurance Excellence ",
  description:
    "At Amanat Shah Weaving Processing Ltd., we combine advanced weaving technology and rigorous quality control to deliver superior fabric solutions",
  cards: [
    {
      title: "Advanced Engineering Infrastructure",
      body: "We utilize high-speed weaving technology and advanced fabric construction systems to ensure peak operational efficiency.",
      icon: "/icons/concern/weaving-core_value-1.png",
    },
    {
      title: "Specialized Manufacturing",
      body: "Our facility focuses on the production of Greige Fabrics, Cotton Fabrics, and comprehensive Woven Fabric manufacturing and processing.",
      icon: "/icons/concern/weaving-core_value-2.png",
    },
    {
      title: "Operational Optimization",
      body: "We employ efficient production management and rigorous quality monitoring processes at every stage of the manufacturing cycle.",
      icon: "/icons/concern/weaving-core_value-3.png",
    },
    {
      title: "Global Compliance & Standards",
      body: "We uphold world-class manufacturing ethics, holding certifications such as OCS, LEED Gold (USGBC), U.S. Cotton Trust Protocol, RCS, GOTS, BCI, OEKO-TEX Standard 100, Higg Index, and European Flax.",
      icon: "/icons/concern/weaving-core_value-4.png",
    },
  ] as CoreValueCard[],
};

/* ── Processing strip ── */
export const weavingProcessing = {
  title: "Amanat Shah Weaving Processing\nExcellence",
  slides: [1, 2, 3, 4].map((n) => ({
    src: `/images/concerns/amanat-shah-weaving-processing/processing-${n}.webp`,
    alt: "Weaving looms and fabric processing at the Amanat Shah Weaving Processing facility",
  })),
};
