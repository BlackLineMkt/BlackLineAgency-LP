export function About() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-transparent" />
      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <span className="reveal text-xs font-medium uppercase tracking-[0.22em] text-gold">
          Quem somos
        </span>
        <h2 className="reveal mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
          Não somos uma agência que atende tatuadores.
          <span className="block text-gradient-gold">
            Somos um ecossistema que nasceu dentro do nicho.
          </span>
        </h2>
        <p className="reveal mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A Black Line entende a cultura, fala a língua do estúdio e sabe o que é
          autêntico nesse mercado. Enquanto agências genéricas empurram fórmula,
          a gente constrói estratégia real.
        </p>
        <div className="reveal mt-10">
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
