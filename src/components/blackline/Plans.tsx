import { WHATSAPP_URL } from "@/lib/contact";

const plans = [
  {
    name: "Starter",
    price: "1.500",
    features: ["Meta Ads", "Criativos", "Copy", "Relatório mensal"],
    cta: "Quero o Starter",
    highlight: false,
  },
  {
    name: "Black Line",
    price: "2.500",
    features: ["Tudo do Starter", "Google Ads", "CRM"],
    cta: "Quero o Black Line",
    highlight: true,
  },
  {
    name: "Full",
    price: "3.500",
    features: [
      "Tudo do Black Line",
      "Gestão de Google Meu Negócio",
      "Vídeo de apresentação mensal",
    ],
    cta: "Quero o Full",
    highlight: false,
  },
];

export function Plans() {
  return (
    <section id="planos" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-radial-gold opacity-60" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            Planos
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
            Escolha o plano certo
            <span className="block text-gradient-gold">
              pro seu estúdio crescer
            </span>
          </h2>
          <p className="mt-5 text-sm text-muted-foreground md:text-base">
            Verba de anúncios não inclusa — fica direto com você na plataforma.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`reveal relative flex flex-col overflow-hidden rounded-3xl p-8 backdrop-blur transition-transform ${
                p.highlight
                  ? "border-2 border-gold bg-surface shadow-gold lg:-translate-y-3 lg:scale-[1.03]"
                  : "border border-border bg-surface/60 hover:border-gold/40"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {p.highlight && (
                <span className="absolute right-6 top-6 rounded-full bg-gradient-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  Mais escolhido
                </span>
              )}

              <h3 className="font-display text-2xl font-bold text-foreground">
                {p.name}
              </h3>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-sm font-medium text-muted-foreground">R$</span>
                <span className="font-display text-5xl font-bold text-foreground">
                  {p.price}
                </span>
                <span className="text-sm font-medium text-muted-foreground">/mês</span>
              </div>

              <div className="my-7 h-px w-full bg-border" />

              <ul className="flex flex-col gap-3.5">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        p.highlight
                          ? "bg-gold text-primary-foreground"
                          : "bg-gold-soft text-gold"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5 13 4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  p.highlight
                    ? "bg-gradient-gold text-primary-foreground shadow-gold"
                    : "border border-border bg-surface-elevated text-foreground hover:border-gold/50"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="reveal mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            Não sabe qual escolher?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-gold underline-offset-4 hover:underline"
            >
              Fala com a gente e a gente indica o certo pro seu momento →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
