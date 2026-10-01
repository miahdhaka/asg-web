import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import ConcernIntro from "@/components/concerns/common/ConcernIntro";
import ConcernCoreValues from "@/components/concerns/common/ConcernCoreValues";
import ConcernProcessing from "@/components/concerns/common/ConcernProcessing";
import {
  trustHero,
  trustCompany,
  trustIntroParagraphs,
  trustIntroStats,
  trustCoreValues,
  trustProcessing,
} from "@/components/concerns/data/trustData";

export const metadata: Metadata = {
  title: "Trust Knitwear Industries Ltd. | ASG - Amanat Shah Group",
  description:
    "Trust Knitwear Industries Ltd. — a vertically integrated knit composite facility under Amanat Shah Group, producing premium knit fabrics, dyeing, finishing, and export-oriented garments since 2003.",
};

export default function TrustKnitwearPage() {
  return (
    <main>
      <PageHeroFull
        title={trustHero.title}
        subtitle={trustHero.subtitle}
        videoSrc={trustHero.videoSrc}
        alt={trustHero.alt}
      />
      <ConcernIntro
        sectionId="trustknitwear-intro"
        logoSrc={trustCompany.logoSrc}
        logoAlt={trustCompany.logoAlt}
        websiteUrl={trustCompany.websiteUrl}
        paragraphs={trustIntroParagraphs}
        stats={trustIntroStats}
      />
      <ConcernCoreValues
        sectionId="trustknitwear-core-values"
        heading={trustCoreValues.heading}
        description={trustCoreValues.description}
        cards={trustCoreValues.cards}
      />
      <ConcernProcessing
        sectionId="trustknitwear-processing"
        title={trustProcessing.title}
        slides={trustProcessing.slides}
      />
    </main>
  );
}
