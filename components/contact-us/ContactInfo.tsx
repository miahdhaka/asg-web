import { MapPinned, Phone, Mail } from "lucide-react";
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
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="flex h-[3.2rem] w-[3.2rem] shrink-0 items-center justify-center rounded bg-gray-100">
          <Icon size={24} className="text-neutral-800" strokeWidth={1.5} />
        </div>
        <span className="text-sm lg:text-[1.2rem] leading-5 font-medium text-gray-800">
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
      <div className="flex w-full max-w-[18rem] flex-col gap-5">
        <p className="text-lg lg:text-[1.5rem] leading-7 lg:leading-[2.3rem] text-neutral-800 font-test-tiempos-fine">
          CORPORATE HEADQUARTERS
        </p>

        <div className="flex flex-col justify-center gap-8">
          {/* Location */}
          <InfoBlock icon={MapPinned} label="Location">
            <p className="text-sm lg:text-[1.15rem] text-neutral-800">
              {headquarters.location}
            </p>
          </InfoBlock>

          {/* Help / Phone */}
          <InfoBlock icon={Phone} label="Help">
            <div className="flex flex-col gap-[0.6875rem]">
              {headquarters.phones.map((phone) => (
                <p key={phone} className="text-sm lg:text-[1.15rem] text-neutral-800">
                  {phone}
                </p>
              ))}
            </div>
          </InfoBlock>

          {/* Say Hello / Email */}
          <InfoBlock icon={Mail} label="Say Hello">
            <p className="text-sm lg:text-[1.15rem] text-neutral-800">
              {headquarters.email}
            </p>
          </InfoBlock>
        </div>
      </div>

      {/* Divider — spans the full left column */}
      <hr className="mt-4 lg:mt-8 border-t border-gray-100" />

      {/* Opening Hours */}
      <div className="mt-6 lg:mt-8 flex w-full max-w-[17.9375rem] flex-col gap-5">
        <p className="text-lg lg:text-[1.5rem] leading-7 lg:leading-[2.3rem] text-neutral-800 font-test-tiempos-fine">
          OPENING HOURS
        </p>

        <div className="flex flex-col gap-3">
          {openingHours.map((item) => (
            <div key={item.day} className="flex items-center gap-6">
              <span
                className={`w-20 shrink-0 text-sm lg:text-[1.2rem] leading-8 font-medium ${
                  item.closed ? "text-[#B61753]" : "text-gray-800"
                }`}
              >
                {item.day}
              </span>
              <span className="text-left text-sm lg:text-[1.2rem] text-neutral-800">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
