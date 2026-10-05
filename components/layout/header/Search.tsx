"use client";

import { useEffect } from "react";
import { X, Search as SearchIcon } from "lucide-react";

interface SearchProps {
  /** Fully controlled by the Header so opening a mega menu can close search. */
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Search toggle button only — the input and the results panel live INSIDE
 * the navbar pill (rendered by Header): the pill grows horizontally to
 * reveal the input in the nav zone and downward for the results, the same
 * way the mega menu does.
 */
export default function Search({ isOpen, onOpenChange }: SearchProps) {
  // Close on Escape while search is open
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange?.(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onOpenChange]);

  return (
    <button
      type="button"
      onClick={() => onOpenChange?.(!isOpen)}
      className={`group cursor-pointer rounded-full p-1.5 transition-all duration-300 ease-out ${
        isOpen ? "border border-neutral-400/60" : "hover:bg-neutral-100"
      }`}
      aria-label={isOpen ? "Close search" : "Open search"}
    >
      {isOpen ? (
        <X className="size-6 text-neutral-700 transition-all duration-300 group-hover:opacity-70 group-hover:rotate-90" strokeWidth={1.8} />
      ) : (
        <SearchIcon className="size-6 text-neutral-700 transition-opacity duration-300 group-hover:opacity-70" strokeWidth={1.8} />
      )}
    </button>
  );
}
