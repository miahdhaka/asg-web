import Image from "next/image";
import { csrInitiativeCards, type CsrInitiativeCard } from "./csrData";

function InitiativeCardItem({ card }: { card: CsrInitiativeCard }) {
  return (
    <div className="group relative flex flex-col gap-2.5 overflow-hidden bg-gray-50 px-6 lg:px-8 py-8 lg:py-10">
      {/* Brand-green tint on hover (matches the design's hover state) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(150deg, rgba(139, 195, 74, 0.2) 0%, rgba(26, 161, 121, 0.2) 81%)",
        }}
      />
      <div className="relative flex flex-col gap-4">
        <h3 className="font-test-tiempos-fine text-neutral-800 text-xl lg:text-[2rem] leading-[1.33] lg:leading-[2rem]">
          {card.title}
        </h3>
        <p className="text-sm lg:text-[1.15rem] leading-[1.25rem] lg:leading-[1.65rem] text-neutral-800">
          {card.description}
        </p>
      </div>
      <div className="relative aspect-[603/313] w-full overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          draggable={false}
          className="pointer-events-none object-cover"
          quality={80}
        />
        {/* Hover overlay */}
        <div
          aria-hidden
          className="overlay-image-hover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        />
      </div>
    </div>
  );
}

export default function CsrInitiatives() {
  return (
    <section className="px-4 sm:px-8 lg:px-[5rem] py-12 lg:py-[3rem] mb-[2rem]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[1.4rem]">
        {csrInitiativeCards.map((card) => (
          <InitiativeCardItem key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
