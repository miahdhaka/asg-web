"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formTabs } from "./contactData";

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col items-center gap-9 w-full">
      {/* Tabs */}
      <div className="flex items-center self-stretch border-b border-gray-100">
        {formTabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-3.5 py-3.5 text-base text-neutral-800 transition-colors ${
              i === activeTab
                ? "bg-[linear-gradient(150deg,rgba(139,195,74,0.1)_0%,rgba(26,161,121,0.1)_81%)] border-b-2 border-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)]"
                : ""
            }`}
            style={
              i === activeTab
                ? {
                    borderImage:
                      "linear-gradient(150deg, #8BC34A 0%, #1AA179 81%) 1",
                    borderImageSlice: 1,
                    borderBottom: "2px solid",
                  }
                : undefined
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Full Name */}
      <div className="flex flex-col self-stretch gap-2">
        <div className="flex self-stretch border border-gray-100 bg-white px-3.5 py-2.5">
          <span className="text-xs text-neutral-600">Enter full name</span>
        </div>
      </div>

      {/* Mobile Number */}
      <div className="flex flex-col self-stretch gap-2">
        <div className="flex self-stretch border border-gray-100 bg-white px-3.5 py-2.5">
          <span className="text-xs text-neutral-600">
            Enter mobile number
          </span>
        </div>
      </div>

      {/* Product Dropdown */}
      <div className="flex flex-col self-stretch gap-2">
        <div className="flex flex-col self-stretch gap-2">
          <div className="flex self-stretch items-center border border-gray-100 bg-white px-3.5 py-2.5">
            <span className="flex-1 text-xs text-neutral-600">
              Select Product...
            </span>
            <ChevronDown size={20} className="text-neutral-800" />
          </div>
        </div>
      </div>

      {/* Message textarea */}
      <div className="flex self-stretch border border-gray-100 bg-white px-3.5 py-2.5 h-[12.25rem]">
        <span className="text-xs text-neutral-600">
          Write down your message
        </span>
      </div>

      {/* Send Message button */}
      <div className="self-end">
        <button
          data-label="Send Message"
          className="primary-btn-flip-gradient px-8 py-4 text-sm font-medium"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
