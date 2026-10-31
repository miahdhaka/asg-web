/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface OfficeCardData {
  title: string;
  image: string;
  address: string;
  phones: string[];
  email: string;
  coordinates: { lat: number; lng: number };
}

export interface OpeningHour {
  day: string;
  time: string;
  closed?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Form tabs                                                          */
/* ------------------------------------------------------------------ */

export const formTabs = ["Business", "Investor", "Media", "Employee"] as const;

export type FormTab = (typeof formTabs)[number];

/* ------------------------------------------------------------------ */
/*  Per-tab form fields (placeholders per Figma tab variants)          */
/* ------------------------------------------------------------------ */

export interface FormTabFields {
  namePlaceholder: string;
  mobilePlaceholder: string;
  dropdownPlaceholder: string;
  messagePlaceholder: string;
  dropdownOptions?: string[];
}

export const formTabFields: Record<FormTab, FormTabFields> = {
  Business: {
    namePlaceholder: "Enter full name",
    mobilePlaceholder: "Enter mobile number",
    dropdownPlaceholder: "Select Product...",
    messagePlaceholder: "Write down your message",
    dropdownOptions: [
      "Fabrics",
      "Yarn",
      "Others",
    ],
  },
  Investor: {
    namePlaceholder: "Enter full name",
    mobilePlaceholder: "Enter mobile number",
    dropdownPlaceholder: "Select your invest choice...",
    messagePlaceholder: "Write down your proposal",
    dropdownOptions: [
      "Equity Investment",
      "Debt Investment",
      "Joint Venture",
      "Partnership Opportunity",
    ],
  },
  Media: {
    namePlaceholder: "Enter your media name",
    mobilePlaceholder: "Enter mobile number",
    dropdownPlaceholder: "Select your media type...",
    messagePlaceholder: "Your offer for us",
    dropdownOptions: [
      "Print Media",
      "Online/Digital Media",
      "Television",
      "Radio",
    ],
  },
  Employee: {
    namePlaceholder: "Enter full name",
    mobilePlaceholder: "Enter mobile number",
    dropdownPlaceholder: "Select your career goals...",
    messagePlaceholder: "Write down your cover letter",
    dropdownOptions: [
      "Full-time Position",
      "Part-time Position",
      "Internship",
      "Consultancy",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Opening hours                                                      */
/* ------------------------------------------------------------------ */

export const openingHours: OpeningHour[] = [
  { day: "Close Friday", time: "Closed", closed: true },
  { day: "Saturday", time: "10:00 AM - 7:00 PM" },
  { day: "Sunday", time: "10:00 AM - 7:00 PM" },
  { day: "Monday", time: "10:00 AM - 7:00 PM" },
  { day: "Tuesday", time: "10:00 AM - 7:00 PM" },
  { day: "Wednesday", time: "10:00 AM - 7:00 PM" },
  { day: "Thursday", time: "10:00 AM - 7:00 PM" },
];

/* ------------------------------------------------------------------ */
/*  Corporate Headquarters                                             */
/* ------------------------------------------------------------------ */

export const headquarters = {
  location:
    "House-232, Lane-03, DOHS, Baridhara, \nDhaka-1206, Bangladesh",
  phones: ["+(88) 02-223357949", "+(88) 02-223358403"],
  email: "info@asg-bd.com",
};

/* ------------------------------------------------------------------ */
/*  Sister Concerns Office                                             */
/* ------------------------------------------------------------------ */

const OFFICE_IMG = "/images/contact-us/office-location-placeholder.png";

export const sisterConcernCards: OfficeCardData[] = [
  {
    title: "Hazrat Amanat Shah Securities Limited",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, \nDhaka-1000, Bangladesh",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
    coordinates: { lat: 23.7330, lng: 90.4098 },
  },
  {
    title: "Farm 2 Firm (Baikanthapur Tea State)",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, \nDhaka-1000, Bangladesh",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
    coordinates: { lat: 23.7330, lng: 90.4098 },
  },
  {
    title: "Factory",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, \nDhaka-1000, Bangladesh",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
    coordinates: { lat: 23.7330, lng: 90.4098 },
  },
];

/* ------------------------------------------------------------------ */
/*  Sales Point                                                        */
/* ------------------------------------------------------------------ */

export const salesPointCards: OfficeCardData[] = [
  {
    title: "Distribution Office",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, \nDhaka, Bangladesh",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
    coordinates: { lat: 23.7330, lng: 90.4098 },
  },
  {
    title: "Showroom - 1",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A,\nDhaka, Bangladesh",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
    coordinates: { lat: 23.7330, lng: 90.4098 },
  },
  {
    title: "Showroom - 2",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A,\nDhaka, Bangladesh",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
    coordinates: { lat: 23.7330, lng: 90.4098 },
  },
];

/* ------------------------------------------------------------------ */
/*  All Location tabs & cards                                          */
/* ------------------------------------------------------------------ */

export const locationTabs = ["Office", "Factory", "Sales Point"] as const;
export type LocationTab = (typeof locationTabs)[number];

export const locationCards: Record<LocationTab, OfficeCardData[]> = {
  Office: [
    {
      title: "Corporate Headquarters (HQ)",
      image: OFFICE_IMG,
      address:
        "House-232, Lane-03, DOHS, Baridhara,\nDhaka-1206, Bangladesh",
      phones: ["+(88)09643226699"],
      email: "info@asg-bd.com",
      coordinates: { lat: 23.814306, lng: 90.412028 },
    },
    {
      title: "Corporate Office",
      image: OFFICE_IMG,
      address:
        "City Center (level-24), 900/1 Motijheel C/A,\nDhaka-1000, Bangladesh",
      phones: ["+(88)02223357949"],
      email: "",
      coordinates: { lat: 23.72944140625588, lng: 90.4173378569164 },
    },
  ],
  Factory: [
    {
      title: "Amanat Shah Fabrics",
      image: OFFICE_IMG,
      address:
        "Bhatpara, Maijdee Road 1603, Pachdona,\nNarshingdi, Bangladesh",
      phones: ["+(88)01321118200"],
      email: "info@amanatshahfabrics.com",
      coordinates: { lat: 23.910028, lng: 90.663917 },
    },
    {
      title: "Hazrat Amanat Shah Spinning Mills Ltd.",
      image: OFFICE_IMG,
      address:
        "Bhatpara, Maijdee Road 1603, Pachdona,\nNarshingdi, Bangladesh",
      phones: ["+(88)01313767544"],
      email: "",
      coordinates: { lat: 23.912194, lng: 90.662806 },
    },
    {
      title: "Amanat Shah Weaving Processing Ltd",
      image: OFFICE_IMG,
      address:
        "Bhatpara, Maijdee Road 1603, Pachdona,\nNarshingdi, Bangladesh",
      phones: ["+(88)01321118231"],
      email: "",
      coordinates: { lat: 23.92675, lng: 90.712528 },
    },
    {
      title: "Trust Knitwear LTD.",
      image: OFFICE_IMG,
      address: "Indrapur Road, Bhabanipur,\nGazipur-1740, Bangladesh",
      phones: ["+(88)01711114366"],
      email: "info@trustknitwear.com",
      coordinates: { lat: 24.152361, lng: 90.404611 },
    },
    {
      title: "Farm 2 Farm",
      image: OFFICE_IMG,
      address: "Baikunthapur, Habiganj,\nSylhet, Bangladesh",
      phones: ["+(88)01313767480"],
      email: "",
      coordinates: { lat: 24.160797, lng: 91.364478 },
    }
  ],
  "Sales Point": [
    {
      title: "Amanat Shah Lungi",
      image: OFFICE_IMG,
      address:
        "Amanat Shah Tower, Shekherchar,\nNarsingdi - 1604, Bangladesh",
      phones: ["+(88)01313767501"],
      email: "",
      coordinates: { lat: 23.870611, lng: 90.668889 },
    },
    {
      title: "Amanat Shah Lungi (Islampur)",
      image: OFFICE_IMG,
      address: "87 M.A. TOWER, 87 Islampur Rd,\nDhaka-1100, Bangladesh",
      phones: ["+(88)01321118241"],
      email: "",
      coordinates: { lat: 23.7104, lng: 90.4074 },
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Contact link helpers                                               */
/* ------------------------------------------------------------------ */

/** tel: hrefs only accept a dial plan, so the display formatting (spaces,
 *  parens, dashes) has to be stripped: keep '+' and digits, drop everything
 *  else. "+(88) 02-223357949" -> "+8802223357949". */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mailHref(email: string) {
  return `mailto:${email}`;
}

/** Shared class for every phone/email link on the page, so hover treatment
 *  stays consistent across ContactInfo, OfficeCard and AllLocationsSection.
 *  `.gradient-text-hover` (globals.css) paints the brand gradient through the
 *  glyphs on hover; its own transition list covers color/text-fill/background,
 *  so no Tailwind transition utility is needed here. The decoration colour is
 *  pinned because background-clip:text makes the fill transparent, which would
 *  otherwise leave the hover underline invisible too. It's declared without a
 *  variant as well, because Tailwind only emits the CSS for a decoration colour
 *  if that rule exists statically — a hover-only class on its own has nothing
 *  to modify, since text-decoration-color inherits by default. */
export const contactLinkClass =
  "cursor-pointer underline-offset-2 decoration-[#1AA179] gradient-text-hover hover:underline hover:decoration-[#1AA179]";
