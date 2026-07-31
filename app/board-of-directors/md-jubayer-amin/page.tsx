import type { Metadata } from "next";
import MemberMessageHero from "@/components/board/MemberMessageHero";
import MessageBody from "@/components/board/MessageBody";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";
import { otherMembersFor } from "@/components/board/boardRoster";

export const metadata: Metadata = {
  title: "Message from the Miah Director | ASG - Amanat Shah Group",
  description:
    "Message from Md. Jubayer Amin, Director (Miah) of Amanat Shah Group — leading digital transformation and modern retail ventures.",
};

const messageParagraphs = [
  "Miah Md. Jubayer Amin is an Honorable Director of Amanat Shah Group and represents the vibrant young leadership within the ASG family. Currently completing his BSc in Computer Science and Engineering (CSE) from a reputed university in the country, he brings a modern, tech-driven perspective to the group.",
  "Having grown up observing the intricacies of the family business under the mentorship of his father\u2014a legendary veteran in the Bangladesh textile industry\u2014Mr. Jubayer is now dedicated to integrating his core potential and software expertise into the group\u2019s operations. He is focused on spearheading the company\u2019s digital transformation, brand positioning, and the expansion of modern retail and e-commerce initiatives, leading Amanat Shah Group toward its next generation of ventures.",
  "Mr. Miah Md. Jubayer Amin resides in Dhaka, Bangladesh, where he continues to lead the technological and strategic evolution of the Amanat Shah Group.",
];

export default function MdJubayerAminPage() {
  return (
    <main>
      <MemberMessageHero
        id="miah-director-hero"
        name="Md. Jubayer Amin"
        role="Director (Miah)"
        org="AMANAT SHAH GROUP"
        portrait={{
          src: "/images/board-of-directors/md-jubayer-amin.png",
          width: 7236,
          height: 9848,
        }}
        /* Sized to fill the hero height at this portrait's aspect ratio, with
           the left edge aligned to the other detail pages */
        portraitClassName="lg:w-[31.37em] lg:right-[26.13em]"
      />
      <MessageBody
        id="miah-director-full-message"
        heading="Message from the Miah Director"
        paragraphs={messageParagraphs}
        signOff={{
          name: "Md. Jubayer Amin",
          role: "Director (Miah)",
          org: "AMANAT SHAH GROUP",
        }}
      />
      <OtherBoardMembers members={otherMembersFor("md-jubayer-amin")} />
    </main>
  );
}
