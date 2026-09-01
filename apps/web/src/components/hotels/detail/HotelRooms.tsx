"use client";

import { useRouter } from "next/navigation";

import {
  BedDouble,
  Check,
  Coffee,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/components/i18n/LanguageProvider";

type HotelRoomRate = {
  SelectCode: string;
  Rooms?: string[];
  Boards?: string[];
  CancellationPolicyCode?: string;
  Price?: number;
  Currency?: string;
  Supplier?: string;
};

export default function HotelRooms({
  rooms,
  searchId,
  hotelId,
}: {
  rooms: HotelRoomRate[];
  searchId: string;
  hotelId: string;
}) {
  const router = useRouter();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  if (!rooms.length) {
    return (
      <div
        className="
          rounded-[24px]
          border
          border-slate-200
          bg-white
          px-6
          py-12
          text-center
        "
      >
        <p
          className="
            font-semibold
            text-[#0D2340]
          "
        >
          {isEnglish ? "No rates available" : "Nessuna tariffa disponibile"}
        </p>
      </div>
    );
  }

  function selectRate(
    rate: HotelRoomRate
  ) {
    /*
     * Conserviamo la tariffa esatta
     * restituita da HotelRooms.
     *
     * Il SelectCode sarà poi utilizzato
     * dal prebook appena XMLTurismo ci
     * confermerà il payload corretto.
     */
    sessionStorage.setItem(
      `hotel-rate:${searchId}:${hotelId}`,
      JSON.stringify(rate)
    );

    router.push(
      `/hotel/${encodeURIComponent(
        hotelId
      )}/booking?searchId=${encodeURIComponent(
        searchId
      )}&rateId=${encodeURIComponent(
        rate.SelectCode
      )}`
    );
  }

  return (
    <div
      className="
        grid
        gap-4
      "
    >
      {rooms.map(rate => {
        const price =
          formatPrice(
            rate.Price,
            rate.Currency,
            isEnglish ? "en-GB" : "it-IT",
          );

        const freeCancellation =
          rate.CancellationPolicyCode ===
          "FREE";

        return (
          <article
            key={rate.SelectCode}
            className="
              rounded-[24px]
              border
              border-[#0D2340]/[0.08]
              bg-white
              p-6
              shadow-[0_10px_35px_rgba(13,35,64,0.05)]

              sm:p-7
            "
          >
            <div
              className="
                flex
                flex-col
                gap-6

                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              {/* ROOM INFO */}

              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                <div
                  className="
                    grid
                    gap-3

                    sm:grid-cols-2
                  "
                >
                  <Info
                    icon={
                      <BedDouble
                        size={16}
                      />
                    }
                    label={isEnglish ? "Room" : "Camera"}
                    value={
                      rate.Rooms?.join(
                        ", "
                      ) ?? (isEnglish ? "Room" : "Camera")
                    }
                  />

                  <Info
                    icon={
                      <Coffee
                        size={16}
                      />
                    }
                    label={isEnglish ? "Board" : "Trattamento"}
                    value={
                      rate.Boards?.join(
                        ", "
                      ) ??
                      (isEnglish ? "Board" : "Trattamento")
                    }
                  />
                </div>

                {/* POLICY */}

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
                >
                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-3
                      py-1.5
                      text-[11px]
                      font-semibold

                      ${
                        freeCancellation
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    {freeCancellation ? (
                      <Check
                        size={13}
                      />
                    ) : (
                      <ShieldCheck
                        size={13}
                      />
                    )}

                    {freeCancellation
                      ? isEnglish
                        ? "Free cancellation"
                        : "Cancellazione gratuita"
                      : isEnglish
                        ? "Non-refundable"
                        : "Non rimborsabile"}
                  </span>

                  {rate.Supplier && (
                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-slate-300
                      "
                    >
                      {rate.Supplier}
                    </span>
                  )}
                </div>
              </div>

              {/* PRICE */}

              <div
                className="
                  flex
                  shrink-0
                  flex-col
                  gap-4

                  sm:flex-row
                  sm:items-center

                  lg:flex-col
                  lg:items-end
                "
              >
                <div
                  className="
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
                    {isEnglish ? "Total stay" : "Totale soggiorno"}
                  </span>

                  <strong
                    className="
                      mt-1
                      block
                      text-[28px]
                      font-bold
                      tracking-[-0.04em]
                      text-[#0D2340]
                    "
                  >
                    {price ??
                      (isEnglish ? "On request" : "Su richiesta")}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    selectRate(rate)
                  }
                  className="
                    inline-flex
                    h-12
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

                    transition-all
                    duration-200

                    hover:-translate-y-0.5
                    hover:bg-[#FF9238]
                  "
                >
                  {isEnglish ? "Select rate" : "Seleziona tariffa"}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* =========================================================
   INFO
========================================================= */

function Info({
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
        items-start
        gap-3
        rounded-xl
        bg-[#F7F5F1]
        px-4
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

      <div>
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
            mt-1
            block
            text-sm
            font-medium
            text-[#0D2340]
          "
        >
          {value}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   PRICE
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
      maximumFractionDigits: 2,
    }
  ).format(price);
}
