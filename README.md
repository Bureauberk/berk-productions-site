# berk.productions

Statische website van BERK Productions (NL/EN/DE), gehost op Vercel.

- Pagina's: `index.html`, `diensten/`, `waarom-live/`, `werk/`, `over/`, `contact/`, `prijscalculator/`, `en/…`, `de/…`
- Kennisbank: artikelen staan als Markdown in `_build/kennisbank/*.md` (formaat en feitenkader in `_build/kennisbank/_BRIEF.md`). Na `prerender.mjs` draai je `node _build/kennisbank.mjs`: dat bouwt `kennisbank/`, controleert interne links en werkt `sitemap.xml` bij.
- Formulieren sturen via FormSubmit naar wouter@berk.productions.
- `_build/` bevat de bronbestanden en het conversiescript (wordt niet gepubliceerd).
- SEO: na `convert.py` + esbuild draai je `node _build/prerender.mjs` (vanuit de repo-root, eenmalig `npm install` in `_build/`). Dit zet de gerenderde pagina-inhoud in elke `index.html` en past titles, descriptions, Open Graph, hreflang x-default en JSON-LD toe uit `_build/seo.json`. Opnieuw draaien is veilig. Gebruikt lokale Chrome; ander pad via `CHROME_PATH`.
