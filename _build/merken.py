#!/usr/bin/env python3
"""Content brief 'media voor merken', fase 1 (NL): new main menu on every NL page and the new homepage sections.
Patches the page bundles (js/*.js) and the design sources (_build/pages/*.dc.html), like footer.py and verhaal.py.
Run from the repo root: python3 _build/merken.py, then verhaal.py, prerender.mjs and kennisbank.mjs. Safe to run again."""
import glob, re

# --- Main menu (NL) ---
MENU = [('/', 'Home'), ('/partners', 'Voor merken'), ('/diensten', 'Voor organisatoren'), ('/live-verkopen', 'Live verkopen'),
        ('/podcasts', 'Podcasts'), ('/werk', 'Werk'), ('/over', 'Over'), ('/contact', 'Contact')]
# Which menu item is current on each NL page (pages whose item moved to the footer have none).
CURRENT = {'Main': '/', 'Diensten': '/diensten', 'Werk': '/werk', 'Over': '/over', 'Contact': '/contact', 'Calculator': None, 'Inzicht': None}
UL = re.compile(r'(<ul class="menu-links"[^>]*>)(.*?)(</ul>)', re.S)


def menu(s, name):
    m = UL.search(s)
    click = re.search(r'onClick=("\{\{closeMenu\}\}"|\$\{\w+\.closeMenu\})', m.group(2)).group(1)
    items = ''.join('<li><a href="%s"%s onClick=%s><small>%02d</small>%s</a></li>' % (
        href, ' aria-current="page"' if href == CURRENT[name] else '', click, i + 1, label) for i, (href, label) in enumerate(MENU))
    return s[:m.start(2)] + items + s[m.end(2):]


# --- Homepage (NL) ---
def section_at(s, marker):
    """Start and end of the <section> that contains marker."""
    i = s.index(marker)
    a = s.rindex('<section', 0, i)
    return a, s.index('</section>', i) + len('</section>')


def eyebrow(text, color='#555555', dot=False):
    return '<span class="eyebrow" style="color: %s">%s%s</span>' % (color, '<span class="dot"></span>' if dot else '', text)


H2 = 'class="h-black" style="font-size: clamp(34px, 4.4vw, 64px); line-height: 0.95; text-wrap: initial%s"'
ARROW = '<span aria-hidden="true">→</span>'
LINK = 'font-family: \'Archivo\', sans-serif; font-weight: 700; font-size: 17px'

HERO = '''<h1 class="h-black hero-h" style="font-size: clamp(34px, 5.4vw, 104px); line-height: 0.95; color: #FFFFFF; text-shadow: 6px 6px 0 #000000; text-wrap: initial"><span class="eyebrow" style="display: flex; width: fit-content; margin-bottom: 28px; color: #EFEFEF; line-height: 1.4; text-shadow: none"><span class="dot"></span>Livestream, live verkopen en podcasts</span><span class="hl">Eén opname.</span> <span class="hl">Een maand aan <span style="color: #FF5F57">content.</span></span></h1>
<p style="margin: 0; max-width: 600px; font-size: 20px; line-height: 1.55; color: #D8D8D8">Wij zenden sport en events live uit, produceren live verkoopshows en nemen podcasts op. Met meerdere camera’s, replays en graphics. Daarna knippen we er clips van. Die zijn van jullie.</p>
<div style="display: flex; flex-wrap: wrap; gap: 16px">
<a class="btn" href="/partners">Voor merken %s</a>
<a class="btn ghost" href="/diensten">Voor organisatoren</a>
</div>
</div>
</section>''' % ARROW

STAT = '<span style="display: inline-flex; align-items: baseline; gap: 8px"><b class="h-black" style="font-size: clamp(26px, 2.6vw, 38px); color: #161616">%s</b><span style="font-size: 16px; color: #3C3C3C">%s</span></span>'
PROOF = ('<div data-blok="bewijsbalk" class="wrap rv" style="margin-top: clamp(28px, 3vw, 40px); padding-top: 24px; border-top: 2px solid #161616; display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 16px 40px">'
         '<div style="display: flex; flex-wrap: wrap; gap: 12px 40px">%s</div><span style="font-size: 13px; color: #6B6B6B">EK Cable Wakeboard 2026, YouTube Analytics</span></div>\n') % ''.join(
    STAT % v for v in [('30.000+', 'weergaven'), ('5.300', 'uur kijktijd'), ('83%', 'van de kijktijd van niet-abonnees')])

FCARD = ('<div class="card" style="flex: %s; display: flex; flex-direction: column; gap: 16px; padding: %s; color: #161616%s">'
         '<span class="h-black" style="font-size: 18px; color: #D93A33">%s</span><h3 class="h-black" style="font-size: %s; line-height: 1">%s</h3>'
         '<p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C; max-width: 560px">%s</p>'
         '<div style="margin-top: auto; padding-top: 8px; display: flex; flex-wrap: wrap; gap: 10px 28px">%s</div></div>\n')
flink = lambda href, text: '<a href="%s" style="%s; color: #B3261E">%s %s</a>' % (href, LINK, text, ARROW)
FORMATS = ('''<section data-blok="formats" style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px clamp(32px, 5vw, 80px)">
<div style="flex: 1 1 560px; display: flex; flex-direction: column; gap: 16px">%s<h2 %s>Drie manieren om live te gaan. Eén manier van <span style="color: #D93A33">werken.</span></h2></div>
<p style="flex: 1 1 360px; max-width: 480px; margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Of het nu een wedstrijd, een verkoopshow of een gesprek is: wij maken de opname, en daarna de clips die blijven werken.</p>
</div>
<div class="rv" style="display: flex; flex-wrap: wrap; gap: 32px">
%s</div>
<a href="/diensten" style="%s; font-size: 15px; color: #3C3C3C; align-self: flex-start">Grote producties en congressen %s</a>
</div>
</section>''') % (
    eyebrow('Wat we maken'), H2 % '',
    FCARD % ('2 1 100%', 'clamp(32px, 4vw, 48px)', '; box-shadow: 10px 10px 0 #FF5F57', '01 · Hoofdformat', 'clamp(32px, 4vw, 52px)', 'Events live',
             'Sport en events live uitgezonden, met replays en graphics. Daarna clips per rijder en per moment.',
             flink('/partners', 'Voor merken') + flink('/diensten', 'Voor organisatoren'))
    + FCARD % ('1 1 320px', '32px', '', '02', '30px', 'Live verkopen',
               'Jullie producten live verkopen op TikTok en YouTube, vanuit onze studio. Wij regelen de stream, de TikTok Shop en als jullie willen de presentator.',
               flink('/live-verkopen', 'Zo werkt live verkopen'))
    + FCARD % ('1 1 320px', '32px', '', '03', '30px', 'Podcasts',
               'Een videopodcast waarin jullie founder vertelt over het vak. Daarna staande clips voor LinkedIn: zo wordt de founder gezien als expert.',
               flink('/podcasts', 'Zo werken podcasts')),
    LINK, ARROW)

STEP = ('<li style="position: relative; display: flex; flex-direction: column; gap: 12px; border-top: 3px solid %s; padding-top: 20px">'
        '<span class="h-black" style="font-size: 56px; line-height: 1; color: %s">%02d</span><h3 class="h-black" style="font-size: 26px; color: #FFFFFF">%s</h3>'
        '<p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">%s</p>%s</li>\n')
STEPS = [('Live', 'Het event live op YouTube, met jullie merk in de titel, de graphics en een eigen blok.'),
         ('Clips', 'Binnen 24 uur de eerste clips: per rijder, per hoogtepunt, klaar voor socials.'),
         ('Eigendom', 'De clips zijn van jullie. Gebruik ze waar jullie willen, ook in advertenties.'),
         ('Rapport', 'Na afloop: kijkers, kijktijd en waar het publiek vandaan kwam.')]
EVENTDAG = ('''<section data-blok="eventdag" style="background: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px clamp(32px, 5vw, 80px)">
<div style="flex: 1 1 560px; display: flex; flex-direction: column; gap: 16px">%s<h2 %s>Live is het begin. De clips blijven <span style="color: #FF5F57">werken.</span></h2></div>
<p style="flex: 1 1 360px; max-width: 480px; margin: 0; font-size: 18px; line-height: 1.6; color: #CFCFCF">Een livestream duurt een dag. Wat jullie eraan overhouden, gebruiken jullie de weken erna.</p>
</div>
<ol class="rv" style="margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%%, 220px), 1fr)); gap: 32px">
%s</ol>
<a class="btn" href="/partners#pakketten" style="align-self: flex-start">Bekijk de pakketten voor merken %s</a>
</div>
</section>''') % (
    eyebrow('Wat jullie krijgen', '#A8A8A8', True), H2 % '; color: #FFFFFF',
    ''.join(STEP % ('#FF5F57' if i == 3 else '#3C3C3C', '#FF5F57' if i == 3 else '#5A5A5A', i + 1, t, p,
                    '<span aria-hidden="true" style="position: absolute; top: 12px; right: 0; font-family: \'Archivo\', sans-serif; font-weight: 700; font-size: 26px; color: #FF5F57">→</span>' if i < 3 else '')
            for i, (t, p) in enumerate(STEPS)),
    ARROW)

DOOR = ('<a class="card" href="%s" style="flex: 1 1 380px; display: flex; flex-direction: column; gap: 16px; padding: clamp(32px, 4vw, 48px); color: #161616">'
        '%s<h3 class="h-black" style="font-size: clamp(26px, 2.8vw, 38px); line-height: 1">%s</h3>'
        '<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">%s</p>'
        '<span style="margin-top: auto; padding-top: 8px; %s; color: #B3261E">%s <span class="arrow" aria-hidden="true">→</span></span></a>\n')
INGANGEN = ('''<section data-blok="ingangen" style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; gap: 32px">
%s</div>
</section>''') % (
    DOOR % ('/partners', eyebrow('Voor merken', '#555555', True), 'Jullie merk live bij de sport die jullie doelgroep volgt',
            'Jullie financieren de uitzending van een bestaand event. Jullie krijgen de zichtbaarheid, de clips en het rapport. Zonder zelf iets te organiseren.',
            LINK, 'Pakketten vanaf € 5.000')
    + DOOR % ('/diensten', eyebrow('Voor organisatoren', '#555555', True), 'Jullie event live, met content voor jullie sponsors',
              'Wij verzorgen de complete uitzending. Vaak brengen we een merk mee dat het grootste deel betaalt. Jullie krijgen bereik en iets concreets om aan jullie sponsors te geven.',
              LINK, 'Zo werkt het voor organisatoren'))

NUM = ('<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: %s">%s</span>'
       '<span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">%s</span></div>\n')
WAAROM = ('''<section data-blok="waarom-live" style="background: #000000; padding: clamp(80px, 9vw, 140px) 0; border-top: 1px solid #2A2A2A">
<div class="wrap" style="display: flex; flex-direction: column; gap: 40px">
<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px"><div style="display: flex; flex-direction: column; gap: 16px; max-width: 900px"><span class="eyebrow" style="color: #FF5F57"><span class="dot"></span>Waarom live</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; color: #FFFFFF">Het publiek kwam niet van het eigen kanaal</h2><p style="margin: 0; max-width: 680px; font-size: 18px; line-height: 1.6; color: #CFCFCF">83%% van de kijktijd kwam van mensen die het kanaal niet volgden. De uitzending vond zelf zijn publiek. Dat bereik krijgt jullie merk mee.</p></div><a class="btn" href="/waarom-live">Lees waarom live werkt %s</a></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%%, 240px), 1fr)); gap: 28px">
%s</div>
<span style="font-size: 14px; color: #8C8C8C">EK Cable Wakeboard 2026 · YouTube Analytics</span>
</div>
</section>''') % (ARROW, NUM % ('#FF5F57', '83%', 'van de kijktijd kwam van niet-abonnees')
                  + NUM % ('#FFFFFF', '65%', 'nieuwe kijkers op dag 1 van het EK')
                  + NUM % ('#FFFFFF', '1/3', 'van de kijktijd op de tv in de huiskamer')
                  + NUM % ('#FFFFFF', '25–44', 'jaar: de leeftijd van 58 tot 68% van de kijkers'))

SLOT = ('''<section data-blok="slot" style="background: #161616; padding: clamp(96px, 10vw, 160px) 0">
<div class="wrap rv" style="display: flex; flex-direction: column; align-items: flex-start; gap: 32px">
<h2 class="h-black" style="font-size: clamp(44px, 7.4vw, 124px); line-height: 0.9; color: #FFFFFF; text-shadow: 6px 6px 0 #000000">Welk event zetten jullie <span style="color: #FF5F57">live?</span></h2>
<p style="margin: 0; max-width: 560px; font-size: 20px; line-height: 1.55; color: #CFCFCF">Merk of organisator: vertel wat jullie willen bereiken. Binnen twee werkdagen hebben jullie een voorstel.</p>
<div style="display: flex; flex-wrap: wrap; gap: 16px">
<a class="btn" href="/contact">Plan een gesprek %s</a>
<a class="btn ghost" href="mailto:wouter@berk.productions">wouter@berk.productions</a>
</div>
</div>
</section>''') % ARROW


def homepage(s):
    s = re.sub(r'<div data-blok="bewijsbalk".*?Analytics</span></div>\n', '', s, flags=re.S)
    for blok in ('eventdag', 'ingangen'):
        s = re.sub(r'<section data-blok="%s".*?</section>\n\n' % blok, '', s, flags=re.S)
    # Hero: new kop, subkop and the split into merken / organisatoren
    a, b = section_at(s, 'class="h-black hero-h"')
    i = s.index('<h1 class="h-black hero-h"', a)
    s = s[:i] + HERO + s[b:]
    # Bewijsbalk under the quote
    a, b = section_at(s, 'aria-label="Feedback van Lakeside Paradise"')
    s = s[:b - len('</section>')] + PROOF + s[b - len('</section>'):]
    # Drie formats replace the services carousel, followed by 'wat een eventdag oplevert' and the two entrances
    a, b = section_at(s, 'Wat we maken</span>')
    s = s[:a] + FORMATS + '\n\n' + EVENTDAG + '\n\n' + INGANGEN + s[b:]
    # EK feature: views, not unique viewers (our YouTube data counts views; undoes an earlier run of this script)
    s = s.replace('>30.000</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">unieke kijkers<', '>30.000+</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">weergaven<')
    # Waarom live with 83% first, step 4 of 'zo werken we', closing CTA
    a, b = section_at(s, 'Waarom live</span>')
    s = s[:a] + WAAROM + s[b:]
    s = s.replace('Wij draaien. Jij krijgt de opnames en de terugkijkversie.', 'Wij draaien. Binnen 24 uur de eerste clips, daarna de opnames, de terugkijkversie en het rapport.')
    a, b = section_at(s, 'data-blok="slot"' if 'data-blok="slot"' in s else 'Klaar om')
    s = s[:a] + SLOT + s[b:]
    for must in ('Eén opname.', 'data-blok="bewijsbalk"', 'data-blok="formats"', 'data-blok="eventdag"', 'data-blok="ingangen"', 'color: #A8A8A8">weergaven<', 'data-blok="waarom-live"', 'Binnen 24 uur de eerste clips, daarna', 'data-blok="slot"'):
        assert s.count(must) == 1, must
    assert 'slider' not in s.split('<footer')[0].split('</header>')[-1], 'carousel left'
    return s


# 'Aftercare' is now 'Content na het event' (dienstenpagina and the filter on /werk)
RENAME = {
    'Diensten': [('>Aftercare</h2>\n<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Na elke wedstrijddag haalt onze AI de hoogtepunten uit de opnames. Wij kijken alles na voordat het online gaat.</p>',
                  '>Content na het event</h2>\n<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Na elke wedstrijddag haalt onze AI de hoogtepunten uit de opnames: per rijder, per moment. Wij keuren alles goed voordat het online gaat. De eerste clips hebben jullie binnen 24 uur.</p>')],
    'Werk': [('aftercare per wedstrijddag', 'clips per wedstrijddag'), ("'Aftercare'", "'Content na het event'"), ('"Aftercare"', '"Content na het event"')],
}

for f in sorted(glob.glob('js/*.js') + glob.glob('_build/pages/*.dc.html')):
    name = f.split('/')[-1].split('.')[0]
    if name not in CURRENT:
        continue
    s = open(f, encoding='utf-8').read()
    s = menu(s, name)
    if name == 'Main':
        s = homepage(s)
    for old, new in RENAME.get(name, []):
        s = s.replace(old, new)
    assert 'Aftercare' not in s.split('<footer')[0] or name not in RENAME, f
    open(f, 'w', encoding='utf-8').write(s)
    print('merken:', f)
