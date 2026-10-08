import Image from "next/image";

export type CoreValueCard = {
  icon: string;
  title: string;
  body: string;
};

type ConcernCoreValuesProps = {
  /** Optional anchor id for the section (e.g. "miah-core-values"). */
  sectionId?: string;
  heading: string;
  description: string;
  /** Four cards in reading order 0–3; the staggered grid places 0/2 in the
      left column and 1/3 in the offset right column. */
  cards: CoreValueCard[];
};

function ValueCard({ card }: { card: CoreValueCard }) {
  return (
    <div className="card-gradient-hover group relative flex flex-col overflow-hidden rounded-2xl border border-[#F5F5F5] bg-background p-5 lg:overflow-visible lg:rounded-none lg:bg-white lg:w-[29.33em] lg:p-[2em]">
      <div className="relative flex h-12 w-12 items-center justify-center lg:h-[4.17em] lg:w-[4.17em]">
        {/* Neutral icon — shown by default, fades out on hover */}
        <Image
          src={card.icon}
          alt=""
          width={50}
          height={50}
          className="h-auto w-full object-contain brightness-[0.45] grayscale transition-all duration-500 ease-in-out group-hover:opacity-0"
        />
        {/* Same icon masked as a shape, filled with the primary gradient —
            fades in on hover (CSS can't restyle an <img>'s colors directly) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          style={{
            background: "var(--primary-gradient)",
            WebkitMaskImage: `url(${card.icon})`,
            maskImage: `url(${card.icon})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </div>
      <h3 className="relative mt-4 font-archivo-black text-base font-medium text-neutral-800 lg:mt-[1.33em] lg:max-w-[13.67em] lg:text-[1.5em] lg:leading-[1.56]">
        {card.title}
      </h3>
      <p className="relative mt-2 text-[13px] text-neutral-800 sm:text-sm lg:mt-[0.67em] lg:max-w-[23.92em] lg:text-[1.17em] lg:leading-[1.43] tracking-wider">
        {card.body}
      </p>
    </div>
  );
}

/**
 * Light-gray band with a staggered 2×2 value card grid on the left and the
 * section heading on the right (Figma node 1631-8349). Reusable concern
 * component extracted from MiahCoreValues — design identical, all copy and
 * cards come from props.
 */
export default function ConcernCoreValues({
  sectionId,
  heading,
  description,
  cards,
}: ConcernCoreValuesProps) {
  return (
    <section
      id={sectionId}
      className="w-full bg-white px-4 py-10 sm:px-6 lg:px-[10em] lg:py-[5em]"
    >
      <div className="flex flex-col-reverse gap-4 sm:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-[5em]">
        {/* Staggered card grid — right column sits 69px lower than the left */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0 lg:flex lg:w-[58.67em] lg:shrink-0">
          <div className="flex flex-col gap-4 sm:gap-0">
            <ValueCard card={cards[0]} />
            <ValueCard card={cards[2]} />
          </div>
          <div className="flex flex-col gap-4 sm:gap-0 lg:mt-[5.75em]">
            <ValueCard card={cards[1]} />
            <ValueCard card={cards[3]} />
          </div>
        </div>

        {/* Section heading */}
        <div className="lg:w-[35.92em]">
          <h2 className="font-archivo-black text-2xl text-neutral-800 sm:text-3xl lg:max-w-[10em] lg:text-[3em] lg:leading-[1.11]">
            {heading}
          </h2>
          <p className="mt-1 sm:mt-3 text-sm text-neutral-800 lg:mt-[1.14em] lg:w-[27.79em] lg:text-[1.17em] lg:leading-[1.43]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
