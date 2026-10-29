import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  policyIntro,
  policySections,
  policyTitle,
  policyUpdated,
  type PolicyBlock,
  type PolicySection,
} from "./privacyPolicyData";

// Parses the lightweight inline markup used in privacyPolicyData:
//   **bold**        -> bold emphasis
//   [Label](/href)  -> internal link
function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    if (match[1] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-neutral-800">
          {match[1]}
        </strong>,
      );
    } else {
      nodes.push(
        <Link
          key={key++}
          href={match[3]}
          className="cursor-pointer bg-clip-text font-medium text-transparent underline decoration-[#1AA179] underline-offset-2 [background-image:var(--primary-gradient)] transition-opacity duration-200 hover:opacity-80"
        >
          {match[2]}
        </Link>,
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function BulletIcon() {
  return (
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
  );
}

function BlockRender({ block }: { block: PolicyBlock }) {
  if (block.type === "p") {
    return (
      <p className="text-justify text-sm lg:text-[1.1rem] leading-6.5 text-neutral-600">
        {parseInline(block.text)}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {block.items.map((item, index) => (
        <li
          key={index}
          className={`flex items-center gap-[0.6875rem] ${item.sub ? "ml-5 sm:ml-8" : ""}`}
        >
          <BulletIcon />
          <p className="text-justify text-sm lg:text-[1.1rem] leading-6.5 text-neutral-600">
            {parseInline(item.text)}
          </p>
        </li>
      ))}
    </ul>
  );
}

function PolicySectionBlock({ section }: { section: PolicySection }) {
  return (
    <section className="flex flex-col gap-2.5 rv">
      <h2 className="text-base lg:text-[1.4rem] font-medium text-neutral-800">
        {section.heading}
      </h2>

      {section.blocks.map((block, index) => (
        <BlockRender key={index} block={block} />
      ))}
    </section>
  );
}

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/amanatshahgroup/", src: "/icons/social-icon/linkedin.png", alt: "LinkedIn" },
  { label: "Facebook", href: "https://www.facebook.com/AmanatShahGroup.ASG", src: "/icons/social-icon/facebook.png", alt: "Facebook" },
  { label: "Instagram", href: "https://www.instagram.com/amanatshahgroup/", src: "/icons/social-icon/instagram.png", alt: "Instagram" },
];

export default function PrivacyContent() {
  return (
    <section className="mx-auto mt-[3rem] sm:mt-[7rem] w-full max-w-[59rem] px-5 pt-[3.5rem] pb-16">
      <div className="flex flex-col gap-5 sm:gap-7">
        <div className="flex flex-col gap-3">
          <h1 className="font-archivo-black text-[26px] lg:text-[3rem] text-neutral-800 rv-split">
            {policyTitle}
          </h1>
          <p className="text-sm lg:text-[1.05rem] font-medium text-neutral-500">
            {policyUpdated}
          </p>
        </div>

        {policyIntro.map((paragraph, index) => (
          <p
            key={index}
            className="rv text-justify text-sm lg:text-[1.1rem] leading-6.5 text-neutral-600"
          >
            {parseInline(paragraph)}
          </p>
        ))}

        <div className="flex flex-col gap-6">
          {policySections.map((section) => (
            <PolicySectionBlock key={section.heading} section={section} />
          ))}
        </div>

        {/* ── Divider + Contact Us ──────────────────────────────── */}
        <hr className="border-0 border-t border-gray-100" />

        <div className="flex flex-col gap-4">
          <h2 className="font-archivo-black text-2xl lg:text-[2rem] text-neutral-800 rv-split">
            Contact Us
          </h2>
          <p className="rv text-justify text-sm lg:text-[1.1rem] leading-5 sm:leading-6.5 text-neutral-600">
            {parseInline(
              "For questions about this policy, or to request your personal information, please use our [Contact Us](/contact-us) page or the details below.",
            )}
          </p>
          <p className="rv text-sm lg:text-[1.1rem] font-semibold text-neutral-800">
            Amanat Shah Group (ASG)
          </p>
          <ul className="flex flex-col gap-2.5 rv">
            <li className="flex items-center gap-[0.6875rem]">
              <BulletIcon />
              <p className="text-justify text-sm lg:text-[1.1rem] leading-5 sm:leading-6.5 text-neutral-600">
                <strong className="font-semibold text-neutral-800">Email:</strong>{" "}
                <a
                  href="mailto:info@asg-bd.com"
                  className="text-neutral-800 underline transition-colors hover:text-neutral-600 tracking-wider"
                >
                  info@asg-bd.com
                </a>
              </p>
            </li>
            <li className="flex items-center gap-[0.6875rem]">
              <BulletIcon />
              <p className="text-justify text-sm lg:text-[1.1rem] leading-5 sm:leading-6.5 text-neutral-600">
                <strong className="font-semibold text-neutral-800">Postal address:</strong>
              </p>
            </li>
            <li className="ml-5 sm:ml-8 flex items-center gap-[0.6875rem]">
              <BulletIcon />
              <p className="text-justify text-sm lg:text-[1.1rem] leading-5 sm:leading-6.5 text-neutral-600">
                Head Office: House-232, Lane-03, DOHS, Baridhara, Dhaka-1206, Bangladesh
              </p>
            </li>
            <li className="ml-5 sm:ml-8 flex items-center gap-[0.6875rem]">
              <BulletIcon />
              <p className="text-justify text-sm lg:text-[1.1rem] leading-5 sm:leading-6.5 text-neutral-600">
                Corporate Office: City Center (level-24), 90/1 Motijheel C/A, Dhaka-1000, Bangladesh.
              </p>
            </li>
          </ul>
          <p className="rv text-justify text-sm lg:text-[1.1rem] leading-5 sm:leading-6.5 text-neutral-600">
            {parseInline(
              "To learn more about the group, visit [About ASG](/about-us).",
            )}
          </p>

          <div className="flex items-center gap-3 rv">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${social.label}`}
                className="group relative flex size-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors duration-500 ease-in-out hover:border-transparent before:absolute before:inset-0 before:rounded-full before:bg-[image:var(--primary-gradient)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-in-out hover:before:opacity-100 border border-gray-200 p-1.5"
              >
                <Image
                  src={social.src}
                  alt={social.alt}
                  width={20}
                  height={20}
                  quality={100}
                  className="relative z-10 size-5 object-contain brightness-0 transition-all duration-500 group-hover:invert"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
