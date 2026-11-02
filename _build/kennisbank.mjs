// Build the knowledge base (/kennisbank) from _build/kennisbank/*.md into static pages.
// Header, menu, footer and base CSS come from the prerendered /over page, so run this after prerender.mjs:
//   node _build/prerender.mjs && node _build/kennisbank.mjs
// Idempotent: rewrites kennisbank/ and the kennisbank entries in sitemap.xml.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clarityTag } from './clarity.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, '_build/kennisbank');
const LANDING = join(ROOT, '_build/landing');
const LEGAL = join(ROOT, '_build/legal');
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
.kb-cluster+.kb-cluster{margin-top:clamp(64px,7vw,104px)}
`;

function page({ path, title, description, jsonld, body, ogType, ogImage, lang = 'nl', alts, current }) {
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
${hreflang}<meta property="og:title" content="${esc(title)}">
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
<style>${shell.css}${CSS}</style>
</head>
<body>
${shell.siteOpen}${chromeFor(lang, alts || { nl: path.startsWith('/kennisbank') ? '/kennisbank' : path, en: '/en', de: '/de' }, current === undefined ? (path.startsWith('/kennisbank') ? '/kennisbank' : null) : current)}<main>
${body}
</main>${shell.footer}</div>
<script src="/js/kb.js" defer></script>
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
    const ok = href.startsWith('/kennisbank/') ? bySlug[href.slice(12)] : ['/', '/kennisbank', ...[...landings, ...legals].map((l) => l.path), ...Object.keys(SEO.pages)].includes(href);
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

// Sitemap: replace the kennisbank, landing and legal block
const sm = join(ROOT, 'sitemap.xml');
const urls = [...landings.map((l) => l.path), ...legals.map((l) => l.path), '/kennisbank', ...articles.map((a) => `/kennisbank/${a.slug}`)].map((p) => `<url><loc>${SITE}${p}</loc></url>`).join('\n');
writeFileSync(sm, readFileSync(sm, 'utf8').replace(new RegExp(`<url><loc>[^<]*(/kennisbank|${[...landings, ...legals].map((l) => l.path).join('|') || '/kennisbank'})[^<]*</loc></url>\\n`, 'g'), '').replace('</urlset>', `${urls}\n</urlset>`));

console.table([...legals, ...landings, ...articles].map((a) => ({ slug: a.slug || a.path, words: a.words, title: (a.title + ' | BERK Productions').length, desc: a.description.length, faq: a.faq.length, links: (a.html.match(/href="\//g) || []).length })));
