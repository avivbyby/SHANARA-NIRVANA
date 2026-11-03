/* NIRVANA core — static mode, scroll reveal, parallax, footer year (shared by all sections) */
(function () {
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const isStatic = params.get('static') === '1';
  const reduce = window.SiteAccessibility?.reducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.NV = { isStatic, reduce };
  window.addEventListener('siteaccessibilitychange', () => { window.NV.reduce = !!window.SiteAccessibility?.reducedMotion; if (window.NV.reduce) document.querySelectorAll('.reveal,.eaSplit,.eaHero').forEach(el => el.classList.add('in')); });

  // ?static=1 → no animations, fixed hero height (used for screenshots / print)
  if (isStatic) {
    root.classList.add('static');
    root.style.setProperty('--hero-h', (parseInt(params.get('vh'), 10) || 900) + 'px');
  }

  // Scroll reveal (staggered with data-stagger on a parent)
  document.querySelectorAll('[data-stagger]').forEach(group => {
    const step = parseFloat(group.dataset.stagger) || 0.1;
    [...group.children].forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--d', (i * step).toFixed(2) + 's');
    });
  });
  const reveals = document.querySelectorAll('.reveal');
  if (isStatic || reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => io.observe(el));
  }

  // Subtle parallax for [data-parallax="0.15"]
  const px = [...document.querySelectorAll('[data-parallax]')];
  if (px.length && !isStatic) {
    let ticking = false;
    const update = () => {
      if (window.NV.reduce) { ticking = false; return; }
      const vh = window.innerHeight;
      px.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0,${offset.toFixed(1)}px,0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));
})();
