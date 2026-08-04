import type { Metadata } from "next";
import FaqHero from "@/components/faq/FaqHero";
import FaqCategories from "@/components/faq/FaqCategories";

export const metadata: Metadata = {
  title: "FAQ's | ASG - Amanat Shah Group",
  description: "Family business legacy for more than 130 years.",
};

export default function FaqsPage() {
  return (
    <main>
      <FaqHero />
      <FaqCategories />
    </main>
  );
}
