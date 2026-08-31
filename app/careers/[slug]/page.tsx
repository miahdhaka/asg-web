import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Briefcase, BriefcaseBusiness, Calendar, MapPinned } from "lucide-react";
import {
  jobs,
  getJob,
  getWorkplaceLabel,
  getJobDetailBlocks,
} from "@/components/career/careerData";

/* ------------------------------------------------------------------ */
/*  Static generation                                                  */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) return { title: "Careers | ASG - Amanat Shah Group" };

  return {
    title: `${job.title} | ASG - Amanat Shah Group`,
    description: `${job.department} · ${job.location} · Deadline: ${job.deadline}`,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function JobDetailPage({
  params,
}: PageProps<"/careers/[slug]">) {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) notFound();

  const blocks = getJobDetailBlocks(job);

  return (
    <main className="mx-auto mt-[4rem] sm:mt-[6rem] w-full max-w-[59rem] px-4 pt-8 pb-16 sm:px-5 sm:pt-[3.5rem]">
      {/* ── Title row ── */}
      <div className="flex flex-col gap-4 sm:gap-6 lg:hidden">
        {/* 1. Department badge */}
        <span className="order-1 w-fit bg-gray-100 text-xs sm:text-[1rem] text-neutral-800 tracking-wide px-2.5 py-1">
          {job.department}
        </span>

        {/* 2. Job title */}
        <h1 className="order-2 font-test-tiempos-fine text-2xl lg:text-[2rem] text-neutral-800 font-medium">
          {job.title}
        </h1>

        {/* 3. Apply now — full-width on mobile */}
        <a
          href={`/careers/${job.id}/apply`}
          className="order-3 group relative inline-flex w-full items-center justify-center overflow-hidden px-6 py-3 text-sm lg:hidden leading-none"
          style={{
            borderImage: "var(--primary-gradient) 1",
            borderWidth: 1,
          }}
        >
          <span className="invisible inline-flex items-center gap-1.5 whitespace-nowrap">
            Apply now
            <ArrowUpRight className="h-4 sm:h-5 w-4 sm:w-5" />
          </span>
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center gap-1.5 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-full"
            style={{ background: "var(--primary-gradient)" }}
          >
            Apply now
            <ArrowUpRight className="h-5 w-5 text-white" />
          </span>
          <span
            aria-hidden
            className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1.5 whitespace-nowrap text-[image:var(--primary-gradient)] transition-transform duration-500 ease-in-out group-hover:translate-y-0"
          >
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--primary-gradient)" }}>
              Apply now
            </span>
            <ArrowUpRight className="h-5 w-5" style={{ color: '#1AA179' }} />
          </span>
        </a>

        {/* 4. Meta row — below button on mobile */}
        <div className="order-4 flex flex-wrap items-center gap-x-2.5 gap-y-2 sm:gap-[1.2rem] text-xs lg:hidden text-neutral-600">
          <p className="flex items-center gap-1 sm:gap-1.5">
            <MapPinned className="size-[1rem] sm:size-[1.125rem] shrink-0" />
            {getWorkplaceLabel(job)}
          </p>
          <p className="flex items-center gap-1 sm:gap-1.5">
            <BriefcaseBusiness className="size-[1rem] sm:size-[1.125rem] shrink-0" />
            {job.employment}
          </p>
          <p className="flex items-center gap-1 sm:gap-1.5">
            <Calendar className="size-[1rem] sm:size-[1.125rem] shrink-0" />
            Deadline: {job.deadline}
          </p>
        </div>
      </div>

      {/* Desktop: original left-column + right-button layout */}
      <div className="hidden lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-6">
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-col gap-3">
            <span className="w-fit bg-gray-100 text-[1rem] text-neutral-800 tracking-wide px-2.5 py-1">
              {job.department}
            </span>
            <h1 className="font-test-tiempos-fine text-[2rem] text-neutral-800 font-medium">
              {job.title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-[1.2rem] text-[1rem] tracking-wider text-neutral-600 mt-4">
            <p className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full border border-neutral-200">
                <MapPinned className="size-[1.125rem] shrink-0 text-neutral-500" />
              </span>
              {getWorkplaceLabel(job)}
            </p>
            <p className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full border border-neutral-200">
                <BriefcaseBusiness className="size-[1.125rem] shrink-0 text-neutral-500" />
              </span>
              {job.employment}
            </p>
            <p className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full border border-neutral-200">
                <Calendar className="size-[1.125rem] shrink-0 text-neutral-500" />
              </span>
              Deadline: {job.deadline}
            </p>
          </div>
        </div>

        {/* Apply now — desktop */}
        <a
          href={`/careers/${job.id}/apply`}
          className="group relative mt-6 inline-flex w-fit shrink-0 items-center justify-center overflow-hidden px-8 py-4 text-[1.125rem] leading-none"
          style={{
            borderImage: "var(--primary-gradient) 1",
            borderWidth: 1,
          }}
        >
          <span className="invisible inline-flex items-center gap-1.5 whitespace-nowrap">
            Apply now
            <ArrowUpRight className="h-5 w-5" />
          </span>
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center gap-1.5 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-full"
            style={{ background: "var(--primary-gradient)" }}
          >
            Apply now
            <ArrowUpRight className="h-5 w-5 text-white" />
          </span>
          <span
            aria-hidden
            className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1.5 whitespace-nowrap text-[image:var(--primary-gradient)] transition-transform duration-500 ease-in-out group-hover:translate-y-0"
          >
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--primary-gradient)" }}>
              Apply now
            </span>
            <ArrowUpRight className="h-5 w-5" style={{ color: '#1AA179' }} />
          </span>
        </a>
      </div>

      {/* Job description */}
      <div className="flex flex-col gap-4.5 mt-8 sm:mt-12">
        <h2 className="font-test-tiempos-fine text-xl lg:text-[2rem] text-neutral-800 font-medium">
          Job description
        </h2>

        <div className="flex flex-col gap-6">
          {blocks.map((block) => (
            <div key={block.heading} className="flex flex-col gap-2.5">
              <p className="text-base lg:text-[1.4rem] font-medium text-neutral-800">
                {block.heading}
              </p>

              {block.paragraphs?.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm lg:text-[1.1rem] sm:leading-6.5 text-neutral-600 text-justify"
                >
                  {paragraph}
                </p>
              ))}

              {block.bullets?.map((item, i) => (
                <div key={i} className="flex items-start gap-[0.6875rem]">
                  {/* Arrow bullet icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                    className="mt-[0.1875rem] shrink-0"
                  >
                    <path
                      d="M2.91797 7H11.0846"
                      stroke="#525252"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 2.91602L11.0833 6.99935L7 11.0827"
                      stroke="#525252"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm lg:text-[1.1rem] leading-6.5 text-neutral-600 text-justify">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <hr className="mt-6 sm:mt-10 border-0 border-t border-gray-100" />

      {/* ── Share ────────────────────────────────────────────────── */}
      <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6">
        <h2 className="font-test-tiempos-fine text-xl lg:text-[2rem] text-neutral-800 font-medium">
          Share with your friends
        </h2>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Share on LinkedIn"
            className="group relative flex size-9 sm:size-14 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors duration-500 ease-in-out hover:border-transparent before:absolute before:inset-0 before:rounded-full before:bg-[image:var(--primary-gradient)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-in-out hover:before:opacity-100"
          >
            <Image
              src="/icons/social-icon/linkedin.png"
              alt="LinkedIn"
              width={20}
              height={20}
              quality={100}
              className="relative z-10 size-4 sm:size-7 object-contain brightness-0 transition-all duration-500 group-hover:invert"
            />
          </button>

          <button
            type="button"
            aria-label="Share on Facebook"
            className="group relative flex size-9 sm:size-14 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors duration-500 ease-in-out hover:border-transparent before:absolute before:inset-0 before:rounded-full before:bg-[image:var(--primary-gradient)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-in-out hover:before:opacity-100"
          >
            <Image
              src="/icons/social-icon/facebook.png"
              alt="Facebook"
              width={20}
              height={20}
              quality={100}
              className="relative z-10 size-4 sm:size-7 object-contain brightness-0 transition-all duration-500 group-hover:invert"
            />
          </button>

          <button
            type="button"
            aria-label="Share on Instagram"
            className="group relative flex size-9 sm:size-14 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors duration-500 ease-in-out hover:border-transparent before:absolute before:inset-0 before:rounded-full before:bg-[image:var(--primary-gradient)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-in-out hover:before:opacity-100"
          >
            <Image
              src="/icons/social-icon/instagram.png"
              alt="Instagram"
              width={20}
              height={20}
              quality={100}
              className="relative z-10 size-3.5 sm:size-6 object-contain brightness-0 transition-all duration-500 group-hover:invert"
            />
          </button>
        </div>
      </div>
    </main>
  );
}
