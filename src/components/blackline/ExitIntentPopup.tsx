import { useEffect, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/5561994014479?text=Oi%2C+vi+a+LP+da+Black+Line+e+quero+saber+mais";

const INACTIVITY_MS = 30000;

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alreadyShown = false;
    let inactivityTimer: number | undefined;

    const hasWhatsAppClicked = () =>
      (window as unknown as { __whatsappClicked?: boolean }).__whatsappClicked === true;

    const show = () => {
      if (alreadyShown) return;
      if (hasWhatsAppClicked()) return;
      alreadyShown = true;
      setOpen(true);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "exit_intent_shown" });
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", "ExitIntentShown");
      }
      cleanupListeners();
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    const resetInactivity = () => {
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(show, INACTIVITY_MS);
    };

    const isMobile = window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window;

    const cleanupListeners = () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", resetInactivity);
      window.removeEventListener("touchmove", resetInactivity);
      window.removeEventListener("scroll", resetInactivity);
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
    };

    if (isMobile) {
      window.addEventListener("touchstart", resetInactivity, { passive: true });
      window.addEventListener("touchmove", resetInactivity, { passive: true });
      window.addEventListener("scroll", resetInactivity, { passive: true });
      resetInactivity();
    } else {
      document.addEventListener("mouseleave", onMouseLeave);
    }

    return cleanupListeners;
  }, []);

  const handleClose = () => setOpen(false);

  const handleCtaClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "exit_intent_converted" });
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", { source: "exit_popup" });
    }
    (window as unknown as { __whatsappClicked?: boolean }).__whatsappClicked = true;
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          backgroundColor: "#0a0a0a",
          border: "1px solid #C9A84C",
          borderRadius: "8px",
          padding: "40px",
          width: "90%",
          maxWidth: "480px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fechar"
          style={{
            position: "absolute",
            top: "12px",
            right: "16px",
            background: "transparent",
            border: "none",
            color: "#666",
            fontSize: "28px",
            lineHeight: 1,
            cursor: "pointer",
            padding: 0,
          }}
        >
          ×
        </button>
        <h2
          id="exit-intent-title"
          style={{
            color: "#C9A84C",
            textTransform: "uppercase",
            fontWeight: 700,
            fontSize: "22px",
            margin: 0,
            marginBottom: "16px",
            letterSpacing: "0.04em",
          }}
        >
          Espera um segundo.
        </h2>
        <p
          style={{
            color: "#ffffff",
            fontSize: "15px",
            lineHeight: 1.55,
            margin: 0,
            marginBottom: "28px",
          }}
        >
          Antes de sair — a gente atende poucos estúdios por vez pra garantir foco total em cada
          cliente. Se o seu estúdio tem potencial, a conversa é rápida e sem compromisso.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          onClick={handleCtaClick}
          style={{
            display: "block",
            textAlign: "center",
            backgroundColor: "#C9A84C",
            color: "#0a0a0a",
            textTransform: "uppercase",
            fontWeight: 700,
            fontSize: "14px",
            padding: "14px 20px",
            borderRadius: "6px",
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          Falar com a Black Line agora
        </a>
      </div>
    </div>
  );
}
