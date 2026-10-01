import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import ConcernIntro from "@/components/concerns/common/ConcernIntro";
import ConcernCoreValues from "@/components/concerns/common/ConcernCoreValues";
import {
  dynamicHero,
  dynamicCompany,
  dynamicIntroParagraphs,
  dynamicIntroStats,
  dynamicCoreValues,
} from "@/components/concerns/data/asgDynamicData";

export const metadata: Metadata = {
  title: "ASG Dynamic | ASG - Amanat Shah Group",
  description:
    "ASG Dynamic — a sister concern of the Amanat Shah Group. A technology-driven consulting and software development firm delivering digital transformation, custom software, ERP solutions and business analytics for clients worldwide.",
};

export default function AsgDynamicPage() {
  return (
    <main>
      <PageHeroFull
        title={dynamicHero.title}
        subtitle={dynamicHero.subtitle}
        videoSrc={dynamicHero.videoSrc}
        alt={dynamicHero.alt}
      />
      <ConcernIntro
        sectionId="asg-dynamic-intro"
        logoSrc={dynamicCompany.logoSrc}
        logoAlt={dynamicCompany.logoAlt}
        websiteUrl={dynamicCompany.websiteUrl}
        paragraphs={dynamicIntroParagraphs}
        stats={dynamicIntroStats}
      />
      <ConcernCoreValues
        sectionId="asg-dynamic-core-values"
        heading={dynamicCoreValues.heading}
        description={dynamicCoreValues.description}
        cards={dynamicCoreValues.cards}
      />
    </main>
  );
}
