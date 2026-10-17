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
  // the strip loops seamlessly in both directions. Only the mouse scrubs it
  // via pointer capture; on touch the browser pans natively — horizontal
  // scrolls the strip, vertical scrolls the page (like GreenerFuture). The
  // Previous button runs a short rAF tween (also wrapped) instead of native
  // smooth-scroll, because a programmatic scrollLeft would fight the wrap
  // normalization otherwise.
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
    // Only the mouse scrubs manually. On touch we let the browser handle it
    // natively: horizontal pans scroll this overflow-x strip, vertical pans
    // fall through to the page. A custom touch drag is what was trapping the
    // vertical gesture here.
    if (e.pointerType !== "mouse") return;
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
      className="relative flex w-full flex-col overflow-hidden py-0 sm:py-6 lg:py-8 mb-14 sm:mb-6 lg:mb-8 lg:h-[calc(100vh-var(--header-height))]"
    >
      {/* Header — eyebrow + title left, button right */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between px-4 lg:px-20 gap-6">
        <div className="mt-2 flex flex-col lg:max-w-[55%]">
          <div className="text-sm inline-flex items-center gap-2.5 sm:gap-1.5 font-space-mono font-medium uppercase tracking-wider mb-4.5">
            <span>Newsroom</span>
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--primary-gradient)" }} />
          </div>

          {/* Title — same Archivo Black uppercase token set as the other
              homepage section headings (AboutUs, GreenerFuture, etc.). */}
          <h2
            id="newsroom-title"
            className="font-archivo-black uppercase text-[1.75rem] sm:text-4xl lg:text-[3rem] leading-[1.2] text-[var(--neutral-800)] word-space-4"
          >
            Latest from ASG <br />newsroom
          </h2>
        </div>

        <Link
          href="/newsroom"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-transparent px-4.5 sm:px-4 lg:px-6 py-3.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-medium leading-none"
          style={{
            background: 'linear-gradient(#F3F3F1, #F3F3F1) padding-box, linear-gradient(97.37deg, #8BC34A 1.29%, #1AA179 92.01%) border-box',
          }}
        >
          {/* Invisible spacer — preserves the button's intrinsic width/height */}
          <span className="invisible inline-flex items-center gap-2 whitespace-nowrap pr-2 lg:gap-4 lg:pr-4 tracking-wider">
            More news
          </span>

          {/* Default: gradient text — slides down and out on hover.
              Animated via `top` (not translate/transform): transform-animated
              children get composited into their own layer, which makes
              Chrome's rounded overflow clip degrade to a rectangle and the
              panels visibly poke outside the pill mid-slide. */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 flex h-full items-center justify-center whitespace-nowrap transition-[top] duration-500 ease-in-out group-hover:top-full"
          >
            <span
              className="bg-clip-text pr-2 text-transparent tracking-wider lg:pr-4"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              More news
            </span>
          </span>

          {/* Hover: gradient fill + white text — slides in from the top */}
          <span
            aria-hidden
            className="absolute inset-x-0 -top-full flex h-full items-center justify-center whitespace-nowrap text-white transition-[top] duration-500 ease-in-out group-hover:top-0"
            style={{ background: "var(--primary-gradient)" }}
          >
            <span className="pr-2 tracking-wider lg:pr-4">More news</span>
          </span>
        </Link>
      </div>

      {/* News cards — below lg the three cards would stack ~1300 px tall and
          spill far past the screen, so the section could never settle as one
          step. They become an infinite horizontal strip instead: the list is
          duplicated and scrollLeft is wrapped so it loops seamlessly in both
          directions, while the section keeps its single-screen height.
          Desktop keeps the three-column grid (clones hidden). */}
      <div className="relative flex min-h-0 flex-1 items-start pl-4 pr-0 lg:px-20 mt-10 sm:mt-12 lg:mt-[3em]">
        <div className="relative w-full lg:h-full">
          <div
            ref={stripRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onScroll={onScroll}
            onClickCapture={onClickCapture}
            className="no-scrollbar flex w-full gap-3 overflow-x-auto cursor-grab active:cursor-grabbing overscroll-x-none touch-auto lg:grid lg:h-full lg:grid-cols-3 lg:overflow-visible lg:gap-5 lg:cursor-auto"
          >
            {loopedNews.map((item, index) => (
              <Link
                key={`${item.image}-${index}`}
                href={`/newsroom/press-release/${item.slug}`}
                className={`group flex w-[84%] shrink-0 flex-col sm:w-[52%] lg:w-auto lg:shrink lg:h-full lg:min-h-0 gap-3 sm:gap-4 ${
                  index >= news.length ? "lg:hidden" : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[431/330] w-full overflow-hidden rounded-[0.8rem] bg-[#D9D9D9] lg:h-[70%] lg:aspect-auto lg:flex-none lg:min-h-0 lg:rounded-[1.2rem]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    draggable={false}
                    className="pointer-events-none rounded-[0.8rem] object-cover lg:rounded-[1.2rem]"
                    quality={80}
                  />
                  {/* Hover overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 overlay-image-hover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:gap-1">
                  {/* Meta — date / category */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-neue-montreal text-sm lg:text-base text-neutral-600">
                      {item.date}
                    </span>
                    <span
                      aria-hidden
                      className="h-4 sm:h-5 w-px rotate-[30deg] bg-neutral-600"
                    />
                    <span className="font-neue-montreal text-sm lg:text-base text-neutral-600">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="max-w-full lg:max-w-[90%] font-archivo-black text-xl sm:text-2xl lg:text-3xl leading-6 sm:leading-8 text-neutral-800">
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
