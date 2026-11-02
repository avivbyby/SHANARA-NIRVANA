/* === section: lead-form === */
/* lead form — package buttons preselect the type; front-end only submit (demo) */
(function () {
  document.querySelectorAll('[data-pkg]').forEach(a => a.addEventListener('click', () => {
    const sel = document.querySelector('#f-type');
    if (sel) sel.value = a.dataset.pkg;
  }));
  const form = document.querySelector('#leadForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const labels = {name:'שם',company:'חברה / הפקה',phone:'טלפון',email:'אימייל',size:'משתתפים',type:'פעילות',date:'מועד',msg:'פרטים נוספים'};
    const lines = ['היי, אשמח לשמוע על Nirvana.'];
    for (const [key,label] of Object.entries(labels)) {
      const field = form.elements.namedItem(key);
      const value = key === 'type' && field && field.selectedIndex >= 0 ? field.options[field.selectedIndex].text : data.get(key);
      if (data.get(key)) lines.push(label + ': ' + value);
    }
    document.getElementById('prepared-whatsapp').href = 'https://wa.me/972549405700?text=' + encodeURIComponent(lines.join('\n'));
    form.classList.add('sent');
    form.querySelector('.success').scrollIntoView({ behavior: 'smooth', block: 'center' });
    // TODO: connect to a real endpoint (e.g. Google Form / Make / email service)
  });
})();
