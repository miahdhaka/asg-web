import Image from "next/image";

export default function CareerHero() {
  return (
    <section id="career-hero" className="relative h-[20rem] w-full sm:h-[26rem] lg:h-[41.5rem]">
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

      <div className="absolute left-4 bottom-8 z-10 flex flex-col gap-0.5 sm:left-8 lg:left-[5em] lg:bottom-[8.75rem]">
        <h1 className="font-test-tiempos-fine text-3xl tracking-wider text-white sm:text-4xl lg:text-[4rem] lg:leading-[4rem]">
          Find Your Opportunity
        </h1>
        <p className="text-xs tracking-wider text-white sm:text-sm lg:text-[1.1667rem]">
          Family business legacy for more than 130 years.
        </p>
      </div>
    </section>
  );
}
