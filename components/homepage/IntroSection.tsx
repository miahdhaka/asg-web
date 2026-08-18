import Image from "next/image";
import Link from "next/link";

export default function IntroSection() {
  return (
    /* Height uses dvh below lg: a phone's 100vh is the toolbar-HIDDEN
       height, so a 100vh section is always taller than the visible screen —
       it gets clipped and leaves native scroll room under the pinned
       overlay, which breaks the homepage stepper's one-screen-per-step
       model. dvh tracks the real visible height. Desktop keeps 100vh. */
    <section
      id="intro-section"
      className="relative w-full bg-[var(--primary-black)] flex flex-col items-center justify-center overflow-hidden h-[calc(100dvh-var(--header-height))] lg:h-[calc(100vh-var(--header-height))] pt-[var(--header-height)]"
    >
      {/* Brand gradient glow — top center, behind content.
          The blur has to scale with the box: desktop's 15.625rem blur on the
          mobile-sized box (18×15rem) diffused the glow into invisibility, so
          below lg the blur keeps the same blur-to-width ratio as desktop
          (0.5) and lg restores the exact original 15.625rem — desktop output
          is unchanged. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[10%] z-10 -translate-x-1/2 w-[18rem] sm:w-[25rem] lg:w-[31.25rem] h-[15rem] sm:h-[20rem] lg:h-[25rem] opacity-80 blur-[9rem] sm:blur-[12.5rem] lg:blur-[15.625rem]"
        style={{
          background:
            "linear-gradient(97.37deg, #8BC34A 1.29%, #1AA179 92.01%)",
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
          className="w-[12rem] sm:w-[15rem] lg:w-[18.75rem] h-[4.8rem] sm:h-[6rem] lg:h-[7.5rem] object-contain"
        />

        {/* Description — rises from the bottom during the Hero's circle reveal */}
        <p
          id="intro-copy"
          className="max-w-[56.25rem] text-center text-base sm:text-lg lg:text-[2rem] leading-[1.375] text-white mt-6 sm:mt-8 lg:mt-12"
        >
          Amanat Shah Group is a diversified business group with strong concentration in the Textile-to-Fashion value chain supported by Finance, Chemicals, Technology, Agriculture.
        </p>

        {/* About Us button — rises from the bottom during the Hero's circle reveal */}
        <Link
          id="intro-cta"
          href="/about-us"
          data-label="About Us"
          className="primary-btn-flip-gradient text-sm sm:text-base lg:text-lg px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4.5 mt-6 sm:mt-8 lg:mt-11"
        >
          About Us
        </Link>
      </div>
    </section>
  );
}
