import Image from "next/image";

export type ValueCardItem = {
  icon: string;
  title: string;
  description: string;
};

type ValueCardsSectionProps = {
  id: string;
  heading: string;
  items: ValueCardItem[];
  /** Section background + contrasting card background */
  variant: "light" | "muted";
};

export default function ValueCardsSection({ id, heading, items, variant }: ValueCardsSectionProps) {
  const sectionBg = variant === "muted" ? "bg-gray-50" : "bg-white";
  const cardBg = variant === "muted" ? "bg-white" : "bg-gray-50";

  return (
    <section id={id} className={`w-full px-4 sm:px-6 lg:px-[5em] py-10 sm:py-12 lg:py-[5em] ${sectionBg}`}>
      <h2 className="text-3xl md:text-4xl lg:text-6xl text-neutral-800 font-test-tiempos-fine">
        {heading}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-8 lg:mt-10">
        {items.map((item) => (
          <div
            key={item.title}
            className={`card-gradient-hover group flex p-5 sm:p-6 lg:px-8 lg:py-[2em] ${cardBg}`}
          >
            <div className="flex flex-col gap-2 sm:gap-5 lg:gap-6">
              <div className="p-3.5">
                {/* Icon recolours to the brand gradient on card hover via a
                    masked overlay that cross-fades with the original. */}
                <div className="relative size-14 lg:size-18">
                  <Image
                    src={item.icon}
                    alt=""
                    aria-hidden
                    width={54}
                    height={54}
                    quality={100}
                    className="size-14 object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0 lg:size-18"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[image:var(--primary-gradient)] opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                    style={{
                      maskImage: `url(${item.icon})`,
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskImage: `url(${item.icon})`,
                      WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl lg:text-4xl text-neutral-800 font-medium font-test-tiempos-fine">
                  {item.title}
                </h3>
                <p className="text-base lg:text-xl text-neutral-800 tracking-wide mt-0 sm:mt-2 lg:mt-3">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
