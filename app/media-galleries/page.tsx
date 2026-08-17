import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import GallerySections from "@/components/media-galleries/GallerySections";

export const metadata: Metadata = {
  title: "Sites Photo Tour | ASG - Amanat Shah Group",
  description:
    "Curated high-resolution visual assets from ASG Group — corporate offices, manufacturing facilities, and textile complexes.",
};

export default function MediaGalleriesPage() {
  return (
    <main>
      <PageHero
        title="Media Galleries"
        subtitle="Curated high-resolution visual assets."
        mobileSrc="/images/media-galleries/hero-bg.png"
        desktopSrc="/images/media-galleries/hero-bg.png"
        alt="ASG Group media galleries"
      />
      <GallerySections />
    </main>
  );
}
