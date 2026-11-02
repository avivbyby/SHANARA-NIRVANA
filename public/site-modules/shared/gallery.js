/* NIRVANA v2 — gallery lightbox with prev/next, keyboard and swipe */
(function () {
  const items = [...document.querySelectorAll('[data-gallery]')];
  if (!items.length) return;
  // de-duplicate by full image so navigation doesn't repeat the same photo
  const seen = new Map();
  items.forEach(el => { const k = el.dataset.full; if (!seen.has(k)) seen.set(k, el); });
  const list = [...seen.values()];
  const lb = document.createElement('div');
  lb.className = 'lb2';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = '<span class="cnt"></span><button type="button" class="x" aria-label="סגירה">✕</button><button type="button" class="prev" aria-label="התמונה הקודמת">→</button><button type="button" class="next" aria-label="התמונה הבאה">←</button><figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(lb);
  const img = lb.querySelector('img'), cap = lb.querySelector('figcaption'), cnt = lb.querySelector('.cnt');
  let i = 0;
  const show = n => {
    i = (n + list.length) % list.length;
    const el = list[i], src = el.querySelector('img');
    img.src = el.dataset.full; img.alt = src ? src.alt : '';
    cap.textContent = src ? src.alt : '';
    cnt.textContent = (i + 1) + ' / ' + list.length;
  };
  const open = el => { show(list.findIndex(x => x.dataset.full === el.dataset.full)); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  items.forEach(el => {
    el.setAttribute('tabindex', '0');
    el.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); open(el); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el); } });
  });
  lb.querySelector('.x').onclick = close;
  lb.querySelector('.prev').onclick = e => { e.stopPropagation(); show(i - 1); };
  lb.querySelector('.next').onclick = e => { e.stopPropagation(); show(i + 1); };
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    // RTL: left arrow = next, right arrow = previous
    if (e.key === 'ArrowLeft') show(i + 1);
    if (e.key === 'ArrowRight') show(i - 1);
  });
  let x0 = null;
  lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(dx > 0 ? i + 1 : i - 1); x0 = null; });
})();
