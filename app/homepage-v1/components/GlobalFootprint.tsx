"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// TopoJSON world map URL
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapPin {
  label: string;
  coordinates: [number, number]; // [longitude, latitude]
}

const mapPins: MapPin[] = [
  { label: "USA", coordinates: [-95.7129, 37.0902] },
  { label: "Brazil", coordinates: [-51.9253, -14.235] },
  { label: "UK", coordinates: [-3.436, 55.3781] },
  { label: "Germany", coordinates: [16.6, 45.9] },
  { label: "UAE / Dubai", coordinates: [53.8478, 23.4241] },
  { label: "South Africa", coordinates: [22.9375, -30.5595] },
  { label: "China", coordinates: [104.1954, 35.8617] },
];

// Brand logo tiles rendered from /public/images/global-footprint/.
const brands: string[] = Array.from(
  { length: 16 },
  (_, i) => `/images/global-footprint/img${i + 1}.png`
);

export default function GlobalFootprint() {
  // Render the list twice so we can loop seamlessly.
  const loopedBrands = [...brands, ...brands];

  /* Mobile gets a cropped, recentered projection so the geography itself
     renders ~25% larger instead of just overscanning the full frame:
     the viewBox drops the empty ocean bands above/below the landmasses
     (360 → 300) and the centre longitude moves halfway between the USA
     and China pins so both extremes (plus their badges) still fit a
     narrow phone screen. Desktop keeps the original full frame. */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="global-footprint"
      className="relative flex w-full flex-col overflow-hidden bg-[var(--color-primary-black)] pt-8 pb-6 lg:pt-0 lg:pb-10 h-[calc(var(--vh)-var(--header-height))] lg:h-[calc(100vh-var(--header-height))]"
    >
      {/* Content row — copy left, map right */}
      <div className="relative flex min-h-0 flex-1 flex-col lg:flex-row items-center px-4 lg:px-20">
        {/* Left copy — pinned to the bottom while the map stays centered */}
        <div className="w-full lg:w-[38%] shrink-0 mb-6 lg:mb-0 lg:self-end lg:mb-[5%]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="font-neue-montreal text-xs sm:text-sm font-normal tracking-[0.25em] text-white uppercase"
            >
              We Export To
            </span>
            <span aria-hidden className="h-1.5 w-1.5 bg-white" />
          </div>

          {/* Title */}
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[4rem] leading-[1.1] font-normal text-white">
            Our Global Footprint
          </h2>

          {/* Description — clamped on ultra-small phones (iPhone 5/SE class)
              where its full 8 lines would starve the map band of height */}
          <p className="mt-4 lg:mt-6 max-w-[38.75rem] text-sm sm:text-base lg:text-[1.0625rem] leading-[1.6] tracking-wider text-neutral-400 max-[380px]:line-clamp-4">
            Amanat Shah Group operates a robust international supply chain,
            delivering world-class textile products to major apparel hubs
            worldwide. Driven by an expert workforce, our footprint connects
            heritage with retail excellence. We are proud to be the trusted
            partner for globally renowned brands, including:
          </p>
        </div>

        {/* Map with location pins — on mobile the SVG fills the leftover
            band by HEIGHT instead of width: it renders ~1.5x taller and the
            extra width overscans past the screen edges (clipped by the
            section's overflow-hidden), centred so the overscan is symmetric.
            Vertically centers in the leftover space so no dead gap sits
            below it */}
        <div className="relative min-w-0 w-full lg:flex-1 max-lg:-mx-4 max-lg:flex max-lg:flex-1 max-lg:items-center max-lg:justify-center">
          {/* Green gradient blur centered behind the map */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-full sm:h-[85%] w-full sm:w-[95%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "radial-gradient(circle at center, rgba(34, 197, 94, 0.06) 0%, rgba(34, 197, 94, 0) 70%)",
              filter: "blur(3.75rem)",
            }}
          />

          {/* Soft green glow behind the map */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(34, 197, 94, 0.1) 0%, rgba(4, 7, 10, 0) 70%)",
            }}
          />

          <ComposableMap
            projection="geoMercator"
            // Desktop: cropped viewBox tall enough for Greenland at the top
            // but ending just below South Africa, skipping the Antarctica
            // zone. Mobile: tighter 800×300 frame centred on [4.25, 10] so
            // the visible window spans ~61°N–45°S with land at every edge.
            width={800}
            height={isMobile ? 300 : 360}
            projectionConfig={
              isMobile
                ? { scale: 85, center: [4.25, 10] }
                : { scale: 85, center: [20, 50] }
            }
            // Mobile: size by height at 140% of the band — combined with the
            // cropped frame the geography fills the window edge to edge; the
            // extra width overscans symmetrically and is clipped by the
            // section. Desktop keeps the width-fit rendering
            className="h-auto w-full max-lg:h-[140%] max-lg:w-auto"
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies
                  // Hide Antarctica — the bottom landmass adds no value here
                  .filter((geo) => geo.properties.name !== "Antarctica")
                  .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1a2332"
                    stroke="#0d1520"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#243044" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {mapPins.map((pin) => {
              // Frosted badge below the pointer, sized to the label text
              const badgeWidth = pin.label.length * 6 + 18;
              const badge = { x: 0, y: 12 };
              return (
              <Marker key={pin.label} coordinates={pin.coordinates}>
                {/* Red dot with pulse */}
                <circle r={4} fill="#ef4444" />
                <circle r={4} fill="#ef4444" opacity={0.6}>
                  <animate
                    attributeName="r"
                    from="4"
                    to="12"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Country name badge — dark translucent pill with a subtle
                    light border, like frosted glass over the map */}
                <g>
                  <rect
                    x={badge.x - badgeWidth / 2}
                    y={badge.y}
                    width={badgeWidth}
                    height={19}
                    rx={4}
                    fill="rgba(35, 42, 48, 0.78)"
                    stroke="rgba(255, 255, 255, 0.18)"
                    strokeWidth={0.75}
                  />
                  <text
                    textAnchor="middle"
                    x={badge.x}
                    y={badge.y + 13}
                    style={{
                      fontFamily: "var(--font-neue-montreal)",
                      fontSize: "11px",
                      fill: "white",
                      fontWeight: 500,
                    }}
                  >
                    {pin.label}
                  </text>
                </g>
              </Marker>
              );
            })}
          </ComposableMap>
        </div>
      </div>

      {/* Brand logo marquees - two rows going opposite directions */}
      <div className="relative mt-4 lg:mt-6 pb-[14%] sm:pb-0">
        {/* Row 1: Right to Left */}
        <div className="no-scrollbar overflow-hidden select-none">
          <div className="animate-marquee-left flex w-max gap-2 sm:gap-3 lg:gap-4">
            {loopedBrands.map((brand, index) => (
              <div
                key={`left-${brand}-${index}`}
                className="flex h-14 sm:h-16 lg:h-24 w-[10rem] sm:w-[12rem] lg:w-[17.5rem] flex-shrink-0 items-center justify-center bg-[#10161a]"
              >
                <Image
                  src={brand}
                  alt=""
                  width={160}
                  height={40}
                  draggable={false}
                  className="pointer-events-none h-6 sm:h-7 lg:h-10 w-20 sm:w-24 lg:w-36 object-contain"
                  quality={90}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="no-scrollbar mt-2 sm:mt-3 lg:mt-4 overflow-hidden select-none">
          <div className="animate-marquee-right flex w-max gap-2 sm:gap-3 lg:gap-4">
            {loopedBrands.map((brand, index) => (
              <div
                key={`right-${brand}-${index}`}
                className="flex h-14 sm:h-16 lg:h-24 w-[10rem] sm:w-[12rem] lg:w-[17.5rem] flex-shrink-0 items-center justify-center bg-[#10161a]"
              >
                <Image
                  src={brand}
                  alt=""
                  width={160}
                  height={40}
                  draggable={false}
                  className="pointer-events-none h-6 sm:h-7 lg:h-10 w-20 sm:w-24 lg:w-36 object-contain"
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
