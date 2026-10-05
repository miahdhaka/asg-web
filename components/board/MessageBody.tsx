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
      className="w-full bg-background px-4 sm:px-6 lg:px-[5em] py-10 sm:py-14 lg:py-[4em]"
    >
      <div className="mx-auto w-full max-w-full lg:w-[74.1em]">
        <h2 className="font-archivo-black font-medium text-xl sm:text-2xl lg:text-[2em] lg:leading-[1.33] text-neutral-800">
          {heading}
        </h2>

        {lead && (
          <p className="mt-2 lg:mt-[1em] text-xl lg:text-[1.5em] lg:leading-[1.56] text-neutral-800">
            {lead}
          </p>
        )}

        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="mt-4 lg:mt-[1.33em] text-base lg:text-[1.17em] lg:leading-[1.43] text-justify text-neutral-500 tracking-wider"
          >
            {paragraph}
          </p>
        ))}

        {/* Sign-off */}
        <div className="mt-5 lg:mt-[1.33em]">
          <p className="text-xl lg:text-[1.33em] lg:leading-[1.5] text-neutral-800 tracking-wide">
            Sincerely,
          </p>
          <p className="font-archivo-black mt-0.5 font-medium text-[22px] lg:text-[1.67em] lg:leading-[1.4] text-neutral-800">
            {signOff.name}
          </p>
          <p className="mt-1 text-base lg:text-[1.17em] lg:leading-[1.43] text-neutral-700 tracking-wider">
            {signOff.role}
          </p>
          <p className="mt-5 lg:mt-[1em] text-xl lg:text-[1.33em] lg:leading-[1.5] text-neutral-800 tracking-wider">
            {signOff.org}
          </p>
        </div>
      </div>
    </section>
  );
}
