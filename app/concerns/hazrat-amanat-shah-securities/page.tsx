import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import ConcernIntro from "@/components/concerns/common/ConcernIntro";
import ConcernCoreValues from "@/components/concerns/common/ConcernCoreValues";
import {
  securitiesHero,
  securitiesCompany,
  securitiesIntroParagraphs,
  securitiesIntroStats,
  securitiesCoreValues,
} from "@/components/concerns/data/securitiesData";

export const metadata: Metadata = {
  title: "Hazrat Amanat Shah Securities Ltd. | ASG - Amanat Shah Group",
  description:
    "Hazrat Amanat Shah Securities Limited (HASSL) — a licensed stock brokerage house under Amanat Shah Group, providing capital market services through DSE and CSE since 2009.",
};

export default function HasslPage() {
  return (
    <main>
      <PageHeroFull
        title={securitiesHero.title}
        subtitle={securitiesHero.subtitle}
        videoSrc={securitiesHero.videoSrc}
        alt={securitiesHero.alt}
      />
      <ConcernIntro
        sectionId="hassl-intro"
        logoSrc={securitiesCompany.logoSrc}
        logoAlt={securitiesCompany.logoAlt}
        websiteUrl={securitiesCompany.websiteUrl}
        paragraphs={securitiesIntroParagraphs}
        stats={securitiesIntroStats}
      />
      <ConcernCoreValues
        sectionId="hassl-core-values"
        heading={securitiesCoreValues.heading}
        description={securitiesCoreValues.description}
        cards={securitiesCoreValues.cards}
      />
    </main>
  );
}
