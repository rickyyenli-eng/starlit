/* 「你想知道的」答案卡（中文）：依使用者選的問題（感情／工作／錢／今年）與情境（感情狀態、工作狀態），
 * 從三盤合參標籤、宮位故事、逐年走向挑出最相關的答案與年份。 */
(function(root){
const PN=n=>n==='命宮'?'命宮':n+'宮';
const H=['','第一宮','第二宮','第三宮','第四宮','第五宮','第六宮','第七宮','第八宮','第九宮','第十宮','第十一宮','第十二宮'];
const ZO=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];
const comboOf=p=>p.majorStars.map(s=>s.name).sort((a,b)=>ZO.indexOf(a)-ZO.indexOf(b)).join('·')||'空';
const firstSent=t=>{const k=String(t||'').indexOf('。');return k>0?t.slice(0,k+1):String(t||'');};

/* 每個主題：哪個宮位、哪些行運宮位算「機會」、哪些算「考驗」 */
const RULE={
 love:{pal:'夫妻',jupGood:[5,7],satTest:[5,7]},
 work:{pal:'官祿',jupGood:[10,6],satTest:[10,6]},
 money:{pal:'財帛',jupGood:[2,8],satTest:[2,8]}};
function yearScore(x,r){
  let s=0;const why=[],warn=[];
  if(x.yp===r.pal){s+=2;why.push(`流年命宮走到${PN(r.pal)}`);}
  x.muts.forEach(m=>{if(m.pal!==r.pal)return;
    if(m.k==='祿'){s+=2;why.push(`${m.star}化祿進${PN(r.pal)}`);}
    if(m.k==='權'){s+=1;why.push(`${m.star}化權進${PN(r.pal)}`);}
    if(m.k==='科'){s+=0.5;why.push(`${m.star}化科進${PN(r.pal)}`);}
    if(m.k==='忌'){s-=2;warn.push(`${m.star}化忌進${PN(r.pal)}`);}});
  if(r.jupGood.includes(x.jup)){s+=1;why.push(`木星走你的${H[x.jup]}`);}
  if(r.satTest.includes(x.sat)){s-=0.5;warn.push(`土星在你的${H[x.sat]}`);}
  return{s,why,warn};
}
const STATUS={
 single:{ask:'什麼時候會遇到對的人？',good:'感情機會比較多的年份',tip:'這幾年多出門、多參加朋友的聚會，或答應別人介紹，比自己埋頭等更有用。'},
 crush:{ask:'這段曖昧能不能往前走？',good:'適合把關係說清楚、往前推一步的年份',tip:'如果你已經等很久了，挑一個輕鬆的場合把心意講清楚，比繼續猜更好。'},
 dating:{ask:'這段關係的下一步？',good:'適合談同居、見家長、結婚這類下一步的年份',tip:'重要的決定放在順的年份談，比較容易談出共識。'},
 married:{ask:'怎麼把婚姻經營得更好？',good:'關係甜度上升、適合一起規劃的年份',tip:'順的年份一起安排旅行或共同目標；卡的年份多留一點耐心，少翻舊帳。'},
 broke:{ask:'怎麼放下、什麼時候會有新的開始？',good:'比較容易出現新緣分的年份',tip:'先把自己照顧好。復合與否，盤只能告訴你時機，不能替你決定；你值得一段讓你安心的關係。'},
 none:{ask:'感情會怎麼走？',good:'感情機會比較多的年份',tip:''}};
const JOB={
 student:{ask:'該往哪個方向走？',good:'適合衝刺考試、決定方向的年份',tip:'在學階段先多試，盤裡的優勢會告訴你哪些事你做起來特別不費力。'},
 seeking:{ask:'什麼時候比較容易找到好工作？',good:'求職與面試比較順的年份',tip:'就算今年不是最順的一年，也先把作品集和履歷準備好，機會來時才接得住。'},
 employee:{ask:'升遷還是換舞台？',good:'工作表現容易被看見、適合爭取升遷的年份',tip:'順的年份主動爭取；卡的年份先累積實力，不急著跳。'},
 founder:{ask:'什麼時候適合擴張、什麼時候該守？',good:'適合擴張、出手的年份',tip:'擴張放在順的年份，卡的年份先顧現金流和團隊。'},
 change:{ask:'什麼時候適合轉換跑道？',good:'適合轉換跑道、開始新方向的年份',tip:'轉換前先用副業或進修小規模試水溫，確定有回應再全力投入。'},
 none:{ask:'事業會怎麼走？',good:'工作機會比較多的年份',tip:''}};

function render(ctx,W,Z,HD,E){
  if(!ctx||!ctx.intent||ctx.intent==='all')return '';
  const now=new Date().getFullYear();
  const ys=Highlights.zh.years(W,Z,HD,E,now,now+8);
  let R=null;try{R=Themes.core.build(W,Z,HD,E);}catch(e){}
  const T=Themes.zh.TAGS,fit=root.Readings&&Readings.zh.fit?Readings.zh.fit:(t=>t);
  const palStory=(name,pick)=>{const i=Z.palaces.findIndex(p=>p.name===name),p=Z.palaces[i],src=p.majorStars.length?p:Z.palaces[(i+6)%12];const e=pick(comboOf(src));return e?{e,p,opp:Z.palaces[(i+6)%12]}:null;};
  const tags=th=>R?R[th].ranked.filter(x=>x.sys.size>=2).slice(0,2).map(x=>`「${T[th][x.tag][0]}」`).join('和'):'';
  const yearList=(rule)=>{const sc=ys.map(x=>({x,...yearScore(x,rule)}));
    let good=sc.filter(a=>a.s>=1.5);if(!good.length)good=sc.filter(a=>a.s>=1);good=good.sort((a,b)=>b.s-a.s).slice(0,3).sort((a,b)=>a.x.y-b.x.y);
    const bad=sc.filter(a=>a.s<=-1.5).slice(0,2);return{good,bad};};
  const chips=(list,cls)=>list.map(a=>`<div class="ans-y ${cls}"><b>${a.x.y}</b><span>${(cls==='bad'?a.warn:a.why).join('、')}</span></div>`).join('');
  let h='',title='',more=null;
  if(ctx.intent==='love'){
    const st=STATUS[ctx.status]||STATUS.none;title=`感情：${st.ask}`;
    const sp=palStory('夫妻',c=>root.STORY_ZW_SPOUSE&&STORY_ZW_SPOUSE[c]);
    if(sp)h+=`<p><b>你在感情裡的樣子：「${sp.e.title}」。</b>${fit(firstSent(sp.e.partner),sp.p,sp.opp.majorStars)}${tags('love')?`三盤一起看，你是${tags('love')}的人。`:''}</p>`;
    const {good,bad}=yearList(RULE.love);
    h+=`<h4>${st.good}</h4>${good.length?chips(good,'good'):'<p class="muted">接下來幾年沒有特別集中的感情年，緣分比較平均地分散，重點在你自己主動。</p>'}`;
    if(bad.length)h+=`<h4>需要多一點耐心的年份</h4>${chips(bad,'bad')}`;
    if(st.tip)h+=`<p class="ans-tip">${st.tip}</p>`;
    more=['mix',2];
  }else if(ctx.intent==='work'||ctx.intent==='money'){
    const isW=ctx.intent==='work',jb=JOB[ctx.job]||JOB.none;
    title=isW?`工作：${jb.ask}`:'錢：什麼時候比較順、什麼時候要守？';
    const ws=palStory(isW?'官祿':'財帛',c=>root.STORY_ZW_WORK&&STORY_ZW_WORK[isW?'career':'wealth'][c]);
    if(ws)h+=`<p><b>${isW?'你的工作型態':'你的賺錢方式'}：「${ws.e.title}」。</b>${fit(firstSent(ws.e.story),ws.p,ws.opp.majorStars)}${tags(isW?'career':'wealth')?`三盤一起看，你是${tags(isW?'career':'wealth')}的類型。`:''}</p>`;
    if(isW&&ws&&ws.e.fields)h+=`<p class="muted">適合的方向：${ws.e.fields}</p>`;
    const {good,bad}=yearList(isW?RULE.work:RULE.money);
    h+=`<h4>${isW?jb.good:'收入與機會比較順的年份'}</h4>${good.length?chips(good,'good'):'<p class="muted">接下來幾年沒有特別集中的年份，穩穩累積比等時機更重要。</p>'}`;
    if(bad.length)h+=`<h4>${isW?'要先守、先累積的年份':'收支要保守的年份'}</h4>${chips(bad,'bad')}`;
    const tip=isW?jb.tip:'順的年份把多出來的收入先存一部分；保守的年份不碰高風險投資，先準備好半年的預備金。';
    if(tip)h+=`<p class="ans-tip">${tip}</p>`;
    more=['mix',isW?0:1];
  }else if(ctx.intent==='year'){
    const x=ys[0],n=ys[1];title=`今年（${now}）會怎麼走？`;
    const DOMY={'命宮':'你自己','兄弟':'兄弟與朋友','夫妻':'感情','子女':'子女、投資與合夥','財帛':'金錢','疾厄':'身體','遷移':'外出與移動','僕役':'人脈','官祿':'工作','田宅':'家與房子','福德':'心情','父母':'長輩與上司'};
    const lu=x.muts.find(m=>m.k==='祿'&&m.pal),ji=x.muts.find(m=>m.k==='忌'&&m.pal);
    h+=`<p><b>今年的重心在${DOMY[x.yp]||'—'}。</b>${lu?`順的地方在${DOMY[lu.pal]}（${lu.star}化祿進${PN(lu.pal)}）`:''}${lu&&ji?'；':''}${ji?`要多用心的是${DOMY[ji.pal]}（${ji.star}化忌進${PN(ji.pal)}）`:''}。${x.jup?`木星走你的${H[x.jup]}，`:''}${x.sat?`土星在你的${H[x.sat]}。`:''}</p>`;
    if(n)h+=`<p><b>明年（${n.y}）</b>重心轉到${DOMY[n.yp]||'—'}${n.ms.some(m=>m.k==='decade')?'，而且會進入新的十年大限':''}。</p>`;
    h+=`<p class="ans-tip">下面「人生走向」的 ${now} 年已經幫你展開，可以看完整的細節。</p>`;
  }
  if(!h)return '';
  return `<div class="hl-card ans"><div class="hl-k">你想知道的</div><h3>${title}</h3>${h}${more?`<button type="button" class="ans-more" data-tab="${more[0]}" data-i="${more[1]}">看完整的主題報告 →</button>`:''}</div>`;
}
root.Intent=root.Intent||{};root.Intent.zh={render};
})(typeof globalThis!=='undefined'?globalThis:this);
