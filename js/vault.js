/* 我的命盤本：把多張盤存在這台裝置（localStorage），可切換、改名、刪除、選為合盤對象、匯出匯入。
 * 另含「關於與隱私」說明。資料只存在使用者自己的瀏覽器，不會上傳。 */
const VT_TXT={
 zh:{book:'我的命盤本',save:'存進命盤本',saved:'已存',name:'這張盤的名字',namePh:'例如：我、媽媽、小美',empty:'還沒有存任何命盤。排好盤後按「存進命盤本」。',
  open:'打開',pair:'和目前的盤合盤',rename:'改名',del:'刪除',delQ:'確定刪除「NAME」？',exp:'匯出備份',imp:'匯入備份',impBad:'檔案格式不對。',impOk:'已匯入 N 張盤。',
  note:'命盤本只存在這台裝置的瀏覽器裡，不會上傳到任何伺服器。換手機或清除瀏覽資料前，請先匯出備份。',fromBook:'從命盤本選',cur:'目前',close:'關閉',
  about:'關於與隱私',aboutHtml:`<h3>關於 Starlit 星曜</h3><p>Starlit 把紫微斗數、西洋占星與人類圖放在一起看。排盤使用瑞士星曆表（Swiss Ephemeris）與開源紫微排盤程式 iztro，每個解讀都標出依據，讓你可以自己對照。</p><p>命理是認識自己的一種角度，不是命運的判決。健康內容只是生活提醒，不能取代醫療；金錢內容不是投資建議。</p><h3>隱私</h3><ul><li>排盤計算都在你的瀏覽器裡完成，生日不會上傳到我們的伺服器。</li><li>只有你按下 AI 相關功能時，會把<b>盤面摘要</b>（星曜、行星位置等，不含姓名、出生地）傳給 AI 中繼站，再轉給 Anthropic 的 Claude 產生文字；我們不保存這些內容。</li><li>命盤本、AI 對話紀錄只存在你這台裝置的瀏覽器，可以隨時刪除。</li><li>分享連結裡含有出生日期與時間，請只分享給信任的人。</li></ul>`},
 en:{book:'My chart book',save:'Save to chart book',saved:'Saved',name:'Name for this chart',namePh:'e.g. Me, Mum, Alex',empty:'No charts saved yet. After reading a chart, tap “Save to chart book”.',
  open:'Open',pair:'Compare with current',rename:'Rename',del:'Delete',delQ:'Delete “NAME”?',exp:'Export backup',imp:'Import backup',impBad:'That file is not a valid backup.',impOk:'Imported N charts.',
  note:'Your chart book lives only in this browser on this device and is never uploaded. Export a backup before switching phones or clearing browser data.',fromBook:'Pick from chart book',cur:'Current',close:'Close',
  about:'About & privacy',aboutHtml:`<h3>About Starlit</h3><p>Starlit reads Zi Wei Dou Shu, Western astrology and Human Design side by side. Charts are computed with the Swiss Ephemeris and the open-source Zi Wei engine iztro, and every reading shows what it is based on so you can check it yourself.</p><p>These systems are a lens for knowing yourself, not a verdict on your fate. Health notes are lifestyle reminders, not medical advice; money notes are not investment advice.</p><h3>Privacy</h3><ul><li>All chart calculations run in your browser; your birth data is not uploaded to our servers.</li><li>Only when you use an AI feature is a <b>chart summary</b> (star and planet positions, no name or birthplace) sent to our relay and on to Anthropic’s Claude to write the text. We do not store it.</li><li>Your chart book and AI chat history stay in this browser and can be deleted at any time.</li><li>Share links contain the birth date and time; share them only with people you trust.</li></ul>`},
 ja:{book:'わたしのチャート帳',save:'チャート帳に保存',saved:'保存済み',name:'このチャートの名前',namePh:'例：わたし、母、ゆき',empty:'まだ保存されたチャートはありません。チャートを作ったら「チャート帳に保存」を押してください。',
  open:'開く',pair:'今のチャートと相性を見る',rename:'名前を変更',del:'削除',delQ:'「NAME」を削除しますか？',exp:'バックアップを書き出す',imp:'バックアップを読み込む',impBad:'ファイルの形式が正しくありません。',impOk:'N 件のチャートを読み込みました。',
  note:'チャート帳はこの端末のブラウザにだけ保存され、アップロードされません。機種変更やブラウザデータの削除の前にバックアップを書き出してください。',fromBook:'チャート帳から選ぶ',cur:'表示中',close:'閉じる',
  about:'このサイトとプライバシー',aboutHtml:`<h3>Starlit について</h3><p>Starlit は紫微斗数・西洋占星術・ヒューマンデザインを並べて読み解きます。計算にはスイス・エフェメリスとオープンソースの紫微エンジン iztro を使い、どの解説にも根拠を示しています。</p><p>占いは自分を知るためのひとつの視点であり、運命の判決ではありません。健康の内容は生活上の注意で医療の代わりにはならず、お金の内容は投資助言ではありません。</p><h3>プライバシー</h3><ul><li>チャートの計算はすべてブラウザ内で行われ、生年月日がサーバーに送られることはありません。</li><li>AI 機能を使ったときだけ、<b>チャートの要約</b>（星や惑星の位置。名前・出生地は含みません）を中継サーバー経由で Anthropic の Claude に送り、文章を作ります。内容は保存しません。</li><li>チャート帳と AI との会話はこのブラウザにだけ保存され、いつでも削除できます。</li><li>共有リンクには生年月日と時刻が含まれます。信頼できる人とだけ共有してください。</li></ul>`},
 fr:{book:'Mon carnet de thèmes',save:'Enregistrer dans le carnet',saved:'Enregistré',name:'Nom de ce thème',namePh:'ex. Moi, Maman, Léa',empty:'Aucun thème enregistré. Après avoir calculé un thème, touchez « Enregistrer dans le carnet ».',
  open:'Ouvrir',pair:'Comparer avec le thème actuel',rename:'Renommer',del:'Supprimer',delQ:'Supprimer « NAME » ?',exp:'Exporter une sauvegarde',imp:'Importer une sauvegarde',impBad:'Ce fichier n’est pas une sauvegarde valide.',impOk:'N thèmes importés.',
  note:'Votre carnet est stocké uniquement dans ce navigateur, sur cet appareil, et n’est jamais envoyé. Exportez une sauvegarde avant de changer de téléphone ou d’effacer vos données.',fromBook:'Choisir dans le carnet',cur:'Actuel',close:'Fermer',
  about:'À propos et confidentialité',aboutHtml:`<h3>À propos de Starlit</h3><p>Starlit lit ensemble le Zi Wei Dou Shu, l’astrologie occidentale et le Human Design. Les calculs utilisent les Swiss Ephemeris et le moteur Zi Wei open source iztro, et chaque lecture indique sur quoi elle repose.</p><p>Ces systèmes sont un regard pour mieux se connaître, pas un verdict sur le destin. Les notes de santé sont des rappels de mode de vie et ne remplacent pas un avis médical ; les notes sur l’argent ne sont pas des conseils d’investissement.</p><h3>Confidentialité</h3><ul><li>Tous les calculs se font dans votre navigateur ; vos données de naissance ne sont pas envoyées à nos serveurs.</li><li>Seulement quand vous utilisez une fonction IA, un <b>résumé du thème</b> (positions des étoiles et planètes, sans nom ni lieu) est envoyé à notre relais puis à Claude d’Anthropic pour rédiger le texte. Nous ne le conservons pas.</li><li>Votre carnet et l’historique de discussion avec l’IA restent dans ce navigateur et peuvent être supprimés à tout moment.</li><li>Les liens de partage contiennent la date et l’heure de naissance ; ne les partagez qu’avec des personnes de confiance.</li></ul>`}};
const VT=()=>VT_TXT[LG]||VT_TXT.zh;
const VKEY='starlit-book';
function vLoad(){try{const a=JSON.parse(localStorage.getItem(VKEY)||'[]');return Array.isArray(a)?a.filter(x=>x&&typeof x==='object'&&typeof x.date==='string'):[];}catch(e){return [];}}
function vSave(a){try{localStorage.setItem(VKEY,JSON.stringify(a));return true;}catch(e){return false;}}
const vEsc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let VCUR=null; /* 目前顯示的盤對應到命盤本裡的哪一筆 */

function vSameBirth(a,b){return a&&b&&a.date===b.date&&a.time===b.time&&a.g===b.g&&String(a.lat)===String(b.lat)&&String(a.lon)===String(b.lon)&&String(a.tz)===String(b.tz)&&!!a.dst===!!b.dst;}
/* 存目前的盤 */
function vSaveCurrent(name){
  if(!LASTV)return;const a=vLoad();const v=LASTV;
  let e=a.find(x=>vSameBirth(x,v));
  if(!e){e={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),date:v.date,time:v.time,g:v.g,city:v.city||'',lat:v.lat,lon:v.lon,tz:v.tz,dst:!!v.dst,created:Date.now()};a.unshift(e);}
  e.name=String(name||'').trim().slice(0,20)||e.name||v.date;e.ctx={intent:CTX.intent,status:CTX.status,job:CTX.job};
  vSave(a);VCUR=e.id;vBar();
}
/* 結果上方的「存進命盤本」列（與分享列並排） */
function vBar(){
  const el=document.querySelector('#vbar');if(!el)return;const T=VT();if(!LASTV){el.innerHTML='';return;}
  const e=vLoad().find(x=>vSameBirth(x,LASTV));VCUR=e?e.id:null;
  el.innerHTML=e?`<span class="vsaved">✓ ${T.saved}：${vEsc(e.name)}</span> <button type="button" id="vb-open">${T.book}</button>`
   :`<input id="vb-name" maxlength="20" placeholder="${T.namePh}" aria-label="${T.name}"><button type="button" id="vb-save">${T.save}</button>`;
  const s=el.querySelector('#vb-save');if(s)s.addEventListener('click',()=>vSaveCurrent(el.querySelector('#vb-name').value));
  const n=el.querySelector('#vb-name');if(n)n.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();vSaveCurrent(n.value);}});
  const o=el.querySelector('#vb-open');if(o)o.addEventListener('click',vOpen);
}
/* 命盤本視窗 */
function vOpen(){const d=$('#vault');vRender();if(!d.open)d.showModal();document.body.classList.add('dlg-open');}
function vClose(){$('#vault').close();document.body.classList.remove('dlg-open');}
function vRender(){
  const T=VT(),a=vLoad(),li={zh:0,en:1,ja:2,fr:3}[LG];
  const place=x=>{const c=CITIES.find(c=>c[0]===x.city&&c[4]!=null);return c?c[li]:`${x.lat}, ${x.lon}`;};
  $('#vault-title').textContent=T.book;$('#vault-x').setAttribute('aria-label',T.close);
  $('#vault-body').innerHTML=`<p class="muted vnote">${T.note}</p>`+(a.length?`<ul class="vlist">${a.map(x=>`<li data-id="${vEsc(x.id)}"><div class="vinfo"><b>${vEsc(x.name||x.date)}</b>${x.id===VCUR?` <span class="chip acc">${T.cur}</span>`:''}<span class="muted">${vEsc(x.date)} ${vEsc(x.time)}・${vEsc(place(x))}・${x.g==='男'?L.ui.male:L.ui.female}</span></div>
     <div class="vact"><button type="button" data-a="open">${T.open}</button>${LASTV&&x.id!==VCUR?`<button type="button" data-a="pair">${T.pair}</button>`:''}<button type="button" data-a="ren">${T.rename}</button><button type="button" data-a="del" class="vdel">${T.del}</button></div></li>`).join('')}</ul>`:`<p class="vempty">${T.empty}</p>`)
   +`<div class="vio"><button type="button" id="v-exp"${a.length?'':' disabled'}>${T.exp}</button><label class="vimp"><input type="file" id="v-imp" accept="application/json,.json" hidden><span>${T.imp}</span></label><span class="muted" id="v-msg"></span></div>`;
  $('#vault-body').querySelectorAll('.vlist li').forEach(li=>li.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>vAct(li.dataset.id,b.dataset.a,li))));
  $('#v-exp').addEventListener('click',vExport);$('#v-imp').addEventListener('change',vImport);
}
function vFill(x,pre){/* pre='' 主表單、'p' 合盤表單 */
  if(!pre){$('#f-date').value=x.date;$('#f-time').value=x.time;const r=document.querySelector(`input[name=g][value="${x.g}"]`);if(r)r.checked=true;
    if(x.city&&CITIES.find(c=>c[0]===x.city&&c[4]!=null)){$('#f-city').value=x.city;onCity();}else{$('#f-city').value='';$('#f-lat').value=x.lat;$('#f-lon').value=x.lon;$('#f-tz').value=x.tz;}
    $('#f-dst').checked=!!x.dst;}
  else{$('#p-name').value=String(x.name||'').slice(0,20);$('#p-date').value=x.date;$('#p-time').value=x.time;const r=document.querySelector(`input[name=pg][value="${x.g}"]`);if(r)r.checked=true;$('#p-city').value=x.city||'';if($('#p-dst'))$('#p-dst').checked=!!x.dst;}
}
function vAct(id,act,li){
  const T=VT(),a=vLoad(),x=a.find(e=>e.id===id);if(!x)return;
  if(act==='open'){vFill(x,'');if(x.ctx){CTX.intent=x.ctx.intent||null;CTX.status=x.ctx.status||null;CTX.job=x.ctx.job||null;}vClose();const f=$('#birth');f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event('submit',{cancelable:true}));}
  if(act==='pair'){if(!x.city||!CITIES.find(c=>c[0]===x.city&&c[4]!=null)){$('#v-msg').textContent=L.ui.errPlace;return;}vFill(x,'p');vClose();tab('pair');const f=$('#pairf');f.requestSubmit?f.requestSubmit():pairSubmit(new Event('submit'));}
  if(act==='ren'){const box=li.querySelector('.vinfo');box.innerHTML=`<input class="vren" maxlength="20" value="${vEsc(x.name||'')}"><button type="button" class="vok">OK</button>`;const inp=box.querySelector('input');inp.focus();
    const done=()=>{x.name=inp.value.trim().slice(0,20)||x.name;vSave(a);vRender();vBar();};box.querySelector('.vok').addEventListener('click',done);inp.addEventListener('keydown',e=>{if(e.key==='Enter')done();});}
  if(act==='del'){const b=li.querySelector('[data-a=del]');if(b.dataset.sure!=='1'){b.dataset.sure='1';b.textContent=T.delQ.replace('NAME',x.name||x.date);return;}
    vSave(a.filter(e=>e.id!==id));{const ent=a.find(e=>e.id===id);if(ent&&typeof chatKey==='function')try{localStorage.removeItem(chatKey(ent));}catch(e){}}if(VCUR===id)VCUR=null;vRender();vBar();}
}
function vExport(){const blob=new Blob([JSON.stringify({starlit:1,charts:vLoad()},null,1)],{type:'application/json'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='starlit-chart-book.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000);}
function vImport(e){const f=e.target.files&&e.target.files[0];if(!f)return;const T=VT();if(f.size>500000){$('#v-msg').textContent=T.impBad;return;}
  f.text().then(t=>{let j;try{j=JSON.parse(t);}catch(err){$('#v-msg').textContent=T.impBad;return;}
    const list=(j&&Array.isArray(j.charts)?j.charts:[]).filter(x=>x&&/^\d{4}-\d{2}-\d{2}$/.test(String(x.date))&&/^\d{2}:\d{2}$/.test(String(x.time))&&(x.g==='男'||x.g==='女')&&isFinite(+x.lat)&&isFinite(+x.lon)&&isFinite(+x.tz)).slice(0,200)
      .map(x=>({id:String(x.id||Date.now().toString(36)+Math.random().toString(36).slice(2,6)).slice(0,24),name:String(x.name||'').slice(0,20),date:x.date,time:x.time,g:x.g,city:String(x.city||'').slice(0,30),lat:+x.lat,lon:+x.lon,tz:+x.tz,dst:!!x.dst,created:+x.created||Date.now()}));
    if(!list.length){$('#v-msg').textContent=T.impBad;return;}
    const a=vLoad();let n=0;list.forEach(x=>{if(!a.some(e=>vSameBirth(e,x))){a.push(x);n++;}});vSave(a);vRender();vBar();$('#v-msg').textContent=T.impOk.replace('N',n);});}
/* 合盤表單旁的「從命盤本選」 */
function vPairPick(){
  const el=document.querySelector('#p-pick');if(!el)return;const a=vLoad().filter(x=>x.id!==VCUR&&x.city&&CITIES.find(c=>c[0]===x.city&&c[4]!=null));const T=VT();
  if(!a.length){el.innerHTML='';return;}
  el.innerHTML=`<select id="p-book"><option value="">${T.fromBook}</option>${a.map(x=>`<option value="${vEsc(x.id)}">${vEsc(x.name||x.date)}</option>`).join('')}</select>`;
  el.querySelector('select').addEventListener('change',e=>{const x=vLoad().find(y=>y.id===e.target.value);if(x)vFill(x,'p');});
}
function vAbout(){const d=$('#about');$('#about-title').textContent=VT().about;$('#about-body').innerHTML=VT().aboutHtml;$('#about-x').setAttribute('aria-label',VT().close);if(!d.open)d.showModal();document.body.classList.add('dlg-open');}
function vInit(){
  $('#vault-x').addEventListener('click',vClose);$('#vault').addEventListener('close',()=>document.body.classList.remove('dlg-open'));
  $('#vault').addEventListener('click',e=>{if(e.target===$('#vault'))vClose();});
  $('#about-x').addEventListener('click',()=>{$('#about').close();});$('#about').addEventListener('close',()=>document.body.classList.remove('dlg-open'));
  $('#about').addEventListener('click',e=>{if(e.target===$('#about'))$('#about').close();});
  $('#top-book').addEventListener('click',vOpen);$('#foot-about').addEventListener('click',vAbout);
  vLabels();
}
function vLabels(){const T=VT();const b=$('#top-book');if(b)b.textContent=T.book;const f=$('#foot-about');if(f)f.textContent=T.about;vBar();vPairPick();}
