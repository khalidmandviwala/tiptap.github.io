/* =========================================================
   BroadcastIQ — app.js
   Shared UI utilities: sidebar, RTL, active nav, clipboard
   ========================================================= */

/* ── Sidebar toggle ── */
function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

/* ── Close sidebar when overlay clicked ── */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('sidebarOverlay');
  if (overlay) overlay.addEventListener('click', toggleSidebar);

  /* Mark active nav link */
  const page = location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === page) {
      link.classList.add('active');
    }
  });

  /* Apply saved direction */
  const savedDir = localStorage.getItem('biq_dir') || 'ltr';
  applyDir(savedDir, false);
});

/* ── Language / RTL toggle ── */
function applyDir(dir, save = true) {
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
  if (save) localStorage.setItem('biq_dir', dir);
  /* update toggle buttons if present */
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.langBtn === dir);
  });
}

function toggleDir() {
  const current = document.documentElement.getAttribute('dir') || 'ltr';
  applyDir(current === 'ltr' ? 'rtl' : 'ltr');
}

/* ── Clipboard copy ── */
function copyText(value, btn) {
  navigator.clipboard.writeText(value).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.style.color = 'var(--green)';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.color = '';
    }, 2000);
  });
}

/* ── Toast notifications ── */
function showToast(message, type = 'success', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position:fixed; bottom:24px; right:24px; z-index:9999;
      display:flex; flex-direction:column; gap:10px;
    `;
    document.body.appendChild(container);
  }

  const colors = {
    success: 'var(--green)',
    error:   'var(--red)',
    warning: 'var(--orange)',
    info:    'var(--brand)',
  };
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };

  const toast = document.createElement('div');
  toast.style.cssText = `
    display:flex; align-items:center; gap:10px;
    background:#fff; border:1.5px solid ${colors[type]}33;
    border-inline-start: 4px solid ${colors[type]};
    border-radius:10px; padding:12px 18px;
    box-shadow:0 4px 20px rgba(13,27,62,0.15);
    font-family:'Outfit',sans-serif; font-size:14px; font-weight:500;
    color:var(--text); min-width:260px; max-width:360px;
    animation: toastIn .25s ease both;
  `;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  container.appendChild(toast);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
    @keyframes toastOut { from { opacity:1; transform:none; } to { opacity:0; transform:translateY(6px); } }
  `;
  if (!document.getElementById('toast-styles')) {
    style.id = 'toast-styles';
    document.head.appendChild(style);
  }

  setTimeout(() => {
    toast.style.animation = 'toastOut .3s ease both';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ── Modal helpers ── */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}

/* Close modal on backdrop click */
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ── Tab switching ── */
function initTabs(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      document.querySelectorAll(`[data-tab-panel]`).forEach(p => {
        p.style.display = p.dataset.tabPanel === target ? 'block' : 'none';
      });
    });
  });
}

/* ── Accordion ── */
function toggleAccordion(el) {
  const body = el.nextElementSibling;
  const arrow = el.querySelector('.accordion-arrow');
  const isOpen = body.style.maxHeight && body.style.maxHeight !== '0px';
  body.style.maxHeight = isOpen ? '0px' : body.scrollHeight + 'px';
  body.style.overflow = 'hidden';
  body.style.transition = 'max-height 0.3s ease';
  if (arrow) arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
}
