"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight, Send, Search } from "lucide-react";
import { formTabs, formTabFields } from "./contactData";

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = formTabs[activeTab];
  const fields = formTabFields[tab];

  /* ── Searchable dropdown state ── */
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = fields.dropdownOptions ?? [];
  const hasSearchableDropdown = options.length > 0;

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectOption = (value: string) => {
    setSelectedOption(value);
    setDropdownOpen(false);
    setSearchQuery("");
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setSearchQuery("");
      }
    }
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Reset dropdown state when tab changes
  useEffect(() => {
    setDropdownOpen(false);
    setSelectedOption("");
    setSearchQuery("");
  }, [activeTab]);

  return (
    <div className="flex w-full flex-col gap-5 sm:gap-8">
      {/* SVG Gradient Definition for Icon */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8BC34A" />
            <stop offset="81%" stopColor="#1AA179" />
          </linearGradient>
        </defs>
      </svg>
      {/* Tabs */}
      <div className="flex gap-2 w-full border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {formTabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`relative cursor-pointer shrink-0 py-3 sm:py-4 text-base lg:text-[1.3rem] transition-colors tracking-wide min-w-[5.3rem] sm:min-w-[200px] ${
              i === activeTab
                ? "text-neutral-900 font-medium"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {tab}
            {i === activeTab && (
              <span className="absolute bottom-0 left-0 h-[2.5px] w-full bg-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)]" />
            )}
          </button>
        ))}
      </div>

      {/* Form fields with fade transition */}
      <div key={activeTab} className="flex flex-col gap-3 animate-fade-in">
        {/* Full name */}
        <div className="flex flex-col gap-1.5 sm:gap-0">
          <input
            type="text"
            placeholder={fields.namePlaceholder}
            className="h-12 lg:h-[3.8rem] w-full bg-white px-4 sm:px-5 text-sm lg:text-[1.1rem] text-neutral-800 placeholder:text-neutral-400 focus:outline-none rounded-md"
          />
        </div>

        {/* Mobile number */}
        <div className="flex flex-col gap-1.5 sm:gap-0">
          <input
            type="tel"
            placeholder={fields.mobilePlaceholder}
            className="h-12 lg:h-[3.8rem] w-full bg-white px-4 sm:px-5 text-sm lg:text-[1.1rem] text-neutral-800 placeholder:text-neutral-400 focus:outline-none rounded-md"
          />
        </div>

        {/* Topic / Product dropdown */}
        <div className="flex flex-col gap-1.5 sm:gap-0">
          <div ref={dropdownRef} className="relative self-stretch">
            {/* Trigger button */}
            <button
              type="button"
              onClick={() => hasSearchableDropdown && setDropdownOpen((o) => !o)}
              className="flex h-12 lg:h-[3.8rem] w-full items-center gap-2 bg-white px-4 sm:px-5 rounded-md text-left cursor-pointer"
            >
              <span className="flex-1 text-sm lg:text-[1.1rem] text-neutral-400 truncate">
                {selectedOption || fields.dropdownPlaceholder}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-neutral-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown panel — only for tabs with options */}
            {dropdownOpen && hasSearchableDropdown && (
              <div className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg">
                {/* Search bar */}
                <div className="flex items-center gap-2.5 border-b border-gray-100 px-4 py-3">
                  <Search className="size-[18px] shrink-0 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
                    autoFocus
                  />
                </div>

                {/* Options list */}
                <ul className="max-h-64 overflow-y-auto py-1.5">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((opt) => (
                      <li key={opt}>
                        <button
                          type="button"
                          onClick={() => selectOption(opt)}
                          className={`w-full cursor-pointer px-5 py-3.5 text-left text-base transition-colors hover:bg-[linear-gradient(150deg,rgba(139,195,74,0.1)_0%,rgba(26,161,121,0.1)_81%)] ${
                            selectedOption === opt
                              ? "bg-gray-50 font-medium text-neutral-800"
                              : "text-neutral-600"
                          }`}
                        >
                          {opt}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="px-5 py-3.5 text-base text-neutral-400">
                      No results found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5 sm:gap-0">
          <textarea
            placeholder={fields.messagePlaceholder}
            className="h-[10rem] lg:h-[12rem] w-full resize-none bg-white px-4 sm:px-5 py-3 sm:py-4 text-sm lg:text-[1.1rem] text-neutral-800 placeholder:text-neutral-400 focus:outline-none rounded-md"
          />
        </div>
      </div>

      {/* Send Message button — flip hover (gradient fill → gradient outline) */}
      <button
        type="button"
        className="group relative self-start inline-flex overflow-hidden rounded-full border border-transparent text-sm sm:text-lg text-nowrap tracking-wide cursor-pointer px-5 sm:px-10 py-2.5 sm:py-5"
        style={{
          background: "linear-gradient(var(--background)) padding-box, var(--primary-gradient) border-box",
        }}
      >
        {/* Invisible spacer */}
        <span className="invisible inline-flex items-center gap-1.5 sm:gap-2">
          Send Message
          <Send size={16} className="sm:hidden shrink-0" />
          <Send size={20} className="hidden sm:block shrink-0" />
        </span>

        {/* Default — gradient fill + white text, slides down on hover */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center gap-1.5 sm:gap-2 text-white transition-transform duration-500 ease-in-out group-hover:translate-y-full"
          style={{ background: "var(--primary-gradient)" }}
        >
          Send Message
          <Send size={16} className="sm:hidden shrink-0" />
          <Send size={20} className="hidden sm:block shrink-0" />
        </span>

        {/* Hover — gradient text, slides in from top */}
        <span
          aria-hidden
          className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1.5 sm:gap-2 transition-transform duration-500 ease-in-out group-hover:translate-y-0"
        >
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--primary-gradient)" }}>
            Send Message
          </span>
          <Send size={16} className="sm:hidden shrink-0" style={{ color: '#1AA179' }} strokeWidth={1.5} />
          <Send size={20} className="hidden sm:block shrink-0" style={{ color: '#1AA179' }} strokeWidth={1.5} />
        </span>
      </button>
    </div>
  );
}
