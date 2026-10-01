import Image from "next/image";
import { useId } from "react";

export type SocialPillar = {
  icon: string;
  iconSize: number;
  title: string;
  body: string;
  /* Desktop wheel positions come straight off the Figma group (px/12 em) —
     they live in the data so each concern can arrange its own pillars. */
  frameClass: string;
  iconClass: string;
};

type ConcernSocialModelProps = {
  /** Optional anchor id for the section (e.g. "helal-social-model"). */
  sectionId?: string;
  heading: string;
  description: string;
  /** Text inside the dashed ring's core circle. */
  coreText: string;
  pillars: SocialPillar[];
  photoSrc: string;
  photoAlt: string;
};

/**
 * The pale gray band with the sustainability wheel on the left and copy +
 * photo on the right. Sister-concern reusable version of HelalSocialModel —
 * design identical, all copy/positions come from props.
 */
export default function ConcernSocialModel({
  sectionId,
  heading,
  description,
  coreText,
  pillars,
  photoSrc,
  photoAlt,
}: ConcernSocialModelProps) {
  /* Unique per instance so two wheels on one page can't share a gradient id */
  const ringId = `concern-ring-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <section id={sectionId} className="w-full bg-white">
      <div className="flex flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:justify-between lg:px-[5em] lg:py-[5em]">
        {/* Sustainability wheel — free-form absolute layout on desktop,
            simple stacked cards on mobile */}
        <div className="relative order-2 flex flex-col gap-4 lg:order-1 lg:mt-[1.25em] lg:flex-none lg:h-[40.92em] lg:w-[61.92em] lg:shrink-0 lg:gap-0">
          {/* Dashed gradient ring + core circle (desktop only) */}
          <div className="hidden lg:block">
            <svg
              viewBox="0 0 226 226"
              fill="none"
              aria-hidden
              className="absolute left-[21.58em] top-[10.83em] h-[18.83em] w-[18.83em]"
            >
              <defs>
                <linearGradient id={ringId} x1="0" y1="0" x2="226" y2="226" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8BC34A" />
                  <stop offset="1" stopColor="#1AA179" />
                </linearGradient>
              </defs>
              <circle
                cx="113"
                cy="113"
                r="112.5"
                stroke={`url(#${ringId})`}
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
                {coreText}
              </span>
            </div>
          </div>

          {/* Pillar icons + copy */}
          {pillars.map((pillar) => (
            <div key={pillar.title} className="flex flex-col sm:flex-row items-start gap-3 rounded-[1.25rem] border border-gray-200 bg-background p-3 shadow-sm transition duration-200 max-lg:hover:-translate-y-0.5 max-lg:hover:border-[#1AA179]/40 max-lg:hover:shadow-lg lg:contents lg:rounded-none lg:bg-transparent lg:shadow-none">
              <div
                className={`flex h-16 sm:h-10 lg:h-[5.33em] w-16 sm:w-10 lg:w-[5.33em] shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white lg:absolute lg:mt-0 ${pillar.iconClass}`}
              >
                <Image
                  src={pillar.icon}
                  alt=""
                  aria-hidden
                  width={pillar.iconSize}
                  height={pillar.iconSize}
                  quality={100}
                  className="h-[88%] w-[88%] sm:h-[70%] lg:h-[68%] lg:w-[68%] object-contain"
                />
              </div>
              <div className={`lg:absolute lg:mt-0 ${pillar.frameClass}`}>
                <h3 className="font-archivo-black text-base text-neutral-800 lg:text-[1.5em] lg:leading-[1.56]">
                  {pillar.title}
                </h3>
                <p className="mt-0.5 text-xs leading-5 text-neutral-800 lg:mt-[0.33em] lg:text-[1em] lg:leading-[1.33]">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Copy + photograph */}
        <div className="order-1 lg:order-2 lg:w-[42.08em] lg:shrink-0">
          {/* Design widths ÷ own font-size: 390px/24 and 423px/14 */}
          <h2 className="font-archivo-black text-xl text-neutral-800 sm:text-2xl lg:w-[16.25em] lg:text-[2em] lg:leading-[1.33]">
            {heading}
          </h2>
          <p className="mt-2 text-sm text-neutral-800 lg:mt-[0.67em] lg:w-[30.21em] lg:text-[1.17em] lg:leading-[1.43]">
            {description}
          </p>
          <Image
            src={photoSrc}
            alt={photoAlt}
            width={534}
            height={330}
            quality={90}
            className="mt-4 w-full rounded-[1.25rem] object-cover lg:mt-[2em] lg:h-[27.42em] lg:w-[42.08em]"
          />
        </div>
      </div>
    </section>
  );
}
