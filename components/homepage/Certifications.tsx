"use client";

interface CertificationCard {
  label: string;
  className: string;
  /** Full literal class so Tailwind can detect it (5-col grid offsets). */
  colStart?: "col-start-1" | "col-start-2" | "col-start-3" | "col-start-4";
}

// Certification logo tiles — swap the styled text for <Image> once logo
// assets land in /public/images/certifications/.
// Rows are right-aligned and grow leftward: 2 cards, then 4, then 5.
const certifications: CertificationCard[] = [
  // Row 1 — starts at column 4
  { label: "Cotton Made in Africa", className: "text-sm font-semibold uppercase", colStart: "col-start-4" },
  { label: "BSCI", className: "text-2xl font-bold text-green-700" },
  // Row 2 — starts at column 2
  { label: "Cotton USA", className: "text-lg font-medium text-sky-700", colStart: "col-start-2" },
  { label: "Regenerated Cellulosics", className: "text-sm font-semibold text-green-700" },
  { label: "Higg Index", className: "text-xl font-bold" },
  { label: "BCI", className: "text-2xl font-bold text-lime-600" },
  // Row 3 — starts at column 1
  { label: "GOTS", className: "text-xl font-bold text-green-700", colStart: "col-start-1" },
  { label: "OEKO-TEX Standard 100", className: "text-sm font-semibold text-amber-600" },
  { label: "Organic 100", className: "text-lg font-bold text-green-700" },
  { label: "Claim Standard", className: "text-base font-semibold text-teal-600" },
  { label: "USGBC", className: "text-lg font-bold text-amber-500" },
];

export default function Certifications() {
  return (
    <section className="relative flex h-screen w-full flex-col justify-end overflow-hidden bg-[#f5f4ef]">
      <div className="flex items-start justify-between gap-8 px-20">
        {/* Left copy — top-aligned with the first card row */}
        <div className="w-[24%] shrink-0">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="font-neue-montreal text-xs font-medium tracking-[0.25em] text-neutral-800 uppercase">
              Certification
            </span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-neutral-800" />
          </div>

          {/* Title */}
          <h2 className="mt-3 font-serif text-[44px] leading-[1.2] font-normal text-neutral-800">
            Certifications and
            <br />
            Compliance
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-[420px] text-[15px] leading-[1.65] tracking-wide text-neutral-600">
            Amanat Shah Group (ASG) is committed to Environmental, Social, and
            Governance (ESG) principles, advancing a sustainable future through
            renewable energy. By investing in 7MW solar power, ASG aims to
            reduce its carbon footprint, enhance energy efficiency, and foster
            eco-friendly practices across its operations.
          </p>
        </div>

        {/* Right — staggered logo grid, right-aligned rows growing leftward */}
        <div className="grid w-full max-w-[1100px] grid-cols-5 gap-3.5">
          {certifications.map((cert) => (
            <div
              key={cert.label}
              className={`flex aspect-square items-center justify-center bg-white p-5 ${
                cert.colStart ?? ""
              }`}
            >
              <span
                className={`text-center font-sans leading-tight ${cert.className}`}
              >
                {cert.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
