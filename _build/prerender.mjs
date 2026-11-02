// Prerender the published pages so crawlers get the full HTML, and apply per-page SEO tags from seo.json.
// Run from the repo root after convert.py + esbuild:  node _build/prerender.mjs
// Idempotent: re-running replaces the earlier snapshot and tags.
import { chromium } from 'playwright-core';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clarityTag } from './clarity.mjs';
import { siteCss } from './site-css.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SEO = JSON.parse(readFileSync(join(ROOT, '_build/seo.json'), 'utf8'));
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain' };

const fileFor = (route) => join(ROOT, route === '/' ? '' : route.slice(1), 'index.html');
const langOf = (route) => (route.match(/^\/(en|de)(\/|$)/) || [, 'nl'])[1];
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Static server that mirrors Vercel's cleanUrls: /x -> /x/index.html. Serves the pages without their old snapshot.
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = join(ROOT, p);
  if (!existsSync(f) || statSync(f).isDirectory()) f = join(ROOT, p, 'index.html');
  if (!f.startsWith(ROOT) || !existsSync(f)) { res.writeHead(404); return res.end(); }
  let body = readFileSync(f);
  // Without the SEO block (and so without Clarity), so building the site never records visits.
  if (f.endsWith('.html')) body = stripSnapshot(body.toString()).replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, '');
  res.writeHead(200, { 'Content-Type': TYPES[extname(f)] || 'application/octet-stream' });
  res.end(body);
}).listen(0);
const BASE = 'http://localhost:' + server.address().port;

function stripSnapshot(html) {
  return html.replace(/<div id="app">[\s\S]*?<!--\/prerender-->\s*<\/div>/, '<div id="app"></div>');
}

function applyHead(html, route) {
  const page = SEO.pages[route];
  if (!page) throw new Error('No SEO entry for ' + route);
  const lang = langOf(route);
  const url = SEO.site + route;
  const { title, description } = page;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(description)}">`);
  // Tags this script owns sit between markers so a re-run replaces them.
  // The page now has content without JS, so the "needs JavaScript" notice only adds noise.
  html = html.replace(/<noscript><p [^>]*>[\s\S]*?<\/p><\/noscript>\n?/, '');
  html = html.replace(/\n?<!--seo-->[\s\S]*?<!--\/seo-->/, '');
  const ld = { ...SEO.org };
  const pageLd = { '@context': 'https://schema.org', '@type': 'WebPage', '@id': url + '#page', url, name: title, description, inLanguage: lang, isPartOf: { '@type': 'WebSite', name: 'BERK Productions', url: SEO.site + '/' }, about: { '@id': SEO.org['@id'] } };
  const isHome = route === '/' || route === '/en' || route === '/de';
  const extra = [
    `<link rel="alternate" hreflang="x-default" href="${SEO.site}/">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:site_name" content="BERK Productions">`,
    `<meta property="og:locale" content="${SEO.locales[lang]}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json">${JSON.stringify(isHome ? [ld, pageLd] : [pageLd])}</script>`,
    clarityTag(SEO.clarity),
    siteCss(isHome),
  ].filter(Boolean);
  return html.replace('<meta property="og:type" content="website">', (m) => `${m}\n<!--seo-->${extra.join('\n')}<!--/seo-->`);
}

const routes = [...readFileSync(join(ROOT, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].replace(SEO.site, '') || '/')
  // Only the Preact pages listed in seo.json; kennisbank, landing and legal pages are static HTML from kennisbank.mjs.
  .filter((r) => SEO.pages[r]);

const browser = await chromium.launch({ executablePath: CHROME });
// Reduced motion keeps the scroll-reveal classes out of the snapshot, so all content is visible without JS.
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const report = [];
for (const route of routes) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await page.waitForSelector('#app > *');
  const snap = await page.evaluate(() => {
    const app = document.getElementById('app');
    app.querySelectorAll('[style=""]').forEach((el) => el.removeAttribute('style'));
    return { html: app.innerHTML, h1: [...app.querySelectorAll('h1')].map((h) => h.innerText.replace(/\s+/g, ' ').trim()), words: app.innerText.split(/\s+/).filter(Boolean).length };
  });
  await page.close();
  if (errors.length) throw new Error(`${route}: ${errors.join(' | ')}`);
  const file = fileFor(route);
  let html = stripSnapshot(readFileSync(file, 'utf8'));
  html = applyHead(html, route);
  html = html.replace('<div id="app"></div>', `<div id="app">${snap.html}<!--/prerender--></div>`);
  writeFileSync(file, html);
  const { title, description } = SEO.pages[route];
  report.push({ route, words: snap.words, h1: snap.h1.length, title: title.length, desc: description.length });
}
await browser.close();
server.close();
console.table(report);
