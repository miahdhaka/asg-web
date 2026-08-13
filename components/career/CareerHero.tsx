import Image from "next/image";

export default function CareerHero() {
  return (
    <section id="career-hero" className="relative w-full min-h-[28rem] lg:h-[41.5625rem]">
      {/* Background image */}
      <Image
        src="/images/career/hero.webp"
        alt="ASG Group team members at work"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark bottom overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 overlay-linear-subtle" />

      {/* ASG monogram — sits above the fixed navbar, centered */}
      <Image
        src="/logo/asg-monogram.png"
        alt=""
        width={34}
        height={35}
        quality={100}
        aria-hidden
        className="absolute left-1/2 top-2 hidden h-[2.9167rem] w-[2.8333rem] -translate-x-1/2 lg:block"
      />

      <div className="flex flex-col gap-1 lg:gap-0.5 absolute left-4 sm:left-8 lg:left-[5em] bottom-6 sm:bottom-10 lg:bottom-[5em] z-10">
        <h1 className="hidden sm:block text-2xl sm:text-4xl lg:text-6xl text-white font-test-tiempos-fine tracking-wider">
          Find Your<br />Opportunity
        </h1>
        <h1 className="block sm:hidden text-2xl sm:text-4xl lg:text-6xl text-white font-test-tiempos-fine tracking-wider">
          Find Your Opportunity
        </h1>
        <p className="text-xs sm:text-sm tracking-wider font-light text-white lg:text-base">
          Family business legacy for more than 130 years.
        </p>
      </div>
    </section>
  );
}
