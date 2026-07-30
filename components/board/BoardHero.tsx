import Image from "next/image";

export default function BoardHero() {
  return (
    <section id="board-hero" className="relative w-full">
      {/* Background image — mobile-only below lg (same asset until a mobile variant exists) */}
      <Image
        src="/images/board-of-directors/board-hero-mobile.png"
        alt="Board of Directors of Amanat Shah Group"
        width={1434}
        height={445}
        priority
        quality={90}
        className="block lg:hidden min-h-[20rem] w-full h-auto object-cover object-[50%_40%]"
      />

      {/* Background image — desktop only */}
      <Image
        src="/images/board-of-directors/board-hero-desktop.png"
        alt="Board of Directors of Amanat Shah Group"
        width={1434}
        height={445}
        priority
        quality={90}
        className="hidden lg:block lg:h-[41.5625rem] w-full object-cover object-[50%_40%]"
      />

      {/* Dark bottom overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 overlay-linear-subtle" />

      <div className="flex flex-col gap-1 lg:gap-0.5 absolute left-4 sm:left-8 lg:left-[5em] bottom-6 sm:bottom-10 lg:bottom-[5em] z-10">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white font-test-tiempos-fine tracking-wider">
          Board of Directors
        </h1>
        <p className="text-xs sm:text-sm tracking-wider font-light text-white lg:text-base">
          The task of the board of directors is to manage the company&apos;s
        </p>
      </div>
    </section>
  );
}
