import Image from "next/image";
import type { WeFeature } from "./weData";

interface WeFeatureCardProps {
  data: WeFeature;
  /** Which corner the white caption card overlaps on desktop. */
  side: "left" | "right";
  /** Render a thin top divider line above the block. */
  divider?: boolean;
}

/* Rounded full-width image with a white caption card overlapping one corner
   (Figma 7740:50653 wellbeing card-right / 7740:54615 capacity card-left) */
export default function WeFeatureCard({ data, side, divider }: WeFeatureCardProps) {
  return (
    <section className="px-4 sm:px-8 lg:px-0 pt-8 sm:pt-12 lg:pt-[5rem]">
      <div className="mx-auto w-full max-w-[80rem]">
        {divider && (
          <hr className="border-0 border-t border-gray-200 mb-8 sm:mb-12 lg:mb-[5rem]" />
        )}

        <div className="relative overflow-hidden rounded-3xl bg-[#D9D9D9]">
          {/* Image */}
          <div className="relative aspect-[3/2] w-full lg:aspect-[1055/440]">
            <Image
              src={data.image}
              alt={data.alt}
              fill
              sizes="(min-width: 1024px) 1055px, 100vw"
              className="object-cover"
              quality={90}
            />
          </div>

          {/* Caption card — static below the image on mobile, overlapping the
              chosen corner on desktop */}
          <div
            className={`bg-white p-6 sm:p-[4rem] lg:absolute lg:bottom-8 lg:top-8 lg:m-0 lg:w-[48%] lg:rounded-2xl ${
              side === "left" ? "lg:left-8" : "lg:right-8"
            }`}
          >
            <div className="flex h-full flex-col justify-center gap-1.5 sm:gap-3">
              <p className="text-sm font-medium text-neutral-800 tracking-wide lg:text-lg">
                {data.label}
              </p>
              <h2 className="font-archivo-black text-[#1A1A1A] text-[1.125rem] leading-[1.3] sm:text-[2.375rem] sm:leading-[1.15] lg:text-[3rem] lg:leading-[3.25rem] max-w-none sm:max-w-[70%]">
                {data.title}
              </h2>
              <p className="font-neue-montreal text-base leading-7 text-[#1A1A1A] lg:text-xl lg:leading-8 mt-3 sm:mt-0">
                {data.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
