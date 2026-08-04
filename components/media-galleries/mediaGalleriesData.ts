/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface GalleryCard {
  image: string;
  label: string;
}

export interface LogoCard {
  image: string;
  label: string;
}

export interface DirectorCard {
  image: string;
  name: string;
  title: string;
}

/* ------------------------------------------------------------------ */
/*  Sites Photo Tour                                                   */
/* ------------------------------------------------------------------ */

export const siteCards: GalleryCard[] = [
  {
    image: "/images/media-galleries/sites-photo-1.png",
    label: "Corporate Office & Facility",
  },
  {
    image: "/images/media-galleries/sites-photo-2.png",
    label: "Amanat Shah Textile Complex",
  },
  {
    image: "/images/media-galleries/sites-photo-3.png",
    label: "ASG Manufacturing Hub",
  },
];

/* ------------------------------------------------------------------ */
/*  Processes                                                          */
/* ------------------------------------------------------------------ */

export const processCards: GalleryCard[] = [
  {
    image: "/images/media-galleries/process-1.webp",
    label: "Corporate Office & Facility",
  },
  {
    image: "/images/media-galleries/process-2.webp",
    label: "Amanat Shah Textile Complex",
  },
  {
    image: "/images/media-galleries/process-3.webp",
    label: "ASG Manufacturing Hub",
  },
];

/* ------------------------------------------------------------------ */
/*  Logos                                                              */
/* ------------------------------------------------------------------ */

export const logoCards: LogoCard[] = [
  {
    image: "/logo/sister-concern/helal-&-brothers-clr.png",
    label: "Helal & Brothers Ltd.",
  },
  {
    image: "/logo/sister-concern/miah-clr.png",
    label: "Miah & Miah Enterprise",
  },
  {
    image: "/logo/sister-concern/weaving-clr.png",
    label: "Amanat Shah Weaving Processing Ltd.",
  },
  {
    image: "/logo/sister-concern/fabrics-clr.png",
    label: "Amanat Shah Fabrics Ltd.",
  },
  {
    image: "/logo/sister-concern/spinning-mills-clr.png",
    label: "Hazrat Amanat Shah Spinning Mills Ltd.",
  },
  {
    image: "/logo/sister-concern/trust-knitwear-clr.png",
    label: "Trust Knitwear Industries Ltd.",
  },
  {
    image: "/logo/sister-concern/securities-clr.png",
    label: "Hazrat Amanat Shah Securities Ltd.",
  },
  {
    image: "/logo/sister-concern/farm2farm-clr.png",
    label: "Farm2Firm",
  },
  {
    image: "/logo/sister-concern/tex-solution-clr.png",
    label: "Amanat Shah Text Solution",
  },
];

/* ------------------------------------------------------------------ */
/*  Board of Directors                                                 */
/* ------------------------------------------------------------------ */

export const directorCards: DirectorCard[] = [
  {
    image: "/images/board-of-directors/chairman.png",
    name: "Mohammad Helal Miah",
    title: "Chairman",
  },
  {
    image: "/images/board-of-directors/managing-director.png",
    name: "Rezaul Karim",
    title: "Director",
  },
  {
    image: "/images/board-of-directors/rezawan-kabir-shihab.png",
    name: "Rezawan Kabir Shihab",
    title: "Director",
  },
  {
    image: "/images/board-of-directors/md-jubayer-amin.png",
    name: "Md. Jubayer Amin",
    title: "Director",
  },
  {
    image: "/images/board-of-directors/akm-azad.png",
    name: "Akm Azad",
    title: "Entrepreneur",
  },
  {
    image: "/images/board-of-directors/mahamudul-hasan.png",
    name: "Mahamudul Hasan",
    title: "Entrepreneur",
  },
  {
    image: "/images/board-of-directors/mohammad-kamrul-islam.png",
    name: "Mohammad Kamrul Islam",
    title: "Entrepreneur",
  },
];
