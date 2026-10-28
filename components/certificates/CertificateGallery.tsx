"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { certLogos } from "./certData";

// Reuse the homepage PDF preview (pdf.js canvas, page-by-page navigation).
const CertLightbox = dynamic(
  () => import("@/components/homepage/CertLightbox"),
  { ssr: false },
);

/* ------------------------------------------------------------------ */
/*  All-certificates grid. Flat cells (no card background) separated    */
/*  by the same gradient hairlines used on the homepage certification   */
/*  slider. Clicking a previewable cell opens the PDF lightbox.         */
/* ------------------------------------------------------------------ */

// Mobile shows one certificate per row (stacked top-to-bottom); 2 columns only
// from `md` up, 4 columns from `lg`.
const COLUMNS = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

// Gradient hairline edges. Each cell draws only its RIGHT and BOTTOM lines.
// Since cells sit flush, that gives a single line at every column seam (the
// left cell's right line) and a single line at every row seam (the upper
// cell's bottom line) — no doubled borders. The grid's outer top + left edges
// are closed once by the container lines below. Because the incomplete last
// row has no cell in its final column, that empty corner stays open (no right
// or bottom line drawn there).
function Hairlines() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[1.55px] opacity-45"
        style={{
          background:
            "linear-gradient(180deg, rgba(26, 161, 121, 0.75) 0%, rgba(26, 161, 121, 0.75) 50%, rgba(26, 161, 121, 0.08) 100%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.25px] opacity-45"
        style={{
          background:
            "linear-gradient(90deg, rgba(26, 161, 121, 0.75) 0%, rgba(26, 161, 121, 0.75) 50%, rgba(26, 161, 121, 0.08) 100%)",
        }}
      />
    </>
  );
}

export default function CertificateGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="relative">
        <div className={`grid ${COLUMNS}`}>
        {certLogos.map((cert, i) => {
          const previewable = Boolean(cert.pdf);
          return (
            <div
              key={cert.src}
              role={previewable ? "button" : undefined}
              tabIndex={previewable ? 0 : undefined}
              aria-label={previewable ? `View ${cert.label} certificate` : undefined}
              onClick={() => previewable && setActive(i)}
              onKeyDown={(e) => {
                if (!previewable) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(i);
                }
              }}
              className={`group relative flex flex-col items-center overflow-hidden px-6 pt-8 pb-6 sm:pt-9 ${
                previewable ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <Hairlines />

              {/* Centered logo — no backdrop, sits straight on the page bg */}
              <div className="relative flex h-32 w-full items-center justify-center sm:h-40">
                <Image
                  src={cert.src}
                  alt={cert.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  draggable={false}
                  className="pointer-events-none scale-100 object-contain transition-transform duration-300 group-hover:scale-110"
                  quality={90}
                  unoptimized={cert.src.endsWith(".svg")}
                />
              </div>

              {/* Caption under the logo */}
              <p className="mt-6 text-center font-neue-montreal text-[0.95rem] font-semibold leading-[1.4] text-[var(--neutral-700)] sm:text-base">
                {cert.label}
                {previewable && <span className="text-[var(--neutral-500)]"> (pdf)</span>}
              </p>
            </div>
          );
        })}
        </div>

        {/* Container line closes the grid's outer top edge (cells don't draw
            their own tops, so this stays a single line). */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[1.25px] opacity-45"
          style={{
            background:
              "linear-gradient(90deg, rgba(26, 161, 121, 0.08) 0%, rgba(26, 161, 121, 0.75) 50%, rgba(26, 161, 121, 0.75) 100%)",
          }}
        />
        {/* Container line closes the grid's outer left edge. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[1.55px] opacity-45"
          style={{
            background:
              "linear-gradient(180deg, rgba(26, 161, 121, 0.08) 0%, rgba(26, 161, 121, 0.75) 50%, rgba(26, 161, 121, 0.75) 100%)",
          }}
        />
      </div>

      {active !== null && certLogos[active].pdf && (
        <CertLightbox
          key={certLogos[active].pdf}
          pdfUrl={certLogos[active].pdf!}
          caption={certLogos[active].label}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
