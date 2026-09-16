/* florex lab canli kod editoru html css js canli onizleme konsol ciktisi sablonlar */

(function () {
  'use strict';

  /* durum */
  let activeTab = 'html';
  let layoutMode = 'horizontal'; // horizontal | vertical
  let autoRun = true;
  let runTimer = null;
  const RUN_DELAY = 400;

  /* varsayilan kod */
  const defaultCode = {
    html: `<div class="demo-container">
  <h1 class="demo-title">Merhaba Dünya! 👋</h1>
  <p class="demo-text">Kodunu yaz, anında gör.</p>
  <button class="demo-btn" onclick="animateBtn(this)">
    Tıkla Beni
  </button>
</div>`,
    css: `.demo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e1d 0%, #2d1f3d 100%);
  font-family: 'Inter', sans-serif;
  color: #fbf1c7;
}

.demo-title {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ea4335, #ff7a29, #ffc13b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.demo-text {
  font-size: 1.1rem;
  color: #d5c4a1;
  margin-bottom: 2rem;
}

.demo-btn {
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #ea4335, #ff7a29);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(234, 67, 53, 0.4);
}`,
    js: `function animateBtn(btn) {
  btn.style.transform = 'scale(0.95)';
  btn.textContent = '🎉 Harika!';

  setTimeout(() => {
    btn.style.transform = '';
    btn.textContent = 'Tıkla Beni';
  }, 1000);

  console.log('Butona tıklandı!');
}`
  };

  /* sablonlar */
  const templates = [
    {
      id: 'blank',
      name: { tr: 'Boş Sayfa', en: 'Blank Page' },
      icon: 'file',
      html: '',
      css: 'body {\n  margin: 0;\n  font-family: sans-serif;\n}',
      js: ''
    },
    {
      id: 'hello',
      name: { tr: 'Merhaba Dünya', en: 'Hello World' },
      icon: 'zap',
      html: defaultCode.html,
      css: defaultCode.css,
      js: defaultCode.js
    },
    {
      id: 'flex-layout',
      name: { tr: 'Flexbox Düzeni', en: 'Flexbox Layout' },
      icon: 'layout',
      html: `<div class="flex-container">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>
  <div class="flex-item">4</div>
</div>`,
      css: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #1e1e1d;
}

.flex-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 24px;
}

.flex-item {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fbf1c7;
  font-family: 'Inter', sans-serif;
  transition: transform 0.3s;
  cursor: pointer;
}

.flex-item:nth-child(1) { background: #ea4335; }
.flex-item:nth-child(2) { background: #ff7a29; }
.flex-item:nth-child(3) { background: #ffc13b; color: #1e1e1d; }
.flex-item:nth-child(4) { background: #8bc386; color: #1e1e1d; }

.flex-item:hover {
  transform: scale(1.1) rotate(3deg);
}`,
      js: `document.querySelectorAll('.flex-item').forEach(item => {
  item.addEventListener('click', () => {
    item.style.borderRadius = item.style.borderRadius === '50%' ? '12px' : '50%';
  });
});`
    },
    {
      id: 'animation',
      name: { tr: 'CSS Animasyonu', en: 'CSS Animation' },
      icon: 'play',
      html: `<div class="scene">
  <div class="cube">
    <div class="face front">F</div>
    <div class="face back">B</div>
    <div class="face left">L</div>
    <div class="face right">R</div>
    <div class="face top">T</div>
    <div class="face bottom">Bo</div>
  </div>
</div>`,
      css: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #161615;
  perspective: 600px;
}

.scene {
  width: 120px;
  height: 120px;
  perspective: 600px;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: spin 6s linear infinite;
}

.face {
  position: absolute;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fbf1c7;
  border: 2px solid rgba(251,241,199,0.2);
  border-radius: 8px;
}

.front  { background: rgba(234,67,53,0.85);  transform: translateZ(60px); }
.back   { background: rgba(133,178,165,0.85); transform: rotateY(180deg) translateZ(60px); }
.left   { background: rgba(255,122,41,0.85);  transform: rotateY(-90deg) translateZ(60px); }
.right  { background: rgba(181,196,55,0.85);  transform: rotateY(90deg) translateZ(60px); }
.top    { background: rgba(255,193,59,0.85);  transform: rotateX(90deg) translateZ(60px); color: #1e1e1d; }
.bottom { background: rgba(216,139,162,0.85); transform: rotateX(-90deg) translateZ(60px); }

@keyframes spin {
  0%   { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}`,
      js: `// Hover to pause the cube
const cube = document.querySelector('.cube');
cube.addEventListener('mouseenter', () => {
  cube.style.animationPlayState = 'paused';
});
cube.addEventListener('mouseleave', () => {
  cube.style.animationPlayState = 'running';
});`
    },
    {
      id: 'particles',
      name: { tr: 'Canvas Parçacıkları', en: 'Canvas Particles' },
      icon: 'zap',
      html: `<canvas id="canvas"></canvas>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body { overflow: hidden; background: #0a0e1a; }
canvas { display: block; }`,
      js: `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#ea4335','#ff7a29','#ffc13b','#b5c437','#8bc386','#85b2a5','#d88ba2'];
const particles = [];

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 100; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });

  ctx.globalAlpha = 0.1;
  ctx.strokeStyle = '#85b2a5';
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();`
    }
  ];

  /* guncel kod durumu */
  let code = {
    html: defaultCode.html,
    css: defaultCode.css,
    js: defaultCode.js
  };

  /* konsol yakalama */
  let consoleMessages = [];
  let messageListenerBound = false;

  /* dom referanslari */
  function $(id) { return document.getElementById(id); }

  /* cevrilmis sablon adini al */
  function getTemplateName(tpl) {
    const lang = FLX.i18n ? FLX.i18n.getCurrentLang() : 'tr';
    return tpl.name[lang] || tpl.name.en;
  }

  /* onizleme html olustur */
  function buildPreviewHTML() {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>${code.css}</style>
</head>
<body>
${code.html}
<script>

(function(){
  const origLog = console.log;
  const origWarn = console.warn;
  const origError = console.error;
  const origInfo = console.info;

  function send(type, args) {
    try {
      parent.postMessage({
        type: 'console',
        level: type,
        data: Array.from(args).map(a => {
          try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
          catch(e) { return String(a); }
        }).join(' ')
      }, '*');
    } catch(e) {}
  }

  console.log = function() { send('log', arguments); origLog.apply(console, arguments); };
  console.warn = function() { send('warn', arguments); origWarn.apply(console, arguments); };
  console.error = function() { send('error', arguments); origError.apply(console, arguments); };
  console.info = function() { send('info', arguments); origInfo.apply(console, arguments); };

  window.onerror = function(msg, url, line, col, err) {
    send('error', [msg + ' (line ' + line + ')']);
  };
})();
<\/script>
<script>${code.js}<\/script>
</body>
</html>`;
  }

  /* onizleme calistir */
  function runPreview() {
    const iframe = $('ce-preview-frame');
    if (!iframe) return;

    consoleMessages = [];
    renderConsole();

    const blob = new Blob([buildPreviewHTML()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    if (iframe._blobUrl) {
      URL.revokeObjectURL(iframe._blobUrl);
    }
    iframe._blobUrl = url;
    iframe.src = url;
  }

  function scheduleRun() {
    if (!autoRun) return;
    clearTimeout(runTimer);
    runTimer = setTimeout(runPreview, RUN_DELAY);
  }

  /* konsol */
  function renderConsole() {
    const consoleEl = $('ce-console-output');
    if (!consoleEl) return;

    if (consoleMessages.length === 0) {
      const lang = FLX.i18n ? FLX.i18n.getCurrentLang() : 'tr';
      consoleEl.innerHTML = `<div class="ce-console-empty">${lang === 'tr' ? 'Konsol çıktısı burada görünecek...' : 'Console output will appear here...'}</div>`;
      return;
    }

    consoleEl.innerHTML = consoleMessages.map(m => {
      const levelClass = `ce-console-${m.level}`;
      const prefix = m.level === 'error' ? '✕' : m.level === 'warn' ? '⚠' : m.level === 'info' ? 'ℹ' : '›';
      return `<div class="ce-console-line ${levelClass}"><span class="ce-console-prefix">${prefix}</span>${FLX.escapeHtml(m.data)}</div>`;
    }).join('');

    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  /* sekme degistirme */
  function switchTab(tab) {
    activeTab = tab;

    document.querySelectorAll('.ce-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });

    const textarea = $('ce-code-textarea');
    if (textarea) {
      textarea.value = code[tab];

      updateLineNumbers();
    }
  }

  /* satir numaralari */
  function updateLineNumbers() {
    const textarea = $('ce-code-textarea');
    const lineNumbers = $('ce-line-numbers');
    if (!textarea || !lineNumbers) return;

    const lines = textarea.value.split('\n').length;
    let html = '';
    for (let i = 1; i <= lines; i++) {
      html += `<div>${i}</div>`;
    }
    lineNumbers.innerHTML = html;
  }

  /* satir numaralari ve metin alani arasinda kaydirma senkronizasyonu */
  function syncScroll() {
    const textarea = $('ce-code-textarea');
    const lineNumbers = $('ce-line-numbers');
    if (textarea && lineNumbers) {
      lineNumbers.scrollTop = textarea.scrollTop;
    }
  }

  /* duzen degistir */
  function toggleLayout() {
    const editor = $('ce-editor-wrapper');
    if (!editor) return;

    layoutMode = layoutMode === 'horizontal' ? 'vertical' : 'horizontal';
    editor.setAttribute('data-layout', layoutMode);

    const btn = $('ce-layout-toggle');
    if (btn) {
      btn.setAttribute('title', layoutMode === 'horizontal' ? 'Dikey Düzen' : 'Yatay Düzen');
    }
  }

  /* sablon yukle */
  function loadTemplate(templateId) {
    const tpl = templates.find(t => t.id === templateId);
    if (!tpl) return;

    code.html = tpl.html;
    code.css = tpl.css;
    code.js = tpl.js;

    switchTab(activeTab);
    runPreview();

    const dropdown = $('ce-template-dropdown');
    if (dropdown) dropdown.classList.remove('open');

    if (FLX.toast) {
      const name = getTemplateName(tpl);
      FLX.toast.show({
        message: FLX.i18n ? (FLX.i18n.getCurrentLang() === 'tr' ? `"${name}" şablonu yüklendi` : `"${name}" template loaded`) : `"${name}" loaded`,
        type: 'success',
        duration: 2000
      });
    }
  }

  /* kodu kopyala */
  function copyAllCode() {
    const fullCode = `<!-- HTML -->\n${code.html}\n\n\n${code.css}\n\n// JavaScript\n${code.js}`;
    navigator.clipboard.writeText(fullCode).then(() => {
      if (FLX.toast) {
        FLX.toast.show({
          message: FLX.i18n ? FLX.i18n.t('toast.copied') : 'Copied!',
          type: 'success',
          duration: 2000
        });
      }
    }).catch(() => {
      if (FLX.toast) {
        FLX.toast.show({
          message: FLX.i18n ? FLX.i18n.t('toast.copyFailed') : 'Copy failed',
          type: 'error',
          duration: 2000
        });
      }
    });
  }

  /* html olarak indir */
  function downloadCode() {
    const fullHTML = buildPreviewHTML();
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'florexlab-editor-export.html';
    a.click();
    URL.revokeObjectURL(url);

    if (FLX.toast) {
      const lang = FLX.i18n ? FLX.i18n.getCurrentLang() : 'tr';
      FLX.toast.show({
        message: lang === 'tr' ? 'Dosya indirildi!' : 'File downloaded!',
        type: 'success',
        duration: 2000
      });
    }
  }

  /* konsolu temizle */
  function clearConsole() {
    consoleMessages = [];
    renderConsole();
  }

  /* metin alaninda sekme tusunu yonet */
  function handleTabKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;

      textarea.dispatchEvent(new Event('input'));
    }
  }

  /* editor bolum icerigini olustur */
  function renderEditor() {
    const container = $('code-editor-content');
    if (!container) return;

    const lang = FLX.i18n ? FLX.i18n.getCurrentLang() : 'tr';
    const t = (tr, en) => lang === 'tr' ? tr : en;

    container.innerHTML = `
      <!-- Toolbar -->
      <div class="ce-toolbar">
        <div class="ce-toolbar-left">
          <!-- Template selector -->
          <div class="ce-template-selector">
            <button class="ce-toolbar-btn" id="ce-template-btn" title="${t('Şablon Seç', 'Select Template')}">
              ${FLX.icon('layout')}
              <span>${t('Şablonlar', 'Templates')}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="ce-template-dropdown" id="ce-template-dropdown">
              ${templates.map(tpl => `
                <button class="ce-template-item" data-template="${tpl.id}">
                  ${FLX.icon(tpl.icon)}
                  <span>${getTemplateName(tpl)}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="ce-toolbar-center">
          <!-- Tabs -->
          <div class="ce-tabs">
            <button class="ce-tab-btn active" data-tab="html">
              <span class="ce-tab-dot ce-dot-html"></span>
              HTML
            </button>
            <button class="ce-tab-btn" data-tab="css">
              <span class="ce-tab-dot ce-dot-css"></span>
              CSS
            </button>
            <button class="ce-tab-btn" data-tab="js">
              <span class="ce-tab-dot ce-dot-js"></span>
              JS
            </button>
          </div>
        </div>

        <div class="ce-toolbar-right">
          <button class="ce-toolbar-btn ce-toolbar-icon-btn" id="ce-run-btn" title="${t('Çalıştır', 'Run')} (Ctrl+Enter)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </button>
          <button class="ce-toolbar-btn ce-toolbar-icon-btn" id="ce-copy-btn" title="${t('Kodu Kopyala', 'Copy Code')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
          <button class="ce-toolbar-btn ce-toolbar-icon-btn" id="ce-download-btn" title="${t('HTML İndir', 'Download HTML')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </button>
          <span class="ce-toolbar-divider"></span>
          <button class="ce-toolbar-btn ce-toolbar-icon-btn" id="ce-layout-toggle" title="${t('Düzen Değiştir', 'Toggle Layout')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>
          </button>
        </div>
      </div>

      <!-- Editor Area -->
      <div class="ce-editor-wrapper" id="ce-editor-wrapper" data-layout="${layoutMode}">
        <!-- Code Panel -->
        <div class="ce-code-panel">
          <div class="ce-code-area">
            <div class="ce-line-numbers" id="ce-line-numbers" aria-hidden="true"></div>
            <textarea
              class="ce-code-textarea"
              id="ce-code-textarea"
              spellcheck="false"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              aria-label="Code editor"
            >${FLX.escapeHtml(code[activeTab])}</textarea>
          </div>
          <!-- Console -->
          <div class="ce-console">
            <div class="ce-console-header">
              <span class="ce-console-title">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                ${t('Konsol', 'Console')}
              </span>
              <button class="ce-console-clear" id="ce-console-clear" title="${t('Temizle', 'Clear')}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div class="ce-console-output" id="ce-console-output">
              <div class="ce-console-empty">${t('Konsol çıktısı burada görünecek...', 'Console output will appear here...')}</div>
            </div>
          </div>
        </div>

        <!-- Resize Handle -->
        <div class="ce-resize-handle" id="ce-resize-handle" title="${t('Sürükle', 'Drag to resize')}">
          <div class="ce-resize-dots">
            <span></span><span></span><span></span>
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="ce-preview-panel">
          <div class="ce-preview-bar">
            <div class="ce-preview-dots" aria-hidden="true">
              <span class="ce-dot ce-dot-red"></span>
              <span class="ce-dot ce-dot-yellow"></span>
              <span class="ce-dot ce-dot-green"></span>
            </div>
            <span class="ce-preview-label">${t('Ön İzleme', 'Preview')}</span>
            <div class="ce-auto-run">
              <label class="ce-auto-run-label" for="ce-auto-run-toggle">
                <input type="checkbox" id="ce-auto-run-toggle" ${autoRun ? 'checked' : ''}>
                <span class="ce-auto-run-slider"></span>
                <span class="ce-auto-run-text">${t('Otomatik', 'Auto')}</span>
              </label>
            </div>
          </div>
          <iframe id="ce-preview-frame" class="ce-preview-frame" sandbox="allow-scripts allow-same-origin allow-modals" title="Preview"></iframe>
        </div>
      </div>
    `;

    bindEvents();
    switchTab('html');
    runPreview();
  }

  /* tum olaylari bagla */
  function bindEvents() {

    document.querySelectorAll('.ce-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
    });

    const textarea = $('ce-code-textarea');
    if (textarea) {
      textarea.addEventListener('input', (e) => {
        code[activeTab] = e.target.value;
        updateLineNumbers();
        scheduleRun();
      });
      textarea.addEventListener('scroll', syncScroll);
      textarea.addEventListener('keydown', handleTabKey);

      textarea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          runPreview();
        }
      });
    }

    const runBtn = $('ce-run-btn');
    if (runBtn) runBtn.addEventListener('click', runPreview);

    const copyBtn = $('ce-copy-btn');
    if (copyBtn) copyBtn.addEventListener('click', copyAllCode);

    const downloadBtn = $('ce-download-btn');
    if (downloadBtn) downloadBtn.addEventListener('click', downloadCode);

    const layoutBtn = $('ce-layout-toggle');
    if (layoutBtn) layoutBtn.addEventListener('click', toggleLayout);

    const clearBtn = $('ce-console-clear');
    if (clearBtn) clearBtn.addEventListener('click', clearConsole);

    const autoRunToggle = $('ce-auto-run-toggle');
    if (autoRunToggle) {
      autoRunToggle.addEventListener('change', (e) => {
        autoRun = e.target.checked;
      });
    }

    const templateBtn = $('ce-template-btn');
    const templateDropdown = $('ce-template-dropdown');
    if (templateBtn && templateDropdown) {
      templateBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        templateDropdown.classList.toggle('open');
      });

      document.addEventListener('click', () => {
        templateDropdown.classList.remove('open');
      });
      templateDropdown.addEventListener('click', (e) => e.stopPropagation());
    }

    document.querySelectorAll('.ce-template-item').forEach(item => {
      item.addEventListener('click', () => {
        loadTemplate(item.getAttribute('data-template'));
      });
    });

    if (!messageListenerBound) {
      messageListenerBound = true;
      window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'console') {

          const iframe = $('ce-preview-frame');
          if (iframe && e.source === iframe.contentWindow) {
            consoleMessages.push({ level: e.data.level, data: e.data.data });
            if (consoleMessages.length > 200) consoleMessages.shift();
            renderConsole();
          }
        }
      });
    }

    initResize();
  }

  /* boyutlandirilabilir paneller */
  function initResize() {
    const handle = $('ce-resize-handle');
    const wrapper = $('ce-editor-wrapper');
    if (!handle || !wrapper) return;

    let isResizing = false;

    handle.addEventListener('mousedown', (e) => {
      isResizing = true;
      document.body.style.cursor = layoutMode === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;

      const rect = wrapper.getBoundingClientRect();

      if (layoutMode === 'horizontal') {
        const offset = e.clientX - rect.left;
        const percent = Math.min(Math.max((offset / rect.width) * 100, 20), 80);
        wrapper.style.gridTemplateColumns = `${percent}% 6px 1fr`;
      } else {
        const offset = e.clientY - rect.top;
        const percent = Math.min(Math.max((offset / rect.height) * 100, 20), 80);
        wrapper.style.gridTemplateRows = `${percent}% 6px 1fr`;
      }
    });

    document.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });
  }

  /* baslat */
  function init() {
    renderEditor();
  }

  /* disari aktar */
  FLX.codeEditor = { init };

})();
