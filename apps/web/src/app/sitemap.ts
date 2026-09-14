import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { journalArticles } from "@/content/journal";
import { destinationCatalog } from "@/data/destinations";
import { experienceCatalog } from "@/data/experiences";

const routes = [
  "",
  "/destinazioni",
  "/esperienze",
  "/chi-siamo",
  "/journal",
  "/faq",
  "/contatti",
  "/privacy",
  "/termini",
  "/cookie",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route, index) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journalArticles.map(
    (article) => ({
      url: `${SITE_URL}/journal/${article.slug}`,
      lastModified: new Date(`${article.publishedAt}T00:00:00.000Z`),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const destinationRoutes: MetadataRoute.Sitemap = destinationCatalog.map(
    (destination) => ({
      url: `${SITE_URL}/destinazioni/${destination.id}`,
      changeFrequency: "monthly",
      priority: 0.75,
    }),
  );

  const experienceRoutes: MetadataRoute.Sitemap = experienceCatalog.map(
    (experience) => ({
      url: `${SITE_URL}/esperienze/${experience.slug}`,
      changeFrequency: "monthly",
      priority: 0.75,
    }),
  );

  return [...staticRoutes, ...destinationRoutes, ...experienceRoutes, ...journalRoutes];
}
