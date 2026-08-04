import type { Metadata } from "next";
import TermsContent from "@/components/terms-of-use/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Use | ASG - Amanat Shah Group",
  description: "General terms and conditions of use for the ASG communication portals.",
};

export default function TermsOfUsePage() {
  return (
    <main>
      <TermsContent />
    </main>
  );
}
