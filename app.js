// CSS Property Reference — render logic

const sidebar = document.getElementById('sidebar-categories');
const content = document.getElementById('content');
const searchInput = document.getElementById('search-input');
const countLabel = document.getElementById('element-count');

function slug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function totalCount() {
  return CSS_REFERENCE.reduce((sum, cat) => sum + cat.properties.length, 0);
}

function renderSidebar() {
  sidebar.innerHTML = CSS_REFERENCE.map((cat) => `
    <a class="cat-link" href="#${slug(cat.category)}" data-cat="${slug(cat.category)}">
      <span>${cat.category}</span>
      <span class="count">${cat.properties.length}</span>
    </a>
  `).join('');
}

function propertyCard(p) {
  const nameDisplay = `${escapeHtml(p.prop)}<span class="colon">;</span>`;
  const previewMarkup = p.demo && p.demo.trim()
    ? `<div class="preview-pane">${p.demo}</div>`
    : `<div class="no-visual">No direct visual output</div>`;

  return `
    <div class="card" data-prop="${p.prop.toLowerCase()}">
      <div class="card-head">
        <span class="prop-name">${nameDisplay}</span>
        ${p.shorthand ? '<span class="shorthand-badge">shorthand</span>' : ''}
        <span class="card-desc">${escapeHtml(p.desc)}</span>
      </div>
      <div class="card-body">
        <div>
          <p class="panel-label">Syntax</p>
          <pre class="syntax-block">${escapeHtml(p.syntax)}</pre>
          <p class="attrs-line">Common values: <code>${escapeHtml(p.values)}</code></p>
        </div>
        <div>
          <p class="panel-label">Live preview</p>
          ${previewMarkup}
        </div>
      </div>
    </div>
  `;
}

function renderContent() {
  content.innerHTML = CSS_REFERENCE.map((cat) => `
    <section class="category-section" id="${slug(cat.category)}">
      <h2 class="category-heading">
        ${cat.category}
        <span class="tally">${cat.properties.length} properties</span>
      </h2>
      ${cat.properties.map(propertyCard).join('')}
    </section>
  `).join('');
}

function applyFilter(query) {
  const q = query.trim().toLowerCase();
  const cards = content.querySelectorAll('.card');
  let visible = 0;

  cards.forEach((card) => {
    const match = !q || card.dataset.prop.includes(q);
    card.style.display = match ? '' : 'none';
    if (match) visible += 1;
  });

  content.querySelectorAll('.category-section').forEach((section) => {
    const anyVisible = [...section.querySelectorAll('.card')].some((c) => c.style.display !== 'none');
    section.style.display = anyVisible ? '' : 'none';
  });

  countLabel.textContent = q ? `${visible} / ${totalCount()} properties` : `${totalCount()} properties`;
}

function setupScrollSpy() {
  const links = [...sidebar.querySelectorAll('.cat-link')];
  const sections = [...content.querySelectorAll('.category-section')];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.toggle('active', l.dataset.cat === entry.target.id));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach((s) => observer.observe(s));
}

renderSidebar();
renderContent();
countLabel.textContent = `${totalCount()} properties`;
searchInput.addEventListener('input', (e) => applyFilter(e.target.value));
setupScrollSpy();
