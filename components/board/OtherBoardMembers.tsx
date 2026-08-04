"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  otherMembersFor,
  type CarouselMember,
} from "@/components/board/boardRoster";

type OtherBoardMembersProps = {
  id?: string;
  heading?: string;
  /** Roster to show. Defaults to the board landing page's set — everyone but
      the chairman and MD, who have their own message sections above it. */
  members?: CarouselMember[];
};

/* The track renders three copies of the roster and keeps the scroll position
   inside the middle copy, so the slider loops endlessly in both directions. */
const COPIES = [0, 1, 2] as const;

export default function OtherBoardMembers({
  id = "other-board-members",
  heading = "Other Board Members",
  members = otherMembersFor("chairman", "managing-director"),
}: OtherBoardMembersProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  /* CSS snap must be off while dragging — snap-mandatory re-snaps every
     scrollLeft assignment, which freezes the track under the cursor */
  const [isDragging, setIsDragging] = useState(false);
  const snapRestoreTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Mouse-drag bookkeeping (refs — no re-render needed per move)
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startScrollLeft: 0,
  });

  // Card width + flex gap = one slide step
  const cardStep = (track: HTMLDivElement) => {
    const card = track.firstElementChild as HTMLElement | null;
    if (!card) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    return card.offsetWidth + gap;
  };

  // Teleport by one whole copy when nearing either end — content is
  // identical one set away, so the jump is invisible
  const memberCount = members.length;
  const normalizeLoop = useCallback(
    (track: HTMLDivElement) => {
      const step = cardStep(track);
      const setWidth = step * memberCount;
      if (!setWidth) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      let delta = 0;
      if (track.scrollLeft < step * 2) delta = setWidth;
      else if (track.scrollLeft > maxScroll - step * 2) delta = -setWidth;
      if (delta) {
        track.scrollLeft += delta;
        if (drag.current.active) drag.current.startScrollLeft += delta;
      }
    },
    [memberCount]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Start at the middle copy so both directions have room immediately
    track.scrollLeft = cardStep(track) * memberCount;
    const onScroll = () => normalizeLoop(track);
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (snapRestoreTimer.current) clearTimeout(snapRestoreTimer.current);
    };
  }, [normalizeLoop, memberCount]);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Re-center first so there is always a full copy of room to scroll into
    normalizeLoop(track);
    track.scrollBy({ left: dir * cardStep(track), behavior: "smooth" });
  };

  // --- Mouse drag-to-scroll (touch keeps native scrolling + CSS snap) ---
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    if (snapRestoreTimer.current) clearTimeout(snapRestoreTimer.current);
    normalizeLoop(track);
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startScrollLeft: track.scrollLeft,
    };
    setIsDragging(true);
  };

  /* The rest of the drag is tracked on window rather than via
     setPointerCapture: capturing the pointer retargets the follow-up click to
     the track, so the card links would never navigate. Window listeners keep
     the drag alive when the cursor leaves the track just the same. */
  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: PointerEvent) => {
      const track = trackRef.current;
      if (!track || !drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      if (Math.abs(dx) > 5) drag.current.moved = true;
      track.scrollLeft = drag.current.startScrollLeft - dx;
      // Keep looping even mid-drag (adjusts startScrollLeft alongside)
      normalizeLoop(track);
    };

    const onUp = () => {
      const track = trackRef.current;
      if (!track || !drag.current.active) return;
      drag.current.active = false;
      if (!drag.current.moved) {
        // Plain click — nothing scrolled, restore snap right away
        setIsDragging(false);
        return;
      }
      // Glide to the nearest card, then re-enable CSS snap once settled
      const step = cardStep(track);
      const target = Math.round(track.scrollLeft / step) * step;
      track.scrollTo({ left: target, behavior: "smooth" });
      snapRestoreTimer.current = setTimeout(() => setIsDragging(false), 400);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [isDragging, normalizeLoop]);

  // A drag must not fire the card's click when the pointer is released
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section
      id={id}
      className="w-full bg-white px-4 sm:px-6 lg:px-[5em] py-10 sm:py-12 lg:py-[5em]"
    >
      <h2 className="font-test-tiempos-fine text-3xl sm:text-4xl lg:text-[4em] text-neutral-800">
        {heading}
      </h2>

      <div className="relative mt-8 lg:mt-[2.5em]">
        {/* Prev / next chevrons — overlay the track edges */}
        <button
          type="button"
          aria-label="Previous board member"
          onClick={() => scrollByCard(-1)}
          className="absolute left-2 lg:left-[2em] top-1/2 -translate-y-1/2 z-10 p-2 text-neutral-800 cursor-pointer"
        >
          <svg
            width="3em"
            height="3em"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next board member"
          onClick={() => scrollByCard(1)}
          className="absolute right-2 lg:right-[2em] top-1/2 -translate-y-1/2 z-10 p-2 text-neutral-800 cursor-pointer"
        >
          <svg
            width="3em"
            height="3em"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M9 6L15 12L9 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Card track — one card per view on mobile, three on desktop */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onClickCapture={onClickCapture}
          className={`flex gap-4 lg:gap-[1.35em] overflow-x-auto no-scrollbar select-none ${
            isDragging ? "snap-none" : "snap-x snap-mandatory"
          }`}
        >
          {COPIES.map((copy) =>
            members.map((member) => {
              const cardContent = (
                /* Fixed card ratio so the source image's dimensions never drive
                   the layout — otherwise a shorter portrait leaves dead space
                   below it once the flex row stretches every card to match */
                <div className="relative w-full aspect-[429/582]">
                  <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center text-center px-4 pt-12 lg:pt-[6em]">
                    <h3 className="font-test-tiempos-fine font-medium text-2xl lg:text-[2em] text-neutral-900">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-sm lg:text-[1.2em] text-neutral-600 tracking-wide">
                      {member.role}
                    </p>
                  </div>

                  {/* Bottom-anchored and never cropped, so any portrait size
                      sits flush to the card's bottom edge */}
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, 85vw"
                    quality={90}
                    draggable={false}
                    className="object-contain object-bottom grayscale transition-[filter] duration-700 ease-in-out group-hover:grayscale-0"
                  />
                  <div
                    aria-hidden
                    className="overlay-black-linear pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                  />
                </div>
              );

              const cardClass =
                "group relative flex flex-col shrink-0 snap-start bg-neutral-100 cursor-pointer w-[85%] sm:w-[60%] lg:w-[calc((100%-2.7em)/3)]";

              // Only copy 0 is exposed to assistive tech / tab order — the
              // other two are duplicates that exist purely for the loop
              return member.href ? (
                <Link
                  key={`${copy}-${member.name}`}
                  href={member.href}
                  draggable={false}
                  tabIndex={copy === 0 ? undefined : -1}
                  aria-hidden={copy === 0 ? undefined : true}
                  className={cardClass}
                >
                  {cardContent}
                </Link>
              ) : (
                <div key={`${copy}-${member.name}`} className={cardClass}>
                  {cardContent}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
