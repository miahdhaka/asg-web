import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutStats from "@/components/about/AboutStats";
import VisionMission from "@/components/about/VisionMission";
import Achievements from "@/components/about/Achievements";
import ValueCardsSection, { ValueCardItem } from "@/components/about/ValueCardsSection";

export const metadata: Metadata = {
  title: "About Us | ASG - Amanat Shah Group",
  description: "Family business legacy for more than 130 years.",
};

const coreValues: ValueCardItem[] = [
  {
    icon: "/images/about/icons/value-ownership.svg",
    title: "Ownership",
    description: "We take full responsibility for our actions and outcomes to drive collective success.",
  },
  {
    icon: "/images/about/icons/value-quality-focus.svg",
    title: "Quality Focus",
    description: "We prioritize excellence and precision in every product and service we deliver.",
  },
  {
    icon: "/images/about/icons/value-customer-centricity.svg",
    title: "Customer Centricity",
    description: "Our strategies are designed to meet customer needs and exceed their expectations",
  },
  {
    icon: "/images/about/icons/value-collaboration.svg",
    title: "Collaboration",
    description: "We foster teamwork and partnerships to achieve shared goals and sustainable growth.",
  },
  {
    icon: "/images/about/icons/value-commitment.svg",
    title: "Commitment",
    description: "We are dedicated to integrity and long-term value creation for all our stakeholders.",
  },
  {
    icon: "/images/about/icons/value-leadership.svg",
    title: "Leadership",
    description: "We lead with vision and accountability to shape a stronger future for generations.",
  },
];

const coreCompetencies: ValueCardItem[] = [
  {
    icon: "/images/about/icons/competency-innovation.svg",
    title: "Innovation",
    description: "We continuously explore creative solutions and advanced technologies to stay competitive in the .",
  },
  {
    icon: "/images/about/icons/competency-process-excellence.svg",
    title: "Process Excellence",
    description: "We optimize our operations through lean practices to ensure consistent quality and efficiency.",
  },
  {
    icon: "/images/about/icons/competency-agility.svg",
    title: "Agility",
    description: "We maintain the flexibility to adapt quickly to changing market dynamics and customer needs.",
  },
  {
    icon: "/images/about/icons/competency-business-acumen.svg",
    title: "Business Acumen",
    description: "We leverage deep market insights to drive growth and make informed strategic decisions.",
  },
  {
    icon: "/images/about/icons/competency-cost-efficiency.svg",
    title: "Cost Efficiency",
    description: "We utilize our resources & capabilities to deliver superior products to maintain competitive price.",
  },
  {
    icon: "/images/about/icons/competency-strategic-thinking.svg",
    title: "Strategic Thinking",
    description: "We align our long-term goals with purposeful action to shape a stronger, sustainable future.",
  },
];

export default function AboutUsPage() {
  return (
    <main>
      <AboutHero />
      <AboutIntro />
      <AboutStats />
      <VisionMission />
      <Achievements />
      <ValueCardsSection id="core-values" heading="Core Values" items={coreValues} variant="muted" />
      <ValueCardsSection id="core-competency" heading="Core Competency" items={coreCompetencies} variant="light" />
    </main>
  );
}
