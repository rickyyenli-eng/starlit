/* 先看重點／答案卡／這個月與年度行事曆／合盤：英、日、法文版的組字層。
 * 計算全部沿用中文檔（Highlights.zh.years/core3、Intent.zh.yearScoreR/pickYears、Calendar.zh.months、Pair.zh.compute），
 * 這裡只依語言包（js/hl-en.js、hl-ja.js、hl-fr.js 以 HLI.reg(lang, pack) 註冊）把結果寫成該語言的文字。 */
(function(root){
const HZ=()=>root.Highlights.zh,IZ=()=>root.Intent.zh,CZ=()=>root.Calendar.zh,PZ=()=>root.Pair.zh;
const PAL=['命宮','兄弟','夫妻','子女','財帛','疾厄','遷移','僕役','官祿','田宅','福德','父母'];
const MAJ=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];
const MIN=['左輔','右弼','文昌','文曲','天魁','天鉞','祿存','天馬','擎羊','陀羅','火星','鈴星','地空','地劫'];
const BRK=['廟','旺','得','利','平','不','陷'];
const PK=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
const ASPI={'合相':0,'六分相':1,'四分相':2,'三分相':3,'對分相':4};
const STEM={甲:'Jia',乙:'Yi',丙:'Bing',丁:'Ding',戊:'Wu',己:'Ji',庚:'Geng',辛:'Xin',壬:'Ren',癸:'Gui'};
const BRANCH={子:'Zi',丑:'Chou',寅:'Yin',卯:'Mao',辰:'Chen',巳:'Si',午:'Wu',未:'Wei',申:'Shen',酉:'You',戌:'Xu',亥:'Hai'};
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
const DAY=86400000;

function reg(lg,T){
  const I=()=>(typeof I18N!=='undefined'?I18N:root.I18N)[lg];
  const ST=k=>root[k+'_'+lg.toUpperCase()];
  const ja=lg==='ja',SP=ja?'':' ';
  /* 名稱 */
  const star=n=>{let i=MAJ.indexOf(n);if(i>=0)return I().major[i][0];i=MIN.indexOf(n);return i>=0?I().minor[i][0]:n;};
  const bright=b=>{const i=BRK.indexOf(b);return i>=0?I().bright[i][0]:b;};
  const gz=s=>{if(!s)return '';if(ja)return s;const a=STEM[s[0]],b=BRANCH[s[1]];return a&&b?`${a} ${b} ${s}`:s;};
  const stemN=s=>ja?s:(STEM[s]?`${STEM[s]} ${s}`:s);
  const planet=k=>k==='ASC'?T.asc:I().planets[PK.indexOf(k)][0];
  const sign=l=>I().signs[Math.floor((((l%360)+360)%360)/30)][0];
  const dfmt=new Intl.DateTimeFormat(T.locale,{month:'short',day:'numeric',timeZone:'UTC'});
  const mfmt=new Intl.DateTimeFormat(T.locale,{month:'long',timeZone:'UTC'});
  const day=t=>dfmt.format(new Date(t));
  const range=(a,b)=>`${day(a)}–${day(b)}`;
  const monName=m=>mfmt.format(new Date(Date.UTC(2001,m-1,15)));
  const list=a=>T.list(a);
  const N={star,bright,gz,stemN,planet,day,range,monName,list,pal:T.pal,your:T.your,house:T.house,mut:T.mut};
  const fem=(Z,s)=>lg==='fr'&&Z&&Z.gender==='女'&&root.Readings&&Readings.fr&&Readings.fr.fem?Readings.fr.fem(s):s;
  const first=T.first,fit=(t,p,src)=>root.StoryFit?StoryFit.fit(t,p,src):t;
  /* 年齡分階段：童年／學生／成人／樂齡 */
  function stage(age){const st=HZ().stageOf(age),yg=st==='kid'||st==='stu',sen=st==='sen';
    const pick=(K,S,Nn,A)=>p=>(st==='kid'&&K[p])||(yg&&S[p])||(sen&&Nn[p])||A[p];
    return{st,F:pick(T.KID_FOCUS,T.STU_FOCUS,T.SEN_FOCUS,T.FOCUS),L:pick(T.KID_LU,T.STU_LU,T.SEN_LU,T.LU),J:pick(T.KID_JI,T.STU_JI,T.SEN_JI,T.JI),
      D:p=>(sen&&T.SEN_DOM[p])||(st==='kid'&&T.KID_DOM[p])||(yg&&T.STU_DOM[p])||T.DOM[p],
      JUP:h=>(yg&&T.JUP_Y[h-1])||(sen&&T.JUP_S[h-1])||T.JUP[h-1],SAT:h=>(yg&&T.SAT_Y[h-1])||(sen&&T.SAT_S[h-1])||T.SAT[h-1]};}

  /* ========== 先看重點 ========== */
  const X=T.hl;
  function top3(W,Z,HD,E){
    const items=[],C=HZ().core3(W,Z,HD,E),TM=root.Themes&&Themes[lg],SM=ST('STORY_ZW_MING');
    if(C.best&&TM&&TM.TAGS){try{const b=C.best,tg=TM.TAGS[b.th][b.x.tag];const why=b.r.ev.filter(e=>e.tag===b.x.tag).map(e=>TM.why[e.k](...e.a));
      items.push({kicker:X.agree(TM.sysList(b.x.sys)),title:X.youAre(TM.THEME[b.th],tg[0]),body:tg[1],why:[...new Set(why)].slice(0,5)});}catch(e){}}
    const {mp,src,opp}=C.ming,me=SM&&SM.ming[C.ming.combo];
    if(me){const tag=s=>star(s.name)+(s.brightness?(T.brk||(b=>` [${b}]`))(bright(s.brightness)):'')+(s.mutagen?' '+T.mut(s.mutagen):'');
      items.push({kicker:X.core,title:T.q(me.title),body:fit(first(me.story),mp,opp.majorStars),
        why:[X.mingWhy(!mp.majorStars.length,src.majorStars.map(tag).join(T.sep)),X.sunAsc(sign(W.pos.Sun.lon),sign(W.asc)),X.hdWhy(I().hd.types[HD.type],HD.profile.join('/'))]});}
    const cu=C.cur,H=C.H;
    if(cu.kind==='dec'){const dp=cu.dp,dsrc=cu.dsrc,de=SM&&SM.decade[cu.combo],S=stage(C.age),ad=cu.adult&&de;
      items.push({kicker:X.chapter(dp.decadal.range),title:ad?T.q(de.title):X.focusOn(S.D(dp.name)),
        body:(ad?first(de.story)+SP:'')+X.thisYear(C.CY,cu.yp)+SP+first(S.F(cu.yp)),
        why:[X.decWhy(dp.name,gz(dp.heavenlyStem+dp.earthlyBranch)),X.decStars(dsrc.majorStars.map(s=>star(s.name)).join(T.sep)||'—',!dp.majorStars.length),X.yearWhy(gz(H.yearly.heavenlyStem+H.yearly.earthlyBranch),cu.yp)]});}
    else if(cu.kind==='unborn')items.push({kicker:X.chapter0,title:X.unbornT,body:X.unbornB,why:[X.unbornW(C.by)]});
    else if(cu.kind==='done')items.push({kicker:X.chapter0,title:X.doneT,body:X.doneB(C.age,cu.last),why:[X.doneW(cu.last)]});
    else items.push({kicker:X.chapter0,title:X.childT,body:X.childB,why:[X.childW(cu.first)]});
    return items;
  }
  function hlRender(W,Z,HD,E){
    const now=HZ().curYear(Z),t3=top3(W,Z,HD,E),ys=HZ().years(W,Z,HD,E,now-3,now+5),SM=ST('STORY_ZW_MING');
    const card=x=>`<div class="hl-card"><div class="hl-k">${x.kicker}</div><h3>${x.title}</h3><p>${x.body}</p><div class="hl-why"><span>${X.basis}</span>${x.why.map(w=>`<i>${w}</i>`).join('')}</div></div>`;
    const msTxt=m=>{
      if(m.k==='decade'){const de=SM&&SM.decade[m.combo],S=stage(m.range[0]);
        if(S.st!=='adult')return `<b>${X.newDec(m.range,m.pal)}</b>${T.colon}${X.decFocus(S.D(m.pal))}${SP}${T.decade(S.F(m.pal))}`;
        return `<b>${X.newDec(m.range,m.pal)}</b>${de?`${T.colon}${T.q(de.title)}${T.stop}${SP}${first(de.story)}`:T.stop}`;}
      const mo=m.months?X.around(m.months.map(monName),m.first):'';
      if(m.k==='satReturn')return `<b>${X.satReturn}${mo}</b>${T.colon}${X.satReturnT}`;
      if(m.k==='satOpp')return `<b>${X.satOpp}${mo}</b>${T.colon}${X.satOppT}`;
      if(m.k==='jupReturn')return `<b>${X.jupReturn}${mo}</b>${T.colon}${X.jupReturnT}`;
      if(m.k==='uraOpp')return `<b>${X.uraOpp}${mo}</b>${T.colon}${X.uraOppT}`;
      if(m.k==='hd6')return m.age===30?`<b>${X.hd6up}</b>${T.colon}${X.hd6upT}`:`<b>${X.hd6down}</b>${T.colon}${X.hd6downT}`;
      return '';};
    const row=x=>{
      const past=x.y<now,cur=x.y===now,tn=T.TONE[x.tone];
      const lu=x.muts.find(m=>m.k==='祿'&&m.pal),ji=x.muts.find(m=>m.k==='忌'&&m.pal);
      const S=stage(x.age),dms=x.ms.find(m=>m.k==='decade'),dde=dms&&SM&&SM.decade[dms.combo];
      const head=dms?X.decHead(dms.pal,dde&&S.st==='adult'?T.q(dde.title):''):x.yp?X.focusOn(S.D(x.yp)):'';
      const li=[];x.ms.forEach(m=>li.push(msTxt(m)));
      if(x.yp)li.push(`<b>${X.ypLine(x.yp,x.overlap)}</b>${T.colon}${S.F(x.yp)}`);
      const yl=m=>m.ypal&&m.ypal!==m.pal?X.alsoYearly(m.ypal,S.D(m.ypal)):'';
      if(lu)li.push(`<b>${X.mutIn(star(lu.star),'祿',lu.pal)}</b>${yl(lu)}${T.colon}${S.L(lu.pal)}`);
      if(ji)li.push(`<b>${X.mutIn(star(ji.star),'忌',ji.pal)}</b>${yl(ji)}${T.colon}${S.J(ji.pal)}`);
      (x.notes||[]).forEach(n=>{const t=X.notes[n.k];if(t)li.push(t(star(n.star),n.pal,S.D(x.yp)));});
      const ing=(a,main)=>{if(!a||!a.length)return '';const b=a.filter((i,k)=>!(a[k+1]&&a[k+1].mon===i.mon));return T.paren(list(b.map((i,k)=>i.h===main?(k&&X.ingBack?X.ingBack(monName(i.mon)):X.ingFrom(monName(i.mon))):X.ingInto(monName(i.mon),i.h))));};
      if(x.jup)li.push(`<b>${X.jupLine(x.jup)}</b>${ing(x.jupIng,x.jup)}${T.colon}${S.JUP(x.jup)}${T.stop}`);
      if(x.sat)li.push(`<b>${X.satLine(x.sat,[1,4,7,10].includes(x.sat))}</b>${ing(x.satIng,x.sat)}${[1,4,7,10].includes(x.sat)?X.satHard:''}${T.colon}${S.SAT(x.sat)}${T.stop}`);
      return `<details class="tl-y${past?' past':''}${cur?' cur':''}"${cur?' open':''}><summary><span class="tl-yr">${x.y}</span><span class="tl-age">${x.stem?gz(x.stem)+T.dot:''}${X.age(x.age)}</span><span class="tone ${tn[1]}">${tn[0]}</span><span class="tl-h">${head}</span></summary>
      ${past?`<p class="tl-past">${X.past}</p>`:''}<ul>${li.map(s=>`<li>${s}</li>`).join('')}</ul></details>`;};
    return fem(Z,`<div class="hl-cards">${t3.map(card).join('')}</div>
   <div class="tl"><div class="tl-head"><h3>${X.tlTitle}</h3><p class="muted">${X.tlIntro(ys.length?ys[0].y:now-3,now+5)}</p></div>
   ${ys.length?ys.map(row).join(''):`<p class="muted">${X.tlUnborn}</p>`}</div>`);
  }

  /* ========== 你想知道的 ========== */
  const Q=T.intent;
  function intentRender(ctx,W,Z,HD,E){
    if(!ctx||!ctx.intent||ctx.intent==='all')return '';
    const now=HZ().curYear(Z),ys=HZ().years(W,Z,HD,E,now,now+8);if(!ys.length)return '';
    let R=null;try{R=Themes.core.build(W,Z,HD,E);}catch(e){}
    const wrap=(title,h)=>`<div class="hl-card ans"><div class="hl-k">${Q.kicker}</div><h3>${title}</h3>${h}</div>`;
    {const ag=ys[0].age;if(ag<15&&['love','work','money'].includes(ctx.intent))return fem(Z,wrap(Q.kidT,`<p>${Q.kidB(ag)}</p>`));}
    const sen=ys[0].age>=65,TM=root.Themes&&Themes[lg]&&Themes[lg].TAGS?Themes[lg]:null;
    const palStory=(name,pick)=>{const i=Z.palaces.findIndex(p=>p.name===name),p=Z.palaces[i],opp=Z.palaces[(i+6)%12],src=p.majorStars.length?p:opp;const e=pick(HZ().comboOf(src));return e?{e,p,opp}:null;};
    const tags=th=>R&&TM?list(R[th].ranked.filter(x=>x.sys.size>=2).slice(0,2).map(x=>T.q(TM.TAGS[th][x.tag][0]))):'';
    const yearList=rule=>IZ().pickYears(ys,rule);
    const rs=w=>Q.R[w.k](w.star?star(w.star):'',w.pal,w.h);
    const chips=(L,cls)=>L.map(a=>`<div class="ans-y ${cls}"><b>${a.x.y}</b><span>${cap(list((cls==='bad'?a.warn:a.why).map(rs)))}${cls==='good'&&a.warn.length?`<em class="ans-warn">${Q.mixed(list(a.warn.map(rs)))}</em>`:''}</span></div>`).join('');
    const RULE=IZ().RULE;let h='',title='',more=null;
    if(ctx.intent==='love'){
      const st=Q.STATUS[ctx.status]||Q.STATUS.none;title=Q.loveT(st.ask);
      const sp=palStory('夫妻',c=>ST('STORY_ZW_SPOUSE')&&ST('STORY_ZW_SPOUSE')[c]);
      if(sp)h+=`<p><b>${Q.loveYou(T.q(sp.e.title))}</b>${SP}${fit(first(sp.e.partner),sp.p,sp.opp.majorStars)}${tags('love')?SP+Q.threeSay(tags('love')):''}</p>`;
      const {good,bad,weak}=yearList(RULE.love);
      h+=`<h4>${st.good}${weak&&good.length?Q.relative:''}</h4>${good.length?chips(good,'good'):`<p class="muted">${Q.loveNone}</p>`}`;
      if(bad.length)h+=`<h4>${Q.loveBad}</h4>${chips(bad,'bad')}`;
      if(sen)h+=`<p class="ans-tip">${Q.loveSen}</p>`;else if(st.tip)h+=`<p class="ans-tip">${st.tip}</p>`;
      more=['mix',2];
    }else if(ctx.intent==='work'||ctx.intent==='money'){
      const isW=ctx.intent==='work',jb=Q.JOB[ctx.job]||Q.JOB.none;
      title=isW?Q.workT(jb.ask):Q.moneyT;
      const SW=ST('STORY_ZW_WORK'),ws=palStory(isW?'官祿':'財帛',c=>SW&&SW[isW?'career':'wealth'][c]);
      if(ws)h+=`<p><b>${(isW?Q.workYou:Q.moneyYou)(T.q(ws.e.title))}</b>${SP}${fit(first(ws.e.story),ws.p,ws.opp.majorStars)}${tags(isW?'career':'wealth')?SP+Q.threeType(tags(isW?'career':'wealth')):''}</p>`;
      if(isW&&ws&&ws.e.fields)h+=`<p class="muted">${Q.fields(ws.e.fields)}</p>`;
      const {good,bad,weak}=yearList(isW?RULE.work:RULE.money);
      h+=`<h4>${isW?jb.good:Q.moneyGood}${weak&&good.length?Q.relative:''}</h4>${good.length?chips(good,'good'):`<p class="muted">${Q.workNone}</p>`}`;
      if(bad.length)h+=`<h4>${isW?Q.workBad:Q.moneyBad}</h4>${chips(bad,'bad')}`;
      const tip=sen?(isW?Q.workSen:Q.moneySen):isW?jb.tip:Q.moneyTip;
      if(tip)h+=`<p class="ans-tip">${tip}</p>`;
      more=['mix',isW?0:1];
    }else if(ctx.intent==='year'){
      const x=ys[0],n=ys[1];title=Q.yearT(now);
      const lu=x.muts.find(m=>m.k==='祿'&&m.pal),ji=x.muts.find(m=>m.k==='忌'&&m.pal);
      h+=`<p>${Q.yearBody({focus:T.DOMY[x.yp]||'—',lu:lu&&{dom:T.DOMY[lu.pal],how:X.mutIn(star(lu.star),'祿',lu.pal)},ji:ji&&{dom:T.DOMY[ji.pal],how:X.mutIn(star(ji.star),'忌',ji.pal)},jup:x.jup,sat:x.sat})}</p>`;
      if(n)h+=`<p>${Q.nextYear(n.y,T.DOMY[n.yp]||'—',n.ms.some(m=>m.k==='decade'))}</p>`;
      h+=`<p class="ans-tip">${Q.yearTip(now)}</p>`;
    }
    if(!h)return '';
    return fem(Z,`<div class="hl-card ans"><div class="hl-k">${Q.kicker}</div><h3>${title}</h3>${h}${more?`<button type="button" class="ans-more" data-tab="${more[0]}" data-i="${more[1]}">${Q.more}</button>`:''}</div>`);
  }

  /* ========== 這個月／年度行事曆 ========== */
  const K=T.cal;
  const ageOf=(Z,y)=>y-Z.rawDates.lunarDate.lunarYear+1;
  function monthItems(x,age){
    const S=stage(age),li=[];const lu=x.muts.find(m=>m.k==='祿'&&m.pal),ji=x.muts.find(m=>m.k==='忌'&&m.pal);
    if(x.mp)li.push(`<b>${K.mpLine(x.mp)}</b>${T.colon}${T.month(S.F(x.mp))}`);
    if(lu)li.push(`<b>${X.mutIn(star(lu.star),'祿',lu.pal)}</b>${lu.mpal?`<span class="muted">${T.paren(K.monthly(lu.mpal))}</span>`:''}${T.colon}${S.L(lu.pal)}`);
    if(ji)li.push(`<b>${X.mutIn(star(ji.star),'忌',ji.pal)}</b>${ji.mpal?`<span class="muted">${T.paren(K.monthly(ji.mpal))}</span>`:''}${T.colon}${S.J(ji.pal)}`);
    x.retro.forEach(r=>li.push(`<b>${K.RETRO[r.k][0]}${T.paren(range(r.from,r.to))}</b>${T.colon}${K.RETRO[r.k][1]}`));
    x.ing.forEach(g=>li.push(`<b>${K.ing(g.k,day(g.t),g.h)}</b>`));
    return li;
  }
  function months(W,Z,HD,E,ly){return CZ().months(W,Z,HD,E,ly);}
  function nowCard(W,Z,HD,E){
    const ly=HZ().curYear(Z);if(ageOf(Z,ly)<1)return '';
    let ms;try{ms=months(W,Z,HD,E,ly);}catch(e){return '';}
    const now=Date.now()+8*3600e3,x=ms.find(m=>now>=m.from&&now<m.to)||ms.find(m=>m.from>now);if(!x)return '';
    const ag=ageOf(Z,ly),li=monthItems(x,ag),tn=K.TONE[x.tone];
    return fem(Z,`<div class="hl-card mon"><div class="hl-k">${K.nowK(T.lunar(x.m,x.leap),range(x.from,x.last))}</div><h3>${X.focusOn(stage(ag).D(x.mp)||'—')} <span class="tone ${tn[1]}">${tn[0]}</span></h3><ul>${li.slice(0,4).map(s=>`<li>${s}</li>`).join('')}</ul></div>`);
  }
  function calRender(W,Z,HD,E){
    const ly=HZ().curYear(Z);if(ageOf(Z,ly)<1)return '';
    let ms;try{ms=months(W,Z,HD,E,ly);}catch(e){console.error(e);return '';}
    const now=Date.now()+8*3600e3,ag=ageOf(Z,ly);
    return fem(Z,`<div class="cal"><div class="tl-head"><h3>${K.title(ly)}</h3><p class="muted">${K.intro}</p></div>
   <div class="cal-grid">${ms.map(x=>{const tn=K.TONE[x.tone],cur=now>=x.from&&now<x.to;return `<div class="cal-m ${tn[1]}${cur?' cur':''}"><div class="cal-h"><b>${T.lunar(x.m,x.leap)}</b><span class="muted">${range(x.from,x.last)}${T.dot}${gz(x.gz)}</span><span class="tone ${tn[1]}">${tn[0]}</span></div><p class="cal-t">${X.focusOn(stage(ag).D(x.mp)||'—')}</p><ul>${monthItems(x,ag).map(s=>`<li>${s}</li>`).join('')}</ul></div>`;}).join('')}</div></div>`);
  }

  /* ========== 合盤 ========== */
  const PR=T.pair;
  function pairRender(P,E){
    const A=P.A,B=P.B,nm=esc((B.name||'').trim().slice(0,20));
    const nb=PR.who(nm);/* {n: 主詞, of(k): 某人的某物, poss} */
    const C=PZ().compute(P,E),{syn,ov,ov2,zAB,zBA,hd}=C;
    const asp=s=>I().aspects[ASPI[s.n]][0];
    const chN=k=>{const h=root.HDS&&HDS[lg];return h&&h.channels&&h.channels[k]?h.channels[k][0]:k;};
    const itemTxt=it=>PR.item(it,{nb,asp,ai:s=>ASPI[s.n],planet,house:T.house,pal:T.pal,star,list});
    const M={};for(const k in C.M)M[k]=C.M[k].map(itemTxt);
    const lv=C.lv;
    const cards=Object.entries(PR.MN).map(([k,[t,d]])=>{const n=M[k].length,l=lv[k];return `<div class="card pair-m ${k}"><span class="q">${t}</span><span class="big">${(k==='friction'?PR.LVF:PR.LV)[l]}</span><span class="agree">${[0,1,2].map(i=>`<i class="${i<l?'on':''}"></i>`).join('')} ${PR.basis(n)}</span><p>${d}</p></div>`;}).join('');
    const strong=C.strong.map(([k,l])=>[PR.MN[k][0],l]),fr=lv.friction;
    let sum=`<p>${strong[0][1]===0?PR.sumNone(nb):PR.sumTop(nb,strong[0][0],strong[1][1]>=2?strong[1][0]:'')}${SP}${fr>=2?PR.frMany:PR.frFew}</p>`;
    const top=syn.slice(0,2);
    if(top.length)sum+=`<p>${top.map(s=>PR.SYN[s.key][s.c]).join(SP)}</p>`;
    let adv=`<h3 data-k="p-sum">${PR.h.sum}</h3>${sum}<ul>${Object.entries(PR.MN).map(([k,[t]])=>`<li><b>${t}</b>${T.colon}${M[k].length?M[k].join(T.sep2):PR.noSign}</li>`).join('')}</ul>`;
    adv+=`<h3 data-k="p-west">${PR.h.west}</h3><h4>${PR.h.aspects}</h4>${syn.length?`<ul>${syn.slice(0,8).map(s=>`<li><b>${cap(itemTxt({t:'syn',s}))}</b>${T.paren(PR.orb(s.orb.toFixed(1))+(s.oos?({zh:'，',ja:'、'}[lg]||', ')+I().ui.oos:''))}${T.colon}${PR.SYN[s.key][s.c]}</li>`).join('')}</ul>${syn.slice(0,8).some(s=>s.oos)?`<p class="muted">${I().ui.oosNote}</p>`:''}`:`<p class="muted">${PR.noAsp}</p>`}`;
    adv+=`<h4>${PR.h.ovAB(nb)}</h4><ul>${ov.map(o=>`<li><b>${cap(itemTxt({t:'ov',dir:'AB',k:o.k,h:o.h}))}</b>${T.paren(I().houses[o.h-1])}${T.colon}${PR.OV_AB[o.k](nb)}</li>`).join('')}</ul>`;
    adv+=`<h4>${PR.h.ovBA(nb)}</h4><ul>${ov2.map(o=>`<li><b>${cap(itemTxt({t:'ov',dir:'BA',k:o.k,h:o.h}))}</b>${T.paren(I().houses[o.h-1])}${T.colon}${PR.OV_BA[o.k](nb)}</li>`).join('')}</ul>`;
    adv+=`<h3 data-k="p-zw">${PR.h.zw}</h3><h4>${PR.h.fly}</h4><p class="muted">${PR.flyIntro}</p><ul>`;
    if(zAB.lu&&zAB.lu.pal)adv+=`<li><b>${PR.luAB(nb,stemN(zAB.stemB),star(zAB.lu.star),zAB.lu.pal)}</b>${T.colon}${PR.LU_P[zAB.lu.pal](nb)}</li>`;
    if(zAB.ji&&zAB.ji.pal)adv+=`<li><b>${PR.jiAB(nb,star(zAB.ji.star),zAB.ji.pal)}</b>${T.colon}${PR.JI_P[zAB.ji.pal](nb)}</li>`;
    if(zBA.lu&&zBA.lu.pal)adv+=`<li><b>${PR.luBA(nb,stemN(zBA.stemB),star(zBA.lu.star),zBA.lu.pal)}</b>${T.colon}${PR.luBAT(nb,zBA.lu.pal)}</li>`;
    if(zBA.ji&&zBA.ji.pal)adv+=`<li><b>${PR.jiBA(nb,star(zBA.ji.star),zBA.ji.pal)}</b>${T.colon}${PR.jiBAT(nb,zBA.ji.pal)}</li>`;
    const sl=a=>a.map(star).join(T.sep)||'—';
    adv+=`</ul><h4>${PR.h.match}</h4><ul><li>${PR.matchAB(nb,sl(zAB.spouseA),sl(zAB.mingB),zAB.match.length?sl(zAB.match):'')}</li>
    <li>${PR.matchBA(nb,sl(zBA.spouseA),sl(zBA.mingB),zBA.match.length?sl(zBA.match):'')}</li></ul>
    <h4>${PR.h.zod}</h4><p>${PR.zod(nb,PR.ANI[C.aA],PR.ANI[C.aB],C.zr,C.aA,C.aB)}<span class="muted">${PR.folk}</span></p>`;
    adv+=`<h3 data-k="p-hd">${PR.h.hd}</h3><p>${PR.types(nb,I().hd.types[A.HD.type],I().hd.types[B.HD.type])}</p><ul><li><b>${PR.h.withB(nb)}</b>${T.colon}${PR.TIP[B.HD.type](nb)}</li><li><b>${PR.h.bWithYou(nb)}</b>${T.colon}${PR.TIP_YOU[A.HD.type](nb)}</li></ul>`;
    for(const kind of ['em','comp','dom','cmp']){const L=hd[kind];if(!L.length)continue;const [t,d]=PR.CH[kind];
      adv+=`<h4>${t}${T.paren(L.length)}</h4><p class="muted">${d}</p><ul>${L.map(x=>{const k=typeof x==='string'?x:x.k;const who=typeof x==='string'?'':T.paren(PR.full(x.who==='A',nb));return `<li><b>${k} ${chN(k)}</b>${who}</li>`;}).join('')}</ul>`;}
    adv+=`<h3 data-k="p-tips">${PR.h.tips}</h3><ul>`;
    const tips=C.tips.map(k=>PR.TIPS[k]);tips.push(PR.TIP[B.HD.type](nb));
    adv+=tips.map(t=>`<li>${t}</li>`).join('')+'</ul>';
    const f=s=>fem(A.Z,s);
    return{cards:f(cards),basic:f(sum),adv:f(adv),M};
  }

  root.Highlights=root.Highlights||{};root.Intent=root.Intent||{};root.Calendar=root.Calendar||{};root.Pair=root.Pair||{};
  root.Highlights[lg]={render:hlRender,top3,years:(...a)=>HZ().years(...a),curYear:Z=>HZ().curYear(Z)};
  root.Intent[lg]={render:intentRender};
  root.Calendar[lg]={render:calRender,nowCard,months};
  root.Pair[lg]={render:pairRender};
  T.N=N;
}
root.HLI={reg,cap};
})(typeof globalThis!=='undefined'?globalThis:this);
