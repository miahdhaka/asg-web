import type { Metadata } from "next";
import PrivacyContent from "@/components/privacy-policy/PrivacyContent";
import RevealOnScroll from "@/components/web-info/RevealOnScroll";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Privacy Policy | ASG - Amanat Shah Group",
  description: "Privacy policy and terms of use for the ASG communication portals.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <ScrollProgress />
      <RevealOnScroll y={20}>
        <PrivacyContent />
      </RevealOnScroll>
    </main>
  );
}
