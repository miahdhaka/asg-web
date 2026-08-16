import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import CareerBoard from "@/components/career/CareerBoard";
import InternshipSection from "@/components/career/InternshipSection";

export const metadata: Metadata = {
  title: "Careers | ASG - Amanat Shah Group",
  description: "Family business legacy for more than 130 years.",
};

export default function CareersPage() {
  return (
    <main>
      <PageHero
        title="Find Your Opportunity"
        subtitle="Family business legacy for more than 130 years."
        mobileSrc="/images/career/hero.webp"
        desktopSrc="/images/career/hero.webp"
        alt="ASG Group team members at work"
        emblemSrc="/logo/asg-monogram.png"
      />
      <CareerBoard />
      <InternshipSection />
    </main>
  );
}
