import type { CSSProperties } from "react";
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
          } as CSSProperties
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
