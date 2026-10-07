import Image from "next/image";
import { esgWater } from "./esgData";

/* Water Conservation — full-bleed dark band over a background image */
export default function EsgWater() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <Image
        src={esgWater.image}
        alt={esgWater.alt}
        fill
        sizes="100vw"
        className="object-cover"
        quality={85}
      />
      {/* Dark legibility overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(12,12,12,0.85) 0%, rgba(12,12,12,0.55) 50%, rgba(12,12,12,0.7) 100%)",
        }}
      />

      {/* Content — mobile left-aligned compact band, tablet/desktop centered */}
      <div className="relative z-10 mx-auto flex w-full max-w-[61rem] flex-col items-start gap-2 px-4 py-24 text-left sm:items-center sm:py-72 sm:text-center lg:py-[16.5rem]">
        <h2 className="font-archivo-black text-white text-[1.5rem] leading-tight sm:text-[3.25rem] lg:text-[4rem]">
          {esgWater.heading}
        </h2>
        <p className="font-archivo-black text-white text-[2.25rem] leading-none sm:text-[5rem] lg:text-[6rem]">
          {esgWater.value}
        </p>
        <p className="max-w-[36rem] pt-1 font-neue-montreal text-lg text-white/85 lg:text-2xl">
          {esgWater.caption}
        </p>
      </div>
    </section>
  );
}
