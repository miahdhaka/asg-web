import type { Metadata } from "next";
import MemberMessageHero from "@/components/board/MemberMessageHero";
import MessageBody from "@/components/board/MessageBody";
import OtherBoardMembers from "@/components/board/OtherBoardMembers";
import { otherMembersFor } from "@/components/board/boardRoster";

export const metadata: Metadata = {
  title: "Message from the Chairman | ASG - Amanat Shah Group",
  description:
    "Message from Mohammad Helal Miah, Chairman of Amanat Shah Group — our legacy is our foundation; our vision is our future.",
};

const messageParagraphs = [
  "Since our inception 130 years ago, Amanat Shah Group has evolved from a modest family-run workshop into a diversified industrial powerhouse. As we stand today, led by the pride of our third generation, I reflect on the journey that has brought us here\u2014a journey defined not just by industrial growth, but by a steadfast commitment to the values of integrity, craftsmanship, and trust instilled by our forefathers.",
  "At Amanat Shah Group, we believe that an organization is more than just a business; it is a promise. A promise to our employees, our partners, and the people of Bangladesh. From the heritage of our early textile days to our modern ventures in real estate, finance, technology, and advanced chemical solutions, our goal has remained consistent: To be the best in every endeavor we undertake.",
  "We are now at a pivotal moment in our history. By leveraging our deep-rooted industrial heritage and integrating it with modern technological innovation, we are creating a robust platform capable of delivering sustainable growth. We are no longer just manufacturers; we are innovators. Whether it is through the precision of our spinning and fabric units, the modernization of our retail and e-commerce platforms, or our strategic expansion into specialized services, we are constantly pushing the boundaries of what is possible.",
  "Our human capital is our greatest asset. Our success is driven by a passionate team that combines the wisdom of experienced professionals with the dynamic energy of young leaders. We are committed to fostering a work culture that encourages excellence, nurtures talent, and prioritizes the well-being of every individual who contributes to our growth.",
  "Looking ahead, our focus remains on long-term sustainable development. We are committed to socio-economic progress, investing in the infrastructure and industries that will drive Bangladesh forward. We continue to seek new opportunities that create value for our stakeholders while staying true to our core identity.",
  "We are a Group built on 130 years of trust. As we look to the future, we invite you to be part of our ongoing story\u2014a story of heritage, innovation, and unwavering excellence.",
];

export default function ChairmanMessagePage() {
  return (
    <main>
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
           the left edge aligned to the other detail pages */
        portraitClassName="lg:w-[31.37em] lg:right-[26.13em]"
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
      <OtherBoardMembers members={otherMembersFor("chairman")} />
    </main>
  );
}
