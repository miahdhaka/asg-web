import type { Metadata } from "next";
import MemberMessageHero from "@/components/board/MemberMessageHero";
import MessageBody from "@/components/board/MessageBody";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";
import { otherMembersFor } from "@/components/board/boardRoster";

export const metadata: Metadata = {
  title: "Message from the Managing Director | ASG - Amanat Shah Group",
  description:
    "Message from Rezaul Karim, Managing Director of Amanat Shah Group — innovation rooted in tradition, excellence driven by passion.",
};

const messageParagraphs = [
  "As you may know, our mission is to build a sustainable culture of global expertise. A place where experts take the lead in creating a prosperous future for everyone. A place where collaborative investment with innovation leads generation after generation through passion.",
  "Throughout the 130-year journey, we’ve learned that successful business relationships are built on trust. Built on shared values and a commitment to growing together.",
  "Our family and people have made this journey possible across generations.",
  "Over 130 years, our family-business heritage has extended from traditional clothing into a diversified business group. Upscaling manufacturing expertise with modern integrated industrial infrastructure.",
  "We understand it’s all built on trust, quality, consistency, timely delivery and reliable communication with our clients.",
  "It’s a real pleasure to watch partners grow their businesses, strengthen legacy and deliver lasting value to their customers through our expertise.",
  "That’s why we focus on understanding your needs first. Build partnerships that support your long-term success. Our strength lies in our people's passion, expertise, dedication and commitment to continuous improvement to raise ASG to its pinnacle standard.",
  "ASG remains committed to responsible growth, sustainable development and contributing to Bangladesh’s progress socially and economically and serving global markets with care. By combining research, experience and forward-thinking leadership, we continue to expand our capabilities and adapt to a changing world.",
  "Thank you to everyone for believing in us, and to those considering a partnership with ASG. We welcome the opportunity to build a lasting transformation together. Let's walk side-by-side, claim new possibilities, create meaningful change and shape a better future for generations to come."
];

export default function ManagingDirectorMessagePage() {
  return (
    <main>
      <MemberMessageHero
        id="managing-director-hero"
        name="Rezaul Karim"
        role="Managing Director"
        org="AMANAT SHAH GROUP"
        portrait={{
          src: "/images/board-of-directors/managing-director.webp",
          width: 1956,
          height: 2200,
        }}
        /* Sized to fill the hero height at this portrait's aspect ratio, with
           the left edge aligned to the other detail pages */
        portraitClassName="lg:w-[37.96em] lg:right-[19.54em]"
      />
      <MessageBody
        id="managing-director-full-message"
        heading="Message from the Managing Director"
        lead="Dear Valued Partners, Well-Wishers and Our People,"
        paragraphs={messageParagraphs}
        signOff={{
          name: "Rezaul Karim",
          role: "Managing Director",
          org: "AMANAT SHAH GROUP",
        }}
      />
      <OtherBoardMembers members={otherMembersFor("managing-director")} />
    </main>
  );
}
