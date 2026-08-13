import { MapPinned, Phone, Mail } from "lucide-react";
import type { OfficeCardData } from "./contactData";
import OfficeMap from "./OfficeMap";

/* ------------------------------------------------------------------ */
/*  Icon chip (38×38 rounded gray square, matching Figma)              */
/* ------------------------------------------------------------------ */

function DetailChip({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="flex h-[2.75rem] w-[2.75rem] sm:h-[3.5rem] sm:w-[3.5rem] shrink-0 items-center justify-center rounded bg-gray-100">
      <Icon size={20} className="sm:hidden text-neutral-800" strokeWidth={1.5} />
      <Icon size={24} className="hidden sm:block text-neutral-800" strokeWidth={1.5} />
    </div>
  );
}

export default function OfficeCard({ card }: { card: OfficeCardData }) {
  return (
    <div className="border border-gray-200 sm:border-transparent rounded-md sm:rounded-none p-5 sm:p-0 flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-9 lg:gap-12">
      {/* Title */}
      <h3 className="w-full lg:w-90 text-base sm:text-2xl lg:text-[2.2rem] text-black sm:leading-8 lg:leading-[2.8rem] font-test-tiempos-fine lg:shrink-0">
        {card.title}
      </h3>

      {/* Map */}
      <div className="relative w-full lg:w-[42rem] h-[12rem] sm:h-[18rem] bg-[#D9D9D9] overflow-hidden lg:shrink-0">
        <OfficeMap
          lat={card.coordinates.lat}
          lng={card.coordinates.lng}
          title={card.title}
        />
      </div>

      {/* Details */}
      <div className="flex w-full flex-col gap-6 lg:w-[25rem] lg:shrink-0">
        {/* Address */}
        <div className="flex items-center gap-[1rem]">
          <DetailChip icon={MapPinned} />
          <p className="text-sm lg:text-[1.125rem] text-neutral-800">{card.address}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-[1rem]">
          <DetailChip icon={Phone} />
          <div className="flex flex-col gap-0.5">
            {card.phones.map((phone) => (
              <p key={phone} className="text-sm lg:text-[1.125rem] text-neutral-800">
                {phone}
              </p>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-[1rem]">
          <DetailChip icon={Mail} />
          <p className="text-sm lg:text-[1.125rem] text-neutral-800">{card.email}</p>
        </div>
      </div>
    </div>
  );
}
