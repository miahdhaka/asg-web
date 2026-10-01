import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import ConcernIntro from "@/components/concerns/common/ConcernIntro";
import ConcernCoreValues from "@/components/concerns/common/ConcernCoreValues";
import ConcernProcessing from "@/components/concerns/common/ConcernProcessing";
import {
  fabricsHero,
  fabricsCompany,
  fabricsIntroParagraphs,
  fabricsIntroStats,
  fabricsCoreValues,
  fabricsProcessing,
} from "@/components/concerns/data/fabricsData";

export const metadata: Metadata = {
  title: "Amanat Shah Fabrics Ltd. | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Fabrics Ltd. (ASFL), a vertically integrated textile manufacturer of the Amanat Shah Group — producing high-quality dyed, printed, and finished woven fabrics with cutting-edge European technology.",
};

export default function AmanatShahFabricsPage() {
  return (
    <main>
      <PageHeroFull
        title={fabricsHero.title}
        subtitle={fabricsHero.subtitle}
        videoSrc={fabricsHero.videoSrc}
        alt={fabricsHero.alt}
      />
      <ConcernIntro
        sectionId="fabrics-intro"
        logoSrc={fabricsCompany.logoSrc}
        logoAlt={fabricsCompany.logoAlt}
        websiteUrl={fabricsCompany.websiteUrl}
        paragraphs={fabricsIntroParagraphs}
        stats={fabricsIntroStats}
      />
      <ConcernCoreValues
        sectionId="fabrics-core-values"
        heading={fabricsCoreValues.heading}
        description={fabricsCoreValues.description}
        cards={fabricsCoreValues.cards}
      />
      <ConcernProcessing
        sectionId="fabrics-processing"
        title={fabricsProcessing.title}
        slides={fabricsProcessing.slides}
      />
    </main>
  );
}
