import Image from "next/image";
import Link from "next/link";
import {
  siteCards,
  processCards,
  logoCards,
  directorCards,
  type GalleryCard,
  type LogoCard,
  type DirectorCard,
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
/*  Site / Process photo card                                          */
/* ------------------------------------------------------------------ */

function PhotoCard({ card }: { card: GalleryCard }) {
  return (
    <div className="group flex flex-col gap-4">
      <div className="relative aspect-[429/257] w-full overflow-hidden bg-[#D9D9D9]">
        <Image
          src={card.image}
          alt={card.label}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          draggable={false}
          className="pointer-events-none object-cover"
          quality={80}
        />
        {/* Hover overlay */}
        <div
          aria-hidden
          className="absolute inset-0 overlay-image-hover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        />
      </div>
      <p className="font-test-tiempos-fine text-[1.125rem] leading-[1.5rem] text-neutral-800 lg:text-[1.5rem] lg:leading-[1.75rem]">
        {card.label}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo card                                                          */
/* ------------------------------------------------------------------ */

function LogoCard({ card }: { card: LogoCard }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex aspect-[429/257] w-full items-center justify-center bg-gray-50">
        <Image
          src={card.image}
          alt={card.label}
          width={209}
          height={103}
          draggable={false}
          className="object-contain"
          quality={100}
        />
      </div>
      <p className="font-test-tiempos-fine text-[1.125rem] leading-[1.5rem] text-neutral-800 lg:text-[1.5rem] lg:leading-[1.75rem]">
        {card.label}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Director card                                                      */
/* ------------------------------------------------------------------ */

function DirectorCard({ card }: { card: DirectorCard }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-[240/327] w-full overflow-hidden bg-gray-50">
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          draggable={false}
          className="pointer-events-none object-cover"
          quality={90}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-test-tiempos-fine text-[1.125rem] leading-[1.5rem] text-neutral-800 lg:text-[1.5rem] lg:leading-[1.75rem]">
          {card.name}
        </p>
        <p className="font-neue-montreal text-[1rem] leading-[1.5rem] text-neutral-800">
          {card.title}
        </p>
      </div>
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
    <div className="flex w-full flex-col px-[3.75rem] py-[5rem]">
      {/* ── Sites ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-8">
        <SectionHeading title="Sites" href="/media-galleries/sites" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8">
          {siteCards.map((card, i) => (
            <PhotoCard key={`site-${i}`} card={card} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Processes ─────────────────────────────────────────────── */}
      <section className="mt-8 flex flex-col gap-8">
        <SectionHeading title="Processes" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8">
          {processCards.map((card, i) => (
            <PhotoCard key={`process-${i}`} card={card} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Logos ─────────────────────────────────────────────────── */}
      <section className="mt-8 flex flex-col gap-8">
        <SectionHeading title="Logos" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8">
          {logoCards.map((card, i) => (
            <LogoCard key={`logo-${i}`} card={card} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Board of Directors ────────────────────────────────────── */}
      <section className="mt-8 flex flex-col gap-8">
        <SectionHeading title="Board of Directors" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8">
          {directorCards.map((card, i) => (
            <DirectorCard key={`director-${i}`} card={card} />
          ))}
        </div>
      </section>
    </div>
  );
}
