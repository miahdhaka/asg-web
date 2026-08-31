"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { newsArticles, type NewsItem } from "./newsData";

gsap.registerPlugin(useGSAP);

const featured = newsArticles[0];
const sideCard = newsArticles[1];
/** Small-card pool (everything after featured + side) */
const smallCards = newsArticles.slice(2);

const INITIAL_SMALL_COUNT = 6;
const LOAD_MORE_COUNT = 6;

function CardMeta({ date, category }: { date: string; category: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-neue-montreal text-[1rem] leading-[1.25rem] text-neutral-600">
        {date}
      </span>
      <span
        aria-hidden
        className="h-3 w-px rotate-[30deg] bg-neutral-600"
      />
      <span className="font-neue-montreal text-[1rem] leading-[1.25rem] text-neutral-600">
        {category}
      </span>
    </div>
  );
}

/** Small card — image on top, meta + title below */
function SmallCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/newsroom/${item.slug}`} data-news-card className="group flex flex-col gap-4 border-b border-neutral-200 pb-4 sm:border-b-0 sm:pb-0">
      {/* Image */}
      <div className="relative h-80 sm:h-[28rem] w-full overflow-hidden bg-[#D9D9D9] rounded-[4px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          draggable={false}
          className="pointer-events-none object-cover"
          quality={80}
        />
        {/* Hover overlay */}
        <div
          aria-hidden
          className="absolute inset-0 overlay-image-hover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-col gap-1">
        {/* Meta */}
        <CardMeta date={item.date} category={item.category} />

        {/* Title */}
        <h3 className="max-w-[26.5625rem] text-left font-serif text-lg tracking-wide sm:text-[1.8rem] leading-[1.5rem] sm:leading-[2.2rem] font-normal text-neutral-800">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

/** Featured (large) card — wide image, meta + title right-aligned below */
function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/newsroom/${item.slug}`} className="group flex flex-col gap-4 border-b border-neutral-200 pb-4 sm:border-b-0 sm:pb-0">
      {/* Image */}
      <div className="relative h-80 sm:h-[28rem] w-full overflow-hidden bg-[#D9D9D9] rounded-[4px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 640px) 60vw, 100vw"
          draggable={false}
          className="pointer-events-none object-cover"
          quality={80}
        />
        {/* Hover overlay */}
        <div
          aria-hidden
          className="absolute inset-0 overlay-image-hover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-col gap-1">
        <CardMeta date={item.date} category={item.category} />
        <h3 className="max-w-[25.5625rem] text-left font-serif text-lg sm:text-[1.5rem] leading-[2rem] sm:leading-[2rem] font-normal text-neutral-800">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

/*  Main component */

export default function NewsGrid() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_SMALL_COUNT);
  const [loading, setLoading] = useState(false);
  const newCardsRef = useRef<HTMLDivElement>(null);

  const hasMore = smallCards.length - visibleCount >= 6;
  const visibleSmall = smallCards.slice(0, visibleCount);
  /* Group visible small cards into rows of 3 */
  const visibleRows: NewsItem[][] = [];
  for (let i = 0; i < visibleSmall.length; i += 3) {
    visibleRows.push(visibleSmall.slice(i, i + 3));
  }

  /* GSAP stagger animation when new cards appear */
  const { contextSafe } = useGSAP();

  const handleLoadMore = contextSafe(() => {
    setLoading(true);
    const nextCount = Math.min(visibleCount + LOAD_MORE_COUNT, smallCards.length);
    const addedCount = nextCount - visibleCount;

    setTimeout(() => {
      setVisibleCount(nextCount);
      setLoading(false);

      /* Wait a tick for React to mount the new DOM nodes */
      requestAnimationFrame(() => {
        const allCards = newCardsRef.current?.querySelectorAll("[data-news-card]");
        if (!allCards?.length) return;
        /* Only animate the newly added cards (last N in the container) */
        const newCards = Array.from(allCards).slice(-addedCount);
        gsap.from(newCards, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        });
      });
    }, 400);
  });

  return (
    <section className="flex w-full flex-col flex w-full flex-col gap-6 lg:gap-[3rem] px-4 sm:px-6 lg:px-[4.167rem] py-6 sm:py-9 lg:py-[4rem] px-4 sm:px-6 lg:px-[4.167rem] py-6 sm:py-9 lg:py-[4rem]">
      {/* Featured row — large card left, small card right */}
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-x-10 sm:gap-x-5 gap-y-6 lg:gap-y-[4rem]">
        <FeaturedCard item={featured} />
        <SmallCard item={sideCard} />
      </div>

      {/* Small-card rows */}
      <div ref={newCardsRef} className="flex flex-col gap-x-10 sm:gap-x-4 gap-y-6 lg:gap-y-[3rem]">
        {visibleRows.map((row, ri) => (
          <div key={`row-${ri}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 sm:gap-x-5 gap-y-6 lg:gap-y-[3rem]">
            {row.map((item, i) => (
              <SmallCard key={`sm-${ri}-${i}`} item={item} />
            ))}
          </div>
        ))}
      </div>

      {/* Load more / spinner — same container, no layout shift */}
      {hasMore && (
        <div className="flex justify-center items-center pt-4 min-h-[4rem]">
          {loading ? (
            <svg className="size-10 lg:size-12 animate-spin" viewBox="0 0 50 50">
              <defs>
                <linearGradient id="news-spinner-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8BC34A" />
                  <stop offset="100%" stopColor="#1AA179" />
                </linearGradient>
              </defs>
              <circle
                cx="25" cy="25" r="20"
                fill="none"
                stroke="url(#news-spinner-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="90 150"
              />
            </svg>
          ) : (
            <button
              type="button"
              onClick={handleLoadMore}
              data-label="Load more"
              className="primary-btn-flip-gradient font-medium cursor-pointer leading-[1.5rem] px-[2.75rem] py-[1rem] text-[1rem]"
            >
              Load more
            </button>
          )}
        </div>
      )}
    </section>
  );
}
