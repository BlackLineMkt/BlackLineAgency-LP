const pillars = [
  {
    title: "Tráfego & Criativos",
    desc: "Anúncios que falam a língua do tatuador e criativos que já filtram o lead certo antes do clique.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12h3l3-9 4 18 3-9h5"
      />
    ),
  },
  {
    title: "Funis & CRM",
    desc: "Da atração ao agendamento fechado. Nenhum lead perdido, nenhuma oportunidade desperdiçada.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4h18M6 8h12M9 12h6M11 16h2M11 20h2"
      />
    ),
  },
  {
    title: "Atendimento & Conversão",
    desc: "Landing pages, IA no atendimento e treinamento do seu time para fechar mais com os leads que já chegam.",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01" />
      </>
    ),
  },
];

export function About() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center">
          <span className="reveal text-xs font-medium uppercase tracking-[0.22em] text-gold">
            Quem somos
          </span>
          <h2 className="reveal mx-auto mt-5 max-w-4xl font-display text-3xl font-bold leading-tight md:text-5xl">
            Não somos uma agência.
            <span className="block text-gradient-gold">
              Somos o ecossistema completo do seu estúdio.
            </span>
          </h2>
          <p className="reveal mx-auto mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A Black Line nasceu dentro do nicho. Entendemos a cultura, falamos a
            língua do estúdio e sabemos o que funciona nesse mercado. Enquanto
            agências genéricas empurram fórmula, a gente constrói infraestrutura
            completa de crescimento, do primeiro anúncio ao atendimento que
            fecha agenda.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur transition-colors hover:border-gold/40"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-gold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  {p.icon}
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <a
            href="#metodo"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Conhecer o método
            <span className="text-gold">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
