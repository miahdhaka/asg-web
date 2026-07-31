export type MessageBodyProps = {
  id: string;
  heading: string;
  /** Short bold-ish opening line rendered above the paragraphs — the
      Director detail pages omit it and start straight at the body copy */
  lead?: string;
  paragraphs: string[];
  signOff: { name: string; role: string; org: string };
};

/**
 * Centered long-form message column for a board-member detail page —
 * heading, lead line, justified paragraphs and a sign-off block, closed
 * by a full-width divider (Figma: Chairman details page, node 865-2204).
 */
export default function MessageBody({
  id,
  heading,
  lead,
  paragraphs,
  signOff,
}: MessageBodyProps) {
  return (
    <section
      id={id}
      className="w-full bg-white px-4 sm:px-6 lg:px-[5em] pt-10 sm:pt-12 lg:pt-[5em]"
    >
      <div className="mx-auto w-full max-w-full lg:w-[64.1em]">
        <h2 className="font-test-tiempos-fine font-medium text-xl sm:text-2xl lg:text-[2em] lg:leading-[1.33] text-neutral-800">
          {heading}
        </h2>

        {lead && (
          <p className="mt-4 lg:mt-[1em] text-base sm:text-lg lg:text-[1.5em] lg:leading-[1.56] text-neutral-800">
            {lead}
          </p>
        )}

        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="mt-4 lg:mt-[1.33em] text-sm sm:text-base lg:text-[1.17em] lg:leading-[1.43] text-justify text-neutral-700"
          >
            {paragraph}
          </p>
        ))}

        {/* Sign-off */}
        <div className="mt-4 lg:mt-[1.33em]">
          <p className="text-sm sm:text-base lg:text-[1.33em] lg:leading-[1.5] text-neutral-800">
            Sincerely,
          </p>
          <p className="mt-0.5 font-medium text-base sm:text-lg lg:text-[1.67em] lg:leading-[1.4] text-neutral-800">
            {signOff.name}
          </p>
          <p className="text-sm lg:text-[1.17em] lg:leading-[1.43] text-neutral-700">
            {signOff.role}
          </p>
          <p className="mt-3 lg:mt-[1em] text-sm sm:text-base lg:text-[1.33em] lg:leading-[1.5] text-neutral-800">
            {signOff.org}
          </p>
        </div>
      </div>

      {/* Closing divider — spans the full content width */}
      <div aria-hidden className="mt-8 lg:mt-[2.67em] border-b border-neutral-200" />
    </section>
  );
}
