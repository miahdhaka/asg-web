import type { StatItem } from "@/components/common/StatGrid";
import type { SocialPillar } from "@/components/concerns/common/ConcernSocialModel";

/* All M/s Helal & Brothers page content in one place — the page itself only
   passes these into the reusable Concern* components. Swap this file's values
   for a sister concern's own data file to reuse the same design. */

/* ── Hero ── */
export const helalHero = {
  title: "Globalizing Traditional\nBangladeshi Craftsmanship",
  subtitle: "Craft Aesthetically Rich Traditional Men’s & Women’s Wear for Global Brands",
  videoSrc: "/videos/concerns/h&b_out.webm",
  alt: "M/s Helal & Brothers Ltd. production footage",
};

/* ── Intro ── */
export const helalCompany = {
  name: "M/s Helal & Brothers",
  logoSrc: "/logo/sister-concern-update/helal-brothers-clr.png",
  logoAlt: "M/s Helal & Brothers Ltd. logo",
  websiteUrl: "https://amanatshahlungi.com/",
};

export const helalIntroParagraphs = [
  "M/S Helal & Brothers Ltd. is the renowned, heritage-driven name of traditional apparel for men and women in Bangladesh.",
  "In 1983, it began envisioning culturally rich traditional clothing spreading across the global market and positioning itself as a recognized brand.",
  "To achieve this milestone, the company funded 10,000+ of rural artisans and weavers to sustain their craftsmanship and enable them to become financially self-reliant through their expertise.",
  "As a proud pioneer of non-traditional Lungi exports, the company established a network of textile and artisan hubs in 4 different locations in Bangladesh, including Narshingdi, Joypara, Pabna, and Shirajganj in Bangladesh.",
  "Today, it is successfully manufacturing and exporting men\u2019s and women\u2019s wear to more than 15 countries.",
  "With over 1,000 skilled workers, 12 National Export Awards and 15 international exhibitions, the company continues its heritage under the leadership of its 3rd generation. The company is now running its entire operation as a flagship concern of Amanat Shah Group with 44 years of legacy.",
];

export const helalIntroStats: StatItem[] = [
  { value: 10, suffix: "k", label: "Artisans Empowered" },
  { value: 5, suffix: "k", label: "Employee" },
  { value: 12, label: "National Awards" },
  { value: 18, label: "Countries Reached" },
];

/* ── Social business model wheel ──
   Positions come straight off the Figma group (node 2604-30243, px/12 em) —
   the four pillars ring a dashed circle with "Sustainability" at its core. */
export const helalPillars: SocialPillar[] = [
  {
    icon: "/images/concerns/helal-brothers/icon-financial.svg",
    iconSize: 54,
    title: "Financial Empowerment",
    body: "We provide rural weavers with the necessary financial loans and assistance to cover raw materials and production costs for lungis, sharees, and gamchas.",
    frameClass: "lg:-top-[2.5em] lg:left-[21.83em] lg:w-[18.42em] lg:text-left",
    iconClass: "lg:left-[28.42em] lg:top-[9em] lg:h-[5.33em] lg:w-[5.33em]",
  },
  {
    icon: "/images/concerns/helal-brothers/icon-fair-trade.svg",
    iconSize: 38,
    title: "Fair-Trade Purchasing",
    body: "We purchase products manufactured by our weavers directly at fair prices, ensuring they are equitably compensated for their skill and labor.",
    frameClass: "lg:left-[43.5em] lg:top-[16.25em] lg:w-[18.42em] lg:text-left",
    iconClass: "lg:left-[37.17em] lg:top-[17.58em] lg:h-[5.33em] lg:w-[5.33em]",
  },
  {
    icon: "/images/concerns/helal-brothers/icon-global.svg",
    iconSize: 38,
    title: "Global Market Transformation",
    body: "We refine these traditional products to meet international standards and export them globally, bringing prestige to Bangladesh's textile heritage.",
    frameClass: "lg:left-[21.83em] lg:top-[32.92em] lg:w-[20.08em] lg:text-left",
    iconClass: "lg:left-[28.42em] lg:top-[26.58em] lg:h-[5.33em] lg:w-[5.33em]",
  },
  {
    icon: "/images/concerns/helal-brothers/icon-holistic.svg",
    iconSize: 50,
    title: "Holistic Artisan Support",
    body: "Beyond financial investment, we empower our artisans by providing comprehensive health coverage and educational support for their families, fostering long-term community well-being and prosperity.",
    frameClass: "lg:left-0 lg:top-[15.58em] lg:w-[18.42em] lg:text-right",
    iconClass: "lg:left-[19.42em] lg:top-[17.58em] lg:h-[5.33em] lg:w-[5.67em]",
  },
];

export const helalSocialModelCopy = {
  heading: "Bridging Tradition and Global Markets Through Social",
  description:
    "We cultivate sustainable growth by empowering rural artisans through fair-trade financing, ensuring their traditional craftsmanship meets rigorous international standards.",
  coreText: "Sustainability at the core of our business",
  photoSrc: "/images/concerns/helal-brothers/social-photo.webp",
  photoAlt:
    "Rural artisans supported by the Helal & Brothers social business model",
};

/* ── Brands carousels ── */
export const helalBrandRows = [
  {
    title: "Amanat Shah Lungi, Gamcha, Fabric",
    description:
      "For 25+ years, we’ve taken Bangladesh’s traditionally rich Lungi, Gamcha and fabrics to global markets, pioneering Lungi exports and reaching 25+ countries. As a trusted, long-term textile partner for global brands across Asia, Europe, the Middle East and Western markets, we are built on authenticity, transparency and generations of textile expertise.",
    textSide: "left" as const,
    images: [1, 2, 3, 4, 5].map((n) => ({
      src: `/images/concerns/helal-brothers/brand-1-${n}.webp`,
      alt: "Amanat Shah lungi, gamcha and fabric collection",
    })),
  },
  {
    title: "Standard Lungi, Sharee, Three Piece, Voile & Poplin",
    description:
      "Delivering exquisite traditional craftsmanship through backing both art and quality. Making everyday wear more comfortable with timeless designs for modern lifestyles.",
    textSide: "right" as const,
    images: [1, 2, 3, 4, 5, 6].map((n) => ({
      src: `/images/concerns/helal-brothers/brand-2-${n}.webp`,
      alt: "Standard lungi, sharee, three piece, voile and poplin collection",
    })),
  },
];

export const helalBrandsCopy = {
  heading: "Our Brands",
  intro:
    "Starting with Lungi heritage while spreading as a trusted textile partner for global brands, our 130+ year family-business legacy is built on diversity, quality, innovation and responsibility. Shape toward a greener, more sustainable and socially responsible future for all.",
};

/* ── Processing strip ── */
export const helalProcessing = {
  title: "Helal & Brothers\nProcessing Excellence",
  slides: [1, 2, 3, 4].map((n) => ({
    src: `/images/concerns/helal-brothers/processing-${n}.webp`,
    alt: "Textile processing at the Helal & Brothers facility",
  })),
};
