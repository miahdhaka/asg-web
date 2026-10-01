import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/components/newsroom/blogData";

/* ------------------------------------------------------------------ */
/*  Static generation                                                  */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return { title: "Blog | ASG - Amanat Shah Group" };

  return {
    title: `${post.title} | ASG - Amanat Shah Group`,
    description: post.body[0]?.slice(0, 160) ?? "",
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <main className="w-full pt-[var(--header-height)]">
      <div className="mx-auto flex w-full max-w-[72rem] flex-col gap-8 px-4 py-10 sm:px-6 lg:gap-[2.5rem] lg:px-[4.167rem] lg:py-[4rem]">
        {/* ── Back link ─────────────────────────────────────────────── */}
        <Link
          href="/newsroom"
          className="inline-flex w-fit items-center gap-2 font-neue-montreal text-sm text-neutral-600 transition-colors hover:text-neutral-900 sm:text-[1rem]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Newsroom
        </Link>

        {/* ── Title block ───────────────────────────────────────────── */}
        <div className="w-full">
          <div className="flex items-center gap-2">
            <span className="font-neue-montreal text-xs tracking-wide text-neutral-600 sm:text-[0.95rem]">
              {post.label}
            </span>
            <span aria-hidden className="h-3 w-px rotate-[30deg] bg-neutral-400" />
            <span className="font-neue-montreal text-xs tracking-wide text-neutral-600 sm:text-[0.95rem]">
              {post.category}
            </span>
            <span aria-hidden className="h-3 w-px rotate-[30deg] bg-neutral-400" />
            <span className="font-neue-montreal text-xs tracking-wide text-neutral-600 sm:text-[0.95rem]">
              {post.publishedAt}
            </span>
          </div>

          <h1 className="mt-3 max-w-[52rem] font-archivo-black text-[1.5rem] leading-[1.2] text-neutral-900 sm:text-[2rem] lg:text-[2.5rem] lg:leading-[1.15]">
            {post.title}
          </h1>
        </div>

        {/* ── Two hero portraits side by side ───────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-[1.5rem]">
          {post.heroImages.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-[#D9D9D9]"
            >
              <Image
                src={src}
                alt={`${post.title} — photo ${i + 1}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                priority={i === 0}
                draggable={false}
                className="pointer-events-none object-cover"
                quality={90}
              />
            </div>
          ))}
        </div>

        {/* ── Body paragraphs ───────────────────────────────────────── */}
        <div className="flex flex-col gap-4 lg:gap-[1.15rem]">
          {post.body.map((p, i) => (
            <p
              key={i}
              className="font-neue-montreal text-sm text-neutral-800 sm:text-[1.08rem] leading-[1.65] text-justify"
            >
              {p}
            </p>
          ))}
        </div>

        {/* ── "A look inside…" wide photo + gallery row ─────────────── */}
        <section className="flex flex-col gap-5 lg:gap-[1.75rem]">
          <h2 className="font-archivo-black text-lg text-neutral-900 sm:text-[1.5rem] lg:text-[1.75rem]">
            {post.eventSection.heading}
          </h2>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.25rem] bg-[#D9D9D9]">
            <Image
              src={post.eventSection.wideImage}
              alt={`${post.eventSection.heading} — wide shot`}
              fill
              sizes="(min-width: 1280px) 72rem, 100vw"
              draggable={false}
              className="pointer-events-none object-cover"
              quality={90}
            />
          </div>

          {/* 4-image gallery row */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-[1.25rem]">
            {post.eventSection.galleryImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-square w-full overflow-hidden rounded-[1rem] bg-[#D9D9D9]"
              >
                <Image
                  src={src}
                  alt={`Event gallery photo ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  draggable={false}
                  className="pointer-events-none object-cover"
                  quality={85}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── "EXCLUSIVE ASG EVENTS" 3-card grid ────────────────────── */}
        <section className="flex flex-col gap-5 lg:gap-[1.75rem]">
          <h2 className="font-archivo-black text-lg text-neutral-900 uppercase sm:text-[1.5rem] lg:text-[1.75rem]">
            {post.exclusiveEvents.heading}
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4 lg:gap-[1.5rem]">
            {post.exclusiveEvents.items.map((item) => (
              <div
                key={item.caption}
                className="flex flex-col gap-3 lg:gap-[0.875rem]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] bg-[#D9D9D9]">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    draggable={false}
                    className="pointer-events-none object-cover"
                    quality={85}
                  />
                </div>
                <p className="font-neue-montreal text-sm text-neutral-800 sm:text-[1rem] leading-[1.4]">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── "The new MIAH collection" split section ───────────────── */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-[2.5rem]">
          <div className="flex flex-col gap-4 lg:gap-[1rem]">
            <h2 className="font-archivo-black text-lg text-neutral-900 sm:text-[1.5rem] lg:text-[1.75rem]">
              {post.collectionSection.heading}
            </h2>
            <p className="font-neue-montreal text-sm text-neutral-800 sm:text-[1.08rem] leading-[1.65] text-justify">
              {post.collectionSection.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-[1.25rem]">
            {post.collectionSection.photos.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] bg-[#D9D9D9]"
              >
                <Image
                  src={src}
                  alt={`${post.collectionSection.heading} photo ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  draggable={false}
                  className="pointer-events-none object-cover"
                  quality={85}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
