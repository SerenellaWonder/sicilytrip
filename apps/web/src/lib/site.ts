const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (
  configuredSiteUrl || "https://sicilytrip-web.vercel.app"
).replace(/\/$/, "");
