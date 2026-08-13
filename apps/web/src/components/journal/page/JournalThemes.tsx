import {
  IconArrowUpRight,
  IconBuildingArch,
  IconMountain,
  IconSailboat,
  IconToolsKitchen2,
  IconWorld,
} from "@tabler/icons-react";

const themes = [
  {
    number: "01",
    title: "Luoghi",
    subtitle: "Città, borghi e indirizzi da ricordare",
    description:
      "Dalle città d'arte ai piccoli centri lontani dagli itinerari più evidenti. Luoghi da conoscere con il tempo necessario per comprenderli.",
    icon: IconWorld,
  },
  {
    number: "02",
    title: "Sapori",
    subtitle: "La Sicilia attraverso la sua tavola",
    description:
      "Mercati, produttori, ricette e territori. Perché in Sicilia il cibo non racconta soltanto cosa si mangia, ma da dove veniamo.",
    icon: IconToolsKitchen2,
  },
  {
    number: "03",
    title: "Mare",
    subtitle: "Isole, coste e Mediterraneo",
    description:
      "Baie nascoste, piccoli porti, navigazioni e isole. Storie nate lungo una costa che cambia continuamente carattere.",
    icon: IconSailboat,
  },
  {
    number: "04",
    title: "Natura",
    subtitle: "Vulcani, riserve e paesaggi",
    description:
      "Dall'Etna alle Madonie, dalle saline alle riserve marine. Una Sicilia più selvaggia, da attraversare e non soltanto osservare.",
    icon: IconMountain,
  },
  {
    number: "05",
    title: "Cultura",
    subtitle: "Arte, architettura e memoria",
    description:
      "Templi, barocco, palazzi, botteghe e tradizioni. Le tracce delle culture che hanno attraversato l'isola e continuano a definirla.",
    icon: IconBuildingArch,
  },
];

export default function JournalThemes() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        lg:py-32
        xl:py-36
      "
    >
      {/* BACKGROUND WORD */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-10
          top-8
          hidden
          select-none
          whitespace-nowrap
          text-[220px]
          font-bold
          leading-none
          tracking-[-0.08em]
          text-[#0D2340]/[0.025]
          xl:block
        "
      >
        READ
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* INTRO */}

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]
            lg:gap-20
            xl:gap-28
          "
        >
          <div>
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.30em]
                text-[#F58220]
                sm:text-xs
              "
            >
              Esplora il Journal
            </span>

            <h2
              className="
                mt-5
                max-w-[720px]
                text-[42px]
                font-bold
                leading-[1.01]
                tracking-[-0.05em]
                text-[#0D2340]
                sm:text-[52px]
                lg:text-[60px]
                xl:text-[68px]
              "
            >
              Segui ciò
              <br />

              <span className="text-[#0D2340]/35">
                che ti incuriosisce.
              </span>
            </h2>
          </div>

          <div
            className="
              flex
              items-end
              lg:justify-end
            "
          >
            <p
              className="
                max-w-[520px]
                text-[15px]
                leading-8
                text-[#0D2340]/55
                sm:text-[17px]
              "
            >
              Non esiste un solo modo di raccontare la Sicilia.
              Scegli un tema e lasciati portare attraverso
              paesaggi, persone, sapori e storie dell&apos;isola.
            </p>
          </div>
        </div>

        {/* THEMES */}

        <div
          className="
            mt-16
            border-t
            border-[#0D2340]/10
            lg:mt-20
          "
        >
          {themes.map((theme) => {
            const Icon = theme.icon;

            return (
              <div
                key={theme.number}
                className="
                  group
                  grid
                  gap-6
                  border-b
                  border-[#0D2340]/10
                  py-9

                  transition-colors
                  duration-500

                  md:grid-cols-[70px_minmax(200px,0.65fr)_minmax(0,1.35fr)_56px]
                  md:items-center
                  md:gap-8

                  lg:grid-cols-[90px_minmax(280px,0.7fr)_minmax(0,1.3fr)_64px]
                  lg:py-11

                  xl:gap-12
                "
              >
                {/* NUMBER */}

                <span
                  className="
                    text-[9px]
                    font-bold
                    tracking-[0.18em]
                    text-[#F58220]
                  "
                >
                  {theme.number}
                </span>

                {/* TITLE */}

                <div>
                  <h3
                    className="
                      text-[29px]
                      font-bold
                      leading-none
                      tracking-[-0.04em]
                      text-[#0D2340]

                      transition-transform
                      duration-500

                      group-hover:translate-x-1

                      sm:text-[33px]
                      lg:text-[36px]
                    "
                  >
                    {theme.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-[290px]
                      text-[10px]
                      font-semibold
                      leading-5
                      text-[#0D2340]/40
                    "
                  >
                    {theme.subtitle}
                  </p>
                </div>

                {/* DESCRIPTION */}

                <p
                  className="
                    max-w-[650px]
                    text-[14px]
                    leading-7
                    text-[#0D2340]/50
                    sm:text-[15px]
                    sm:leading-8
                  "
                >
                  {theme.description}
                </p>

                {/* ICON */}

                <div className="flex md:justify-end">
                  <span
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#0D2340]/10
                      bg-[#F7F3EC]
                      text-[#0D2340]

                      transition-all
                      duration-500

                      group-hover:border-[#F58220]
                      group-hover:bg-[#F58220]
                      group-hover:text-white

                      lg:h-14
                      lg:w-14
                    "
                  >
                    <Icon
                      size={19}
                      stroke={1.6}
                    />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CLOSING */}

        <div
          className="
            mt-14
            grid
            gap-8
            lg:mt-20
            lg:grid-cols-[minmax(0,1fr)_500px]
            lg:items-end
            lg:gap-20
          "
        >
          <p
            className="
              max-w-[780px]
              text-[30px]
              font-semibold
              leading-[1.15]
              tracking-[-0.035em]
              text-[#0D2340]
              sm:text-[36px]
              lg:text-[42px]
            "
          >
            Ogni viaggio comincia
            <br className="hidden sm:block" />
            da qualcosa che ci incuriosisce.
          </p>

          <div>
            <p
              className="
                max-w-[480px]
                text-[14px]
                leading-7
                text-[#0D2340]/50
                sm:text-[15px]
                sm:leading-8
              "
            >
              Il Journal è il nostro modo di raccogliere
              quelle storie prima che diventino parte
              del tuo prossimo itinerario.
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#0D2340]
                  text-[#F58220]
                "
              >
                <IconArrowUpRight
                  size={15}
                  stroke={1.8}
                />
              </span>

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#0D2340]/45
                "
              >
                SicilyTrip Journal
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}