import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      id="intro-section"
      className="relative w-full bg-[var(--primary-black)] flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        height: "calc(100vh - var(--header-height))",
        paddingTop: "var(--header-height)",
      }}
    >
      {/* Brand gradient glow — top center, behind content */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[10%] z-10 -translate-x-1/2 w-[31.25rem] h-[25rem]"
        style={{
          opacity: 0.8,
          background:
            "linear-gradient(97.37deg, #8BC34A 1.29%, #1AA179 92.01%)",
          filter: "blur(15.625rem)",
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center">
        {/* Logo — receives the navbar logo via the Hero's circle-reveal handoff */}
        <Image
          id="intro-logo"
          src="/logo/ASG-logo-mixed.png"
          alt="Amanat Shah Group"
          width={300}
          height={120}
          quality={100}
          className="w-[18.75rem] h-[7.5rem] object-contain"
        />

        {/* Description — rises from the bottom during the Hero's circle-reveal */}
        <p
          id="intro-copy"
          className="max-w-[56.25rem] text-center text-[2rem] leading-[1.375] text-white mt-12"
        >
          Amanat Shah Group is a diversified business group with strong concentration in the Textile-to-Fashion value chain supported by Finance, Chemicals, Technology, Agriculture.
        </p>

        {/* About Us button — rises from the bottom during the Hero's circle-reveal */}
        <Link
          id="intro-cta"
          href="/about-us"
          data-label="About Us"
          className="primary-btn-flip-gradient text-lg px-8 py-4.5 mt-11"
        >
          About Us
        </Link>
      </div>
    </section>
  );
}
