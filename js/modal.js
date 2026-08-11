/* ==========================================================================
   FLOREX.LAB — Modal System
   Accessible modal with focus trap, backdrop click, and ESC close
   ========================================================================== */

(function() {
  'use strict';

  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  const footerEl = document.getElementById('modal-footer');
  const closeBtn = document.getElementById('modal-close');
  let previousFocus = null;
  let isOpen = false;

  function show({ title, body, footer, onClose }) {
    if (!modal || !backdrop) return;

    previousFocus = document.activeElement;

    // Set content
    titleEl.textContent = title || '';
    bodyEl.innerHTML = typeof body === 'string' ? body : '';
    footerEl.innerHTML = typeof footer === 'string' ? footer : '';
    footerEl.style.display = footer ? '' : 'none';

    // Show
    FLX.measureScrollbar();
    document.body.classList.add('scroll-locked');
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');

    isOpen = true;
    modal._onClose = onClose;

    // Focus first focusable element
    requestAnimationFrame(() => {
      const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
    });
  }

  function close() {
    if (!isOpen) return;

    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    document.body.classList.remove('scroll-locked');

    isOpen = false;

    if (modal._onClose) {
      modal._onClose();
      modal._onClose = null;
    }

    // Restore focus
    if (previousFocus && previousFocus.focus) {
      previousFocus.focus();
    }
  }

  // Focus trap
  function trapFocus(e) {
    if (!isOpen) return;

    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  // Init
  function init() {
    if (closeBtn) {
      closeBtn.addEventListener('click', close);
    }

    if (backdrop) {
      backdrop.addEventListener('click', close);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
      trapFocus(e);
    });
  }

  FLX.modal = { show, close, init };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
