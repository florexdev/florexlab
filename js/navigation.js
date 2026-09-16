/* florex lab navigasyon navbar kaydirma davranisi hamburger menu yonlendirme aktif durumlar */

(function() {
  'use strict';

  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  let currentRoute = 'home';

  /* kaydirmaya dayali navbar stili */
  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* hamburger ac kapa */
  function toggleMobileNav() {
    const isOpen = mobileNav.classList.contains('open');

    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  function openMobileNav() {
    mobileNav.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('scroll-locked');
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('scroll-locked');
  }

  /* yonlendirme */
  function navigateTo(route) {
    if (!route) return;

    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });

    const targetSection = document.getElementById(`section-${route}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-route') === route);
    });

    if (window.location.hash) {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (err) {  }
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    currentRoute = route;

    closeMobileNav();

    const footer = document.getElementById('site-footer');
    if (footer) {
      footer.style.display = '';
    }

    setTimeout(() => {
      FLX.initScrollReveal();
    }, 50);

    if (route === 'experiments' && FLX.experiments) {
      FLX.experiments.closeViewer();
    }

    if (route === 'editor' && FLX.codeEditor) {
      FLX.codeEditor.init();
    }
  }

  function getRouteFromHash() {
    const hash = window.location.hash.replace('#', '');
    const validRoutes = ['home', 'experiments', 'components', 'playground', 'editor', 'about'];
    return validRoutes.includes(hash) ? hash : 'home';
  }

  /* baslat */
  function init() {

    window.addEventListener('scroll', FLX.throttle(handleScroll, 50), { passive: true });
    handleScroll(); // Initial check

    if (hamburger) {
      hamburger.addEventListener('click', toggleMobileNav);
    }

    document.querySelectorAll('[data-route]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        navigateTo(route);
      });
    });

    const logo = document.getElementById('nav-logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('home');
      });
    }

    window.addEventListener('popstate', () => {
      navigateTo(getRouteFromHash());
    });

    navigateTo(getRouteFromHash());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    });

    window.addEventListener('resize', FLX.debounce(() => {
      if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    }, 150));
  }

  FLX.navigate = navigateTo;
  FLX.navigation = { init, getCurrentRoute: () => currentRoute };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
