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
    ? {
        title: experience.title,
        description: experience.description,
        alternates: { canonical: experience.href },
        openGraph: {
          type: "website",
          title: `${experience.title} | SicilyTrip`,
          description: experience.description,
          url: experience.href,
          images: [{ url: experience.image, alt: experience.title }],
        },
        twitter: {
          card: "summary_large_image",
          title: `${experience.title} | SicilyTrip`,
          description: experience.description,
          images: [experience.image],
        },
      }
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
