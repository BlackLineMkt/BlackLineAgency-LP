import { WHATSAPP_URL, handleWhatsAppClick } from "@/lib/contact";

const items = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12h3l3-9 4 18 3-9h5"
      />
    ),
    text: "Agenda irregular: ora cheia, ora vazia",
  },
  {
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 6 6m0-6-6 6" />
      </>
    ),
    text: "Leads que somem antes de fechar",
  },
  {
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M4.93 19h14.14a2 2 0 0 0 1.74-3l-7.07-12a2 2 0 0 0-3.48 0L3.2 16a2 2 0 0 0 1.74 3Z"
        />
      </>
    ),
    text: "Já tentou agência e jogou dinheiro fora",
  },
];

export function Problem() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="reveal mx-auto max-w-3xl text-center font-display text-3xl font-bold leading-tight md:text-5xl">
          Se você se identifica com algum desses,
          <span className="block text-gradient-gold">
            a gente precisa conversar.
          </span>
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={i}
              className="reveal group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-8 backdrop-blur transition-colors hover:border-gold/40"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-gold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  {it.icon}
                </svg>
              </div>
              <p className="text-lg font-medium leading-snug text-foreground">
                {it.text}
              </p>
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gold/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsAppClick(WHATSAPP_URL, 'Isso tem solução. Fala com a gente')}
            className="text-sm font-medium text-gold underline-offset-4 hover:underline"
          >
            Isso tem solução. Fala com a gente →
          </a>
        </div>
      </div>
    </section>
  );
}
