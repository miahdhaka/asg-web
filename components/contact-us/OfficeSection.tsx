import OfficeCard from "./OfficeCard";
import type { OfficeCardData } from "./contactData";

export default function OfficeSection({
  heading,
  cards,
  trailingDivider = false,
  className = "",
}: {
  heading: string;
  cards: OfficeCardData[];
  trailingDivider?: boolean;
  className?: string;
}) {
  return (
    <section className={`flex flex-col pt-[3.75rem] ${className}`}>
      {/* Section heading — aligned with the page's 60px left margin */}
      <h2 className="mb-8 px-4 text-2xl leading-[2rem] text-neutral-800 font-test-tiempos-fine sm:px-8 lg:px-[3.75rem] lg:text-5xl lg:leading-[3rem]">
        {heading}
      </h2>

      {/* Cards centered in a 1152px container, with dividers between rows */}
      <div className="mx-auto flex w-full max-w-[72rem] flex-col px-4 sm:px-8 lg:px-0">
        {cards.map((card, i) => (
          <div key={card.title} className="flex flex-col">
            <OfficeCard card={card} />
            {i < cards.length - 1 && (
              <hr className="my-9 border-t border-gray-100" />
            )}
          </div>
        ))}
        {trailingDivider && <hr className="mt-9 border-t border-gray-100" />}
      </div>
    </section>
  );
}
