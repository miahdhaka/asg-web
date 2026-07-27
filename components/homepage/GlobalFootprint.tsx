"use client";

import Image from "next/image";
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
  { label: "Germany", coordinates: [10.4515, 51.1657] },
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

  return (
    <section
      className="relative flex w-full flex-col overflow-hidden bg-[var(--color-primary-black)] pb-10"
      style={{ height: "calc(100vh - var(--header-height, 4.55rem))" }}
    >
      {/* Content row — copy left, map right */}
      <div className="relative flex min-h-0 flex-1 items-end px-20">
        {/* Left copy */}
        <div className="w-[38%] shrink-0 mb-[5%]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="font-neue-montreal text-sm font-normal tracking-[0.25em] text-white uppercase"
            >
              We Export To
            </span>
            <span aria-hidden className="h-1.5 w-1.5 bg-white" />
          </div>

          {/* Title */}
          <h2 className="mt-2 font-serif text-[64px] leading-[1.1] font-normal text-white">
            Our Global Footprint
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-[620px] text-[17px] leading-[1.6] tracking-wider text-neutral-400">
            Amanat Shah Group operates a robust international supply chain,
            delivering world-class textile products to major apparel hubs
            worldwide. Driven by an expert workforce, our footprint connects
            heritage with retail excellence. We are proud to be the trusted
            partner for globally renowned brands, including:
          </p>
        </div>

        {/* Map with location pins */}
        <div className="relative min-w-0 flex-1">
          {/* Green gradient drop shadow above the map */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[80%] -translate-x-1/2"
            style={{
              background: "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.4) 0%, rgba(34, 197, 94, 0) 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Soft green glow behind the map */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(34, 197, 94, 0.15) 0%, rgba(4, 7, 10, 0) 70%)",
            }}
          />

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 85,
              center: [20, 20],
            }}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
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
              // Offset labels for UK and Germany to avoid overlap
              const labelOffset = pin.label === "UK" ? { x: -15, y: -10 } :
                                  pin.label === "Germany" ? { x: 15, y: -10 } :
                                  { x: 0, y: -12 };
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
                {/* Label */}
                <text
                  textAnchor="middle"
                  x={labelOffset.x}
                  y={labelOffset.y}
                  style={{
                    fontFamily: "var(--font-neue-montreal)",
                    fontSize: "10px",
                    fill: "white",
                    fontWeight: 500,
                  }}
                >
                  {pin.label}
                </text>
              </Marker>
              );
            })}
          </ComposableMap>
        </div>
      </div>

      {/* Brand logo marquees - two rows going opposite directions */}
      <div className="relative mt-6">
        {/* Row 1: Right to Left */}
        <div className="no-scrollbar overflow-hidden select-none">
          <div className="animate-marquee-left flex w-max gap-4">
            {loopedBrands.map((brand, index) => (
              <div
                key={`left-${brand}-${index}`}
                className="flex h-24 w-[280px] flex-shrink-0 items-center justify-center bg-[#10161a]"
              >
                <Image
                  src={brand}
                  alt=""
                  width={160}
                  height={40}
                  draggable={false}
                  className="pointer-events-none h-10 w-36 object-contain"
                  quality={90}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="no-scrollbar mt-4 overflow-hidden select-none">
          <div className="animate-marquee-right flex w-max gap-4">
            {loopedBrands.map((brand, index) => (
              <div
                key={`right-${brand}-${index}`}
                className="flex h-24 w-[280px] flex-shrink-0 items-center justify-center bg-[#10161a]"
              >
                <Image
                  src={brand}
                  alt=""
                  width={160}
                  height={40}
                  draggable={false}
                  className="pointer-events-none h-10 w-36 object-contain"
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
