document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', () => {
  document.getElementById('selected-plan').value = link.dataset.plan;
  document.getElementById('selected-plan-summary').textContent = 'המסלול שבחרתם: ' + link.dataset.plan;
}));
