import { useEffect, useState } from "react";
import { WHATSAPP_URL, handleWhatsAppClick } from "@/lib/contact";
import { leadsSupabase, LEADS_STUDIO_ID } from "@/lib/leadsClient";

const WEB3FORMS_ACCESS_KEY = "a35860a6-d63f-498f-85dd-dbafc9d8406f";

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!submitted) return;
    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration', { content_name: 'Página de obrigado' });
    }
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'thank_you_view',
        page_path: '/obrigado',
        page_title: 'Obrigado | Black Line Agency',
      });
    }
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '#obrigado');
      window.scrollTo({ top: document.getElementById('contato')?.offsetTop ?? 0, behavior: 'smooth' });
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "Novo lead - Black Line Agency");
    formData.append("from_name", "Black Line Agency - Site");

    try {
      const name = String(formData.get("name") ?? "");
      const phone = String(formData.get("phone") ?? "");
      const studio = String(formData.get("studio") ?? "");
      const instagram = String(formData.get("instagram") ?? "");
      const state = String(formData.get("state") ?? "");
      const email = String(formData.get("email") ?? "");

      await leadsSupabase.from("leads").insert({
        studio_id: LEADS_STUDIO_ID,
        name,
        phone,
        origin: "lp",
        stage: "novo",
        notes: "",
      });

      await fetch("https://wzbfveszjumxshuatzzc.supabase.co/functions/v1/receive-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          studio,
          instagram,
          state,
          email,
          origin: "lp",
          studio_id: LEADS_STUDIO_ID,
        }),
      });
    } catch {
      // silencioso por design
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        if (window.fbq) window.fbq('track', 'Lead', { content_name: 'Formulário de contato' });
        if (window.dataLayer) window.dataLayer.push({ event: 'form_submit', form_name: 'lead_form' });
        setSubmitted(true);
      } else {
        setError("Não conseguimos enviar agora. Tenta de novo em instantes.");
      }
    } catch {
      setError("Erro de conexão. Verifica sua internet e tenta de novo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contato" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-radial-gold opacity-40" />
      <div className="relative mx-auto max-w-4xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold">Contato</span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
            Fala com a <span className="text-gradient-gold">Black Line</span>
          </h2>
          <p className="mt-5 text-sm text-muted-foreground md:text-base">Deixa seus dados que a gente entra em contato pra entender o momento do seu estúdio.</p>
        </div>
        <div className="reveal mt-10 rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur md:p-10">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft text-gold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-3xl font-bold text-foreground md:text-4xl">Obrigado! Recebemos seus dados.</h3>
              <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
                Em breve nosso time entra em contato. Se quiser adiantar, fala com a gente direto no WhatsApp:
              </p>
<a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={handleWhatsAppClick(WHATSAPP_URL, 'Obrigado - Falar no WhatsApp')}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.03]"
              >
                Falar no WhatsApp agora
              </a>
              >
                Falar no WhatsApp agora;
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input type="hidden" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Nome</label>
                  <input id="name" name="name" type="text" required placeholder="Seu nome" className="rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="studio" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Nome do Estúdio</label>
                  <input id="studio" name="studio" type="text" required placeholder="Nome do seu estúdio" className="rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="instagram" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">@ do Instagram</label>
                  <input id="instagram" name="instagram" type="text" required placeholder="@seuestudio" className="rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="state" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Estado</label>
                  <select id="state" name="state" required defaultValue="" className="rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground outline-none transition-colors focus:border-gold/60">
                    <option value="" disabled>Selecione seu estado</option>
                    {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((uf) => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Telefone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    maxLength={15}
                    pattern="[0-9()\s\-]{10,15}"
                    title="Digite um telefone válido com DDD (ex: (11) 99999-9999)"
                    placeholder="(11) 99999-9999"
                    onInput={(e) => {
                      const input = e.currentTarget;
                      const digits = input.value.replace(/\D/g, "").slice(0, 11);
                      let formatted = digits;
                      if (digits.length > 10) {
                        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
                      } else if (digits.length > 6) {
                        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
                      } else if (digits.length > 2) {
                        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
                      } else if (digits.length > 0) {
                        formatted = `(${digits}`;
                      }
                      input.value = formatted;
                    }}
                    className="rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
                  <input id="email" name="email" type="email" required placeholder="voce@email.com" className="rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60" />
                </div>
              </div>
              {error && (
                <p className="text-center text-sm text-destructive">{error}</p>
              )}
              <button type="submit" disabled={submitting} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-base font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70">
                {submitting ? "Enviando..." : "Quero lotar minha agenda"}
              </button>
              <p className="text-center text-xs text-muted-foreground/80">Seus dados ficam só com a gente. Sem spam.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
