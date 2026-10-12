/* ------------------------------------------------------------------ */
/*  Women Empowerment page content                                     */
/*  (app/sustainability/women-empowerment)                             */
/*  Built from Figma node 7740-50510.                                  */
/* ------------------------------------------------------------------ */

export const weHero = {
  title: "Championing Gender Equality &\nWomen's Advancement",
  subtitle:
    "Creating an inclusive, safe, and empowering environment where women thrive through equal opportunities, professional development, and dedicated support systems.",
  image: "/images/sustainability/we/we-hero.png",
  alt: "Women Empowerment — Amanat Shah Group",
};

export const weVision = {
  label: "Our Vision for Gender Inclusion",
  title: "Empowering Women at Every Level",
  body: "At ASG, we believe that true industry leadership and sustainable growth are built on equality and diversity. We are deeply committed to fostering a workplace culture where women are empowered to lead, innovate, and achieve their full potential—both within our manufacturing units and the broader community.",
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
  label: "Safe & Supportive Workplace",
  title: "Well-being & Safety",
  body: "Maintaining secure facilities, supportive welfare programs, and dedicated spaces (such as internal support networks) to ensure a healthy work-life balance.",
  image: "/images/sustainability/we/we-wellbeing.png",
  alt: "Safe and supportive workplace for women at ASG",
};

export const weCapacity: WeFeature = {
  label: "Professional Skills & Training",
  title: "Capacity Building",
  body: "Providing specialized training programs, technical workshops, and skill-development initiatives to boost professional confidence and competence.",
  image: "/images/sustainability/we/we-capacity.png",
  alt: "Skills training and capacity building for women at ASG",
};

/* Large rounded banner with bottom gradient and anchored caption */
export const weCommunity: WeFeature = {
  label: "Community & Supply Chain Engagement",
  title: "Expanding Impact Beyond Our Gates",
  body: "Our commitment to women empowerment extends beyond our factories. Through targeted community projects, educational initiatives, and collaborative programs (inspired by empowering women in our supply chains and local regions), we strive to bridge gender gaps and drive long-term social progress.",
  image: "/images/sustainability/we/we-community.png",
  alt: "Community and supply chain engagement for women empowerment",
};

/* Bottom call-to-action */
export const weCta = {
  title: "Building an Inclusive",
  highlight: "Future Together",
  description:
    "Learn more about how our policies and people-first approach are transforming lives and creating equal opportunities for all.",
  buttonText: "Download CSR Report",
};
