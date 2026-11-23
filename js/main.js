/* GaleriSaham — site script (no dependencies)
 * - Language toggle: Indonesian is the page's real content. Any element with a
 *   `data-en` attribute swaps its text to English; `data-en-label` swaps aria-label.
 *   <title data-en="..."> is handled the same way.
 * - Accessible mobile menu
 * - Reveal-on-scroll (content stays visible without JS)
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORAGE_KEY = 'galerisaham-lang';

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) { /* storage blocked: ignore */ }
    return null;
  }

  /* ---------- Language ---------- */
  var Lang = {
    current: 'id',

    init: function () {
      var saved = store(STORAGE_KEY);
      var buttons = document.querySelectorAll('[data-set-lang]');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', this.onClick.bind(this));
      }
      this.apply(saved === 'en' ? 'en' : 'id');
    },

    onClick: function (e) {
      var lang = e.currentTarget.getAttribute('data-set-lang');
      if (lang !== this.current) {
        this.apply(lang);
        store(STORAGE_KEY, lang);
      }
    },

    apply: function (lang) {
      this.current = lang;
      root.setAttribute('lang', lang);

      var els = document.querySelectorAll('[data-en]');
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.tagName === 'TITLE') continue;
        if (el.getAttribute('data-id') === null) el.setAttribute('data-id', el.textContent);
        el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-id');
      }

      var labelled = document.querySelectorAll('[data-en-label]');
      for (var j = 0; j < labelled.length; j++) {
        var l = labelled[j];
        if (l.getAttribute('data-id-label') === null) l.setAttribute('data-id-label', l.getAttribute('aria-label') || '');
        l.setAttribute('aria-label', lang === 'en' ? l.getAttribute('data-en-label') : l.getAttribute('data-id-label'));
      }

      var title = document.querySelector('title[data-en]');
      if (title) {
        if (!title.getAttribute('data-id')) title.setAttribute('data-id', document.title);
        document.title = lang === 'en' ? title.getAttribute('data-en') : title.getAttribute('data-id');
      }

      var buttons = document.querySelectorAll('[data-set-lang]');
      for (var k = 0; k < buttons.length; k++) {
        buttons[k].setAttribute('aria-pressed', String(buttons[k].getAttribute('data-set-lang') === lang));
      }
    }
  };

  /* ---------- Mobile menu ---------- */
  var Menu = {
    init: function () {
      this.toggle = document.querySelector('.menu-toggle');
      this.nav = document.getElementById('site-nav');
      if (!this.toggle || !this.nav) return;

      var self = this;
      this.toggle.addEventListener('click', function () {
        self.set(self.toggle.getAttribute('aria-expanded') !== 'true');
      });
      this.nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) self.set(false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && self.toggle.getAttribute('aria-expanded') === 'true') {
          self.set(false);
          self.toggle.focus();
        }
      });
      window.matchMedia('(min-width: 1081px)').addEventListener('change', function (mq) {
        if (mq.matches) self.set(false);
      });
    },

    set: function (open) {
      this.toggle.setAttribute('aria-expanded', String(open));
      this.nav.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
    }
  };

  /* ---------- Reveal on scroll ---------- */
  var Reveal = {
    init: function () {
      var items = document.querySelectorAll('.reveal');
      if (!items.length) return;
      if (!('IntersectionObserver' in window)) {
        for (var i = 0; i < items.length; i++) items[i].classList.add('visible');
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });
      for (var j = 0; j < items.length; j++) io.observe(items[j]);
    }
  };

  function init() {
    window.GS_READY = true;
    Lang.init();
    Menu.init();
    Reveal.init();
    var year = document.querySelectorAll('[data-year]');
    for (var i = 0; i < year.length; i++) year[i].textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
