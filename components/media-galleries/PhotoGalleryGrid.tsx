"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { GalleryCard } from "./mediaGalleriesData";
import PhotoLightbox, { type LightboxItem } from "./PhotoLightbox";

/* ------------------------------------------------------------------ */
/*  Site / Process photo card                                          */
/* ------------------------------------------------------------------ */

export function PhotoCard({
  card,
  onSelect,
}: {
  card: GalleryCard;
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
      <div className="relative aspect-[429/257] w-full overflow-hidden bg-[#D9D9D9]">
        <Image
          src={card.image}
          alt={card.label}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          draggable={false}
          className="pointer-events-none object-cover"
          quality={80}
        />
        {/* Hover overlay */}
        <div
          aria-hidden
          className="absolute inset-0 overlay-image-hover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        />
      </div>
      <p className="font-test-tiempos-fine text-[1.125rem] leading-[1.5rem] text-neutral-800 lg:text-[1.5rem] lg:leading-[1.75rem]">
        {card.label}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Photo grid with lightbox                                           */
/* ------------------------------------------------------------------ */

export default function PhotoGalleryGrid({ cards }: { cards: GalleryCard[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items: LightboxItem[] = useMemo(
    () => cards.map((card) => ({ image: card.image, caption: card.label })),
    [cards]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8">
        {cards.map((card, i) => (
          <PhotoCard key={card.label + i} card={card} onSelect={() => setActiveIndex(i)} />
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
