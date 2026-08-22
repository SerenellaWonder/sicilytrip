"use client";

import {
  Compass,
  Gem,
  HeartHandshake,
  Sparkles,
  Trees,
} from "lucide-react";

const values = [
  {
    icon: Compass,
    title: "Autentica",
    description:
      "Scopri una Sicilia vera, fatta di tradizioni, cultura e luoghi senza tempo.",
  },
  {
    icon: Gem,
    title: "Esclusiva",
    description:
      "Hotel selezionati, ville di lusso ed esperienze curate nei minimi dettagli.",
  },
  {
    icon: HeartHandshake,
    title: "Accogliente",
    description:
      "Ogni viaggio nasce dall'ospitalità siciliana e dall'attenzione per ogni ospite.",
  },
  {
    icon: Trees,
    title: "Sostenibile",
    description:
      "Promuoviamo esperienze rispettose del territorio e delle comunità locali.",
  },
  {
    icon: Sparkles,
    title: "Memorabile",
    description:
      "Ogni soggiorno deve trasformarsi in un ricordo che rimane nel tempo.",
  },
];

export default function Values() {
  return (
    <section className="bg-[#FCFCFA] py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-16 max-w-2xl text-center">

          <span className="text-sm font-semibold uppercase tracking-[4px] text-[#F58220]">
            SicilyTrip
          </span>

          <h2 className="mt-5 text-5xl font-bold text-[#0D2340]">
            I nostri valori
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Non organizziamo semplici vacanze.
            Creiamo esperienze capaci di raccontare
            l&apos;anima più autentica della Sicilia.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">

          {values.map((item) => {

            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="
                  group
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-[#F58220]
                  hover:shadow-2xl
                "
              >
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#F58220]/10
                    text-[#F58220]
                  "
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#0D2340]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {item.description}
                </p>

              </article>
            );

          })}

        </div>

      </div>

    </section>
  );
}
