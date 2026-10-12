"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface MobileSearchProps {
  /** Controlled by the Header so the mobile bar and sidebar can both open it. */
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-screen mobile search overlay — logo · gradient-bordered input · close,
 * with a centred "No Results Found" empty state (mirrors the desktop search
 * panel). Slides down + fades in on open and reverses on close.
 */
export default function MobileSearch({ isOpen, onClose }: MobileSearchProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  /* Kept mounted through the exit tween so the close animation is visible. */
  const [mounted, setMounted] = useState(isOpen);

  // Mount immediately on open; unmount happens in the close tween's onComplete.
  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  // Lock body scroll while the overlay is present. Shares the same counter as
  // the sidebar so overlapping overlays don't unlock scroll until all are gone.
  useEffect(() => {
    if (!mounted) return;
    const body = document.body;
    body.dataset.overlayLock = String(Number(body.dataset.overlayLock || 0) + 1);
    body.style.overflow = "hidden";
    return () => {
      const next = Math.max(0, Number(body.dataset.overlayLock || 0) - 1);
      body.dataset.overlayLock = String(next);
      if (next === 0) body.style.overflow = "";
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

      <div
        ref={panelRef}
        className="fixed inset-x-0 top-0 z-[80] flex h-[80vh] flex-col rounded-b-[1.4rem] bg-white shadow-[0px_8px_24px_0px_#0000001a]"
      >
      {/* Top bar — logo · gradient input · close */}
      <div className="flex shrink-0 items-center gap-3 border-b border-neutral-200 px-4 py-4">
        <Image
          src="/logo/asg-icon.png"
          alt="Amanat Shah Group"
          width={40}
          height={40}
          className="h-9 w-9 shrink-0 object-contain"
          priority
        />

        <div className="flex h-10 flex-1 items-center rounded-full bg-[image:var(--primary-gradient)] p-[2px]">
          <input
            ref={inputRef}
            type="text"
            placeholder="How can we help you today?"
            className="block h-full w-full rounded-full border-0 bg-white px-5 text-base font-neue-montreal text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="shrink-0 cursor-pointer rounded-full border border-neutral-300 p-1.5 transition-colors hover:bg-neutral-100"
          aria-label="Close search"
        >
          <X className="size-5 text-neutral-700" strokeWidth={1.8} />
        </button>
      </div>

      {/* Body — empty state */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h2 className="font-archivo-black text-3xl tracking-tight text-[#1F1F1F] sm:text-4xl">
          No Results Found
        </h2>
        <p className="mt-3 text-base font-neue-montreal text-neutral-700">
          Please try again with a different search query.
        </p>
      </div>
      </div>
    </>
  );
}
