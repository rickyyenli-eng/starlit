/* ===================== 結構常數 ===================== */
const PK=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
const GEN={Uranus:1,Neptune:1,Pluto:1};
const EL=['fire','earth','air','water'];
const PALACE_KEYS=['命宮','兄弟','夫妻','子女','財帛','疾厄','遷移','僕役','官祿','田宅','福德','父母'];
const MAJOR_KEYS=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];
const MINOR_KEYS=['左輔','右弼','文昌','文曲','天魁','天鉞','祿存','天馬','擎羊','陀羅','火星','鈴星','地空','地劫'];
const MUT_KEYS=['祿','權','科','忌'];
const BRIGHT_KEYS=['廟','旺','得','利','平','不','陷'];
const BRANCH=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥','子'];
const NUM={'二':2,'三':3,'四':4,'五':5,'六':6};

let LG='zh',L=I18N.zh;
const pl=k=>{const r=L.planets[PK.indexOf(k)];return{name:r[0],glyph:r[1],theme:r[2],core:r[3],long:r[4]};};
const sg=i=>{const r=L.signs[i];return{name:r[0],glyph:r[1],style:r[2],long:r[3],el:EL[i%4],mode:L.modes[i%3]};};
const palName=z=>L.palaces[PALACE_KEYS.indexOf(z)][0];
const palDesc=z=>L.palaces[PALACE_KEYS.indexOf(z)][1];
const starName=z=>{let i=MAJOR_KEYS.indexOf(z);if(i>=0)return L.major[i][0];i=MINOR_KEYS.indexOf(z);return i>=0?L.minor[i][0]:z;};
const mutOf=z=>L.mut[MUT_KEYS.indexOf(z)];
const brOf=z=>L.bright[BRIGHT_KEYS.indexOf(z)];
const isMinor=z=>MINOR_KEYS.includes(z);

/* ===================== 計算 ===================== */
const D2R=Math.PI/180,norm=Engine.norm;
const westChart=Engine.westChart;
const signOf=l=>Math.floor(norm(l)/30);
const fmtDeg=l=>{const x=norm(l)%30;const d=Math.floor(x),m=Math.floor((x-d)*60);return `${d}°${String(m).padStart(2,'0')}′`;};

/* ===================== 狀態 ===================== */
const $=s=>document.querySelector(s);
let W=null,Z=null,ZH=null,HD=null,selW='Sun',selZ=null,selH=null,zMode='yr',zYear=new Date().getFullYear();

function fillCities(){fillCity($('#f-city'));fillCity($('#p-city'));}
function fillCity(s){if(!s)return;const cur=s.value;s.innerHTML=`<option value="">${L.ui.pick}</option>`;const li={zh:0,en:1,ja:2,fr:3}[LG];
  CITIES.forEach(c=>{const o=document.createElement('option');o.value=c[0];o.textContent=c[li];s.appendChild(o);});if(cur)s.value=cur;}
function onCity(){const v=$('#f-city').value;const c=CITIES.find(x=>x[0]===v);if(c&&c[4]!=null){$('#f-lat').value=c[4];$('#f-lon').value=c[5];$('#f-tz').value=c[6];}else if(!v){$('#f-lat').value='';$('#f-lon').value='';$('#f-tz').value='';}else{$('#f-lat').value='';$('#f-lon').value='';$('#f-tz').value='';$('.adv').open=true;}}
function readForm(){return{date:$('#f-date').value,time:$('#f-time').value,g:(document.querySelector('input[name=g]:checked')||{}).value,city:$('#f-city').value,dst:$('#f-dst').checked,lat:parseFloat($('#f-lat').value),lon:parseFloat($('#f-lon').value),tz:parseFloat($('#f-tz').value)};}
let errKey=null;
function showErr(k){errKey=k;const e=$('#err');if(k){e.textContent=L.ui[k];e.hidden=false;}else e.hidden=true;}

function compute(v){
  showErr(null);
  if(!v.date||!v.time){showErr('errTime');return false;}
  {const yy=+v.date.slice(0,4);if(!(yy>=1900&&yy<=2100)){showErr('errRange');return false;}}
  if(!v.g){showErr('errGender');return false;}
  if([v.lat,v.lon,v.tz].some(isNaN)){showErr('errPlace');return false;}
  const [y,m,d]=v.date.split('-').map(Number),[hh,mm]=v.time.split(':').map(Number);
  const stdMs=Date.UTC(y,m-1,d,hh,mm)-(v.dst?3600e3:0);
  const utc=new Date(stdMs-v.tz*3600e3);
  W=westChart(utc,v.lat,v.lon);
  HD=Engine.humanDesign(utc);selH=null;
  const sd=new Date(stdMs),sh=sd.getUTCHours();
  const ti=sh===23?12:Math.floor((sh+1)/2);
  Z=iztro.astro.bySolar(`${sd.getUTCFullYear()}-${sd.getUTCMonth()+1}-${sd.getUTCDate()}`,ti,v.g,true,'zh-TW');
  try{ZH=Z.horoscope(new Date());if(ZH&&ZH.decadal.name==='童限')ZH={...ZH,decadal:{...ZH.decadal,index:-1}};}catch(e){ZH=null;}
  Z._ti=ti;Z._std=sd;
  selZ=Z.palaces.findIndex(p=>p.name==='命宮');
  return true;
}

/* 任一人的三張盤（合盤用） */
function computeChart(v){
  const c=CITIES.find(x=>x[0]===v.city);if(!c||c[4]==null)return null;
  const [y,m,d]=v.date.split('-').map(Number),[hh,mm]=v.time.split(':').map(Number);
  const stdMs=Date.UTC(y,m-1,d,hh,mm)-(v.dst?3600e3:0),utc=new Date(stdMs-c[6]*3600e3);
  const sd=new Date(stdMs),sh=sd.getUTCHours(),ti=sh===23?12:Math.floor((sh+1)/2);
  const Zb=iztro.astro.bySolar(`${sd.getUTCFullYear()}-${sd.getUTCMonth()+1}-${sd.getUTCDate()}`,ti,v.g,true,'zh-TW');Zb._ti=ti;Zb._std=sd;
  return{W:westChart(utc,c[4],c[5]),Z:Zb,HD:Engine.humanDesign(utc),name:v.name};
}
let PB=null,PBV=null;
function pairSubmit(e){e.preventDefault();const v={name:$('#p-name').value,date:$('#p-date').value,time:$('#p-time').value,g:(document.querySelector('input[name=pg]:checked')||{}).value,city:$('#p-city').value,dst:$('#p-dst')?$('#p-dst').checked:false};
  const er=$('#p-err');er.hidden=true;
  const yy=+String(v.date).slice(0,4);const bad=!v.date||!v.time?'errTime':!(yy>=1900&&yy<=2100)?'errRange':!v.g?'errGender':!v.city?'errPlace':null;
  if(bad){er.textContent=L.ui[bad];er.hidden=false;return;}
  try{PB=computeChart(v);PBV=v;}catch(err){console.error(err);PB=null;}
  if(!PB){er.textContent=L.ui.errPlace;er.hidden=false;}
  renderPair();aiRender();if(PB){const sf=$('#ai-focus');if(sf)sf.value='pair';}if(PB)$('#pair-out').scrollIntoView({behavior:'smooth',block:'start'});}
function renderPair(){
  const out=$('#pair-out');if(!PB||!W){out.hidden=true;ADV.pair='';return;}
  const P=window.Pair&&(Pair[LG]||Pair.zh);let r;
  try{r=P.render({A:{W,Z,HD},B:PB},Engine);}catch(e){console.error(e);out.hidden=true;return;}
  out.hidden=false;$('#pair-sum').innerHTML=r.cards;
  $('#pair-read .body').innerHTML=(P!==Pair[LG]&&L.ui.pairNote?`<p class="readnote">${L.ui.pairNote}</p>`:'')+r.basic;ADV.pair=r.adv;
}
/* ===================== 星盤 ===================== */
const C=270;
function xy(l,r){const th=(180+(l-W.asc))*D2R;return[C+r*Math.cos(th),C-r*Math.sin(th)];}
function arc(l1,l2,r1,r2){const[a,b]=xy(l1,r2),[c,d]=xy(l2,r2),[e,f]=xy(l2,r1),[g,h]=xy(l1,r1);
  return `M${a},${b} A${r2},${r2} 0 0 0 ${c},${d} L${e},${f} A${r1},${r1} 0 0 1 ${g},${h}Z`;}
function drawWheel(){
  const svg=$('#wheel');svg.setAttribute('aria-label',L.ui.wheelAria);const R0=262,R1=226,R2=112,RP=184;let s='';
  for(let i=0;i<12;i++){const g=sg(i),l=i*30;s+=`<path d="${arc(l,l+30,R1,R0)}" fill="var(--${g.el})" fill-opacity="${i%2?0.10:0.17}" stroke="var(--line)"/>`;
    const[x,y]=xy(l+15,(R0+R1)/2);s+=`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="15" font-weight="700" fill="var(--${g.el})">${g.glyph}</text>`;}
  s+=`<circle cx="${C}" cy="${C}" r="${R1}" fill="none" stroke="var(--line)"/><circle cx="${C}" cy="${C}" r="${R2}" fill="var(--sunk)" stroke="var(--line)"/>`;
  for(let d=0;d<360;d+=5){if(d%30===0)continue;const[a,b]=xy(d,R1),[c,e]=xy(d,R1-(d%10===0?7:4));s+=`<line x1="${a}" y1="${b}" x2="${c}" y2="${e}" stroke="var(--muted)" stroke-opacity=".5"/>`;}
  W.houses.forEach((h,i)=>{const ang=i===0||i===9;const[a,b]=xy(h,R2),[c,d]=xy(h,ang?R0+4:R1);
    s+=`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${ang?'var(--ink)':'var(--line)'}" stroke-width="${ang?2:1}"/>`;
    const mid=h+norm(W.houses[(i+1)%12]-h)/2;const[x,y]=xy(mid,R2+14);s+=`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="11" fill="var(--muted)" class="mono">${i+1}</text>`;});
  {const[x,y]=xy(W.asc,R0-10);s+=`<text x="${x+2}" y="${y-10}" font-size="11" font-weight="700" fill="var(--ink)">${L.ui.ascL}</text>`;
   const[mx,my]=xy(W.mc,R0-6);s+=`<text x="${mx+6}" y="${my+4}" font-size="11" font-weight="700" fill="var(--ink)">${L.ui.mcL}</text>`;}
  for(const a of W.asp){if(a.deg===0)continue;const[x1,y1]=xy(W.pos[a.a].lon,R2-4),[x2,y2]=xy(W.pos[a.b].lon,R2-4);
    const col=a.tone==='good'?'var(--good)':'var(--seal)';const on=a.a===selW||a.b===selW;
    s+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${on?2:1.2}" stroke-opacity="${on?0.95:0.15}"/>`;}
  const arr=PK.map(k=>({k,l:W.pos[k].lon,d:W.pos[k].lon}));arr.sort((a,b)=>a.l-b.l);
  for(let it=0;it<40;it++){let moved=false;for(let i=0;i<arr.length;i++){const a=arr[i],b=arr[(i+1)%arr.length];const df=norm(b.d-a.d);if(df<10){a.d-=(10-df)/2;b.d+=(10-df)/2;moved=true;}}if(!moved)break;}
  for(const o of arr){const p=pl(o.k);const[t1,t2]=xy(o.l,R1),[t3,t4]=xy(o.l,R1-10),[cx,cy]=xy(o.d,RP),[l3,l4]=xy(o.d,RP+15);
    s+=`<line x1="${t1}" y1="${t2}" x2="${t3}" y2="${t4}" stroke="var(--ink)" stroke-width="2"/><line x1="${t3}" y1="${t4}" x2="${l3}" y2="${l4}" stroke="var(--muted)" stroke-opacity=".5"/>`;
    s+=`<g class="pl${selW===o.k?' on':''}" data-k="${o.k}" tabindex="0" role="button" aria-label="${p.name}"><circle class="bg" cx="${cx}" cy="${cy}" r="15"/><text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central">${p.glyph}</text>${W.pos[o.k].retro?`<text x="${cx+13}" y="${cy+12}" font-size="9" style="font-family:var(--f-body);font-weight:700;fill:var(--seal)">R</text>`:''}</g>`;}
  svg.innerHTML=s;
  const eq=$('#eq-note');eq.hidden=!W.equal;eq.textContent=L.ui.eqHouse;
  svg.querySelectorAll('.pl').forEach(g=>{const f=()=>{selW=g.dataset.k;drawWheel();showPlanet();};g.addEventListener('click',f);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f();}});});
}
function showPlanet(){
  const k=selW,p=pl(k),q=W.pos[k],g=sg(signOf(q.lon)),U=L.ui,F=L.fn;
  const asp=W.asp.filter(a=>a.a===k||a.b===k);
  $('#w-detail').innerHTML=`<div><div class="eyebrow">${U.picked}</div><h2>${F.head(p.name,g.name,q.house)}</h2></div>
  <p class="say">${F.say(p.name,p.core,g.name,g.style,q.house,L.houses[q.house-1])}</p>
  <div class="chips"><span class="chip mono">${g.name} ${fmtDeg(q.lon)}</span><span class="chip">${F.elemMode(L.elems[g.el][0],g.mode)}</span>${q.retro?`<span class="chip bad">${U.retro}</span>`:''}${GEN[k]?`<span class="chip hold">${U.gen}</span>`:''}</div>
  <div class="block"><h4>${F.secPlanet(p.name)}</h4><p>${p.long}</p></div>
  <div class="block"><h4>${F.secSign(g.name)}</h4><p>${g.long}</p></div>
  ${q.retro?`<div class="block"><h4>${U.secRetro}</h4><p>${U.retroTxt}</p></div>`:''}
  <div class="block"><h4>${U.secAsp}</h4>${asp.length?`<div class="asplist">${asp.map(a=>{const o=pl(a.a===k?a.b:a.a);const[n,say]=L.aspects[a.t];return `<div><span class="chip ${a.tone==='good'?'good':a.tone==='bad'?'bad':'acc'}">${n}</span> ${F.aspLine(o.name,say,p.theme,o.theme)}</div>`;}).join('')}</div>`:`<p class="muted">${U.noAsp}</p>`}</div>`;
}
function westSummary(){
  const U=L.ui,F=L.fn,sun=sg(signOf(W.pos.Sun.lon)),moon=sg(signOf(W.pos.Moon.lon)),asc=sg(signOf(W.asc));
  const cnt={fire:0,earth:0,air:0,water:0};['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'].forEach(k=>cnt[sg(signOf(W.pos[k].lon)).el]++);cnt[asc.el]++;
  const mx=Math.max(...Object.values(cnt));const tops=EL.filter(k=>cnt[k]===mx);
  $('#w-sum').innerHTML=`
  <div class="card"><span class="q">${U.cardWho}</span><span class="big">${F.big(pl('Sun').name,sun.name)}</span><p>${F.sunCard(sun.style)}</p></div>
  <div class="card"><span class="q">${U.cardNeed}</span><span class="big">${F.big(pl('Moon').name,moon.name)}</span><p>${F.moonCard(moon.style)}</p></div>
  <div class="card"><span class="q">${U.cardAsc}</span><span class="big">${F.big(U.ascShort,asc.name)}</span><p>${F.ascCard(asc.style)}</p></div>
  <div class="card"><span class="q">${U.cardEl}</span><div class="elem">${EL.map(k=>`<div class="erow"><span>${L.elems[k][0]}</span><div class="ebar"><span style="width:${cnt[k]/8*100}%;background:var(--${k})"></span></div><span class="mono">${cnt[k]}</span></div>`).join('')}</div><p>${F.elTop(F.list(tops.map(k=>L.elems[k][0])),F.list(tops.map(k=>L.elems[k][1])))}</p></div>`;
}
function westTable(){
  const U=L.ui,F=L.fn;const out={};
  const rows=PK.map(k=>{const p=pl(k),q=W.pos[k],g=sg(signOf(q.lon));return `<tr data-k="${k}"><td class="p">${p.name}${q.retro?` <span class="chip bad">${U.retro}</span>`:''}</td><td>${g.name} <span class="mono muted">${fmtDeg(q.lon)}</span></td><td class="mono">${q.house}</td><td>${F.line(p.core,g.style,L.houses[q.house-1])}</td></tr>`;});
  rows.push(`<tr><td class="p">${U.ascName}</td><td>${sg(signOf(W.asc)).name} <span class="mono muted">${fmtDeg(W.asc)}</span></td><td class="mono">1</td><td>${U.ascTxt}</td></tr>`);
  rows.push(`<tr><td class="p">${U.mcName}</td><td>${sg(signOf(W.mc)).name} <span class="mono muted">${fmtDeg(W.mc)}</span></td><td class="mono">10</td><td>${U.mcTxt}</td></tr>`);
  return `<div class="tablewrap"><table><thead><tr><th>${U.thP}</th><th>${U.thS}</th><th>${U.thH}</th><th>${U.thL}</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
}

/* ===================== 紫微 ===================== */
const POS={3:[1,1],4:[1,2],5:[1,3],6:[1,4],2:[2,1],7:[2,4],1:[3,1],8:[3,4],0:[4,1],11:[4,2],10:[4,3],9:[4,4]};
const mutBadge=z=>`<span class="mut ${z}">${mutOf(z)[0]}</span>`;
function starHTML(s){return `<span>${starName(s.name)}${L.showBright&&s.brightness?`<sup>${brOf(s.brightness)[0]}</sup>`:''}${s.mutagen?mutBadge(s.mutagen):''}</span>`;}
function drawZW(g=$('#zw'),mode='natal'){
  const U=L.ui,F=L.fn,main=g.id==='zw';let h='';
  const HH=mode==='natal'?ZH:zHoro(mode);
  const dec=HH&&HH.decadal.name!=='童限'?HH.decadal.index:-1,yr=HH?HH.yearly.index:-1;
  const lay=zLayer(mode);
  Z.palaces.forEach((p,i)=>{const[r,c]=POS[i];const minor=p.minorStars.filter(s=>isMinor(s.name));const ly=lay&&lay.cells[i];
    h+=`<button type="button" class="cell${p.name==='命宮'?' ming':''}${i===dec?' dec':''}${main&&i===selZ?' on':''}" style="grid-row:${r};grid-column:${c}" data-i="${i}" aria-label="${palName(p.name)}">
      <div class="stars">${p.majorStars.length?p.majorStars.map(starHTML).join(''):`<span class="muted" style="font-weight:400;font-size:12px">${U.empty}</span>`}</div>
      ${minor.length?`<div class="minor">${minor.map(s=>starName(s.name)+(s.mutagen?mutBadge(s.mutagen):'')).join(' ')}</div>`:''}
      ${ly?`<div class="layer">${ly.muts.map(m=>`<span>${starName(m.s)}<span class="mut ${m.k} lay">${lay.pre}${mutOf(m.k)[0]}</span></span>`).join(' ')}</div><div class="lname${ly.name==='命宮'?' on':''}">${lay.pre}${palName(ly.name)}</div>`:''}
      <div class="foot"><div><div class="tags">${p.isBodyPalace?`<span class="tag body">${U.tagBody}</span>`:''}${i===dec?`<span class="tag dc">${U.tagDec}</span>`:''}${i===yr?`<span class="tag yr">${U.tagYr}</span>`:''}</div><div class="pname">${palName(p.name)}</div></div><div style="text-align:right"><div class="gz">${p.heavenlyStem}${p.earthlyBranch}</div><div class="age">${p.decadal.range.join('–')}</div></div></div></button>`;});
  const sd=Z._std,ti=Z._ti,rd=Z.rawDates.lunarDate,cd=Z.rawDates.chineseDate;
  const rng=ti===0?'00:00–01:00':ti===12?'23:00–24:00':`${String(ti*2-1).padStart(2,'0')}:00–${String(ti*2+1).padStart(2,'0')}:00`;
  const fe=Z.fiveElementsClass,feTxt=L.fiveElNames?F.fiveEl(L.fiveElNames[fe[0]],NUM[fe[1]],fe):F.fiveEl(null,null,fe);
  const pillars=[cd.yearly,cd.monthly,cd.daily,cd.hourly].map(x=>x.join('')).join(' ');
  h+=`<div class="center"><div class="nm">${U.zwTitle}</div>
   <div>${U.solar} ${sd.getUTCFullYear()}/${sd.getUTCMonth()+1}/${sd.getUTCDate()}・${F.timeLbl(Z.time,BRANCH[ti],rng)}</div>
   <div>${U.lunar} ${F.lunarLbl(Z.lunarDate.replace(/腊/g,'臘').replace(/闰/g,'閏'),rd.lunarYear,rd.lunarMonth,rd.lunarDay,rd.isLeap)}</div>
   <div>${U.pillars?U.pillars+' ':''}${pillars}</div>
   <div class="kl"><span>${feTxt}</span><span>${U.soul} ${starName(Z.soul)}</span><span>${U.body} ${starName(Z.body)}</span></div>
   <div class="kl">${MUT_KEYS.map((m,j)=>`<span>${mutBadge(m)}${LG==='zh'||LG==='ja'?L.mut[j][3]:''}</span>`).join('')}</div></div>`;
  g.innerHTML=h;
  if(main)g.querySelectorAll('.cell').forEach(b=>b.addEventListener('click',()=>{selZ=+b.dataset.i;drawZW();showPalace();}));
}
function zHoro(mode){if(mode==='natal')return null;try{return Z.horoscope(new Date(Date.UTC(zYear,6,1)));}catch(e){return null;}}
function zLayer(mode){const H=zHoro(mode);if(!H)return null;if(mode==='dec'&&H.decadal.name==='童限')return null;const src=mode==='dec'?H.decadal:H.yearly;const cells=Z.palaces.map((p,i)=>({name:src.palaceNames[i],muts:[]}));
  src.mutagen.forEach((s,j)=>{const t=Z.palaces.findIndex(p=>[...p.majorStars,...p.minorStars].some(x=>x.name===s));if(t>=0)cells[t].muts.push({s,k:MUT_KEYS[j]});});
  return{cells,pre:mode==='dec'?L.ui.layerDec:L.ui.layerYr,label:`${src.heavenlyStem}${src.earthlyBranch}`};}
function zToolbar(bar,grid){const U=L.ui;const redraw=()=>drawZW(grid,zMode);
  bar.innerHTML=`<div class="seg mini" role="radiogroup">${[['natal',U.zModeNatal],['dec',U.zModeDec],['yr',U.zModeYr]].map(([k,t])=>`<label><input type="radio" name="zm" value="${k}" ${zMode===k?'checked':''}><span>${t}</span></label>`).join('')}</div>
  <label class="yr">${U.zYear} <input id="z-year" type="number" min="1900" max="2100" value="${zYear}"></label>`;
  bar.querySelectorAll('input[name=zm]').forEach(r=>r.addEventListener('change',()=>{zMode=r.value;redraw();}));
  bar.querySelector('#z-year').addEventListener('change',e=>{const v=parseInt(e.target.value);if(v>1900&&v<2101){zYear=v;redraw();}});redraw();}
function majorBlock(s){const U=L.ui,m=L.major[MAJOR_KEYS.indexOf(s.name)];const b=s.brightness&&brOf(s.brightness);
  return `<div class="block"><h4>${m[0]}・${m[1]}${b?` <span class="chip">${b[0]}：${b[1]}</span>`:''}${s.mutagen?` <span class="mut ${s.mutagen}">${mutOf(s.mutagen)[1]}</span>`:''}</h4><p>${m[2]}</p><div class="pros"><span class="t g">${U.strengths}</span><span>${m[3]}</span><span class="t w">${U.watch}</span><span>${m[4]}</span></div>${s.mutagen?`<p class="muted" style="font-size:13.5px">${mutOf(s.mutagen)[1]}：${mutOf(s.mutagen)[2]}</p>`:''}</div>`;}
function decMuts(){if(!ZH||!ZH.decadal.mutagen)return '';return L.fn.list(ZH.decadal.mutagen.map((s,j)=>L.fn.mutPair(starName(s),L.mut[j][1])));}
function showPalace(){
  const U=L.ui,F=L.fn,i=selZ,p=Z.palaces[i],opp=Z.palaces[(i+6)%12];
  const dec=ZH&&ZH.decadal.index===i,yr=ZH&&ZH.yearly.index===i;
  const minor=p.minorStars.filter(s=>isMinor(s.name));
  const stars=p.majorStars.length?p.majorStars:opp.majorStars;
  const d=palDesc(p.name);
  const lead=p.majorStars.length?F.main(F.list(p.majorStars.map(s=>starName(s.name)))):F.empty(palName(opp.name),F.list(opp.majorStars.map(s=>starName(s.name)))||'—');
  let st='';
  if(LG==='zh'||hasTr()){const SF=LG==='zh'?'':'_'+LG.toUpperCase(),G=n=>window['STORY_'+n+SF],q=t=>LG==='zh'||LG==='ja'?`「${t}」`:`“${t}”`,FIT=LG==='zh'?Readings.zh.fit:StoryFit.fit;const ZO=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];const cb=p.majorStars.map(s=>s.name).sort((x,y)=>ZO.indexOf(x)-ZO.indexOf(y)).join('·')||'空';
    const n=p.name;let e=null,txt='';
    if(n==='命宮'&&G('ZW_MING')){e=G('ZW_MING').ming[cb];if(e)txt=e.image+(LG==='zh'||LG==='ja'?'':' ')+e.story;}
    else if(n==='夫妻'&&G('ZW_SPOUSE')){e=G('ZW_SPOUSE')[cb];if(e)txt=e.partner+(LG==='zh'||LG==='ja'?'':' ')+e.pattern;}
    else if((n==='財帛'||n==='官祿')&&G('ZW_WORK')){e=G('ZW_WORK')[n==='財帛'?'wealth':'career'][cb];if(e)txt=e.story;}
    else if(G('ZW_PAL')&&G('ZW_PAL')[n]){e=G('ZW_PAL')[n][cb];if(e)txt=e.story;}
    const om=Z.palaces[(selZ+6)%12].majorStars;if(e)st=`<div class="block story"><h4>${q(e.title)}</h4><p>${FIT(txt,p,om)}</p>${e.scenes.map(x=>`<p class="scene">${FIT(x,p,om)}</p>`).join('')}</div>`;}
  $('#z-detail').innerHTML=`<div><div class="eyebrow">${U.picked}</div><h2>${palName(p.name)}<span class="muted" style="font-size:15px;font-weight:400">　${p.heavenlyStem}${p.earthlyBranch}</span></h2></div>
  <p class="say">${d} ${lead}</p>${st}
  <div class="chips">${p.isBodyPalace?`<span class="chip acc">${U.bodyHere}</span>`:''}${dec?`<span class="chip hold">${U.decNow}</span>`:''}${yr?`<span class="chip bad">${U.yrNow}</span>`:''}<span class="chip mono">${F.decAges(p.decadal.range.join('–'))}</span></div>
  ${p.isBodyPalace?`<div class="block"><h4>${U.secBody}</h4><p>${F.bodyTxt(d)}</p></div>`:''}
  ${dec?`<div class="block"><h4>${U.decNow}</h4><p>${F.decTxt(p.decadal.range[0],p.decadal.range[1],d,decMuts())}</p></div>`:''}
  ${yr?`<div class="block"><h4>${F.yrHead(ZH.yearly.heavenlyStem+ZH.yearly.earthlyBranch)}</h4><p>${F.yrTxt(d)}</p></div>`:''}
  ${(p.majorStars.length?'':`<p class="hint">${F.borrowed(palName(opp.name))}</p>`)+stars.map(majorBlock).join('')}
  ${minor.length?`<div class="block"><h4>${U.otherStars}</h4>${minor.map(s=>`<p><b>${starName(s.name)}</b>${s.mutagen?` <span class="mut ${s.mutagen}">${mutOf(s.mutagen)[1]}</span>`:''}：${L.minor[MINOR_KEYS.indexOf(s.name)][1]}</p>`).join('')}</div>`:''}`;
}
function zwSummary(){
  const U=L.ui,F=L.fn,ming=Z.palaces.find(p=>p.name==='命宮'),body=Z.palaces.find(p=>p.isBodyPalace);
  const mi=Z.palaces.indexOf(ming),opp=Z.palaces[(mi+6)%12];
  const src=ming.majorStars.length?ming.majorStars:opp.majorStars;
  const ms=ming.majorStars.length?src.map(s=>starName(s.name)).join('・'):`${U.empty}（${src.map(s=>starName(s.name)).join('・')||'—'}）`;
  const msDesc=src.map(s=>L.major[MAJOR_KEYS.indexOf(s.name)][2]).join(' ');
  const dec=ZH?Z.palaces[ZH.decadal.index]:null,yr=ZH?Z.palaces[ZH.yearly.index]:null;
  const mlist=[];Z.palaces.forEach(p=>[...p.majorStars,...p.minorStars].forEach(s=>{if(s.mutagen)mlist.push({m:s.mutagen,s:starName(s.name),p:palName(p.name)});}));
  mlist.sort((a,b)=>MUT_KEYS.indexOf(a.m)-MUT_KEYS.indexOf(b.m));
  const same=body.name==='命宮';
  $('#z-sum').innerHTML=`
  <div class="card"><span class="q">${U.zCardMing}</span><span class="big">${ms}</span><p>${msDesc}</p></div>
  <div class="card"><span class="q">${U.zCardBody}</span><span class="big">${same?U.sameBody:palName(body.name)}</span><p>${same?U.sameBodyTxt:F.bodyCard(palDesc(body.name))}</p></div>
  ${dec?`<div class="card"><span class="q">${F.zCardDec(dec.decadal.range.join('–'))}</span><span class="big">${palName(dec.name)}</span><p>${F.decCard(palDesc(dec.name),palName(yr.name))}</p></div>`:''}
  <div class="card"><span class="q">${U.zCardMut}</span><div class="mutlist">${mlist.map(x=>`<div>${mutBadge(x.m)} ${F.mutWhere(x.s,x.p)}</div>`).join('')}</div></div>`;
}

/* ===================== 語言切換 ===================== */
const LANG_FILES=['story-west','story-west-asc','story-zw-ming','story-zw-spouse','story-zw-work','story-zw-pal-a','story-zw-pal-b','story-zw-pal-c','story-zw-pal-d','story-hd'];
const loaded={zh:Promise.resolve()};
function loadLang(lg){if(loaded[lg])return loaded[lg];
  const one=src=>new Promise(r=>{const sc=document.createElement('script');sc.src=src;sc.onload=sc.onerror=()=>r();document.head.appendChild(sc);});
  return loaded[lg]=Promise.all([...LANG_FILES.map(f=>`js/${f}.${lg}.js`),`js/themes-${lg}.js`].map(one));}
function primer(id,arr){$(id).innerHTML=arr.map(([b,t])=>`<div><b>${b}</b><span>${t??L.mut.map((m,j)=>`${mutBadge(MUT_KEYS[j])} ${m[3]}`).join('　')}</span></div>`).join('');}
function applyLang(lg){
  LG=I18N[lg]?lg:'zh';L=I18N[LG];
  document.documentElement.lang=L.htmlLang;document.title=L.title;
  document.querySelectorAll('[data-t]').forEach(el=>{el.textContent=L.ui[el.dataset.t];});
  const cur=$('#f-city').value;fillCities();if(cur)$('#f-city').value=cur;
  primer('#w-primer',L.ui.wPrimer);primer('#z-primer',L.ui.zPrimer);primer('#h-primer',L.ui.hPrimer);
  $('#langs').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===LG));
  if(errKey)showErr(errKey);
  if(typeof askRender==='function')askRender();
  const want=LG;loadLang(LG).then(()=>{if(W&&Z&&LG===want)renderAll();});
  try{localStorage.setItem('starlit-lang',LG);}catch(e){}
}

/* ===================== 啟動 ===================== */
function renderAll(){aiRender();chatRender();drawWheel();showPlanet();westSummary();drawZW();showPalace();zwSummary();hdSummary();drawBody();showHD();renderReadings();if(DLG.tab&&$('#dlg').open)openDetail(DLG.tab,DLG.i);}
const TABS=['west','zw','hd','mix','pair'];
function tab(which){TABS.forEach(t=>{$('#t-'+t).setAttribute('aria-selected',t===which);$('#p-'+t).hidden=t!==which;});try{localStorage.setItem('kdwp-tab',which);}catch(e){}}

/* Swiss Ephemeris：高精度星曆，載入失敗時自動改用 astronomy-engine */
const sweReady=(async()=>{try{const m=await import(new URL('vendor/swisseph/src/swisseph.js',document.baseURI).href);const sw=new m.default();await sw.initSwissEph();Engine.setSwiss(sw);return true;}catch(e){console.warn('Swiss Ephemeris unavailable, using fallback',e);return false;}})();
function boot(){
  const names={zh:'中文',en:'English',ja:'日本語',fr:'Français'};
  $('#langs').innerHTML=Object.keys(names).map(k=>`<button type="button" data-l="${k}" lang="${I18N[k].htmlLang}">${names[k]}</button>`).join('');
  $('#langs').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>applyLang(b.dataset.l)));
  let lg=new URLSearchParams(location.search).get('lang');if(!lg){try{lg=localStorage.getItem('starlit-lang');}catch(e){}}
  if(!lg){const n=(navigator.language||'zh').toLowerCase();lg=n.startsWith('ja')?'ja':n.startsWith('fr')?'fr':n.startsWith('zh')?'zh':'en';}
  LG=I18N[lg]?lg:'zh';L=I18N[LG];
  fillCities();
  $('#f-city').addEventListener('change',onCity);
  if(typeof Astronomy==='undefined'||typeof iztro==='undefined'){applyLang(LG);showErr('errLib');return;}
  applyLang(LG);aiInit();wizInit();
  $('#pairf').addEventListener('submit',pairSubmit);
  $('#birth').addEventListener('submit',async e=>{e.preventDefault();const btn=$('button.go');btn.disabled=true;
    try{await Promise.race([Promise.all([sweReady,loadLang(LG)]),new Promise(r=>setTimeout(r,15000))]);}catch(err){}
    btn.disabled=false;
    const v=readForm();if(compute(v)){selW='Sun';aiText='';{const cl=$('#chat .chat-log');if(cl)cl.innerHTML='';}const ao=$('#ai-box .ai-out');if(ao){ao.innerHTML='';$('#ai-box .ai-status').textContent='';}renderAll();$('#result').hidden=false;$('#result').scrollIntoView({behavior:'smooth',block:'start'});shareAfterRender();}});
  TABS.forEach(t=>$('#t-'+t).addEventListener('click',()=>tab(t)));
  document.querySelectorAll('.copyread').forEach(b=>b.addEventListener('click',()=>copyReading(b)));
  document.querySelectorAll('button.more').forEach(b=>b.addEventListener('click',()=>openDetail(b.closest('.pane').id.slice(2),0)));
  $('#dlg-x').addEventListener('click',closeDetail);$('#dlg').addEventListener('close',()=>document.body.classList.remove('dlg-open'));
  $('#dlg').addEventListener('click',e=>{if(e.target===$('#dlg'))closeDetail();});
  $('#dlg-prev').addEventListener('click',()=>showSection(DLG.i-1));$('#dlg-next').addEventListener('click',()=>showSection(DLG.i+1));
  $('#dlg-copy').addEventListener('click',()=>{const txt=DLG.secs.map(x=>x.parts.filter(p=>!p.tool).map(p=>{const d=document.createElement('div');d.innerHTML=p.html;return p.full+'\n'+d.innerText;}).join('\n\n')).join('\n\n');const b=$('#dlg-copy');const done=()=>{b.textContent=L.ui.copied;setTimeout(()=>b.textContent=L.ui.copyAll,1600);};if(navigator.clipboard)navigator.clipboard.writeText(txt).then(done,()=>{});});
  let t=null;try{t=localStorage.getItem('kdwp-tab');}catch(e){} if(TABS.includes(t))tab(t);
  if(shareRestore()){const f=$('#birth');f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event('submit',{cancelable:true}));}
}

/* ===================== 詳解 ===================== */
/* ===================== 詳解彈出視窗 ===================== */
const DLG={tab:null,i:0,secs:[]};const ADV={};
function splitSections(html){return html.split('<h3').filter(x=>x.trim()).map(x=>{const gt=x.indexOf('>'),end=x.indexOf('</h3>');const km=x.slice(0,gt).match(/data-k="([^"]+)"/);const full=x.slice(gt+1,end).replace(/<[^>]+>/g,'');return{key:km?km[1]:'',full,html:x.slice(end+5)};});}
/* 分類：同一類的段落放在同一頁（依中文詳解的標題比對） */
const GROUPS={
 west:[['catW0',['w-story']],['catW1',['w-more']],['catW2',['w-houses','@table','w-rulers']],['catW3',['w-dignity','w-balance']],['catW4',['w-aspects','w-patterns']],['catW5',['w-node','w-transits']]],
 zw:[['catZ0',['z-story']],['catZ1',['z-info','z-patterns','z-core']],['catZ6',['z-work']],['catZ5',['z-love']],['catZ4',['z-map','z-decade','z-year','z-next','z-advice','@tool']],['catZ2',['z-birthmut','z-fly']],['catZ3',['z-palstory','z-palaces']]],
 hd:[['catH0',['h-story']],['catH1',['h-lines']],['catH2',['h-centers','h-channels','@gates']],['catH3',['h-cross']],['catH4',['h-tips']]],
 pair:[['catP0',['p-sum']],['catP1',['p-west']],['catP2',['p-zw']],['catP3',['p-hd']],['catP4',['p-tips']]],
 mix:[['catM1',['m-career']],['catM2',['m-wealth']],['catM3',['m-love']],['catM4',['m-health']],['catM5',['m-people']],['catM0',['m-how']]]};
function openDetail(tab,i){
  const U=L.ui;DLG.tab=tab;const raw=splitSections(ADV[tab]||'');
  const special={'@table':{full:U.wTable,html:westTable()},'@tool':{full:U.toolZw,html:'<div class="zbar" id="dz-bar"></div><div class="zw" id="dz-grid"></div>',after:()=>zToolbar($('#dz-bar'),$('#dz-grid')),tool:1},'@gates':{full:U.toolHd,html:'<div class="hdcols">'+hdCols()+'</div>',tool:1}};
  const used=new Set();
  const secs=GROUPS[tab].map(([key,keys])=>{const parts=[];keys.forEach(k=>{if(special[k]){parts.push(special[k]);return;}raw.forEach((x,j)=>{if(!used.has(j)&&x.key===k){used.add(j);parts.push(x);}});});return{title:U[key],parts};}).filter(g=>g.parts.length);
  const rest=raw.filter((x,j)=>!used.has(j));if(rest.length)secs[secs.length-1].parts.push(...rest);
  DLG.secs=secs;
  $('#dlg-eyebrow').textContent=U.readTitle;$('#dlg-title').textContent=tab==='pair'?U.tabP:tab==='mix'?U.tabM:`${U[{west:'tabW',zw:'tabZ',hd:'tabH'}[tab]]} ${U.dlgSuffix}`;
  $('#dlg-copy').textContent=U.copyAll;$('#dlg-prev').textContent=U.dlgPrev;$('#dlg-next').textContent=U.dlgNext;
  $('#dlg-nav').innerHTML=secs.map((x,k)=>`<button type="button" data-k="${k}">${x.title}</button>`).join('');
  $('#dlg-nav').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>showSection(+b.dataset.k)));
  if(!$('#dlg').open){$('#dlg').showModal();document.body.classList.add('dlg-open');}
  showSection(Math.min(i||0,secs.length-1));
}
function showSection(k){
  if(k<0||k>=DLG.secs.length)return;DLG.i=k;const x=DLG.secs[k];
  const note=DLG.tab==='pair'?(!Pair[LG]&&L.ui.pairNote?`<p class="readnote">${L.ui.pairNote}</p>`:''):DLG.tab==='mix'?(!(Themes[LG]&&Themes[LG].TAGS)&&L.ui.mixNote?`<p class="readnote">${L.ui.mixNote}</p>`:''):!hasTr()&&L.ui.readNote?`<p class="readnote">${L.ui.readNote}</p>`:'';
  $('#dlg-body').innerHTML=`<article class="reading plain"><div class="body">${note}${x.parts.map(pt=>`<section class="dsec"><h3>${pt.full}</h3>${pt.html}</section>`).join('')}</div></article>`;
  x.parts.forEach(pt=>pt.after&&pt.after());
  $('#dlg-body').scrollTop=0;
  $('#dlg-nav').querySelectorAll('button').forEach(b=>{const on=+b.dataset.k===k;b.setAttribute('aria-current',on);if(on)b.scrollIntoView({block:'nearest',inline:'center'});});
  $('#dlg-prev').disabled=k===0;$('#dlg-next').disabled=k===DLG.secs.length-1;$('#dlg-count').textContent=`${k+1} / ${DLG.secs.length}`;
}
function closeDetail(){$('#dlg').close();document.body.classList.remove('dlg-open');}
const RD=()=>(window.Readings&&Readings[LG])||Readings.zh;
const HDL=()=>(window.HDS&&HDS[LG])||HDZ;
const hasTr=()=>!!(window.Readings&&Readings[LG]);
function readingCtx(){
  const zh=hasTr()?I18N[LG]:I18N.zh,major={},minor={},bright={};
  MAJOR_KEYS.forEach((k,i)=>major[k]=zh.major[i]);MINOR_KEYS.forEach((k,i)=>minor[k]=zh.minor[i][1]);BRIGHT_KEYS.forEach((k,i)=>bright[k]=zh.bright[i][1]);
  const horo=d=>{try{return Z.horoscope(d);}catch(e){return null;}};
  return{lang:hasTr()?LG:'zh',major,minor,bright,palDesc:n=>zh.palaces[PALACE_KEYS.indexOf(n)][1],palName:n=>zh.palaces[PALACE_KEYS.indexOf(n)][0],
    star:n=>{let i=MAJOR_KEYS.indexOf(n);if(i>=0)return zh.major[i][0];i=MINOR_KEYS.indexOf(n);return i>=0?zh.minor[i][0]:n;},
    brightLabel:n=>{const i=BRIGHT_KEYS.indexOf(n);return i>=0?zh.bright[i][0]:n;},mutLabel:k=>zh.mut[MUT_KEYS.indexOf(k)][1],horoscope:horo,
    yearMid:y=>new Date(Date.UTC(y,6,1)),
    yearRange:y=>{const ny=yy=>{let lo=Date.UTC(yy,0,15),hi=Date.UTC(yy,1,25);const br=d=>{const h=horo(new Date(d));return h?h.yearly.earthlyBranch:'';};const b0=br(lo);
        while(hi-lo>86400000){const mid=lo+Math.floor((hi-lo)/86400000/2)*86400000;if(br(mid)===b0)lo=mid;else hi=mid;}return new Date(hi);};
      const a=ny(y),b=new Date(ny(y+1).getTime()-86400000);const f=d=>`${d.getUTCFullYear()}/${d.getUTCMonth()+1}/${d.getUTCDate()}`;return `${f(a)} － ${f(b)}`;}};
}
function renderReadings(){
  const note=!hasTr()&&L.ui.readNote?`<p class="readnote">${L.ui.readNote}</p>`:'';
  const put=(id,tab,f)=>{let r;try{r=f();}catch(e){console.error(e);r={basic:'<p class="err">—</p>',adv:''};}$(id+' .body').innerHTML=note+r.basic;ADV[tab]=r.adv;};
  put('#w-read','west',()=>RD().west(W,Engine));put('#z-read','zw',()=>RD().zw(Z,readingCtx()));put('#h-read','hd',()=>RD().hd(HD,HDL()));
  renderMix();renderHL();renderPair();
  document.querySelectorAll('.copyread').forEach(b=>b.textContent=L.ui.copy);
}
function renderHL(){
  const el=$('#hl-body');if(!el)return;const P=window.Highlights&&(Highlights[LG]||Highlights.zh);
  try{const ans=intentCard();el.innerHTML=shareBar()+(P!==Highlights[LG]&&L.ui.hlNote?`<p class="readnote">${L.ui.hlNote}</p>`:'')+P.render(W,Z,HD,Engine).replace('<div class="hl-cards">','<div class="hl-cards">'+ans);
    shareBind();el.querySelectorAll('.ans-more').forEach(b=>b.addEventListener('click',()=>openDetail(b.dataset.tab,+b.dataset.i)));}catch(e){console.error(e);el.innerHTML='';}
}
function renderMix(){
  const U=L.ui;const ml=Themes[LG]&&Themes[LG].TAGS?LG:'zh';let r;try{r=Themes.mix(ml,W,Z,HD,Engine);}catch(e){console.error(e);$('#m-sum').innerHTML='';$('#m-read .body').innerHTML='<p class="err">—</p>';ADV.mix='';return;}
  const note=ml!==LG&&U.mixNote?`<p class="readnote">${U.mixNote}</p>`:'';
  $('#m-read .body').innerHTML=note+r.basic;ADV.mix=r.adv;
  const cat=['catM1','catM2','catM3','catM4','catM5'];
  $('#m-sum').innerHTML=r.cards.map((c,i)=>`<button type="button" class="card mix" data-i="${i}"><span class="q">${U[cat[i]]}</span><span class="big">${c.labels.join(c.tension?' ⇄ ':'・')}</span><span class="agree">${[0,1,2].map(k=>`<i class="${k<c.agree?'on':''}"></i>`).join('')} ${c.agree>=2?c.agree+U.mixAgree:U.mixSplit}</span><p>${c.line}</p><span class="go2">${U.mixOpen} →</span></button>`).join('');
  $('#m-sum').querySelectorAll('.card.mix').forEach(b=>b.addEventListener('click',()=>openDetail('mix',+b.dataset.i)));
}
function copyReading(btn){
  const art=btn.closest('.reading');const el=art.querySelector('.body');const txt=el.innerText;
  const done=()=>{btn.textContent=L.ui.copied;setTimeout(()=>btn.textContent=L.ui.copy,1600);};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(done,()=>{selectText(el);});else selectText(el);
}
function selectText(el){const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);}

/* ===================== 人類圖 ===================== */
const HD_CENTER_ORDER=['head','ajna','throat','g','heart','spleen','sp','sacral','root'];
const GP={64:[170,74],61:[200,74],63:[230,74],47:[172,104],24:[200,104],4:[228,104],17:[182,122],11:[218,122],43:[200,150],
 62:[176,191],23:[200,189],56:[224,191],16:[172,204],35:[228,204],20:[172,220],12:[228,220],31:[182,241],8:[200,243],33:[218,241],45:[228,232],
 1:[200,268],7:[183,286],13:[217,286],10:[163,305],25:[237,305],15:[183,324],46:[217,324],2:[200,342],
 21:[262,331],51:[250,349],26:[262,362],40:[286,360],
 5:[178,384],14:[200,382],29:[222,384],34:[172,398],27:[172,426],59:[228,426],42:[180,438],3:[200,440],9:[220,438],
 53:[180,479],60:[200,477],52:[220,479],54:[172,492],38:[172,508],58:[172,524],19:[228,492],39:[228,508],41:[228,524],
 48:[50,368],57:[64,378],44:[80,386],50:[100,397],32:[80,406],28:[64,415],18:[50,424],
 36:[350,368],22:[336,378],37:[320,386],6:[300,397],49:[320,406],55:[336,415],30:[350,424]};
const SHAPE={head:'200,18 238,80 162,80',ajna:'162,98 238,98 200,160',throat:'168,184 232,184 232,248 168,248',g:'200,262 242,305 200,348 158,305',
 heart:'262,322 292,368 242,368',spleen:'40,352 40,440 112,396',sp:'360,352 360,440 288,396',sacral:'168,378 232,378 232,444 168,444',root:'168,472 232,472 232,536 168,536'};
const CFILL={head:'var(--hd-yellow)',ajna:'var(--hd-green)',throat:'var(--hd-brown)',g:'var(--hd-yellow)',heart:'var(--hd-red)',spleen:'var(--hd-brown)',sp:'var(--hd-brown)',sacral:'var(--hd-red)',root:'var(--hd-brown)'};
function hdBodyName(b){if(L.hd.bodies[b])return L.hd.bodies[b];return pl(b).name;}
function hdSummary(){
  const U=L.ui,X=L.hd,cr=RD().crossName(HD,HDL());
  const num=(HDZ.crossTable[(HD.cross.angle==='right'?'R':HD.cross.angle==='left'?'L':'J')+HD.cross.gates[0]]||[])[1];
  const crTxt=(LG==='zh'||hasTr())?cr.full:`${X.angles[HD.cross.angle]}${cr.en?` · ${cr.en}${num?' '+num:''}`:''}`;
  $('#h-sum').innerHTML=[[U.hdType,X.types[HD.type],'accent'],[U.hdProfile,HD.profile.join('/')],[U.hdAuth,X.auth[HD.authority]],[U.hdStrategy,X.strategy[HD.type]],]
    .map(([q,v,c])=>`<div class="card hd"><span class="q">${q}</span><span class="big${c?' '+c:''}">${v}</span></div>`).join('');
}
function drawBody(){
  const svg=$('#body');let s='';const G=HD.gates;
  const half=(g,o)=>{const a=G[g];if(!a)return null;return a.p&&a.d?'both':a.p?'p':'d';};
  for(const [a,b] of Engine.CHANNELS){const A=GP[a],B=GP[b];const mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2;
    const on=HD.channels.some(c=>c[0]===a&&c[1]===b);
    s+=`<g class="ch${selH==='ch'+a+'-'+b?' on':''}" data-ch="${a}-${b}"><line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" class="base"/>`;
    for(const [g,P1,P2] of [[a,A,[mx,my]],[b,B,[mx,my]]]){const st=half(g);if(!st)continue;
      if(st==='both')s+=`<line x1="${P1[0]}" y1="${P1[1]}" x2="${P2[0]}" y2="${P2[1]}" class="act d"/><line x1="${P1[0]}" y1="${P1[1]}" x2="${P2[0]}" y2="${P2[1]}" class="act p dash"/>`;
      else s+=`<line x1="${P1[0]}" y1="${P1[1]}" x2="${P2[0]}" y2="${P2[1]}" class="act ${st}"/>`;}
    s+=`<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" class="hit"${on?'':''}/></g>`;}
  for(const c of HD_CENTER_ORDER){const def=HD.defined.includes(c);
    s+=`<polygon points="${SHAPE[c]}" class="ctr${def?' def':''}${selH===c?' on':''}" data-c="${c}" style="${def?`fill:${CFILL[c]}`:''}" tabindex="0" role="button" aria-label="${L.hd.centers[c]}"/>`;}
  for(const g in GP){const[x,y]=GP[g];const a=G[g];s+=`<text x="${x}" y="${y}" class="gn${a?' on':''}">${g}</text>`;}
  svg.innerHTML=s;
  svg.querySelectorAll('.ctr').forEach(el=>{const f=()=>{selH=el.dataset.c;drawBody();showHD();};el.addEventListener('click',f);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f();}});});
  svg.querySelectorAll('.ch').forEach(el=>el.addEventListener('click',()=>{selH='ch'+el.dataset.ch;drawBody();showHD();}));
}
function hdCols(){
  const col=(src,cls,title)=>`<div class="act-col ${cls}"><div class="act-h">${title}</div>${Engine.HD_BODIES.map(b=>`<div class="act-r"><span class="gl">${HDZ.bodies[b][1]}</span><span class="mono">${src[b].gate}.${src[b].line}</span></div>`).join('')}</div>`;
  return col(HD.D,'d',L.ui.design)+col(HD.P,'p',L.ui.personality);
}
function showHD(){
  const U=L.ui,X=L.hd,el=$('#h-detail');
  const HZ=HDL(),tr=HZ!==HDZ||LG==='zh',nt=!tr&&U.readNote?`<p class="readnote">${U.readNote}</p>`:'';
  if(!selH){const T=HZ.types[HD.type];
    el.innerHTML=`<div><div class="eyebrow">${U.hdType}</div><h2>${X.types[HD.type]}</h2></div><p class="say">${tr?T.txt:X.strategy[HD.type]}</p><p class="hint">${U.hdClick}</p>`;return;}
  if(selH.startsWith('ch')){const [a,b]=selH.slice(2).split('-').map(Number);const c=HZ.channels[`${a}-${b}`];const on=HD.channels.some(x=>x[0]===a&&x[1]===b);
    el.innerHTML=`<div><div class="eyebrow">${a}-${b}</div><h2>${c[0]}</h2></div>${nt}<div class="chips"><span class="chip ${on?'acc':''}">${on?U.hdDefined:U.hdOpen}</span></div><p class="say">${c[1]}${LG==='zh'||LG==='ja'?'：':' — '}${c[2]}</p>
    <div class="block"><p><b>${a}</b> ${HZ.gates[a]}　<b>${b}</b> ${HZ.gates[b]}</p></div>`;return;}
  const c=selH,C=HZ.centers[c],def=HD.defined.includes(c);
  const gs=Engine.CENTER_GATES[c].filter(g=>HD.gates[g]);
  el.innerHTML=`<div><div class="eyebrow">${def?U.hdDefined:U.hdOpen}</div><h2>${X.centers[c]}</h2></div>${nt}<p class="say">${C.k}</p><p>${def?C.d:C.u}</p>
   ${gs.length?`<div class="block"><h4>${U.hdGatesOn}</h4>${gs.map(g=>`<p><b>${g}</b> ${HZ.gates[g]} <span class="chip ${HD.gates[g].p&&HD.gates[g].d?'acc':HD.gates[g].p?'':'bad'}">${HD.gates[g].p&&HD.gates[g].d?U.personality+' + '+U.design:HD.gates[g].p?U.personality:U.design}</span></p>`).join('')}</div>`:''}`;
}
boot();
