import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import NewsGrid from "@/components/newsroom/NewsGrid";
import RevealOnScroll from "@/components/web-info/RevealOnScroll";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "News Releases | ASG - Amanat Shah Group",
  description: "Stay in the know with the latest news from ASG Group.",
};

export default function NewsroomPage() {
  return (
    <main>
      <ScrollProgress />
      <PageHero
        title="News Releases"
        subtitle="Stay in the know with the latest news from ASG Group."
        mobileSrc="/images/newsroom/newsroom-mobile-banner.webp"
        desktopSrc="/images/newsroom/newsroom-desktop-banner.webp"
        alt="ASG Group news releases"
        objectPosition="top"
      />
      <RevealOnScroll>
        <NewsGrid />
      </RevealOnScroll>
    </main>
  );
}
