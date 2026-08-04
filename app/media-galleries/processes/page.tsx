import type { Metadata } from "next";
import Image from "next/image";
import { PhotoCard } from "@/components/media-galleries/PhotoGalleryGrid";
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
      <section className="relative w-full lg:h-[41.5625rem]">
        {/* Background image */}
        <Image
          src="/images/media-galleries/hero-bg.png"
          alt="ASG Group processes gallery"
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
            Processes Photo Tour
          </h1>
          <p className="text-xs sm:text-sm tracking-wider font-light text-white lg:text-base">
            Curated high-resolution visual assets.
          </p>
        </div>
      </section>

      {/* ── Photo grid ────────────────────────────────────────────── */}
      <section className="flex w-full flex-col px-[5rem] py-[5rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-x-5 lg:gap-y-12">
          {processCards.map((card, i) => (
            <PhotoCard key={`process-${i}`} card={card} />
          ))}
        </div>
      </section>
    </main>
  );
}
