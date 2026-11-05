# V3 — melhorias e testes

## Estado entregue

V3 funcional na mesma pasta do projeto, com código-fonte e compilação de produção. Sem publicação, criação de repositório ou alteração do workflow manual de GitHub Pages. O julgamento estético final deve ser feito pelas capturas e pela página aberta: os testes abaixo verificam dados, funcionamento, visibilidade e movimento, não substituem essa avaliação.

## Mudanças

| Área | V3 |
|---|---|
| Abertura | Nome ALFA DESTAQUES 2026.2 em destaque; medalha com volume metálico, fitas, base e selo comemorativo Polo Sarzedo; composição diferente da V2 |
| Organização | Quatro seções numeradas: Panorama, Hall, Desafios e Conquistas |
| Panorama | Seis indicadores em grid, contadores progressivos, três cards de turma com médias e barras |
| Hall | Medalhas numeradas; cada homenageado tem faixa própria, entrada individual, brilho e feedback ao pressionar; pódios com saída/entrada animada |
| Desafios | Cards de questão em grid, filtro de disciplina, seletor de turma e círculos SVG que preenchem ao entrar na viewport |
| Disciplinas | Cinco cards com aproveitamento real completo, professor, barra progressiva e acesso às questões correspondentes |
| Movimento | Revelações ao rolar, máscaras, nomes em sequência, paralaxe e luz ambiente; controle global de pausa e reduced-motion |
| Sarzedo | Presença no cabeçalho, inscrição institucional, placa comemorativa no hero e homenagem final; sem inventar brasão ou parceria |

## Dados e privacidade

O src/data.json permaneceu idêntico, byte por byte. SHA-256: 7AE0BE1D55C92680D44EEAC40CB65AF0F5ED841E3F6878348941786815CA2E93.

A leitura independente da planilha original conferiu novamente os 15 percentuais de aproveitamento (5 disciplinas × 3 turmas) e os 15 conjuntos de questões difíceis. Utilizou todos os registros de erro, não apenas o Top 3. As médias, as notas, os gabaritos, os nomes abreviados e os 24 homenageados foram preservados. Evidência agregada em qa/v3/source-validation.json, sem registros individuais adicionais.

A publicação de nomes abreviados associados às notas continua dependendo de aprovação escolar. A planilha completa não integra o pacote ou a compilação pública.

## Testes realizados

- TypeScript e compilação de produção: aprovados.
- Quatro testes automatizados de população/médias, pódios/empates, gabaritos e restrição do JSON: aprovados.
- Chrome em 320×740, 360×800, 390×844, 430×932, 768×1024 e 1440×1000: sem erros JavaScript nem rolagem horizontal.
- Troca das três turmas em cada largura: 7, 8 e 9 homenageados; sempre três notas distintas.
- Faixas verificadas após rolagem: opacidade final e máscaras abertas, sem nomes invisíveis. A inspeção identificou e corrigiu um problema de detecção da viewport causado pela própria máscara.
- Web II noturno: professor Rafael, Q17 e alternativa A; Projeto Integrador: duas questões exibidas.
- Círculo Q01 Integral: strokeDashoffset de 282,743 antes da entrada, valor intermediário durante e 157,08 no final, equivalente aos 44,4% reais. Medido nas seis larguras.
- Troca de turma: amostragem de opacidade e deslocamento do pódio durante a saída confirmou movimento real.
- Confetes: acionados pelo botão Celebrar; pausa interrompe efeitos e remove o canvas.
- Pausa e reduced-motion: nenhuma animação em execução nas seis larguras; percentuais continuam visíveis em seu estado final.

## Evidência adicional das animações

Amostragem em navegador real registrada em qa/v3/animation-evidence.json:

- Reveal: opacidade 0,3 e deslocamento de 44px antes; opacidade 1 e sem deslocamento ao final.
- Contador de participantes: 38 durante a animação; 70 ao final.
- Barra: largura 0 antes da entrada, 71,75px durante e 261,69px ao final naquela viewport.
- Nomes do primeiro lugar de T1: os dois primeiros já visíveis enquanto o terceiro ainda estava em opacidade 0,2; o terceiro então avançou progressivamente até 1.
- Pressionar uma faixa: escala passou de 1 para aproximadamente 0,976 durante a interação.

Capturas desktop das quatro seções e abertura; capturas mobile das quatro seções e abertura; páginas completas nas seis larguras. Abertura desktop/mobile, panorama, Hall, Desafios e Conquistas foram inspecionados visualmente. A prévia MP4 usa 92 capturas reais em sequência amostrada; não é uma medição de FPS.

## Performance e limites

Sem novas bibliotecas, fontes externas, analytics, imagens de fundo pesadas ou dependência de servidor para dados. Efeitos mobile reduzem amplitude da paralaxe, partículas e blur. O usuário pode pausar os efeitos.

Compilação: JS 405,75 kB (130,54 kB gzip); CSS 78,81 kB (18,42 kB gzip). Fontes locais e marca Alfa original. Não foram realizados Lighthouse, medição em aparelho físico de baixa capacidade ou auditoria completa com leitor de tela. Não se afirma desempenho de hardware que não foi medido.

As capturas da outra IA citadas no brief não estavam anexadas ao envio; a organização foi implementada pelos critérios textuais. A marca oficial de Sarzedo não foi localizada, então foi usada a composição comemorativa própria expressamente autorizada no brief. Servidores usados nos testes foram encerrados.
