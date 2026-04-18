const testimonials = [
  {
    handle: "@studio.inkblack",
    city: "São Paulo, SP",
    text: "Em 45 dias a agenda estava lotada. Nunca imaginei que tráfego pago funcionasse tão bem para tatuagem.",
  },
  {
    handle: "@blackrose.tattoo",
    city: "Belo Horizonte, MG",
    text: "Saí de 3 clientes por semana para agenda cheia por 2 meses. O processo deles é diferente de qualquer agência que já contratei.",
  },
  {
    handle: "@inkmaster.floripa",
    city: "Florianópolis, SC",
    text: "R$14.000 no primeiro mês completo. Achei que era promessa, mas funcionou de verdade.",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-radial-gold opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            Depoimentos
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
            O que estúdios{" "}
            <span className="text-gradient-gold">falam da gente</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.handle}
              className="reveal relative flex flex-col rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Stars />
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground">
                “{t.text}”
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="font-display text-base font-semibold text-gradient-gold">
                  {t.handle}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {t.city}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
