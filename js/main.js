// GaleriSaham - Optimized JavaScript
(function(){'use strict';

// Language Switcher Functionality
const LanguageSwitcher = {
  currentLang: 'id',

  init: function() {
    // Get saved language preference or default to Indonesian
    this.currentLang = localStorage.getItem('galerisaham-lang') || 'id';
    this.applyLanguage(this.currentLang);
    this.updateButtons();
    this.bindEvents();
  },

  bindEvents: function() {
    // Bind click events to language buttons
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
      if (btn.dataset.lang === this.currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  },

  applyLanguage: function(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Find all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      const translation = this.getTranslation(key, lang);
      if (translation) {
        element.textContent = translation;
      }
    });

    // Handle placeholders for inputs
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.dataset.i18nPlaceholder;
      const translation = this.getTranslation(key, lang);
      if (translation) {
        element.placeholder = translation;
      }
    });
  },

  getTranslation: function(key, lang) {
    // Navigate through the translations object using dot notation
    // e.g., "home.heroTagline" -> translations.home.heroTagline
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

// Initialize language switcher when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => LanguageSwitcher.init());
} else {
  LanguageSwitcher.init();
}

// Make it globally accessible for debugging
window.LanguageSwitcher = LanguageSwitcher;
// Mobile menu toggle
const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
if(menuToggle){
menuToggle.addEventListener('click',()=>{
navLinks.classList.toggle('active');
menuToggle.classList.toggle('active');
});
// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link=>{
link.addEventListener('click',()=>{
navLinks.classList.remove('active');
menuToggle.classList.remove('active');
});
});
}
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
anchor.addEventListener('click',function(e){
const target=document.querySelector(this.getAttribute('href'));
if(target){
e.preventDefault();
target.scrollIntoView({behavior:'smooth',block:'start'});
}
});
});
// Lazy load images
const lazyImages=document.querySelectorAll('.lazy');
if('IntersectionObserver'in window){
const imageObserver=new IntersectionObserver((entries,observer)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const img=entry.target;
if(img.dataset.src){
img.src=img.dataset.src;
img.classList.add('loaded');
imageObserver.unobserve(img);
}
}
});
},{rootMargin:'50px'});
lazyImages.forEach(img=>imageObserver.observe(img));
}else{
// Fallback for older browsers
lazyImages.forEach(img=>{
if(img.dataset.src){
img.src=img.dataset.src;
img.classList.add('loaded');
}
});
}
// Add animation on scroll
const observeElements=document.querySelectorAll('.card,.feature');
if('IntersectionObserver'in window&&observeElements.length>0){
const animObserver=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.style.opacity='1';
entry.target.style.transform='translateY(0)';
}
});
},{threshold:0.1});
observeElements.forEach(el=>{
el.style.opacity='0';
el.style.transform='translateY(20px)';
el.style.transition='opacity 0.6s ease, transform 0.6s ease';
animObserver.observe(el);
});
}
// Performance: Defer non-critical resources
window.addEventListener('load',()=>{
// Any non-critical operations after page load
console.log('GaleriSaham loaded');
});
})();
