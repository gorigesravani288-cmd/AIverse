/* AIverse Command Palette: drop-in feature for index.html.
 * Add <script src="palette.js"></script> just before </body>, AFTER the main inline script.
 * Opens with Ctrl+K (Windows/Linux) or Cmd+K (Mac), the "Ctrl K" badge in the search bar,
 * or the 🔎 button on small screens.
 *
 * It reuses what index.html already has: TOOLS, CATEGORIES, NAV_ITEMS, state, goToSection(),
 * escapeHtml() and the existing tool-card / category click handlers. Nothing is duplicated.
 */
(() => {
  'use strict';
  if (typeof TOOLS === 'undefined') { console.warn('[AIverse Palette] TOOLS not found: load palette.js after the main script'); return; }

  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '');
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Reuse the site's escapeHtml(); fall back to an identical one if it is missing.
  const esc = typeof escapeHtml === 'function'
    ? escapeHtml
    : v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const isPlaceholder = t => /example\.com/.test(t.website || '');

  // ---------- CSS (uses the site's own variables, so light/dark theme just works) ----------
  const CSS = `
.search-wrap .kbd{cursor:pointer}
#paletteBtn{display:inline-flex}
@media (min-width:640px){#paletteBtn{display:none}}
dialog.avp{position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:12vh 12px 12px;border:0;background:transparent;color:var(--text,#f1f5f9);overflow:hidden}
dialog.avp[open]{display:flex;justify-content:center;align-items:flex-start}
dialog.avp::backdrop{background:rgba(0,0,0,.6);backdrop-filter:blur(4px)}
.avp-panel{width:100%;max-width:640px;max-height:min(70vh,560px);display:flex;flex-direction:column;border-radius:20px;border:1px solid var(--border-strong,rgba(255,255,255,.2));background:var(--panel-solid,#0d0d18);box-shadow:0 30px 60px rgba(0,0,0,.5);overflow:hidden;animation:avpIn .16s ease-out}
@keyframes avpIn{from{opacity:0;transform:translateY(-8px) scale(.98)}to{opacity:1;transform:none}}
.avp-head{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--border,rgba(255,255,255,.1))}
.avp-head:focus-within{box-shadow:inset 0 -2px 0 var(--indigo,#4f46e5)}
.avp-input{flex:1;min-width:0;background:transparent;border:0;outline:0;font-size:16px;color:var(--text,#f1f5f9)}
.avp-input::placeholder{color:var(--text-dimmer,#64748b)}
.avp-esc{font:inherit;font-size:11px;color:var(--text-dimmer,#64748b);border:1px solid var(--border,rgba(255,255,255,.1));border-radius:6px;padding:3px 8px;background:none;cursor:pointer}
.avp-esc:hover{color:var(--text,#f1f5f9)}
.avp-esc:focus-visible{outline:2px solid var(--indigo,#4f46e5);outline-offset:2px}
.avp-list{list-style:none;margin:0;padding:6px;overflow-y:auto;overscroll-behavior:contain}
.avp-group{padding:10px 12px 4px;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text-dimmer,#64748b)}
.avp-item{display:flex;align-items:center;gap:12px;padding:9px 12px;border-radius:12px;border:1px solid transparent;cursor:pointer}
.avp-item.active{background:linear-gradient(90deg,rgba(79,70,229,.25),rgba(232,121,249,.08));border-color:rgba(99,102,241,.25)}
.avp-ico{width:34px;height:34px;flex:none;display:flex;align-items:center;justify-content:center;font-size:17px;border-radius:10px;background:var(--panel,rgba(255,255,255,.04));border:1px solid var(--border,rgba(255,255,255,.1))}
.avp-txt{flex:1;min-width:0;display:flex;flex-direction:column}
.avp-label{font-size:14px;font-weight:600}
.avp-sub{font-size:12px;color:var(--text-dim,#94a3b8)}
.avp-desc{font-size:12px;color:var(--text-dimmer,#64748b);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.avp-hint{opacity:0;font-size:12px;color:var(--text-dim,#94a3b8)}
.avp-item.active .avp-hint{opacity:1}
.avp mark{background:rgba(99,102,241,.3);color:inherit;border-radius:3px;padding:0 1px}
.avp-empty{padding:36px 16px;text-align:center}
.avp-empty strong{display:block;font-size:14px;margin-bottom:4px}
.avp-empty span{font-size:13px;color:var(--text-dimmer,#64748b)}
.avp-foot{display:flex;gap:16px;padding:10px 16px;border-top:1px solid var(--border,rgba(255,255,255,.1));font-size:12px;color:var(--text-dimmer,#64748b)}
.avp-foot kbd{font:inherit;border:1px solid var(--border,rgba(255,255,255,.1));border-radius:5px;padding:0 5px;margin-right:4px}
.avp-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (max-width:639px){dialog.avp{padding-top:8vh}.avp-foot{display:none}}
@media (prefers-reduced-motion:reduce){.avp-panel{animation:none}}`;

  // ---------- Reuse the site's existing behaviour by clicking its own hooks ----------
  // Tool cards use data-tool and category cards use data-cat; one delegated handler runs them.
  function proxyClick(attr, value) {
    const b = document.createElement('button');
    b.setAttribute(attr, value);
    b.style.display = 'none';
    document.body.appendChild(b);
    b.click();
    b.remove();
  }
  const clickId = id => () => { const b = document.getElementById(id); if (b) b.click(); };

  const SECTION_IDS = {
    'Dashboard': 'sec-Dashboard', 'AI Tools': 'sec-AITools', 'Favorites': 'sec-AITools', 'Workflows': 'sec-Workflows',
    'Collections': 'sec-CommunityCollections', 'Discover': 'sec-Discover', 'Categories': 'sec-Categories', 'Compare Tools': 'sec-CompareTools'
  };
  const NAV_LABELS = { 'Dashboard': 'Home', 'Discover': 'Trending & Discover', 'Collections': 'Community Collections' };

  function buildCommands() {
    const out = [];
    if (typeof NAV_ITEMS !== 'undefined' && typeof goToSection === 'function') {
      NAV_ITEMS.forEach(n => out.push({
        kind: 'section', ico: n.ico, label: NAV_LABELS[n.label] || n.label, keywords: n.label,
        run: () => {
          goToSection(n.label); // the site's own navigation (keeps sidebar state in sync)
          const el = document.getElementById(SECTION_IDS[n.label] || '');
          if (el && reduceMotion()) el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }));
    }
    const hub = document.getElementById('sec-CommunityHub');
    if (hub) out.push({ kind: 'section', ico: '🌍', label: 'Community Hub', keywords: '', run: () => hub.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' }) });

    if (document.getElementById('submitToolBtn')) out.push({ kind: 'action', ico: '➕', label: 'Submit a Tool', keywords: 'suggest add new', run: clickId('submitToolBtn') });
    if (window.AIverseStack) out.push({ kind: 'action', ico: '✨', label: 'Build my AI stack', keywords: 'goal plan', run: () => window.AIverseStack.open() });
    if (document.getElementById('wfGenerateBtn')) out.push({ kind: 'action', ico: '⚡', label: 'Generate a workflow with AI', keywords: 'steps plan', run: clickId('wfGenerateBtn') });
    if (document.getElementById('themeBtn')) {
      const light = document.body.getAttribute('data-theme') === 'light';
      out.push({ kind: 'action', ico: light ? '🌙' : '☀️', label: light ? 'Switch to dark theme' : 'Switch to light theme', keywords: 'theme mode appearance', run: clickId('themeBtn') });
    }
    if (!window.aiverseIsLoggedIn && document.getElementById('dashboardLoginBtn')) out.push({ kind: 'action', ico: '🔑', label: 'Log in', keywords: 'sign in account', run: clickId('dashboardLoginBtn') });
    return out;
  }

  // ---------- Search ----------
  let index = null, indexLen = -1;
  function toolIndex() {
    if (!index || indexLen !== TOOLS.length) {
      index = TOOLS.filter(t => !isPlaceholder(t)).map(t => ({
        t,
        name: String(t.name || '').toLowerCase(),
        cat: String(t.category || '').toLowerCase(),
        desc: String(t.desc || '').toLowerCase(),
        meta: (String(t.pricing || '') + ' ' + String(t.tag || '')).toLowerCase()
      }));
      indexLen = TOOLS.length;
    }
    return index;
  }

  function scoreTool(e, terms, query) {
    let s = 0;
    for (const w of terms) {
      if (e.name.startsWith(w)) s += 100;
      else if (e.name.includes(w)) s += 80;
      else if (e.cat.includes(w)) s += 50;
      else if (e.meta.includes(w)) s += 30;
      else if (e.desc.includes(w)) s += 20;
      else return 0; // every word must match somewhere
    }
    return e.name === query ? s + 200 : s;
  }

  const toolItem = t => ({ kind: 'tool', ico: t.logo, label: t.name, sub: (t.category || '') + (t.pricing ? ' · ' + t.pricing : ''), desc: t.desc, run: () => proxyClick('data-tool', t.name) });
  const catItem = c => {
    const n = TOOLS.filter(t => t.category === c.name && !isPlaceholder(t)).length;
    return { kind: 'category', ico: c.ico, label: c.name, sub: n + (n === 1 ? ' tool' : ' tools'), run: () => proxyClick('data-cat', c.name) };
  };
  const matches = (it, terms) => { const h = (it.label + ' ' + (it.keywords || '')).toLowerCase(); return terms.every(w => h.includes(w)); };

  function search(q, commands) {
    const query = q.trim().toLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    const groups = [];
    const tools = toolIndex().map(e => ({ e, s: scoreTool(e, terms, query) })).filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s || (b.e.t.rating || 0) - (a.e.t.rating || 0)).slice(0, 8).map(x => toolItem(x.e.t));
    if (tools.length) groups.push({ title: 'Tools', items: tools });
    const cats = (typeof CATEGORIES !== 'undefined' ? CATEGORIES : []).filter(c => terms.every(w => c.name.toLowerCase().includes(w))).slice(0, 4).map(catItem);
    if (cats.length) groups.push({ title: 'Categories', items: cats });
    const secs = commands.filter(c => c.kind === 'section' && matches(c, terms)).slice(0, 6);
    if (secs.length) groups.push({ title: 'Sections', items: secs });
    const acts = commands.filter(c => c.kind === 'action' && matches(c, terms)).slice(0, 5);
    if (acts.length) groups.push({ title: 'Actions', items: acts });
    return groups;
  }

  // Empty search: only real data (recently viewed, your Editor's Choice tag, real sections).
  function defaults(commands) {
    const groups = [];
    let recent = [];
    try { recent = (state.recentlyViewed || []).map(n => TOOLS.find(t => t.name === n)).filter(Boolean).slice(0, 4); } catch (e) { /* no state yet */ }
    if (recent.length) groups.push({ title: 'Recently viewed', items: recent.map(toolItem) });
    const picks = TOOLS.filter(t => t.tag === "Editor's Choice" && !isPlaceholder(t) && !recent.includes(t)).slice(0, 4);
    if (picks.length) groups.push({ title: "Editor's choice", items: picks.map(toolItem) });
    const secs = commands.filter(c => c.kind === 'section').slice(0, 6);
    if (secs.length) groups.push({ title: 'Go to', items: secs });
    const acts = commands.filter(c => c.kind === 'action');
    if (acts.length) groups.push({ title: 'Actions', items: acts });
    return groups;
  }

  // Escapes first, then wraps matches, so user/AI text can never become HTML.
  function highlight(text, terms) {
    text = String(text ?? '');
    if (!terms.length) return esc(text);
    const re = new RegExp('(' + terms.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'ig');
    return text.split(re).map((part, i) => (i % 2 ? '<mark>' + esc(part) + '</mark>' : esc(part))).join('');
  }

  // ---------- UI ----------
  let dlg, input, list, status, commands = [], flat = [], active = -1;

  function build() {
    if (dlg) return;
    dlg = document.createElement('dialog');
    dlg.className = 'avp';
    dlg.setAttribute('aria-label', 'Command palette');
    dlg.innerHTML = `<div class="avp-panel">
      <div class="avp-head">
        <span aria-hidden="true">🔍</span>
        <input class="avp-input" type="text" role="combobox" aria-expanded="true" aria-controls="avp-list" aria-autocomplete="list"
          aria-label="Search tools, categories and sections" placeholder="Search AIverse..." autocomplete="off" spellcheck="false" autofocus>
        <button type="button" class="avp-esc" aria-label="Close command palette">ESC</button>
      </div>
      <ul id="avp-list" class="avp-list" role="listbox" aria-label="Results"></ul>
      <div class="avp-foot" aria-hidden="true"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div>
      <div class="avp-sr" aria-live="polite"></div>
    </div>`;
    document.body.appendChild(dlg);
    input = dlg.querySelector('.avp-input');
    list = dlg.querySelector('.avp-list');
    status = dlg.querySelector('.avp-sr');

    input.addEventListener('input', render);
    input.addEventListener('keydown', e => {
      if (e.isComposing) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); if (active >= 0) choose(flat[active]); }
    });
    dlg.querySelector('.avp-esc').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); }); // click outside the panel
    list.addEventListener('mousedown', e => e.preventDefault()); // keep focus in the input
    list.addEventListener('mousemove', e => {
      const li = e.target.closest('.avp-item');
      if (li && +li.dataset.i !== active) { active = +li.dataset.i; paint(false); }
    });
    list.addEventListener('click', e => {
      const li = e.target.closest('.avp-item');
      if (li) choose(flat[+li.dataset.i]);
    });
  }

  function render() {
    const q = input.value;
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean).sort((a, b) => b.length - a.length);
    const groups = terms.length ? search(q, commands) : defaults(commands);
    flat = [];
    let html = '';
    groups.forEach(g => {
      html += '<li role="presentation" class="avp-group">' + esc(g.title) + '</li>';
      g.items.forEach(it => {
        const i = flat.push(it) - 1;
        html += '<li role="option" id="avp-opt-' + i + '" class="avp-item" data-i="' + i + '" aria-selected="false">' +
          '<span class="avp-ico" aria-hidden="true">' + esc(it.ico) + '</span>' +
          '<span class="avp-txt"><span class="avp-label">' + highlight(it.label, terms) + '</span>' +
          (it.sub ? '<span class="avp-sub">' + highlight(it.sub, terms) + '</span>' : '') +
          (it.desc ? '<span class="avp-desc">' + highlight(it.desc, terms) + '</span>' : '') + '</span>' +
          '<span class="avp-hint" aria-hidden="true">↵</span></li>';
      });
    });
    if (!flat.length) {
      html = '<li role="presentation" class="avp-empty"><strong>No results found</strong><span>Try searching for a tool name, category, or section.</span></li>';
    }
    list.innerHTML = html;
    active = flat.length ? 0 : -1;
    status.textContent = flat.length ? flat.length + ' results. Use the up and down arrow keys, then Enter.' : 'No results found';
    paint(false);
  }

  function paint(scroll) {
    list.querySelectorAll('.avp-item').forEach(li => {
      const on = +li.dataset.i === active;
      li.classList.toggle('active', on);
      li.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on && scroll) li.scrollIntoView({ block: 'nearest' });
    });
    if (active >= 0) input.setAttribute('aria-activedescendant', 'avp-opt-' + active);
    else input.removeAttribute('aria-activedescendant');
  }

  function move(d) {
    if (!flat.length) return;
    active = (active + d + flat.length) % flat.length;
    paint(true);
  }

  function choose(item) {
    if (!item) return;
    dlg.close();
    // Wait a moment so the browser finishes returning focus before we scroll or open another modal.
    setTimeout(() => { try { item.run(); } catch (e) { console.error('[AIverse Palette]', e); } }, 60);
  }

  function open() {
    build();
    if (dlg.open) { input.focus(); input.select(); return; }
    commands = buildCommands();
    input.value = '';
    dlg.showModal(); // gives us focus trapping, Esc to close, and focus returning to the opener
    render();
    input.focus();
  }

  function init() {
    const st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    document.addEventListener('keydown', e => {
      if (!(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey || String(e.key || '').toLowerCase() !== 'k') return;
      const t = e.target;
      const inField = t && t.closest && t.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]');
      // Never hijack typing in other form fields. The site's own top search box is allowed.
      if (inField && t.id !== 'searchInput' && !(dlg && dlg.contains(t))) return;
      e.preventDefault();
      open();
    });

    const kbd = document.querySelector('.search-wrap .kbd');
    if (kbd) {
      kbd.textContent = isMac ? '⌘K' : 'Ctrl K';
      kbd.title = 'Open command palette';
      kbd.addEventListener('click', e => { e.stopPropagation(); open(); });
    }
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn && themeBtn.parentNode) {
      const b = document.createElement('button');
      b.type = 'button';
      b.id = 'paletteBtn';
      b.className = 'icon-btn';
      b.textContent = '🔎';
      b.title = 'Search everything (' + (isMac ? '⌘K' : 'Ctrl K') + ')';
      b.setAttribute('aria-label', 'Open command palette');
      b.addEventListener('click', open);
      themeBtn.parentNode.insertBefore(b, themeBtn);
    }
  }

  window.AIversePalette = { open };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
