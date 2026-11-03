/* === theme exoape === */
/* THEME: exoape — interaction layer (vanilla JS; Lenis for smooth scroll, MIT, vendored in themes/_vendor)
   Masked line reveals for headings · hero entrance + header image drift · images that drift inside their
   frames · "exploded grid" gallery that assembles as it scrolls in · nav that scrolls away and leaves a
   round menu button (full-screen menu, Esc closes). Off for ?static=1 and prefers-reduced-motion. */
(function () {
  const root = document.documentElement;
  const NV = window.NV || {};
  const still = !!(NV.isStatic || NV.reduce);
  root.classList.add('ea-js');
  if (still) root.classList.add('ea-still');
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---- 1. headings → overflow-hidden masks with rising lines ---- */
  const heads = $$('main h2, .contact h2').filter(h => !h.closest('.eaHero, .mm, .lead-wrap') && !h.classList.contains('eaSplit'));
  heads.forEach(h => {
    const parts = h.innerHTML.split(/<br\s*\/?>/i);
    h.innerHTML = parts.map((p, i) => `<span class="eaMask"><span class="eaLine" style="--li:${i}">${p.trim()}</span></span>`).join('');
    h.classList.remove('reveal'); h.classList.add('eaSplit');
  });

  /* ---- 2. media frames: wrap track images, mark parallax frames ---- */
  $$('.trackCard > img').forEach(img => {
    const box = document.createElement('span'); box.className = 'eaBox';
    img.replaceWith(box); box.appendChild(img);
  });
  const frames = $$('.essPhoto, .wTileImg, .trackCard .eaBox, .teamsImg, .prodsImg');
  frames.forEach(f => f.classList.add('eaPx'));

  /* ---- 3. gallery items are placed by the explode effect, not the generic reveal ---- */
  const masonry = document.querySelector('.gal .masonry');
  const gItems = masonry ? [...masonry.children] : [];
  gItems.forEach(g => { g.classList.remove('reveal'); g.style.removeProperty('--d'); g.classList.add('in'); });

  const hero = document.querySelector('.eaHero');
  if (still || !('IntersectionObserver' in window)) {
    heads.forEach(h => h.classList.add('in'));
    if (hero) hero.classList.add('in');
  } else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
    heads.forEach(h => io.observe(h));
    if (hero) requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('in')));
  }

  /* ---- 4. menu: Esc closes the full-screen menu ---- */
  const nav = document.querySelector('.nav');
  const menuBtn = nav && nav.querySelector('.menuBtn');


  if (still) return;

  /* ---- 5. smooth scroll (Exo Ape runs a virtual scroller) ---- */
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true, anchors: true, prevent: n => !!(n.closest && n.closest('.mm, .lb2, .cg, .nav.open')) });
    const raf = t => {
      const locked = document.body.style.overflow === 'hidden' || (nav && nav.classList.contains('open'));
      if (locked && !lenis.isStopped) lenis.stop(); else if (!locked && lenis.isStopped) lenis.start();
      lenis.raf(t); requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    window.eaLenis = lenis;
  }

  /* ---- 6. scroll-driven: hero image drift, in-frame parallax, exploded gallery ---- */
  const heroImg = document.querySelector('.eaHeroBg img');
  const small = () => window.innerWidth < 700;
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight, y = window.scrollY;
    if (heroImg && y < vh * 1.2) {
      heroImg.style.setProperty('--hy', (y * 0.35).toFixed(1) + 'px');
      heroImg.style.setProperty('--hs', (1.08 + clamp(y / vh, 0, 1) * 0.06).toFixed(4));
    }
    frames.forEach(f => {
      const r = f.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const c = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1 … 1
      f.style.setProperty('--py', (clamp(c, -1, 1) * r.height * 0.06).toFixed(1) + 'px');
    });
    if (masonry) {
      const r = masonry.getBoundingClientRect();
      if (r.bottom > -100 && r.top < vh + 100) {
        const p = clamp((vh - r.top) / (vh * 0.75), 0, 1);
        const e = 1 - Math.pow(1 - p, 3), k = (1 - e) * (small() ? 0.28 : 0.55);
        const W = masonry.clientWidth, H = masonry.clientHeight;
        gItems.forEach(g => {
          const gx = (g.offsetLeft + g.offsetWidth / 2 - W / 2) * k, gy = (g.offsetTop + g.offsetHeight / 2 - H / 2) * k * 0.6;
          g.style.setProperty('--gx', gx.toFixed(1) + 'px');
          g.style.setProperty('--gy', gy.toFixed(1) + 'px');
          g.style.setProperty('--gs', (0.86 + 0.14 * e).toFixed(3));
        });
      }
    }
  };
  if (masonry) root.classList.add('ea-explode');
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
