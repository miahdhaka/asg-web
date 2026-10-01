import Image from "next/image";
import { esgStatCards, type EsgStatCard } from "./esgData";

function StatCard({ card }: { card: EsgStatCard }) {
  return (
    <div className="relative aspect-[320/408] w-full overflow-hidden rounded-[1rem] bg-[#D9D9D9]">
      <Image
        src={card.image}
        alt={card.alt}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover"
        quality={85}
      />
      {/* Bottom dark gradient for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(12,12,12,0.9) 0%, rgba(0,0,0,0) 63%)",
        }}
      />
      {/* Overlaid text — bottom-left */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 sm:p-6">
        <span className="font-archivo-black text-white text-xl sm:text-[1.875rem] leading-tight">
          {card.value}
        </span>
        <span className="font-neue-montreal text-sm sm:text-base text-white/90">
          {card.label}
        </span>
      </div>
    </div>
  );
}

/* Three overlay stat cards */
export default function EsgStatCards() {
  return (
    <section className="bg-background px-4 sm:px-8 py-10 sm:py-14 lg:py-[4rem]">
      <div className="mx-auto grid w-full max-w-[61rem] grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 lg:gap-5">
        {esgStatCards.map((card) => (
          <StatCard key={card.value} card={card} />
        ))}
      </div>
    </section>
  );
}
