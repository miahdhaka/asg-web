import type { StatItem } from "@/components/common/StatGrid";
import type { CoreValueCard } from "@/components/concerns/common/ConcernCoreValues";

/* All ASG Dynamic page content in one place — the page passes these into the
   reusable Concern* components, same pattern as texData.ts. */

/* ── Hero ─ */
export const dynamicHero = {
  title: "Technology-Driven Consulting For\nBusiness Transformation",
  subtitle: "Innovative IT solutions, custom software and enterprise systems for modern businesses",
  videoSrc: "/videos/concerns/asg update.webm",
  alt: "ASG Dynamic overview footage",
};

/* ── Intro ── */
export const dynamicCompany = {
  name: "ASG Dynamic",
  logoSrc: "/logo/sister-concern/asg-dynamic.png",
  logoAlt: "ASG Dynamic logo",
  websiteUrl: "#",
};

export const dynamicIntroParagraphs = [
  "ASG Dynamic is a technology-driven consulting and software development firm established in 2018 as a strategic initiative of the Amanat Shah Group.",
  "We combine deep industry expertise with modern engineering practices to help organizations design, build and scale reliable digital products.",
  "Our team of 24+ professionals delivers customized solutions across software development, IT consulting, digital transformation and enterprise systems.",
  "With 40+ successful projects across 8+ countries, ASG Dynamic partners with clients to turn complex business challenges into measurable outcomes.",
  "Backed by the Amanat Shah Group's heritage of excellence, we bring trust, technical rigor and long-term value to every engagement.",
];

export const dynamicIntroStats: StatItem[] = [
  { value: 40, suffix: "+", label: "Projects" },
  { value: 24, suffix: "+", label: "Professionals" },
  { value: 8, suffix: "+", label: "Countries Presence" },
  { value: 2018, label: "Established" },
];

/* ── Core values (capabilities) ── */
export const dynamicCoreValues = {
  heading: "Core Capabilities & Services",
  description:
    "We combine deep industry expertise with technology to deliver measurable business outcomes",
  cards: [
    {
      title: "Digital Transformation",
      body: "End-to-end modernization of legacy systems into scalable digital platforms",
      icon: "/icons/concern/miah-core_value-1.png",
    },
    {
      title: "Custom Software Development",
      body: "Tailored applications built around your specific business workflows",
      icon: "/icons/concern/miah-core_value-2.png",
    },
    {
      title: "ERP Solutions",
      body: "Integrated enterprise systems that unify operations, finance and reporting",
      icon: "/icons/concern/miah-core_value-3.png",
    },
    {
      title: "Business Analytics",
      body: "Data-driven insights that turn raw information into strategic decisions",
      icon: "/icons/concern/miah-core_value-4.png",
    },
  ] as CoreValueCard[],
};
