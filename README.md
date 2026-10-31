# berk.productions

Statische website van BERK Productions (NL/EN/DE), gehost op Vercel.

- Pagina's: `index.html`, `diensten/`, `waarom-live/`, `werk/`, `over/`, `contact/`, `prijscalculator/`, `en/…`, `de/…`
- Formulieren sturen via FormSubmit naar wouter@berk.productions.
- `_build/` bevat de bronbestanden en het conversiescript (wordt niet gepubliceerd).
- SEO: na `convert.py` + esbuild draai je `node _build/prerender.mjs` (vanuit de repo-root, eenmalig `npm install` in `_build/`). Dit zet de gerenderde pagina-inhoud in elke `index.html` en past titles, descriptions, Open Graph, hreflang x-default en JSON-LD toe uit `_build/seo.json`. Opnieuw draaien is veilig. Gebruikt lokale Chrome; ander pad via `CHROME_PATH`.
