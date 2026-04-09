/* =========================================================
   TipTap — sidebar.js  v3
   Injects sidebar, topbar extras, FAB, footer.
   All text uses data-i18n — translated by i18n.js
   ========================================================= */

(function () {
  /* ── Notification data (keys map to i18n if needed) ── */
  const notifs = [
    {
      icon: "🚀",
      iconBg: "var(--brand-light)",
      titleKey: "Campaign Launched",
      desc: "Eid Al-Fitr Promo is live — 21,340 recipients queued.",
      time: "2 min ago",
      unread: true,
    },
    {
      icon: "✅",
      iconBg: "var(--green-light)",
      titleKey: "Broadcast Delivered",
      desc: "Flash Sale — 7,954 messages delivered (96.9%).",
      time: "18 min ago",
      unread: true,
    },
    {
      icon: "⚠️",
      iconBg: "var(--orange-light)",
      titleKey: "Delivery Warning",
      desc: "New Arrivals broadcast has 43% failure rate.",
      time: "1h ago",
      unread: true,
    },
    {
      icon: "💬",
      iconBg: "var(--wa-light)",
      titleKey: "WhatsApp API Connected",
      desc: "Meta Cloud API handshake successful.",
      time: "2h ago",
      unread: false,
    },
    {
      icon: "👤",
      iconBg: "var(--purple-light)",
      titleKey: "New Contact Imported",
      desc: "CSV import completed — 1,240 contacts added.",
      time: "5h ago",
      unread: false,
    },
    {
      icon: "🏆",
      iconBg: "var(--yellow-light)",
      titleKey: "Campaign Completed",
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
        <div class="notif-item-title">${n.titleKey}</div>
        <div class="notif-item-desc">${n.desc}</div>
        <div class="notif-item-time">${n.time}</div>
      </div>
      ${n.unread ? '<div class="notif-unread-dot"></div>' : ""}
    </div>`,
    )
    .join("");

  /* ── Sidebar HTML ── */
  const sidebarHTML = `
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div class="logo-mark">📡</div>
      <div class="logo-wordmark"><span data-i18n="app_name">TipTap</span></div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-group-label" data-i18n="nav_group_main">Main</div>
      <a class="nav-link" href="dashboard.html">
        <span class="nav-icon-wrap">📊</span>
        <span data-i18n="nav_dashboard">Dashboard</span>
      </a>
      <a class="nav-link" href="campaigns.html">
        <span class="nav-icon-wrap">🚀</span>
        <span data-i18n="nav_campaigns">Campaigns</span>
        <span class="nav-badge">3</span>
      </a>
      <a class="nav-link" href="broadcasts.html">
        <span class="nav-icon-wrap">📋</span>
        <span data-i18n="nav_broadcasts">Broadcasts</span>
      </a>
      <a class="nav-link" href="#">
        <span class="nav-icon-wrap">📬</span>
        <span data-i18n="nav_inbox">Inbox</span>
        <span class="nav-badge orange">7</span>
      </a>
      <div class="nav-group-label" data-i18n="nav_group_management">Management</div>
      <a class="nav-link" href="contacts.html">
        <span class="nav-icon-wrap">👥</span>
        <span data-i18n="nav_contacts">Contacts</span>
      </a>
      <a class="nav-link" href="#">
        <span class="nav-icon-wrap">📝</span>
        <span data-i18n="nav_templates">Templates</span>
      </a>
      <a class="nav-link" href="#">
        <span class="nav-icon-wrap">📅</span>
        <span data-i18n="nav_schedule">Schedule</span>
      </a>
      <div class="nav-group-label" data-i18n="nav_group_config">Configuration</div>
      <a class="nav-link" href="whatsapp-config.html">
        <span class="nav-icon-wrap">💬</span>
        <span data-i18n="nav_whatsapp">WhatsApp API</span>
        <span class="nav-badge green" data-i18n="status_live">Live</span>
      </a>
      <a class="nav-link" href="settings.html">
        <span class="nav-icon-wrap">⚙️</span>
        <span data-i18n="nav_settings">Settings</span>
      </a>
      <a class="nav-link" href="users.html">
        <span class="nav-icon-wrap">👤</span>
        <span data-i18n="nav_users">Users</span>
      </a>
    </nav>
    <div class="sidebar-footer" id="sidebarFooter">
      <div class="user-card" onclick="window.location.href='settings.html'">
        <div class="user-avatar" id="sbUserAvatar">AH</div>
        <div>
          <div class="user-name">Ahmed Al-Hassan</div>
          <div class="user-role" data-i18n="user_role_admin">Administrator</div>
        </div>
        <span class="user-caret">▾</span>
      </div>
    </div>
  </aside>`;

  /* ── Topbar extras HTML ── */
  const topbarExtrasHTML = `
  <!-- Notifications -->
  <div class="notif-wrap" id="notifWrap">
    <button class="notif-btn" id="notifBtn" onclick="toggleNotif(event)" data-i18n-title="topbar_notifications">
      🔔
      <span class="notif-count" id="notifCount">${unreadCount}</span>
    </button>
    <div class="notif-panel" id="notifPanel">
      <div class="notif-panel-head">
        <div class="notif-panel-title">
          <span data-i18n="topbar_notifications">Notifications</span>
          <span style="color:var(--brand);font-size:12px;margin-inline-start:6px">(${unreadCount} <span data-i18n="notif_new">new</span>)</span>
        </div>
        <button class="notif-mark-all" onclick="markAllRead()" data-i18n="topbar_mark_all_read">Mark all read</button>
      </div>
      <div class="notif-list" id="notifList">${notifItemsHTML}</div>
      <div class="notif-panel-footer">
        <a href="#" data-i18n="topbar_view_all">View all notifications</a>
      </div>
    </div>
  </div>

  <!-- Lang Toggle -->
  <div class="lang-toggle" id="topbarLang">
    <button class="lang-toggle-btn" data-lang-btn="en" onclick="I18n.setLang('en')">🇬🇧 EN</button>
    <button class="lang-toggle-btn" data-lang-btn="ar" onclick="I18n.setLang('ar')">🇴🇲 AR</button>
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
        <div class="dropdown-email">admin@tiptap.com</div>
      </div>
      <a class="dropdown-item" href="settings.html">
        <span class="dropdown-icon">⚙️</span>
        <span data-i18n="nav_settings">Settings</span>
      </a>
      <a class="dropdown-item" href="users.html">
        <span class="dropdown-icon">👥</span>
        <span data-i18n="nav_users">Users</span>
      </a>
      <div style="height:1px;background:var(--border);margin:4px 0"></div>
      <a class="dropdown-item danger" href="login.html">
        <span class="dropdown-icon">🚪</span>
        <span data-i18n="nav_signout">Sign Out</span>
      </a>
    </div>
  </div>`;

  /* ── FAB HTML ── */
  const fabHTML = `
  <div class="fab-wrap" id="fabWrap">
    <div class="fab-sub-items">
      <div class="fab-sub" onclick="openModal('modalAddContact')">
        <span class="fab-sub-label" data-i18n="fab_contact">Add Contact</span>
        <button class="fab-sub-btn" style="background:var(--green);color:#fff">👤</button>
      </div>
      <div class="fab-sub" onclick="openModal('modalAddBroadcast')">
        <span class="fab-sub-label" data-i18n="fab_broadcast">New Broadcast</span>
        <button class="fab-sub-btn" style="background:var(--wa);color:#fff">📤</button>
      </div>
      <div class="fab-sub" onclick="openModal('modalAddCampaign')">
        <span class="fab-sub-label" data-i18n="fab_campaign">New Campaign</span>
        <button class="fab-sub-btn" style="background:var(--brand);color:#fff">🚀</button>
      </div>
    </div>
    <button class="fab-main" id="fabMain" onclick="toggleFab()">+</button>
  </div>

  <!-- FAB: Add Contact -->
  <div class="modal-backdrop" id="modalAddContact">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-header-icon" style="background:var(--green-light)">👤</div>
        <div>
          <div class="modal-title" data-i18n="modal_add_contact">Add New Contact</div>
          <div class="modal-subtitle" data-i18n="modal_add_contact_sub">Stored in your database</div>
        </div>
        <button class="modal-close" onclick="closeModal('modalAddContact')">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" data-i18n="field_first_name">First Name</label>
            <input class="form-control" type="text" data-i18n-placeholder="field_first_name"/>
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="field_last_name">Last Name</label>
            <input class="form-control" type="text" data-i18n-placeholder="field_last_name"/>
          </div>
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" data-i18n="field_phone">Phone (WhatsApp)</label>
            <input class="form-control" type="tel" placeholder="+968 9X XXX XXXX"/>
            <div class="form-hint" data-i18n="field_phone_hint">E.164 format required</div>
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="field_email">Email</label>
            <input class="form-control" type="email" data-i18n-placeholder="field_email"/>
          </div>
        </div>
        <div class="form-row-2">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label" data-i18n="field_group">Group</label>
            <select class="form-control">
              <option>VIP</option><option>Regular</option><option>New Lead</option><option>Corporate</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label" data-i18n="field_status">Status</label>
            <select class="form-control">
              <option data-i18n="status_subscribed">Subscribed</option>
              <option data-i18n="status_pending">Pending</option>
              <option data-i18n="status_unsubscribed">Unsubscribed</option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModal('modalAddContact')" data-i18n="btn_cancel">Cancel</button>
        <button class="btn btn-primary" onclick="closeModal('modalAddContact');showToast(t('modal_add_contact')+' ✅','success')" data-i18n="btn_save">Save</button>
      </div>
    </div>
  </div>

  <!-- FAB: Add Broadcast -->
  <div class="modal-backdrop" id="modalAddBroadcast">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-header-icon" style="background:var(--wa-light)">📤</div>
        <div>
          <div class="modal-title" data-i18n="fab_broadcast">New Broadcast</div>
          <div class="modal-subtitle" data-i18n="modal_add_contact_sub">WhatsApp Business</div>
        </div>
        <button class="modal-close" onclick="closeModal('modalAddBroadcast')">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label" data-i18n="field_campaign_name">Name</label>
          <input class="form-control" type="text"/>
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" data-i18n="field_audience">Audience</label>
            <select class="form-control">
              <option>All Contacts (24,180)</option><option>VIP (948)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="field_dispatch">Send At</label>
            <select class="form-control">
              <option data-i18n="dispatch_now">Send Now</option>
              <option data-i18n="dispatch_schedule">Schedule</option>
            </select>
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label" data-i18n="field_message">Message</label>
          <textarea class="form-control" rows="3"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModal('modalAddBroadcast')" data-i18n="btn_cancel">Cancel</button>
        <button class="btn btn-wa" onclick="closeModal('modalAddBroadcast');showToast('Broadcast sent 📤','success')" data-i18n="btn_send">Send</button>
      </div>
    </div>
  </div>

  <!-- FAB: Add Campaign -->
  <div class="modal-backdrop" id="modalAddCampaign">
    <div class="modal" style="max-width:580px">
      <div class="modal-header">
        <div class="modal-header-icon" style="background:var(--brand-light)">🚀</div>
        <div>
          <div class="modal-title" data-i18n="modal_campaign">New Campaign</div>
          <div class="modal-subtitle" data-i18n="modal_campaign_sub">WhatsApp Business campaign</div>
        </div>
        <button class="modal-close" onclick="closeModal('modalAddCampaign')">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label" data-i18n="field_campaign_name">Campaign Name</label>
          <input class="form-control" type="text"/>
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" data-i18n="field_audience">Audience</label>
            <select class="form-control"><option>All Contacts (24,180)</option><option>VIP (948)</option></select>
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="field_dispatch">Dispatch</label>
            <select class="form-control">
              <option data-i18n="dispatch_now">Send Now</option>
              <option data-i18n="dispatch_schedule">Schedule</option>
            </select>
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label" data-i18n="field_message">Message</label>
          <textarea class="form-control" rows="3"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModal('modalAddCampaign')" data-i18n="btn_cancel">Cancel</button>
        <button class="btn btn-primary" onclick="closeModal('modalAddCampaign');showToast('Campaign launched 🚀','success')" data-i18n="btn_launch">🚀 Launch</button>
      </div>
    </div>
  </div>`;

  /* ── Footer HTML ── */
  const footerHTML = `
  <footer class="site-footer">
    <div class="footer-copy">
      © ${new Date().getFullYear()} <span data-i18n="app_name">TipTap</span>.
      <span data-i18n="footer_rights">All Rights Reserved by</span>
      <a href="https://92techoman.com" target="_blank">92TechOman.com</a>
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

  /* ── DOMContentLoaded: inject topbar extras + footer + setup ── */
  document.addEventListener("DOMContentLoaded", () => {
    /* Active nav */
    const page = location.pathname.split("/").pop() || "dashboard.html";
    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("href") === page) link.classList.add("active");
    });

    /* Topbar extras → append to .topbar-actions */
    const actions = document.querySelector(".topbar-actions");
    if (actions) actions.insertAdjacentHTML("beforeend", topbarExtrasHTML);

    /* Sidebar desktop toggle button → prepend to .topbar */
    const topbar = document.querySelector(".topbar");
    if (topbar) {
      const btn = document.createElement("button");
      btn.className = "sidebar-toggle-btn";
      btn.title = "Toggle Sidebar";
      btn.innerHTML = "<span></span><span></span><span></span>";
      btn.onclick = toggleSidebarDesktop;
      topbar.insertBefore(btn, topbar.firstChild);
    }

    /* Footer → append to main-content */
    document
      .querySelector(".main-content")
      ?.insertAdjacentHTML("beforeend", footerHTML);

    /* Restore sidebar collapse state */
    if (
      localStorage.getItem("biq_sidebar_collapsed") === "true" &&
      window.innerWidth > 768
    ) {
      document.querySelector(".app-shell")?.classList.add("sidebar-collapsed");
    }

    /* Restore avatar */
    const av = localStorage.getItem("biq_avatar");
    if (av) {
      document
        .querySelectorAll(".topbar-avatar, #sbUserAvatar")
        .forEach((el) => {
          el.innerHTML = `<img src="${av}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>`;
        });
    }

    /* Close dropdowns / FAB on outside click */
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#notifWrap"))
        document.getElementById("notifPanel")?.classList.remove("open");
      if (!e.target.closest("#topbarUser")) closeUserDropdown();
      if (!e.target.closest("#fabWrap")) closeFab();
    });

    /* Overlay close */
    document
      .getElementById("sidebarOverlay")
      ?.addEventListener("click", toggleSidebar);
  });

  /* ── Public: sidebar toggle (mobile) ── */
  window.toggleSidebar = function () {
    const sb = document.getElementById("sidebar");
    const ov = document.getElementById("sidebarOverlay");
    if (!sb) return;
    sb.classList.toggle("open");
    ov?.classList.toggle("open");
    document.body.style.overflow = sb.classList.contains("open")
      ? "hidden"
      : "";
  };

  /* ── Public: sidebar collapse (desktop) ── */
  window.toggleSidebarDesktop = function () {
    if (window.innerWidth <= 768) {
      toggleSidebar();
      return;
    }
    const shell = document.querySelector(".app-shell");
    shell?.classList.toggle("sidebar-collapsed");
    localStorage.setItem(
      "biq_sidebar_collapsed",
      String(shell?.classList.contains("sidebar-collapsed")),
    );
  };

  /* ── User dropdown ── */
  window.toggleUserDropdown = function (e) {
    e.stopPropagation();
    const dd = document.getElementById("userDropdown");
    const btn = document.getElementById("topbarUserBtn");
    const now = dd?.classList.toggle("open");
    btn?.setAttribute("aria-expanded", String(now));
  };
  window.closeUserDropdown = function () {
    document.getElementById("userDropdown")?.classList.remove("open");
    document
      .getElementById("topbarUserBtn")
      ?.setAttribute("aria-expanded", "false");
  };

  /* ── Notifications ── */
  window.toggleNotif = function (e) {
    e.stopPropagation();
    document.getElementById("notifPanel")?.classList.toggle("open");
  };
  window.markNotifRead = function (el) {
    el.classList.remove("unread");
    el.querySelector(".notif-unread-dot")?.remove();
    _updateNotifCount();
  };
  window.markAllRead = function () {
    document.querySelectorAll(".notif-item.unread").forEach((el) => {
      el.classList.remove("unread");
      el.querySelector(".notif-unread-dot")?.remove();
    });
    _updateNotifCount();
  };
  function _updateNotifCount() {
    const n = document.querySelectorAll(".notif-item.unread").length;
    const el = document.getElementById("notifCount");
    if (el) {
      el.textContent = n;
      el.style.display = n ? "flex" : "none";
    }
  }

  /* ── FAB ── */
  window.toggleFab = function () {
    document.getElementById("fabWrap")?.classList.toggle("open");
  };
  window.closeFab = function () {
    document.getElementById("fabWrap")?.classList.remove("open");
  };
})();
