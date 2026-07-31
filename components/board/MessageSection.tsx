import Image from "next/image";
import Link from "next/link";

export type MessageSectionProps = {
  id: string;
  /** Eyebrow-style heading lines, rendered stacked (e.g. ["MESSAGE FROM THE", "CHAIRMAN_"]) */
  headingLines: string[];
  name: string;
  role: string;
  bio: string;
  image: { src: string; width: number; height: number };
  /** "light" = white bg, photo left; "dark" = primary-black bg, photo right */
  variant: "light" | "dark";
  /** Detail-page route for the CTA — renders a Link instead of a button */
  href?: string;
};

export default function MessageSection({
  id,
  headingLines,
  name,
  role,
  bio,
  image,
  variant,
  href,
}: MessageSectionProps) {
  const dark = variant === "dark";

  return (
    <section 
      id={id} 
      className={`w-full px-4 sm:px-6 lg:px-[5em] py-10 sm:py-12 lg:py-[5em] ${
        dark ? "bg-[var(--primary-black)]" : "bg-white"
      }`}
    >
      {/* Section heading */}
      <h2
        className={` tracking-wide text-xl sm:text-3xl lg:text-[2.5rem] sm:leading-[1.3] lg:leading-[1.2] font-test-tiempos-fine ${
          dark ? "text-white" : "text-neutral-800"
        }`}
      >
        {headingLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <div
        className={`flex flex-col gap-8 lg:gap-[4.7em] w-[85%] mx-auto mt-8 lg:mt-[3em] lg:items-start ${
          dark ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Portrait */}
        <Image
          src={image.src}
          alt={`${name} — ${role}`}
          width={image.width}
          height={image.height}
          quality={90}
          className={`w-full lg:w-[44.2em] h-auto max-w-[28rem] lg:max-w-none bg-gray-100 shrink-0 mx-auto lg:mx-0 ${
            dark ? "" : ""
          }`}
        />

        {/* Quote / name / role / divider / bio / cta */}
        <div className="flex-1 lg:pt-[5.5em]">
          <Image
            src={
              dark
                ? "/images/board-of-directors/dark-qoutes.png"
                : "/images/board-of-directors/light-qoutes.png"
            }
            alt=""
            aria-hidden
             width={168}
            height={168}
            quality={100}
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[3.5em] lg:h-[3.5em]"
          />
          <h3
            className={`mt-4 font-test-tiempos-fine text-2xl sm:text-3xl lg:text-[2.6em] ${
              dark ? "text-white" : "text-neutral-900"
            }`}
          >
            {name}
          </h3>
          <p
            className={`mt-1 text-sm md:text-base lg:text-[1.25em] tracking-wide ${
              dark ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            {role}
          </p>
          <div
            aria-hidden
            className={`mt-4 lg:mt-[1em] border-b ${
              dark ? "border-neutral-700" : "border-neutral-200"
            }`}
          />
          <p
            className={`mt-5 lg:mt-[1.8em] text-sm sm:text-base lg:text-[1.15em] tracking-wide ${
              dark ? "text-neutral-400" : "text-neutral-700"
            }`}
          >
            {bio}
          </p>
          {href ? (
            <Link
              href={href}
              data-label="Read full bio"
              className="primary-btn-flip-gradient inline-block cursor-pointer text-base lg:text-lg px-8 py-4 lg:px-9 lg:py-4.5 mt-8 lg:mt-[2em]"
            >
              Read full bio
            </Link>
          ) : (
            <button
              type="button"
              data-label="Read full bio"
              className="primary-btn-flip-gradient cursor-pointer text-base lg:text-lg px-8 py-4 lg:px-9 lg:py-4.5 mt-8 lg:mt-[2em]"
            >
              Read full bio
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
