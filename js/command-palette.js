/* florex lab komut paleti ctrl k cmd k tetiklenen komut paleti klavye yonlendirmeli */

(function() {
  'use strict';

  const backdrop = document.getElementById('cmd-backdrop');
  const palette = document.getElementById('cmd-palette');
  const input = document.getElementById('cmd-input');
  const results = document.getElementById('cmd-results');
  const trigger = document.getElementById('cmd-trigger');
  let isOpen = false;
  let focusedIndex = -1;
  let filteredItems = [];

  /* komut ogeleri */
  const commands = [

    { id: 'nav-home', label: 'Home', group: 'Navigation', icon: 'home', action: () => FLX.navigate('home') },
    { id: 'nav-experiments', label: 'Experiments', group: 'Navigation', icon: 'zap', action: () => FLX.navigate('experiments') },
    { id: 'nav-components', label: 'Components', group: 'Navigation', icon: 'layout', action: () => FLX.navigate('components') },
    { id: 'nav-playground', label: 'Playground', group: 'Navigation', icon: 'play', action: () => FLX.navigate('playground') },
    { id: 'nav-editor', label: 'Code Editor', group: 'Navigation', icon: 'code', action: () => FLX.navigate('editor') },
    { id: 'nav-about', label: 'About', group: 'Navigation', icon: 'info', action: () => FLX.navigate('about') },

    { id: 'action-theme', label: 'Toggle Theme', group: 'Actions', icon: 'moon', action: () => FLX.theme.toggle() },

    { id: 'link-github', label: 'GitHub', group: 'Links', icon: 'github', action: () => window.open('https://github.com/florexdev', '_blank') },
    { id: 'link-portfolio', label: 'Portfolio', group: 'Links', icon: 'external', action: () => window.open('https://florexdev.com.tr', '_blank') },
    { id: 'link-blog', label: 'Blog', group: 'Links', icon: 'external', action: () => window.open('https://blog.florexdev.com.tr', '_blank') },

  ];

  function getExperimentCommands() {
    if (!FLX.experimentData) return [];
    return FLX.experimentData
      .filter(exp => exp.status === 'active')
      .map(exp => ({
        id: `exp-${exp.id}`,
        label: exp.name,
        group: 'Experiments',
        icon: 'zap',
        meta: exp.category,
        action: () => {
          FLX.navigate('experiments');
          setTimeout(() => {
            if (FLX.experiments) FLX.experiments.openViewer(exp.id);
          }, 100);
        }
      }));
  }

  function getAllCommands() {
    return [...commands, ...getExperimentCommands()];
  }

  function filterCommands(query) {
    const all = getAllCommands();
    if (!query) return all;
    const q = query.toLowerCase();
    return all.filter(cmd =>
      cmd.label.toLowerCase().includes(q) ||
      cmd.group.toLowerCase().includes(q) ||
      (cmd.meta && cmd.meta.toLowerCase().includes(q))
    );
  }

  function renderResults(items) {
    filteredItems = items;
    focusedIndex = 0;

    if (items.length === 0) {
      results.innerHTML = '<div class="command-palette-empty">No results found</div>';
      return;
    }

    const groups = {};
    items.forEach(item => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
    });

    let html = '';
    Object.entries(groups).forEach(([group, groupItems]) => {
      html += `<div class="command-palette-group">`;
      html += `<div class="command-palette-group-label">${FLX.escapeHtml(group)}</div>`;
      groupItems.forEach((item, i) => {
        const globalIndex = items.indexOf(item);
        html += `
          <div class="command-palette-item ${globalIndex === 0 ? 'focused' : ''}"
               data-index="${globalIndex}" role="option" tabindex="-1">
            <span class="command-palette-item-icon">${FLX.icon(item.icon)}</span>
            <span class="command-palette-item-text">${FLX.escapeHtml(item.label)}</span>
            ${item.meta ? `<span class="badge badge-default" style="font-size:0.6rem;">${FLX.escapeHtml(item.meta)}</span>` : ''}
          </div>
        `;
      });
      html += `</div>`;
    });

    results.innerHTML = html;

    results.querySelectorAll('.command-palette-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'));
        executeItem(idx);
      });
    });
  }

  function updateFocus(newIndex) {
    if (filteredItems.length === 0) return;
    focusedIndex = ((newIndex % filteredItems.length) + filteredItems.length) % filteredItems.length;

    results.querySelectorAll('.command-palette-item').forEach(el => {
      const idx = parseInt(el.getAttribute('data-index'));
      el.classList.toggle('focused', idx === focusedIndex);
      if (idx === focusedIndex) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function executeItem(index) {
    if (filteredItems[index]) {
      filteredItems[index].action();
      close();
    }
  }

  /* ac kapat */
  function open() {
    if (isOpen) return;
    isOpen = true;

    FLX.measureScrollbar();
    document.body.classList.add('scroll-locked');

    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    palette.classList.add('open');

    input.value = '';
    renderResults(getAllCommands());

    requestAnimationFrame(() => input.focus());
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;

    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    palette.classList.remove('open');
    document.body.classList.remove('scroll-locked');
  }

  /* baslat */
  function init() {

    document.addEventListener('keydown', (e) => {

      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? close() : open();
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowDown':
          e.preventDefault();
          updateFocus(focusedIndex + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          updateFocus(focusedIndex - 1);
          break;
        case 'Enter':
          e.preventDefault();
          executeItem(focusedIndex);
          break;
      }
    });

    if (input) {
      input.addEventListener('input', FLX.debounce((e) => {
        renderResults(filterCommands(e.target.value));
      }, 100));
    }

    if (backdrop) {
      backdrop.addEventListener('click', close);
    }

    if (trigger) {
      trigger.addEventListener('click', open);
    }
  }

  FLX.commandPalette = { open, close, init };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
