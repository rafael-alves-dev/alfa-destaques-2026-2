import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
const require=createRequire('C:/Users/rafae/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4175'],{stdio:'ignore',windowsHide:true});
process.on('exit',()=>server.kill());await new Promise(r=>setTimeout(r,1700));
let browser;
const results=[];await fs.mkdir('qa/v2',{recursive:true});
try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844],['small-mobile',320,740],['tablet',768,1024]]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4175');await page.waitForLoadState('networkidle');await page.waitForTimeout(1100);
  await page.screenshot({path:`qa/v2/${name}-hero.png`});
  for(const target of ['#panorama','#destaques','#aprendizagem','#sarzedo']){await page.locator(target+' h2').scrollIntoViewIfNeeded();await page.waitForTimeout(1150);if(target==='#destaques'){for(const names of await page.locator('.names').all()){await names.scrollIntoViewIfNeeded();await page.waitForTimeout(1150)}}}
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(150);
  await page.screenshot({path:`qa/v2/${name}-full.png`,fullPage:true});
  await page.locator('.hall-title').scrollIntoViewIfNeeded();await page.waitForTimeout(1200);
  await page.locator('#destaques').screenshot({path:`qa/v2/${name}-hall.png`});
  const tabs=page.getByRole('group',{name:'Selecionar turma'}).getByRole('button');const counts=[];
  for(let i=0;i<3;i++){await tabs.nth(i).click();await page.waitForTimeout(1550);counts.push(await page.locator('.names p').count());assert.equal(await page.locator('.podium .score').count(),3);await page.locator('.names p').last().scrollIntoViewIfNeeded();await page.waitForTimeout(900)}
  assert.deepEqual(counts,[7,8,9]);
  await page.locator('#subject').selectOption('3');await page.waitForTimeout(600);assert.ok((await page.locator('.questions').innerText()).includes('Rafael'));
  await page.getByRole('button',{name:'Celebrar',exact:true}).click();await page.waitForTimeout(100);
  const confettiWorks=await page.locator('canvas').count()>0;assert.ok(confettiWorks);
  await page.getByRole('button',{name:'Pausar efeitos',exact:true}).click();assert.equal(await page.locator('.experience').getAttribute('data-effects'),'off');
  await page.waitForTimeout(1100);
  const pausedAnimations=await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  results.push({name,width,overflow,counts,errors,confettiWorks,pausedAnimations});assert.equal(overflow,false);assert.equal(errors.length,0);assert.equal(pausedAnimations,0);
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.waitForLoadState('networkidle');await page.waitForTimeout(200);
  assert.equal(await page.locator('.experience').getAttribute('data-effects'),'off');await page.getByRole('button',{name:'Celebrar',exact:true}).click();
  const reducedMotionCanvas=await page.locator('canvas').count();const reducedAnimations=await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);
  results.push({name,reducedMotionCanvas,reducedAnimations});assert.equal(reducedMotionCanvas,0);assert.equal(reducedAnimations,0);
  await page.close();
 }
}finally{await browser?.close();server.kill();await fs.writeFile('qa/v2/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results))}

