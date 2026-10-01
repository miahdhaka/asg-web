import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import PhotoGalleryGrid from "@/components/media-galleries/PhotoGalleryGrid";
import type { GalleryCard } from "@/components/media-galleries/mediaGalleriesData";

export const metadata: Metadata = {
  title: "Sites Photo Tour | ASG - Amanat Shah Group",
  description:
    "Curated high-resolution visual assets from ASG Group — corporate offices, manufacturing facilities, and textile complexes.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const sitePhotos: GalleryCard[] = [
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
  {
    image: "/images/media-galleries/sites-photo-4.png",
    label: "Corporate Office & Facility",
  },
  {
    image: "/images/media-galleries/sites-photo-5.png",
    label: "Corporate Office & Facility",
  },
  {
    image: "/images/media-galleries/sites-photo-6.png",
    label: "Corporate Office & Facility",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SitesPhotoTourPage() {
  return (
    <main className="flex flex-col">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <PageHero
        title="Sites Photo Tour"
        subtitle="Curated high-resolution visual assets."
        mobileSrc="/images/media-galleries/hero-bg.png"
        desktopSrc="/images/media-galleries/hero-bg.png"
        alt="ASG Group sites photo tour"
      />

      {/* ── Photo grid ────────────────────────────────────────────── */}
      <section className="flex w-full flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-[5rem] lg:py-[5rem]">
        <PhotoGalleryGrid cards={sitePhotos} />
      </section>
    </main>
  );
}
