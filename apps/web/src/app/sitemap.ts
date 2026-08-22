import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const routes = [
  "",
  "/destinazioni",
  "/esperienze",
  "/chi-siamo",
  "/journal",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
