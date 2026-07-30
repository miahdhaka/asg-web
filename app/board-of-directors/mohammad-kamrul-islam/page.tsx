import type { Metadata } from "next";
import MemberMessageHero from "@/components/board/MemberMessageHero";
import MessageBody from "@/components/board/MessageBody";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";
import { otherMembersFor } from "@/components/board/boardRoster";

export const metadata: Metadata = {
  title: "Message from Mohammad Kamrul Islam | ASG - Amanat Shah Group",
  description:
    "Mohammad Kamrul Islam, Entrepreneur on the Board of Amanat Shah Group.",
};

/* PLACEHOLDER COPY — the Figma file has no detail page for the entrepreneurs,
   only their name and role on the carousel cards. Replace both paragraphs with
   the member's approved biography before this page goes live. */
const messageParagraphs = [
  "Mr. Mohammad Kamrul Islam serves on the Board of Amanat Shah Group as an Entrepreneur.",
  "A full profile is being prepared and will be published here shortly.",
];

export default function MohammadKamrulIslamPage() {
  return (
    <main>
      <MemberMessageHero
        id="mohammad-kamrul-islam-hero"
        name="Mohammad Kamrul Islam"
        role="Entrepreneur"
        org="AMANAT SHAH GROUP"
        portrait={{
          src: "/images/board-of-directors/mohammad-kamrul-islam.png",
          width: 7236,
          height: 9771,
        }}
        /* Sized to fill the hero height at this portrait's aspect ratio, with
           the left edge aligned to the other detail pages */
        portraitClassName="lg:w-[31.62em] lg:right-[25.88em]"
      />
      <MessageBody
        id="mohammad-kamrul-islam-full-message"
        heading="Message from Mohammad Kamrul Islam"
        paragraphs={messageParagraphs}
        signOff={{
          name: "Mohammad Kamrul Islam",
          role: "Entrepreneur",
          org: "AMANAT SHAH GROUP",
        }}
      />
      <OtherBoardMembers members={otherMembersFor("mohammad-kamrul-islam")} />
    </main>
  );
}
