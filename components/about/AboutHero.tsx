import Image from "next/image";

export default function AboutHero() {
  return (
    <section id="about-hero" className="relative w-full">
      {/* Background image */}
      <Image
        src="/images/about/about-hero.png"
        alt="Amanat Shah Group"
        width={1920}
        height={1080}
        priority
        quality={90}
        className="w-full h-auto max-h-[41.5625rem] object-cover object-[50%_40%]"
      />

      {/* Dark bottom overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 overlay-linear-subtle" />

      <div className="absolute left-[5em] bottom-[5em] z-10 flex flex-col gap-0.5">
        <h1 className="font-test-tiempos-fine text-6xl tracking-wider text-white">
          Amanat Shah Group
        </h1>
        <p className="tracking-wider font-light text-white">
          Family business legacy for more than 130 years.
        </p>
      </div>
    </section>
  );
}
