/* Full-screen menu: background isolation, focus management and keyboard exit. */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const menuBtn = nav.querySelector('.menuBtn');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  if (!menuBtn) return;
  const inertStates = new Map();
  let previousOverflow = '';
  const visibleControls = () => [...nav.querySelectorAll('a[href],button')].filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
  const close = (restoreFocus = true) => {
    if (!nav.classList.contains('open')) return;
    nav.classList.remove('open'); nav.setAttribute('role', 'banner'); nav.removeAttribute('aria-modal'); nav.setAttribute('aria-label', 'ניווט Nirvana');
    menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'פתיחת תפריט');
    inertStates.forEach((value, node) => { node.inert = value; }); inertStates.clear();
    document.body.style.overflow = previousOverflow;
    if (restoreFocus) menuBtn.focus({ preventScroll: true });
  };
  const open = () => {
    previousOverflow = document.body.style.overflow;
    [...document.body.children].filter(el => el !== nav && !el.contains(nav) && el instanceof HTMLElement).forEach(el => { inertStates.set(el, el.inert); el.inert = true; });
    nav.classList.add('open'); nav.setAttribute('role', 'dialog'); nav.setAttribute('aria-modal', 'true'); nav.setAttribute('aria-label', 'תפריט Nirvana');
    menuBtn.setAttribute('aria-expanded', 'true'); menuBtn.setAttribute('aria-label', 'סגירת תפריט'); document.body.style.overflow = 'hidden'; menuBtn.focus({ preventScroll: true });
  };
  menuBtn.setAttribute('aria-haspopup', 'dialog'); menuBtn.setAttribute('aria-label', 'פתיחת תפריט');
  menuBtn.addEventListener('click', () => nav.classList.contains('open') ? close() : open());
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => close(false)));
  nav.addEventListener('keydown', event => {
    if (!nav.classList.contains('open')) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === 'Tab') {
      const controls = visibleControls(), first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });
})();
