/* ==========================================================================
   FLOREX.LAB — Playground Tools
   Six interactive CSS generators with real-time preview and copyable output
   ========================================================================== */

(function() {
  'use strict';

  const container = document.getElementById('playground-tools');
  if (!container) return;

  const tools = [
    // ── Gradient Generator ──
    {
      name: 'Gradient Generator',
      description: 'Create multi-stop CSS gradients with live preview.',
      controls: [
        { key: 'color1', label: 'Color 1', type: 'color', default: '#e53e6b' },
        { key: 'color2', label: 'Color 2', type: 'color', default: '#3b82f6' },
        { key: 'color3', label: 'Color 3', type: 'color', default: '#8b5cf6' },
        { key: 'angle', label: 'Angle', type: 'range', min: 0, max: 360, default: 135, unit: '°' },
        { key: 'type', label: 'Type', type: 'select', options: ['linear-gradient', 'radial-gradient', 'conic-gradient'], default: 'linear-gradient' },
      ],
      render(previewEl, state) {
        const { color1, color2, color3, angle, type } = state;
        let bg;
        if (type === 'linear-gradient') bg = `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;
        else if (type === 'radial-gradient') bg = `radial-gradient(circle, ${color1}, ${color2}, ${color3})`;
        else bg = `conic-gradient(from ${angle}deg, ${color1}, ${color2}, ${color3}, ${color1})`;
        previewEl.style.background = bg;
        previewEl.style.borderRadius = '12px';
        return `background: ${bg};`;
      }
    },

    // ── Shadow Generator ──
    {
      name: 'Shadow Generator',
      description: 'Design CSS box-shadow with visual controls.',
      controls: [
        { key: 'x', label: 'X Offset', type: 'range', min: -50, max: 50, default: 0, unit: 'px' },
        { key: 'y', label: 'Y Offset', type: 'range', min: -50, max: 50, default: 12, unit: 'px' },
        { key: 'blur', label: 'Blur', type: 'range', min: 0, max: 100, default: 40, unit: 'px' },
        { key: 'spread', label: 'Spread', type: 'range', min: -30, max: 30, default: -5, unit: 'px' },
        { key: 'color', label: 'Color', type: 'color', default: '#000000' },
        { key: 'opacity', label: 'Opacity', type: 'range', min: 0, max: 100, default: 30, unit: '%' },
      ],
      render(previewEl, state) {
        const { x, y, blur, spread, color, opacity } = state;
        const rgb = FLX.hexToRgb(color);
        const shadow = `${x}px ${y}px ${blur}px ${spread}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(opacity / 100).toFixed(2)})`;
        previewEl.innerHTML = `
          <div style="width:100%;height:100%;min-height:180px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, #fbf1c7 0%, #ebdbb2 100%);border-radius:var(--radius-md);border:1px solid rgba(0,0,0,0.1);padding:var(--space-6);">
            <div style="width:140px;height:100px;background:#ffffff;border-radius:12px;box-shadow:${shadow};transition:box-shadow 0.15s ease;"></div>
          </div>
        `;
        return `box-shadow: ${shadow};`;
      }
    },

    // ── Border Radius ──
    {
      name: 'Border Radius',
      description: 'Fine-tune individual corner radius values.',
      controls: [
        { key: 'tl', label: 'Top Left', type: 'range', min: 0, max: 100, default: 16, unit: 'px' },
        { key: 'tr', label: 'Top Right', type: 'range', min: 0, max: 100, default: 16, unit: 'px' },
        { key: 'br', label: 'Bottom Right', type: 'range', min: 0, max: 100, default: 16, unit: 'px' },
        { key: 'bl', label: 'Bottom Left', type: 'range', min: 0, max: 100, default: 16, unit: 'px' },
      ],
      render(previewEl, state) {
        const { tl, tr, br, bl } = state;
        const radius = `${tl}px ${tr}px ${br}px ${bl}px`;
        previewEl.innerHTML = `<div style="width:140px;height:140px;background:var(--gradient-primary);border-radius:${radius};transition:border-radius 0.3s ease;"></div>`;
        return `border-radius: ${radius};`;
      }
    },

    // ── Glass Effect ──
    {
      name: 'Glass Effect',
      description: 'Generate glassmorphism CSS with blur and transparency.',
      controls: [
        { key: 'blur', label: 'Blur', type: 'range', min: 0, max: 40, default: 16, unit: 'px' },
        { key: 'opacity', label: 'Opacity', type: 'range', min: 0, max: 100, default: 15, unit: '%' },
        { key: 'border', label: 'Border Opacity', type: 'range', min: 0, max: 50, default: 20, unit: '%' },
        { key: 'tint', label: 'Tint', type: 'color', default: '#ffffff' },
      ],
      render(previewEl, state) {
        const { blur, opacity, border, tint } = state;
        const rgb = FLX.hexToRgb(tint);
        const bg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(opacity / 100).toFixed(2)})`;
        const borderVal = `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(border / 100).toFixed(2)})`;
        previewEl.style.background = 'linear-gradient(135deg, #e53e6b, #3b82f6, #8b5cf6)';
        previewEl.style.borderRadius = '12px';
        previewEl.innerHTML = `<div style="width:200px;padding:24px;background:${bg};backdrop-filter:blur(${blur}px);-webkit-backdrop-filter:blur(${blur}px);border:${borderVal};border-radius:12px;color:#fff;text-align:center;">
          <div style="font-weight:600;font-size:0.9rem;margin-bottom:4px;">Glass Card</div>
          <div style="font-size:0.75rem;opacity:0.8;">Glassmorphism effect</div>
        </div>`;
        return `background: ${bg};\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: ${borderVal};\nborder-radius: 12px;`;
      }
    },

    // ── Color Playground ──
    {
      name: 'Color Playground',
      description: 'Pick colors and convert between HEX, RGB, and HSL.',
      controls: [
        { key: 'color', label: 'Color', type: 'color', default: '#e53e6b' },
      ],
      render(previewEl, state) {
        const hex = state.color;
        const rgb = FLX.hexToRgb(hex);
        const hsl = FLX.hexToHsl(hex);
        previewEl.innerHTML = `
          <div style="text-align:center;">
            <div style="width:100px;height:100px;background:${hex};border-radius:16px;margin:0 auto 16px;border:2px solid var(--border);"></div>
            <div style="display:flex;flex-direction:column;gap:6px;font-family:var(--font-mono);font-size:0.75rem;color:var(--text-secondary);">
              <span style="cursor:pointer;" onclick="FLX.copyToClipboard('${hex}')">HEX: ${hex}</span>
              <span style="cursor:pointer;" onclick="FLX.copyToClipboard('rgb(${rgb.r}, ${rgb.g}, ${rgb.b})')">RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</span>
              <span style="cursor:pointer;" onclick="FLX.copyToClipboard('hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)')">HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</span>
            </div>
          </div>
        `;
        return `/* ${hex} */\ncolor: ${hex};\ncolor: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});\ncolor: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);`;
      }
    },

    // ── Animation Playground ──
    {
      name: 'Animation Playground',
      description: 'Experiment with CSS animation keyframes, timing curves, and duration.',
      controls: [
        { key: 'animation', label: 'Animation Type', type: 'select', options: ['fadeInUp', 'fadeInDown', 'scaleIn', 'slideInRight', 'slideInLeft', 'spin', 'float', 'glitch', 'glowPulse'], default: 'fadeInUp' },
        { key: 'duration', label: 'Duration', type: 'range', min: 0.1, max: 5, default: 1, step: 0.1, unit: 's' },
        { key: 'easing', label: 'Easing', type: 'select', options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'cubic-bezier(0.16,1,0.3,1)', 'cubic-bezier(0.34,1.56,0.64,1)'], default: 'ease-out' },
        { key: 'delay', label: 'Delay', type: 'range', min: 0, max: 2, default: 0, step: 0.1, unit: 's' },
        { key: 'iterations', label: 'Iterations', type: 'range', min: 1, max: 10, default: 1 },
      ],
      render(previewEl, state) {
        const { animation, duration, easing, delay, iterations } = state;
        const iterVal = iterations === 10 ? 'infinite' : iterations;
        const animValue = `${animation} ${duration}s ${easing} ${delay}s ${iterVal} both`;
        previewEl.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;">
            <div id="anim-demo-box" style="width:80px;height:80px;background:var(--gradient-primary);border-radius:16px;animation:${animValue};"></div>
            <button class="btn btn-ghost btn-sm" onclick="const el=document.getElementById('anim-demo-box');el.style.animation='none';el.offsetHeight;el.style.animation='${animValue}';">
              ${FLX.icon('refresh')} Replay
            </button>
          </div>
        `;
        return `animation: ${animation} ${duration}s ${easing} ${delay}s ${iterVal};\n\n/* Keyframe animation: ${animation} */`;
      }
    },
  ];

  const toolDict = {
    'Gradient Generator': { name: 'Gradyan Jeneratörü', desc: 'Canlı önizleme ile çok duraklı CSS gradyanları oluşturun.' },
    'Shadow Generator': { name: 'Gölge Jeneratörü', desc: 'Görsel kontrollerle CSS box-shadow tasarlayın.' },
    'Border Radius': { name: 'Kenar Yuvarlama', desc: 'Köşe yarıçapı değerlerini ayrı ayrı hassaslaştırın.' },
    'Glass Effect': { name: 'Cam Efekti', desc: 'Bulanıklık ve saydamlık ile glassmorphism CSS\'i üretin.' },
    'Color Playground': { name: 'Renk Dönüştürücü', desc: 'Renkleri seçin ve HEX, RGB, HSL arasında dönüştürün.' },
    'Animation Playground': { name: 'Animasyon Alanı', desc: 'CSS animasyon timing ve easing eğrileriyle deney yapın.' }
  };

  /* ── Render All Tools ── */
  function render() {
    container.innerHTML = '';
    const isTR = window.FLX && FLX.i18n && FLX.i18n.getCurrentLang() === 'tr';

    tools.forEach((tool, index) => {
      const state = {};
      tool.controls.forEach(c => { state[c.key] = c.default; });

      const toolEl = document.createElement('div');
      toolEl.className = 'playground-tool reveal';
      toolEl.style.transitionDelay = `${Math.min(index * 80, 400)}ms`;

      const toolName = (isTR && toolDict[tool.name]) ? toolDict[tool.name].name : tool.name;
      const toolDesc = (isTR && toolDict[tool.name]) ? toolDict[tool.name].desc : tool.description;
      const copyLabel = isTR ? 'Kopyala' : 'Copy';

      const previewId = `pg-preview-${index}`;
      const outputId = `pg-output-${index}`;

      toolEl.innerHTML = `
        <div class="playground-tool-header">
          <h3 class="playground-tool-title">${toolName}</h3>
          <p class="playground-tool-desc">${toolDesc}</p>
        </div>
        <div class="playground-tool-preview" id="${previewId}"></div>
        <div class="playground-tool-controls" id="pg-controls-${index}"></div>
        <div class="playground-tool-output">
          <code class="playground-tool-code" id="${outputId}"></code>
          <button class="btn btn-ghost btn-sm" onclick="FLX.copyToClipboard(document.getElementById('${outputId}').textContent)">
            ${FLX.icon('copy')} ${copyLabel}
          </button>
        </div>
      `;

      container.appendChild(toolEl);

      // Render controls
      const controlsEl = toolEl.querySelector(`#pg-controls-${index}`);
      tool.controls.forEach(ctrl => {
        const group = document.createElement('div');
        group.className = 'control-group';

        if (ctrl.type === 'range') {
          group.innerHTML = `
            <div class="control-label">
              <span>${ctrl.label}</span>
              <span class="control-value" id="pg-val-${index}-${ctrl.key}">${state[ctrl.key]}${ctrl.unit || ''}</span>
            </div>
            <input type="range" class="range" min="${ctrl.min}" max="${ctrl.max}" value="${state[ctrl.key]}" step="${ctrl.step || 1}">
          `;
          controlsEl.appendChild(group);
          group.querySelector('input').addEventListener('input', (e) => {
            state[ctrl.key] = parseFloat(e.target.value);
            document.getElementById(`pg-val-${index}-${ctrl.key}`).textContent = `${state[ctrl.key]}${ctrl.unit || ''}`;
            updateTool(tool, previewId, outputId, state);
          });
        } else if (ctrl.type === 'color') {
          group.innerHTML = `
            <div class="control-label"><span>${ctrl.label}</span></div>
            <div class="color-input">
              <input type="color" value="${state[ctrl.key]}">
              <span class="color-input-hex" id="pg-val-${index}-${ctrl.key}">${state[ctrl.key]}</span>
            </div>
          `;
          controlsEl.appendChild(group);
          group.querySelector('input').addEventListener('input', (e) => {
            state[ctrl.key] = e.target.value;
            document.getElementById(`pg-val-${index}-${ctrl.key}`).textContent = e.target.value;
            updateTool(tool, previewId, outputId, state);
          });
        } else if (ctrl.type === 'select') {
          group.innerHTML = `
            <div class="control-label"><span>${ctrl.label}</span></div>
            <select class="select">
              ${ctrl.options.map(o => `<option value="${o}" ${state[ctrl.key] === o ? 'selected' : ''}>${o}</option>`).join('')}
            </select>
          `;
          controlsEl.appendChild(group);
          group.querySelector('select').addEventListener('change', (e) => {
            state[ctrl.key] = e.target.value;
            updateTool(tool, previewId, outputId, state);
          });
        }
      });

      // Initial render
      updateTool(tool, previewId, outputId, state);
    });

    setTimeout(() => FLX.initScrollReveal(), 100);
  }

  function updateTool(tool, previewId, outputId, state) {
    const previewEl = document.getElementById(previewId);
    const outputEl = document.getElementById(outputId);
    if (previewEl && outputEl) {
      const code = tool.render(previewEl, state);
      outputEl.textContent = code;
    }
  }

  FLX.playground = { init: render };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
