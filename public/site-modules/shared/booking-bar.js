/* === section: floating-whatsapp === */
/* floating WhatsApp + mobile booking bar — bar appears after the hero */
(function () {
  const bar = document.querySelector('.mobileBar');
  if (!bar) return;
  const heroEl = document.querySelector('.hero');
  const onScroll = () => bar.classList.toggle('show', heroEl ? window.scrollY > heroEl.offsetHeight * 0.75 : window.scrollY > 600);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
