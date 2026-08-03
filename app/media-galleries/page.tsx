import type { Metadata } from "next";
import MediaGalleriesHero from "@/components/media-galleries/MediaGalleriesHero";
import GallerySections from "@/components/media-galleries/GallerySections";

export const metadata: Metadata = {
  title: "Sites Photo Tour | ASG - Amanat Shah Group",
  description:
    "Curated high-resolution visual assets from ASG Group — corporate offices, manufacturing facilities, and textile complexes.",
};

export default function MediaGalleriesPage() {
  return (
    <main>
      <MediaGalleriesHero />
      <GallerySections />
    </main>
  );
}
