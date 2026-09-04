const ASSET_FIELD = /(image|img|photo|gallery|thumbnail)/i;
const ABSOLUTE_URL = /^https?:\/\//i;

export function normalizePartnerAssets<T>(value: T, cdnUrl: string): T {
  if (!cdnUrl.trim()) return value;
  return walk(value, cdnUrl, '') as T;
}

function walk(value: unknown, cdnUrl: string, key: string): unknown {
  if (typeof value === 'string') {
    return ASSET_FIELD.test(key) ? assetUrl(value, cdnUrl) : value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => walk(item, cdnUrl, key));
  }
  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, childValue]) => [
        childKey,
        walk(childValue, cdnUrl, childKey),
      ]),
    );
  }
  return value;
}

function assetUrl(value: string, cdnUrl: string) {
  const trimmed = value.trim();
  if (!trimmed || ABSOLUTE_URL.test(trimmed)) return value;
  if (trimmed.startsWith('//')) return `https:${trimmed}`;
  const base = cdnUrl.endsWith('/') ? cdnUrl : `${cdnUrl}/`;
  return new URL(trimmed.replace(/^\/+/, ''), base).toString();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
