"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import OfficeMap from "./OfficeMap";
import { locationTabs, locationCards } from "./contactData";

export default function AllLocationsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const tab = locationTabs[activeTab];
  const cards = locationCards[tab];

  // Default coordinates for the map (Dhaka)
  const defaultCoords = { lat: 23.7806, lng: 90.4074 };
  const mapCoords = cards[activeCard]?.coordinates ?? defaultCoords;

  return (
    <section className="flex flex-col px-4 sm:px-8 lg:px-[5rem] pt-10 sm:pt-16 lg:pt-[5rem] pb-10 sm:pb-16 lg:pb-[5rem] bg-white">
      {/* Centered heading */}
      <h2 className="text-center text-2xl sm:text-3xl lg:text-[2.7rem] leading-tight text-neutral-900 font-archivo-black uppercase">
        ASG All Location
      </h2>

      {/* Subtitle */}
      <p className="mt-3 sm:mt-4 text-center text-sm lg:text-[1.1rem] text-neutral-600 max-w-[24rem] mx-auto leading-relaxed">
        Connect with Amanat Shah Group through our corporate offices and business locations.
      </p>

      {/* Content: Map left + Tabs/Cards right — on desktop the grid rows keep the
          map's top edge aligned exactly with the first card under the tabs */}
      <div className="mt-8 sm:mt-10 lg:mt-16 flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-6">
        {/* Map */}
        <div className="relative order-3 w-full h-[280px] sm:h-[350px] rounded-xl overflow-hidden border border-gray-200 bg-[#D9D9D9] lg:order-none lg:col-start-1 lg:row-start-2 lg:h-[420px]">
          {/* Open in Maps link */}
          <a
            href={`https://www.google.com/maps?q=${mapCoords.lat},${mapCoords.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs sm:text-sm font-medium text-neutral-700 shadow-sm hover:bg-white transition-colors"
          >
            Open in Maps
            <ExternalLink size={12} />
          </a>
          <OfficeMap
            lat={mapCoords.lat}
            lng={mapCoords.lng}
            title={cards[activeCard]?.title ?? "ASG"}
          />
        </div>

        {/* Tabs — mobile sits between map and cards; desktop occupies top-right cell */}
        <div className="order-1 w-full inline-flex gap-2 border-b border-gray-200 lg:order-none lg:col-start-2 lg:row-start-1">
          {locationTabs.map((t, i) => (
            <button
              key={t}
              onClick={() => { setActiveTab(i); setActiveCard(0); }}
              className={`relative cursor-pointer px-3 sm:px-10 lg:px-12 py-3 sm:py-3.5 text-[1.05rem] sm:text-[1.2rem] lg:text-[1.3rem] transition-colors tracking-wide ${
                i === activeTab
                  ? "text-neutral-900 font-medium"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {t}
              {i === activeTab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[linear-gradient(150deg,#8BC34A_0%,#1AA179_81%)]" />
              )}
            </button>
          ))}
        </div>

        {/* Cards list */}
        <div className="order-2 flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-1 lg:order-none lg:col-start-2 lg:row-start-2 py-0.5">
          {cards.map((card, i) => (
            <button
              key={card.title}
              onClick={() => setActiveCard(i)}
              className={`text-left cursor-pointer rounded-xl border-[1.5px] p-4 sm:p-5 transition-all duration-300 ease-in-out lg:h-[202px] ${
                i === activeCard
                  ? "border-gray-100 bg-[linear-gradient(150deg,rgba(139,195,74,0.08)_0%,rgba(26,161,121,0.08)_81%)]"
                  : "border-gray-100 bg-white hover:border-gray-300"
              }`}
            >
              <h3 className="text-[1.05rem] sm:text-[1.3rem] font-bold text-neutral-900">
                {card.title}
              </h3>
              <p className="mt-1.5 text-[0.95rem] sm:text-[1.15rem] text-neutral-600 leading-relaxed">
                {card.address}
              </p>
              {card.phones.length > 0 && (
                <p className="mt-0.5 text-[0.95rem] sm:text-[1.15rem] text-neutral-600">
                  {card.phones.join(", ")}
                </p>
              )}
              {card.email && (
                <p className="text-[0.95rem] sm:text-[1.15rem] text-neutral-500">
                  {card.email}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
