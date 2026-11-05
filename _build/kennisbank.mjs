// Build the knowledge base (/kennisbank) from _build/kennisbank/*.md into static pages.
// Header, menu, footer and base CSS come from the prerendered /over page, so run this after prerender.mjs:
//   node _build/prerender.mjs && node _build/kennisbank.mjs
// Idempotent: rewrites kennisbank/ and the kennisbank entries in sitemap.xml.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clarityTag } from './clarity.mjs';
import { siteCss } from './site-css.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, '_build/kennisbank');
const LANDING = join(ROOT, '_build/landing');
const LEGAL = join(ROOT, '_build/legal');
const PARTNERS = JSON.parse(readFileSync(join(ROOT, '_build/partners.json'), 'utf8'));
const VERHUUR = JSON.parse(readFileSync(join(ROOT, '_build/verhuur.json'), 'utf8'));
const partnerPaths = Object.values(PARTNERS.langs).flatMap((l) => [l.base, ...l.categories.map((c) => `${l.base}/${c.slug}`)]);
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
};
const CTAS = {
  prijscalculator: { text: 'Benieuwd wat jouw productie kost? Reken het in een minuut uit.', href: '/prijscalculator', label: 'Naar de prijscalculator' },
  contact: { text: 'Vertel wat je wil draaien. Binnen twee werkdagen heb je een vrijblijvende offerte.', href: '/contact', label: 'Vraag een offerte aan' },
  diensten: { text: 'Livestreams, podcasts, grote producties en aftercare. Bekijk wat we draaien.', href: '/diensten', label: 'Bekijk de diensten' },
  'waarom-live': { text: 'Wat levert een livestream op? Bekijk de cijfers van het EK Cable Wakeboard.', href: '/waarom-live', label: 'Waarom live werkt' },
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
if (!SHELLS.nl.chrome.includes('href="/kennisbank"')) throw new Error('Menu has no Kennisbank link; run prerender.mjs first');

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
.p-sec{padding:clamp(64px,8vw,120px) 0}
.p-head{font-size:clamp(32px,4.6vw,64px);line-height:.95;margin:0 0 clamp(28px,4vw,48px)}
.p-lead{margin:0;max-width:760px;font-size:clamp(19px,1.6vw,22px);line-height:1.6}
.p-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:28px}
.p-grid .promise{padding:28px}
.p-grid h3{font-family:'Archivo Black','Archivo',sans-serif;font-weight:400;text-transform:uppercase;font-size:clamp(21px,2vw,26px);line-height:1.05;margin:0;color:#161616;hyphens:auto;-webkit-hyphens:auto}
.p-grid p{margin:0;font-size:17px;line-height:1.55;color:#3C3C3C}
.p-num{font-family:'Archivo Black','Archivo',sans-serif;font-size:18px;color:#B3261E}
.p-gets{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(28px,4vw,56px)}
.p-gets h3{font-family:'Archivo Black','Archivo',sans-serif;font-weight:400;text-transform:uppercase;font-size:clamp(24px,2.4vw,32px);line-height:1;margin:0 0 12px;color:#FFFFFF}
.p-gets p{margin:0;font-size:18px;line-height:1.6;color:#CFCFCF}
.p-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:28px;margin:clamp(32px,4vw,48px) 0}
.p-stat b{display:block;font-family:'Archivo Black','Archivo',sans-serif;font-weight:400;font-size:clamp(48px,6vw,84px);line-height:.9;color:#FF5F57}
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
.p-faq{max-width:820px}
.p-faq h3{font-family:'Archivo',sans-serif;font-weight:700;font-size:21px;margin:0 0 6px;color:#161616}
.p-faq p{margin:0 0 28px;font-size:18px;line-height:1.6;color:#3C3C3C}
.p-cat{text-decoration:none}
.p-more{margin-top:auto;font-family:'Archivo',sans-serif;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#B3261E}
.p-cat:hover{transform:translate(-4px,-4px);box-shadow:12px 12px 0 #FF5F57}
.kb-cluster+.kb-cluster{margin-top:clamp(64px,7vw,104px)}
`;

// Extra CSS for the rental pages only
const VH_CSS = `
.vh-notice{background:#FF5F57;color:#161616;font-family:'Archivo',sans-serif;font-weight:700;font-size:14px;letter-spacing:.06em;text-transform:uppercase;padding:12px 0}
.vh-card{gap:10px}
.vh-card h3 a:hover{color:#B3261E}
.vh-img{display:flex;align-items:center;justify-content:center;aspect-ratio:4 / 3;margin:-28px -28px 8px;background:#161616;color:#555;font-family:'Archivo Black','Archivo',sans-serif;text-transform:uppercase;font-size:20px;overflow:hidden;border-bottom:2px solid #161616}
.vh-img img{width:100%;height:100%;object-fit:cover;display:block}
.vh-img-lg{margin:0;border:2px solid #161616;box-shadow:10px 10px 0 #FF5F57;font-size:clamp(28px,4vw,48px)}
.vh-foot{margin-top:auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding-top:8px}
.vh-price{font-family:'Archivo Black','Archivo',sans-serif;font-size:24px;color:#161616}
.vh-price small{font-family:'Archivo',sans-serif;font-weight:600;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#555}
.vh-price-lg{font-size:clamp(32px,4vw,48px);color:#FFFFFF}
.vh-price-lg small{color:#A8A8A8}
.vh-add{font-family:'Archivo',sans-serif;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;background:#FF5F57;color:#161616;border:2px solid #161616;box-shadow:4px 4px 0 #161616;padding:10px 14px;cursor:pointer}
.vh-add:hover{background:#161616;color:#FFFFFF}
.vh-add.added,.btn.vh-add.added{background:#161616;color:#FFFFFF}
.vh-op{font-family:'Archivo',sans-serif;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#B3261E}
.vh-buy{display:flex;flex-wrap:wrap;align-items:center;gap:24px;margin-top:8px}
.vh-buy .vh-add{box-shadow:5px 5px 0 #000;padding:0 26px;min-height:52px;font-size:14px}
.vh-detail{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(40px,6vw,96px);align-items:start}
@media (max-width:900px){.vh-detail{grid-template-columns:minmax(0,1fr)}}
.vh-badge{position:fixed;right:clamp(16px,3vw,32px);bottom:clamp(16px,3vw,32px);z-index:40;display:inline-flex;align-items:center;gap:10px;min-height:52px;padding:0 20px;font-family:'Archivo',sans-serif;font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;background:#FF5F57;color:#161616;border:2px solid #161616;box-shadow:5px 5px 0 #000}
.vh-badge b{display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:26px;padding:0 6px;background:#161616;color:#FFFFFF;font-size:13px}
.vh-badge[hidden],#verhuur [hidden]{display:none!important}
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
.vh-total{background:#161616;color:#EFEFEF;padding:20px 22px;font-size:16px;line-height:1.6}
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
    const ok = href.startsWith('/kennisbank/') ? bySlug[href.slice(12)] : ['/', '/kennisbank', ...partnerPaths, ...[...landings, ...legals].map((l) => l.path), ...Object.keys(SEO.pages)].includes(href);
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
  const HOME = { nl: '/', en: '/en', de: '/de' };
  const build = (lang, e, isOverview) => {
    const L = P.langs[lang], S = L.shared, U = L.ui, Y = P.youtube;
    const suffix = isOverview ? '' : `/${e.slug}`;
    const path = L.base + suffix;
    const alts = Object.fromEntries(LANGS.map((l) => [l, P.langs[l].base + suffix]));
    const mailto = `mailto:${P.email}?subject=${encodeURIComponent(`${U.subject} - ${e.name}`)}`;
    const crumbs = isOverview ? [[U.home, HOME[lang]], [U.partners, path]] : [[U.home, HOME[lang]], [U.partners, L.base], [e.name, path]];
    const hero = `<section class="kb-hero"><div class="wrap">${crumbsHtml(crumbs, U.crumbs)}<div style="display: flex; flex-direction: column; gap: 24px; max-width: 1100px"><span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span><span id="p-kicker">${esc(e.kicker)}</span></span><h1 class="h-black" style="font-size: clamp(34px, 6.4vw, 96px); line-height: 0.95; color: #FFFFFF; text-shadow: 6px 6px 0 #000">${esc(e.h1)}</h1><p style="margin: 0; max-width: 720px; font-size: 20px; line-height: 1.6; color: #CFCFCF">${esc(e.intro)}</p>${e.events ? `<p class="kb-meta" style="margin: 0; max-width: 720px; line-height: 1.6">${esc(U.events)}: ${esc(e.events)}</p>` : ''}<div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 8px"><a class="btn" href="${mailto}">${esc(U.talk)} <span aria-hidden="true">→</span></a><a class="btn" href="#livestream" style="background: #161616; color: #FFFFFF; border-color: #EFEFEF">${esc(U.watch)}</a></div></div></div></section>`;
    const how = sec(LIGHT, `${head(S.howHead)}<p class="p-lead" style="color: #2A2A2A">${esc(S.how)}</p>`);
    const middle = isOverview
      ? sec(LIGHT, `${head(e.gridHead)}<div class="p-grid">${L.categories.map((c) => `<a class="promise p-cat" href="${L.base}/${c.slug}"><h3>${esc(c.name)}</h3><p>${esc(c.events)}</p><span class="p-more">${esc(U.more)}</span></a>`).join('')}</div>`)
      : sec(LIGHT, `${head(S.ideasHead)}<div class="p-grid">${e.ideas.map((i, n) => `<div class="promise"><span class="p-num">0${n + 1}</span><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>`).join('')}</div>`);
    const gets = sec(DARK, `${head(S.getsHead, '#FFFFFF')}<div class="p-gets">${S.gets.map((g) => `<div><h3>${esc(g.title)}</h3><p>${esc(g.text)}</p></div>`).join('')}</div>`);
    const proof = sec(BLACK, `${head(S.proofHead, '#FFFFFF')}<p class="p-lead" style="color: #CFCFCF">${esc(S.proof)}</p><div class="p-stats">${S.stats.map((st) => `<div class="p-stat"><b>${esc(st.value)}</b><span>${esc(st.label)}</span></div>`).join('')}</div><div class="yt" id="livestream"><button type="button" data-yt="${Y.id}" data-title="${esc(Y.title)}" aria-label="${esc(U.play)}: ${esc(Y.title)}"><img src="${Y.poster}" alt="${esc(S.posterAlt)}" loading="lazy" decoding="async" width="1440" height="1080"><span class="yt-btn"><span aria-hidden="true">▶</span> ${esc(U.watch)}</span></button></div><p class="yt-note">${esc(U.ytNote)}</p>`);
    const packages = sec(LIGHT, `${head(S.packagesHead)}<div class="p-grid">${S.packages.map((pk) => `<div class="promise"><h3>${esc(pk.name)}</h3><p>${esc(pk.text)}</p><span class="p-price">${esc(pk.price)}</span></div>`).join('')}</div><p style="margin: 28px 0 0; font-size: 16px; color: #3C3C3C">${esc(S.packagesNote)}</p>`);
    const pilot = `<section style="background: #FF5F57; color: #161616; padding: clamp(64px, 7vw, 104px) 0"><div class="wrap" style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start"><h2 class="h-black" style="margin: 0; font-size: clamp(36px, 5vw, 72px); line-height: 0.95">${esc(S.pilotHead)}</h2><p style="margin: 0; max-width: 720px; font-size: 21px; line-height: 1.55">${esc(e.pilot)} ${esc(S.pilotAsk)}</p><a class="btn" href="${mailto}" style="background: #161616; color: #FFFFFF">${esc(U.talk)} <span aria-hidden="true">→</span></a><p style="margin: 0; font-size: 16px">${esc(P.contactLine)}</p></div></section>`;
    const faq = sec(LIGHT, `${head(U.faqHead)}<div class="p-faq">${S.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</div>`);
    const jsonld = [
      { '@context': 'https://schema.org', '@type': 'WebPage', '@id': SITE + path + '#page', url: SITE + path, name: e.metaTitle, description: e.metaDescription, inLanguage: lang, isPartOf: { '@type': 'WebSite', name: 'BERK Productions', url: SITE + '/' }, publisher: ORG },
      { '@context': 'https://schema.org', ...crumbsLd(crumbs) },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: S.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ];
    const body = `<div id="partner" data-cat="${e.slug || 'overzicht'}" data-proposal="${esc(U.proposal)}">${hero}${how}${middle}${gets}${proof}${packages}${pilot}${faq}</div>`;
    const dir = join(ROOT, path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), page({ path, title: e.metaTitle, description: e.metaDescription, jsonld, body, ogType: 'website', ogImage: P.ogImage, scripts: ['/js/partners.js'], lang, alts, current: null }));
  };
  for (const lang of LANGS) {
    const dir = join(ROOT, P.langs[lang].base.slice(1));
    if (existsSync(dir)) rmSync(dir, { recursive: true });
    build(lang, P.langs[lang].overview, true);
    for (const c of P.langs[lang].categories) build(lang, c, false);
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
  const badge = `<a class="vh-badge" href="${B}/offerte" hidden>Offerte <b data-vh-count>0</b></a>`;
  const visual = (p) => p.foto ? `<img src="${p.foto}" alt="${esc(p.naam)}" loading="lazy" decoding="async">` : `<span aria-hidden="true">${esc(p.pakket ? 'Set' : catName[p.categorie])}</span>`;
  const addBtn = (p, cls = 'vh-add') => `<button type="button" class="${cls}" data-add="${p.slug}" data-name="${esc(p.naam)}">+ Offerte</button>`;
  const card = (p) => `<article class="card vh-card"><a class="vh-img" href="${B}/${p.slug}" tabindex="-1">${visual(p)}</a><span class="eyebrow">${esc(p.pakket ? 'Pakket' : catName[p.categorie])}</span><h3><a href="${B}/${p.slug}">${esc(p.naam)}</a></h3><p>${esc(p.kort)}</p><div class="vh-foot"><span class="vh-price">${eur(p.dagprijs)}<small> / dag</small></span>${addBtn(p)}</div>${p.operator ? '<span class="vh-op">Alleen met technicus</span>' : ''}</article>`;
  const write = (path, { title, description, jsonld, body, scripts = [] }) => {
    const dir = join(ROOT, path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), page({ path, title, description, jsonld, body: `<div id="verhuur">${notice}${body}${badge}</div>`, ogType: 'website', ogImage: V.ogImage, scripts: ['/js/verhuur.js', ...scripts], current: null, noindex: !live || path === `${B}/offerte`, css: VH_CSS }));
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
    const chips = `<div class="chips">${pakketten.length ? `<a href="#pakketten">Pakketten</a>` : ''}${cats.map(([c]) => `<a href="#${c.slug}">${esc(c.naam)}</a>`).join('')}</div>`;
    const steps = [['Kies je apparatuur', 'Zet losse items of een pakket in je offerte. Je ziet meteen een indicatie van de prijs.'], ['Stuur je aanvraag', 'Kies je draaidagen, ophalen of bezorgen en of je een technicus wil. Binnen een werkdag heb je een definitieve offerte.'], ['Ophalen of bezorgd', 'Haal alles op in Apeldoorn, of wij brengen het naar je locatie. Getest, compleet en in flightcases.']];
    const body = `${hero(crumbs, 'Verhuur · Apeldoorn', 'Apparatuur <span style="color: #FF5F57">huren</span>', "Camera's, regie, replay, streaming en audio waar wij zelf mee live gaan. Zakelijk te huur per draaidag, los of met een technicus erbij.", `${chips}<div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 8px"><a class="btn" href="#apparatuur">Bekijk de apparatuur <span aria-hidden="true">→</span></a><a class="btn" href="${B}/offerte" style="background: #161616; color: #FFFFFF; border-color: #EFEFEF">Naar je offerte</a></div>`)}
${sec(LIGHT, `${head('Zo werkt het')}<div class="p-grid">${steps.map(([t, x], n) => `<div class="promise"><span class="p-num">0${n + 1}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join('')}</div>`)}
${pakketten.length ? `<section class="kb-light" id="pakketten" style="padding-top: 0"><div class="wrap">${head('Pakketten')}<div class="cards">${pakketten.map(card).join('')}</div></div></section>` : ''}
<section class="kb-light" id="apparatuur" style="padding-top: 0"><div class="wrap">${cats.map(([c, list]) => `<div class="kb-cluster" id="${c.slug}"><h2 class="h-black" style="font-size: clamp(30px, 4.4vw, 64px); line-height: 0.95; margin-bottom: 32px">${esc(c.naam)}</h2><div class="cards">${list.map(card).join('')}</div></div>`).join('')}</div></section>
${sec(DARK, `${head('Goed om te weten', '#FFFFFF')}<div class="p-gets">${V.voorwaarden.slice(0, 4).map((v) => `<div><h3>${esc(v.kop)}</h3><p>${esc(v.tekst)}</p></div>`).join('')}</div><p style="margin: 40px 0 0"><a class="kb-meta" href="${B}/voorwaarden" style="color: #FF5F57">Alle huurvoorwaarden →</a></p>`)}
${sec(LIGHT, `${head('Veelgestelde vragen')}<div class="p-faq">${V.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</div>`)}
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
    const staffel = [1, 2, 3, 7].map((n) => `<tr><td>${n === 7 ? '1 week' : n === 1 ? '1 draaidag' : `${n} draaidagen`}</td><td>${eur(p.dagprijs * factor(n))}</td></tr>`).join('');
    const list = (label, arr) => arr && arr.length ? `<h3>${label}</h3><ul>${arr.map((x) => `<li>${x}</li>`).join('')}</ul>` : '';
    const inhoud = p.inhoud && p.inhoud.map((i) => `${i.aantal}× <a href="${B}/${i.slug}">${esc(bySlugV[i.slug].naam)}</a>`);
    const related = p.pakket ? items.filter((x) => x.pakket && x.slug !== p.slug) : [...V.pakketten.filter((x) => x.actief !== false && x.inhoud.some((i) => i.slug === p.slug)).map((x) => items.find((y) => y.slug === x.slug)), ...items.filter((x) => !x.pakket && x.categorie === p.categorie && x.slug !== p.slug)];
    const body = `${hero(crumbs, p.pakket ? 'Verhuur · Pakket' : `Verhuur · ${catName[p.categorie]}`, esc(p.naam), p.kort, `<div class="vh-buy"><span class="vh-price vh-price-lg">${eur(p.dagprijs)}<small> / dag excl. btw</small></span>${addBtn(p, 'btn vh-add')}</div>`)}
<section class="kb-light"><div class="wrap vh-detail"><div class="vh-img vh-img-lg">${visual(p)}</div><div class="prose">${p.operator ? '<p class="vh-op">Alleen te huur met onze eigen technicus. Die zetten we automatisch in je offerte.</p>' : ''}${inhoud ? list('In dit pakket', inhoud) : ''}${list('Specificaties', (p.specs || []).map(esc))}${list('Inclusief', (p.inclusief || []).map(esc))}<h3>Prijs per periode</h3><div class="tbl"><table><thead><tr><th>Periode</th><th>Prijs excl. btw</th></tr></thead><tbody>${staffel}</tbody></table></div>${p.borg ? `<p>Borg: ${eur(p.borg)}, terug zodra alles compleet en heel retour is.</p>` : ''}<p>Ophalen kan de middag voor je eerste draaidag vanaf 16:00, terugbrengen de ochtend na je laatste draaidag tot 11:00. <a href="${B}/voorwaarden">Huurvoorwaarden</a></p></div></div></section>
${related.length ? `<section style="padding: clamp(80px, 9vw, 140px) 0"><div class="wrap" style="display: flex; flex-direction: column; gap: 40px"><div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 16px"><h2 class="h-black" style="font-size: clamp(36px, 4.4vw, 64px); line-height: 0.95; color: #FFFFFF">${p.pakket ? 'Andere pakketten' : 'Vaak samen gehuurd'}</h2><a class="kb-meta" href="${B}" style="color: #FF5F57">Alle apparatuur →</a></div><div class="cards">${related.slice(0, 3).map(card).join('')}</div></div></section>` : ''}`;
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
    const data = { email: V.email, regels: R, items: Object.fromEntries(items.map((p) => [p.slug, { naam: p.naam, dagprijs: p.dagprijs, borg: p.borg || 0, operator: !!p.operator, url: `${B}/${p.slug}` }])) };
    const f = (label, input, wide) => `<label class="lbl" style="flex: ${wide ? '1 1 100%' : '1 1 220px'}">${label}${input}</label>`;
    const body = `${hero(crumbs, 'Verhuur · Offerteaanvraag', 'Jouw <span style="color: #FF5F57">offerte</span>', 'Controleer je apparatuur, kies je draaidagen en stuur je aanvraag. Wij checken de beschikbaarheid en sturen binnen een werkdag een definitieve offerte.')}
<section class="kb-light"><div class="wrap vh-quote">
<div><h2 class="h-black vh-h2">Apparatuur</h2><div id="vh-list" aria-live="polite"><p class="vh-empty">Je offerte is nog leeg. <a href="${B}">Kies apparatuur</a></p></div></div>
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
<div class="vh-total" id="vh-total"></div>
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
const urls = [...landings.map((l) => l.path), ...legals.map((l) => l.path), ...partnerPaths, ...verhuurPaths, '/kennisbank', ...articles.map((a) => `/kennisbank/${a.slug}`)].map((p) => `<url><loc>${SITE}${p}</loc></url>`).join('\n');
writeFileSync(sm, readFileSync(sm, 'utf8').replace(new RegExp(`<url><loc>[^<]*(/kennisbank|${[VERHUUR.base, ...Object.values(PARTNERS.langs).map((l) => l.base), ...[...landings, ...legals].map((l) => l.path)].join('|')})[^<]*</loc></url>\\n`, 'g'), '').replace('</urlset>', `${urls}\n</urlset>`));

console.table([...legals, ...landings, ...articles].map((a) => ({ slug: a.slug || a.path, words: a.words, title: (a.title + ' | BERK Productions').length, desc: a.description.length, faq: a.faq.length, links: (a.html.match(/href="\//g) || []).length })));
