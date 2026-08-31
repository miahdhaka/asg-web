"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SearchableSelectProps {
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}

export default function SearchableSelect({
  label,
  placeholder,
  searchPlaceholder,
  value,
  onChange,
  options,
  disabled = false,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  /* Typing-animation for the search-input placeholder */
  const TYPING_SPEED = 100;
  const PAUSE_AFTER_FULL = 2200;
  const DELETING_SPEED = 50;

  const [animPlaceholder, setAnimPlaceholder] = useState("");
  const placeholderIdx = useRef(0);
  const placeholderDir = useRef<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    if (!open) return;
    // Reset animation each time dropdown opens
    placeholderIdx.current = 0;
    placeholderDir.current = "typing";
    setAnimPlaceholder("");

    let tid: ReturnType<typeof setTimeout>;
    const tick = () => {
      const dir = placeholderDir.current;
      if (dir === "typing") {
        const next = placeholderIdx.current + 1;
        setAnimPlaceholder(searchPlaceholder.slice(0, next));
        placeholderIdx.current = next;
        if (next >= searchPlaceholder.length) {
          placeholderDir.current = "pausing";
          tid = setTimeout(tick, PAUSE_AFTER_FULL);
        } else {
          tid = setTimeout(tick, TYPING_SPEED);
        }
      } else if (dir === "pausing") {
        placeholderDir.current = "deleting";
        tid = setTimeout(tick, DELETING_SPEED);
      } else {
        const next = placeholderIdx.current - 1;
        setAnimPlaceholder(searchPlaceholder.slice(0, next));
        placeholderIdx.current = next;
        if (next <= 0) {
          placeholderDir.current = "typing";
          tid = setTimeout(tick, TYPING_SPEED);
        } else {
          tid = setTimeout(tick, DELETING_SPEED);
        }
      }
    };
    tid = setTimeout(tick, TYPING_SPEED);
    return () => clearTimeout(tid);
  }, [open, searchPlaceholder]);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedLabel = value || placeholder;

  return (
    <label className="flex w-full flex-col gap-2 sm:max-w-[32.3333rem] tracking-wide">
      <span className="text-sm text-neutral-800 lg:text-[1.1667rem]">{label}</span>
      <div ref={containerRef} className={`input-gradient-border-hover relative block bg-white ${open ? "input-gradient-border-active" : ""}`}>
        {/* Trigger button */}
        <button
          type="button"
          className="flex w-full items-center justify-between bg-white px-3.5 py-2.5 text-left text-xs text-neutral-600 cursor-pointer focus:outline-none lg:px-[1.1667rem] lg:py-[0.8333rem] lg:text-[1rem]"
          onClick={() => {
            setOpen(!open);
            setSearch("");
          }}
        >
          <span className={value ? "text-neutral-800" : ""}>{selectedLabel}</span>
          <Image
            src="/icons/career/chevron-down.svg"
            alt=""
            width={20}
            height={20}
            quality={100}
            aria-hidden
            className={`size-4 transition-transform duration-200 lg:size-[1.6667rem] ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 border border-neutral-100 bg-white shadow-lg">
            {/* Search input */}
            <div className="border-b border-neutral-100 bg-gray-50 px-3 py-2 lg:px-4 lg:py-3">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-neutral-400 lg:size-4" aria-hidden>
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={animPlaceholder}
                  className="w-full bg-transparent text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none lg:text-sm"
                  autoFocus
                />
              </div>
            </div>

            {/* Options list */}
            <div className="max-h-60 overflow-y-auto">
              {/* "All" option */}
              <button
                type="button"
                disabled={disabled}
                className={`w-full px-3 py-2.5 text-left text-xs transition-colors lg:px-4 lg:py-3 lg:text-sm ${
                  disabled
                    ? "text-neutral-400 cursor-not-allowed"
                    : !value
                      ? "bg-gray-50 text-neutral-800 font-medium"
                      : "text-neutral-600 hover:bg-[image:var(--primary-gradient)] hover:text-white cursor-pointer"
                }`}
                onClick={() => {
                  if (disabled) return;
                  onChange("");
                  setOpen(false);
                  setSearch("");
                }}
              >
                {placeholder}
              </button>

              {filtered.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`w-full px-3 py-2.5 text-left text-xs transition-colors lg:px-4 lg:py-3 lg:text-sm ${
                    value === opt ? "bg-gray-50 text-neutral-800 font-medium" : "text-neutral-600 hover:bg-[image:var(--primary-gradient)] hover:text-white cursor-pointer"
                  }`}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  {opt}
                </button>
              ))}

              {filtered.length === 0 && (
                <div className="px-3 py-2.5 text-xs text-neutral-500 lg:px-4 lg:py-3 lg:text-sm">
                  No results found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </label>
  );
}
