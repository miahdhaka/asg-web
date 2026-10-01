import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import ConcernIntro from "@/components/concerns/common/ConcernIntro";
import ConcernCoreValues from "@/components/concerns/common/ConcernCoreValues";
import ConcernProcessing from "@/components/concerns/common/ConcernProcessing";
import {
  spinningHero,
  spinningCompany,
  spinningIntroParagraphs,
  spinningIntroStats,
  spinningCoreValues,
  spinningProcessing,
} from "@/components/concerns/data/spinningData";

export const metadata: Metadata = {
  title: "Hazrat Amanat Shah Spinning Mills Ltd. | ASG - Amanat Shah Group",
  description:
    "Hazrat Amanat Shah Spinning Mills Ltd. (HASSML), the spinning arm of the Amanat Shah Group — delivering world-class yarn solutions through advanced machinery, rigorous quality control, and over two decades of expertise.",
};

export default function HazratAmanatShahSpinningMillsPage() {
  return (
    <main>
      <PageHeroFull
        title={spinningHero.title}
        subtitle={spinningHero.subtitle}
        videoSrc={spinningHero.videoSrc}
        alt={spinningHero.alt}
      />
      <ConcernIntro
        sectionId="spinning-intro"
        logoSrc={spinningCompany.logoSrc}
        logoAlt={spinningCompany.logoAlt}
        websiteUrl={spinningCompany.websiteUrl}
        paragraphs={spinningIntroParagraphs}
        stats={spinningIntroStats}
      />
      <ConcernCoreValues
        sectionId="spinning-core-values"
        heading={spinningCoreValues.heading}
        description={spinningCoreValues.description}
        cards={spinningCoreValues.cards}
      />
      <ConcernProcessing
        sectionId="spinning-processing"
        title={spinningProcessing.title}
        slides={spinningProcessing.slides}
      />
    </main>
  );
}
