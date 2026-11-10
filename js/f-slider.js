// Card sliders on the format pages: arrow buttons, counter and progress bar. Without JS the track still scrolls.
document.querySelectorAll('[data-slider]').forEach((s) => {
  const track = s.querySelector('.f-track');
  const prev = s.querySelector('[data-prev]');
  const next = s.querySelector('[data-next]');
  const count = s.querySelector('.f-count');
  const bar = s.querySelector('.f-bar span');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (k) => String(k).padStart(2, '0');
  const step = () => {
    const first = track.firstElementChild;
    return first ? first.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0) : track.clientWidth;
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    const n = track.children.length;
    const visible = Math.max(1, Math.round(track.clientWidth / step()));
    bar.style.transform = `scaleX(${max > 0 ? Math.max(visible / n, track.scrollLeft / max) : 1})`;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
    count.textContent = `${pad(Math.min(n, Math.round(track.scrollLeft / step()) + visible))} / ${pad(n)}`;
  };
  const go = (dir) => track.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' });
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  let raf;
  track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  window.addEventListener('resize', update);
  update();
});
