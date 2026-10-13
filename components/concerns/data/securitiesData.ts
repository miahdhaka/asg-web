import type { StatItem } from "@/components/common/StatGrid";
import type { CoreValueCard } from "@/components/concerns/common/ConcernCoreValues";

/* All Hazrat Amanat Shah Securities page content in one place — the page
   passes these into the reusable Concern* components, same pattern as
   weavingData.ts. */

/* ── Hero ── */
export const securitiesHero = {
  title: "Confidence in\nEvery Trade",
  subtitle: "Trusted brokerage, informed decisions, built around your investment goals.",
  videoSrc: "/videos/concerns/asg update.webm",
  alt: "Hazrat Amanat Shah Securities Ltd. overview footage",
};

/* ── Intro ── */
export const securitiesCompany = {
  name: "Hazrat Amanat Shah Securities Limited",
  logoSrc: "/logo/sister-concern-update/securities-clr.png",
  logoAlt: "Hazrat Amanat Shah Securities Limited logo",
  websiteUrl: "https://www.hasslbd.com/",
};

export const securitiesIntroParagraphs = [
  "Established in 2009, Hazrat Amanat Shah Securities Ltd. (HASSL) carries Amanat Shah Group’s commitment to trust, ethics and long-term relationships to Bangladesh’s capital market. \nHASSL provides professional brokerage services for retail, institutional, foreign and NRB investors, with access to both the Dhaka Stock Exchange and Chittagong Stock Exchange",
  "With 30,000+ investor accounts, HASSL combines market access, professional analysis and personalized support to help investors navigate the stock market with greater confidence.",
  "Focusing on accuracy, analysis, confidentiality, ethics and investor support, we help clients make informed, accurate decisions with understanding the opportunities and risks of the market.",
  "HASSL is committed to creating greater access to Bangladesh’s capital market and supporting investors to build their financial future with responsible practices and long-term relationships."
];

export const securitiesIntroStats: StatItem[] = [
  { value: 14, suffix: "K", grouped: true, unit: "", label: "Happy Clients" },
  { value: 12, unit: "", label: "Service Booth" },
  { value: 100, unit: "", label: "Support Team" },
  { value: 38, unit: "", label: "Ranking" },
];

/* ── Core values (capabilities) ── */
export const securitiesCoreValues = {
   heading: "Technical Infrastructure & Trading Excellence",
  description:
    "HASSL uses modern technology and efficient systems to provide clients and partners with a smooth and reliable trading experience.",
  cards: [
    {
      title: "Comprehensive Systems",
      body: "Our systems support secure BO account management with CDBL integration, along with automated notifications that keep clients updated on trades through real-time alerts and SMS.",
      icon: "/icons/concern/securities-core_value-1.svg",
    },
    {
      title: "Advanced Trading Platforms",
      body: "We provide modern web-based trading platforms with real-time market data and fast, automated order execution for a smooth trading experience.",
      icon: "/icons/concern/securities-core_value-2.svg",
    },
    {
      title: "Analytical Intelligence",
      body: "Clients have open access to charting and professional market analysis to grow, expand and multiply with informed investment decisions.",
      icon: "/icons/concern/securities-core_value-3.svg",
    },
    {
      title: "Extensive Quality Control",
      body: "Every transaction and operational process is governed by rigorous controls, accuracy standards and regulatory compliance.",
      icon: "/icons/concern/securities-core_value-4.svg",
    },
  ] as CoreValueCard[],
};
