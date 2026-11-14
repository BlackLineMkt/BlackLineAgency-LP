const testimonials = [
  {
    highlight: "45 dias, agenda lotada",
    text: "Estúdio em São Paulo. Saiu de agenda irregular para lista de espera em menos de dois meses.",
  },
  {
    highlight: "De 3 clientes por semana para agenda fechada",
    text: "Estúdio em Belo Horizonte. Dois meses de processo e a agenda virou referência na cidade.",
  },
  {
    highlight: "R$14.000 no primeiro mês completo",
    text: "Estúdio em Florianópolis. Resultado no primeiro mês de campanha ativa.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            Depoimentos
          </span>
          <h2 className="mt-5 font-headline text-3xl font-bold leading-tight md:text-5xl">
            O que estúdios de tatuagem <span className="text-gradient-gold">falam da gente.</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            Resultados anteriores não garantem resultados futuros.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.highlight}
              className="reveal relative flex flex-col rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-display text-lg font-semibold leading-snug text-gradient-gold">
                {t.highlight}
              </div>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
