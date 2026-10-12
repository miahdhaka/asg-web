import Image from "next/image";
import { weVision } from "./weData";

/* Vision intro — centred narrow label + heading + body, followed by a
   full-width rounded image (Figma 7740:54604 / 7740:50623) */
export default function WeVision() {
  return (
    <section className="px-4 sm:px-8 lg:px-0 pt-12 pb-6 lg:pt-[5.5rem] lg:pb-[5rem]">
      {/* Text block — left-aligned copy inside a centred column */}
      <div className="mx-auto flex w-full max-w-[46rem] flex-col gap-2 sm:gap-1">
        <p className="text-sm font-medium text-neutral-800 tracking-wide lg:text-lg">
          {weVision.label}
        </p>
        <h2 className="font-archivo-black text-[#1A1A1A] text-[1.5rem] leading-[1.15] sm:text-[2.625rem] lg:text-[4rem] lg:leading-[3.75rem]">
          {weVision.title}
        </h2>
        <p className="font-neue-montreal text-base leading-7 text-[#1A1A1A] lg:text-[1.3rem] lg:leading-8 mt-3 sm:mt-8">
          {weVision.body}
        </p>
      </div>

      {/* Wide rounded image */}
      <div className="mx-auto mt-8 w-full max-w-[80rem] lg:mt-[2rem]">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl bg-[#D9D9D9] lg:aspect-[1056/429]">
          <Image
            src={weVision.image}
            alt={weVision.alt}
            fill
            sizes="(min-width: 1024px) 1056px, 100vw"
            className="object-cover"
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}
