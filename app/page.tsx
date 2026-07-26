import Hero from "@/components/homepage/Hero";
import AboutSection from "@/components/homepage/IntroSection";
import OurBusiness from "@/components/homepage/OurBusiness";
import GlobalFootprint from "@/components/homepage/GlobalFootprint";
import Sustainability from "@/components/homepage/Sustainability";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <OurBusiness />
      <GlobalFootprint />
      <Sustainability />
    </main>
  );
}