/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface OfficeCardData {
  title: string;
  image: string;
  address: string;
  phones: string[];
  email: string;
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

const OFFICE_IMG = "/images/contact-us/office-placeholder.png";

export const sisterConcernCards: OfficeCardData[] = [
  {
    title: "Hazrat Amanat Shah Securities Limited",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, Dhaka-1000",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
  },
  {
    title: "Farm 2 Firm (Baikanthapur Tea State)",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, Dhaka-1000",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
  },
  {
    title: "Factory",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, Dhaka-1000",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
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
  },
  {
    title: "Showroom - 1",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, Dhaka-1000",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
  },
  {
    title: "Showroom - 2",
    image: OFFICE_IMG,
    address:
      "Phoenix Bhaban (2nd Floor, Southeast Portion), 12 Dilkusha C/A, Dhaka-1000",
    phones: ["9512646", "9512647"],
    email: "info@amanatshahfabrics.com",
  },
];
