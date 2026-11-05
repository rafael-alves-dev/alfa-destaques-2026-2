import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import {spawn} from 'node:child_process';
const require=createRequire('C:/Users/rafae/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');const {chromium}=require('playwright');
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4177'],{stdio:'ignore',windowsHide:true});process.on('exit',()=>server.kill());await new Promise(r=>setTimeout(r,1500));let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});const page=await browser.newPage({viewport:{width:1200,height:900},deviceScaleFactor:1});await page.goto('http://127.0.0.1:4177');await page.waitForLoadState('networkidle');await fs.mkdir('qa/v3/frames',{recursive:true});let frame=0;
 async function capture(n){for(let i=0;i<n;i++){await page.screenshot({path:`qa/v3/frames/${String(frame++).padStart(3,'0')}.jpg`,quality:85});await page.waitForTimeout(85)}}
 async function jump(selector,offset){await page.evaluate(({selector,offset})=>window.scrollTo({top:document.querySelector(selector).getBoundingClientRect().top+scrollY-offset,behavior:'instant'}),{selector,offset})}
 await capture(12);await jump('#panorama',80);await capture(14);await jump('#destaques',-200);await capture(14);await page.getByRole('group',{name:'Turma — Hall da Fama'}).getByRole('button').nth(1).click();await capture(18);await jump('.percentage-ring',260);await capture(18);await jump('.achievement-card',90);await capture(16);console.log(`${frame} quadros reais capturados.`);
}finally{await browser?.close();server.kill()}
