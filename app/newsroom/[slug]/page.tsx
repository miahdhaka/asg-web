import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SquareArrowOutUpRight } from "lucide-react";
import { newsArticles, getNewsArticle } from "@/components/newsroom/newsData";

/* ------------------------------------------------------------------ */
/*  Static generation                                                  */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/newsroom/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) return { title: "News | ASG - Amanat Shah Group" };

  return {
    title: `${article.title} | ASG - Amanat Shah Group`,
    description: article.body[0]?.slice(0, 160) ?? "",
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function NewsDetailPage({
  params,
}: PageProps<"/newsroom/[slug]">) {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) notFound();

  return (
    <main className="flex flex-col w-full max-w-[80rem] mx-auto pt-[3.5rem] mt-[6rem] px-5">
      {/* ── Meta + Title ──────────────────────────────────────────── */}
      <div className="w-full">
        {/* Category / label row */}
        <div className="flex items-center gap-2">
          <span className="font-neue-montreal text-[1rem] tracking-wide leading-[1.25rem] text-neutral-800">
            {article.label}
          </span>
          <span
            aria-hidden
            className="h-[0.8125rem] w-px rotate-[30deg] bg-neutral-600"
          />
          <span className="font-neue-montreal text-[1rem] tracking-wide leading-[1.25rem] text-neutral-800">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-4 font-serif text-[2.2rem] leading-[3rem] font-normal text-black">
          {article.title}
        </h1>
      </div>

      {/* ── Info row ──────────────────────────────────────────────── */}
      <div className="flex w-full flex-wrap items-center gap-6 mt-10">
        {/* Published date */}
        <span className="font-neue-montreal text-[1rem] leading-[1.25rem] tracking-wider text-neutral-800">
          Published: {article.publishedAt}
        </span>

        {/* Newspaper source icon */}
        <div className="bg-gray-100 p-3">
          <Image
            src="/images/newsroom/prothom-alo.png"
            alt="Prothom Alo"
            width={1920}
            height={1080}
            priority
            quality={90}
            className="w-[5rem] object-contain"
          />
        </div>


        {/* Spacer pushes social + button to the right */}
        <div className="flex-1" />

        {/* Social share */}
        <div className="flex items-center gap-2">
          {/* Facebook */}
          <button
            type="button"
            aria-label="Share on Facebook"
            className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-full bg-[#1877F2] transition-all duration-300 ease-out hover:ring-2 hover:ring-[#1877F2] hover:ring-offset-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                fill="#fff"
              />
            </svg>
          </button>

          {/* Instagram */}
          <button
            type="button"
            aria-label="Share on Instagram"
            className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-out hover:ring-2 hover:ring-[#E4405F] hover:ring-offset-2"
            style={{ background: "linear-gradient(45deg, #FFD521 14.64%, #FFD020 18.53%, #FEC01E 23.41%, #FCA71B 28.79%, #FA8316 34.59%, #F85510 40.67%, #F51E09 46.89%, #F30005 50%, #F20007 50.21%, #E1003B 56.86%, #D30067 63.29%, #C70088 69.52%, #BF00A0 75.39%, #BB00AF 80.83%, #B900B4 85.36%)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="#fff" strokeWidth="2" />
              <circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="#fff" />
            </svg>
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            aria-label="Share on LinkedIn"
            className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-full bg-[#0A66C2] transition-all duration-300 ease-out hover:ring-2 hover:ring-[#0A66C2] hover:ring-offset-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"
                fill="#fff"
              />
              <rect x="2" y="9" width="4" height="12" fill="#fff" />
              <circle cx="4" cy="4" r="2" fill="#fff" />
            </svg>
          </button>
        </div>

        {/* "Read full article" button */}
        <a
          href="#"
          className="group relative inline-flex w-fit items-center justify-center self-start overflow-hidden border px-6 py-3 text-sm font-medium leading-none lg:px-[2em] lg:py-[1em] lg:text-[1.17em]"
          style={{
            borderImage: "var(--primary-gradient) 1",
            borderWidth: 1,
          }}
        >
          {/* Invisible spacer — preserves the button's intrinsic width/height */}
          <span className="invisible inline-flex items-center gap-1 whitespace-nowrap lg:gap-[0.33em]">
            Read full article
            <SquareArrowOutUpRight className="h-4 w-4" />
          </span>

          {/* Default: gradient text — slides down and out on hover */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center gap-1 whitespace-nowrap text-[#1AA179] transition-transform duration-500 ease-in-out group-hover:translate-y-full lg:gap-[0.33em]"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              Read full article
            </span>
            <SquareArrowOutUpRight className="h-4 w-4" />
          </span>

          {/* Hover: gradient fill + white text — slides in from the top */}
          <span
            aria-hidden
            className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0 lg:gap-[0.33em]"
            style={{ background: "var(--primary-gradient)" }}
          >
            Read full article
            <SquareArrowOutUpRight className="h-4 w-4" />
          </span>
        </a>
      </div>

      {/* ── Divider ───────────────────────────────────────────────── */}
      <hr className="mt-[1.5rem] border-0 border-t border-gray-100" />

      {/* ── Hero image ────────────────────────────────────────────── */}
      <div className="mt-12 w-full">
        <div className="relative aspect-[915/520] w-full overflow-hidden bg-[#D9D9D9]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 57.1875rem, 100vw"
            priority
            draggable={false}
            className="pointer-events-none object-cover"
            quality={90}
          />
        </div>
      </div>

      {/* ── Article body ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 w-full tracking-wider pb-16 mt-8">
        {/* Paragraphs */}
        {article.body.map((p, i) => (
          <p
            key={i}
            className="font-neue-montreal text-[1.08rem] text-neutral-800 font- text-justify text-left"
          >
            {p}
          </p>
        ))}

        {/* Bulleted sub-sections */}
        {article.bulletSections?.map((section) => (
          <div key={section.heading} className="flex flex-col gap-2">
            <p className="font-neue-montreal text-[1.125rem] leading-[1.5rem] font-medium text-neutral-800">
              {section.heading}
            </p>
            {section.items.map((item, i) => (
              <div key={i} className="flex items-center gap-[0.6875rem]">
                {/* Check icon */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className="shrink-0"
                >
                  <path
                    d="M11.667 3.5L5.25 9.917 2.333 7"
                    stroke="#525252"
                    strokeWidth="1.167"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-neue-montreal text-[1rem] leading-[1.5rem] text-neutral-600">
                  {item}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
