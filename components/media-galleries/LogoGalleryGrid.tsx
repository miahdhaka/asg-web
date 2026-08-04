"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { LogoCard as LogoCardData } from "./mediaGalleriesData";
import PhotoLightbox, { type LightboxItem } from "./PhotoLightbox";

/* ------------------------------------------------------------------ */
/*  Logo card                                                          */
/* ------------------------------------------------------------------ */

export function LogoCard({
  card,
  onSelect,
}: {
  card: LogoCardData;
  onSelect?: () => void;
}) {
  return (
    <div
      className={`group flex flex-col gap-4 ${onSelect ? "cursor-pointer" : ""}`}
      onClick={onSelect}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={
        onSelect
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
    >
      <div className="card-gradient-target card-gradient-fast flex aspect-[429/257] w-full items-center justify-center bg-gray-50">
        <Image
          src={card.image}
          alt={card.label}
          width={261}
          height={129}
          draggable={false}
          className="pointer-events-none object-contain grayscale transition-[filter] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:grayscale-0"
          quality={100}
        />
      </div>
      <p className="font-test-tiempos-fine text-[1.125rem] leading-[1.5rem] text-neutral-800 lg:text-[1.5rem] lg:leading-[1.75rem]">
        {card.label}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo grid with lightbox                                            */
/* ------------------------------------------------------------------ */

export default function LogoGalleryGrid({ cards }: { cards: LogoCardData[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items: LightboxItem[] = useMemo(
    () => cards.map((card) => ({ image: card.image, caption: card.label })),
    [cards]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8">
        {cards.map((card, i) => (
          <LogoCard key={card.label + i} card={card} onSelect={() => setActiveIndex(i)} />
        ))}
      </div>

      {activeIndex !== null && (
        <PhotoLightbox
          items={items}
          index={activeIndex}
          onIndexChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}
