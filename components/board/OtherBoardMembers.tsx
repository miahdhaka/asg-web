"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  otherMembersFor,
  type CarouselMember,
} from "@/components/board/boardRoster";
import RevealOnScroll from "@/components/web-info/RevealOnScroll";
import SplitReveal from "@/components/web-info/SplitReveal";

type OtherBoardMembersProps = {
  id?: string;
  heading?: string;
  /** Roster to show. Defaults to the board landing page's set — everyone but
      the chairman and MD, who have their own message sections above it. */
  members?: CarouselMember[];
  /** "carousel" = draggable looping track (detail pages); "grid" = static
      responsive grid (board landing page, Figma node 7899-52313). */
  layout?: "carousel" | "grid";
};

/* The carousel track renders two copies of the roster and wraps scrollLeft
   within the first copy, so it loops seamlessly in both directions — exactly
   like the homepage Certifications strip. */

export default function OtherBoardMembers({
  id = "other-board-members",
  heading = "Other Board Members",
  members = otherMembersFor("chairman", "managing-director"),
  layout = "carousel",
}: OtherBoardMembersProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Drag bookkeeping (refs — no re-render per move), mirroring the
  // certification strip: a 1:1 pointer scrub that follows the cursor freely.
  const dragRef = useRef({ down: false, moved: false, startX: 0, startPos: 0 });

  // Two copies so the track can loop endlessly in both directions.
  const loopedMembers = [...members, ...members];

  // Keep scrollLeft normalized within the first copy [0, halfWidth). Content
  // is identical one set away, so wrapping the position is invisible.
  const wrap = (el: HTMLDivElement, value: number) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return value;
    let v = value;
    while (v < 0) v += half;
    while (v >= half) v -= half;
    return v;
  };

  // --- Pointer drag-to-scroll (same mechanic as the certification strip) ---
  // Scrub for any pointer (mouse, pen, touch) so a cursor drags the track 1:1.
  // `touch-pan-y` on the track disables the browser's native horizontal pan,
  // so JS-controlled scrolling never fights it. No CSS snap — the track simply
  // follows the cursor and stays where it is released.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { down: true, moved: false, startX: e.clientX, startPos: track.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 5) dragRef.current.moved = true;
    track.scrollLeft = wrap(track, dragRef.current.startPos - dx);
  };

  const endDrag = () => {
    if (!dragRef.current.down) return;
    dragRef.current.down = false;
  };

  // A drag must not fire the card's click when the pointer is released
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  // Grid mobile slider — slides exactly like the detail-page carousel above:
  // two copies of the roster, a 1:1 scrub for any pointer (mouse, pen, touch)
  // wrapped within the first copy, and no settle — the track simply stays
  // where it is released. Desktop/tablet fall back to the static grid.
  const gridTrackRef = useRef<HTMLDivElement>(null);
  const gridDrag = useRef({ down: false, moved: false, startX: 0, startPos: 0 });

  const onGridPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = gridTrackRef.current;
    if (!track) return;
    gridDrag.current = { down: true, moved: false, startX: e.clientX, startPos: track.scrollLeft };
  };

  const onGridPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = gridTrackRef.current;
    if (!track || !gridDrag.current.down) return;
    const dx = e.clientX - gridDrag.current.startX;
    if (Math.abs(dx) > 5) gridDrag.current.moved = true;
    track.scrollLeft = wrap(track, gridDrag.current.startPos - dx);
  };

  const endGridDrag = () => {
    if (!gridDrag.current.down) return;
    gridDrag.current.down = false;
  };

  // A drag must not fire the card link when the pointer is released.
  const onGridClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gridDrag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      gridDrag.current.moved = false;
    }
  };

  // Grid layout (board landing page): a free-scrolling infinite slider on
  // mobile (≈1.2 cards per view), a static responsive grid from sm up.
  if (layout === "grid") {
    const renderCard = (member: CarouselMember, key: string, slider: boolean) => {
      const cardContent = (
        <div className="relative w-full aspect-[429/582]">
          <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center text-center px-4 pt-6 sm:pt-10 lg:pt-[5em]">
            <h3 className="whitespace-pre-line font-archivo-black font-medium text-[1.2em] lg:text-[2em] text-neutral-800 leading-tight">
              {member.name}
            </h3>
            <p className="mt-0.5 sm:mt-1 text-[15px] lg:text-[1.2em] text-neutral-600 font-medium tracking-wider">
              {member.role}
            </p>
          </div>

          <Image
            src={member.image}
            alt={`${member.name} — ${member.role}`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 62vw"
            quality={90}
            className="object-contain object-bottom"
            draggable={false}
          />
          <div
            aria-hidden
            className="overlay-black-linear pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
          />
        </div>
      );

      const cardClass = slider
        ? "group relative flex w-[calc((100%-0.5em)/1.2)] shrink-0 flex-col overflow-hidden rounded-[20px] bg-white cursor-pointer"
        : "group relative flex flex-col overflow-hidden rounded-[20px] bg-white cursor-pointer";

      return member.href ? (
        <Link key={key} href={member.href} data-member-card className={cardClass}>
          {cardContent}
        </Link>
      ) : (
        <div key={key} data-member-card className={cardClass}>
          {cardContent}
        </div>
      );
    };

    return (
      <section
        id={id}
        className="w-full pr-0 pl-4 sm:pr-6 sm:pl-6 lg:pr-[5em] lg:pl-[5em] pb-12 lg:pb-[5em] pt-2"
      >
        <RevealOnScroll selector="[data-member-card]" stagger={0.08} y={26}>
        {/* Mobile: free-scrolling infinite slider (two copies, 1:1 pointer scrub) */}
        <div
          ref={gridTrackRef}
          onPointerDown={onGridPointerDown}
          onPointerMove={onGridPointerMove}
          onPointerUp={endGridDrag}
          onPointerLeave={endGridDrag}
          onClickCapture={onGridClickCapture}
          className="flex cursor-grab touch-pan-y gap-4 overflow-x-auto overscroll-x-none pb-2 no-scrollbar select-none active:cursor-grabbing sm:hidden"
        >
          {[...members, ...members].map((member, index) =>
            renderCard(member, `${member.name}-${index}`, true)
          )}
        </div>

        {/* Tablet / desktop: static responsive grid */}
        <div className="hidden gap-3 sm:mt-8 sm:grid sm:grid-cols-2 lg:mt-[2.5em] lg:grid-cols-3 lg:gap-[1.35em]">
          {members.map((member) => renderCard(member, member.name, false))}
        </div>
        </RevealOnScroll>
      </section>
    );
  }

  return (
    <section
      id={id}
      className="w-full pl-4 pr-0 sm:pl-6 sm:pr-0 lg:pl-[5em] lg:pr-0 py-10 sm:py-12 lg:py-[4em] mb-4 sm:mb-0"
    >
      <SplitReveal
        as="h2"
        className="font-archivo-black uppercase text-[1.75rem] sm:text-3xl lg:text-[3em] text-neutral-800"
        text={heading}
      />

      <RevealOnScroll selector="[data-member-card]" stagger={0.08} y={26}>
      <div className="relative mt-8 lg:mt-[2.5em]">
        {/* Card track — one card per view on mobile, three on desktop */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          className="flex cursor-grab touch-pan-y gap-4 overflow-x-auto overscroll-x-none no-scrollbar select-none active:cursor-grabbing lg:gap-[1.35em]"
        >
          {loopedMembers.map((member, index) => {
              const cardContent = (
                /* Fixed card ratio so the source image's dimensions never drive
                   the layout — otherwise a shorter portrait leaves dead space
                   below it once the flex row stretches every card to match */
                <div className="relative w-full aspect-[429/582]">
                  <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center text-center px-4 pt-6 sm:pt-10 lg:pt-[5em]">
                    <h3 className="whitespace-pre-line font-archivo-black font-medium text-[1.2em] lg:text-[2em] text-neutral-800 leading-tight">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 sm:mt-1 text-[15px] lg:text-[1.2em] text-neutral-600 font-medium tracking-wider">
                      {member.role}
                    </p>
                  </div>

                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, 62vw"
                    quality={90}
                    draggable={false}
                    className="object-contain object-bottom"
                  />
                  <div
                    aria-hidden
                    className="overlay-black-linear pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                  />
                </div>
              );

              const cardClass =
                "group relative flex flex-col shrink-0 overflow-hidden rounded-[20px] bg-white cursor-pointer w-[calc((100%-0.5em)/1.2)] sm:w-[60%] lg:w-[calc((100%-4.05em)/3.1)]";

              // Only the first copy is exposed to assistive tech / tab order —
              // the second is a duplicate that exists purely for the loop
              const isDuplicate = index >= members.length;
              return member.href ? (
                <Link
                  key={`${member.name}-${index}`}
                  href={member.href}
                  data-member-card
                  draggable={false}
                  tabIndex={isDuplicate ? -1 : undefined}
                  aria-hidden={isDuplicate ? true : undefined}
                  className={cardClass}
                >
                  {cardContent}
                </Link>
              ) : (
                <div key={`${member.name}-${index}`} data-member-card className={cardClass}>
                  {cardContent}
                </div>
              );
            })}
        </div>
      </div>
      </RevealOnScroll>
    </section>
  );
}
