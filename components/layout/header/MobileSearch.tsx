"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface MobileSearchProps {
  /** Controlled by the Header so the mobile bar and sidebar can both open it. */
  isOpen: boolean;
  onClose: () => void;
  /** Query owned by the Header, same as the desktop in-pill input, so both
      devices share one state and one reset path. */
  value: string;
  onChange: (text: string) => void;
}

/**
 * Mobile search — the same construction as the desktop in-pill search
 * (gradient-ringed input + a results zone that grows downward once you type).
 * The panel is styled like the mobile navbar and sits over it at top:0, so
 * opening search reads as the navbar itself turning into the search bar rather
 * than a separate sheet dropping from above.
 *
 * Fades in place on open and reverses on close (no slide-down).
 */
export default function MobileSearch({ isOpen, onClose, value, onChange }: MobileSearchProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  /* Results zone — collapses to height 0 and grows downward once a query is
     typed, animated with the same GSAP height + fade/slide treatment the
     desktop pill uses for its mega/search zone. */
  const resultsWrapRef = useRef<HTMLDivElement>(null);
  const resultsContentRef = useRef<HTMLDivElement>(null);
  /* Kept mounted through the exit tween so the close animation is visible. */
  const [mounted, setMounted] = useState(isOpen);

  // Mount immediately on open; unmount happens in the close tween's onComplete.
  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  // Lock body scroll while the overlay is present. Mobile browsers ignore
  // body overflow:hidden for touch (and it doesn't hold once the keyboard
  // shifts focus on input tap), so we also take the page out of flow with
  // position:fixed, offset by the current scroll so the layout doesn't jump.
  // The overlay's own fixed layers are viewport-relative, so they're unaffected.
  // Shares the sidebar's overlayLock counter; this search always undoes whatever
  // it set, and only clears overflow:hidden once no overlay still holds the lock.
  useEffect(() => {
    if (!mounted) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.dataset.overlayLock = String(Number(body.dataset.overlayLock || 0) + 1);
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      const next = Math.max(0, Number(body.dataset.overlayLock || 0) - 1);
      body.dataset.overlayLock = String(next);
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.width = prev.width;
      if (next === 0) body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [mounted]);

  // Mobile browsers ignore body overflow:hidden for touch, so also swallow the
  // scroll gestures at the source while the overlay is up: a non-passive
  // touchmove/wheel preventDefault stops the page behind from scrolling, and
  // keeps wheel from reaching the homepage hero (which would change its content).
  // Registered in the CAPTURE phase so it runs before any inner handler can
  // stopPropagation — otherwise a bubbled listener could be preempted and the
  // page would still scroll. Taps/typing still work (neither is a touchmove).
  useEffect(() => {
    if (!mounted) return;
    const opts = { passive: false, capture: true } as const;
    const block = (e: Event) => e.preventDefault();
    document.addEventListener("touchmove", block, opts);
    document.addEventListener("wheel", block, opts);
    return () => {
      document.removeEventListener("touchmove", block, opts);
      document.removeEventListener("wheel", block, opts);
    };
  }, [mounted]);

  // Escape closes.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  /* Dismiss on a press outside the bar — the same guard the desktop mega menu
     uses. A tap on the page below the navbar falls outside the panel and closes
     here (the backdrop's own onClick also catches it). mousedown (not click) so
     releasing a text-selection drag inside the field doesn't count as an
     outside press. */
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      const panel = panelRef.current;
      if (panel && !panel.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isOpen, onClose]);

  // Focus the input once the panel is on screen.
  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  // Fade the panel in place + fade the blurred backdrop on open, then reverse
  // and unmount on close. There is NO slide-down-from-the-top: the panel sits
  // over the navbar like the desktop in-pill search, so opening it reads as the
  // navbar itself turning into the search bar. Keyed on isOpen and mounted so
  // the tween runs once the panel is actually on screen.
  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      const backdrop = backdropRef.current;

      if (isOpen) {
        if (backdrop) {
          gsap.fromTo(
            backdrop,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" },
          );
        }
        gsap.fromTo(
          panel,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
        );
      } else {
        if (backdrop) {
          gsap.to(backdrop, { opacity: 0, duration: 0.35, ease: "power2.in" });
        }
        gsap.to(panel, {
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => setMounted(false),
        });
      }
    },
    { dependencies: [isOpen, mounted] },
  );

  /* Grow the results zone downward when a query is typed and collapse it again
     when cleared — the same GSAP height + fade/slide treatment the desktop pill
     uses, so the "No Results Found" block eases in smoothly instead of popping.
     Keyed on hasResults (empty ↔ non-empty) so typing more characters doesn't
     retrigger it; the zone stays mounted so the collapse can animate too. */
  const hasResults = value.trim().length > 0;

  useGSAP(
    () => {
      const wrap = resultsWrapRef.current;
      const content = resultsContentRef.current;
      if (!wrap || !content) return;

      if (hasResults) {
        gsap.fromTo(
          wrap,
          { height: 0 },
          { height: content.scrollHeight, duration: 0.5, ease: "power3.out" },
        );
        gsap.fromTo(
          content,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 },
        );
      } else {
        gsap.to(content, { opacity: 0, y: 10, duration: 0.25, ease: "power2.in" });
        gsap.to(wrap, { height: 0, duration: 0.4, ease: "power3.inOut" });
      }
    },
    { dependencies: [hasResults, mounted] },
  );

  if (!mounted) return null;

  return (
    <>
      {/* Blurred backdrop behind the panel — same treatment as desktop search.
          touch-action:none so a drag starting here can't scroll the page behind. */}
      <div
        ref={backdropRef}
        onClick={onClose}
        style={{ touchAction: "none" }}
        className="fixed inset-0 z-[75] cursor-pointer bg-white/10 backdrop-blur-md"
      />

      {/* The panel is styled exactly like the mobile navbar (opaque white, blur,
          border-b, bottom radius, matching shadow) and sits at top:0 OVER it, so
          opening search reads as the navbar itself turning into the search bar —
          it does not drop in from above. Results grow the bar downward, the same
          way the desktop pill expands its zone below the in-pill input. Dismiss
          is handled by the backdrop, the X button, the outside-press listener and
          Escape (no panel onClick, so a tap on the bar doesn't close it). */}
      <div
        ref={panelRef}
        style={{ touchAction: "none" }}
        className="fixed inset-x-0 top-0 z-[80] flex flex-col rounded-b-[1.4rem] border-b border-neutral-200 bg-white/85 px-4 pt-4 pb-4 shadow-[0px_8px_24px_0px_#0000001a] backdrop-blur-[15px]"
      >
        {/* Field row — gradient ring around a white pill input, exactly the
            desktop treatment (p-[2px] ring, h-12 field, px-5 text-base), now
            sitting inside the navbar bar itself. */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-12 flex-1 items-center rounded-full bg-[image:var(--primary-gradient)] p-[2px]">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="How can we help you today?"
              className="block h-full w-full rounded-full border-0 bg-white px-5 text-base font-neue-montreal text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 cursor-pointer rounded-full p-1.5 transition-all duration-200 hover:rotate-90 hover:opacity-70"
            aria-label="Close search"
          >
            <X className="size-6 text-neutral-700" strokeWidth={1.8} />
          </button>
        </div>

        {/* Results — stays mounted and collapses to height 0 (the static style
            prop is constant across renders, so React never fights the GSAP
            height tween). Typing grows it downward, clearing collapses it, the
            same smooth expansion as the desktop pill's search zone. */}
        <div
          ref={resultsWrapRef}
          className="overflow-hidden"
          style={{ height: 0 }}
          aria-hidden={!hasResults}
        >
          <div ref={resultsContentRef}>
            <div className="mt-4 border-t border-[#E9E9E9]/70" />
            <div className="flex min-h-[45vh] flex-col items-center justify-center px-2 pb-6 text-center">
              <h2 className="font-archivo-black text-4xl tracking-tight text-[#1F1F1F]">
                No Results Found
              </h2>
              <p className="mt-4 text-base font-neue-montreal text-neutral-700">
                Please try again with a different search query.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
