"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  MapPin,
  SearchX,
  Star,
} from "lucide-react";

import { apiFetch } from "@/lib/api";

import SearchExpiryNotice from "../SearchExpiryNotice";
import HotelGallery from "./HotelGallery";
import HotelRooms from "./HotelRooms";

type HotelDescription = {
  Title: string;
  Description: string;
};

type HotelDetail = {
  Error?: string;
  Stars?: number;
  Category?: string;
  Name?: string;
  Zone?: string;
  Lat?: string;
  Lon?: string;
  Address?: string;
  PhotoGallery?: string[];
  photoGallery?: unknown;
  payload?: unknown;
  Descriptions?: HotelDescription[];
  Facilities?: string[];
};

type HotelRoomRate = {
  SelectCode: string;
  Rooms?: string[];
  Boards?: string[];
  CancellationPolicyCode?: string;
  Price?: number;
  Currency?: string;
  Supplier?: string;
};

type HotelRoomsResponse = {
  Rooms?: HotelRoomRate[];
};

export default function HotelDetailPage({
  searchId,
  hotelId,
}: {
  searchId: string;
  hotelId: string;
}) {
  const [detail, setDetail] =
    useState<HotelDetail | null>(
      null
    );

  const [rooms, setRooms] =
    useState<HotelRoomRate[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const [
          detailResponse,
          roomsResponse,
        ] = await Promise.all([
          apiFetch<HotelDetail>(
            `/hotels/search/${encodeURIComponent(
              searchId
            )}/hotel/${encodeURIComponent(
              hotelId
            )}`
          ),

          apiFetch<HotelRoomsResponse>(
            `/hotels/search/${encodeURIComponent(
              searchId
            )}/hotel/${encodeURIComponent(
              hotelId
            )}/rooms`
          ),
        ]);

        if (!active) {
          return;
        }

        setDetail(
          detailResponse
        );

        setRooms(
          roomsResponse.Rooms ?? []
        );
      } catch (err) {
        console.error(
          "Hotel detail error:",
          err
        );

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Impossibile caricare l'hotel."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [
    searchId,
    hotelId,
  ]);

  /*
   * Pulizia facilities.
   */
  const facilities =
    useMemo(
      () =>
        (
          detail?.Facilities ?? []
        )
          .map(item =>
            item.trim()
          )
          .filter(Boolean),
      [detail]
    );

  /*
   * Descrizione hotel pulita.
   */
  const description =
    useMemo(() => {
      const first =
        detail?.Descriptions?.[0]
          ?.Description;

      if (!first) {
        return "";
      }

      return cleanHotelDescription(
        first
      );
    }, [detail]);

  const gallery =
    useMemo(
      () =>
        extractHotelGallery(
          detail
        ),
      [detail]
    );

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F7F5F1]
          pt-24
        "
      >
        <div className="text-center">
          <Loader2
            size={28}
            className="
              mx-auto
              animate-spin
              text-[#F58220]
            "
          />

          <p
            className="
              mt-4
              text-sm
              text-slate-500
            "
          >
            Caricamento hotel...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error ||
    !detail
  ) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F7F5F1]
          px-5
          pt-24
        "
      >
        <div className="text-center">
          <SearchX
            size={32}
            className="
              mx-auto
              text-[#F58220]
            "
          />

          <h1
            className="
              mt-5
              text-3xl
              font-bold
              text-[#0D2340]
            "
          >
            Hotel non disponibile
          </h1>

          <p
            className="
              mt-3
              text-slate-500
            "
          >
            {error}
          </p>

          <a
            href={`/hotel?searchId=${encodeURIComponent(
              searchId
            )}`}
            className="
              mt-7
              inline-flex
              rounded-full
              bg-[#F58220]
              px-6
              py-3
              text-sm
              font-semibold
              text-white
            "
          >
            Torna ai risultati
          </a>
        </div>
      </div>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
        bg-[#F7F5F1]
        pb-24
        pt-[110px]
      "
    >
      <div
        className="
          mx-auto
          max-w-[1380px]
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* BACK */}

        <a
          href={`/hotel?searchId=${encodeURIComponent(
            searchId
          )}`}
          className="
            inline-flex
            items-center
            gap-2
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-[#0D2340]/45
            transition-colors

            hover:text-[#0D2340]
          "
        >
          <ArrowLeft
            size={14}
          />

          Torna ai risultati
        </a>

        <SearchExpiryNotice searchId={searchId} />

        {/* HOTEL HEADER */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-6

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            {/* STARS + CATEGORY */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              {detail.Stars && (
                <div
                  className="
                    flex
                    items-center
                    gap-1
                  "
                >
                  {Array.from({
                    length:
                      detail.Stars,
                  }).map(
                    (
                      _,
                      index
                    ) => (
                      <Star
                        key={index}
                        size={15}
                        fill="currentColor"
                        className="
                          text-[#F58220]
                        "
                      />
                    )
                  )}
                </div>
              )}

              {detail.Category && (
                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-slate-400
                  "
                >
                  {detail.Category}
                </span>
              )}
            </div>

            {/* NAME */}

            <h1
              className="
                mt-3
                max-w-[900px]
                text-[38px]
                font-bold
                leading-[1]
                tracking-[-0.045em]
                text-[#0D2340]

                sm:text-[52px]
                lg:text-[60px]
              "
            >
              {decodeHtmlEntities(
                detail.Name ??
                  "Hotel"
              )}
            </h1>

            {/* LOCATION */}

            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-x-4
                gap-y-2
                text-sm
                text-slate-500
              "
            >
              {detail.Zone && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                  "
                >
                  <MapPin
                    size={14}
                    className="
                      text-[#F58220]
                    "
                  />

                  {detail.Zone}
                </span>
              )}

              {detail.Address && (
                <span>
                  {decodeHtmlEntities(
                    detail.Address
                  )}
                </span>
              )}
            </div>
          </div>

          {/* ROOMS CTA */}

          <a
            href="#rooms"
            className="
              inline-flex
              h-12
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#F58220]
              px-7
              text-[10px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-white
              transition-colors

              hover:bg-[#FF9238]
            "
          >
            Vedi camere
          </a>
        </div>

        {/* GALLERY */}

        <div className="mt-9">
          <HotelGallery
            images={gallery}
            hotelName={
              decodeHtmlEntities(
                detail.Name ??
                  "Hotel"
              )
            }
          />
        </div>

        {/* DESCRIPTION + FACILITIES */}

        <div
          className="
            mt-14
            grid
            gap-12

            lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]
          "
        >
          {/* DESCRIPTION */}

          <div>
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#F58220]
              "
            >
              La struttura
            </span>

            <h2
              className="
                mt-3
                text-[30px]
                font-semibold
                tracking-[-0.035em]
                text-[#0D2340]
              "
            >
              Scopri il soggiorno
            </h2>

            {description ? (
              <p
                className="
                  mt-5
                  max-w-[850px]
                  whitespace-pre-line
                  text-[15px]
                  leading-8
                  text-slate-600
                "
              >
                {description}
              </p>
            ) : (
              <p
                className="
                  mt-5
                  text-slate-500
                "
              >
                Descrizione non disponibile.
              </p>
            )}
          </div>

          {/* FACILITIES */}

          <div
            className="
              rounded-[26px]
              bg-white
              p-7
              shadow-[0_12px_40px_rgba(13,35,64,0.05)]
            "
          >
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#F58220]
              "
            >
              Servizi
            </span>

            <h3
              className="
                mt-3
                text-2xl
                font-semibold
                tracking-[-0.03em]
                text-[#0D2340]
              "
            >
              In struttura
            </h3>

            {facilities.length >
            0 ? (
              <div
                className="
                  mt-6
                  grid
                  gap-3
                "
              >
                {facilities.map(
                  (
                    facility,
                    index
                  ) => (
                    <div
                      key={`${facility}-${index}`}
                      className="
                        flex
                        items-start
                        gap-3
                        text-sm
                        text-slate-600
                      "
                    >
                      <CheckCircle2
                        size={16}
                        className="
                          mt-0.5
                          shrink-0
                          text-[#F58220]
                        "
                      />

                      <span>
                        {decodeHtmlEntities(
                          facility
                        )}
                      </span>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p
                className="
                  mt-5
                  text-sm
                  text-slate-500
                "
              >
                Servizi non disponibili.
              </p>
            )}
          </div>
        </div>

        {/* ROOMS */}

        <section
          id="rooms"
          className="
            scroll-mt-[110px]
            pt-20
          "
        >
          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#F58220]
            "
          >
            Disponibilità
          </span>

          <h2
            className="
              mt-3
              text-[34px]
              font-semibold
              tracking-[-0.04em]
              text-[#0D2340]

              sm:text-[42px]
            "
          >
            Camere e tariffe
          </h2>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
            "
          >
            Seleziona la soluzione
            più adatta al tuo
            soggiorno.
          </p>

          <div className="mt-8">
            <HotelRooms
              rooms={rooms}
              searchId={searchId}
              hotelId={hotelId}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   HOTEL GALLERY EXTRACTOR
========================================================= */

function extractHotelGallery(
  detail: HotelDetail | null
): string[] {
  if (!detail) {
    return [];
  }

  const galleries: unknown[] = [
    detail.PhotoGallery,
    detail.photoGallery,
  ];

  if (
    detail.payload &&
    typeof detail.payload ===
      "object"
  ) {
    galleries.push(
      (
        detail.payload as {
          PhotoGallery?: unknown;
        }
      ).PhotoGallery
    );
  }

  for (const gallery of galleries) {
    if (Array.isArray(gallery)) {
      return gallery.filter(
        (
          image
        ): image is string =>
          typeof image ===
            "string" &&
          image.trim().length > 0
      );
    }
  }

  return [];
}

/* =========================================================
   DESCRIPTION CLEANER
========================================================= */

function cleanHotelDescription(
  value: string
) {
  if (!value) {
    return "";
  }

  let cleaned =
    value
      .replace(
        /<br\s*\/?>/gi,
        "\n"
      )
      .replace(
        /<\/p>/gi,
        "\n\n"
      )
      .replace(
        /<p[^>]*>/gi,
        ""
      )
      .replace(
        /<\/div>/gi,
        "\n"
      )
      .replace(
        /<div[^>]*>/gi,
        ""
      )
      .replace(
        /<[^>]+>/g,
        ""
      );

  /*
   * Alcune descrizioni arrivano
   * HTML-encoded più di una volta.
   */
  cleaned =
    decodeHtmlEntities(
      cleaned
    );

  cleaned =
    decodeHtmlEntities(
      cleaned
    );

  cleaned =
    cleaned
      .replace(
        /\r\n/g,
        "\n"
      )
      .replace(
        /\r/g,
        "\n"
      )
      .replace(
        /[ \t]+\n/g,
        "\n"
      )
      .replace(
        /\n[ \t]+/g,
        "\n"
      )
      .replace(
        /\n{3,}/g,
        "\n\n"
      )
      .trim();

  return cleaned;
}

/* =========================================================
   HTML ENTITY DECODER
========================================================= */

function decodeHtmlEntities(
  value: string
) {
  if (!value) {
    return "";
  }

  if (
    typeof document !==
    "undefined"
  ) {
    const textarea =
      document.createElement(
        "textarea"
      );

    textarea.innerHTML =
      value;

    return textarea.value;
  }

  return value
    .replace(
      /&amp;/g,
      "&"
    )
    .replace(
      /&apos;/g,
      "'"
    )
    .replace(
      /&#39;/g,
      "'"
    )
    .replace(
      /&quot;/g,
      '"'
    )
    .replace(
      /&lt;/g,
      "<"
    )
    .replace(
      /&gt;/g,
      ">"
    )
    .replace(
      /&nbsp;/g,
      " "
    );
}
