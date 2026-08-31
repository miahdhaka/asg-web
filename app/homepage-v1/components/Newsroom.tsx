"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface NewsItem {
  slug: string;
  date: string;
  category: string;
  title: string;
  image: string;
}

const news: NewsItem[] = [
  {
    slug: "presidents-industrial-development-award-2024-1",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news_1.webp",
  },
  {
    slug: "presidents-industrial-development-award-2024-2",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news_2.webp",
  },
  {
    slug: "news-article-3",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news_3.webp",
  },
];

export default function Newsroom() {
  // Infinite draggable strip, mirroring the OurBusiness carousel: the
  // card list is duplicated and scrollLeft is normalized into [0, half) so
  // the strip loops seamlessly in both directions. The gesture is axis-
  // locked so a vertical-intent swipe stays with the page / scroll-stepper,
  // and pointer capture keeps the drag smooth even when the cursor leaves
  // the strip. The Previous button runs a short rAF tween (also wrapped)
  // instead of native smooth-scroll, because a programmatic scrollLeft
  // would fight the wrap normalization otherwise.
  const stripRef = useRef<HTMLDivElement>(null);
  const dragPendingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);
  const dragMoved = useRef(0);
  const tweenRef = useRef<number | null>(null);

  // Normalize a scrollLeft value into [0, scrollWidth/2) so the duplicated
  // copy stays in sync — the jump is visually invisible because both halves
  // render identical content.
  const wrap = (el: HTMLDivElement, value: number) => {
    const half = el.scrollWidth / 2;
    if (!half) return value;
    let v = value;
    while (v < 0) v += half;
    while (v >= half) v -= half;
    return v;
  };

  // Keep native drift (wheel) inside [0, half) too, but never while a drag
  // or tween is actively writing scrollLeft — that would cancel the in-flight
  // motion.
  const onScroll = () => {
    if (isDraggingRef.current || tweenRef.current !== null) return;
    const el = stripRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (!half) return;
    const v = el.scrollLeft;
    if (v >= half) el.scrollLeft = v - half;
    else if (v < 0) el.scrollLeft = v + half;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    if (!el) return;
    if (tweenRef.current !== null) {
      cancelAnimationFrame(tweenRef.current);
      tweenRef.current = null;
    }
    dragPendingRef.current = true;
    isDraggingRef.current = false;
    dragMoved.current = 0;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    dragStartScroll.current = el.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    if (!el) return;

    // Decide the gesture axis on the first decisive movement.
    if (dragPendingRef.current && !isDraggingRef.current) {
      const dx = Math.abs(e.clientX - dragStartX.current);
      const dy = Math.abs(e.clientY - dragStartY.current);
      if (Math.max(dx, dy) < 6) return; // too small to tell yet
      if (dx > dy) {
        isDraggingRef.current = true;
        el.setPointerCapture(e.pointerId);
      } else {
        // Vertical intent — hand the gesture back to the page/stepper.
        dragPendingRef.current = false;
        return;
      }
    }

    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartX.current;
    dragMoved.current = Math.max(dragMoved.current, Math.abs(delta));
    el.scrollLeft = wrap(el, dragStartScroll.current - delta);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    dragPendingRef.current = false;
    isDraggingRef.current = false;
    if (!el) return;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  // Swallow the click that follows a drag so the card Link doesn't navigate.
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragMoved.current > 8) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Render the list twice so the strip can loop seamlessly via wrap().
  const loopedNews = [...news, ...news];

  return (
    <section
      id="newsroom"
      className="relative flex w-full flex-col overflow-hidden bg-white py-6 lg:py-8 h-[calc(var(--vh)-var(--header-height))] lg:h-[calc(100vh-var(--header-height))]"
    >
      {/* Header — eyebrow + title left, button right */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between px-4 lg:px-20 mb-10 gap-4">
        <div className="mt-2">
          {/* Eyebrow — drops in together with the title below */}
          <div id="newsroom-eyebrow" className="flex items-center gap-3">
            <span className="font-neue-montreal text-sm lg:text-base font-medium tracking-widest text-neutral-800 uppercase">
              Newsroom
            </span>
            <span aria-hidden className="h-1.5 w-1.5 bg-neutral-800" />
          </div>

          {/* Title — drops in from above via the Hero's fade-chain reveal */}
          <h2
            id="newsroom-title"
            className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[4rem] leading-[1] font-normal text-neutral-800"
          >
            Latest from ASG <br />newsroom
          </h2>
        </div>

        <Link
          href="/newsroom"
          data-label="More news"
          className="primary-btn-flip-gradient text-sm sm:text-base lg:text-lg px-5 sm:px-6 lg:px-10 py-3 sm:py-3.5 lg:py-5"
        >
          More news
        </Link>
      </div>

      {/* News cards — below lg the three cards would stack ~1300 px tall and
          spill far past the screen, so the section could never settle as one
          step. They become an infinite horizontal strip instead: the list is
          duplicated and scrollLeft is wrapped so it loops seamlessly in both
          directions, while the section keeps its single-screen height.
          Desktop keeps the three-column grid (clones hidden). */}
      <div className="relative flex min-h-0 flex-1 items-start px-4 lg:px-20">
        <div className="relative w-full lg:h-full">
        <div
          ref={stripRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onScroll={onScroll}
          onClickCapture={onClickCapture}
          className="no-scrollbar flex w-full select-none gap-3 overflow-x-auto cursor-grab active:cursor-grabbing overscroll-x-none touch-pan-y lg:grid lg:h-auto lg:grid-cols-3 lg:overflow-visible lg:gap-5 lg:cursor-auto"
        >
          {loopedNews.map((item, index) => (
            <Link
              key={`${item.image}-${index}`}
              href={`/newsroom/${item.slug}`}
              className={`group flex w-[78%] shrink-0 flex-col sm:w-[52%] lg:w-auto lg:shrink gap-3 sm:gap-4 ${
                index >= news.length ? "lg:hidden" : ""
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[431/390] w-full overflow-hidden bg-[#D9D9D9]">
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
                {/* Meta — date / category */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-neue-montreal text-sm sm:text-base lg:text-xl text-neutral-600">
                    {item.date}
                  </span>
                  <span
                    aria-hidden
                    className="h-4 sm:h-5 w-px rotate-[30deg] bg-neutral-600"
                  />
                  <span className="font-neue-montreal text-sm sm:text-base lg:text-xl text-neutral-600">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="max-w-full lg:max-w-[21.5625rem] font-serif text-xl sm:text-2xl lg:text-3xl leading-7 sm:leading-8 lg:leading-10 text-neutral-800">
                  {item.title}
                </h3>
              </div>

            </Link>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
