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
      className="primary-btn-flip-gradient font-medium leading-[1.25rem] tracking-wide px-[2.25rem] py-[1.2rem] text-[1.1rem]"
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
    <div className="flex items-end justify-between">
      <h2 className="font-test-tiempos-fine text-[2rem] leading-[2.5rem] text-neutral-800 lg:text-[3rem] lg:leading-[3rem]">
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
    <div className="flex w-full flex-col px-[5rem] py-[5rem]">
      {/* ── Sites ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-8 mb-8">
        <SectionHeading title="Sites" href="/media-galleries/sites" />
        <PhotoGalleryGrid cards={siteCards} />
      </section>

      <Divider />

      {/* ── Processes ─────────────────────────────────────────────── */}
      <section className="flex flex-col gap-8 my-8">
        <SectionHeading title="Processes" href="/media-galleries/processes" />
        <PhotoGalleryGrid cards={processCards} />
      </section>

      <Divider />

      {/* ── Logos ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-8 my-8">
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


