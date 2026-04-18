import { WHATSAPP_URL } from "@/lib/contact";

const stats = [
  {
    value: "R$12.000",
    label: "faturados por um studio parceiro no primeiro mês",
  },
  {
    value: "R$5.000",
    label: "gerados em uma única semana de viagem para tatuar fora",
  },
  {
    value: "60 dias",
    label:
      "é o tempo médio para transformar agenda pela metade em lista de espera",
  },
];

export function Results() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            Resultados
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
            Números reais <span className="text-gradient-gold">do nicho</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className="reveal relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-8 text-center backdrop-blur"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-display text-4xl font-bold leading-none text-gradient-gold md:text-5xl">
                {s.value}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {s.label}
              </p>
              <div className="pointer-events-none absolute inset-x-8 -bottom-px h-px gold-divider" />
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.03]"
          >
            Quero lotar minha agenda →
          </a>
        </div>
      </div>
    </section>
  );
}
