// Partner pages: optional ?merk= in the kicker, a click-to-load YouTube player, and Clarity tags for the outreach mails.
// Clarity calls are queued and only sent if the visitor accepted cookies (js/consent.js loads Clarity then).
(() => {
  const params = new URLSearchParams(location.search);
  const root = document.getElementById('partner');
  const clarity = (window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); });

  // "Voorstel voor [merk]": letters, digits, spaces, dots, apostrophes and hyphens only, max 30 characters.
  const merk = (params.get('merk') || '').trim();
  const validMerk = merk.length > 0 && merk.length <= 30 && /^[\p{L}\p{N} .'’-]+$/u.test(merk);
  const kicker = document.getElementById('p-kicker');
  if (validMerk && kicker) kicker.textContent = ((root && root.dataset.proposal) || 'Voorstel voor') + ' ' + merk;

  if (root) clarity('set', 'partner_categorie', root.dataset.cat);
  if (validMerk) clarity('set', 'merk', merk);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = params.get(key);
    if (value) clarity('set', key, value.slice(0, 80));
  }
  document.querySelectorAll('#partner a[href^="mailto:"]').forEach((a) => {
    a.addEventListener('click', () => clarity('event', 'partner_mailto'));
  });

  // YouTube loads only after a click, from the privacy-friendly nocookie domain.
  document.querySelectorAll('.yt button[data-yt]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.yt}?autoplay=1&rel=0`;
      frame.title = btn.dataset.title;
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      btn.replaceWith(frame);
      clarity('event', 'partner_video_play');
    });
  });
})();
