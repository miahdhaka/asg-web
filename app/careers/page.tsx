import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import CareerBoard from "@/components/career/CareerBoard";
import InternshipSection from "@/components/career/InternshipSection";
import RevealOnScroll from "@/components/web-info/RevealOnScroll";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Careers | ASG - Amanat Shah Group",
  description: "Family business legacy for more than 130 years.",
};

export default function CareersPage() {
  return (
    <main>
      <ScrollProgress />
      <PageHero
        id="career-hero"
        title={"Find Your\nOpportunity"}
        subtitle="Family business legacy for more than 130 years."
        mobileSrc="/images/career/hero.webp"
        desktopSrc="/images/career/hero.webp"
        alt="ASG Group team members at work"
      />
      <RevealOnScroll>
        <CareerBoard />
      </RevealOnScroll>
      <RevealOnScroll>
        <InternshipSection />
      </RevealOnScroll>
    </main>
  );
}
