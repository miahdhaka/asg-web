import Image from "next/image";
import {
  introStatement,
  commitmentText,
  complianceCertificates,
} from "./esgData";

export default function EsgIntro() {
  return (
    <>
      {/* Intro statement */}
      <section className="px-4 sm:px-8 lg:px-[5rem] pt-10 lg:pt-[5rem]">
        <h2 className="max-w-[58.8rem] font-test-tiempos-fine text-xl lg:text-[2.5rem] leading-[1.5] lg:leading-[3rem] text-neutral-800">
          {introStatement}
        </h2>
      </section>

      {/* Commitment paragraph + compliance certificate swatches */}
      <section className="flex flex-col gap-6 px-4 sm:px-8 lg:px-0 py-10 lg:py-[3rem]">
        <div className="flex flex-col gap-6 lg:gap-8 w-full max-w-[63rem] mx-auto">
          <p className="text-justify text-[1.11rem] leading-[1.7rem] text-neutral-800">
            {commitmentText}
          </p>
          <div className="flex gap-4">
            {complianceCertificates.map((cert) => (
              <div
                key={cert.image}
                className="relative aspect-[182/245] w-full overflow-hidden"
              >
                <Image
                  src={cert.image}
                  alt={cert.label}
                  fill
                  sizes="(min-width: 1024px) 12vw, 25vw"
                  draggable={false}
                  className="pointer-events-none object-cover"
                  quality={90}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
