import Image from "next/image";
import { esgRenewable } from "./esgData";

/* Renewable Infrastructure — centered heading, inline stat numbers, wide image */
export default function EsgRenewable() {
  return (
    <section className="bg-background px-4 sm:px-8 py-10 sm:py-14 lg:py-[5rem]">
      <div className="mx-auto flex w-full max-w-[61rem] flex-col items-center gap-2">
        <h2 className="text-center font-archivo-black text-neutral-800 text-2xl sm:text-[2rem] lg:text-[2.5rem] leading-tight">
          {esgRenewable.heading}
        </h2>

        {/* Stat numbers — big values with small captions wrapped around them */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-14">
          {esgRenewable.stats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left"
            >
              {stat.prefix && (
                <span className="font-neue-montreal text-lg text-neutral-500">
                  {stat.prefix}
                </span>
              )}
              <span className="font-archivo-black text-neutral-900 text-[3.5rem] lg:text-[4.25rem] leading-none">
                {stat.value}
              </span>
              <span className="font-neue-montreal text-base text-neutral-500">
                {stat.suffix}
              </span>
            </div>
          ))}
        </div>

        <p className="max-w-[36rem] text-center font-neue-montreal text-xl text-neutral-600">
          {esgRenewable.caption}
        </p>

        {/* Wide rounded image */}
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[1.5rem] bg-[#D9D9D9]">
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
