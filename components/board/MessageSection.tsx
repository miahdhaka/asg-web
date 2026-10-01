import Image from "next/image";
import Link from "next/link";

export type MessageSectionProps = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: { src: string; width: number; height: number };
  /** Detail-page route for the "Read full bio" CTA */
  href?: string;
  /** Small uppercase org label under the divider (defaults to ASG) */
  orgLabel?: string;
  /** Divider color class between the role and org label. */
  dividerClass?: string;
  /** Optional CSS background painted over the panel image to tint a variant
   *  section. Layout stays identical; only the card background differs. */
  overlay?: string;
  /** Text color class for the left (name/role) and right (bio) content.
   *  Defaults to white; override for lighter variant backgrounds. */
  textClass?: string;
};

/**
 * Board message panel — based on the homepage "Legacy of Leadership" section
 * (LegacyOfLeadership.tsx) wrapper, panel background and portrait positioning,
 * with the header removed. Differences per spec: no section header, no quote
 * mark, no image hover/transition, and a left-aligned rounded-gradient "Read
 * full bio" button under the copy.
 */
export default function MessageSection({
  id,
  name,
  role,
  bio,
  image,
  href,
  orgLabel = "Amanat Shah Group",
  dividerClass = "bg-[#2B5349]",
  overlay,
  textClass = "text-white",
}: MessageSectionProps) {
  return (
    <section
      id={id}
      className="relative flex w-full flex-col overflow-hidden bg-[#F3F3F1] pt-16 pb-8"
    >
      <div className="flex flex-1 flex-col px-6 pb-4 md:px-12 lg:px-20">
        <div className="relative mt-28 min-h-[47rem] flex-1 md:min-h-[51rem] lg:mt-[7.125rem] lg:min-h-[36rem]">
          {/* Panel background */}
          <div className="absolute inset-0 overflow-hidden rounded-t-[2.5rem]">
            <div aria-hidden className="absolute inset-0">
              <Image
                src="/images/home-legacy/lagacy-bg.png"
                alt=""
                fill
                sizes="(min-width: 1024px) calc(100vw - 7.5rem), calc(100vw - 3rem)"
                className="object-cover"
                quality={90}
              />
            </div>
            {overlay && (
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: overlay }}
              />
            )}
          </div>

          {/* Portrait — same positioning as the legacy section. No hover. */}
          <div className="absolute -top-16 left-1/2 z-20 h-[32rem] w-[86%] max-w-[30rem] -translate-x-1/2 md:-top-20 md:h-[38rem] lg:top-auto lg:bottom-0 lg:left-[25.87%] lg:h-[44rem] lg:w-[38%] lg:max-w-[31rem] lg:translate-x-0">
            <Image
              src={image.src}
              alt={`${name}, ${role} of Amanat Shah Group`}
              fill
              sizes="(min-width: 1024px) 38vw, (min-width: 768px) 32rem, 86vw"
              className="origin-bottom object-contain object-bottom transition-none"
              quality={90}
            />
          </div>

          {/* Bottom mask — hides the transient portrait dip below the card. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-full z-[25] h-24 bg-[#F3F3F1]"
          />

          {/* Name / role / divider / org label — left */}
          <div className={`absolute inset-x-6 top-[18.75rem] z-30 md:inset-x-10 md:top-[23.5rem] lg:inset-x-auto lg:top-1/2 lg:left-[5rem] lg:-translate-y-1/2 lg:w-[18.375rem] ${textClass}`}>
            <h3 className="font-archivo-black text-3xl leading-[1.08] uppercase lg:text-[2rem]">
              {name}
            </h3>
            <p className="mt-6 text-base leading-6 lg:text-[1.25rem]">{role}</p>
            <div className={`my-6 h-px w-full ${dividerClass}`} />
            <p className="font-archivo-black text-base leading-5 uppercase lg:text-[1.1rem]">
              {orgLabel}
            </p>
          </div>

          {/* Bio + CTA — right, left-aligned */}
          <div className={`absolute inset-x-6 bottom-10 z-30 flex flex-col gap-8 text-left md:inset-x-10 lg:inset-x-auto lg:right-[5rem] lg:top-1/2 lg:bottom-auto lg:w-[36rem] lg:-translate-y-1/2 lg:gap-[2.5rem] ${textClass}`}>
            <p className="text-xl leading-7 lg:text-[1.7rem] lg:leading-9">
              {bio}
            </p>
            {href && (
              <Link
                href={href}
                className="group relative inline-flex w-fit shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full px-[1.5em] py-[0.9em] text-[0.9rem] font-medium leading-none lg:text-[1.1rem]"
              >
                {/* 1px gradient ring with a transparent interior — a masked
                    border-box layer, so the card background shows through
                    (unlike the padding-box fill used on light sections). */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    padding: "1px",
                    background: "var(--primary-gradient)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                  }}
                />
                {/* Invisible spacer — preserves the button's intrinsic size */}
                <span className="invisible whitespace-nowrap">Read full bio</span>

                {/* Default: gradient text — slides down and out on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:translate-y-full"
                >
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "var(--primary-gradient)" }}
                  >
                    Read full bio
                  </span>
                </span>

                {/* Hover: gradient fill + white text — slides in from the top */}
                <span
                  aria-hidden
                  className="absolute inset-0 flex -translate-y-full items-center justify-center whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0"
                  style={{ background: "var(--primary-gradient)" }}
                >
                  Read full bio
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
