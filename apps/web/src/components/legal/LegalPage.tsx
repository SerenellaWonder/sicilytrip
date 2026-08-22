import FooterSection from "@/components/layout/FooterSection";
import Header from "@/components/layout/header";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export default function LegalPage({
  eyebrow,
  title,
  introduction,
  sections,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F5F1] pt-[110px]">
        <article className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 lg:py-28">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F58220]">
            {eyebrow}
          </span>
          <h1 className="mt-5 text-[42px] font-bold tracking-[-0.05em] text-[#0D2340] sm:text-[58px]">
            {title}
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-500">
            {introduction}
          </p>

          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-xs leading-6 text-amber-900">
            Documento informativo provvisorio. I dati del titolare e il testo definitivo dovranno essere verificati prima della pubblicazione in produzione.
          </div>

          <div className="mt-12 space-y-10">
            {sections.map(section => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold text-[#0D2340]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                  {section.paragraphs.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
        <FooterSection />
      </main>
    </>
  );
}
