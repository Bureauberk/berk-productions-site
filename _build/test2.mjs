import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const U='http://localhost:8787';
let posted=null;
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.route('https://formsubmit.co/**', r => { posted = r.request().postDataJSON(); r.fulfill({ status: 200, contentType: 'application/json', body: '{"success":"true"}' }); });
const p = await ctx.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message));
await p.goto(U+'/'); await p.waitForTimeout(500);
await p.click('.burger'); await p.waitForTimeout(700);
console.log('menu open:', await p.evaluate(() => document.querySelector('#menu').className), 'link fs:', await p.evaluate(() => getComputedStyle(document.querySelector('.menu-links a')).fontSize));
await p.screenshot({ path: 'shot-menu.png' });
await p.click('.burger'); await p.waitForTimeout(600);
await p.click('.lang-dd summary'); await p.waitForTimeout(300);
console.log('dropdown open:', await p.evaluate(() => document.querySelector('.lang-dd').open));
await p.mouse.click(700, 600); await p.waitForTimeout(200);
console.log('dropdown closed by outside click:', !(await p.evaluate(() => document.querySelector('.lang-dd').open)));
await p.screenshot({ path: 'shot-home.png' });
await p.evaluate(() => window.scrollTo(0, 400)); await p.waitForTimeout(500);
console.log('header scrolled:', await p.evaluate(() => document.querySelector('header').className));
await p.screenshot({ path: 'shot-home2.png', fullPage: true });
// slider
const sb = await p.$('.sbtn'); if (sb) { await p.evaluate(()=>document.querySelector('.slider').scrollIntoView()); }
// Werk filter
await p.goto(U+'/werk'); await p.waitForTimeout(400);
const before = await p.evaluate(() => document.querySelectorAll('.site img').length);
await p.click('button.chip >> nth=1'); await p.waitForTimeout(300);
const after = await p.evaluate(() => document.querySelectorAll('.site img').length);
console.log('werk filter imgs', before, '->', after);
// calculator
await p.goto(U+'/prijscalculator'); await p.waitForTimeout(500);
const tot = async () => p.evaluate(() => document.querySelector('.sum-tot .grand dd').innerText);
console.log('calc initial', await tot());
await p.click('.ro >> nth=0'); await p.waitForTimeout(500); console.log('basis', await tot());
await p.click('#b3 ~ .when .sbtn2 >> nth=1').catch(()=>{});
await p.locator('.when .stepper .sbtn2').nth(1).click(); await p.locator('.when .stepper .sbtn2').nth(1).click(); await p.waitForTimeout(500);
console.log('basis 3 days', await tot(), 'subtotal', await p.evaluate(() => document.querySelectorAll('.sum-tot dd')[0].innerText));
await p.fill('.km-in input', '150'); await p.waitForTimeout(500);
console.log('with 150km', await p.evaluate(() => document.querySelectorAll('.sum-tot dd')[0].innerText), 'url', p.url());
await p.locator('.extras .tgl').nth(3).click(); await p.waitForTimeout(500);
console.log('lines', await p.evaluate(() => [...document.querySelectorAll('.sum-lines li')].map(l=>l.innerText.replace(/\n/g,' ')).join(' | ')));
await p.click('.qform .btn'); await p.waitForTimeout(300);
console.log('errors shown', await p.evaluate(() => [...document.querySelectorAll('.qform .err')].map(e=>e.innerText).filter(Boolean)));
const f = p.locator('.qform input'); await f.nth(0).fill('Test'); await f.nth(1).fill('test@example.com'); await f.nth(2).fill('Org'); await f.nth(3).fill('Event X');
await p.click('.qform .btn'); await p.waitForTimeout(800);
console.log('sent state', await p.evaluate(() => !!document.querySelector('.thanks')), 'posted keys', posted && Object.keys(posted).join(','), '\n', posted && posted.Samenstelling);
await p.screenshot({ path: 'shot-calc.png', fullPage: true });
// reload from URL keeps state
const u = p.url(); const p2 = await ctx.newPage(); await p2.goto(u); await p2.waitForTimeout(500);
console.log('restored total', await p2.evaluate(() => document.querySelector('.sum-tot .grand dd').innerText));
// contact
posted=null; await p.goto(U+'/contact'); await p.waitForTimeout(400);
await p.click('.site form .btn'); await p.waitForTimeout(300); console.log('contact blocked when empty:', posted===null);
const ci = p.locator('.site form input'); await ci.nth(0).fill('Jan'); await ci.nth(2).fill('jan@example.com');
await p.click('.site form .btn'); await p.waitForTimeout(800); console.log('contact posted', JSON.stringify(posted));
// mobile
const m = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
for (const r of ['/','/prijscalculator','/diensten','/de/leistungen']) { const q = await m.newPage(); await q.goto(U+r); await q.waitForTimeout(500); console.log('mobile', r, 'overflow', await q.evaluate(() => document.documentElement.scrollWidth - innerWidth)); if (r==='/') await q.screenshot({path:'shot-mobile.png'}); }
console.log('page errors', errs);
await b.close();
