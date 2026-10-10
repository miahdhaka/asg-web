import { Download } from "lucide-react";
import { csrCta } from "./csrData";

/* Partner CTA — full-width divider, centred headline stack and the
   gradient-ring "Download CSR Report" pill with flip hover (Figma 7740:50490) */
export default function CsrPartnerCta() {
  return (
    <section className="pb-10 lg:pb-[4.8rem]">
      <hr className="border-0 border-t border-gray-200" />

      <div className="mx-auto mt-10 flex w-full max-w-[56rem] flex-col items-center px-4 text-center lg:mt-[4.8rem]">
        <h2 className="font-archivo-black text-neutral-800 text-lg sm:text-3xl lg:text-[2.5rem] lg:leading-[3rem]">
          {csrCta.title}
        </h2>
        <p className="mt-[0.5625rem] font-archivo-black text-neutral-800 text-[2rem] leading-[1.1] sm:text-[2.875rem] lg:text-[3.875rem] lg:leading-[4rem]">
          {csrCta.highlight}
        </p>
        <p className="mt-[1.4rem] max-w-[36rem] font-neue-montreal text-base leading-5 text-[#1A1A1A] sm:text-lg sm:leading-7 lg:text-[1.375rem] lg:leading-[2rem] tracking-wider">
          {csrCta.description}
        </p>

        {/* Pill button — 1px gradient ring (dual-background technique;
            border-image can't follow radius) + slide-in flip hover */}
        <a
          href="#"
          className="group relative mt-[2rem] inline-flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-full border border-transparent px-5 py-3 text-sm font-medium leading-none sm:px-7 sm:py-5 sm:text-base lg:text-lg"
          style={{
            background:
              "linear-gradient(var(--background)) padding-box, var(--primary-gradient) border-box",
          }}
        >
          {/* Invisible spacer — preserves the button's intrinsic width/height */}
          <span className="invisible inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
            {csrCta.buttonText}
            <Download className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
          </span>

          {/* Default: gradient text — slides down and out on hover */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap text-[#1AA179] transition-transform duration-500 ease-in-out group-hover:translate-y-full"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              {csrCta.buttonText}
            </span>
            <Download className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
          </span>

          {/* Hover: gradient fill + white text — slides in from the top */}
          <span
            aria-hidden
            className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0"
            style={{ background: "var(--primary-gradient)" }}
          >
            {csrCta.buttonText}
            <Download className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
          </span>
        </a>
      </div>
    </section>
  );
}
