import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Usado apenas no build (scripts/prerender.mjs): gera o HTML inicial da LP.
 * O mesmo <App /> é hidratado no navegador por src/main.tsx.
 */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
