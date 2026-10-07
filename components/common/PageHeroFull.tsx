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
  /** Anchor for the background media's vertical position. Defaults to "bottom". */
  imagePosition?: "bottom" | "center";
  /** Optional section id for scroll-target / GSAP hooks. */
  id?: string;
}

/**
 * Full-screen sibling of PageHero — identical caption treatment
 * (bottom-centred uppercase Archivo Black title over Neue Montreal subtitle,
 * behind the `overlay-linear-subtle` gradient). On mobile the band matches
 * PageHero's `42rem` height; on desktop it always fills the viewport.
 *
 * The section starts flush at the very top of the page — the floating pill
 * navbar overlays it rather than pushing it down. Desktop height uses plain
 * `100vh`.
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
  imagePosition = "bottom",
  id,
}: PageHeroFullProps) {
  const sameSrc = mobileSrc === desktopSrc;
  /* Tailwind needs static class names — map the prop to a full utility */
  const posClass = imagePosition === "center" ? "object-center" : "object-bottom";

  /* ── Background media: video, one shared image, or a mobile/desktop pair ── */
  const background = videoSrc ? (
    <video
      aria-hidden
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className={`absolute inset-0 size-full object-cover ${posClass}`}
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
        className={`object-cover ${posClass}`}
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
          className={`object-cover ${posClass} lg:hidden`}
        />
        {/* Desktop-only image */}
        <Image
          src={desktopSrc}
          alt={alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className={`hidden object-cover ${posClass} lg:block`}
        />
      </>
    )
  ) : null;

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden min-h-[42rem] lg:h-screen"
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
        <p className="text-sm lg:text-[1.125rem] leading-relaxed tracking-widest text-white font-neue-montreal font-light max-w-[550px] mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
