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
      <span className="font-neue-montreal text-[0.875rem] leading-[1.25rem] text-neutral-600">
        {date}
      </span>
      <span
        aria-hidden
        className="h-3 w-px rotate-[30deg] bg-neutral-600"
      />
      <span className="font-neue-montreal text-[0.875rem] leading-[1.25rem] text-neutral-600">
        {category}
      </span>
    </div>
  );
}

/** Small card — image on top, meta + title below */
function SmallCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/newsroom/${item.slug}`} data-news-card className="group flex flex-col gap-3">
      {/* Image */}
      <div className="relative aspect-[431/329] w-full overflow-hidden bg-[#D9D9D9]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
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

      {/* Meta */}
      <CardMeta date={item.date} category={item.category} />

      {/* Title */}
      <h3 className="max-w-[21.5625rem] font-serif text-[1.5rem] leading-[2rem] font-normal text-neutral-800">
        {item.title}
      </h3>
    </Link>
  );
}

/** Featured (large) card — wide image, meta + title right-aligned below */
function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/newsroom/${item.slug}`} className="group flex flex-col gap-3">
      {/* Image */}
      <div className="relative aspect-[873/328] w-full overflow-hidden bg-[#D9D9D9]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
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

      {/* Meta + title — right-aligned */}
      <div className="flex flex-col items-start gap-2">
        <CardMeta date={item.date} category={item.category} />
        <h3 className="max-w-[25.5625rem] text-left font-serif text-[1.5rem] leading-[2rem] font-normal text-neutral-800">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function NewsGrid() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_SMALL_COUNT);
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
    const nextCount = Math.min(visibleCount + LOAD_MORE_COUNT, smallCards.length);
    const addedCount = nextCount - visibleCount;
    setVisibleCount(nextCount);

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
  });

  return (
    <section className="flex w-full flex-col gap-[2rem] px-[4.167rem] py-[3rem]">
      {/* Featured row — large card left, small card right */}
      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <FeaturedCard item={featured} />
        <SmallCard item={sideCard} />
      </div>

      {/* Small-card rows */}
      <div ref={newCardsRef} className="flex flex-col gap-4">
        {visibleRows.map((row, ri) => (
          <div key={`row-${ri}`} className="grid grid-cols-3 gap-4">
            {row.map((item, i) => (
              <SmallCard key={`sm-${ri}-${i}`} item={item} />
            ))}
          </div>
        ))}
      </div>

      {/* Load more button — only when more than 6 remaining */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={handleLoadMore}
            data-label="Load more"
            className="primary-btn-flip-gradient font-medium cursor-pointer leading-[1.25rem] px-[2.25rem] py-[0.75rem] text-[0.875rem]"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
