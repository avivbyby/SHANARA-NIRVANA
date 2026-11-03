/* v5 — slow Ken Burns zoom for .photo.kb (scale follows scroll position) */
(function () {
  const els = [...document.querySelectorAll('.photo.kb')];
  if (!els.length || window.NV?.isStatic) return;
  let ticking = false;
  const update = () => {
    if (window.NV?.reduce) { ticking = false; return; }
    const vh = window.innerHeight;
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty('--kb', p.toFixed(3));
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  update();
})();
