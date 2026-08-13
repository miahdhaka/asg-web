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
    <section className={`flex flex-col px-4 sm:px-8 lg:px-[5rem] pt-8 lg:pt-[5rem] pb-0 sm:pb-16 lg:pb-[4.5rem] ${className}`}>
      {/* Section heading — aligned with the page's 60px left margin */}
      <h2 className="text-xl sm:text-2xl lg:text-[4rem] leading-[1.75rem] sm:leading-[2rem] lg:leading-[3rem] text-neutral-800 font-test-tiempos-fine mb-4 sm:mb-8 lg:mb-[3rem]">
        {heading}
      </h2>

      {/* Cards centered in a 1152px container, with dividers between rows */}
      <div className="flex flex-col w-full max-w-[120rem] mx-auto px-0 sm:px-8 lg:px-0">
        {cards.map((card, i) => (
          <div key={card.title} className="flex flex-col">
            <OfficeCard card={card} />
            {i < cards.length - 1 && (
              <hr className="my-6 sm:my-9 border-t border-gray-100" />
            )}
          </div>
        ))}
        {trailingDivider && <hr className="mt-9 border-t border-gray-100" />}
      </div>
    </section>
  );
}
