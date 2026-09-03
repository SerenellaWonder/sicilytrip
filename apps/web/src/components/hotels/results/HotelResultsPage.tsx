"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Loader2,
  MapPin,
  SearchX,
  Star,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/i18n/LanguageProvider";

import SearchExpiryNotice from "../SearchExpiryNotice";
import HotelPreviewImage from "./HotelPreviewImage";

type Hotel = {
  hotelId: string;
  giataId?: string;

  name: string;

  stars?: number;

  price?: number;
  currency?: string;

  supplier?: string;

  latitude?: number;
  longitude?: number;

  image?: string;

  zone?: string;

  room?: string;
  board?: string;
  policy?: string;
};

type HotelSearchResponse = {
  searchId: string;

  total: number;

  hotels: Hotel[];
};

export default function HotelResultsPage({
  searchId,
}: {
  searchId: string;
}) {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [data, setData] =
    useState<HotelSearchResponse | null>(
      null
    );

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

        const response =
          await apiFetch<HotelSearchResponse>(
            `/hotels/search/${encodeURIComponent(
              searchId
            )}`
          );

        if (!active) {
          return;
        }

        setData(response);
      } catch (err) {
        console.error(
          "Hotel search results error:",
          err
        );

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : isEnglish
                ? "Unable to load hotels."
                : "Impossibile caricare gli hotel."
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
  }, [isEnglish, searchId]);

  /*
   * LOADING
   */

  if (loading) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        aria-busy="true"
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F7F5F1]
          px-5
          pt-[110px]
        "
      >
        <div className="text-center">
          <Loader2
            size={30}
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
            {isEnglish
              ? "We are finding the best stays for you..."
              : "Stiamo cercando i migliori soggiorni per te..."}
          </p>
        </div>
      </main>
    );
  }

  /*
   * ERROR
   */

  if (error) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        aria-live="polite"
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F7F5F1]
          px-5
          pt-[110px]
        "
      >
        <div
          className="
            max-w-lg
            text-center
          "
        >
          <SearchX
            size={34}
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
              tracking-[-0.04em]
              text-[#0D2340]
            "
          >
            {isEnglish ? "Search unavailable" : "Ricerca non disponibile"}
          </h1>

          <p
            className="
              mt-3
              text-slate-500
            "
          >
            {error}
          </p>

          <Link
            href="/"
            className="
              mt-8
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-[#F58220]
              px-7
              py-3.5
              text-sm
              font-semibold
              text-white
              transition-colors

              hover:bg-[#FF9238]
            "
          >
            {isEnglish ? "New search" : "Nuova ricerca"}
          </Link>
        </div>
      </main>
    );
  }

  const hotels =
    data?.hotels ?? [];

  const destination =
    hotels.find(
      hotel =>
        hotel.zone?.toLowerCase() ===
        "taormina"
    )?.zone ??
    hotels[0]?.zone ??
    (isEnglish ? "Sicily" : "Sicilia");

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="
        min-h-screen
        bg-[#F7F5F1]
        pb-24
        pt-[115px]
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

        <Link
          href="/"
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

          {isEnglish ? "Edit search" : "Modifica ricerca"}
        </Link>

        <SearchExpiryNotice searchId={searchId} />

        {/* HEADER */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-5

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-[#F58220]
              "
            >
              SicilyTrip Hotels
            </span>

            <h1
              className="
                mt-3
                text-[38px]
                font-bold
                leading-[1]
                tracking-[-0.045em]
                text-[#0D2340]

                sm:text-[48px]
                lg:text-[54px]
              "
            >
              {isEnglish ? "Stays in" : "Soggiorni a"}{" "}
              {destination}
            </h1>

            <p
              className="
                mt-4
                text-sm
                leading-6
                text-slate-500
              "
            >
              {hotels.length === 1
                ? isEnglish
                  ? "1 property available"
                  : "1 struttura disponibile"
                : isEnglish
                  ? `${hotels.length} properties available`
                  : `${hotels.length} strutture disponibili`}
            </p>
          </div>

          <div
            className="
              rounded-full
              border
              border-[#0D2340]/10
              bg-white
              px-5
              py-3
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-[#0D2340]/50
            "
          >
            {isEnglish ? "Sorted by price" : "Ordinati per prezzo"}
          </div>
        </div>

        {/* EMPTY */}

        {hotels.length === 0 ? (
          <div
            className="
              mt-12
              rounded-[28px]
              bg-white
              px-6
              py-16
              text-center
            "
          >
            <SearchX
              size={32}
              className="
                mx-auto
                text-[#F58220]
              "
            />

            <h2
              className="
                mt-5
                text-2xl
                font-semibold
                text-[#0D2340]
              "
            >
              {isEnglish ? "No properties found" : "Nessuna struttura trovata"}
            </h2>

            <p
              className="
                mt-3
                text-sm
                text-slate-500
              "
            >
              {isEnglish
                ? "Try changing the dates, destination or number of guests."
                : "Prova a modificare date, destinazione o numero di ospiti."}
            </p>
          </div>
        ) : (
          <div
            className="
              mt-10
              grid
              gap-5
            "
          >
            {hotels.map(
              hotel => (
                <HotelResultCard
                  key={
                    hotel.hotelId
                  }
                  hotel={hotel}
                  searchId={searchId}
                  isEnglish={isEnglish}
                />
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   HOTEL CARD
========================================================= */

function HotelResultCard({
  hotel,
  searchId,
  isEnglish,
}: {
  hotel: Hotel;
  searchId: string;
  isEnglish: boolean;
}) {
  const price =
    formatPrice(
      hotel.price,
      hotel.currency,
      isEnglish ? "en-GB" : "it-IT",
    );

  const freeCancellation =
    hotel.policy === "FREE";

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[26px]
        border
        border-[#0D2340]/[0.07]
        bg-white

        shadow-[0_12px_40px_rgba(13,35,64,0.045)]

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:shadow-[0_18px_50px_rgba(13,35,64,0.08)]
      "
    >
      <div
        className="
          grid

          md:grid-cols-[260px_minmax(0,1fr)]
          lg:grid-cols-[300px_minmax(0,1fr)]
        "
      >
        {/* REAL PREVIEW IMAGE */}

        <div
          className="
            relative
            min-h-[220px]
            overflow-hidden

            md:min-h-full
          "
        >
          <HotelPreviewImage
            searchId={searchId}
            hotelId={
              hotel.hotelId
            }
            hotelName={
              hotel.name
            }
          />
        </div>

        {/* CONTENT */}

        <div
          className="
            flex
            flex-col
            justify-between
            gap-7
            p-6

            sm:p-7

            lg:flex-row
            lg:items-center
          "
        >
          <div
            className="
              min-w-0
              flex-1
            "
          >
            {/* STARS */}

            {hotel.stars ? (
              <div
                className="
                  flex
                  items-center
                  gap-1
                "
              >
                {Array.from({
                  length:
                    hotel.stars,
                }).map(
                  (
                    _,
                    index
                  ) => (
                    <Star
                      key={index}
                      size={13}
                      fill="currentColor"
                      className="
                        text-[#F58220]
                      "
                    />
                  )
                )}
              </div>
            ) : null}

            {/* NAME */}

            <h2
              className="
                mt-3
                text-[25px]
                font-semibold
                leading-tight
                tracking-[-0.035em]
                text-[#0D2340]

                sm:text-[28px]
              "
            >
              {hotel.name}
            </h2>

            {/* LOCATION */}

            {hotel.zone && (
              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-1.5
                  text-sm
                  text-slate-500
                "
              >
                <MapPin
                  size={14}
                  className="
                    text-[#F58220]
                  "
                />

                {hotel.zone}
              </div>
            )}

            {/* ROOM */}

            <div
              className="
                mt-5
                grid
                gap-2
                text-sm
                text-slate-600
              "
            >
              {hotel.room && (
                <p>
                  <span
                    className="
                      font-semibold
                      text-[#0D2340]
                    "
                  >
                    {isEnglish ? "Room:" : "Camera:"}
                  </span>{" "}
                  {hotel.room}
                </p>
              )}

              {hotel.board && (
                <p>
                  <span
                    className="
                      font-semibold
                      text-[#0D2340]
                    "
                  >
                    {isEnglish ? "Board:" : "Trattamento:"}
                  </span>{" "}
                  {hotel.board}
                </p>
              )}
            </div>

            {/* POLICY */}

            {hotel.policy && (
              <div
                className="
                  mt-5
                "
              >
                <span
                  className={`
                    inline-flex
                    rounded-full
                    px-3
                    py-1.5
                    text-[10px]
                    font-semibold

                    ${
                      freeCancellation
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  {freeCancellation
                    ? isEnglish
                      ? "Free cancellation"
                      : "Cancellazione gratuita"
                    : isEnglish
                      ? "Non-refundable"
                      : "Non rimborsabile"}
                </span>
              </div>
            )}
          </div>

          {/* PRICE / CTA */}

          <div
            className="
              shrink-0

              border-t
              border-slate-100

              pt-6

              lg:min-w-[210px]
              lg:border-l
              lg:border-t-0
              lg:pl-8
              lg:pt-0
              lg:text-right
            "
          >
            <span
              className="
                block
                text-[9px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-slate-400
              "
            >
              {isEnglish ? "From" : "A partire da"}
            </span>

            <strong
              className="
                mt-1
                block
                text-[30px]
                font-bold
                tracking-[-0.04em]
                text-[#0D2340]
              "
            >
              {price ??
                (isEnglish ? "On request" : "Su richiesta")}
            </strong>

            <span
              className="
                mt-1
                block
                text-[11px]
                text-slate-400
              "
            >
              {isEnglish ? "total stay" : "totale soggiorno"}
            </span>

            <a
              href={`/hotel/${encodeURIComponent(
                hotel.hotelId
              )}?searchId=${encodeURIComponent(
                searchId
              )}`}
              className="
                mt-5
                inline-flex
                h-11
                w-full
                items-center
                justify-center
                rounded-full
                bg-[#0D2340]
                px-6
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-white

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#173A63]
              "
            >
              {isEnglish ? "View availability" : "Vedi disponibilità"}
            </a>

            {hotel.supplier && (
              <span
                className="
                  mt-3
                  block
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-300
                "
              >
                {hotel.supplier}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function formatPrice(
  price?: number,
  currency = "EUR",
  locale = "it-IT",
) {
  if (price == null) {
    return null;
  }

  return new Intl.NumberFormat(
    locale,
    {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }
  ).format(price);
}
