/* Accessible validation and reviewable WhatsApp preparation; never sends automatically. */
(function () {
  const form = document.querySelector('#leadForm'); if (!form) return;
  document.querySelectorAll('[data-pkg]').forEach(a => a.addEventListener('click', () => { const field = form.querySelector('#f-type'); if (field) field.value = a.dataset.pkg; }));
  const summary = document.createElement('div'); summary.className = 'formErrors'; summary.hidden = true; summary.tabIndex = -1; summary.setAttribute('role', 'alert'); form.prepend(summary);
  const fields = [...form.querySelectorAll('input:not([type="hidden"]),select,textarea')];
  fields.forEach(field => {
    field.id ||= 'lead-' + field.name;
    const label = field.closest('label');
    if (label) { const text = document.createElement('span'); text.id = field.id + '-label'; [...label.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => text.append(node)); label.prepend(text); field.setAttribute('aria-labelledby', text.id); }
    const error = document.createElement('span'); error.className = 'fieldError'; error.id = field.id + '-error'; error.hidden = true; field.after(error);
    field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), error.id].filter(Boolean).join(' '));
    if (field.type === 'tel') { field.pattern = '[+0-9 ()-]{7,20}'; field.inputMode = 'tel'; }
    field.addEventListener('input', () => { if (field.validity.valid) { field.removeAttribute('aria-invalid'); error.hidden = true; const item = summary.querySelector(`[data-field="${field.id}"]`); item?.remove(); if (!summary.querySelector('li')) summary.hidden = true; } });
  });
  const labels = {plan:'מסלול',name:'שם מלא',company:'חברה / הפקה',phone:'טלפון',email:'אימייל',size:'משתתפים',type:'פעילות',date:'מועד',msg:'פרטים נוספים'};
  const validate = () => {
    const errors = [];
    fields.forEach(field => {
      const error = document.getElementById(field.id + '-error');
      if (field.validity.valid) { field.removeAttribute('aria-invalid'); error.hidden = true; return; }
      const text = field.validity.valueMissing ? `יש למלא ${labels[field.name] ?? 'את השדה'}.` : field.type === 'email' ? 'יש להזין כתובת דוא״ל תקינה.' : field.type === 'tel' ? 'יש להזין מספר טלפון עם 7–20 תווים: ספרות, רווחים, מקפים או סימן +.' : 'יש לבדוק את הערך שהוזן.';
      error.textContent = text; error.hidden = false; field.setAttribute('aria-invalid', 'true'); errors.push({ field, text });
    });
    summary.replaceChildren(); summary.hidden = !errors.length;
    if (!errors.length) return true;
    const title = document.createElement('p'); title.textContent = 'לפני שממשיכים, יש לתקן את השדות הבאים:'; const list = document.createElement('ul');
    errors.forEach(({ field, text }) => { const item = document.createElement('li'), link = document.createElement('a'); item.dataset.field = field.id; link.href = '#' + field.id; link.textContent = text; link.onclick = event => { event.preventDefault(); field.focus(); }; item.append(link); list.append(item); });
    summary.append(title, list); summary.focus(); return false;
  };
  form.addEventListener('submit', event => {
    event.preventDefault(); if (!validate()) return;
    const data = new FormData(form), lines = ['היי, אשמח לשמוע על Nirvana.'];
    for (const [key, label] of Object.entries(labels)) { const field = form.elements.namedItem(key); const value = key === 'type' && field && field.selectedIndex >= 0 ? field.options[field.selectedIndex].text : data.get(key); if (data.get(key)) lines.push(label + ': ' + value); }
    document.getElementById('prepared-whatsapp').href = 'https://wa.me/972549405700?text=' + encodeURIComponent(lines.join('\n'));
    form.classList.add('sent'); const success = form.querySelector('.success'); success.tabIndex = -1; success.focus({ preventScroll: true });
    success.scrollIntoView({ behavior: window.NV?.reduce || window.NV?.isStatic ? 'auto' : 'smooth', block: 'center' });
  });
})();
