type Service = {
  title: string;
  desc: string;
  soon?: boolean;
  icon: React.ReactNode;
};

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.6,
  className: "h-6 w-6",
};

const services: Service[] = [
  {
    title: "Tráfego Pago",
    desc: "Meta Ads e Google Ads com estratégia real para encher a agenda do seu estúdio.",
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17 9 11l4 4 8-8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 4h7v7" />
      </svg>
    ),
  },
  {
    title: "Criativos",
    desc: "Artes e copies com linguagem autêntica do nicho tattoo — que convertem de verdade.",
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7h16M4 12h10M4 17h16"
        />
      </svg>
    ),
  },
  {
    title: "CRM — TattoFlow",
    desc: "CRM exclusivo para estúdios de tatuagem. Kanban de leads, histórico de atendimento e integração automática com sua LP. Nenhum lead perdido.",
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm6 14v-2a4 4 0 0 0-3-3.87M2 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"
        />
      </svg>
    ),
  },
  {
    title: "Funis de Vendas",
    desc: "Estrutura completa da atração ao agendamento fechado — sem improvisar.",
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 4h18l-7 9v6l-4 2v-8L3 4Z"
        />
      </svg>
    ),
  },
  {
    title: "Landing Pages & Sites",
    desc: "LP focada em conversão ou site completo com múltiplas páginas — personalizado com a identidade do seu estúdio e integrado ao TattoFlow.",
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4h16v6H4zM4 14h7v6H4zM14 14h6v6h-6z"
        />
      </svg>
    ),
  },
  {
    title: "Google Meu Negócio",
    desc: "Perfil otimizado, postagens semanais, gestão de avaliações e estratégia de presença local.",
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        />
      </svg>
    ),
  },
  {
    title: "IA no Atendimento",
    desc: "Escala sem perder velocidade no atendimento dos seus leads.",
    soon: true,
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4v2a4 4 0 0 0 8 0v-2a4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4V6a4 4 0 0 0-4-4Z"
        />
      </svg>
    ),
  },
  {
    title: "Treinamento de Atendimento",
    desc: "Fechar mais com os leads que já chegam — sem depender só do volume.",
    soon: true,
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m12 14 9-5-9-5-9 5 9 5Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 11v4a7 4 0 0 0 14 0v-4" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="servicos" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            Serviços
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
            O que <span className="text-gradient-gold">entregamos</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`reveal group relative overflow-hidden rounded-2xl border p-6 backdrop-blur transition-all ${
                s.soon
                  ? "border-border/60 bg-surface/30"
                  : "border-border bg-surface/60 hover:border-gold/40 hover:bg-surface"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {s.soon && (
                <span className="absolute right-4 top-4 rounded-full border border-gold/40 bg-gold-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
                  Em breve
                </span>
              )}
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  s.soon ? "bg-muted text-muted-foreground" : "bg-gold-soft text-gold"
                }`}
              >
                {s.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
