import Image from "next/image";
import { csrEducationBanner } from "./csrData";

/* Education banner — 1056×528 rounded image (2:1) with a bottom-dark
   gradient and caption anchored 40px from the left/bottom (Figma 7740:50469) */
export default function CsrEducationBanner() {
  return (
    <section className="px-4 sm:px-8 lg:px-0 pt-10 lg:pt-[3.75rem]">
      <div className="relative mx-auto aspect-[2/1] w-full max-w-[66rem] overflow-hidden rounded-[1.5rem] bg-[#D9D9D9]">
        <Image
          src={csrEducationBanner.image}
          alt={csrEducationBanner.alt}
          fill
          sizes="(min-width: 1024px) 1056px, 100vw"
          className="object-cover"
          quality={90}
        />

        {/* Bottom legibility gradient */}
        <div aria-hidden className="overlay-linear-subtle absolute inset-0" />

        {/* Caption — 716px wide, bottom-left */}
        <div className="absolute bottom-6 left-6 right-6 z-10 flex max-w-[44.75rem] flex-col gap-2 sm:bottom-10 sm:left-10">
          <h2 className="font-archivo-black text-white text-lg sm:text-xl lg:text-[1.875rem] lg:leading-[2.25rem]">
            {csrEducationBanner.title}
          </h2>
          <p className="font-neue-montreal text-sm leading-5 text-white lg:leading-[1.25rem]">
            {csrEducationBanner.description}
          </p>
        </div>
      </div>
    </section>
  );
}
