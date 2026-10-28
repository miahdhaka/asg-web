import type { Metadata } from "next";
import MemberMessageHero from "@/components/board/MemberMessageHero";
import MessageBody from "@/components/board/MessageBody";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";
import { otherMembersFor } from "@/components/board/boardRoster";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Message from the Chairman | ASG - Amanat Shah Group",
  description:
    "Message from Mohammad Helal Miah, Chairman of Amanat Shah Group — our legacy is our foundation; our vision is our future.",
};

const messageParagraphs = [
  "Our journey began in late 1896, when my father started making traditional clothing for the local community. Then, over the next 130 years, it kept growing unstoppably and became a prominent clothing partner for global fashion brands.",
  "Expanding from clothing manufacturing, our journey goes beyond Agriculture, Finance, E-commerce, Technology, Chemicals and Real Estate, growing into a diversified conglomerate.",
  "It has been a proud journey over the last 130 years, with the help of artisans, experts, workers, engineers, and designers. Amanat Shah Group continues to grow richer in experience, delivering quality to communities and partners around the world.",
  "Today, ASG stands proudly, led by the third generation. This journey has been shaped by a century of disciplined craftsmanship and trust.",
  "We believe that an organization is more than just a business. It’s a promise. A promise to our employees. A promise to our partners. A promise to ASG’s family heritage. And a promise to the people of Bangladesh.",
  "From the early days of traditional textiles to today’s innovative ventures, our commitment has remained consistent. Be trusted for quality in every endeavor we travel. ASG is now at a peak moment in our history. By leveraging our deep-rooted industrial expertise and integrating it with modern technology, we are creating a robust platform capable of delivering sustainable growth.",
  "Through our strategic expansion into specialized services, we continue to push the boundaries of what is possible and explore what comes next.",
  "Our people are our greatest asset. Our success is driven by innovation and passion. Teams that combine experience with dynamic leadership. Building a work culture that encourages excellence, expands creative talent and prioritizes the well-being of everyone.",
  "Looking toward the future, our focus remains on sustainable, holistic development. We are committed to advancing socio-economic progress and investing in industrial infrastructure to help drive Bangladesh forward, together."
];

export default function ChairmanMessagePage() {
  return (
    <main>
      <ScrollProgress />
      <MemberMessageHero
        id="chairman-hero"
        name="Mohammad Helal Miah"
        role="Chairman"
        org="AMANAT SHAH GROUP"
        portrait={{
          src: "/images/board-of-directors/chairman.png",
          width: 7236,
          height: 9848,
        }}
        /* Sized to fill the hero height at this portrait's aspect ratio, with
           the left edge aligned to the other detail pages. Mirrored horizontally. */
        portraitClassName="lg:w-[31.37em] lg:right-[20.13em]"
      />
      <MessageBody
        id="chairman-full-message"
        heading="Message from the Chairman"
        lead="Our legacy is our foundation; our vision is our future."
        paragraphs={messageParagraphs}
        signOff={{
          name: "Mohammad Helal Miah",
          role: "Chairman",
          org: "AMANAT SHAH GROUP",
        }}
      />
      <div className="sm:mb-6">
        <OtherBoardMembers members={otherMembersFor("chairman")} />
      </div>
    </main>
  );
}
