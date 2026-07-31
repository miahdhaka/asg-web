import type { Metadata } from "next";
import BoardHero from "@/components/board/BoardHero";
import MessageSection from "@/components/board/MessageSection";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";

export const metadata: Metadata = {
  title: "Board of Directors | ASG - Amanat Shah Group",
  description:
    "Meet the board of directors leading Amanat Shah Group's strategic vision and operational excellence.",
};

const chairmanBio =
  "Mohammad Helal Miah, born in 1930, has been Chairman of Amanat Shah Group (ASG) since 31 January 2024. Coming from a family business legacy, he began his journey with an emblematic retail shop and gradually extended his vision to cover the entire value-chain to retain the quality of products, establishing the names Standard and Amanat Shah as trusted brands. With the passage of time, he brought Spinning, Weaving, Knitting, Processing, Dyeing, Printing, Finishing, and Knit-Garments units under his dexterous convoy, collectively forming the Amanat Shah Group (ASG).";

const managingDirectorBio =
  'Rezaul Karim serves as the Managing Director of Amanat Shah Group (ASG), spearheading the group\u2019s strategic vision and operational excellence. Carrying forward a rich family legacy, he is committed to integrating modern management practices with the group\u2019s foundational values of craftsmanship and quality. Under his leadership, ASG continues to expand its footprint across textiles, diversified industrial sectors, and innovative new ventures, ensuring that the legacy of "Standard" and "Amanat Shah" remains a symbol of trust and excellence in the global market.';

export default function BoardOfDirectorsPage() {
  return (
    <main>
      <BoardHero />
      <MessageSection
        id="chairman-message"
        variant="light"
        headingLines={["MESSAGE FROM THE", "CHAIRMAN_"]}
        name="Mohammad Helal Miah"
        role="Chairman"
        bio={chairmanBio}
        href="/board-of-directors/chairman"
        image={{
          src: "/images/board-of-directors/chairman.png",
          width: 530,
          height: 530,
        }}
      />
      <MessageSection
        id="managing-director-message"
        variant="dark"
        headingLines={["MESSAGE FROM THE", "MANAGING DIRECTOR_"]}
        name="Rezaul Karim"
        role="Managing Director"
        bio={managingDirectorBio}
        href="/board-of-directors/managing-director"
        image={{
          src: "/images/board-of-directors/managing-director.png",
          width: 530,
          height: 550,
        }}
      />
      <OtherBoardMembers />
    </main>
  );
}
