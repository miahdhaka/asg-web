import Image from "next/image";
import { certificationIntro } from "./esgData";

export default function EsgCertifications() {
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col gap-10 px-4 py-12 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-x-6 lg:px-[3.75rem] lg:py-[3.75rem]">
        {/* Left copy */}
        <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[27.75rem] lg:gap-y-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-3.5">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-800">
              Certification
            </span>
            <span aria-hidden className="size-1 bg-black" />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="font-test-tiempos-fine text-3xl leading-[1.2] text-neutral-800 lg:text-5xl lg:leading-[3rem]">
              Certifications and Compliance
            </h2>
            <p className="text-base leading-[1.5rem] text-neutral-800">
              {certificationIntro}
            </p>
          </div>
        </div>

        {/* Right — certification badge grid */}
        <Image
          src="/images/sustainability/esg/badges.svg"
          alt="ASG international certifications — Cotton USA, Higg Index, BCI, GOTS, OEKO-TEX and more"
          width={899}
          height={530}
          quality={100}
          draggable={false}
          className="pointer-events-none w-full lg:w-[56.1875rem]"
        />
      </div>
    </section>
  );
}
