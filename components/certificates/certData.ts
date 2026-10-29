/* ------------------------------------------------------------------ */
/*  Certificate data — shared by the homepage "Certifications and        */
/*  Compliance" strip and the /all-certificates listing page.           */
/* ------------------------------------------------------------------ */

export interface CertLogo {
  label: string;
  src: string;
  // Path to the full certificate PDF under /public/pdf/. Certificates without
  // a backing PDF are purely decorative — they aren't clickable/previewable.
  pdf?: string;
}

// Certification logos reused from /public/images/certification/, each paired
// with its certificate PDF from /public/pdf/.
export const certLogos: CertLogo[] = [
  { label: "Cotton Made in Africa", src: "/images/certification/certificate1.png", pdf: "" },
  { label: "BSCI", src: "/images/certification/certificate2.png", pdf: "" },
  { label: "Cotton USA", src: "/images/certification/certificate-3.png", pdf: "/pdf/certificate_3.pdf" },
  { label: "Regenerated Cellulosics", src: "/images/certification/certificate4.png", pdf: "" },
  { label: "Higg Index", src: "/images/certification/certificate5.png", pdf: "/pdf/certificate_5.pdf" },
  { label: "BCI", src: "/images/certification/certificate6.png", pdf: "/pdf/certificate_6.pdf" },
  { label: "GOTS", src: "/images/certification/certificate7.png", pdf: "/pdf/certificate_7.pdf" },
  { label: "OEKO-TEX Standard 100", src: "/images/certification/certificate8.png", pdf: "/pdf/certificate_8.pdf" },
  { label: "Organic 100", src: "/images/certification/certificate-9.png", pdf: "/pdf/certificate_9.pdf" },
  { label: "Claim Standard", src: "/images/certification/certificate-10.png", pdf: "" },
  { label: "USGBC", src: "/images/certification/certificate-11.png", pdf: "/pdf/certificate_11.pdf" },
  { label: "European Flax", src: "/images/certification/certificate12.svg", pdf: "/pdf/certificate_12.pdf" },
  { label: "The BHive", src: "/images/certification/certificate14.svg", pdf: "/pdf/certificate_14.pdf" },
  { label: "Datacolor International", src: "/images/certification/certificate15.svg"},
  { label: "Global Recycled Standard", src: "/images/certification/certificate13.svg", pdf: "/pdf/certificate_15.pdf"  },

];
