"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Container from "@/components/common/Container";

import Logo from "./Logo";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  /*
   * La Home ha la Hero fotografica sotto l'header,
   * quindi può partire trasparente.
   *
   * Le pagine interne invece partono con header bianco.
   */
  const isHome = pathname === "/";

  const solidHeader = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-50
        w-full

        transition-all
        duration-500
        ease-out

        ${
          solidHeader
            ? `
              border-b
              border-[#0D2340]/[0.06]

              bg-white/96

              shadow-[0_8px_30px_rgba(7,24,45,0.08)]

              backdrop-blur-xl
            `
            : `
              border-b
              border-white/[0.10]

              bg-transparent

              shadow-none
            `
        }
      `}
    >
      <Container>
        <div
          className={`
            flex
            items-center
            justify-between

            transition-all
            duration-500
            ease-out

            ${
              scrolled
                ? "h-[68px] lg:h-[76px]"
                : "h-[76px] lg:h-[86px]"
            }
          `}
        >
          {/* LOGO */}

          <div
            className={`
              shrink-0

              transition-all
              duration-500

              ${
                scrolled
                  ? "scale-[0.92]"
                  : "scale-100"
              }
            `}
          >
            <Logo solidHeader={solidHeader} />
          </div>

          {/* DESKTOP NAVIGATION */}

          <Navigation
            solidHeader={solidHeader}
            pathname={pathname}
          />

          {/* DESKTOP ACTION */}

          <HeaderActions scrolled={solidHeader} />

          {/* MOBILE */}

          <MobileMenu
            solidHeader={solidHeader}
            pathname={pathname}
          />
        </div>
      </Container>
    </header>
  );
}
