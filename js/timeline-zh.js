/* 先看重點：「最有把握的三件事」與「人生走向」逐年時間軸（中文）
 * 依據：紫微流年命宮、流年四化落宮、大限交接；西洋木星／土星行運宮位與回歸；人類圖人生角色的階段 */
(function(root){
const PAL=['命宮','兄弟','夫妻','子女','財帛','疾厄','遷移','僕役','官祿','田宅','福德','父母'];
const PN=n=>n==='命宮'?'命宮':n+'宮';
const DOM={'命宮':'自己','兄弟':'兄弟與朋友','夫妻':'感情與伴侶','子女':'子女、投資與合夥','財帛':'金錢','疾厄':'身體與作息','遷移':'外出、移動與外地機會','僕役':'人脈、同事與部屬','官祿':'工作與事業','田宅':'家、房子與存款','福德':'心情與生活品質','父母':'長輩、上司與文書'};

/* 流年命宮落在本命某宮：這一年的重心 */
const FOCUS={
 '命宮':'這一年回到自己身上。你會更在意「我想成為什麼樣的人」，適合整理方向、換造型、立新目標。',
 '兄弟':'這一年和身邊的人互動變多：兄弟姊妹、老朋友、合夥對象。可能有人找你一起做事，也可能要處理彼此的界線。',
 '夫妻':'這一年感情是主題。單身的人容易有對象出現，有伴的人會面對關係要不要往下一步。',
 '子女':'這一年和「延伸出去的東西」有關：小孩、學生、作品、投資、合夥。你會想把能量放到新的地方。',
 '財帛':'這一年你對錢特別有感。收入結構、花錢方式、存錢計畫，都會被拿出來重新想一次。',
 '疾厄':'這一年身體會提醒你它的存在。作息、飲食、運動，是這一年最值得投資的地方。',
 '遷移':'這一年適合往外走：出差、旅行、搬家、換環境、接外地的案子，在外面比在家裡有機會。',
 '僕役':'這一年人脈很關鍵。新同事、新客戶、新圈子，會影響你接下來的路。也要分辨誰是真心的。',
 '官祿':'這一年工作是主軸。可能升遷、換跑道、接大案子，忙碌但有成就感。',
 '田宅':'這一年重心回到家：搬家、裝修、買房、家人的事，或是開始認真存一筆錢。',
 '福德':'這一年你更在意內心感受。想放慢、想學有興趣的東西，也適合好好照顧情緒。',
 '父母':'這一年和長輩、上司、制度打交道的機會變多。考試、證照、文件合約都會是重點。'};
/* 流年化祿入某宮：順的地方 */
const LU={
 '命宮':'整體人緣變好，別人比較願意幫你。','兄弟':'朋友或手足帶來好消息，合作容易談成。','夫妻':'感情甜度上升，伴侶或對象帶來好運。','子女':'投資、合夥、子女或作品方面有收穫。',
 '財帛':'錢的流動變順，容易有加薪、獎金或新收入。','疾厄':'身體狀態不錯，適合養成好習慣。','遷移':'出外有貴人，旅行或外地的機會特別好。','僕役':'同事、客戶、朋友帶來資源與機會。',
 '官祿':'工作順手，有表現與升遷的機會。','田宅':'家運順，適合置產、搬家或整理住處。','福德':'心情愉快，生活品質提升，享受多一點。','父母':'長輩或上司給你支持，考試文書順利。'};
/* 流年化忌入某宮：要用力的地方 */
const JI={
 '命宮':'容易對自己要求太高、想太多，記得留餘裕。','兄弟':'和朋友或手足之間可能有心結，借貸、作保要小心。','夫妻':'感情容易卡在溝通，少翻舊帳、多傾聽。','子女':'投資與合夥要保守，也可能為子女或學生操心。',
 '財帛':'收支起伏較大，不適合高風險投機，先把預備金準備好。','疾厄':'身體容易累積疲勞，固定作息、定期檢查。','遷移':'在外比較辛苦，交通、出差多注意，凡事保持低調。','僕役':'慎選合作對象，人際上容易被拖累或誤解。',
 '官祿':'工作壓力大，事情容易卡關，重大決定多請教人。','田宅':'家裡或房子的事讓你煩心，存錢要有紀律。','福德':'情緒容易內耗、睡不好，刻意安排放鬆時間。','父母':'和上司或長輩溝通不易，合約文件要看清楚。'};
/* 木星（約一年換一宮）、土星（約兩年半換一宮）行經本命宮位 */
const JUP=['自信與能見度提升，適合開始新計畫','收入或資源增加的機會','學習、寫作、短途移動變多','家庭、居住空間有好的變化','戀愛、創作、玩樂的運氣好','工作流程與健康習慣容易改善','合作與伴侶關係帶來機會','共同資源、投資或深層轉變有收穫','進修、出國、拓展視野','事業曝光與升遷機會','朋友圈擴大，團體帶來機會','適合休息、沉澱與內在修復'];
const SAT=['對自己的要求變高，是重新定義自己的時期','要認真面對金錢與自我價值','溝通與學習需要更踏實','家庭與居住的責任加重','感情與創作要經得起考驗','工作量與健康需要管理','伴侶與合作關係進入考驗與承諾','面對共同財務、親密關係的深層課題','信念與方向需要重新檢視','事業上扛起更大的責任，付出會被看見','朋友圈篩選，留下真正同路的人','收尾舊的循環，為下一輪做準備'];
const H=['','第一宮','第二宮','第三宮','第四宮','第五宮','第六宮','第七宮','第八宮','第九宮','第十宮','第十一宮','第十二宮'];
const GOOD=['命宮','財帛','官祿','遷移','福德'],HARD=['命宮','財帛','官祿','疾厄'];
const ZO=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];
const comboOf=p=>p.majorStars.map(s=>s.name).sort((a,b)=>ZO.indexOf(a)-ZO.indexOf(b)).join('·')||'空';
const firstSent=t=>{const k=String(t||'').indexOf('。');return k>0?t.slice(0,k+1):String(t||'');};
const sep=(a,b)=>{const d=Math.abs(((a-b)%360+360)%360);return d>180?360-d:d;};

/* 逐年資料（語言無關，供文字層使用） */
function years(W,Z,HD,E,from,to){
  const birthY=(Z.rawDates&&Z.rawDates.lunarDate&&Z.rawDates.lunarDate.lunarYear)||(Z._std?Z._std.getUTCFullYear():new Date().getFullYear());
  const findStar=n=>Z.palaces.findIndex(p=>[...p.majorStars,...p.minorStars].some(s=>s.name===n));
  const out=[];let prevDec=null;
  for(let y=from-1;y<=to;y++){
    let H;try{H=Z.horoscope(new Date(Date.UTC(y,6,1)));}catch(e){H=null;}
    const dec=H&&H.decadal&&H.decadal.name!=='童限'?H.decadal.index:-1;
    if(y<from){prevDec=dec;continue;}
    const yr=H?H.yearly:null;
    const muts=yr?(yr.mutagen||[]).map((s,j)=>({star:s,k:'祿權科忌'[j],pal:(()=>{const i=findStar(s);return i>=0?Z.palaces[i].name:null;})()})):[];
    const mid=new Date(Date.UTC(y,6,1));
    let tr=[];try{tr=E.transits(W,mid);}catch(e){}
    const jup=tr.find(t=>t.k==='Jupiter'),sat=tr.find(t=>t.k==='Saturn'),ura=tr.find(t=>t.k==='Uranus');
    const ms=[];
    if(dec>=0&&prevDec!==null&&dec!==prevDec)ms.push({k:'decade',pal:Z.palaces[dec].name,range:Z.palaces[dec].decadal.range,combo:comboOf(Z.palaces[dec].majorStars.length?Z.palaces[dec]:Z.palaces[(dec+6)%12])});
    if(sat&&sep(sat.lon,W.pos.Saturn.lon)<10)ms.push({k:'satReturn'});
    else if(sat&&Math.abs(sep(sat.lon,W.pos.Saturn.lon)-180)<8)ms.push({k:'satOpp'});
    if(jup&&sep(jup.lon,W.pos.Jupiter.lon)<12)ms.push({k:'jupReturn'});
    if(ura&&Math.abs(sep(ura.lon,W.pos.Uranus.lon)-180)<5)ms.push({k:'uraOpp'});
    const age=y-birthY+1;/* 虛歲，與紫微大限一致 */
    if(HD&&HD.profile.includes(6)&&(age===31||age===51))ms.push({k:'hd6',age:age-1});
    /* 估算順逆（規則透明，見說明） */
    let sc=0;
    muts.forEach(m=>{if(!m.pal)return;if(m.k==='祿')sc+=GOOD.includes(m.pal)?2:1;if(m.k==='權'&&['命宮','官祿','財帛'].includes(m.pal))sc+=1;if(m.k==='忌')sc-=HARD.includes(m.pal)?2:1;});
    if(jup&&[1,2,5,9,10,11].includes(jup.house))sc+=1;
    if(sat&&[1,4,7,10].includes(sat.house))sc-=1;
    if(ms.some(m=>m.k==='satReturn'))sc-=1;
    const yp=yr?Z.palaces[yr.index].name:null,overlap=yr&&dec>=0&&yr.index===dec;
    if(overlap)sc*=1.5;
    const tone=sc>=2?'up':sc<=-1?'hard':'even';
    out.push({y,age,stem:yr?yr.heavenlyStem+yr.earthlyBranch:'',yp,overlap,muts,jup:jup&&jup.house,sat:sat&&sat.house,ms,score:sc,tone,dec:dec>=0?Z.palaces[dec].name:null});
    prevDec=dec;
  }
  return out;
}

/* 最有把握的三件事 */
function top3(W,Z,HD,E){
  const items=[];
  /* 1. 三盤共識最強的一項 */
  try{const R=Themes.core.build(W,Z,HD,E),T=Themes.zh.TAGS,TH=Themes.zh.THEME;let best=null;
    for(const th of ['career','wealth','love','people','health']){const x=R[th].ranked[0];if(x&&(!best||x.sys.size>best.x.sys.size||(x.sys.size===best.x.sys.size&&x.n>best.x.n)))best={th,x,r:R[th]};}
    if(best&&best.x.sys.size>=2){const why=best.r.ev.filter(e=>e.tag===best.x.tag).map(e=>Themes.zh.why[e.k](...e.a));
      items.push({kicker:`${Themes.zh.sysList(best.x.sys)}都這樣說`,title:`${TH[best.th]}上，你是「${T[best.th][best.x.tag][0]}」的人`,body:T[best.th][best.x.tag][1],why:[...new Set(why)].slice(0,5)});}}catch(e){}
  /* 2. 命宮核心 */
  const mi=Z.palaces.findIndex(p=>p.name==='命宮'),mp=Z.palaces[mi],src=mp.majorStars.length?mp:Z.palaces[(mi+6)%12];
  const me=root.STORY_ZW_MING&&STORY_ZW_MING.ming[comboOf(src)];
  if(me){const fit=root.Readings&&Readings.zh.fit?Readings.zh.fit:(t=>t);
    items.push({kicker:'你的核心',title:`「${me.title}」`,body:fit(firstSent(me.story),mp,Z.palaces[(mi+6)%12].majorStars),
      why:[`命宮${mp.majorStars.length?'':'（無主星，借對宮）'} ${src.majorStars.map(s=>s.name+(s.brightness?'〔'+s.brightness+'〕':'')+(s.mutagen?'化'+s.mutagen:'')).join('、')}`,`太陽${I18N.zh.signs[Math.floor(E.norm(W.pos.Sun.lon)/30)][0]}、上升${I18N.zh.signs[Math.floor(E.norm(W.asc)/30)][0]}`,`人類圖 ${I18N.zh.hd.types[HD.type]}、${HD.profile.join('/')}`]});}
  /* 3. 現在這一章 */
  let H=null;try{H=Z.horoscope(new Date());}catch(e){}
  if(H&&H.decadal&&H.decadal.name!=='童限'){const dp=Z.palaces[H.decadal.index],dsrc=dp.majorStars.length?dp:Z.palaces[(H.decadal.index+6)%12];
    const de=root.STORY_ZW_MING&&STORY_ZW_MING.decade[comboOf(dsrc)];const yp=Z.palaces[H.yearly.index].name;
    items.push({kicker:`現在這一章（虛歲 ${dp.decadal.range.join('–')}）`,title:de?`「${de.title}」`:`重心在${DOM[dp.name]}`,
      body:(de?firstSent(de.story):'')+`今年（${new Date().getFullYear()}）流年命宮走到${PN(yp)}：${firstSent(FOCUS[yp])}`,
      why:[`大限命宮在本命${PN(dp.name)}（${dp.heavenlyStem}${dp.earthlyBranch}）`,`大限主星 ${dsrc.majorStars.map(s=>s.name).join('、')||'—'}`,`流年 ${H.yearly.heavenlyStem}${H.yearly.earthlyBranch}，流年命宮在${PN(yp)}`]});}
  else items.push({kicker:'現在這一章',title:'還在童限',body:'第一個大限還沒開始，這段時間的走向主要看命宮與家庭環境。',why:[`第一個大限從 ${mp.decadal.range[0]} 歲開始`]});
  return items;
}

const TONE={up:['順勢','up'],even:['平穩','even'],hard:['要用力','hard']};
function render(W,Z,HD,E){
  const now=new Date().getFullYear();
  const t3=top3(W,Z,HD,E);
  const ys=years(W,Z,HD,E,now-3,now+5);
  const card=x=>`<div class="hl-card"><div class="hl-k">${x.kicker}</div><h3>${x.title}</h3><p>${x.body}</p><div class="hl-why"><span>依據</span>${x.why.map(w=>`<i>${w}</i>`).join('')}</div></div>`;
  const msTxt=m=>{
    if(m.k==='decade'){const de=root.STORY_ZW_MING&&STORY_ZW_MING.decade[m.combo];return `<b>進入新的十年大限（虛歲 ${m.range.join('–')}，${PN(m.pal)}）</b>${de?`：「${de.title}」。${firstSent(de.story)}`:'。'}`;}
    if(m.k==='satReturn')return '<b>土星回歸</b>：大約每 29 年一次的人生大考，會逼你面對真正想要的生活，捨棄不適合的東西。';
    if(m.k==='satOpp')return '<b>土星對分本命土星</b>：人生中段的檢查點，過去的選擇會被拿出來重新評估。';
    if(m.k==='jupReturn')return '<b>木星回歸</b>：大約每 12 年一次的新循環起點，適合開新局、擴大格局。';
    if(m.k==='uraOpp')return '<b>天王星對分</b>：常說的「中年轉折」，想突破、想改變的念頭特別強，適合做一件一直想做的事。';
    if(m.k==='hd6')return m.age===30?'<b>人類圖 6 爻：上屋頂</b>：大約 30 歲開始從親身試錯轉為觀察與沉澱的階段。':'<b>人類圖 6 爻：下屋頂</b>：大約 50 歲開始用一路走來的經驗成為別人的榜樣。';
    return '';};
  const row=x=>{
    const past=x.y<now,cur=x.y===now,tn=TONE[x.tone];
    const lu=x.muts.find(m=>m.k==='祿'&&m.pal),ji=x.muts.find(m=>m.k==='忌'&&m.pal);
    const head=x.ms.length&&x.ms[0].k==='decade'?`進入新大限：重心轉到${DOM[x.ms[0].pal]}`:x.yp?`重心在${DOM[x.yp]}`:'';
    const li=[];
    x.ms.forEach(m=>li.push(msTxt(m)));
    if(x.yp)li.push(`<b>流年命宮走到${PN(x.yp)}${x.overlap?'（又與大限命宮重疊，好壞都放大）':''}</b>：${FOCUS[x.yp]}`);
    if(lu)li.push(`<b>${lu.star}化祿進${PN(lu.pal)}</b>：${LU[lu.pal]}`);
    if(ji)li.push(`<b>${ji.star}化忌進${PN(ji.pal)}</b>：${JI[ji.pal]}`);
    if(x.jup)li.push(`<b>木星走你的${H[x.jup]}</b>：${JUP[x.jup-1]}。`);
    if(x.sat)li.push(`<b>土星在你的${H[x.sat]}</b>：${SAT[x.sat-1]}。`);
    return `<details class="tl-y${past?' past':''}${cur?' cur':''}"${cur?' open':''}><summary><span class="tl-yr">${x.y}</span><span class="tl-age">${x.stem}・虛歲 ${x.age}</span><span class="tone ${tn[1]}">${tn[0]}</span><span class="tl-h">${head}</span></summary>
      ${past?'<p class="tl-past">回頭對照：這一年你是不是經歷過這些？</p>':''}<ul>${li.map(s=>`<li>${s}</li>`).join('')}</ul></details>`;};
  return `<div class="hl-cards">${t3.map(card).join('')}</div>
   <div class="tl"><div class="tl-head"><h3>人生走向</h3><p class="muted">從 ${now-3} 到 ${now+5} 年。過去的年份可以拿來對照，看看準不準；「順勢／平穩／要用力」是依流年四化落宮與木星、土星行運估算的整體感受，不代表好壞定論。</p></div>
   ${ys.map(row).join('')}</div>`;
}
root.Highlights=root.Highlights||{};
root.Highlights.zh={render,years,top3};
})(typeof globalThis!=='undefined'?globalThis:this);
