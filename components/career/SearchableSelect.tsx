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
}

export default function SearchableSelect({
  label,
  placeholder,
  searchPlaceholder,
  value,
  onChange,
  options,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

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
    <label className="flex w-full flex-col gap-2 sm:max-w-[32.3333rem]">
      <span className="text-sm text-neutral-800 lg:text-[1.1667rem]">{label}</span>
      <div ref={containerRef} className="input-gradient-border-hover relative block bg-white">
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
            <div className="border-b border-neutral-100 px-3 py-2 lg:px-4 lg:py-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-xs text-neutral-800 placeholder:text-neutral-500 focus:outline-none lg:text-sm"
                autoFocus
              />
            </div>

            {/* Options list */}
            <div className="max-h-60 overflow-y-auto">
              {/* "All" option */}
              <button
                type="button"
                className={`w-full px-3 py-2.5 text-left text-xs transition-colors hover:bg-gray-50 lg:px-4 lg:py-3 lg:text-sm ${
                  !value ? "bg-gray-50 text-neutral-800 font-medium" : "text-neutral-600"
                }`}
                onClick={() => {
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
                  className={`w-full px-3 py-2.5 text-left text-xs transition-colors hover:bg-gray-50 lg:px-4 lg:py-3 lg:text-sm ${
                    value === opt ? "bg-gray-50 text-neutral-800 font-medium" : "text-neutral-600"
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
