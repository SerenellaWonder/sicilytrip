"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ImageIcon,
  Loader2,
} from "lucide-react";

import { apiFetch } from "@/lib/api";

type ProviderHotelDetail = {
  PhotoGallery?: string[];
};

type CachedHotelDetail = {
  photoGallery?: unknown;
  payload?: unknown;
};

type HotelDetailResponse =
  | ProviderHotelDetail
  | CachedHotelDetail;

function extractGallery(
  detail: HotelDetailResponse
): string[] {
  /*
   * Risposta diretta PartnerSolution:
   *
   * {
   *   PhotoGallery: [...]
   * }
   */
  if (
    "PhotoGallery" in detail &&
    Array.isArray(
      detail.PhotoGallery
    )
  ) {
    return detail.PhotoGallery.filter(
      (
        image
      ): image is string =>
        typeof image === "string" &&
        image.length > 0
    );
  }

  /*
   * Risposta proveniente dalla cache DB:
   *
   * {
   *   photoGallery: [...]
   * }
   */
  if (
    "photoGallery" in detail &&
    Array.isArray(
      detail.photoGallery
    )
  ) {
    return detail.photoGallery.filter(
      (
        image
      ): image is string =>
        typeof image === "string" &&
        image.length > 0
    );
  }

  /*
   * Ulteriore fallback:
   * eventuale payload persistito.
   */
  if (
    "payload" in detail &&
    detail.payload &&
    typeof detail.payload === "object"
  ) {
    const payload =
      detail.payload as {
        PhotoGallery?: unknown;
      };

    if (
      Array.isArray(
        payload.PhotoGallery
      )
    ) {
      return payload.PhotoGallery.filter(
        (
          image
        ): image is string =>
          typeof image === "string" &&
          image.length > 0
      );
    }
  }

  return [];
}

export default function HotelPreviewImage({
  searchId,
  hotelId,
  hotelName,
}: {
  searchId: string;
  hotelId: string;
  hotelName: string;
}) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [shouldLoad, setShouldLoad] =
    useState(false);

  const [image, setImage] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [failed, setFailed] =
    useState(false);

  /*
   * LAZY LOADING
   *
   * Partiamo quando la card entra
   * o sta per entrare nel viewport.
   */
  useEffect(() => {
    const element =
      containerRef.current;

    if (!element) {
      return;
    }

    if (
      typeof IntersectionObserver ===
      "undefined"
    ) {
      setShouldLoad(true);
      return;
    }

    const observer =
      new IntersectionObserver(
        entries => {
          const entry =
            entries[0];

          if (
            entry?.isIntersecting
          ) {
            setShouldLoad(true);

            observer.disconnect();
          }
        },
        {
          /*
           * Carichiamo poco prima
           * che la card diventi visibile.
           */
          rootMargin:
            "300px 0px",
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * HOTEL DETAILS
   */

  useEffect(() => {
    if (
      !shouldLoad ||
      image ||
      failed
    ) {
      return;
    }

    let active = true;

    async function loadPreview() {
      try {
        setLoading(true);

        const detail =
          await apiFetch<HotelDetailResponse>(
            `/hotels/search/${encodeURIComponent(
              searchId
            )}/hotel/${encodeURIComponent(
              hotelId
            )}`
          );

        if (!active) {
          return;
        }

        const gallery =
          extractGallery(detail);

        const preview =
          gallery[0] ?? null;

        if (preview) {
          setImage(preview);
        } else {
          setFailed(true);
        }
      } catch (error) {
        /*
         * La preview non deve mai
         * rompere la pagina risultati.
         *
         * Se il providerSearchId è
         * scaduto mostriamo semplicemente
         * il fallback SicilyTrip.
         */
        console.warn(
          `Preview non disponibile per ${hotelName}:`,
          error
        );

        if (active) {
          setFailed(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPreview();

    return () => {
      active = false;
    };
  }, [
    shouldLoad,
    image,
    failed,
    searchId,
    hotelId,
    hotelName,
  ]);

  return (
    <div
      ref={containerRef}
      className="
        absolute
        inset-0
        overflow-hidden
        bg-gradient-to-br
        from-[#173A61]
        to-[#07182D]
      "
    >
      {/* REAL IMAGE */}

      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={hotelName}
          loading="lazy"
          onError={() => {
            setImage(null);
            setFailed(true);
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover

            transition-transform
            duration-700

            group-hover:scale-[1.035]
          "
        />
      )}

      {/* IMAGE OVERLAY */}

      {image && (
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#07182D]/30
            via-transparent
            to-transparent
          "
        />
      )}

      {/* LOADER */}

      {!image &&
        loading && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            <Loader2
              size={22}
              className="
                animate-spin
                text-[#F58220]
              "
            />
          </div>
        )}

      {/* FALLBACK */}

      {!image &&
        !loading && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              px-6
              text-center
            "
          >
            <div>
              <ImageIcon
                size={22}
                className="
                  mx-auto
                  text-[#F58220]
                "
              />

              <span
                className="
                  mt-3
                  block
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#F58220]
                "
              >
                SicilyTrip
              </span>

              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  text-white/55
                "
              >
                Foto disponibili
                nella scheda hotel
              </p>
            </div>
          </div>
        )}
    </div>
  );
}