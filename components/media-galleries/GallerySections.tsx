import Link from "next/link";
import PhotoGalleryGrid from "./PhotoGalleryGrid";
import LogoGalleryGrid from "./LogoGalleryGrid";
import DirectorGalleryGrid from "./DirectorGalleryGrid";
import {
  siteCards,
  processCards,
  logoCards,
  directorCards,
} from "./mediaGalleriesData";

/* ------------------------------------------------------------------ */
/*  "View more" gradient button                                        */
/* ------------------------------------------------------------------ */

function ViewMoreButton({ href }: { href?: string }) {
  return (
    <Link
      href={href || "#"}
      data-label="View more"
      className="primary-btn-flip-gradient font-medium leading-[1.25rem] tracking-wide px-4 sm:px-[2.25rem] py-2.5 sm:py-[1.2rem] text-[0.8rem] sm:text-[1.1rem]"
    >
      View more
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading row                                                */
/* ------------------------------------------------------------------ */

function SectionHeading({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-end justify-between gap-3 sm:gap-4">
      <h2 className="font-test-tiempos-fine text-neutral-800 text-xl sm:text-[2rem] lg:text-[3rem] sm:leading-[2.5rem] lg:leading-[3rem]">
        {title}
      </h2>
      <ViewMoreButton href={href} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Divider                                                            */
/* ------------------------------------------------------------------ */

function Divider() {
  return <hr className="border-0 border-t border-neutral-100" />;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function GallerySections() {
  return (
    <div className="flex w-full flex-col px-4 sm:px-6 lg:px-[5rem] py-8 sm:py-12 lg:py-[5rem]">
      {/* ── Sites ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4 sm:gap-8 mb-8">
        <SectionHeading title="Sites" href="/media-galleries/sites" />
        <PhotoGalleryGrid cards={siteCards} />
      </section>

      <Divider />

      {/* ── Processes ─────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4 sm:gap-8 my-8">
        <SectionHeading title="Processes" href="/media-galleries/processes" />
        <PhotoGalleryGrid cards={processCards} />
      </section>

      <Divider />

      {/* ── Logos ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4 sm:gap-8 my-8">
        <SectionHeading title="Logos" href="/media-galleries/logos" />
        <LogoGalleryGrid cards={logoCards.slice(0, 3)} />
      </section>

      <Divider />

      {/* ── Board of Directors ────────────────────────────────────── */}
      <section className="flex flex-col gap-8 mt-8">
        <SectionHeading title="Board of Directors" href="/media-galleries/board-of-directors" />
        <DirectorGalleryGrid cards={directorCards.slice(0, 3)} />
      </section>
    </div>
  );
}


