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

      {/* Centered content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[61rem] flex-col items-center gap-2 px-4 py-20 text-center sm:py-28 lg:py-[7rem]">
        <h2 className="font-archivo-black text-white text-3xl sm:text-[2.5rem] lg:text-[3rem] leading-tight">
          {esgWater.heading}
        </h2>
        <p className="font-archivo-black text-white text-[3rem] sm:text-[3.5rem] lg:text-[4.375rem] leading-none">
          {esgWater.value}
        </p>
        <p className="max-w-[36rem] pt-1 font-neue-montreal text-base lg:text-lg text-white/85">
          {esgWater.caption}
        </p>
      </div>
    </section>
  );
}
