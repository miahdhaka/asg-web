import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import CsrCommunityImpact from "@/components/sustainability/CsrCommunityImpact";
import CsrPeopleFirst from "@/components/sustainability/CsrPeopleFirst";
import CsrEducationBanner from "@/components/sustainability/CsrEducationBanner";
import CsrPillars from "@/components/sustainability/CsrPillars";
import CsrPartnerCta from "@/components/sustainability/CsrPartnerCta";
import { csrHero } from "@/components/sustainability/csrData";

export const metadata: Metadata = {
  title: "Corporate Social Responsibility | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Group's CSR commitments — uplifting local communities, a people-first workplace, and education-led social growth.",
};

export default function CorporateSocialResponsibilityPage() {
  return (
    <main>
      <PageHeroFull
        title={csrHero.title}
        subtitle={csrHero.subtitle}
        mobileSrc={csrHero.image}
        desktopSrc={csrHero.image}
        alt={csrHero.alt}
      />
      <CsrCommunityImpact />
      <CsrPeopleFirst />
      <CsrEducationBanner />
      <CsrPillars />
      <CsrPartnerCta />
    </main>
  );
}
