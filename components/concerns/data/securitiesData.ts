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
  logoSrc: "/logo/sister-concern/securities-clr.png",
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
  heading: "How We Help Investors Move With Confidence",
  description:
    "Trust Knitwear Industries Ltd. operates as a vertically integrated knit garment factory equipped with modern, high-precision machinery sourced from Germany, Switzerland, Singapore, Greece, Austria, and Japan",
  cards: [
    {
      title: "Advanced Trading Platforms",
      body: "We utilize modern web-based online trading platforms that integrate real-time market data and automated order execution",
      icon: "/icons/concern/miah-core_value-4.png",
    },
    {
      title: "Precision Finishing",
      body: "Our dyeing and finishing lines feature Sclavos (Greece) and Brückner (Germany) technology, complemented by MHM (Austria) printing solutions",
      icon: "/icons/concern/miah-core_value-4.png",
    },
    {
      title: "Expert Sewing Operations",
      body: "We employ high-performance JUKI, Pegasus, and Brother sewing machines from Japan to ensure consistent garment quality",
      icon: "/icons/concern/miah-core_value-4.png",
    },
    {
      title: "Rigorous Quality Control",
      body: "Every process, from fiber to finished garment, is governed by stringent quality controls and international compliance standards",
      icon: "/icons/concern/miah-core_value-4.png",
    },
  ] as CoreValueCard[],
};
