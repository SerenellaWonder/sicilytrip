import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { journalArticles } from "@/content/journal";

const routes = [
  "",
  "/destinazioni",
  "/esperienze",
  "/chi-siamo",
  "/journal",
  "/faq",
  "/contatti",
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

  return [...staticRoutes, ...journalRoutes];
}
