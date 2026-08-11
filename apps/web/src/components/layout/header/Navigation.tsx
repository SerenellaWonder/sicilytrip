import Link from "next/link";

const items = [
  {
    label: "Destinazioni",
    href: "#destinations",
  },
  {
    label: "Esperienze",
    href: "#experiences",
  },
  {
    label: "Chi siamo",
    href: "#about",
  },
  {
    label: "Journal",
    href: "#journal",
  },
  {
    label: "Contatti",
    href: "#footer",
  },
];

type NavigationProps = {
  scrolled: boolean;
};

export default function Navigation({
  scrolled,
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
      {items.map((item) => (
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
              scrolled
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
            className="
              absolute
              bottom-1
              left-0

              h-[2px]
              w-0

              rounded-full
              bg-[#F58220]

              transition-all
              duration-300
              ease-out

              group-hover:w-full
            "
          />
        </Link>
      ))}
    </nav>
  );
}