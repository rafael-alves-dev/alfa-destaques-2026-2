from pathlib import Path
import zipfile,xml.etree.ElementTree as E,re,json,hashlib,statistics
from collections import Counter
p=Path('C:/Users/rafae/OneDrive/Área de Trabalho/Notas_Consolidado_2026-2.xlsx');z=zipfile.ZipFile(p); ns={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
ss=[''.join(t.itertext()) for t in E.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si',ns)]
classes=[];total=[]
disc=[('Empreendedorismo','Geisa',1,3),('Segurança da Informação','Rafaela',4,6),('Programação Móvel II','Paulo',7,12),('Programação Web II','',13,18),('Projeto Integrador','Rafael',19,20)]
keys=['CABBCDBDACBDBCDACBCD','CABBCDBDACBDCADBACCD']
for i,(name,expected) in enumerate([('Integral',27),('Noturno T1',23),('Noturno T2',20)],1):
 cells={}
 for c in E.fromstring(z.read(f'xl/worksheets/sheet{i}.xml')).findall('.//m:sheetData/m:row/m:c',ns):
  v=c.find('m:v',ns)
  if v is not None: cells[c.attrib['r']]=ss[int(v.text)] if c.get('t')=='s' else v.text
 rows=[]
 for r in range(4,100):
  if f'B{r}' not in cells or not str(cells.get(f'A{r}','')).isdigit():continue
  score=float(cells[f'C{r}']);hits=int(float(cells[f'D{r}']));wrong=[int(x) for x in re.findall(r'\d+',cells.get(f'E{r}',''))]
  assert len(set(wrong))==len(wrong)==20-hits and score==hits*.75
  rows.append((cells[f'B{r}'],score,wrong))
 assert len(rows)==expected
 errors=Counter(q for row in rows for q in row[2]);scores=sorted(set(r[1] for r in rows),reverse=True)[:3]
 def short(n):
  parts=n.split();return parts[0]+' '+''.join(w[0].upper()+'.' for w in parts[1:] if w.lower() not in ['de','da','do','dos','das','e'])
 podium=[{'rank':j+1,'score':s,'names':[short(r[0]) for r in rows if r[1]==s]} for j,s in enumerate(scores)]
 subjects=[]
 for title,teacher,a,b in disc:
  teacher=teacher or ('Rafaela' if i==1 else 'Rafael'); qs=list(range(a,b+1)); ordered=sorted(qs,key=lambda q:(-errors[q],q)); threshold=errors[ordered[min(2,len(ordered)-1)]]
  subjects.append({'name':title,'teacher':teacher,'range':[a,b],'accuracy':round(100*(1-sum(errors[q] for q in qs)/(len(rows)*len(qs))),4),'hardest':[{'question':q,'errors':errors[q],'answer':keys[0 if i==1 else 1][q-1]} for q in ordered if errors[q]>=threshold]})
 classes.append({'id':['integral','t1','t2'][i-1],'name':name,'count':len(rows),'mean':statistics.mean(r[1] for r in rows),'podium':podium,'subjects':subjects});total.extend(r[1] for r in rows)
assert sum(len(p['names']) for c in classes for p in c['podium'])==24
Path('src/data.json').write_text(json.dumps({'total':len(total),'mean':statistics.mean(total),'maxScore':15,'honorees':24,'perfect':sum(s==15 for s in total),'classes':classes},ensure_ascii=False,indent=2),encoding='utf8')
Path('VALIDACAO.md').write_text(f'''# Validação dos dados
Fonte: Notas_Consolidado_2026-2.xlsx, abas Integral, Noturno T1 e Noturno T2. Leitura sem alteração.
SHA-256: {hashlib.sha256(p.read_bytes()).hexdigest()}

70 registros; tamanhos 27/23/20; média geral 12,3642857143; médias 11,9444444444 / 12,6847826087 / 12,5625.
20 questões × 0,75 = 15. Todos os registros conferem: nota = acertos × 0,75; quantidade de questões erradas = 20 − acertos, sem repetição.
24 homenageados: 7 Integral, 8 T1, 9 T2. Três maiores notas distintas: 15; 14,25; 13,50.

Gabaritos conferidos visualmente nas duas imagens oficiais enviadas (20261105-152752 Integral e 20261105-152734 Noturno):
Integral: {keys[0]}
Noturno: {keys[1]}
Somente Q13, Q14, Q16, Q17 e Q18 diferem; Q15 é D em ambas.

Erros contados por número de questão completo nas abas de origem; não por busca de substring.
Taxa de erro = erros / alunos da turma. Desempenho = acertos / (alunos × questões da disciplina).
Top 3 questões usa contagem decrescente, incluindo todos os empates no corte; Projeto Integrador tem somente duas questões.
Nomes abreviados com primeiro nome + iniciais dos demais componentes, omitindo preposições. Nenhum nome integral ou registro individual dos demais alunos no JSON.

Relatório anterior separado e marca Sarzedo não localizados entre os arquivos acessíveis. Esta validação foi refeita diretamente da fonte. Aprovação escolar ainda necessária antes de publicação.
''',encoding='utf8')
from PIL import Image
im=Image.open('C:/Users/rafae/AppData/Local/Temp/codex-file-preview-If98Ad/image(20261029-223333).png')
im.crop((7,110,214,169)).save('public/alfa-original.png')
