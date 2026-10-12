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
      "Home Textile Bangladesh",
      "Home Textile International",
      "Fabrics",
      "Yarn",
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
    "House-232, Lane-03, DOHS, Baridhara, Dhaka-1206, Bangladesh.",
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
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, Dhaka-1000",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
    coordinates: { lat: 23.7330, lng: 90.4098 },
  },
  {
    title: "Farm 2 Firm (Baikanthapur Tea State)",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, Dhaka-1000",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
    coordinates: { lat: 23.7330, lng: 90.4098 },
  },
  {
    title: "Factory",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, Dhaka-1000",
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
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, Dhaka-1000",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
    coordinates: { lat: 23.7330, lng: 90.4098 },
  },
  {
    title: "Showroom - 1",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, Dhaka-1000",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
    coordinates: { lat: 23.7330, lng: 90.4098 },
  },
  {
    title: "Showroom - 2",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, Dhaka-1000",
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
      title: "ASG Corporate Office",
      image: OFFICE_IMG,
      address:
        "House-232, Lane-03, DOHS, Baridhara, Dhaka-1206, Bangladesh.",
      phones: ["+(88)09643226699", "+(88)029578403"],
      email: "info@asg-bd.com",
      coordinates: { lat: 23.7806, lng: 90.4074 },
    },
    {
      title: "Head office",
      image: OFFICE_IMG,
      address:
        "City Center (level-24), 900/1 Motijheel C/A, Dhaka-1000, Bangladesh.",
      phones: ["+(88)09643226699", "+(88)029578403"],
      email: "",
      coordinates: { lat: 23.7104, lng: 90.4074 },
    },
  ],
  Factory: [
    {
      title: "Amanat Shah Fabrics",
      image: OFFICE_IMG,
      address:
        "Bhatpara, Maijdee Road 1603, Pachdona, Narshingdi, Bangladesh.",
      phones: ["+(88)09643226699", "+(88)029578403"],
      email: "",
      coordinates: { lat: 23.685, lng: 90.51 },
    },
    {
      title: "Hazrat Amanat Shah Spinning Mills Ltd.",
      image: OFFICE_IMG,
      address:
        "Bhatpara, Maijdee Road 1603, Pachdona, Narshingdi, Bangladesh.",
      phones: ["+(88)01313767544"],
      email: "info@hassml.com",
      coordinates: { lat: 23.685, lng: 90.51 },
    },
    {
      title: "Amanat Shah Weaving Processing Ltd",
      image: OFFICE_IMG,
      address:
        "Bhatpara, Maijdee Road 1603, Pachdona, Narshingdi, Bangladesh.",
      phones: ["+(88)09643226699", "+(88)029578403"],
      email: "",
      coordinates: { lat: 23.685, lng: 90.51 },
    },
    {
      title: "Trust Knitwear LTD.",
      image: OFFICE_IMG,
      address: "Indrapur Road, Bhabanipur, Gazipur-1740, Bangladesh",
      phones: ["+88 01711 11 43 66"],
      email: "info@trustknitwear.com",
      coordinates: { lat: 23.995, lng: 90.42 },
    },
  ],
  "Sales Point": [
    {
      title: "Amanat Shah Lungi",
      image: OFFICE_IMG,
      address:
        "Amanat Shah Tower, Shekherchar, Dhaka, Sylhet Highway, Narsingdi - 1604",
      phones: ["+(88)09643226699", "+(88)029578403"],
      email: "",
      coordinates: { lat: 23.8953, lng: 90.6683 },
    },
    {
      title: "Amanat Shah Lungi (Islampur)",
      image: OFFICE_IMG,
      address: "87 M.A. TOWER, 87 Islampur Rd, Dhaka 1100",
      phones: ["+(88)01313767544"],
      email: "info@hassml.com",
      coordinates: { lat: 23.7104, lng: 90.4074 },
    },
  ],
};
