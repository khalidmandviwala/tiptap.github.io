/* =========================================================
   BroadcastIQ — sidebar.js
   Injects the shared sidebar + overlay into every page
   ========================================================= */

(function () {
  const sidebarHTML = `
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div class="logo-mark">📡</div>
      <div class="logo-wordmark">Broadcast<em>IQ</em></div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-group-label">Main</div>

      <a class="nav-link" href="dashboard.html">
        <span class="nav-icon-wrap">📊</span>
        <span>Dashboard</span>
      </a>

      <a class="nav-link" href="campaigns.html">
        <span class="nav-icon-wrap">🚀</span>
        <span>Campaigns</span>
        <span class="nav-badge">3</span>
      </a>

      <a class="nav-link" href="broadcasts.html">
        <span class="nav-icon-wrap">📋</span>
        <span>Broadcasts</span>
      </a>

      <a class="nav-link" href="#">
        <span class="nav-icon-wrap">📬</span>
        <span>Inbox</span>
        <span class="nav-badge orange">7</span>
      </a>

      <div class="nav-group-label">Management</div>

      <a class="nav-link" href="contacts.html">
        <span class="nav-icon-wrap">👥</span>
        <span>Contacts</span>
      </a>

      <a class="nav-link" href="#">
        <span class="nav-icon-wrap">📝</span>
        <span>Templates</span>
      </a>

      <a class="nav-link" href="#">
        <span class="nav-icon-wrap">📅</span>
        <span>Schedule</span>
      </a>

      <div class="nav-group-label">Configuration</div>

      <a class="nav-link" href="whatsapp-config.html">
        <span class="nav-icon-wrap">💬</span>
        <span>WhatsApp API</span>
        <span class="nav-badge green">Live</span>
      </a>

      <a class="nav-link" href="#">
        <span class="nav-icon-wrap">⚙️</span>
        <span>Settings</span>
      </a>

      <a class="nav-link" href="#">
        <span class="nav-icon-wrap">🔑</span>
        <span>API Access</span>
      </a>

      <a class="nav-link" href="login.html">
        <span class="nav-icon-wrap">🚪</span>
        <span>Sign Out</span>
      </a>
    </nav>

    <div class="sidebar-footer">
      <!-- Lang switcher -->
      <div style="display:flex;gap:6px;padding:0 0 10px;" id="langSwitcher">
        <button data-lang-btn="ltr"
          onclick="applyDir('ltr')"
          style="flex:1;padding:6px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;
                 border:1.5px solid var(--border);background:transparent;color:var(--muted);
                 transition:all .15s;"
          onmouseover="this.style.borderColor='var(--brand-mid)'"
          onmouseout="if(!this.classList.contains('active'))this.style.borderColor='var(--border)'">
          🇬🇧 EN
        </button>
        <button data-lang-btn="rtl"
          onclick="applyDir('rtl')"
          style="flex:1;padding:6px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;
                 border:1.5px solid var(--border);background:transparent;color:var(--muted);
                 transition:all .15s;"
          onmouseover="this.style.borderColor='var(--brand-mid)'"
          onmouseout="if(!this.classList.contains('active'))this.style.borderColor='var(--border)'">
          🇴🇲 AR
        </button>
      </div>

      <div class="user-card">
        <div class="user-avatar">AH</div>
        <div>
          <div class="user-name">Ahmed Al-Hassan</div>
          <div class="user-role">Administrator</div>
        </div>
        <span class="user-caret">⋯</span>
      </div>
    </div>
  </aside>
  `;

  // Inject at start of body
  document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

  // Style active lang button after applyDir runs
  document.addEventListener('DOMContentLoaded', () => {
    const dir = localStorage.getItem('biq_dir') || 'ltr';
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const isActive = btn.dataset.langBtn === dir;
      btn.style.background = isActive ? 'var(--brand-light)' : 'transparent';
      btn.style.borderColor = isActive ? 'var(--brand-mid)' : 'var(--border)';
      btn.style.color = isActive ? 'var(--brand)' : 'var(--muted)';
      btn.classList.toggle('active', isActive);
    });
  });
})();
