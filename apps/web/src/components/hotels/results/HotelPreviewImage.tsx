"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/i18n/LanguageProvider";

type Detail = {
  PhotoGallery?: unknown;
  photoGallery?: unknown;
  payload?: { PhotoGallery?: unknown };
};
function galleryOf(detail: Detail): string[] {
  return [
    ...new Set(
      [detail.PhotoGallery, detail.photoGallery, detail.payload?.PhotoGallery]
        .flatMap((value) => (Array.isArray(value) ? value : []))
        .filter(
          (value): value is string =>
            typeof value === "string" && !!value.trim(),
        )
        .map((value) => value.trim()),
    ),
  ];
}

export default function HotelPreviewImage({
  searchId,
  hotelId,
  hotelName,
  previewImage,
}: {
  searchId: string;
  hotelId: string;
  hotelName: string;
  previewImage?: string;
}) {
  const { language } = useLanguage();
  const en = language === "en";
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [failed, setFailed] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  useEffect(() => {
    if (!container.current) return;
    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(timer);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    const controller = new AbortController();
    apiFetch<Detail>(
      `/hotels/search/${encodeURIComponent(searchId)}/hotel/${encodeURIComponent(hotelId)}`,
      { signal: controller.signal },
    )
      .then((detail) => {
        if (!controller.signal.aborted) {
          setImages(galleryOf(detail));
          setIndex(0);
        }
      })
      .catch(() => {
        /* Keep the search photo when details are unavailable. */
      });
    return () => controller.abort();
  }, [visible, searchId, hotelId]);
  const candidates = images.length
    ? images
    : previewImage
      ? [previewImage]
      : [];
  const available = candidates.filter((src) => !failed.includes(src));
  const current = available.length ? index % available.length : 0;
  const move = (direction: number) =>
    setIndex((current + direction + available.length) % available.length);
  return (
    <div
      ref={container}
      role="region"
      aria-label={`${en ? "Photos of" : "Foto di"} ${hotelName}`}
      className="absolute inset-0 overflow-hidden bg-slate-100"
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchX.current !== null && available.length > 1) {
          const distance = event.changedTouches[0].clientX - touchX.current;
          if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
        }
        touchX.current = null;
      }}
    >
      {available.length ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={available[current]}
            alt={`${hotelName} — ${en ? "photo" : "foto"} ${current + 1}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={() =>
              setFailed((previous) => [...previous, available[current]])
            }
          />
          {available.length > 1 && (
            <>
              <button
                type="button"
                aria-label={en ? "Previous photo" : "Foto precedente"}
                onClick={() => move(-1)}
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-[#0D2340] shadow-md hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                aria-label={en ? "Next photo" : "Foto successiva"}
                onClick={() => move(1)}
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-[#0D2340] shadow-md hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
          <span
            aria-live="polite"
            className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white"
          >
            {current + 1} / {available.length}
          </span>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-500">
          <ImageIcon size={28} />
          <span className="text-sm">
            {en ? "Photo unavailable" : "Foto non disponibile"}
          </span>
        </div>
      )}
    </div>
  );
}
