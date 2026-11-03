/* === section: journey === */
/* NIRVANA v5 — journey timeline: hover / tap / keyboard / scroll activate a step */
(function () {
  const tl = document.querySelector('#journey .tl');
  if (!tl) return;
  const steps = [...tl.querySelectorAll('.tlStep')];
  const btns = steps.map(s => s.querySelector('.tlBtn'));
  const n = steps.length;
  tl.classList.add('tlJs');
  let active = -1, userAt = 0;
  const set = i => {
    i = Math.max(0, Math.min(n - 1, i));
    if (i === active) return;
    active = i;
    steps.forEach((s, k) => {
      s.classList.toggle('on', k === i);
      s.classList.toggle('done', k < i);
      btns[k].setAttribute('aria-expanded', k === i);
      const content = s.querySelector('.tlText'); if (content) content.hidden = k !== i;
    });
    tl.style.setProperty('--p', n > 1 ? i / (n - 1) : 1);
  };
  const touch = i => { userAt = Date.now(); set(i); };
  btns.forEach((b, i) => {
    b.addEventListener('click', () => touch(i));
    b.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') touch(i); });
    b.addEventListener('focus', () => touch(i));
    b.addEventListener('keydown', e => {
      // RTL: ArrowLeft moves forward (next step), ArrowRight back
      let j = null;
      if (e.key === 'ArrowLeft') j = i + 1; else if (e.key === 'ArrowRight') j = i - 1;
      else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = n - 1;
      if (j === null) return;
      e.preventDefault(); j = Math.max(0, Math.min(n - 1, j)); btns[j].focus();
    });
  });
  set(0);
  window.nvJourneyStep = touch;
  if (document.documentElement.classList.contains('static')) return;
  // scroll: as the timeline travels up the viewport, walk through the steps
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    if (window.SiteAccessibility?.reducedMotion || document.activeElement?.closest('#journey') || Date.now() - userAt < 4000) return;
    const r = tl.getBoundingClientRect(), vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return;
    const p = (vh * 0.85 - r.top) / (vh * 0.55);
    set(Math.floor(Math.max(0, Math.min(.999, p)) * n));
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
})();
