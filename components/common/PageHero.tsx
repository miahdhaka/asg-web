import Image from "next/image";

interface PageHeroProps {
  /** Page title rendered as the <h1>. */
  title: string;
  /** Subtitle / tagline rendered below the title. */
  subtitle: string;
  /** Mobile-only background image (shown below lg breakpoint). */
  mobileSrc: string;
  /** Desktop background image (shown at lg and above). */
  desktopSrc: string;
  /** Alt text for the background image. */
  alt: string;
  /** Optional emblem rendered top-center on desktop (e.g. sustainability pages). */
  emblemSrc?: string;
  /** Optional section id for scroll-target / GSAP hooks. */
  id?: string;
}

/**
 * Shared hero band used by every sub-page (About, Contact, Newsroom, Board,
 * Careers, FAQ, Media Galleries, Sustainability sub-pages, etc.).
 *
 * Two rendering modes:
 *  • When `mobileSrc !== desktopSrc` → two `<Image>` elements (mobile + desktop).
 *  • When `mobileSrc === desktopSrc` → single `<Image fill>` for efficiency.
 */
export default function PageHero({
  title,
  subtitle,
  mobileSrc,
  desktopSrc,
  alt,
  emblemSrc,
  id,
}: PageHeroProps) {
  const sameSrc = mobileSrc === desktopSrc;

  return (
    <section
      id={id}
      className={
        sameSrc
          ? "relative w-full min-h-[28rem] lg:h-[41.5625rem]"
          : "relative w-full"
      }
    >
      {/* ── Background image(s) ── */}
      {sameSrc ? (
        /* Single fill image when mobile and desktop share the same asset */
        <Image
          src={desktopSrc}
          alt={alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <>
          {/* Mobile-only image */}
          <Image
            src={mobileSrc}
            alt={alt}
            width={360}
            height={290}
            priority
            quality={90}
            className="block lg:hidden min-h-[28rem] w-full h-auto object-cover object-[50%_40%]"
          />
          {/* Desktop-only image */}
          <Image
            src={desktopSrc}
            alt={alt}
            width={1920}
            height={1080}
            priority
            quality={90}
            className="hidden lg:block lg:h-[41.5625rem] w-full object-cover object-[50%_40%]"
          />
        </>
      )}

      {/* Dark bottom overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 overlay-linear-subtle" />

      {/* Optional emblem — top center, desktop only */}
      {emblemSrc && (
        <Image
          src={emblemSrc}
          alt=""
          aria-hidden
          width={34}
          height={35}
          quality={95}
          className="absolute left-1/2 top-2 z-10 hidden -translate-x-1/2 lg:block"
        />
      )}

      {/* Title + subtitle — bottom-left */}
      <div className="flex flex-col gap-1 lg:gap-0.5 absolute left-4 sm:left-8 lg:left-[5em] bottom-6 sm:bottom-10 lg:bottom-[5em] z-10">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white font-test-tiempos-fine tracking-wider">
          {title}
        </h1>
        <p className="text-xs sm:text-sm tracking-wider text-white lg:text-base">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
