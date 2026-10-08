import Image from "next/image";
import { csrPeopleFirst } from "./csrData";

/* People-First band — full-width white section, 634×423 image left,
   narrow text column right (Figma node 7740:50504–7740:50508) */
export default function CsrPeopleFirst() {
  return (
    <section className="bg-white px-4 sm:px-8 lg:px-0 py-10 lg:py-[3.75rem]">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-[2rem]">
        {/* Photo — 634×423, 16px radius */}
        <div className="relative aspect-[634/423] w-full overflow-hidden rounded-2xl bg-[#D9D9D9] lg:w-[50rem] lg:shrink-0">
          <Image
            src={csrPeopleFirst.image}
            alt={csrPeopleFirst.alt}
            fill
            sizes="(min-width: 1024px) 634px, 100vw"
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Text column */}
        <div className="flex w-full flex-col gap-3 lg:w-[28rem] lg:max-w-[28rem] lg:shrink-0">
          <h2 className="font-archivo-black text-[#1A1A1A] text-2xl sm:text-[1.75rem] lg:text-[2.75rem] lg:leading-[3.125rem]">
            {csrPeopleFirst.title}
          </h2>
          <p className="font-neue-montreal text-base leading-6 sm:text-lg sm:leading-7 lg:text-xl lg:leading-8 text-[#1A1A1A]">
            {csrPeopleFirst.description}
          </p>
        </div>
      </div>
    </section>
  );
}
