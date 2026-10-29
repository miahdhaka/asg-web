"use client";

import { useEffect, useRef } from "react";
import { Navigation, Search } from "lucide-react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
  MapControls,
  useMap,
} from "@/components/ui/map";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface OfficeMapLocation {
  title: string;
  lat: number;
  lng: number;
  address?: string;
}

interface OfficeMapInnerProps {
  /** All real locations for the current tab — one marker each */
  locations: OfficeMapLocation[];
  /** Index of the selected card (highlighted + flown to) */
  activeIndex?: number;
  /** Fired when a marker is clicked, to sync the card selection */
  onSelect?: (index: number) => void;
}

/* Fallback view when there is no data: zoomed out over Bangladesh */
const DEFAULT_CENTER: [number, number] = [90.4074, 23.7806];
const DEFAULT_ZOOM = 6;

/* Both the initial load and the selected-card view sit at this street-level
   zoom. Kept a touch wider (16) so rural locations — where open-map data is
   sparse — still reveal surrounding roads, areas and labels instead of a bare
   field around the pin. */
const INITIAL_ZOOM = 16;
const FOCUS_ZOOM = 16;

/* Detailed light street basemap (Carto Voyager): shows building footprints,
   POI icons, road/place names and green/blue landuse — the closest free match
   to Google Maps' default "Map" view (Positron was too sparse/empty). */
const STREET_MAP_STYLES = {
  light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
};

/* ------------------------------------------------------------------ */
/*  Camera follow                                                      */
/* ------------------------------------------------------------------ */

// mapcn's <Map> only reads `center`/`zoom` on mount, so we drive the camera
// imperatively whenever the active selection changes — mirrors the flyTo the
// old Leaflet map did via useMap().
function Recenter({
  locations,
  activeIndex,
}: {
  locations: OfficeMapLocation[];
  activeIndex: number;
}) {
  const { map } = useMap();
  const active = locations[activeIndex];
  // Mount at INITIAL_ZOOM and skip the first run, so the wider view stays put
  // until the user actually selects a different card.
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!map || !active) return;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    map.flyTo({
      center: [active.lng, active.lat],
      zoom: FOCUS_ZOOM,
      duration: 1200,
      essential: true,
    });
  }, [map, active?.lat, active?.lng]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  Map                                                                */
/* ------------------------------------------------------------------ */

export default function OfficeMapInner({
  locations,
  activeIndex = 0,
  onSelect,
}: OfficeMapInnerProps) {
  const active = locations[activeIndex] ?? locations[0];
  const center: [number, number] = active
    ? [active.lng, active.lat]
    : DEFAULT_CENTER;

  return (
    <Map
      center={center}
      zoom={active ? INITIAL_ZOOM : DEFAULT_ZOOM}
      scrollZoom={false}
      maxZoom={19}
      attributionControl={false}
      theme="light"
      styles={STREET_MAP_STYLES}
      className="h-full w-full"
    >
      <Recenter locations={locations} activeIndex={activeIndex} />

      <MapControls position="top-right" showZoom showFullscreen={false} />

      {locations.map((loc, i) => {
        const isActive = i === activeIndex;
        return (
          <MapMarker
            key={`${loc.title}-${i}`}
            longitude={loc.lng}
            latitude={loc.lat}
            anchor="bottom"
            onClick={() => onSelect?.(i)}
          >
            <MarkerContent>
              {/* Google-style teardrop pin: red when selected, muted grey otherwise */}
              <svg
                width={isActive ? 30 : 22}
                height={isActive ? 42 : 31}
                viewBox="0 0 24 34"
                className="block drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] transition-all"
              >
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 8.4 10.72 20.76 11.18 21.3.46.46 1.18.46 1.64 0C13.28 32.76 24 20.4 24 12 24 5.37 18.63 0 12 0z"
                  fill={isActive ? "#EA4335" : "#9AA0A6"}
                  stroke="rgba(0,0,0,0.15)"
                  strokeWidth="0.5"
                />
                <circle cx="12" cy="12" r="4.6" fill="#fff" />
              </svg>
            </MarkerContent>

            <MarkerTooltip>{loc.title}</MarkerTooltip>

            <MarkerPopup className="max-w-80 rounded-xl border-0 p-0 shadow-xl">
              <div className="w-72">
                <div className="px-4 pt-4 pb-3">
                  <p className="text-foreground text-[15px] leading-snug font-medium">
                    {loc.title}
                  </p>
                  {loc.address && (
                    <p className="text-muted-foreground mt-1 text-[13px] leading-relaxed whitespace-pre-line">
                      {loc.address}
                    </p>
                  )}
                </div>
                {/* Google place-card action row */}
                <div className="flex items-center gap-1 border-t border-black/5 px-2 py-1.5">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium text-[#1a73e8] transition-colors hover:bg-[#1a73e8]/10"
                  >
                    <Navigation className="size-4" fill="currentColor" />
                    Directions
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium text-[#1a73e8] transition-colors hover:bg-[#1a73e8]/10"
                  >
                    <Search className="size-4" />
                    Search nearby
                  </a>
                </div>
              </div>
            </MarkerPopup>
          </MapMarker>
        );
      })}
    </Map>
  );
}
