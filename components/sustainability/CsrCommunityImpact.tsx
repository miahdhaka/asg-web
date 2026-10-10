import Image from "next/image";
import { csrCommunityImpact } from "./csrData";

/* Community impact — 801×452 rounded image with a white caption card
   overlapping its bottom edge by 43px (Figma node 7740:50498 / 7740:50499) */
export default function CsrCommunityImpact() {
  return (
    <section className="px-4 sm:px-8 lg:px-0 pt-10 lg:pt-[5rem] pb-10 lg:pb-[4.8rem]">
      <div className="mx-auto w-full max-w-[68rem]">
        {/* Wide rounded image */}
        <div className="relative aspect-[6/4] w-full overflow-hidden rounded-2xl bg-[#D9D9D9] lg:aspect-[801/452]">
          <Image
            src={csrCommunityImpact.image}
            alt={csrCommunityImpact.alt}
            fill
            sizes="(min-width: 1024px) 801px, 100vw"
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Overlapping caption card — 684px wide, 12px radius */}
        <div className="md:relative z-10 mx-auto -mt-[30px] md:-mt-[55px] w-full max-w-[58rem] rounded-xl bg-white px-6 py-6 sm:px-16 lg:py-[2.25rem]">
          <div className="flex flex-col gap-3 mt-8">
            <h2 className="font-archivo-black text-[#1A1A1A] text-2xl lg:text-[2.5rem] lg:leading-[2.5rem] mb-2">
              {csrCommunityImpact.title}
            </h2>
            <p className="text-base leading-6 sm:text-lg sm:leading-7 lg:text-[21px] lg:leading-[2rem] text-[#1A1A1A] tracking-wider">
              {csrCommunityImpact.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
