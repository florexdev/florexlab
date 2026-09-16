/* ==========================================================================
   FLOREX.LAB — Component Gallery
   Renders all 16 custom UI components with previews, variants, and tabbed code (HTML, CSS, JS)
   ========================================================================== */

(function() {
  'use strict';

  const container = document.getElementById('component-gallery');
  if (!container) return;

  const components = [
    // ── 1. Buttons ──
    {
      name: 'Buttons',
      description: 'Primary, secondary, ghost, danger, icon, loading, and size variants.',
      preview: `
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-ghost">Ghost</button>
        <button class="btn btn-danger">Danger</button>
        <button class="btn btn-primary btn-sm">Small</button>
        <button class="btn btn-primary btn-lg">Large</button>
        <button class="btn btn-primary btn-icon" aria-label="Icon">${FLX.icon('zap')}</button>
        <button class="btn btn-primary btn-loading">Loading</button>
        <button class="btn btn-primary" disabled>Disabled</button>
      `,
      html: `<button class="btn btn-primary">Primary</button>\n<button class="btn btn-secondary">Secondary</button>\n<button class="btn btn-ghost">Ghost</button>\n<button class="btn btn-danger">Danger</button>\n<button class="btn btn-primary btn-sm">Small</button>\n<button class="btn btn-primary btn-lg">Large</button>\n<button class="btn btn-primary btn-loading">Loading</button>\n<button class="btn btn-primary" disabled>Disabled</button>`,
      css: `.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  height: 40px;\n  padding: 0 var(--space-5);\n  font-size: var(--text-sm);\n  font-weight: var(--weight-medium);\n  border-radius: var(--radius-md);\n  border: 1px solid transparent;\n  cursor: pointer;\n  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);\n  white-space: nowrap;\n}\n\n.btn-primary {\n  background: var(--gradient-primary);\n  color: #fff;\n}\n.btn-primary:hover {\n  box-shadow: 0 4px 12px rgba(0,0,0,0.3), var(--shadow-glow-red);\n  transform: translateY(-1px);\n}\n\n.btn-secondary {\n  background: var(--surface);\n  color: var(--text-primary);\n  border-color: var(--border);\n}\n\n.btn-ghost {\n  background: transparent;\n  color: var(--text-secondary);\n}\n\n.btn-danger {\n  background: var(--accent-red);\n  color: #fff;\n}\n\n.btn-sm { height: 32px; padding: 0 12px; font-size: 0.75rem; }\n.btn-lg { height: 48px; padding: 0 24px; font-size: 1rem; }\n.btn-icon { width: 40px; padding: 0; }`
    },

    // ── 2. Inputs ──
    {
      name: 'Inputs',
      description: 'Text inputs with focus, error, and disabled states.',
      preview: `
        <input class="input" placeholder="Default input" style="max-width:260px;">
        <input class="input input-error" value="Error state" style="max-width:260px;">
        <input class="input" disabled placeholder="Disabled" style="max-width:260px;">
      `,
      html: `<input class="input" placeholder="Default input">\n<input class="input input-error" value="Error state">\n<input class="input" disabled placeholder="Disabled">`,
      css: `.input {\n  width: 100%;\n  height: 40px;\n  padding: 0 var(--space-3);\n  background: var(--bg-secondary);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-md);\n  color: var(--text-primary);\n  font-size: var(--text-sm);\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n\n.input:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px var(--accent-blue-soft);\n}\n\n.input-error {\n  border-color: var(--accent-red);\n}\n\n.input:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}`
    },

    // ── 3. Select ──
    {
      name: 'Select',
      description: 'Custom-styled select dropdowns.',
      preview: `
        <select class="select" style="max-width:260px;">
          <option>Select an option</option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      `,
      html: `<select class="select">\n  <option>Select an option</option>\n  <option>Option 1</option>\n  <option>Option 2</option>\n</select>`,
      css: `.select {\n  width: 100%;\n  height: 40px;\n  padding: 0 var(--space-8) 0 var(--space-3);\n  background: var(--bg-secondary);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-md);\n  color: var(--text-primary);\n  font-size: var(--text-sm);\n  cursor: pointer;\n  appearance: none;\n  background-image: url("data:image/svg+xml,...");\n  background-repeat: no-repeat;\n  background-position: right 12px center;\n}\n\n.select:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px var(--accent-blue-soft);\n}`
    },

    // ── 4. Checkbox ──
    {
      name: 'Checkbox',
      description: 'Custom checkboxes with checked and disabled states.',
      preview: `
        <label class="checkbox-wrapper"><input type="checkbox" class="checkbox"><span class="checkbox-label">Unchecked</span></label>
        <label class="checkbox-wrapper"><input type="checkbox" class="checkbox" checked><span class="checkbox-label">Checked</span></label>
        <label class="checkbox-wrapper"><input type="checkbox" class="checkbox" disabled><span class="checkbox-label">Disabled</span></label>
      `,
      html: `<label class="checkbox-wrapper">\n  <input type="checkbox" class="checkbox">\n  <span class="checkbox-label">Label</span>\n</label>`,
      css: `.checkbox-wrapper {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  cursor: pointer;\n}\n\n.checkbox {\n  appearance: none;\n  width: 18px;\n  height: 18px;\n  border: 2px solid var(--border-hover);\n  border-radius: var(--radius-xs);\n  cursor: pointer;\n  position: relative;\n  transition: all 0.15s ease;\n}\n\n.checkbox:checked {\n  background: var(--accent-blue);\n  border-color: var(--accent-blue);\n}\n\n.checkbox:checked::after {\n  content: '';\n  position: absolute;\n  left: 4px;\n  top: 1px;\n  width: 6px;\n  height: 10px;\n  border: solid #fff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}`
    },

    // ── 5. Switch / Toggle ──
    {
      name: 'Switch / Toggle',
      description: 'Toggle switches with on/off states.',
      preview: '',
      customInit(previewEl) {
        const create = (active, label) => {
          const wrapper = document.createElement('div');
          wrapper.style.cssText = 'display:flex;align-items:center;gap:12px;';
          const sw = document.createElement('div');
          sw.className = `switch${active ? ' active' : ''}`;
          sw.setAttribute('role', 'switch');
          sw.setAttribute('aria-checked', active);
          sw.setAttribute('tabindex', '0');
          sw.innerHTML = '<div class="switch-thumb"></div>';
          sw.addEventListener('click', () => {
            sw.classList.toggle('active');
            sw.setAttribute('aria-checked', sw.classList.contains('active'));
          });
          sw.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sw.click(); }
          });
          const lbl = document.createElement('span');
          lbl.style.cssText = 'font-size:var(--text-sm);color:var(--text-secondary);';
          lbl.textContent = label;
          wrapper.appendChild(sw);
          wrapper.appendChild(lbl);
          return wrapper;
        };
        previewEl.appendChild(create(false, 'Off'));
        previewEl.appendChild(create(true, 'On'));
      },
      html: `<div class="switch" role="switch" aria-checked="false" tabindex="0">\n  <div class="switch-thumb"></div>\n</div>`,
      css: `.switch {\n  position: relative;\n  width: 44px;\n  height: 24px;\n  border-radius: 9999px;\n  background: var(--bg-tertiary);\n  border: 1px solid var(--border);\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n\n.switch.active {\n  background: var(--accent-blue);\n  border-color: var(--accent-blue);\n}\n\n.switch-thumb {\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #fff;\n  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.switch.active .switch-thumb {\n  transform: translateX(20px);\n}`,
      js: `const switchEl = document.querySelector('.switch');\nswitchEl.addEventListener('click', () => {\n  const active = switchEl.classList.toggle('active');\n  switchEl.setAttribute('aria-checked', active);\n});`
    },

    // ── 6. Slider ──
    {
      name: 'Slider',
      description: 'Range input sliders with value display.',
      preview: '',
      customInit(previewEl) {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'width:260px;display:flex;flex-direction:column;gap:16px;';
        const label = document.createElement('div');
        label.className = 'control-label';
        label.innerHTML = '<span>Value</span><span class="control-value" id="slider-demo-val">50</span>';
        const range = document.createElement('input');
        range.type = 'range';
        range.className = 'range';
        range.min = 0;
        range.max = 100;
        range.value = 50;
        range.addEventListener('input', () => {
          document.getElementById('slider-demo-val').textContent = range.value;
        });
        wrapper.appendChild(label);
        wrapper.appendChild(range);
        previewEl.appendChild(wrapper);
      },
      html: `<div class="control-label">\n  <span>Value</span>\n  <span class="control-value" id="val">50</span>\n</div>\n<input type="range" class="range" min="0" max="100" value="50">`,
      css: `.range {\n  appearance: none;\n  width: 100%;\n  height: 6px;\n  background: var(--bg-tertiary);\n  border-radius: 9999px;\n  outline: none;\n  cursor: pointer;\n}\n\n.range::-webkit-slider-thumb {\n  appearance: none;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: var(--accent-blue);\n  border: 2px solid var(--bg-primary);\n  cursor: pointer;\n  box-shadow: 0 0 0 3px var(--accent-blue-soft);\n}`,
      js: `const range = document.querySelector('.range');\nconst valDisplay = document.getElementById('val');\nrange.addEventListener('input', (e) => {\n  valDisplay.textContent = e.target.value;\n});`
    },

    // ── 7. Badge ──
    {
      name: 'Badge',
      description: 'Inline status badges with semantic color variants.',
      preview: `
        <span class="badge badge-default">Default</span>
        <span class="badge badge-info">Info</span>
        <span class="badge badge-success">Success</span>
        <span class="badge badge-warning">Warning</span>
        <span class="badge badge-danger">Danger</span>
      `,
      html: `<span class="badge badge-default">Default</span>\n<span class="badge badge-info">Info</span>\n<span class="badge badge-success">Success</span>\n<span class="badge badge-warning">Warning</span>\n<span class="badge badge-danger">Danger</span>`,
      css: `.badge {\n  display: inline-flex;\n  align-items: center;\n  height: 22px;\n  padding: 0 var(--space-3);\n  font-size: 0.7rem;\n  font-weight: var(--weight-medium);\n  border-radius: var(--radius-full);\n}\n.badge-default { background: var(--surface); color: var(--text-secondary); border: 1px solid var(--border); }\n.badge-info { background: var(--accent-blue-soft); color: var(--accent-blue); }\n.badge-success { background: var(--accent-green-soft); color: var(--accent-green); }\n.badge-warning { background: var(--accent-yellow-soft); color: var(--accent-yellow); }\n.badge-danger { background: var(--accent-red-soft); color: var(--accent-red); }`
    },

    // ── 8. Tooltip ──
    {
      name: 'Tooltip',
      description: 'Directional tooltips triggered on hover.',
      preview: `
        <div class="tooltip-trigger">
          <button class="btn btn-secondary btn-sm">Top</button>
          <div class="tooltip tooltip-top">Top tooltip</div>
        </div>
        <div class="tooltip-trigger">
          <button class="btn btn-secondary btn-sm">Bottom</button>
          <div class="tooltip tooltip-bottom">Bottom tooltip</div>
        </div>
      `,
      html: `<div class="tooltip-trigger">\n  <button class="btn btn-secondary">Hover me</button>\n  <div class="tooltip tooltip-top">Top tooltip text</div>\n</div>`,
      css: `.tooltip-trigger {\n  position: relative;\n  display: inline-block;\n}\n\n.tooltip {\n  position: absolute;\n  padding: 6px 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: #fff;\n  background: var(--bg-tertiary);\n  border: 1px solid var(--border-hover);\n  border-radius: var(--radius-sm);\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.15s, transform 0.15s;\n  z-index: 1000;\n}\n\n.tooltip-top {\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%) translateY(4px);\n}\n\n.tooltip-trigger:hover .tooltip-top {\n  opacity: 1;\n  transform: translateX(-50%) translateY(0);\n}`
    },

    // ── 9. Toast ──
    {
      name: 'Toast',
      description: 'Notification toasts with auto-dismiss and type variants.',
      preview: '',
      customInit(previewEl) {
        ['info', 'success', 'warning', 'error'].forEach(type => {
          const btn = document.createElement('button');
          btn.className = 'btn btn-secondary btn-sm';
          btn.textContent = type.charAt(0).toUpperCase() + type.slice(1);
          btn.addEventListener('click', () => {
            FLX.toast.show({ title: type.charAt(0).toUpperCase() + type.slice(1), message: `This is a ${type} toast.`, type, duration: 3000 });
          });
          previewEl.appendChild(btn);
        });
      },
      html: `<div class="toast toast-success" role="alert">\n  <span class="toast-icon">✓</span>\n  <div class="toast-content">\n    <div class="toast-title">Success</div>\n    <div class="toast-message">Operation completed successfully.</div>\n  </div>\n  <button class="toast-close">✕</button>\n  <div class="toast-progress"></div>\n</div>`,
      css: `.toast {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  min-width: 320px;\n  padding: var(--space-4);\n  background: var(--surface-elevated);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-lg);\n  position: relative;\n  overflow: hidden;\n}\n\n.toast-progress {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 3px;\n  animation: barProgress linear forwards;\n}`,
      js: `// Trigger toast programmatically\nFLX.toast.show({\n  title: 'Success',\n  message: 'Saved successfully.',\n  type: 'success', // info | success | warning | error\n  duration: 4000\n});`
    },

    // ── 10. Modal ──
    {
      name: 'Modal',
      description: 'Accessible modal dialog with focus trap and backdrop dismiss.',
      preview: '',
      customInit(previewEl) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary btn-sm';
        btn.textContent = 'Open Modal';
        btn.addEventListener('click', () => {
          FLX.modal.show({
            title: 'Demo Modal',
            body: '<p style="color:var(--text-secondary);">This modal traps focus, closes on ESC and backdrop click.</p>',
            footer: '<button class="btn btn-ghost btn-sm" onclick="FLX.modal.close()">Cancel</button><button class="btn btn-primary btn-sm" onclick="FLX.modal.close()">OK</button>'
          });
        });
        previewEl.appendChild(btn);
      },
      html: `<div class="modal-backdrop" id="backdrop"></div>\n<div class="modal" id="modal" role="dialog" aria-modal="true">\n  <div class="modal-header">\n    <h3 class="modal-title">Modal Title</h3>\n    <button class="modal-close">✕</button>\n  </div>\n  <div class="modal-body"><p>Modal content goes here.</p></div>\n  <div class="modal-footer">\n    <button class="btn btn-ghost">Cancel</button>\n    <button class="btn btn-primary">Confirm</button>\n  </div>\n</div>`,
      css: `.modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.6);\n  backdrop-filter: blur(4px);\n  opacity: 0;\n  transition: opacity 0.25s ease;\n}\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0.95);\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-xl);\n  max-width: 480px;\n  opacity: 0;\n  transition: opacity 0.25s, transform 0.25s;\n}`,
      js: `// Open modal programmatically\nFLX.modal.show({\n  title: 'Modal Title',\n  body: '<p>Modal body HTML</p>',\n  footer: '<button onclick="FLX.modal.close()">Close</button>',\n  onClose: () => console.log('Closed')\n});`
    },

    // ── 11. Dropdown ──
    {
      name: 'Dropdown',
      description: 'Click-triggered dropdown menu with items and separators.',
      preview: '',
      customInit(previewEl) {
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        dropdown.innerHTML = `
          <button class="btn btn-secondary btn-sm dropdown-trigger">
            Options ${FLX.icon('chevronDown')}
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-item">${FLX.icon('copy')} Copy</div>
            <div class="dropdown-item">${FLX.icon('external')} Open</div>
            <div class="dropdown-separator"></div>
            <div class="dropdown-item" style="color:var(--accent-red);">${FLX.icon('x')} Delete</div>
          </div>
        `;
        dropdown.querySelector('.dropdown-trigger').addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('open');
        });
        document.addEventListener('click', () => dropdown.classList.remove('open'));
        dropdown.querySelectorAll('.dropdown-item').forEach(item => {
          item.addEventListener('click', () => dropdown.classList.remove('open'));
        });
        previewEl.appendChild(dropdown);
      },
      html: `<div class="dropdown">\n  <button class="btn btn-secondary dropdown-trigger">Options ▼</button>\n  <div class="dropdown-menu">\n    <div class="dropdown-item">Copy</div>\n    <div class="dropdown-item">Open</div>\n    <div class="dropdown-separator"></div>\n    <div class="dropdown-item">Delete</div>\n  </div>\n</div>`,
      css: `.dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n.dropdown-menu {\n  position: absolute;\n  top: calc(100% + 4px);\n  left: 0;\n  min-width: 180px;\n  background: var(--surface-elevated);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.15s, transform 0.15s;\n}\n\n.dropdown.open .dropdown-menu {\n  opacity: 1;\n  pointer-events: auto;\n}`,
      js: `const trigger = document.querySelector('.dropdown-trigger');\nconst dropdown = document.querySelector('.dropdown');\n\ntrigger.addEventListener('click', (e) => {\n  e.stopPropagation();\n  dropdown.classList.toggle('open');\n});\n\ndocument.addEventListener('click', () => {\n  dropdown.classList.remove('open');\n});`
    },

    // ── 12. Tabs ──
    {
      name: 'Tabs',
      description: 'Tab navigation with animated active indicator.',
      preview: '',
      customInit(previewEl) {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'width:100%;max-width:360px;';
        wrapper.innerHTML = `
          <div class="tabs" role="tablist">
            <button class="tab active" role="tab">Tab 1</button>
            <button class="tab" role="tab">Tab 2</button>
            <button class="tab" role="tab">Tab 3</button>
          </div>
          <div style="padding:16px 0;font-size:0.85rem;color:var(--text-secondary);">Tab content area</div>
        `;
        wrapper.querySelectorAll('.tab').forEach(tab => {
          tab.addEventListener('click', () => {
            wrapper.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
          });
        });
        previewEl.appendChild(wrapper);
      },
      html: `<div class="tabs" role="tablist">\n  <button class="tab active" role="tab" aria-selected="true">Tab 1</button>\n  <button class="tab" role="tab" aria-selected="false">Tab 2</button>\n  <button class="tab" role="tab" aria-selected="false">Tab 3</button>\n</div>`,
      css: `.tabs {\n  display: flex;\n  gap: var(--space-1);\n  border-bottom: 1px solid var(--border);\n}\n\n.tab {\n  font-size: var(--text-sm);\n  font-weight: 500;\n  color: var(--text-muted);\n  padding: var(--space-3) var(--space-4);\n  border-bottom: 2px solid transparent;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n\n.tab.active {\n  color: var(--text-primary);\n  border-bottom-color: var(--accent-red);\n}`,
      js: `document.querySelectorAll('.tab').forEach(tab => {\n  tab.addEventListener('click', () => {\n    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));\n    tab.classList.add('active');\n  });\n});`
    },

    // ── 13. Accordion ──
    {
      name: 'Accordion',
      description: 'Collapsible content sections with smooth animation.',
      preview: '',
      customInit(previewEl) {
        const acc = document.createElement('div');
        acc.className = 'accordion';
        acc.style.width = '100%';
        acc.style.maxWidth = '360px';
        const items = [{ t: 'Section 1', c: 'Content for section 1.' }, { t: 'Section 2', c: 'Content for section 2.' }];
        acc.innerHTML = items.map((item, i) => `
          <div class="accordion-item${i === 0 ? ' open' : ''}">
            <button class="accordion-trigger" aria-expanded="${i === 0}">${item.t} <span class="accordion-icon">${FLX.icon('chevronDown')}</span></button>
            <div class="accordion-content" style="max-height:${i === 0 ? '100px' : '0'};"><div class="accordion-body">${item.c}</div></div>
          </div>
        `).join('');
        acc.querySelectorAll('.accordion-trigger').forEach(trigger => {
          trigger.addEventListener('click', () => {
            const item = trigger.closest('.accordion-item');
            const isOpen = item.classList.contains('open');
            acc.querySelectorAll('.accordion-item').forEach(ai => {
              ai.classList.remove('open');
              ai.querySelector('.accordion-content').style.maxHeight = '0';
              ai.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
              item.classList.add('open');
              item.querySelector('.accordion-content').style.maxHeight = '100px';
              trigger.setAttribute('aria-expanded', 'true');
            }
          });
        });
        previewEl.appendChild(acc);
      },
      html: `<div class="accordion">\n  <div class="accordion-item open">\n    <button class="accordion-trigger" aria-expanded="true">\n      Title <span class="accordion-icon">▼</span>\n    </button>\n    <div class="accordion-content">\n      <div class="accordion-body">Content text</div>\n    </div>\n  </div>\n</div>`,
      css: `.accordion {\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n}\n\n.accordion-trigger {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  padding: 16px 20px;\n  cursor: pointer;\n}\n\n.accordion-content {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.25s ease-out;\n}`,
      js: `trigger.addEventListener('click', () => {\n  const item = trigger.closest('.accordion-item');\n  const isOpen = item.classList.contains('open');\n  item.classList.toggle('open');\n  const content = item.querySelector('.accordion-content');\n  content.style.maxHeight = isOpen ? '0' : content.scrollHeight + 'px';\n});`
    },

    // ── 14. Cards ──
    {
      name: 'Cards',
      description: 'Card containers with default and interactive hover variants.',
      preview: `
        <div class="card" style="width:200px;">
          <h4 style="font-size:0.9rem;margin-bottom:4px;">Default Card</h4>
          <p style="font-size:0.8rem;">Static container with border and radius.</p>
        </div>
        <div class="card card-interactive" style="width:200px;">
          <h4 style="font-size:0.9rem;margin-bottom:4px;">Interactive</h4>
          <p style="font-size:0.8rem;">Hover for lift + glow effect.</p>
        </div>
      `,
      html: `<div class="card">\n  <h4>Default Card</h4>\n  <p>Static container with border.</p>\n</div>\n\n<div class="card card-interactive">\n  <h4>Interactive Card</h4>\n  <p>Hover for lift + glow effect.</p>\n</div>`,
      css: `.card {\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  padding: var(--space-6);\n  transition: all 0.25s ease-out;\n}\n\n.card-interactive:hover {\n  transform: translateY(-2px);\n  border-color: var(--accent-red);\n  box-shadow: var(--shadow-lg), var(--shadow-glow-red);\n}`
    },

    // ── 15. Loaders ──
    {
      name: 'Loaders',
      description: 'Loading indicators: spinner, dots, bar, and skeleton.',
      preview: `
        <div class="loader-spinner"></div>
        <div class="loader-dots"><span class="loader-dot"></span><span class="loader-dot"></span><span class="loader-dot"></span></div>
        <div class="loader-bar"><div class="loader-bar-fill"></div></div>
        <div style="width:160px;"><div class="skeleton skeleton-text"></div><div class="skeleton skeleton-text" style="width:70%;"></div></div>
      `,
      html: `<!-- Spinner -->\n<div class="loader-spinner"></div>\n\n<!-- Dots -->\n<div class="loader-dots">\n  <span class="loader-dot"></span>\n  <span class="loader-dot"></span>\n  <span class="loader-dot"></span>\n</div>\n\n<!-- Bar -->\n<div class="loader-bar">\n  <div class="loader-bar-fill"></div>\n</div>\n\n<!-- Skeleton -->\n<div class="skeleton skeleton-text"></div>`,
      css: `/* Spinner */\n.loader-spinner {\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--border);\n  border-top-color: var(--accent-blue);\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n\n/* Dots */\n.loader-dot {\n  width: 8px;\n  height: 8px;\n  background: var(--accent-blue);\n  border-radius: 50%;\n  animation: dotPulse 1.4s ease-in-out infinite;\n}\n\n/* Skeleton */\n.skeleton {\n  background: linear-gradient(90deg, var(--surface) 25%, var(--surface-hover) 50%, var(--surface) 75%);\n  background-size: 200% 100%;\n  animation: skeletonWave 1.5s ease-in-out infinite;\n}`
    },

    // ── 16. Progress ──
    {
      name: 'Progress',
      description: 'Progress bar with gradient fill and animated transitions.',
      preview: '',
      customInit(previewEl) {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'width:260px;display:flex;flex-direction:column;gap:16px;';
        [25, 50, 75, 100].forEach(val => {
          const bar = document.createElement('div');
          bar.className = 'progress';
          bar.innerHTML = `<div class="progress-fill" style="width:${val}%;"></div>`;
          const label = document.createElement('span');
          label.style.cssText = 'font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);';
          label.textContent = `${val}%`;
          wrapper.appendChild(label);
          wrapper.appendChild(bar);
        });
        previewEl.appendChild(wrapper);
      },
      html: `<div class="progress">\n  <div class="progress-fill" style="width: 75%;"></div>\n</div>`,
      css: `.progress {\n  width: 100%;\n  height: 6px;\n  background: var(--bg-tertiary);\n  border-radius: 9999px;\n  overflow: hidden;\n}\n\n.progress-fill {\n  height: 100%;\n  background: var(--gradient-primary);\n  border-radius: 9999px;\n  transition: width 0.4s ease-out;\n}`
    },
,
    // ── 9. Accordion ──
    {
      name: 'Accordion',
      description: 'Collapsible content sections.',
      preview: `
        <div class="accordion" style="width: 100%;">
          <div class="accordion-item" style="border: 1px solid var(--border); border-radius: var(--radius-md); margin-bottom: 8px;">
            <div class="accordion-header" style="padding: 12px 16px; cursor: pointer; font-weight: bold; display: flex; justify-content: space-between;">Item 1 <span>+</span></div>
          </div>
          <div class="accordion-item" style="border: 1px solid var(--border); border-radius: var(--radius-md);">
            <div class="accordion-header" style="padding: 12px 16px; cursor: pointer; font-weight: bold; display: flex; justify-content: space-between;">Item 2 <span>+</span></div>
          </div>
        </div>
      `,
      html: `<div class="accordion">\n  <div class="accordion-item">\n    <button class="accordion-header">Title</button>\n    <div class="accordion-content">Content here</div>\n  </div>\n</div>`,
      css: `.accordion-item { border: 1px solid var(--border); margin-bottom: 8px; border-radius: 8px; overflow: hidden; }\n.accordion-header { padding: 16px; width: 100%; text-align: left; background: var(--surface); border: none; cursor: pointer; font-weight: 500; }\n.accordion-content { padding: 0 16px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }\n.accordion-item.active .accordion-content { padding: 16px; max-height: 200px; }`,
      js: `document.querySelectorAll('.accordion-header').forEach(btn => {\n  btn.addEventListener('click', () => {\n    btn.parentElement.classList.toggle('active');\n  });\n});`
    },

    // ── 10. Badges ──
    {
      name: 'Badges',
      description: 'Small status tags or chips.',
      preview: `
        <span class="badge badge-primary">Primary</span>
        <span class="badge badge-secondary">Secondary</span>
        <span class="badge badge-success">Success</span>
        <span class="badge badge-danger">Danger</span>
      `,
      html: `<span class="badge badge-primary">Primary</span>\n<span class="badge badge-success">Success</span>`,
      css: `.badge { display: inline-flex; align-items: center; padding: 4px 8px; font-size: 0.75rem; font-weight: 600; border-radius: 9999px; }\n.badge-primary { background: var(--accent-blue-soft); color: var(--accent-blue); }\n.badge-secondary { background: var(--surface-hover); color: var(--text-secondary); }\n.badge-success { background: rgba(34, 197, 94, 0.2); color: #22c55e; }\n.badge-danger { background: rgba(239, 68, 68, 0.2); color: #ef4444; }`
    },

    // ── 11. Avatar Group ──
    {
      name: 'Avatar Group',
      description: 'Overlapping user profile images.',
      preview: `
        <div class="avatar-group" style="display: flex;">
          <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; background: #e53e6b; border: 2px solid var(--bg); margin-left: -10px; z-index: 3;"></div>
          <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; background: #3b82f6; border: 2px solid var(--bg); margin-left: -10px; z-index: 2;"></div>
          <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; background: #8b5cf6; border: 2px solid var(--bg); margin-left: -10px; z-index: 1;"></div>
        </div>
      `,
      html: `<div class="avatar-group">\n  <img src="img1.jpg" class="avatar">\n  <img src="img2.jpg" class="avatar">\n  <img src="img3.jpg" class="avatar">\n</div>`,
      css: `.avatar-group { display: flex; padding-left: 10px; }\n.avatar { width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--bg); margin-left: -10px; object-fit: cover; }\n.avatar:hover { z-index: 10; transform: translateY(-2px); transition: transform 0.2s; }`
    },

    // ── 12. Progress Bar ──
    {
      name: 'Progress Bar',
      description: 'Linear progress indicators.',
      preview: `
        <div style="width: 100%; max-width: 300px;">
          <div class="progress" style="width: 100%; height: 8px; background: var(--surface-hover); border-radius: 4px; overflow: hidden; margin-bottom: 12px;">
            <div class="progress-bar" style="width: 65%; height: 100%; background: var(--gradient-primary);"></div>
          </div>
          <div class="progress" style="width: 100%; height: 8px; background: var(--surface-hover); border-radius: 4px; overflow: hidden;">
            <div class="progress-bar" style="width: 30%; height: 100%; background: var(--accent-red);"></div>
          </div>
        </div>
      `,
      html: `<div class="progress">\n  <div class="progress-bar" style="width: 65%"></div>\n</div>`,
      css: `.progress { width: 100%; height: 8px; background: var(--surface-hover); border-radius: 4px; overflow: hidden; }\n.progress-bar { height: 100%; background: var(--gradient-primary); transition: width 0.3s ease; }`
    },

    // ── 13. Pagination ──
    {
      name: 'Pagination',
      description: 'Page navigation controls.',
      preview: `
        <div class="pagination" style="display: flex; gap: 4px;">
          <button class="btn btn-ghost btn-sm" disabled>&lt;</button>
          <button class="btn btn-primary btn-sm">1</button>
          <button class="btn btn-ghost btn-sm">2</button>
          <button class="btn btn-ghost btn-sm">3</button>
          <button class="btn btn-ghost btn-sm">&gt;</button>
        </div>
      `,
      html: `<nav class="pagination">\n  <button class="page-btn" disabled>Prev</button>\n  <button class="page-btn active">1</button>\n  <button class="page-btn">2</button>\n  <button class="page-btn">3</button>\n  <button class="page-btn">Next</button>\n</nav>`,
      css: `.pagination { display: flex; gap: 4px; }\n.page-btn { padding: 4px 12px; border: 1px solid transparent; background: transparent; color: var(--text-primary); border-radius: 6px; cursor: pointer; }\n.page-btn:hover { background: var(--surface-hover); }\n.page-btn.active { background: var(--accent-blue); color: white; }\n.page-btn:disabled { opacity: 0.5; cursor: not-allowed; }`
    },

    // ── 14. Breadcrumbs ──
    {
      name: 'Breadcrumbs',
      description: 'Navigation path.',
      preview: `
        <div class="breadcrumbs" style="display: flex; gap: 8px; font-size: 0.875rem; color: var(--text-secondary);">
          <span>Home</span> <span>/</span>
          <span>Library</span> <span>/</span>
          <span style="color: var(--text-primary);">Data</span>
        </div>
      `,
      html: `<nav class="breadcrumbs">\n  <a href="#">Home</a>\n  <span class="separator">/</span>\n  <a href="#">Library</a>\n  <span class="separator">/</span>\n  <span class="current">Data</span>\n</nav>`,
      css: `.breadcrumbs { display: flex; align-items: center; gap: 8px; font-size: 0.875rem; color: var(--text-secondary); }\n.breadcrumbs a { color: inherit; text-decoration: none; transition: color 0.2s; }\n.breadcrumbs a:hover { color: var(--accent-blue); }\n.breadcrumbs .current { color: var(--text-primary); font-weight: 500; }`
    },

    // ── 15. Toast Notification ──
    {
      name: 'Toast Notification',
      description: 'Floating alert messages.',
      preview: `
        <div class="toast" style="padding: 12px 20px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 12px;">
          <span style="color: #22c55e;">✓</span>
          <span style="font-size: 0.875rem;">Action completed successfully.</span>
        </div>
      `,
      html: `<div class="toast show">\n  <span class="toast-icon">✓</span>\n  <span class="toast-msg">Successfully saved!</span>\n</div>`,
      css: `.toast { position: fixed; bottom: 20px; right: 20px; padding: 12px 24px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 12px; transform: translateY(100px); opacity: 0; transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); }\n.toast.show { transform: translateY(0); opacity: 1; }`
    },

    // ── 16. Tabs ──
    {
      name: 'Tabs',
      description: 'Horizontal tabbed navigation.',
      preview: `
        <div class="tabs" style="display: flex; border-bottom: 1px solid var(--border); gap: 16px;">
          <div style="padding: 8px 4px; color: var(--text-primary); border-bottom: 2px solid var(--accent-blue); font-weight: 500;">Tab 1</div>
          <div style="padding: 8px 4px; color: var(--text-secondary);">Tab 2</div>
          <div style="padding: 8px 4px; color: var(--text-secondary);">Tab 3</div>
        </div>
      `,
      html: `<div class="tabs">\n  <button class="tab active">Profile</button>\n  <button class="tab">Settings</button>\n  <button class="tab">Messages</button>\n</div>`,
      css: `.tabs { display: flex; border-bottom: 1px solid var(--border); gap: 16px; }\n.tab { padding: 8px 4px; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }\n.tab:hover { color: var(--text-primary); }\n.tab.active { color: var(--text-primary); border-bottom-color: var(--accent-blue); font-weight: 500; }`
    }
  ];

  const compDict = {
    'Buttons': { name: 'Butonlar', desc: 'Primary, secondary, ghost, danger, icon, loading ve boyut varyasyonları.' },
    'Inputs': { name: 'Girdi Alanları', desc: 'Odaklanma, hata ve devre dışı durumlu metin girdileri.' },
    'Select': { name: 'Seçim Menüsü', desc: 'Özel stillendirilmiş açılır seçim menüleri.' },
    'Checkbox': { name: 'Onay Kutusu', desc: 'İşaretli ve devre dışı durumlu özel onay kutuları.' },
    'Switch / Toggle': { name: 'Anahtar / Toggle', desc: 'Açık/kapalı durumlu geçiş anahtarları.' },
    'Slider': { name: 'Kaydırıcı', desc: 'Canlı değer göstergeli aralık kaydırıcıları.' },
    'Badge': { name: 'Rozet', desc: 'Semantik renk varyasyonlarına sahip durum rozetleri.' },
    'Tooltip': { name: 'Bilgi Balonu', desc: 'Üzerine gelindiğinde tetiklenen yönlü bilgi balonları.' },
    'Toast': { name: 'Bildirim Toast', desc: 'Otomatik kapanan ve tür varyasyonlu bildirim mesajları.' },
    'Modal': { name: 'Diyalog Modal', desc: 'Odak hapsetme ve arka plan kapatma destekli erişilebilir diyalog penceresi.' },
    'Dropdown': { name: 'Açılır Menü', desc: 'Öğeler ve ayraçlar içeren tıklama tetiklemeli açılır menü.' },
    'Tabs': { name: 'Sekmeler', desc: 'Animasyonlu aktif göstergeli sekme navigasyonu.' },
    'Accordion': { name: 'Akordiyon', desc: 'Akıcı animasyonlu daralan/genişleyen içerik bölümleri.' },
    'Cards': { name: 'Kartlar', desc: 'Varsayılan ve hover kaldırma varyasyonlu kart kapsayıcıları.' },
    'Loaders': { name: 'Yükleyiciler', desc: 'Yükleme göstergeleri: spinner, noktalar, çubuk ve iskelet.' },
    'Progress': { name: 'İlerleme Çubuğu', desc: 'Gradient dolgulu ve animasyonlu ilerleme çubuğu.' }
,
    'Badges': { name: 'Rozetler', desc: 'Küçük durum etiketleri veya çipler.' },
    'Avatar Group': { name: 'Avatar Grubu', desc: 'Üst üste binen kullanıcı profil resimleri.' },
    'Progress Bar': { name: 'İlerleme Çubuğu (Doğrusal)', desc: 'Doğrusal ilerleme göstergeleri.' },
    'Pagination': { name: 'Sayfalama', desc: 'Sayfa gezinme kontrolleri.' },
    'Breadcrumbs': { name: 'Gezinme Yolu', desc: 'Sayfa hiyerarşisi navigasyonu.' },
    'Toast Notification': { name: 'Toast Bildirim', desc: 'Yüzen uyarı mesajları.' }
  };

  /* ── Render Component Section ── */
  function render() {
    container.innerHTML = '';
    const isTR = window.FLX && FLX.i18n && FLX.i18n.getCurrentLang() === 'tr';

    components.forEach((comp, index) => {
      const section = document.createElement('div');
      section.className = 'component-section reveal';
      section.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;

      const compName = (isTR && compDict[comp.name]) ? compDict[comp.name].name : comp.name;
      const compDesc = (isTR && compDict[comp.name]) ? compDict[comp.name].desc : comp.description;
      const viewCodeLabel = isTR ? 'Kodu Gör' : 'View Code';
      const copyLabel = isTR ? 'Kopyala' : 'Copy';

      const codeId = `comp-code-${index}`;

      section.innerHTML = `
        <div class="component-section-header">
          <div>
            <h3 class="component-section-title">${compName}</h3>
            <p class="component-section-desc">${compDesc}</p>
          </div>
        </div>
        <div class="component-preview" id="comp-preview-${index}">
          ${comp.preview || ''}
        </div>
        <div class="component-code-wrapper">
          <button class="component-code-toggle" aria-expanded="false" data-target="${codeId}">
            <span>${FLX.icon('code')} ${viewCodeLabel}</span>
            <span style="display:flex;align-items:center;gap:8px;">
              <button class="btn btn-ghost btn-sm copy-btn" onclick="event.stopPropagation();" data-code-id="${codeId}">
                ${FLX.icon('copy')} ${copyLabel}
              </button>
            </span>
          </button>
          <div class="component-code-content" id="${codeId}">
            <!-- Code Tabs -->
            <div class="experiment-code-header" style="border-bottom:1px solid var(--border);padding:8px 16px;background:var(--surface-hover);">
              <div class="experiment-code-tabs" id="${codeId}-tabs">
                <span class="experiment-code-tab active" data-tab="html" data-target="${codeId}">HTML</span>
                <span class="experiment-code-tab" data-tab="css" data-target="${codeId}">CSS</span>
                ${comp.js ? `<span class="experiment-code-tab" data-tab="js" data-target="${codeId}">JS</span>` : ''}
              </div>
            </div>
            <pre><code id="${codeId}-content">${FLX.escapeHtml(comp.html)}</code></pre>
          </div>
        </div>
      `;

      container.appendChild(section);

      // Store code snippets on element for easy tab switching & copying
      const codeWrapper = section.querySelector('.component-code-wrapper');
      codeWrapper._codeData = {
        html: comp.html,
        css: comp.css,
        js: comp.js || '',
        activeTab: 'html'
      };

      // Custom preview init
      if (comp.customInit) {
        const previewEl = section.querySelector(`#comp-preview-${index}`);
        comp.customInit(previewEl);
      }

      // Code toggle open/close
      section.querySelector('.component-code-toggle').addEventListener('click', function(e) {
        if (e.target.closest('.copy-btn')) return;
        const content = document.getElementById(this.getAttribute('data-target'));
        const expanded = content.classList.toggle('open');
        this.setAttribute('aria-expanded', expanded);
      });

      // Tab switcher
      section.querySelectorAll('.experiment-code-tab').forEach(tabBtn => {
        tabBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetId = tabBtn.getAttribute('data-target');
          const tabType = tabBtn.getAttribute('data-tab');
          const wrapper = tabBtn.closest('.component-code-wrapper');

          wrapper._codeData.activeTab = tabType;

          // Update tab active classes
          wrapper.querySelectorAll('.experiment-code-tab').forEach(t => t.classList.remove('active'));
          tabBtn.classList.add('active');

          // Update code content
          const codeEl = document.getElementById(`${targetId}-content`);
          const codeText = wrapper._codeData[tabType];
          codeEl.textContent = codeText;
        });
      });

      // Copy button handler
      section.querySelector('.copy-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const wrapper = section.querySelector('.component-code-wrapper');
        const activeTab = wrapper._codeData.activeTab;
        const codeText = wrapper._codeData[activeTab];
        FLX.copyToClipboard(codeText);
      });
    });

    // Init scroll reveal
    setTimeout(() => FLX.initScrollReveal(), 100);
  }

  FLX.componentsGallery = { init: render };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
