/* =========================================================
   BroadcastIQ — sidebar.js  v2
   Injects sidebar, topbar user dropdown, notification panel,
   FAB, site footer into every inner page
   ========================================================= */

(function () {
  /* ── Sidebar HTML ── */
  const sidebarHTML = `
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div class="logo-mark">📡</div>
      <div class="logo-wordmark">Tip<em>Tap</em></div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-group-label">Main</div>
      <a class="nav-link" href="dashboard.html">
        <span class="nav-icon-wrap">📊</span><span>Dashboard</span>
      </a>
      <a class="nav-link" href="campaigns.html">
        <span class="nav-icon-wrap">🚀</span><span>Campaigns</span>
        <span class="nav-badge">3</span>
      </a>
      <a class="nav-link" href="broadcasts.html">
        <span class="nav-icon-wrap">📋</span><span>Broadcasts</span>
      </a>
      <a class="nav-link" href="#">
        <span class="nav-icon-wrap">📬</span><span>Inbox</span>
        <span class="nav-badge orange">7</span>
      </a>

      <div class="nav-group-label">Management</div>
      <a class="nav-link" href="contacts.html">
        <span class="nav-icon-wrap">👥</span><span>Contacts</span>
      </a>
      <a class="nav-link" href="#">
        <span class="nav-icon-wrap">📝</span><span>Templates</span>
      </a>
      <a class="nav-link" href="#">
        <span class="nav-icon-wrap">📅</span><span>Schedule</span>
      </a>

      <div class="nav-group-label">Configuration</div>
      <a class="nav-link" href="whatsapp-config.html">
        <span class="nav-icon-wrap">💬</span><span>WhatsApp API</span>
        <span class="nav-badge green">Live</span>
      </a>
      <a class="nav-link" href="settings.html">
        <span class="nav-icon-wrap">⚙️</span><span>Settings</span>
      </a>
      <a class="nav-link" href="users.html">
        <span class="nav-icon-wrap">👤</span><span>Users</span>
      </a>
    </nav>

    <div class="sidebar-footer" id="sidebarFooter">
      <div class="user-card" onclick="toggleUserDropdownSidebar()">
        <div class="user-avatar" id="sbUserAvatar">AH</div>
        <div>
          <div class="user-name">Ahmed Al-Hassan</div>
          <div class="user-role">Administrator</div>
        </div>
        <span class="user-caret">▾</span>
      </div>
    </div>
  </aside>`;

  /* ── Notification data ── */
  const notifs = [
    {
      icon: "🚀",
      iconBg: "var(--brand-light)",
      title: "Campaign Launched",
      desc: "Eid Al-Fitr Promo is now live — 21,340 recipients queued.",
      time: "2 min ago",
      unread: true,
    },
    {
      icon: "✅",
      iconBg: "var(--green-light)",
      title: "Broadcast Delivered",
      desc: "Flash Sale April — 7,954 messages delivered (96.9%).",
      time: "18 min ago",
      unread: true,
    },
    {
      icon: "⚠️",
      iconBg: "var(--orange-light)",
      title: "Delivery Warning",
      desc: "New Arrivals broadcast has 43% failure rate. Check your template.",
      time: "1h ago",
      unread: true,
    },
    {
      icon: "💬",
      iconBg: "var(--wa-light)",
      title: "WhatsApp API Connected",
      desc: "Meta Cloud API handshake successful. All systems operational.",
      time: "2h ago",
      unread: false,
    },
    {
      icon: "👤",
      iconBg: "var(--purple-light)",
      title: "New Contact Imported",
      desc: "CSV import completed — 1,240 contacts added successfully.",
      time: "5h ago",
      unread: false,
    },
    {
      icon: "🏆",
      iconBg: "var(--yellow-light)",
      title: "Campaign Completed",
      desc: "Loyalty Rewards Drive finished with 94.6% delivery rate.",
      time: "1d ago",
      unread: false,
    },
  ];
  const unreadCount = notifs.filter((n) => n.unread).length;

  const notifItemsHTML = notifs
    .map(
      (n) => `
    <div class="notif-item ${n.unread ? "unread" : ""}" onclick="markNotifRead(this)">
      <div class="notif-item-icon" style="background:${n.iconBg}">${n.icon}</div>
      <div style="flex:1;min-width:0">
        <div class="notif-item-title">${n.title}</div>
        <div class="notif-item-desc">${n.desc}</div>
        <div class="notif-item-time">${n.time}</div>
      </div>
      ${n.unread ? '<div class="notif-unread-dot"></div>' : ""}
    </div>`,
    )
    .join("");

  /* ── Topbar injected elements ── */
  const topbarExtrasHTML = `
  <!-- Notification Panel -->
  <div class="notif-wrap" id="notifWrap">
    <button class="notif-btn" id="notifBtn" onclick="toggleNotif(event)" title="Notifications">
      🔔
      <span class="notif-count" id="notifCount">${unreadCount}</span>
    </button>
    <div class="notif-panel" id="notifPanel">
      <div class="notif-panel-head">
        <div class="notif-panel-title">Notifications <span style="color:var(--brand);font-size:12px">(${unreadCount} new)</span></div>
        <button class="notif-mark-all" onclick="markAllRead()">Mark all read</button>
      </div>
      <div class="notif-list" id="notifList">${notifItemsHTML}</div>
      <div class="notif-panel-footer"><a href="#">View all notifications</a></div>
    </div>
  </div>

  <!-- Lang Toggle -->
  <div class="lang-toggle" id="topbarLang">
    <button class="lang-toggle-btn" data-lang-btn="ltr" onclick="applyDir('ltr')">🇬🇧 EN</button>
    <button class="lang-toggle-btn" data-lang-btn="rtl" onclick="applyDir('rtl')">🇴🇲 AR</button>
  </div>

  <!-- User Dropdown -->
  <div class="topbar-user" id="topbarUser">
    <button class="topbar-user-btn" onclick="toggleUserDropdown(event)" aria-expanded="false" id="topbarUserBtn">
      <div class="topbar-avatar" id="topbarAvatar">AH</div>
      <span class="topbar-user-name">Ahmed Al-Hassan</span>
      <span class="topbar-user-caret">▾</span>
    </button>
    <div class="user-dropdown" id="userDropdown">
      <div class="dropdown-header">
        <div class="dropdown-name">Ahmed Al-Hassan</div>
        <div class="dropdown-email">admin@broadcastiq.com</div>
      </div>
      <a class="dropdown-item" href="settings.html">
        <span class="dropdown-icon">⚙️</span> Settings
      </a>
      <a class="dropdown-item" href="users.html">
        <span class="dropdown-icon">👥</span> User Management
      </a>
      <a class="dropdown-item" href="#">
        <span class="dropdown-icon">🔔</span> Notification Preferences
      </a>
      <div style="height:1px;background:var(--border);margin:4px 0"></div>
      <a class="dropdown-item danger" href="login.html">
        <span class="dropdown-icon">🚪</span> Sign Out
      </a>
    </div>
  </div>`;

  /* ── FAB HTML ── */
  const fabHTML = `
  <div class="fab-wrap" id="fabWrap">
    <div class="fab-sub-items">
      <div class="fab-sub" onclick="openModal('modalAddContact')">
        <span class="fab-sub-label">Add Contact</span>
        <button class="fab-sub-btn" style="background:var(--green);color:#fff" title="Add Contact">👤</button>
      </div>
      <div class="fab-sub" onclick="openModal('modalAddBroadcast')">
        <span class="fab-sub-label">New Broadcast</span>
        <button class="fab-sub-btn" style="background:var(--wa);color:#fff" title="New Broadcast">📤</button>
      </div>
      <div class="fab-sub" onclick="openModal('modalAddCampaign')">
        <span class="fab-sub-label">New Campaign</span>
        <button class="fab-sub-btn" style="background:var(--brand);color:#fff" title="New Campaign">🚀</button>
      </div>
    </div>
    <button class="fab-main" id="fabMain" onclick="toggleFab()" title="Quick Actions">+</button>
  </div>

  <!-- FAB: Add Contact Modal -->
  <div class="modal-backdrop" id="modalAddContact">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-header-icon" style="background:var(--green-light)">👤</div>
        <div><div class="modal-title">Add New Contact</div><div class="modal-subtitle">Stored in your database — no Meta registration needed</div></div>
        <button class="modal-close" onclick="closeModal('modalAddContact')">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-row-2">
          <div class="form-group"><label class="form-label">First Name</label><input class="form-control" type="text" placeholder="Ahmed"/></div>
          <div class="form-group"><label class="form-label">Last Name</label><input class="form-control" type="text" placeholder="Al-Hassan"/></div>
        </div>
        <div class="form-row-2">
          <div class="form-group"><label class="form-label">Phone (WhatsApp)</label><input class="form-control" type="tel" placeholder="+968 9X XXX XXXX"/><div class="form-hint">E.164 format — required for WhatsApp delivery</div></div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-control" type="email" placeholder="contact@email.com"/></div>
        </div>
        <div class="form-row-2">
          <div class="form-group" style="margin-bottom:0"><label class="form-label">Group</label><select class="form-control"><option>VIP</option><option>Regular</option><option>New Lead</option><option>Corporate</option></select></div>
          <div class="form-group" style="margin-bottom:0"><label class="form-label">Status</label><select class="form-control"><option>Subscribed</option><option>Pending</option><option>Unsubscribed</option></select></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModal('modalAddContact')">Cancel</button>
        <button class="btn btn-primary" onclick="closeModal('modalAddContact');showToast('Contact saved ✅','success')">Save Contact</button>
      </div>
    </div>
  </div>

  <!-- FAB: Add Broadcast Modal -->
  <div class="modal-backdrop" id="modalAddBroadcast">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-header-icon" style="background:var(--wa-light)">📤</div>
        <div><div class="modal-title">New Broadcast</div><div class="modal-subtitle">WhatsApp Business — send to your database contacts</div></div>
        <button class="modal-close" onclick="closeModal('modalAddBroadcast')">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">Broadcast Name</label><input class="form-control" type="text" placeholder="e.g. Weekend Deals – Apr 12"/></div>
        <div class="form-row-2">
          <div class="form-group"><label class="form-label">Audience</label><select class="form-control"><option>All Contacts (24,180)</option><option>VIP (948)</option><option>Retail (8,200)</option></select></div>
          <div class="form-group"><label class="form-label">Send At</label><select class="form-control"><option>Send Immediately</option><option>Schedule for later</option></select></div>
        </div>
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Message</label><textarea class="form-control" rows="3" placeholder="Hello {{name}}, here's a special offer…"></textarea></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModal('modalAddBroadcast')">Cancel</button>
        <button class="btn btn-wa" onclick="closeModal('modalAddBroadcast');showToast('Broadcast sent 📤','success')">📤 Send Broadcast</button>
      </div>
    </div>
  </div>

  <!-- FAB: Add Campaign Modal -->
  <div class="modal-backdrop" id="modalAddCampaign">
    <div class="modal" style="max-width:580px">
      <div class="modal-header">
        <div class="modal-header-icon" style="background:var(--brand-light)">🚀</div>
        <div><div class="modal-title">New Campaign</div><div class="modal-subtitle">WhatsApp Business campaign</div></div>
        <button class="modal-close" onclick="closeModal('modalAddCampaign')">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">Campaign Name</label><input class="form-control" type="text" placeholder="e.g. Eid Greetings 2026"/></div>
        <div class="form-row-2">
          <div class="form-group"><label class="form-label">Audience</label><select class="form-control"><option>All Contacts (24,180)</option><option>VIP (948)</option></select></div>
          <div class="form-group"><label class="form-label">Dispatch</label><select class="form-control"><option>Send Now</option><option>Schedule</option></select></div>
        </div>
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Message</label><textarea class="form-control" rows="3" placeholder="Hello {{name}}! Use double braces for personalization."></textarea></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModal('modalAddCampaign')">Cancel</button>
        <button class="btn btn-primary" onclick="closeModal('modalAddCampaign');showToast('Campaign launched 🚀','success')">🚀 Launch Campaign</button>
      </div>
    </div>
  </div>`;

  /* ── Site Footer HTML ── */
  const footerHTML = `
  <footer class="site-footer">
    <div class="footer-copy">
      © ${new Date().getFullYear()} BroadcastIQ. All Rights Reserved by <a href="https://92techoman.com" target="_blank">92TechOman.com</a>
    </div>
    <div class="footer-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Use</a>
      <a href="#">Support</a>
    </div>
  </footer>`;

  /* ── Inject sidebar ── */
  document.body.insertAdjacentHTML("afterbegin", sidebarHTML);

  /* ── Inject FAB + modals ── */
  document.body.insertAdjacentHTML("beforeend", fabHTML);

  /* ── Inject topbar extras & footer after DOM ready ── */
  document.addEventListener("DOMContentLoaded", () => {
    /* Mark active nav */
    const page = location.pathname.split("/").pop() || "dashboard.html";
    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("href") === page) link.classList.add("active");
    });

    /* Inject topbar extras into .topbar-actions */
    const actions = document.querySelector(".topbar-actions");
    if (actions) actions.insertAdjacentHTML("beforeend", topbarExtrasHTML);

    /* Inject sidebar toggle btn at start of topbar */
    const topbar = document.querySelector(".topbar");
    if (topbar) {
      const toggleBtn = document.createElement("button");
      toggleBtn.className = "sidebar-toggle-btn";
      toggleBtn.title = "Toggle Sidebar";
      toggleBtn.innerHTML = "<span></span><span></span><span></span>";
      toggleBtn.onclick = toggleSidebarDesktop;
      topbar.insertBefore(toggleBtn, topbar.firstChild);
    }

    /* Inject footer into main-content */
    const main = document.querySelector(".main-content");
    if (main) main.insertAdjacentHTML("beforeend", footerHTML);

    /* Apply saved dir */
    const savedDir = localStorage.getItem("biq_dir") || "ltr";
    applyDir(savedDir, false);

    /* Apply saved sidebar state */
    const collapsed = localStorage.getItem("biq_sidebar_collapsed") === "true";
    if (collapsed && window.innerWidth > 768) {
      document.querySelector(".app-shell")?.classList.add("sidebar-collapsed");
    }

    /* Style lang buttons */
    syncLangButtons(savedDir);

    /* Load saved avatar */
    const savedAvatar = localStorage.getItem("biq_avatar");
    if (savedAvatar) {
      document
        .querySelectorAll(".topbar-avatar, .user-avatar, #sbUserAvatar")
        .forEach((el) => {
          el.innerHTML = `<img src="${savedAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>`;
        });
    }

    /* Close dropdowns on outside click */
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#notifWrap"))
        document.getElementById("notifPanel")?.classList.remove("open");
      if (!e.target.closest("#topbarUser")) closeUserDropdown();
      if (!e.target.closest("#fabWrap")) closeFab();
    });
  });

  /* ── Sidebar toggle (mobile) ── */
  window.toggleSidebar = function () {
    const sb = document.getElementById("sidebar");
    const ov = document.getElementById("sidebarOverlay");
    sb.classList.toggle("open");
    ov.classList.toggle("open");
    document.body.style.overflow = sb.classList.contains("open")
      ? "hidden"
      : "";
  };

  /* ── Sidebar collapse/expand (desktop) ── */
  window.toggleSidebarDesktop = function () {
    if (window.innerWidth <= 768) {
      toggleSidebar();
      return;
    }
    const shell = document.querySelector(".app-shell");
    shell.classList.toggle("sidebar-collapsed");
    const collapsed = shell.classList.contains("sidebar-collapsed");
    localStorage.setItem("biq_sidebar_collapsed", collapsed);
  };

  /* ── User dropdown ── */
  window.toggleUserDropdown = function (e) {
    e.stopPropagation();
    const dd = document.getElementById("userDropdown");
    const btn = document.getElementById("topbarUserBtn");
    const isOpen = dd.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen);
  };
  window.closeUserDropdown = function () {
    document.getElementById("userDropdown")?.classList.remove("open");
    document
      .getElementById("topbarUserBtn")
      ?.setAttribute("aria-expanded", "false");
  };
  window.toggleUserDropdownSidebar = function () {
    window.location.href = "settings.html";
  };

  /* ── Notifications ── */
  window.toggleNotif = function (e) {
    e.stopPropagation();
    document.getElementById("notifPanel")?.classList.toggle("open");
  };
  window.markNotifRead = function (el) {
    el.classList.remove("unread");
    el.querySelector(".notif-unread-dot")?.remove();
    updateNotifCount();
  };
  window.markAllRead = function () {
    document.querySelectorAll(".notif-item.unread").forEach((el) => {
      el.classList.remove("unread");
      el.querySelector(".notif-unread-dot")?.remove();
    });
    updateNotifCount();
  };
  function updateNotifCount() {
    const count = document.querySelectorAll(".notif-item.unread").length;
    const el = document.getElementById("notifCount");
    if (el) {
      el.textContent = count;
      el.style.display = count ? "flex" : "none";
    }
  }

  /* ── FAB ── */
  window.toggleFab = function () {
    document.getElementById("fabWrap")?.classList.toggle("open");
  };
  window.closeFab = function () {
    document.getElementById("fabWrap")?.classList.remove("open");
  };

  /* ── Lang sync ── */
  function syncLangButtons(dir) {
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.langBtn === dir);
    });
  }

  /* Overlay close */
  document.addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("sidebarOverlay")
      ?.addEventListener("click", toggleSidebar);
  });
})();
