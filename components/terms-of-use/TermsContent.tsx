import Image from "next/image";
import { termsSections, termsTitle, type TermsSection } from "./termsData";

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-base lg:text-[1.4rem] font-medium text-neutral-800">
      {children}
    </h2>
  );
}

function TermsSectionBlock({ section }: { section: TermsSection }) {
  return (
    <section className="flex flex-col gap-2.5">
      <SectionHeading>{section.heading}</SectionHeading>

      {section.kind === "paragraphs" &&
        section.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="text-justify text-sm lg:text-[1.1rem] leading-6.5 text-neutral-600"
          >
            {paragraph}
          </p>
        ))}

      {section.kind === "numbered" &&
        section.clauses.map((clause) => (
          <p
            key={clause.lead}
            className="text-justify text-sm lg:text-[1.1rem] leading-6.5 text-neutral-600"
          >
            <span className="font-medium text-neutral-800">{clause.lead}</span>
            <br />
            {clause.body}
          </p>
        ))}

      {section.kind === "bullets" &&
        section.bullets.map((bullet, index) => (
          <div key={bullet.slice(0, 40) + index} className="flex items-center gap-[0.6875rem]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="mt-[0.1875rem] shrink-0"
            >
              <path
                d="M2.91797 7H11.0846"
                stroke="#525252"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 2.91602L11.0833 6.99935L7 11.0827"
                stroke="#525252"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-justify text-sm lg:text-[1.1rem] leading-6.5 text-neutral-600">{bullet}</p>
          </div>
        ))}
    </section>
  );
}

export default function TermsContent() {
  return (
    <section className="mx-auto mt-[6rem] w-full max-w-[59rem] px-5 pt-[3.5rem] pb-16">
      <div className="flex flex-col gap-6">
        <h1 className="font-test-tiempos-fine text-2xl lg:text-[3rem] text-neutral-800">
          {termsTitle}
        </h1>

        <div className="flex flex-col gap-6">
          {termsSections.map((section) => (
            <TermsSectionBlock key={section.heading} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}
