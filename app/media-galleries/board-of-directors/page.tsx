import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import DirectorGalleryGrid from "@/components/media-galleries/DirectorGalleryGrid";
import { directorCards } from "@/components/media-galleries/mediaGalleriesData";

export const metadata: Metadata = {
  title: "Board of Directors | ASG - Amanat Shah Group",
  description:
    "Curated high-resolution visual assets from ASG Group — portraits of the Board of Directors.",
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BoardOfDirectorsGalleryPage() {
  return (
    <main className="flex flex-col">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <PageHero
        title="Board of Directors"
        subtitle="Curated high-resolution visual assets."
        mobileSrc="/images/media-galleries/hero-bg.png"
        desktopSrc="/images/media-galleries/hero-bg.png"
        alt="ASG Group board of directors gallery"
      />

      {/* ── Director grid ─────────────────────────────────────────── */}
      <section className="flex w-full flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-[5rem] lg:py-[5rem]">
        <DirectorGalleryGrid cards={directorCards} />
      </section>
    </main>
  );
}
