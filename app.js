// Light client helpers for all pages
async function fetchJSON(p){ const r = await fetch(p); if(!r.ok) throw new Error('Load error '+p); return r.json(); }
function fmtDate(iso){ try { const d = new Date(iso); return d.toLocaleString(); } catch(e){ return iso; } }
function qs(s,el=document){ return el.querySelector(s); }
function qsa(s,el=document){ return Array.from(el.querySelectorAll(s)); }

// World map interactions (world.html)
function bindWorld(){
  const map = qs('#worldMap');
  if(!map) return;
  map.addEventListener('click', async e => {
    const g = e.target.closest('[id]');
    if(!g) return;
    const id = g.id;
    const data = await fetchJSON('assets/data/world.json');
    const cont = data.world.continents.find(c=>c.id===id || c.id.replace(/\s/g,'')===id);
    if(cont){
      const out = qs('#worldInfo');
      out.innerHTML = `<h3 class="section-title">${cont.id}</h3>
      <p class="muted"><span class="badge">${cont.biome}</span> ${cont.hook}</p>`;
      out.scrollIntoView({behavior:'smooth'});
    }
  });
}

// Home page data
async function homeInit(){
  const sessionsBox = qs('#sessionsBox');
  const activityBox = qs('#activityBox');
  if(!sessionsBox || !activityBox) return;
  const s = await fetchJSON('assets/data/sessions.json');
  sessionsBox.innerHTML = s.upcoming.map(x=>`<div class="card">
    <h3>${x.title}</h3>
    <p class="small muted">${x.where} • ${fmtDate(x.when)} • ${x.players} • DM ${x.dm}</p>
    <div class="bar"><span style="width:${x.fill}%"></span></div>
  </div>`).join('');

  activityBox.innerHTML = s.recent.map(x=>`<div class="card">
    <h3>${x.title}</h3>
    <p class="small muted">${x.detail}</p>
  </div>`).join('');
}

// Characters page
async function charactersInit(){
  const list = qs('#charList');
  if(!list) return;
  const d = await fetchJSON('assets/data/characters.json');
  list.innerHTML = d.characters.map(c=>`<div class="card">
    <h3>${c.name}</h3>
    <p class="small muted">${c.ancestry} ${c.class} • Level ${c.level}</p>
    <p class="small">${c.note}</p>
  </div>`).join('');
}

// Sessions page
async function sessionsInit(){
  const list = qs('#sessionList');
  if(!list) return;
  const d = await fetchJSON('assets/data/sessions.json');
  list.innerHTML = d.upcoming.map(s=>`<div class="card">
    <h3>${s.title}</h3>
    <p class="small muted">${s.where} • ${fmtDate(s.when)} • ${s.players} • DM ${s.dm}</p>
    <button class="btn" data-join="${s.title}">I will join</button>
  </div>`).join('');

  list.addEventListener('click', e=>{
    const btn = e.target.closest('[data-join]'); if(!btn) return;
    const t = btn.getAttribute('data-join');
    localStorage.setItem('rsvp:'+t,'yes');
    btn.textContent = 'RSVP recorded';
  });
}

// Factions page
async function factionsInit(){
  const list = qs('#factionList');
  if(!list) return;
  const d = await fetchJSON('assets/data/factions.json');
  list.innerHTML = d.factions.map(f=>`<div class="card">
    <h3>${f.name}</h3>
    <p class="small">${f.summary}</p>
    <p class="small muted">Influence <span class="badge">${f.influence}</span></p>
  </div>`).join('');
}

// Tools page
function toolsInit(){
  const reinc = qs('#reincForm'); if(reinc){
    reinc.addEventListener('submit', e=>{
      e.preventDefault();
      const soul = qs('#soulName').value.trim();
      const cls = qs('#soulClass').value;
      const race = qs('#soulRace').value;
      if(!soul) return;
      const key = 'reinc:'+soul;
      localStorage.setItem(key, JSON.stringify({soul,cls,race,ts:Date.now()}));
      qs('#reincOut').textContent = `Recorded: ${soul} • ${race} ${cls}`;
    });
  }
  const loot = qs('#lootForm'); if(loot){
    loot.addEventListener('submit', e=>{
      e.preventDefault();
      const name = qs('#lootName').value.trim();
      const where = qs('#lootWhere').value.trim();
      if(!name) return;
      const list = JSON.parse(localStorage.getItem('loot')||'[]');
      list.push({name,where,ts:Date.now()});
      localStorage.setItem('loot', JSON.stringify(list));
      drawLoot();
    });
    drawLoot();
  }
  function drawLoot(){
    const list = JSON.parse(localStorage.getItem('loot')||'[]');
    qs('#lootList').innerHTML = list.map(x=>`<li>${x.name} <span class="small muted">(${x.where})</span></li>`).join('') || '<li class="small muted">None yet</li>';
  }
}

// Page router
document.addEventListener('DOMContentLoaded', ()=>{
  bindWorld();
  homeInit();
  charactersInit();
  sessionsInit();
  factionsInit();
  toolsInit();
});
