import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import CsrIntro from "@/components/sustainability/CsrIntro";
import CsrImageRow from "@/components/sustainability/CsrImageRow";
import CsrInitiatives from "@/components/sustainability/CsrInitiatives";

export const metadata: Metadata = {
  title: "Corporate Social Responsibility | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Group's CSR initiatives — education, healthcare, staff welfare, and community development across Bangladesh.",
};

export default function CorporateSocialResponsibilityPage() {
  return (
    <main>
      <PageHero
        title="Corporate Social Responsibility"
        subtitle="Family business legacy for more than 130 years."
        mobileSrc="/images/sustainability/csr/hero.png"
        desktopSrc="/images/sustainability/csr/hero.png"
        alt="Corporate Social Responsibility — Amanat Shah Group community initiatives"
        emblemSrc="/images/sustainability/csr/hero-emblem.png"
      />
      <CsrIntro />
      <CsrImageRow />
      <CsrInitiatives />
    </main>
  );
}
