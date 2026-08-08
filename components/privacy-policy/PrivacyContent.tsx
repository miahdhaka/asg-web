import Image from "next/image";
import {
  policySections,
  policyTitle,
  type PolicySection,
} from "./privacyPolicyData";

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-base lg:text-[1.4rem] font-medium text-neutral-800">
      {children}
    </h2>
  );
}

function PolicySectionBlock({ section }: { section: PolicySection }) {
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

const socials = [
  { label: "LinkedIn", src: "/icons/social-icon/linkedin.png", alt: "LinkedIn" },
  { label: "Facebook", src: "/icons/social-icon/facebook.png", alt: "Facebook" },
  { label: "Instagram", src: "/icons/social-icon/instagram.png", alt: "Instagram" },
];

export default function PrivacyContent() {
  return (
    <section className="mx-auto mt-[6rem] w-full max-w-[59rem] px-5 pt-[3.5rem] pb-16">
      <div className="flex flex-col gap-6">
        <h1 className="font-test-tiempos-fine text-2xl lg:text-[3rem] text-neutral-800">
          {policyTitle}
        </h1>

        <div className="flex flex-col gap-6">
          {policySections.map((section) => (
            <PolicySectionBlock key={section.heading} section={section} />
          ))}
        </div>

        {/* ── Divider + Contact Us ──────────────────────────────── */}
        <hr className="border-0 border-t border-gray-100" />

        <div className="flex flex-col gap-4">
          <h2 className="font-test-tiempos-fine text-2xl lg:text-[3rem] text-neutral-800">
            Contact Us
          </h2>
          <p className="text-justify text-sm lg:text-[1.1rem] leading-6.5 text-neutral-600">
            If you have any questions about this Privacy Policy, you can contact us:
          </p>
          <p className="text-justify text-sm lg:text-[1.1rem] leading-6.5 text-neutral-600">
            By email:{" "}
            <a
              href="mailto:info@asg-bd.com"
              className="text-neutral-800 underline transition-colors hover:text-neutral-600"
            >
              info@asg-bd.com
            </a>
          </p>

          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <button
                key={social.label}
                type="button"
                aria-label={`Share on ${social.label}`}
                className="group relative flex size-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors duration-500 ease-in-out hover:border-transparent before:absolute before:inset-0 before:rounded-full before:bg-[image:var(--primary-gradient)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-in-out hover:before:opacity-100"
              >
                <Image
                  src={social.src}
                  alt={social.alt}
                  width={20}
                  height={20}
                  quality={100}
                  className="relative z-10 size-5 object-contain brightness-0 transition-all duration-500 group-hover:invert"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
