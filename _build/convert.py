#!/usr/bin/env python3
"""Convert BERK canvas pages (.dc.html) into a static Preact site."""
import os, re, json, shutil, glob

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(BASE, '..', 'berkweb', 'project')
OUT = os.path.join(BASE, 'dist')
GEN = os.path.join(BASE, 'gen')
SITE = 'https://berk.productions'

ROUTES = {
    ('Main', ''): '/', ('Diensten', ''): '/diensten', ('Inzicht', ''): '/waarom-live', ('Werk', ''): '/werk',
    ('Over', ''): '/over', ('Contact', ''): '/contact', ('Calculator', ''): '/prijscalculator',
    ('Main', 'en'): '/en', ('Diensten', 'en'): '/en/services', ('Inzicht', 'en'): '/en/why-live', ('Werk', 'en'): '/en/work',
    ('Over', 'en'): '/en/about', ('Contact', 'en'): '/en/contact',
    ('Main', 'de'): '/de', ('Diensten', 'de'): '/de/leistungen', ('Inzicht', 'de'): '/de/warum-live', ('Werk', 'de'): '/de/projekte',
    ('Over', 'de'): '/de/ueber-uns', ('Contact', 'de'): '/de/kontakt',
}
DESC = {
    '': 'BERK Productions maakt livestreams, multicamproducties en podcasts voor sportevents en organisaties in Nederland, België en Duitsland. Vaste prijs, testdag vooraf.',
    'en': 'BERK Productions produces live streams, multicam productions and podcasts for sports events and organisations in the Netherlands, Belgium and Germany.',
    'de': 'BERK Productions produziert Livestreams, Multicam-Produktionen und Podcasts für Sportevents und Veranstalter in den Niederlanden, Belgien und Deutschland.',
}
VOID = ('img', 'br', 'input', 'hr', 'source', 'wbr', 'meta', 'link')
EXT = {os.path.basename(p).split('.')[0]: os.path.basename(p) for p in glob.glob(os.path.join(BASE, 'blobs-opt', '*'))}
FORM_ENDPOINT = 'https://formsubmit.co/ajax/wouter@berk.productions'


def route_of(name):
    m = re.match(r'([A-Za-z]+)(?:-(en|de))?$', name)
    return ROUTES[(m.group(1), m.group(2) or '')]


def map_links(s):
    def rep(m):
        page, lang, frag = m.group(1), m.group(2) or '', m.group(3) or ''
        return ROUTES[(page, lang)] + frag
    s = re.sub(r'\b(Main|Diensten|Inzicht|Werk|Over|Contact|Calculator)(?:-(en|de))?\.dc\.html(#[\w-]+)?', rep, s)
    s = re.sub(r'/_blob/([0-9a-f]{32})', lambda m: '/assets/' + EXT[m.group(1)], s)
    return s


def esc_tpl(s):
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')


def resolve(path, scope):
    root = path.split('.')[0]
    return path if root in scope else 'v.' + path


def conv_static(s, scope):
    """Convert a run of plain template markup (no sc- tags) into htm source."""
    s = re.sub(r'<!--.*?-->', '', s, flags=re.S)
    s = re.sub(r'\s(hint-placeholder-[\w-]+)="[^"]*"', '', s)
    s = s.replace('&nbsp;', ' ').replace('&amp;', '&')
    # self-close void tags
    s = re.sub(r'<(%s)\b([^>]*?)\s*/?>' % '|'.join(VOID), lambda m: '<%s%s />' % (m.group(1), m.group(2)), s)
    out, pos = [], 0
    for m in re.finditer(r'(=")\{\{\s*([\w.]+)\s*\}\}(")|\{\{\s*([\w.]+)\s*\}\}', s):
        out.append(esc_tpl(s[pos:m.start()]))
        if m.group(1):
            out.append('=${%s}' % resolve(m.group(2), scope))
        else:
            out.append('${%s}' % resolve(m.group(4), scope))
        pos = m.end()
    out.append(esc_tpl(s[pos:]))
    return ''.join(out)


TAG = re.compile(r'<sc-(for|if)\b([^>]*)>|</sc-(for|if)>')


def convert(tpl, scope=()):
    out, pos = [], 0
    while True:
        m = TAG.search(tpl, pos)
        if not m:
            out.append(conv_static(tpl[pos:], scope)); break
        if m.group(3):
            raise ValueError('unexpected close at %d' % m.start())
        out.append(conv_static(tpl[pos:m.start()], scope))
        kind, attrs = m.group(1), m.group(2)
        # find matching close
        depth, j = 1, m.end()
        while depth:
            n = re.compile(r'<sc-%s\b[^>]*>|</sc-%s>' % (kind, kind)).search(tpl, j)
            depth += 1 if not n.group(0).startswith('</') else -1
            j = n.end()
        inner = tpl[m.end():n.start()]
        if kind == 'for':
            lst = re.search(r'list="\{\{\s*([\w.]+)\s*\}\}"', attrs).group(1)
            var = re.search(r'as="(\w+)"', attrs).group(1)
            out.append('${(%s || []).map((%s) => html`%s`)}' % (resolve(lst, scope), var, convert(inner, scope + (var,))))
        else:
            cond = re.search(r'value="\{\{\s*([\w.]+)\s*\}\}"', attrs).group(1)
            out.append('${%s ? html`%s` : null}' % (resolve(cond, scope), convert(inner, scope)))
        pos = j
    return ''.join(out)


CONTACT_SEND = r'''
async sendForm() {
const form = document.querySelector('.site form');
if (!form) return;
if (form.reportValidity && !form.reportValidity()) return;
const data = { _subject: 'Nieuwe aanvraag via berk.productions', _template: 'table', _captcha: 'false', Soort: this.state.type || '', Pagina: window.location.href };
form.querySelectorAll('label').forEach((lb) => {
const f = lb.querySelector('input, textarea, select');
if (!f) return;
const key = (lb.childNodes[0] && lb.childNodes[0].textContent || f.name || 'Veld').trim();
data[key] = f.value;
const em = f.type === 'email' ? f.value : '';
if (em) data._replyto = em;
});
this.setState({ sending: true, sendError: '' });
try {
const r = await fetch('%s', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
if (!r.ok) throw new Error('status ' + r.status);
this.setState({ sent: true, sending: false });
} catch (e) {
this.setState({ sending: false, sendError: 'x' });
window.location.href = 'mailto:wouter@berk.productions';
}
}
''' % FORM_ENDPOINT

CALC_FLAT = r'''
flatPayload(p) {
const c = p.contact || {};
const eur = (n) => (n === null || n === undefined ? 'op aanvraag' : this.eur(Math.round(n)));
const lines = p.lines.map((l) => '- ' + l.label + ' | ' + l.quantity + ' | ' + (l.included ? 'inbegrepen' : l.onRequest ? 'op aanvraag' : eur(l.subtotal))).join('\n');
return { _subject: 'Aanvraag productievoorstel: ' + (c.event || c.org || c.name || ''), _template: 'table', _captcha: 'false', _replyto: c.email || '', Naam: c.name, Organisatie: c.org, 'E-mail': c.email, Telefoon: c.phone || '', Event: c.event, 'Plaats en datum': p.selection.place || '', Bericht: c.msg || '', Samenstelling: lines, 'Subtotaal excl. btw': eur(p.totals.subtotalExVat), 'Btw 21%': eur(p.totals.vat), 'Totaal incl. btw': eur(p.totals.totalIncVat), 'Onderdelen op aanvraag': p.totals.hasOnRequestItems ? 'ja' : 'nee', 'Link naar berekening': p.calculationUrl, Tijdstip: p.timestamp };
}
'''


def patch_script(name, js):
    js = map_links(js)
    js = js.replace("'/_blob/'", "'/assets/'")
    js = re.sub(r"'([0-9a-f]{32})'", lambda m: "'%s'" % EXT.get(m.group(1), m.group(1)), js)
    if name.startswith('Contact'):
        js = js.replace('send: () => this.setState({ sent: true }),', 'send: () => this.sendForm(),')
        assert 'this.sendForm()' in js, name
        js = js.replace('renderVals() {', CONTACT_SEND + '\nrenderVals() {', 1)
    if name.startswith('Calculator'):
        js = js.replace("webhookUrl: '',", "webhookUrl: '%s'," % FORM_ENDPOINT)
        js = js.replace("headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)",
                        "headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(this.flatPayload(payload))")
        assert 'flatPayload(payload)' in js
        js = js.replace('renderVals() {', CALC_FLAT + '\nrenderVals() {', 1)
    return js


def page(name):
    src = open(os.path.join(SRC, name + '.dc.html'), encoding='utf-8').read()
    lang = (re.search(r'<html lang="(\w+)"', src) or [None, 'nl'])[1]
    title = re.search(r'<title>(.*?)</title>', src).group(1).replace('BERK — ', '').strip()
    helmet = re.search(r'<helmet>(.*?)</helmet>', src, re.S).group(1)
    body = re.search(r'</helmet>(.*?)</x-dc>', src, re.S).group(1)
    js = re.search(r'<script type="text/x-dc"[^>]*>(.*?)</script>', src, re.S).group(1)
    if name.startswith('Contact'):
        body = body.replace('autocomplete="name">', 'autocomplete="name" required>').replace('autocomplete="email">', 'autocomplete="email" required>')
    body = map_links(body)
    helmet = map_links(helmet)
    tpl = convert(body.strip())
    js = patch_script(name, js)
    entry = (
        "import { h, render, Component as PC } from 'preact';\n"
        "import htm from 'htm';\n"
        "const html = htm.bind(h);\n"
        "class DCLogic extends PC { render() { return TPL(this.renderVals() || {}); } }\n"
        + js.strip() + "\n"
        "function TPL(v) { return html`" + tpl + "`; }\n"
        "const root = document.getElementById('app');\n"
        "root.textContent = '';\n"
        "render(h(Component, {}), root);\n"
    )
    os.makedirs(GEN, exist_ok=True)
    open(os.path.join(GEN, name + '.js'), 'w', encoding='utf-8').write(entry)
    route = route_of(name)
    l2 = '' if lang == 'nl' else lang
    base = re.sub(r'-(en|de)$', '', name)
    alts = ''.join('<link rel="alternate" hreflang="%s" href="%s%s">' % (hl or 'nl', SITE, ROUTES[(base, hl)])
                   for hl in ('', 'en', 'de') if (base, hl) in ROUTES)
    full_title = ('BERK Productions' if base == 'Main' else title + ' · BERK Productions')
    html_doc = '''<!doctype html>
<html lang="%(lang)s">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<link rel="canonical" href="%(site)s%(route)s">
%(alts)s
<meta property="og:title" content="%(title)s">
<meta property="og:description" content="%(desc)s">
<meta property="og:image" content="%(site)s/assets/43961b6008b5434aee2fd74d9a674b26.webp">
<meta property="og:type" content="website">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
%(helmet)s
<noscript><style>.rv{opacity:1!important;transform:none!important}</style></noscript>
</head>
<body>
<div id="app"></div>
<noscript><p style="padding:24px;font-family:sans-serif;color:#fff">Deze website heeft JavaScript nodig. Mail ons: <a href="mailto:wouter@berk.productions" style="color:#FF5F57">wouter@berk.productions</a></p></noscript>
<script type="module" src="/js/%(name)s.js"></script>
</body>
</html>
''' % dict(lang=lang, title=full_title, desc=DESC[l2], site=SITE, route=route if route != '/' else '/', alts=alts,
           helmet=helmet.strip(), name=name)
    d = os.path.join(OUT, route.strip('/'))
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html_doc)
    return name, route


if __name__ == '__main__':
    if os.path.exists(OUT): shutil.rmtree(OUT)
    if os.path.exists(GEN): shutil.rmtree(GEN)
    os.makedirs(os.path.join(OUT, 'assets'))
    for f in glob.glob(os.path.join(BASE, 'blobs-opt', '*')):
        shutil.copy(f, os.path.join(OUT, 'assets', os.path.basename(f)))
    names = sorted(os.path.basename(p)[:-8] for p in glob.glob(os.path.join(SRC, '*.dc.html')))
    built = [page(n) for n in names]
    print(json.dumps(built))
