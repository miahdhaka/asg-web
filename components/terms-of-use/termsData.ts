// Inline markup supported in `text` / `items` strings (rendered by TermsContent):
//   **bold**            -> bold emphasis
//   [Label](/href)      -> internal link

export type TermsBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: { text: string; sub?: boolean }[] };

export interface TermsSection {
  heading: string;
  blocks: TermsBlock[];
}

export const termsTitle = "Terms of Use";

export const termsUpdated = "Last Updated: 13 October 2026";

export const termsIntro =
  "Thank you for visiting the official website of [Amanat Shah Group (ASG)](/). These Terms of Use set out the conditions for accessing and using this website. By using the website, you agree to these Terms. If you do not agree, please stop using the website.";

export const termsSections: TermsSection[] = [
  {
    heading: "1. About Amanat Shah Group",
    blocks: [
      {
        type: "p",
        text: "Amanat Shah Group is a diversified business group with interests in textiles, ready-made garments (RMG), stock brokerage, agriculture, e-commerce and enterprise custom software.",
      },
      { type: "p", text: 'In these Terms, **"ASG"** means Amanat Shah Group.' },
      {
        type: "p",
        text: '**"Business concerns"** means the companies, business units and related organisations that form part of ASG.',
      },
      {
        type: "p",
        text: "This website provides general information about ASG, its business concerns, corporate activities, products, services, achievements and initiatives. Unless a separate written agreement says otherwise, this content is for general reference only. It is not a binding offer, a contractual commitment or a guarantee.",
      },
    ],
  },
  {
    heading: "2. Use of This Website",
    blocks: [
      {
        type: "p",
        text: "You are welcome to use this website to learn about ASG, explore our business activities, read corporate news and initiatives, and send genuine business enquiries.",
      },
      { type: "p", text: "When using the website, you agree not to:" },
      {
        type: "ul",
        items: [
          { text: "use it for any unlawful purpose or in breach of applicable law;" },
          { text: "try to gain unauthorised access to the website, its systems, accounts or related data;" },
          { text: "interfere with its operation, security, availability or functionality;" },
          { text: "introduce malicious software or any other harmful code;" },
          { text: "copy, reproduce, distribute or commercially use its content without permission, except where the law allows;" },
          { text: "send false, misleading, unlawful or unauthorised material through our forms or contact channels; or" },
          { text: "use automated tools to collect website content in a way that disrupts the website or breaches the law." },
        ],
      },
      {
        type: "p",
        text: "If we identify misuse, a security concern or a breach of these Terms, ASG may restrict or suspend your access.",
      },
    ],
  },
  {
    heading: "3. Content and Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "Unless stated otherwise, everything published on this website, including text, photographs, graphics, logos and design elements, is owned by or licensed to ASG or its business concerns.",
      },
      {
        type: "p",
        text: "You may view this content for personal, informational and non-commercial purposes, respecting any notices shown on the material. To reproduce, modify, publish, distribute or commercially use protected content, you need prior written permission from the relevant rights holder, except where the law allows such use.",
      },
      {
        type: "p",
        text: "The names, trademarks and logos of ASG and its business concerns must not be used in a way that suggests endorsement, affiliation or authorisation without our agreement.",
      },
      {
        type: "p",
        text: "To request permission, please use our [Contact Us](/contact-us) page.",
      },
    ],
  },
  {
    heading: "4. Accuracy of Information",
    blocks: [
      {
        type: "p",
        text: "We make reasonable efforts to keep the information on this website accurate and current. Business activities, corporate details, product information, certifications and awards can change, however, and we cannot guarantee that every page is always complete, current or free from error.",
      },
      {
        type: "p",
        text: "Before relying on this information for a commercial, contractual or other significant decision, please confirm it with the relevant business concern. If you notice something inaccurate or outdated, please tell us through our [Contact Us](/contact-us) page so we can review it.",
      },
    ],
  },
  {
    heading: "5. Our Business Concerns and Separate Agreements",
    blocks: [
      {
        type: "p",
        text: "Each of our **business concerns** may operate under its own management, policies, contractual arrangements and regulatory requirements.",
      },
      {
        type: "p",
        text: "Information about a business concern on this website does not, by itself, create a contract with ASG or with that concern. Products, services and transactions may be governed by separate terms issued by the relevant entity. Where a separate written agreement applies, that agreement determines the rights and obligations of the parties.",
      },
    ],
  },
  {
    heading: "6. Information You Send Us",
    blocks: [
      {
        type: "p",
        text: "If you send us an enquiry, message or other material through this website, please make sure it is accurate and that you are entitled to share it. Please do not send confidential, sensitive or proprietary information through general website forms unless the channel is suitable for it.",
      },
      {
        type: "p",
        text: "We may use what you send to respond to you, direct your enquiry to the relevant department or business concern, and handle related communication. Personal information is handled as described in our [Privacy Policy](/privacy-policy).",
      },
    ],
  },
  {
    heading: "7. External Websites and Linking",
    blocks: [
      {
        type: "p",
        text: "This website may link to external sites, such as news publications, business partners and service providers. We include these links for convenience and information. ASG does not control those sites and does not guarantee their accuracy, availability, security or content. Visiting them is your choice, and their own terms and policies apply. You may wish to read their privacy notices, which may differ from ours. Our [Privacy Policy](/privacy-policy) explains how we handle personal information on this website.",
      },
      {
        type: "p",
        text: "You may link to our home page or public pages, provided the link is lawful, does not misrepresent your relationship with ASG and does not suggest endorsement or affiliation without permission. Please do not frame our pages or present our content in a way that misleads visitors about who owns it or where it comes from.",
      },
    ],
  },
  {
    heading: "8. Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "To the extent permitted by applicable law, ASG is not liable for any loss or damage arising from your use of, or inability to use, this website, or from reliance on its content. This includes indirect or consequential loss.",
      },
      {
        type: "p",
        text: "Nothing in these Terms excludes or limits any liability, right or remedy that cannot lawfully be excluded or limited. These Terms also do not replace any separate contractual rights or obligations that apply to a specific product, service or transaction.",
      },
    ],
  },
  {
    heading: "9. Availability and Changes to the Website",
    blocks: [
      {
        type: "p",
        text: "We aim to keep this website reliable and secure, but we cannot promise uninterrupted access or that it will always be free of technical faults or harmful components. Access may be interrupted by maintenance, technical issues, security measures or disruption at a service provider.",
      },
      {
        type: "p",
        text: "We may update, suspend, restrict or discontinue any part of the website, and change its content or features, when reasonably necessary for maintenance, security, operational or business reasons.",
      },
    ],
  },
  {
    heading: "10. Privacy and Cookies",
    blocks: [
      {
        type: "p",
        text: "Using this website may involve the processing of personal information and the use of cookies and similar technologies. Our [Privacy Policy](/privacy-policy) explains how we handle personal information and our Cookie Policy explains how we use cookies and the choices you have.",
      },
    ],
  },
  {
    heading: "11. Changes to These Terms",
    blocks: [
      {
        type: "p",
        text: "We may revise these Terms from time to time to reflect changes to the website, our business activities or legal requirements. Revised Terms will be published on this page with an updated date. If you continue to use the website after that, you accept the revised Terms. Our [Privacy Policy](/privacy-policy) and Cookie Policy carry their own update dates, so please check them as well.",
      },
    ],
  },
  {
    heading: "12. Severability",
    blocks: [
      {
        type: "p",
        text: "If any part of these Terms is found to be invalid or unenforceable, the rest of the Terms continue to apply.",
      },
    ],
  },
  {
    heading: "13. Governing Law and Jurisdiction",
    blocks: [
      {
        type: "p",
        text: "These Terms are governed by the laws of Bangladesh, subject to any mandatory legal requirements that apply. Any dispute arising from or relating to these Terms or the use of this website is subject to the jurisdiction of the courts of Bangladesh.",
      },
    ],
  },
];
