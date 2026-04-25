// ── Toast Notifications ──────────────────────────────────────────────────────
function showToast(message, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || '🔔'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; toast.style.transition = 'all 0.3s ease'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ── Modal Helpers ─────────────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// Clicking backdrop closes modal
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });
  });
});

// ── Active Nav ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href && (path === href || (href !== '/' && path.startsWith(href)))) {
      item.classList.add('active');
    }
    if (path === '/' && href === '/') item.classList.add('active');
  });

  // Live date in topbar
  const dateEl = document.getElementById('liveDate');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-PK', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  }
});

// ── API Helpers ───────────────────────────────────────────────────────────────
async function apiGet(url) {
  const res = await fetch(url);
  return res.json();
}

async function apiPost(url, data) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  return res.json();
}

async function apiPut(url, data) {
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  return res.json();
}

async function apiDelete(url) {
  const res = await fetch(url, { method: 'DELETE' });
  return res.json();
}

// ── Sidebar HTML (shared) ─────────────────────────────────────────────────────
function renderSidebar() {
  return `
  <div class="sidebar-brand">
    <div class="brand-icon">🎓</div>
    <h1>Student Management System</h1>
    <p>UIIT · PMAS-AAUR</p>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section">Main</div>
    <a href="/" class="nav-item">
      <span class="nav-icon">🏠</span>
      <span>Dashboard</span>
    </a>
    <div class="nav-section">Academic</div>
    <a href="/students" class="nav-item">
      <span class="nav-icon">👨‍🎓</span>
      <span>Students</span>
    </a>
    <a href="/courses" class="nav-item">
      <span class="nav-icon">📚</span>
      <span>Courses</span>
    </a>
    <div class="nav-section">Communication</div>
    <a href="/announcements" class="nav-item">
      <span class="nav-icon">📢</span>
      <span>Announcements</span>
    </a>
  </nav>
  <div class="sidebar-footer">
    <div>Web Technologies</div>
    <div>CSC-251 · Spring 2026</div>
    <div>Dr. Muhammad Habib</div>
  </div>`;
}
