"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import {
  useLayoutEffect,
  useRef,
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
      "Growing toward greener manufacturing by optimizing Renewable Energy and Closed-loop Water Systems (CLWS).",
    image: "/images/sustainability/sustainability.webp",
  },
  {
    label: "Innovation",
    description:
      "Advancing future-ready fashion and industrialization through best technologies and real-time values.",
    image: "/images/sustainability/innovation.webp",
  },
  {
    label: "Quality & Compliance",
    description:
      "End-to-end transparent production, operating with international compliance at every step of the process.",
    image: "/images/sustainability/quality-&-compliance.webp",
  },
  {
    label: "Social Business Commitment",
    description:
      "Help solopreneurs, women and youngsters to become skillfully valuable to the global fashion with impact.",
    image: "/images/sustainability/social-business-commitment.webp",
  },
];

export default function GreenerFuture() {
  const trackRef = useRef<HTMLDivElement>(null);
  // The GSAP tween currently gliding the track — every arrow slide animates
  // with GSAP for a consistent, interruptible ease (matches ConcernProcessing).
  const slideTween = useRef<gsap.core.Tween | null>(null);
  // Mouse-drag state: dragging scrubs the track 1:1.
  const dragRef = useRef({ down: false, startX: 0, scrollLeft: 0 });

  // --- Radius engine -------------------------------------------------------
  // ONLY the cards clipped by the viewport edges open into the big squircle;
  // every fully-visible (middle) card keeps the tight radius and NEVER
  // animates. The radius is written straight to the DOM from live geometry
  // (no index-keyed React state) because the infinite-loop re-base jumps
  // scrollLeft by one whole copy: an index-keyed set would remap to the other
  // copy and make a stationary middle card flash its radius.
  const cardEls = (track: HTMLDivElement) =>
    track.querySelectorAll<HTMLElement>("[data-card]");

  const updateRadius = (track: HTMLDivElement) => {
    const els = cardEls(track);
    if (!els.length) return;
    // Sub-pixel guard so a resting card is never misjudged as clipped.
    const tol = 1.5;
    const viewLeft = track.scrollLeft + tol;
    const viewRight = track.scrollLeft + track.clientWidth - tol;
    els.forEach((el) => {
      const inside =
        el.offsetLeft >= viewLeft &&
        el.offsetLeft + el.offsetWidth <= viewRight;
      el.style.borderRadius = inside ? "1.2rem" : "7rem";
    });
  };

  // Freeze the border-radius transition, apply an instant scroll jump and
  // recompute, then thaw. Used for the seamless-loop re-base so the swapped-in
  // copy adopts the correct radius with no visible animation.
  const withTransitionFrozen = (
    track: HTMLDivElement,
    mutate: () => void,
  ) => {
    const els = cardEls(track);
    els.forEach((el) => (el.style.transitionProperty = "none"));
    mutate();
    updateRadius(track);
    void track.offsetWidth; // force reflow to commit the frozen values
    els.forEach((el) => (el.style.transitionProperty = ""));
  };

  // Width of one full card copy (measured from the DOM so track padding and
  // gaps never skew the wrap seam) and the one-card pitch.
  const pitches = (track: HTMLDivElement) => {
    const els = cardEls(track);
    const step =
      els.length > 1
        ? els[1].offsetLeft - els[0].offsetLeft
        : track.clientWidth;
    const pitch =
      els.length > cards.length
        ? els[cards.length].offsetLeft - els[0].offsetLeft
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

  // Re-base into the first copy, freezing the radius across the jump.
  const rebase = (track: HTMLDivElement) => {
    const wrapped = wrap(track, track.scrollLeft);
    if (wrapped === track.scrollLeft) return;
    withTransitionFrozen(track, () => {
      track.scrollLeft = wrapped;
    });
  };

  // Follow real scrolling with a single coalesced rAF; edge cards cross the
  // boundary and animate smoothly, middle cards stay put and never change.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => updateRadius(track));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    updateRadius(track);

    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      slideTween.current?.kill();
    };
  }, []);

  // Arrows advance exactly one card with a GSAP glide — a single, smooth,
  // interruptible ease (power2.inOut) matching ConcernProcessing — wrapping
  // over the copy seam so the loop stays infinite in both directions.
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const { step, pitch } = pitches(track);
    if (step <= 0 || pitch <= 0) return;

    // Instantly re-base into the first copy (visually identical) so there is
    // always another full copy ahead in the step direction.
    rebase(track);
    let target = track.scrollLeft + direction * step;
    if (target < 0) {
      withTransitionFrozen(track, () => {
        track.scrollLeft += pitch;
      });
      target += pitch;
    }
    slideTween.current?.kill();
    slideTween.current = gsap.to(track, {
      scrollLeft: target,
      duration: 0.6,
      ease: "power2.inOut",
      overwrite: true,
    });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || e.pointerType !== "mouse") return;
    // Stop any in-flight glide so the manual scrub takes immediate control.
    slideTween.current?.kill();
    dragRef.current = { down: true, startX: e.clientX, scrollLeft: track.scrollLeft };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    const next = dragRef.current.scrollLeft - dx;
    const wrapped = wrap(track, next);
    if (wrapped !== next) {
      // Crossed the copy seam: jump with the transition frozen and shift the
      // drag base by the same amount so the scrub stays continuous.
      withTransitionFrozen(track, () => {
        track.scrollLeft = wrapped;
      });
      dragRef.current.scrollLeft += wrapped - next;
    } else {
      track.scrollLeft = wrapped;
    }
  };

  const endDrag = () => {
    const track = trackRef.current;
    if (!track || !dragRef.current.down) return;
    dragRef.current.down = false;
    // Settle onto the nearest card boundary — one card at a time, matching
    // ConcernProcessing — so a released drag never rests misaligned mid-card.
    const { step } = pitches(track);
    if (step <= 0) return;
    const target = Math.round(track.scrollLeft / step) * step;
    slideTween.current?.kill();
    slideTween.current = gsap.to(track, {
      scrollLeft: target,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
    });
  };

  return (
    <section
      id="greener-future"
      className="relative w-full overflow-hidden py-16 lg:py-22"
    >
      {/* Header row — heavy uppercase title left, supporting copy right */}
      <div className="flex flex-col gap-10 px-6 md:px-12 lg:flex-row lg:items-end lg:justify-between lg:max-w-[90%] lg:px-20">
        <h2 className="font-archivo-black uppercase text-2xl sm:text-4xl lg:text-[3rem] leading-[1.1] text-[var(--neutral-800)] lg:max-w-[55%]">
          Guiding Greener Future
          <br />
          Beyond Textiles
        </h2>

        <p className="text-base text-[#555] md:text-[1.25rem] lg:max-w-[40%] lg:pt-2">
          ASG stands behind eco-conscious manufacturing. Maintained through global fashion compliance at every step of craftsmanship, caring for end-customer satisfaction.
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
              className="relative aspect-[14/15] w-[75vw] shrink-0 overflow-hidden transition-[border-radius] duration-700 ease-in-out md:w-[calc((100vw-88px)/2.9)] lg:w-[calc((100vw-120px)/2.9)]"
              style={{ borderRadius: "1.2rem" }}
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
