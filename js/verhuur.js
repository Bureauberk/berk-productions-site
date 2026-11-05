// Rental pages: the quote list in localStorage, the "+ Offerte" buttons and badge, and the quote request page (/verhuur/offerte).
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

  const badge = document.querySelector('.vh-badge');
  const syncBadge = () => {
    if (!badge) return;
    const n = count();
    badge.querySelector('[data-vh-count]').textContent = n;
    badge.hidden = n === 0 || location.pathname.endsWith('/offerte');
  };

  document.querySelectorAll('[data-add]').forEach((btn) => {
    const mark = () => { if (state.items[btn.dataset.add]) { btn.classList.add('added'); btn.textContent = '✓ In offerte'; } };
    mark();
    btn.addEventListener('click', () => {
      state = load();
      state.items[btn.dataset.add] = (state.items[btn.dataset.add] || 0) + 1;
      save(state);
      mark();
      btn.setAttribute('aria-label', `${btn.dataset.name} toegevoegd aan je offerte (${state.items[btn.dataset.add]}×)`);
      syncBadge();
      clarity('event', 'verhuur_toevoegen');
      setTimeout(() => { if (btn.classList.contains('added')) btn.textContent = '+ Nog een'; }, 1400);
    });
  });
  syncBadge();

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
      list.innerHTML = c.ls.map((l) => `<div class="vh-line" data-slug="${l.slug}"><div><a href="${l.url}">${esc(l.naam)}</a><small>${eur(l.dagprijs)} per dag${l.operator ? ' · alleen met technicus' : ''}</small></div><div class="vh-qty"><button type="button" data-d="-1" aria-label="Eén minder ${esc(l.naam)}">−</button><span>${l.qty}</span><button type="button" data-d="1" aria-label="Eén meer ${esc(l.naam)}">+</button></div><span class="vh-sum">${eur(l.dagprijs * l.qty * c.f)}</span></div>`).join('')
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
      syncBadge();
      form.hidden = true;
      list.innerHTML = `<div class="tldr"><span class="eyebrow">Aanvraag verstuurd</span><p>Bedankt! Je referentie is <strong>${ref}</strong>. We checken de beschikbaarheid en sturen binnen een werkdag een definitieve offerte naar ${esc(payload.email)}.</p></div>`;
      list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      btn.disabled = false;
      fail(`Versturen lukte niet. Probeer het opnieuw of mail ons op ${D.email}.`);
    }
  });
})();
