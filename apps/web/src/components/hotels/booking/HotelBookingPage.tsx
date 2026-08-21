"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  BedDouble,
  CheckCircle2,
  Coffee,
  Loader2,
  ShieldCheck,
} from "lucide-react";

type HotelRoomRate = {
  SelectCode: string;
  Rooms?: string[];
  Boards?: string[];
  CancellationPolicyCode?: string;
  Price?: number;
  Currency?: string;
  Supplier?: string;
};

export default function HotelBookingPage({
  searchId,
  hotelId,
  rateId,
}: {
  searchId: string;
  hotelId: string;
  rateId: string;
}) {
  const [rate, setRate] =
    useState<HotelRoomRate | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    try {
      const stored =
        sessionStorage.getItem(
          `hotel-rate:${searchId}:${hotelId}`
        );

      if (!stored) {
        return;
      }

      const parsed =
        JSON.parse(
          stored
        ) as HotelRoomRate;

      if (
        parsed.SelectCode !==
        rateId
      ) {
        return;
      }

      setRate(parsed);
    } catch (error) {
      console.error(
        "Unable to restore selected hotel rate:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, [
    searchId,
    hotelId,
    rateId,
  ]);

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F7F5F1]
          pt-[110px]
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
            Preparazione del riepilogo...
          </p>
        </div>
      </main>
    );
  }

  if (!rate) {
    return (
      <main
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
          <h1
            className="
              text-3xl
              font-bold
              text-[#0D2340]
            "
          >
            Tariffa non più disponibile
          </h1>

          <p
            className="
              mt-3
              text-slate-500
            "
          >
            Torna all&apos;hotel e seleziona
            nuovamente una tariffa.
          </p>

          <a
            href={`/hotel/${encodeURIComponent(
              hotelId
            )}?searchId=${encodeURIComponent(
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
            Torna alle camere
          </a>
        </div>
      </main>
    );
  }

  const price =
    formatPrice(
      rate.Price,
      rate.Currency
    );

  const freeCancellation =
    rate.CancellationPolicyCode ===
    "FREE";

  return (
    <main
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
          max-w-[1180px]
          px-5
          sm:px-8
          lg:px-10
        "
      >
        <a
          href={`/hotel/${encodeURIComponent(
            hotelId
          )}?searchId=${encodeURIComponent(
            searchId
          )}#rooms`}
          className="
            inline-flex
            items-center
            gap-2
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-[#0D2340]/45
          "
        >
          <ArrowLeft size={14} />

          Cambia tariffa
        </a>

        <div className="mt-8">
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
              text-[40px]
              font-bold
              tracking-[-0.045em]
              text-[#0D2340]
              sm:text-[52px]
            "
          >
            Il tuo soggiorno
          </h1>

          <p
            className="
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
            "
          >
            Controlla i dettagli della tariffa
            selezionata prima di continuare con
            la prenotazione.
          </p>
        </div>

        <div
          className="
            mt-10
            grid
            gap-7
            lg:grid-cols-[minmax(0,1fr)_360px]
          "
        >
          <section
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
                tracking-[0.2em]
                text-[#F58220]
              "
            >
              Tariffa selezionata
            </span>

            <div
              className="
                mt-6
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              <SummaryItem
                icon={
                  <BedDouble
                    size={17}
                  />
                }
                label="Camera"
                value={
                  rate.Rooms?.join(
                    ", "
                  ) ?? "Camera"
                }
              />

              <SummaryItem
                icon={
                  <Coffee
                    size={17}
                  />
                }
                label="Trattamento"
                value={
                  rate.Boards?.join(
                    ", "
                  ) ??
                  "Trattamento"
                }
              />
            </div>

            <div
              className="
                mt-6
                border-t
                border-slate-100
                pt-6
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >
                {freeCancellation ? (
                  <CheckCircle2
                    size={18}
                    className="
                      mt-0.5
                      text-emerald-600
                    "
                  />
                ) : (
                  <ShieldCheck
                    size={18}
                    className="
                      mt-0.5
                      text-slate-500
                    "
                  />
                )}

                <div>
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-[#0D2340]
                    "
                  >
                    {freeCancellation
                      ? "Cancellazione gratuita"
                      : "Tariffa non rimborsabile"}
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-slate-500
                    "
                  >
                    Le condizioni definitive saranno
                    riconfermate durante il prebook.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside
            className="
              h-fit
              rounded-[26px]
              bg-[#0D2340]
              p-7
              text-white
            "
          >
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white/45
              "
            >
              Totale soggiorno
            </span>

            <strong
              className="
                mt-2
                block
                text-[36px]
                font-bold
                tracking-[-0.04em]
              "
            >
              {price ??
                "Su richiesta"}
            </strong>

            <p
              className="
                mt-3
                text-xs
                leading-5
                text-white/55
              "
            >
              Il prezzo sarà riconfermato prima
              della prenotazione definitiva.
            </p>

            <button
              type="button"
              disabled
              className="
                mt-7
                inline-flex
                h-12
                w-full
                cursor-not-allowed
                items-center
                justify-center
                rounded-full
                bg-[#F58220]
                px-6
                text-[10px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-white
                opacity-60
              "
            >
              Continua
            </button>

            <p
              className="
                mt-3
                text-center
                text-[10px]
                leading-4
                text-white/40
              "
            >
              La conferma tariffa sarà attivata
              appena completata l&apos;integrazione
              PreBook.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        bg-[#F7F5F1]
        p-5
      "
    >
      <div
        className="
          text-[#F58220]
        "
      >
        {icon}
      </div>

      <span
        className="
          mt-4
          block
          text-[8px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-slate-400
        "
      >
        {label}
      </span>

      <p
        className="
          mt-1
          text-sm
          font-semibold
          leading-6
          text-[#0D2340]
        "
      >
        {value}
      </p>
    </div>
  );
}

function formatPrice(
  price?: number,
  currency = "EUR"
) {
  if (price == null) {
    return null;
  }

  return new Intl.NumberFormat(
    "it-IT",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }
  ).format(price);
}