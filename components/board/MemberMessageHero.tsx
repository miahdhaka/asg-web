import Image from "next/image";

export type MemberMessageHeroProps = {
  id: string;
  name: string;
  role: string;
  org: string;
  portrait: { src: string; width: number; height: number };
  /** Desktop size/position for the portrait. Bottom-anchored and sized to fill
      the hero height at the source image's aspect ratio, so it differs per
      member: width = 42.7em x (w / h), right = 120em - 62.5em - width. */
  portraitClassName: string;
};

/**
 * Hero band for a board-member message detail page — pale brand-gradient
 * tint, oversized green quote watermark, member name block and a portrait
 * anchored to the bottom edge (Figma: Chairman details page, node 865-2204).
 */
export default function MemberMessageHero({
  id,
  name,
  role,
  org,
  portrait,
  portraitClassName,
}: MemberMessageHeroProps) {
  return (
    <section
      id={id}
      className="relative w-full overflow-hidden bg-background pt-[calc(var(--header-height)+2.5rem)] lg:pt-0"
    >
      {/* 5% brand-gradient wash over the canvas bg — matches the Figma tint */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{ background: "var(--primary-gradient)" }}
      />

      <div className="relative flex flex-col px-4 pt-2 pb-6 sm:pb-0 sm:pt-10 sm:px-6 lg:block lg:h-[46em] lg:p-0">
        {/* Quote watermark — hidden on mobile */}
        <Image
          src="/images/board-of-directors/green-qoutes.webp"
          alt=""
          aria-hidden
          width={320}
          height={320}
          quality={90}
          className="hidden sm:block lg:absolute lg:left-[22.5em] lg:top-[18.75em] lg:h-[13.35em] lg:w-[13.35em]"
        />

        {/* Portrait — shows first on mobile, bottom-aligned on desktop */}
        <Image
          src={portrait.src}
          alt={`${name} — ${role}`}
          width={portrait.width}
          height={portrait.height}
          priority
          quality={90}
          className={`mx-auto w-[75%] sm:w-48 sm:mt-8 sm:w-72 lg:absolute lg:bottom-0 lg:mx-0 lg:mt-0 h-auto z-20 ${portraitClassName}`}
        />

        {/* Name / role / divider / group — shows after portrait on mobile */}
        <div className="mt-4 sm:mt-6 lg:absolute lg:bottom-[3em] lg:left-[22.5em] lg:mt-0 lg:w-[51.25em]">
          <h1 className="font-archivo-black font-medium text-[1.65rem] sm:text-4xl lg:text-[3em] lg:leading-[1.11] text-neutral-800">
            {name}
          </h1>
          <p className="mt-[0.33em] tracking-wider text-[1.125rem] sm:text-[1.33em] lg:leading-[1.5] text-neutral-800">
            {role}
          </p>
          <div
            aria-hidden
            className="mt-3 sm:mt-4 border-b border-neutral-100 sm:border-neutral-200 lg:mt-[1.33em]"
          />
          <p className="mt-3 sm:mt-4 text-base sm:text-base lg:mt-[1em] lg:text-[1.33em] lg:leading-[1.5] text-neutral-800 tracking-wider">
            {org}
          </p>
        </div>
      </div>
    </section>
  );
}
