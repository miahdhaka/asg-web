import Image from "next/image";

/* Positions come straight off the Figma group (node 2604-30243, px/12 em) —
   the four pillars ring a dashed circle with "Sustainability" at its core. */
const pillars = [
  {
    icon: "/images/concerns/helal-brothers/icon-financial.svg",
    iconSize: 54,
    title: "Financial Empowerment",
    body: "We provide rural weavers with the necessary financial loans and assistance to cover raw materials and production costs for lungis, sharees, and gamchas.",
    frameClass: "lg:left-[21.83em] lg:top-0 lg:w-[18.42em] lg:text-left",
    iconClass: "lg:left-[28.42em] lg:top-[9em] lg:h-[5.33em] lg:w-[5.33em]",
  },
  {
    icon: "/images/concerns/helal-brothers/icon-fair-trade.svg",
    iconSize: 38,
    title: "Fair-Trade Purchasing",
    body: "We purchase products manufactured by our weavers directly at fair prices, ensuring they are equitably compensated for their skill and labor.",
    frameClass: "lg:left-[43.5em] lg:top-[16.25em] lg:w-[18.42em] lg:text-left",
    iconClass: "lg:left-[37.17em] lg:top-[17.58em] lg:h-[5.33em] lg:w-[5.33em]",
  },
  {
    icon: "/images/concerns/helal-brothers/icon-global.svg",
    iconSize: 38,
    title: "Global Market Transformation",
    body: "We refine these traditional products to meet international standards and export them globally, bringing prestige to Bangladesh's textile heritage.",
    frameClass: "lg:left-[21.83em] lg:top-[32.92em] lg:w-[20.08em] lg:text-left",
    iconClass: "lg:left-[28.42em] lg:top-[26.58em] lg:h-[5.33em] lg:w-[5.33em]",
  },
  {
    icon: "/images/concerns/helal-brothers/icon-holistic.svg",
    iconSize: 50,
    title: "Holistic Artisan Support",
    body: "Beyond financial investment, we empower our artisans by providing comprehensive health coverage and educational support for their families, fostering long-term community well-being and prosperity.",
    frameClass: "lg:left-0 lg:top-[15.58em] lg:w-[18.42em] lg:text-right",
    iconClass: "lg:left-[19.42em] lg:top-[17.58em] lg:h-[5.33em] lg:w-[5.67em]",
  },
];

/**
 * "Bridging Tradition and Global Markets Through Social" — the pale gray band
 * with the sustainability wheel on the left and copy + photo on the right.
 */
export default function HelalSocialModel() {
  return (
    <section id="helal-social-model" className="w-full bg-gray-50">
      <div className="flex flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:justify-between lg:px-[5em] lg:py-[5em]">
        {/* Sustainability wheel — free-form absolute layout on desktop,
            simple stacked cards on mobile */}
        <div className="relative order-2 lg:order-1 lg:mt-[1.25em] lg:h-[40.92em] lg:w-[61.92em] lg:shrink-0">
          {/* Dashed gradient ring + core circle (desktop only) */}
          <div className="hidden lg:block">
            <svg
              viewBox="0 0 226 226"
              fill="none"
              aria-hidden
              className="absolute left-[21.58em] top-[10.83em] h-[18.83em] w-[18.83em]"
            >
              <defs>
                <linearGradient id="helal-ring" x1="0" y1="0" x2="226" y2="226" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8BC34A" />
                  <stop offset="1" stopColor="#1AA179" />
                </linearGradient>
              </defs>
              <circle
                cx="113"
                cy="113"
                r="112.5"
                stroke="url(#helal-ring)"
                strokeDasharray="3 3"
              />
            </svg>
            <div className="absolute left-[25.92em] top-[15.33em] flex h-[10.25em] w-[10.25em] items-center justify-center rounded-full">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full opacity-10"
                style={{ background: "var(--primary-gradient)" }}
              />
              <span
                className="relative w-[6em] bg-clip-text text-center text-[1.17em] font-medium leading-[1.43] text-transparent"
                style={{ backgroundImage: "var(--primary-gradient)" }}
              >
                Sustainability at the core of our business
              </span>
            </div>
          </div>

          {/* Pillar icons + copy */}
          {pillars.map((pillar) => (
            <div key={pillar.title} className="contents">
              <div
                className={`mt-8 flex h-14 w-14 items-center justify-center rounded-full border border-gray-100 bg-white first:mt-0 lg:absolute lg:mt-0 ${pillar.iconClass}`}
              >
                <Image
                  src={pillar.icon}
                  alt=""
                  aria-hidden
                  width={pillar.iconSize}
                  height={pillar.iconSize}
                  quality={100}
                  className="h-3/5 w-3/5 object-contain lg:h-[60%] lg:w-[60%]"
                />
              </div>
              <div className={`mt-3 lg:absolute lg:mt-0 ${pillar.frameClass}`}>
                <h3 className="font-test-tiempos-fine text-lg text-neutral-800 lg:text-[1.5em] lg:leading-[1.56]">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs text-neutral-800 lg:mt-[0.33em] lg:text-[1em] lg:leading-[1.33]">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Copy + photograph */}
        <div className="order-1 lg:order-2 lg:w-[42.08em] lg:shrink-0">
          {/* Design widths ÷ own font-size: 390px/24 and 423px/14 */}
          <h2 className="font-test-tiempos-fine text-xl font-medium text-neutral-800 sm:text-2xl lg:w-[16.25em] lg:text-[2em] lg:leading-[1.33]">
            Bridging Tradition and Global Markets Through Social
          </h2>
          <p className="mt-2 text-sm text-neutral-800 lg:mt-[0.67em] lg:w-[30.21em] lg:text-[1.17em] lg:leading-[1.43]">
            We cultivate sustainable growth by empowering rural artisans
            through fair-trade financing, ensuring their traditional
            craftsmanship meets rigorous international standards.
          </p>
          <Image
            src="/images/concerns/helal-brothers/social-photo.webp"
            alt="Rural artisans supported by the Helal & Brothers social business model"
            width={534}
            height={330}
            quality={90}
            className="mt-4 w-full object-cover lg:mt-[2em] lg:h-[27.42em] lg:w-[42.08em]"
          />
        </div>
      </div>
    </section>
  );
}
