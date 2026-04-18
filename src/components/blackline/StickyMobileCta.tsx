import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "@/lib/contact";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const plansEl = document.getElementById("planos");
    const onScroll = () => {
      const scrolled = window.scrollY > 300;
      let beforePlans = true;
      if (plansEl) {
        const rect = plansEl.getBoundingClientRect();
        // hide once user reaches the plans section
        beforePlans = rect.top > 80;
      }
      setVisible(scrolled && beforePlans);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-3 transition-all duration-300 md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{
        background:
          "linear-gradient(to top, oklch(0.13 0 0) 60%, transparent)",
      }}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold"
      >
        Quero lotar minha agenda →
      </a>
    </div>
  );
}
