"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { leadsSupabase, LEADS_STUDIO_ID } from "@/lib/leadsClient";

interface LeadCaptureModalProps {
  onClose: () => void;
  source: string;
  planInterest?: string;
}

type Step = "form" | "success";

export function LeadCaptureModal({ onClose, source, planInterest }: LeadCaptureModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Área realmente visível (muda com a barra do navegador e o teclado no celular).
  const [vv, setVv] = useState<{ top: number; height: number } | null>(null);

  // Trava a rolagem do fundo e acompanha o visualViewport: com o teclado aberto o iOS
  // não redimensiona o layout, então centralizamos na área visível.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const v = window.visualViewport;
    const sync = () => {
      if (v) setVv({ top: v.offsetTop, height: v.height });
    };
    sync();
    v?.addEventListener("resize", sync);
    v?.addEventListener("scroll", sync);
    return () => {
      document.body.style.overflow = prev;
      v?.removeEventListener("resize", sync);
      v?.removeEventListener("scroll", sync);
    };
  }, []);

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const rawPhone = phone.replace(/\D/g, "");
    if (name.trim().length < 2) {
      setError("Digite seu nome completo.");
      return;
    }
    if (rawPhone.length < 10) {
      setError("Digite um WhatsApp válido com DDD.");
      return;
    }

    setLoading(true);
    try {
      const { error: insertError } = await leadsSupabase.from("leads").insert({
        name: name.trim(),
        phone: rawPhone,
        origin: "lp",
        stage: "novo",
        studio_id: LEADS_STUDIO_ID,
        ...(planInterest ? { plan_interest: planInterest } : {}),
      });

      if (insertError) throw insertError;

      window.fbq?.("track", "Lead", { content_name: source });
      window.dataLayer?.push({ event: "lead_captured", source });

      setStep("success");
    } catch {
      setError("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // Portal no <body>: ancestrais com transform/backdrop-filter quebram o position:fixed.
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-x-0 top-0 z-[10000] h-[100dvh] overflow-y-auto overscroll-contain"
      style={vv ? { top: vv.top, height: vv.height } : undefined}
    >
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex min-h-full items-center justify-center p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={20} />
        </button>

        {step === "form" ? (
          <>
            <div className="mb-6 text-center">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                {planInterest ? `Plano ${planInterest}` : "Primeiros passos"}
              </span>
              <h2 className="mt-3 font-headline text-2xl font-bold text-foreground">
                {planInterest ? "Ótima escolha! Vamos começar?" : "Vamos lotar sua agenda?"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {planInterest
                  ? `Você escolheu o plano ${planInterest}. Preencha seus dados e entraremos em contato para dar os próximos passos.`
                  : "Preencha seus dados e entraremos em contato em breve para uma conversa sem compromisso."
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Seu nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="João Silva"
                  autoFocus
                  autoComplete="name"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-amber focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  WhatsApp com DDD
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(11) 99999-9999"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-amber focus:outline-none transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs font-medium text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group w-full rounded-full bg-gradient-gold px-8 py-4 text-base font-bold text-primary-foreground shadow-gold transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Enviando..." : "Quero ser contactado →"}
              </button>

              <p className="text-center text-xs text-muted-foreground/60">
                Seus dados são confidenciais. Sem spam.
              </p>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-3xl">
              🎉
            </div>
            <h2 className="font-headline text-2xl font-bold text-foreground">
              Recebemos seu contato!
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Em breve entraremos em contato pelo WhatsApp que você informou. Fique de olho nas mensagens!
            </p>
            <p className="mt-2 text-xs font-medium text-gold/80">
              ⚡ Tempo médio de resposta: menos de 1 hora
            </p>
            <button
              onClick={onClose}
              className="mt-8 w-full rounded-full border border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-amber/60 hover:text-amber"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
      </div>
    </div>,
    document.body,
  );
}
