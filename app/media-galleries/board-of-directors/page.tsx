import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="relative w-full lg:h-[41.5625rem]">
        {/* Background image */}
        <Image
          src="/images/media-galleries/hero-bg.png"
          alt="ASG Group board of directors gallery"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark bottom overlay for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(12,12,12,1) 6%, rgba(0,0,0,0) 92%)",
          }}
        />

        {/* Title + subtitle */}
        <div className="flex flex-col gap-1 lg:gap-0.5 absolute left-4 sm:left-8 lg:left-[5em] bottom-6 sm:bottom-10 lg:bottom-[5em] z-10">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white font-test-tiempos-fine tracking-wider">
            Board of Directors
          </h1>
          <p className="text-xs sm:text-sm tracking-wider font-light text-white lg:text-base">
            Curated high-resolution visual assets.
          </p>
        </div>
      </section>

      {/* ── Director grid ─────────────────────────────────────────── */}
      <section className="flex w-full flex-col px-[5rem] py-[5rem]">
        <DirectorGalleryGrid cards={directorCards} />
      </section>
    </main>
  );
}
