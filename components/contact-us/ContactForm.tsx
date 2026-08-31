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
    <div className="flex w-full flex-col gap-5 sm:gap-10.5">
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
      <div className="relative grid grid-cols-4 border-b border-gray-100">
        {formTabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`relative cursor-pointer px-2 sm:px-3.5 py-3 sm:py-4 text-xs sm:text-base lg:text-[1.3rem] text-neutral-800 transition-colors ${
              i === activeTab
                ? "bg-[linear-gradient(150deg,rgba(139,195,74,0.1)_0%,rgba(26,161,121,0.1)_81%)]"
                : ""
            }`}
          >
            {tab}
          </button>
        ))}
        {/* Sliding gradient indicator */}
        <span
          aria-hidden
          className="absolute bottom-0 h-[3px] w-1/4 bg-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)] transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${activeTab * 100}%)` }}
        />
      </div>

      {/* Form fields with fade transition */}
      <div key={activeTab} className="flex flex-col gap-4 sm:gap-8 animate-fade-in">
        {/* Full name */}
        <div className="flex flex-col gap-1.5 sm:gap-0">
          <label className="sm:hidden text-xs font-medium text-neutral-800">Full Name</label>
          <div className="border border-neutral-200 rounded-md sm:input-gradient-border-hover">
            <input
              type="text"
              placeholder={fields.namePlaceholder}
              className="h-9 lg:h-[3.5rem] w-full bg-white px-3 sm:px-4 text-xs lg:text-[1rem] text-neutral-800 placeholder:text-neutral-600 focus:outline-none rounded-md"
            />
          </div>
        </div>

        {/* Mobile number */}
        <div className="flex flex-col gap-1.5 sm:gap-0">
          <label className="sm:hidden text-xs font-medium text-neutral-800">Mobile Number</label>
          <div className="border border-neutral-200 rounded-md sm:input-gradient-border-hover">
            <input
              type="tel"
              placeholder={fields.mobilePlaceholder}
              className="h-9 lg:h-[3.5rem] w-full bg-white px-3 sm:px-4 text-xs lg:text-[1rem] text-neutral-800 placeholder:text-neutral-600 focus:outline-none rounded-md"
            />
          </div>
        </div>

        {/* Topic / Product dropdown */}
        <div className="flex flex-col gap-1.5 sm:gap-0">
          <label className="sm:hidden text-xs font-medium text-neutral-800">Topic</label>
          <div ref={dropdownRef} className="relative self-stretch">
            {/* Trigger button */}
            <button
              type="button"
              onClick={() => hasSearchableDropdown && setDropdownOpen((o) => !o)}
              className="flex h-9 lg:h-[3.5rem] w-full items-center gap-2 bg-white px-3 sm:px-3.5 border border-neutral-200 rounded-md sm:input-gradient-border-hover text-left cursor-pointer"
            >
              <span className="flex-1 text-xs lg:text-[1rem] text-neutral-600 truncate">
                {selectedOption || fields.dropdownPlaceholder}
              </span>
              <ChevronDown
                size={16}
                className={`shrink-0 text-neutral-800 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown panel — only for tabs with options */}
            {dropdownOpen && hasSearchableDropdown && (
              <div className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg">
                {/* Search bar */}
                <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2">
                  <Search className="size-4 shrink-0 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
                    autoFocus
                  />
                </div>

                {/* Options list */}
                <ul className="max-h-48 overflow-y-auto py-1">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((opt) => (
                      <li key={opt}>
                        <button
                          type="button"
                          onClick={() => selectOption(opt)}
                          className={`w-full cursor-pointer px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 ${
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
                    <li className="px-4 py-3 text-sm text-neutral-400">
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
          <label className="sm:hidden text-xs font-medium text-neutral-800">Message</label>
          <div className="border border-neutral-200 rounded-md sm:input-gradient-border-hover">
            <textarea
              placeholder={fields.messagePlaceholder}
              className="h-[10rem] lg:h-[16.5rem] w-full resize-none bg-white px-3 sm:px-4 py-2.5 sm:py-3.5 text-xs lg:text-[1rem] text-neutral-800 placeholder:text-neutral-600 focus:outline-none rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Send Message button — flip hover (gradient fill → gradient outline) */}
      <button
        type="button"
        className="group relative self-start inline-flex overflow-hidden text-sm sm:text-lg text-nowrap tracking-wide cursor-pointer px-5 sm:px-10 py-2.5 sm:py-5"
        style={{
          borderImage: "var(--primary-gradient) 1",
          borderWidth: 1,
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
