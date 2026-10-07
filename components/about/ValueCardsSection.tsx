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
  variant: "light" | "muted";
};

export default function ValueCardsSection({ id, heading, items, variant }: ValueCardsSectionProps) {
  const cardBg = variant === "muted" ? "bg-[#F9FAFB]" : "bg-gray-50";

  return (
    <section id={id} className={`w-full px-4 sm:px-6 lg:px-[5em] py-16 lg:py-[5rem] ${variant === "muted" ? "" : "bg-white"}`}>
      <h2 className="font-archivo-black text-3xl sm:text-5xl lg:text-[3rem] leading-[1.1] text-[#262626] uppercase">
        {heading}
      </h2>

      <div className="mt-8 sm:mt-10 lg:mt-[3.5rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.title}
            className={`group relative flex flex-col items-start p-6 sm:p-8 rounded-2xl gap-6 sm:gap-4 overflow-hidden ${cardBg}`}
          >
            {/* Smooth gradient hover wash — background-image isn't animatable, so fade an overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(150deg,rgba(139,195,74,0.2)_0%,rgba(26,161,121,0.2)_81%)] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
            />

            {/* Icon */}
            <div className="relative shrink-0 sm:p-4.5">
              <div className="relative size-[55px] sm:size-[80px]">
                <Image
                  src={item.icon}
                  alt=""
                  aria-hidden
                  width={80}
                  height={80}
                  quality={100}
                  className="size-[70px] object-contain transition-all duration-700 ease-out group-hover:opacity-0"
                />
                {item.hoverIcon ? (
                  <Image
                    src={item.hoverIcon}
                    alt=""
                    aria-hidden
                    width={80}
                    height={80}
                    quality={100}
                    className="absolute inset-0 size-[70px] object-contain opacity-0 transition-all duration-700 ease-out group-hover:opacity-100"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 size-[70px] bg-[image:var(--primary-gradient)] opacity-0 transition-all duration-700 ease-out group-hover:opacity-100"
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

            {/* Text */}
            <div className="relative flex flex-col gap-2 sm:gap-3.5">
              <h3 className="font-archivo-black text-[1.5rem] lg:text-[2rem] leading-9 text-[#262626]">
                {item.title}
              </h3>
              <p className="font-neue-montreal tracking-wide text-base sm:text-xl lg:text-[1.3rem] leading-7 sm:leading-8 text-[#262626] max-w-[90%]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
