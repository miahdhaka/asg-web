import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import ConcernIntro from "@/components/concerns/common/ConcernIntro";
import ConcernCoreValues from "@/components/concerns/common/ConcernCoreValues";
import ConcernProcessing from "@/components/concerns/common/ConcernProcessing";
import {
  weavingHero,
  weavingCompany,
  weavingIntroParagraphs,
  weavingIntroStats,
  weavingCoreValues,
  weavingProcessing,
} from "@/components/concerns/data/weavingData";

export const metadata: Metadata = {
  title: "Amanat Shah Weaving Processing Ltd. | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Weaving Processing Ltd., the weaving arm of the Amanat Shah Group — producing high-quality greige fabrics through advanced weaving technology, rigorous quality control, and generations of textile craftsmanship.",
};

export default function AmanatShahWeavingProcessingPage() {
  return (
    <main>
      <PageHeroFull
        title={weavingHero.title}
        subtitle={weavingHero.subtitle}
        videoSrc={weavingHero.videoSrc}
        alt={weavingHero.alt}
      />
      <ConcernIntro
        sectionId="weaving-intro"
        logoSrc={weavingCompany.logoSrc}
        logoAlt={weavingCompany.logoAlt}
        websiteUrl={weavingCompany.websiteUrl}
        paragraphs={weavingIntroParagraphs}
        stats={weavingIntroStats}
      />
      <ConcernCoreValues
        sectionId="weaving-core-values"
        heading={weavingCoreValues.heading}
        description={weavingCoreValues.description}
        cards={weavingCoreValues.cards}
      />
      <ConcernProcessing
        sectionId="weaving-processing"
        title={weavingProcessing.title}
        slides={weavingProcessing.slides}
      />
    </main>
  );
}
