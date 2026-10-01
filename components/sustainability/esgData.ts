/* ------------------------------------------------------------------ */
/*  Environmental & Social Governance — page content                   */
/* ------------------------------------------------------------------ */

/* Hero */
export const esgHero = {
  title: "Pioneering Sustainability\nin Manufacturing.",
  subtitle:
    "Harnessing renewable energy and advanced circular systems to drive a cleaner tomorrow.",
  image: "/images/sustainability/esg/hero.webp",
  emblem: "/images/sustainability/esg/hero-emblem.webp",
  alt: "Aerial view of lush green forest near Amanat Shah Group premises",
};

/* Renewable Infrastructure */
export const esgRenewable = {
  heading: "Renewable Infrastructure",
  stats: [
    { prefix: "Powered by", value: "7MW", suffix: "renewable energy" },
    { prefix: "", value: "2MW", suffix: "high-efficiency" },
  ],
  caption: "co-generation units for optimized energy output.",
  image: "/images/sustainability/esg/card-renewable.webp",
  alt: "Rooftop solar panels powering Amanat Shah Group facilities",
};

/* Water Conservation — dark full-bleed band */
export const esgWater = {
  heading: "Water Conservation",
  value: "220 m³/hour.",
  caption:
    "High-capacity water reuse & recycling plant operating at full capacity.",
  image: "/images/sustainability/esg/card-water-reuse.webp",
  alt: "Water conservation — rain on glass",
};

/* Three overlay stat cards */
export interface EsgStatCard {
  value: string;
  label: string;
  image: string;
  alt: string;
}

export const esgStatCards: EsgStatCard[] = [
  {
    value: "475+ Million",
    label: "Gallons Water Recycled Yearly",
    image: "/images/sustainability/esg/card-water-recycled.webp",
    alt: "Water recycling facility",
  },
  {
    value: "1 Million+",
    label: "Trees Planted on Campus",
    image: "/images/sustainability/esg/card-trees.webp",
    alt: "Trees planted on Amanat Shah Group campus",
  },
  {
    value: "100%",
    label: "Commitment to ZLD standards",
    image: "/images/sustainability/esg/card-cogeneration.webp",
    alt: "Zero Liquid Discharge engineering",
  },
];

/* Zero Liquid Discharge */
export const esgZld = {
  heading: "Zero Liquid Discharge (ZLD)",
  paragraph:
    "Our state-of-the-art ZLD system ensures total water recovery, eliminating industrial wastewater discharge.",
  image: "/images/sustainability/esg/card-zld.webp",
  alt: "Aerial view of Zero Liquid Discharge treatment tanks",
};

/* Recognized for Quality & Sustainability — certification logos */
export const esgRecognition = {
  heading: "Recognized for Quality & Sustainability",
  logos: [
    { label: "Cotton Made in Africa", src: "/images/certification/certificate1.png" },
    { label: "BSCI", src: "/images/certification/certificate2.png" },
    { label: "Cotton USA", src: "/images/certification/certificate-3.png" },
    { label: "Regenerated Cellulosics", src: "/images/certification/certificate4.png" },
    { label: "Higg Index", src: "/images/certification/certificate5.png" },
    { label: "BCI", src: "/images/certification/certificate6.png" },
    { label: "GOTS", src: "/images/certification/certificate7.png" },
    { label: "OEKO-TEX Standard 100", src: "/images/certification/certificate8.png" },
  ],
};
