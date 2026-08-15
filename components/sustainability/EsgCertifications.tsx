"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { certificationIntro } from "./esgData";

/* Badge top-left positions in the 899×530 source SVG */
const BADGE_POSITIONS = [
  { x: 549, y: 0 },
  { x: 732, y: 0 },
  { x: 183, y: 182 },
  { x: 366, y: 182 },
  { x: 549, y: 182 },
  { x: 732, y: 182 },
  { x: 0, y: 364 },
  { x: 183, y: 364 },
  { x: 366, y: 364 },
];
const SVG_W = 899;
const SVG_H = 530;
const BADGE_W = 167;
const BADGE_H = 166;
const VISIBLE = 3.5;
const SPEED = 30; // px/sec

export default function EsgCertifications() {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);
  const pauseUntilRef = useRef(0);
  const [dims, setDims] = useState<{
    slideW: number;
    slideH: number;
    svgW: number;
    svgH: number;
    positions: { x: number; y: number }[];
  } | null>(null);

  /* Measure container & compute badge dimensions */
  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const cw = el.offsetWidth;
    if (cw === 0) return;
    const slideW = cw / VISIBLE;
    const scale = slideW / BADGE_W;
    const slideH = slideW * (BADGE_H / BADGE_W);
    setDims({
      slideW,
      slideH,
      svgW: SVG_W * scale,
      svgH: SVG_H * scale,
      positions: BADGE_POSITIONS.map((b) => ({
        x: -(b.x * scale),
        y: -(b.y * scale),
      })),
    });
  }, []);

  /* rAF-based continuous animation (no React re-renders) */
  useEffect(() => {
    if (!dims) return;
    const track = trackRef.current;
    if (!track) return;

    const animate = (time: number) => {
      if (lastTimeRef.current && !isDragging.current && time > pauseUntilRef.current) {
        const dt = (time - lastTimeRef.current) / 1000;
        posRef.current -= SPEED * dt;
        if (posRef.current <= -dims.slideW) {
          posRef.current += dims.slideW;
        }
      }
      lastTimeRef.current = time;
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dims]);

  /* Pointer drag */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!dims) return;
      isDragging.current = true;
      dragStartX.current = e.clientX;
      dragDelta.current = 0;
      lastTimeRef.current = 0;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [dims],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      dragDelta.current = e.clientX - dragStartX.current;
      posRef.current = posRef.current + dragDelta.current;
      dragStartX.current = e.clientX;
      dragDelta.current = 0;
      const track = trackRef.current;
      if (track) track.style.transform = `translateX(${posRef.current}px)`;
    },
    [],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    lastTimeRef.current = 0;
    pauseUntilRef.current = performance.now() + 3000;
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  /* Build 2× badge set for seamless loop */
  const allPositions = dims ? [...dims.positions, ...dims.positions] : [];

  return (
    <section className="bg-gray-50 py-6 sm:py-12 lg:py-[4.8rem] my-4 sm:my-[2rem]">
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

          <h2 className="mt-4 font-serif text-[1.5rem] sm:text-[4rem] leading-8 sm:leading-[1] font-normal text-neutral-800">
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

        {/* Right — certification badge grid (desktop only) */}
        <Image
          src="/images/sustainability/esg/badges.svg"
          alt="ASG international certifications — Cotton USA, Higg Index, BCI, GOTS, OEKO-TEX and more"
          width={1180}
          height={700}
          quality={100}
          draggable={false}
          className="pointer-events-none hidden lg:block w-full self-end lg:max-w-[78rem]"
        />
      </div>

      {/* Mobile: continuous auto-scrolling badge carousel */}
      <div
        ref={containerRef}
        className="lg:hidden w-full overflow-hidden px-4 sm:px-8 cursor-grab active:cursor-grabbing select-none"
        style={{ minHeight: dims ? undefined : "6rem" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {dims && (
          <div ref={trackRef} className="flex will-change-transform">
            {allPositions.map((pos, i) => (
              <div
                key={i}
                className="shrink-0"
                style={{
                  width: dims.slideW,
                  height: dims.slideH,
                  backgroundImage: `url(/images/sustainability/esg/badges.svg)`,
                  backgroundSize: `${dims.svgW}px ${dims.svgH}px`,
                  backgroundPosition: `${pos.x}px ${pos.y}px`,
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
