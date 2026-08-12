import Image from "next/image";
import { certificationIntro } from "./esgData";

export default function EsgCertifications() {
  return (
    <section className="bg-gray-50 py-12 lg:py-[4.8rem] my-[2rem]">
      <div className="flex min-h-0 flex-1 flex-col justify-between lg:flex-row px-4 sm:px-8 lg:px-[5rem]">
        {/* Left copy */}
        <div className="w-full shrink-0 self-start lg:w-[34%]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="font-neue-montreal text-base font-medium tracking-widest text-neutral-800 uppercase">
              Certification
            </span>
            <span aria-hidden className="h-1.5 w-1.5 bg-neutral-800" />
          </div>

          <h2 className="mt-3 font-serif text-[4rem] leading-[1] font-normal text-neutral-800">
            Certifications and
            <br />
            Compliance
          </h2>

          <p className="mt-8 text-xl leading-[1.6] tracking-wide text-neutral-600">
            {certificationIntro}
          </p>
        </div>

        {/* Right — certification badge grid */}
        <Image
          src="/images/sustainability/esg/badges.svg"
          alt="ASG international certifications — Cotton USA, Higg Index, BCI, GOTS, OEKO-TEX and more"
          width={1180}
          height={700}
          quality={100}
          draggable={false}
          className="pointer-events-none w-full self-end lg:max-w-[78rem]"
        />
      </div>
    </section>
  );
}
