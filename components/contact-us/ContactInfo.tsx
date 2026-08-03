import { MapPin, Phone, Mail } from "lucide-react";
import { headquarters, openingHours } from "./contactData";

/* ------------------------------------------------------------------ */
/*  Info block (icon + label + value)                                  */
/* ------------------------------------------------------------------ */

function InfoBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-[2.375rem] h-[2.375rem] bg-gray-100 rounded">
          <Icon size={18} className="text-neutral-800" strokeWidth={1.5} />
        </div>
        <span className="text-sm font-medium text-gray-800">{label}</span>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[13.5rem]">
      {/* Corporate Headquarters */}
      <p className="text-lg leading-[1.55] text-neutral-800 font-test-tiempos-fine">
        CORPORATE HEADQUARTERS
      </p>

      <div className="flex flex-col justify-center gap-6">
        {/* Location */}
        <InfoBlock icon={MapPin} label="Location">
          <p className="text-sm leading-[1.55] text-neutral-800">
            {headquarters.location}
          </p>
        </InfoBlock>

        {/* Help / Phone */}
        <InfoBlock icon={Phone} label="Help">
          <div className="flex flex-col gap-[0.6875rem]">
            {headquarters.phones.map((phone) => (
              <p
                key={phone}
                className="text-sm leading-[1.55] text-neutral-800"
              >
                {phone}
              </p>
            ))}
          </div>
        </InfoBlock>

        {/* Say Hello / Email */}
        <InfoBlock icon={Mail} label="Say Hello">
          <p className="text-sm leading-[1.55] text-neutral-800">
            {headquarters.email}
          </p>
        </InfoBlock>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-100" />

      {/* Opening Hours */}
      <p className="text-lg leading-[1.55] text-neutral-800 font-test-tiempos-fine">
        OPENING HOURS
      </p>

      <div className="flex flex-col gap-3">
        {openingHours.map((item) => (
          <div
            key={item.day}
            className="flex items-center justify-between gap-4"
          >
            <span
              className={`text-sm font-medium ${
                item.closed ? "text-[#B61753]" : "text-gray-800"
              }`}
            >
              {item.day}
            </span>
            <span className="text-sm text-neutral-800">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
