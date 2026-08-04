import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FaqHero from "@/components/faq/FaqHero";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { faqCategories, getFaqCategory } from "@/components/faq/faqData";

/** Pre-render one page per category at build time */
export function generateStaticParams() {
  return faqCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/faqs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getFaqCategory(slug);

  if (!category) return { title: "FAQ's | ASG - Amanat Shah Group" };

  return {
    title: `${category.title} FAQ's | ASG - Amanat Shah Group`,
    description: category.description,
  };
}

export default async function FaqCategoryPage({
  params,
}: PageProps<"/faqs/[slug]">) {
  const { slug } = await params;
  const category = getFaqCategory(slug);

  if (!category) notFound();

  return (
    <main>
      <FaqHero />
      <FaqAccordion title={category.title} items={category.faqs} />
    </main>
  );
}
