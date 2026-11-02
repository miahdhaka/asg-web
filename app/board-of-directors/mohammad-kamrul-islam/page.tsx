import type { Metadata } from "next";
import MemberMessageHero from "@/components/board/MemberMessageHero";
import MessageBody from "@/components/board/MessageBody";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";
import { otherMembersFor } from "@/components/board/boardRoster";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Message from Mohammad Kamrul Islam | ASG - Amanat Shah Group",
  description:
    "Mohammad Kamrul Islam, Entrepreneur on the Board of Amanat Shah Group.",
};

const messageParagraphs = [
  "Mr. Mohammad Kamrul Islam serves on the Board of Amanat Shah Group as an Entrepreneur.",
  "A full profile is being prepared and will be published here shortly.",
];

export default function MohammadKamrulIslamPage() {
  return (
    <main>
      <ScrollProgress />
      <MemberMessageHero
        id="mohammad-kamrul-islam-hero"
        name="Mohammad Kamrul Islam"
        role="Entrepreneur"
        org="AMANAT SHAH GROUP"
        portrait={{
          src: "/images/board-of-directors/mohammad-kamrul-islam.png",
          width: 7236,
          height: 9848,
        }}
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
      <div className="sm:mb-6">
        <OtherBoardMembers members={otherMembersFor("mohammad-kamrul-islam")} />
      </div>
    </main>
  );
}
