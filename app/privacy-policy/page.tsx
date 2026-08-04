import type { Metadata } from "next";
import PrivacyContent from "@/components/privacy-policy/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | ASG - Amanat Shah Group",
  description: "Privacy policy and terms of use for the ASG communication portals.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PrivacyContent />
    </main>
  );
}
