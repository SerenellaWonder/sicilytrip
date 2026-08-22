import Link from "next/link";

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
    label: "FAQ",
    href: "/faq",
    pathname: "/faq",
  },
  {
    label: "Contatti",
    href: "/#footer",
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
            key={item.label}
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
            {item.label}

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
