import type { Metadata } from "next";
import CookieContent from "@/components/cookie-policy/CookieContent";
import RevealOnScroll from "@/components/web-info/RevealOnScroll";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Cookie Policy | ASG - Amanat Shah Group",
  description:
    "How Amanat Shah Group uses cookies and similar technologies on this website, and how you can manage them.",
};

export default function CookiePolicyPage() {
  return (
    <main>
      <ScrollProgress />
      <RevealOnScroll y={20}>
        <CookieContent />
      </RevealOnScroll>
    </main>
  );
}
