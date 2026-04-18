import { useState } from "react";

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contato" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-radial-gold opacity-40" />
      <div className="relative mx-auto max-w-2xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            Contato
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
            Fala com a{" "}
            <span className="text-gradient-gold">Black Line</span>
          </h2>
          <p className="mt-5 text-sm text-muted-foreground md:text-base">
            Deixa seus dados que a gente entra em contato pra entender o
            momento do seu studio.
          </p>
        </div>

        <div className="reveal mt-10 rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur md:p-10">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-gold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5 13 4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Recebemos seus dados!
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                A gente entra em contato em breve.
              </p>
            </div>
          ) : (
            <form
              name="lead"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={() => setSubmitted(true)}
              className="flex flex-col gap-5"
            >
              <input type="hidden" name="form-name" value="lead" />
              <p className="hidden">
                <label>
                  Não preencha:{" "}
                  <input name="bot-field" />
                </label>
              </p>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Seu nome"
                  className="rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Telefone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  className="rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="voce@email.com"
                  className="rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
                />
              </div>

              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-base font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.02]"
              >
                Quero lotar minha agenda
                <span>→</span>
              </button>

              <p className="text-center text-xs text-muted-foreground/80">
                Seus dados ficam só com a gente. Sem spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
