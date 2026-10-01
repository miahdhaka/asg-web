import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import ConcernIntro from "@/components/concerns/common/ConcernIntro";
import ConcernCoreValues from "@/components/concerns/common/ConcernCoreValues";
import {
  texHero,
  texCompany,
  texIntroParagraphs,
  texIntroStats,
  texCoreValues,
} from "@/components/concerns/data/texData";

export const metadata: Metadata = {
  title: "Amanat Shah Tex Solution | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Tex Solution, a sister concern of the Amanat Shah Group — a specialized manufacturer and supplier of surfactants, emulsifiers, and specialty chemicals for the textile industry.",
};

export default function AmanatShahTexSolutionPage() {
  return (
    <main>
      <PageHeroFull
        title={texHero.title}
        subtitle={texHero.subtitle}
        videoSrc={texHero.videoSrc}
        alt={texHero.alt}
      />
      <ConcernIntro
        sectionId="tex-solution-intro"
        logoSrc={texCompany.logoSrc}
        logoAlt={texCompany.logoAlt}
        websiteUrl={texCompany.websiteUrl}
        paragraphs={texIntroParagraphs}
        stats={texIntroStats}
      />
      <ConcernCoreValues
        sectionId="tex-solution-core-values"
        heading={texCoreValues.heading}
        description={texCoreValues.description}
        cards={texCoreValues.cards}
      />
    </main>
  );
}
