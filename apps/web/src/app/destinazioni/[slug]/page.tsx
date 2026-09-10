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
    ? { title: destination.name, description: destination.description }
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
