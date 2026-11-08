#!/usr/bin/env python3
"""Put the 'why BERK exists' story block (NL/EN/DE) on the homepages, just before the EK feature.
Run from the repo root: python3 _build/verhaal.py, then prerender.mjs and kennisbank.mjs. Safe to run again."""
import re

ANCHOR = '<section style="background: #161616; padding: clamp(80px, 9vw, 140px) 0">'
START, END = '<section data-blok="verhaal"', '</section>'
T = {
    '': dict(
        label='Waarom BERK bestaat', eyebrow='Waarom BERK bestaat',
        h2='Nichesporten naar het <span style="color: #FF5F57">volgende</span> niveau',
        intro='Meer zichtbaarheid voor de sport en voor de atleten. Atleten die gezien worden, trekken publiek en sponsors en kunnen meer verdienen met hun passie. Daar werken we aan, bij elke stream.',
        steps=[
            ('Het begin', 'Het NK', '„Laten we het NK wakeboarden eens livestreamen, dat is lachen.” Zo begon BERK.'),
            ('Een jaar later', 'Het EK', 'We streamden het Europees kampioenschap Cable Wakeboard: drie dagen live voor een internationaal publiek.'),
            ('Nu', 'Meer sporten', 'We geven meer sporten een online platform, met dezelfde aanpak. Welke sport is de volgende?'),
        ],
        cta=('Contact', 'Zet jouw sport live'),
    ),
    'en': dict(
        label='Why BERK exists', eyebrow='Why BERK exists',
        h2='Taking niche sports to the <span style="color: #FF5F57">next</span> level',
        intro='More visibility for the sport and for its athletes. Athletes who get seen draw an audience and sponsors, and can earn more from their passion. That is what every stream we make works towards.',
        steps=[
            ('How it started', 'The Dutch nationals', '“Let’s livestream the Dutch wakeboard championships, that’ll be a laugh.” That is how BERK began.'),
            ('A year later', 'The Europeans', 'We streamed the European Cable Wakeboard Championships: three days live for an international audience.'),
            ('Now', 'More sports', 'We are giving more sports an online platform, with the same approach. Which sport is next?'),
        ],
        cta=('Contact-en', 'Put your sport live'),
    ),
    'de': dict(
        label='Warum es BERK gibt', eyebrow='Warum es BERK gibt',
        h2='Nischensport auf das <span style="color: #FF5F57">nächste</span> Level',
        intro='Mehr Sichtbarkeit für den Sport und für die Athleten. Athletinnen und Athleten, die gesehen werden, gewinnen Publikum und Sponsoren und können mit ihrer Leidenschaft mehr verdienen. Daran arbeiten wir bei jedem Stream.',
        steps=[
            ('Der Anfang', 'Die NK', '„Lass uns die niederländische Wakeboard-Meisterschaft mal livestreamen, das wird lustig.“ So fing BERK an.'),
            ('Ein Jahr später', 'Die EM', 'Wir haben die Europameisterschaft im Cable Wakeboard gestreamt: drei Tage live für ein internationales Publikum.'),
            ('Jetzt', 'Mehr Sportarten', 'Wir geben mehr Sportarten eine Online-Plattform, mit demselben Ansatz. Welche Sportart ist die nächste?'),
        ],
        cta=('Contact-de', 'Ihren Sport live bringen'),
    ),
}
ROUTE = {'Contact': '/contact', 'Contact-en': '/en/contact', 'Contact-de': '/de/kontakt'}


def block(t, src):
    href = t['cta'][0] + '.dc.html' if src else ROUTE[t['cta'][0]]
    steps = ''
    for i, (when, title, text) in enumerate(t['steps']):
        last = i == len(t['steps']) - 1
        shadow = '8px 8px 0 #FF5F57' if last else 'none'
        border = '#FF5F57' if last else '#333333'
        link = ('<a href="%s" style="margin-top: auto; padding-top: 8px; font-family: \'Archivo\', sans-serif; font-weight: 700; font-size: 17px; color: #FF5F57">%s <span aria-hidden="true">→</span></a>' % (href, t['cta'][1])) if last else ''
        steps += ('<li style="display: flex; flex-direction: column; gap: 14px; padding: 32px; background: #161616; border: 2px solid %s; box-shadow: %s">'
                  '<span class="h-black" style="font-size: 18px; color: #FF5F57">%s</span>'
                  '<h3 class="h-black" style="font-size: 30px; line-height: 1; color: #FFFFFF">%s</h3>'
                  '<p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">%s</p>%s</li>\n') % (border, shadow, when, title, text, link)
    return ('<section data-blok="verhaal" aria-label="%s" style="background: #000000; padding: clamp(80px, 9vw, 140px) 0">\n'
            '<div class="wrap" style="display: flex; flex-direction: column; gap: 56px">\n'
            '<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px clamp(32px, 5vw, 80px)">\n'
            '<div style="flex: 1 1 560px; display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>%s</span>'
            '<h2 class="h-black" style="font-size: clamp(40px, 5.6vw, 84px); line-height: 0.95; color: #FFFFFF; text-wrap: initial">%s</h2></div>\n'
            '<p style="flex: 1 1 380px; max-width: 520px; margin: 0; font-size: 18px; line-height: 1.6; color: #CFCFCF">%s</p>\n'
            '</div>\n'
            '<ol class="rv" style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px">\n%s</ol>\n'
            '</div>\n%s\n\n') % (t['label'], t['eyebrow'], t['h2'], t['intro'], steps, END)


for lang in ('', 'en', 'de'):
    suffix = '-' + lang if lang else ''
    for f, src in (('_build/pages/Main%s.dc.html' % suffix, True), ('js/Main%s.js' % suffix, False)):
        s = open(f, encoding='utf-8').read()
        s = re.sub(re.escape(START) + r'.*?' + re.escape(END) + r'\n\n', '', s, flags=re.S)
        assert s.count(ANCHOR) == 1, f
        s = s.replace(ANCHOR, block(T[lang], src) + ANCHOR)
        open(f, 'w', encoding='utf-8').write(s)
        print('verhaal:', f)
