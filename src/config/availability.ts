/**
 * DISPONIBILIDADE DE VAGAS (fonte única)
 *
 * Todos os componentes que mostram vagas (hoje: Hero e CTA final) leem este arquivo.
 * Para atualizar, altere SOMENTE a constante VAGAS_DISPONIVEIS abaixo.
 *
 *   - Número inteiro >= 1  -> a frase de vagas aparece com esse número.
 *   - null (ou 0)          -> a frase de vagas NÃO é exibida em nenhum lugar.
 *
 * IMPORTANTE:
 *   - Este valor NÃO é atualizado automaticamente e não está ligado a nenhum sistema.
 *   - A LP é pré-renderizada no build: depois de editar o número, é preciso gerar um novo
 *     build/deploy para que a mudança apareça no site publicado.
 *   - Só informe um número que corresponda à disponibilidade real do mês.
 */
export const VAGAS_DISPONIVEIS: number | null = null;

export type VagasVariant = "hero" | "final";

/** Retorna a frase de vagas para o local indicado, ou null quando não há número válido. */
export function vagasMensagem(variant: VagasVariant): string | null {
  const n = VAGAS_DISPONIVEIS;
  if (n === null || !Number.isInteger(n) || n < 1) return null;
  const plural = n !== 1;
  if (variant === "hero") {
    return plural ? `Apenas ${n} vagas disponíveis este mês` : "Apenas 1 vaga disponível este mês";
  }
  return plural ? `Restam apenas ${n} vagas para este mês` : "Resta apenas 1 vaga para este mês";
}
