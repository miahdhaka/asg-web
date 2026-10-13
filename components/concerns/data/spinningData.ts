import type { StatItem } from "@/components/common/StatGrid";
import type { CoreValueCard } from "@/components/concerns/common/ConcernCoreValues";

/* All Hazrat Amanat Shah Spinning Mills page content in one place — the page
   passes these into the reusable Concern* components, same pattern as
   weavingData.ts. */

/* ── Hero ── */
export const spinningHero = {
  title: "Engineering Yarn For The\nWorld’s Finest Fabrics",
  subtitle: "Latest spinning for global fashion and lifestyle brands",
  videoSrc: "/videos/concerns/spinning_out.webm",
  alt: "Hazrat Amanat Shah Spinning Mills Ltd. production footage",
};

/* ── Intro ── */
export const spinningCompany = {
  name: "Hazrat Amanat Shah Spinning Mills Ltd.",
  logoSrc: "/logo/sister-concern-update/spinning-mills-clr.png",
  logoAlt: "Hazrat Amanat Shah Spinning Mills Ltd. logo",
  websiteUrl: "https://hassml.com/",
};

export const spinningIntroParagraphs = [
  "HASSML stands as leader of Bangladeshi yarn manufacturing with more than two decades of experience to global leaders.Since 2003, with more than two decades of experience, HASSML has been producing diverse fiber and blended yarns for textile and apparel leaders.",
  "To deliver the world’s finest yarn, we equip our manufacturing with intelligent R&D, advanced spinning technology and USTER-equipped QA to support vertically integrated yarn production.",
  "HASSML contributes to the global fashion supply chain by maintaining international quality standards while growing as a long-term partner to renowned brands.",
  "Our focus is to combine advanced technology with modern manufacturing while positioning HASSML as a trusted global yarn producer.",
  "As part of a 130-year family-business legacy, we’re building toward becoming a trusted name in sustainable yarn production for global lifestyle brands."
];

export const spinningIntroStats: StatItem[] = [
  { value: 72, unit: " Ton/Day", label: "Yarn" },
  { value: 137, suffix: "K", unit: " Rotor 5 nos", label: "Spindles" },
  { value: 650, suffix: "K", unit: " Sft", label: "Floor" },
  { value: 2.2, suffix: " K+", decimals: 1, label: "Employees" },
];

/* ── Core values (capabilities) ── */
export const spinningCoreValues = {
  heading: "Advanced Production Technology & Quality Assurance",
  description:
    "At Hazrat Amanat Shah Spinning Mills Ltd. (HASSML), we combine modern machinery with careful quality control to produce reliable, high-quality yarn for global textile markets.",
  cards: [
    {
      title: "Advanced Infrastructure",
      body: "We use advanced machinery from Germany and Switzerland to maintain high precision, efficient production and consistent quality across our operations.",
      icon: "/icons/concern/spining-core_value-1.png",
    },
    {
      title: "Operational Efficiency",
      body: "We improve resource use and reduce waste with practical processes and smart technology, including larger packaging solutions that support more efficient operations.",
      icon: "/icons/concern/spining-core_value-2.png",
    },
    {
      title: "Specialized Production",
      body: "Our facility specializes in Spandex and Slub yarns ranging from 6 to 150 Ne, using advanced processes such as doubling, twisting and singeing to deliver consistent quality.",
      icon: "/icons/concern/spining-core_value-3.png",
    },
    {
      title: "Rigorous Quality Control",
      body: "Our USTER-equipped Innovations Lab maintains consistent quality with advanced testing systems, including USTER AFIS Pro, HVI-1000 and specialized equipment for count, CSP and yarn uniformity.",
      icon: "/icons/concern/spining-core_value-4.png",
    },
  ] as CoreValueCard[],
};

/* ── Processing strip ── */
export const spinningProcessing = {
  title: "Hazrat Amanat Shah Spinning\nMills Processing Excellence",
  slides: [1, 2, 3, 4].map((n) => ({
    src: `/images/concerns/hazrat-amanat-shah-spinning-mills/processing-${n}.webp`,
    alt: "Yarn spinning at the Hazrat Amanat Shah Spinning Mills facility",
  })),
};
