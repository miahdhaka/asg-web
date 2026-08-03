import Image from "next/image";

export default function FaqHero() {
  return (
    <section id="faq-hero" className="relative h-[20rem] w-full sm:h-[26rem] lg:h-[41.5625rem]">
      {/* Background image */}
      <Image
        src="/images/faq/hero.webp"
        alt="ASG Group shipping and logistics operations"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[50%_40%]"
      />

      {/* Dark bottom overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 overlay-linear-subtle" />

      <div className="flex flex-col gap-1 lg:gap-0.5 absolute left-4 sm:left-8 lg:left-[5em] bottom-6 sm:bottom-10 lg:bottom-[5em] z-10">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white font-test-tiempos-fine tracking-wider">
          FAQ&apos;s
        </h1>
        <p className="text-xs sm:text-sm tracking-wider font-light text-white lg:text-base">
          Family business legacy for more than 130 years.
        </p>
      </div>
    </section>
  );
}
