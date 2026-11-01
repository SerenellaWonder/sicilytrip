"use client";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";
import { hotelCoordinates, hotelMapUrl } from "@/lib/hotel-location";
export default function HotelLocation({
  latitude,
  longitude,
  name,
  isEnglish,
}: {
  latitude: unknown;
  longitude: unknown;
  name: string;
  isEnglish: boolean;
}) {
  const { choices, allowExternalServices } = useCookieConsent();
  const point = hotelCoordinates(latitude, longitude);
  if (!point) return null;
  const { lat, lon } = point;
  const bbox = [
    Math.max(-180, lon - 0.015),
    Math.max(-90, lat - 0.01),
    Math.min(180, lon + 0.015),
    Math.min(90, lat + 0.01),
  ].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lon}`;
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-[#0D2340]">
        {isEnglish ? "Location" : "Dove si trova"}
      </h2>
      {choices.externalServices ? (
        <iframe
          title={`${isEnglish ? "Map" : "Mappa"}: ${name}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="mt-4 h-[340px] w-full rounded-2xl border border-slate-200"
        />
      ) : (
        <div className="mt-4 rounded-2xl bg-slate-100 p-8 text-center">
          <p className="text-sm text-slate-600">
            {isEnglish
              ? "Allow external services to load the OpenStreetMap interactive map."
              : "Autorizza i servizi esterni per caricare la mappa interattiva di OpenStreetMap."}
          </p>
          <button
            type="button"
            onClick={allowExternalServices}
            className="mt-4 rounded-full bg-[#0D2340] px-6 py-3 text-sm text-white"
          >
            {isEnglish ? "Allow and show map" : "Autorizza e mostra mappa"}
          </button>
        </div>
      )}
      <a
        href={hotelMapUrl(lat, lon)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-semibold text-[#0D2340] underline"
      >
        {isEnglish ? "Open larger map" : "Apri la mappa completa"}
      </a>
    </section>
  );
}
