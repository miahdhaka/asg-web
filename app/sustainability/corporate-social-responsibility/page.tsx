import type { Metadata } from "next";
import CsrHero from "@/components/sustainability/CsrHero";
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
      <CsrHero />
      <CsrIntro />
      <CsrImageRow />
      <CsrInitiatives />
    </main>
  );
}
