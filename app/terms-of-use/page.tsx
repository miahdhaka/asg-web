import type { Metadata } from "next";
import TermsContent from "@/components/terms-of-use/TermsContent";
import RevealOnScroll from "@/components/web-info/RevealOnScroll";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Terms Of Use | ASG - Amanat Shah Group",
  description: "General terms and conditions of use for the ASG communication portals.",
};

export default function TermsOfUsePage() {
  return (
    <main>
      <ScrollProgress />
      <RevealOnScroll y={20}>
        <TermsContent />
      </RevealOnScroll>
    </main>
  );
}
