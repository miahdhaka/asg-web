"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SquareArrowOutUpRight } from "lucide-react";
import gsap from "gsap";
import StatGrid, { type StatItem } from "@/components/common/StatGrid";

type ConcernIntroProps = {
  /** Optional anchor id for the section (e.g. "helal-intro"). */
  sectionId?: string;
  logoSrc: string;
  logoAlt: string;
  websiteUrl: string;
  /** Full intro copy; collapsed to `collapsedCount` paragraphs on mobile. */
  paragraphs: string[];
  stats: StatItem[];
  /* Paragraphs visible before the inline “…more” toggle — two of them fill
     roughly six lines, matching the design's collapsed state. */
  collapsedCount?: number;
};

/** Narrow measure for the identity row and the copy column. */
const COLUMN = "mx-auto w-full max-w-[62em]";

/**
 * Company identity band, intro copy and the four-up stat cards that sit
 * between the hero video and the following section. Sister-concern reusable
 * version of HelalIntro — design identical, all copy comes from props.
 */
export default function ConcernIntro({
  sectionId,
  logoSrc,
  logoAlt,
  websiteUrl,
  paragraphs,
  stats,
  collapsedCount = 2,
}: ConcernIntroProps) {
  /* Tween the real content height rather than guessing a max-height, so the
     reveal runs at one constant speed whether it covers one line or six. The
     tail is mounted with height 0 inline, so the first paint is already
     collapsed and this effect never animates on mount. */
  const [expanded, setExpanded] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  /* Desktop (lg and up) shows the full description with no “…more” toggle;
     the collapse/expand behaviour only applies below that breakpoint. */
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = moreRef.current;
    if (!el) return;
    const inner = el.firstElementChild as HTMLElement | null;

    gsap.killTweensOf(el);
    if (inner) {
      gsap.killTweensOf(inner);
      gsap.fromTo(
        inner,
        { opacity: expanded ? 0 : 1 },
        {
          opacity: expanded ? 1 : 0,
          duration: expanded ? 0.3 : 0.18,
          delay: expanded ? 0.1 : 0,
          ease: expanded ? "power2.out" : "power2.in",
        }
      );
    }

    if (expanded) {
      /* Measure once with the height released, run 0 → that, then hand the
         height back to `auto` so a later resize can't clip the copy */
      gsap.set(el, { height: "auto" });
      gsap.fromTo(
        el,
        { height: 0 },
        {
          height: el.offsetHeight,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => gsap.set(el, { height: "auto" }),
        }
      );
    } else {
      gsap.fromTo(
        el,
        { height: el.offsetHeight },
        { height: 0, duration: 0.45, ease: "power3.inOut" }
      );
    }
  }, [expanded]);

  const moreToggle = (
    <button
      type="button"
      onClick={() => setExpanded((value) => !value)}
      aria-expanded={expanded}
      className="ml-1 inline cursor-pointer bg-clip-text text-transparent"
      style={{ backgroundImage: "var(--primary-gradient)" }}
    >
      ...{expanded ? "less" : "more"}
    </button>
  );

  return (
    <section
      id={sectionId}
      className="w-full px-4 sm:px-6 lg:px-[5em] py-6 sm:py-10 lg:py-[5em]"
    >
      {/* ── Identity row: logo + company name, website CTA on the right ── */}
      <div
        className={`${COLUMN} flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-[2em]`}
      >
        <div>
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={300}
            height={185}
            className="h-auto w-[12em] lg:w-[15em]"
            quality={100}
          />
        </div>

        {/* White pill with a 1px gradient ring (dual-background technique —
            border-image can't follow border-radius), using the same flip hover
            as the hero's "Visit website" button: the gradient-text label slides
            down and out while the gradient fill + white label slides in from
            the top, both over 500ms. */}
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border border-transparent px-[2em] py-[1.15em] text-[0.875rem] font-medium leading-none lg:text-[1.15em]"
          style={{
            /* Interior uses the page background token so the pill doesn't read
               as a white chip; the border-box layer paints the 1px ring. */
            background:
              "linear-gradient(var(--background)) padding-box, var(--primary-gradient) border-box",
          }}
        >
          {/* Invisible spacer — preserves the button's intrinsic width/height */}
          <span className="invisible inline-flex items-center gap-[0.45em] whitespace-nowrap">
            Visit website
            <SquareArrowOutUpRight className="size-[1.15em]" />
          </span>

          {/* Default: gradient text — slides down and out on hover */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center gap-[0.45em] whitespace-nowrap text-[#1AA179] transition-transform duration-500 ease-in-out group-hover:translate-y-full"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              Visit website
            </span>
            <SquareArrowOutUpRight className="size-[1.15em]" />
          </span>

          {/* Hover: gradient fill + white text — slides in from the top */}
          <span
            aria-hidden
            className="absolute inset-0 flex -translate-y-full items-center justify-center gap-[0.45em] whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0"
            style={{ background: "var(--primary-gradient)" }}
          >
            Visit website
            <SquareArrowOutUpRight className="size-[1.15em]" />
          </span>
        </a>
      </div>

      {/* Rule under the identity row */}
      <div className={`${COLUMN} h-px bg-gray-200 mt-[1em]`} />

      {/* ── Copy column — the tail is height-animated, so all paragraphs stay
          in the DOM; the gradient “…more” toggle rides along inline ── */}
      <div className={`${COLUMN} mt-6 lg:mt-[2.2em]`}>
        <div className="flex flex-col gap-4 lg:gap-[1.15em]">
          {(isDesktop ? paragraphs : paragraphs.slice(0, collapsedCount)).map(
            (text, index) => (
              <p
                key={text.slice(0, 24)}
                className="text-[0.9375rem] leading-[1.6] text-neutral-700 lg:text-[1.17em] lg:leading-[1.55]"
              >
                {text}
                {!isDesktop &&
                  !expanded &&
                  index === collapsedCount - 1 &&
                  moreToggle}
              </p>
            )
          )}
        </div>

        {/* Collapsed from the very first paint — no JS-timed hide, so nothing
            flashes full-height during hydration before sliding shut. Only the
            mobile path renders the animated tail; desktop shows it all inline. */}
        {!isDesktop && (
          <div ref={moreRef} className="overflow-hidden" style={{ height: 0 }}>
            <div
              className="mt-4 flex flex-col gap-4 lg:mt-[1.15em] lg:gap-[1.15em]"
              style={{ opacity: 0 }}
            >
              {paragraphs.slice(collapsedCount).map((text, index, list) => (
                <p
                  key={text.slice(0, 24)}
                  className="text-[0.9375rem] leading-[1.6] text-neutral-700 lg:text-[1.17em] lg:leading-[1.55]"
                >
                  {text}
                  {expanded && index === list.length - 1 && moreToggle}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Stat cards ── */}
      <div className="mt-6 lg:mt-[5em]">
        <StatGrid stats={stats} columns={4} />
      </div>
    </section>
  );
}
