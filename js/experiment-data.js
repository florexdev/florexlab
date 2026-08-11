/* ==========================================================================
   FLOREX.LAB — Experiment Data Registry
   All 24 experiments with implementations, controls, and code output
   ========================================================================== */

(function() {
  'use strict';

  const experiments = [

    // ═══════════════════════════════════════════
    // FLX-001: Gradient Playground
    // ═══════════════════════════════════════════
    {
      id: 'gradient-playground',
      name: 'Gradient Playground',
      description: 'Create and manipulate CSS linear and radial gradients with real-time preview and angle control.',
      category: 'CSS',
      tags: ['css', 'gradient', 'color'],
      status: 'active',
      number: 'FLX-001',
      controls: [
        { type: 'color', key: 'color1', label: 'Color 1', default: '#e53e6b' },
        { type: 'color', key: 'color2', label: 'Color 2', default: '#3b82f6' },
        { type: 'range', key: 'angle', label: 'Angle', min: 0, max: 360, default: 135, unit: 'deg' },
        { type: 'select', key: 'type', label: 'Type', options: ['linear', 'radial', 'conic'], default: 'linear' },
      ],
      init(container, state) {
        const box = document.createElement('div');
        box.style.cssText = 'width:100%;height:100%;min-height:280px;border-radius:var(--radius-lg);transition:background 0.3s ease;';
        container.appendChild(box);
        this._box = box;
        this.update(state);
      },
      update(state) {
        const { color1, color2, angle, type } = state;
        if (type === 'linear') {
          this._box.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        } else if (type === 'radial') {
          this._box.style.background = `radial-gradient(circle, ${color1}, ${color2})`;
        } else {
          this._box.style.background = `conic-gradient(from ${angle}deg, ${color1}, ${color2}, ${color1})`;
        }
      },
      getCode(state) {
        const { color1, color2, angle, type } = state;
        if (type === 'linear') return `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
        if (type === 'radial') return `background: radial-gradient(circle, ${color1}, ${color2});`;
        return `background: conic-gradient(from ${angle}deg, ${color1}, ${color2}, ${color1});`;
      },
      destroy() { this._box = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-002: Glassmorphism Card
    // ═══════════════════════════════════════════
    {
      id: 'glassmorphism-card',
      name: 'Glassmorphism Card',
      description: 'Adjustable glass-effect card with backdrop blur, transparency, and border controls.',
      category: 'CSS',
      tags: ['css', 'glass', 'blur'],
      status: 'active',
      number: 'FLX-002',
      controls: [
        { type: 'range', key: 'blur', label: 'Blur', min: 0, max: 40, default: 16, unit: 'px' },
        { type: 'range', key: 'opacity', label: 'Opacity', min: 0, max: 100, default: 20, unit: '%' },
        { type: 'range', key: 'border', label: 'Border', min: 0, max: 3, default: 1, step: 0.5, unit: 'px' },
        { type: 'color', key: 'tint', label: 'Tint', default: '#ffffff' },
      ],
      init(container, state) {
        container.style.background = 'linear-gradient(135deg, #e53e6b, #3b82f6, #8b5cf6)';
        container.style.padding = '40px';
        const card = document.createElement('div');
        card.style.cssText = 'width:280px;padding:32px;border-radius:16px;color:#fff;';
        card.innerHTML = `
          <h4 style="margin-bottom:8px;font-size:1.1rem;">Glass Card</h4>
          <p style="font-size:0.85rem;opacity:0.85;line-height:1.5;">This card uses backdrop-filter to create a frosted glass effect with adjustable properties.</p>
        `;
        container.appendChild(card);
        this._card = card;
        this.update(state);
      },
      update(state) {
        const { blur, opacity, border, tint } = state;
        const rgb = FLX.hexToRgb(tint);
        const bg = rgb ? `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity / 100})` : `rgba(255,255,255,${opacity / 100})`;
        this._card.style.background = bg;
        this._card.style.backdropFilter = `blur(${blur}px)`;
        this._card.style.webkitBackdropFilter = `blur(${blur}px)`;
        this._card.style.border = `${border}px solid rgba(255,255,255,0.2)`;
        this._card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
      },
      getCode(state) {
        const { blur, opacity, border, tint } = state;
        const rgb = FLX.hexToRgb(tint);
        const bg = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(opacity / 100).toFixed(2)})` : `rgba(255, 255, 255, ${(opacity / 100).toFixed(2)})`;
        return `background: ${bg};\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: ${border}px solid rgba(255, 255, 255, 0.2);\nborder-radius: 16px;\nbox-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);`;
      },
      destroy() { this._card = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-003: Neon Button
    // ═══════════════════════════════════════════
    {
      id: 'neon-button',
      name: 'Neon Button',
      description: 'A glowing neon button with adjustable color, intensity, and animation speed.',
      category: 'CSS',
      tags: ['css', 'neon', 'glow', 'button'],
      status: 'active',
      number: 'FLX-003',
      controls: [
        { type: 'color', key: 'color', label: 'Glow Color', default: '#e53e6b' },
        { type: 'range', key: 'intensity', label: 'Intensity', min: 5, max: 60, default: 20, unit: 'px' },
        { type: 'range', key: 'speed', label: 'Pulse Speed', min: 0.5, max: 4, default: 2, step: 0.1, unit: 's' },
      ],
      init(container, state) {
        const btn = document.createElement('button');
        btn.textContent = 'HOVER ME';
        btn.style.cssText = `
          padding: 16px 48px; font-family: var(--font-mono); font-size: 1rem; font-weight: 700;
          letter-spacing: 0.15em; border: 2px solid; border-radius: 8px;
          background: transparent; cursor: pointer; transition: all 0.3s ease;
          position: relative; text-transform: uppercase;
        `;
        container.appendChild(btn);
        this._btn = btn;
        this.update(state);
      },
      update(state) {
        const { color, intensity, speed } = state;
        this._btn.style.color = color;
        this._btn.style.borderColor = color;
        this._btn.style.textShadow = `0 0 ${intensity / 2}px ${color}`;
        this._btn.style.boxShadow = `0 0 ${intensity}px ${color}, inset 0 0 ${intensity / 2}px ${color}`;
        this._btn.style.animation = `glowPulse ${speed}s ease-in-out infinite`;
        this._btn.onmouseenter = () => {
          this._btn.style.background = color;
          this._btn.style.color = '#fff';
          this._btn.style.boxShadow = `0 0 ${intensity * 2}px ${color}, 0 0 ${intensity * 4}px ${color}`;
        };
        this._btn.onmouseleave = () => {
          this._btn.style.background = 'transparent';
          this._btn.style.color = color;
          this._btn.style.boxShadow = `0 0 ${intensity}px ${color}, inset 0 0 ${intensity / 2}px ${color}`;
        };
      },
      getCode(state) {
        const { color, intensity, speed } = state;
        return `.neon-btn {\n  color: ${color};\n  border: 2px solid ${color};\n  background: transparent;\n  text-shadow: 0 0 ${intensity / 2}px ${color};\n  box-shadow: 0 0 ${intensity}px ${color}, inset 0 0 ${intensity / 2}px ${color};\n  animation: neon-pulse ${speed}s ease-in-out infinite;\n}\n\n.neon-btn:hover {\n  background: ${color};\n  color: #fff;\n  box-shadow: 0 0 ${intensity * 2}px ${color}, 0 0 ${intensity * 4}px ${color};\n}`;
      },
      destroy() { this._btn = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-004: Animated Border
    // ═══════════════════════════════════════════
    {
      id: 'animated-border',
      name: 'Animated Border',
      description: 'A card with a continuously rotating gradient border animation.',
      category: 'CSS',
      tags: ['css', 'border', 'animation', 'gradient'],
      status: 'active',
      number: 'FLX-004',
      controls: [
        { type: 'color', key: 'color1', label: 'Color 1', default: '#e53e6b' },
        { type: 'color', key: 'color2', label: 'Color 2', default: '#3b82f6' },
        { type: 'range', key: 'speed', label: 'Speed', min: 1, max: 10, default: 3, unit: 's' },
        { type: 'range', key: 'width', label: 'Border Width', min: 1, max: 6, default: 2, unit: 'px' },
      ],
      init(container, state) {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'position:relative;width:260px;height:160px;border-radius:16px;overflow:hidden;';
        const border = document.createElement('div');
        border.style.cssText = 'position:absolute;inset:0;border-radius:inherit;';
        const inner = document.createElement('div');
        inner.style.cssText = `position:absolute;border-radius:inherit;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:0.85rem;color:var(--text-secondary);`;
        inner.textContent = 'Animated Border';
        wrapper.appendChild(border);
        wrapper.appendChild(inner);
        container.appendChild(wrapper);
        this._border = border;
        this._inner = inner;
        this._wrapper = wrapper;
        this.update(state);
      },
      update(state) {
        const { color1, color2, speed, width } = state;
        this._border.style.background = `conic-gradient(${color1}, ${color2}, ${color1})`;
        this._border.style.animation = `spin ${speed}s linear infinite`;
        this._inner.style.inset = `${width}px`;
        this._inner.style.background = 'var(--bg-secondary)';
      },
      getCode(state) {
        const { color1, color2, speed, width } = state;
        return `.animated-border {\n  position: relative;\n  border-radius: 16px;\n  overflow: hidden;\n}\n\n.animated-border::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: conic-gradient(${color1}, ${color2}, ${color1});\n  animation: spin ${speed}s linear infinite;\n}\n\n.animated-border::after {\n  content: '';\n  position: absolute;\n  inset: ${width}px;\n  background: var(--bg);\n  border-radius: inherit;\n}`;
      },
      destroy() { this._border = null; this._inner = null; this._wrapper = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-005: CSS Loader Collection
    // ═══════════════════════════════════════════
    {
      id: 'css-loaders',
      name: 'CSS Loader Collection',
      description: 'Eight unique CSS-only loading animations — spinners, dots, bars and more.',
      category: 'CSS',
      tags: ['css', 'loader', 'animation', 'spinner'],
      status: 'active',
      number: 'FLX-005',
      controls: [
        { type: 'color', key: 'color', label: 'Color', default: '#3b82f6' },
        { type: 'range', key: 'size', label: 'Size', min: 16, max: 64, default: 32, unit: 'px' },
      ],
      init(container, state) {
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(4, 1fr)';
        container.style.gap = '32px';
        container.style.width = '100%';
        container.style.padding = '24px';
        container.style.alignItems = 'center';
        container.style.justifyItems = 'center';

        const loaders = [];
        for (let i = 0; i < 8; i++) {
          const cell = document.createElement('div');
          cell.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:12px;';
          const loader = document.createElement('div');
          const label = document.createElement('span');
          label.style.cssText = 'font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);';
          cell.appendChild(loader);
          cell.appendChild(label);
          container.appendChild(cell);
          loaders.push({ el: loader, label });
        }
        this._loaders = loaders;
        this.update(state);
      },
      update(state) {
        const { color, size } = state;
        const s = size;
        const loaders = this._loaders;

        // 1. Spinner
        loaders[0].el.style.cssText = `width:${s}px;height:${s}px;border:3px solid rgba(128,128,128,0.2);border-top-color:${color};border-radius:50%;animation:spin 0.7s linear infinite;`;
        loaders[0].label.textContent = 'Spinner';

        // 2. Dots
        loaders[1].el.style.cssText = 'display:flex;gap:6px;';
        loaders[1].el.innerHTML = [0,1,2].map(i =>
          `<span style="width:${s/4}px;height:${s/4}px;background:${color};border-radius:50%;animation:dotPulse 1.4s ease-in-out infinite;animation-delay:${i*0.2}s;"></span>`
        ).join('');
        loaders[1].label.textContent = 'Dots';

        // 3. Ring
        loaders[2].el.style.cssText = `width:${s}px;height:${s}px;border:3px solid ${color};border-radius:50%;border-right-color:transparent;border-bottom-color:transparent;animation:spin 0.8s linear infinite;`;
        loaders[2].label.textContent = 'Ring';

        // 4. Bar
        loaders[3].el.style.cssText = `width:${s*2.5}px;height:${s/6}px;background:rgba(128,128,128,0.2);border-radius:999px;overflow:hidden;`;
        loaders[3].el.innerHTML = `<span style="display:block;height:100%;width:40%;background:${color};border-radius:999px;animation:shimmer 1.5s ease-in-out infinite;background-size:200% 100%;background-image:linear-gradient(90deg,${color} 25%,transparent 50%,${color} 75%);"></span>`;
        loaders[3].label.textContent = 'Bar';

        // 5. Bounce
        loaders[4].el.style.cssText = `width:${s/3}px;height:${s/3}px;background:${color};border-radius:50%;animation:float 0.6s ease-in-out infinite;`;
        loaders[4].label.textContent = 'Bounce';

        // 6. Pulse
        loaders[5].el.style.cssText = `width:${s/2}px;height:${s/2}px;background:${color};border-radius:50%;animation:glowPulse 1s ease-in-out infinite;`;
        loaders[5].label.textContent = 'Pulse';

        // 7. Dual Ring
        loaders[6].el.style.cssText = `position:relative;width:${s}px;height:${s}px;`;
        loaders[6].el.innerHTML = `
          <span style="position:absolute;inset:0;border:2px solid transparent;border-top-color:${color};border-radius:50%;animation:spin 0.8s linear infinite;"></span>
          <span style="position:absolute;inset:4px;border:2px solid transparent;border-bottom-color:${color};border-radius:50%;animation:spin 0.6s linear infinite reverse;"></span>
        `;
        loaders[6].label.textContent = 'Dual Ring';

        // 8. Square
        loaders[7].el.style.cssText = `width:${s/3}px;height:${s/3}px;background:${color};animation:spin 1.2s ease-in-out infinite;`;
        loaders[7].label.textContent = 'Square';
      },
      getCode(state) {
        const { color } = state;
        return `/* Spinner */\n.loader-spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(128, 128, 128, 0.2);\n  border-top-color: ${color};\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}`;
      },
      destroy() { this._loaders = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-006: Text Reveal
    // ═══════════════════════════════════════════
    {
      id: 'text-reveal',
      name: 'Text Reveal',
      description: 'Multiple text reveal animation styles including fade, slide, split, and typewriter effects.',
      category: 'CSS',
      tags: ['css', 'text', 'animation', 'reveal'],
      status: 'active',
      number: 'FLX-006',
      controls: [
        { type: 'select', key: 'style', label: 'Style', options: ['fade-up', 'fade-down', 'split-chars', 'typewriter'], default: 'fade-up' },
        { type: 'range', key: 'duration', label: 'Duration', min: 0.3, max: 3, default: 1, step: 0.1, unit: 's' },
      ],
      init(container, state) {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'text-align:center;';
        container.appendChild(wrapper);
        this._wrapper = wrapper;
        this._interval = null;
        this.update(state);
      },
      update(state) {
        const { style, duration } = state;
        const text = 'FLOREX.LAB';
        clearInterval(this._interval);

        if (style === 'fade-up') {
          this._wrapper.innerHTML = `<span style="display:inline-block;font-size:2.5rem;font-weight:900;font-family:var(--font-sans);color:var(--text-primary);animation:fadeInUp ${duration}s var(--ease-out) both;">${text}</span>`;
        } else if (style === 'fade-down') {
          this._wrapper.innerHTML = `<span style="display:inline-block;font-size:2.5rem;font-weight:900;font-family:var(--font-sans);color:var(--text-primary);animation:fadeInDown ${duration}s var(--ease-out) both;">${text}</span>`;
        } else if (style === 'split-chars') {
          const chars = text.split('').map((c, i) =>
            `<span style="display:inline-block;font-size:2.5rem;font-weight:900;font-family:var(--font-sans);color:var(--text-primary);opacity:0;animation:fadeInUp ${duration}s var(--ease-out) ${i * 0.06}s both;">${c === ' ' ? '&nbsp;' : c}</span>`
          ).join('');
          this._wrapper.innerHTML = chars;
        } else if (style === 'typewriter') {
          this._wrapper.innerHTML = `<span style="display:inline-block;font-size:2rem;font-weight:700;font-family:var(--font-mono);color:var(--text-primary);overflow:hidden;white-space:nowrap;border-right:2px solid var(--accent-red);animation:typewriter ${duration}s steps(${text.length}) both, blink 0.7s step-end infinite;">${text}</span>`;
        }

        // Auto-replay
        this._interval = setInterval(() => {
          this.update(state);
        }, (duration + 1.5) * 1000);
      },
      getCode(state) {
        const { style, duration } = state;
        if (style === 'typewriter') {
          return `/* Typewriter Effect */\n.typewriter {\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 2px solid currentColor;\n  animation: typewriter ${duration}s steps(10) both,\n             blink 0.7s step-end infinite;\n}\n\n@keyframes typewriter {\n  from { width: 0; }\n  to { width: 100%; }\n}`;
        }
        return `/* ${style} */\n.text-reveal {\n  animation: fadeInUp ${duration}s cubic-bezier(0.16, 1, 0.3, 1) both;\n}\n\n@keyframes fadeInUp {\n  from { opacity: 0; transform: translateY(24px); }\n  to { opacity: 1; transform: translateY(0); }\n}`;
      },
      destroy() { clearInterval(this._interval); this._wrapper = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-007: Custom Cursor
    // ═══════════════════════════════════════════
    {
      id: 'custom-cursor',
      name: 'Custom Cursor',
      description: 'Custom cursor shapes with trail effects that follow pointer movement.',
      category: 'CSS',
      tags: ['css', 'cursor', 'interaction'],
      status: 'active',
      number: 'FLX-007',
      controls: [
        { type: 'range', key: 'size', label: 'Size', min: 10, max: 60, default: 24, unit: 'px' },
        { type: 'color', key: 'color', label: 'Color', default: '#e53e6b' },
        { type: 'range', key: 'trail', label: 'Trail Length', min: 0, max: 10, default: 5 },
      ],
      init(container, state) {
        container.style.cursor = 'none';
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        const cursor = document.createElement('div');
        cursor.style.cssText = 'position:absolute;pointer-events:none;border-radius:50%;transition:transform 0.1s ease;z-index:10;';
        container.appendChild(cursor);
        this._cursor = cursor;
        this._trails = [];
        this._container = container;
        this._raf = null;

        const onMove = (e) => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          cursor.style.left = x - state.size / 2 + 'px';
          cursor.style.top = y - state.size / 2 + 'px';

          // Create trail
          if (state.trail > 0) {
            const dot = document.createElement('div');
            dot.style.cssText = `position:absolute;pointer-events:none;border-radius:50;width:${state.size / 2}px;height:${state.size / 2}px;left:${x - state.size / 4}px;top:${y - state.size / 4}px;background:${state.color};opacity:0.4;transition:opacity 0.5s ease;border-radius:50%;`;
            container.appendChild(dot);
            setTimeout(() => { dot.style.opacity = '0'; }, 50);
            setTimeout(() => { if (dot.parentNode) dot.parentNode.removeChild(dot); }, 600);
          }
        };

        container.addEventListener('mousemove', onMove);
        this._onMove = onMove;
        this.update(state);
      },
      update(state) {
        this._cursor.style.width = state.size + 'px';
        this._cursor.style.height = state.size + 'px';
        this._cursor.style.background = state.color;
        this._cursor.style.opacity = '0.6';
        this._cursor.style.boxShadow = `0 0 ${state.size}px ${state.color}`;
      },
      getCode(state) {
        return `/* Custom cursor */\n.custom-cursor {\n  position: fixed;\n  width: ${state.size}px;\n  height: ${state.size}px;\n  background: ${state.color};\n  border-radius: 50%;\n  pointer-events: none;\n  z-index: 9999;\n  opacity: 0.6;\n  box-shadow: 0 0 ${state.size}px ${state.color};\n  transition: transform 0.1s ease;\n}`;
      },
      destroy() {
        if (this._container && this._onMove) {
          this._container.removeEventListener('mousemove', this._onMove);
        }
        this._cursor = null;
      }
    },

    // ═══════════════════════════════════════════
    // FLX-008: Interactive Cursor
    // ═══════════════════════════════════════════
    {
      id: 'interactive-cursor',
      name: 'Interactive Cursor',
      description: 'Elements that react to cursor proximity with magnetic pull and glow effects.',
      category: 'JavaScript',
      tags: ['js', 'cursor', 'interaction', 'magnetic'],
      status: 'active',
      number: 'FLX-008',
      controls: [
        { type: 'range', key: 'range', label: 'Attraction Range', min: 50, max: 200, default: 100, unit: 'px' },
        { type: 'range', key: 'strength', label: 'Strength', min: 5, max: 40, default: 20, unit: 'px' },
      ],
      init(container, state) {
        container.style.display = 'flex';
        container.style.gap = '24px';
        container.style.flexWrap = 'wrap';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';

        const items = [];
        for (let i = 0; i < 6; i++) {
          const item = document.createElement('div');
          item.style.cssText = `width:80px;height:80px;border-radius:16px;background:var(--surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);transition:box-shadow 0.3s ease;cursor:pointer;will-change:transform;`;
          item.textContent = `#${i + 1}`;
          container.appendChild(item);
          items.push(item);
        }

        const onMove = (e) => {
          const rect = container.getBoundingClientRect();
          const mx = e.clientX;
          const my = e.clientY;
          items.forEach(item => {
            const r = item.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = mx - cx;
            const dy = my - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < state.range) {
              const factor = 1 - dist / state.range;
              const tx = dx * factor * (state.strength / 100);
              const ty = dy * factor * (state.strength / 100);
              item.style.transform = `translate(${tx}px, ${ty}px)`;
              item.style.boxShadow = `0 0 ${20 * factor}px rgba(229,62,107,${0.3 * factor})`;
            } else {
              item.style.transform = 'translate(0, 0)';
              item.style.boxShadow = 'none';
            }
          });
        };

        const onLeave = () => {
          items.forEach(item => {
            item.style.transform = 'translate(0, 0)';
            item.style.boxShadow = 'none';
          });
        };

        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseleave', onLeave);
        this._cleanup = () => {
          container.removeEventListener('mousemove', onMove);
          container.removeEventListener('mouseleave', onLeave);
        };
      },
      update() {},
      getCode(state) {
        return `// Magnetic interaction\nconst range = ${state.range};\nconst strength = ${state.strength};\n\nelement.addEventListener('mousemove', (e) => {\n  const rect = element.getBoundingClientRect();\n  const dx = e.clientX - (rect.left + rect.width / 2);\n  const dy = e.clientY - (rect.top + rect.height / 2);\n  const dist = Math.sqrt(dx * dx + dy * dy);\n  \n  if (dist < range) {\n    const factor = 1 - dist / range;\n    element.style.transform = \`translate(\${dx * factor * strength/100}px, \${dy * factor * strength/100}px)\`;\n  }\n});`;
      },
      destroy() { if (this._cleanup) this._cleanup(); }
    },

    // ═══════════════════════════════════════════
    // FLX-009: Mouse Tracker
    // ═══════════════════════════════════════════
    {
      id: 'mouse-tracker',
      name: 'Mouse Tracker',
      description: 'Real-time coordinate display with visual trail showing cursor position and movement.',
      category: 'JavaScript',
      tags: ['js', 'mouse', 'tracker', 'coordinates'],
      status: 'active',
      number: 'FLX-009',
      controls: [
        { type: 'color', key: 'color', label: 'Trail Color', default: '#85b2a5' },
        { type: 'range', key: 'dotSize', label: 'Dot Size', min: 2, max: 16, default: 6, unit: 'px' },
      ],
      init(container, state) {
        this._state = { ...state };
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        container.style.width = '100%';
        container.style.height = '100%';

        const display = document.createElement('div');
        display.style.cssText = 'position:absolute;top:16px;left:16px;font-family:var(--font-mono);font-size:0.75rem;color:var(--text-primary);z-index:5;background:var(--surface);padding:8px 12px;border-radius:8px;border:1px solid var(--border);box-shadow:var(--shadow-sm);pointer-events:none;';
        display.textContent = 'x: 0  y: 0';
        container.appendChild(display);

        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let points = [];
        let animId;

        const resize = () => {
          const rect = canvas.getBoundingClientRect();
          canvas.width = rect.width || container.clientWidth || 500;
          canvas.height = rect.height || container.clientHeight || 350;
        };
        resize();

        const onMove = (e) => {
          const rect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / (rect.width || 1);
          const scaleY = canvas.height / (rect.height || 1);
          const x = (e.clientX - rect.left) * scaleX;
          const y = (e.clientY - rect.top) * scaleY;

          display.textContent = `x: ${Math.round(x)}  y: ${Math.round(y)}`;
          points.push({ x, y, alpha: 1 });
          if (points.length > 100) points.shift();
        };

        const renderLoop = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const s = this._state || state;

          for (let i = 0; i < points.length; i++) {
            const p = points[i];
            p.alpha -= 0.015;
            if (p.alpha > 0) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, s.dotSize, 0, Math.PI * 2);
              const hexAlpha = Math.round(p.alpha * 255).toString(16).padStart(2, '0');
              ctx.fillStyle = s.color + hexAlpha;
              ctx.fill();
            }
          }
          points = points.filter(p => p.alpha > 0);
          animId = requestAnimationFrame(renderLoop);
        };

        renderLoop();

        container.addEventListener('mousemove', onMove);
        window.addEventListener('resize', resize);

        this._cleanup = () => {
          cancelAnimationFrame(animId);
          container.removeEventListener('mousemove', onMove);
          window.removeEventListener('resize', resize);
        };
      },
      update(newState) {
        this._state = { ...newState };
      },
      getCode(state) {
        return `// Mouse tracker with exact canvas scaling\nconst canvas = document.querySelector('canvas');\nconst ctx = canvas.getContext('2d');\nconst points = [];\n\ncontainer.addEventListener('mousemove', (e) => {\n  const rect = canvas.getBoundingClientRect();\n  const x = (e.clientX - rect.left) * (canvas.width / rect.width);\n  const y = (e.clientY - rect.top) * (canvas.height / rect.height);\n  points.push({ x, y, alpha: 1 });\n});\n\nfunction animate() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  points.forEach(p => {\n    p.alpha -= 0.015;\n    ctx.beginPath();\n    ctx.arc(p.x, p.y, ${state.dotSize}, 0, Math.PI * 2);\n    ctx.fillStyle = '${state.color}' + Math.round(p.alpha * 255).toString(16);\n    ctx.fill();\n  });\n  requestAnimationFrame(animate);\n}`;
      },
      destroy() { if (this._cleanup) this._cleanup(); this._state = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-010: Color Generator
    // ═══════════════════════════════════════════
    {
      id: 'color-generator',
      name: 'Color Generator',
      description: 'Generate harmonious color palettes using complementary, analogous, and triadic rules.',
      category: 'JavaScript',
      tags: ['js', 'color', 'palette', 'generator'],
      status: 'active',
      number: 'FLX-010',
      controls: [
        { type: 'select', key: 'harmony', label: 'Harmony', options: ['analogous', 'complementary', 'triadic', 'split-comp', 'random'], default: 'analogous' },
        { type: 'range', key: 'count', label: 'Colors', min: 3, max: 8, default: 5 },
      ],
      init(container, state) {
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.width = '100%';
        container.style.gap = '16px';

        const palette = document.createElement('div');
        palette.style.cssText = 'display:flex;width:100%;height:120px;border-radius:12px;overflow:hidden;';
        const info = document.createElement('div');
        info.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;justify-content:center;';
        const btn = document.createElement('button');
        btn.className = 'btn btn-secondary btn-sm';
        btn.innerHTML = `${FLX.icon('refresh')} Generate`;
        btn.onclick = () => this.generate(state);

        container.appendChild(palette);
        container.appendChild(info);
        container.appendChild(btn);
        this._palette = palette;
        this._info = info;
        this.generate(state);
      },
      generate(state) {
        const { harmony, count } = state;
        const baseHue = Math.random() * 360;
        let hues = [];

        switch (harmony) {
          case 'complementary':
            hues = Array.from({ length: count }, (_, i) => (baseHue + (i % 2 === 0 ? 0 : 180) + i * 5) % 360);
            break;
          case 'triadic':
            hues = Array.from({ length: count }, (_, i) => (baseHue + (i * 120)) % 360);
            break;
          case 'split-comp':
            hues = Array.from({ length: count }, (_, i) => (baseHue + [0, 150, 210][i % 3] + i * 3) % 360);
            break;
          case 'analogous':
            hues = Array.from({ length: count }, (_, i) => (baseHue + i * 30) % 360);
            break;
          default:
            hues = Array.from({ length: count }, () => Math.random() * 360);
        }

        const colors = hues.map((h, i) => {
          const s = 60 + Math.random() * 20;
          const l = 45 + (i / count) * 20;
          return FLX.hslToHex(h, s, l);
        });

        this._palette.innerHTML = colors.map(c =>
          `<div style="flex:1;background:${c};cursor:pointer;transition:flex 0.3s ease;" onclick="FLX.copyToClipboard('${c}')" title="Click to copy ${c}"></div>`
        ).join('');

        this._info.innerHTML = colors.map(c =>
          `<span style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);cursor:pointer;padding:4px 8px;background:var(--surface);border:1px solid var(--border);border-radius:6px;" onclick="FLX.copyToClipboard('${c}')">${c}</span>`
        ).join('');

        this._colors = colors;
      },
      update(state) { this.generate(state); },
      getCode(state) {
        if (!this._colors) return '/* Generate a palette first */';
        return `/* Color Palette */\n:root {\n${this._colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
      },
      destroy() { this._palette = null; this._info = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-011: Keyboard Visualizer
    // ═══════════════════════════════════════════
    {
      id: 'keyboard-visualizer',
      name: 'Keyboard Visualizer',
      description: 'Live keyboard input visualization that displays pressed keys with visual feedback.',
      category: 'JavaScript',
      tags: ['js', 'keyboard', 'input', 'visualizer'],
      status: 'active',
      number: 'FLX-011',
      controls: [
        { type: 'color', key: 'activeColor', label: 'Active Color', default: '#e53e6b' },
      ],
      init(container, state) {
        const display = document.createElement('div');
        display.style.cssText = 'text-align:center;width:100%;';
        display.innerHTML = `
          <div style="font-family:var(--font-mono);font-size:0.8rem;color:var(--text-muted);margin-bottom:16px;">Press any key</div>
          <div id="kb-key-display" style="font-size:3rem;font-weight:900;font-family:var(--font-sans);color:var(--text-primary);min-height:60px;display:flex;align-items:center;justify-content:center;"></div>
          <div id="kb-code-display" style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);margin-top:8px;"></div>
          <div id="kb-history" style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-top:24px;min-height:40px;"></div>
        `;
        container.appendChild(display);
        this._container = container;

        const keyDisplay = display.querySelector('#kb-key-display');
        const codeDisplay = display.querySelector('#kb-code-display');
        const history = display.querySelector('#kb-history');

        const onKeyDown = (e) => {
          e.preventDefault();
          keyDisplay.textContent = e.key === ' ' ? 'Space' : e.key;
          keyDisplay.style.color = state.activeColor;
          keyDisplay.style.textShadow = `0 0 20px ${state.activeColor}`;
          codeDisplay.textContent = `key: "${e.key}" · code: "${e.code}" · keyCode: ${e.keyCode}`;

          const badge = document.createElement('span');
          badge.style.cssText = `display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:28px;padding:0 8px;font-family:var(--font-mono);font-size:0.7rem;background:${state.activeColor};color:#fff;border-radius:6px;animation:fadeInScale 0.2s var(--ease-spring);`;
          badge.textContent = e.key === ' ' ? '⎵' : e.key.length === 1 ? e.key.toUpperCase() : e.key;
          history.appendChild(badge);
          if (history.children.length > 20) history.removeChild(history.firstChild);

          setTimeout(() => {
            keyDisplay.style.color = 'var(--text-primary)';
            keyDisplay.style.textShadow = 'none';
          }, 200);
        };

        document.addEventListener('keydown', onKeyDown);
        this._cleanup = () => document.removeEventListener('keydown', onKeyDown);
      },
      update() {},
      getCode(state) {
        return `// Keyboard Visualizer\ndocument.addEventListener('keydown', (e) => {\n  console.log('key:', e.key);\n  console.log('code:', e.code);\n  console.log('keyCode:', e.keyCode);\n  \n  display.textContent = e.key;\n  display.style.color = '${state.activeColor}';\n});`;
      },
      destroy() { if (this._cleanup) this._cleanup(); }
    },

    // ═══════════════════════════════════════════
    // FLX-012: Particle Playground
    // ═══════════════════════════════════════════
    {
      id: 'particle-playground',
      name: 'Particle Playground',
      description: 'Configurable particle system with adjustable count, speed, size and connection lines.',
      category: 'JavaScript',
      tags: ['js', 'particles', 'canvas', 'animation'],
      status: 'active',
      number: 'FLX-012',
      controls: [
        { type: 'range', key: 'count', label: 'Particles', min: 10, max: 150, default: 60 },
        { type: 'range', key: 'speed', label: 'Speed', min: 0.1, max: 3, default: 0.8, step: 0.1 },
        { type: 'range', key: 'connectDist', label: 'Connect Distance', min: 50, max: 200, default: 100, unit: 'px' },
        { type: 'color', key: 'color', label: 'Color', default: '#85b2a5' },
      ],
      init(container, state) {
        this._state = { ...state };
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'width:100%;height:100%;display:block;';
        container.appendChild(canvas);
        container.style.overflow = 'hidden';

        const resize = () => {
          const rect = container.getBoundingClientRect();
          canvas.width = rect.width || 600;
          canvas.height = rect.height || 400;
        };
        resize();

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;

        const createParticles = () => {
          const s = this._state || state;
          const w = canvas.width || 600;
          const h = canvas.height || 400;
          particles = Array.from({ length: s.count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * s.speed * 2,
            vy: (Math.random() - 0.5) * s.speed * 2,
            size: Math.random() * 2 + 1.5
          }));
        };

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const s = this._state || state;
          const w = canvas.width || 600;
          const h = canvas.height || 400;

          // Render particles
          particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.fill();
          });

          // Connections
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < s.connectDist) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.globalAlpha = Math.max(0.05, (1 - dist / s.connectDist) * 0.65);
                ctx.strokeStyle = s.color;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
              }
            }
          }

          animId = requestAnimationFrame(animate);
        };

        createParticles();
        animate();

        window.addEventListener('resize', resize);
        this._cleanup = () => {
          cancelAnimationFrame(animId);
          window.removeEventListener('resize', resize);
        };
        this._recreate = createParticles;
      },
      update(newState) {
        this._state = { ...newState };
        if (this._recreate) {
          this._recreate();
        }
      },
      getCode(state) {
        return `// Particle System\nconst particles = Array.from({ length: ${state.count} }, () => ({\n  x: Math.random() * width,\n  y: Math.random() * height,\n  vx: (Math.random() - 0.5) * ${state.speed} * 2,\n  vy: (Math.random() - 0.5) * ${state.speed} * 2,\n}));\n\nfunction animate() {\n  ctx.clearRect(0, 0, width, height);\n  particles.forEach(p => {\n    p.x += p.vx;\n    p.y += p.vy;\n    if (p.x < 0 || p.x > width) p.vx *= -1;\n    if (p.y < 0 || p.y > height) p.vy *= -1;\n    ctx.beginPath();\n    ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);\n    ctx.fillStyle = '${state.color}';\n    ctx.fill();\n  });\n  // Draw connections within ${state.connectDist}px\n  requestAnimationFrame(animate);\n}`;
      },
      destroy() { if (this._cleanup) this._cleanup(); this._state = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-013: Dynamic Theme Switcher
    // ═══════════════════════════════════════════
    {
      id: 'dynamic-theme',
      name: 'Dynamic Theme Switcher',
      description: 'Generate complete color themes from a single base hue using HSL color math.',
      category: 'JavaScript',
      tags: ['js', 'theme', 'color', 'hsl'],
      status: 'active',
      number: 'FLX-013',
      controls: [
        { type: 'range', key: 'hue', label: 'Base Hue', min: 0, max: 360, default: 220 },
        { type: 'range', key: 'saturation', label: 'Saturation', min: 10, max: 100, default: 70, unit: '%' },
      ],
      init(container, state) {
        container.style.width = '100%';
        container.style.padding = '24px';
        this._container = container;
        this.update(state);
      },
      update(state) {
        const { hue, saturation } = state;
        const h = hue, s = saturation;
        const colors = {
          bg: FLX.hslToHex(h, s * 0.15, 8),
          surface: FLX.hslToHex(h, s * 0.2, 14),
          border: FLX.hslToHex(h, s * 0.15, 20),
          textPrimary: FLX.hslToHex(h, s * 0.1, 92),
          textSecondary: FLX.hslToHex(h, s * 0.15, 65),
          accent: FLX.hslToHex(h, s, 55),
          accentSoft: FLX.hslToHex(h, s * 0.8, 45),
        };

        this._container.innerHTML = `
          <div style="background:${colors.bg};border:1px solid ${colors.border};border-radius:12px;padding:20px;font-family:var(--font-sans);">
            <div style="display:flex;gap:8px;margin-bottom:16px;">
              ${Object.entries(colors).map(([k, v]) =>
                `<div style="flex:1;height:40px;background:${v};border-radius:6px;cursor:pointer;" title="${k}: ${v}" onclick="FLX.copyToClipboard('${v}')"></div>`
              ).join('')}
            </div>
            <div style="background:${colors.surface};border:1px solid ${colors.border};border-radius:8px;padding:16px;">
              <h4 style="color:${colors.textPrimary};margin-bottom:8px;font-size:0.95rem;">Generated Theme</h4>
              <p style="color:${colors.textSecondary};font-size:0.8rem;line-height:1.5;">Base hue: ${h}° · Saturation: ${s}%</p>
              <button style="margin-top:12px;padding:8px 16px;background:${colors.accent};color:#fff;border:none;border-radius:6px;font-size:0.8rem;cursor:pointer;font-weight:600;">Accent Button</button>
            </div>
          </div>
        `;
        this._colors = colors;
      },
      getCode(state) {
        if (!this._colors) return '';
        const c = this._colors;
        return `:root {\n  --bg: ${c.bg};\n  --surface: ${c.surface};\n  --border: ${c.border};\n  --text-primary: ${c.textPrimary};\n  --text-secondary: ${c.textSecondary};\n  --accent: ${c.accent};\n  --accent-soft: ${c.accentSoft};\n}`;
      },
      destroy() { this._container = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-014: Command Palette (Demo)
    // ═══════════════════════════════════════════
    {
      id: 'command-palette-demo',
      name: 'Command Palette',
      description: 'A full keyboard-navigable command palette with search, grouping and shortcut display.',
      category: 'UI/UX',
      tags: ['ui', 'command-palette', 'keyboard', 'search'],
      status: 'active',
      number: 'FLX-014',
      controls: [],
      init(container) {
        container.style.padding = '24px';
        container.style.width = '100%';
        container.innerHTML = `
          <div style="max-width:480px;margin:0 auto;background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden;box-shadow:var(--shadow-lg);">
            <div style="display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid var(--border);">
              ${FLX.icon('search')}
              <span style="color:var(--text-muted);font-size:0.9rem;">Type a command...</span>
            </div>
            <div style="padding:8px;">
              <div style="padding:4px 12px;font-size:0.7rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;">Navigation</div>
              ${['Home', 'Experiments', 'Components'].map((item, i) =>
                `<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;${i === 0 ? 'background:var(--surface-hover);' : ''}cursor:pointer;transition:background 0.15s;" onmouseenter="this.style.background='var(--surface-hover)'" onmouseleave="this.style.background=''">
                  <span style="color:var(--text-muted);">${FLX.icon('home')}</span>
                  <span style="font-size:0.9rem;color:var(--text-primary);">${item}</span>
                </div>`
              ).join('')}
              <div style="padding:4px 12px;font-size:0.7rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-top:4px;">Actions</div>
              <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;cursor:pointer;" onmouseenter="this.style.background='var(--surface-hover)'" onmouseleave="this.style.background=''">
                <span style="color:var(--text-muted);">${FLX.icon('moon')}</span>
                <span style="font-size:0.9rem;color:var(--text-primary);">Toggle Theme</span>
                <span style="margin-left:auto;display:flex;gap:4px;"><kbd>⌘</kbd><kbd>K</kbd></span>
              </div>
            </div>
          </div>
          <p style="text-align:center;margin-top:16px;font-size:0.75rem;color:var(--text-muted);">Try the real thing: press <kbd>Ctrl</kbd> + <kbd>K</kbd></p>
        `;
      },
      update() {},
      getCode() {
        return `<!-- Command Palette -->\n<div class="command-palette">\n  <div class="command-palette-input">\n    <input type="text" placeholder="Search..." />\n  </div>\n  <div class="command-palette-results">\n    <!-- Items rendered dynamically -->\n  </div>\n</div>\n\n// Keyboard: Ctrl+K to open\n// Arrow keys to navigate\n// Enter to select\n// Escape to close`;
      },
      destroy() {}
    },

    // ═══════════════════════════════════════════
    // FLX-015: Toast System
    // ═══════════════════════════════════════════
    {
      id: 'toast-system',
      name: 'Toast System',
      description: 'Stackable toast notifications with multiple types, auto-dismiss and manual close.',
      category: 'UI/UX',
      tags: ['ui', 'toast', 'notification'],
      status: 'active',
      number: 'FLX-015',
      controls: [],
      init(container) {
        container.style.padding = '24px';
        container.style.width = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.gap = '12px';

        const types = ['info', 'success', 'warning', 'error'];
        types.forEach(type => {
          const btn = document.createElement('button');
          btn.className = `btn btn-secondary btn-sm`;
          btn.textContent = `Show ${type} toast`;
          btn.onclick = () => {
            FLX.toast.show({
              title: type.charAt(0).toUpperCase() + type.slice(1),
              message: `This is a ${type} notification from the toast system.`,
              type,
              duration: 4000
            });
          };
          container.appendChild(btn);
        });
      },
      update() {},
      getCode() {
        return `// Toast API\nFLX.toast.show({\n  title: 'Success',\n  message: 'Operation completed successfully.',\n  type: 'success',  // info | success | warning | error\n  duration: 4000     // ms, 0 = no auto-dismiss\n});`;
      },
      destroy() {}
    },

    // ═══════════════════════════════════════════
    // FLX-016: Modal System
    // ═══════════════════════════════════════════
    {
      id: 'modal-system',
      name: 'Modal System',
      description: 'Accessible modal dialogs with focus trapping, backdrop click dismiss and ESC close.',
      category: 'UI/UX',
      tags: ['ui', 'modal', 'dialog', 'a11y'],
      status: 'active',
      number: 'FLX-016',
      controls: [],
      init(container) {
        container.style.padding = '24px';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.gap = '12px';

        const btn1 = document.createElement('button');
        btn1.className = 'btn btn-primary btn-sm';
        btn1.textContent = 'Open Modal';
        btn1.onclick = () => {
          FLX.modal.show({
            title: 'Modal Title',
            body: '<p style="color:var(--text-secondary);line-height:1.6;">This is an accessible modal dialog with focus trapping. Press <kbd>ESC</kbd> or click the backdrop to close. Tab navigation is trapped within the modal.</p>',
            footer: '<button class="btn btn-ghost btn-sm" onclick="FLX.modal.close()">Cancel</button><button class="btn btn-primary btn-sm" onclick="FLX.modal.close()">Confirm</button>'
          });
        };

        const btn2 = document.createElement('button');
        btn2.className = 'btn btn-secondary btn-sm';
        btn2.textContent = 'Confirmation Modal';
        btn2.onclick = () => {
          FLX.modal.show({
            title: 'Are you sure?',
            body: '<p style="color:var(--text-secondary);line-height:1.6;">This action cannot be undone. This will permanently delete the experiment and all associated data.</p>',
            footer: '<button class="btn btn-ghost btn-sm" onclick="FLX.modal.close()">Cancel</button><button class="btn btn-danger btn-sm" onclick="FLX.modal.close();FLX.toast.show({message:\'Deleted successfully\',type:\'success\'})">Delete</button>'
          });
        };

        container.appendChild(btn1);
        container.appendChild(btn2);
      },
      update() {},
      getCode() {
        return `// Modal API\nFLX.modal.show({\n  title: 'Modal Title',\n  body: '<p>Modal content here</p>',\n  footer: '<button onclick="FLX.modal.close()">Close</button>',\n  onClose: () => console.log('Modal closed')\n});\n\n// Features:\n// - Focus trap (Tab cycles within modal)\n// - ESC to close\n// - Backdrop click to close\n// - Scroll lock on body\n// - Focus restoration`;
      },
      destroy() {}
    },

    // ═══════════════════════════════════════════
    // FLX-017: Tooltip System
    // ═══════════════════════════════════════════
    {
      id: 'tooltip-system',
      name: 'Tooltip System',
      description: 'Directional tooltips with smart positioning that adjust to viewport boundaries.',
      category: 'UI/UX',
      tags: ['ui', 'tooltip', 'hover'],
      status: 'active',
      number: 'FLX-017',
      controls: [],
      init(container) {
        container.style.display = 'flex';
        container.style.gap = '24px';
        container.style.flexWrap = 'wrap';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.padding = '40px';

        const directions = ['top', 'right', 'bottom', 'left'];
        directions.forEach(dir => {
          const trigger = document.createElement('div');
          trigger.className = 'tooltip-trigger';
          trigger.innerHTML = `
            <button class="btn btn-secondary btn-sm">Tooltip ${dir}</button>
            <div class="tooltip tooltip-${dir === 'right' ? 'top' : dir}" style="${dir === 'right' ? 'left:calc(100% + 8px);bottom:auto;top:50%;transform:translateY(-50%) translateX(4px);' : ''}">${dir.charAt(0).toUpperCase() + dir.slice(1)} tooltip</div>
          `;
          container.appendChild(trigger);
        });
      },
      update() {},
      getCode() {
        return `<!-- Tooltip -->\n<div class="tooltip-trigger">\n  <button>Hover me</button>\n  <div class="tooltip tooltip-top">Tooltip text</div>\n</div>\n\n/* CSS */\n.tooltip {\n  position: absolute;\n  padding: 6px 12px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 6px;\n  font-size: 0.75rem;\n  opacity: 0;\n  transition: opacity 0.15s, transform 0.15s;\n}\n\n.tooltip-trigger:hover .tooltip {\n  opacity: 1;\n  transform: translateY(0);\n}`;
      },
      destroy() {}
    },

    // ═══════════════════════════════════════════
    // FLX-018: Tabs
    // ═══════════════════════════════════════════
    {
      id: 'tabs-demo',
      name: 'Tabs',
      description: 'Animated tab interface with smooth indicator transition and keyboard navigation.',
      category: 'UI/UX',
      tags: ['ui', 'tabs', 'navigation'],
      status: 'active',
      number: 'FLX-018',
      controls: [],
      init(container) {
        container.style.width = '100%';
        container.style.padding = '24px';
        container.innerHTML = `
          <div style="max-width:480px;margin:0 auto;background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;">
            <div style="display:flex;border-bottom:1px solid var(--border);" id="demo-tabs-nav" role="tablist"></div>
            <div id="demo-tabs-content" style="padding:20px;min-height:100px;"></div>
          </div>
        `;
        const nav = container.querySelector('#demo-tabs-nav');
        const content = container.querySelector('#demo-tabs-content');
        const tabs = [
          { label: 'Preview', content: 'This is the preview tab content. It shows a live render of the component.' },
          { label: 'Code', content: '<pre style="font-size:0.8rem;color:var(--text-secondary);">&lt;div class="tabs"&gt;\n  &lt;button role="tab"&gt;Tab 1&lt;/button&gt;\n  &lt;button role="tab"&gt;Tab 2&lt;/button&gt;\n&lt;/div&gt;</pre>' },
          { label: 'Props', content: '<p style="color:var(--text-secondary);font-size:0.85rem;">No configurable props for this component.</p>' },
        ];

        tabs.forEach((tab, i) => {
          const btn = document.createElement('button');
          btn.style.cssText = `flex:1;padding:12px;font-size:0.85rem;font-weight:500;color:${i === 0 ? 'var(--text-primary)' : 'var(--text-muted)'};border-bottom:2px solid ${i === 0 ? 'var(--accent-red)' : 'transparent'};background:none;cursor:pointer;transition:all 0.2s;`;
          btn.textContent = tab.label;
          btn.setAttribute('role', 'tab');
          btn.setAttribute('aria-selected', i === 0);
          btn.onclick = () => {
            nav.querySelectorAll('button').forEach((b, j) => {
              b.style.color = j === i ? 'var(--text-primary)' : 'var(--text-muted)';
              b.style.borderBottomColor = j === i ? 'var(--accent-red)' : 'transparent';
              b.setAttribute('aria-selected', j === i);
            });
            content.innerHTML = `<div style="animation:fadeIn 0.2s ease;">${tab.content}</div>`;
          };
          nav.appendChild(btn);
        });
        content.innerHTML = tabs[0].content;
      },
      update() {},
      getCode() {
        return `<!-- Tabs -->\n<div class="tabs" role="tablist">\n  <button class="tab active" role="tab" aria-selected="true">Tab 1</button>\n  <button class="tab" role="tab" aria-selected="false">Tab 2</button>\n</div>\n<div class="tab-panel active" role="tabpanel">\n  Content here\n</div>`;
      },
      destroy() {}
    },

    // ═══════════════════════════════════════════
    // FLX-019: Accordion
    // ═══════════════════════════════════════════
    {
      id: 'accordion-demo',
      name: 'Accordion',
      description: 'Smooth collapse animation with icon rotation and optional multiple-open mode.',
      category: 'UI/UX',
      tags: ['ui', 'accordion', 'collapse'],
      status: 'active',
      number: 'FLX-019',
      controls: [
        { type: 'select', key: 'mode', label: 'Mode', options: ['single', 'multiple'], default: 'single' },
      ],
      init(container, state) {
        container.style.width = '100%';
        container.style.padding = '24px';
        this._container = container;
        this.update(state);
      },
      update(state) {
        const items = [
          { title: 'What is FLOREX.LAB?', content: 'A personal frontend laboratory for experiments, UI components, and interactive demos built with HTML, CSS, and JavaScript.' },
          { title: 'What technologies are used?', content: 'Everything is built from scratch with vanilla HTML, CSS, and JavaScript. No UI frameworks or component libraries.' },
          { title: 'Can I use these components?', content: 'All code is available for viewing and copying. Feel free to use and adapt them for your own projects.' },
        ];

        this._container.innerHTML = `
          <div style="max-width:480px;margin:0 auto;" class="accordion">
            ${items.map((item, i) => `
              <div class="accordion-item${i === 0 ? ' open' : ''}" data-index="${i}">
                <button class="accordion-trigger" aria-expanded="${i === 0}">
                  ${item.title}
                  <span class="accordion-icon">${FLX.icon('chevronDown')}</span>
                </button>
                <div class="accordion-content" style="max-height:${i === 0 ? '200px' : '0'};">
                  <div class="accordion-body">${item.content}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;

        this._container.querySelectorAll('.accordion-trigger').forEach(trigger => {
          trigger.addEventListener('click', () => {
            const item = trigger.closest('.accordion-item');
            const isOpen = item.classList.contains('open');

            if (state.mode === 'single') {
              this._container.querySelectorAll('.accordion-item').forEach(ai => {
                ai.classList.remove('open');
                ai.querySelector('.accordion-content').style.maxHeight = '0';
                ai.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
              });
            }

            if (!isOpen) {
              item.classList.add('open');
              item.querySelector('.accordion-content').style.maxHeight = '200px';
              trigger.setAttribute('aria-expanded', 'true');
            } else {
              item.classList.remove('open');
              item.querySelector('.accordion-content').style.maxHeight = '0';
              trigger.setAttribute('aria-expanded', 'false');
            }
          });
        });
      },
      getCode() {
        return `<!-- Accordion -->\n<div class="accordion">\n  <div class="accordion-item">\n    <button class="accordion-trigger" aria-expanded="false">\n      Title\n      <span class="accordion-icon">▼</span>\n    </button>\n    <div class="accordion-content">\n      <div class="accordion-body">Content</div>\n    </div>\n  </div>\n</div>\n\n/* Toggle with JS */\nitem.classList.toggle('open');\ncontent.style.maxHeight = isOpen ? '0' : content.scrollHeight + 'px';`;
      },
      destroy() { this._container = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-020: Context Menu
    // ═══════════════════════════════════════════
    {
      id: 'context-menu',
      name: 'Context Menu',
      description: 'Custom right-click context menu with icons, separators, and viewport boundary detection.',
      category: 'UI/UX',
      tags: ['ui', 'context-menu', 'right-click'],
      status: 'active',
      number: 'FLX-020',
      controls: [],
      init(container) {
        container.style.position = 'relative';
        container.style.cursor = 'context-menu';
        container.innerHTML = `
          <div style="text-align:center;padding:40px;">
            <p style="font-family:var(--font-mono);font-size:0.85rem;color:var(--text-muted);">Right-click anywhere in this area</p>
          </div>
        `;

        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.innerHTML = `
          <div class="context-menu-item" onclick="FLX.copyToClipboard(window.location.href)">${FLX.icon('copy')} <span>Copy Link</span></div>
          <div class="context-menu-item">${FLX.icon('external')} <span>Open in New Tab</span></div>
          <div class="context-menu-separator"></div>
          <div class="context-menu-item">${FLX.icon('code')} <span>View Source</span></div>
          <div class="context-menu-item">${FLX.icon('refresh')} <span>Reload</span></div>
        `;
        container.appendChild(menu);

        container.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          const rect = container.getBoundingClientRect();
          let x = e.clientX - rect.left;
          let y = e.clientY - rect.top;
          // Boundary check
          if (x + 180 > rect.width) x = rect.width - 185;
          if (y + 160 > rect.height) y = rect.height - 165;
          menu.style.left = x + 'px';
          menu.style.top = y + 'px';
          menu.classList.add('open');
        });

        const closeMenu = () => menu.classList.remove('open');
        container.addEventListener('click', closeMenu);
        document.addEventListener('click', closeMenu);
        this._closeMenu = closeMenu;
      },
      update() {},
      getCode() {
        return `// Custom Context Menu\nelement.addEventListener('contextmenu', (e) => {\n  e.preventDefault();\n  menu.style.left = e.clientX + 'px';\n  menu.style.top = e.clientY + 'px';\n  menu.classList.add('open');\n});\n\ndocument.addEventListener('click', () => {\n  menu.classList.remove('open');\n});`;
      },
      destroy() { if (this._closeMenu) document.removeEventListener('click', this._closeMenu); }
    },

    // ═══════════════════════════════════════════
    // FLX-021: Magnetic Button
    // ═══════════════════════════════════════════
    {
      id: 'magnetic-button',
      name: 'Magnetic Button',
      description: 'A cursor-aware button interaction that dynamically shifts position based on pointer proximity.',
      category: 'Animation',
      tags: ['animation', 'interaction', 'magnetic', 'cursor'],
      status: 'active',
      number: 'FLX-021',
      controls: [
        { type: 'range', key: 'range', label: 'Range', min: 50, max: 200, default: 120, unit: 'px' },
        { type: 'range', key: 'strength', label: 'Strength', min: 10, max: 60, default: 30, unit: 'px' },
      ],
      init(container, state) {
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.minHeight = '300px';

        const btn = document.createElement('button');
        btn.className = 'btn btn-primary btn-lg';
        btn.textContent = 'Hover me';
        btn.style.willChange = 'transform';
        btn.style.transition = 'transform 0.2s var(--ease-out)';
        container.appendChild(btn);

        const onMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < state.range) {
            const factor = 1 - dist / state.range;
            const tx = dx * factor * (state.strength / 100);
            const ty = dy * factor * (state.strength / 100);
            btn.style.transform = `translate(${tx}px, ${ty}px)`;
          } else {
            btn.style.transform = '';
          }
        };

        const onLeave = () => {
          btn.style.transform = '';
        };

        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseleave', onLeave);
        this._cleanup = () => {
          container.removeEventListener('mousemove', onMove);
          container.removeEventListener('mouseleave', onLeave);
        };
      },
      update() {},
      getCode(state) {
        return `// Magnetic Button\nconst range = ${state.range};\nconst strength = ${state.strength};\n\nbutton.addEventListener('mousemove', (e) => {\n  const rect = button.getBoundingClientRect();\n  const cx = rect.left + rect.width / 2;\n  const cy = rect.top + rect.height / 2;\n  const dx = e.clientX - cx;\n  const dy = e.clientY - cy;\n  const dist = Math.sqrt(dx * dx + dy * dy);\n\n  if (dist < range) {\n    const factor = 1 - dist / range;\n    button.style.transform = \`translate(\${dx * factor * strength/100}px, \${dy * factor * strength/100}px)\`;\n  } else {\n    button.style.transform = '';\n  }\n});`;
      },
      destroy() { if (this._cleanup) this._cleanup(); }
    },

    // ═══════════════════════════════════════════
    // FLX-022: Scroll Reveal
    // ═══════════════════════════════════════════
    {
      id: 'scroll-reveal',
      name: 'Scroll Reveal',
      description: 'Multiple reveal animation types triggered by scroll intersection: fade, slide, scale.',
      category: 'Animation',
      tags: ['animation', 'scroll', 'reveal', 'intersection-observer'],
      status: 'active',
      number: 'FLX-022',
      controls: [
        { type: 'select', key: 'style', label: 'Style', options: ['fade-up', 'fade-down', 'fade-left', 'fade-right', 'scale', 'stagger'], default: 'fade-up' },
      ],
      init(container, state) {
        container.style.width = '100%';
        container.style.padding = '24px';
        container.style.maxHeight = '350px';
        container.style.overflowY = 'auto';
        this._container = container;
        this.update(state);
      },
      update(state) {
        const { style } = state;
        const animations = {
          'fade-up': 'opacity:0;transform:translateY(30px);',
          'fade-down': 'opacity:0;transform:translateY(-30px);',
          'fade-left': 'opacity:0;transform:translateX(-30px);',
          'fade-right': 'opacity:0;transform:translateX(30px);',
          'scale': 'opacity:0;transform:scale(0.8);',
          'stagger': 'opacity:0;transform:translateY(20px);'
        };

        const initial = animations[style] || animations['fade-up'];

        this._container.innerHTML = `
          <div style="padding:60px 0 20px;text-align:center;color:var(--text-muted);font-size:0.8rem;">↓ Scroll down ↓</div>
          ${Array.from({ length: 6 }, (_, i) => `
            <div class="scroll-demo-item" style="${initial}transition:all 0.6s cubic-bezier(0.16,1,0.3,1) ${style === 'stagger' ? i * 0.1 : 0}s;margin-bottom:16px;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;">
              <div style="font-weight:600;font-size:0.9rem;margin-bottom:4px;">Item ${i + 1}</div>
              <div style="font-size:0.8rem;color:var(--text-muted);">${style} animation</div>
            </div>
          `).join('')}
        `;

        // IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'none';
            }
          });
        }, { threshold: 0.2, root: this._container });

        this._container.querySelectorAll('.scroll-demo-item').forEach(el => observer.observe(el));
        this._observer = observer;
      },
      getCode(state) {
        return `// Scroll Reveal with IntersectionObserver\nconst observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.classList.add('revealed');\n    }\n  });\n}, { threshold: 0.2 });\n\ndocument.querySelectorAll('.reveal').forEach(el => {\n  observer.observe(el);\n});\n\n/* CSS */\n.reveal {\n  opacity: 0;\n  transform: translateY(30px); /* ${state.style} */\n  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.reveal.revealed {\n  opacity: 1;\n  transform: none;\n}`;
      },
      destroy() { if (this._observer) this._observer.disconnect(); this._container = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-023: Text Animation
    // ═══════════════════════════════════════════
    {
      id: 'text-animation',
      name: 'Text Animation',
      description: 'Text animation effects including typewriter, wave, glitch, and character split.',
      category: 'Animation',
      tags: ['animation', 'text', 'typewriter', 'glitch'],
      status: 'active',
      number: 'FLX-023',
      controls: [
        { type: 'select', key: 'effect', label: 'Effect', options: ['wave', 'glitch', 'bounce', 'fade-letters'], default: 'wave' },
        { type: 'range', key: 'speed', label: 'Speed', min: 0.5, max: 3, default: 1.5, step: 0.1, unit: 's' },
      ],
      init(container, state) {
        container.style.textAlign = 'center';
        container.style.padding = '40px';
        this._container = container;
        this._interval = null;
        this.update(state);
      },
      update(state) {
        clearInterval(this._interval);
        const text = 'FLOREX.LAB';
        const { effect, speed } = state;

        if (effect === 'wave') {
          this._container.innerHTML = text.split('').map((c, i) =>
            `<span style="display:inline-block;font-size:2.5rem;font-weight:900;font-family:var(--font-sans);color:var(--text-primary);animation:float ${speed}s ease-in-out infinite;animation-delay:${i * 0.08}s;">${c}</span>`
          ).join('');
        } else if (effect === 'glitch') {
          this._container.innerHTML = `<span style="display:inline-block;font-size:2.5rem;font-weight:900;font-family:var(--font-mono);color:var(--text-primary);animation:glitch 0.3s ease infinite, glitchColor 0.5s ease infinite;position:relative;">${text}</span>`;
        } else if (effect === 'bounce') {
          this._container.innerHTML = text.split('').map((c, i) =>
            `<span style="display:inline-block;font-size:2.5rem;font-weight:900;font-family:var(--font-sans);color:var(--text-primary);animation:fadeInUp 0.5s var(--ease-spring) both;animation-delay:${i * 0.05}s;">${c}</span>`
          ).join('');
          this._interval = setInterval(() => this.update(state), (speed + 1) * 1000);
        } else {
          this._container.innerHTML = text.split('').map((c, i) =>
            `<span style="display:inline-block;font-size:2.5rem;font-weight:900;font-family:var(--font-sans);color:var(--text-primary);opacity:0;animation:fadeIn ${speed / 2}s ease both;animation-delay:${i * 0.08}s;">${c}</span>`
          ).join('');
          this._interval = setInterval(() => this.update(state), (speed + 1.5) * 1000);
        }
      },
      getCode(state) {
        return `/* ${state.effect} animation */\n.char {\n  display: inline-block;\n  animation: ${state.effect === 'wave' ? `float ${state.speed}s ease-in-out infinite` : state.effect === 'glitch' ? 'glitch 0.3s ease infinite' : `fadeIn ${state.speed}s ease both`};\n}\n\n/* Apply staggered delay per character */\n.char:nth-child(1) { animation-delay: 0s; }\n.char:nth-child(2) { animation-delay: 0.08s; }\n/* ... */`;
      },
      destroy() { clearInterval(this._interval); this._container = null; }
    },

    // ═══════════════════════════════════════════
    // FLX-024: Staggered Cards
    // ═══════════════════════════════════════════
    {
      id: 'staggered-cards',
      name: 'Staggered Cards',
      description: 'Grid items with staggered entrance animations using configurable delay and direction.',
      category: 'Animation',
      tags: ['animation', 'stagger', 'cards', 'grid'],
      status: 'active',
      number: 'FLX-024',
      controls: [
        { type: 'range', key: 'delay', label: 'Stagger Delay', min: 30, max: 200, default: 80, unit: 'ms' },
        { type: 'select', key: 'direction', label: 'Direction', options: ['up', 'down', 'left', 'right', 'scale'], default: 'up' },
      ],
      init(container, state) {
        container.style.width = '100%';
        container.style.padding = '24px';
        this._container = container;
        this.update(state);
      },
      update(state) {
        const { delay, direction } = state;
        const transforms = {
          up: 'translateY(30px)', down: 'translateY(-30px)',
          left: 'translateX(30px)', right: 'translateX(-30px)',
          scale: 'scale(0.8)'
        };
        const initial = transforms[direction] || transforms.up;

        this._container.innerHTML = `
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:420px;margin:0 auto;">
            ${Array.from({ length: 9 }, (_, i) => `
              <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:20px;text-align:center;opacity:0;transform:${initial};animation:fadeInUp 0.5s var(--ease-spring) ${i * delay}ms both;">
                <div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);">${i + 1}</div>
              </div>
            `).join('')}
          </div>
          <div style="text-align:center;margin-top:16px;">
            <button class="btn btn-ghost btn-sm" onclick="this.closest('.experiment-preview-container').querySelector('[data-route]') || (function(c,s){c.querySelectorAll('[style*=animation]').forEach(el => {el.style.animation='none';el.offsetHeight;el.style.animation='';});})(this.closest('.experiment-preview-container') || this.parentElement.parentElement, null)">
              ${FLX.icon('refresh')} Replay
            </button>
          </div>
        `;
      },
      getCode(state) {
        return `/* Staggered Cards */\n.card {\n  opacity: 0;\n  transform: ${state.direction === 'scale' ? 'scale(0.8)' : `translate${ state.direction === 'up' || state.direction === 'down' ? 'Y' : 'X'}(${state.direction === 'up' || state.direction === 'left' ? '30' : '-30'}px)`};\n  animation: fadeInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n\n.card:nth-child(1) { animation-delay: 0ms; }\n.card:nth-child(2) { animation-delay: ${state.delay}ms; }\n.card:nth-child(3) { animation-delay: ${state.delay * 2}ms; }\n/* ... stagger by ${state.delay}ms */`;
      },
      destroy() { this._container = null; }
    },

  ];

  FLX.experimentData = experiments;
})();
