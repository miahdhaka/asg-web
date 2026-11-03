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
 * Mobile search overlay — the same construction as the desktop in-pill search
 * (blurred backdrop + gradient-ringed input + a results zone), just stacked
 * vertically because there is no nav zone to grow into. The panel itself is
 * transparent: only the backdrop paints, so the field floats on the blur the
 * way it does on desktop.
 *
 * Slides down + fades in on open and reverses on close.
 */
export default function MobileSearch({ isOpen, onClose, value, onChange }: MobileSearchProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
  // Taps and typing still work — neither is a touchmove — and the overlay has no
  // scrollable content of its own, so blocking here costs nothing.
  useEffect(() => {
    if (!mounted) return;
    const block = (e: Event) => e.preventDefault();
    document.addEventListener("touchmove", block, { passive: false });
    document.addEventListener("wheel", block, { passive: false });
    return () => {
      document.removeEventListener("touchmove", block);
      document.removeEventListener("wheel", block);
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
     uses. The backdrop catches most of that already, but it sits BELOW the
     panel (z-75 vs z-80) and the panel is transparent yet still full width,
     so its side gutters used to swallow the tap without closing anything.
     mousedown (not click) so releasing a text-selection drag inside the field
     doesn't count as an outside press. */
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

  // Slide the panel down + fade in the blurred backdrop on open, reverse both
  // and unmount on close. Keyed on isOpen and mounted so the tween runs once
  // the panel is actually on screen.
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
            { opacity: 1, duration: 0.55, ease: "power2.out" },
          );
        }
        gsap.fromTo(
          panel,
          { y: "-100%" },
          { y: "0%", duration: 0.65, ease: "power3.out" },
        );
      } else {
        if (backdrop) {
          gsap.to(backdrop, { opacity: 0, duration: 0.5, ease: "power2.in" });
        }
        gsap.to(panel, {
          y: "-100%",
          duration: 0.55,
          ease: "power3.in",
          onComplete: () => setMounted(false),
        });
      }
    },
    { dependencies: [isOpen, mounted] },
  );

  if (!mounted) return null;

  return (
    <>
      {/* Blurred backdrop behind the panel — same treatment as desktop search */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 z-[75] cursor-pointer bg-white/10 backdrop-blur-md"
      />

      {/* The panel is transparent but still covers the upper 80vh, so it owns
          its own dismiss: a tap landing on the px-4 gutters beside the field,
          or on the blank space under it, closes here rather than dying on the
          non-interactive div. Taps on page content far below fall through to
          the backdrop handler instead. */}
      <div
        ref={panelRef}
        onClick={onClose}
        className={`fixed inset-x-0 top-0 z-[80] flex h-[80vh] flex-col px-4 ${
          value.trim().length > 0 ? "bg-white" : ""
        }`}
      >
      {/* Field row — gradient ring around a white pill input, exactly the
          desktop treatment (p-[2px] ring, h-12 field, px-5 text-base). The
          close button is the desktop toggle's closed state: icon only, no
          border, tap to dismiss. stopPropagation keeps a tap on the field or
          the X from also firing the panel's dismiss handler above. */}
      <div
        className="flex shrink-0 items-center gap-3 pt-4"
        onClick={(e) => e.stopPropagation()}
      >
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
          className="shrink-0 cursor-pointer rounded-full p-1.5 transition-colors hover:bg-white/60"
          aria-label="Close search"
        >
          <X className="size-6 text-neutral-700" strokeWidth={1.8} />
        </button>
      </div>

      {/* Results zone — occupies the rest of the overlay and centres its
          content, like the desktop panel's min-h-[60vh] block. Hidden until
          the query is non-empty, so opening search shows only the field. The
          whole panel is bg-white (matching the desktop pill), so the dark
          "No Results" text stays readable. */}
      <div className="flex flex-1 flex-col items-center justify-center px-2 text-center">
        {value.trim().length > 0 && (
          <>
            <h2 className="font-archivo-black text-4xl tracking-tight text-[#1F1F1F]">
              No Results Found
            </h2>
            <p className="mt-4 text-base font-neue-montreal text-neutral-700">
              Please try again with a different search query.
            </p>
          </>
        )}
      </div>
      </div>
    </>
  );
}
