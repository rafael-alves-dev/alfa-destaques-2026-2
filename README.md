# Alfa Destaques 2026.2 — Polo Sarzedo

V3 Híbrida Premium. Projeto local atualizado, sem publicação.

## Abrir no Windows

Requer Node 22.12 ou mais recente. Abra o PowerShell nesta pasta.

Na primeira execução (ou após extrair o ZIP):

```powershell
npm.cmd ci
```

Para iniciar:

```powershell
npm.cmd run dev
```

Abra o endereço informado. Mantenha a janela aberta; encerre com Ctrl+C. Se a versão anterior já estava rodando nesta mesma pasta, basta atualizar o navegador com Ctrl+F5. Nenhuma dependência nova foi adicionada na V3.

## Compilação e verificação

```powershell
npm.cmd run build
npm.cmd test
npm.cmd run preview
```

A pasta `dist/` contém a compilação de produção; o projeto React precisa de um servidor local para executar, em vez de abrir `index.html` com duplo clique.

## O que compõe a V3

- Abertura ALFA DESTAQUES 2026.2, medalha com volume, luzes ambientais, partículas e composição comemorativa Polo Sarzedo.
- Quatro seções numeradas: Panorama, Hall da Fama, Desafios do Conhecimento e Conquistas por Disciplina.
- Seis indicadores grandes e três cards de turma, com contadores e barras progressivas.
- Pódios com medalhas numeradas, faixas individuais para cada homenageado e transição entre turmas.
- Questões em grid, com círculos que se preenchem ao entrar na viewport, disciplina, professor, erros, percentual e alternativa correta.
- Cinco cards de aproveitamento real por disciplina, com barras animadas e acesso às questões correspondentes.
- Pausa global dos efeitos, respeito à redução de movimento do dispositivo e efeitos simplificados no celular.

O seletor de turma é compartilhado entre as seções; a turma escolhida acompanha a navegação. O seletor de disciplina nos Desafios apresenta cada Top 3 completo, incluindo os empates. Projeto Integrador tem apenas duas questões.

## Dados e privacidade

O JSON validado permanece idêntico à versão anterior. Os 15 aproveitamentos e os 15 conjuntos de questões difíceis foram novamente conferidos com os registros completos da planilha. Aproveitamento = soma de acertos / (participantes × quantidade de questões da disciplina). Não foi calculado a partir do Top 3.

Não há planilha completa, nomes integrais ou respostas individuais dos 70 estudantes neste projeto. O JSON contém somente agregados e os 24 homenageados abreviados. Fontes e dados são locais; não há analytics ou serviços de terceiros na página.

**Nomes abreviados associados às notas ainda dependem de aprovação escolar antes de qualquer publicação.** `noindex` e abreviações não tornam dados privados ou anônimos.

## GitHub Pages

A configuração foi mantida. `base: './'` permite assets em subdiretórios; a navegação usa âncoras. O workflow `.github/workflows/pages.yml` só é disparado manualmente, exige `APROVADO` no campo de aprovação e utiliza o ambiente `github-pages`. Não existe disparo por push.

Após a autorização escolar e revisão final, configurar Settings → Pages → GitHub Actions, escolher revisores no ambiente quando disponível e executar o workflow manualmente. Nenhum repositório foi criado e nenhum deploy foi executado.

## Referências e evidências

As capturas da outra IA mencionadas no brief V3 não estavam anexadas a esse envio. A organização segue os critérios descritos no brief. A marca Alfa continua sendo o recorte original fornecido, sem deformação. O selo Polo Sarzedo é uma composição comemorativa de localidade; não representa brasão oficial nem parceria com a Prefeitura.

Capturas e evidências de animações em `qa/v3/`. Relatório de melhorias e testes em `RELATORIO-V3.md`. Os scripts de captura utilizam o navegador e o Playwright do ambiente de desenvolvimento; os testes de dados (`npm.cmd test`) usam apenas Node.
