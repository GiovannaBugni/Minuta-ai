export interface Action {
  task: string;
  owner: string;
  deadline: string;
  evidence: string;
}

export interface Report {
  summary: string;
  decisions: string[];
  actions: Action[];
  openQuestions: string[];
}

export interface SavedReport {
  id: string;
  title: string;
  date: string;
  createdAt: string;
  source: string;
  report: Report;
}

export const EXAMPLE = `Reunião de planejamento — Portal de estudos
Participantes: Ana, Bruno e Carla. Data: 28/10/2026.
Ana: O objetivo é entregar a primeira versão do portal com login e lista de cursos.
Bruno: A integração de pagamento ainda depende da aprovação do fornecedor.
Carla: Concordamos em deixar o pagamento para uma segunda etapa.
Ana: Vou revisar o protótipo e enviar a versão final até 30/10/2026.
Bruno: Eu implementarei o login até 03/11/2026.
Carla: Vou testar o login até 05/11/2026.
Ana: Também precisamos atualizar a documentação, mas ainda não definimos quem fará isso nem a data.
Bruno: Precisamos confirmar se o fornecedor aceita Pix.
Carla: Ficou decidido que a primeira versão terá login e lista de cursos, sem pagamento.`;

export function isReport(value: unknown): value is Report {
  if (!value || typeof value !== 'object') return false;
  const r = value as Report;
  const strings = (a: unknown) =>
    Array.isArray(a) && a.every(x => typeof x === 'string');
  return (
    typeof r.summary === 'string' &&
    strings(r.decisions) &&
    strings(r.openQuestions) &&
    Array.isArray(r.actions) &&
    r.actions.every(
      a =>
        a &&
        ['task', 'owner', 'deadline', 'evidence'].every(
          k => typeof a[k as keyof Action] === 'string'
        )
    )
  );
}

export function toMarkdown(item: SavedReport): string {
  const r = item.report;
  return `# ${item.title}\n\nData: ${item.date || 'Não informada'}\n\n## Resumo executivo\n${r.summary}\n\n## Decisões\n${r.decisions.map(x => '- ' + x).join('\n') || 'Nenhuma decisão identificada.'}\n\n## Plano de ação\n${r.actions.map((a, i) => `${i + 1}. ${a.task}\n   Responsável: ${a.owner}\n   Prazo: ${a.deadline}\n   Evidência: ${a.evidence}`).join('\n\n') || 'Nenhuma ação identificada.'}\n\n## Pontos em aberto\n${r.openQuestions.map(x => '- ' + x).join('\n') || 'Nenhum ponto identificado.'}\n\n---\nGerado com IA pelo Minuta. Revise antes de compartilhar.\n`;
}
