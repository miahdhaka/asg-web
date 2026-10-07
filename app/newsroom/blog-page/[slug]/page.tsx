import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/components/newsroom/blogData";
import GallerySlider from "@/components/newsroom/GallerySlider";

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
    <main className="w-full">
      <div className="mx-auto flex w-full max-w-[84rem] flex-col gap-8 px-4 pt-30 sm:pt-40 sm:px-6 lg:gap-[2.2rem] lg:px-[4.167rem] lg:pt-[11.8rem]">
        {/* ── Title block ───────────────────────────────────────────── */}
        <div className="w-full">
          <div className="flex items-center gap-2">
            <span className="font-neue-montreal text-xs sm:text-[0.95rem] tracking-wide leading-[1.25rem] text-neutral-800">
              {post.label}
            </span>
            <span aria-hidden className="h-[0.8125rem] w-px bg-neutral-600" />
            <span className="font-neue-montreal text-xs sm:text-[0.95rem] tracking-wide leading-[1.25rem] text-neutral-800">
              {post.category}
            </span>
          </div>

          <h1 className="mt-2 font-archivo-black text-[1.125rem] sm:text-[3rem] leading-[1.75rem] sm:leading-[3.3rem] font-normal text-black">
            {post.title}
          </h1>

          <p className="mt-4 font-neue-montreal text-xs sm:text-[0.9rem] leading-[1.25rem] tracking-wider text-neutral-800">
            Published: {post.publishedAt}
          </p>
        </div>

        {/* ── Single wide hero image ───────────────────────── */}
        <div className="relative aspect-[328/214] w-full overflow-hidden bg-[#D9D9D9] sm:aspect-[915/520] rounded-[0.75rem] sm:rounded-[1.5rem]">
          <Image
            src={post.heroImages[0]}
            alt={post.title}
            fill
            sizes="(min-width: 72rem) 72rem, 100vw"
            priority
            draggable={false}
            className="pointer-events-none object-cover"
            quality={90}
          />
        </div>

        {/* ── Body paragraphs ───────────────────────────────────────── */}
        <p className="font-archivo-black text-[1.25rem] font-bold sm:text-[1.2rem] leading-[1.6] lg:text-[2rem]">
          {post.lead}
        </p>

        <div className="flex flex-col gap-4 lg:gap-[1.15rem]">
          {post.body.map((p, i) => (
            <p
              key={i}
              className="font-neue-montreal text-base text-neutral-700 sm:text-[1.15rem] leading-[1.4] text-justify tracking-wider"
            >
              {p}
            </p>
          ))}
        </div>

        {/* ── "A look inside…" wide photo + gallery row ─────────────── */}
        <section className="flex flex-col gap-5 lg:gap-[1rem] mt-6 sm:mt-[2.2rem]">
          <h2 className="font-archivo-black text-2xl text-neutral-900 sm:text-[1.5rem] lg:text-[2.85rem] tracking-wide">
            {post.eventSection.heading}
          </h2>

          <div className="relative aspect-[328/214] w-full overflow-hidden rounded-[0.75rem] sm:rounded-[1.5rem] bg-[#D9D9D9] sm:aspect-[16/9]">
            {post.eventSection.wideVideo ? (
              <video
                src={post.eventSection.wideVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={post.eventSection.wideImage}
                alt={`${post.eventSection.heading} — wide shot`}
                fill
                sizes="(min-width: 1280px) 72rem, 100vw"
                draggable={false}
                className="pointer-events-none object-cover"
                quality={90}
              />
            )}
          </div>
        </section>
      </div>

      {/* ── Gallery slider — separate full-bleed section, no side padding ── */}
      <div className="my-10 lg:my-[5.2rem]">
        <GallerySlider
          images={post.eventSection.galleryImages}
          heading={post.eventSection.heading}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[84rem] flex-col gap-8 px-4 sm:px-6 lg:gap-[2.2rem] lg:px-[4.167rem]">
        {/* ── "EXCLUSIVE ASG EVENTS" 3-card grid ────────────────────── */}
        <section className="flex flex-col gap-6 lg:gap-[2.5rem] pb-5 sm:pb-[3rem]">
          <h2 className="font-archivo-black text-2xl text-neutral-900 sm:text-[1.5rem] lg:text-[2.85rem] tracking-wide max-w-[20rem] sm:max-w-[30rem] leading-[1.15] uppercase">
            {post.exclusiveEvents.heading}
          </h2>

          {/* Staggered 3-card row — the middle column drops lower than the sides */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-5">
            {post.exclusiveEvents.items.map((item, i) => (
              <div
                key={item.caption}
                className={`flex flex-col gap-4 lg:gap-[1.5rem] ${
                  i === 1 ? "lg:mt-[4rem]" : ""
                }`}
              >
                <div className="relative aspect-[5/8] w-full overflow-hidden rounded-[0.75rem] sm:rounded-[1.25rem] bg-[#D9D9D9]">
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
                <p className="font-archivo-black text-[1.35rem] font-bold sm:text-[1.2rem] leading-[1.25] lg:text-[2rem]">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── "The new MIAH collection" — full-bleed white band ──────── */}
        <section className="relative left-1/2 w-screen -translate-x-1/2 bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto grid w-full max-w-[84rem] grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-[4rem] lg:px-[4.167rem]">
            <div className="flex flex-col gap-5 lg:gap-[1.25rem]">
              <h2 className="font-archivo-black text-2xl text-neutral-900 sm:text-[1.5rem] lg:text-[2.85rem] tracking-wide leading-[1.15]">
                {post.collectionSection.heading}
              </h2>
              <p className="font-neue-montreal text-base text-neutral-700 sm:text-[1.15rem] leading-[1.4] text-justify tracking-wider">
                {post.collectionSection.description}
              </p>
            </div>

            <div className="relative aspect-[328/214] w-full overflow-hidden bg-[#D9D9D9] sm:aspect-[16/9] rounded-[0.75rem] sm:rounded-[1.5rem]">
              <Image
                src={post.collectionSection.photos[0]}
                alt={`${post.collectionSection.heading} photo`}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                draggable={false}
                className="pointer-events-none object-cover"
                quality={85}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
