import Image from "next/image";

export default function NewsHero() {
  return (
    <section className="relative w-full lg:h-[41.5625rem]">
      {/* Background image */}
      <Image
        src="/images/newsroom/news-hero.png"
        alt="ASG Group news releases"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark bottom overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 overlay-linear-subtle" />

      {/* Title + subtitle */}
      <div className="flex flex-col gap-1 lg:gap-0.5 absolute left-4 sm:left-8 lg:left-[5em] bottom-6 sm:bottom-10 lg:bottom-[5em] z-10">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white font-test-tiempos-fine tracking-wider">
          News Releases
        </h1>
        <p className="text-xs sm:text-sm tracking-wider font-light text-white lg:text-base">
          Stay in the know with the latest news from ASG Group.
        </p>
      </div>
    </section>
  );
}
