import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import ConcernIntro from "@/components/concerns/common/ConcernIntro";
import ConcernCoreValues from "@/components/concerns/common/ConcernCoreValues";
import {
  farmHero,
  farmCompany,
  farmIntroParagraphs,
  farmIntroStats,
  farmCoreValues,
} from "@/components/concerns/data/farmData";

export const metadata: Metadata = {
  title: "Farm2Firm Management Ltd | ASG - Amanat Shah Group",
  description:
    "Farm2Firm Management Ltd — a premier tea estate entity under Amanat Shah Group, dedicated to sustainable agriculture and high-quality tea production since 1955.",
};

export default function Farm2FirmPage() {
  return (
    <main>
      <PageHeroFull
        title={farmHero.title}
        subtitle={farmHero.subtitle}
        videoSrc={farmHero.videoSrc}
        alt={farmHero.alt}
      />
      <ConcernIntro
        sectionId="farm2firm-intro"
        logoSrc={farmCompany.logoSrc}
        logoAlt={farmCompany.logoAlt}
        websiteUrl={farmCompany.websiteUrl}
        paragraphs={farmIntroParagraphs}
        stats={farmIntroStats}
      />
      <ConcernCoreValues
        sectionId="farm2firm-core-values"
        heading={farmCoreValues.heading}
        description={farmCoreValues.description}
        cards={farmCoreValues.cards}
      />
    </main>
  );
}
