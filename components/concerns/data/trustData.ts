import type { StatItem } from "@/components/common/StatGrid";
import type { CoreValueCard } from "@/components/concerns/common/ConcernCoreValues";

/* All Trust Knitwear Industries page content in one place — the page passes
   these into the reusable Concern* components, same pattern as weavingData.ts. */

/* ── Hero ── */
export const trustHero = {
  title: "World's Finest Woven\nManufacturing",
  subtitle: "Engineering Woven Fabric manufacturing for Global Fashion Since 2017",
  videoSrc: "/videos/concerns/trust_out.webm",
  alt: "Trust Knitwear Industries Ltd. production footage",
};

/* ── Intro ── */
export const trustCompany = {
  name: "Trust Knitwear Industries Ltd.",
  logoSrc: "/logo/sister-concern/trust-knitwear-clr.png",
  logoAlt: "Trust Knitwear Industries Ltd. logo",
  websiteUrl: "https://www.trustknitwear.com/index.html",
};

export const trustIntroParagraphs = [
  "Amanat Shah Fabrics Ltd. is a trusted signature in worldwide Woven Manufacturing. Integrating latest technology along with human touch, living the legacy as a partner in delivering the world’s finest fabric and 100% export-oriented manufacturing with decades of expertise.",
  "Blending Technology, Expertise and Quality to produce the finest fabric is the goal of everything we do. From  sourcing to customer satisfaction, we help international brands get the highest quality fabrics for samplingbulk orders, samples and customized fabric requirements.",
  "With 400,000 square feet of specialized production space and 4,000+ highly skilled employees, ASFL maintains high standards of safety and global compliance while consistently serving elite brands across Europe, North America, Africa, Australia and the Middle East.",
  "As a part of a century-old legacy and leading family-owned conglomerate in BD, ASFL aims to become the world’s trusted name in quality and sustainable fabric manufacturing for Global Brands."
];

export const trustIntroStats: StatItem[] = [
  { value: 1.2, suffix: "K", decimals: 1, unit: " Tons", label: "Spinning" },
  { value: 260, unit: " Tons", label: "Knitting" },
  { value: 750, unit: " Tons", label: "Dyeing" },
  { value: 2.3, suffix: "M", decimals: 1, unit: " pcs.", label: "Garments" },
];

/* ── Core values (capabilities) ── */
export const trustCoreValues = {
  heading: "Technical Infrastructure & Quality Assurance Excellence",
  description:
    "HASSL leverages modern technology to provide a seamless and efficient trading experience for our clients",
  cards: [
    {
      title: "Advanced Production Systems",
      body: "We utilize Trützschler (Germany) and Rieter (Switzerland) systems for spinning, while Unitex (Singapore) machinery powers our knitting operations",
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

/* ── Processing strip ── */
export const trustProcessing = {
  title: "Trust Knitwear Processing\nExcellence",
  slides: [
    { src: "/images/concerns/trust-knitwear-industries/processing-1.webp", alt: "Knitwear production line" },
    { src: "/images/concerns/trust-knitwear-industries/processing-2.webp", alt: "Dyeing and finishing operations" },
    { src: "/images/concerns/trust-knitwear-industries/processing-3.webp", alt: "Sewing and garment assembly" },
    { src: "/images/concerns/trust-knitwear-industries/processing-4.webp", alt: "Quality inspection and finishing" },
  ],
};
