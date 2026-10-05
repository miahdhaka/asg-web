"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
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
  /** "carousel" = draggable looping track (detail pages); "grid" = static
      responsive grid (board landing page, Figma node 7899-52313). */
  layout?: "carousel" | "grid";
};

/* The track renders three copies of the roster and keeps the scroll position
   inside the middle copy, so the slider loops endlessly in both directions. */
const COPIES = [0, 1, 2] as const;

export default function OtherBoardMembers({
  id = "other-board-members",
  heading = "Other Board Members",
  members = otherMembersFor("chairman", "managing-director"),
  layout = "carousel",
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
  const isNormalizing = useRef(false);
  const normalizeLoop = useCallback(
    (track: HTMLDivElement) => {
      if (isNormalizing.current) return;
      const step = cardStep(track);
      const setWidth = step * memberCount;
      if (!setWidth) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      let delta = 0;
      if (track.scrollLeft < step * 2) delta = setWidth;
      else if (track.scrollLeft > maxScroll - step * 2) delta = -setWidth;
      if (delta) {
        isNormalizing.current = true;
        // Disable snap during teleport to prevent jitter
        track.style.scrollSnapType = "none";
        track.scrollLeft += delta;
        if (drag.current.active) drag.current.startScrollLeft += delta;
        // Restore snap on next frame
        requestAnimationFrame(() => {
          track.style.scrollSnapType = "";
          isNormalizing.current = false;
        });
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

  // Grid mobile slider — same system as the homepage "Greener Future" track:
  // two copies of the roster, a free (un-snapped) native scroll, a 1:1 mouse
  // scrub that wraps across the copy seam, and a GSAP glide settling onto the
  // nearest card on release. Desktop/tablet fall back to the static grid.
  const gridTrackRef = useRef<HTMLDivElement>(null);
  const gridTween = useRef<gsap.core.Tween | null>(null);
  const gridDrag = useRef({ down: false, moved: false, startX: 0, scrollLeft: 0 });

  // One card's advance (step) and one full copy's width (pitch), measured live
  // from the DOM so track padding/gaps never skew the wrap seam.
  const gridPitches = (track: HTMLDivElement) => {
    const els = track.querySelectorAll<HTMLElement>("[data-gcard]");
    const step =
      els.length > 1 ? els[1].offsetLeft - els[0].offsetLeft : track.clientWidth;
    const pitch =
      els.length > members.length
        ? els[members.length].offsetLeft - els[0].offsetLeft
        : track.scrollWidth / 2;
    return { step, pitch };
  };

  // Keep a position normalized within the first copy [0, pitch).
  const gridWrap = (track: HTMLDivElement, value: number) => {
    const { pitch } = gridPitches(track);
    if (pitch <= 0) return value;
    let v = value;
    while (v < 0) v += pitch;
    while (v >= pitch) v -= pitch;
    return v;
  };

  const onGridPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = gridTrackRef.current;
    if (!track || e.pointerType !== "mouse" || e.button !== 0) return;
    gridTween.current?.kill();
    gridDrag.current = { down: true, moved: false, startX: e.clientX, scrollLeft: track.scrollLeft };
  };

  const onGridPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = gridTrackRef.current;
    if (!track || !gridDrag.current.down) return;
    const dx = e.clientX - gridDrag.current.startX;
    if (Math.abs(dx) > 5) gridDrag.current.moved = true;
    const next = gridDrag.current.scrollLeft - dx;
    const wrapped = gridWrap(track, next);
    if (wrapped !== next) {
      // Crossed the copy seam: jump and shift the drag base by the same
      // amount so the scrub stays continuous.
      track.scrollLeft = wrapped;
      gridDrag.current.scrollLeft += wrapped - next;
    } else {
      track.scrollLeft = wrapped;
    }
  };

  const endGridDrag = () => {
    const track = gridTrackRef.current;
    if (!track || !gridDrag.current.down) return;
    gridDrag.current.down = false;
    if (!gridDrag.current.moved) return;
    // Settle onto the nearest card boundary with a short GSAP glide.
    const { step } = gridPitches(track);
    if (step <= 0) return;
    const target = Math.round(track.scrollLeft / step) * step;
    gridTween.current?.kill();
    gridTween.current = gsap.to(track, {
      scrollLeft: target,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
    });
  };

  // A drag must not fire the card link when the pointer is released.
  const onGridClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gridDrag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      gridDrag.current.moved = false;
    }
  };

  useEffect(() => {
    return () => {
      gridTween.current?.kill();
    };
  }, []);

  // Grid layout (board landing page): a Greener-Future-style free-scrolling
  // infinite slider on mobile (≈1.5 cards), a static responsive grid from sm up.
  if (layout === "grid") {
    const renderCard = (member: CarouselMember, key: string, slider: boolean) => {
      const cardContent = (
        <div className="relative w-full aspect-[429/582]">
          <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center text-center px-3 pt-6 sm:pt-10 lg:pt-[6em]">
            <h3 className="whitespace-pre-line font-archivo-black font-medium text-xl lg:text-[2em] text-neutral-800">
              {member.name}
            </h3>
            <p className="sm:mt-1 text-base lg:text-[1.2em] text-neutral-600 font-medium tracking-wider">
              {member.role}
            </p>
          </div>

          <Image
            src={member.image}
            alt={`${member.name} — ${member.role}`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 60vw"
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
        ? "group relative flex w-[62%] shrink-0 flex-col overflow-hidden rounded-[20px] bg-white cursor-pointer"
        : "group relative flex flex-col overflow-hidden rounded-[20px] bg-white cursor-pointer";

      return member.href ? (
        <Link key={key} href={member.href} className={cardClass} data-gcard={slider ? "" : undefined}>
          {cardContent}
        </Link>
      ) : (
        <div key={key} className={cardClass} data-gcard={slider ? "" : undefined}>
          {cardContent}
        </div>
      );
    };

    return (
      <section
        id={id}
        className="w-full px-4 sm:px-6 lg:px-[5em] pb-12 lg:pb-[5em] pt-2"
      >
        {/* Mobile: Greener-Future-style infinite slider (two copies, free scroll) */}
        <div
          ref={gridTrackRef}
          onPointerDown={onGridPointerDown}
          onPointerMove={onGridPointerMove}
          onPointerUp={endGridDrag}
          onPointerLeave={endGridDrag}
          onClickCapture={onGridClickCapture}
          className="flex cursor-grab select-none gap-3 overflow-x-auto pb-2 no-scrollbar active:cursor-grabbing sm:hidden"
        >
          {[...members, ...members].map((member, index) =>
            renderCard(member, `${member.name}-${index}`, true)
          )}
        </div>

        {/* Tablet / desktop: static responsive grid */}
        <div className="hidden gap-3 sm:mt-8 sm:grid sm:grid-cols-2 lg:mt-[2.5em] lg:grid-cols-3 lg:gap-[1.35em]">
          {members.map((member) => renderCard(member, member.name, false))}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className="w-full pl-4 pr-0 sm:pl-6 sm:pr-0 lg:pl-[5em] lg:pr-0 py-10 sm:py-12 lg:py-[4em] mb-4 sm:mb-0"
    >
      <h2 className="font-archivo-black uppercase text-[1.75rem] sm:text-3xl lg:text-[3em] text-neutral-800">
        {heading}
      </h2>

      <div className="relative mt-8 lg:mt-[2.5em]">
        {/* Prev / next chevrons — overlay the track edges, desktop only */}
        <button
          type="button"
          aria-label="Previous board member"
          onClick={() => scrollByCard(-1)}
          className="absolute top-1/2 -translate-y-1/2 z-10 hidden p-2.5 text-neutral-800 cursor-pointer lg:left-[2em] lg:block"
        >
          <ChevronLeft className="size-[3em]" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Next board member"
          onClick={() => scrollByCard(1)}
          className="absolute top-1/2 -translate-y-1/2 z-10 hidden p-2.5 text-neutral-800 cursor-pointer lg:right-[calc(6.25%+3.2em)] lg:block"
        >
          <ChevronRight className="size-[3em]" strokeWidth={1.5} />
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
                  <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center text-center px-3 pt-6 sm:pt-10 lg:pt-[6em]">
                    <h3 className="whitespace-pre-line font-archivo-black font-medium text-2xl lg:text-[2em] text-neutral-800">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 sm:mt-1 text-lg lg:text-[1.2em] text-neutral-600 font-medium tracking-wider">
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
                "group relative flex flex-col shrink-0 snap-start overflow-hidden rounded-[20px] bg-white cursor-pointer w-[calc((100%-0.5em)/1.2)] sm:w-[60%] lg:w-[calc((100%-4.05em)/3.2)]";

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
