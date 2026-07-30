import type { Metadata } from "next";
import MemberMessageHero from "@/components/board/MemberMessageHero";
import MessageBody from "@/components/board/MessageBody";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";
import { otherMembersFor } from "@/components/board/boardRoster";

export const metadata: Metadata = {
  title: "Message from Akm Azad | ASG - Amanat Shah Group",
  description:
    "Akm Azad, Entrepreneur on the Board of Amanat Shah Group.",
};

/* PLACEHOLDER COPY — the Figma file has no detail page for the entrepreneurs,
   only their name and role on the carousel cards. Replace both paragraphs with
   the member's approved biography before this page goes live. */
const messageParagraphs = [
  "Mr. Akm Azad serves on the Board of Amanat Shah Group as an Entrepreneur.",
  "A full profile is being prepared and will be published here shortly.",
];

export default function AkmAzadPage() {
  return (
    <main>
      <MemberMessageHero
        id="akm-azad-hero"
        name="Akm Azad"
        role="Entrepreneur"
        org="AMANAT SHAH GROUP"
        portrait={{
          src: "/images/board-of-directors/akm-azad.png",
          width: 7236,
          height: 9848,
        }}
        /* Sized to fill the hero height at this portrait's aspect ratio, with
           the left edge aligned to the other detail pages */
        portraitClassName="lg:w-[31.37em] lg:right-[26.13em]"
      />
      <MessageBody
        id="akm-azad-full-message"
        heading="Message from Akm Azad"
        paragraphs={messageParagraphs}
        signOff={{
          name: "Akm Azad",
          role: "Entrepreneur",
          org: "AMANAT SHAH GROUP",
        }}
      />
      <OtherBoardMembers members={otherMembersFor("akm-azad")} />
    </main>
  );
}
