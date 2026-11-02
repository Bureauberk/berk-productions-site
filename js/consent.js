// Cookie consent for Microsoft Clarity. Clarity loads only after the visitor accepts, and then only once
// the page has loaded and the browser is idle. Any link to #cookies (or with data-consent-open) reopens the choice.
(() => {
  const script = document.currentScript;
  const clarityId = script && script.dataset.clarity;
  const KEY = 'berk-consent';
  const YEAR = 365 * 24 * 60 * 60 * 1000;
  const lang = (document.documentElement.lang || 'nl').slice(0, 2);
  const T = {
    nl: { label: 'Cookies', text: 'Mogen we met Microsoft Clarity meten hoe je de site gebruikt? Clarity legt klikken, scrollen en sessies vast en zet daarvoor cookies. Zonder akkoord laden we het niet.', accept: 'Accepteren', decline: 'Weigeren', more: 'Privacyverklaring', href: '/privacy' },
    en: { label: 'Cookies', text: 'May we use Microsoft Clarity to see how you use this site? Clarity records clicks, scrolling and sessions and sets cookies to do so. Without your consent we don’t load it.', accept: 'Accept', decline: 'Decline', more: 'Privacy policy', href: '/en/privacy' },
    de: { label: 'Cookies', text: 'Dürfen wir mit Microsoft Clarity messen, wie Sie die Website nutzen? Clarity erfasst Klicks, Scrollen und Sitzungen und setzt dafür Cookies. Ohne Ihre Zustimmung laden wir es nicht.', accept: 'Akzeptieren', decline: 'Ablehnen', more: 'Datenschutzerklärung', href: '/de/datenschutz' },
  }[lang] || null;

  const read = () => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY));
      return v && Date.now() - v.t < YEAR ? v.c : null;
    } catch { return null; }
  };
  const save = (c) => { try { localStorage.setItem(KEY, JSON.stringify({ c, t: Date.now() })); } catch {} };

  let loaded = false;
  const loadClarity = () => {
    if (loaded || !clarityId) return;
    loaded = true;
    const go = () => {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', clarityId);
      window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
    };
    const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 4000 }) : setTimeout(go, 2000));
    document.readyState === 'complete' ? idle() : addEventListener('load', idle);
  };

  let banner = null;
  const close = () => { if (banner) { banner.remove(); banner = null; } };
  const choose = (c) => {
    save(c);
    close();
    if (c === 'granted') loadClarity();
    else if (loaded && window.clarity) window.clarity('consent', false); // withdraws consent and clears Clarity's cookies
  };

  const open = () => {
    if (banner || !T) return;
    if (!document.getElementById('ck-css')) {
      const css = document.createElement('style');
      css.id = 'ck-css';
      css.textContent = '.ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:40;max-width:460px;box-sizing:border-box;background:#FFFFFF;color:#161616;border:2px solid #161616;box-shadow:8px 8px 0 #FF5F57;padding:22px 24px;font-family:Hind,sans-serif;font-size:16px;line-height:1.5}'
        + '.ck p{margin:6px 0 16px}.ck .eyebrow{color:#B3261E}.ck a.ck-more{color:#B3261E;text-decoration:underline;text-underline-offset:3px}'
        + '.ck-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}.ck-row button{flex:1 1 0;min-width:0;min-height:48px;padding:0 12px;font-family:Archivo,sans-serif;font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;border:2px solid #161616;cursor:pointer;box-shadow:4px 4px 0 #161616}'
        + '.ck-row button:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 #161616}.ck-yes{background:#FF5F57;color:#161616}.ck-no{background:#FFFFFF;color:#161616}';
      document.head.appendChild(css);
    }
    banner = document.createElement('div');
    banner.className = 'ck';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', T.label);
    banner.innerHTML = `<span class="eyebrow">${T.label}</span><p>${T.text} <a class="ck-more" href="${T.href}">${T.more}</a></p>`
      + `<div class="ck-row"><button type="button" class="ck-no">${T.decline}</button><button type="button" class="ck-yes">${T.accept}</button></div>`;
    banner.querySelector('.ck-yes').addEventListener('click', () => choose('granted'));
    banner.querySelector('.ck-no').addEventListener('click', () => choose('denied'));
    document.body.appendChild(banner);
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('[data-consent-open], a[href="#cookies"]');
    if (a) { e.preventDefault(); open(); }
  });

  const c = read();
  if (c === 'granted') loadClarity();
  else if (c === null) open();
})();
