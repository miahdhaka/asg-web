"use client";

import { useEffect, useRef } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  MarkerTooltip,
  MapControls,
  useMap,
} from "@/components/ui/map";
import { cn } from "@/lib/utils";

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
   zoom (≈ two "+" steps in from the default), so the map opens looking the
   same as after tapping "+" twice and simply pans between cards. */
const INITIAL_ZOOM = 17;
const FOCUS_ZOOM = 17;

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
              <div className="relative flex items-center justify-center">
                {isActive && (
                  <span className="absolute size-6 animate-ping rounded-full bg-[#1AA179]/40" />
                )}
                <span
                  className={cn(
                    "relative block rounded-full border-2 border-white shadow-lg transition-all",
                    isActive
                      ? "size-5 bg-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)]"
                      : "size-3 bg-neutral-400/90 hover:bg-neutral-500",
                  )}
                />
                {isActive && (
                  <MarkerLabel position="bottom" className="!text-xs !font-semibold">
                    {loc.title}
                  </MarkerLabel>
                )}
              </div>
            </MarkerContent>

            <MarkerTooltip>{loc.title}</MarkerTooltip>

            <MarkerPopup>
              <div className="w-52 space-y-1">
                <p className="text-foreground text-sm leading-snug font-semibold">
                  {loc.title}
                </p>
                {loc.address && (
                  <p className="text-muted-foreground text-xs leading-relaxed whitespace-pre-line">
                    {loc.address}
                  </p>
                )}
                <p className="text-muted-foreground text-[11px] tabular-nums">
                  {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
        );
      })}
    </Map>
  );
}
