/* Site-owned accessibility controls; shared by SHANARA, Nirvana and plans. No third-party overlay. */
(function () {
  const root = document.documentElement, key = 'shanara-accessibility-v1';
  const defaults = { pause: false, links: false };
  let settings = { ...defaults };
  try { const saved = JSON.parse(localStorage.getItem(key) || '{}'); for (const option of Object.keys(defaults)) settings[option] = saved[option] === true; } catch (_) { /* Storage may be unavailable in private browsing. */ }
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const api = { get reducedMotion() { return settings.pause || preference.matches || new URLSearchParams(location.search).get('static') === '1'; } };
  window.SiteAccessibility = api;
  let panel, launcher;
  const apply = (notify = false) => {
    root.classList.toggle('a11y-reduced-motion', api.reducedMotion);
    root.classList.toggle('a11y-highlight-links', settings.links);
    if (panel) panel.querySelectorAll('[data-a11y-option]').forEach(button => button.setAttribute('aria-pressed', String(settings[button.dataset.a11yOption])));
    if (notify) window.dispatchEvent(new Event('siteaccessibilitychange'));
  };
  apply(); preference.addEventListener('change', () => apply(true));
  const save = () => { try { localStorage.setItem(key, JSON.stringify(settings)); } catch (_) {} apply(true); };
  const init = () => {
    if (document.getElementById('site-accessibility-tools')) return;
    const wrapper = document.createElement('aside'); wrapper.id = 'site-accessibility-tools'; wrapper.setAttribute('aria-label', 'כלי נגישות');
    wrapper.innerHTML = `<button type="button" class="a11y-launcher" aria-label="פתיחת כלי נגישות" aria-controls="site-accessibility-panel" aria-expanded="false" aria-haspopup="dialog"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="4" r="2"/><path d="M4 8l8 2 8-2M12 10v5m0 0l-4 6m4-6l4 6"/></svg><span>נגישות</span></button><dialog class="a11y-panel" id="site-accessibility-panel" aria-labelledby="a11y-panel-title"><div class="a11y-panel-heading"><h2 id="a11y-panel-title">נגישות ונוחות גלישה</h2><button type="button" class="a11y-close" aria-label="סגירת כלי נגישות" autofocus><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></button></div><p>בחרו מה נוח לכם. ההעדפות נשמרות בדפדפן זה.</p><div class="a11y-options"><button type="button" data-a11y-option="pause" aria-pressed="false"><span>הפסקת תנועה והנפשות</span><span class="a11y-switch" aria-hidden="true"></span></button><button type="button" data-a11y-option="links" aria-pressed="false"><span>הדגשת קישורים</span><span class="a11y-switch" aria-hidden="true"></span></button></div><p class="a11y-help">להגדלת התצוגה השתמשו בהגדלה של הדפדפן. במחשב: Ctrl ו־+ או ⌘ ו־+. במקלדת: Tab למעבר ו־Escape לסגירה.</p><nav aria-label="עזרה בנגישות"><a href="/accessibility">הצהרת נגישות</a><a href="https://wa.me/972509751120">דיווח ל־WEBaby בוואטסאפ</a></nav><button type="button" class="a11y-reset">איפוס ההעדפות</button><p class="a11y-system" hidden>הפחתת תנועה פעילה גם לפי הגדרת המערכת או הקישור הנוכחי.</p></dialog>`;
    document.body.append(wrapper); panel = wrapper.querySelector('dialog'); launcher = wrapper.querySelector('.a11y-launcher');
    let previousOverflow = '';
    const close = () => panel.close();
    launcher.addEventListener('click', () => { previousOverflow = document.body.style.overflow; panel.showModal(); document.body.style.overflow = 'hidden'; launcher.setAttribute('aria-expanded', 'true'); panel.querySelector('.a11y-close').focus(); });
    panel.addEventListener('close', () => { document.body.style.overflow = previousOverflow; launcher.setAttribute('aria-expanded', 'false'); launcher.focus({ preventScroll: true }); });
    panel.addEventListener('cancel', event => { event.preventDefault(); close(); });
    panel.querySelector('.a11y-close').addEventListener('click', close);
    panel.querySelectorAll('[data-a11y-option]').forEach(button => button.addEventListener('click', () => { settings[button.dataset.a11yOption] = !settings[button.dataset.a11yOption]; save(); }));
    panel.querySelector('.a11y-reset').addEventListener('click', () => { settings = { ...defaults }; save(); });
    panel.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = [...panel.querySelectorAll('button,a[href]')], first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    const systemNote = () => { panel.querySelector('.a11y-system').hidden = !(preference.matches || new URLSearchParams(location.search).get('static') === '1'); };
    preference.addEventListener('change', systemNote); systemNote(); apply();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
