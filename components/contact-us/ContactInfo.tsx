import { MapPin, Phone, Mail } from "lucide-react";
import { headquarters, openingHours } from "./contactData";

/* ------------------------------------------------------------------ */
/*  Info block (icon chip + label + value)                             */
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
        <div className="flex h-[2.375rem] w-[2.375rem] shrink-0 items-center justify-center rounded bg-gray-100">
          <Icon size={18} className="text-neutral-800" strokeWidth={1.5} />
        </div>
        <span className="text-sm leading-5 font-medium text-gray-800">
          {label}
        </span>
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
    <div className="flex flex-col">
      {/* Corporate Headquarters */}
      <div className="flex w-full max-w-[14.125rem] flex-col gap-4">
        <p className="text-lg leading-7 text-neutral-800 font-test-tiempos-fine">
          CORPORATE HEADQUARTERS
        </p>

        <div className="flex flex-col justify-center gap-6">
          {/* Location */}
          <InfoBlock icon={MapPin} label="Location">
            <p className="text-sm leading-5 text-neutral-800">
              {headquarters.location}
            </p>
          </InfoBlock>

          {/* Help / Phone */}
          <InfoBlock icon={Phone} label="Help">
            <div className="flex flex-col gap-[0.6875rem]">
              {headquarters.phones.map((phone) => (
                <p key={phone} className="text-sm leading-5 text-neutral-800">
                  {phone}
                </p>
              ))}
            </div>
          </InfoBlock>

          {/* Say Hello / Email */}
          <InfoBlock icon={Mail} label="Say Hello">
            <p className="text-sm leading-5 text-neutral-800">
              {headquarters.email}
            </p>
          </InfoBlock>
        </div>
      </div>

      {/* Divider — spans the full left column */}
      <hr className="mt-4 border-t border-gray-100" />

      {/* Opening Hours */}
      <div className="mt-6 flex w-full max-w-[17.9375rem] flex-col gap-4">
        <p className="text-lg leading-7 text-neutral-800 font-test-tiempos-fine">
          OPENING HOURS
        </p>

        <div className="flex flex-col gap-3">
          {openingHours.map((item) => (
            <div key={item.day} className="flex items-center gap-4">
              <span
                className={`w-[5.25rem] shrink-0 text-sm leading-5 font-medium ${
                  item.closed ? "text-[#B61753]" : "text-gray-800"
                }`}
              >
                {item.day}
              </span>
              <span className="text-sm leading-5 text-neutral-800">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
