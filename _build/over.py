#!/usr/bin/env python3
"""Remove the crew block (portrait placeholders) and the crew-count sentence from the about pages (NL/EN/DE).
Patches the page bundles and the design sources. Run from the repo root, then prerender.mjs and kennisbank.mjs. Safe to run again."""
import glob

SENTENCES = [
    ' Per productie werken we met een vaste crew van [AANTAL] operators en editors.',
    ' Pro Produktion arbeiten wir mit einer festen Crew von [ANZAHL] Kameraleuten und Editoren.',
    # EN: an earlier KvK replacement filled the crew-count placeholder with the KvK number
    ' For each production we work with a regular crew of 95395792 operators and editors.',
    ' For each production we work with a regular crew of [NUMBER] operators and editors.',
]

for f in sorted(glob.glob('js/Over*.js') + glob.glob('_build/pages/Over*.dc.html')):
    s = open(f, encoding='utf-8').read()
    if 'class="crew"' in s:
        i = s.index('class="crew"')
        a = s.rindex('<section', 0, i)
        b = s.index('</section>', i) + len('</section>')
        s = s[:a] + s[b:].lstrip('\n')
    for t in SENTENCES:
        s = s.replace(t, '')
    assert 'class="crew"' not in s and not any(t.strip() in s for t in SENTENCES), f
    open(f, 'w', encoding='utf-8').write(s)
    print('over:', f)
