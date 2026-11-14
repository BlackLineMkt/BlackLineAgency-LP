import { Instagram } from "lucide-react";
import { CONTACT_EMAIL, INSTAGRAM } from "@/lib/contact";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Logo />
            <p className="text-xs text-muted-foreground">
              Agência de marketing para estúdios de tatuagem
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:items-end">
            <a
              href="https://www.instagram.com/blackline.mkt/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Black Line"
              className="inline-flex items-center gap-2 transition-colors hover:text-amber"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              {INSTAGRAM}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-amber">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-border" />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Black Line Agency. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
