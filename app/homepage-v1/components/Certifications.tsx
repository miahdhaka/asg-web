"use client";

import Image from "next/image";

interface CertificationCard {
  label: string;
  src: string;
  /** Full literal class so Tailwind can detect it (5-col grid offsets).
      Applied at every breakpoint: mobile renders the same staggered
      5-column layout as desktop. */
  colStart?: "col-start-1" | "col-start-2" | "col-start-3" | "col-start-4";
}

// Certification logo tiles rendered from /public/images/certification/.
// Rows are right-aligned and grow leftward: 2 cards, then 4, then 5.
const certifications: CertificationCard[] = [
  // Row 1 — starts at column 4
  { label: "Cotton Made in Africa", src: "/images/certification/certificate1.png", colStart: "col-start-4" },
  { label: "BSCI", src: "/images/certification/certificate2.png" },
  // Row 2 — starts at column 2
  { label: "Cotton USA", src: "/images/certification/certificate-3.png", colStart: "col-start-2" },
  { label: "Regenerated Cellulosics", src: "/images/certification/certificate4.png" },
  { label: "Higg Index", src: "/images/certification/certificate5.png" },
  { label: "BCI", src: "/images/certification/certificate6.png" },
  // Row 3 — starts at column 1
  { label: "GOTS", src: "/images/certification/certificate7.png", colStart: "col-start-1" },
  { label: "OEKO-TEX Standard 100", src: "/images/certification/certificate8.png" },
  { label: "Organic 100", src: "/images/certification/certificate-9.png" },
  { label: "Claim Standard", src: "/images/certification/certificate-10.png" },
  { label: "USGBC", src: "/images/certification/certificate-11.png" },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative flex w-full flex-col overflow-hidden bg-[#f5f4ef] py-8 lg:py-16 h-[calc(var(--vh)-var(--header-height))] lg:h-[calc(100vh-var(--header-height))]"
    >
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row justify-between px-4 lg:px-20">
        {/* Left copy — pinned to the top of the section */}
        <div className="w-full lg:w-[34%] shrink-0 self-start lg:mt-2 lg:mb-0">
          {/* Eyebrow — drops in together with the title below */}
          <div id="certifications-eyebrow" className="flex items-center gap-3">
            <span className="font-neue-montreal text-sm lg:text-base font-medium tracking-widest text-neutral-800 uppercase">
              Certification
            </span>
            <span aria-hidden className="h-1.5 w-1.5 bg-neutral-800" />
          </div>

          {/* Title — drops in from above via the Hero's fade-chain reveal */}
          <h2
            id="certifications-title"
            className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[4rem] leading-[1] font-normal text-neutral-800"
          >
            Certifications and
            <br />
            Compliance
          </h2>

          {/* Description — hidden on ultra-narrow phones (<400px) where the
              fixed one-screen height can't hold copy + stats + grid without
              clipping the certification logos at the bottom */}
          <p className="mt-4 lg:mt-8 text-sm sm:text-base lg:text-xl leading-[1.6] tracking-wide text-neutral-600 max-[400px]:hidden">
            Amanat Shah Group (ASG) is committed to Environmental, Social, and Governance (ESG) principles, advancing a sustainable uture through renewable energy. By investing in 7MW solar power, ASG aims to reduce its carbon footprint, enhance energy efficiency, and foster eco-friendly practices across its operations.
          </p>
        </div>

        {/* Mobile-only stat strip — occupies the middle band between the
            copy and the cert grid on phones (the section is a fixed
            viewport height, so short mobile content left a big empty band).
            Box-less editorial layout: gradient numerals split by short
            hairline dividers, vertically centred inside a flex-1 band so
            the leftover space is shared evenly above and below it — no
            single oversized gap. Desktop keeps its side-by-side layout,
            so this stays lg:hidden. */}
        <div className="flex min-h-0 flex-1 w-full items-center lg:hidden">
          {[
            { value: "11+", label: "Global Certifications" },
            { value: "7MW", label: "Solar Power" },
            { value: "130+", label: "Years of Legacy" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-1 flex-col items-center justify-center gap-2 px-1 text-center ${
                index > 0 ? "border-l border-neutral-800/15 self-center h-16" : ""
              }`}
            >
              <span className="font-serif text-3xl sm:text-3xl leading-none bg-[image:var(--primary-gradient)] bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="font-neue-montreal text-[0.7rem] sm:text-xs uppercase tracking-widest text-neutral-600">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right — staggered logo grid, pinned to the bottom of the section.
            The id lets the hero's scroll orchestrator scatter the tiles out
            of the bottom-right corner during the 8th-scroll fade. */}
        <div
          id="cert-grid"
          className="grid w-full max-w-[75rem] grid-cols-5 gap-1 sm:gap-3 lg:gap-5.5 self-end pb-[10%] sm:pb-0"
        >
          {certifications.map((cert) => (
            <div
              key={cert.label}
              className={`flex aspect-square items-center justify-center bg-white p-1 sm:p-3 lg:p-5 ${
                cert.colStart ?? ""
              }`}
            >
              <Image
                src={cert.src}
                alt={cert.label}
                width={160}
                height={160}
                quality={90}
                draggable={false}
                className="pointer-events-none max-h-[70%] max-w-[80%] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
