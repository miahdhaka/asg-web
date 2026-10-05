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
  /** CSS object-position for the background image. Defaults to "bottom". */
  objectPosition?: string;
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
  objectPosition = "bottom",
  id,
}: PageHeroProps) {
  const sameSrc = mobileSrc === desktopSrc;

  return (
    <section
      id={id}
      className={
        sameSrc
          ? "relative w-full min-h-[42rem] lg:h-[47rem]"
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
          style={{ objectPosition }}
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
            className="block lg:hidden min-h-[42rem] w-full h-auto object-cover"
            style={{ objectPosition }}
          />
          {/* Desktop-only image */}
          <Image
            src={desktopSrc}
            alt={alt}
            width={1920}
            height={1080}
            priority
            quality={90}
            className="hidden lg:block lg:h-[47rem] w-full object-cover"
            style={{ objectPosition }}
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

      {/* Title + subtitle — bottom-center */}
      <div className="absolute inset-x-0 bottom-32 sm:bottom-36 lg:bottom-[13em] z-10 flex flex-col items-center gap-2.5 sm:gap-4.5 lg:gap-[1.375rem] px-4 text-center">
        <h1 className="whitespace-pre-line leading-[1.05] text-[1.3125rem] sm:text-[2.625rem] lg:text-[3.625rem] text-white font-archivo-black uppercase">
          {title}
        </h1>
        <p className="whitespace-pre-line lg:whitespace-normal text-sm lg:text-[1.125rem] leading-relaxed tracking-widest text-white font-neue-montreal font-light max-w-[80%] mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
