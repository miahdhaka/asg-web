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
      <section className="px-4 pt-10 sm:px-8 lg:px-[3.75rem] lg:pt-[3.75rem]">
        <h2 className="max-w-[44.1875rem] font-test-tiempos-fine text-xl leading-[1.5] text-neutral-800 lg:text-[1.875rem] lg:leading-[2.25rem]">
          {introStatement}
        </h2>
      </section>

      {/* Commitment paragraph + compliance certificate swatches */}
      <section className="flex flex-col gap-6 px-4 py-10 sm:px-8 lg:px-0 lg:py-[3.75rem]">
        <div className="mx-auto flex w-full max-w-[47.8125rem] flex-col gap-6">
          <p className="text-justify text-sm leading-[1.25rem] text-neutral-800">
            {commitmentText}
          </p>
          <div className="flex gap-3">
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
