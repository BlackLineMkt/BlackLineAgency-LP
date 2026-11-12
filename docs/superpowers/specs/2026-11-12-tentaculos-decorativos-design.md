# Tentáculos decorativos nas bordas da LP — Design

Data: 2026-11-12

## Objetivo

Adicionar um toque visual de marca à LP: tentáculos do polvo (ícone da Black Line) subindo pelas laterais da página, como elemento puramente decorativo. Não pode afetar SEO, conversão, acessibilidade nem a velocidade.

## Decisões

| Tema | Decisão |
|---|---|
| Posição | Laterais contínuas (esquerda e direita), ao longo de toda a página |
| Estilo | Preto e cinza-escuro, com contorno dourado muito sutil |
| Movimento | Ondulação lenta e ambiente (CSS); estático com `prefers-reduced-motion` |
| Celular | Versão reduzida, cortada pela borda da tela |
| Implementação | SVG inline em componente React, animado com CSS |

Alternativas descartadas: imagem pronta (pesada, ondulação difícil) e canvas/JS procedural (pesado, exige JS no cliente, exagero para decoração).

## Componente

`src/components/blackline/Tentacles.tsx`, renderizado uma vez em `src/App.tsx`, dentro da `div` principal, antes da `Navbar`. Markup puro, sem `window`/efeitos, portanto seguro para SSR (`src/entry-server.tsx`).

## Posicionamento

- Camada `absolute`, `inset-y-0` na altura total da página, com `pointer-events: none`, `aria-hidden="true"` e `overflow: hidden` (sem scroll horizontal).
- Atrás do conteúdo: `z-index` baixo, sem nunca cobrir texto ou botões. O contêiner principal precisa de `relative` para ancorar a camada.
- 3 a 4 tentáculos por lado, em alturas diferentes, alguns espelhados, para dar a sensação de subirem pela página.

## Visual

- Preenchimento em gradiente preto → cinza-escuro (`#0B0B0B` → `#2a2a2a`).
- Contorno fino em `--amber` (`#C69A3B`), opacidade aproximada de 20–25%.
- Ventosas como pontos cinza sutis ao longo do tentáculo.
- Cores vindas dos tokens de `src/styles.css`, sem valores soltos quando houver token.

## Movimento

- `@keyframes` em `src/styles.css`, 8–14s por ciclo, com defasagem (`animation-delay`) entre tentáculos, usando `transform` (`rotate`/`translate`) para ficar na GPU.
- `@media (prefers-reduced-motion: reduce)` desliga a animação.

## Celular (< 768px)

Tentáculos menores e deslocados para fora da tela, com apenas ~20–30px visíveis na borda, passando por trás do conteúdo.

## Fora de escopo

- Ilustração final profissional dos tentáculos (o traço será desenhado à mão em SVG e pode ser trocado depois sem mudar a estrutura).
- Interação com scroll/parallax.
- Tentáculos em modais, popup de saída ou botão fixo mobile.

## Verificação

1. `build` sem erros.
2. No navegador, em desktop e celular: sem scroll horizontal, cliques e formulários funcionando, texto legível sobre os tentáculos.
3. Animação ativa e desligada com reduce-motion.
4. HTML renderizado pelo SSR inclui a camada e ela não polui o conteúdo lido por buscadores (`aria-hidden`, sem texto).
5. Ajuste fino visual (formato e intensidade do contorno dourado) feito olhando o resultado rodando.
