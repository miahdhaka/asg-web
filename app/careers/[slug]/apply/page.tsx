import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob } from "@/components/career/careerData";
import CareerApplicationForm from "@/components/career/CareerApplicationForm";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) return { title: "Apply | ASG - Amanat Shah Group" };

  return {
    title: `Apply for ${job.title} | ASG - Amanat Shah Group`,
    description: `Apply for ${job.title} — ${job.department} · ${job.location}`,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) notFound();

  return (
    <main className="mx-auto mt-[4rem] sm:mt-[6rem] w-full max-w-[59rem] px-4 pt-8 pb-16 sm:px-5 sm:pt-[3.5rem]">
      <CareerApplicationForm jobTitle={job.title} department={job.department} location={job.location} />
    </main>
  );
}
