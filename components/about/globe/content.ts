// Everything editable for the globe hero lives here.
// Copy and figures come from the existing ASG site content (see
// components/about/AboutStats.tsx and the former globe section).

export type CardIcon = "rocket" | "cash" | "flag";

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
  /** the home hub — extra arcs fly out of here */
  hub: { name: "Dhaka", lat: 23.81, lon: 90.41 },
  hubRate: 0.14,
};

export const TOUR: TourStop[] = [
  {
    name: "Europe",
    lat: 40,
    lon: 14,
    hold: 14,
    cards: [
      {
        id: "eu-1",
        icon: "rocket",
        lead: "130 YEARS",
        text: "OF TEXTILE LEGACY AND TRUST",
        anchor: { lat: 30, lon: -38 },
        offset: { x: -150, y: 60 },
      },
      {
        id: "eu-2",
        icon: "cash",
        lead: "30+ BRANDS",
        text: "SERVED ACROSS 4 REGIONS",
        anchor: { lat: 8, lon: 8 },
        offset: { x: 40, y: 20 },
      },
    ],
  },
  {
    name: "Asia",
    lat: 26,
    lon: 88,
    hold: 12,
    cards: [
      {
        id: "as-1",
        icon: "flag",
        lead: "DHAKA",
        text: "WHERE EVERY ORDER BEGINS",
        anchor: { lat: 24, lon: 90 },
        offset: { x: -60, y: 40 },
      },
    ],
  },
  {
    name: "North America",
    lat: 36,
    lon: -96,
    hold: 14,
    cards: [
      {
        id: "na-1",
        icon: "flag",
        lead: "17 COUNTRIES",
        text: "WITH ASG CLIENTS & PARTNERS",
        anchor: { lat: 12, lon: -88 },
        offset: { x: -40, y: 40 },
      },
    ],
  },
  {
    name: "Atlantic",
    lat: 28,
    lon: -22,
    hold: 12,
    cards: [
      {
        id: "at-1",
        icon: "rocket",
        lead: "15,000+",
        text: "PEOPLE ACROSS OUR CONCERNS",
        anchor: { lat: -8, lon: -62 },
        offset: { x: -150, y: 10 },
      },
      {
        id: "at-2",
        icon: "cash",
        lead: "15 AWARDS",
        text: "FOR EXCELLENCE IN EXPORTS",
        anchor: { lat: -14, lon: -4 },
        offset: { x: 10, y: 10 },
      },
    ],
  },
];
