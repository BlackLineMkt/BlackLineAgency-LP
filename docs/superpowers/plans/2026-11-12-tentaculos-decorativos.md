# Tentáculos decorativos nas bordas da LP — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar tentáculos decorativos (preto/cinza, contorno dourado sutil, ondulação lenta) subindo pelas duas laterais da LP, sem afetar SEO, cliques nem acessibilidade.

**Architecture:** Um componente React `Tentacles` (markup puro, seguro para SSR) renderiza uma camada `absolute` atrás do conteúdo, com 8 tentáculos em SVG inline (4 por lado). O CSS da animação mora num arquivo próprio ao lado do componente. O `App.tsx` só monta o componente e cria o contexto de empilhamento (`relative isolate`).

**Tech Stack:** React 19, Tailwind CSS 4 (`@source "../src"`), Vite SSR + `scripts/prerender.mjs`, CSS puro para `@keyframes`.

**Spec:** `docs/superpowers/specs/2026-11-12-tentaculos-decorativos-design.md`

---

## Observações importantes antes de começar

- **O projeto não tem framework de testes** (sem Vitest/Jest, sem script `test`). Não vamos adicionar um para um elemento decorativo (YAGNI). A verificação é: `eslint`, `npm run build` (que roda o prerender/SSR), checagem do HTML gerado e conferência visual no navegador.
- **A árvore de trabalho tem muitas alterações não commitadas do usuário** (SEO, `styles.css`, `index.html` etc.). Por isso:
  - **Nunca** usar `git add -A`, `git add .` ou `git commit -a`. Adicionar sempre arquivos específicos, e commitar com `git commit -m "..." -- <arquivos>`.
  - O CSS dos tentáculos vai em um **arquivo novo** (`tentacles.css`), e **não** em `src/styles.css`, para não misturar com as mudanças do usuário. A spec foi ajustada na Task 4 para refletir isso.
- Empilhamento: as `<section>` da LP são `relative` sem `z-index`, e `<main>`/`<footer>` não são posicionados. Uma camada `absolute` com `z-0` ficaria **por cima** do conteúdo não posicionado (rodapé). Por isso a camada usa `-z-10` e o wrapper do `App` usa `isolate` (cria o contexto de empilhamento, mantendo o fundo `bg-background` atrás dos tentáculos).

## Estrutura de arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `src/components/blackline/tentacles.css` | Criar | `@keyframes` de ondulação, classes `.tentacle-*`, `prefers-reduced-motion` |
| `src/components/blackline/Tentacles.tsx` | Criar | Camada decorativa: SVG do tentáculo, lista de posições, defs do gradiente |
| `src/App.tsx` | Modificar (linhas 22 e 23) | Wrapper `relative isolate` + `<Tentacles />` antes da `Navbar` |
| `docs/superpowers/specs/2026-11-12-tentaculos-decorativos-design.md` | Modificar | Corrigir onde fica o CSS e o `isolate` |

---

### Task 1: CSS da animação

**Files:**
- Create: `src/components/blackline/tentacles.css`

- [ ] **Step 1: Criar o arquivo de CSS**

```css
/* Tentáculos decorativos (ver Tentacles.tsx). Apenas visual, sem interação. */

/* Contorno dourado bem sutil + vetor sem engrossar ao escalar */
.tentacle-body {
  stroke: var(--amber);
  stroke-opacity: 0.22;
  stroke-width: 1.2;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

.tentacle-sucker {
  fill: #3a3a3a;
  fill-opacity: 0.55;
}

/* A base do tentáculo some gradualmente, para não aparecer um corte reto */
.tentacle-shape {
  display: block;
  width: 100%;
  height: 100%;
  -webkit-mask-image: linear-gradient(to top, transparent 0, #000 14%);
  mask-image: linear-gradient(to top, transparent 0, #000 14%);
}

/* Ondulação lenta: gira a partir da base. Duração e atraso vêm de variáveis inline. */
@keyframes tentacle-sway {
  0%,
  100% {
    transform: rotate(-2deg) translateX(-3px);
  }
  50% {
    transform: rotate(2.5deg) translateX(4px);
  }
}

.tentacle-sway {
  transform-origin: 20% 100%;
  animation: tentacle-sway var(--sway-duration, 12s) ease-in-out var(--sway-delay, 0s) infinite;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .tentacle-sway {
    animation: none;
    will-change: auto;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blackline/tentacles.css
git commit -m "style: css da ondulação dos tentáculos decorativos" -- src/components/blackline/tentacles.css
```

Expected: `1 file changed`.

---

### Task 2: Componente `Tentacles`

**Files:**
- Create: `src/components/blackline/Tentacles.tsx`

- [ ] **Step 1: Criar o componente**

O tentáculo é um único `path` fechado (viewBox `0 0 160 1000`): a base fica embaixo e perto da borda, sobe em "S" e afina até uma ponta no topo. Cada trecho usa curvas cúbicas com tangente vertical nos pontos, o que garante uma curva suave. Os lados são espelhados com `-scale-x-100` num wrapper separado, para não conflitar com o `transform` da animação.

```tsx
import "./tentacles.css";

// Contorno do tentáculo (viewBox 160x1000): borda externa subindo, ponta, borda interna descendo.
const TENTACLE_PATH =
  "M -4,1000 C -4,900 41,900 41,800 C 41,700 10,700 10,600 C 10,500 59,500 59,400 " +
  "C 59,300 28,300 28,200 C 28,130 77,130 77,60 C 77,40 85,22 92,18 " +
  "C 90,30 83,40 83,60 C 83,130 42,130 42,200 C 42,300 81,300 81,400 " +
  "C 81,500 40,500 40,600 C 40,700 79,700 79,800 C 79,900 44,900 44,1000 Z";

// Ventosas sobre a linha central: [x, y, raio], diminuindo em direção à ponta.
const SUCKERS: ReadonlyArray<readonly [number, number, number]> = [
  [24, 960, 4],
  [40, 900, 3.6],
  [55, 840, 3.4],
  [52, 740, 3],
  [40, 680, 2.8],
  [30, 610, 2.6],
  [44, 520, 2.4],
  [65, 430, 2.2],
  [60, 330, 1.8],
  [40, 230, 1.5],
  [40, 150, 1.2],
];

type Placement = {
  side: "left" | "right";
  /** posição vertical dentro da página (percentual da altura total) */
  top: string;
  /** segundos por ciclo de ondulação */
  duration: number;
  /** atraso negativo: cada tentáculo começa em um ponto diferente do ciclo */
  delay: number;
};

const PLACEMENTS: ReadonlyArray<Placement> = [
  { side: "left", top: "3%", duration: 11, delay: 0 },
  { side: "right", top: "12%", duration: 13, delay: -4 },
  { side: "left", top: "28%", duration: 12, delay: -7 },
  { side: "right", top: "37%", duration: 10, delay: -2 },
  { side: "left", top: "53%", duration: 14, delay: -5 },
  { side: "right", top: "62%", duration: 11, delay: -9 },
  { side: "left", top: "78%", duration: 13, delay: -3 },
  { side: "right", top: "87%", duration: 12, delay: -6 },
];

function Tentacle({ side, top, duration, delay }: Placement) {
  const sideClass =
    side === "left" ? "-left-9 md:-left-[30px]" : "-right-9 -scale-x-100 md:-right-[30px]";

  return (
    <div
      className={`absolute h-[760px] w-[120px] md:h-[1000px] md:w-[160px] ${sideClass}`}
      style={{ top }}
    >
      <div
        className="tentacle-sway h-full w-full"
        style={
          {
            "--sway-duration": `${duration}s`,
            "--sway-delay": `${delay}s`,
          } as React.CSSProperties
        }
      >
        <svg className="tentacle-shape" viewBox="0 0 160 1000" focusable="false">
          <path className="tentacle-body" d={TENTACLE_PATH} fill="url(#tentacle-fill)" />
          {SUCKERS.map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} className="tentacle-sucker" cx={cx} cy={cy} r={r} />
          ))}
        </svg>
      </div>
    </div>
  );
}

/**
 * Tentáculos do polvo da marca subindo pelas laterais da página.
 * Puramente decorativo: sem texto, sem foco, sem eventos de ponteiro, escondido de leitores de tela.
 * Fica atrás do conteúdo (-z-10): o wrapper do App precisa ser `relative isolate`.
 */
export function Tentacles() {
  return (
    <div
      aria-hidden="true"
      data-tentacles
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <svg width="0" height="0" className="absolute" focusable="false">
        <defs>
          <linearGradient id="tentacle-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#161616" />
            <stop offset="1" stopColor="#2c2c2c" />
          </linearGradient>
        </defs>
      </svg>
      {PLACEMENTS.map((p) => (
        <Tentacle key={`${p.side}-${p.top}`} {...p} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Rodar o lint no arquivo**

Run: `npx eslint src/components/blackline/Tentacles.tsx`
Expected: sem erros. Se reclamar de `React` não importado em `React.CSSProperties`, trocar o import do topo por `import type { CSSProperties } from "react";` e usar `as CSSProperties`.

- [ ] **Step 3: Commit**

```bash
git add src/components/blackline/Tentacles.tsx
git commit -m "feat: componente Tentacles com tentáculos decorativos em SVG" -- src/components/blackline/Tentacles.tsx
```

---

### Task 3: Montar no `App`

**Files:**
- Modify: `src/App.tsx` (imports e linhas 22–23)

- [ ] **Step 1: Confirmar que `App.tsx` não tem alterações do usuário**

Run: `git status --short src/App.tsx`
Expected: saída vazia. Se aparecer `M`, **não** commitar o arquivo inteiro: avise o usuário e use `git add -p`.

- [ ] **Step 2: Importar o componente**

Em `src/App.tsx`, logo após a linha `import { ExitIntentPopup } ...` (linha 16), adicionar:

```tsx
import { Tentacles } from "@/components/blackline/Tentacles";
```

- [ ] **Step 3: Criar o contexto de empilhamento e renderizar a camada**

Trocar:

```tsx
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
```

por:

```tsx
    <div className="relative isolate min-h-screen bg-background text-foreground">
      <Tentacles />
      <Navbar />
```

- [ ] **Step 4: Lint**

Run: `npx eslint src/App.tsx src/components/blackline/Tentacles.tsx`
Expected: sem erros.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: exibe tentáculos decorativos nas laterais da LP" -- src/App.tsx
```

---

### Task 4: Verificação (build, SSR, navegador) e spec

**Files:**
- Modify: `docs/superpowers/specs/2026-11-12-tentaculos-decorativos-design.md`

- [ ] **Step 1: Build completo**

Run: `npm run build`
Expected: termina sem erro (roda `vite build`, o bundle SSR e `scripts/prerender.mjs`). Se falhar por motivo alheio aos tentáculos (ex.: mudanças de SEO em andamento do usuário), reportar a saída ao usuário em vez de corrigir.

- [ ] **Step 2: Conferir o HTML pré-renderizado**

Run: `grep -c "data-tentacles" dist/index.html`
Expected: `1` (ou mais de 0 se o HTML estiver em uma única linha; o importante é encontrar).

Run: `grep -o 'data-tentacles[^>]*' dist/index.html`
Expected: o atributo `data-tentacles` aparece junto com `aria-hidden="true"`, e não há texto dentro da camada.

- [ ] **Step 3: Conferir no navegador (desktop)**

Run: `npm run dev` (em segundo plano) e abrir a URL local no Chrome (`mcp__claude-in-chrome__*`), largura ≥ 1280px. Conferir:
1. Os tentáculos aparecem nas duas laterais, atrás de todo o conteúdo, incluindo o rodapé.
2. Sem scroll horizontal (`document.documentElement.scrollWidth === document.documentElement.clientWidth`, via `javascript_tool`).
3. Botões, links e o modal de captura de lead continuam clicáveis.
4. A ondulação é lenta e discreta; o contorno dourado é quase imperceptível.
5. Se alguma seção tiver fundo sólido de largura total escondendo os tentáculos, anotar qual (ajuste fino na Task 5).

- [ ] **Step 4: Conferir no navegador (celular)**

Redimensionar para 390px de largura (`resize_window`) e conferir: aparecem só ~20–30px na borda, sem cobrir texto, sem scroll horizontal.

- [ ] **Step 5: Conferir `prefers-reduced-motion`**

Nas ferramentas do navegador, emular `prefers-reduced-motion: reduce` e confirmar que os tentáculos ficam parados. Alternativa: via `javascript_tool`, `getComputedStyle(document.querySelector('.tentacle-sway')).animationName` deve retornar `none` com a preferência ativa.

- [ ] **Step 6: Atualizar a spec (CSS em arquivo próprio e `isolate`)**

No arquivo da spec, trocar a linha da seção "Movimento":

`- \`@keyframes\` em \`src/styles.css\`, 8–14s por ciclo, ...`

por:

`- \`@keyframes\` em \`src/components/blackline/tentacles.css\` (importado pelo componente, para não misturar com o \`styles.css\`), 8–14s por ciclo, ...`

E, na seção "Posicionamento", trocar "O contêiner principal precisa de `relative` para ancorar a camada." por "O wrapper do `App` precisa ser `relative isolate`: `relative` ancora a camada e `isolate` cria o contexto de empilhamento que permite usar `-z-10` sem esconder a camada atrás do fundo."

- [ ] **Step 7: Commit da spec**

```bash
git add docs/superpowers/specs/2026-11-12-tentaculos-decorativos-design.md
git commit -m "docs: ajusta spec dos tentáculos (css próprio e isolate)" -- docs/superpowers/specs/2026-11-12-tentaculos-decorativos-design.md
```

---

### Task 5: Ajuste fino visual

**Files:**
- Modify (conforme necessário): `src/components/blackline/Tentacles.tsx`, `src/components/blackline/tentacles.css`

O formato e a intensidade do dourado são decisões visuais: olhar o resultado com o usuário e ajustar. Botões de ajuste, todos já isolados:

| Se o usuário quiser... | Mexer em |
|---|---|
| Contorno dourado mais/menos visível | `stroke-opacity` em `.tentacle-body` (`0.22`) |
| Tentáculos mais claros/escuros | `stopColor` do `linearGradient` em `Tentacles.tsx` |
| Mais/menos balanço | ângulos e `translateX` em `@keyframes tentacle-sway` |
| Mais rápido/lento | `duration` em `PLACEMENTS` |
| Mais/menos tentáculos ou outras alturas | lista `PLACEMENTS` |
| Maior/menor | classes `h-[...] w-[...]` em `Tentacle` |
| Mais/menos aparecendo no celular | `-left-9` / `-right-9` em `Tentacle` |
| Seção que esconde os tentáculos | remover o fundo sólido da seção, ou deixá-lo semitransparente |

- [ ] **Step 1: Aplicar os ajustes pedidos e recarregar o navegador para conferir.**
- [ ] **Step 2: Rodar `npx eslint src/components/blackline/Tentacles.tsx` e `npm run build` de novo.**
- [ ] **Step 3: Commit dos ajustes**

```bash
git add src/components/blackline/Tentacles.tsx src/components/blackline/tentacles.css
git commit -m "style: ajuste fino dos tentáculos decorativos" -- src/components/blackline/Tentacles.tsx src/components/blackline/tentacles.css
```

---

## Auto-revisão contra a spec

| Requisito da spec | Onde é atendido |
|---|---|
| Laterais contínuas, ao longo da página | `PLACEMENTS` (8 tentáculos, tops de 3% a 87%) — Task 2 |
| Preto/cinza + contorno dourado sutil via `--amber` | gradiente em `Tentacles.tsx`, `.tentacle-body` — Tasks 1–2 |
| Ondulação lenta, defasada, via `transform` | `@keyframes tentacle-sway` + `delay` negativo por tentáculo — Tasks 1–2 |
| `prefers-reduced-motion` desliga | Media query — Task 1; conferido na Task 4 passo 5 |
| Celular: reduzido e cortado pela borda | `h-[760px] w-[120px]`, `-left-9`/`-right-9` — Task 2; conferido na Task 4 passo 4 |
| Camada `absolute`, `pointer-events-none`, `aria-hidden`, `overflow-hidden`, atrás do conteúdo | `Tentacles` + `relative isolate` no `App` — Tasks 2–3 |
| Seguro para SSR / sem texto | Markup puro; conferido na Task 4 passo 2 |
| Sem scroll horizontal, cliques intactos | Task 4 passos 3–4 |
| Ajuste fino visual | Task 5 |
