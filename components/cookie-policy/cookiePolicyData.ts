// Inline markup supported in `text` / `items` strings (rendered by CookieContent):
//   **bold**            -> bold emphasis
//   [Label](/href)      -> internal link

export type CookieBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: { text: string; sub?: boolean }[] };

export interface CookieSection {
  heading: string;
  blocks: CookieBlock[];
}

export const cookieTitle = "Cookie Policy";

export const cookieUpdated = "Last Updated: 13 October 2026";

export const cookieIntro: string[] = [
  "[Amanat Shah Group (ASG)](/) uses this website to share information about the group, its business concerns, corporate activities and services. Like many websites, it uses cookies and similar technologies to keep its features working and to understand how visitors use its pages. This policy explains what cookies are, how we use them and how you can manage them. Please read it together with our [Privacy Policy](/privacy-policy) and [Terms of Use](/terms-of-use).",
  'In this policy, **"business concerns"** means the companies, business units and related organisations that form part of ASG.',
];

export const cookieSections: CookieSection[] = [
  {
    heading: "1. What Are Cookies?",
    blocks: [
      {
        type: "p",
        text: "Cookies are small text files stored on your device when you visit a website. They let a site remember details about your visit, such as your settings, and can help with security, essential features and measuring how the site is used.",
      },
    ],
  },
  {
    heading: "2. How We Use Cookies",
    blocks: [
      { type: "p", text: "On the ASG website, cookies may be used to:" },
      {
        type: "ul",
        items: [
          { text: "keep essential features working properly;" },
          { text: "remember your preferences and settings;" },
          { text: "understand how visitors move through and use our pages;" },
          { text: "identify technical problems and improve performance; and" },
          { text: "support additional features such as embedded content." },
        ],
      },
    ],
  },
  {
    heading: "3. Types of Cookies",
    blocks: [
      {
        type: "p",
        text: "**Essential cookies** support basic functions such as security and navigation. The website may not work properly without them.",
      },
      {
        type: "p",
        text: "**Preference cookies** remember choices such as language or display settings, where the website offers them.",
      },
      {
        type: "p",
        text: "**Analytics cookies** measure visits and show which pages visitors use, helping us improve the site.",
      },
      {
        type: "p",
        text: "**Third-party cookies** may be set by outside services that operate through our website, such as analytics providers or embedded content.",
      },
    ],
  },
  {
    heading: "4. Cookies We Use",
    blocks: [
      {
        type: "p",
        text: "The cookies on this website depend on the features and services in use at any given time. They generally fall into the categories described in Section 3: essential cookies, preference cookies, analytics cookies and third-party cookies. Essential cookies are used where necessary for the website to work. The other categories apply only where the relevant feature or service is enabled on the website.",
      },
      {
        type: "p",
        text: "You can see the cookies currently stored on your device through your browser settings, and you can delete or block them as described in Section 5. If the cookies on this website change, we will update this policy.",
      },
    ],
  },
  {
    heading: "5. Managing Cookies and Your Preferences",
    blocks: [
      {
        type: "p",
        text: "You can manage or delete cookies through your browser settings. Most browsers let you review stored cookies, block certain ones or remove existing ones. Blocking essential cookies may affect how some features work.",
      },
      {
        type: "p",
        text: "You can also change your choices at any time through the cookie settings link on this website.",
      },
      {
        type: "p",
        text: "Where the law requires it, we will ask for your consent before using non-essential cookies, and you may withdraw that consent at any time. Essential cookies may be used without consent where they are necessary for the website to operate.",
      },
    ],
  },
  {
    heading: "6. Third-Party Cookies and External Websites",
    blocks: [
      {
        type: "p",
        text: "Some third-party services used on this website may set their own cookies, and their own policies apply to those cookies. If you follow a link to an external website, that site's cookie and privacy policies apply instead. ASG does not control cookies set by independent websites. Our [Terms of Use](/terms-of-use) cover the use of external links.",
      },
    ],
  },
  {
    heading: "7. Cookies and Personal Information",
    blocks: [
      {
        type: "p",
        text: "Some cookies can collect information linked to an identifiable visitor or device. Our [Privacy Policy](/privacy-policy) explains how personal information is collected, used and protected.",
      },
    ],
  },
  {
    heading: "8. Changes to This Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this policy when the website, the technologies we use or legal requirements change. Updates will be published on this page with a revised date. Our [Terms of Use](/terms-of-use) and [Privacy Policy](/privacy-policy) carry their own update dates, so please check them as well.",
      },
    ],
  },
];
