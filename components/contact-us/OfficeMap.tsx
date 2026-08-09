"use client";

import dynamic from "next/dynamic";

const OfficeMapInner = dynamic(() => import("./OfficeMapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#D9D9D9] flex items-center justify-center">
      <span className="text-neutral-500">Loading map...</span>
    </div>
  ),
});

interface OfficeMapProps {
  lat: number;
  lng: number;
  title: string;
}

export default function OfficeMap({ lat, lng, title }: OfficeMapProps) {
  return <OfficeMapInner lat={lat} lng={lng} title={title} />;
}
