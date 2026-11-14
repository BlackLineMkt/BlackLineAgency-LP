import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Build de produção: o HTML já vem pré-renderizado (scripts/prerender.mjs), então hidratamos.
// Em desenvolvimento (vite dev) o #root está vazio e a página é montada normalmente.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
