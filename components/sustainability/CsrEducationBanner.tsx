import Image from "next/image";
import { csrEducationBanner } from "./csrData";

/* Education banner — full-width (matches CsrPeopleFirst max-w-[80rem]) image
   with a bottom-dark gradient and caption anchored bottom-left */
export default function CsrEducationBanner() {
  return (
    <section className="px-0 pt-0 sm:pt-10 lg:pt-[4.8rem] pb-0 sm:pb-10 lg:pb-[4.8rem]">
      <div className="relative mx-auto aspect-[4/3] w-full max-w-[80rem] overflow-hidden sm:aspect-[2/1] sm:rounded-[1.5rem] bg-[#D9D9D9]">
        <Image
          src={csrEducationBanner.image}
          alt={csrEducationBanner.alt}
          fill
          sizes="(min-width: 1024px) 1280px, 100vw"
          className="object-cover"
          quality={90}
        />

        {/* Bottom legibility gradient */}
        <div aria-hidden className="overlay-linear-subtle absolute inset-0" />

        {/* Caption — wider column, bottom-left */}
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-8 z-10 flex max-w-[56rem] flex-col gap-3 sm:bottom-12 sm:left-12 sm:gap-4">
          <h2 className="font-archivo-black text-white text-2xl lg:text-[2.5rem] lg:leading-[3rem]">
            {csrEducationBanner.title}
          </h2>
          <p className="font-neue-montreal text-sm leading-6 sm:text-lg sm:leading-7 lg:text-xl lg:leading-8 text-white tracking-wider">
            {csrEducationBanner.description}
          </p>
        </div>
      </div>
    </section>
  );
}
