"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import {
  Calendar,
  ChevronDown,
  Loader2,
  MapPin,
  Minus,
  Plus,
  Search,
  Users,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { destinationCatalog } from "@/data/destinations";

import type { Destination, HotelSearchResponse } from "@/types/hotel";

/* =========================================================
   TYPES
========================================================= */

type SearchBoxInitialValues = {
  destination: Destination;
  checkIn: string;
  checkOut: string;
  adults?: number;
  children?: number;
  rooms?: RoomGuests[];
};

type RoomGuests = {
  adults: number;
  children: number;
};

type SearchBoxProps = {
  initialValues?: SearchBoxInitialValues;
};

/* =========================================================
   SEARCH BOX
========================================================= */

export default function SearchBox({ initialValues }: SearchBoxProps) {
  const router = useRouter();

  const destinationRef = useRef<HTMLDivElement>(null);

  const guestsRef = useRef<HTMLDivElement>(null);

  /*
   * SEARCH STATE
   */

  const [destinationQuery, setDestinationQuery] = useState(
    initialValues?.destination.name ?? "",
  );

  const [destination, setDestination] = useState<Destination | null>(
    initialValues?.destination ?? null,
  );

  const [suggestions, setSuggestions] = useState<Destination[]>([]);

  const [loadingDestinations, setLoadingDestinations] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [showGuests, setShowGuests] = useState(false);

  const [checkIn, setCheckIn] = useState(initialValues?.checkIn ?? "");

  const [checkOut, setCheckOut] = useState(initialValues?.checkOut ?? "");

  const [rooms, setRooms] = useState<RoomGuests[]>(
    initialValues?.rooms ?? [
      {
        adults: initialValues?.adults ?? 2,
        children: initialValues?.children ?? 0,
      },
    ],
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /*
   * AUTOCOMPLETE DESTINAZIONE
   */

  useEffect(() => {
    if (destination && destinationQuery === destination.name) {
      return;
    }

    const query = destinationQuery.trim();

    if (query.length < 2) {
      return;
    }

    const localSuggestions = getLocalDestinationSuggestions(query);

    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      setSuggestions(localSuggestions);
      setShowSuggestions(localSuggestions.length > 0);

      try {
        setLoadingDestinations(true);

        const results = await apiFetch<Destination[]>(
          `/places/autocomplete?q=${encodeURIComponent(query)}`,
          {
            signal: controller.signal,
          },
        );

        setSuggestions(results.length > 0 ? results : localSuggestions);

        setShowSuggestions(true);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        console.error("Destination autocomplete error:", err);

        setSuggestions(localSuggestions);
        setShowSuggestions(localSuggestions.length > 0);
      } finally {
        setLoadingDestinations(false);
      }
    }, 350);

    return () => {
      window.clearTimeout(timer);

      controller.abort();
    };
  }, [destinationQuery, destination]);

  /*
   * CHIUSURA DROPDOWN
   */

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;

      if (destinationRef.current && !destinationRef.current.contains(target)) {
        setShowSuggestions(false);
      }

      if (guestsRef.current && !guestsRef.current.contains(target)) {
        setShowGuests(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /*
   * DESTINATION
   */

  function selectDestination(item: Destination) {
    setDestination(item);

    setDestinationQuery(item.name);

    setSuggestions([]);

    setShowSuggestions(false);

    setError("");
  }

  /*
   * SEARCH
   */

  async function handleSearch() {
    setError("");

    if (!destination) {
      setError("Seleziona una destinazione dai suggerimenti.");

      return;
    }

    if (!checkIn) {
      setError("Seleziona la data di check-in.");

      return;
    }

    if (!checkOut) {
      setError("Seleziona la data di check-out.");

      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Il check-out deve essere successivo al check-in.");

      return;
    }

    try {
      setLoading(true);

      const response = await apiFetch<HotelSearchResponse>("/hotels/search", {
        method: "POST",

        body: JSON.stringify({
          placeId: destination.id,

          northEast: `${destination.northEast.latitude},${destination.northEast.longitude}`,

          southWest: `${destination.southWest.latitude},${destination.southWest.longitude}`,

          checkIn,

          checkOut,

          rooms,
        }),
      });

      if (response.status === "FAILED") {
        throw new Error(
          "La ricerca non è stata completata. Riprova tra qualche istante.",
        );
      }

      /*
       * Salviamo il contesto completo
       * della ricerca.
       *
       * Questo permette alla pagina
       * risultati di ricostruire:
       *
       * - destinazione
       * - check-in
       * - check-out
       * - adulti
       * - bambini
       */

      sessionStorage.setItem(
        `hotel-search:${response.searchId}`,
        JSON.stringify({
          ...response,

          createdAt: Date.now(),
          expiresAt: Date.now() + 20 * 60 * 1000,

          search: {
            destination,
            checkIn,
            checkOut,
            rooms,
            adults: rooms.reduce((total, room) => total + room.adults, 0),
            children: rooms.reduce((total, room) => total + room.children, 0),
          },
        }),
      );

      router.push(`/hotel?searchId=${encodeURIComponent(response.searchId)}`);
    } catch (err) {
      console.error("Hotel search error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Impossibile effettuare la ricerca.",
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * DATE
   */

  const today = new Date().toISOString().split("T")[0];

  /*
   * GUEST LABEL
   */

  const totalAdults = rooms.reduce((total, room) => total + room.adults, 0);
  const totalChildren = rooms.reduce((total, room) => total + room.children, 0);
  const guestsLabel = `${rooms.length} ${rooms.length === 1 ? "camera" : "camere"}, ${totalAdults} ${totalAdults === 1 ? "adulto" : "adulti"}${
    totalChildren > 0
      ? `, ${totalChildren} ${totalChildren === 1 ? "bambino" : "bambini"}`
      : ""
  }`;

  function updateRoom(
    roomIndex: number,
    field: keyof RoomGuests,
    value: number,
  ) {
    setRooms((current) =>
      current.map((room, index) =>
        index === roomIndex ? { ...room, [field]: value } : room,
      ),
    );
  }

  return (
    <div className="relative">
      <div
        className="
          rounded-[22px]
          bg-white
          p-3
          shadow-[0_20px_50px_rgba(0,0,0,.12)]
        "
      >
        <div
          className="
            grid
            gap-0

            lg:grid-cols-[2fr_1fr_1fr_1fr_150px]
            lg:items-center
          "
        >
          {/* DESTINATION */}

          <div
            ref={destinationRef}
            className="
              relative
              border-b
              border-slate-200

              lg:border-b-0
              lg:border-r
            "
          >
            <div
              className="
                flex
                h-[64px]
                items-center
                gap-3
                px-5
              "
            >
              <MapPin
                size={18}
                className="
                  shrink-0
                  text-slate-500
                "
              />

              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                <span
                  className="
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-slate-400
                  "
                >
                  Destinazione
                </span>

                <input
                  value={destinationQuery}
                  onChange={(event) => {
                    setDestinationQuery(event.target.value);

                    setDestination(null);

                    setSuggestions([]);
                    setShowSuggestions(false);

                    setError("");
                  }}
                  onFocus={() => {
                    if (suggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  placeholder="Dove vuoi andare?"
                  autoComplete="off"
                  className="
                    mt-0.5
                    w-full
                    bg-transparent
                    text-[14px]
                    font-medium
                    text-[#0D2340]
                    outline-none
                    placeholder:font-normal
                    placeholder:text-slate-500
                  "
                />
              </div>

              {loadingDestinations && (
                <Loader2
                  size={16}
                  className="
                    shrink-0
                    animate-spin
                    text-[#F58220]
                  "
                />
              )}
            </div>

            {/* AUTOCOMPLETE */}

            {showSuggestions && (
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-[70px]
                  z-50

                  overflow-hidden
                  rounded-2xl

                  border
                  border-slate-100

                  bg-white

                  shadow-[0_18px_50px_rgba(13,35,64,0.18)]
                "
              >
                {suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectDestination(item)}
                      className="
                          flex
                          w-full
                          items-start
                          gap-3

                          border-b
                          border-slate-100

                          px-5
                          py-4

                          text-left

                          transition-colors

                          last:border-b-0

                          hover:bg-slate-50
                        "
                    >
                      <div
                        className="
                            mt-0.5
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#F58220]/10
                            text-[#F58220]
                          "
                      >
                        <MapPin size={15} />
                      </div>

                      <div
                        className="
                            min-w-0
                          "
                      >
                        <span
                          className="
                              block
                              text-sm
                              font-semibold
                              text-[#0D2340]
                            "
                        >
                          {item.name}
                        </span>

                        <span
                          className="
                              mt-0.5
                              block
                              truncate
                              text-xs
                              text-slate-500
                            "
                        >
                          {item.displayName}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div
                    className="
                      px-5
                      py-4
                      text-sm
                      text-slate-500
                    "
                  >
                    Nessuna destinazione trovata.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* CHECK IN */}

          <DateField
            label="Check-in"
            value={checkIn}
            min={today}
            onChange={(value) => {
              setCheckIn(value);

              if (checkOut && value >= checkOut) {
                setCheckOut("");
              }

              setError("");
            }}
          />

          {/* CHECK OUT */}

          <DateField
            label="Check-out"
            value={checkOut}
            min={checkIn || today}
            onChange={(value) => {
              setCheckOut(value);
              setError("");
            }}
          />

          {/* GUESTS */}

          <div
            ref={guestsRef}
            className="
              relative
              border-b
              border-slate-200

              lg:border-b-0
              lg:border-r
            "
          >
            <button
              type="button"
              onClick={() => setShowGuests((current) => !current)}
              className="
                flex
                h-[64px]
                w-full
                items-center
                gap-3
                px-5
                text-left
              "
            >
              <Users
                size={18}
                className="
                  shrink-0
                  text-slate-500
                "
              />

              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                <span
                  className="
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-slate-400
                  "
                >
                  Ospiti
                </span>

                <span
                  className="
                    mt-0.5
                    block
                    truncate
                    text-[14px]
                    font-medium
                    text-[#0D2340]
                  "
                >
                  {guestsLabel}
                </span>
              </div>

              <ChevronDown
                size={15}
                className="
                  shrink-0
                  text-slate-400
                "
              />
            </button>

            {/* GUEST DROPDOWN */}

            {showGuests && (
              <div
                className="
                  absolute
                  right-0
                  top-[70px]
                  z-50
                  w-[290px]

                  rounded-2xl
                  border
                  border-slate-100
                  bg-white

                  p-5

                  shadow-[0_18px_50px_rgba(13,35,64,0.18)]
                "
              >
                {rooms.map((room, roomIndex) => (
                  <div
                    key={`room-${roomIndex}`}
                    className="border-b border-slate-100 py-4 first:pt-0 last:border-b-0"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <strong className="text-xs text-[#0D2340]">
                        Camera {roomIndex + 1}
                      </strong>
                      {rooms.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setRooms((current) =>
                              current.filter((_, index) => index !== roomIndex),
                            )
                          }
                          className="text-[10px] font-semibold uppercase tracking-[0.1em] text-red-500"
                        >
                          Rimuovi
                        </button>
                      )}
                    </div>
                    <GuestRow
                      label="Adulti"
                      description="Da 18 anni"
                      value={room.adults}
                      minimum={1}
                      maximum={6}
                      onChange={(value) =>
                        updateRoom(roomIndex, "adults", value)
                      }
                    />
                    <div className="my-4 h-px bg-slate-100" />
                    <GuestRow
                      label="Bambini"
                      description="0 – 17 anni"
                      value={room.children}
                      minimum={0}
                      maximum={3}
                      onChange={(value) =>
                        updateRoom(roomIndex, "children", value)
                      }
                    />
                  </div>
                ))}

                {rooms.length < 3 && (
                  <button
                    type="button"
                    onClick={() =>
                      setRooms((current) => [
                        ...current,
                        { adults: 2, children: 0 },
                      ])
                    }
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-[#0D2340]/10 px-4 py-3 text-xs font-semibold text-[#0D2340] hover:border-[#F58220]/40"
                  >
                    <Plus size={15} className="mr-2 text-[#F58220]" />
                    Aggiungi camera
                  </button>
                )}
              </div>
            )}
          </div>

          {/* SEARCH BUTTON */}

          <div
            className="
              p-2
              lg:p-0
              lg:pl-3
            "
          >
            <button
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className="
                flex
                h-[56px]
                w-full
                items-center
                justify-center
                gap-2

                rounded-xl
                bg-[#F58220]

                px-5

                text-sm
                font-semibold
                text-white

                transition-all
                duration-300

                hover:bg-[#FF9238]

                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="
                      animate-spin
                    "
                  />
                  Cerco...
                </>
              ) : (
                <>
                  <Search size={17} />
                  Cerca
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div
          className="
            mt-3
            rounded-xl
            border
            border-red-100
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700
          "
        >
          {error}
        </div>
      )}

      {/* LOADING MESSAGE */}

      {loading && (
        <p
          className="
            mt-3
            text-center
            text-xs
            text-slate-500
          "
        >
          Stiamo cercando le migliori disponibilità per te. Potrebbero essere
          necessari alcuni secondi.
        </p>
      )}
    </div>
  );
}

function getLocalDestinationSuggestions(query: string): Destination[] {
  const normalizedQuery = normalizeSearchText(query);

  return destinationCatalog
    .filter((item) =>
      normalizeSearchText(
        `${item.name} ${item.area} ${item.province} ${item.macroArea}`,
      ).includes(normalizedQuery),
    )
    .slice(0, 8)
    .map((item) => ({
      id: `catalog-${item.id}`,
      slug: item.id,
      name: item.name,
      displayName: `${item.name}, ${item.province}, Sicilia`,
      region: "Sicilia",
      province: item.province,
      country: "Italia",
      latitude: item.latitude,
      longitude: item.longitude,
      northEast: {
        latitude: item.latitude + 0.18,
        longitude: item.longitude + 0.22,
      },
      southWest: {
        latitude: item.latitude - 0.18,
        longitude: item.longitude - 0.22,
      },
    }));
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/* =========================================================
   DATE FIELD
========================================================= */

function DateField({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: string;
  min: string;
  onChange: (value: string) => void;
}) {
  return (
    <label
      className="
        flex
        h-[64px]
        cursor-pointer
        items-center
        gap-3

        border-b
        border-slate-200

        px-5

        lg:border-b-0
        lg:border-r
      "
    >
      <Calendar
        size={18}
        className="
          shrink-0
          text-slate-500
        "
      />

      <div
        className="
          min-w-0
          flex-1
        "
      >
        <span
          className="
            block
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-slate-400
          "
        >
          {label}
        </span>

        <input
          type="date"
          value={value}
          min={min}
          onChange={(event) => onChange(event.target.value)}
          className="
            mt-0.5
            w-full
            bg-transparent
            text-[14px]
            font-medium
            text-[#0D2340]
            outline-none
          "
        />
      </div>
    </label>
  );
}

/* =========================================================
   GUEST ROW
========================================================= */

function GuestRow({
  label,
  description,
  value,
  minimum,
  maximum,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  minimum: number;
  maximum: number;
  onChange: (value: number) => void;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5
      "
    >
      <div>
        <p
          className="
            text-sm
            font-semibold
            text-[#0D2340]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            text-xs
            text-slate-400
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <button
          type="button"
          disabled={value <= minimum}
          onClick={() => onChange(Math.max(minimum, value - 1))}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full

            border
            border-slate-200

            text-[#0D2340]

            transition-colors

            hover:border-[#F58220]
            hover:text-[#F58220]

            disabled:cursor-not-allowed
            disabled:opacity-30
          "
        >
          <Minus size={14} />
        </button>

        <span
          className="
            w-5
            text-center
            text-sm
            font-semibold
            text-[#0D2340]
          "
        >
          {value}
        </span>

        <button
          type="button"
          disabled={value >= maximum}
          onClick={() => onChange(Math.min(maximum, value + 1))}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full

            border
            border-slate-200

            text-[#0D2340]

            transition-colors

            hover:border-[#F58220]
            hover:text-[#F58220]

            disabled:cursor-not-allowed
            disabled:opacity-30
          "
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
