"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { IconMenu2, IconSparkles, IconX } from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const items = [
  {
    label: { it: "Destinazioni", en: "Destinations" },
    href: "/destinazioni",
    pathname: "/destinazioni",
  },
  {
    label: { it: "Esperienze", en: "Experiences" },
    href: "/esperienze",
    pathname: "/esperienze",
  },
  {
    label: { it: "Chi siamo", en: "About us" },
    href: "/chi-siamo",
    pathname: "/chi-siamo",
  },
  {
    label: { it: "Journal", en: "Journal" },
    href: "/journal",
    pathname: "/journal",
  },
  {
    label: { it: "FAQ", en: "FAQ" },
    href: "/faq",
    pathname: "/faq",
  },
  {
    label: { it: "Contatti", en: "Contact" },
    href: "/contatti",
    pathname: "/contatti",
  },
  {
    label: { it: "Area clienti", en: "Customer area" },
    href: "/area-clienti",
    pathname: "/area-clienti",
  },
];

type MobileMenuProps = {
  solidHeader: boolean;
  pathname: string;
};

export default function MobileMenu({ solidHeader, pathname }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { openConcierge } = useConcierge();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        window.requestAnimationFrame(() => openButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    window.requestAnimationFrame(() => openButtonRef.current?.focus());
  }

  function handleConcierge() {
    setOpen(false);

    openConcierge(
      language === "it"
        ? "Aiutami a organizzare il mio viaggio in Sicilia"
        : "Help me plan my trip to Sicily",
    );
  }

  return (
    <>
      {/* =====================================================
          HAMBURGER
      ===================================================== */}

      <button
        ref={openButtonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={language === "it" ? "Apri menu" : "Open menu"}
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
        <IconMenu2 size={23} stroke={1.8} />
      </button>

      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div
        aria-hidden="true"
        className={`
          fixed
          inset-0
          z-[80]
          bg-[#07182D]/60
          backdrop-blur-sm
          transition-all
          duration-300
          lg:hidden

          ${open ? "visible opacity-100" : "invisible opacity-0"}
        `}
        onClick={closeMenu}
      />

      {/* =====================================================
          PANEL
      ===================================================== */}

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label={language === "it" ? "Menu di navigazione" : "Navigation menu"}
        inert={!open}
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

          ${open ? "translate-x-0" : "translate-x-full"}
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
            ref={closeButtonRef}
            type="button"
            onClick={closeMenu}
            aria-label={language === "it" ? "Chiudi menu" : "Close menu"}
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
            <IconX size={22} stroke={1.7} />
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
              (pathname === item.pathname ||
                pathname.startsWith(`${item.pathname}/`));

            return (
              <Link
                key={item.href}
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
                  {item.label[language]}
                </span>

                <span
                  className={`
                    text-[10px]
                    font-semibold
                    tracking-[0.18em]

                    ${active ? "text-[#F58220]" : "text-white/25"}
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
          <div className="mb-5 flex items-center justify-center gap-2">
            {(["it", "en"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLanguage(item)}
                aria-pressed={language === item}
                className={`
                  h-10 min-w-12 rounded-full border text-xs font-bold uppercase
                  tracking-[0.14em] transition-colors
                  ${
                    language === item
                      ? "border-[#F58220] bg-[#F58220] text-white"
                      : "border-white/15 text-white/60"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>

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
            <IconSparkles size={18} stroke={1.8} />
            {language === "it" ? "Organizza il viaggio" : "Plan your trip"}
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
            {language === "it" ? "Scopri · Vivi · Ricorda" : "Discover · Live · Remember"}
          </p>
        </div>
      </div>
    </>
  );
}
