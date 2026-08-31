"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { certificationIntro } from "./esgData";

interface CertificationCard {
  label: string;
  src: string;
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

export default function EsgCertifications() {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>([]);
  const [initialized, setInitialized] = useState(false);

  /* Measure stacked offsets (relative to last tile) after grid renders */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || grid.children.length === 0) return;
    const tiles = Array.from(grid.children) as HTMLElement[];
    const anchor = tiles[tiles.length - 1];
    const a = anchor.getBoundingClientRect();
    setOffsets(tiles.map((t) => {
      const r = t.getBoundingClientRect();
      return { x: a.left - r.left, y: a.top - r.top };
    }));
    setInitialized(true);
  }, []);

  /* Scatter / stack when section scrolls in / out of view */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50 py-6 sm:py-12 lg:py-[4.8rem] my-4 sm:my-[2rem]">
      <div className="flex min-h-0 flex-1 flex-col justify-between lg:flex-row px-4 sm:px-8 lg:px-[5rem] gap-8 sm:gap-0">
        {/* Left copy */}
        <div className="w-full shrink-0 self-start lg:w-[34%]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="font-neue-montreal text-xs sm:text-base font-medium tracking-widest text-neutral-800 uppercase">
              Certification
            </span>
            <span aria-hidden className="h-1 sm:h-1.5 w-1 sm:w-1.5 bg-neutral-800" />
          </div>

          <h2 className="mt-2 sm:mt-4 font-serif text-[1.5rem] sm:text-[4rem] leading-8 sm:leading-[1] font-normal text-neutral-800">
            Certifications and
            <br />
            Compliance
          </h2>

          <div className="flex flex-col gap-2 lg:gap-6 mb-4 sm:mb-0">
            {/* Truncatable paragraph */}
            <div
              className="mt-4 sm:mt-8 overflow-hidden lg:overflow-visible transition-[max-height] duration-700 ease-in-out"
              style={{ maxHeight: expanded ? "100rem" : "4.8em" }}
            >
              <p className={`text-sm sm:text-base sm:text-xl leading-[1.6] tracking-wide text-neutral-600 line-clamp-animate ${expanded ? "clamp-expanded" : "clamp-collapsed"}`}>
                {certificationIntro}
              </p>
            </div>

            {/* Gradient "Read more" — inline below truncated text */}
            {!expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="gradient-text-showmore group ml-auto flex lg:hidden cursor-pointer items-center gap-1.5 tracking-wider text-sm sm:text-[0.95rem] font-medium"
              >
                <span className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:origin-right after:bg-[var(--primary-gradient)] after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-left">
                  Read more
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&#8594;</span>
              </button>
            )}

            {/* "Show less" — inline below full text when expanded */}
            {expanded && (
              <button
                onClick={() => setExpanded(false)}
                className="gradient-text-showmore group ml-auto flex lg:hidden cursor-pointer items-center gap-1.5 tracking-wider text-sm sm:text-[0.95rem] font-medium"
              >
                <span className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:origin-right after:bg-[var(--primary-gradient)] after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-left">
                  Show less
                </span>
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5">&#8593;</span>
              </button>
            )}
          </div>
        </div>

        {/* Right — staggered certification logo grid */}
        <div
          ref={gridRef}
          className="grid w-full max-w-[75rem] grid-cols-5 gap-1 sm:gap-3 lg:gap-5.5 self-end"
        >
          {certifications.map((cert, i) => (
            <div
              key={cert.label}
              className={`flex aspect-square items-center justify-center bg-white p-1 sm:p-3 lg:p-5 ${
                cert.colStart ?? ""
              }`}
              style={{
                transform: initialized && !visible && offsets[i]
                  ? `translate(${offsets[i].x}px, ${offsets[i].y}px)`
                  : undefined,
                opacity: initialized && !visible && offsets.length ? 0 : 1,
                transition: initialized
                  ? "transform 1.3s cubic-bezier(.4,0,.2,1), opacity 1.3s cubic-bezier(.4,0,.2,1)"
                  : "none",
              }}
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
