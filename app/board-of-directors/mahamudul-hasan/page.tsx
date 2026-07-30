import type { Metadata } from "next";
import MemberMessageHero from "@/components/board/MemberMessageHero";
import MessageBody from "@/components/board/MessageBody";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";
import { otherMembersFor } from "@/components/board/boardRoster";

export const metadata: Metadata = {
  title: "Message from Mahamudul Hasan | ASG - Amanat Shah Group",
  description:
    "Mahamudul Hasan, Entrepreneur on the Board of Amanat Shah Group.",
};

/* PLACEHOLDER COPY — the Figma file has no detail page for the entrepreneurs,
   only their name and role on the carousel cards. Replace both paragraphs with
   the member's approved biography before this page goes live. */
const messageParagraphs = [
  "Mr. Mahamudul Hasan serves on the Board of Amanat Shah Group as an Entrepreneur.",
  "A full profile is being prepared and will be published here shortly.",
];

export default function MahamudulHasanPage() {
  return (
    <main>
      <MemberMessageHero
        id="mahamudul-hasan-hero"
        name="Mahamudul Hasan"
        role="Entrepreneur"
        org="AMANAT SHAH GROUP"
        portrait={{
          src: "/images/board-of-directors/mahamudul-hasan.png",
          width: 7236,
          height: 9771,
        }}
        /* Sized to fill the hero height at this portrait's aspect ratio, with
           the left edge aligned to the other detail pages */
        portraitClassName="lg:w-[31.62em] lg:right-[25.88em]"
      />
      <MessageBody
        id="mahamudul-hasan-full-message"
        heading="Message from Mahamudul Hasan"
        paragraphs={messageParagraphs}
        signOff={{
          name: "Mahamudul Hasan",
          role: "Entrepreneur",
          org: "AMANAT SHAH GROUP",
        }}
      />
      <OtherBoardMembers members={otherMembersFor("mahamudul-hasan")} />
    </main>
  );
}
