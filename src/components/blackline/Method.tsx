import { WHATSAPP_URL } from "@/lib/contact";

const steps = [
  {
    n: "01",
    title: "Estruturação",
    desc: "Arrumamos a casa antes de anunciar. Perfil, atendimento e base prontos.",
  },
  {
    n: "02",
    title: "Atração",
    desc: "Anúncios com linguagem do nicho que trazem o lead certo, não qualquer um.",
  },
  {
    n: "03",
    title: "Conversão",
    desc: "CRM e funil que transformam lead em agendamento fechado.",
  },
  {
    n: "04",
    title: "Otimização",
    desc: "Dados reais todo mês. Ajuste contínuo. Resultado crescente.",
  },
];

export function Method() {
  return (
    <section id="metodo" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            O Método Black Line
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
            Um processo.
            <span className="text-gradient-gold"> Não uma tentativa.</span>
          </h2>
        </div>

        <div className="relative mt-16">
          {/* Horizontal line desktop */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px md:block">
            <div className="mx-auto h-full w-[85%] gold-divider" />
          </div>

          <div className="grid gap-8 md:grid-cols-4 md:gap-6">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="reveal relative"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-background font-display text-lg font-bold text-gold shadow-gold">
                  {s.n}
                </div>
                <div className="mt-6 rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-14 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.03]"
          >
            Quero aplicar esse método no meu estúdio →
          </a>
        </div>
      </div>
    </section>
  );
}
