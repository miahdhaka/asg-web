export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FaqCategory {
  /** URL segment used by /faqs/[slug] */
  slug: string;
  title: string;
  description: string;
  icon: string;
  faqs: FaqEntry[];
}

export const faqCategories: FaqCategory[] = [
  {
    slug: "asg-group",
    title: "ASG Group",
    description: "Sustainable yarns, fabric sourcing & organic certifications.",
    icon: "/logo/ASG-logo.png",
    faqs: [
      {
        question: "In how many countries does ASG Group operate?",
        answer:
          "ASG Group serves customers across Asia, Europe and North America through its manufacturing units, distribution partners and export network.",
      },
      {
        question:
          "When was the Group established, and what is its core philosophy?",
        answer:
          "The Group carries a family business legacy of more than 130 years, built on sustainable growth, ethical trade and long-term community development.",
      },
      {
        question: "What is the organizational structure of ASG Group?",
        answer:
          "ASG Group operates as a diversified holding company. Each concern — textile, apparel, finance, retail, agriculture, real estate, chemical and IT — is run by its own management team reporting to the Board of Directors.",
      },
    ],
  },
  {
    slug: "textile",
    title: "Textile",
    description: "Sustainable yarns, fabric sourcing & organic certifications.",
    icon: "/icons/faqs/textitle.png",
    faqs: [
      {
        question: "What types of yarn and fabric do you produce?",
        answer:
          "Our spinning and weaving units supply cotton, blended and specialty yarns along with woven fabric for both domestic and export markets.",
      },
      {
        question: "Do you offer organic or certified sustainable materials?",
        answer:
          "Yes. Certified organic and sustainable material options are available on request, and the relevant certification documents are shared with each order.",
      },
      {
        question: "What is the minimum order quantity for fabric sourcing?",
        answer:
          "Minimum order quantities depend on the construction and finish requested. Our sourcing team confirms the exact quantity when quoting.",
      },
    ],
  },
  {
    slug: "apparel",
    title: "Apparel",
    description: "Global garment manufacturing, compliance & active orders.",
    icon: "/icons/faqs/apparel.png",
    faqs: [
      {
        question: "What garment categories can you manufacture?",
        answer:
          "Our apparel units handle woven and knit garments for men, women and children, covering everyday basics through to structured outerwear.",
      },
      {
        question: "Which compliance standards do your factories follow?",
        answer:
          "Our factories operate under internationally recognised social and workplace-safety compliance programmes, with audit reports available to buyers.",
      },
      {
        question: "How can I track the status of an active order?",
        answer:
          "Each buyer is assigned a merchandising contact who shares production milestones, inspection results and shipment schedules throughout the order.",
      },
    ],
  },
  {
    slug: "finance",
    title: "Finance",
    description: "Secure business credits, digital payments & merchant support.",
    icon: "/icons/faqs/finance.png",
    faqs: [
      {
        question: "What financial services are available to businesses?",
        answer:
          "Our financial arm supports business credit facilities, trade finance and digital payment collection for merchants.",
      },
      {
        question: "How do I apply for a business credit facility?",
        answer:
          "Applications begin with a consultation, after which our team advises on the documentation and eligibility criteria for the facility you need.",
      },
      {
        question: "Is merchant support available after onboarding?",
        answer:
          "Yes. Onboarded merchants receive continuing account support, including settlement queries and transaction reconciliation assistance.",
      },
    ],
  },
  {
    slug: "retail-ecom",
    title: "Retail & E-Com",
    description: "Online checkout flows, order delivery & exchange policies.",
    icon: "/icons/faqs/cart.png",
    faqs: [
      {
        question: "Which payment methods are supported at checkout?",
        answer:
          "Our online stores accept major cards, mobile financial services and cash on delivery where the service is available.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery timelines vary by destination. The estimated window is shown at checkout and confirmed again in your order confirmation.",
      },
      {
        question: "What is the return and exchange policy?",
        answer:
          "Unused items in original condition may be returned or exchanged within the window stated on the product page, subject to inspection.",
      },
    ],
  },
  {
    slug: "agriculture",
    title: "Agriculture",
    description: "Agro-processing, global exports & quality assurance.",
    icon: "/icons/faqs/Agriculture.png",
    faqs: [
      {
        question: "What agricultural products does the Group process?",
        answer:
          "Our agro division handles processing and packaging of locally sourced produce, including our tea estate operations.",
      },
      {
        question: "Do you export agricultural products?",
        answer:
          "Yes. Export shipments are arranged for international buyers, with documentation prepared to meet each destination market's requirements.",
      },
      {
        question: "How is product quality assured?",
        answer:
          "Produce is inspected at intake and again after processing, with quality parameters recorded for every batch before dispatch.",
      },
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    description: "Project bookings, RAJUK approvals & handover updates.",
    icon: "/icons/faqs/real-estate.png",
    faqs: [
      {
        question: "How do I book a unit in an ongoing project?",
        answer:
          "Bookings start with a site visit and a booking form. Our sales team then explains the payment schedule and agreement process.",
      },
      {
        question: "Are your projects RAJUK approved?",
        answer:
          "Approval documentation for each project is available for review at our office, and we share the relevant references with prospective buyers.",
      },
      {
        question: "How will I receive handover updates?",
        answer:
          "Buyers receive construction progress updates from the project coordinator, along with formal notice ahead of the handover date.",
      },
    ],
  },
  {
    slug: "chemical",
    title: "Chemical",
    description: "Industrial chemical solutions, MSDS & safety compliance.",
    icon: "/icons/faqs/chemical.png",
    faqs: [
      {
        question: "What industrial chemicals do you supply?",
        answer:
          "We supply process chemicals and auxiliaries used in textile dyeing, finishing and allied industrial applications.",
      },
      {
        question: "Can I get a Material Safety Data Sheet (MSDS)?",
        answer:
          "Yes. An MSDS is provided for every product we supply and can be requested from your account contact before purchase.",
      },
      {
        question: "How do you handle storage and transport safety?",
        answer:
          "Products are packed, labelled and transported in line with applicable handling regulations, and safe-storage guidance is supplied with each delivery.",
      },
    ],
  },
  {
    slug: "it-services",
    title: "IT Services",
    description: "Custom software development, UI/UX & technical SLA.",
    icon: "/icons/faqs/it-services.png",
    faqs: [
      {
        question: "What software services does the Group offer?",
        answer:
          "Our technology team builds custom web and business applications, covering discovery, UI/UX design, development and deployment.",
      },
      {
        question: "Do you provide design as a standalone service?",
        answer:
          "Yes. UI/UX research, wireframing and interface design can be engaged independently of a full development project.",
      },
      {
        question: "What support and SLA terms are available?",
        answer:
          "Support tiers with defined response and resolution targets are agreed during contracting and documented in the service-level agreement.",
      },
    ],
  },
];

export function getFaqCategory(slug: string): FaqCategory | undefined {
  return faqCategories.find((category) => category.slug === slug);
}
