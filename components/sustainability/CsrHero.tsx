import Image from "next/image";
import { csrHeroTitle, csrHeroSubtitle } from "./csrData";

export default function CsrHero() {
  return (
    <section className="relative w-full lg:h-[41.5625rem]">
      {/* Background image */}
      <Image
        src="/images/sustainability/csr/hero.png"
        alt="Corporate Social Responsibility — Amanat Shah Group community initiatives"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark bottom overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 overlay-linear-subtle" />

      {/* Emblem — top center */}
      <Image
        src="/images/sustainability/csr/hero-emblem.png"
        alt=""
        aria-hidden
        width={34}
        height={35}
        quality={95}
        className="absolute left-1/2 top-2 z-10 hidden -translate-x-1/2 lg:block"
      />

      {/* Title + subtitle */}
      <div className="flex flex-col gap-1 lg:gap-0.5 absolute left-4 sm:left-8 lg:left-[5em] bottom-6 sm:bottom-10 lg:bottom-[5em] z-10">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white font-test-tiempos-fine tracking-wider">
          {csrHeroTitle}
        </h1>
        <p className="text-xs sm:text-sm tracking-wider font-light text-white lg:text-base">
          {csrHeroSubtitle}
        </p>
      </div>
    </section>
  );
}
