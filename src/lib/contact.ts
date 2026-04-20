import type { MouseEvent } from "react";

const WHATSAPP_NUMBER = "5561994014479";

export const trackWhatsAppClick = (buttonText: string) => {
  if (typeof window === 'undefined') return;
  if (window.fbq) {
    window.fbq('track', 'Lead', { content_name: buttonText });
  }
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'whatsapp_click',
      button_text: buttonText,
    });
  }
};

/**
 * Dispara o tracking (fbq Lead + dataLayer) e só depois abre o WhatsApp,
 * com delay de 300ms para garantir que o evento seja enviado antes da navegação.
 * Use em onClick de qualquer botão/link que aponte para wa.me.
 */
export const handleWhatsAppClick = (
  url: string,
  buttonText: string,
) => (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
  event.preventDefault();
  event.stopPropagation();
  trackWhatsAppClick(buttonText);
  window.setTimeout(() => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, 300);
};

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_DOUBT_MESSAGE =
  "Olá, tenho uma dúvida sobre a Black Line Agency";
export const WHATSAPP_URL = buildWhatsAppUrl(WHATSAPP_DOUBT_MESSAGE);

export const WHATSAPP_PLAN_MESSAGES: Record<string, string> = {
  Starter: "Olá, tenho interesse no plano Starter da Black Line Agency",
  "Black Line": "Olá, tenho interesse no plano Black Line da Black Line Agency",
  Full: "Olá, tenho interesse no plano Full da Black Line Agency",
};

export const CONTACT_EMAIL = "contato.blacklineagency@gmail.com";
export const INSTAGRAM = "@blackline.mkt";
