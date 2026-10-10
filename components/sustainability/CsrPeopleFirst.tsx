import Image from "next/image";
import { csrPeopleFirst } from "./csrData";

/* People-First band — full-width white section, 634×423 image left,
   narrow text column right (Figma node 7740:50504–7740:50508) */
export default function CsrPeopleFirst() {
  return (
    <section className="bg-white px-4 sm:px-8 lg:px-0 py-10 lg:py-[4.8rem]">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-[5rem]">
        {/* Photo — 634×423, 16px radius. Below the text on mobile, left on desktop */}
        <div className="relative order-2 aspect-[634/423] w-full overflow-hidden rounded-2xl bg-[#D9D9D9] lg:order-1 lg:w-[50rem] lg:shrink-0">
          <Image
            src={csrPeopleFirst.image}
            alt={csrPeopleFirst.alt}
            fill
            sizes="(min-width: 1024px) 634px, 100vw"
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Text column — above the photo on mobile, right on desktop */}
        <div className="order-1 flex w-full flex-col gap-3 lg:order-2 lg:max-w-[26rem] lg:shrink-0">
          <h2 className="font-archivo-black text-[#1A1A1A] text-xl sm:text-[1.75rem] lg:text-[2.85rem] lg:leading-[3.125rem] max-w-[14rem] sm:max-w-full">
            {csrPeopleFirst.title}
          </h2>
          <p className="text-[17px] lg:text-[21px] leading-6 lg:leading-[2rem] text-[#1A1A1A] tracking-wide">
            {csrPeopleFirst.description}
          </p>
        </div>
      </div>
    </section>
  );
}
