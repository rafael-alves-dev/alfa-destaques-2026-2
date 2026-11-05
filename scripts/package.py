from pathlib import Path
import zipfile
root=Path('.').resolve(); dest=root.parent/'Alfa-Destaques-2026-2-v3.zip'
with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED) as z:
 for p in root.rglob('*'):
  if not p.is_file() or any(x in p.parts for x in ['node_modules','.git','frames']) or p.suffix in ['.xlsx','.xls','.csv','.tsbuildinfo','.zip']: continue
  if 'qa' in p.parts and 'v3' not in p.parts and p.name!='VERIFICACAO.md': continue
  z.write(p,Path('alfa-destaques')/p.relative_to(root))
print(dest.resolve()); print(dest.stat().st_size)





