import Image from "next/image";
import { termsSections, termsTitle, type TermsSection } from "./termsData";

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-base font-medium leading-6 text-neutral-800">
      {children}
    </h2>
  );
}

function TermsSectionBlock({ section }: { section: TermsSection }) {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeading>{section.heading}</SectionHeading>

      {section.kind === "paragraphs" &&
        section.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="text-justify text-sm leading-5 text-neutral-600"
          >
            {paragraph}
          </p>
        ))}

      {section.kind === "numbered" &&
        section.clauses.map((clause) => (
          <p
            key={clause.lead}
            className="text-justify text-sm leading-5 text-neutral-600"
          >
            <span className="font-medium text-neutral-800">{clause.lead}</span>
            <br />
            {clause.body}
          </p>
        ))}

      {section.kind === "bullets" &&
        section.bullets.map((bullet, index) => (
          <div key={bullet.slice(0, 40) + index} className="flex items-center gap-[0.6875rem]">
            <Image
              src="/icons/terms-of-use/bullet-arrow.svg"
              alt=""
              width={14}
              height={14}
              className="size-3.5 shrink-0"
            />
            <p className="text-sm leading-5 text-neutral-800">{bullet}</p>
          </div>
        ))}
    </section>
  );
}

export default function TermsContent() {
  return (
    <section className="bg-white px-4 pt-[calc(var(--header-height)+3.75rem)] pb-[3.75rem] sm:px-8">
      {/* Centered 691px content column (375px inset on the 1440 design) */}
      <div className="mx-auto flex w-full max-w-[43.1875rem] flex-col gap-6">
        <h1 className="text-[2.25rem] leading-10 text-neutral-800 font-test-tiempos-fine">
          {termsTitle}
        </h1>

        <div className="flex flex-col gap-4">
          {termsSections.map((section) => (
            <TermsSectionBlock key={section.heading} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}
