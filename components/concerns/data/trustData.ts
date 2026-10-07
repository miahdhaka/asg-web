import type { StatItem } from "@/components/common/StatGrid";
import type { CoreValueCard } from "@/components/concerns/common/ConcernCoreValues";

/* All Trust Knitwear Industries page content in one place — the page passes
   these into the reusable Concern* components, same pattern as weavingData.ts. */

/* ── Hero ── */
export const trustHero = {
  title: "Integrated RMG",
  subtitle: "From yarn to finished knit garments, everything is now under one roof for global fashion brands.",
  videoSrc: "/videos/concerns/trust_out.webm",
  alt: "Trust Knitwear Industries Ltd. production footage",
};

/* ── Intro ── */
export const trustCompany = {
  name: "Trust Knitwear Industries Ltd.",
  logoSrc: "/logo/sister-concern-update/trust-knitwear-clr.png",
  logoAlt: "Trust Knitwear Industries Ltd. logo",
  websiteUrl: "https://www.trustknitwear.com/",
};

export const trustIntroParagraphs = [
  "Trust Knitwear Industries Ltd. is a part of Amanat Shah Group’s long-standing journey in textiles. 130 years of heritage, woven into a modern textile legacy. As the family business grew, traditional handlooms evolved into power looms.",
  "Over time, ASG expanded deeper into the textile value chain. Multiply expertise and capabilities in Ready Mate Garments and Composite.",
  "Trust Knitwear was created as the next step in that evolution.",
  "Established in 2003 and restructured under new management in 2015, Trust Knitwear was built to bring the Group’s generations of knit composite and manufacturing capabilities closer to the international apparel brands.",
  "Today, Trust Knitwear operates as a 100% export-oriented knit composite manufacturer with integrated production capabilities. This gives the company greater control over quality, production planning, product development and timely delivery.",
  "The deeper expertise comes from the combination of generational textile knowledge. Multiplying skilled craftsmanship, modern manufacturing capabilities and an experienced workforce."
];

export const trustIntroStats: StatItem[] = [
  { value: 1.2, suffix: "K", decimals: 1, unit: " Tons", label: "Spinning" },
  { value: 260, unit: " Tons", label: "Knitting" },
  { value: 750, unit: " Tons", label: "Dyeing" },
  { value: 2.3, suffix: "M", decimals: 1, unit: " pcs.", label: "Garments" },
];

/* ── Core values (capabilities) ── */
export const trustCoreValues = {
  heading: "Technical Infrastructure & Quality Assurance",
  description:
    "Trust Knitwear Industries Ltd. operates an integrated knitwear facility supported by modern, high-precision machinery from leading manufacturers across Germany, Switzerland, Singapore, Greece, Austria and Japan.",
    
  cards: [
    {
      title: "Advanced Production Systems",
      body: "We use Trützschler and Rieter systems for spinning, along with Unitex machinery for knitting, supporting efficient production and consistent quality.",
      icon: "/icons/concern/miah-core_value-4.png",
    },
    {
      title: "Expert Sewing Operations",
      body: "We use reliable JUKI, Pegasus and Brother sewing machines from Japan to maintain consistent quality and precise finishing across our garments.",
      icon: "/icons/concern/miah-core_value-4.png",
    },
    {
      title: "Precision Finishing",
      body: "Our dyeing and finishing lines use Sclavos and Brückner technology, supported by MHM printing systems, to deliver consistent colour, quality and finishing.",
      icon: "/icons/concern/miah-core_value-4.png",
    },
    {
      title: "Global Grade Quality Control",
      body: "We maintain strict quality checks from fiber to finished garment, following international standards to ensure consistent quality and reliable production.",
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
