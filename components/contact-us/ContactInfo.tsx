import { Building2 } from "lucide-react";
import { headquarters, telHref, mailHref, contactLinkClass } from "./contactData";

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Heading — two rv-split lines so the word-rise fires while keeping
          the hard line break (splitWords reads textContent, which drops <br/>) */}
      <div className="pr-4 sm:pr-8 lg:pr-[5rem]">
        <p className="text-xl lg:text-[1.5rem] leading-7 lg:leading-[2.3rem] text-neutral-800 font-archivo-black uppercase rv-split">
          Let's Build
        </p>
        <p className="text-xl lg:text-[1.5rem] leading-7 lg:leading-[2.3rem] text-neutral-800 font-archivo-black uppercase rv-split">
          Togethers
        </p>
      </div>

      {/* Head Office info block */}
      <div className="flex flex-col gap-5 pr-4 sm:pr-8 lg:pr-[5rem] rv">
        <div className="flex items-center gap-3">
          <div className="flex h-[2.5rem] w-[2.5rem] sm:h-[3rem] sm:w-[3rem] shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200">
            <Building2 size={18} className="sm:hidden text-neutral-800" strokeWidth={1.5} />
            <Building2 size={22} className="hidden sm:block text-neutral-800" strokeWidth={1.5} />
          </div>
          <span className="font-archivo-black text-sm lg:text-[1.15rem] font-semibold text-gray-800 uppercase tracking-wide">
            Head Office
          </span>
        </div>

        <div className="text-sm lg:text-[1.1rem] text-neutral-700 flex flex-col gap-1.5 sm:gap-3 pl-1">
          {/* Address */}
          <p className="leading-relaxed whitespace-pre-line">
            {headquarters.location}
          </p>

          {/* Phones — each number is its own tel: link, so a click hands the
              dialer exactly one number. The comma separator is aria-hidden so
              a screen reader doesn't read it as part of the number. */}
          <p>
            {headquarters.phones.map((phone, i) => (
              <span key={phone}>
                <a href={telHref(phone)} className={contactLinkClass}>
                  {phone}
                </a>
                {i < headquarters.phones.length - 1 && <span aria-hidden>, </span>}
              </span>
            ))}
          </p>

          {/* Email */}
          <p>
            <a href={mailHref(headquarters.email)} className={contactLinkClass}>
              {headquarters.email}
            </a>
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-200" />

      {/* Opening Hours */}
      <div className="flex flex-col gap-3 pr-4 sm:pr-8 lg:pr-[5rem] rv">
        <p className="text-sm lg:text-[1.15rem] font-semibold text-gray-800 uppercase tracking-wide">
          Opening Hours
        </p>
        <p className="text-sm lg:text-[1.1rem] text-neutral-700">
          Sat-Thu, 10:00 AM - 7:00 PM
        </p>
        <p className="text-sm lg:text-[1.1rem]">
          <span className="text-red-600 font-medium">Closed: </span>Friday
        </p>
      </div>
    </div>
  );
}
