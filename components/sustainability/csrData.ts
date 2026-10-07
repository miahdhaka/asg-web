/* ------------------------------------------------------------------ */
/*  CSR page content — Corporate Social Responsibility                 */
/*  (app/sustainability/corporate-social-responsibility)              */
/*  Built from Figma node 7740-50376.                                  */
/* ------------------------------------------------------------------ */

export const csrHero = {
  title: "Creating a Lasting Positive Impact on Society",
  subtitle:
    "Beyond manufacturing, we are deeply committed to uplifting local communities, ensuring ethical practices, and fostering sustainable social growth.",
  image: "/images/sustainability/csr/impact-hero.webp",
  emblem: "/images/sustainability/csr/hero-emblem.png",
  alt: "Corporate Social Responsibility — Amanat Shah Group community initiatives",
};

/* Wide image with the white caption card overlapping its bottom edge */
export const csrCommunityImpact = {
  image: "/images/sustainability/csr/community-impact.webp",
  alt: "ASG community outreach and welfare programme",
  title: "Uplifting Local Communities",
  description:
    "We actively invest in community outreach programs, infrastructure support, and welfare initiatives to improve the quality of life around our operational areas.",
};

/* White band — photo left, heading + text right */
export const csrPeopleFirst = {
  image: "/images/sustainability/csr/people-first.webp",
  alt: "Safe and inclusive workplace across ASG industrial units",
  title: "People-First Workplace Culture",
  description:
    "Ensuring safe, fair, and inclusive environments across all our industrial units, prioritizing the health, safety, and rights of every worker.",
};

/* Large rounded banner with bottom gradient and anchored caption */
export const csrEducationBanner = {
  image: "/images/sustainability/csr/education-banner.webp",
  alt: "Empowering communities through education and skills training",
  title: "Empowering Through Education",
  description:
    "Supporting educational programs and skills training to create better opportunities for the younger generation and future workforce.",
};

/* Staggered three-pillar commitment row */
export const csrPillarsHeading = "Impact & Community Initiatives";

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
      "Continuous engagement in local welfare and social betterment projects",
  },
  {
    title: "Sustainable Growth",
    description:
      "Aligning our corporate goals with long-term societal well-being.",
  },
  {
    value: "100%",
    title: "Ethical standards",
    description:
      "Strict adherence to fair labor practices and worker safety regulations.",
  },
];

/* Bottom call-to-action */
export const csrCta = {
  title: "Partner with Us",
  highlight: "For A Better Tomorrow",
  description:
    "Discover how our social initiatives are driving meaningful change across communities.",
  buttonText: "Download CSR Report",
};
