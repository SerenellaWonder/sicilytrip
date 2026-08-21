"use client";

import {
  ArrowUpRight,
  BedDouble,
  Check,
  Coffee,
  MapPin,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";

import type { HotelResult } from "@/types/hotel";

function formatPrice(
  price?: number,
  currency = "EUR"
) {
  if (price == null) {
    return null;
  }

  try {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${Math.round(price)} ${currency}`;
  }
}

function getPolicyLabel(policy?: string) {
  if (!policy) {
    return null;
  }

  const normalized =
    policy.toUpperCase();

  if (normalized === "FREE") {
    return {
      label: "Cancellazione gratuita",
      free: true,
    };
  }

  if (normalized === "NRF") {
    return {
      label: "Non rimborsabile",
      free: false,
    };
  }

  return {
    label: policy,
    free: false,
  };
}

function normalizeBoard(board?: string) {
  if (!board) {
    return null;
  }

  return (
    board.charAt(0).toUpperCase() +
    board.slice(1)
  );
}

export default function HotelCard({
  hotel,
  searchId,
}: {
  hotel: HotelResult;
  searchId: string;
}) {
  const price = formatPrice(
    hotel.price,
    hotel.currency
  );

  const policy =
    getPolicyLabel(hotel.policy);

  const board =
    normalizeBoard(hotel.board);

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[26px]
        border
        border-[#0D2340]/[0.08]
        bg-white
        shadow-[0_12px_40px_rgba(13,35,64,0.055)]
        transition-all
        duration-500

        hover:-translate-y-1
        hover:border-[#0D2340]/[0.12]
        hover:shadow-[0_24px_60px_rgba(13,35,64,0.10)]

        lg:grid
        lg:grid-cols-[290px_minmax(0,1fr)]
      "
    >
      {/* IMAGE / TEMPORARY FALLBACK */}

      <div
        className="
          relative
          min-h-[220px]
          overflow-hidden
          bg-[#0D2340]

          sm:min-h-[250px]
          lg:min-h-[280px]
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-[#173A61]
            via-[#0D2948]
            to-[#07182D]
          "
        />

        <div
          className="
            absolute
            -right-14
            -top-14
            h-40
            w-40
            rounded-full
            border
            border-white/[0.06]
          "
        />

        <div
          className="
            absolute
            -bottom-20
            -left-16
            h-52
            w-52
            rounded-full
            border
            border-white/[0.05]
          "
        />

        <div
          className="
            relative
            flex
            h-full
            min-h-[220px]
            flex-col
            justify-between
            p-6

            sm:min-h-[250px]
            lg:min-h-[280px]
          "
        >
          <div className="flex items-start justify-between">
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.26em]
                text-[#F58220]
              "
            >
              SicilyTrip
            </span>

            {hotel.stars && (
              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-white/[0.10]
                  px-3
                  py-1.5
                  backdrop-blur-md
                "
              >
                <Star
                  size={12}
                  fill="currentColor"
                  className="text-[#F58220]"
                />

                <span
                  className="
                    text-xs
                    font-bold
                    text-white
                  "
                >
                  {hotel.stars}
                </span>
              </div>
            )}
          </div>

          <div>
            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white/35
              "
            >
              Immagine in arrivo
            </span>

            <p
              className="
                mt-2
                max-w-[220px]
                text-lg
                font-medium
                leading-tight
                text-white/75
              "
            >
              {hotel.name}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          flex
          min-w-0
          flex-col
          p-6

          sm:p-7
          lg:p-8
        "
      >
        {/* LOCATION */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-x-4
            gap-y-2
          "
        >
          {hotel.zone && (
            <div
              className="
                flex
                items-center
                gap-1.5
                text-xs
                font-medium
                text-slate-500
              "
            >
              <MapPin
                size={14}
                className="text-[#F58220]"
              />

              {hotel.zone}
            </div>
          )}

          {hotel.supplier && (
            <span
              className="
                text-[9px]
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

        {/* NAME */}

        <h2
          className="
            mt-3
            text-[26px]
            font-semibold
            leading-[1.08]
            tracking-[-0.035em]
            text-[#0D2340]

            sm:text-[29px]
          "
        >
          {hotel.name}
        </h2>

        {/* HOTEL INFORMATION */}

        <div
          className="
            mt-5
            grid
            gap-2.5

            sm:grid-cols-2
          "
        >
          {hotel.room && (
            <InfoItem
              icon={
                <BedDouble size={15} />
              }
              label="Camera"
              value={hotel.room}
            />
          )}

          {board && (
            <InfoItem
              icon={
                <Coffee size={15} />
              }
              label="Trattamento"
              value={board}
            />
          )}
        </div>

        {/* POLICY */}

        {policy && (
          <div
            className={`
              mt-4
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              px-3
              py-1.5
              text-[11px]
              font-semibold

              ${
                policy.free
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }
            `}
          >
            {policy.free ? (
              <Check size={13} />
            ) : (
              <X size={13} />
            )}

            {policy.label}
          </div>
        )}

        {/* PRICE / CTA */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-5
            border-t
            border-slate-100
            pt-5

            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            {price ? (
              <>
                <span
                  className="
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-slate-400
                  "
                >
                  A partire da
                </span>

                <div
                  className="
                    mt-1
                    flex
                    items-baseline
                    gap-2
                  "
                >
                  <span
                    className="
                      text-[29px]
                      font-bold
                      tracking-[-0.04em]
                      text-[#0D2340]
                    "
                  >
                    {price}
                  </span>

                  <span
                    className="
                      text-[11px]
                      text-slate-400
                    "
                  >
                    totale
                  </span>
                </div>
              </>
            ) : (
              <span
                className="
                  text-sm
                  font-medium
                  text-slate-500
                "
              >
                Prezzo su richiesta
              </span>
            )}
          </div>

          <a
            href={`/hotel/${encodeURIComponent(
              hotel.hotelId
            )}?searchId=${encodeURIComponent(
              searchId
            )}`}
            className="
              group/button
              inline-flex
              h-12
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[#0D2340]
              px-6
              text-[10px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-white
              transition-all
              duration-300

              hover:bg-[#F58220]
            "
          >
            Vedi disponibilità

            <ArrowUpRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover/button:translate-x-0.5
                group-hover/button:-translate-y-0.5
              "
            />
          </a>
        </div>
      </div>
    </article>
  );
}

function InfoItem({
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
        flex
        min-w-0
        items-start
        gap-3
        rounded-xl
        bg-[#F7F5F1]
        px-3.5
        py-3
      "
    >
      <div
        className="
          mt-0.5
          shrink-0
          text-[#F58220]
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <span
          className="
            block
            text-[8px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-slate-400
          "
        >
          {label}
        </span>

        <span
          className="
            mt-0.5
            block
            truncate
            text-xs
            font-medium
            text-[#0D2340]
          "
          title={value}
        >
          {value}
        </span>
      </div>
    </div>
  );
}