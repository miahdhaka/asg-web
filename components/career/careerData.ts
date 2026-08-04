export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  workplace: string;
  employment: string;
  deadline: string;
}

export const jobs: Job[] = [
  {
    id: "department-manager",
    title: "Department Manager",
    department: "Sales & Operations",
    location: "Deptford, United States",
    workplace: "Head office",
    employment: "Full Time",
    deadline: "Jul 2, 2026",
  },
  {
    id: "senior-merchandiser",
    title: "Senior Merchandiser",
    department: "Merchandising",
    location: "Dhaka, Bangladesh",
    workplace: "Head office",
    employment: "Full Time",
    deadline: "Aug 15, 2026",
  },
  {
    id: "production-planning-executive",
    title: "Production Planning Executive",
    department: "Production & Planning",
    location: "Gazipur, Bangladesh",
    workplace: "Factory",
    employment: "Full Time",
    deadline: "Aug 30, 2026",
  },
  {
    id: "accounts-officer",
    title: "Accounts Officer",
    department: "Finance & Accounts",
    location: "Dhaka, Bangladesh",
    workplace: "Head office",
    employment: "Full Time",
    deadline: "Sep 10, 2026",
  },
  {
    id: "hr-business-partner",
    title: "HR Business Partner",
    department: "Human Resources",
    location: "Dhaka, Bangladesh",
    workplace: "Head office",
    employment: "Full Time",
    deadline: "Sep 18, 2026",
  },
  {
    id: "supply-chain-analyst",
    title: "Supply Chain Analyst",
    department: "Supply Chain",
    location: "Chattogram, Bangladesh",
    workplace: "Regional office",
    employment: "Full Time",
    deadline: "Sep 25, 2026",
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    department: "IT & Digital",
    location: "Dhaka, Bangladesh",
    workplace: "Head office",
    employment: "Full Time",
    deadline: "Oct 5, 2026",
  },
  {
    id: "textile-designer",
    title: "Textile Designer",
    department: "Design & Development",
    location: "Dhaka, Bangladesh",
    workplace: "Head office",
    employment: "Full Time",
    deadline: "Oct 12, 2026",
  },
  {
    id: "sales-representative",
    title: "Sales Representative",
    department: "Sales & Operations",
    location: "New York, United States",
    workplace: "Regional office",
    employment: "Full Time",
    deadline: "Oct 20, 2026",
  },
  {
    id: "quality-assurance-inspector",
    title: "Quality Assurance Inspector",
    department: "Production & Planning",
    location: "Narsingdi, Bangladesh",
    workplace: "Factory",
    employment: "Full Time",
    deadline: "Oct 28, 2026",
  },
  {
    id: "showroom-supervisor",
    title: "Showroom Supervisor",
    department: "Sales & Operations",
    location: "Dhaka, Bangladesh",
    workplace: "Showroom",
    employment: "Full Time",
    deadline: "Nov 6, 2026",
  },
  {
    id: "logistics-coordinator",
    title: "Logistics Coordinator",
    department: "Supply Chain",
    location: "Chattogram, Bangladesh",
    workplace: "Regional office",
    employment: "Contract",
    deadline: "Nov 14, 2026",
  },
  {
    id: "payroll-specialist",
    title: "Payroll Specialist",
    department: "Finance & Accounts",
    location: "Dhaka, Bangladesh",
    workplace: "Head office",
    employment: "Part Time",
    deadline: "Nov 22, 2026",
  },
  {
    id: "spinning-mill-shift-incharge",
    title: "Spinning Mill Shift Incharge",
    department: "Production & Planning",
    location: "Narsingdi, Bangladesh",
    workplace: "Factory",
    employment: "Full Time",
    deadline: "Dec 1, 2026",
  },
  {
    id: "digital-marketing-executive",
    title: "Digital Marketing Executive",
    department: "IT & Digital",
    location: "Dhaka, Bangladesh",
    workplace: "Head office",
    employment: "Full Time",
    deadline: "Dec 10, 2026",
  },
];

export const locations = [...new Set(jobs.map((job) => job.location))];
export const departments = [...new Set(jobs.map((job) => job.department))];

/* ------------------------------------------------------------------ */
/*  Job detail content                                                 */
/* ------------------------------------------------------------------ */

export interface JobDetailBlock {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export function getJob(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}

/** Workplace label used in the detail-page meta row. */
export function getWorkplaceLabel(job: Job): string {
  return job.workplace === "Head office" ? "ASG HQ" : job.workplace;
}

/**
 * Builds the "Job description" blocks for a role. The copy follows the
 * Figma design; the role title is substituted into the templated text.
 */
export function getJobDetailBlocks(job: Job): JobDetailBlock[] {
  const role = job.title;

  const introLong = `As a ${role}, you’ll be the leader supporting and encouraging your whole team. By bringing everyone together, you’ll be able to create an inclusive culture that promotes collaboration and an entrepreneurial spirit, helping you, your team, and ASG succeed. Ensuring an excellent operational & visual experience for your store, customers & colleagues. You’ll be aware of your store’s strengths, opportunities, and competitors. Analyze and follow up on sales, and create plans to optimize results and profits.`;
  const introShort = `As a ${role}, you’ll be the leader supporting and encouraging your whole team. By bringing everyone together, you’ll be able to create an inclusive culture that promotes collaboration and an entrepreneurial spirit,`;
  const brandBullet = `Representing yourself and the ASG brand positively during customer interactions`;
  const inspiredBullet = `Inspired by ASG a company that stands as a symbol for aspiration and optimism in the world.`;

  return [
    { heading: "About the Role", paragraphs: [introLong] },
    { heading: "A Day in the Life", paragraphs: [introShort] },
    {
      heading: "Customer Sales & Profit",
      bullets: [introShort, introShort, introShort, brandBullet, inspiredBullet],
    },
    {
      heading: "Fashion & Trend Awareness",
      bullets: [inspiredBullet, brandBullet, inspiredBullet, inspiredBullet, inspiredBullet],
    },
    {
      heading: "Team & Development",
      bullets: [inspiredBullet, introShort, inspiredBullet, inspiredBullet, inspiredBullet],
    },
    {
      heading: "Who You Are",
      bullets: [inspiredBullet, introShort, inspiredBullet, inspiredBullet, inspiredBullet],
    },
    { heading: "Benefits", paragraphs: [introLong] },
    {
      heading: "Company Description",
      paragraphs: [
        `At Amanat Shah Group, sustainability is a core value. We prioritize eco-friendly manufacturing by using energy-efficient systems, conserving water, and sourcing organic and recycled materials. Our commitment extends to ethical sourcing, ensuring fair labor practices and minimal environmental impact. We're dedicated to achieving zero waste through recycling and waste reduction initiatives. Innovation drives our green practices, and we continuously improve our processes to stay ahead. We engage with local communities, supporting education, healthcare, and conservation projects. Our efforts are recognized through international certifications like ISO 14001. At Amanat Shah Group, we're building a sustainable future for all.`,
        `At Amanat Shah Group, sustainability is a core value. We prioritize eco-friendly manufacturing by using energy-efficient systems, conserving water, and sourcing organic and recycled materials.`,
      ],
    },
  ];
}
