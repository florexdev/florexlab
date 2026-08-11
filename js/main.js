/* ==========================================================================
   FLOREX.LAB — Main Application
   App bootstrap, hero interactive effects, easter egg handler
   ========================================================================== */

(function() {
  'use strict';

  /* ── 1. Hero Interactive Effects ── */
  function initHeroEffects() {
    const hero = document.querySelector('.hero');
    const glowRed = document.getElementById('hero-glow-red');
    const glowBlue = document.getElementById('hero-glow-blue');
    const heroGradient = document.getElementById('hero-gradient');

    if (!hero) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovered = false;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      isHovered = true;
    });

    hero.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    function animateHero() {
      if (isHovered) {
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        if (glowRed && glowBlue) {
          const shiftX = (mouseX / hero.clientWidth - 0.5) * 60;
          const shiftY = (mouseY / hero.clientHeight - 0.5) * 60;
          glowRed.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
          glowBlue.style.transform = `translate(${-shiftX}px, ${-shiftY}px)`;
        }

        if (heroGradient) {
          const percentX = (mouseX / hero.clientWidth * 100).toFixed(1);
          const percentY = (mouseY / hero.clientHeight * 100).toFixed(1);
          heroGradient.style.background = `radial-gradient(600px circle at ${percentX}% ${percentY}%, rgba(234, 67, 53, 0.12), rgba(133, 178, 165, 0.08) 40%, transparent 80%)`;
        }
      }
      requestAnimationFrame(animateHero);
    }

    animateHero();
  }

  /* ── 2. Easter Egg ("florexdev" sequence detector) ── */
  function initEasterEgg() {
    const secretCode = 'florexdev';
    let inputBuffer = '';
    let isEggActive = false;

    document.addEventListener('keydown', (e) => {
      // Ignore if user is inside an input, textarea, or contenteditable
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable)
      ) {
        return;
      }

      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        inputBuffer += e.key.toLowerCase();
        if (inputBuffer.length > secretCode.length) {
          inputBuffer = inputBuffer.substring(inputBuffer.length - secretCode.length);
        }

        if (inputBuffer === secretCode && !isEggActive) {
          isEggActive = true;
          inputBuffer = '';
          triggerEasterEgg();
        }
      }
    });

    function triggerEasterEgg() {
      const overlay = document.getElementById('easter-egg-overlay');
      if (!overlay) return;

      overlay.innerHTML = '';
      overlay.classList.add('active');

      // Create Matrix columns
      const columnCount = Math.floor(window.innerWidth / 24);
      const chars = '01FLOREXDEV<>/{};:*#@!%&';

      for (let i = 0; i < columnCount; i++) {
        const col = document.createElement('div');
        col.className = 'matrix-column';
        col.style.left = `${i * 24}px`;
        col.style.animationDuration = `${1.5 + Math.random() * 2}s`;
        col.style.animationDelay = `${Math.random() * 0.8}s`;

        let text = '';
        const len = 10 + Math.floor(Math.random() * 15);
        for (let j = 0; j < len; j++) {
          text += chars[Math.floor(Math.random() * chars.length)];
        }
        col.textContent = text;
        overlay.appendChild(col);
      }

      // Center message
      const msg = document.createElement('div');
      msg.className = 'easter-egg-message easter-egg-glitch';
      msg.innerHTML = '&gt; ACCESS GRANTED: FLOREX.LAB UNLOCKED &lt;';
      overlay.appendChild(msg);

      if (FLX.toast) {
        FLX.toast.show({
          title: 'Secret Unlocked! 🔓',
          message: 'You triggered the Florex developer easter egg.',
          type: 'success',
          duration: 5000
        });
      }

      setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
          overlay.innerHTML = '';
          isEggActive = false;
        }, 500);
      }, 4500);
    }
  }

  /* ── 3. App Bootstrap ── */
  function initApp() {
    initHeroEffects();
    initEasterEgg();
    FLX.initScrollReveal();

    console.log('%c FLOREX.LAB v1.0 %c Ready for experiments ', 'background:#e53e6b; color:#fff; font-weight:bold; padding:4px 8px; border-radius:4px 0 0 4px;', 'background:#1a2038; color:#3b82f6; font-weight:bold; padding:4px 8px; border-radius:0 4px 4px 0;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
