const DATA_PATH = 'data/anime.json';

let animeList = [];

const el = id => document.getElementById(id);

async function loadData() {
  try {
    const res = await fetch(DATA_PATH);
    animeList = await res.json();
    renderResults(animeList);
  } catch (e) {
    console.error('Failed to load data', e);
    el('results').innerHTML = '<div class="text-red-400">Failed to load sample data.</div>';
  }
}

function normalize(text) {
  return (text || '').toLowerCase();
}

function matchesQuery(item, q) {
  q = normalize(q);
  if (!q) return true;
  if (normalize(item.title).includes(q)) return true;
  if ((item.altTitles||[]).some(t => normalize(t).includes(q))) return true;
  return false;
}

function renderResults(list) {
  const container = el('results');
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = '<div class="text-gray-400">No results.</div>';
    return;
  }

  for (const a of list) {
    const card = document.createElement('article');
    card.className = 'group bg-gradient-to-b from-gray-800/60 to-gray-900/60 rounded-lg overflow-hidden shadow-sm transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-blue-900/20';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'h-48 w-full bg-cover bg-center';
    imgWrap.style.backgroundImage = `url(${a.coverImage})`;
    imgWrap.setAttribute('aria-hidden', 'true');

    const body = document.createElement('div');
    body.className = 'p-4';

    const h = document.createElement('h3');
    h.className = 'text-lg font-extrabold text-white';
    h.textContent = a.title;

    const p = document.createElement('p');
    p.className = 'text-sm text-gray-300 mt-2 line-clamp-3';
    p.textContent = a.synopsis;

    const foot = document.createElement('div');
    foot.className = 'mt-4 flex items-center justify-between gap-3';

    const tags = document.createElement('div');
    tags.className = 'text-xs text-gray-300';
    tags.textContent = a.languages.map(l => l.label).join(' • ');

    const btn = document.createElement('button');
    btn.className = 'bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full text-sm font-semibold transition';
    btn.textContent = 'View';
    btn.onclick = () => showDetail(a.id);

    foot.appendChild(tags);
    foot.appendChild(btn);

    body.appendChild(h);
    body.appendChild(p);
    body.appendChild(foot);

    card.appendChild(imgWrap);
    card.appendChild(body);
    container.appendChild(card);
  }
}

function showDetail(id) {
  const item = animeList.find(x => x.id === id);
  if (!item) return;
  el('listView').classList.add('hidden');
  el('detailView').classList.remove('hidden');
  // cover with gradient overlay
  el('coverImage').src = item.coverImage;
  el('coverImage').className = 'w-full rounded shadow-2xl';
  el('animeTitle').textContent = item.title + (item.year ? ` (${item.year})` : '');
  el('synopsis').textContent = item.synopsis;

  const tags = el('tags');
  tags.innerHTML = '';
  for (const l of item.languages) {
    const t = document.createElement('span');
    t.className = 'px-3 py-1 bg-gray-800/60 border border-gray-700 text-sm rounded-full text-gray-100';
    t.textContent = `${l.emoji} ${l.label}`;
    tags.appendChild(t);
  }

  const start = el('startWatching');
  start.href = item.firstEpisodeLink || '#';
  start.target = '_blank';
  start.className = 'inline-block mt-4 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition';

  renderScenes(item);
}

function renderScenes(item) {
  const grid = el('scenesGrid');
  grid.innerHTML = '';
  const scenes = (item.scenes || []);
  if (!scenes.length) {
    grid.innerHTML = '<div class="text-gray-400">No scenes indexed.</div>';
    return;
  }

  for (const s of scenes) {
    const card = document.createElement('article');
    card.className = 'group bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition';

    // thumbnail with aspect-video and zoom on hover
    const thumbWrap = document.createElement('div');
    thumbWrap.className = 'aspect-video w-full overflow-hidden bg-gray-700';

    const thumb = document.createElement('div');
    thumb.className = 'w-full h-full bg-center bg-cover transform transition duration-500 group-hover:scale-105';
    thumb.style.backgroundImage = `url(${s.thumbnail})`;

    thumbWrap.appendChild(thumb);

    const body = document.createElement('div');
    body.className = 'p-3';

    const title = document.createElement('div');
    title.className = 'font-semibold text-white';
    title.textContent = `Ep ${s.episode} — ${s.title}`;

    const desc = document.createElement('div');
    desc.className = 'text-sm text-gray-300 mt-1 line-clamp-2';
    desc.textContent = s.description;

    const btn = document.createElement('a');
    btn.className = 'inline-flex items-center gap-2 mt-3 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full text-sm font-semibold text-white transition';
    btn.href = s.link;
    btn.target = '_blank';
    btn.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 5.5v9l7-4.5-7-4.5z"/></svg><span>Play</span>';

    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(btn);

    card.appendChild(thumbWrap);
    card.appendChild(body);
    grid.appendChild(card);
  }
}

function wireEvents() {
  el('backBtn').onclick = () => {
    el('detailView').classList.add('hidden');
    el('listView').classList.remove('hidden');
  };

  const search = el('searchInput');
  search.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    const filtered = animeList.filter(a => matchesQuery(a, q));
    renderResults(filtered);
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  wireEvents();
  await loadData();
});

