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
    icon: "/icons/about-us/ownership.png",
    title: "Ownership",
    description: "We take full responsibility for our actions and outcomes to drive collective success.",
  },
  {
    icon: "/icons/about-us/quality.png",
    title: "Quality Focus",
    description: "We prioritize excellence and precision in every product and service we deliver.",
  },
  {
    icon: "/icons/about-us/customer.png",
    title: "Customer Centricity",
    description: "Our strategies are designed to meet customer needs and exceed their expectations",
  },
  {
    icon: "/icons/about-us/collaboration.png",
    title: "Collaboration",
    description: "We foster teamwork and partnerships to achieve shared goals and sustainable growth.",
  },
  {
    icon: "/icons/about-us/commitment.png"  ,
    title: "Commitment",
    description: "We are dedicated to integrity and long-term value creation for all our stakeholders.",
  },
  {
    icon: "/icons/about-us/leadership.png",
    title: "Leadership",
    description: "We lead with vision and accountability to shape a stronger future for generations.",
  },
];

const coreCompetencies: ValueCardItem[] = [
  {
    icon: "/icons/about-us/innovation.png",
    title: "Innovation",
    description: "We continuously explore creative solutions and advanced technologies to stay competitive in the .",
  },
  {
    icon: "/icons/about-us/process.png",
    title: "Process Excellence",
    description: "We optimize our operations through lean practices to ensure consistent quality and efficiency.",
  },
  {
    icon: "/icons/about-us/agility.png",
    title: "Agility",
    description: "We maintain the flexibility to adapt quickly to changing market dynamics and customer needs.",
  },
  {
    icon: "/icons/about-us/bussiness.png",
    title: "Business Acumen",
    description: "We leverage deep market insights to drive growth and make informed strategic decisions.",
  },
  {
    icon: "/icons/about-us/cost.png",
    title: "Cost Efficiency",
    description: "We utilize our resources & capabilities to deliver superior products to maintain competitive price.",
  },
  {
    icon: "/icons/about-us/stratigic.png",
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
