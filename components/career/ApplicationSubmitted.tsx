import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  Hash,
  Mail,
  MapPin,
  Phone,
  SquareArrowOutUpRight,
  User,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Mask an email: show first 3 chars of local-part, hide the rest. */
function maskEmail(email: string): string {
  if (!email) return "N/A";
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 3);
  return `${visible}${"*".repeat(Math.max(local.length - 3, 3))}@${domain}`;
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ApplicationSubmittedProps {
  refNumber: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  department: string;
  location: string;
  applicantName: string;
  appliedOn: string;
  phone: string;
  email: string;
  websiteUrl?: string;
  similarJobsUrl?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ApplicationSubmitted({
  refNumber,
  jobTitle,
  companyName,
  companyLogo = "/logo/ASG-logo-mixed.png",
  department,
  location,
  applicantName,
  appliedOn,
  phone,
  email,
  websiteUrl = "/",
  similarJobsUrl = "/careers",
}: ApplicationSubmittedProps) {
  return (
    <div className="px-0 sm:px-6 lg:px-8 pt-16 sm:pt-14 pb-4 sm:pb-14">
      <div className="mx-auto w-full max-w-[50rem]">
        {/* ── Header — centered ── */}
        <div className="text-center">
          <Image
            src="/icons/our-history/green-check.svg"
            alt=""
            width={120}
            height={120}
            quality={100}
            className="mx-auto size-24 sm:size-38 object-contain"
            unoptimized
          />
          <h1 className="font-test-tiempos-fine text-2xl lg:text-[2rem] font-medium text-neutral-800 sm:text-2xl">
            Application submitted!
          </h1>
          <p className="mt-2 text-sm text-neutral-500 sm:text-[1.15rem]">
            Thanks, {applicantName} your application has been received.
            <br />
            You&apos;ll get a confirmation email shortly.
          </p>
        </div>

        {/* ── Card ── */}
        <div className="mt-8 flex flex-col gap-3 rounded-lg bg-gray-50 px-4 py-4 sm:mt-10 sm:gap-5 sm:px-6 sm:py-6">
          {/* Ref + Title block */}
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Ref badge */}
            <span className="inline-flex w-fit items-center rounded bg-gray-200 px-2 py-1 text-xs text-neutral-800 sm:gap-1.5 sm:rounded sm:px-3 sm:py-1 sm:text-sm">
              <Hash className="hidden size-3.5 sm:inline" />
              Ref #{refNumber}
            </span>

            {/* Job title */}
            <h2 className="font-test-tiempos-fine text-lg font-medium text-neutral-800 sm:text-[1.5rem]">
              {jobTitle}
            </h2>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Detail rows — icon + label (left), value (right) */}
          <div className="flex flex-col gap-3 sm:gap-3">
            {/* Company */}
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2.5 sm:pb-3">
              <span className="flex items-center gap-1 text-xs text-neutral-800 sm:gap-2 sm:text-base">
                <Building2 className="size-[18px] shrink-0 text-neutral-400 sm:size-5" />
                Company
              </span>
              <div className="flex items-center gap-2">
                <Image
                  src={companyLogo}
                  alt={companyName}
                  width={20}
                  height={20}
                  quality={100}
                  className="size-5 object-contain"
                />
                <span className="text-xs text-neutral-800 sm:text-base">
                  {companyName}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2.5 sm:pb-3">
              <span className="flex items-center gap-1 text-xs text-neutral-800 sm:gap-2 sm:text-base">
                <MapPin className="size-[18px] shrink-0 text-neutral-400 sm:size-5" />
                Location
              </span>
              <span className="text-xs text-neutral-800 sm:text-base">
                {location}
              </span>
            </div>

            {/* Applicant */}
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2.5 sm:pb-3">
              <span className="flex items-center gap-1 text-xs text-neutral-800 sm:gap-2 sm:text-base">
                <User className="size-[18px] shrink-0 text-neutral-400 sm:size-5" />
                Applicant
              </span>
              <span className="text-xs text-neutral-800 sm:text-base">
                {applicantName}
              </span>
            </div>

            {/* Applied on */}
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2.5 sm:pb-3">
              <span className="flex items-center gap-1 text-xs text-neutral-800 sm:gap-2 sm:text-base">
                <CalendarDays className="size-[18px] shrink-0 text-neutral-400 sm:size-5" />
                Applied on
              </span>
              <span className="text-xs text-neutral-800 sm:text-base">
                {appliedOn}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2.5 sm:pb-3">
              <span className="flex items-center gap-1 text-xs text-neutral-800 sm:gap-2 sm:text-base">
                <Phone className="size-[18px] shrink-0 text-neutral-400 sm:size-5" />
                Phone
              </span>
              <span className="text-xs text-neutral-800 sm:text-base">
                {phone}
              </span>
            </div>

            {/* Email (masked) */}
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1 text-xs text-neutral-800 sm:gap-2 sm:text-base">
                <Mail className="size-[18px] shrink-0 text-neutral-400 sm:size-5" />
                Email
              </span>
              <span className="text-xs text-neutral-800 sm:text-base">
                {maskEmail(email)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="mt-4 flex items-center justify-end sm:mt-6 gap-3">
          {/* Visit website — gradient button with hover flip */}
          <a
            href={websiteUrl}
            className="group relative inline-flex w-fit items-center justify-center overflow-hidden h-[40px] px-6 py-3 text-sm leading-none lg:px-8 lg:py-4 lg:text-base lg:h-auto"
            style={{
              borderImage: "var(--primary-gradient) 1",
              borderWidth: 2,
            }}
          >
            {/* Invisible spacer */}
            <span className="invisible inline-flex items-center gap-1.5 whitespace-nowrap">
              Visit website
              <SquareArrowOutUpRight className="size-4" />
            </span>

            {/* Default: gradient fill + white text — slides down and out on hover */}
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center gap-1.5 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-full"
              style={{ background: "var(--primary-gradient)" }}
            >
              Visit website
              <SquareArrowOutUpRight className="size-4" />
            </span>

            {/* Hover: gradient text — slides in from the top */}
            <span
              aria-hidden
              className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1.5 whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:translate-y-0"
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--primary-gradient)" }}
              >
                Visit website
              </span>
              <SquareArrowOutUpRight className="size-4" style={{ color: '#1AA179' }} strokeWidth={1.5} />
            </span>
          </a>

          {/* Similar job — outline button */}
          <a
            href={similarJobsUrl}
            className="group inline-flex items-center gap-1.5 border border-neutral-200 bg-white h-[40px] px-6 py-3 text-sm text-neutral-800 leading-none transition-all duration-300 hover:bg-gray-100 hover:border-neutral-300 lg:px-8 lg:py-4 lg:text-base lg:h-auto text-nowrap"
          >
            Similar job
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
