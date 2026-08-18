import Image from "next/image";

export type ValueCardItem = {
  icon: string;
  hoverIcon?: string;
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
    <section id={id} className={`w-full py-6 lg:py-[3.75rem] ${sectionBg}`}>
      <div className="px-4 sm:px-6 lg:px-[5em]">
        <h2 className="text-xl lg:text-6xl text-neutral-800 font-test-tiempos-fine">
          {heading}
        </h2>

        <div className="mt-4 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.title}
              className={`card-gradient-hover group flex p-4 lg:p-6 ${cardBg}`}
            >
              <div className="flex flex-col gap-0 sm:gap-4">
                <div className="p-3.5">
                  {/* Container must match icon size per breakpoint to prevent
                      gradient overlay from rendering larger than the icon */}
                  <div className="relative size-12 lg:size-[3.375rem]">
                    {/* Default icon */}
                    <Image
                      src={item.icon}
                      alt=""
                      aria-hidden
                      width={54}
                      height={54}
                      quality={100}
                      className="size-12 lg:size-[3.375rem] object-contain transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-110 lg:transition-opacity lg:duration-500 lg:group-hover:scale-100"
                    />
                    {/* Hover icon (if provided) or gradient overlay */}
                    {item.hoverIcon ? (
                      <Image
                        src={item.hoverIcon}
                        alt=""
                        aria-hidden
                        width={54}
                        height={54}
                        quality={100}
                        className="absolute inset-0 size-12 lg:size-[3.375rem] object-contain opacity-0 scale-100 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-110 lg:transition-opacity lg:duration-500 lg:group-hover:scale-100"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-[image:var(--primary-gradient)] opacity-0 scale-100 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-110 lg:transition-opacity lg:duration-500 lg:group-hover:scale-100"
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
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-test-tiempos-fine text-lg sm:text-2xl font-medium leading-7 sm:leading-8 text-neutral-800">
                    {item.title}
                  </h3>
                  <p className="max-w-[20.625rem] text-sm sm:text-base leading-5 sm:leading-6 text-neutral-800">
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
