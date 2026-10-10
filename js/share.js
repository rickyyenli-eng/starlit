/* F：分享連結與下載 PDF（列印成 PDF） */
const SH_TXT={
 zh:{link:'複製分享連結',copied:'已複製連結',pdf:'下載 PDF（精簡）',pdfFull:'完整版 PDF',privacy:'連結裡含有出生日期與時間，只分享給你信任的人。',privPair:'連結裡含有你和合盤對象兩個人的出生資料（與對方的稱呼），只分享給你們都信任的人。',printTitle:'Starlit 星曜｜我的命盤',born:'出生',pair:'合盤對象'},
 en:{link:'Copy share link',copied:'Link copied',pdf:'Download PDF (summary)',pdfFull:'Full PDF',privacy:'The link contains the birth date and time. Share it only with people you trust.',privPair:'The link contains both your and your partner’s birth details (and their name). Share it only with people you both trust.',printTitle:'Starlit | My charts',born:'Born',pair:'Compared with'},
 ja:{link:'共有リンクをコピー',copied:'コピーしました',pdf:'PDF をダウンロード（要約）',pdfFull:'完全版 PDF',privacy:'リンクには生年月日と時刻が含まれます。信頼できる人とだけ共有してください。',privPair:'リンクにはあなたと相手のふたり分の出生データ（と相手の呼び名）が含まれます。おふたりが信頼できる人とだけ共有してください。',printTitle:'Starlit｜わたしのチャート',born:'生まれ',pair:'相性の相手'},
 fr:{link:'Copier le lien de partage',copied:'Lien copié',pdf:'Télécharger le PDF (résumé)',pdfFull:'PDF complet',privacy:'Le lien contient la date et l’heure de naissance. Ne le partagez qu’avec des personnes de confiance.',privPair:'Le lien contient vos données de naissance et celles de l’autre personne (et son prénom). Ne le partagez qu’avec des personnes de confiance pour vous deux.',printTitle:'Starlit | Mes thèmes',born:'Né(e) le',pair:'Comparé avec'}};
const ST=()=>SH_TXT[LG]||SH_TXT.zh;

function shareURL(){
  const v=LASTV||readForm(),q=new URLSearchParams();
  q.set('d',v.date);q.set('t',v.time);q.set('g',v.g==='男'?'m':'f');
  if(v.city&&CITIES.find(c=>c[0]===v.city&&c[4]!=null))q.set('c',v.city);else{q.set('lat',v.lat);q.set('lon',v.lon);q.set('tz',v.tz);}
  if(v.dst)q.set('dst','1');
  if(CTX.intent)q.set('i',CTX.intent);if(CTX.status)q.set('s',CTX.status);if(CTX.job)q.set('j',CTX.job);
  if(PBV){q.set('pd',PBV.date);if(PBV.dst)q.set('pdst','1');q.set('pt',PBV.time);q.set('pg',PBV.g==='男'?'m':'f');q.set('pc',PBV.city);if(PBV.name)q.set('pn',PBV.name);}
  q.set('lang',LG);
  return location.origin+location.pathname+'?'+q.toString();
}
function shareBar(){
  const T=ST();
  return `<div class="sharebar"><button type="button" id="sh-link">${T.link}</button><button type="button" id="sh-pdf">${T.pdf}</button><button type="button" id="sh-pdf-full">${T.pdfFull}</button><span class="muted sh-priv">${PBV?T.privPair:T.privacy}</span></div>`;
}
function shareBind(){
  const b=$('#sh-link'),p=$('#sh-pdf');if(!b)return;
  b.addEventListener('click',()=>{const u=shareURL(),T=ST();const done=()=>{b.textContent=T.copied;setTimeout(()=>b.textContent=T.link,1800);};
    if(navigator.share&&/Mobi|Android/i.test(navigator.userAgent))navigator.share({title:'Starlit',url:u}).catch(()=>{});
    else if(navigator.clipboard)navigator.clipboard.writeText(u).then(done,()=>prompt('',u));else prompt('',u);});
  p.addEventListener('click',()=>printReport(false));const pf=$('#sh-pdf-full');if(pf)pf.addEventListener('click',()=>printReport(true));
}
/* 從網址還原：填表、情境、合盤對象，然後自動排盤 */
function shareRestore(){
  const q=new URLSearchParams(location.search);if(!q.get('d')||!q.get('t'))return false;
  $('#f-date').value=q.get('d');$('#f-time').value=q.get('t');
  const r=document.querySelector(`input[name=g][value="${q.get('g')==='m'?'男':'女'}"]`);if(r)r.checked=true;
  if(q.get('c')){$('#f-city').value=q.get('c');onCity();}else{$('#f-city').value='';$('#f-lat').value=q.get('lat')||'';$('#f-lon').value=q.get('lon')||'';$('#f-tz').value=q.get('tz')||'';$('.adv').open=true;}
  $('#f-dst').checked=q.get('dst')==='1';
  const ok=(x,arr)=>arr.includes(x)?x:null;
  CTX.intent=ok(q.get('i'),['all','love','work','money','year']);CTX.status=ok(q.get('s'),['single','crush','dating','married','broke']);CTX.job=ok(q.get('j'),['student','seeking','employee','founder','change']);
  if(q.get('pd')){$('#p-date').value=q.get('pd');$('#p-time').value=q.get('pt')||'';$('#p-name').value=(q.get('pn')||'').slice(0,20);$('#p-city').value=q.get('pc')||'';
    if($('#p-dst'))$('#p-dst').checked=q.get('pdst')==='1';const pr=document.querySelector(`input[name=pg][value="${q.get('pg')==='m'?'男':'女'}"]`);if(pr)pr.checked=true;SH_PAIR=true;}
  return true;
}
let SH_PAIR=false;
function shareAfterRender(){if(SH_PAIR){SH_PAIR=false;$('#pairf').requestSubmit?$('#pairf').requestSubmit():pairSubmit(new Event('submit'));tab('pair');}}

/* ---------- 列印成 PDF：把所有分頁的完整內容攤平成一份報告 ---------- */
function printReport(full){
  const T=ST(),U=L.ui,v=LASTV||readForm();
  const city=(CITIES.find(c=>c[0]===v.city)||[])[{zh:0,en:1,ja:2,fr:3}[LG]]||`${v.lat}, ${v.lon}`;
  const sec=(tab)=>{const raw=splitSections(ADV[tab]||'');const used=new Set();let h='';
    GROUPS[tab].forEach(([key,keys])=>{const parts=[];keys.forEach(k=>{if(k[0]==='@')return;raw.forEach((x,j)=>{if(!used.has(j)&&x.key===k){used.add(j);parts.push(x);}});});
      if(parts.length)h+=`<h3 class="pr-cat">${U[key]}</h3>`+parts.map(pt=>`<h4>${pt.full}</h4>${pt.html}`).join('');});
    raw.forEach((x,j)=>{if(!used.has(j))h+=`<h4>${x.full}</h4>${x.html}`;});return h;};
  const clone=sel=>{const el=document.querySelector(sel);return el?el.outerHTML:'';};
  const tabs=[['west','tabW','#w-sum','#wheel','#w-read'],['zw','tabZ','#z-sum','#zw','#z-read'],['hd','tabH','#h-sum','#body','#h-read'],['mix','tabM','#m-sum',null,'#m-read']];
  const esc=t=>String(t||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let h=`<header class="pr-head"><h1>${T.printTitle}</h1><p>${T.born}${LG==='zh'||LG==='ja'?'：':' : '}${v.date} ${v.time}・${city}・${v.g==='男'?U.male:U.female}${PBV?`　｜　${T.pair}${LG==='zh'||LG==='ja'?'：':' : '}${esc(PBV.name)} ${esc(PBV.date)} ${esc(PBV.time)}`:''}</p></header>`;
  h+=`<section class="pr-sec"><h2>${U.hlTitle}</h2>${$('#hl-body').innerHTML}</section>`;
  for(const [tab,tk,sum,chart,read] of tabs){
    h+=`<section class="pr-sec"><h2>${U[tk]}</h2>${clone(sum)}${chart?`<div class="pr-chart">${clone(chart)}</div>`:''}<div class="reading plain"><div class="body">${(full&&sec(tab))||document.querySelector(read+' .body').innerHTML}</div></div></section>`;}
  if(PB&&ADV.pair)h+=`<section class="pr-sec"><h2>${U.tabP}</h2>${clone('#pair-sum')}${full?`<div class="reading plain"><div class="body">${sec('pair')}</div></div>`:''}</section>`;
  const aiOut=document.querySelector('#ai-box .ai-out');if(aiOut&&aiOut.textContent.trim())h+=`<section class="pr-sec"><h2>${AI_TXT[LG]?AI_TXT[LG].title:AI_TXT.zh.title}</h2><div class="reading plain"><div class="body">${aiOut.innerHTML}</div></div></section>`;
  let pr=$('#print');if(!pr){pr=document.createElement('div');pr.id='print';document.body.appendChild(pr);}
  pr.innerHTML=h;pr.querySelectorAll('details').forEach(d=>d.open=true);pr.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));
  document.body.classList.add('printing');
  const done=()=>{document.body.classList.remove('printing');window.removeEventListener('afterprint',done);};
  window.addEventListener('afterprint',done);setTimeout(()=>window.print(),50);
}
