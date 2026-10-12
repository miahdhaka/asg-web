import Image from "next/image";
import { weCommunity } from "./weData";

/* Community & Supply Chain — large rounded banner with a bottom legibility
   gradient; caption column left, body text right, anchored bottom (Figma
   7740:50670 / 7740:50673) */
export default function WeCommunity() {
  return (
    <section className="px-4 sm:px-8 lg:px-0 pt-8 sm:pt-12 lg:pt-[5rem] pb-8 sm:pb-12 lg:pb-[5rem]">
      <div className="mx-auto w-full max-w-[80rem]">
        <hr className="border-0 border-t border-gray-200 pt-8 sm:pt-12 lg:pt-[5rem]" />

        <div className="relative overflow-hidden rounded-3xl bg-white">
          {/* Image — 3:2 on mobile, wide banner on desktop */}
          <div className="relative aspect-[3/2] w-full sm:aspect-[2/1]">
            <Image
              src={weCommunity.image}
              alt={weCommunity.alt}
              fill
              sizes="(min-width: 1024px) 1057px, 100vw"
              className="object-cover"
              quality={90}
            />

            {/* Bottom legibility gradient */}
            <div aria-hidden className="overlay-linear-subtle absolute inset-0" />
          </div>

          {/* Caption — below the image on mobile (dark text), overlaid on desktop (white) */}
          <div className="flex flex-col gap-1.5 sm:gap-3 p-6 text-neutral-800 sm:p-14 lg:absolute lg:inset-x-0 lg:bottom-0 lg:flex-row lg:items-end lg:justify-between lg:text-white">
            <div className="flex flex-col gap-1.5 sm:gap-3">
              <p className="text-sm font-medium text-neutral-800 tracking-wide lg:text-lg">
                {weCommunity.label}
              </p>
              <h2 className="font-archivo-black text-[1.125rem] leading-[1.3] sm:text-[2.5rem] sm:leading-[1.1] lg:text-[2.8rem] lg:leading-[3.25rem]">
                {weCommunity.title}
              </h2>
            </div>
            <p className="max-w-[38rem] font-neue-montreal text-base leading-7 lg:text-lg lg:leading-8 mt-3 sm:mt-0">
              {weCommunity.body}
            </p>
          </div>
        </div>

        <hr className="border-0 border-t border-gray-200 mt-8 sm:mt-12 lg:mt-[5rem]" />
      </div>
    </section>
  );
}
