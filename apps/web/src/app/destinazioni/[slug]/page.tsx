import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DestinationDetailPage from "@/components/destinations/page/DestinationDetailPage";
import { destinationCatalog } from "@/data/destinations";

export function generateStaticParams() {
  return destinationCatalog.map((destination) => ({ slug: destination.id }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinationCatalog.find((item) => item.id === slug);
  return destination
    ? {
        title: destination.name,
        description: destination.description,
        alternates: { canonical: destination.href },
        openGraph: {
          type: "website",
          title: `${destination.name} | SicilyTrip`,
          description: destination.description,
          url: destination.href,
          images: [{ url: destination.image, alt: `${destination.name}, Sicilia` }],
        },
        twitter: {
          card: "summary_large_image",
          title: `${destination.name} | SicilyTrip`,
          description: destination.description,
          images: [destination.image],
        },
      }
    : {};
}

export default async function DestinationPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const destination = destinationCatalog.find((item) => item.id === slug);
  if (!destination) notFound();
  return <DestinationDetailPage destination={destination} />;
}
