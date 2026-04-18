import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/contact";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-radial-gold" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <div className="reveal mx-auto h-px w-32 gold-divider" />

        <h2 className="reveal mt-8 font-display text-4xl font-bold leading-tight md:text-6xl">
          Pronto pra
          <span className="block text-gradient-gold">lotar sua agenda?</span>
        </h2>
        <p className="reveal mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Fala com a gente. A primeira conversa é sem compromisso.
        </p>

        <div className="reveal mt-10">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-9 py-4 text-base font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.04]"
          >
            Falar com a Black Line agora →
          </a>
        </div>

        <p className="reveal mt-8 text-sm text-muted-foreground">
          ou{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foreground underline-offset-4 hover:text-gold hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
