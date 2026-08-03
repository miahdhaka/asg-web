import OfficeCard from "./OfficeCard";
import type { OfficeCardData } from "./contactData";

export default function OfficeSection({
  heading,
  cards,
}: {
  heading: string;
  cards: OfficeCardData[];
}) {
  return (
    <section className="flex flex-col">
      {/* Section heading */}
      <h2 className="text-2xl sm:text-4xl lg:text-[3rem] leading-[3rem] text-neutral-800 font-test-tiempos-fine mb-9">
        {heading}
      </h2>

      {/* Cards with dividers */}
      <div className="flex flex-col">
        {cards.map((card, i) => (
          <div key={card.title}>
            <OfficeCard card={card} />
            {i < cards.length - 1 && (
              <hr className="border-t border-gray-100 my-9" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
