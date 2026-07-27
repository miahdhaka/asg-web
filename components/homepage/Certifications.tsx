"use client";

import Image from "next/image";

interface CertificationCard {
  label: string;
  src: string;
  /** Full literal class so Tailwind can detect it (5-col grid offsets). */
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
      className="relative flex w-full flex-col overflow-hidden bg-[#f5f4ef] py-16"
      style={{ height: "calc(100vh - var(--header-height, 4.55rem))" }}
    >
      <div className="flex min-h-0 flex-1 justify-between px-20">
        {/* Left copy — pinned to the top of the section */}
        <div className="w-[34%] shrink-0 self-start mt-2">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="font-neue-montreal text-base font-medium tracking-widest text-neutral-800 uppercase">
              Certification
            </span>
            <span aria-hidden className="h-1.5 w-1.5 bg-neutral-800" />
          </div>

          {/* Title */}
          <h2 className="mt-3 font-serif text-[64px] leading-[1] font-normal text-neutral-800">
            Certifications and
            <br />
            Compliance
          </h2>

          {/* Description */}
          <p className="mt-8 text-xl leading-[1.6] tracking-wide text-neutral-600">
            Amanat Shah Group (ASG) is committed to Environmental, Social, and Governance (ESG) principles, advancing a sustainable uture through renewable energy. By investing in 7MW solar power, ASG aims to reduce its carbon footprint, enhance energy efficiency, and foster eco-friendly practices across its operations.
          </p>
        </div>

        {/* Right — staggered logo grid, pinned to the bottom of the section */}
        <div className="grid w-full max-w-[1200px] grid-cols-5 gap-5.5 self-end">
          {certifications.map((cert) => (
            <div
              key={cert.label}
              className={`flex aspect-square items-center justify-center bg-white p-5 ${
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
