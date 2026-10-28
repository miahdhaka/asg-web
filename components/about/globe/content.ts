// Everything editable for the globe hero lives here.
// Copy and figures come from the existing ASG site content (see
// components/about/AboutStats.tsx and the former globe section).

export type CardIcon = "rocket" | "cash" | "flag" | "partypopper";

export type GlobeCard = {
  id: string;
  icon: CardIcon;
  /** first (white) line */
  lead: string;
  /** second (green) lines */
  text: string;
  /** the card follows this point on the globe */
  anchor: { lat: number; lon: number };
  /** pixel offset from the projected anchor (top-left of card) */
  offset: { x: number; y: number };
};

export type TourStop = {
  name: string;
  lat: number;
  lon: number;
  /** seconds to stay before drifting on to the next stop */
  hold: number;
  cards: GlobeCard[];
};

export const HERO = {
  eyebrow: "Global reach",
  heading: ["Bangladesh", "at the center."],
  sub: "With over 30 years of export expertise, serving 30+ brands in 25 countries across 4 regions, ASG became the colony of trust in modern clothing brands. Backed by quality, transparency and commitment to its bones started late 19th century.",
  /** the home hub — every arc ribbon leaves from here */
  hub: { name: "Dhaka", lat: 23.81, lon: 90.41 },
};

export type ArcDestination = {
  /** shown in comments only; used for grouping when editing */
  region: "Europe" | "America" | "Africa" | "Australia" | "Asia";
  city: string;
  lat: number;
  lon: number;
  /** relative spawn bias, 1-10 — higher means more ribbons land here */
  w: number;
};

/** Arc endpoints. Every ribbon now departs the hub (Dhaka) and flies to one of
 *  these, so the field reads as exports radiating out of Bangladesh into the
 *  five major regions rather than random traffic between cities. */
export const ARC_DESTINATIONS: ArcDestination[] = [
  // Europe
  { region: "Europe", city: "London", lat: 51.5, lon: -0.12, w: 10 },
  { region: "Europe", city: "Paris", lat: 48.85, lon: 2.35, w: 9 },
  { region: "Europe", city: "Amsterdam", lat: 52.37, lon: 4.9, w: 8 },
  { region: "Europe", city: "Berlin", lat: 52.52, lon: 13.4, w: 8 },
  { region: "Europe", city: "Madrid", lat: 40.4, lon: -3.7, w: 7 },
  { region: "Europe", city: "Rome", lat: 41.9, lon: 12.5, w: 6 },
  { region: "Europe", city: "Stockholm", lat: 59.33, lon: 18.07, w: 6 },
  { region: "Europe", city: "Istanbul", lat: 41.01, lon: 28.98, w: 5 },

  // America (North and South)
  { region: "America", city: "New York", lat: 40.71, lon: -74.0, w: 10 },
  { region: "America", city: "Los Angeles", lat: 34.05, lon: -118.24, w: 8 },
  { region: "America", city: "Chicago", lat: 41.88, lon: -87.63, w: 7 },
  { region: "America", city: "Toronto", lat: 43.65, lon: -79.38, w: 6 },
  { region: "America", city: "Mexico City", lat: 19.43, lon: -99.13, w: 5 },
  { region: "America", city: "Sao Paulo", lat: -23.55, lon: -46.63, w: 6 },

  // Africa
  { region: "Africa", city: "Cairo", lat: 30.04, lon: 31.24, w: 7 },
  { region: "Africa", city: "Lagos", lat: 6.52, lon: 3.38, w: 6 },
  { region: "Africa", city: "Johannesburg", lat: -26.2, lon: 28.05, w: 6 },
  { region: "Africa", city: "Nairobi", lat: -1.29, lon: 36.82, w: 5 },
  { region: "Africa", city: "Casablanca", lat: 33.57, lon: -7.59, w: 4 },

  // Australia / Oceania
  { region: "Australia", city: "Sydney", lat: -33.87, lon: 151.21, w: 9 },
  { region: "Australia", city: "Melbourne", lat: -37.81, lon: 144.96, w: 7 },
  { region: "Australia", city: "Perth", lat: -31.95, lon: 115.86, w: 5 },
  { region: "Australia", city: "Auckland", lat: -36.85, lon: 174.76, w: 4 },

  // Asia
  { region: "Asia", city: "Tokyo", lat: 35.68, lon: 139.69, w: 9 },
  { region: "Asia", city: "Shanghai", lat: 31.23, lon: 121.47, w: 9 },
  { region: "Asia", city: "Singapore", lat: 1.35, lon: 103.82, w: 8 },
  { region: "Asia", city: "Mumbai", lat: 19.08, lon: 72.88, w: 8 },
  { region: "Asia", city: "Seoul", lat: 37.57, lon: 126.98, w: 7 },
  { region: "Asia", city: "Delhi", lat: 28.61, lon: 77.21, w: 7 },
  { region: "Asia", city: "Dubai", lat: 25.2, lon: 55.27, w: 7 },
  { region: "Asia", city: "Bangkok", lat: 13.76, lon: 100.5, w: 6 },
  { region: "Asia", city: "Jakarta", lat: -6.21, lon: 106.85, w: 5 },
];

/** Second-class lanes drawn by the separate indigo-tinted arc field — these are
 *  the lungi export routes, against which ARC_DESTINATIONS above carries the
 *  fabric routes. The primary list is left untouched; this one only adds. */
export const TRADE_DESTINATIONS: ArcDestination[] = [
  { region: "Asia", city: "New Delhi", lat: 28.61, lon: 77.21, w: 8 },
  { region: "Asia", city: "Dubai", lat: 25.2, lon: 55.27, w: 9 },
  { region: "Asia", city: "Riyadh", lat: 24.71, lon: 46.68, w: 8 },
  { region: "Asia", city: "Muscat", lat: 23.59, lon: 58.41, w: 6 },
  { region: "Asia", city: "Kuala Lumpur", lat: 3.14, lon: 101.69, w: 7 },
  { region: "Asia", city: "Yangon", lat: 16.87, lon: 96.2, w: 5 },
  { region: "Asia", city: "Kuwait City", lat: 29.38, lon: 47.99, w: 6 },
];

export const TOUR: TourStop[] = [
  {
    name: "Europe",
    lat: 40,
    lon: 14,
    hold: 14,
    cards: [
      {
        id: "eu-1",
        icon: "partypopper",
        lead: "50+ COUNTRIES",
        text: "TRUSTED ACROSS GLOBAL MARKETS",
        anchor: { lat: 30, lon: -38 },
        offset: { x: -150, y: 60 },
      },
      {
        id: "eu-2",
        icon: "cash",
        lead: "20+ BRANDS",
        text: "SERVED ACROSS 5 REGIONS",
        anchor: { lat: 8, lon: 8 },
        offset: { x: 40, y: 20 },
      },
    ],
  },
  // {
  //   name: "Asia",
  //   lat: 26,
  //   lon: 88,
  //   hold: 12,
  //   cards: [
  //     {
  //       id: "as-1",
  //       icon: "flag",
  //       lead: "DHAKA",
  //       text: "WHERE EVERY ORDER BEGINS",
  //       anchor: { lat: 24, lon: 90 },
  //       offset: { x: -60, y: 40 },
  //     },
  //   ],
  // },
  // {
  //   name: "North America",
  //   lat: 36,
  //   lon: -96,
  //   hold: 14,
  //   cards: [
  //     {
  //       id: "na-1",
  //       icon: "flag",
  //       lead: "17 COUNTRIES",
  //       text: "WITH ASG CLIENTS & PARTNERS",
  //       anchor: { lat: 12, lon: -88 },
  //       offset: { x: -40, y: 40 },
  //     },
  //   ],
  // },
  // {
  //   name: "Atlantic",
  //   lat: 28,
  //   lon: -22,
  //   hold: 12,
  //   cards: [
  //     {
  //       id: "at-1",
  //       icon: "rocket",
  //       lead: "15,000+",
  //       text: "PEOPLE ACROSS OUR CONCERNS",
  //       anchor: { lat: -8, lon: -62 },
  //       offset: { x: -150, y: 10 },
  //     },
  //     {
  //       id: "at-2",
  //       icon: "cash",
  //       lead: "15 AWARDS",
  //       text: "FOR EXCELLENCE IN EXPORTS",
  //       anchor: { lat: -14, lon: -4 },
  //       offset: { x: 10, y: 10 },
  //     },
  //   ],
  // },
];
