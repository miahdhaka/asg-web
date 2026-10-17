import Image from "next/image";
import { weGrowth } from "./weData";

/* Growth & Leadership — full-bleed dark-green band, rounded photo left and
   label + heading + text column right (Figma 7740:50627 / 7740:50628) */
export default function WeGrowthBanner() {
  return (
    <section className="bg-[#0E2D25] py-12 lg:py-[5rem]">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col items-center gap-8 px-4 sm:px-8 lg:flex-row lg:justify-between lg:gap-[4rem] lg:px-0">
        {/* Photo — 631×421, 16px radius. Below the text on mobile, left on desktop */}
        <div className="relative order-2 aspect-[3/2] w-full overflow-hidden rounded-2xl bg-white/5 sm:aspect-[631/421] lg:order-1 lg:aspect-[631/421] lg:w-[62%] lg:shrink-0">
          <Image
            src={weGrowth.image}
            alt={weGrowth.alt}
            fill
            sizes="(min-width: 1024px) 631px, 100vw"
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Text column — above the photo on mobile, right on desktop */}
        <div className="order-1 flex w-full flex-col gap-2 sm:gap-3 lg:order-2 lg:max-w-[27rem]">
          <p className="text-sm font-medium text-neutral-200 tracking-wide lg:text-lg">
            {weGrowth.label}
          </p>
          <h2 className="font-archivo-black text-white text-[1.125rem] leading-[1.4] sm:text-[2.625rem] sm:leading-[1.15] lg:text-[3rem] lg:leading-[3.25rem]">
            {weGrowth.title}
          </h2>
          <p className="font-neue-montreal text-sm leading-5.5 text-neutral-200 lg:text-[1.125rem] lg:leading-8 mt-1.5 sm:mt-0">
            {weGrowth.body}
          </p>
        </div>
      </div>
    </section>
  );
}
