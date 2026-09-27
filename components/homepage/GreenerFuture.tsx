"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

interface GreenerFutureCard {
  label: string;
  description: string;
  image: string;
}

// Card copy + imagery mirror the Figma frame (node 6402-60764). Photos are
// reused from /public/images/sustainability/.
const cards: GreenerFutureCard[] = [
  {
    label: "Sustainability",
    description:
      "Growing toward greener manufacturing by optimizing Renewable Energy and Closed-loop Water Systems (CLWS)",
    image: "/images/sustainability/sustainability.webp",
  },
  {
    label: "Innovation",
    description:
      "Advancing future-ready fashion and industrialization through enriched technologies.",
    image: "/images/sustainability/innovation.webp",
  },
  {
    label: "Quality & Compliance",
    description:
      "End-to-end transparent production, operating entirely with international compliance-backed quality control at every step.",
    image: "/images/sustainability/quality-&-compliance.webp",
  },
  {
    label: "Social Business Commitment",
    description:
      "By optimizing raw material consumption and minimizing waste across our supply chain, we maximize output while reducing our overall environmental impact.",
    image: "/images/sustainability/social-business-commitment.webp",
  },
];

export default function GreenerFuture() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [fullyVisibleCards, setFullyVisibleCards] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setFullyVisibleCards((current) => {
          const next = new Set(current);
          let changed = false;

          entries.forEach((entry) => {
            const index = Number(
              (entry.target as HTMLElement).dataset.cardIndex,
            );
            const isFullyVisible = entry.intersectionRatio >= 0.995;

            if (isFullyVisible !== next.has(index)) {
              changed = true;
              if (isFullyVisible) next.add(index);
              else next.delete(index);
            }
          });

          return changed ? next : current;
        });
      },
      { root: track, threshold: [0, 0.995, 1] },
    );

    const cardElements = track.querySelectorAll<HTMLElement>("[data-card]");
    cardElements.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // --- Slider engine (Certifications-style, without the auto-drift) -------
  // Mouse-drag state: dragging scrubs the track 1:1.
  const dragRef = useRef({ down: false, startX: 0, scrollLeft: 0 });

  // Width of one full card copy (measured from the DOM so track padding and
  // gaps never skew the wrap seam) and the one-card pitch.
  const pitches = (track: HTMLDivElement) => {
    const cardEls = track.querySelectorAll<HTMLElement>("[data-card]");
    const step =
      cardEls.length > 1
        ? cardEls[1].offsetLeft - cardEls[0].offsetLeft
        : track.clientWidth;
    const pitch =
      cardEls.length > cards.length
        ? cardEls[cards.length].offsetLeft - cardEls[0].offsetLeft
        : track.scrollWidth / 2;
    return { step, pitch };
  };

  // Keep the position normalized within the first copy [0, pitch).
  const wrap = (track: HTMLDivElement, value: number) => {
    const { pitch } = pitches(track);
    if (pitch <= 0) return value;
    let v = value;
    while (v < 0) v += pitch;
    while (v >= pitch) v -= pitch;
    return v;
  };

  // Arrows advance exactly one card with native smooth scrolling, wrapping
  // over the copy seam so the loop stays infinite in both directions.
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const { step, pitch } = pitches(track);
    if (step <= 0 || pitch <= 0) return;

    // Instantly re-base into the first copy (visually identical) so there is
    // always another full copy ahead in the step direction
    track.scrollLeft = wrap(track, track.scrollLeft);
    let target = track.scrollLeft + direction * step;
    if (target < 0) {
      track.scrollLeft += pitch;
      target += pitch;
    }
    track.scrollTo({ left: target, behavior: "smooth" });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || e.pointerType !== "mouse") return;
    dragRef.current = { down: true, startX: e.clientX, scrollLeft: track.scrollLeft };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    track.scrollLeft = wrap(track, dragRef.current.scrollLeft - dx);
  };

  const endDrag = () => {
    dragRef.current.down = false;
  };

  return (
    <section
      id="greener-future"
      className="relative w-full overflow-hidden py-16 lg:py-22"
    >
      {/* Header row — heavy uppercase title left, supporting copy right */}
      <div className="flex flex-col gap-10 px-6 md:px-12 lg:flex-row lg:items-end lg:justify-between lg:max-w-[90%] lg:px-20">
        <h2 className="font-archivo-black uppercase text-2xl sm:text-4xl lg:text-[3rem] leading-[1.1] text-[var(--neutral-800)] lg:max-w-[55%]">
          Shaping a Greener
          <br />
          Future in Textiles
        </h2>

        <p className="text-base text-[#555] md:text-[1.25rem] lg:max-w-[40%] lg:pt-2">
          ASG stands behind eco-conscious manufacturing. Maintained through
          global fashion compliance at every step of craftsmanship, caring for
          end-customer satisfaction at every level.
        </p>
      </div>

      {/* Card carousel — drag/arrow-driven track with edge arrow controls */}
      <div className="relative mt-12 lg:mt-[3em]">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex cursor-grab active:cursor-grabbing select-none gap-6 overflow-x-auto px-6 md:px-12 lg:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Rendered twice so the one-card stepping can wrap seamlessly */}
          {[...cards, ...cards].map((card, index) => (
            <div
              key={`${card.label}-${index}`}
              data-card
              data-card-index={index}
              className="relative aspect-[14/15] w-[75vw] shrink-0 overflow-hidden transition-[border-radius] duration-700 ease-in-out md:w-[calc((100vw-88px)/2.9)] lg:w-[calc((100vw-120px)/2.9)]"
              style={{
                borderRadius: fullyVisibleCards.has(index) ? "1.2rem" : "7rem",
              }}
            >
              <Image
                src={card.image}
                alt={card.label}
                fill
                sizes="(max-width: 1024px) 75vw, 30rem"
                draggable={false}
                className="object-cover"
                quality={80}
              />

              {/* Bottom scrim so the copy stays legible over any photo */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
                <h3 className="font-neue-montreal text-[1.375rem] font-medium text-white lg:text-[1.75rem]">
                  {card.label}
                </h3>
                <p className="mt-3 max-w-[92%] text-base leading-[1.5] text-white/85 lg:text-lg">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / next controls overlaid on the track edges */}
        <button
          type="button"
          aria-label="Previous card"
          onClick={() => scrollByCard(-1)}
          className="absolute left-6 md:left-16 lg:left-24 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 hover:scale-105 lg:h-14 lg:w-14"
        >
          <ChevronLeft className="h-6 w-6 text-neutral-900 lg:h-7 lg:w-7" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="Next card"
          onClick={() => scrollByCard(1)}
          className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 hover:scale-105 lg:right-6 lg:h-14 lg:w-14"
        >
          <ChevronRight className="h-6 w-6 text-neutral-900 lg:h-7 lg:w-7" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
