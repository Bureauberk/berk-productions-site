import { chromium } from 'playwright-core';
const routes = ["/","/diensten","/waarom-live","/werk","/over","/contact","/prijscalculator","/en","/en/services","/en/why-live","/en/work","/en/about","/en/contact","/de","/de/leistungen","/de/warum-live","/de/projekte","/de/ueber-uns","/de/kontakt"];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const bad = new Set();
for (const r of routes) {
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error' && !/fonts\.g|ERR_TUNNEL|net::/.test(m.text())) errs.push(m.text()); });
  p.on('response', resp => { if (resp.status() >= 400 && resp.url().includes('localhost')) errs.push(resp.status() + ' ' + resp.url()); });
  await p.goto('http://localhost:8787' + r, { waitUntil: 'load' }); await p.waitForTimeout(600);
  const info = await p.evaluate(() => ({ h1: (document.querySelector('h1')||{}).innerText, len: document.body.innerText.length, links: [...document.querySelectorAll('a[href^="/"]')].map(a => a.getAttribute('href')), imgs: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src), overflow: document.documentElement.scrollWidth - window.innerWidth }));
  info.links.forEach(l => bad.add(l.split('#')[0]));
  console.log(r.padEnd(18), (info.h1||'').replace(/\n/g,' / ').slice(0,60).padEnd(62), 'text', info.len, 'brokenImg', info.imgs.length, 'ovf', info.overflow, errs.length ? '\n   ERR ' + errs.join(' | ') : '');
  await p.close();
}
const missing = [...bad].filter(l => !routes.includes(l.replace(/\/$/, '') || '/') && !l.startsWith('/assets'));
console.log('internal link targets not in routes:', missing);
await b.close();
