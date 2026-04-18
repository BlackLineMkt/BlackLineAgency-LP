const stats = [
  { value: "+R$12k", label: "faturados no 1º mês por studios parceiros" },
  { value: "<60 dias", label: "para agenda lotada" },
  { value: "100%", label: "dedicado ao nicho tattoo" },
];

export function SocialProof() {
  return (
    <section className="relative -mt-8 pb-8 md:-mt-12 md:pb-12">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="reveal overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur">
          <div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="px-6 py-5 text-center">
                <div className="font-display text-2xl font-bold text-gradient-gold md:text-3xl">
                  {s.value}
                </div>
                <p className="mt-1.5 text-xs leading-snug text-muted-foreground md:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
