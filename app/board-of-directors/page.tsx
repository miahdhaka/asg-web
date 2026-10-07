import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import MessageSection from "@/components/board/MessageSection";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";

export const metadata: Metadata = {
  title: "Board of Directors | ASG - Amanat Shah Group",
  description:
    "Meet the board of directors leading Amanat Shah Group's strategic vision and operational excellence.",
};

const chairmanBio =
  "ASG's leadership is rooted in a founding family's 130-year entrepreneurial legacy — carried forward today by a management team focused on manufacturing discipline, product innovation and long-term partnership with global brands.";

const managingDirectorBio =
  "ASG's leadership is rooted in a founding family's 130-year entrepreneurial legacy — carried forward today by a management team focused on manufacturing discipline, product innovation and long-term partnership with global brands."

export default function BoardOfDirectorsPage() {
  return (
    <main>
      <PageHero
        id="board-hero"
        title="Board of Directors"
        subtitle="The task of the board of directors is to manage the companys"
        mobileSrc="/images/board-of-directors/board-hero-mobile.webp"
        desktopSrc="/images/board-of-directors/board-hero-desktop.webp"
        alt="Board of Directors of Amanat Shah Group"
      />
      <MessageSection
        id="chairman-message"
        name="Mohammad Helal Miah"
        role="Chairman"
        bio={chairmanBio}
        href="/board-of-directors/chairman"
        mobileBgImage="/images/board-of-directors/chairman-mobile-bg.png"
        image={{
          src: "/images/board-of-directors/chairman.webp",
          width: 530,
          height: 530,
        }}
      />
      <MessageSection
        id="managing-director-message"
        name="Rezaul Karim"
        role="Director"
        bio={managingDirectorBio}
        href="/board-of-directors/managing-director"
        reduceTopGap
        dividerClass="bg-white"
        textClass="text-[#0e2417]"
        bgImage="/images/board-of-directors/director-bg.png"
        mobileBgImage="/images/board-of-directors/director-mobile-bg.png"
        image={{
          src: "/images/board-of-directors/director.webp",
          width: 530,
          height: 530,
        }}
      />
      <OtherBoardMembers layout="grid" />
    </main>
  );
}
