/* ------------------------------------------------------------------ */
/*  CSR page content — Corporate Social Responsibility                 */
/*  (app/sustainability/corporate-social-responsibility)              */
/*  Built from Figma node 7740-50376.                                  */
/* ------------------------------------------------------------------ */

export const csrHero = {
  title: "Planting Positive Impact \nAcross Generations",
  subtitle:
    "ASG champions ethical manufacturing, global quality, and a healthy, balanced workplace.",
  image: "/images/sustainability/csr/impact-hero.webp",
  emblem: "/images/sustainability/csr/hero-emblem.png",
  alt: "Corporate Social Responsibility — Amanat Shah Group community initiatives",
};

/* Wide image with the white caption card overlapping its bottom edge */
export const csrCommunityImpact = {
  image: "/images/sustainability/csr/community-impact.webp",
  alt: "ASG community outreach and welfare programme",
  title: "Supporting Local Communities",
  description:
    "Supporting education, welfare, and community initiatives that help create better opportunities and improve everyday lives.",
};

/* White band — photo left, heading + text right */
export const csrPeopleFirst = {
  image: "/images/sustainability/csr/people-first-img.webp",
  alt: "Safe and inclusive workplace across ASG industrial units",
  title: "People-First Workplace Culture",
  description:
    "Building safe industrial workplaces across all units. Supporting a healthy work-life environment with people-first care.",
};

/* Large rounded banner with bottom gradient and anchored caption */
export const csrEducationBanner = {
  image: "/images/sustainability/csr/education-banner.webp",
  alt: "Empowering communities through education and skills training",
  title: "Transforming Through Education",
  description:
    "Consistently running educational programs to develop innovative, skilled and young professionals, building a safer and stronger workforce for the future.",
};

/* Staggered three-pillar commitment row */
export const csrPillarsHeading = "Community At Its Core";

export interface CsrPillar {
  title?: string;
  /** Big number rendered before the title (third pillar: "100% Ethical standards"). */
  value?: string;
  description: string;
}

export const csrPillars: CsrPillar[] = [
  {
    title: "Community First",
    description:
      "Consistently serving local communities for societal development through various activities.",
  },
  {
    title: "Unstoppably Sustainable",
    description:
      "Aligning organizational growth with long-term development, helping artisans and entrepreneurs grow together.",
  },
  {
    value: "100%",
    title: "Ethical",
    description:
      "Entire operation from start to end ethically maintained by global labor practices at every step.",
  },
];

/* Bottom call-to-action */
export const csrCta = {
  title: "Become A Partner Of",
  highlight: "Better Tomorrow",
  description:
    "See our social initiatives and how they’re driving meaningful change across communities.",
  buttonText: "Download CSR Report",
};
