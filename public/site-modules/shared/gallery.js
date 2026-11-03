/* Native modal gallery: keyboard, inert background, focus return and swipe. */
(function () {
  const items = [...document.querySelectorAll('[data-gallery]')];
  if (!items.length) return;
  const list = [...new Map(items.map(el => [el.dataset.full, el])).values()];
  const lb = document.createElement('dialog'); lb.className = 'lb2'; lb.setAttribute('aria-label', 'גלריית התמונות של Nirvana');
  lb.innerHTML = '<span class="cnt" aria-hidden="true"></span><button type="button" class="x" aria-label="סגירת הגלריה">✕</button><button type="button" class="prev" aria-label="התמונה הקודמת">→</button><button type="button" class="next" aria-label="התמונה הבאה">←</button><figure><figcaption aria-live="polite"></figcaption></figure>';
  document.body.appendChild(lb);
  const img = document.createElement('img'), cap = lb.querySelector('figcaption'), cnt = lb.querySelector('.cnt');
  let index = 0, origin = null, previousOverflow = '';
  const show = number => {
    index = (number + list.length) % list.length; const item = list[index], source = item.querySelector('img');
    if (!img.isConnected) cap.before(img); img.src = item.dataset.full; img.alt = source?.alt ?? ''; cap.textContent = `${index + 1} מתוך ${list.length} — ${img.alt}`; cnt.textContent = `${index + 1} / ${list.length}`;
  };
  const close = () => lb.close();
  const open = item => { origin = item.querySelector(".galleryTrigger"); previousOverflow = document.body.style.overflow; show(list.findIndex(el => el.dataset.full === item.dataset.full)); lb.showModal(); lb.classList.add('open'); document.body.style.overflow = 'hidden'; lb.querySelector('.x').focus(); };
  items.forEach(item => {
    const source = item.querySelector('img'); if (!source) return;
    const button = document.createElement('button'); button.type = 'button'; button.className = 'galleryTrigger';
    button.setAttribute('aria-haspopup', 'dialog'); button.setAttribute('aria-label', 'הגדלת תמונה: ' + (source.alt || 'תמונה מהמרחב'));
    source.replaceWith(button); button.append(source);
    item.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); open(item); });
  });
  lb.addEventListener('close', () => { lb.classList.remove('open'); document.body.style.overflow = previousOverflow; origin?.focus({ preventScroll: true }); });
  lb.addEventListener('cancel', event => { event.preventDefault(); close(); });
  lb.querySelector('.x').onclick = close; lb.querySelector('.prev').onclick = () => show(index - 1); lb.querySelector('.next').onclick = () => show(index + 1);
  lb.addEventListener('click', event => { if (event.target === lb) close(); });
  lb.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const controls = [...lb.querySelectorAll('button')], first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index + 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index - 1); }
  });
  let x0 = null; lb.addEventListener('touchstart', event => { x0 = event.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', event => { if (x0 === null) return; const dx = event.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(index + (dx > 0 ? 1 : -1)); x0 = null; });
})();
