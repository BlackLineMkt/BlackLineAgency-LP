const WHATSAPP_NUMBER = "5561994014479";

export const trackWhatsAppClick = (buttonText: string) => {
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
