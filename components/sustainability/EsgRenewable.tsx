import Image from "next/image";
import { esgRenewable } from "./esgData";

/* Renewable Infrastructure — mobile left-aligned, tablet/desktop centered */
export default function EsgRenewable() {
  return (
    <section className="bg-background px-4 sm:px-8 py-10 sm:py-14 lg:py-[5rem]">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col items-stretch gap-2 sm:items-center">
        <h2 className="text-left font-archivo-black text-neutral-800 text-2xl sm:text-center sm:text-[2rem] lg:text-[2.5rem] leading-tight">
          {esgRenewable.heading}
        </h2>

        {/* Stat numbers — big values with small captions wrapped around them */}
        <div className="flex flex-row items-end justify-start gap-10 sm:justify-center sm:gap-14">
          {esgRenewable.stats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-start gap-1 text-left"
            >
              {stat.prefix && (
                <span className="font-neue-montreal text-lg text-neutral-500">
                  {stat.prefix}
                </span>
              )}
              <span className="font-archivo-black text-neutral-900 text-[2.25rem] sm:text-[3.5rem] lg:text-[4.2rem] leading-none">
                {stat.value}
              </span>
              <span className="font-neue-montreal text-base text-neutral-500">
                {stat.suffix}
              </span>
            </div>
          ))}
        </div>

        <p className="text-left font-neue-montreal text-base text-neutral-600 sm:max-w-[36rem] sm:text-center sm:text-xl">
          {esgRenewable.caption}
        </p>

        {/* Wide rounded image */}
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[1rem] bg-[#D9D9D9] mt-4 sm:mt-6 sm:aspect-[2/1] sm:rounded-[1.5rem]">
          <Image
            src={esgRenewable.image}
            alt={esgRenewable.alt}
            fill
            sizes="(min-width: 1024px) 61rem, 100vw"
            className="object-cover"
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}
