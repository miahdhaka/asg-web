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
      /* Rounded pill with a 1px gradient ring — same treatment as the
         "Visit website" button (dual-background technique; border-image
         can't follow border-radius), with the slide-in flip hover. */
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-transparent px-4 py-2 text-[0.8rem] font-medium leading-none tracking-wide sm:px-[2.25rem] sm:py-[0.85rem] sm:text-[1.1rem]"
      style={{
        background:
          "linear-gradient(var(--background)) padding-box, var(--primary-gradient) border-box",
      }}
    >
      {/* Invisible spacer — preserves the button's intrinsic size */}
      <span className="invisible inline-flex items-center whitespace-nowrap">
        View more
      </span>

      {/* Default: gradient text — slides down and out on hover */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[#1AA179] transition-transform duration-500 ease-in-out group-hover:translate-y-full"
      >
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: "var(--primary-gradient)" }}
        >
          View more
        </span>
      </span>

      {/* Hover: gradient fill + white text — slides in from the top */}
      <span
        aria-hidden
        className="absolute inset-0 flex -translate-y-full items-center justify-center whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0"
        style={{ background: "var(--primary-gradient)" }}
      >
        View more
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading row                                                */
/* ------------------------------------------------------------------ */

function SectionHeading({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-end justify-between gap-3 sm:gap-4">
      <h2 className="font-archivo-black text-neutral-800 text-xl sm:text-[2rem] lg:text-[3rem] sm:leading-[2.5rem] lg:leading-[3rem]">
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
  /* Visible hairline with equal breathing room above and below — the
     sections themselves carry no outer margins anymore */
  return <hr className="mt-6 mb-10 border-0 border-t border-neutral-200 sm:mt-[3.5rem] sm:mb-12 lg:mt-[4.25rem] lg:mb-[3.5rem]" />;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function GallerySections() {
  return (
    <div className="flex w-full flex-col px-4 sm:px-6 lg:px-[5rem] py-8 sm:py-12 lg:py-[5rem]">
      {/* ── Sites ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4 sm:gap-8">
        <SectionHeading title="Sites" href="/media-galleries/sites" />
        <PhotoGalleryGrid cards={siteCards} />
      </section>

      <Divider />

      {/* ── Processes ─────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4 sm:gap-8">
        <SectionHeading title="Processes" href="/media-galleries/processes" />
        <PhotoGalleryGrid cards={processCards} />
      </section>

      <Divider />

      {/* ── Logos ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4 sm:gap-8">
        <SectionHeading title="Logos" href="/media-galleries/logos" />
        <LogoGalleryGrid cards={logoCards.slice(0, 3)} />
      </section>

      <Divider />

      {/* ── Board of Directors ────────────────────────────────────── */}
      <section className="flex flex-col gap-4 sm:gap-8">
        <SectionHeading title="Board of Directors" href="/media-galleries/board-of-directors" />
        <DirectorGalleryGrid cards={directorCards.slice(0, 3)} />
      </section>
    </div>
  );
}


