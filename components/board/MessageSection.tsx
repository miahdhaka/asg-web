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
  /** Custom panel background image src. Replaces the default lagacy-bg.webp. */
  bgImage?: string;
  /** Mobile-only panel background (below lg). When set, `bgImage`/default is
   *  shown only at lg and above. */
  mobileBgImage?: string;
  /** Text color class for the left (name/role) and right (bio) content.
   *  Defaults to white; override for lighter variant backgrounds. */
  textClass?: string;
  /** Tighten the top spacing so this panel sits closer to the section above.
   *  Used for stacked message sections; the first one keeps the full offset. */
  reduceTopGap?: boolean;
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
  bgImage,
  mobileBgImage,
  textClass = "text-white",
  reduceTopGap = false,
}: MessageSectionProps) {
  return (
    <section
      id={id}
      className={`relative flex w-full flex-col ${
        reduceTopGap ? "pt-0" : "pt-16"
      } pb-0 sm:pb-8`}
    >
      <div className="flex flex-1 flex-col px-4 sm:px-6 pb-4 md:px-12 lg:px-20">
        <div
          className={`relative pt-[23rem] md:pt-[32rem] lg:h-[33rem] lg:min-h-0 ${
            reduceTopGap ? "mt-24 lg:mt-[10rem]" : "mt-10 lg:mt-[6rem]"
          }`}
          data-rv-scope
        >
          {/* Panel background */}
          <div className="absolute inset-y-0 -left-6 -right-6 overflow-hidden rounded-t-[4rem] sm:rounded-t-[2rem] lg:inset-0">
            <div aria-hidden className="absolute inset-0">
              {mobileBgImage && (
                <Image
                  src={mobileBgImage}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover lg:hidden"
                  quality={90}
                />
              )}
              <Image
                src={bgImage || "/images/home-legacy/lagacy-bg.webp"}
                alt=""
                fill
                sizes="(min-width: 1024px) calc(100vw - 7.5rem), calc(100vw - 3rem)"
                className={`object-cover${mobileBgImage ? " hidden lg:block" : ""}`}
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

          {/* Portrait — same positioning as the legacy section. No hover.
              The img itself carries `.rv-lift` (slow rise from below): the
              wrapper owns the mobile `-translate-x-1/2`, and GSAP writes an
              inline transform, so animating the wrapper would knock the
              portrait out of its horizontal centering.
              Below lg the picture is drawn with `object-cover`: these PNGs are
              landscape canvases with wide transparent margins, so `contain`
              spent most of the box on empty space and the member looked small.
              Cover crops the margins and scales the figure off the box height.
              The `-top` offset and the container's `pt` stay in step (box
              bottom = -top + h = 23rem), so the copy still starts exactly
              where the figure ends: shrinking the figure only pulls the head
              back down, it never moves the text. */}
          <div className="absolute -top-[4.2rem] left-1/2 z-20 h-[27.2rem] w-[103%] max-w-[58rem] -translate-x-1/2 md:-top-[26rem] md:h-[58rem] md:w-[92%] lg:top-auto lg:bottom-0 lg:left-[17%] lg:h-[52rem] lg:w-[54%] lg:max-w-[52rem] lg:translate-x-0">
            <Image
              src={image.src}
              alt={`${name}, ${role} of Amanat Shah Group`}
              fill
              sizes="(min-width: 1024px) 52rem, (min-width: 768px) 58rem, 103vw"
              className="rv-lift origin-bottom object-contain object-bottom max-lg:object-cover transition-none"
              data-delay="0.15"
              quality={90}
            />
          </div>

          {/* Bottom mask — hides the transient portrait dip below the card. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-full z-[25] hidden h-24 bg-[#F3F3F1] lg:block"
          />

          {/* Name / role / divider / org label — left */}
          <div className={`relative z-30 border-t border-current/20 px-0 sm:px-6 pt-6 md:px-10 lg:absolute lg:inset-x-auto lg:top-1/2 lg:left-[5rem] lg:border-t-0 lg:px-0 lg:pt-0 lg:-translate-y-1/2 lg:w-[18.375rem] ${textClass}`}>
            <h3 className="font-archivo-black text-2xl sm:text-3xl leading-[1.08] uppercase lg:text-[2rem] rv-split">{name}</h3>
            <div className="rv">
              <p className="mt-2 sm:mt-4 sm:mt-6 leading-6 text-lg sm:text-[1.25rem]">{role}</p>
              <p className="mt-4 block sm:hidden font-archivo-black text-base leading-5 uppercase lg:text-[1.1rem] mb-5">
                {orgLabel}
              </p>
              <div className="my-4 sm:my-6 h-px w-full bg-current/20" style={{ maskImage: 'linear-gradient(to right, black 75%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 75%, transparent 100%)' }} />
              <p className="hidden sm:block font-archivo-black text-base leading-5 uppercase lg:text-[1.1rem]">
                {orgLabel}
              </p>
            </div>
          </div>

          {/* Bio + CTA — right, left-aligned */}
          <div className={`relative z-30 mt-5 sm:mt-8 flex flex-col gap-8 px-0 sm:px-6 text-left md:px-10 lg:absolute lg:inset-x-auto lg:right-[5rem] lg:top-1/2 lg:bottom-auto lg:mt-0 lg:px-0 lg:w-[36rem] lg:-translate-y-1/2 lg:gap-[2.5rem] pb-[2rem] sm:pb-0 ${textClass}`}>
            <div className="rv">
              <p className="text-base sm:text-xl leading-6 lg:text-[1.7rem] lg:leading-9 tracking-wider">
                {bio}
              </p>
            </div>
            {href && (
              <div className="rv">
              <Link
                href={href}
                className="group relative inline-flex w-fit shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full px-[1.5em] py-[0.9em] text-[1.05rem] font-medium leading-none lg:text-[1.1rem]"
              >
                {/* Gradient ring with a transparent interior — a masked
                    border-box layer, so the card background shows through
                    (unlike the padding-box fill used on light sections). */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    padding: "2px",
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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
