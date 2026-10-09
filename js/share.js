/* F：分享連結與下載 PDF（列印成 PDF） */
const SH_TXT={
 zh:{link:'複製分享連結',copied:'已複製連結',pdf:'下載 PDF',privacy:'連結裡含有出生日期與時間，只分享給你信任的人。',printTitle:'Starlit 星曜｜我的命盤',born:'出生',pair:'合盤對象'},
 en:{link:'Copy share link',copied:'Link copied',pdf:'Download PDF',privacy:'The link contains the birth date and time. Share it only with people you trust.',printTitle:'Starlit | My charts',born:'Born',pair:'Compared with'},
 ja:{link:'共有リンクをコピー',copied:'コピーしました',pdf:'PDF をダウンロード',privacy:'リンクには生年月日と時刻が含まれます。信頼できる人とだけ共有してください。',printTitle:'Starlit｜わたしのチャート',born:'生まれ',pair:'相性の相手'},
 fr:{link:'Copier le lien de partage',copied:'Lien copié',pdf:'Télécharger en PDF',privacy:'Le lien contient la date et l’heure de naissance. Ne le partagez qu’avec des personnes de confiance.',printTitle:'Starlit | Mes thèmes',born:'Né(e) le',pair:'Comparé avec'}};
const ST=()=>SH_TXT[LG]||SH_TXT.zh;

function shareURL(){
  const v=readForm(),q=new URLSearchParams();
  q.set('d',v.date);q.set('t',v.time);q.set('g',v.g==='男'?'m':'f');
  if(v.city&&CITIES.find(c=>c[0]===v.city&&c[4]!=null))q.set('c',v.city);else{q.set('lat',v.lat);q.set('lon',v.lon);q.set('tz',v.tz);}
  if(v.dst)q.set('dst','1');
  if(CTX.intent)q.set('i',CTX.intent);if(CTX.status)q.set('s',CTX.status);if(CTX.job)q.set('j',CTX.job);
  if(PBV){q.set('pd',PBV.date);q.set('pt',PBV.time);q.set('pg',PBV.g==='男'?'m':'f');q.set('pc',PBV.city);if(PBV.name)q.set('pn',PBV.name);}
  q.set('lang',LG);
  return location.origin+location.pathname+'?'+q.toString();
}
function shareBar(){
  const T=ST();
  return `<div class="sharebar"><button type="button" id="sh-link">${T.link}</button><button type="button" id="sh-pdf">${T.pdf}</button><span class="muted">${T.privacy}</span></div>`;
}
function shareBind(){
  const b=$('#sh-link'),p=$('#sh-pdf');if(!b)return;
  b.addEventListener('click',()=>{const u=shareURL(),T=ST();const done=()=>{b.textContent=T.copied;setTimeout(()=>b.textContent=T.link,1800);};
    if(navigator.share&&/Mobi|Android/i.test(navigator.userAgent))navigator.share({title:'Starlit',url:u}).catch(()=>{});
    else if(navigator.clipboard)navigator.clipboard.writeText(u).then(done,()=>prompt('',u));else prompt('',u);});
  p.addEventListener('click',printReport);
}
/* 從網址還原：填表、情境、合盤對象，然後自動排盤 */
function shareRestore(){
  const q=new URLSearchParams(location.search);if(!q.get('d')||!q.get('t'))return false;
  $('#f-date').value=q.get('d');$('#f-time').value=q.get('t');
  const r=document.querySelector(`input[name=g][value="${q.get('g')==='m'?'男':'女'}"]`);if(r)r.checked=true;
  if(q.get('c')){$('#f-city').value=q.get('c');onCity();}else{$('#f-city').value='';$('#f-lat').value=q.get('lat')||'';$('#f-lon').value=q.get('lon')||'';$('#f-tz').value=q.get('tz')||'';$('.adv').open=true;}
  $('#f-dst').checked=q.get('dst')==='1';
  CTX.intent=q.get('i');CTX.status=q.get('s');CTX.job=q.get('j');
  if(q.get('pd')){$('#p-date').value=q.get('pd');$('#p-time').value=q.get('pt')||'';$('#p-name').value=q.get('pn')||'';$('#p-city').value=q.get('pc')||'';
    const pr=document.querySelector(`input[name=pg][value="${q.get('pg')==='m'?'男':'女'}"]`);if(pr)pr.checked=true;SH_PAIR=true;}
  return true;
}
let SH_PAIR=false;
function shareAfterRender(){if(SH_PAIR){SH_PAIR=false;$('#pairf').requestSubmit?$('#pairf').requestSubmit():pairSubmit(new Event('submit'));}}

/* ---------- 列印成 PDF：把所有分頁的完整內容攤平成一份報告 ---------- */
function printReport(){
  const T=ST(),U=L.ui,v=readForm();
  const city=(CITIES.find(c=>c[0]===v.city)||[])[{zh:0,en:1,ja:2,fr:3}[LG]]||`${v.lat}, ${v.lon}`;
  const sec=(tab)=>{const raw=splitSections(ADV[tab]||'');const used=new Set();let h='';
    GROUPS[tab].forEach(([key,keys])=>{const parts=[];keys.forEach(k=>{if(k[0]==='@')return;raw.forEach((x,j)=>{if(!used.has(j)&&x.key===k){used.add(j);parts.push(x);}});});
      if(parts.length)h+=`<h3 class="pr-cat">${U[key]}</h3>`+parts.map(pt=>`<h4>${pt.full}</h4>${pt.html}`).join('');});
    raw.forEach((x,j)=>{if(!used.has(j))h+=`<h4>${x.full}</h4>${x.html}`;});return h;};
  const clone=sel=>{const el=document.querySelector(sel);return el?el.outerHTML:'';};
  const tabs=[['west','tabW','#w-sum','#wheel','#w-read'],['zw','tabZ','#z-sum','#zw','#z-read'],['hd','tabH','#h-sum','#body','#h-read'],['mix','tabM','#m-sum',null,'#m-read']];
  let h=`<header class="pr-head"><h1>${T.printTitle}</h1><p>${T.born}：${v.date} ${v.time}・${city}・${v.g==='男'?U.male:U.female}${PBV?`　｜　${T.pair}：${PBV.name||''} ${PBV.date} ${PBV.time}`:''}</p></header>`;
  h+=`<section class="pr-sec"><h2>${U.hlTitle}</h2>${$('#hl-body').innerHTML}</section>`;
  for(const [tab,tk,sum,chart,read] of tabs){
    h+=`<section class="pr-sec"><h2>${U[tk]}</h2>${clone(sum)}${chart?`<div class="pr-chart">${clone(chart)}</div>`:''}<div class="reading plain"><div class="body">${document.querySelector(read+' .body').innerHTML}${sec(tab)}</div></div></section>`;}
  if(PB&&ADV.pair)h+=`<section class="pr-sec"><h2>${U.tabP}</h2>${clone('#pair-sum')}<div class="reading plain"><div class="body">${sec('pair')}</div></div></section>`;
  const aiOut=document.querySelector('#ai-box .ai-out');if(aiOut&&aiOut.textContent.trim())h+=`<section class="pr-sec"><h2>${AI_TXT[LG]?AI_TXT[LG].title:AI_TXT.zh.title}</h2><div class="reading plain"><div class="body">${aiOut.innerHTML}</div></div></section>`;
  let pr=$('#print');if(!pr){pr=document.createElement('div');pr.id='print';document.body.appendChild(pr);}
  pr.innerHTML=h;pr.querySelectorAll('details').forEach(d=>d.open=true);pr.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));
  document.body.classList.add('printing');
  const done=()=>{document.body.classList.remove('printing');window.removeEventListener('afterprint',done);};
  window.addEventListener('afterprint',done);setTimeout(()=>window.print(),50);
}
