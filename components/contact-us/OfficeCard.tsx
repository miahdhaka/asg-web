import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import type { OfficeCardData } from "./contactData";

export default function OfficeCard({ card }: { card: OfficeCardData }) {
  return (
    <div className="flex flex-row items-start gap-[2.25rem]">
      {/* Title */}
      <h3 className="w-64 shrink-0 text-2xl leading-[2rem] text-black font-test-tiempos-fine">
        {card.title}
      </h3>

      {/* Image */}
      <div className="relative w-[31.5625rem] h-[14.4375rem] shrink-0 overflow-hidden bg-[#D9D9D9]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(min-width: 1024px) 31vw, 100vw"
          draggable={false}
          className="pointer-events-none object-cover"
          quality={80}
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-4 w-[18.8125rem]">
        {/* Address */}
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-neutral-800 shrink-0" strokeWidth={1.5} />
          <p className="text-sm leading-[1.55] text-neutral-800">
            {card.address}
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-neutral-800 shrink-0" strokeWidth={1.5} />
          <div className="flex flex-col gap-[0.125rem]">
            {card.phones.map((phone) => (
              <p key={phone} className="text-sm leading-[1.55] text-neutral-800">
                {phone}
              </p>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <Mail size={18} className="text-neutral-800 shrink-0" strokeWidth={1.5} />
          <p className="text-sm leading-[1.55] text-neutral-800">
            {card.email}
          </p>
        </div>
      </div>
    </div>
  );
}
