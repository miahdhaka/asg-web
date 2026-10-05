"use client";

import { useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Brand logo tiles — exactly the logos in /public/images/global-footprint/.
// Each entry carries its true intrinsic width (all share a 264px height) so the
// aspect-ratio box matches the decoded image — no mid-animation reflow/jump.
const brands: { src: string; width: number }[] = [
  { src: "/images/global-footprint/c&a.png", width: 660 },
  { src: "/images/global-footprint/celio.png", width: 648 },
  { src: "/images/global-footprint/kiabi.png", width: 724 },
  { src: "/images/global-footprint/levis.png", width: 552 },
  { src: "/images/global-footprint/next.png", width: 676 },
  { src: "/images/global-footprint/premark.png", width: 660 },
  { src: "/images/global-footprint/walmart.png", width: 956 },
];
const LOGO_HEIGHT = 264;

const GlobeInner = dynamic(
  () => import("./GlobeInner").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-16 rounded-full border-2 border-neutral-700 border-t-neutral-400 animate-spin" />
      </div>
    ),
  },
);

export default function RockSteadySection() {
  // `marquee-globe` glides the track from translateX(calc(-100% / 3)) to
  // translateX(0) — one third of the track to the right, which lands on a frame
  // pixel-identical to the one it started from. Two conditions make that
  // seamless, rather than an endless row that visibly restarts:
  //   • `copies` is a multiple of 3, so the 1/3 shift is exactly a whole number
  //     of brand lists;
  //   • the track stays wide enough that both extremes still cover the screen —
  //     the left edge never slides past 0 and the right edge never pulls back
  //     off-screen, which means a copy is always waiting off-screen on the left
  //     to feed in as the strip moves right.
  const [copies, setCopies] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const apply = () => {
      const tile = track.firstElementChild as HTMLElement | null;
      const viewport = container.clientWidth;
      if (!tile || viewport === 0) return;
      // One tile's stride (itself + its right margin) × the list length is the
      // width of a single copy. Measuring a tile rather than the whole track
      // keeps the value independent of `copies`, so the count can settle in a
      // single pass instead of compounding off an already-multiplied track.
      const stride = tile.offsetWidth + parseFloat(getComputedStyle(tile).marginRight || "0");
      if (stride <= 0) return;
      const perCopy = stride * brands.length;
      const needed = Math.max(3, Math.ceil(viewport / perCopy) * 3);
      setCopies((c) => (c === needed ? c : needed));
    };

    apply();
    // Re-check whenever the track's own layout changes, e.g. the aspect-ratio
    // boxes of not-yet-decoded logos resolve to their real widths.
    const ro = new ResizeObserver(apply);
    ro.observe(container);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  const loopedBrands = Array.from({ length: copies }, () => brands).flat();

  return (
    <section className="relative isolate h-dvh w-full overflow-hidden bg-black">
      {/* Globe canvas — full bleed */}
      <div className="absolute inset-0">
        <GlobeInner />
      </div>

      {/* Dark-green wash — screen-blended so it ADDS light over the black globe
          canvas instead of covering it: black + screen = the gradient colour
          itself, while the lit globe keeps its own brightness and only picks up a
          green cast, exactly like the reference. Three layers: the halo behind the
          globe (offset right, matching globeOffset), a softer lift in the
          lower-left corner, and a broad base wash so the corners read dark green
          rather than pure black. `isolate` on the section keeps the blend from
          reaching past this section into the page behind it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          mixBlendMode: "screen",
          background: [
            "radial-gradient(46% 50% at 68% 42%, rgba(96,206,136,0.55) 0%, rgba(52,142,88,0.30) 40%, rgba(16,58,36,0.12) 70%, rgba(0,0,0,0) 100%)",
            "radial-gradient(38% 42% at 10% 92%, rgba(62,166,104,0.34) 0%, rgba(20,70,44,0.14) 60%, rgba(0,0,0,0) 100%)",
            "radial-gradient(120% 120% at 50% 50%, rgba(22,68,44,0.55) 0%, rgba(9,30,20,0.70) 55%, rgba(3,12,8,0.85) 100%)",
          ].join(", "),
        }}
      />

      {/* Bottom black blur fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-black to-transparent" />

      {/* Text — left side */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center lg:justify-start">
        <div className="w-full px-6 sm:px-10 lg:w-[43%] lg:px-0 lg:pl-[12em]">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-neue-montreal font-normal uppercase tracking-widest text-neutral-400">GLOBAL REACH</span>
            <span className="size-2 rounded-full bg-[image:var(--primary-gradient)]" />
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[3rem] text-white font-archivo-black uppercase leading-[1.1] mb-4 lg:mb-5">
            Bangladesh<br />at the center.
          </h2>
          <p className="text-base md:text-[1.25rem] text-neutral-400">
            A single manufacturing hub in Bangladesh, connected to sourcing offices, buyers and retail partners across four regions. A single manufacturing hub in Bangladesh, connected to sourcing offices, buyers and retail partners across four regions.
          </p>
        </div>
      </div>

      {/* Brand logo marquee — single row, anchored to the bottom of the
          section above the globe and the fade overlay */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-30 pb-6 lg:pb-10">
        {/* Left to Right */}
        <div ref={containerRef} className="no-scrollbar overflow-hidden select-none">
          <div ref={trackRef} className="animate-marquee-globe flex w-max">
            {loopedBrands.map((brand, index) => (
              <div
                key={`globe-${brand.src}-${index}`}
                className="mr-2 flex h-14 shrink-0 items-center justify-center sm:mr-3 sm:h-16 lg:mr-4 lg:h-24"
              >
                <Image
                  src={brand.src}
                  alt=""
                  width={brand.width}
                  height={LOGO_HEIGHT}
                  draggable={false}
                  className="pointer-events-none h-12 w-auto sm:h-16 lg:h-20"
                  quality={90}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
