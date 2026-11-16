"use client";
import { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";
import { hotelCoordinates } from "@/lib/hotel-location";
import { type SearchArea, validArea } from "@/lib/hotel-search-area";
import type { HotelResult } from "@/types/hotel";

type Props = {
  hotels: HotelResult[];
  searchId: string;
  initialArea: SearchArea;
  selectedId?: string;
  onSelect: (id: string) => void;
  onSearch: (area: SearchArea) => void;
  searching: boolean;
  canSearch: boolean;
  isEnglish: boolean;
  error: string;
};
export default function HotelResultsMap(props: Props) {
  const { choices, allowExternalServices } = useCookieConsent();
  return (
    <section
      aria-label={props.isEnglish ? "Hotel map" : "Mappa hotel"}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {choices.externalServices ? (
        <InteractiveMap {...props} />
      ) : (
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold">
            {props.isEnglish ? "Hotels on the map" : "Hotel sulla mappa"}
          </h2>
          <p className="my-4 text-sm text-slate-600">
            {props.isEnglish
              ? "Allow external services to display OpenStreetMap."
              : "Autorizza i servizi esterni per visualizzare OpenStreetMap."}
          </p>
          <button
            type="button"
            onClick={allowExternalServices}
            className="rounded-full bg-[#0D2340] px-5 py-3 text-sm text-white"
          >
            {props.isEnglish
              ? "Allow and show map"
              : "Autorizza e mostra mappa"}
          </button>
        </div>
      )}
    </section>
  );
}
function InteractiveMap({
  hotels,
  searchId,
  initialArea,
  selectedId,
  onSelect,
  onSearch,
  searching,
  canSearch,
  isEnglish,
  error,
}: Props) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const engine = useRef<typeof Leaflet | null>(null);
  const markers = useRef<Leaflet.LayerGroup | null>(null);
  const circle = useRef<Leaflet.Circle | null>(null);
  const latest = useRef({ hotels, selectedId, onSelect, searchId, isEnglish });
  const [area, setArea] = useState(initialArea);
  const [ready, setReady] = useState(false);
  const [mapError, setMapError] = useState("");
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    latest.current = { hotels, selectedId, onSelect, searchId, isEnglish };
  }, [hotels, selectedId, onSelect, searchId, isEnglish]);
  useEffect(() => {
    let disposed = false;
    let resize: ResizeObserver | undefined;
    import("leaflet")
      .then((L) => {
        if (disposed || !container.current) return;
        engine.current = L;
        const map = L.map(container.current, {
          scrollWheelZoom: false,
          minZoom: 5,
          maxZoom: 18,
          maxBounds: [
            [-85, -180],
            [85, 180],
          ],
          maxBoundsViscosity: 1,
        }).setView([initialArea.lat, initialArea.lon], 12);
        mapRef.current = map;
        L.tileLayer(
          process.env.NEXT_PUBLIC_MAP_TILE_URL ||
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 18,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        )
          .on("tileerror", () =>
            setMapError(
              isEnglish
                ? "Map background temporarily unavailable. Hotel markers and list remain available."
                : "Sfondo della mappa temporaneamente non disponibile. Segnaposti ed elenco restano disponibili.",
            ),
          )
          .addTo(map);
        markers.current = L.layerGroup().addTo(map);
        circle.current = L.circle([initialArea.lat, initialArea.lon], {
          radius: initialArea.radiusKm * 1000,
          color: "#F58220",
          weight: 2,
          fillOpacity: 0.06,
        }).addTo(map);
        map.fitBounds(circle.current.getBounds(), {
          padding: [20, 20],
          maxZoom: 14,
        });
        const redraw = () => {
          const state = latest.current;
          markers.current?.clearLayers();
          const cells = new Map<string, HotelResult[]>();
          state.hotels.forEach((hotel) => {
            const point = hotelCoordinates(hotel.latitude, hotel.longitude);
            if (!point) return;
            const pixel = map.project([point.lat, point.lon], map.getZoom());
            const key = `${Math.floor(pixel.x / 65)}:${Math.floor(pixel.y / 55)}`;
            cells.set(key, [...(cells.get(key) ?? []), hotel]);
          });
          const price = (hotel: HotelResult) => {
            if (hotel.price == null || !Number.isFinite(hotel.price))
              return state.isEnglish ? "Hotel" : "Hotel";
            try {
              return new Intl.NumberFormat(
                state.isEnglish ? "en-GB" : "it-IT",
                {
                  style: "currency",
                  currency: hotel.currency || "EUR",
                  maximumFractionDigits: 0,
                },
              ).format(hotel.price);
            } catch {
              return String(hotel.price);
            }
          };
          cells.forEach((group) => {
            const lat =
              group.reduce((n, h) => n + h.latitude!, 0) / group.length;
            const lon =
              group.reduce((n, h) => n + h.longitude!, 0) / group.length;
            const badge = document.createElement("span");
            badge.textContent =
              group.length > 1 ? String(group.length) : price(group[0]);
            badge.className =
              "hotel-map-badge" +
              (group.some((h) => h.hotelId === state.selectedId)
                ? " hotel-map-selected"
                : "");
            const marker = L.marker([lat, lon], {
              icon: L.divIcon({
                html: badge,
                className: "hotel-map-marker",
                iconSize: group.length > 1 ? [38, 32] : [78, 32],
                iconAnchor: [39, 16],
              }),
              title:
                group.length > 1
                  ? `${group.length} hotel`
                  : `${group[0].name}: ${price(group[0])}`,
            }).addTo(markers.current!);
            const popup = document.createElement("div");
            popup.className = "hotel-map-popup";
            group.forEach((hotel) => {
              const row = document.createElement("div");
              row.style.marginBottom = "12px";
              const title = document.createElement("strong");
              title.textContent = hotel.name;
              row.append(title);
              const total = document.createElement("p");
              total.textContent = `${price(hotel)} · ${state.isEnglish ? "total stay" : "totale soggiorno"}`;
              row.append(total);
              const show = document.createElement("button");
              show.type = "button";
              show.textContent = state.isEnglish
                ? "Show in list"
                : "Mostra nell’elenco";
              show.onclick = () => {
                setExpanded(false);
                state.onSelect(hotel.hotelId);
              };
              show.className = "hotel-map-link";
              row.append(show);
              const link = document.createElement("a");
              link.href = `/hotel/${encodeURIComponent(hotel.hotelId)}?searchId=${encodeURIComponent(state.searchId)}`;
              link.textContent = state.isEnglish ? "View rooms" : "Vedi camere";
              link.className = "hotel-map-link";
              row.append(link);
              popup.append(row);
            });
            marker.bindPopup(popup, { maxHeight: 240 });
            if (group.length > 1 && map.getZoom() < 18)
              marker.on("click", () => {
                map.closePopup();
                map.setView([lat, lon], Math.min(18, map.getZoom() + 2));
              });
          });
        };
        map.on("moveend", () => {
          const center = map.getCenter();
          setArea((current) => ({
            ...current,
            lat: center.lat,
            lon: center.lng,
          }));
          redraw();
        });
        redraw();
        resize = new ResizeObserver(() => map.invalidateSize({ pan: false }));
        resize.observe(container.current);
        setReady(true);
      })
      .catch(() =>
        setMapError(
          isEnglish ? "Unable to load map." : "Impossibile caricare la mappa.",
        ),
      );
    return () => {
      disposed = true;
      resize?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // Initial area belongs to this search; a new search remounts the map.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (ready) mapRef.current?.fire("moveend");
  }, [hotels, selectedId, ready]);
  useEffect(() => {
    circle.current
      ?.setLatLng([area.lat, area.lon])
      .setRadius(area.radiusKm * 1000);
  }, [area]);
  useEffect(() => {
    if (!expanded) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [expanded]);
  const located = hotels.filter((h) =>
    hotelCoordinates(h.latitude, h.longitude),
  ).length;
  return (
    <div
      className={
        expanded
          ? "fixed inset-3 z-[80] overflow-auto rounded-2xl bg-white shadow-xl"
          : "relative"
      }
    >
      <div className="flex flex-wrap items-center gap-3 p-3">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          {expanded
            ? isEnglish
              ? "Reduce map"
              : "Riduci mappa"
            : isEnglish
              ? "Expand map"
              : "Espandi mappa"}
        </button>
        <label className="text-sm">
          {isEnglish ? "Radius" : "Raggio"}{" "}
          <select
            aria-label={isEnglish ? "Search radius" : "Raggio di ricerca"}
            value={area.radiusKm}
            onChange={(e) =>
              setArea({ ...area, radiusKm: Number(e.target.value) })
            }
            className="rounded-lg border p-2"
          >
            {[1, 2, 5, 10, 20, 50].map((km) => (
              <option value={km} key={km}>
                {km} km
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          disabled={!ready || !canSearch || searching || !validArea(area)}
          onClick={() => onSearch(area)}
          className="rounded-full bg-[#F58220] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {searching
            ? isEnglish
              ? "Searching…"
              : "Ricerca in corso…"
            : isEnglish
              ? "Search this area"
              : "Cerca in questa zona"}
        </button>
      </div>
      <p className="px-3 pb-3 text-xs text-slate-600">
        {isEnglish
          ? "Move the map to position the circle, select a radius and search. Prices are for the whole stay."
          : "Sposta la mappa per posizionare il cerchio, scegli il raggio e cerca. I prezzi sono per l’intero soggiorno."}
      </p>
      {!canSearch && (
        <p className="px-3 pb-3 text-sm text-amber-800">
          {isEnglish
            ? "Start a new search to set dates and guests before searching another area."
            : "Avvia una nuova ricerca con date e ospiti per cercare in un’altra zona."}
        </p>
      )}
      {(error || mapError) && (
        <p role="alert" className="px-3 pb-3 text-sm text-red-700">
          {error || mapError}
        </p>
      )}
      <div
        ref={container}
        role="region"
        aria-label={
          isEnglish ? "Interactive hotel map" : "Mappa interattiva hotel"
        }
        className={
          expanded
            ? "h-[calc(100dvh-220px)] min-h-[300px]"
            : "h-[440px] lg:h-[55vh]"
        }
        style={{ zIndex: 0 }}
      />
      <p className="p-3 text-xs text-slate-500">
        {isEnglish
          ? `${located} mapped · ${hotels.length - located} without coordinates`
          : `${located} sulla mappa · ${hotels.length - located} senza coordinate`}
      </p>
    </div>
  );
}
