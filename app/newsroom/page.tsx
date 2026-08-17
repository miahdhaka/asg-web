import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import NewsGrid from "@/components/newsroom/NewsGrid";

export const metadata: Metadata = {
  title: "News Releases | ASG - Amanat Shah Group",
  description: "Stay in the know with the latest news from ASG Group.",
};

export default function NewsroomPage() {
  return (
    <main>
      <PageHero
        title="News Releases"
        subtitle="Stay in the know with the latest news from ASG Group."
        mobileSrc="/images/newsroom/news-hero.png"
        desktopSrc="/images/newsroom/news-hero.png"
        alt="ASG Group news releases"
      />
      <NewsGrid />
    </main>
  );
}
