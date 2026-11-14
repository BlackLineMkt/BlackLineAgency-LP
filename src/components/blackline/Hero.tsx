"use client";
import { useState } from "react";
import { vagasMensagem } from "@/config/availability";
import { LeadCaptureModal } from "./LeadCaptureModal";

export function Hero() {
  const [showModal, setShowModal] = useState(false);
  const vagasHero = vagasMensagem("hero");

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal grid items-start gap-6 md:grid-cols-[0.7fr_1.3fr] md:gap-6">
          <img
            src="/logo-principal.webp"
            alt="Black Line Agency, agência de marketing para estúdios de tatuagem. Logo com polvo e o texto BL | BLACK LINE AGENCY, ESTD 2026"
            width={475}
            height={505}
            fetchPriority="high"
            decoding="async"
            className="mr-auto h-auto w-36 select-none md:order-1 md:-mt-12 md:w-full md:max-w-md md:justify-self-start"
          />

          <div className="text-left md:order-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Especialistas em estúdios de tatuagem
            </span>

            <h1 className="mt-6 text-balance font-headline text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-[2.5rem] lg:text-5xl xl:text-[3.4rem]">
              Marketing para estúdios de tatuagem
              <span className="block text-gradient-gold">que querem uma agenda lotada.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Somos uma agência de marketing para tatuadores: tráfego pago, criativos, funis de
              vendas, landing pages e CRM no mesmo lugar, feitos por quem entende de tatuagem. Seu
              estúdio merece uma agenda lotada, e a gente sabe como fazer isso acontecer.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => setShowModal(true)}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-10 py-5 text-base font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.03] sm:w-auto md:text-lg"
              >
                Quero lotar minha agenda
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <a
                href="#planos"
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-amber hover:underline"
              >
                Conhecer os planos →
              </a>
            </div>

            {vagasHero && (
              <p className="mt-4 text-[12px] font-medium text-gold/80">⚡ {vagasHero}</p>
            )}
          </div>
        </div>

        <div className="reveal mx-auto mt-16 h-px w-2/3 max-w-xl gold-divider" />
      </div>

      {showModal && <LeadCaptureModal onClose={() => setShowModal(false)} source="hero" />}
    </section>
  );
}
