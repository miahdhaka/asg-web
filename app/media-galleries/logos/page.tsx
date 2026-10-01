import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import LogoGalleryGrid from "@/components/media-galleries/LogoGalleryGrid";
import { logoCards } from "@/components/media-galleries/mediaGalleriesData";

export const metadata: Metadata = {
  title: "Logos | ASG - Amanat Shah Group",
  description:
    "Curated high-resolution visual assets from ASG Group — official logos of Amanat Shah Group and its concern companies.",
};
 
export default function LogosGalleryPage() {
  return (
    <main className="flex flex-col">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <PageHero
        title="Logos Photo Tour"
        subtitle="Curated high-resolution visual assets."
        mobileSrc="/images/media-galleries/hero-bg.png"
        desktopSrc="/images/media-galleries/hero-bg.png"
        alt="ASG Group logos gallery"
      />

      {/* ── Logo grid ─────────────────────────────────────────────── */}
      <section className="flex w-full flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-[5rem] lg:py-[5rem]">
        <LogoGalleryGrid cards={logoCards} />
      </section>
    </main>
  );
}
