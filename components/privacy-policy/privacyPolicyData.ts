export interface NumberedClause {
  lead: string;
  body: string;
}

export type PolicySection =
  | { kind: "paragraphs"; heading: string; paragraphs: string[] }
  | { kind: "numbered"; heading: string; clauses: NumberedClause[] }
  | { kind: "bullets"; heading: string; bullets: string[] };

export const policyTitle = "ASG Privacy Policy";

const conductBullets = [
  "The user may not use the communication portals for unlawful purposes. In particular, but not exclusively, users are prohibited from:",
  "causing harm to persons, especially minors, or violating their personal rights when using the communication portals;",
  "violating accepted standards of decency through their usage;",
  "sending or otherwise making accessible libelous, defamatory, obscene, insulting, pornographic, violence-glorifying, or privacy-violating content;",
  "circumventing security measures of the communication portals or interfering with their integrity or availability;",
];

const registrationBullets = [
  "Certain services may require registration. Where registration is required, users agree to provide accurate and complete information, keep it up to date, and in particular:",
  "keep their login credentials confidential and not share them with third parties;",
  "immediately notify ASG of any suspected unauthorized use of their account;",
  "ensure their account is not accessed by unauthorized persons, including through unattended or open sessions;",
  "accept responsibility for all activities that occur under their account.",
];

const competitionBullets = [
  "From time to time ASG may run competitions or promotional activities through the communication portals. These are subject to additional terms made available with the relevant competition, and participants in particular agree that:",
  "participation is open only to persons meeting the eligibility criteria stated in the competition terms;",
  "any attempt to manipulate or interfere with the outcome of a competition leads to exclusion from it;",
  "prizes are awarded as described and cannot be exchanged or transferred unless stated otherwise;",
  "ASG reserves the right to cancel, suspend or modify a competition for important reason.",
];

export const policySections: PolicySection[] = [
  {
    kind: "paragraphs",
    heading: "General Terms and Conditions",
    paragraphs: [
      "These terms and conditions of use apply to the websites and mobile applications offered by Amanat Shah Group (ASG) and the companies in which ASG holds an interest, as well as the associated services (collectively, \"Communication Portals\"). These terms and conditions may be supplemented, modified, or replaced in individual cases by further terms and conditions, e.g., for the purchase of goods.",
    ],
  },
  {
    kind: "paragraphs",
    heading: "Services",
    paragraphs: [
      "The Communication Portals provide information about ASG, its business areas, products and services, as well as news, career opportunities and other content relating to the group and its sister concerns.",
      "As a visitor, you'll be able to explore our different concerns — from spinning and weaving to fabrics and distribution — and find the contacts, resources and updates most relevant to you.",
      "Information provided through the Communication Portals is for general informational purposes only. ASG reserves the right to modify, suspend or discontinue any part of the services at any time without prior notice.",
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
        body: "The trademarks used on the communication portals, in particular collection names, logos, and emblems, are protected by trademark law in favor of ASG or an ASG licensor.",
      },
    ],
  },
  { kind: "bullets", heading: "User Conduct", bullets: conductBullets },
  { kind: "bullets", heading: "Registration, Password", bullets: registrationBullets },
  {
    kind: "bullets",
    heading: "Terms and Conditions for Competitions",
    bullets: competitionBullets,
  },
  {
    kind: "paragraphs",
    heading: "Links/Third-Party Content",
    paragraphs: [
      "If the communication portals link to other websites operated by third parties, ASG does not control the content provided on such third-party websites. ASG does not adopt these websites and their content as its own and assumes no other responsibility for them, so the use of such third-party websites is solely at the user's own risk.",
      "Users of the communication portals are not authorized to post content on the communication portals unless ASG expressly requests this on the respective communication portal. Content entered by users of the communication portals or other third parties is generally not subject to any control or influence by ASG. ASG does not adopt such content as its own and assumes no other responsibility for it.",
    ],
  },
];
