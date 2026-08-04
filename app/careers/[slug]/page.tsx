import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
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
    <main className="mx-auto mt-[6rem] w-full max-w-[43.1875rem] px-5 pt-[3.5rem] pb-16">
      {/* ── Title row: badge + title + meta, Apply button on right ── */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 flex-col">
          {/* Department badge + role title */}
          <div className="flex flex-col gap-2">
            <span className="w-fit bg-gray-100 px-2 py-1 text-xs leading-4 text-neutral-800">
              {job.department}
            </span>
            <h1 className="font-test-tiempos-fine text-2xl font-medium leading-8 text-neutral-800">
              {job.title}
            </h1>
          </div>

          {/* Meta row */}
          <div className="mt-8 flex flex-wrap items-center gap-[0.8125rem]">
            <p className="flex items-center gap-1 text-xs text-neutral-800">
              <Image
                src="/icons/career/hq-pin.svg"
                alt=""
                width={15}
                height={15}
                quality={100}
                className="size-3.5 shrink-0"
              />
              {getWorkplaceLabel(job)}
            </p>
            <p className="flex items-center gap-1 text-xs text-neutral-800">
              <Image
                src="/icons/career/employment.svg"
                alt=""
                width={18}
                height={18}
                quality={100}
                className="size-[1.125rem] shrink-0"
              />
              {job.employment}
            </p>
            <p className="flex items-center gap-1 text-xs text-neutral-800">
              <Image
                src="/icons/career/deadline.svg"
                alt=""
                width={18}
                height={18}
                quality={100}
                className="size-[1.125rem] shrink-0"
              />
              Deadline: {job.deadline}
            </p>
          </div>
        </div>

        {/* Apply now — gradient flip button */}
        <a
          href="#"
          className="group relative mt-6 inline-flex shrink-0 items-center justify-center overflow-hidden border px-6 py-3 text-sm font-medium leading-none"
          style={{
            borderImage: "var(--primary-gradient) 1",
            borderWidth: 1,
          }}
        >
          {/* Invisible spacer — preserves the button's intrinsic width/height */}
          <span className="invisible inline-flex items-center gap-1 whitespace-nowrap">
            Apply now
            <ArrowUpRight className="h-[1.125rem] w-[1.125rem]" />
          </span>

          {/* Default: gradient text — slides down and out on hover */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center gap-1 whitespace-nowrap text-[#1AA179] transition-transform duration-500 ease-in-out group-hover:translate-y-full"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              Apply now
            </span>
            <ArrowUpRight className="h-[1.125rem] w-[1.125rem]" />
          </span>

          {/* Hover: gradient fill + white text — slides in from the top */}
          <span
            aria-hidden
            className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0"
            style={{ background: "var(--primary-gradient)" }}
          >
            Apply now
            <ArrowUpRight className="h-[1.125rem] w-[1.125rem]" />
          </span>
        </a>
      </div>

      {/* ── Job description ──────────────────────────────────────── */}
      <div className="mt-10 flex flex-col gap-4">
        <h2 className="font-test-tiempos-fine text-2xl font-medium leading-8 text-neutral-800">
          Job description
        </h2>

        <div className="flex flex-col gap-4">
          {blocks.map((block) => (
            <div key={block.heading} className="flex flex-col gap-2">
              <p className="text-base font-medium leading-6 text-neutral-800">
                {block.heading}
              </p>

              {block.paragraphs?.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm leading-5 text-neutral-600 text-justify"
                >
                  {paragraph}
                </p>
              ))}

              {block.bullets?.map((item, i) => (
                <div key={i} className="flex items-start gap-[0.6875rem]">
                  {/* Arrow bullet icon */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                    className="mt-[0.1875rem] shrink-0"
                  >
                    <path
                      d="M2.91797 7H11.0846"
                      stroke="#262626"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 2.91602L11.0833 6.99935L7 11.0827"
                      stroke="#262626"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm leading-5 text-neutral-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <hr className="mt-10 border-0 border-t border-gray-100" />

      {/* ── Share ────────────────────────────────────────────────── */}
      <div className="mt-6 flex flex-col gap-6">
        <h2 className="font-test-tiempos-fine text-2xl font-medium leading-8 text-neutral-800">
          Share with your friends
        </h2>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Share on LinkedIn"
            className="cursor-pointer transition-opacity hover:opacity-80"
          >
            <Image
              src="/icons/career/share-linkedin.svg"
              alt=""
              width={28}
              height={28}
              quality={100}
            />
          </button>
          <button
            type="button"
            aria-label="Share on Facebook"
            className="cursor-pointer transition-opacity hover:opacity-80"
          >
            <Image
              src="/icons/career/share-facebook.svg"
              alt=""
              width={28}
              height={28}
              quality={100}
            />
          </button>
          <button
            type="button"
            aria-label="Share on Instagram"
            className="cursor-pointer transition-opacity hover:opacity-80"
          >
            <Image
              src="/icons/career/share-instagram.svg"
              alt=""
              width={28}
              height={28}
              quality={100}
            />
          </button>
        </div>
      </div>
    </main>
  );
}
