/* === section: worlds === */
/* NIRVANA v5 — worlds: association mind-map dialogs (radial on desktop, stacked on mobile) */
(function () {
  const section = document.getElementById('experiences');
  if (!section) return;
  const panels = [...section.querySelectorAll('.mm')];
  if (!panels.length) return;
  section.classList.add('mmJs');
  const titles = {};
  panels.forEach(p => { titles[p.dataset.key] = p.querySelector('h3').textContent; document.body.appendChild(p); });
  const SVGNS = 'http://www.w3.org/2000/svg';
  let current = null, lastFocus = null;

  // world switcher buttons inside each dialog
  panels.forEach(p => {
    const sw = p.querySelector('.mmSwitch');
    Object.keys(titles).filter(k => k !== p.dataset.key).forEach(k => {
      const b = document.createElement('button');
      b.type = 'button'; b.dataset.go = k; b.textContent = titles[k];
      sw.appendChild(b);
    });
  });

  const layout = p => {
    const map = p.querySelector('.mmMap');
    const svg = p.querySelector('.mmLines');
    const items = [...p.querySelectorAll('.mmB')];
    svg.innerHTML = '';
    if (window.matchMedia('(max-width:700px)').matches) { items.forEach(b => { b.style.removeProperty('--x'); b.style.removeProperty('--y'); }); return; }
    const W = map.clientWidth, H = map.clientHeight;
    const rx = Math.max(240, W / 2 - 100), ry = Math.max(200, H / 2 - 78);
    const n = items.length;
    items.forEach((b, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n + (n % 2 ? 0 : Math.PI / n);
      const x = Math.round(Math.cos(a) * rx), y = Math.round(Math.sin(a) * ry);
      b.style.setProperty('--x', x); b.style.setProperty('--y', y);
      const l = document.createElementNS(SVGNS, 'line');
      l.setAttribute('x1', W / 2); l.setAttribute('y1', H / 2);
      l.setAttribute('x2', W / 2 + x * 0.78); l.setAttribute('y2', H / 2 + y * 0.78);
      l.setAttribute('pathLength', '1');
      l.style.transitionDelay = (i * 70 + 60) + 'ms';
      svg.appendChild(l);
    });
  };

  const focusables = p => [...p.querySelectorAll('button, a[href]')].filter(el => el.offsetParent !== null);

  const open = (key, keepFocus) => {
    const p = document.getElementById('mm-' + key);
    if (!p) return;
    if (current && current !== p) { current.classList.remove('open', 'vis'); current.setAttribute('aria-hidden', 'true'); }
    if (!keepFocus) lastFocus = document.activeElement;
    current = p;
    p.removeAttribute('aria-hidden');
    p.classList.remove('open');
    p.classList.add('vis');
    p.scrollTop = 0;
    layout(p);
    document.body.style.overflow = 'hidden';
    void p.offsetWidth; // restart the outward animation
    p.querySelector('.mmX').focus({ preventScroll: true });
    requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add('open')));
  };
  const close = () => {
    if (!current) return;
    current.classList.remove('open', 'vis'); current.setAttribute('aria-hidden', 'true');
    current = null; document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };
  window.nvOpenWorld = open;

  panels.forEach(p => {
    p.setAttribute('aria-hidden', 'true');
    p.querySelector('.mmX').addEventListener('click', close);
    p.querySelector('.mmCta').addEventListener('click', close);
    p.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => open(b.dataset.go, true)));
    p.addEventListener('click', e => { if (e.target === p || e.target.classList.contains('mmMap')) close(); });
  });
  section.querySelectorAll('.wTile').forEach(t => t.addEventListener('click', () => open(t.dataset.mm)));

  document.addEventListener('keydown', e => {
    if (!current) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Tab') {
      const f = focusables(current); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => current && layout(current), 120); });
})();
