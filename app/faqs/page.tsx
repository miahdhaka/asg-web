import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import FaqCategories from "@/components/faq/FaqCategories";

export const metadata: Metadata = {
  title: "FAQ's | ASG - Amanat Shah Group",
  description: "Family business legacy for more than 130 years.",
};

export default function FaqsPage() {
  return (
    <main>
      <PageHero
        title="FAQ's"
        subtitle="Family business legacy for more than 130 years."
        mobileSrc="/images/faq/hero.webp"
        desktopSrc="/images/faq/hero.webp"
        alt="ASG Group shipping and logistics operations"
      />
      <FaqCategories />
    </main>
  );
}
