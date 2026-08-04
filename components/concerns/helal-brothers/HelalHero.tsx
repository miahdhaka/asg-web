import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";

/** External-link glyph shown beside the "Visit website" label */
function LinkArrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="lg:h-[1em] lg:w-[1em]"
    >
      <path
        d="M2.5 9.5L9.5 2.5M4 2.5H9.5V8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Top band of the M/s Helal & Brothers concern page — company logo, name,
 * tagline, a "Visit website" gradient-outline button, then the full-width
 * hero photograph (Figma node 2604-30113).
 */
export default function HelalHero() {
  return (
    <section
      id="helal-hero"
      className="w-full bg-white"
      style={{ marginTop: "var(--header-height)" }}
    >
      {/* Company identity bar */}
      <div className="flex flex-col gap-6 px-4 pt-8 pb-8 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-[5em] lg:pt-[3.33em] lg:pb-[3.33em]">
        <div>
          <Image
            src="/images/concerns/helal-brothers/logo-hb.svg"
            alt="M/s Helal & Brothers Ltd. logo"
            width={65}
            height={40}
            priority
            quality={100}
            className="h-auto w-14 lg:w-[5.42em]"
          />
          <h1 className="mt-2 font-test-tiempos-fine text-2xl text-neutral-800 sm:text-3xl lg:mt-[0.67em] lg:text-[2em] lg:leading-[1.33]">
            M/s Helal &amp; Brothers Ltd.
          </h1>
          <p className="mt-1 text-xs text-neutral-800 sm:text-sm lg:mt-0 lg:text-[1em] lg:leading-[1.33]">
            Pioneering Bangladesh&apos;s Textile Heritag
          </p>
        </div>

        {/* Gradient-outline button — label and icon flip on hover, matching the
            other primary buttons (see .primary-btn-flip-gradient) */}
        <a
          href="#"
          className="group relative inline-flex w-fit items-center justify-center self-start overflow-hidden border px-6 py-3 text-sm font-medium leading-none lg:self-auto lg:px-[2em] lg:py-[1em] lg:text-[1.17em]"
          style={{
            borderImage: "var(--primary-gradient) 1",
            borderWidth: 1,
          }}
        >
          {/* Invisible spacer — preserves the button's intrinsic width/height */}
          <span className="invisible inline-flex items-center gap-1 whitespace-nowrap lg:gap-[0.33em]">
            Visit website
            <LinkArrow />
          </span>

          {/* Default: gradient text — slides down and out on hover */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center gap-1 whitespace-nowrap text-[#1AA179] transition-transform duration-500 ease-in-out group-hover:translate-y-full lg:gap-[0.33em]"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              Visit website
            </span>
            <SquareArrowOutUpRight className="w-4 h-4" />
          </span>

          {/* Hover: gradient fill + white text — slides in from the top */}
          <span
            aria-hidden
            className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0 lg:gap-[0.33em]"
            style={{ background: "var(--primary-gradient)" }}
          >
            Visit website
            <SquareArrowOutUpRight className="w-4 h-4" />
          </span>
        </a>
      </div>

      {/* Full-bleed hero image */}
      <Image
        src="/images/concerns/helal-brothers/hero.webp"
        alt="Precision textile machinery at M/s Helal & Brothers"
        width={1440}
        height={609}
        priority
        quality={90}
        className="h-56 w-full object-cover sm:h-80 lg:h-[50.75em]"
      />
    </section>
  );
}
