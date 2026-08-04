export interface NumberedClause {
  lead: string;
  body: string;
}

export type TermsSection =
  | { kind: "paragraphs"; heading: string; paragraphs: string[] }
  | { kind: "numbered"; heading: string; clauses: NumberedClause[] }
  | { kind: "bullets"; heading: string; bullets: string[] };

export const termsTitle = "ASG Terms Of Use";

const conductBullets = [
  "The user may not use the communication portals for unlawful purposes. In particular, but not exclusively, users are prohibited from:",
  "causing harm to persons, especially minors, or violating their personal rights when using the communication portals;",
  "violating accepted standards of decency through their usage;",
  "sending or otherwise making accessible libelous, defamatory, obscene, insulting, pornographic, violence-glorifying, or privacy-violating content;",
  "Inspired by ASG a company that stands as a symbol for aspiration and optimism in the world.",
];

export const termsSections: TermsSection[] = [
  {
    kind: "paragraphs",
    heading: "General terms and conditions of",
    paragraphs: [
      "These terms and conditions of use apply to the websites and mobile applications offered by HUGO BOSS AG and/or companies in which HUGO BOSS AG holds an interest, as well as the associated services (collectively, \"Communication Portals\"). These terms and conditions may be supplemented, modified, or replaced in individual cases by further terms and conditions, e.g., for the purchase of goods.",
    ],
  },
  {
    kind: "paragraphs",
    heading: "Services",
    paragraphs: [
      "As a Department Manager, you’ll be the leader supporting and encouraging your whole team. By bringing everyone together, you’ll be able to create an inclusive culture that promotes collaboration and an entrepreneurial spirit,",
      "As a Department Manager, you’ll be the leader supporting and encouraging your whole team. By bringing everyone together, you’ll be able to create an inclusive culture that promotes collaboration and an entrepreneurial spirit,",
      "As a Department Manager, you’ll be the leader supporting and encouraging your whole team. By bringing everyone together, you’ll be able to create an inclusive culture that promotes collaboration and an entrepreneurial spirit,",
    ],
  },
  {
    kind: "numbered",
    heading: "Intellectual Property",
    clauses: [
      {
        lead: "1. Copyright and other intellectual property rights",
        body: "The content of the communication portals, in particular web pages, programs, graphics, images, sound, video, scripts and texts including their arrangement on the communication portals, is subject to the protection of copyright and/or other intellectual property laws.",
      },
      {
        lead: "2. Trademarks",
        body: "The trademarks used on the communication portals, in particular collection names, logos, and emblems, are protected by trademark law in favor of HUGO BOSS or a HUGO BOSS licensor.",
      },
    ],
  },
  { kind: "bullets", heading: "User Conduct", bullets: conductBullets },
  { kind: "bullets", heading: "Registration, Password", bullets: conductBullets },
  {
    kind: "bullets",
    heading: "Terms and Conditions for Competitions",
    bullets: conductBullets,
  },
  {
    kind: "paragraphs",
    heading: "Links/Third-Party Content",
    paragraphs: [
      "If the communication portals link to other websites operated by third parties, HUGO BOSS does not control the content provided on such third-party websites. HUGO BOSS does not adopt these websites and their content as its own and assumes no other responsibility for them, so the use of such third-party websites is solely at the user's own risk.",
      "Users of the communication portals are not authorized to post content on the communication portals unless HUGO BOSS expressly requests this on the respective communication portal. Content entered by users of the communication portals or other third parties is generally not subject to any control or influence by HUGO BOSS. HUGO BOSS does not adopt such content as its own and assumes no other responsibility for it.",
    ],
  },
];
