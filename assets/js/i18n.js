/* =========================================================
   TipTap — i18n.js
   Locale engine: loads en/ar JSON, translates DOM via
   data-i18n attributes, persists language in localStorage.
   Default language: Arabic (ar)
   =========================================================

   USAGE IN HTML:
     <span data-i18n="nav_dashboard"></span>
     <input data-i18n-placeholder="contacts_search"/>
     <button data-i18n="btn_save"></button>

   JS:
     t('key')               → translated string
     setLang('en'|'ar')     → switch language + re-render
     getCurrentLang()       → 'en' | 'ar'
   ========================================================= */

const I18n = (() => {

  const STORAGE_KEY  = 'tiptap_lang';
  const DEFAULT_LANG = 'ar';           // ← default Arabic
  const BASE_PATH    = 'assets/i18n/'; // relative to HTML pages

  let _lang    = DEFAULT_LANG;
  let _strings = {};
  let _ready   = false;
  const _queue = [];   // callbacks waiting for load

  /* ── Load a locale JSON file ── */
  async function _load(lang) {
    try {
      const res  = await fetch(`${BASE_PATH}${lang}.json?v=${Date.now()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn(`[i18n] Failed to load ${lang}.json:`, e);
      return {};
    }
  }

  /* ── Translate a key (with optional fallback) ── */
  function t(key, fallback) {
    return _strings[key] ?? fallback ?? key;
  }

  /* ── Apply translations to all data-i18n elements in DOM ── */
  function _applyDOM() {
    /* text content */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = t(key);
      if (val !== key) el.textContent = val;
    });

    /* placeholder attribute */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const val = t(key);
      if (val !== key) el.placeholder = val;
    });

    /* title attribute (tooltips) */
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.dataset.i18nTitle;
      const val = t(key);
      if (val !== key) el.title = val;
    });

    /* aria-label */
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      const val = t(key);
      if (val !== key) el.setAttribute('aria-label', val);
    });

    /* document title — if page sets data-i18n-title on <html> */
    const htmlTitle = document.documentElement.dataset.i18nPageTitle;
    if (htmlTitle) {
      document.title = `${t(htmlTitle)} — ${t('app_name')}`;
    }
  }

  /* ── Sync lang-toggle buttons ── */
  function _syncButtons(lang) {
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const isActive = btn.dataset.langBtn === lang;
      btn.classList.toggle('active', isActive);
    });
  }

  /* ── Apply direction ── */
  function _applyDir(lang) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    /* keep app.js applyDir in sync too */
    if (typeof applyDir === 'function') applyDir(dir, false);
  }

  /* ── Public: switch language ── */
  async function setLang(lang) {
    if (lang !== 'en' && lang !== 'ar') lang = DEFAULT_LANG;
    _lang    = lang;
    _ready   = false;
    _strings = await _load(lang);
    _ready   = true;
    localStorage.setItem(STORAGE_KEY, lang);
    _applyDir(lang);
    _applyDOM();
    _syncButtons(lang);
    /* flush any queued callbacks */
    while (_queue.length) _queue.shift()();
    /* fire custom event for pages that need to re-render dynamic content */
    document.dispatchEvent(new CustomEvent('tiptap:langchanged', { detail: { lang } }));
  }

  /* ── Public: get current lang ── */
  function getCurrentLang() { return _lang; }

  /* ── Public: run callback once strings are loaded ── */
  function onReady(cb) {
    if (_ready) cb();
    else _queue.push(cb);
  }

  /* ── Auto-init on script load ── */
  (async () => {
    const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    await setLang(saved);
    /* Re-apply after sidebar.js injects DOM (it fires DOMContentLoaded) */
    document.addEventListener('DOMContentLoaded', () => {
      _applyDOM();
      _syncButtons(_lang);
    });
  })();

  return { t, setLang, getCurrentLang, onReady };

})();

/* Global shorthand */
const t = (key, fallback) => I18n.t(key, fallback);
