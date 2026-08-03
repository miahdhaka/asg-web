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
    image: "/images/media-galleries/process-1.png",
    label: "Corporate Office & Facility",
  },
  {
    image: "/images/media-galleries/process-2.png",
    label: "Amanat Shah Textile Complex",
  },
  {
    image: "/images/media-galleries/process-3.png",
    label: "ASG Manufacturing Hub",
  },
];

/* ------------------------------------------------------------------ */
/*  Logos                                                              */
/* ------------------------------------------------------------------ */

export const logoCards: LogoCard[] = [
  {
    image: "/images/media-galleries/logo-asg-group.svg",
    label: "Amanat shah group",
  },
  {
    image: "/images/media-galleries/logo-asg-fabrics.svg",
    label: "Amanat shah fabrics LTD",
  },
  {
    image: "/images/media-galleries/logo-asg-spinning.svg",
    label: "Hazrat amanat shah spinning mills LTd.",
  },
];

/* ------------------------------------------------------------------ */
/*  Board of Directors                                                 */
/* ------------------------------------------------------------------ */

export const directorCards: DirectorCard[] = [
  {
    image: "/images/media-galleries/director-1.png",
    name: "Mohammad Helal Miah",
    title: "Chairman",
  },
  {
    image: "/images/media-galleries/director-2.png",
    name: "Rezaul Karim",
    title: "Director",
  },
  {
    image: "/images/media-galleries/director-3.png",
    name: "Rezawan Kabir Shihab",
    title: "Director",
  },
];
