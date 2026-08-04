import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import type { OfficeCardData } from "./contactData";

/* ------------------------------------------------------------------ */
/*  Icon chip (38×38 rounded gray square, matching Figma)              */
/* ------------------------------------------------------------------ */

function DetailChip({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="flex h-[2.375rem] w-[2.375rem] shrink-0 items-center justify-center rounded bg-gray-100">
      <Icon size={18} className="text-neutral-800" strokeWidth={1.5} />
    </div>
  );
}

export default function OfficeCard({ card }: { card: OfficeCardData }) {
  return (
    <div className="flex flex-col items-start gap-9 lg:flex-row">
      {/* Title */}
      <h3 className="w-full text-2xl leading-8 text-black font-test-tiempos-fine lg:w-64 lg:shrink-0">
        {card.title}
      </h3>

      {/* Image */}
      <div className="relative h-[14.4375rem] w-full overflow-hidden bg-[#D9D9D9] lg:w-[31.5625rem] lg:shrink-0">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(min-width: 1024px) 505px, 100vw"
          draggable={false}
          className="pointer-events-none object-cover"
          quality={80}
        />
      </div>

      {/* Details */}
      <div className="flex w-full flex-col gap-4 lg:w-[18.8125rem] lg:shrink-0">
        {/* Address */}
        <div className="flex items-center gap-[0.8125rem]">
          <DetailChip icon={MapPin} />
          <p className="text-sm leading-5 text-neutral-800">{card.address}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <DetailChip icon={Phone} />
          <div className="flex flex-col gap-0.5">
            {card.phones.map((phone) => (
              <p key={phone} className="text-sm leading-5 text-neutral-800">
                {phone}
              </p>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <DetailChip icon={Mail} />
          <p className="text-sm leading-5 text-neutral-800">{card.email}</p>
        </div>
      </div>
    </div>
  );
}
