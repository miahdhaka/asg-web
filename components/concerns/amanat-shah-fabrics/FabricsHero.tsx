import Image from "next/image";

/**
 * Top band of the Amanat Shah Fabrics concern page — company logo, name,
 * tagline, a "Visit website" gradient-outline button, then the full-width
 * hero photograph (Figma node 2604-30541).
 */
export default function FabricsHero() {
  return (
    <section
      id="fabrics-hero"
      className="w-full bg-white"
      style={{ marginTop: "var(--header-height)" }}
    >
      {/* Company identity bar */}
      <div className="flex flex-col gap-6 px-4 pt-8 pb-8 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-[5em] lg:pt-[3.33em] lg:pb-[3.33em]">
        <div>
          <Image
            src="/images/concerns/amanat-shah-fabrics/logo-asf.svg"
            alt="Amanat Shah Fabrics Ltd. logo"
            width={130}
            height={45}
            priority
            quality={100}
            className="h-auto w-28 lg:w-[10.83em]"
          />
          <h1 className="mt-2 font-test-tiempos-fine text-2xl text-neutral-800 sm:text-3xl lg:mt-[0.67em] lg:text-[2em] lg:leading-[1.33]">
            Amanat Shah Fabrics Ltd.
          </h1>
          <p className="mt-1 text-xs text-neutral-800 sm:text-sm lg:mt-0 lg:text-[1em] lg:leading-[1.33]">
            Synonyms To Excellence
          </p>
        </div>

        {/* Gradient-outline button — fills with the brand gradient on hover */}
        <a
          href="#"
          className="group relative inline-flex w-fit items-center justify-center gap-1 self-start border px-6 py-3 text-sm font-medium lg:gap-[0.33em] lg:self-auto lg:px-[2em] lg:py-[1em] lg:text-[1.17em]"
          style={{
            borderImage: "var(--primary-gradient) 1",
            borderWidth: 1,
          }}
        >
          <span
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "var(--primary-gradient)" }}
          />
          <span
            className="relative bg-clip-text leading-none text-transparent transition-colors duration-300 group-hover:text-white"
            style={{ backgroundImage: "var(--primary-gradient)" }}
          >
            Visit website
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
            className="relative text-[#1AA179] transition-colors duration-300 group-hover:text-white lg:h-[1em] lg:w-[1em]"
          >
            <path
              d="M2.5 9.5L9.5 2.5M4 2.5H9.5V8"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Full-bleed hero image */}
      <Image
        src="/images/concerns/amanat-shah-fabrics/hero.webp"
        alt="Digital textile printing at Amanat Shah Fabrics"
        width={1440}
        height={609}
        priority
        quality={90}
        className="h-56 w-full object-cover sm:h-80 lg:h-[50.75em]"
      />
    </section>
  );
}
