import { useEffect, useState } from "react";
import { LeadCaptureModal } from "./LeadCaptureModal";

const INACTIVITY_MS = 30000;

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let alreadyShown = false;
    let inactivityTimer: number | undefined;

    const show = () => {
      if (alreadyShown) return;
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
    setOpen(false);
    setShowModal(true);
  };

  return (
    <>
      {open && (
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
              Antes de fechar essa aba...
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
              Quantos clientes novos seu estúdio perdeu esse mês por falta de visibilidade? A gente
              não trabalha com qualquer estúdio, escolhemos os que levam o jogo a sério. Se você
              chegou até aqui, provavelmente se encaixa.
              <br />
              <br />
              Uma conversa de 15 minutos pode mudar o jogo. Sem pitch, sem enrolação.
            </p>
            <button
              type="button"
              onClick={handleCtaClick}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                backgroundColor: "#C9A84C",
                color: "#0a0a0a",
                textTransform: "uppercase",
                fontWeight: 700,
                fontSize: "14px",
                padding: "14px 20px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              Falar com a Black Line agora
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <LeadCaptureModal
          onClose={() => setShowModal(false)}
          source="exit_popup"
        />
      )}
    </>
  );
}
