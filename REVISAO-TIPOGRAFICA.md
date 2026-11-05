# Revisão tipográfica V3

- Conteúdo auxiliar: mínimo 14px; corpo, professores e controles principais: 16–18px; nomes: 17–18px.
- Famílias, pesos, cores, degradês, animações, nomes abreviados e gabaritos preservados. src/data.json sem alteração.
- Build de produção aprovado. Quatro testes de dados aprovados.
- Conferência no navegador: 360, 390, 430, 768, 1024 e 1440px; três turmas e cinco disciplinas em cada largura (90 combinações), sem cortes nos elementos de texto verificados.
- Capturas desktop de desafios e mobile do Hall inspecionadas visualmente.
- Ajustes de navegação e grade entre 601 e 1100px acomodam a escala ampliada. Celulares preservam os cards em coluna.
- Detector: somente avisos sobre os novos passos de 18 e 20px; escala intencional documentada em DESIGN.md.
- Prévia: npm ci; npm run build; npm run preview. Abrir /alfa-destaques-2026-2/ no endereço local informado.
- Branch: fix/legibilidade-tipografia. Nenhum workflow manual ou publicação solicitado. A main possui gatilho automático de Pages; não integrar antes da aprovação escolar e revisão desse gatilho.
- Teste de interações V3 aprovado em 320, 360, 390, 430, 768 e 1440px: trocas de turma, filtros, gabaritos, anéis progressivos, confetes, pausa e reduced-motion; sem overflow horizontal ou erros de execução.
