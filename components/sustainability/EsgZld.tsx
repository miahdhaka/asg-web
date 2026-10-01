import Image from "next/image";
import { esgZld } from "./esgData";

/* Zero Liquid Discharge — heading + paragraph split, wide image below */
export default function EsgZld() {
  return (
    <section className="bg-background px-4 sm:px-8 py-10 sm:py-14 lg:py-[4rem]">
      <div className="mx-auto flex w-full max-w-[61rem] flex-col gap-8 lg:gap-10">
        <hr className="border-0 border-t border-gray-200" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <h2 className="font-archivo-black uppercase text-neutral-900 text-2xl sm:text-[1.875rem] leading-tight lg:max-w-[21rem]">
            {esgZld.heading}
          </h2>
          <p className="font-neue-montreal text-base text-neutral-600 lg:max-w-[32rem]">
            {esgZld.paragraph}
          </p>
        </div>

        {/* Wide rounded image */}
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[1.5rem] bg-[#D9D9D9]">
          <Image
            src={esgZld.image}
            alt={esgZld.alt}
            fill
            sizes="(min-width: 1024px) 61rem, 100vw"
            className="object-cover"
            quality={90}
          />
        </div>

        <hr className="border-0 border-t border-gray-200" />
      </div>
    </section>
  );
}
