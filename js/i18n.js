/* florex lab coklu dil i18n turkce tr ingilizce en dil destegi anlik dinamik ceviri ile */

(function() {
  'use strict';

  const STORAGE_KEY = 'flx-lang';

  /* çeviri sözlüğü */
  const translations = {
    tr: {

      'nav.home': 'Ana Sayfa',
      'nav.experiments': 'Deneyler',
      'nav.components': 'Bileşenler',
      'nav.playground': 'Oyun Alanı',
      'nav.editor': 'Kod Editörü',
      'nav.about': 'Hakkında',
      'nav.search': 'Arayın...',

      'hero.eyebrow': 'FlorexDev',
      'hero.title1': 'Deneysel UI,',
      'hero.title2': 'Animasyonlar & Bileşenler',
      'hero.description': 'HTML, CSS ve Vanilla JS ile oluşturulmuş interaktif frontend deneyleri, animasyonlar ve UI fikirleri laboratuvarı.',
      'hero.ctaExperiments': 'Deneyleri İncele',
      'hero.ctaPlayground': 'Oyun Alanına Git',
      'hero.statExperiments': 'Aktif Deney',
      'hero.statComponents': 'UI Bileşeni',
      'hero.statTools': 'CSS Aracı',
      'hero.statVersion': 'Sürüm',

      'featured.label': 'Öne Çıkanlar',
      'featured.title': 'Son Deneyler',
      'featured.desc': 'Özenle seçilmiş son frontend deneyleri ve interaktif demolar.',
      'featured.viewAll': 'Tüm Deneyleri İncele',

      'exp.label': 'Deneyler',
      'exp.title': 'Deneysel Laboratuvar',
      'exp.description': 'CSS animasyonları, JavaScript etkileşimleri, tuval fizikleri ve UI konseptleri.',
      'exp.searchPlaceholder': 'Deneylerde ara... (örn: gradient, particles, cursor)',
      'exp.filterAll': 'Tümü',
      'exp.filterCSS': 'CSS',
      'exp.filterJS': 'JavaScript',
      'exp.filterUI': 'UI/UX',
      'exp.filterAnim': 'Animasyon',
      'exp.backBtn': 'Deneylere Dön',
      'exp.resetBtn': 'Sıfırla',
      'exp.copyCode': 'Kodu Kopyala',
      'exp.controlsTitle': 'Kontroller',
      'exp.codeTitle': 'Kod Çıktısı',

      'comp.label': 'Bileşenler',
      'comp.title': 'Bileşen Galerisi',
      'comp.description': 'Saf HTML & CSS ile yazılmış, kütüphanesiz erişilebilir ve özelleştirilebilir UI bileşenleri.',
      'comp.viewCode': 'Kodu Gör',
      'comp.copyBtn': 'Kopyala',

      'pg.label': 'Oyun Alanı',
      'pg.title': 'CSS Oyun Alanı',
      'pg.description': 'Canlı önizlemeli ve kopyalanabilir CSS kod çıktılı interaktif görsel jeneratörler.',

      'ce.label': 'Kod Editörü',
      'ce.title': 'Canlı Kod Editörü',
      'ce.description': 'HTML, CSS ve JavaScript kodlarını yazın ve anında canlı ön izleyin.',

      'about.label': 'Hakkında',
      'about.title': 'FLOREX.LAB Hakkında',
      'about.subtitle': 'Frontend Geliştirme & Deneyler',
      'about.p1': 'Bu benim kişisel frontend laboratuvarımdır — arayüzler, etkileşimler, animasyonlar ve UI desenleriyle deneyler yaptığım bir alan.',
      'about.p2': 'Buradaki her şey HTML, CSS ve saf (vanilla) JavaScript ile sıfırdan inşa edilmiştir. UI framework\'leri yok, bileşen kütüphaneleri yok, şablonlar yok. Her buton, diyalog, animasyon ve etkileşim web\'de nelerin mümkün olduğunu keşfetmek için el emeğiyle üretilmiştir.',
      'about.p3': 'Bu laboratuvar, frontend geliştirmeye olan yaklaşımımı temsil eden deneylerin bir koleksiyonudur — inşa ederek, her defasında tek bir deneyle öğrenmek.',
      'about.badgeNoFrameworks': 'Framework Yok',
      'about.badgeNoDependencies': 'Kütüphane Yok',
      'about.links': '// bağlantılar',
      'about.linkWebsite': 'Ana Site',
      'about.linkBlog': 'Blog',
      'about.linkGitHub': 'GitHub',

      'cmd.placeholder': 'Bir komut veya deney yazın... (örn: Tema, Gradient, Parçacıklar)',
      'cmd.groupNav': 'Navigasyon',
      'cmd.groupActions': 'Aksiyonlar',
      'cmd.groupLinks': 'Bağlantılar',
      'cmd.groupExperiments': 'Deneyler',
      'cmd.toggleTheme': 'Tüm Temayı Değiştir',
      'cmd.empty': 'Sonuç bulunamadı',

      'toast.copied': 'Panoya kopyalandı',
      'toast.copyFailed': 'Kopyalanamadı',
      'easter.title': 'Gizli Kilit Açıldı! 🔓',
      'easter.message': 'Florex geliştirici easter egg\'ini tetiklediniz.',

      'footer.tagline': '"Üretim için değil, deneyler için tasarlandı."',
      'footer.rights': 'Tüm hakları saklıdır. HTML, CSS & Vanilla JS ile geliştirilmiştir.'
    },
    en: {

      'nav.home': 'Home',
      'nav.experiments': 'Experiments',
      'nav.components': 'Components',
      'nav.playground': 'Playground',
      'nav.editor': 'Code Editor',
      'nav.about': 'About',
      'nav.search': 'Search...',

      'hero.eyebrow': 'FlorexDev',
      'hero.title1': 'Experimental UI,',
      'hero.title2': 'Animations & Components',
      'hero.description': 'An interactive laboratory showcasing HTML, CSS, and Vanilla JS UI experiments, animations, and interface ideas.',
      'hero.ctaExperiments': 'Explore Experiments',
      'hero.ctaPlayground': 'Open Playground',
      'hero.statExperiments': 'Active Experiments',
      'hero.statComponents': 'UI Components',
      'hero.statTools': 'CSS Tools',
      'hero.statVersion': 'Version',

      'featured.label': 'Featured',
      'featured.title': 'Latest Experiments',
      'featured.desc': 'A curated selection of recent frontend experiments and interactive demos.',
      'featured.viewAll': 'View all experiments',

      'exp.label': 'Experiments',
      'exp.title': 'Experimental Laboratory',
      'exp.description': 'CSS animations, JavaScript interactions, canvas physics, and UI concepts.',
      'exp.searchPlaceholder': 'Search experiments... (e.g. gradient, particles, cursor)',
      'exp.filterAll': 'All',
      'exp.filterCSS': 'CSS',
      'exp.filterJS': 'JavaScript',
      'exp.filterUI': 'UI/UX',
      'exp.filterAnim': 'Animation',
      'exp.backBtn': 'Back to experiments',
      'exp.resetBtn': 'Reset to defaults',
      'exp.copyCode': 'Copy Code',
      'exp.controlsTitle': 'Controls',
      'exp.codeTitle': 'Code Output',

      'comp.label': 'Components',
      'comp.title': 'Component Gallery',
      'comp.description': 'Pure HTML & CSS components, zero libraries, accessible and customizable.',
      'comp.viewCode': 'View Code',
      'comp.copyBtn': 'Copy',

      'pg.label': 'Playground',
      'pg.title': 'CSS Playground',
      'pg.description': 'Interactive visual generators with live preview and copyable CSS output.',

      'ce.label': 'Code Editor',
      'ce.title': 'Live Code Editor',
      'ce.description': 'Write HTML, CSS and JavaScript code and see a live preview instantly.',

      'about.label': 'About',
      'about.title': 'About This Lab',
      'about.subtitle': 'Frontend Engineering & Experiments',
      'about.p1': 'This is my personal frontend laboratory — a space where I experiment with interfaces, interactions, animations and UI patterns.',
      'about.p2': 'Everything here is built from scratch with HTML, CSS and vanilla JavaScript. No UI frameworks, no component libraries, no templates. Every button, modal, animation and interaction is hand-crafted to explore what\'s possible on the web.',
      'about.p3': 'This lab is a collection of experiments that represent my approach to frontend development — learning by building, one experiment at a time.',
      'about.badgeNoFrameworks': 'No Frameworks',
      'about.badgeNoDependencies': 'No Dependencies',
      'about.links': '// links',
      'about.linkWebsite': 'Main Site',
      'about.linkBlog': 'Blog',
      'about.linkGitHub': 'GitHub',

      'cmd.placeholder': 'Type a command or experiment... (e.g. Theme, Gradient, Particles)',
      'cmd.groupNav': 'Navigation',
      'cmd.groupActions': 'Actions',
      'cmd.groupLinks': 'Links',
      'cmd.groupExperiments': 'Experiments',
      'cmd.toggleTheme': 'Toggle Theme',
      'cmd.empty': 'No results found',

      'toast.copied': 'Copied to clipboard',
      'toast.copyFailed': 'Failed to copy',
      'easter.title': 'Secret Unlocked! 🔓',
      'easter.message': 'You triggered the Florex developer easter egg.',

      'footer.tagline': '"Built for experiments, not production."',
      'footer.rights': 'All rights reserved. Built with HTML, CSS & Vanilla JS.'
    }
  };

  let currentLang = 'tr';

  function getSystemLang() {
    return navigator.language && navigator.language.startsWith('tr') ? 'tr' : 'en';
  }

  function getSavedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {  }
  }

  function t(key) {
    const langDict = translations[currentLang] || translations.tr;
    return langDict[key] || translations.en[key] || key;
  }

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key);
      if (translation) {
        if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
          el.setAttribute('placeholder', translation);
        } else {
          el.textContent = translation;
        }
      }
    });

    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.textContent = lang === 'tr' ? 'TR / EN' : 'EN / TR';
      btn.setAttribute('title', lang === 'tr' ? 'Switch to English' : 'Türkçeye Geç');
    });

    if (window.FLX) {
      if (FLX.componentsGallery && typeof FLX.componentsGallery.init === 'function') {
        FLX.componentsGallery.init();
      }
      if (FLX.playground && typeof FLX.playground.init === 'function') {
        FLX.playground.init();
      }
      if (FLX.experiments && typeof FLX.experiments.init === 'function') {
        FLX.experiments.init();
      }
      if (FLX.codeEditor && typeof FLX.codeEditor.init === 'function') {
        FLX.codeEditor.init();
      }
    }
  }

  function toggleLanguage() {
    const nextLang = currentLang === 'tr' ? 'en' : 'tr';
    applyLanguage(nextLang);
    saveLang(nextLang);

    if (window.FLX && FLX.toast) {
      FLX.toast.show({
        message: nextLang === 'tr' ? 'Dil: Türkçe' : 'Language: English',
        type: 'info',
        duration: 2000
      });
    }
  }

  function init() {
    const saved = getSavedLang();
    const lang = saved || getSystemLang();
    applyLanguage(lang);

    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleLanguage);
    });
  }

  window.FLX = window.FLX || {};
  FLX.i18n = { t, setLang: applyLanguage, toggleLang: toggleLanguage, getCurrentLang: () => currentLang, init };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
