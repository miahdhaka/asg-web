import Image from "next/image";

export default function EsgHero() {
  return (
    <section className="relative w-full lg:h-[31.125rem]">
      {/* Background image */}
      <Image
        src="/images/sustainability/esg/hero.webp"
        alt="Aerial view of lush green forest near Amanat Shah Group premises"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark bottom overlay for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(12,12,12,1) 6%, rgba(0,0,0,0) 92%)",
        }}
      />

      {/* Emblem — top center */}
      <Image
        src="/images/sustainability/esg/hero-emblem.webp"
        alt=""
        aria-hidden
        width={34}
        height={35}
        quality={95}
        className="absolute left-1/2 top-2 z-10 hidden -translate-x-1/2 lg:block"
      />

      {/* Title + subtitle */}
      <div className="absolute left-4 bottom-6 z-10 flex flex-col gap-2 sm:left-8 sm:bottom-10 lg:left-[3.75rem] lg:bottom-[3.125rem] lg:gap-0.5">
        <h1 className="max-w-[26.875rem] font-test-tiempos-fine text-3xl tracking-wider text-white sm:text-4xl lg:text-5xl lg:leading-[3rem]">
          Environmental &amp; Social Governance
        </h1>
        <p className="text-xs tracking-wider text-white lg:text-sm">
          Family business legacy for more than 130 years.
        </p>
      </div>
    </section>
  );
}
