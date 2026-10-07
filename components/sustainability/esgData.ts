/* ------------------------------------------------------------------ */
/*  Environmental & Social Governance — page content                   */
/* ------------------------------------------------------------------ */

/* Hero */
export const esgHero = {
  title: "Pioneering Sustainable \nManufacturing",
  subtitle:
    "Using renewable energy and responsible resource management to reduce environmental impact and build a more sustainable future.",
  image: "/images/sustainability/esg/hero.webp",
  emblem: "/images/sustainability/esg/hero-emblem.webp",
  alt: "Aerial view of lush green forest near Amanat Shah Group premises",
};

/* Renewable Infrastructure */
export const esgRenewable = {
  heading: "Renewable Powersource",
  stats: [
    { prefix: "Powered by", value: "7MW", suffix: "renewable energy" },
    { prefix: "", value: "2MW", suffix: "high-efficiency" },
  ],
  caption: "Cogeneration system for consistent energy availability.",
  image: "/images/sustainability/esg/card-renewable.webp",
  alt: "Rooftop solar panels powering Amanat Shah Group facilities",
};

/* Water Conservation — dark full-bleed band */
export const esgWater = {
  heading: "Water Conservation",
  value: "220 m³/hour.",
  caption:
    "High-end Water Recycling To Reuse Capacity.",
  image: "/images/sustainability/esg/esg-water.jpg",
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
    image: "/images/sustainability/esg/esg-stat-card1.jpg",
    alt: "Water recycling facility",
  },
  {
    value: "1 Million+",
    label: "Trees Planted on Campus",
    image: "/images/sustainability/esg/esg-stat-card2.png",
    alt: "Trees planted on Amanat Shah Group campus",
  },
  {
    value: "100%",
    label: "Commitment to ZLD standards",
    image: "/images/sustainability/esg/esg-stat-card3.jpg",
    alt: "Zero Liquid Discharge engineering",
  },
];

/* Zero Liquid Discharge */
export const esgZld = {
  heading: "Contamination-free\nIndustrialization",
  paragraph:
    "Ensuring water recovery and eliminating wastewater discharge with a ZLD system. Known as ZERO LIQUID DISCHARGE. Manufacturing a greener system for a greener future, combining human expertise, quality and efficiency at every level.",
  image: "/images/sustainability/esg/card-zld.webp",
  alt: "Aerial view of Zero Liquid Discharge treatment tanks",
};