import type { Metadata } from "next";
import MemberMessageHero from "@/components/board/MemberMessageHero";
import MessageBody from "@/components/board/MessageBody";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";
import { otherMembersFor } from "@/components/board/boardRoster";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Message from Mahamudul Hasan | ASG - Amanat Shah Group",
  description:
    "Mahamudul Hasan, Entrepreneur on the Board of Amanat Shah Group.",
};

const messageParagraphs = [
  "Mr. Mahamudul Hasan serves on the Board of Amanat Shah Group as an Entrepreneur.",
  "A full profile is being prepared and will be published here shortly.",
];

export default function MahamudulHasanPage() {
  return (
    <main>
      <ScrollProgress />
      <MemberMessageHero
        id="mahamudul-hasan-hero"
        name="Mahamudul Hasan"
        role="Entrepreneur"
        org="AMANAT SHAH GROUP"
        portrait={{
          src: "/images/board-of-directors/mahamudul-hasan.png",
          width: 7236,
          height: 9848,
        }}
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
      <div className="sm:mb-6">
        <OtherBoardMembers members={otherMembersFor("mahamudul-hasan")} />
      </div>
    </main>
  );
}
