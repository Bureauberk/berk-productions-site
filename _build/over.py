#!/usr/bin/env python3
"""Remove the crew block (portrait placeholders) and the crew-count sentence from the about pages (NL/EN/DE).
Patches the page bundles and the design sources. Run from the repo root, then prerender.mjs and kennisbank.mjs. Safe to run again."""
import glob, re

SENTENCES = [
    ' Per productie werken we met een vaste crew van [AANTAL] operators en editors.',
    ' Pro Produktion arbeiten wir mit einer festen Crew von [ANZAHL] Kameraleuten und Editoren.',
    # EN: an earlier KvK replacement filled the crew-count placeholder with the KvK number
    ' For each production we work with a regular crew of 95395792 operators and editors.',
    ' For each production we work with a regular crew of [NUMBER] operators and editors.',
]

# Story and founder block on the NL about page, just before the three promises.
STORY_MARK = 'data-blok="over-verhaal"'
LBL = '<span class="eyebrow" style="color: #A8A8A8; display: flex; margin-bottom: 18px"><span class="dot"></span>%s</span>'
H2 = '<h2 class="h-black" style="margin: 0; font-size: clamp(30px, 3.6vw, 52px); line-height: 1; color: #FFFFFF">%s</h2>'
P = '<p style="margin: 0 0 1em; font-size: clamp(18px, 1.4vw, 20px); line-height: 1.65; color: #CFCFCF">%s</p>'
SPLIT = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%%, 380px), 1fr)); gap: clamp(28px, 6vw, 96px); align-items: start">%s</div>'
FACT = '<div style="display: flex; flex-direction: column; gap: 6px; border-top: 3px solid #FF5F57; padding-top: 16px"><span class="h-black" style="font-size: clamp(32px, 3.2vw, 48px); line-height: 1; color: #FFFFFF">%s</span><span style="font-size: 15px; line-height: 1.4; color: #A8A8A8">%s</span></div>'
STORY = ('<section %s style="background: #000000; padding: clamp(96px, 11vw, 170px) 0">\n<div class="wrap" style="display: flex; flex-direction: column; gap: clamp(64px, 8vw, 112px)">\n' % STORY_MARK
    + '<div class="rv">' + SPLIT % (
        '<div>' + LBL % 'Hoe het begon' + H2 % 'Begonnen als grap, uitgegroeid tot een <span style="color: #FF5F57">EK</span>' + '</div>'
        + '<div>' + P % '„Laten we het NK wakeboarden eens livestreamen, dat is lachen.” Zo begon BERK, bij de kabelbaan. Wouter wakeboardt zelf en wist hoe een trick in beeld moet. Het bleef niet bij die ene keer.'
        + P % 'Een jaar later stonden we in Knokke-Heist op het Europees kampioenschap Cable Wakeboard van de IWWF: drie dagen live op het kanaal van de IWWF, met zes camera’s, replay, eigen graphics en een commentatorenstudio.'
        + P % 'Nu doen we hetzelfde voor meer sporten en voor merken: live uitzenden, en daarna de clips die blijven werken. Kleine sporten verdienen een groot publiek, en de atleten die erin uitblinken ook.' + '</div>') + '</div>\n'
    + '<div class="rv" style="display: flex; flex-direction: column; gap: 20px"><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%%, 180px), 1fr)); gap: 28px">%s</div><span style="font-size: 14px; color: #8C8C8C">EK Cable Wakeboard 2026 · YouTube Analytics · <a href="/kennisbank/case-ek-cable-wakeboard-2026" style="color: #FF5F57; text-decoration: underline">Lees de case</a></span></div>\n' % ''.join(
        FACT % v for v in [('3', 'dagen live'), ('6', 'camera’s, met replay en graphics'), ('22', 'uur live-uitzending'), ('30.000+', 'weergaven')])
    + '<div class="rv">' + SPLIT % (
        '<div>' + LBL % 'Wie erachter zit' + H2 % 'Een productiebureau uit Apeldoorn' + '</div>'
        + '<div>' + P % 'BERK Productions is de livestream- en videotak van Bureau BERK, opgezet door Wouter Henneberke. Wouter komt uit marketing en video en is het aanspreekpunt van de eerste offerte tot de laatste clip.'
        + P % 'Per productie werken we met een vaste crew van specialisten: een technisch directeur, regie, een replay-operator en camera-operators. We werken vanuit Apeldoorn in Nederland, België en Duitsland, ook op plekken zonder stroom of glasvezel.' + '</div>') + '</div>\n'
    + '</div>\n</section>\n\n')

for f in sorted(glob.glob('js/Over*.js') + glob.glob('_build/pages/Over*.dc.html')):
    s = open(f, encoding='utf-8').read()
    if 'class="crew"' in s:
        i = s.index('class="crew"')
        a = s.rindex('<section', 0, i)
        b = s.index('</section>', i) + len('</section>')
        s = s[:a] + s[b:].lstrip('\n')
    for t in SENTENCES:
        s = s.replace(t, '')
    if f.endswith(('/Over.js', '/Over.dc.html')):
        s = re.sub(r'<section data-blok="over-verhaal".*?</section>\n\n', '', s, flags=re.S)
        i = s.index('Drie beloftes')
        at = s.rindex('<section', 0, i)
        s = s[:at] + STORY + s[at:]
        assert s.count(STORY_MARK) == 1, f
    assert 'class="crew"' not in s and not any(t.strip() in s for t in SENTENCES), f
    open(f, 'w', encoding='utf-8').write(s)
    print('over:', f)
