import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ExperienceDetailPage from "@/components/experiences/page/ExperienceDetailPage";
import { experienceCatalog } from "@/data/experiences";

export function generateStaticParams() {
  return experienceCatalog.map((experience) => ({ slug: experience.slug }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>): Promise<Metadata> {
  const { slug } = await params;
  const experience = experienceCatalog.find((item) => item.slug === slug);
  return experience
    ? { title: experience.title, description: experience.description }
    : {};
}

export default async function ExperiencePage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const experience = experienceCatalog.find((item) => item.slug === slug);
  if (!experience) notFound();
  return <ExperienceDetailPage experience={experience} />;
}
