import Image from "next/image";

interface PageHeroFullProps {
  /** Page title rendered as the <h1>. */
  title: string;
  /** Subtitle / tagline rendered below the title. */
  subtitle: string;
  /** Mobile-only background image (shown below lg breakpoint). Omit when using `videoSrc`. */
  mobileSrc?: string;
  /** Desktop background image (shown at lg and above). Omit when using `videoSrc`. */
  desktopSrc?: string;
  /** Background video instead of a still image (autolooped, muted, no controls). */
  videoSrc?: string;
  /** Alt text for the background image. */
  alt: string;
  /** Optional emblem rendered top-center on desktop. */
  emblemSrc?: string;
  /** Optional section id for scroll-target / GSAP hooks. */
  id?: string;
}

/**
 * Full-screen sibling of PageHero — identical caption treatment
 * (bottom-centred uppercase Archivo Black title over Neue Montreal subtitle,
 * behind the `overlay-linear-subtle` gradient), but the band always fills the
 * viewport instead of the fixed 32rem/47rem height.
 *
 * Height follows the site's navbar-aware convention (see Header.tsx):
 * `calc(var(--vh) - var(--header-height))` below lg — a phone's 100vh is the
 * toolbar-HIDDEN height, so `--vh` is the measured visible height — and
 * `calc(100vh - var(--header-height))` on desktop. Together with the
 * `margin-top` offset that pushes the band below the fixed navbar, the navbar
 * plus hero occupy exactly one screen.
 *
 * Background media is absolutely positioned to fill the band, so it stretches
 * to the viewport height rather than its intrinsic aspect ratio.
 */
export default function PageHeroFull({
  title,
  subtitle,
  mobileSrc,
  desktopSrc,
  videoSrc,
  alt,
  emblemSrc,
  id,
}: PageHeroFullProps) {
  const sameSrc = mobileSrc === desktopSrc;

  /* ── Background media: video, one shared image, or a mobile/desktop pair ── */
  const background = videoSrc ? (
    <video
      aria-hidden
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 size-full object-cover object-bottom"
    >
      <source src={videoSrc} type="video/webm" />
    </video>
  ) : mobileSrc && desktopSrc ? (
    sameSrc ? (
      /* Single fill image when mobile and desktop share the same asset */
      <Image
        src={desktopSrc}
        alt={alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-bottom"
      />
    ) : (
      <>
        {/* Mobile-only image */}
        <Image
          src={mobileSrc}
          alt={alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-bottom lg:hidden"
        />
        {/* Desktop-only image */}
        <Image
          src={desktopSrc}
          alt={alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="hidden object-cover object-bottom lg:block"
        />
      </>
    )
  ) : null;

  return (
    <section
      id={id}
      style={{ marginTop: "var(--header-height)" }}
      className="relative w-full overflow-hidden h-[calc(var(--vh)-var(--header-height))] lg:h-[calc(100vh-var(--header-height))]"
    >
      {background}

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
      <div className="absolute inset-x-0 bottom-40 sm:bottom-44 lg:bottom-[10.5em] z-10 flex flex-col items-center gap-2.5 sm:gap-4.5 lg:gap-[1.375rem] px-4 text-center">
        <h1 className="whitespace-pre-line leading-[1.05] text-[1.3125rem] sm:text-[2.625rem] lg:text-[3.625rem] text-white font-archivo-black uppercase">
          {title}
        </h1>
        <p className="text-[0.8125rem] sm:text-[0.9375rem] lg:text-[1.125rem] tracking-wider text-white font-neue-montreal font-light">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
