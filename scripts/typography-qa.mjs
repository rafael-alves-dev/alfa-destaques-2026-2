import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const require=createRequire('C:/Users/rafae/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4176'],{stdio:'ignore',windowsHide:true});
let browser;
try {
  await new Promise(r=>setTimeout(r,1800));
  browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  for(const width of [360,390,430,768,1024,1440]) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    await page.goto('http://127.0.0.1:4176/alfa-destaques-2026-2/');
    await page.waitForLoadState('networkidle');
    for(let group=0;group<3;group++) {
      await page.getByRole('group',{name:'Turma — Hall da Fama'}).getByRole('button').nth(group).click();
      for(let subject=0;subject<5;subject++) {
        await page.locator('#subject').selectOption(String(subject));
        const issues=await page.evaluate(()=>{
          const selectors='.honoree-band,.challenge-teacher,.subject-teacher,.class-tabs button,.challenge-card h3,.achievement-card h3,.metric-card h3,.metric-card p,.correct-answer > span,.section-title p,.explore-subject,.section-method';
          return [...document.querySelectorAll(selectors)].flatMap(e=>{
            const style=getComputedStyle(e),r=e.getBoundingClientRect();
            const min=e.matches('.honoree-band,.challenge-teacher,.subject-teacher,.section-title p')?16:14;
            return parseFloat(style.fontSize)<min||e.scrollWidth>e.clientWidth+1||r.left<0||r.right>innerWidth+1?[{selector:e.className,text:e.textContent,size:style.fontSize,width:r.width,scroll:e.scrollWidth}]:[];
          });
        });
        assert.deepEqual(issues,[],`${width}px, turma ${group}, disciplina ${subject}`);
      }
    }
    console.log(`${width}px: 3 turmas × 5 disciplinas, fontes e limites OK`);
    await page.close();
  }
} finally {await browser?.close();server.kill();}

