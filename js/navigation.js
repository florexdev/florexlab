/* ==========================================================================
   FLOREX.LAB — Navigation
   Navbar scroll behavior, hamburger menu, routing, active states
   ========================================================================== */

(function() {
  'use strict';

  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  let currentRoute = 'home';

  /* ── Scroll-based navbar styling ── */
  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* ── Hamburger toggle ── */
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

  /* ── Routing ── */
  function navigateTo(route) {
    if (!route) return;

    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(`section-${route}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-route') === route);
    });

    // Update hash
    if (window.location.hash !== `#${route}`) {
      history.pushState(null, '', `#${route}`);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    currentRoute = route;

    // Close mobile nav if open
    closeMobileNav();

    // Show/hide footer (always show except in experiment viewer)
    const footer = document.getElementById('site-footer');
    if (footer) {
      footer.style.display = '';
    }

    // Trigger scroll reveal for newly visible section
    setTimeout(() => {
      FLX.initScrollReveal();
    }, 50);

    // If navigating to experiments, close any open viewer
    if (route === 'experiments' && FLX.experiments) {
      FLX.experiments.closeViewer();
    }
  }

  function getRouteFromHash() {
    const hash = window.location.hash.replace('#', '');
    const validRoutes = ['home', 'experiments', 'components', 'playground', 'about'];
    return validRoutes.includes(hash) ? hash : 'home';
  }

  /* ── Init ── */
  function init() {
    // Scroll listener (throttled)
    window.addEventListener('scroll', FLX.throttle(handleScroll, 50), { passive: true });
    handleScroll(); // Initial check

    // Hamburger
    if (hamburger) {
      hamburger.addEventListener('click', toggleMobileNav);
    }

    // Nav link clicks (both desktop and mobile)
    document.querySelectorAll('[data-route]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        navigateTo(route);
      });
    });

    // Logo click
    const logo = document.getElementById('nav-logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('home');
      });
    }

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      navigateTo(getRouteFromHash());
    });

    // Initial route
    navigateTo(getRouteFromHash());

    // Close mobile nav on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    });

    // Close mobile nav on resize to desktop
    window.addEventListener('resize', FLX.debounce(() => {
      if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    }, 150));
  }

  // Expose
  FLX.navigate = navigateTo;
  FLX.navigation = { init, getCurrentRoute: () => currentRoute };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
