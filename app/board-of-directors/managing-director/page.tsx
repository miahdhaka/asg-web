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
  "Amanat Shah Group is more than just an industrial conglomerate; it is a legacy of resilience and vision that has spanned over a century. Since taking the helm, my focus has been to bridge the gap between our rich heritage\u2014built on the principles of quality and craftsmanship\u2014and the dynamic, fast-paced demands of the modern global market.",
  "Our journey from a humble family workshop to a multi-dimensional powerhouse is a testament to the hard work and dedication of the generations that came before us. Today, as we operate across textiles, finance, real estate, technology, and advanced chemical solutions, our objective remains singular: to deliver excellence in every thread we weave and every project we build.",
  "At the core of our strategy is integration and innovation. We are not merely following trends; we are setting benchmarks. By investing in backward integration, state-of-the-art technology, and, most importantly, our people, we ensure that the Amanat Shah name remains synonymous with reliability and forward-thinking leadership.",
  "I am deeply proud of our professional team\u2014a perfect synergy of experienced veterans and young, ambitious talent. Together, we are creating an ecosystem where ideas flourish, and operational excellence is a daily commitment. As we move forward, our goal is to continue contributing to the socio-economic development of Bangladesh while maintaining the trust of our stakeholders and the quality that defines us.",
  "We are a business house built on trust, and we are committed to building a stronger, more innovative tomorrow.",
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
          src: "/images/board-of-directors/managing-director.png",
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
        lead="Innovation rooted in tradition, excellence driven by passion."
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
