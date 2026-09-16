/* florex lab bildirim sistemi turleri ve otomatik kapanmasi olan ust uste eklenebilir bildirimler */

(function() {
  'use strict';

  const container = document.getElementById('toast-container');
  let toastCount = 0;

  const icons = {
    info: FLX.icon('info'),
    success: FLX.icon('checkCircle'),
    warning: FLX.icon('alertTriangle'),
    error: FLX.icon('xCircle')
  };

  function show({ message, title, type = 'info', duration = 4000 }) {
    if (!container) return;

    const id = `toast-${++toastCount}`;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.id = id;
    toast.setAttribute('role', 'alert');

    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${FLX.escapeHtml(title)}</div>` : ''}
        <div class="toast-message">${FLX.escapeHtml(message)}</div>
      </div>
      <button class="toast-close" aria-label="Dismiss notification">${FLX.icon('x')}</button>
      ${duration > 0 ? `<div class="toast-progress" style="animation-duration:${duration}ms;"></div>` : ''}
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => dismiss(toast));

    container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => dismiss(toast), duration);
    }

    const toasts = container.querySelectorAll('.toast');
    if (toasts.length > 5) {
      dismiss(toasts[0]);
    }

    return id;
  }

  function dismiss(toastEl) {
    if (!toastEl || !toastEl.parentNode) return;
    toastEl.classList.add('toast-dismissing');
    setTimeout(() => {
      if (toastEl.parentNode) {
        toastEl.parentNode.removeChild(toastEl);
      }
    }, 200);
  }

  function clear() {
    if (!container) return;
    container.innerHTML = '';
  }

  FLX.toast = { show, dismiss, clear };
})();
