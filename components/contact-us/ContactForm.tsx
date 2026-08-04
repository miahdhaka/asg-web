"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { formTabs, formTabFields } from "./contactData";

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = formTabs[activeTab];
  const fields = formTabFields[tab];

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Tabs */}
      <div className="flex items-center self-stretch border-b border-gray-100">
        {formTabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`relative px-3.5 py-3.5 text-base leading-6 text-neutral-800 transition-colors ${
              i === activeTab
                ? "bg-[linear-gradient(150deg,rgba(139,195,74,0.1)_0%,rgba(26,161,121,0.1)_81%)]"
                : ""
            }`}
          >
            {tab}
            {i === activeTab && (
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 bg-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Full name */}
      <input
        key={`name-${tab}`}
        type="text"
        placeholder={fields.namePlaceholder}
        className="h-9 self-stretch border border-neutral-100 bg-white px-3.5 text-xs leading-4 text-neutral-800 placeholder:text-neutral-600 focus:outline-none"
      />

      {/* Mobile number */}
      <input
        key={`mobile-${tab}`}
        type="tel"
        placeholder={fields.mobilePlaceholder}
        className="h-9 self-stretch border border-neutral-100 bg-white px-3.5 text-xs leading-4 text-neutral-800 placeholder:text-neutral-600 focus:outline-none"
      />

      {/* Topic dropdown */}
      <div
        key={`dropdown-${tab}`}
        className="flex h-9 self-stretch items-center gap-2 border border-neutral-100 bg-white px-3.5"
      >
        <span className="flex-1 text-xs leading-4 text-neutral-600">
          {fields.dropdownPlaceholder}
        </span>
        <ChevronDown size={16} className="shrink-0 text-neutral-800" />
      </div>

      {/* Message */}
      <textarea
        key={`message-${tab}`}
        placeholder={fields.messagePlaceholder}
        className="h-[12.25rem] self-stretch resize-none border border-gray-100 bg-white px-3.5 py-2.5 text-xs leading-4 text-neutral-800 placeholder:text-neutral-600 focus:outline-none"
      />

      {/* Send Message button — left-aligned per Figma, flip hover (gradient fill → gradient outline) */}
      <button
        type="button"
        className="group relative self-start overflow-hidden text-sm leading-5 font-medium"
      >
        {/* Hover layer — gradient border + gradient text, slides in from top */}
        <span
          aria-hidden
          className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1.5 bg-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)] p-px transition-transform duration-500 ease-in-out group-hover:translate-y-0"
        >
          <span className="flex h-full w-full items-center justify-center gap-1.5 bg-white px-8">
            <span className="bg-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)] bg-clip-text text-transparent">
              Send Message
            </span>
            <ArrowRight size={14} className="shrink-0 text-[#1AA179]" />
          </span>
        </span>

        {/* Default layer — gradient fill + white content, slides out downward */}
        <span className="relative flex items-center justify-center gap-1.5 bg-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)] px-8 py-4 text-white transition-transform duration-500 ease-in-out group-hover:translate-y-full">
          Send Message
          <ArrowRight size={14} className="shrink-0" />
        </span>
      </button>
    </div>
  );
}
