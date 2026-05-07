"use client";
import { useState } from "react";
import { LeadCaptureModal } from "./LeadCaptureModal";

export function Hero() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-radial-gold" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Especialistas em estúdios de tatuagem
          </span>

          <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Seu estúdio merece uma
            <span className="block text-gradient-gold">agenda lotada.</span>
            <span className="block text-foreground">
              A gente sabe como fazer isso acontecer.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Marketing completo feito por quem entende de tatuagem. Tráfego,
            funil, criativos e CRM. Tudo no mesmo lugar, tudo no seu nicho.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setShowModal(true)}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-10 py-5 text-base font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.03] sm:w-auto md:text-lg"
            >
              Quero lotar minha agenda
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <a
              href="#planos"
              className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Conhecer os planos →
            </a>
          </div>

          <p className="mt-4 text-[12px] font-medium text-gold/80">
            ⚡ Apenas 8 vagas disponíveis este mês
          </p>
        </div>

        <div className="reveal mx-auto mt-20 h-px w-2/3 max-w-xl gold-divider" />
      </div>

      {showModal && <LeadCaptureModal onClose={() => setShowModal(false)} source="hero" />}
    </section>
  );
}
