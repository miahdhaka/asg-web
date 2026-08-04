import type { Metadata } from "next";
import CareerHero from "@/components/career/CareerHero";
import CareerBoard from "@/components/career/CareerBoard";
import InternshipSection from "@/components/career/InternshipSection";

export const metadata: Metadata = {
  title: "Careers | ASG - Amanat Shah Group",
  description: "Family business legacy for more than 130 years.",
};

export default function CareersPage() {
  return (
    <main>
      <CareerHero />
      <CareerBoard />
      <InternshipSection />
    </main>
  );
}
