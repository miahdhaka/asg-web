"use client";

import dynamic from "next/dynamic";
import type { OfficeMapLocation } from "./OfficeMapInner";

const OfficeMapInner = dynamic(() => import("./OfficeMapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#D9D9D9] flex items-center justify-center">
      <span className="text-neutral-500">Loading map...</span>
    </div>
  ),
});

interface OfficeMapProps {
  locations: OfficeMapLocation[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
}

export default function OfficeMap({
  locations,
  activeIndex = 0,
  onSelect,
}: OfficeMapProps) {
  return (
    <OfficeMapInner
      locations={locations}
      activeIndex={activeIndex}
      onSelect={onSelect}
    />
  );
}
