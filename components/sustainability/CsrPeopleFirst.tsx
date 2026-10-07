import Image from "next/image";
import { csrPeopleFirst } from "./csrData";

/* People-First band — full-width white section, 634×423 image left,
   narrow text column right (Figma node 7740:50504–7740:50508) */
export default function CsrPeopleFirst() {
  return (
    <section className="bg-white px-4 sm:px-8 py-10 lg:py-[3.75rem]">
      <div className="mx-auto flex w-full max-w-[66rem] flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-[6.75rem]">
        {/* Photo — 634×423, 16px radius */}
        <div className="relative aspect-[634/423] w-full overflow-hidden rounded-2xl bg-[#D9D9D9] lg:w-[39.625rem] lg:shrink-0">
          <Image
            src={csrPeopleFirst.image}
            alt={csrPeopleFirst.alt}
            fill
            sizes="(min-width: 1024px) 634px, 100vw"
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Text column — 312px wide */}
        <div className="flex w-full flex-col gap-3 lg:max-w-[19.5rem]">
          <h2 className="font-archivo-black text-[#1A1A1A] text-xl sm:text-2xl lg:text-[2.25rem] lg:leading-[2.625rem]">
            {csrPeopleFirst.title}
          </h2>
          <p className="font-neue-montreal text-sm leading-5 sm:text-base sm:leading-6 text-[#1A1A1A]">
            {csrPeopleFirst.description}
          </p>
        </div>
      </div>
    </section>
  );
}
