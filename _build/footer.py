#!/usr/bin/env python3
"""Put the shared site footer (NL/EN/DE) into every page bundle and design source.
Run from the repo root: python3 _build/footer.py, then prerender.mjs and kennisbank.mjs."""
import glob, re

LOGO = '/assets/73856d47736b3086e6728a2971a015f5.svg'
T = {
    '': dict(
        intro='Livestreams, podcasts en multicamproducties voor sport en events. Gespecialiseerd in niche- en extreme sporten, vanuit Apeldoorn door Nederland, België en Duitsland.',
        ask='Iets live zetten?', cta=('/contact', 'Vraag een offerte aan'),
        cols=[
            ('Diensten', [('/diensten', 'Livestreams'), ('/diensten', 'Podcasts'), ('/diensten', 'Grote producties'), ('/diensten', 'Aftercare'), ('/livestream-watersport', 'Watersport-livestream')]),
            ('Kennisbank', [('/kennisbank/wat-kost-een-livestream', 'Wat kost een livestream?'), ('/kennisbank/hoeveel-internet-voor-livestream', 'Hoeveel internet heb je nodig?'), ('/kennisbank/sportevent-livestreamen', 'Je sportevent livestreamen'), ('/kennisbank/case-ek-cable-wakeboard-2026', 'Case: EK Cable Wakeboard'), ('/kennisbank', 'Alle artikelen →')]),
            ('BERK', [('/prijscalculator', 'Prijscalculator'), ('/waarom-live', 'Waarom live'), ('/werk', 'Werk'), ('/over', 'Over'), ('/partners', 'Partners'), ('/contact', 'Contact')]),
        ],
        promise_head='Zo werken we',
        promises=['Offerte binnen twee werkdagen', 'Vaste prijs, testdag vooraf', 'De beelden zijn van jou', 'Geen jaarcontract'],
        legal='© 2026 BERK Productions, onderdeel van <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · KvK 95395792',
        area='Apeldoorn · Nederland · België · Duitsland',
        privacy=('/privacy', 'Privacyverklaring', 'Cookie-instellingen'),
    ),
    'en': dict(
        intro='Live streams, podcasts and multicam productions for sport and events. Specialised in niche and extreme sports, from Apeldoorn across the Netherlands, Belgium and Germany.',
        ask='Going live?', cta=('/en/contact', 'Request a quote'),
        cols=[
            ('Services', [('/en/services', 'Livestreams'), ('/en/services', 'Podcasts'), ('/en/services', 'Large productions'), ('/en/services', 'Aftercare')]),
            ('BERK', [('/en/why-live', 'Why live'), ('/en/work', 'Work'), ('/en/about', 'About'), ('/en/partners', 'Partners'), ('/en/contact', 'Contact')]),
        ],
        promise_head='How we work',
        promises=['A quote within two working days', 'Fixed price, test day first', 'The footage is yours', 'No annual contract'],
        legal='© 2026 BERK Productions, part of <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Chamber of Commerce no. 95395792',
        area='Apeldoorn · Netherlands · Belgium · Germany',
        privacy=('/en/privacy', 'Privacy policy', 'Cookie settings'),
    ),
    'de': dict(
        intro='Livestreams, Podcasts und Multicam-Produktionen für Sport und Events. Spezialisiert auf Nischen- und Extremsportarten, von Apeldoorn aus in den Niederlanden, Belgien und Deutschland.',
        ask='Live gehen?', cta=('/de/kontakt', 'Angebot anfragen'),
        cols=[
            ('Leistungen', [('/de/leistungen', 'Livestreams'), ('/de/leistungen', 'Podcasts'), ('/de/leistungen', 'Großproduktionen'), ('/de/leistungen', 'Aftercare')]),
            ('BERK', [('/de/warum-live', 'Warum live'), ('/de/projekte', 'Projekte'), ('/de/ueber-uns', 'Über uns'), ('/de/partner', 'Partner'), ('/de/kontakt', 'Kontakt')]),
        ],
        promise_head='So arbeiten wir',
        promises=['Angebot innerhalb von zwei Werktagen', 'Festpreis, Testtag vorab', 'Das Bildmaterial gehört Ihnen', 'Kein Jahresvertrag'],
        legal='© 2026 BERK Productions, Teil von <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Handelsregister-Nr. 95395792',
        area='Apeldoorn · Niederlande · Belgien · Deutschland',
        privacy=('/de/datenschutz', 'Datenschutz', 'Cookie-Einstellungen'),
    ),
}
HEAD = 'class="eyebrow" style="color: #FFFFFF; margin-bottom: 4px"'


def footer(lang):
    t = T[lang]
    cols = ''.join(
        f'<div style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px"><span {HEAD}>{h}</span>'
        + ''.join(f'<a href="{href}">{label}</a>' for href, label in links) + '</div>'
        for h, links in t['cols'])
    promises = (f'<div style="display: flex; flex-direction: column; gap: 10px"><span {HEAD}>{t["promise_head"]}</span>'
                + ''.join(f'<span style="display: flex; gap: 10px; align-items: baseline"><span aria-hidden="true" style="color: #FF5F57">✓</span>{p}</span>' for p in t['promises']) + '</div>')
    return (
        '<footer class="foot" style="background: #000000; color: #BDBDBD; padding: clamp(64px, 7vw, 104px) 0 32px">\n'
        '<div class="wrap" style="display: flex; flex-direction: column; gap: clamp(40px, 5vw, 64px)">\n'
        '<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 40px">'
        f'<div style="display: flex; flex-direction: column; gap: 20px; max-width: 540px"><img src="{LOGO}" alt="BERK" style="height: 72px; width: auto; align-self: flex-start" /><p style="margin: 0; font-size: 18px; line-height: 1.6; color: #CFCFCF">{t["intro"]}</p></div>'
        f'<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start"><span class="eyebrow" style="color: #FF5F57">{t["ask"]}</span>'
        '<a href="mailto:wouter@berk.productions" style="font-family: \'Archivo\', sans-serif; font-weight: 700; font-size: clamp(20px, 2.4vw, 32px); line-height: 1.1; color: #FFFFFF">wouter@berk.productions</a>'
        '<a href="tel:+31655764678" style="font-size: 18px; color: #FFFFFF">+31 6 55 76 46 78</a>'
        f'<a class="btn" href="{t["cta"][0]}" style="margin-top: 12px">{t["cta"][1]} <span aria-hidden="true">→</span></a></div>'
        '</div>\n'
        '<nav aria-label="Footer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr)); gap: 36px 32px; font-size: 16px; line-height: 1.45; border-top: 1px solid #2A2A2A; padding-top: clamp(40px, 5vw, 56px)">'
        f'{cols}{promises}</nav>\n'
        f'<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; border-top: 1px solid #2A2A2A; padding-top: 20px; font-size: 14px; color: #8C8C8C"><span>{t["legal"]}</span><span style="display: flex; flex-wrap: wrap; gap: 6px 18px"><a href="{t["privacy"][0]}">{t["privacy"][1]}</a><a href="#cookies" data-consent-open="">{t["privacy"][2]}</a><span>{t["area"]}</span></span></div>\n'
        '</div>\n</footer>')


for f in sorted(glob.glob('js/*.js') + glob.glob('_build/pages/*.dc.html')):
    m = re.search(r'/(Main|Diensten|Inzicht|Werk|Over|Contact|Calculator)(?:-(en|de))?\.(js|dc\.html)$', f)
    if not m:
        continue
    s = open(f).read()
    s2, n = re.subn(r'<footer[\s\S]*?</footer>', lambda _: footer(m.group(2) or ''), s, count=1)
    assert n == 1, f
    open(f, 'w').write(s2)
    print(f)
