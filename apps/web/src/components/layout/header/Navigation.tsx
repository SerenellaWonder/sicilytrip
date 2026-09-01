import Link from "next/link";

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
];

type NavigationProps = {
  solidHeader: boolean;
  pathname: string;
};

export default function Navigation({
  solidHeader,
  pathname,
}: NavigationProps) {
  const { language } = useLanguage();

  return (
    <nav
      className="
        hidden
        items-center
        gap-8
        lg:flex
        xl:gap-10
      "
    >
      {items.map((item) => {
        const active =
          item.pathname &&
          (
            pathname === item.pathname ||
            pathname.startsWith(`${item.pathname}/`)
          );

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              group
              relative
              py-3
              text-[14px]
              font-semibold
              tracking-[0.015em]
              transition-all
              duration-300

              ${
                active
                  ? `
                    text-[#F58220]
                  `
                  : solidHeader
                    ? `
                      text-[#0A203A]
                      drop-shadow-none
                    `
                    : `
                      text-white
                      drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]
                    `
              }

              hover:text-[#F58220]
            `}
          >
            {item.label[language]}

            <span
              className={`
                absolute
                bottom-1
                left-0
                h-[2px]
                rounded-full
                bg-[#F58220]
                transition-all
                duration-300
                ease-out

                ${
                  active
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }
              `}
            />
          </Link>
        );
      })}
    </nav>
  );
}
