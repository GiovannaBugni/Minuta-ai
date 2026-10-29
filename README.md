# Minuta - Relatórios de reunião com IA

Aplicação acadêmica desenvolvida com auxílio de LLM. Transforma anotações de reuniões em resumo executivo, decisões, plano de ação e pontos em aberto.

**App publicado:** https://minuta-jgtbky.v2.appdeploy.ai/

**Código no GitHub:** https://github.com/GiovannaBugni/Minuta-ai

## Entregáveis

- Código completo do frontend e backend utilizados no AppDeploy.
- `docs/PROMPTS.md`: pedido de origem, prompt exato da IA e identificação das ferramentas/modelos.
- `docs/TELAS_E_DEMONSTRACAO.md`: telas, exemplo e roteiro de apresentação.
- `docs/exemplo-relatorio-gerado.md`: saída real exportada do app publicado.
- `docs/tela-*.jpg`: capturas reais das telas com dados fictícios.
- `tests/tests.json`: cinco cenários de aceitação, incluindo tratamento de falhas.

## Funcionalidades

1. Formulário com título, data opcional e transcrição de 40 a 18.000 caracteres.
2. Exemplo fictício pronto para demonstração.
3. Extração real por IA no backend, com resposta JSON estruturada.
4. Visão geral com resumo, decisões e pontos em aberto.
5. Plano de ação com responsáveis, prazos e trecho de evidência.
6. Consulta ao texto original.
7. Histórico dos últimos 20 relatórios no navegador, busca e exclusão confirmada.
8. Cópia e download em Markdown.
9. Guia do projeto dentro do app e interface responsiva.

## LLMs e ferramentas

| Finalidade | Ferramenta/modelo | O que foi feito |
|---|---|---|
| Desenvolvimento | ChatGPT / Codex, baseado em GPT-6 | Planejamento, geração de código, prompts, revisão e documentação |
| IA durante o uso | AppDeploy AI via `ai.extract` | Extração estruturada das anotações |
| Modelo de execução | Gerenciado pelo AppDeploy; nome e versão não expostos pelo SDK consultado | Não foi possível identificar o modelo exato; não se atribui essa execução a GPT, Claude ou Gemini sem evidência |
| Interface e publicação | React, TypeScript, Vite, CSS, Lucide e AppDeploy | UI, backend e hospedagem |

Lovable, Bolt, v0.dev e Runable foram exemplos do enunciado; não foram utilizados nesta implementação. O projeto foi construído com ChatGPT/Codex e publicado no AppDeploy.

## Organização do código

| Arquivo | Responsabilidade |
|---|---|
| `src/Minuta.tsx` | Formulário, geração, navegação, histórico e exportação |
| `src/report.ts` | Tipos, transcrição de exemplo, validação da resposta e Markdown |
| `src/styles.css` | Identidade visual e adaptação a celular |
| `backend/index.ts` | Rota `POST /api/report` |
| `backend/report.ts` | Prompt, esquema JSON, validação, chamada de IA e erros |
| `tests/tests.json` | Cenários de aceitação para execução no ambiente AppDeploy |

O navegador envia somente `source` ao backend. Título e data do formulário são metadados locais e não alteram a extração. A IA preserva datas relativas como informadas na transcrição; a data opcional não converte expressões como “amanhã”.

## Execução e implantação

Esta é uma aplicação para o runtime AppDeploy. Os módulos `@appdeploy/client` e `@appdeploy/sdk` são injetados pela plataforma, não estão no `package.json` e não são substituídos por resultados simulados.

Para usar, abra a URL publicada. Para republicar, utilize o AppDeploy com arquitetura `frontend+backend` e template `react-vite`, enviando os arquivos deste projeto. Os scripts Vite são `dev`, `build` e `preview`, mas dependem do ambiente que fornece o SDK: executar apenas `npm install && npm run dev` fora da plataforma não configura o backend nem a IA. Uma migração independente exige substituir o cliente de API e o adaptador de IA, além de fornecer infraestrutura de backend e credenciais próprias. GitHub Pages sozinho não executa este backend.

Não há credenciais no código. A execução de IA depende da disponibilidade e dos créditos da conta AppDeploy.

## Repositório e código

Código-fonte e materiais do projeto:

https://github.com/GiovannaBugni/Minuta-ai

Para obter uma cópia:

```bash
git clone https://github.com/GiovannaBugni/Minuta-ai.git
cd Minuta-ai
```

A hospedagem funcional continua no AppDeploy. O GitHub reúne o código, os prompts, as capturas reais, o relatório de exemplo e esta documentação. Consulte as dependências do runtime na seção Execução e implantação antes de executar o projeto fora do AppDeploy.

## Validação realizada

Em 28/10/2026, a plataforma informou publicação `ready`, sem erros de frontend, backend ou rede na verificação inicial. No navegador, foram confirmados: geração real com o exemplo, duas decisões, três ações, duas pendências, evidência literal da ação de Ana, download Markdown e histórico após atualização.

Os cinco cenários em `tests/tests.json` são uma especificação de aceitação. O retorno da plataforma não apresenta um relatório individual de aprovação dos cinco casos; portanto, não se afirma que toda a suíte foi executada. O teste de falha injetada e o fluxo completo de exclusão permanecem disponíveis para validação adicional.

## Limitações

- A IA pode omitir informações, interpretar ambiguidades ou errar. A revisão humana é necessária.
- A conferência literal da evidência verifica presença do trecho, mas não garante a correção de toda a interpretação.
- “Não informado” é usado para responsável/prazo ausente em ações extraídas. Uma tarefa ainda não acordada pode aparecer apenas como ponto em aberto.
- Sem gravação de áudio, edição manual do resultado, notificações ou sincronização entre dispositivos.
- O histórico fica em `localStorage`, sem criptografia própria do app. Limpar os dados do navegador remove os registros. O app não oferece contas de usuário.
- A transcrição é enviada ao serviço de IA. Este projeto não define a política de retenção do provedor.
- O backend expõe uma rota de geração; limites de abuso, autenticação e quotas por usuário seriam necessários para ampliar o uso em produção.
- Capturas e dados de exemplo são fictícios e não contêm informações de empregadores.
