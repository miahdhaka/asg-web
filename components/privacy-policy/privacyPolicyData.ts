// Inline markup supported in `text` / `items` strings (rendered by PrivacyContent):
//   **bold**            -> bold emphasis
//   [Label](/href)      -> internal link

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: { text: string; sub?: boolean }[] };

export interface PolicySection {
  heading: string;
  blocks: PolicyBlock[];
}

export const policyTitle = "Privacy Policy";

export const policyUpdated = "Last Updated: 13 October 2026";

export const policyIntro: string[] = [
  "[Amanat Shah Group (ASG)](/) takes the privacy of its website visitors seriously. This Privacy Policy explains what personal information we may collect, how we use and protect it, when we may share it, and the choices available to you.",
  "Please read this policy together with our [Terms of Use](/terms-of-use) and Cookie Policy.",
];

export const policySections: PolicySection[] = [
  {
    heading: "1. Scope of This Policy",
    blocks: [
      {
        type: "p",
        text: "This Privacy Policy applies to the official Amanat Shah Group website and to personal information collected through its features, including contact forms and business enquiry channels.",
      },
      {
        type: "p",
        text: "This policy is issued by Amanat Shah Group Ltd., the entity responsible for operating this website.",
      },
      {
        type: "p",
        text: 'In this policy, **"business concerns"** means the companies, business units and related organisations that form part of ASG. Some of them may operate separate websites or digital services with their own privacy policies. When you deal directly with those businesses or use their websites, their privacy notices may also apply.',
      },
    ],
  },
  {
    heading: "2. Information We Collect",
    blocks: [
      { type: "p", text: "The information we collect depends on how you use our website." },
      { type: "p", text: "**Information you provide**" },
      { type: "p", text: "When you contact us or submit a business enquiry, you may provide:" },
      {
        type: "ul",
        items: [
          { text: "your name and job title;" },
          { text: "your company or organisation name;" },
          { text: "your email address and telephone number;" },
          { text: "the content of your enquiry or message; and" },
          { text: "any additional information you choose to give us." },
        ],
      },
      {
        type: "p",
        text: "Please do not submit sensitive personal information through general enquiry forms unless it is necessary and we have asked for it through a suitable channel.",
      },
      { type: "p", text: "**Technical and usage information**" },
      {
        type: "p",
        text: "We use Google Analytics to understand how visitors use this website, for example which pages are viewed and for how long. It may collect information such as your IP address, browser type and device information. Our server logs may also record technical information for security and maintenance purposes. See our Cookie Policy for details.",
      },
      { type: "p", text: "**Cookies and similar technologies**" },
      {
        type: "p",
        text: "Our website may use cookies and similar technologies to support its functions and understand how visitors use the site. Please see our Cookie Policy for details.",
      },
    ],
  },
  {
    heading: "3. How We Use Personal Information",
    blocks: [
      { type: "p", text: "We may use personal information to:" },
      {
        type: "ul",
        items: [
          { text: "respond to questions, requests and business enquiries;" },
          { text: "direct enquiries to the appropriate ASG department or business concern;" },
          { text: "provide information about ASG's activities and services where you have asked for it or the law permits;" },
          { text: "operate, maintain and improve our website;" },
          { text: "monitor website performance and understand visitor activity, where analytics tools are used;" },
          { text: "protect the website against unauthorised access, misuse and security threats; and" },
          { text: "meet legal, regulatory and administrative requirements." },
        ],
      },
      {
        type: "p",
        text: "We aim to collect and use information only where reasonably necessary for these purposes. Where our processing relies on your consent, you may withdraw that consent, subject to applicable law. If you no longer wish to receive updates from us, tell us through our [Contact Us](/contact-us) page and we will stop.",
      },
    ],
  },
  {
    heading: "4. How We Share Personal Information",
    blocks: [
      {
        type: "p",
        text: "Information you send us is not made public. We may share it where necessary for the purposes described in this policy and where the law permits or requires it. This may include sharing it with:",
      },
      {
        type: "ul",
        items: [
          { text: "the relevant ASG department or business concern, so your enquiry reaches the right people;" },
          { text: "providers of website hosting, maintenance, security and communications services;" },
          { text: "professional advisers who help us with legal, compliance or business matters;" },
          { text: "public authorities or regulatory bodies, where disclosure is required or permitted by law; and" },
          { text: "other parties, where you have given your consent or another lawful basis applies." },
        ],
      },
      {
        type: "p",
        text: "Not every category applies to every enquiry. What we share, and with whom, depends on the nature of your request.",
      },
    ],
  },
  {
    heading: "5. International Data Transfers",
    blocks: [
      {
        type: "p",
        text: "Your personal information may be stored or processed outside Bangladesh by our hosting, email and technology providers. Where this happens, we take the steps required by applicable law to protect it.",
      },
    ],
  },
  {
    heading: "6. Data Security",
    blocks: [
      {
        type: "p",
        text: "ASG takes reasonable steps to protect personal information against unauthorised access, disclosure, alteration and loss. These include technical and organisational safeguards appropriate to the systems and services we use.",
      },
      {
        type: "p",
        text: "No website or method of electronic transmission can be guaranteed completely secure, however. Please do not send confidential information through general website enquiry forms.",
      },
    ],
  },
  {
    heading: "7. Data Retention",
    blocks: [
      {
        type: "p",
        text: "We do not keep personal information longer than the purpose requires. Enquiry records are kept while we are dealing with your request and for a reasonable period afterwards, in case of follow-up questions, and for as long as the law requires us to keep them.",
      },
    ],
  },
  {
    heading: "8. Your Privacy Rights",
    blocks: [
      {
        type: "p",
        text: "Depending on the law that applies to you, you may be entitled to ask for access to your personal information, ask for inaccurate details to be corrected, ask for deletion where applicable, or withdraw your consent where processing is based on it.",
      },
      {
        type: "p",
        text: "We will assess each request in line with applicable law. In some cases, we may need to keep certain information for a valid legal or other permitted reason, and we will explain this if so.",
      },
      {
        type: "p",
        text: "To make a request, use our [Contact Us](/contact-us) page or email info[@]asg-bd.com. We aim to reply within 1 day. We may ask you to confirm your identity before acting on a request, for example by replying from the email address you used to contact us. If you are unhappy with our response, you may raise the matter with the relevant authority where the law provides for this.",
      },
    ],
  },
  {
    heading: "9. Cookies and Similar Technologies",
    blocks: [
      {
        type: "p",
        text: "Our website may use cookies and similar technologies to support essential functions, remember your preferences and measure website usage, depending on the tools in place. Where the law requires it, we will obtain your consent before using cookies that need it.",
      },
      {
        type: "p",
        text: "For the cookies we use and the choices available to you, please read our Cookie Policy.",
      },
    ],
  },
  {
    heading: "10. Third-Party Websites",
    blocks: [
      {
        type: "p",
        text: "Our website may link to third-party websites, including news publications, business partners and the websites of ASG's business concerns. These sites may have their own privacy practices, which ASG does not control. Please read their privacy notices before you submit personal information to them. Our [Terms of Use](/terms-of-use) cover the use of external links.",
      },
    ],
  },
  {
    heading: "11. Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "The ASG website provides corporate and business information and is not designed to collect personal information from children. If we learn that we have collected personal information in circumstances the law does not permit, we will take appropriate steps in line with the law.",
      },
    ],
  },
  {
    heading: "12. Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this policy when our website, business practices or legal requirements change. Revised versions will be published on this page with an updated date, so please check back from time to time. Our [Terms of Use](/terms-of-use) and Cookie Policy carry their own update dates.",
      },
    ],
  },
];
