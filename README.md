# berk.productions

Statische website van BERK Productions (NL/EN/DE), gehost op Vercel.

- Pagina's: `index.html`, `diensten/`, `waarom-live/`, `werk/`, `over/`, `contact/`, `prijscalculator/`, `en/…`, `de/…`
- Kennisbank: artikelen staan als Markdown in `_build/kennisbank/*.md` (formaat en feitenkader in `_build/kennisbank/_BRIEF.md`). Na `prerender.mjs` draai je `node _build/kennisbank.mjs`: dat bouwt `kennisbank/`, controleert interne links en werkt `sitemap.xml` bij.
- Footer: één footer per taal in `_build/footer.py`. Aanpassen, dan `python3 _build/footer.py`, `prerender.mjs` en `kennisbank.mjs` draaien.
- Privacy en cookies: privacyverklaring in `_build/legal/*.md` (NL/EN/DE), gebouwd door `kennisbank.mjs`. `js/consent.js` toont de cookiebanner en laadt Microsoft Clarity (ID in `seo.json`) pas na akkoord. Footerlink "Cookie-instellingen" opent de keuze opnieuw.
- Partnerpagina's voor merken: `/partners`, `/en/partners` en `/de/partner` plus `/<sport>`, alle inhoud per taal in `_build/partners.json` (nieuwe sport = één extra entry per taal), gebouwd door `kennisbank.mjs`. `js/partners.js` toont `?merk=` in de kicker, laadt YouTube pas na een klik en geeft UTM-tags en mailto-kliks door aan Clarity (alleen met toestemming).
- Formulieren sturen via FormSubmit naar wouter@berk.productions.
- `_build/` bevat de bronbestanden en het conversiescript (wordt niet gepubliceerd).
- SEO: na `convert.py` + esbuild draai je `node _build/prerender.mjs` (vanuit de repo-root, eenmalig `npm install` in `_build/`). Dit zet de gerenderde pagina-inhoud in elke `index.html` en past titles, descriptions, Open Graph, hreflang x-default en JSON-LD toe uit `_build/seo.json`. Opnieuw draaien is veilig. Gebruikt lokale Chrome; ander pad via `CHROME_PATH`.
