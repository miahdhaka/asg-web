import type { Metadata } from "next";
import MemberMessageHero from "@/components/board/MemberMessageHero";
import MessageBody from "@/components/board/MessageBody";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";
import { otherMembersFor } from "@/components/board/boardRoster";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Message from Akm Azad | ASG - Amanat Shah Group",
  description:
    "Akm Azad, Entrepreneur on the Board of Amanat Shah Group.",
};

const messageParagraphs = [
  "Mr. Akm Azad serves on the Board of Amanat Shah Group as an Entrepreneur.",
  "A full profile is being prepared and will be published here shortly.",
];

export default function AkmAzadPage() {
  return (
    <main>
      <ScrollProgress />
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
      <div className="sm:mb-6">
        <OtherBoardMembers members={otherMembersFor("akm-azad")} />
      </div>
    </main>
  );
}
