/* ------------------------------------------------------------------ */
/*  Women Empowerment page content                                     */
/*  (app/sustainability/women-empowerment)                             */
/*  Built from Figma node 7740-50510.                                  */
/* ------------------------------------------------------------------ */

export const weHero = {
  title: "Supporting Women’s \nAccess to Equal Opportunity",
  subtitle:
    "Empowering women through equal opportunities, professional growth, dedicated support, and a safe, impactful workplace.",
  image: "/images/sustainability/we/we-hero.png",
  alt: "Women Empowerment — Amanat Shah Group",
};

export const weVision = {
  label: "ASG's Actions for Gender Advancement",
  title: "Empowering Women to Thrive",
  body: "At ASG, we believe that true leadership and sustainable growth are built on equality, diversity, and opportunity. We are deeply committed to building a culture where women are empowered, supported, guided and encouraged to lead, innovate, and achieve their full potential, from personal growth to the organizational level.",
  image: "/images/sustainability/we/we-vision.png",
  alt: "Women across Amanat Shah Group manufacturing units",
};

/* Full-bleed dark band — photo left, label + heading + text right */
export const weGrowth = {
  label: "Equal Career Opportunities",
  title: "Growth & Leadership",
  body: "Ensuring equitable access to employment, career advancement paths, and leadership roles without discrimination.",
  image: "/images/sustainability/we/we-growth.png",
  alt: "Women in leadership and career development at ASG",
};

export interface WeFeature {
  label: string;
  title: string;
  body: string;
  image: string;
  alt: string;
}

/* Rounded image with a white caption card overlapping one corner */
export const weWellbeing: WeFeature = {
  label: "Family-protected Workplace",
  title: "Individuals, Well-being & Safety",
  body: "Maintaining secure facilities in every area where women are involved. Offering supportive welfare programs, training, and dedicated spaces to ensure a healthy work-life balance. Professional Training & Skill Development",
  image: "/images/sustainability/we/we-wellbeing.png",
  alt: "Safe and supportive workplace for women at ASG",
};

export const weCapacity: WeFeature = {
  label: "Professional Skills & Training",
  title: "Building Experts",
  body: "Providing specialized training, workshops, guidance, manuals and skill-development programs to help women become professionally competent, both mentally and behaviorally.",
  image: "/images/sustainability/we/we-capacity.png",
  alt: "Skills training and capacity building for women at ASG",
};

/* Large rounded banner with bottom gradient and anchored caption */
export const weCommunity: WeFeature = {
  label: "Community & Supply Chain Empowerment",
  title: "Impact Beyond Imagination",
  body: "As a century-old, family-backed enterprise, we believe women are equal contributors to our organization. For 130 years, they have helped build what we create and deliver to people’s doorsteps. As long as ASG remains part of society, we will continue to care, support and empower women.",
  image: "/images/sustainability/we/we-community.png",
  alt: "Community and supply chain engagement for women empowerment",
};

/* Bottom call-to-action */
export const weCta = {
  title: "Building a Happy Future Together",
  highlight: "Future Together",
  description:
    "Read more about how our policies and people-first principles are enriching lives and opening equal opportunities for everyone.",
  buttonText: "Download CSR Report",
};
