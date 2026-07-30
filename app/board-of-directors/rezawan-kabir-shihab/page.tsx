import type { Metadata } from "next";
import MemberMessageHero from "@/components/board/MemberMessageHero";
import MessageBody from "@/components/board/MessageBody";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";
import { otherMembersFor } from "@/components/board/boardRoster";

export const metadata: Metadata = {
  title: "Message from the Director | ASG - Amanat Shah Group",
  description:
    "Message from Rezawan Kabir Shihab, Director of Amanat Shah Group — driving operational excellence through industrial engineering.",
};

const messageParagraphs = [
  "Mr. Rezawan Kabir Shihab serves as an Honorable Director of Amanat Shah Group, representing the next generation of leadership within the ASG family. He holds a BSc in Industrial & Production Engineering from a reputed public engineering university in the country.",
  "Having been mentored since childhood by his father\u2014a legendary veteran in the Bangladesh textile industry\u2014Mr. Rezawan is now dedicated to integrating his core potential and advanced industrial engineering knowledge into the group\u2019s operations. He is currently focused on leveraging his expertise to drive operational excellence, optimize production efficiencies, and propel Amanat Shah Group toward the next level of growth and industrial innovation.",
  "Mr. Rezawan Kabir Shihab resides in Dhaka, Bangladesh, where he continues to contribute to the strategic evolution of the Amanat Shah Group.",
];

export default function RezawanKabirShihabPage() {
  return (
    <main>
      <MemberMessageHero
        id="director-hero"
        name="Rezawan Kabir Shihab"
        role="Director"
        org="AMANAT SHAH GROUP"
        portrait={{
          src: "/images/board-of-directors/rezawan-kabir-shihab.png",
          width: 7236,
          height: 9848,
        }}
        /* Sized to fill the hero height at this portrait's aspect ratio, with
           the left edge aligned to the other detail pages */
        portraitClassName="lg:w-[31.37em] lg:right-[26.13em]"
      />
      <MessageBody
        id="director-full-message"
        heading="Message from the Director"
        paragraphs={messageParagraphs}
        signOff={{
          name: "Rezawan Kabir Shihab",
          role: "Director",
          org: "AMANAT SHAH GROUP",
        }}
      />
      <OtherBoardMembers members={otherMembersFor("rezawan-kabir-shihab")} />
    </main>
  );
}
