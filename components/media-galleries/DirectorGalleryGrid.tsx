"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { DirectorCard as DirectorCardData } from "./mediaGalleriesData";
import PhotoLightbox, { type LightboxItem } from "./PhotoLightbox";

/* ------------------------------------------------------------------ */
/*  Director card                                                      */
/* ------------------------------------------------------------------ */

export function DirectorCard({
  card,
  onSelect,
}: {
  card: DirectorCardData;
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
      <div className="card-gradient-target card-gradient-fast relative aspect-[429/257] w-full overflow-hidden bg-gray-50">
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          draggable={false}
          className="pointer-events-none object-contain grayscale transition-[filter] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:grayscale-0"
          quality={90}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-test-tiempos-fine text-[1.125rem] leading-[1.5rem] text-neutral-800 lg:text-[1.5rem] lg:leading-[1.75rem]">
          {card.name}
        </p>
        <p className="font-neue-montreal text-[1.11rem] leading-[1.5rem] text-neutral-800">
          {card.title}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Director grid with lightbox                                        */
/* ------------------------------------------------------------------ */

export default function DirectorGalleryGrid({ cards }: { cards: DirectorCardData[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items: LightboxItem[] = useMemo(
    () =>
      cards.map((card) => ({
        image: card.image,
        caption: card.name,
        subCaption: card.title,
      })),
    [cards]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8">
        {cards.map((card, i) => (
          <DirectorCard key={card.name} card={card} onSelect={() => setActiveIndex(i)} />
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
