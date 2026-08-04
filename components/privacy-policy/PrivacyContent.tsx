import Image from "next/image";
import {
  policySections,
  policyTitle,
  type PolicySection,
} from "./privacyPolicyData";

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-base font-medium leading-6 text-neutral-800">
      {children}
    </h2>
  );
}

function PolicySectionBlock({ section }: { section: PolicySection }) {
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

const socials = [
  { label: "LinkedIn", src: "/icons/privacy-policy/privacy-social-linkedin.svg" },
  { label: "Facebook", src: "/icons/privacy-policy/privacy-social-facebook.svg" },
  { label: "Instagram", src: "/icons/privacy-policy/privacy-social-instagram.svg" },
];

export default function PrivacyContent() {
  return (
    <section className="bg-white px-4 pt-[calc(var(--header-height)+3.75rem)] pb-[3.75rem] sm:px-8">
      {/* Centered 691px content column (375px inset on the 1440 design) */}
      <div className="mx-auto flex w-full max-w-[43.1875rem] flex-col gap-6">
        <h1 className="text-[2.25rem] leading-10 text-neutral-800 font-test-tiempos-fine">
          {policyTitle}
        </h1>

        <div className="flex flex-col gap-4">
          {policySections.map((section) => (
            <PolicySectionBlock key={section.heading} section={section} />
          ))}
        </div>

        {/* ── Divider + Contact Us ──────────────────────────────── */}
        <hr className="border-0 border-t border-gray-100" />

        <div className="flex flex-col gap-4">
          <h2 className="font-test-tiempos-fine text-2xl font-medium leading-8 text-neutral-800">
            Contact Us
          </h2>
          <p className="text-sm leading-5 text-neutral-600">
            If you have any questions about this Privacy Policy, you can contact us:
          </p>
          <p className="text-sm leading-5 text-neutral-600">
            By email:{" "}
            <a
              href="mailto:info@asg-bd.com"
              className="text-neutral-800 underline transition-colors hover:text-neutral-600"
            >
              info@asg-bd.com
            </a>
          </p>

          <div className="flex items-center gap-2.5">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src={social.src}
                  alt=""
                  width={28}
                  height={28}
                  quality={100}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
