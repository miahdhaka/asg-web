import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import PhotoGalleryGrid from "@/components/media-galleries/PhotoGalleryGrid";
import { processCards } from "@/components/media-galleries/mediaGalleriesData";

export const metadata: Metadata = {
  title: "Processes | ASG - Amanat Shah Group",
  description:
    "Curated high-resolution visual assets from ASG Group — manufacturing processes, textile processing lines, and quality control.",
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProcessesGalleryPage() {
  return (
    <main className="flex flex-col">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <PageHero
        title="Processes Photo Tour"
        subtitle="Curated high-resolution visual assets."
        mobileSrc="/images/media-galleries/hero-bg.png"
        desktopSrc="/images/media-galleries/hero-bg.png"
        alt="ASG Group processes gallery"
      />

      {/* ── Photo grid ────────────────────────────────────────────── */}
      <section className="flex w-full flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-[5rem] lg:py-[5rem]">
        <PhotoGalleryGrid cards={processCards} />
      </section>
    </main>
  );
}
