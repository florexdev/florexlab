/* florex lab deneyler sistemi kart izgara olusturma filtreleme arama kontroller ve kod iceren goruntuleyici */

(function() {
  'use strict';

  const gridContainer = document.getElementById('experiment-grid');
  const viewerContainer = document.getElementById('experiment-viewer');
  const gridWrapper = document.getElementById('experiment-grid-container');
  const filtersContainer = document.getElementById('experiment-filters');
  const searchInput = document.getElementById('experiment-search');
  const featuredContainer = document.getElementById('featured-experiments');

  let activeFilter = 'all';
  let searchQuery = '';
  let currentExperiment = null;
  let currentState = {};

  /* kart onizleme ureticileri */
  function getCardPreview(exp) {
    switch (exp.id) {
      case 'gradient-playground':
        return '<div style="width:100%;height:100%;background:linear-gradient(135deg,#e53e6b,#3b82f6);"></div>';
      case 'glassmorphism-card':
        return '<div style="width:100%;height:100%;background:linear-gradient(135deg,#e53e6b,#3b82f6);display:flex;align-items:center;justify-content:center;"><div style="width:120px;height:80px;background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border-radius:12px;border:1px solid rgba(255,255,255,0.2);"></div></div>';
      case 'neon-button':
        return '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--bg-primary);"><span style="padding:8px 24px;border:1.5px solid #e53e6b;color:#e53e6b;border-radius:6px;font-family:var(--font-mono);font-size:0.7rem;text-shadow:0 0 8px #e53e6b;box-shadow:0 0 12px rgba(229,62,107,0.3);">NEON</span></div>';
      case 'animated-border':
        return '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"><div style="width:100px;height:60px;border-radius:10px;position:relative;overflow:hidden;"><div style="position:absolute;inset:0;background:conic-gradient(#e53e6b,#3b82f6,#e53e6b);animation:spin 3s linear infinite;"></div><div style="position:absolute;inset:2px;background:var(--bg-secondary);border-radius:8px;"></div></div></div>';
      case 'css-loaders':
        return '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;gap:16px;"><div style="width:20px;height:20px;border:2px solid rgba(59,130,246,0.2);border-top-color:#3b82f6;border-radius:50%;animation:spin 0.7s linear infinite;"></div><div style="display:flex;gap:4px;">' + [0,1,2].map(i => `<div style="width:6px;height:6px;background:#3b82f6;border-radius:50%;animation:dotPulse 1.4s ease-in-out infinite;animation-delay:${i*0.2}s;"></div>`).join('') + '</div></div>';
      case 'particle-playground':
        return '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">' + Array.from({length:12}, () => `<div style="position:absolute;width:3px;height:3px;background:#3b82f6;border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${0.3+Math.random()*0.7};"></div>`).join('') + '</div>';
      case 'color-generator':
        return '<div style="width:100%;height:100%;display:flex;">' + ['#ea4335','#ff7a29','#ffc13b','#b5c437','#8bc386','#85b2a5','#d88ba2'].map(c => `<div style="flex:1;background:${c};"></div>`).join('') + '</div>';
      case 'keyboard-visualizer':
        return '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;gap:6px;">' + 'FLX'.split('').map(c => `<span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:var(--surface);border:1px solid var(--border);border-radius:6px;font-family:var(--font-mono);font-size:0.8rem;font-weight:700;color:var(--text-primary);">${c}</span>`).join('') + '</div>';
      case 'magnetic-button':
        return '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"><div style="padding:10px 24px;background:var(--gradient-primary);color:#fff;border-radius:8px;font-size:0.8rem;font-weight:600;">Hover me</div></div>';
      default:
        return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);">${exp.number}</div>`;
    }
  }

  const categoryDict = {
    'CSS': 'CSS',
    'JavaScript': 'JavaScript',
    'UI/UX': 'UI/UX',
    'Animation': 'Animasyon'
  };

  const expTR = {
    'gradient-playground': { name: 'Gradyan Alanı', desc: 'Canlı önizleme ve kopyalanabilir CSS kodlu çok renkli gradyan üreteci.' },
    'glassmorphism-card': { name: 'Cam Kart', desc: 'Bulanıklık, saydamlık ve kenar renk kontrolleri ile glassmorphism efekti.' },
    'neon-button': { name: 'Neon Buton', desc: 'Glow efekti, pulse hızı ve yoğunluk ayarlı neon buton.' },
    'animated-border': { name: 'Dönen Kenarlık', desc: 'Dönen conic gradient ve ayarlanabilir genişlikli animated border.' },
    'css-loaders': { name: 'CSS Yükleyiciler', desc: 'Saf CSS ile yapılmış 8 farklı spinner ve animasyonlu loader koleksiyonu.' },
    'text-reveal': { name: 'Metin Belirme', desc: 'Fade-up, fade-down, harf bölme ve daktilo animasyon efektleri.' },
    'custom-cursor': { name: 'Özel İmleç', desc: 'Glow efekti ve takip eden iz noktaları içeren özel cursor.' },
    'interactive-cursor': { name: 'İnteraktif İmleç', desc: 'İmleç yakınlığına manyetik çekim ve parlama ile yanıt veren elementler.' },
    'mouse-tracker': { name: 'Fare Takibi', desc: 'İmleç konumunu ve hareket izini canlı gösteren koordinat takipçisi.' },
    'color-generator': { name: 'Renk Üreteci', desc: 'Tamamlayıcı ve üçlü renk kuralları ile uyumlu renk paletleri üretin.' },
    'keyboard-visualizer': { name: 'Klavye Görselleştirici', desc: 'Basılan tuşları ve tuş kodlarını canlı görselleştiren klavye takipçisi.' },
    'particle-playground': { name: 'Parçacık Alanı', desc: 'Sayı, hız ve bağlantı çizgileri ayarlanabilir canvas parçacık fiziği.' },
    'dynamic-theme': { name: 'Dinamik Tema', desc: 'Tek bir HSL renginden tam renk temaları türeten tema motoru.' },
    'command-palette-demo': { name: 'Komut Paleti', desc: 'Arama, filtreleme ve klavye navigasyonlu komut arayüzü.' },
    'toast-system': { name: 'Toast Sistemi', desc: 'Otomatik kapanan ve tür varyasyonlu istiflenebilir bildirimler.' },
    'modal-system': { name: 'Modal Sistemi', desc: 'Odak hapsetme ve arka plan kapatma destekli erişilebilir diyalog penceresi.' },
    'tooltip-system': { name: 'Tooltip Sistemi', desc: 'Üzerine gelindiğinde tetiklenen yönlü bilgi balonları.' },
    'tabs-demo': { name: 'Sekmeler Demosu', desc: 'Animasyonlu aktif göstergeli sekme navigasyonu.' },
    'accordion-demo': { name: 'Akordiyon Demosu', desc: 'Akıcı animasyonlu daralan/genişleyen içerik panelleri.' },
    'context-menu': { name: 'Sağ Tık Menüsü', desc: 'Erişilebilir özel sağ tık bağlam menüsü.' },
    'magnetic-button': { name: 'Manyetik Buton', desc: 'İmleç yaklaştıkça butonu kendine çeken manyetik etkileşim.' },
    'scroll-reveal': { name: 'Kaydırma Belirmesi', desc: 'IntersectionObserver ile tetiklenen kaydırma animasyonları.' },
    'text-animation': { name: 'Metin Animasyonları', desc: 'Dalga, glitch ve zıplama metin efektleri.' },
    'staggered-cards': { name: 'Kademeli Kartlar', desc: 'Aşamalı giriş animasyonlu ızgara kartları.' },
    'neumorphism-button': { name: 'Neumorfizm Buton', desc: 'Fiziksel butonları taklit eden yumuşak UI ögesi.' },
    'gooey-button': { name: 'Sıvı (Gooey) Buton', desc: 'SVG filtre tabanlı sıvı/akışkan efekti.' },
    'glitch-text': { name: 'Glitch Metin', desc: 'clip-path kullanan CSS bozulma animasyonu.' },
    'typing-effect': { name: 'Daktilo Efekti', desc: 'Yazı yazma animasyonu için CSS steps() kullanımı.' },
    'wavy-text': { name: 'Dalgalı Metin', desc: 'Metinler için gecikme tabanlı dalga animasyonu.' },
    'magnetic-button': { name: 'Manyetik Buton', desc: 'İmleci hafifçe takip eden JS destekli buton.' },
    'css-3d-cube': { name: 'CSS 3D Küp', desc: 'CSS transformları ile dönen 3D küp.' },
    'skeleton-loading': { name: 'İskelet Yükleyici', desc: 'Yükleme durumları için parlama efekti.' },
    'gradient-text': { name: 'Animasyonlu Gradyan Metin', desc: 'Kırpılmış metin üzerinde akan gradyan.' },
    'tooltip-hover': { name: 'Hover Bilgi Balonu', desc: 'Üzerine gelindiğinde çıkan saf CSS bilgi balonları.' },
    'morphing-shape': { name: 'Şekil Değiştirici', desc: 'Animasyonlu karmaşık kenar yuvarlama (border-radius).' },
    'ripple-button': { name: 'Dalga Efektli Buton', desc: 'JS ve CSS kullanan tıklama dalgası efekti.' },
    'expanding-search': { name: 'Genişleyen Arama', desc: 'Odaklanıldığında genişleyen arama çubuğu.' },
    'hamburger-menu': { name: 'Hamburger Menü', desc: 'Menü ikonundan çarpı işaretine CSS geçişi.' },
    'shiny-hover': { name: 'Parlak Hover', desc: 'Üzerine gelindiğinde ögenin üstünden geçen parlama.' },
    'flip-card': { name: '3D Dönen Kart', desc: 'Üzerine gelindiğinde dönen 3 boyutlu kart.' }
  };

  /* kart oluştur */
  function renderCard(exp) {
    const isTR = window.FLX && FLX.i18n && FLX.i18n.getCurrentLang() === 'tr';
    const expName = (isTR && expTR[exp.id]) ? expTR[exp.id].name : exp.name;
    const expDesc = (isTR && expTR[exp.id]) ? expTR[exp.id].desc : exp.description;
    const categoryName = (isTR && categoryDict[exp.category]) ? categoryDict[exp.category] : exp.category;

    const card = document.createElement('div');
    card.className = `experiment-card${exp.status === 'coming-soon' ? ' coming-soon' : ''}`;
    card.setAttribute('data-id', exp.id);
    card.setAttribute('data-category', exp.category);
    card.innerHTML = `
      <div class="experiment-card-preview">
        <div class="experiment-card-preview-content">${getCardPreview(exp)}</div>
      </div>
      <div class="experiment-card-body">
        <span class="experiment-card-number">${exp.number}</span>
        <h3 class="experiment-card-title">${expName}</h3>
        <p class="experiment-card-desc">${expDesc}</p>
        <div class="experiment-card-footer">
          <div class="experiment-card-tags">
            ${exp.tags.slice(0, 3).map(t => `<span class="experiment-card-tag">${t}</span>`).join('')}
          </div>
          <span class="experiment-card-category" data-category="${exp.category}">${categoryName}</span>
        </div>
      </div>
    `;

    if (exp.status === 'active') {
      card.addEventListener('click', () => openViewer(exp.id));
    }

    return card;
  }

  /* izgara oluştur */
  function renderGrid(container, experiments, limit) {
    container.innerHTML = '';
    let filtered = experiments;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(e => e.category === activeFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some(t => t.includes(q)) ||
        e.category.toLowerCase().includes(q)
      );
    }

    if (limit) filtered = filtered.slice(0, limit);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <div class="empty-state-icon">${FLX.icon('search')}</div>
          <h3 class="empty-state-title">No experiments found</h3>
          <p class="empty-state-desc">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(exp => container.appendChild(renderCard(exp)));
  }

  /* görüntüleyiciyi aç */
  function openViewer(experimentId) {
    const exp = FLX.experimentData.find(e => e.id === experimentId);
    if (!exp || exp.status !== 'active') return;

    currentExperiment = exp;
    currentState = {};

    if (exp.controls) {
      exp.controls.forEach(c => {
        currentState[c.key] = c.default;
      });
    }

    const isTR = window.FLX && FLX.i18n && FLX.i18n.getCurrentLang() === 'tr';

    if (gridWrapper) gridWrapper.style.display = 'none';
    viewerContainer.classList.add('active');

    const filterParent = filtersContainer ? filtersContainer.closest('.reveal') || filtersContainer.parentElement : null;
    if (filterParent) filterParent.style.display = 'none';

    viewerContainer.innerHTML = `
      <div class="experiment-viewer-header">
        <button class="experiment-viewer-back" id="viewer-back" aria-label="Back to experiments">
          ${FLX.icon('chevronLeft')}
          <span data-i18n="exp.backBtn">${FLX.i18n ? FLX.i18n.t('exp.backBtn') : 'Back to experiments'}</span>
        </button>
        <div class="experiment-viewer-info">
          <span class="experiment-viewer-number">${exp.number} · ${(isTR && categoryDict[exp.category]) ? categoryDict[exp.category] : exp.category}</span>
          <h2 class="experiment-viewer-title">${(isTR && expTR[exp.id]) ? expTR[exp.id].name : exp.name}</h2>
          <p class="experiment-viewer-desc">${(isTR && expTR[exp.id]) ? expTR[exp.id].desc : exp.description}</p>
        </div>
        <div class="experiment-viewer-actions">
          <button class="btn btn-secondary btn-sm" id="viewer-reset" title="Reset to defaults">
            ${FLX.icon('refresh')} <span data-i18n="exp.resetBtn">Reset</span>
          </button>
        </div>
      </div>
      <div class="experiment-viewer-body">
        <div class="experiment-preview-area">
          <div class="experiment-preview-container" id="experiment-preview"></div>
        </div>
        <div class="experiment-sidebar">
          ${exp.controls && exp.controls.length > 0 ? `
            <div class="experiment-controls">
              <div class="experiment-controls-title">
                ${FLX.icon('sliders')} <span data-i18n="exp.controlsTitle">Controls</span>
              </div>
              <div id="experiment-controls-list"></div>
            </div>
          ` : ''}
          <div class="experiment-code">
            <div class="experiment-code-header">
              <span style="font-size:var(--text-xs);font-weight:var(--weight-semibold);color:var(--text-secondary);" data-i18n="exp.codeTitle">Code</span>
              <button class="btn btn-ghost btn-sm" id="copy-code-btn">
                ${FLX.icon('copy')} <span data-i18n="exp.copyCode">Copy</span>
              </button>
            </div>
            <div class="experiment-code-body">
              <pre><code id="experiment-code-output"></code></pre>
            </div>
          </div>
        </div>
      </div>
    `;

    const previewContainer = document.getElementById('experiment-preview');
    exp.init(previewContainer, { ...currentState });

    renderControls(exp);

    updateCode();

    document.getElementById('viewer-back').addEventListener('click', closeViewer);

    document.getElementById('viewer-reset').addEventListener('click', () => {
      if (exp.controls) {
        exp.controls.forEach(c => { currentState[c.key] = c.default; });
      }

      exp.destroy();
      previewContainer.innerHTML = '';
      exp.init(previewContainer, { ...currentState });
      renderControls(exp);
      updateCode();
    });

    document.getElementById('copy-code-btn').addEventListener('click', () => {
      const code = exp.getCode(currentState);
      FLX.copyToClipboard(code);
    });

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* görüntüleyiciyi kapat */
  function closeViewer() {
    if (currentExperiment) {
      currentExperiment.destroy();
      currentExperiment = null;
    }

    viewerContainer.classList.remove('active');
    viewerContainer.innerHTML = '';
    if (gridWrapper) gridWrapper.style.display = '';

    const filterParent = filtersContainer ? filtersContainer.closest('.reveal') || filtersContainer.parentElement : null;
    if (filterParent) filterParent.style.display = '';
  }

  /* kontrolleri olustur */
  function renderControls(exp) {
    const list = document.getElementById('experiment-controls-list');
    if (!list || !exp.controls) return;
    list.innerHTML = '';

    exp.controls.forEach(ctrl => {
      const group = document.createElement('div');
      group.className = 'control-group';

      if (ctrl.type === 'range') {
        group.innerHTML = `
          <div class="control-label">
            <span>${ctrl.label}</span>
            <span class="control-value" id="val-${ctrl.key}">${currentState[ctrl.key]}${ctrl.unit || ''}</span>
          </div>
          <input type="range" class="range" id="ctrl-${ctrl.key}" min="${ctrl.min}" max="${ctrl.max}" value="${currentState[ctrl.key]}" step="${ctrl.step || 1}">
        `;
        list.appendChild(group);
        group.querySelector('input').addEventListener('input', (e) => {
          currentState[ctrl.key] = parseFloat(e.target.value);
          document.getElementById(`val-${ctrl.key}`).textContent = `${currentState[ctrl.key]}${ctrl.unit || ''}`;
          exp.update({ ...currentState });
          updateCode();
        });
      } else if (ctrl.type === 'color') {
        group.innerHTML = `
          <div class="control-label"><span>${ctrl.label}</span></div>
          <div class="color-input">
            <input type="color" id="ctrl-${ctrl.key}" value="${currentState[ctrl.key]}">
            <span class="color-input-hex" id="val-${ctrl.key}">${currentState[ctrl.key]}</span>
          </div>
        `;
        list.appendChild(group);
        group.querySelector('input').addEventListener('input', (e) => {
          currentState[ctrl.key] = e.target.value;
          document.getElementById(`val-${ctrl.key}`).textContent = e.target.value;
          exp.update({ ...currentState });
          updateCode();
        });
      } else if (ctrl.type === 'select') {
        group.innerHTML = `
          <div class="control-label"><span>${ctrl.label}</span></div>
          <select class="select" id="ctrl-${ctrl.key}">
            ${ctrl.options.map(o => `<option value="${o}" ${currentState[ctrl.key] === o ? 'selected' : ''}>${o}</option>`).join('')}
          </select>
        `;
        list.appendChild(group);
        group.querySelector('select').addEventListener('change', (e) => {
          currentState[ctrl.key] = e.target.value;

          const preview = document.getElementById('experiment-preview');
          exp.destroy();
          preview.innerHTML = '';
          exp.init(preview, { ...currentState });
          updateCode();
        });
      }
    });
  }

  /* kod ciktisini guncelle */
  function updateCode() {
    const output = document.getElementById('experiment-code-output');
    if (output && currentExperiment) {
      output.textContent = currentExperiment.getCode(currentState);
    }
  }

  /* baslat */
  function init() {
    if (!FLX.experimentData) return;

    if (gridContainer) {
      renderGrid(gridContainer, FLX.experimentData);
    }

    if (featuredContainer) {
      const featured = FLX.experimentData.filter(e => e.status === 'active').slice(0, 6);
      featured.forEach(exp => featuredContainer.appendChild(renderCard(exp)));
    }

    if (filtersContainer) {
      filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeFilter = btn.getAttribute('data-filter');
          filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderGrid(gridContainer, FLX.experimentData);
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', FLX.debounce((e) => {
        searchQuery = e.target.value;
        renderGrid(gridContainer, FLX.experimentData);
      }, 200));
    }
  }

  FLX.experiments = { init, openViewer, closeViewer };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
