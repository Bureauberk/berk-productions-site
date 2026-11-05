// Rental pages: the quote list in localStorage, the "+ In offerte" buttons and quote bar, the overview slider/filters/view, and the quote request page (/verhuur/offerte).
// localStorage is functional storage, so it works without cookie consent; Clarity calls are queued and only sent after consent.
(() => {
  const KEY = 'berk-verhuur';
  const clarity = (window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); });
  const load = () => {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && typeof s.items === 'object') return s; } catch (e) {}
    return { items: {} };
  };
  const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };
  let state = load();
  const count = () => Object.values(state.items).reduce((a, b) => a + b, 0);

  const eur0 = (n) => '€ ' + n.toLocaleString('nl-NL', { maximumFractionDigits: 2 });

  // Fixed bar with the number of items and the day price; hidden while empty and on the quote page itself.
  const bar = document.querySelector('.vh-bar');
  const prices = bar ? JSON.parse(bar.dataset.prices) : {};
  // Forget items that are no longer for rent (e.g. after the inventory changed).
  if (bar) {
    let changed = false;
    for (const slug of Object.keys(state.items)) if (!(slug in prices)) { delete state.items[slug]; changed = true; }
    if (changed) save(state);
  }
  const syncBar = () => {
    if (!bar) return;
    const n = count();
    bar.querySelector('[data-vh-count]').textContent = n;
    bar.querySelector('[data-vh-label]').textContent = n === 1 ? 'item' : 'items';
    bar.querySelector('[data-vh-sum]').textContent = eur0(Object.entries(state.items).reduce((s, [slug, q]) => s + (prices[slug] || 0) * q, 0));
    bar.hidden = n === 0 || location.pathname.endsWith('/offerte');
    document.body.classList.toggle('vh-has-bar', !bar.hidden);
  };

  // "+ In offerte" button, replaced by a −/+ stepper once the item is in the quote.
  const ctls = [...document.querySelectorAll('.vh-ctl')];
  const renderCtl = (c) => {
    const n = state.items[c.dataset.add] || 0, max = Number(c.dataset.max) || Infinity;
    c.innerHTML = n
      ? `<div class="vh-step" role="group" aria-label="Aantal ${c.dataset.name} in je offerte"><button type="button" data-d="-1" aria-label="Eén minder">−</button><span><b>${n}</b><i> in offerte</i></span><button type="button" data-d="1" aria-label="Eén meer"${n >= max ? ' disabled title="Meer hebben we er niet"' : ''}>+</button></div>`
      : '<button type="button" class="vh-add" data-d="1">+ In offerte</button>';
  };
  ctls.forEach(renderCtl);
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.vh-ctl button[data-d]');
    if (!btn) return;
    const c = btn.closest('.vh-ctl'), slug = c.dataset.add, d = btn.dataset.d;
    state = load();
    const was = state.items[slug] || 0;
    state.items[slug] = was + Number(d);
    if (state.items[slug] <= 0) delete state.items[slug];
    save(state);
    ctls.filter((x) => x.dataset.add === slug).forEach(renderCtl);
    (c.querySelector(`button[data-d="${d}"]:not([disabled])`) || c.querySelector('button:not([disabled])')).focus();
    syncBar();
    if (!was) clarity('event', 'verhuur_toevoegen');
  });
  syncBar();

  // Overview: category slider, sidebar filters, search, sort and grid/list view. Everything filters the same flat result list.
  const shop = document.querySelector('.vh-shop');
  if (shop) {
    const hdr = document.querySelector('.hdr');
    const setTop = () => document.documentElement.style.setProperty('--vh-top', `${hdr ? Math.max(hdr.getBoundingClientRect().bottom, 0) : 0}px`);
    addEventListener('scroll', () => requestAnimationFrame(setTop), { passive: true });
    addEventListener('resize', setTop);
    if (hdr) hdr.addEventListener('transitionend', setTop);
    setTop();

    const results = shop.querySelector('.vh-results'), items = [...results.children];
    const fform = shop.querySelector('.vh-fform'), side = shop.querySelector('.vh-side');
    const q = shop.querySelector('.vh-search input'), sort = shop.querySelector('.vh-sort select');
    const countEl = shop.querySelector('.vh-count'), none = shop.querySelector('.vh-none');
    const showBtn = side.querySelector('.vh-show'), fcount = side.querySelector('.vh-fcount'), resets = [...shop.querySelectorAll('.vh-reset')];
    const tiles = [...document.querySelectorAll('.vh-tile')], slider = document.querySelector('.vh-slider');
    const PRICE = { '0-50': [0, 50], '50-150': [50, 150], '150-400': [150, 400], '400-': [400, Infinity] };
    const checked = (name) => [...fform.querySelectorAll(`input[name="${name}"]:checked`)].map((i) => i.value);

    const apply = () => {
      const cats = checked('cat'), ops = checked('op'), prices = checked('prijs');
      const words = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      let n = 0;
      for (const it of items) {
        const price = Number(it.dataset.price);
        const ok = (!cats.length || cats.includes(it.dataset.cat))
          && (!ops.length || ops.includes(it.dataset.op))
          && (!prices.length || prices.some((v) => price >= PRICE[v][0] && price < PRICE[v][1]))
          && words.every((w) => it.dataset.q.includes(w));
        it.hidden = !ok;
        n += ok;
      }
      countEl.textContent = `${n} ${n === 1 ? 'item' : 'items'}`;
      showBtn.textContent = `Toon ${n} ${n === 1 ? 'item' : 'items'}`;
      none.hidden = n > 0;
      const active = cats.length + ops.length + prices.length + (words.length ? 1 : 0);
      fcount.hidden = !active;
      fcount.textContent = `${active} actief`;
      resets.forEach((r) => { r.disabled = !active; });
      const one = cats.length === 1 ? cats[0] : cats.length ? null : 'alles';
      tiles.forEach((t) => t.setAttribute('aria-pressed', String(t.dataset.tile === one)));
    };
    const doSort = () => {
      const v = sort.value, by = {
        aanbevolen: (a, b) => a.dataset.i - b.dataset.i,
        'prijs-op': (a, b) => a.dataset.price - b.dataset.price,
        'prijs-af': (a, b) => b.dataset.price - a.dataset.price,
        naam: (a, b) => a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent, 'nl'),
      }[v];
      items.slice().sort(by).forEach((it) => results.appendChild(it));
    };
    items.forEach((it, i) => { it.dataset.i = i; });
    const setCat = (slug) => {
      fform.querySelectorAll('input[name="cat"]').forEach((i) => { i.checked = i.value === slug; });
      apply();
      history.replaceState(null, '', slug === 'alles' ? location.pathname : `#${slug}`);
    };

    tiles.forEach((t) => t.addEventListener('click', () => {
      setCat(t.dataset.tile);
      const top = shop.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vh-top')) || 0);
      if (scrollY > top || shop.getBoundingClientRect().top > innerHeight * 0.6) scrollTo({ top, behavior: 'smooth' });
    }));
    // Slider arrows scroll by most of a screen; they disable themselves at either end.
    const arrows = [...document.querySelectorAll('.vh-arrows button')];
    const syncArrows = () => {
      arrows[0].parentElement.hidden = slider.scrollWidth <= slider.clientWidth + 2;
      arrows[0].disabled = slider.scrollLeft <= 2;
      arrows[1].disabled = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 2;
    };
    arrows.forEach((b) => b.addEventListener('click', () => slider.scrollBy({ left: Number(b.dataset.dir) * slider.clientWidth * 0.8 })));
    slider.addEventListener('scroll', () => requestAnimationFrame(syncArrows), { passive: true });
    addEventListener('resize', syncArrows);
    syncArrows();

    fform.addEventListener('change', () => { apply(); history.replaceState(null, '', location.pathname); });
    q.addEventListener('input', apply);
    sort.addEventListener('change', doSort);
    resets.forEach((r) => r.addEventListener('click', () => { fform.reset(); q.value = ''; apply(); history.replaceState(null, '', location.pathname); }));

    // The sidebar is always open on desktop and collapsed by default on mobile.
    const mq = matchMedia('(min-width: 1000px)');
    const syncSide = () => { side.open = mq.matches; };
    mq.addEventListener('change', syncSide);
    syncSide();
    side.querySelector('summary').addEventListener('click', (e) => { if (mq.matches) e.preventDefault(); });

    showBtn.addEventListener('click', () => {
      side.open = false;
      const top = shop.querySelector('.vh-main').getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vh-top')) || 0) - 12;
      scrollTo({ top, behavior: 'smooth' });
    });

    // Grid or list view, remembered per browser.
    const VKEY = 'berk-verhuur-view';
    const views = [...shop.querySelectorAll('[data-view]')];
    const setView = (v) => {
      results.classList.toggle('is-grid', v === 'grid');
      views.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === v)));
      try { localStorage.setItem(VKEY, v); } catch (e) {}
    };
    views.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
    let saved = 'list';
    try { saved = localStorage.getItem(VKEY) || 'list'; } catch (e) {}
    setView(saved);

    const h = location.hash.slice(1);
    if (tiles.some((t) => t.dataset.tile === h)) setCat(h); else apply();
  }

  // --- Quote request page ---
  const dataEl = document.getElementById('vh-data');
  if (!dataEl) return;
  const D = JSON.parse(dataEl.textContent), R = D.regels;
  const list = document.getElementById('vh-list'), form = document.getElementById('vh-form');
  const total = document.getElementById('vh-total'), status = document.getElementById('vh-status');
  const tech = document.getElementById('vh-tech'), adres = document.getElementById('vh-adres');
  const eur = (n) => '€ ' + n.toLocaleString('nl-NL', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Same rule as the generator: day 1 full price, each next day R.vervolgdag, a full week at most R.week.
  const factor = (n) => { const w = Math.floor(n / 7), r = n % 7; return w * R.week + (r ? Math.min(1 + R.vervolgdag * (r - 1), R.week) : 0); };
  const days = () => {
    const a = form.van.valueAsDate, b = form.tot.valueAsDate;
    if (!a || !b || b < a) return 0;
    return Math.round((b - a) / 864e5) + 1;
  };
  const lines = () => Object.entries(state.items).filter(([slug]) => D.items[slug]).map(([slug, qty]) => ({ slug, qty, ...D.items[slug] }));
  const needsOperator = () => lines().some((l) => l.operator);

  // Drop items that no longer exist on the site.
  for (const slug of Object.keys(state.items)) if (!D.items[slug]) delete state.items[slug];
  save(state);
  if (state.van) form.van.value = state.van;
  if (state.tot) form.tot.value = state.tot;

  const calc = () => {
    const n = days(), f = n ? factor(n) : 1, ls = lines();
    const huur = ls.reduce((s, l) => s + l.dagprijs * l.qty * f, 0);
    const borg = ls.reduce((s, l) => s + l.borg * l.qty, 0);
    const technicus = tech.checked ? R.technicusDagprijs * Math.max(n, 1) : 0;
    const bezorgen = form.levering.value === 'bezorgen' ? R.bezorgenVanaf : 0;
    return { n, f, ls, huur, borg, technicus, bezorgen, totaal: huur + technicus + bezorgen };
  };

  const render = () => {
    const c = calc();
    if (!c.ls.length) {
      list.innerHTML = '<p class="vh-empty">Je offerte is nog leeg. <a href="/verhuur">Kies apparatuur</a></p>';
    } else {
      list.innerHTML = c.ls.map((l) => `<div class="vh-line" data-slug="${l.slug}"><div><a href="${l.url}">${esc(l.naam)}</a><small>${eur(l.dagprijs)} per dag${l.operator ? ' · alleen met technicus' : ''}</small></div><div class="vh-qty"><button type="button" data-d="-1" aria-label="Eén minder ${esc(l.naam)}">−</button><span>${l.qty}</span><button type="button" data-d="1" aria-label="Eén meer ${esc(l.naam)}"${l.max && l.qty >= l.max ? ' disabled' : ''}>+</button></div><span class="vh-sum">${eur(l.dagprijs * l.qty * c.f)}</span></div>`).join('')
        + `<p class="vh-hint">${c.n ? `${c.n} draaidag${c.n > 1 ? 'en' : ''}, staffel toegepast.` : 'Prijzen voor 1 draaidag. Kies je data voor de staffel.'}</p>`;
    }
    if (needsOperator()) { tech.checked = true; tech.disabled = true; } else tech.disabled = false;
    adres.hidden = form.levering.value !== 'bezorgen';
    form.adres.required = !adres.hidden;
    const k = calc();
    total.innerHTML = k.ls.length ? `<div><span>Huur${k.n ? ` (${k.n} draaidag${k.n > 1 ? 'en' : ''})` : ''}</span><span>${eur(k.huur)}</span></div>${k.technicus ? `<div><span>Technicus</span><span>${eur(k.technicus)}</span></div>` : ''}${k.bezorgen ? `<div><span>Bezorgen en ophalen</span><span>vanaf ${eur(k.bezorgen)}</span></div>` : ''}<div class="vh-grand"><span>Indicatie</span><span>${eur(k.totaal)}</span></div><p>Excl. btw.${k.borg ? ` Borg ${eur(k.borg)}, die je terugkrijgt.` : ''} De definitieve prijs staat in onze offerte.</p>` : '';
  };

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-d]');
    if (!btn) return;
    const slug = btn.closest('.vh-line').dataset.slug;
    state.items[slug] = (state.items[slug] || 0) + Number(btn.dataset.d);
    if (state.items[slug] <= 0) delete state.items[slug];
    save(state);
    render();
  });
  form.addEventListener('input', () => { state.van = form.van.value; state.tot = form.tot.value; save(state); render(); });
  form.addEventListener('change', render);
  render();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'vh-status';
    const c = calc();
    const fail = (msg, el) => { status.textContent = msg; status.classList.add('err'); if (el) el.focus(); };
    if (!c.ls.length) return fail('Je offerte is nog leeg.');
    if (!c.n) return fail('Kies een eerste en laatste draaidag (de laatste niet vóór de eerste).', form.van);
    const invalid = [...form.elements].find((el) => el.willValidate && !el.checkValidity());
    if (invalid) return fail(invalid.name === 'kvk' ? 'Vul een KvK-nummer van 8 cijfers in.' : invalid.name === 'akkoord' ? 'Ga akkoord met de huurvoorwaarden.' : 'Vul alle verplichte velden in.', invalid);
    if (form._honey.value) return;

    const d = new Date();
    const ref = `BV-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const regels = c.ls.map((l) => `${l.qty}× ${l.naam} (${eur(l.dagprijs)}/dag) = ${eur(l.dagprijs * l.qty * c.f)}`).join('\n');
    const payload = {
      _subject: `Huuraanvraag ${ref} – ${form.bedrijf.value}`,
      _template: 'table',
      _captcha: 'false',
      _autoresponse: `Bedankt voor je huuraanvraag (${ref}). We checken de beschikbaarheid en sturen je binnen een werkdag een definitieve offerte.\n\n${regels}\n\nPeriode: ${form.van.value} t/m ${form.tot.value} (${c.n} draaidagen)\nIndicatie: ${eur(c.totaal)} excl. btw\n\nBERK Productions`,
      Referentie: ref,
      Bedrijf: form.bedrijf.value,
      KvK: form.kvk.value,
      Naam: form.naam.value,
      email: form.email.value,
      Telefoon: form.telefoon.value,
      Event: form.event.value,
      Periode: `${form.van.value} t/m ${form.tot.value} (${c.n} draaidagen, factor ${c.f})`,
      Apparatuur: regels,
      Levering: form.levering.value === 'bezorgen' ? `Bezorgen: ${form.adres.value}` : 'Ophalen in Apeldoorn',
      Technicus: tech.checked ? `Ja (${eur(c.technicus)})` : 'Nee',
      Indicatie: `${eur(c.totaal)} excl. btw${c.bezorgen ? ' (bezorgen vanaf-prijs)' : ''}`,
      Borg: eur(c.borg),
      Opmerkingen: form.opmerkingen.value,
    };
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.textContent = 'Versturen…';
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${D.email}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(res.status);
      clarity('event', 'verhuur_aanvraag');
      state = { items: {} };
      save(state);
      syncBar();
      form.hidden = true;
      list.innerHTML = `<div class="tldr"><span class="eyebrow">Aanvraag verstuurd</span><p>Bedankt! Je referentie is <strong>${ref}</strong>. We checken de beschikbaarheid en sturen binnen een werkdag een definitieve offerte naar ${esc(payload.email)}.</p></div>`;
      list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      btn.disabled = false;
      fail(`Versturen lukte niet. Probeer het opnieuw of mail ons op ${D.email}.`);
    }
  });
})();
