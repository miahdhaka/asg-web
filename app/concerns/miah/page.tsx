import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import ConcernIntro from "@/components/concerns/common/ConcernIntro";
import ConcernCoreValues from "@/components/concerns/common/ConcernCoreValues";
import ConcernProcessing from "@/components/concerns/common/ConcernProcessing";
import {
  miahHero,
  miahCompany,
  miahIntroParagraphs,
  miahIntroStats,
  miahCoreValues,
  miahProcessing,
} from "@/components/concerns/data/miahData";

export const metadata: Metadata = {
  title: "MIAH | ASG - Amanat Shah Group",
  description:
    "MIAH — a contemporary fashion brand by the Amanat Shah Group that transforms passion into timeless style, delivering premium clothing experiences through thoughtfully designed collections.",
};

export default function MiahPage() {
  return (
    <main>
      <PageHeroFull
        title={miahHero.title}
        subtitle={miahHero.subtitle}
        videoSrc={miahHero.videoSrc}
        alt={miahHero.alt}
      />
      <ConcernIntro
        sectionId="miah-intro"
        logoSrc={miahCompany.logoSrc}
        logoAlt={miahCompany.logoAlt}
        websiteUrl={miahCompany.websiteUrl}
        paragraphs={miahIntroParagraphs}
        stats={miahIntroStats}
      />
      <ConcernCoreValues
        sectionId="miah-core-values"
        heading={miahCoreValues.heading}
        description={miahCoreValues.description}
        cards={miahCoreValues.cards}
      />
      <ConcernProcessing
        sectionId="miah-processing"
        title={miahProcessing.title}
        slides={miahProcessing.slides}
      />
    </main>
  );
}
