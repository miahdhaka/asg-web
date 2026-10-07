import Image from "next/image";
import { csrCommunityImpact } from "./csrData";

/* Community impact — 801×452 rounded image with a white caption card
   overlapping its bottom edge by 43px (Figma node 7740:50498 / 7740:50499) */
export default function CsrCommunityImpact() {
  return (
    <section className="px-4 sm:px-8 lg:px-0 pt-8 lg:pt-[3.75rem] pb-10 lg:pb-[3.75rem]">
      <div className="mx-auto w-full max-w-[50.05rem]">
        {/* Wide rounded image */}
        <div className="relative aspect-[801/452] w-full overflow-hidden rounded-2xl bg-[#D9D9D9]">
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
        <div className="relative z-10 mx-auto -mt-[43px] w-full max-w-[42.75rem] rounded-xl bg-white px-6 py-8 sm:px-12 lg:py-[1.5625rem]">
          <div className="flex flex-col gap-3">
            <h2 className="font-archivo-black text-[#1A1A1A] text-lg sm:text-xl lg:text-[1.875rem] lg:leading-[2.25rem]">
              {csrCommunityImpact.title}
            </h2>
            <p className="font-neue-montreal text-sm leading-5 sm:text-base sm:leading-6 text-[#1A1A1A]">
              {csrCommunityImpact.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
