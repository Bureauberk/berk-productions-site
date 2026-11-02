// Header, menu and language picker for the static kennisbank pages (the other pages get this from Preact).
(() => {
  const hdr = document.querySelector('.hdr');
  const menu = document.getElementById('menu');
  const burger = document.querySelector('.burger');
  const isOpen = () => menu.classList.contains('open');
  const sync = () => hdr.classList.toggle('scrolled', window.scrollY > 30 || isOpen());
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
    sync();
  };
  burger.addEventListener('click', () => setMenu(!isOpen()));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen()) setMenu(false); });
  document.addEventListener('click', (e) => {
    document.querySelectorAll('details.lang-dd[open]').forEach((d) => { if (!d.contains(e.target)) d.removeAttribute('open'); });
  });
  window.addEventListener('scroll', sync, { passive: true });
  sync();
})();
