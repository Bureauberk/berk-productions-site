// Build the knowledge base (/kennisbank) from _build/kennisbank/*.md into static pages.
// Header, menu, footer and base CSS come from the prerendered /over page, so run this after prerender.mjs:
//   node _build/prerender.mjs && node _build/kennisbank.mjs
// Idempotent: rewrites kennisbank/ and the kennisbank entries in sitemap.xml.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { clarityTag } from './clarity.mjs';
import { siteCss } from './site-css.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, '_build/kennisbank');
const LANDING = join(ROOT, '_build/landing');
const LEGAL = join(ROOT, '_build/legal');
const PARTNERS = JSON.parse(readFileSync(join(ROOT, '_build/partners.json'), 'utf8'));
const VERHUUR = JSON.parse(readFileSync(join(ROOT, '_build/verhuur.json'), 'utf8'));
const partnerPaths = Object.values(PARTNERS.langs).flatMap((l) => [l.base, ...l.categories.map((c) => `${l.base}/${c.slug}`)]);
const FORMATS = JSON.parse(readFileSync(join(ROOT, '_build/formats.json'), 'utf8'));
const formatPaths = FORMATS.pages.map((f) => f.path);
const OUT = join(ROOT, 'kennisbank');
const SEO = JSON.parse(readFileSync(join(ROOT, '_build/seo.json'), 'utf8'));
const SITE = SEO.site;
const TODAY = '2026-11-02';
const CLUSTERS = {
  kosten: 'Kosten en aanpak',
  sport: 'Sportlivestream',
  techniek: 'Internet en techniek',
  podcast: 'Videopodcast',
  zakelijk: 'Congres en zakelijk',
  resultaat: 'Resultaat en na afloop',
  verkopen: 'Live verkopen',
};
const CTAS = {
  prijscalculator: { text: 'Benieuwd wat jouw productie kost? Reken het in een minuut uit.', href: '/prijscalculator', label: 'Naar de prijscalculator' },
  contact: { text: 'Vertel wat je wil draaien. Binnen twee werkdagen heb je een vrijblijvende offerte.', href: '/contact', label: 'Vraag een offerte aan' },
  diensten: { text: 'Livestreams, podcasts, grote producties en aftercare. Bekijk wat we draaien.', href: '/diensten', label: 'Bekijk de diensten' },
  'waarom-live': { text: 'Wat levert een livestream op? Bekijk de cijfers van het EK Cable Wakeboard.', href: '/waarom-live', label: 'Waarom live werkt' },
  'live-verkopen': { text: 'Live verkopen vanuit onze studio? Wij regelen de stream, de TikTok Shop en als je wilt de presentator.', href: '/live-verkopen', label: 'Bekijk live verkopen' },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const ldJson = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

// --- Markdown (the subset the brief allows) ---
function inline(s) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, text, href) => {
      const ext = /^https?:/.test(href) && !href.startsWith(SITE);
      return `<a href="${href}"${ext ? ' rel="noopener" target="_blank"' : ''}>${text}</a>`;
    });
}
const plain = (s) => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

function markdown(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [], toc = [], faq = [];
  let i = 0, inFaq = false, q = null;
  const para = [];
  const flush = () => {
    if (!para.length) return;
    const text = para.join(' ');
    out.push(`<p>${inline(text)}</p>`);
    if (q) q.a.push(plain(text));
    para.length = 0;
  };
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { flush(); i++; continue; }
    let m;
    if ((m = l.match(/^(#{2,3})\s+(.*)$/))) {
      flush();
      const level = m[1].length, text = m[2].trim(), id = slugify(plain(text));
      if (level === 2) { inFaq = /^veelgestelde vragen/i.test(text); q = null; toc.push({ id, text: plain(text) }); }
      if (level === 3 && inFaq) { q = { q: plain(text), a: [] }; faq.push(q); }
      out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      i++; continue;
    }
    if (/^\s*[-*]\s+/.test(l) || /^\s*\d+[.)]\s+/.test(l)) {
      flush();
      const ordered = /^\s*\d/.test(l), items = [];
      while (i < lines.length && (/^\s*[-*]\s+/.test(lines[i]) || /^\s*\d+[.)]\s+/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
        if (/^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+[.)])\s+/.test(lines[i])) items[items.length - 1] += ' ' + lines[i].trim();
        else items.push(lines[i].replace(/^\s*([-*]|\d+[.)])\s+/, ''));
        i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join('')}</${tag}>`);
      if (q) q.a.push(items.map(plain).join('; '));
      continue;
    }
    if (/^\s*\|/.test(l)) {
      flush();
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())); i++; }
      const body = rows.filter((r) => !r.every((c) => /^:?-{2,}:?$/.test(c)));
      const [head, ...rest] = body;
      out.push(`<div class="tbl"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${rest.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (/^>\s?/.test(l)) {
      flush();
      const qs = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { qs.push(lines[i].replace(/^>\s?/, '')); i++; }
      out.push(`<blockquote><p>${inline(qs.join(' '))}</p></blockquote>`);
      continue;
    }
    para.push(l.trim());
    i++;
  }
  flush();
  return { html: out.join('\n'), toc, faq: faq.filter((f) => f.a.length) };
}

const ARTICLE_KEYS = ['order', 'slug', 'cluster', 'keyword', 'title', 'description', 'h1', 'summary', 'cta', 'related'];
const LANDING_KEYS = ['path', 'keyword', 'title', 'description', 'h1', 'eyebrow', 'intro', 'cta', 'related'];
const LEGAL_KEYS = ['path', 'lang', 'alts', 'title', 'description', 'h1', 'eyebrow', 'updated'];

function parse(dir, file, keys) {
  const raw = readFileSync(join(dir, file), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  for (const k of keys) if (!fm[k]) throw new Error(`${file}: frontmatter "${k}" missing`);
  if (fm.cluster && !CLUSTERS[fm.cluster]) throw new Error(`${file}: unknown cluster ${fm.cluster}`);
  if (fm.cta && !CTAS[fm.cta]) throw new Error(`${file}: unknown cta ${fm.cta}`);
  const body = markdown(m[2]);
  const words = m[2].split(/\s+/).filter(Boolean).length;
  return { ...fm, order: +fm.order || 0, related: (fm.related || '').split(',').map((s) => s.trim()).filter(Boolean), date: fm.date || TODAY, words, ...body };
}

// --- Shell (header, menu, footer, base CSS) taken from the prerendered "about" page of each language ---
const SHELL_PAGE = { nl: '/over', en: '/en/about', de: '/de/ueber-uns' };
const LOCALES = { nl: 'nl_NL', en: 'en_GB', de: 'de_DE' };
const SHELLS = Object.fromEntries(Object.entries(SHELL_PAGE).map(([lang, route]) => {
  const html = readFileSync(join(ROOT, route.slice(1), 'index.html'), 'utf8');
  const app = html.match(/<div id="app">([\s\S]*?)<!--\/prerender-->/)[1];
  const siteOpen = app.match(/^<div class="site"[^>]*>/)[0];
  return [lang, {
    css: html.match(/<style>([\s\S]*?)<\/style>/)[1],
    siteOpen,
    chrome: app.slice(siteOpen.length, app.indexOf('<section')).replace(/\s*aria-current="page"/g, ''),
    footer: app.slice(app.indexOf('<footer'), app.lastIndexOf('</footer>') + 9),
  }];
}));
if (!SHELLS.nl.chrome.includes('href="/partners"')) throw new Error('Menu has no Voor merken link; run merken.py and prerender.mjs first');

// Header for a page: its language switcher points at the page's own translations, and its menu item is marked current.
function chromeFor(lang, alts, current) {
  let c = SHELLS[lang].chrome;
  for (const [l, route] of Object.entries(SHELL_PAGE)) c = c.replaceAll(`href="${route}" hreflang="${l}"`, `href="${alts[l]}" hreflang="${l}"`);
  if (current) c = c.replace(`<a href="${current}"`, `<a href="${current}" aria-current="page"`);
  return c;
}

const CSS = `
.kb-hero h1,.prose h2,.prose h3,.card h3,.kb-cluster h2{hyphens:auto;-webkit-hyphens:auto;overflow-wrap:break-word}
.kb-hero{padding:clamp(56px,7vw,110px) 0 clamp(48px,6vw,88px)}
.crumbs{display:flex;flex-wrap:wrap;gap:8px;font-family:'Archivo',sans-serif;font-weight:600;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#8C8C8C;margin:0 0 28px;padding:0;list-style:none}
.crumbs li+li::before{content:"/";margin-right:8px;color:#555}
.crumbs a:hover{color:#FF5F57}
.kb-meta{font-family:'Archivo',sans-serif;font-weight:600;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#A8A8A8}
.kb-light{background:#EFEFEF;color:#161616;padding:clamp(56px,7vw,110px) 0}
.kb-grid{display:grid;grid-template-columns:minmax(0,760px) 260px;gap:clamp(40px,6vw,96px);justify-content:space-between;align-items:start}
@media (max-width:1100px){.kb-grid{grid-template-columns:minmax(0,1fr)}.toc{display:none}}
.tldr{background:#FFFFFF;border:2px solid #161616;box-shadow:8px 8px 0 #FF5F57;padding:24px 28px;margin:0 0 48px;font-size:19px;line-height:1.6}
.tldr .eyebrow{color:#D93A33;margin-bottom:8px}
.tldr p{margin:0}
.prose{font-size:19px;line-height:1.7;color:#2A2A2A;min-width:0}
.prose>:first-child{margin-top:0}
.prose p,.prose ul,.prose ol{margin:0 0 1.1em}
.prose ul,.prose ol{padding-left:1.3em}
.prose li{margin:.35em 0}
.prose li::marker{color:#D93A33;font-weight:700}
.prose h2{font-family:'Archivo Black','Archivo',sans-serif;font-weight:400;text-transform:uppercase;letter-spacing:-.01em;font-size:clamp(26px,3.2vw,40px);line-height:1.02;color:#161616;margin:2em 0 .6em;scroll-margin-top:110px}
.prose h3{font-family:'Archivo',sans-serif;font-weight:700;font-size:22px;line-height:1.3;color:#161616;margin:1.6em 0 .4em;scroll-margin-top:110px}
.prose a{color:#B3261E;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px}
.prose a:hover{color:#161616;background:#FF5F57}
.prose strong{color:#161616}
.prose blockquote{margin:1.6em 0;padding:4px 0 4px 22px;border-left:6px solid #FF5F57;font-size:22px;line-height:1.5;color:#161616}
.tbl{overflow-x:auto;margin:1.4em 0 1.8em;border:2px solid #161616;box-shadow:6px 6px 0 #161616;background:#FFFFFF}
.prose table{border-collapse:collapse;width:100%;font-size:16px;line-height:1.45}
.prose th{background:#161616;color:#FFFFFF;text-align:left;padding:12px 14px;font-family:'Archivo',sans-serif;font-weight:700;white-space:nowrap}
.prose td{padding:11px 14px;border-top:1px solid #D6D6D6;vertical-align:top}
.toc{position:sticky;top:110px;display:flex;flex-direction:column;gap:10px;font-size:15px;line-height:1.4}
.toc .eyebrow{color:#555;margin-bottom:4px}
.toc a{color:#3C3C3C;border-left:3px solid #CFCFCF;padding:2px 0 2px 12px}
.toc a:hover{color:#161616;border-color:#FF5F57}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:32px}
.card{background:#FFFFFF;color:#161616;border:2px solid #161616;box-shadow:8px 8px 0 #161616;padding:28px;display:flex;flex-direction:column;gap:12px;transition:transform 200ms var(--ease),box-shadow 200ms var(--ease)}
.card:hover{transform:translate(-4px,-4px);box-shadow:12px 12px 0 #FF5F57}
.card h3{font-family:'Archivo Black','Archivo',sans-serif;font-weight:400;text-transform:uppercase;font-size:22px;line-height:1.05;margin:0}
.card p{margin:0;font-size:16px;line-height:1.55;color:#3C3C3C}
.card .more{margin-top:auto;font-family:'Archivo',sans-serif;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#B3261E}
.card .eyebrow{color:#555;font-size:12px}
.chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
.chips a{font-family:'Archivo',sans-serif;font-weight:600;font-size:13px;letter-spacing:.06em;text-transform:uppercase;border:2px solid #EFEFEF;padding:8px 12px;color:#EFEFEF}
.chips a:hover{background:#FF5F57;border-color:#FF5F57;color:#161616}
.kb-video{display:block;width:100%;height:auto;aspect-ratio:16 / 9;background:#161616;border:2px solid #EFEFEF;box-shadow:10px 10px 0 #FF5F57}
.kb-cluster{scroll-margin-top:110px}
.p-sec{padding:clamp(88px,10vw,150px) 0}
.p-head{font-size:clamp(28px,3.2vw,46px);line-height:1;margin:0 0 clamp(20px,2.4vw,28px);max-width:860px}
.p-lead{margin:0;max-width:680px;font-size:clamp(18px,1.4vw,20px);line-height:1.65}
.p-label{display:flex;margin-bottom:18px}
.p-top{margin-bottom:clamp(40px,5vw,64px)}
.p-split{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:clamp(28px,6vw,96px);align-items:start}
.p-split .p-head{margin:0}
.p-sticky>div:first-child{position:sticky;top:128px}
@media (max-width:860px){.p-split{grid-template-columns:minmax(0,1fr)}.p-sticky>div:first-child{position:static}}
.p-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:32px}
.p-grid .promise{padding:28px}
.p-grid h3{font-family:'Archivo Black','Archivo',sans-serif;font-weight:400;text-transform:uppercase;font-size:clamp(21px,2vw,26px);line-height:1.05;margin:0;color:#161616;hyphens:auto;-webkit-hyphens:auto}
.p-grid p{margin:0;font-size:17px;line-height:1.55;color:#3C3C3C}
.p-num{font-family:'Archivo Black','Archivo',sans-serif;font-size:18px;color:#B3261E}
.p-gets{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(28px,4vw,56px)}
.p-gets h3{font-family:'Archivo Black','Archivo',sans-serif;font-weight:400;text-transform:uppercase;font-size:clamp(20px,1.8vw,24px);line-height:1;margin:0 0 12px;color:#FFFFFF}
.p-gets p{margin:0;font-size:18px;line-height:1.6;color:#CFCFCF}
.p-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:28px;margin:clamp(32px,4vw,48px) 0}
.p-stat b{display:block;font-family:'Archivo Black','Archivo',sans-serif;font-weight:400;font-size:clamp(40px,4.4vw,64px);line-height:.9;color:#FF5F57}
.p-stat span{display:block;margin-top:8px;font-size:17px;line-height:1.4;color:#CFCFCF}
.yt{position:relative;aspect-ratio:16 / 9;background:#161616;border:2px solid #EFEFEF;box-shadow:10px 10px 0 #FF5F57;scroll-margin-top:110px}
.yt button{all:unset;position:absolute;inset:0;cursor:pointer;display:block}
.yt img,.yt iframe{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border:0;display:block}
.yt img{filter:brightness(.6)}
.yt-btn{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:12px;white-space:nowrap;min-height:56px;padding:0 26px;font-family:'Archivo',sans-serif;font-weight:700;font-size:15px;letter-spacing:.08em;text-transform:uppercase;background:#FF5F57;color:#161616;border:2px solid #161616;box-shadow:5px 5px 0 #000}
.yt button:hover .yt-btn,.yt button:focus-visible .yt-btn{background:#FFFFFF}
.yt button:focus-visible{outline:3px solid #FF5F57;outline-offset:4px}
.yt-note{margin:16px 0 0;font-size:14px;color:#8C8C8C}
.p-price{margin-top:auto;font-family:'Archivo Black','Archivo',sans-serif;font-size:clamp(24px,2.4vw,30px);color:#161616}
.p-items{margin:4px 0 20px;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;font-size:16px;line-height:1.45;color:#2A2A2A}
.p-items li{display:flex;gap:10px}
.p-items li::before{content:"✓";color:#D93A33;font-weight:700}
.p-faq{max-width:820px;border-bottom:1px solid #CFCFCF}
.p-faq h3{font-family:'Archivo',sans-serif;font-weight:700;font-size:19px;line-height:1.35;margin:0;padding:22px 0 6px;border-top:1px solid #CFCFCF;color:#161616}
.p-faq p{margin:0;padding-bottom:22px;font-size:17px;line-height:1.6;color:#3C3C3C}
.p-cat{text-decoration:none}
.p-more{margin-top:auto;font-family:'Archivo',sans-serif;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#B3261E}
.p-cat:hover{transform:translate(-4px,-4px);box-shadow:12px 12px 0 #FF5F57}
.kb-cluster+.kb-cluster{margin-top:clamp(64px,7vw,104px)}
`;

// Extra CSS for the rental pages only
const VH_CSS = `
.vh-notice{background:#FF5F57;color:#161616;font-family:'Archivo',sans-serif;font-weight:700;font-size:14px;letter-spacing:.06em;text-transform:uppercase;padding:12px 0}
.vh-img{display:flex;align-items:center;justify-content:center;aspect-ratio:4 / 3;background:#161616;color:#555;font-family:'Archivo Black','Archivo',sans-serif;text-transform:uppercase;overflow:hidden;border:2px solid #161616;box-shadow:10px 10px 0 #FF5F57;font-size:clamp(28px,4vw,48px)}
.vh-img img,.vh-thumb img{width:100%;height:100%;object-fit:contain;display:block}
.vh-img:has(img),.vh-thumb:has(img){background:#FFFFFF}
.vh-img:has(img){padding:clamp(16px,3vw,40px);box-sizing:border-box}
.vh-thumb:has(img){padding:6px}
.vh-results.is-grid .vh-thumb:has(img){padding:16px}
.vh-price{font-family:'Archivo Black','Archivo',sans-serif;font-size:22px;color:#161616;white-space:nowrap}
.vh-price small{font-family:'Archivo',sans-serif;font-weight:600;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#555}
.vh-price-lg{font-size:clamp(32px,4vw,48px);color:#FFFFFF}
.vh-price-lg small{color:#A8A8A8}
.vh-pricebox{display:flex;flex-direction:column;gap:2px}
.vh-item-buy .vh-pricebox{align-items:flex-end}
.vh-elders{font-family:'Archivo',sans-serif;font-weight:600;font-size:12px;letter-spacing:.02em;color:#2E7D32;white-space:nowrap}
.vh-elders::before{content:'✓ ';font-weight:800}
.vh-elders-lg{font-size:14px;color:#7BD88F;white-space:normal}
.vh-note{font-size:14px!important;color:#666!important}
.vh-save{color:#2E7D32}
.vh-total .vh-save{color:#7BD88F}
.vh-total .vh-was{color:#A8A8A8}
.vh-tip{background:#E8F5E9;border:2px solid #161616;padding:12px 14px;font-size:15px;line-height:1.5;color:#1B3D1E;margin:0 0 14px}
.vh-tip b{color:#161616}
.vh-op{font-family:'Archivo',sans-serif;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#B3261E}
.vh-buy{display:flex;flex-wrap:wrap;align-items:center;gap:24px;margin-top:8px}
.vh-detail{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(40px,6vw,96px);align-items:start}
@media (max-width:900px){.vh-detail{grid-template-columns:minmax(0,1fr)}}
#verhuur [hidden]{display:none!important}
.vh-usp{list-style:none;margin:4px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:10px 28px;font-family:'Archivo',sans-serif;font-weight:600;font-size:15px;color:#EFEFEF}
.vh-usp li{display:flex;align-items:center;gap:10px}
.vh-usp li::before{content:'';width:10px;height:10px;background:#FF5F57;flex:none}
.vh-cat{padding-top:0}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.vh-slider-wrap{background:#EFEFEF;border-bottom:2px solid #161616;padding:28px 0 26px}
.vh-slider-head{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:16px}
.vh-slider-head h2{font-family:'Archivo Black','Archivo',sans-serif;text-transform:uppercase;font-size:clamp(18px,1.8vw,22px);margin:0;color:#161616}
.vh-arrows{display:flex;gap:10px;padding-right:3px}
.vh-arrows button{all:unset;box-sizing:border-box;cursor:pointer;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border:2px solid #161616;background:#FFFFFF;color:#161616;box-shadow:3px 3px 0 #161616;transition:transform 120ms var(--ease),box-shadow 120ms var(--ease),background 120ms var(--ease)}
.vh-arrows button svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.5;stroke-linecap:square;stroke-linejoin:miter}
.vh-arrows button:hover{background:#FF5F57;transform:translate(-1px,-1px);box-shadow:4px 4px 0 #161616}
.vh-arrows button:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #161616}
.vh-arrows button:focus-visible{outline:3px solid #FF5F57;outline-offset:2px}
.vh-arrows button[disabled]{cursor:default;color:#B5B5B5;border-color:#B5B5B5;box-shadow:none;background:#FFFFFF;transform:none}
@media (max-width:640px){.vh-arrows{display:none}}
.vh-slider{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;padding:2px 6px 10px 0}
.vh-slider::-webkit-scrollbar{display:none}
.vh-tile{flex:0 0 auto;width:148px;scroll-snap-align:start;display:flex;flex-direction:column;align-items:flex-start;gap:14px;padding:16px;box-sizing:border-box;background:#FFFFFF;color:#161616;border:2px solid #161616;cursor:pointer;font:inherit;text-align:left;transition:transform 150ms var(--ease),box-shadow 150ms var(--ease)}
.vh-tile svg{width:34px;height:34px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:square;stroke-linejoin:miter}
.vh-tile b{font-family:'Archivo',sans-serif;font-weight:800;font-size:15px;line-height:1.2}
.vh-tile small{display:block;font-family:'Archivo',sans-serif;font-weight:600;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#777;margin-top:2px}
.vh-tile:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 #161616}
.vh-tile:focus-visible{outline:3px solid #FF5F57;outline-offset:2px}
.vh-tile[aria-pressed="true"]{background:#161616;color:#FFFFFF;box-shadow:4px 4px 0 #FF5F57}
.vh-tile[aria-pressed="true"] svg{stroke:#FF5F57}
.vh-tile[aria-pressed="true"] small{color:#A8A8A8}
@media (max-width:640px){.vh-tile{width:118px;padding:12px;gap:10px}.vh-tile svg{width:28px;height:28px}}
.vh-shop{display:grid;grid-template-columns:260px minmax(0,1fr);gap:clamp(24px,3vw,48px);align-items:start;padding-top:36px}
@media (max-width:999px){.vh-shop{grid-template-columns:minmax(0,1fr);padding-top:20px}}
.vh-side{position:sticky;top:calc(var(--vh-top,76px) + 20px);max-height:calc(100vh - var(--vh-top,76px) - 40px);overflow-y:auto;background:#FFFFFF;border:2px solid #161616}
.vh-side summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;font-family:'Archivo',sans-serif;font-weight:800;font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#161616}
.vh-side summary::-webkit-details-marker{display:none}
.vh-side summary::after{content:'+';font-size:22px;line-height:1;color:#D93A33}
.vh-side[open] summary::after{content:'−'}
@media (min-width:1000px){.vh-side summary{cursor:default;border-bottom:2px solid #161616}.vh-side summary::after{display:none}}
@media (max-width:999px){.vh-side{position:static;max-height:none}}
.vh-side summary .vh-fcount{background:#FF5F57;color:#161616;padding:2px 8px;font-size:12px;margin-left:auto}
.vh-fs{border:0;margin:0;padding:16px;border-bottom:1px solid #DDD}
.vh-fs:last-of-type{border-bottom:0}
.vh-fs legend{float:left;width:100%;padding:0;margin:0 0 10px;font-family:'Archivo',sans-serif;font-weight:700;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#555}
.vh-fs label{clear:both;display:flex;align-items:center;gap:10px;padding:5px 0;font-size:16px;color:#2A2A2A;cursor:pointer}
.vh-fs label small{margin-left:auto;font-size:13px;color:#888}
.vh-fs input{accent-color:#161616;width:18px;height:18px;margin:0;flex:none}
.vh-reset{all:unset;cursor:pointer;display:block;margin:0 16px 16px;font-family:'Archivo',sans-serif;font-weight:700;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#B3261E;text-decoration:underline}
.vh-reset[disabled]{opacity:.35;cursor:default;text-decoration:none}
.vh-show{display:none;margin:16px 16px 12px;width:calc(100% - 32px);min-height:48px;font-family:'Archivo',sans-serif;font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;background:#161616;color:#FFFFFF;border:2px solid #161616;box-shadow:4px 4px 0 #FF5F57;cursor:pointer}
@media (max-width:999px){.vh-show{display:block}}
.vh-bar-tools{display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;margin-bottom:18px}
.vh-count{font-family:'Archivo',sans-serif;font-weight:700;font-size:15px;color:#161616;margin-right:auto}
.vh-search{flex:1 1 240px;max-width:340px}
.vh-search input,.vh-sort select{width:100%;box-sizing:border-box;border:2px solid #161616;background:#FFFFFF;padding:10px 12px;font-size:16px;font-family:'Hind',sans-serif;border-radius:0;color:#161616}
.vh-search input:focus,.vh-sort select:focus{outline:none;box-shadow:4px 4px 0 #FF5F57}
.vh-sort{flex:0 0 auto}
.vh-view{display:inline-flex;border:2px solid #161616}
.vh-view button{all:unset;cursor:pointer;width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:#FFFFFF;color:#161616}
.vh-view button+button{border-left:2px solid #161616}
.vh-view button svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:square}
.vh-view button[aria-pressed="true"]{background:#161616;color:#FFFFFF}
.vh-view button:focus-visible{outline:3px solid #FF5F57;outline-offset:-3px}
@media (max-width:640px){.vh-count{flex:1 1 100%}.vh-search{flex:1 1 100%;max-width:none}.vh-sort{flex:1 1 auto}}
.vh-results{display:grid;grid-template-columns:minmax(0,1fr);gap:14px}
.vh-results.is-grid{grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr));gap:18px}
.vh-results.is-grid .vh-item{display:flex;flex-direction:column;align-items:stretch;gap:12px;padding:0}
.vh-results.is-grid .vh-thumb{width:100%;height:auto;aspect-ratio:4 / 3;font-size:13px;border-bottom:2px solid #161616}
.vh-results.is-grid .vh-item-main{padding:0 16px;flex:1}
.vh-results.is-grid .vh-meta{display:none}
.vh-results.is-grid .vh-item-buy{flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding:12px 16px 16px;border-top:1px solid #DDD}
.vh-results.is-grid .vh-item h3{font-size:17px}
.vh-cat-l{display:block;font-family:'Archivo',sans-serif;font-weight:700;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#D93A33;margin-bottom:4px}
.vh-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,640px),1fr));gap:14px}
.vh-item{display:grid;grid-template-columns:96px minmax(0,1fr) auto;gap:16px 20px;align-items:center;background:#FFFFFF;color:#161616;border:2px solid #161616;padding:14px;transition:box-shadow 150ms var(--ease),transform 150ms var(--ease)}
.vh-item:hover{box-shadow:5px 5px 0 #161616;transform:translate(-2px,-2px)}
.vh-item-set{border-color:#161616;box-shadow:5px 5px 0 #FF5F57}
.vh-item-set:hover{box-shadow:7px 7px 0 #FF5F57}
.vh-thumb{display:flex;align-items:center;justify-content:center;width:96px;height:96px;background:#161616;color:#777;font-family:'Archivo',sans-serif;font-weight:700;font-size:10px;letter-spacing:.08em;text-transform:uppercase;text-align:center;overflow:hidden;padding:4px;box-sizing:border-box}
.vh-item-main{min-width:0}
.vh-item h3{font-family:'Archivo',sans-serif;font-weight:800;font-size:18px;line-height:1.25;margin:0 0 4px}
.vh-item h3 a{color:#161616}
.vh-item h3 a:hover{color:#B3261E}
.vh-item p{margin:0;font-size:15px;line-height:1.45;color:#3C3C3C}
.vh-meta{display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:6px;font-size:13px;color:#555}
.vh-item-buy{display:flex;flex-direction:column;align-items:flex-end;gap:10px}
@media (max-width:640px){.vh-item-buy .vh-pricebox{align-items:flex-start}.vh-item{grid-template-columns:64px minmax(0,1fr);gap:12px 14px;align-items:start}.vh-thumb{width:64px;height:64px;font-size:8px}.vh-item-buy{grid-column:1 / -1;flex-direction:row;align-items:center;justify-content:space-between;border-top:1px solid #DDD;padding-top:12px}.vh-item h3{font-size:17px}}
@media (max-width:640px){.vh-results.is-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.vh-results.is-grid .vh-item{display:flex;padding:0;gap:8px}.vh-results.is-grid .vh-thumb{width:100%;height:auto}.vh-results.is-grid .vh-item-main{padding:0 10px}.vh-results.is-grid .vh-item p{display:none}.vh-results.is-grid .vh-item-buy{flex-direction:column;align-items:stretch;padding:10px;border-top:1px solid #DDD}.vh-results.is-grid .vh-add{width:100%;padding:0 6px}.vh-results.is-grid .vh-step{width:100%;justify-content:space-between}.vh-results.is-grid .vh-step i{display:none}.vh-results.is-grid .vh-step span{min-width:36px}.vh-results.is-grid .vh-step button{width:38px}}
.vh-none{font-size:18px;color:#3C3C3C;padding:28px 0}
.vh-none a{color:#B3261E;text-decoration:underline}
.vh-ctl{display:inline-flex;min-height:44px}
.vh-add{font-family:'Archivo',sans-serif;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;background:#FF5F57;color:#161616;border:2px solid #161616;box-shadow:3px 3px 0 #161616;padding:0 14px;min-height:44px;cursor:pointer;white-space:nowrap}
.vh-add:hover{background:#161616;color:#FFFFFF}
.vh-step{display:inline-flex;align-items:stretch;border:2px solid #161616;background:#161616;color:#FFFFFF;box-shadow:3px 3px 0 #FF5F57}
.vh-step button{all:unset;cursor:pointer;width:42px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px}
.vh-step button:hover{background:#FF5F57;color:#161616}
.vh-step button:focus-visible,.vh-qty button:focus-visible{outline:3px solid #FF5F57;outline-offset:-3px}
.vh-step button[disabled]{opacity:.35;cursor:not-allowed;background:none;color:#FFFFFF}
.vh-step span{min-width:64px;display:flex;align-items:center;justify-content:center;gap:6px;padding:0 6px;font-family:'Archivo',sans-serif;font-weight:700;font-size:13px;letter-spacing:.06em;text-transform:uppercase;border-left:1px solid #555;border-right:1px solid #555}
.vh-step span b{font-size:17px}
.vh-step span{white-space:nowrap}
.vh-step i{font-style:normal}
@media (max-width:420px){.vh-step i{display:none}.vh-step span{min-width:44px}}
.vh-ctl-lg{min-height:52px}
.vh-ctl-lg .vh-add{min-height:52px;padding:0 26px;font-size:14px;box-shadow:5px 5px 0 #000}
.vh-ctl-lg .vh-step{border-color:#EFEFEF;box-shadow:5px 5px 0 #FF5F57}
.vh-ctl-lg .vh-step button{width:52px}
.vh-bar{position:fixed;z-index:40;right:clamp(16px,3vw,32px);bottom:clamp(16px,3vw,32px);display:flex;align-items:center;gap:18px;padding:10px 10px 10px 20px;background:#161616;color:#FFFFFF;border:2px solid #161616;box-shadow:5px 5px 0 #FF5F57;font-family:'Archivo',sans-serif;font-size:15px}
.vh-bar b{font-weight:800}
.vh-bar-p{color:#CFCFCF}
.vh-bar-go{background:#FF5F57;color:#161616;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;padding:12px 16px;white-space:nowrap}
.vh-bar:hover .vh-bar-go{background:#FFFFFF}
@media (max-width:640px){.vh-bar{left:0;right:0;bottom:0;border-width:2px 0 0;box-shadow:none;justify-content:space-between;padding:10px 16px;gap:12px}.vh-bar-txt{display:flex;flex-direction:column;line-height:1.3}}
body.vh-has-bar footer{padding-bottom:90px}
.vh-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:24px;counter-reset:s}
.vh-steps div{border-top:4px solid #161616;padding-top:16px}
.vh-steps h3{font-family:'Archivo',sans-serif;font-weight:800;font-size:19px;margin:0 0 6px}
.vh-steps h3::before{counter-increment:s;content:'0' counter(s) '  ';color:#D93A33}
.vh-steps p{margin:0;font-size:16px;line-height:1.55;color:#3C3C3C}
.vh-faq{max-width:860px;border-top:2px solid #161616}
.vh-faq details{border-bottom:2px solid #161616}
.vh-faq summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:16px;padding:18px 0;font-family:'Archivo',sans-serif;font-weight:700;font-size:19px;color:#161616}
.vh-faq summary::-webkit-details-marker{display:none}
.vh-faq summary::after{content:'+';font-size:24px;line-height:1;color:#D93A33}
.vh-faq details[open] summary::after{content:'−'}
.vh-faq p{margin:0 0 20px;font-size:17px;line-height:1.6;color:#3C3C3C}
.vh-more{display:inline-block;margin-top:4px;font-family:'Archivo',sans-serif;font-weight:700;font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:#B3261E}
.vh-quote{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(40px,6vw,96px);align-items:start}
@media (max-width:1000px){.vh-quote{grid-template-columns:minmax(0,1fr)}}
.vh-h2{font-size:clamp(24px,2.6vw,34px);line-height:1;margin:0 0 24px;color:#161616}
.vh-form .vh-h2:not(:first-child){margin-top:40px}
.vh-form{display:flex;flex-direction:column;gap:18px}
.vh-row{display:flex;flex-wrap:wrap;gap:18px}
.lbl{display:flex;flex-direction:column;gap:8px;font-family:'Archivo',sans-serif;font-weight:600;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#161616}
.field{width:100%;box-sizing:border-box;background:#FFFFFF;color:#161616;border:2px solid #161616;padding:14px 16px;font-size:17px;font-family:'Hind',sans-serif;border-radius:0;transition:box-shadow 100ms var(--ease)}
.field:focus{outline:none;box-shadow:5px 5px 0 #FF5F57}
.vh-hint{margin:-6px 0 0;font-size:15px;color:#555}
.vh-radio{border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.vh-radio legend{margin-bottom:10px}
.vh-radio label,.vh-check{display:flex;gap:10px;align-items:flex-start;font-size:17px;line-height:1.4;color:#2A2A2A}
.vh-radio input,.vh-check input{accent-color:#FF5F57;width:20px;height:20px;margin:1px 0 0;flex:none}
.vh-check a{color:#B3261E;text-decoration:underline}
.vh-honey{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
.vh-empty{font-size:18px;color:#3C3C3C}
.vh-empty a{color:#B3261E;text-decoration:underline}
.vh-line{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:12px 16px;align-items:center;background:#FFFFFF;border:2px solid #161616;padding:16px 18px;margin-bottom:14px}
.vh-line a{font-family:'Archivo',sans-serif;font-weight:700;font-size:17px;color:#161616}
.vh-line a{overflow-wrap:anywhere}
@media (max-width:560px){.vh-line{grid-template-columns:auto 1fr}.vh-line>div:first-child{grid-column:1 / -1}.vh-sum{text-align:right}}
.vh-line small{display:block;font-size:14px;color:#555;margin-top:2px}
.vh-qty{display:inline-flex;border:2px solid #161616}
.vh-qty button{all:unset;cursor:pointer;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px}
.vh-qty button:hover{background:#FF5F57}
.vh-qty span{min-width:30px;display:flex;align-items:center;justify-content:center;font-weight:700;border-left:2px solid #161616;border-right:2px solid #161616}
.vh-sum{font-family:'Archivo Black','Archivo',sans-serif;font-size:18px;white-space:nowrap}
.vh-sum small{display:block;font-family:'Archivo',sans-serif;font-weight:700;font-size:13px;text-align:right}
.vh-total{background:#161616;color:#EFEFEF;padding:20px 22px;font-size:16px;line-height:1.6;margin-top:20px}
@media (min-width:1001px){.vh-quote-side{position:sticky;top:calc(var(--vh-top,76px) + 20px)}}
.vh-total:empty{display:none}
.vh-total div{display:flex;justify-content:space-between;gap:16px}
.vh-total .vh-grand{font-family:'Archivo Black','Archivo',sans-serif;font-size:22px;color:#FF5F57;border-top:1px solid #3C3C3C;margin-top:8px;padding-top:8px}
.vh-total p{margin:8px 0 0;font-size:14px;color:#A8A8A8}
.vh-status{margin:0;font-size:17px;font-weight:600}
.vh-status.err{color:#B3261E}
`;

function page({ path, title, description, jsonld, body, ogType, ogImage, lang = 'nl', alts, current, scripts = [], noindex = false, css = '' }) {
  const shell = SHELLS[lang];
  const translated = alts && new Set(Object.values(alts)).size > 1 && Object.values(alts).every((a) => !['/', '/en', '/de'].includes(a));
  const hreflang = translated ? Object.entries(alts).map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${SITE}${p}">`).join('') + `<link rel="alternate" hreflang="x-default" href="${SITE}${alts.nl}">\n` : '';
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${path}">
${noindex ? '<meta name="robots" content="noindex, nofollow">\n' : ''}${hreflang}<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE}${ogImage || SEO.ogImage}">
<meta property="og:type" content="${ogType || (path === '/kennisbank' ? 'website' : 'article')}">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:site_name" content="BERK Productions">
<meta property="og:locale" content="${LOCALES[lang]}">
<meta name="twitter:card" content="summary_large_image">
${ldJson(jsonld)}
${clarityTag(SEO.clarity)}
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&amp;family=Archivo:wght@500;600;700&amp;family=Hind:wght@300;400;500;600&amp;display=swap">
<style>${shell.css}${CSS}${css}</style>
${siteCss(false)}
</head>
<body>
${shell.siteOpen}${chromeFor(lang, alts || { nl: path.startsWith('/kennisbank') ? '/kennisbank' : path, en: '/en', de: '/de' }, current === undefined ? (path.startsWith('/kennisbank') ? '/kennisbank' : null) : current)}<main>
${body}
</main>${shell.footer}</div>
<script src="/js/kb.js" defer></script>${scripts.map((src) => `\n<script src="${src}" defer></script>`).join('')}
</body>
</html>
`;
}

const ORG = { '@type': 'Organization', '@id': SEO.org['@id'], name: 'BERK Productions', url: SITE + '/', logo: SEO.org.logo };
const crumbsLd = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + path })) });
const crumbsHtml = (items, label = 'Kruimelpad') => `<nav aria-label="${label}"><ol class="crumbs">${items.map(([name, path], i) => `<li>${i < items.length - 1 ? `<a href="${path}">${esc(name)}</a>` : `<span aria-current="page">${esc(name)}</span>`}</li>`).join('')}</ol></nav>`;
const card = (a) => `<a class="card" href="/kennisbank/${a.slug}"><span class="eyebrow">${esc(CLUSTERS[a.cluster])}</span><h3>${esc(a.h1)}</h3><p>${esc(a.description)}</p><span class="more">Lees het artikel →</span></a>`;
const ctaBand = (c) => `<section style="background: #FF5F57; color: #161616; padding: clamp(56px, 6vw, 88px) 0"><div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 28px"><p class="h-black" style="margin: 0; font-size: clamp(28px, 3.4vw, 48px); line-height: 1; max-width: 900px">${esc(c.text)}</p><a class="btn" href="${c.href}" style="background: #161616; color: #FFFFFF">${esc(c.label)} <span aria-hidden="true">→</span></a></div></section>`;

// --- Build ---
const articles = readdirSync(SRC).filter((f) => f.endsWith('.md') && !f.startsWith('_')).map((f) => parse(SRC, f, ARTICLE_KEYS)).sort((a, b) => a.order - b.order);
const landings = existsSync(LANDING) ? readdirSync(LANDING).filter((f) => f.endsWith('.md')).map((f) => parse(LANDING, f, LANDING_KEYS)) : [];
const legals = existsSync(LEGAL) ? readdirSync(LEGAL).filter((f) => f.endsWith('.md')).map((f) => parse(LEGAL, f, LEGAL_KEYS)) : [];
const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
const problems = [];
for (const a of [...articles, ...landings, ...legals]) {
  for (const r of a.related) if (!bySlug[r]) problems.push(`${a.slug || a.path}: related "${r}" does not exist`);
  for (const [, href] of a.html.matchAll(/href="(\/[^"#]*)/g)) {
    const ok = href.startsWith('/kennisbank/') ? bySlug[href.slice(12)] : ['/', '/kennisbank', ...partnerPaths, ...formatPaths, ...[...landings, ...legals].map((l) => l.path), ...Object.keys(SEO.pages)].includes(href);
    if (!ok) problems.push(`${a.slug || a.path}: broken internal link ${href}`);
  }
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }

if (existsSync(OUT)) rmSync(OUT, { recursive: true });
for (const a of articles) {
  const path = `/kennisbank/${a.slug}`;
  const crumbs = [['Home', '/'], ['Kennisbank', '/kennisbank'], [a.h1, path]];
  const minutes = Math.max(1, Math.round(a.words / 200));
  const [d, mo, y] = [a.date.slice(8), a.date.slice(5, 7), a.date.slice(0, 4)];
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'Article', '@id': SITE + path + '#article', headline: a.h1, description: a.description, image: SITE + SEO.ogImage, datePublished: a.date, dateModified: a.date, inLanguage: 'nl', wordCount: a.words, keywords: a.keyword, articleSection: CLUSTERS[a.cluster], author: ORG, publisher: ORG, mainEntityOfPage: SITE + path },
    { '@context': 'https://schema.org', ...crumbsLd(crumbs) },
  ];
  if (a.faq.length) jsonld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: a.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') } })) });
  const body = `<section class="kb-hero"><div class="wrap">${crumbsHtml(crumbs)}<div style="display: flex; flex-direction: column; gap: 24px; max-width: 1100px"><span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Kennisbank · ${esc(CLUSTERS[a.cluster])}</span><h1 class="h-black" style="font-size: clamp(30px, 6vw, 88px); line-height: 0.98; color: #FFFFFF; text-shadow: 6px 6px 0 #000">${esc(a.h1)}</h1><span class="kb-meta">${minutes} min lezen · Bijgewerkt ${+d}-${+mo}-${y}</span></div></div></section>
<section class="kb-light"><div class="wrap kb-grid"><article class="prose"><div class="tldr"><span class="eyebrow">In het kort</span><p>${inline(a.summary)}</p></div>
${a.html}
</article><nav class="toc" aria-label="Inhoud"><span class="eyebrow">Inhoud</span>${a.toc.map((t) => `<a href="#${t.id}">${esc(t.text)}</a>`).join('')}</nav></div></section>
${ctaBand(CTAS[a.cta])}
<section style="padding: clamp(80px, 9vw, 140px) 0"><div class="wrap" style="display: flex; flex-direction: column; gap: 40px"><div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 16px"><h2 class="h-black" style="font-size: clamp(36px, 4.4vw, 64px); line-height: 0.95; color: #FFFFFF">Lees ook</h2><a class="kb-meta" href="/kennisbank" style="color: #FF5F57">Alle artikelen →</a></div><div class="cards">${a.related.map((r) => card(bySlug[r])).join('')}</div></div></section>`;
  mkdirSync(join(OUT, a.slug), { recursive: true });
  writeFileSync(join(OUT, a.slug, 'index.html'), page({ path, title: `${a.title} | BERK Productions`, description: a.description, jsonld, body }));
}

// Index
{
  const path = '/kennisbank';
  const title = 'Kennisbank livestream en videoproductie | BERK Productions';
  const description = 'Praktische artikelen over livestreams, videopodcasts en multicamproducties: kosten, techniek, internet, sponsors en rechten. Door de crew van BERK.';
  const crumbs = [['Home', '/'], ['Kennisbank', path]];
  const groups = Object.entries(CLUSTERS).map(([key, label]) => [key, label, articles.filter((a) => a.cluster === key)]).filter(([, , list]) => list.length);
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': SITE + path + '#page', url: SITE + path, name: title, description, inLanguage: 'nl', isPartOf: { '@type': 'WebSite', name: 'BERK Productions', url: SITE + '/' }, publisher: ORG, mainEntity: { '@type': 'ItemList', itemListElement: articles.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/kennisbank/${a.slug}`, name: a.h1 })) } },
    { '@context': 'https://schema.org', ...crumbsLd(crumbs) },
  ];
  const body = `<section class="kb-hero"><div class="wrap">${crumbsHtml(crumbs)}<div style="display: flex; flex-direction: column; gap: 24px; max-width: 1100px"><span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Kennisbank · ${articles.length} artikelen</span><h1 class="h-black" style="font-size: clamp(34px, 7vw, 108px); line-height: 0.95; color: #FFFFFF; text-shadow: 6px 6px 0 #000">Alles over livestreams en <span style="color: #FF5F57">video</span></h1><p style="margin: 0; max-width: 680px; font-size: 20px; line-height: 1.6; color: #CFCFCF">Wat kost het, hoeveel internet heb je nodig, hoe maak je sponsors blij en van wie zijn de beelden? Eerlijke antwoorden uit de praktijk, van de crew die het EK Cable Wakeboard live zette.</p><div class="chips">${groups.map(([key, label]) => `<a href="#${key}">${esc(label)}</a>`).join('')}</div></div></div></section>
<section class="kb-light"><div class="wrap">${groups.map(([key, label, list]) => `<div class="kb-cluster" id="${key}"><h2 class="h-black" style="font-size: clamp(30px, 4.4vw, 64px); line-height: 0.95; margin-bottom: 32px">${esc(label)}</h2><div class="cards">${list.map(card).join('')}</div></div>`).join('')}</div></section>
${ctaBand(CTAS.contact)}`;
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, 'index.html'), page({ path, title, description, jsonld, body }));
}


// Landing pages (static service pages with an optional video), e.g. /livestream-watersport
for (const l of landings) {
  const crumbs = [['Home', '/'], ['Diensten', '/diensten'], [l.h1, l.path]];
  const url = SITE + l.path;
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'Service', '@id': url + '#service', name: l.h1, serviceType: l.keyword, description: l.description, url, provider: ORG, areaServed: ['NL', 'BE', 'DE'], inLanguage: 'nl' },
    { '@context': 'https://schema.org', ...crumbsLd(crumbs) },
  ];
  if (l.video) jsonld.push({ '@context': 'https://schema.org', '@type': 'VideoObject', name: l.videoName || l.h1, description: l.videoDescription || l.description, thumbnailUrl: SITE + l.poster, contentUrl: SITE + l.video, uploadDate: l.videoDate || l.date, duration: l.videoDuration, inLanguage: 'nl', publisher: ORG });
  if (l.faq.length) jsonld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: l.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') } })) });
  const video = l.video ? `<section style="background: #000000; padding: clamp(40px, 5vw, 72px) 0"><div class="wrap"><figure style="margin: 0 auto; max-width: 1200px"><video class="kb-video" controls playsinline preload="none" poster="${l.poster}" aria-label="${esc(l.videoName || l.h1)}"><source src="${l.video}" type="video/mp4"></video><figcaption class="kb-meta" style="margin-top: 16px">${esc(l.videoName || '')}</figcaption></figure></div></section>` : '';
  const body = `<section class="kb-hero"><div class="wrap">${crumbsHtml(crumbs)}<div style="display: flex; flex-direction: column; gap: 24px; max-width: 1100px"><span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>${esc(l.eyebrow)}</span><h1 class="h-black" style="font-size: clamp(34px, 7vw, 108px); line-height: 0.95; color: #FFFFFF; text-shadow: 6px 6px 0 #000">${esc(l.h1)}</h1><p style="margin: 0; max-width: 680px; font-size: 20px; line-height: 1.6; color: #CFCFCF">${inline(l.intro)}</p><div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 8px"><a class="btn" href="/contact">Vraag een offerte aan <span aria-hidden="true">→</span></a><a class="btn" href="/prijscalculator" style="background: #161616; color: #FFFFFF; border-color: #EFEFEF">Bereken je prijs</a></div></div></div></section>
${video}
<section class="kb-light"><div class="wrap kb-grid"><article class="prose">
${l.html}
</article><nav class="toc" aria-label="Inhoud"><span class="eyebrow">Inhoud</span>${l.toc.map((t) => `<a href="#${t.id}">${esc(t.text)}</a>`).join('')}</nav></div></section>
${ctaBand(CTAS[l.cta])}
<section style="padding: clamp(80px, 9vw, 140px) 0"><div class="wrap" style="display: flex; flex-direction: column; gap: 40px"><div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 16px"><h2 class="h-black" style="font-size: clamp(36px, 4.4vw, 64px); line-height: 0.95; color: #FFFFFF">Lees verder</h2><a class="kb-meta" href="/kennisbank" style="color: #FF5F57">Naar de kennisbank →</a></div><div class="cards">${l.related.map((r) => card(bySlug[r])).join('')}</div></div></section>`;
  const dir = join(ROOT, l.path.slice(1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page({ path: l.path, title: `${l.title} | BERK Productions`, description: l.description, jsonld, body, ogType: 'website', ogImage: l.poster }));
}

// Legal pages (privacy policy per language)
const LEGAL_UI = { nl: { home: 'Home', updated: 'Laatst bijgewerkt', crumbs: 'Kruimelpad' }, en: { home: 'Home', updated: 'Last updated', crumbs: 'Breadcrumb' }, de: { home: 'Startseite', updated: 'Zuletzt aktualisiert', crumbs: 'Brotkrumen' } };
for (const l of legals) {
  const ui = LEGAL_UI[l.lang];
  const [nl, en, de] = l.alts.split(',').map((s) => s.trim());
  const alts = { nl, en, de };
  const home = { nl: '/', en: '/en', de: '/de' }[l.lang];
  const crumbs = [[ui.home, home], [l.title, l.path]];
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'WebPage', '@id': SITE + l.path + '#page', url: SITE + l.path, name: l.title, description: l.description, inLanguage: l.lang, isPartOf: { '@type': 'WebSite', name: 'BERK Productions', url: SITE + '/' }, publisher: ORG },
    { '@context': 'https://schema.org', ...crumbsLd(crumbs) },
  ];
  const body = `<section class="kb-hero"><div class="wrap">${crumbsHtml(crumbs, ui.crumbs)}<div style="display: flex; flex-direction: column; gap: 24px; max-width: 1100px"><span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>${esc(l.eyebrow)}</span><h1 class="h-black" style="font-size: clamp(30px, 6vw, 96px); line-height: 0.95; color: #FFFFFF; text-shadow: 6px 6px 0 #000; hyphens: manual; -webkit-hyphens: manual">${esc(l.h1)}</h1><span class="kb-meta">${ui.updated}: ${esc(l.updated)}</span></div></div></section>
<section class="kb-light"><div class="wrap kb-grid"><article class="prose">
${l.html}
</article><nav class="toc" aria-label="${l.lang === 'de' ? 'Inhalt' : l.lang === 'en' ? 'Contents' : 'Inhoud'}"><span class="eyebrow">${l.lang === 'de' ? 'Inhalt' : l.lang === 'en' ? 'Contents' : 'Inhoud'}</span>${l.toc.map((t) => `<a href="#${t.id}">${esc(t.text)}</a>`).join('')}</nav></div></section>`;
  const dir = join(ROOT, l.path.slice(1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page({ path: l.path, title: `${l.title} | BERK Productions`, description: l.description, jsonld, body, ogType: 'website', lang: l.lang, alts, current: null }));
}

// Partner pages for brands (/partners, /en/partners, /de/partner and one page per sport), all content from _build/partners.json
{
  const P = PARTNERS;
  const LANGS = Object.keys(P.langs);
  const sec = (bg, inner) => `<section class="p-sec" style="${bg}"><div class="wrap">${inner}</div></section>`;
  const LIGHT = 'background: #EFEFEF; color: #161616', DARK = 'background: #161616; color: #EFEFEF', BLACK = 'background: #000000; color: #EFEFEF';
  const head = (text, color = '#161616') => `<h2 class="h-black p-head" style="color: ${color}">${esc(text)}</h2>`;
  // Section header with an optional small label; split() puts the header left and the text right.
  const top = (eb, text, color = '#161616') => `<div class="p-top">${eb ? `<span class="eyebrow p-label" style="color: ${color === '#161616' ? '#555555' : '#A8A8A8'}"><span class="dot"></span>${esc(eb)}</span>` : ''}${head(text, color)}</div>`;
  const split = (eb, text, color, right) => `<div class="p-split"><div>${eb ? `<span class="eyebrow p-label" style="color: ${color === '#161616' ? '#555555' : '#A8A8A8'}"><span class="dot"></span>${esc(eb)}</span>` : ''}${head(text, color)}</div><div>${right}</div></div>`;
  const HOME = { nl: '/', en: '/en', de: '/de' };
  const build = (lang, e, isOverview) => {
    const L = P.langs[lang], S = L.shared, U = L.ui, Y = P.youtube;
    const suffix = isOverview ? '' : `/${e.slug}`;
    const path = L.base + suffix;
    const alts = Object.fromEntries(LANGS.map((l) => [l, P.langs[l].base + suffix]));
    const mailto = `mailto:${P.email}?subject=${encodeURIComponent(`${U.subject} - ${e.name}`)}`;
    const crumbs = isOverview ? [[U.home, HOME[lang]], [U.partners, path]] : [[U.home, HOME[lang]], [U.partners, L.base], [e.name, path]];
    const hero = `<section class="kb-hero"><div class="wrap">${crumbsHtml(crumbs, U.crumbs)}<div style="display: flex; flex-direction: column; gap: 24px; max-width: 1100px"><span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span><span id="p-kicker">${esc(e.kicker)}</span></span><h1 class="h-black" style="font-size: clamp(34px, 5vw, 76px); line-height: 0.98; color: #FFFFFF; text-shadow: 5px 5px 0 #000; max-width: 1000px">${esc(e.h1)}</h1><p style="margin: 0; max-width: 720px; font-size: 20px; line-height: 1.6; color: #CFCFCF">${esc(e.intro)}</p>${e.events ? `<p class="kb-meta" style="margin: 0; max-width: 720px; line-height: 1.6">${esc(U.events)}: ${esc(e.events)}</p>` : ''}<div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 8px"><a class="btn" href="${mailto}">${esc(U.talk)} <span aria-hidden="true">→</span></a><a class="btn" href="${U.packagesBtn ? '#pakketten' : '#livestream'}" style="background: #161616; color: #FFFFFF; border-color: #EFEFEF">${esc(U.packagesBtn || U.watch)}</a></div></div></div></section>`;
    const E = S.eyebrows || {};
    const leads = (t, c) => [].concat(t).map((x) => `<p class="p-lead" style="color: ${c}; margin-bottom: 1em">${esc(x)}</p>`).join('');
    const how = sec(LIGHT, S.problem ? split(E.how, S.howHead, '#161616', leads(S.how, '#2A2A2A')) : `${head(S.howHead)}${leads(S.how, '#2A2A2A')}`);
    const problem = S.problem ? sec(BLACK, split(E.problem, S.problemHead, '#FFFFFF', leads(S.problem, '#CFCFCF'))) : '';
    const why = S.why ? sec(LIGHT, split(E.why, S.whyHead, '#161616', leads(S.why, '#2A2A2A'))) : '';
    const middle = isOverview
      ? sec(LIGHT, `${top((S.eyebrows || {}).grid, e.gridHead)}<div class="p-grid">${L.categories.map((c) => `<a class="promise p-cat" href="${L.base}/${c.slug}"><h3>${esc(c.name)}</h3><p>${esc(c.events)}</p><span class="p-more">${esc(U.more)}</span></a>`).join('')}</div>`)
      : sec(LIGHT, `${top((S.eyebrows || {}).ideas, S.ideasHead)}<div class="p-grid">${e.ideas.map((i, n) => `<div class="promise"><span class="p-num">0${n + 1}</span><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>`).join('')}</div>`);
    const gets = sec(DARK, `${top(E.gets, S.getsHead, '#FFFFFF')}<div class="p-gets">${S.gets.map((g) => `<div><h3>${esc(g.title)}</h3><p>${esc(g.text)}</p></div>`).join('')}</div>`);
    const proof = sec(BLACK, `${top(E.proof, S.proofHead, '#FFFFFF')}<p class="p-lead" style="color: #CFCFCF; margin-top: -24px">${esc(S.proof)}</p><div class="p-stats">${S.stats.map((st) => `<div class="p-stat"><b>${esc(st.value)}</b><span>${esc(st.label)}</span></div>`).join('')}</div><div class="yt" id="livestream"><button type="button" data-yt="${Y.id}" data-title="${esc(Y.title)}" aria-label="${esc(U.play)}: ${esc(Y.title)}"><img src="${Y.poster}" alt="${esc(S.posterAlt)}" loading="lazy" decoding="async" width="1440" height="1080"><span class="yt-btn"><span aria-hidden="true">▶</span> ${esc(U.watch)}</span></button></div><p class="yt-note">${esc(U.ytNote)}</p>${S.proofNote ? `<p class="kb-meta" style="margin: 20px 0 0">${esc(S.proofNote)}</p>` : ''}`);
    const packages = sec(LIGHT, `<div id="pakketten" style="scroll-margin-top: 110px">${top(E.packages, S.packagesHead)}${S.packagesIntro ? `<p class="p-lead" style="color: #2A2A2A; margin: -24px 0 40px">${esc(S.packagesIntro)}</p>` : ''}<div class="p-grid">${S.packages.map((pk) => `<div class="promise"><h3>${esc(pk.name)}</h3><p>${esc(pk.text)}</p>${pk.items ? `<ul class="p-items">${pk.items.map((it) => `<li>${esc(it)}</li>`).join('')}</ul>` : ''}<span class="p-price">${esc(pk.price)}</span></div>`).join('')}</div></div><p style="margin: 28px 0 0; font-size: 16px; color: #3C3C3C">${esc(S.packagesNote)}</p>`);
    const pilot = `<section style="background: #FF5F57; color: #161616; padding: clamp(64px, 7vw, 104px) 0"><div class="wrap" style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start"><h2 class="h-black" style="margin: 0; font-size: clamp(36px, 5vw, 72px); line-height: 0.95">${esc(S.pilotHead)}</h2><p style="margin: 0; max-width: 720px; font-size: 21px; line-height: 1.55">${esc([e.pilot, S.pilotAsk].filter(Boolean).join(' '))}</p><a class="btn" href="${mailto}" style="background: #161616; color: #FFFFFF">${esc(U.pilotBtn || U.talk)} <span aria-hidden="true">→</span></a><p style="margin: 0; font-size: 16px">${esc(P.contactLine)}</p></div></section>`;
    const faqList = `<div class="p-faq">${S.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</div>`;
    // The FAQ heading stays in view while the questions scroll past.
    const faq = sec(LIGHT, S.problem ? split(E.faq, U.faqHead, '#161616', faqList).replace('class="p-split"', 'class="p-split p-sticky"') : `${head(U.faqHead)}${faqList}`);
    const jsonld = [
      { '@context': 'https://schema.org', '@type': 'WebPage', '@id': SITE + path + '#page', url: SITE + path, name: e.metaTitle, description: e.metaDescription, inLanguage: lang, isPartOf: { '@type': 'WebSite', name: 'BERK Productions', url: SITE + '/' }, publisher: ORG },
      { '@context': 'https://schema.org', ...crumbsLd(crumbs) },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: S.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ];
    // The NL brief puts the problem first and the proof above what brands get; EN/DE keep the old order until they are translated.
    const order = S.problem ? [hero, problem, how, proof, gets, why, middle, packages, pilot, faq] : [hero, how, middle, gets, proof, packages, pilot, faq];
    const body = `<div id="partner" data-cat="${e.slug || 'overzicht'}" data-proposal="${esc(U.proposal)}">${order.join('')}</div>`;
    const dir = join(ROOT, path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), page({ path, title: e.metaTitle, description: e.metaDescription, jsonld, body, ogType: 'website', ogImage: P.ogImage, scripts: ['/js/partners.js'], lang, alts, current: lang === 'nl' ? '/partners' : null }));
  };
  for (const lang of LANGS) {
    const dir = join(ROOT, P.langs[lang].base.slice(1));
    if (existsSync(dir)) rmSync(dir, { recursive: true });
    build(lang, P.langs[lang].overview, true);
    for (const c of P.langs[lang].categories) build(lang, c, false);
  }
}

// Format pages (/live-verkopen, /podcasts), all content from _build/formats.json. "[BEVESTIGEN ...]" stays visible as a marked placeholder.
{
  const BG = { light: 'background: #EFEFEF; color: #161616', dark: 'background: #161616; color: #EFEFEF', black: 'background: #000000; color: #EFEFEF' };
  const txt = (t) => esc(t).replace(/\[BEVESTIGEN[^\]]*\]/g, (m) => `<mark class="todo">${m}</mark>`);
  const dark = (bg) => bg !== 'light';
  const head = (t, bg) => `<h2 class="h-black p-head" style="color: ${dark(bg) ? '#FFFFFF' : '#161616'}">${txt(t)}</h2>`;
  const label = (x) => x.eyebrow ? `<span class="eyebrow p-label" style="color: ${dark(x.bg) ? '#A8A8A8' : '#555555'}"><span class="dot"></span>${esc(x.eyebrow)}</span>` : '';
  const top = (x, lead) => `<div class="p-top">${label(x)}${head(x.head, x.bg)}${lead || ''}</div>`;
  const split = (x, title, right) => `<div class="p-split"><div>${label(x)}${head(title, x.bg)}</div><div>${right}</div></div>`;
  const lead = (t, bg) => `<p class="p-lead" style="color: ${dark(bg) ? '#CFCFCF' : '#2A2A2A'}; margin-bottom: 1em">${txt(t)}</p>`;
  const sec = (x, inner) => `<section class="p-sec"${x.id ? ` id="${x.id}" style="scroll-margin-top: 90px; ${BG[x.bg]}"` : ` style="${BG[x.bg]}"`}><div class="wrap">${inner}</div></section>`;
  // Three tilted phone frames with a live-shopping screen (own photos, no platform branding); decorative.
  const phones = (x) => `<figure class="f-phones"><div class="f-stack" aria-hidden="true">${x.phones.map((ph, i) => `<div class="f-phone f-ph${i}"><img src="${ph.img}" alt="" loading="${i === 1 ? 'eager' : 'lazy'}" decoding="async"><div class="f-ui"><div class="f-top"><span class="f-live">Live</span><span class="f-handle">${esc(ph.tag)}</span></div>${ph.card ? `<span class="f-card">${esc(ph.card)}</span>` : ''}${ph.chat ? `<div class="f-chat">${ph.chat.map((c) => `<span>${esc(c)}</span>`).join('')}</div>` : ''}${ph.product ? `<div class="f-prod"><img src="${ph.product.img}" alt=""><div><b>${esc(ph.product.name)}</b><small>${esc(ph.product.note)}</small></div><span>${esc(ph.product.cta)}</span></div>` : ''}</div></div>`).join('')}</div><figcaption class="kb-meta">${esc(x.phonesCaption)}</figcaption></figure>`;
  const R = {
    hero: (x) => `<section class="kb-hero"><div class="wrap">${x.crumbs}<div class="${x.phones ? 'f-hero' : ''}"><div style="display: flex; flex-direction: column; gap: 24px; max-width: 1100px">${x.notice ? `<p class="f-notice">${txt(x.notice)}</p>` : ''}<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>${txt(x.eyebrow)}</span><h1 class="h-black" style="font-size: clamp(34px, 5vw, 76px); line-height: 0.98; color: #FFFFFF; text-shadow: 5px 5px 0 #000; max-width: 1000px">${txt(x.h1)}</h1><p style="margin: 0; max-width: 720px; font-size: 20px; line-height: 1.6; color: #CFCFCF">${txt(x.intro)}</p><div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 8px">${x.buttons.map(([label, href], i) => `<a class="btn" href="${href}"${i ? ' style="background: #161616; color: #FFFFFF; border-color: #EFEFEF"' : ''}>${esc(label)}${i ? '' : ' <span aria-hidden="true">→</span>'}</a>`).join('')}</div></div>${x.phones ? phones(x) : ''}</div></div></section>`,
    text: (x) => sec(x, split(x, x.head, x.paras.map((p) => lead(p, x.bg)).join(''))),
    cards: (x) => sec(x, `${top(x)}${x.slider ? `<div class="f-slider" data-slider><div class="f-track p-grid" tabindex="0" role="region" aria-label="${esc(x.head)}, scroll horizontaal">${x.items.map((it, n) => `<div class="promise">${x.numbered ? `<span class="p-num">${String(n + 1).padStart(2, '0')}</span>` : it.label ? `<span class="p-num">${esc(it.label)}</span>` : ''}<h3>${txt(it.title)}</h3><p>${txt(it.text)}</p></div>`).join('')}</div><div class="f-ctrl"><button type="button" class="f-btn" data-prev aria-label="Vorige" disabled>←</button><button type="button" class="f-btn" data-next aria-label="Volgende">→</button><span class="f-count" aria-hidden="true"></span><div class="f-bar"><span></span></div></div></div>` : `<div class="p-grid">${x.items.map((it, n) => `<div class="promise">${x.numbered ? `<span class="p-num">${String(n + 1).padStart(2, '0')}</span>` : it.label ? `<span class="p-num">${esc(it.label)}</span>` : ''}<h3>${txt(it.title)}</h3><p>${txt(it.text)}</p></div>`).join('')}</div>`}`),
    stats: (x) => sec(x, `${top(x)}<div class="p-stats">${x.items.map((st) => `<div class="p-stat"><b>${esc(st.value)}</b><span>${txt(st.label)}</span></div>`).join('')}</div>${x.note ? lead(x.note, x.bg) : ''}<p class="kb-meta" style="margin: 8px 0 0; line-height: 1.6">Bron: ${esc(x.source)}</p>`),
    table: (x) => sec(x, `${top(x, x.intro ? lead(x.intro, x.bg) : '')}<div class="prose" style="max-width: 1100px"><div class="tbl"${x.highlight ? ' style="box-shadow: 10px 10px 0 #FF5F57"' : ''}><table><thead><tr>${x.columns.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${x.rows.map((r) => `<tr>${r.map((c, i) => i ? `<td>${txt(c)}</td>` : `<th scope="row" style="background: #FFFFFF; color: #161616">${txt(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div></div>${x.note ? `<p style="margin: 24px 0 0; font-size: 17px; color: ${dark(x.bg) ? '#CFCFCF' : '#3C3C3C'}">${txt(x.note)}</p>` : ''}`),
    options: (x) => sec(x, `${top(x, x.intro ? lead(x.intro, x.bg) : '')}<div class="f-options">${x.options.map((o) => `<div class="f-opt${o.highlight ? ' hi' : ''}"><span class="f-tag">${esc(o.tag)}</span><h3>${esc(o.name)}</h3><dl>${o.rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${txt(v)}</dd></div>`).join('')}</dl></div>`).join('')}</div>`),
    platforms: (x) => sec(x, `${top(x)}<div class="f-plats">${x.items.map((it) => `<div class="f-plat"><h3>${esc(it.name)}</h3><span class="f-badge${it.checkout ? ' yes' : ''}"><span aria-hidden="true">${it.checkout ? '✓' : '✕'}</span>${it.checkout ? 'Afrekenen in de live' : 'Geen afrekenen in de live'}</span><p class="f-sub">${txt(it.checkoutText)}</p><div class="f-use"><span>Hoe wij het inzetten</span><p>${txt(it.use)}</p></div></div>`).join('')}</div>${x.note ? `<p style="margin: 40px 0 0; font-size: 17px; color: #3C3C3C">${txt(x.note)}</p>` : ''}`),
    prices: (x) => sec(x, `${top(x)}<div class="p-grid" style="max-width: 900px">${x.cards.map((c) => `<div class="promise"><h3>${esc(c.name)}</h3><ul class="p-items">${c.items.map((it) => `<li>${txt(it)}</li>`).join('')}</ul><span class="p-price">${esc(c.price)}</span></div>`).join('')}</div><p style="margin: 28px 0 0; font-size: 16px; color: #3C3C3C">${txt(x.note)}</p>${x.after ? `<p class="p-lead" style="margin-top: 28px; color: #2A2A2A">${txt(x.after)}</p>` : ''}`),
    faq: (x) => sec(x, split(x, 'Veelgestelde vragen', `<div class="p-faq">${x.items.map((f) => `<h3>${txt(f.q)}</h3><p>${txt(f.a)}</p>`).join('')}</div>`).replace('class="p-split"', 'class="p-split p-sticky"')),
    cta: (x) => `<section style="background: #FF5F57; color: #161616; padding: clamp(64px, 7vw, 104px) 0"><div class="wrap" style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start"><h2 class="h-black" style="margin: 0; font-size: clamp(36px, 5vw, 72px); line-height: 0.95">${txt(x.head)}</h2><p style="margin: 0; max-width: 720px; font-size: 21px; line-height: 1.55">${txt(x.text)}</p><a class="btn" href="${x.button[1]}" style="background: #161616; color: #FFFFFF">${esc(x.button[0])} <span aria-hidden="true">→</span></a></div></section>`,
  };
  const css = `.f-notice{margin:0;align-self:flex-start;background:#FF5F57;color:#161616;border:2px solid #161616;box-shadow:5px 5px 0 #000;padding:10px 16px;font-family:'Archivo',sans-serif;font-weight:700;font-size:15px;line-height:1.4}
mark.todo{background:#FFE14D;color:#161616;padding:0 4px;font-weight:600}
.p-grid h3{hyphens:manual;-webkit-hyphens:manual;overflow-wrap:break-word}
.f-hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:clamp(32px,5vw,72px);align-items:center}
.f-hero h1{font-size:clamp(32px,4.2vw,64px)!important;hyphens:manual!important;-webkit-hyphens:manual!important}
.f-phones{margin:0;display:flex;flex-direction:column;align-items:center;gap:44px}
.f-stack{position:relative;width:100%;max-width:560px;height:560px}
.f-phone{position:absolute;width:228px;aspect-ratio:9/19;border:7px solid #000;border-radius:34px;overflow:hidden;background:#000;box-shadow:8px 8px 0 #000}
.f-phone>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.f-ph0{left:18px;top:56px;transform:rotate(-9deg);z-index:1}
.f-ph1{left:50%;top:0;transform:translateX(-50%) rotate(3deg);z-index:3;box-shadow:10px 10px 0 #FF5F57}
.f-ph2{right:18px;top:84px;transform:rotate(10deg);z-index:2}
.f-ph0>img,.f-ph2>img{filter:brightness(.82)}
.f-ui{position:absolute;inset:0;display:flex;flex-direction:column;padding:14px 12px;gap:8px;background:linear-gradient(180deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,0) 28%,rgba(0,0,0,0) 55%,rgba(0,0,0,.6) 100%);font-family:'Archivo',sans-serif}
.f-top{display:flex;align-items:center;gap:8px}
.f-live{background:#FF5F57;color:#161616;font-weight:800;font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:3px 7px;border-radius:4px}
.f-handle{color:#FFFFFF;font-weight:700;font-size:12px}
.f-card{margin-top:auto;align-self:flex-start;background:#161616;color:#FFFFFF;border:2px solid #FF5F57;font-weight:700;font-size:12px;line-height:1.3;padding:7px 9px;max-width:85%}
.f-chat{margin-top:auto;display:flex;flex-direction:column;gap:6px}
.f-chat span{align-self:flex-start;background:rgba(0,0,0,.55);color:#FFFFFF;font-family:'Hind',sans-serif;font-size:12px;line-height:1.3;padding:5px 9px;border-radius:12px}
.f-prod{display:flex;align-items:center;gap:8px;background:#FFFFFF;color:#161616;border-radius:10px;padding:7px}
.f-prod img{width:40px;height:40px;object-fit:cover;border-radius:6px;background:#EFEFEF}
.f-prod div{display:flex;flex-direction:column;min-width:0;flex:1}
.f-prod b{font-size:12px;line-height:1.2}
.f-prod small{font-family:'Hind',sans-serif;font-size:10px;line-height:1.2;color:#555}
.f-prod>span{background:#FF5F57;font-weight:800;font-size:11px;text-transform:uppercase;padding:6px 8px;border-radius:6px}
@media (max-width:960px){.f-hero{grid-template-columns:minmax(0,1fr)}.f-stack{height:440px;max-width:420px}.f-phone{width:176px;border-width:6px;border-radius:28px}.f-ph0{top:44px}.f-ph2{top:66px}}
@media (max-width:960px){.f-prod small,.f-prod img{display:none}.f-chat span{font-size:11px}.f-card{font-size:11px}}
@media (max-width:420px){.f-stack{height:370px}.f-phone{width:140px}.f-ph0{left:10px}.f-ph2{right:10px}}
.f-track{display:grid;grid-template-columns:none;grid-auto-flow:column;grid-auto-columns:min(82vw,330px);gap:32px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin-right:calc(50% - 50vw);padding:4px 40px 14px 0;scroll-padding-left:0;overscroll-behavior-x:contain}
.f-track::-webkit-scrollbar{display:none}
.f-track>*{scroll-snap-align:start}
.f-track:focus-visible{outline:3px solid #FF5F57;outline-offset:4px}
.f-ctrl{display:flex;align-items:center;gap:14px;margin-top:28px}
.f-btn{width:52px;height:52px;display:inline-flex;align-items:center;justify-content:center;font-family:'Archivo',sans-serif;font-weight:700;font-size:20px;background:#FFFFFF;color:#161616;border:2px solid #161616;box-shadow:4px 4px 0 #161616;cursor:pointer;transition:transform 150ms var(--ease),box-shadow 150ms var(--ease),background 150ms var(--ease)}
.f-btn:hover:not(:disabled){background:#FF5F57;transform:translate(-2px,-2px);box-shadow:6px 6px 0 #161616}
.f-btn:disabled{opacity:.35;cursor:default}
.f-count{margin-left:8px;font-family:'Archivo',sans-serif;font-weight:700;font-size:14px;letter-spacing:.08em;font-variant-numeric:tabular-nums;min-width:62px}
.f-bar{flex:1;height:3px;background:#CFCFCF;overflow:hidden}
.f-bar span{display:block;height:100%;background:#FF5F57;transform-origin:left;transform:scaleX(.3);transition:transform 200ms var(--ease)}
.f-options{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(24px,3vw,40px)}
.f-opt{background:#FFFFFF;color:#161616;border:2px solid #161616;box-shadow:8px 8px 0 #000;padding:clamp(28px,3.4vw,44px);display:flex;flex-direction:column;gap:18px}
.f-opt.hi{box-shadow:10px 10px 0 #FF5F57}
.f-opt h3{font-family:'Archivo Black','Archivo',sans-serif;font-weight:400;text-transform:uppercase;font-size:clamp(24px,2.4vw,32px);line-height:1;margin:0}
.f-tag{align-self:flex-start;font-family:'Archivo',sans-serif;font-weight:700;font-size:12px;letter-spacing:.12em;text-transform:uppercase;padding:6px 10px;border:2px solid #161616}
.f-opt.hi .f-tag{background:#FF5F57}
.f-opt dl{margin:4px 0 0}
.f-opt dl div{border-top:1px solid #DDDDDD;padding:16px 0}
.f-opt dt{font-family:'Archivo',sans-serif;font-weight:600;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6B6B6B;margin-bottom:6px}
.f-opt dd{margin:0;font-size:18px;line-height:1.55}
.f-plats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:clamp(24px,3vw,40px)}
.f-plat{background:#FFFFFF;color:#161616;border:2px solid #161616;box-shadow:8px 8px 0 #161616;padding:clamp(28px,3vw,40px);display:flex;flex-direction:column;gap:16px}
.f-plat h3{font-family:'Archivo Black','Archivo',sans-serif;font-weight:400;text-transform:uppercase;font-size:clamp(26px,2.6vw,36px);line-height:1;margin:0}
.f-badge{align-self:flex-start;display:inline-flex;gap:8px;align-items:center;font-family:'Archivo',sans-serif;font-weight:700;font-size:13px;letter-spacing:.06em;text-transform:uppercase;padding:8px 12px;border:2px solid #8C8C8C;color:#6B6B6B}
.f-badge.yes{background:#FF5F57;border-color:#161616;color:#161616}
.f-sub{margin:0;font-size:16px;line-height:1.5;color:#555555}
.f-use{margin-top:auto;border-top:1px solid #DDDDDD;padding-top:16px}
.f-use span{display:block;font-family:'Archivo',sans-serif;font-weight:600;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6B6B6B;margin-bottom:6px}
.f-use p{margin:0;font-size:17px;line-height:1.55}`;
  for (const f of FORMATS.pages) {
    const crumbs = [['Home', '/'], [f.name, f.path]];
    const url = SITE + f.path;
    const faq = f.sections.find((x) => x.type === 'faq');
    const clean = (t) => t.replace(/\s*\[BEVESTIGEN[^\]]*\]/g, '').trim();
    const jsonld = [
      { '@context': 'https://schema.org', '@type': 'Service', '@id': url + '#service', name: f.name, serviceType: f.serviceType, description: f.metaDescription, url, provider: ORG, areaServed: ['NL', 'BE', 'DE'], inLanguage: 'nl' },
      { '@context': 'https://schema.org', ...crumbsLd(crumbs) },
    ];
    if (faq) jsonld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.items.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: clean(q.a) } })) });
    const body = f.sections.map((x) => R[x.type](x.type === 'hero' ? { ...x, crumbs: crumbsHtml(crumbs) } : x)).join('\n');
    const dir = join(ROOT, f.path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), page({ path: f.path, title: f.metaTitle, description: f.metaDescription, jsonld, body, ogType: 'website', current: f.path, css, scripts: f.sections.some((x) => x.slider) ? ['/js/f-slider.js'] : [] }));
  }
}

// Rental pages (/verhuur, one page per product or package, /verhuur/offerte and /verhuur/voorwaarden), all content from _build/verhuur.json.
// While "live" is false the pages get noindex, stay out of the sitemap and the menu has no link to them.
const verhuurPaths = [];
{
  const V = VERHUUR, R = V.regels, B = V.base;
  const live = V.live === true;
  const items = [...V.pakketten.map((p) => ({ ...p, pakket: true })), ...V.producten].filter((p) => p.actief !== false);
  const bySlugV = Object.fromEntries(V.producten.map((p) => [p.slug, p]));
  const catName = Object.fromEntries(V.categorieen.map((c) => [c.slug, c.naam]));
  for (const p of items) {
    if (!p.pakket && !catName[p.categorie]) throw new Error(`verhuur: ${p.slug} has unknown categorie ${p.categorie}`);
    for (const i of p.inhoud || []) if (!bySlugV[i.slug]) throw new Error(`verhuur: pakket ${p.slug} contains unknown product ${i.slug}`);
  }
  // Price factor for n rental days: day 1 full price, each next day R.vervolgdag, a full week at most R.week (same rule in js/verhuur.js).
  const factor = (n) => { const w = Math.floor(n / 7), r = n % 7; return w * R.week + (r ? Math.min(1 + R.vervolgdag * (r - 1), R.week) : 0); };
  const eur = (n) => '€ ' + n.toLocaleString('nl-NL', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const sec = (bg, inner) => `<section class="p-sec" style="${bg}"><div class="wrap">${inner}</div></section>`;
  const LIGHT = 'background: #EFEFEF; color: #161616', DARK = 'background: #161616; color: #EFEFEF';
  const head = (text, color = '#161616') => `<h2 class="h-black p-head" style="color: ${color}">${esc(text)}</h2>`;
  const hero = (crumbs, eyebrow, h1, intro, extra = '') => `<section class="kb-hero"><div class="wrap">${crumbsHtml(crumbs)}<div style="display: flex; flex-direction: column; gap: 24px; max-width: 1100px"><span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>${esc(eyebrow)}</span><h1 class="h-black" style="font-size: clamp(34px, 6.4vw, 96px); line-height: 0.95; color: #FFFFFF; text-shadow: 6px 6px 0 #000">${h1}</h1>${intro ? `<p style="margin: 0; max-width: 720px; font-size: 20px; line-height: 1.6; color: #CFCFCF">${esc(intro)}</p>` : ''}${extra}</div></div></section>`;
  const notice = items.some((p) => p.voorbeeld) ? `<div class="vh-notice" role="note"><div class="wrap">Voorbeeldinventaris: deze producten en prijzen zijn nog niet echt.</div></div>` : '';
  const prices = JSON.stringify(Object.fromEntries(items.map((p) => [p.slug, p.dagprijs])));
  const bar = `<a class="vh-bar" href="${B}/offerte" data-prices='${prices}' hidden><span class="vh-bar-txt"><span><b data-vh-count>0</b> <span data-vh-label>items</span></span> <span class="vh-bar-p">vanaf <b data-vh-sum>€ 0</b> per dag</span></span><span class="vh-bar-go">Offerte <span aria-hidden="true">→</span></span></a>`;
  const visual = (p) => p.foto ? `<img src="${p.foto}" alt="${esc(p.naam)}" loading="lazy" decoding="async">` : `<span aria-hidden="true">${esc(p.pakket ? 'Pakket' : catName[p.categorie])}</span>`;
  // js/verhuur.js swaps the button for a −/+ stepper once the item is in the quote; data-max caps it at the number we own.
  const addBtn = (p, lg) => `<div class="vh-ctl${lg ? ' vh-ctl-lg' : ''}" data-add="${p.slug}" data-name="${esc(p.naam)}" data-max="${p.aantal || 0}"><button type="button" class="vh-add" data-d="1">+ In offerte</button></div>`;
  const meta = (p) => {
    const m = [];
    if (p.inhoud) m.push(p.inhoud.map((i) => `${i.aantal}× ${esc(bySlugV[i.slug].naam)}`).join(', '));
    if (p.aantal > 1) m.push(`${p.aantal} op voorraad`);
    if (p.operator) m.push('<span class="vh-op">Alleen met technicus</span>');
    return m.length ? `<div class="vh-meta">${m.map((x) => `<span>${x}</span>`).join('')}</div>` : '';
  };
  const search = (p) => esc([p.naam, p.kort, p.pakket ? 'pakket set' : catName[p.categorie], ...(p.specs || []), ...(p.inclusief || []), ...(p.inhoud || []).map((i) => bySlugV[i.slug].naam)].join(' ').toLowerCase());
  const catOf = (p) => p.pakket ? 'pakketten' : p.categorie;
  // Reference price at other Dutch rental companies (verhuur.json marktprijs); only shown when we are actually cheaper.
  const elders = (p) => p.marktprijs > p.dagprijs ? `<span class="vh-elders" title="${esc(V.markt.uitleg)}">${esc(V.markt.label)} vanaf ${eur(p.marktprijs)}</span>` : '';
  const card = (p, i = 0) => `<article class="vh-item${p.pakket ? ' vh-item-set' : ''}" data-q="${search(p)}" data-cat="${catOf(p)}" data-price="${p.dagprijs}" data-op="${p.operator ? 1 : 0}" data-i="${i}"><a class="vh-thumb" href="${B}/${p.slug}" tabindex="-1" aria-hidden="true">${visual(p)}</a><div class="vh-item-main"><span class="vh-cat-l">${esc(p.pakket ? 'Pakket' : catName[p.categorie])}</span><h3><a href="${B}/${p.slug}">${esc(p.naam)}</a></h3><p>${esc(p.kort)}</p>${meta(p)}</div><div class="vh-item-buy"><span class="vh-pricebox"><span class="vh-price">${eur(p.dagprijs)}<small> / dag</small></span>${elders(p)}</span>${addBtn(p)}</div></article>`;
  // Line icons per category for the slider; unknown categories fall back to the box.
  const ICONS = {
    alles: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    pakketten: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    cameras: '<rect x="2" y="6" width="14" height="12"/><path d="M16 10l6-3v10l-6-3"/><circle cx="9" cy="12" r="3"/>',
    'live-regie': '<rect x="2" y="4" width="20" height="12"/><path d="M8 20h8M12 16v4M6 8h4v4H6zM14 8h4v4h-4z"/>',
    streaming: '<circle cx="12" cy="12" r="2"/><path d="M8.5 15.5a5 5 0 0 1 0-7M15.5 8.5a5 5 0 0 1 0 7M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8"/>',
    audio: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/>',
    licht: '<rect x="4" y="3" width="16" height="11"/><path d="M12 14v7M8 21h8M7 6.5h10M7 10h10"/>',
    statieven: '<rect x="8" y="2" width="8" height="5"/><path d="M12 7v4M12 11L5 22M12 11l7 11M12 11v11"/>',
    objectieven: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M21 12h-5M12 21v-5M3 12h5"/>',
    opname: '<rect x="2" y="5" width="20" height="14"/><circle cx="8" cy="12" r="3"/><path d="M14 10h5M14 14h5"/>',
    intercom: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="7"/><rect x="17" y="14" width="5" height="7"/><path d="M20 21c0 1-2 1.5-5 1.5"/>',
    gimbal: '<path d="M12 2v4M8 6h8v6H8zM12 12v4M7 16h10M12 16v6"/>',
  };
  const icon = (slug) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[slug] || ICONS.pakketten}</svg>`;
  const write = (path, { title, description, jsonld, body, scripts = [] }) => {
    const dir = join(ROOT, path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), page({ path, title, description, jsonld, body: `<div id="verhuur">${notice}${body}${bar}</div>`, ogType: 'website', ogImage: V.ogImage, scripts: ['/js/verhuur.js', ...scripts], current: null, noindex: !live || path === `${B}/offerte`, css: VH_CSS }));
    if (live && path !== `${B}/offerte`) verhuurPaths.push(path);
  };
  const outDir = join(ROOT, B.slice(1));
  if (existsSync(outDir)) rmSync(outDir, { recursive: true });

  // Overview
  {
    const crumbs = [['Home', '/'], ['Verhuur', B]];
    const title = 'Livestream- en broadcastapparatuur huren in Apeldoorn | BERK Productions';
    const description = "Huur camera's, videomixers, replay, streaming- en audioapparatuur voor je event. Zakelijk, per draaidag, ophalen in Apeldoorn of laten bezorgen.";
    const cats = V.categorieen.map((c) => [c, items.filter((p) => !p.pakket && p.categorie === c.slug)]).filter(([, list]) => list.length);
    const pakketten = items.filter((p) => p.pakket);
    const groups = [...(pakketten.length ? [[{ slug: 'pakketten', naam: 'Pakketten' }, pakketten]] : []), ...cats];
    const ordered = groups.flatMap(([, list]) => list);
    const slider = `<div class="vh-slider-wrap"><div class="wrap"><div class="vh-slider-head"><h2>Kies een categorie</h2><div class="vh-arrows"><button type="button" data-dir="-1" aria-label="Vorige categorieën"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button><button type="button" data-dir="1" aria-label="Volgende categorieën"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div></div><div class="vh-slider" role="group" aria-label="Categorieën">${[[{ slug: 'alles', naam: 'Alles' }, items], ...groups].map(([c, list]) => `<button type="button" class="vh-tile" data-tile="${c.slug}" aria-pressed="${c.slug === 'alles'}">${icon(c.slug)}<span><b>${esc(c.naam)}</b><small>${list.length} ${list.length === 1 ? 'item' : 'items'}</small></span></button>`).join('')}</div></div></div>`;
    const check = (name, value, label, n) => `<label><input type="checkbox" name="${name}" value="${value}"> ${esc(label)}${n != null ? ` <small>${n}</small>` : ''}</label>`;
    const PRICES = [['0-50', 'Tot € 50', 0, 50], ['50-150', '€ 50 tot € 150', 50, 150], ['150-400', '€ 150 tot € 400', 150, 400], ['400-', '€ 400 en meer', 400, Infinity]];
    const side = `<details class="vh-side" open><summary>Filters <span class="vh-fcount" hidden></span></summary><form class="vh-fform" onsubmit="return false">
<fieldset class="vh-fs"><legend>Categorie</legend>${groups.map(([c, list]) => check('cat', c.slug, c.naam, list.length)).join('')}</fieldset>
<fieldset class="vh-fs"><legend>Bediening</legend>${check('op', '0', 'Zelf bedienen (droge huur)', items.filter((p) => !p.operator).length)}${check('op', '1', 'Met onze technicus', items.filter((p) => p.operator).length)}</fieldset>
<fieldset class="vh-fs"><legend>Prijs per dag</legend>${PRICES.map(([v, l, lo, hi]) => check('prijs', v, l, items.filter((p) => p.dagprijs >= lo && p.dagprijs < hi).length)).join('')}</fieldset>
</form><button type="button" class="vh-show">Toon ${items.length} items</button><button type="button" class="vh-reset" disabled>Filters wissen</button></details>`;
    const steps = [['Kies je apparatuur', 'Zet losse items of een pakket in je offerte. Je ziet meteen wat het per dag kost.'], ['Stuur je aanvraag', 'Kies je draaidagen, ophalen of bezorgen en of je een technicus wil.'], ['Binnen een werkdag bevestigd', 'Wij checken de beschikbaarheid en sturen een definitieve offerte. Daarna staat alles getest en compleet klaar.']];
    const VIEW = { grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>', list: '<path d="M3 5h18M3 12h18M3 19h18"/>' };
    const tools = `<div class="vh-bar-tools"><p class="vh-count" aria-live="polite">${items.length} items</p><label class="vh-search"><span class="sr">Zoek in de apparatuur</span><input type="search" placeholder="Zoek, bijv. camera of microfoon" autocomplete="off"></label><label class="vh-sort"><span class="sr">Sorteren</span><select><option value="aanbevolen">Aanbevolen</option><option value="prijs-op">Prijs laag naar hoog</option><option value="prijs-af">Prijs hoog naar laag</option><option value="naam">Naam A–Z</option></select></label><div class="vh-view" role="group" aria-label="Weergave"><button type="button" data-view="grid" aria-pressed="false" aria-label="Rasterweergave"><svg viewBox="0 0 24 24" aria-hidden="true">${VIEW.grid}</svg></button><button type="button" data-view="list" aria-pressed="true" aria-label="Lijstweergave"><svg viewBox="0 0 24 24" aria-hidden="true">${VIEW.list}</svg></button></div></div>`;
    const body = `${hero(crumbs, 'Verhuur · Apeldoorn', 'Apparatuur <span style="color: #FF5F57">huren</span>', "Camera's, regie, replay, streaming en audio waar wij zelf mee live gaan. Kies wat je nodig hebt en vraag in één keer een offerte aan.", `<ul class="vh-usp"><li>Zakelijk, prijzen excl. btw</li><li>Dag 2 en verder halve prijs</li><li>Ophalen in Apeldoorn of laten bezorgen</li><li>Los of met technicus</li></ul>`)}
${slider}
<section class="kb-light vh-cat" id="apparatuur"><div class="wrap vh-shop">
${side}
<div class="vh-main">${tools}<div class="vh-results">${ordered.map(card).join('')}</div>
<p class="vh-none" hidden>Niets gevonden met deze filters. <button type="button" class="vh-reset" style="display: inline; margin: 0">Filters wissen</button> of mail naar <a href="mailto:${V.email}">${V.email}</a>, dan kijken we wat er kan.</p></div>
</div></section>
${sec(LIGHT, `${head('Zo werkt het')}<div class="vh-steps">${steps.map(([t, x]) => `<div><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join('')}</div>`)}
${sec(DARK, `${head('Goed om te weten', '#FFFFFF')}<div class="p-gets">${V.voorwaarden.slice(0, 4).map((v) => `<div><h3>${esc(v.kop)}</h3><p>${esc(v.tekst)}</p></div>`).join('')}</div><p style="margin: 40px 0 0"><a class="kb-meta" href="${B}/voorwaarden" style="color: #FF5F57">Alle huurvoorwaarden →</a></p>`)}
${sec(LIGHT, `${head('Veelgestelde vragen')}<div class="vh-faq">${V.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`)}
${ctaBand({ text: 'Liever de hele productie uit handen geven? Wij draaien je livestream van begin tot eind.', href: '/diensten', label: 'Bekijk de diensten' })}`;
    const jsonld = [
      { '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': SITE + B + '#page', url: SITE + B, name: title, description, inLanguage: 'nl', isPartOf: { '@type': 'WebSite', name: 'BERK Productions', url: SITE + '/' }, publisher: ORG, mainEntity: { '@type': 'ItemList', itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}${B}/${p.slug}`, name: p.naam })) } },
      { '@context': 'https://schema.org', ...crumbsLd(crumbs) },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: V.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ];
    write(B, { title, description, jsonld, body });
  }

  // Product and package pages
  for (const p of items) {
    const path = `${B}/${p.slug}`;
    const crumbs = [['Home', '/'], ['Verhuur', B], [p.naam, path]];
    const title = `${p.naam} huren | BERK Productions`;
    const description = `${p.kort} Te huur vanaf ${eur(p.dagprijs)} per dag excl. btw, ophalen in Apeldoorn of laten bezorgen.`.slice(0, 300);
    const mk = p.marktprijs > p.dagprijs;
    const staffel = [1, 2, 3, 5, 7].map((n) => {
      const ons = p.dagprijs * factor(n), los = p.dagprijs * n;
      return `<tr><td>${n === 7 ? '1 week' : n === 1 ? '1 draaidag' : `${n} draaidagen`}</td><td><strong>${eur(ons)}</strong></td><td>${n > 1 ? `${eur(los - ons)} <small>(${Math.round((1 - ons / los) * 100)}%)</small>` : '–'}</td>${mk ? `<td>${eur(p.marktprijs * factor(n))}</td>` : ''}</tr>`;
    }).join('');
    const list = (label, arr) => arr && arr.length ? `<h3>${label}</h3><ul>${arr.map((x) => `<li>${x}</li>`).join('')}</ul>` : '';
    const inhoud = p.inhoud && p.inhoud.map((i) => `${i.aantal}× <a href="${B}/${i.slug}">${esc(bySlugV[i.slug].naam)}</a>`);
    const related = p.pakket ? items.filter((x) => x.pakket && x.slug !== p.slug) : [...V.pakketten.filter((x) => x.actief !== false && x.inhoud.some((i) => i.slug === p.slug)).map((x) => items.find((y) => y.slug === x.slug)), ...items.filter((x) => !x.pakket && x.categorie === p.categorie && x.slug !== p.slug)];
    const body = `${hero(crumbs, p.pakket ? 'Verhuur · Pakket' : `Verhuur · ${catName[p.categorie]}`, esc(p.naam), p.kort, `<div class="vh-buy"><span class="vh-pricebox"><span class="vh-price vh-price-lg">${eur(p.dagprijs)}<small> / dag excl. btw</small></span>${p.marktprijs > p.dagprijs ? `<span class="vh-elders vh-elders-lg">${esc(V.markt.label)} vanaf ${eur(p.marktprijs)}, bij ons ${eur(p.marktprijs - p.dagprijs)} per dag goedkoper</span>` : ''}</span>${addBtn(p, true)}</div>`)}
<section class="kb-light"><div class="wrap vh-detail"><div class="vh-img vh-img-lg">${visual(p)}</div><div class="prose">${p.aantal ? `<p class="vh-op" style="color: #555">${p.aantal} op voorraad</p>` : ''}${p.operator ? '<p class="vh-op">Alleen te huur met onze eigen technicus. Die zetten we automatisch in je offerte.</p>' : ''}${inhoud ? list('In dit pakket', inhoud) : ''}${list('Specificaties', (p.specs || []).map(esc))}${list('Inclusief', (p.inclusief || []).map(esc))}<h3>Prijs per periode</h3><p>Dag 2 en verder kosten de halve dagprijs, een hele week nooit meer dan drie dagen. Hoe langer je huurt, hoe meer je bespaart.</p><div class="tbl"><table><thead><tr><th>Periode</th><th>Bij BERK</th><th>Je bespaart</th>${mk ? `<th>${esc(V.markt.label)}</th>` : ''}</tr></thead><tbody>${staffel}</tbody></table></div>${mk ? `<p class="vh-note">${esc(V.markt.label)}: ${esc(V.markt.uitleg.charAt(0).toLowerCase() + V.markt.uitleg.slice(1))}</p>` : ''}${p.borg ? `<p>Borg: ${eur(p.borg)}, terug zodra alles compleet en heel retour is.</p>` : ''}<p>Ophalen kan de middag voor je eerste draaidag vanaf 16:00, terugbrengen de ochtend na je laatste draaidag tot 11:00. <a href="${B}/voorwaarden">Huurvoorwaarden</a></p></div></div></section>
${related.length ? `<section style="padding: clamp(80px, 9vw, 140px) 0"><div class="wrap" style="display: flex; flex-direction: column; gap: 40px"><div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 16px"><h2 class="h-black" style="font-size: clamp(36px, 4.4vw, 64px); line-height: 0.95; color: #FFFFFF">${p.pakket ? 'Andere pakketten' : 'Vaak samen gehuurd'}</h2><a class="kb-meta" href="${B}" style="color: #FF5F57">Alle apparatuur →</a></div><div class="vh-list">${related.slice(0, 4).map(card).join('')}</div></div></section>` : ''}`;
    const jsonld = [
      { '@context': 'https://schema.org', '@type': 'Product', '@id': SITE + path + '#product', name: p.naam, description: p.kort, url: SITE + path, ...(p.foto ? { image: SITE + p.foto } : {}), ...(p.merk && !p.voorbeeld ? { brand: { '@type': 'Brand', name: p.merk } } : {}), offers: { '@type': 'Offer', url: SITE + path, priceCurrency: 'EUR', price: p.dagprijs, businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut', eligibleCustomerType: 'http://purl.org/goodrelations/v1#Business', availability: 'https://schema.org/InStock', priceSpecification: { '@type': 'UnitPriceSpecification', price: p.dagprijs, priceCurrency: 'EUR', valueAddedTaxIncluded: false, referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'DAY' } }, seller: ORG, areaServed: 'NL' } },
      { '@context': 'https://schema.org', ...crumbsLd(crumbs) },
    ];
    write(path, { title, description, jsonld, body });
  }

  // Quote request page: the list lives in localStorage, js/verhuur.js renders it with the prices below and sends the form to FormSubmit.
  {
    const path = `${B}/offerte`;
    const crumbs = [['Home', '/'], ['Verhuur', B], ['Offerte', path]];
    const data = { email: V.email, regels: R, marktLabel: V.markt.label, marktUitleg: V.markt.uitleg, items: Object.fromEntries(items.map((p) => [p.slug, { naam: p.naam, dagprijs: p.dagprijs, borg: p.borg || 0, operator: !!p.operator, max: p.aantal || 0, markt: p.marktprijs > p.dagprijs ? p.marktprijs : 0, url: `${B}/${p.slug}` }])) };
    const f = (label, input, wide) => `<label class="lbl" style="flex: ${wide ? '1 1 100%' : '1 1 220px'}">${label}${input}</label>`;
    const body = `${hero(crumbs, 'Verhuur · Offerteaanvraag', 'Jouw <span style="color: #FF5F57">offerte</span>', 'Controleer je apparatuur, kies je draaidagen en stuur je aanvraag. Wij checken de beschikbaarheid en sturen binnen een werkdag een definitieve offerte.')}
<section class="kb-light"><div class="wrap vh-quote">
<div class="vh-quote-side"><h2 class="h-black vh-h2">Apparatuur</h2><div id="vh-list" aria-live="polite"><p class="vh-empty">Je offerte is nog leeg. <a href="${B}">Kies apparatuur</a></p></div><a class="vh-more" href="${B}">+ Meer apparatuur toevoegen</a><div class="vh-total" id="vh-total" aria-live="polite"></div></div>
<form id="vh-form" class="vh-form" novalidate>
<h2 class="h-black vh-h2">Periode en levering</h2>
<div class="vh-row">${f('Eerste draaidag', '<input class="field" type="date" name="van" required>')}${f('Laatste draaidag', '<input class="field" type="date" name="tot" required>')}</div>
<p class="vh-hint">Ophalen kan de middag ervoor vanaf 16:00, terugbrengen de ochtend erna tot 11:00.</p>
<fieldset class="vh-radio"><legend class="lbl">Levering</legend><label><input type="radio" name="levering" value="ophalen" checked> Ophalen in Apeldoorn (gratis)</label><label><input type="radio" name="levering" value="bezorgen"> Bezorgen en ophalen op locatie (vanaf ${eur(R.bezorgenVanaf)})</label></fieldset>
<div class="vh-row" id="vh-adres" hidden>${f('Afleveradres', '<input class="field" name="adres" autocomplete="street-address">', true)}</div>
<label class="vh-check"><input type="checkbox" name="technicus" id="vh-tech"> Met technicus (${eur(R.technicusDagprijs)} per draaidag)</label>
<h2 class="h-black vh-h2">Je gegevens</h2>
<div class="vh-row">${f('Bedrijf', '<input class="field" name="bedrijf" autocomplete="organization" required>')}${f('KvK-nummer', '<input class="field" name="kvk" inputmode="numeric" pattern="[0-9]{8}" required>')}</div>
<div class="vh-row">${f('Naam', '<input class="field" name="naam" autocomplete="name" required>')}${f('Telefoon', '<input class="field" type="tel" name="telefoon" autocomplete="tel" required>')}</div>
<div class="vh-row">${f('E-mail', '<input class="field" type="email" name="email" autocomplete="email" required>')}${f('Event en locatie', '<input class="field" name="event">')}</div>
${f('Opmerkingen', '<textarea class="field" name="opmerkingen" rows="4"></textarea>', true)}
<input type="text" name="_honey" tabindex="-1" autocomplete="off" class="vh-honey" aria-hidden="true">
<label class="vh-check"><input type="checkbox" name="akkoord" required> Ik ga akkoord met de <a href="${B}/voorwaarden" target="_blank">huurvoorwaarden</a></label>
<button class="btn" type="submit">Verstuur aanvraag <span aria-hidden="true">→</span></button>
<p class="vh-status" id="vh-status" role="status"></p>
</form>
</div></section>
<script type="application/json" id="vh-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
    const jsonld = [{ '@context': 'https://schema.org', '@type': 'WebPage', '@id': SITE + path + '#page', url: SITE + path, name: 'Offerte verhuur', inLanguage: 'nl', publisher: ORG }, { '@context': 'https://schema.org', ...crumbsLd(crumbs) }];
    write(path, { title: 'Offerteaanvraag verhuur | BERK Productions', description: 'Vraag een offerte aan voor het huren van livestream- en broadcastapparatuur.', jsonld, body });
  }

  // Rental terms
  {
    const path = `${B}/voorwaarden`;
    const crumbs = [['Home', '/'], ['Verhuur', B], ['Huurvoorwaarden', path]];
    const body = `${hero(crumbs, 'Verhuur', 'Huurvoorwaarden', 'De afspraken voor het huren van apparatuur bij BERK Productions, in gewone taal.')}
<section class="kb-light"><div class="wrap"><div class="prose" style="max-width: 820px">${V.voorwaarden.map((v) => `<h2>${esc(v.kop)}</h2><p>${esc(v.tekst)}</p>`).join('')}</div></div></section>`;
    const jsonld = [{ '@context': 'https://schema.org', '@type': 'WebPage', '@id': SITE + path + '#page', url: SITE + path, name: 'Huurvoorwaarden', inLanguage: 'nl', publisher: ORG }, { '@context': 'https://schema.org', ...crumbsLd(crumbs) }];
    write(path, { title: 'Huurvoorwaarden | BERK Productions', description: 'Huurvoorwaarden voor het zakelijk huren van livestream- en broadcastapparatuur bij BERK Productions.', jsonld, body });
  }
}

// Sitemap: replace the kennisbank, landing, legal, partner and rental block
const sm = join(ROOT, 'sitemap.xml');
const urls = [...landings.map((l) => l.path), ...legals.map((l) => l.path), ...partnerPaths, ...formatPaths, ...verhuurPaths, '/kennisbank', ...articles.map((a) => `/kennisbank/${a.slug}`)].map((p) => `<url><loc>${SITE}${p}</loc></url>`).join('\n');
const smBase = readFileSync(sm, 'utf8').replace(/<lastmod>[^<]*<\/lastmod>/g, '').replace(`<loc>${SITE}</loc>`, `<loc>${SITE}/</loc>`);
const smBody = smBase.replace(new RegExp(`<url><loc>[^<]*(/kennisbank|${[VERHUUR.base, ...formatPaths, ...Object.values(PARTNERS.langs).map((l) => l.base), ...[...landings, ...legals].map((l) => l.path)].join('|')})[^<]*</loc></url>\\n`, 'g'), '').replace('</urlset>', `${urls}\n</urlset>`);
// lastmod per URL: today if the page has uncommitted changes, otherwise the date of its last commit.
const BUILD_DAY = new Date().toISOString().slice(0, 10);
const lastmod = (url) => {
  const rel = url.replace(SITE, '').replace(/^\//, '');
  const file = rel ? join(rel, 'index.html') : 'index.html';
  try {
    if (execFileSync('git', ['status', '--porcelain', '--', file], { cwd: ROOT }).toString().trim()) return BUILD_DAY;
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { cwd: ROOT }).toString().trim() || BUILD_DAY;
  } catch { return BUILD_DAY; }
};
writeFileSync(sm, smBody.replace(/<url><loc>([^<]+)<\/loc><\/url>/g, (m, u) => `<url><loc>${u}</loc><lastmod>${lastmod(u)}</lastmod></url>`));

// 404 page: Vercel serves /404.html for unknown URLs.
{
  const body = `<section class="kb-hero"><div class="wrap"><div style="display: flex; flex-direction: column; gap: 24px; max-width: 900px"><span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>404</span><h1 class="h-black" style="font-size: clamp(34px, 5vw, 76px); line-height: 0.98; color: #FFFFFF; text-shadow: 5px 5px 0 #000">Deze pagina bestaat niet (meer)</h1><p style="margin: 0; max-width: 640px; font-size: 20px; line-height: 1.6; color: #CFCFCF">De link klopt niet of de pagina is verhuisd. Hieronder vind je de belangrijkste plekken op de site.</p><div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 8px"><a class="btn" href="/">Naar de homepage <span aria-hidden="true">→</span></a><a class="btn" href="/contact" style="background: #161616; color: #FFFFFF; border-color: #EFEFEF">Plan een gesprek</a></div></div></div></section>
<section class="kb-light"><div class="wrap"><div class="cards">${[['/partners', 'Voor merken', 'Jullie merk live in de actiesport, met clips die van jullie zijn.'], ['/diensten', 'Voor organisatoren', 'Jullie event live, met replays, graphics en clips.'], ['/live-verkopen', 'Live verkopen', 'Live verkopen op TikTok Shop vanuit onze studio.'], ['/podcasts', 'Podcasts', 'Een videopodcast met clips voor LinkedIn.'], ['/kennisbank', 'Kennisbank', 'Artikelen over livestreams, podcasts en live verkopen.'], ['/en', 'English', 'BERK Productions in English.']].map(([href, h, p]) => `<a class="card" href="${href}"><h3>${esc(h)}</h3><p>${esc(p)}</p><span class="more">Bekijk →</span></a>`).join('')}</div></div></section>`;
  writeFileSync(join(ROOT, '404.html'), page({ path: '/404', title: 'Pagina niet gevonden | BERK Productions', description: 'Deze pagina bestaat niet (meer). Ga naar de homepage of de kennisbank van BERK Productions.', jsonld: [], body, ogType: 'website', noindex: true, current: null }));
}

console.table([...legals, ...landings, ...articles].map((a) => ({ slug: a.slug || a.path, words: a.words, title: (a.title + ' | BERK Productions').length, desc: a.description.length, faq: a.faq.length, links: (a.html.match(/href="\//g) || []).length })));
