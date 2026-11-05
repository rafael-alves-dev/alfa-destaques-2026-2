from pathlib import Path
import zipfile,xml.etree.ElementTree as E,re,json,hashlib
from collections import Counter
p=Path('C:/Users/rafae/OneDrive/Área de Trabalho/Notas_Consolidado_2026-2.xlsx');ns={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
data=json.loads(Path('src/data.json').read_text(encoding='utf8'));z=zipfile.ZipFile(p)
ss=[''.join(t.itertext()) for t in E.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si',ns)]
checks=[]
for i,group in enumerate(data['classes'],1):
 cells={}
 for c in E.fromstring(z.read(f'xl/worksheets/sheet{i}.xml')).findall('.//m:sheetData/m:row/m:c',ns):
  v=c.find('m:v',ns)
  if v is not None:cells[c.attrib['r']]=ss[int(v.text)] if c.get('t')=='s' else v.text
 errors=Counter();count=0
 for row in range(4,100):
  if f'B{row}' not in cells or not str(cells.get(f'A{row}','')).isdigit():continue
  count+=1;errors.update(int(n) for n in re.findall(r'\d+',cells.get(f'E{row}','')))
 assert count==group['count']
 for s in group['subjects']:
  a,b=s['range'];accuracy=round((1-sum(errors[q] for q in range(a,b+1))/(count*(b-a+1)))*100,4)
  assert accuracy==s['accuracy'],(group['name'],s['name'])
  qs=sorted(range(a,b+1),key=lambda q:(-errors[q],q));cut=errors[qs[min(2,len(qs)-1)]];expected=[q for q in qs if errors[q]>=cut]
  assert expected==[q['question'] for q in s['hardest']]
  assert all(q['errors']==errors[q['question']] for q in s['hardest'])
  checks.append({'turma':group['name'],'disciplina':s['name'],'aproveitamento':accuracy,'questoesTop':len(expected)})
assert hashlib.sha256(Path('src/data.json').read_bytes()).hexdigest().upper()=='7AE0BE1D55C92680D44EEAC40CB65AF0F5ED841E3F6878348941786815CA2E93'
Path('qa/v3').mkdir(parents=True,exist_ok=True)
Path('qa/v3/source-validation.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf8')
print('15 aproveitamentos e 15 grupos de Top 3 conferidos com todos os registros da planilha. JSON original intacto.')
