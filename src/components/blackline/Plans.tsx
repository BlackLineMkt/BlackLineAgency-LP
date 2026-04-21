import { useEffect, useRef, useState } from "react";
import { WHATSAPP_URL, WHATSAPP_PLAN_MESSAGES, buildWhatsAppUrl, handleWhatsAppClick } from "@/lib/contact";

const plans = [
  { name: "Starter", price: "1.500", features: ["Meta Ads", "Criativos", "Copy", "Relatório mensal"], cta: "Quero o Starter", highlight: false },
  { name: "Black Line", price: "2.500", features: ["Tudo do Starter", "Google Ads", "CRM"], cta: "Quero o Black Line", highlight: true },
  { name: "Full", price: "3.500", features: ["Tudo do Black Line", "Gestão de Google Meu Negócio", "Vídeo de apresentação mensal"], cta: "Quero o Full", highlight: false },
];

export function Plans() {
  const [selected, setSelected] = useState("Black Line");
  const sectionRef = useRef<HTMLElement>(null);
  const viewedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          window.fbq?.('track', 'ViewContent', {
            content_name: 'Planos Black Line',
            content_category: 'pricing',
          });
          window.dataLayer?.push({ event: 'view_pricing' });
        }
      });
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePlanClick = (planName: string, price: string) => {
    setSelected(planName);
    const value = Number(price.replace('.', ''));
    window.fbq?.('track', 'InitiateCheckout', {
      content_name: planName,
      content_category: 'plan',
      value,
      currency: 'BRL',
    });
    window.dataLayer?.push({
      event: 'initiate_checkout',
      plan_name: planName,
      plan_value: value,
    });
  };

  return (
    <section id="planos" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-radial-gold opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold">Planos</span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
            Escolha o plano certo
            <span className="block text-gradient-gold">pro seu estúdio crescer</span>
          </h2>
          <p className="mt-5 text-sm text-muted-foreground md:text-base">Verba de anúncios não inclusa: fica direto com você na plataforma.</p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-start">
          {plans.map((p, i) => {
            const isSelected = selected === p.name;
            return (
              <div key={p.name} className={`reveal group relative flex flex-col overflow-visible rounded-3xl p-8 text-left backdrop-blur transition-all duration-300 cursor-pointer ${isSelected ? "border-2 border-gold bg-surface shadow-gold lg:-translate-y-3 lg:scale-[1.03]" : "border border-border bg-surface/60 hover:border-gold/40"}`} style={{ transitionDelay: `${i * 80}ms` }} onClick={() => handlePlanClick(p.name, p.price)}>
                {p.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-gold px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-gold">★ Mais escolhido</span>}
                <h3 className="font-display text-2xl font-bold text-foreground">{p.name}</h3>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-sm font-medium text-muted-foreground">R$</span>
                  <span className="font-display text-5xl font-bold text-foreground">{p.price}</span>
                  <span className="text-sm font-medium text-muted-foreground">/mês</span>
                </div>
                <div className="my-7 h-px w-full bg-border" />
                <ul className="flex flex-col gap-3.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isSelected ? "bg-gold text-primary-foreground" : "bg-gold-soft text-gold"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" /></svg>
                      </span>
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={buildWhatsAppUrl(WHATSAPP_PLAN_MESSAGES[p.name] ?? "Olá, tenho interesse nos planos da Black Line Agency")} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick(buildWhatsAppUrl(WHATSAPP_PLAN_MESSAGES[p.name] ?? "Olá, tenho interesse nos planos da Black Line Agency"), p.cta)} className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${isSelected ? "bg-gradient-gold text-primary-foreground shadow-gold" : "border border-border bg-surface-elevated text-foreground hover:border-gold/50"}`}>{p.cta}</a>
              </div>
            );
          })}
        </div>
        <div className="reveal mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">Não sabe qual escolher?{" "}<a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick(WHATSAPP_URL, 'Fala com a gente')} className="font-medium text-gold underline-offset-4 hover:underline">Fala com a gente e a gente indica o certo pro seu momento →</a></p>
        </div>
      </div>
    </section>
  );
}
