import type { StatItem } from "@/components/common/StatGrid";
import type { CoreValueCard } from "@/components/concerns/common/ConcernCoreValues";

/* All MIAH page content in one place — the page passes these into the
   reusable Concern* components, same pattern as helalData.ts. */

/* ── Hero ── */
export const miahHero = {
  title: "Modernizing Traditional\nClothing For Everyday Wear",
  subtitle: "Authentic Bangladeshi fashion, made accessible for modern consumers.",
  videoSrc: "/videos/concerns/miah_out.webm",
  alt: "MIAH fashion production footage",
};

/* ── Intro ── */
export const miahCompany = {
  name: "MIAH",
  logoSrc: "/logo/sister-concern-update/miah-clr.png",
  logoAlt: "MIAH logo",
  websiteUrl: "https://miah.shop/",
};

export const miahIntroParagraphs = [
  "As clothing got harder to access in everyday life during COVID-19, MIAH started delivering it to people’s homes across Bangladesh,",
  "After making millions of happy consumers worldwide through global brands, we became committed to bringing the same smile to our people’s faces. To our kids’ faces. To our senior citizens’ faces. To the faces of our men and women.",
  "So MIAH started becoming culturally rich clothing for everyone by its own nature. Now, with 7 years of experience backed by 123 years of trusted clothing heritage, MIAH offers both comfortable and fashionable wear for everyone.",
  "Tied to traditional Bangladeshi fashion and modern lifestyles, we have simplified the online shopping and e-commerce experience. With a focus on product quality, competitive pricing and customer satisfaction, MIAH makes authentic clothing easier to get everywhere.",
  "It is the result of connecting a century-old culture with modern consumers, offering familiar styles through a convenient digital experience.",
  "Not just being best known for Lungi in Bangladesh, MIAH continues to make traditional Bangladeshi fashion accessible to a new generation from local consumers to global audiences."
];

export const miahIntroStats: StatItem[] = [
  { value: 7, suffix: "+", label: "YEARS IN BUSINESS" },
  { value: 23, suffix: "K", label: "TOTAL CUSTOMERS SERVED" },
  { value: 30, suffix: "K+", label: "TOTAL ORDERS DELIVERED" },
  { value: 98, suffix: "%", label: "HAPPY CUSTOMER RATE" },
];

/* ── Core values ── */
export const miahCoreValues = {
  heading: "Core Strengths & Competencies",
  description: "Our strength lies in a holistic approach to tea manufacturing",
  cards: [
    {
      title: "Connect Tradition To Modern Fashion",
      body: "With respect for rich tradition, MIAH meets the true taste of culturally diversified trends as its end",
      icon: "/icons/concern/miah-core_value-1.png",
    },
    {
      title: "Customer-Centric Clothing",
      body: "Every piece of yarn-to-brick design is crafted with care to deliver the best experience while carrying forward its own value with satisfaction",
      icon: "/icons/concern/miah-core_value-2.png",
    },
    {
      title: "Quality By Design",
      body: "Committed to providing the same value that consumers experience from dozens of leading global brands",
      icon: "/icons/concern/miah-core_value-3.png",
    },
    {
      title: "Creative Craftsmanship",
      body: "From advanced research to hybrid innovation, every piece of product is designed creatively for an authentic, healthy experience",
      icon: "/icons/concern/miah-core_value-4.png",
    },
  ] as CoreValueCard[],
};

/* ── Processing strip ── */
export const miahProcessing = {
  title: "MIAH\nProcessing Excellence",
  slides: [1, 2, 3, 4].map((n) => ({
    src: `/images/concerns/miah/processing-${n}.png`,
    alt: "Fashion processing at MIAH",
  })),
};
