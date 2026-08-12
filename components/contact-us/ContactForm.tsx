"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight, Send } from "lucide-react";
import { formTabs, formTabFields } from "./contactData";

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = formTabs[activeTab];
  const fields = formTabFields[tab];

  return (
    <div className="flex w-full flex-col gap-10.5">
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
            className={`relative cursor-pointer px-3.5 py-4 text-base lg:text-[1.3rem] text-neutral-800 transition-colors ${
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
      <div key={activeTab} className="flex flex-col gap-10.5 animate-fade-in">
        {/* Full name */}
        <div className="input-gradient-border-hover">
          <input
            type="text"
            placeholder={fields.namePlaceholder}
            className="h-9 lg:h-[3rem] w-full bg-white px-4 text-xs lg:text-[1rem] text-neutral-800 placeholder:text-neutral-600 focus:outline-none"
          />
        </div>

        {/* Mobile number */}
        <div className="input-gradient-border-hover">
          <input
            type="tel"
            placeholder={fields.mobilePlaceholder}
            className="h-9 lg:h-[3rem] w-full bg-white px-4 text-xs lg:text-[1rem] text-neutral-800 placeholder:text-neutral-600 focus:outline-none"
          />
        </div>

        {/* Topic dropdown */}
        <div className="input-gradient-border-hover flex h-9 lg:h-[3rem] self-stretch items-center gap-2 bg-white px-3.5">
          <span className="flex-1 text-xs lg:text-[1rem] text-neutral-600">
            {fields.dropdownPlaceholder}
          </span>
          <ChevronDown size={16} className="shrink-0 text-neutral-800" />
        </div>

        {/* Message */}
        <div className="input-gradient-border-hover">
          <textarea
            placeholder={fields.messagePlaceholder}
            className="h-[16.5rem] w-full resize-none bg-white px-4 py-3.5 text-xs lg:text-[1rem] text-neutral-800 placeholder:text-neutral-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Send Message button — left-aligned per Figma, flip hover (gradient fill → gradient outline) */}
      <button
        type="button"
        className="group relative self-start overflow-hidden text-lg text-nowrap tracking-wide cursor-pointer"
      >
        {/* Hover layer — gradient border + gradient text, slides in from top */}
        <span
          aria-hidden
          className="absolute inset-0 flex -translate-y-full items-center justify-center gap-2 bg-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)] p-px transition-transform duration-500 ease-in-out group-hover:translate-y-0"
        >
          <span className="flex h-full w-full items-center justify-center gap-2 bg-white px-10">
            <span className="bg-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)] bg-clip-text text-transparent">
              Send Message
            </span>
            <Send size={20} className="shrink-0" style={{ stroke: 'url(#icon-gradient)' }} />
          </span>
        </span>

        {/* Default layer — gradient fill + white content, slides out downward */}
        <span className="relative flex items-center justify-center gap-2 bg-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)] px-10 py-5 text-white transition-transform duration-500 ease-in-out group-hover:translate-y-full">
          Send Message
          <Send size={20} className="shrink-0"/>
        </span>
      </button>
    </div>
  );
}
