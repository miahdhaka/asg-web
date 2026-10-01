import Image from "next/image";
import { esgRecognition } from "./esgData";

/* Recognized for Quality & Sustainability — certification logo tiles */
export default function EsgRecognition() {
  return (
    <section className="bg-background px-4 sm:px-8 py-10 sm:py-14 lg:py-[4rem]">
      <div className="mx-auto flex w-full max-w-[61rem] flex-col gap-8 lg:gap-10">
        <h2 className="font-archivo-black uppercase text-neutral-900 text-2xl sm:text-[1.875rem] lg:text-[2.25rem] leading-tight">
          {esgRecognition.heading}
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {esgRecognition.logos.map((logo) => (
            <div
              key={logo.label}
              className="flex aspect-[3/2] items-center justify-center rounded-[1rem] border border-gray-200 bg-white p-4 sm:p-6"
            >
              <Image
                src={logo.src}
                alt={logo.label}
                width={140}
                height={140}
                quality={90}
                className="pointer-events-none max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
