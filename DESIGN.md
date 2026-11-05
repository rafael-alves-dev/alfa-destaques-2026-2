---
name: Alfa Destaques 2026.2 — V3 Híbrida Premium
description: Cerimônia digital de reconhecimento do Polo Sarzedo.
colors:
  background: '#070d27'
  foreground: '#f3f8ff'
  navy: '#030b25'
  royal: '#174ab3'
  electric: '#0f68cb'
  cyan: '#8fdbff'
  amber: '#ffad63'
  gold: '#ffda99'
  silver: '#b9deff'
  bronze: '#f4bfa1'
  secondary: '#b8cce9'
typography:
  display:
    fontFamily: Outfit
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: '-.035em'
  body:
    fontFamily: DM Sans
    fontSize: 14px
    lineHeight: 1.75
rounded:
  control: 9px
  card: 16px
spacing:
  small: 12px
  medium: 24px
  large: 44px
  section: 92px
---

## Overview

V3 aprovada como escopo pelo brief definitivo do usuário: combinar organização e clareza de uma referência descrita em texto com a linguagem metálica dos pódios V2. Cerimônia digital com quatro seções numeradas, grades legíveis, indicadores monumentais e movimento ao navegar. As capturas da outra IA não estavam acessíveis neste envio; não alegar reprodução ou comparação visual direta.

## Colors

Marinho, royal e elétrico em camadas radiais; luzes âmbar/dourada e reflexos frios. Transparências derivadas das rampas azul/ciano e âmbar compõem vidro, halo e atmosfera. Tons intermediários presentes no CSS são misturas de iluminação, não cores de novas marcas. Os três lugares mantêm ouro, prata azulada e bronze. Letras e dados permanecem sólidos para legibilidade.

## Typography

Outfit 600/700, DM Sans 400/600, fontes locais. Escala responsiva: dados 53–116px; hero 56–93px; títulos 32–80px conforme seção; corpo/nomes 12–18px; notas 10–12px. Rótulos puramente ornamentais podem ser menores. Tracking limitado a -.04em. Nome e nota nunca devem ser cortados ou depender de animação para acesso.

## Layout

Hero com título do projeto à esquerda e medalha comemorativa em volume à direita; empilha no celular. Panorama: dois cards maiores e quatro menores, seguidos por três cards de turma. Hall 2–1–3 em desktop e 1–2–3 em mobile. Desafios em três colunas, uma em mobile, filtrados por disciplina. Conquistas em três mais dois cards largos no desktop e uma coluna mobile. Grade máxima 1320px. Prioridade 360–430px, com verificação adicional em 320px e tablet.

## Elevation & Depth

Medalha do hero com bordas metálicas extrudadas, fita, base elíptica e selo flutuante de localidade. Hall com pedestais independentes, vidro, reflexos e iluminação cenográfica. Cards usam camadas internas e contraste de luz além de sombra. Não reproduzir fundos opacos uniformes.

## Shapes

Medalhas circulares numeradas; órbitas elípticas; superfícies com raio 16px; faixas individuais 8px. Símbolo de Sarzedo é um pin geométrico e tipografia comemorativa, nunca um brasão inventado. Marca Alfa preservada sem deformação.

## Components

Contadores de 0 ao valor real ao entrar em vista. Círculos SVG com strokeDashoffset progressivo de 0 ao percentual; barras com width de 0 ao valor. Reveal por seção e card, usando deslocamento, opacidade e máscara. Faixas dos nomes observam um contêiner sem recorte para que a máscara de revelação não impeça a detecção de viewport. Entradas escalonadas e transição de saída/entrada por turma. Controle global pausa os efeitos; reduced-motion apresenta imediatamente os valores finais. Confetes por ação explícita; partículas decorativas lentas. Mobile reduz partículas e amplitude da paralaxe.

## Do's and Don'ts

Preservar src/data.json byte a byte. Não confundir aproveitamento completo com dados do Top 3. Respeitar Web II de cada turno e empates. Não alegar aprovação escolar, vínculo com a Prefeitura ou marca oficial de Sarzedo. Não publicar automaticamente. Validar animações visualmente e medir estados antes/durante/depois no navegador, além de compilar.

## Escala de legibilidade (revisão 2026-11)

A camada typography.css aplica 14px (0.875rem) aos metadados, 16px (1rem) ao corpo e aos controles, 17px (1.0625rem) aos nomes, 18px (1.125rem) aos nomes de primeiro lugar e mensagens principais, e 20px (1.25rem) aos títulos de disciplina. Entrelinhas de 1.4 nos títulos e 1.6–1.65 nos textos. As famílias e os pesos locais existentes permanecem. A arte decorativa mantém sua escala. Esta revisão substitui os mínimos antigos de 9–13px para conteúdo informativo.
