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
    <section id={id} className={`w-full py-[3.75rem] ${sectionBg}`}>
      <div className="mx-auto max-w-[90rem] px-[3.75rem]">
        <h2 className="font-test-tiempos-fine text-[3rem] leading-[3rem] text-neutral-800">
          {heading}
        </h2>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.title}
              className={`card-gradient-hover flex p-6 ${cardBg}`}
            >
              <div className="flex flex-col gap-4">
                <div className="p-3.5">
                  <Image
                    src={item.icon}
                    alt=""
                    aria-hidden
                    width={54}
                    height={54}
                    quality={100}
                    className="size-[3.375rem]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-test-tiempos-fine text-2xl font-medium leading-8 text-neutral-800">
                    {item.title}
                  </h3>
                  <p className="max-w-[20.625rem] text-base leading-6 text-neutral-800">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
