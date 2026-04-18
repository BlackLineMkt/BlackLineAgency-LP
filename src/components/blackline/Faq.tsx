import { useState } from "react";

const faqs = [
  {
    q: "A verba de anúncios está inclusa?",
    a: "Não. A verba fica direto com você na plataforma — você tem controle total.",
  },
  {
    q: "Quanto tempo leva pra ver resultado?",
    a: "30 a 60 dias pro funil otimizar. No primeiro mês estrutura e testa, no segundo otimiza, no terceiro resultado consistente.",
  },
  {
    q: "Vocês atendem qualquer estúdio?",
    a: "Não. Atendemos estúdios Em Ascensão e Consolidados — que já têm base e querem escalar.",
  },
  {
    q: "Preciso gravar conteúdo?",
    a: "Sim, mas sem virar criador de conteúdo. A gente manda o roteiro — você filma 2 minutos do processo que já faz e a gente cuida do resto.",
  },
  {
    q: "Já tentei agência e não funcionou. Por quê seria diferente?",
    a: "Porque a Black Line nasceu dentro do nicho. Não aplicamos fórmula genérica — construímos estratégia pra estúdio de tatuagem.",
  },
  {
    q: "Vocês têm contrato de fidelidade?",
    a: "Trabalhamos com vigência mínima de 3 meses. Não é pra te prender — é porque menos que isso não dá tempo de estruturar, otimizar e entregar resultado de verdade. Após os 3 meses, renovação automática com aviso prévio de 30 dias pra cancelar.",
  },
  {
    q: "Preciso entender de marketing para trabalhar com vocês?",
    a: "Não. Você entende do seu estúdio e da sua arte — a gente cuida do resto. Nossa função é tirar esse peso das suas costas.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="reveal text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            FAQ
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
            Perguntas <span className="text-gradient-gold">frequentes</span>
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`reveal overflow-hidden rounded-2xl border bg-surface/60 backdrop-blur transition-colors ${
                  isOpen ? "border-gold/40" : "border-border"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="font-display text-[15px] font-semibold text-foreground md:text-lg">
                    {f.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isOpen
                        ? "rotate-45 border-gold bg-gold-soft text-gold"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m-8-8h16"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[14px] leading-relaxed text-muted-foreground md:text-base">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
