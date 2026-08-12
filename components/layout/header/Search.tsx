"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";

gsap.registerPlugin(useGSAP);

interface SearchProps {
  onOpenChange?: (open: boolean) => void;
}

export default function Search({ onOpenChange }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const open = () => {
    setIsOpen(true);
    onOpenChange?.(true);
  };
  const close = () => {
    setIsOpen(false);
    setSearchText("");
    onOpenChange?.(false);
  };

  const clearText = () => {
    setSearchText("");
    inputRef.current?.focus();
  };

  // Animate the panel in/out whenever isOpen changes
  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      tweenRef.current?.kill();

      if (isOpen) {
        // Slide down + fade in for panel
        gsap.set(panel, { height: "auto" });
        tweenRef.current = gsap.fromTo(
          panel,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        );
        // Focus the input after the panel starts appearing
        requestAnimationFrame(() => inputRef.current?.focus());
      } else {
        // Slide up + fade out for panel
        tweenRef.current = gsap.to(panel, {
          opacity: 0,
          y: -12,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(panel, { height: 0 });
          },
        });
      }
    },
    { dependencies: [isOpen] },
  );

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) close();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close when clicking outside the search panel
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close();
      }
    }
    // Use a short delay so the opening click doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Search icon button — shown when panel is closed */}
      {!isOpen && (
        <button
          type="button"
          onClick={open}
          className="group cursor-pointer rounded-full p-1.5 transition-all duration-300 ease-out hover:bg-neutral-100 hover:scale-110"
          aria-label="Open search"
        >
          <Image
            src="/icons/search.png"
            alt="Search"
            width={20}
            height={20}
            className="h-6 w-6 transition-opacity duration-300 group-hover:opacity-70"
          />
        </button>
      )}

      {/* Full-width search panel — slides down from below the navbar */}
      <div
        ref={panelRef}
        className="fixed left-0 z-50 w-screen overflow-hidden bg-white shadow-lg"
        style={{
          top: "var(--header-height)",
          height: 0,
          opacity: 0,
        }}
      >
        <div className="flex items-center justify-center px-4 py-8 lg:py-10">
          {/* Search bar — half the page width on desktop */}
          <div className="w-full lg:w-1/2">
            <div className="input-gradient-border-hover bg-gray-50">
              <div className="flex h-12 items-stretch lg:h-[4rem]">
                {/* Input area */}
                <div className="flex flex-1 items-center gap-2 px-3.5 lg:gap-[0.6667rem] lg:px-[1.1667rem]">
                  <Image
                    src="/icons/career/search.svg"
                    alt=""
                    width={20}
                    height={20}
                    quality={100}
                    className="size-4 shrink-0 lg:size-[1.6667rem]"
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search..."
                    className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-600 focus:outline-none lg:text-[1.3333rem]"
                  />
                </div>

                {/* Clear text button — shown when there's text */}
                {searchText && (
                  <button
                    type="button"
                    onClick={clearText}
                    className="flex items-center justify-center px-2 text-neutral-400 transition-colors hover:text-neutral-700 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="size-4 lg:size-5" />
                  </button>
                )}

                {/* Gradient search button */}
                <button
                  type="button"
                  className="group relative flex h-full shrink-0 items-center justify-center gap-1 lg:gap-[0.3333rem] text-sm lg:text-[1.1667rem] text-white cursor-pointer bg-[image:var(--primary-gradient)] px-5 lg:px-[1.6667rem] transition-all duration-300 ease-out"
                >
                  {/* Shine sweep */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-[60%] w-[40%] -skew-x-[20deg] bg-white/30 blur-[6px] transition-transform duration-700 ease-out group-hover:translate-x-[460%]"
                  />
                  <Image
                    src="/icons/career/search.svg"
                    alt=""
                    width={16}
                    height={16}
                    quality={100}
                    className="size-3.5 brightness-0 invert lg:size-[1.3333rem]"
                  />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
