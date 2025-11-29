// GaleriSaham - Modern JavaScript
(function() {
  'use strict';

  // =========================================
  // LANGUAGE SWITCHER
  // =========================================
  const LanguageSwitcher = {
    currentLang: 'id',

    init: function() {
      this.currentLang = localStorage.getItem('galerisaham-lang') || 'id';
      this.applyLanguage(this.currentLang);
      this.updateButtons();
      this.bindEvents();
    },

    bindEvents: function() {
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const lang = e.target.dataset.lang;
          if (lang && lang !== this.currentLang) {
            this.setLanguage(lang);
          }
        });
      });
    },

    setLanguage: function(lang) {
      this.currentLang = lang;
      localStorage.setItem('galerisaham-lang', lang);
      this.applyLanguage(lang);
      this.updateButtons();
    },

    updateButtons: function() {
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
      });
    },

    applyLanguage: function(lang) {
      document.documentElement.lang = lang;

      document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const translation = this.getTranslation(key, lang);
        if (translation) {
          element.textContent = translation;
        }
      });

      document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        const translation = this.getTranslation(key, lang);
        if (translation) {
          element.placeholder = translation;
        }
      });
    },

    getTranslation: function(key, lang) {
      if (typeof translations === 'undefined') return null;

      const keys = key.split('.');
      let value = translations;

      for (const k of keys) {
        if (value && value[k]) {
          value = value[k];
        } else {
          return null;
        }
      }

      return value[lang] || value['id'] || null;
    }
  };

  // =========================================
  // MOBILE MENU
  // =========================================
  const MobileMenu = {
    init: function() {
      const menuToggle = document.querySelector('.menu-toggle');
      const navLinks = document.querySelector('.nav-links');

      if (!menuToggle || !navLinks) return;

      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });

      // Close menu when clicking a link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
        });
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
    }
  };

  // =========================================
  // HEADER SCROLL EFFECT
  // =========================================
  const HeaderScroll = {
    init: function() {
      const header = document.querySelector('header');
      if (!header) return;

      let lastScroll = 0;
      const scrollThreshold = 50;

      const handleScroll = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > scrollThreshold) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
      };

      // Throttle scroll event
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  };

  // =========================================
  // SMOOTH SCROLL
  // =========================================
  const SmoothScroll = {
    init: function() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId === '#') return;

          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  // =========================================
  // SCROLL ANIMATIONS
  // =========================================
  const ScrollAnimations = {
    init: function() {
      if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately
        document.querySelectorAll('.fade-in').forEach(el => {
          el.classList.add('visible');
        });
        return;
      }

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
      });
    }
  };

  // =========================================
  // COUNTER ANIMATION
  // =========================================
  const CounterAnimation = {
    init: function() {
      if (!('IntersectionObserver' in window)) return;

      const counters = document.querySelectorAll('.stats-bar-value, .hero-stat-value, .trust-stat-value');
      if (counters.length === 0) return;

      const observerOptions = {
        threshold: 0.5
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      counters.forEach(counter => {
        observer.observe(counter);
      });
    },

    animateCounter: function(element) {
      const text = element.textContent;
      const match = text.match(/^([\d.]+)(.*)$/);

      if (!match) return;

      const targetValue = parseFloat(match[1]);
      const suffix = match[2] || '';
      const duration = 2000;
      const startTime = performance.now();
      const isDecimal = text.includes('.');

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = targetValue * easeOut;

        if (isDecimal) {
          element.textContent = currentValue.toFixed(1) + suffix;
        } else {
          element.textContent = Math.floor(currentValue) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = text; // Ensure final value is exact
        }
      };

      requestAnimationFrame(animate);
    }
  };

  // =========================================
  // LAZY LOAD IMAGES
  // =========================================
  const LazyLoad = {
    init: function() {
      const lazyImages = document.querySelectorAll('.lazy, img[data-src]');
      if (lazyImages.length === 0) return;

      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              img.classList.add('loaded');
              imageObserver.unobserve(img);
            }
          });
        }, { rootMargin: '50px' });

        lazyImages.forEach(img => imageObserver.observe(img));
      } else {
        // Fallback
        lazyImages.forEach(img => {
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.add('loaded');
        });
      }
    }
  };

  // =========================================
  // CHART ANIMATION
  // =========================================
  const ChartAnimation = {
    init: function() {
      const chartPath = document.querySelector('.chart-line-path');
      const chartArea = document.querySelector('.chart-area-path');

      if (!chartPath) return;

      // Animate chart line on load
      const pathLength = chartPath.getTotalLength ? chartPath.getTotalLength() : 1000;

      chartPath.style.strokeDasharray = pathLength;
      chartPath.style.strokeDashoffset = pathLength;

      // Trigger animation after a short delay
      setTimeout(() => {
        chartPath.style.transition = 'stroke-dashoffset 2s ease-out';
        chartPath.style.strokeDashoffset = '0';

        if (chartArea) {
          chartArea.style.opacity = '0';
          chartArea.style.transition = 'opacity 1s ease-out 1s';
          setTimeout(() => {
            chartArea.style.opacity = '1';
          }, 100);
        }
      }, 500);
    }
  };

  // =========================================
  // INITIALIZE
  // =========================================
  const init = () => {
    LanguageSwitcher.init();
    MobileMenu.init();
    HeaderScroll.init();
    SmoothScroll.init();
    ScrollAnimations.init();
    CounterAnimation.init();
    LazyLoad.init();
    ChartAnimation.init();
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for debugging
  window.GaleriSaham = {
    LanguageSwitcher,
    MobileMenu,
    HeaderScroll
  };

})();
