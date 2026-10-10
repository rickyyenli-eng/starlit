/* AI 完整人生報告書／深度合盤報告書：AI 依三張盤寫成分章節的長篇報告，排成封面＋圖表＋章節，可下載 PDF。
 * 產生過的報告書存在這台裝置（localStorage），再次打開不必重新產生。 */
const BK_TXT={
 zh:{title:'完整人生報告書',ptitle:'深度合盤報告書',sub:'AI 依你的紫微、星盤、人類圖寫成一本約一萬字、分章節的個人報告書：天賦、工作、金錢、感情、人際、身心、未來幾年逐年走向，最後是一封寫給你的信。可以下載成 PDF 保存。',
  psub:'AI 依你們兩人的三張盤寫成分章節的合盤報告書：吸引、默契、摩擦、承諾、金錢與生活、未來幾年，最後是一封寫給你們的信。',
  name:'報告書上的名字（選填）',go:'產生報告書',again:'重新產生',read:'閱讀報告書',pdf:'下載 PDF',close:'關閉',busy:'AI 正在寫，大約需要 2–4 分鐘，請不要關閉頁面…',chars:n=>`已寫 ${n} 字`,
  done:'完成！',saved:at=>`已保存在這台裝置（${at}）`,err:'暫時連不上，請稍後再試。',limit:n=>`今天產生報告書的次數用完了（每天 ${n} 次），明天再來。`,stop:'停止',
  cover:'人生報告書',pcover:'合盤報告書',born:'出生',made:'製作日期',figs:'你的三張盤',fW:'西洋星盤',fZ:'紫微命盤',fH:'人類圖',sum:'重點摘要',tl:'人生走向',ai:'本報告由 AI 依命盤資料撰寫，僅供參考與自我探索。',needPair:'先在上面完成合盤，才能產生合盤報告書。'},
 en:{title:'Complete life report',ptitle:'In-depth compatibility report',sub:'AI turns your Zi Wei, astrology and Human Design charts into a chaptered personal report of about 6,000 words: gifts, work, money, love, people, wellbeing, the years ahead, and a closing letter to you. Download it as a PDF to keep.',
  psub:'AI turns both of your charts into a chaptered compatibility report: attraction, rapport, friction, commitment, money and life plans, the years ahead, and a letter to you both.',
  name:'Name on the report (optional)',go:'Create my report',again:'Create again',read:'Read the report',pdf:'Download PDF',close:'Close',busy:'AI is writing. This takes about 2–4 minutes; please keep this page open…',chars:n=>`${n} characters so far`,
  done:'Done!',saved:at=>`Saved on this device (${at})`,err:'Can’t connect right now. Please try again later.',limit:n=>`You’ve used today’s ${n} reports. Come back tomorrow.`,stop:'Stop',
  cover:'Life report',pcover:'Compatibility report',born:'Born',made:'Created',figs:'Your three charts',fW:'Astrology chart',fZ:'Zi Wei chart',fH:'Human Design',sum:'Key points',tl:'The road ahead',ai:'Written by AI from your chart data, for reflection and self-discovery only.',needPair:'Complete a compatibility reading above first.'},
 ja:{title:'人生レポートブック',ptitle:'相性レポートブック',sub:'紫微斗数・西洋占星術・ヒューマンデザインをもとに、AI が章立ての個人レポート（約1万字）を書きます。才能、仕事、お金、恋愛、人間関係、心身、これから数年の流れ、そして最後にあなたへの手紙。PDF で保存できます。',
  psub:'二人のチャートをもとに、AI が章立ての相性レポートを書きます。惹かれ合う点、相性、摩擦、約束、お金と暮らし、これから数年、そして二人への手紙。',
  name:'レポートに入れる名前（任意）',go:'レポートを作る',again:'作り直す',read:'レポートを読む',pdf:'PDF をダウンロード',close:'閉じる',busy:'AI が執筆中です。2〜4 分ほどかかります。ページを閉じないでください…',chars:n=>`${n} 字まで書きました`,
  done:'完成しました！',saved:at=>`この端末に保存済み（${at}）`,err:'接続できませんでした。時間をおいてお試しください。',limit:n=>`本日の作成回数（${n} 回）を使い切りました。また明日どうぞ。`,stop:'停止',
  cover:'人生レポートブック',pcover:'相性レポートブック',born:'生まれ',made:'作成日',figs:'あなたの三つのチャート',fW:'西洋占星術',fZ:'紫微斗数',fH:'ヒューマンデザイン',sum:'要点',tl:'これからの流れ',ai:'このレポートは AI がチャートのデータをもとに書いたもので、参考と自己理解のためのものです。',needPair:'先に上で相性を出してください。'},
 fr:{title:'Rapport de vie complet',ptitle:'Rapport de compatibilité approfondi',sub:'L’IA transforme vos thèmes Zi Wei, astrologique et Human Design en un rapport personnel d’environ 6 000 mots, en chapitres : talents, travail, argent, amour, entourage, bien-être, les années à venir et une lettre pour vous. À télécharger en PDF.',
  psub:'L’IA transforme vos deux thèmes en un rapport de compatibilité en chapitres : attirance, complicité, frictions, engagement, argent et projets, les années à venir et une lettre pour vous deux.',
  name:'Nom sur le rapport (facultatif)',go:'Créer mon rapport',again:'Recréer',read:'Lire le rapport',pdf:'Télécharger en PDF',close:'Fermer',busy:'L’IA écrit. Comptez 2 à 4 minutes ; gardez cette page ouverte…',chars:n=>`${n} caractères écrits`,
  done:'Terminé !',saved:at=>`Enregistré sur cet appareil (${at})`,err:'Connexion impossible pour le moment. Réessayez plus tard.',limit:n=>`Vous avez utilisé vos ${n} rapports du jour. Revenez demain.`,stop:'Arrêter',
  cover:'Rapport de vie',pcover:'Rapport de compatibilité',born:'Né(e) le',made:'Créé le',figs:'Vos trois thèmes',fW:'Thème astral',fZ:'Thème Zi Wei',fH:'Human Design',sum:'L’essentiel',tl:'Les années à venir',ai:'Rédigé par l’IA à partir de vos données de thème, à titre de réflexion personnelle.',needPair:'Faites d’abord une lecture de compatibilité ci-dessus.'}};
const BT=()=>BK_TXT[LG]||BK_TXT.zh;
const BK={ctl:{},gen:{}};
const bEsc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function bKey(pair){const v=LASTV;if(!v)return null;let k=`${v.date}|${v.time}|${v.g}|${v.lat}|${v.lon}|${v.tz}|${v.dst?1:0}|${LG}`;if(pair){if(!PBV)return null;k+=`||${PBV.date}|${PBV.time}|${PBV.g}|${PBV.city}|${PBV.dst?1:0}`;}return 'starlit-bk-'+(pair?'p-':'')+k;}
function bGet(pair){try{const k=bKey(pair);return k?JSON.parse(localStorage.getItem(k)||'null'):null;}catch(e){return null;}}
function bPut(pair,o){try{const k=bKey(pair);if(k)localStorage.setItem(k,JSON.stringify(o));}catch(e){}}
/* 報告書用的 Markdown：# → h1、## → h2、### → h3，其餘同 aiMd（全部先跳脫） */
function bMd(md){
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const inl=s=>esc(s).replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/\*([^*]+)\*/g,'<i>$1</i>');
  const out=[];let list=null;
  for(const raw of md.split('\n')){const l=raw.trim();
    if(/^[-*]\s+/.test(l)){(list=list||[]).push(`<li>${inl(l.replace(/^[-*]\s+/,''))}</li>`);continue;}
    if(list){out.push(`<ul>${list.join('')}</ul>`);list=null;}
    if(!l||/^-{3,}$/.test(l))continue;
    const h=l.match(/^(#{1,4})\s+(.*)$/);if(h){const n=Math.min(h[1].length,3);out.push(`<h${n} class="bk-h${n}">${inl(h[2])}</h${n}>`);continue;}
    out.push(`<p>${inl(l)}</p>`);}
  if(list)out.push(`<ul>${list.join('')}</ul>`);return out.join('');
}
function bBox(pair){
  const el=document.querySelector(pair?'#pbook-box':'#book-box');if(!el)return;if(!AI_URL){el.hidden=true;return;}
  const T=BT(),saved=bGet(pair);el.hidden=pair&&!PB;
  const busy=!!BK.ctl[pair?1:0];
  const nm=pair?'':`<input class="bk-name" maxlength="20" placeholder="${T.name}" value="${bEsc(BK.name||(typeof vLoad==='function'&&LASTV?((vLoad().find(x=>vSameBirth(x,LASTV))||{}).name||''):''))}">`;
  el.innerHTML=`<div class="bk-h"><span class="bk-ico">📖</span><div><h3>${pair?T.ptitle:T.title}</h3><p class="muted">${pair?T.psub:T.sub}</p></div></div>
   <div class="bk-row">${nm}<button type="button" class="go2btn bk-go">${busy?T.stop:saved?T.again:T.go}</button>${saved&&!busy?`<button type="button" class="bk-read">${T.read}</button><button type="button" class="bk-pdf">${T.pdf}</button>`:''}</div>
   <p class="muted bk-st" aria-live="polite">${busy?T.busy:saved?T.saved(new Date(saved.at).toLocaleString()):''}</p>`;
  el.querySelector('.bk-go').addEventListener('click',()=>bRun(pair));
  const r=el.querySelector('.bk-read');if(r)r.addEventListener('click',()=>bShow(pair));
  const p=el.querySelector('.bk-pdf');if(p)p.addEventListener('click',()=>bPrint(pair));
  const n=el.querySelector('.bk-name');if(n)n.addEventListener('input',()=>{BK.name=n.value;});
}
async function bRun(pair){
  const i=pair?1:0;if(BK.ctl[i]){BK.ctl[i].abort();return;}
  if(pair&&!PB)return;
  const T=BT(),el=document.querySelector(pair?'#pbook-box':'#book-box');
  const gen=BK.gen[i]=(BK.gen[i]||0)+1,ctl=BK.ctl[i]=new AbortController();bBox(pair);
  const st=()=>el.querySelector('.bk-st');let md='';
  try{
    const r=await fetch(AI_URL,{method:'POST',headers:{'Content-Type':'application/json'},signal:ctl.signal,body:JSON.stringify({mode:pair?'pairbook':'book',lang:LG,chart:aiChartData(pair?'pair':'all')+(pair?'':bMonths())})});
    if(gen!==BK.gen[i])return;
    if(!r.ok){let j={};try{j=await r.json();}catch(e){}BK.ctl[i]=null;bBox(pair);st().textContent=r.status===429&&j.error!=='busy'?T.limit(j.limit||2):r.status===429?T.busy:T.err;return;}
    const rd=r.body.getReader(),dec=new TextDecoder();let buf='';
    for(;;){const {value,done}=await rd.read();if(done||gen!==BK.gen[i])break;buf+=dec.decode(value,{stream:true});let k;
      while((k=buf.indexOf('\n'))>=0){const line=buf.slice(0,k).trim();buf=buf.slice(k+1);if(!line.startsWith('data:'))continue;let ev;try{ev=JSON.parse(line.slice(5));}catch(e){continue;}
        if(ev.type==='content_block_delta'&&ev.delta&&ev.delta.text){md+=ev.delta.text;const s=st();if(s)s.textContent=`${T.busy} ${T.chars(md.length)}`;}}}
    if(gen!==BK.gen[i])return;
    BK.ctl[i]=null;
    if(md.length>500){bPut(pair,{md,at:Date.now(),name:pair?'':(BK.name||'')});bBox(pair);st().textContent=T.done+' '+T.saved(new Date().toLocaleString());bShow(pair);}
    else{bBox(pair);st().textContent=T.err;}
  }catch(e){if(gen===BK.gen[i]){BK.ctl[i]=null;bBox(pair);if(e.name!=='AbortError')st().textContent=T.err;}}
}
function bHTML(pair){
  const T=BT(),U=L.ui,o=bGet(pair);if(!o)return '';const v=LASTV||readForm();
  const li={zh:0,en:1,ja:2,fr:3}[LG],place=x=>{const c=CITIES.find(c=>c[0]===x.city&&c[4]!=null);return c?c[li]:`${x.lat}, ${x.lon}`;};
  const who=pair?`${bEsc(o.name||'')}`:bEsc(o.name||BK.name||'');
  const clone=sel=>{const e=document.querySelector(sel);return e?e.outerHTML.replace(/ id="[^"]*"/g,''):'';};
  const colon=LG==='zh'||LG==='ja'?'：':' : ';
  let h=`<section class="bk-cover"><div class="bk-brand">Starlit 星曜</div><h1>${who?who+(LG==='zh'||LG==='ja'?'的':' — '):''}${pair?T.pcover:T.cover}</h1>
    <p>${T.born}${colon}${bEsc(v.date)} ${bEsc(v.time)}・${bEsc(place(v))}${pair&&PBV?`<br>＋ ${bEsc(PBV.name||'')} ${bEsc(PBV.date)} ${bEsc(PBV.time)}`:''}</p><p class="bk-made">${T.made}${colon}${new Date(o.at).toLocaleDateString()}</p><p class="bk-ai">${T.ai}</p></section>`;
  if(!pair){h+=`<section class="bk-figs"><h2 class="bk-h2">${T.figs}</h2><div class="bk-fig"><h3>${T.fW}</h3>${clone('#wheel')}</div><div class="bk-fig"><h3>${T.fZ}</h3>${clone('#zw')}</div><div class="bk-fig"><h3>${T.fH}</h3>${clone('#body')}</div></section>`;
    const cards=document.querySelector('#hl-body .hl-cards'),tl=document.querySelector('#hl-body .tl');
    h+=`<section class="bk-sum"><h2 class="bk-h2">${T.sum}</h2>${cards?cards.outerHTML:''}${tl?tl.outerHTML.replace(/<details/g,'<details open'):''}</section>`;}
  else{h+=`<section class="bk-sum"><h2 class="bk-h2">${T.sum}</h2>${clone('#pair-sum')}</section>`;}
  h+=`<section class="bk-text">${bMd(o.md)}</section>`;
  return h;
}
function bShow(pair){
  const d=$('#bookv');$('#bookv-body').innerHTML=`<article class="book">${bHTML(pair)}</article>`;
  $('#bookv-body').querySelectorAll('button:not(.cell)').forEach(b=>b.remove());
  $('#bookv-pdf').textContent=BT().pdf;$('#bookv-pdf').onclick=()=>bPrint(pair);$('#bookv-x').setAttribute('aria-label',BT().close);
  if(!d.open)d.showModal();document.body.classList.add('dlg-open');$('#bookv-body').scrollTop=0;
}
function bPrint(pair){
  let pr=$('#print');if(!pr){pr=document.createElement('div');pr.id='print';document.body.appendChild(pr);}
  pr.innerHTML=`<article class="book">${bHTML(pair)}</article>`;pr.querySelectorAll('button:not(.cell)').forEach(b=>b.remove());pr.querySelectorAll('details').forEach(x=>x.open=true);
  if($('#bookv').open)$('#bookv').close();
  document.body.classList.add('printing');const done=()=>{document.body.classList.remove('printing');window.removeEventListener('afterprint',done);};window.addEventListener('afterprint',done);setTimeout(()=>window.print(),50);
}
/* 今年逐月資料（農曆流月），給報告書第八章用 */
function bMonths(){try{if(!window.Calendar)return '';const ly=Highlights.zh.curYear(Z);const ms=Calendar.zh.months(W,Z,HD,Engine,ly);if(!ms.length)return '';
  const f=t=>{const d=new Date(t);return `${d.getUTCMonth()+1}/${d.getUTCDate()}`;},RN={Mercury:'水星逆行',Venus:'金星逆行',Mars:'火星逆行'},TN={up:'順',even:'平',hard:'留意'};
  return `\n\n# 今年逐月（農曆 ${ly} 年流月，國曆日期為約略範圍）\n`+ms.map(x=>`${x.label}（約 ${f(x.from)}–${f(x.to)}）：流月命宮在本命${x.mp||'—'}；流月四化 ${x.muts.map(m=>`${m.star}化${m.k}→${m.pal||'—'}`).join(' ')}；整體 ${TN[x.tone]}`+(x.retro.length?`；${x.retro.map(r=>`${RN[r.k]} ${f(r.from)}–${f(r.to)}`).join('、')}`:'')+(x.ing.length?`；${x.ing.map(g=>`${g.k==='Jupiter'?'木星':'土星'}約 ${f(g.t)} 進入第${g.h}宮`).join('、')}`:'')).join('\n');}catch(e){return '';}}
function bInit(){$('#bookv-x').addEventListener('click',()=>$('#bookv').close());$('#bookv').addEventListener('close',()=>document.body.classList.remove('dlg-open'));}
function bReset(){for(const i of [0,1]){BK.gen[i]=(BK.gen[i]||0)+1;if(BK.ctl[i]){try{BK.ctl[i].abort();}catch(e){}BK.ctl[i]=null;}}BK.name='';}
function bRender(){bBox(false);bBox(true);}
