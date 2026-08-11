"use client";

import Image from "next/image";
import Link from "next/link";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMapPin,
  IconPhone,
  IconMail,
  IconArrowRight,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="bg-[#081A33] text-white">

      <div className="mx-auto max-w-[1500px] px-8 py-24">

        <div className="grid gap-16 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">

          {/* BRAND */}

          <div>

            <Image
              src="/images/logo.png"
              alt="SicilyTrip"
              width={190}
              height={60}
            />

            <p className="mt-8 max-w-md text-lg leading-8 text-white/70">
              SicilyTrip seleziona hotel, destinazioni ed esperienze
              per vivere la Sicilia con eleganza, autenticità e comfort.
            </p>

            <div className="mt-10 flex gap-4">

              <Social>
                <IconBrandFacebook size={22} />
              </Social>

              <Social>
                <IconBrandInstagram size={22} />
              </Social>

              <Social>
                <IconBrandLinkedin size={22} />
              </Social>

            </div>

          </div>

          {/* ESPLORA */}

          <div>

            <Title>Esplora</Title>

            <Menu href="#">Destinazioni</Menu>
            <Menu href="#">Hotel</Menu>
            <Menu href="#">Esperienze</Menu>
            <Menu href="#">Travel Guide</Menu>
            <Menu href="#">Blog</Menu>

          </div>

          {/* AZIENDA */}

          <div>

            <Title>SicilyTrip</Title>

            <Menu href="#">Chi siamo</Menu>
            <Menu href="#">Contatti</Menu>
            <Menu href="#">FAQ</Menu>
            <Menu href="#">Privacy</Menu>
            <Menu href="#">Cookie Policy</Menu>

          </div>

          {/* NEWSLETTER */}

          <div>

            <Title>Newsletter</Title>

            <p className="mb-8 leading-8 text-white/70">
              Ricevi offerte esclusive e lasciati ispirare
              per il tuo prossimo viaggio.
            </p>

            <div className="overflow-hidden rounded-full bg-white">

              <div className="flex">

                <input
                  type="email"
                  placeholder="La tua email"
                  className="
                    flex-1
                    bg-transparent
                    px-6
                    py-4
                    text-[#081A33]
                    outline-none
                  "
                />

                <button
                  className="
                    bg-[#F58220]
                    px-6
                    transition
                    hover:bg-[#ff983d]
                  "
                >

                  <IconArrowRight size={20} />

                </button>

              </div>

            </div>

            <div className="mt-10 space-y-5">

              <Info>

                <IconMapPin
                  size={20}
                  className="text-[#F58220]"
                />

                Palermo · Sicilia

              </Info>

              <Info>

                <IconPhone
                  size={20}
                  className="text-[#F58220]"
                />

                +39 091 000000

              </Info>

              <Info>

                <IconMail
                  size={20}
                  className="text-[#F58220]"
                />

                info@sicilytrip.it

              </Info>

            </div>

          </div>

        </div>

        <div className="my-16 h-px bg-white/10" />

        <div className="flex flex-col gap-4 text-sm text-white/50 lg:flex-row lg:items-center lg:justify-between">

          <span>
            © 2026 SicilyTrip · Tutti i diritti riservati.
          </span>

          <div className="flex gap-8">

            <Link href="#">Privacy</Link>

            <Link href="#">Cookie</Link>

            <Link href="#">Termini</Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

function Title({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-8 text-xl font-semibold">
      {children}
    </h3>
  );
}

function Menu({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="mb-4 block text-white/70 transition hover:text-[#F58220]"
    >
      {children}
    </Link>
  );
}

function Social({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-white/15
        text-white/70
        transition-all
        hover:border-[#F58220]
        hover:bg-[#F58220]
        hover:text-white
      "
    >
      {children}
    </button>
  );
}

function Info({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 text-white/70">
      {children}
    </div>
  );
}