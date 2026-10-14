const sample = `<!doctype html>
<html lang="ca">
<head>
  <meta charset="utf-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1">
  <title>La meva pàgina web</title>
  <style>
    body {
      max-width: 640px;
      margin: 60px auto;
      padding: 0 24px;
      font-family: system-ui, sans-serif;
      line-height: 1.7;
      color: #28362c;
      background: #fafbf8;
    }
    h1, h2 { line-height: 1.3; }
    h1 { font-size: 32px; }
    h2 { font-size: 21px; margin-top: 32px; }
    a { color: #35664a; }
    footer {
      border-top: 1px solid #d6ddd4;
      margin-top: 40px;
      padding-top: 16px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <h1>La meva pàgina web</h1>
  <p>Aquesta és la meva primera pàgina publicada
     amb GitHub Pages.</p>
  <h2>Sobre aquest projecte</h2>
  <p>Estic aprenent a publicar una pàgina web.
     Aquí hi puc explicar què faig i afegir
     els projectes que vagi creant.</p>
  <h2>Què vull afegir-hi</h2>
  <ul>
    <li>Una presentació del projecte.</li>
    <li>Algunes imatges.</li>
    <li>Enllaços a altres recursos.</li>
  </ul>
  <footer>
    Publicat amb <a href="https://pages.github.com/">GitHub Pages</a>.
  </footer>
</body>
</html>`;
document.querySelector('#sample').textContent = sample;
const checks = [...document.querySelectorAll('[data-step]')];
let saved = [];
try { saved = JSON.parse(localStorage.getItem('pages-tutorial-ca-progress') || '[]'); if(!Array.isArray(saved)) saved=[]; } catch {}
checks.forEach(c => { c.checked = saved.includes(c.dataset.step); c.addEventListener('change', update); });
function update(){const selected=checks.filter(c=>c.checked).map(c=>c.dataset.step); document.querySelector('#progress').value=selected.length; document.querySelector('#progressText').textContent=`${selected.length} de 5 passos fets`; document.querySelector('#celebration').hidden=selected.length!==5; try{localStorage.setItem('pages-tutorial-ca-progress',JSON.stringify(selected));}catch{}}
update();
document.querySelector('#reset').addEventListener('click',()=>{checks.forEach(c=>c.checked=false);update();});
let toastTimer;
function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3000);}
document.querySelector('#copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(sample);toast('Codi copiat');}catch{toast('No s’ha pogut copiar. Pots descarregar el fitxer.');}});
document.querySelector('#download').addEventListener('click',()=>{const u=URL.createObjectURL(new Blob([sample],{type:'text/html;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download='index.html';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);toast('Fitxer descarregat');});
function url(){const user=document.querySelector('#username').value.trim();const repo=document.querySelector('#repo').value.trim();const a=document.querySelector('#resultUrl');if(!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(user)||!repo||!/^[\w.-]+$/.test(repo)||repo==='.'||repo==='..'){a.removeAttribute('href');a.textContent='Escriu un usuari i un repositori vàlids.';return;}const path=repo.toLowerCase()===`${user.toLowerCase()}.github.io`?'':encodeURIComponent(repo)+'/';const address=`https://${user.toLowerCase()}.github.io/${path}`;a.href=address;a.textContent=address+' ↗';}
['username','repo'].forEach(id=>document.getElementById(id).addEventListener('input',url));

const themeToggle = document.getElementById('themeToggle');
function themeLabel(){const light=document.documentElement.dataset.theme==='light';themeToggle.textContent=light?'Fons fosc':'Fons blanc';themeToggle.setAttribute('aria-pressed',String(light));}
themeToggle.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=next;try{localStorage.setItem('pages-theme',next);}catch{}themeLabel();});
themeLabel();

const plantBubble=document.getElementById('plantBubble');
const plantToggle=document.getElementById('plantToggle');
const plantGuide=document.getElementById('plantGuide');
function plantOpen(open){plantBubble.hidden=!open;plantGuide.classList.toggle('collapsed',!open);plantToggle.setAttribute('aria-expanded',String(open));plantToggle.setAttribute('aria-label',open?"Amaga l'ajuda de la planteta":"Mostra l'ajuda de la planteta");try{localStorage.setItem('pages-plant-hidden',String(!open));}catch{}}
try{plantOpen(localStorage.getItem('pages-plant-hidden')!=='true');}catch{plantOpen(true);}
plantToggle.addEventListener('click',()=>plantOpen(plantBubble.hidden));
document.getElementById('plantHide').addEventListener('click',()=>{plantOpen(false);plantToggle.focus();});
const plantTips={conceptes:['Per començar','GitHub guarda el projecte. El repositori en conté els fitxers. Pages en publica la pàgina web.'],pas1:['1. El compte','El nom d’usuari no sempre és el nom que es mostra al perfil. Comprova’l: el necessitaràs per a l’adreça.'],pas2:['2. El repositori','Pensa en el repositori com la carpeta del projecte, amb un historial dels canvis.'],pas3:['3. Els fitxers','Deixa index.html al costat del README. Si queda dins d’una altra carpeta, Pages no el trobarà a l’arrel.'],pas4:['4. La publicació','Selecciona main i / (root), i prem Save. Si encara no veus la pàgina web, mira com va a Actions.'],pas5:['5. Comprova el resultat','L’enllaç de github.com mostra el codi. El de github.io és el que has de compartir per ensenyar la pàgina web.'],dubtes:['Si alguna cosa falla','Un 404 no vol dir que hagis perdut els fitxers. Revisa la carpeta, el nom index.html i l’estat del desplegament.']};
const plantSections=[...document.querySelectorAll('main section[id]')];let plantPending=false;
function plantPosition(){plantPending=false;let id='conceptes';for(const section of plantSections){if(section.getBoundingClientRect().top<=window.innerHeight*.4)id=section.id;}if(window.scrollY>0 && window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-8)id='dubtes';plantGuide.classList.toggle('is-wilted',id==='dubtes');const tip=plantTips[id];if(tip){document.getElementById('plantStep').textContent=tip[0];document.getElementById('plantTip').textContent=tip[1];}}
function queuePlant(){if(!plantPending){plantPending=true;requestAnimationFrame(plantPosition);}}
window.addEventListener('scroll',queuePlant,{passive:true});window.addEventListener('resize',queuePlant);plantPosition();
let plantMoveTimer,plantGreetingTimer;
window.addEventListener('scroll',()=>{
  plantToggle.classList.add('is-moving');
  clearTimeout(plantMoveTimer);
  plantMoveTimer=setTimeout(()=>plantToggle.classList.remove('is-moving'),220);
},{passive:true});
plantToggle.addEventListener('click',()=>{
  plantToggle.classList.remove('is-greeting');
  void plantToggle.offsetWidth;
  plantToggle.classList.add('is-greeting');
  clearTimeout(plantGreetingTimer);
  plantGreetingTimer=setTimeout(()=>plantToggle.classList.remove('is-greeting'),700);
});
