import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
const require=createRequire('C:/Users/rafae/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');const {chromium}=require('playwright');
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4175'],{stdio:'ignore',windowsHide:true});process.on('exit',()=>server.kill());await new Promise(r=>setTimeout(r,1700));
const out='qa/v3';await fs.mkdir(out,{recursive:true});const results=[];let browser;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844],['mobile-360',360,800],['mobile-430',430,932],['tablet',768,1024],['small-mobile',320,740]]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:4175');await page.waitForLoadState('networkidle');await sleep(1100);
  assert.ok((await page.locator('h1').innerText()).replaceAll('\n',' ').includes('ALFA DESTAQUES 2026.2'));assert.equal(await page.locator('.metric-card').count(),6);await page.screenshot({path:`${out}/${name}-hero.png`});
  const ring=page.locator('.ring-fill').first();const ringBefore=await ring.evaluate(e=>parseFloat(getComputedStyle(e).strokeDashoffset));
  await page.locator('.percentage-ring').first().scrollIntoViewIfNeeded();await sleep(80);const ringDuring=await ring.evaluate(e=>parseFloat(getComputedStyle(e).strokeDashoffset));if(name==='desktop')await page.screenshot({path:`${out}/ring-during.png`});await sleep(1650);const ringAfter=await ring.evaluate(e=>parseFloat(getComputedStyle(e).strokeDashoffset));
  assert.ok(ringBefore-ringAfter>80,`círculo não preencheu: ${ringBefore}/${ringAfter}`);assert.ok(ringDuring>ringAfter,`círculo não progrediu`);if(name==='desktop')await page.screenshot({path:`${out}/ring-after.png`});
  const tabs=page.getByRole('group',{name:'Turma — Hall da Fama'}).getByRole('button');const counts=[];let swapDuring;
  for(let i=0;i<3;i++){await tabs.nth(i).click();if(i===1){await sleep(160);swapDuring=await page.locator('.podium').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));}await sleep(1350);counts.push(await page.locator('.names p').count());assert.equal(await page.locator('.podium .score').count(),3)}assert.deepEqual(counts,[7,8,9]);assert.ok(Number(swapDuring.opacity)<.8);
  await page.locator('#subject').selectOption('3');await sleep(1250);assert.equal(await page.locator('.challenge-card').count(),3);assert.ok((await page.locator('.challenge-context').innerText()).includes('Rafael'));assert.ok((await page.locator('.challenge-card').first().innerText()).includes('Q17'));assert.equal(await page.locator('.correct-answer strong').first().innerText(),'A');
  await page.locator('#subject').selectOption('4');await sleep(1250);assert.equal(await page.locator('.challenge-card').count(),2);
  assert.equal(await page.locator('.achievement-card').count(),5);assert.ok((await page.locator('.achievement-card').nth(3).innerText()).includes('Rafael'));
  await page.getByRole('group',{name:'Turma — Desafios'}).getByRole('button').nth(0).click();await sleep(1300);await page.locator('#subject').selectOption('0');await sleep(1250);
  // Passe de rolagem real: dispara cada card e cada faixa ao entrar na viewport.
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));const fullHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let top=0;top<fullHeight;top+=height*.55){await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),top);await sleep(95)}await sleep(1700);
  const bands=await page.locator('.names p').evaluateAll(es=>es.map(e=>({opacity:Number(getComputedStyle(e).opacity),clip:getComputedStyle(e).clipPath})));assert.ok(bands.every(b=>b.opacity>.99&&!b.clip.includes('100%')),'nome oculto após revelação');
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await sleep(100);await page.screenshot({path:`${out}/${name}-full.png`,fullPage:true});
  for(const [target,filename] of [['#panorama','panorama'],['#destaques','hall'],['#desafios','desafios'],['#conquistas','conquistas']]){if(name==='desktop'||name==='mobile'){await page.locator(target+' h2').scrollIntoViewIfNeeded();await sleep(150);await page.locator(target).screenshot({path:`${out}/${name}-${filename}.png`})}}
  await page.getByRole('button',{name:'Celebrar',exact:true}).click();await sleep(70);assert.ok(await page.locator('canvas').count()>0);await page.getByRole('button',{name:'Pausar efeitos',exact:true}).click();await sleep(1700);const pausedAnimations=await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);assert.equal(pausedAnimations,0);assert.equal(await page.locator('canvas').count(),0);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);assert.equal(errors.length,0);results.push({name,width,overflow,errors,counts,bandsVisible:bands.length,ringBefore,ringDuring,ringAfter,swapDuring,pausedAnimations});
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.waitForLoadState('networkidle');await sleep(100);assert.equal(await page.locator('.experience').getAttribute('data-effects'),'off');await page.getByRole('button',{name:'Celebrar',exact:true}).click();assert.equal(await page.locator('canvas').count(),0);assert.equal(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length),0);const reducedOffset=await page.locator('.ring-fill').first().evaluate(e=>parseFloat(getComputedStyle(e).strokeDashoffset));assert.ok(reducedOffset<170);results.push({name,reducedMotion:true,reducedOffset});await page.close();console.log(`${name}: OK`);
 }
}finally{await browser?.close();server.kill();await fs.writeFile(`${out}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results))}

