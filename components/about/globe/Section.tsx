"use client";

import dynamic from "next/dynamic";

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
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-black">
      {/* Globe canvas — full bleed */}
      <div className="absolute inset-0">
        <GlobeInner />
      </div>

      {/* Bottom black blur fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-black to-transparent" />

      {/* Text — left side */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center lg:justify-start">
        <div className="w-full px-6 sm:px-10 lg:w-[43%] lg:px-0 lg:pl-[12em]">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-neue-montreal text-xs sm:text-sm font-normal uppercase tracking-widest text-neutral-400">Our Business</span>
            <span className="size-2 bg-[image:var(--primary-gradient)]" />
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl text-white font-test-tiempos-fine font-medium uppercase leading-[1.15] mb-4 lg:mb-5">
            Bangladesh<br />at the center.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-400">
            A single manufacturing hub in Bangladesh, connected to sourcing offices, buyers and retail partners across four regions. A single manufacturing hub in Bangladesh, connected to sourcing offices, buyers and retail partners across four regions.
          </p>
        </div>
      </div>
    </section>
  );
}
