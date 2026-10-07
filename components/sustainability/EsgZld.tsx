import Image from "next/image";
import { esgZld } from "./esgData";

/* Zero Liquid Discharge — heading + paragraph split, wide image below */
export default function EsgZld() {
  return (
    <section className="px-4 sm:px-8 pb-10">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-8 lg:gap-12">
        <hr className="border-0 border-t border-gray-200" />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 className="whitespace-pre-line font-archivo-black uppercase text-neutral-900 text-2xl sm:text-3xl lg:text-[2.5rem] leading-[1.1] lg:max-w-[55%]">
            {esgZld.heading}
          </h2>
          <p className="font-neue-montreal text-lg md:text-[1.25rem] lg:max-w-[52%] lg:pt-2 text-[#1A1A1A]">
            {esgZld.paragraph}
          </p>
        </div>

        {/* Wide rounded image */}
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[1rem] bg-[#D9D9D9] sm:aspect-[2/1] sm:rounded-[1.5rem]">
          <Image
            src={esgZld.image}
            alt={esgZld.alt}
            fill
            sizes="(min-width: 1024px) 80rem, 100vw"
            className="object-cover"
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}
