import Image from "next/image";

export default function AboutHero() {
  return (
    <section id="about-hero" className="relative w-full">
      {/* Background image — mobile-only asset below lg */}
      <Image
        src="/images/about-us/about-hero-mobile.png"
        alt="Amanat Shah Group"
        width={360}
        height={290}
        priority
        quality={90}
        className="block lg:hidden min-h-[20rem] w-full h-auto object-cover object-[50%_40%]"
      />

      {/* Background image — desktop only */}
      <Image
        src="/images/about-us/about-hero.png"
        alt="Amanat Shah Group"
        width={1920}
        height={1080}
        priority
        quality={90}
        className="hidden lg:block lg:max-h-[41.5625rem] w-full h-auto obj@ect-cover object-[50%_40%]"
      />

      {/* Dark bottom overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 overlay-linear-subtle" />

      <div className="flex flex-col gap-1 lg:gap-0.5 absolute left-4 sm:left-8 lg:left-[5em] bottom-6 sm:bottom-10 lg:bottom-[5em] z-10">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white font-test-tiempos-fine tracking-wider">
          Amanat Shah Group
        </h1>
        <p className="text-xs sm:text-sm tracking-wider font-light text-white lg:text-base">
          Family business legacy for more than 130 years.
        </p>
      </div>
    </section>
  );
}
