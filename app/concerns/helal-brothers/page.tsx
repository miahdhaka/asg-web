import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import ConcernIntro from "@/components/concerns/common/ConcernIntro";
import ConcernSocialModel from "@/components/concerns/common/ConcernSocialModel";
import ConcernBrands from "@/components/concerns/common/ConcernBrands";
import ConcernProcessing from "@/components/concerns/common/ConcernProcessing";
import {
  helalHero,
  helalCompany,
  helalIntroParagraphs,
  helalIntroStats,
  helalPillars,
  helalSocialModelCopy,
  helalBrandRows,
  helalBrandsCopy,
  helalProcessing,
} from "@/components/concerns/data/helalData";

export const metadata: Metadata = {
  title: "M/s Helal & Brothers Ltd. | ASG - Amanat Shah Group",
  description:
    "M/s Helal & Brothers Ltd., the flagship concern of the Amanat Shah Group — pioneering Bangladesh's textile heritage through a community-focused social business model.",
};

export default function HelalBrothersPage() {
  return (
    <main>
      <PageHeroFull
        title={helalHero.title}
        subtitle={helalHero.subtitle}
        videoSrc={helalHero.videoSrc}
        alt={helalHero.alt}
      />
      <ConcernIntro
        sectionId="helal-intro"
        logoSrc={helalCompany.logoSrc}
        logoAlt={helalCompany.logoAlt}
        websiteUrl={helalCompany.websiteUrl}
        paragraphs={helalIntroParagraphs}
        stats={helalIntroStats}
      />
      <ConcernSocialModel
        sectionId="helal-social-model"
        heading={helalSocialModelCopy.heading}
        description={helalSocialModelCopy.description}
        coreText={helalSocialModelCopy.coreText}
        pillars={helalPillars}
        photoSrc={helalSocialModelCopy.photoSrc}
        photoAlt={helalSocialModelCopy.photoAlt}
      />
      <ConcernBrands
        sectionId="helal-brands"
        heading={helalBrandsCopy.heading}
        intro={helalBrandsCopy.intro}
        rows={helalBrandRows}
      />
      <ConcernProcessing
        sectionId="helal-processing"
        title={helalProcessing.title}
        slides={helalProcessing.slides}
      />
    </main>
  );
}
