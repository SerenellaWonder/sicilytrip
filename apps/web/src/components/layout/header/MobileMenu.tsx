"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  IconMenu2,
  IconSparkles,
  IconX,
} from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";

const items = [
  {
    label: "Destinazioni",
    href: "/destinazioni",
    pathname: "/destinazioni",
  },
  {
    label: "Esperienze",
    href: "/esperienze",
    pathname: "/esperienze",
  },
  {
    label: "Chi siamo",
    href: "/chi-siamo",
    pathname: "/chi-siamo",
  },
  {
    label: "Journal",
    href: "/journal",
    pathname: "/journal",
  },
  {
    label: "Contatti",
    href: "/#footer",
  },
];

type MobileMenuProps = {
  solidHeader: boolean;
  pathname: string;
};

export default function MobileMenu({
  solidHeader,
  pathname,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const { openConcierge } = useConcierge();

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  function handleConcierge() {
    setOpen(false);

    openConcierge(
      "Aiutami a organizzare il mio viaggio in Sicilia"
    );
  }

  return (
    <>
      {/* =====================================================
          HAMBURGER
      ===================================================== */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Apri menu"
        aria-expanded={open}
        className={`
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          lg:hidden

          ${
            solidHeader
              ? `
                bg-[#0D2340]/[0.06]
                text-[#0D2340]
              `
              : `
                border
                border-white/20
                bg-white/10
                text-white
                backdrop-blur-md
              `
          }
        `}
      >
        <IconMenu2
          size={23}
          stroke={1.8}
        />
      </button>

      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[80]
          bg-[#07182D]/60
          backdrop-blur-sm
          transition-all
          duration-300
          lg:hidden

          ${
            open
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
        onClick={closeMenu}
      />

      {/* =====================================================
          PANEL
      ===================================================== */}

      <div
        className={`
          fixed
          right-0
          top-0
          z-[90]
          flex
          h-[100dvh]
          w-[88%]
          max-w-[390px]
          flex-col
          bg-[#07182D]
          px-7
          pb-8
          pt-6
          text-white
          shadow-[-20px_0_60px_rgba(0,0,0,0.25)]
          transition-transform
          duration-500
          ease-out
          lg:hidden

          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* ===================================================
            TOP
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#F58220]
            "
          >
            SicilyTrip
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Chiudi menu"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-white/[0.06]
              text-white
            "
          >
            <IconX
              size={22}
              stroke={1.7}
            />
          </button>
        </div>

        {/* ===================================================
            NAV
        =================================================== */}

        <nav
          className="
            mt-14
            flex
            flex-col
          "
        >
          {items.map((item, index) => {
            const active =
              item.pathname &&
              (
                pathname === item.pathname ||
                pathname.startsWith(`${item.pathname}/`)
              );

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  py-5
                "
              >
                <span
                  className={`
                    text-[26px]
                    font-semibold
                    tracking-[-0.03em]
                    transition-colors
                    duration-300

                    ${
                      active
                        ? "text-[#F58220]"
                        : "text-white group-hover:text-[#F58220]"
                    }
                  `}
                >
                  {item.label}
                </span>

                <span
                  className={`
                    text-[10px]
                    font-semibold
                    tracking-[0.18em]

                    ${
                      active
                        ? "text-[#F58220]"
                        : "text-white/25"
                    }
                  `}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ===================================================
            BOTTOM
        =================================================== */}

        <div className="mt-auto">
          <button
            type="button"
            onClick={handleConcierge}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[#F58220]
              px-6
              py-4
              text-sm
              font-semibold
              text-white
              shadow-[0_12px_30px_rgba(245,130,32,0.20)]
            "
          >
            <IconSparkles
              size={18}
              stroke={1.8}
            />

            Organizza il viaggio
          </button>

          <p
            className="
              mt-5
              text-center
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-white/25
            "
          >
            Scopri · Vivi · Ricorda
          </p>
        </div>
      </div>
    </>
  );
}