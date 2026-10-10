/* 三盤合參（核心）：把紫微、星盤、人類圖對同一主題的說法轉成傾向標籤，找出共識。文字在各語言包 themes-xx.js */
(function(root){
/* ---------- 紫微：主星對應 ---------- */
const ZW_STAR={
 career:{紫微:['lead','stable'],天機:['analyze'],太陽:['speak','care'],武曲:['money','lead'],天同:['care'],廉貞:['people','lead'],天府:['stable','money'],太陰:['stable','create'],貪狼:['people','create'],巨門:['speak','expert'],天相:['stable','people'],天梁:['care','expert'],七殺:['pioneer','lead'],破軍:['pioneer','free']},
 wealth:{紫微:['steady'],天機:['skill','ups'],太陽:['people','spend'],武曲:['dynamic','steady'],天同:['spend'],廉貞:['people','ups'],天府:['steady','cautious'],太陰:['steady'],貪狼:['windfall','spend'],巨門:['skill'],天相:['steady'],天梁:['cautious'],七殺:['dynamic','ups'],破軍:['ups','spend']},
 love:{紫微:['standard'],天機:['talk'],太陽:['caretaker'],武曲:['practical','conflict'],天同:['romantic'],廉貞:['passionate','conflict'],天府:['practical','devoted'],太陰:['romantic','caretaker'],貪狼:['passionate','free'],巨門:['talk','conflict'],天相:['devoted'],天梁:['caretaker'],七殺:['passionate','conflict'],破軍:['free','conflict']},
 health:{紫微:['digest'],天機:['nerve'],太陽:['overwork'],武曲:['overwork'],天同:['digest'],廉貞:['stress'],天府:['digest'],太陰:['sleep'],貪狼:['rest'],巨門:['digest'],天相:['rest'],天梁:['digest'],七殺:['overwork'],破軍:['overwork','sleep']},
 people:{紫微:['helper'],天機:['social'],太陽:['social'],武曲:['selective'],天同:['social'],廉貞:['selective'],天府:['helper'],太陰:['helper'],貪狼:['social'],巨門:['conflict'],天相:['helper'],天梁:['leader'],七殺:['independent','conflict'],破軍:['conflict','social']}};
const ZW_MINOR={
 career:{左輔:'people',右弼:'people',文昌:'expert',文曲:'speak',天馬:'free',擎羊:'pioneer',祿存:'stable'},
 wealth:{祿存:'cautious',天馬:'dynamic',擎羊:'dynamic',火星:'windfall',鈴星:'windfall',地空:'ups',地劫:'ups'},
 love:{擎羊:'conflict',陀羅:'conflict',地空:'free',地劫:'free',文曲:'romantic',文昌:'talk'},
 health:{火星:'stress',鈴星:'stress',擎羊:'overwork',陀羅:'rest',地空:'nerve',地劫:'nerve'},
 people:{左輔:'helper',右弼:'helper',天魁:'helper',天鉞:'helper',擎羊:'conflict',陀羅:'conflict',火星:'conflict',鈴星:'conflict',地空:'selective',地劫:'selective'}};
const ZW_MUT={career:{祿:'money',權:'lead',科:'expert'},wealth:{祿:'windfall',權:'dynamic',科:'steady',忌:'cautious'},love:{祿:'romantic',權:'conflict',科:'talk',忌:'devoted'},health:{忌:'stress'},people:{祿:'helper',權:'leader',科:'helper',忌:'conflict'}};
const ZW_PAL={career:'官祿',wealth:'財帛',love:'夫妻',health:'疾厄',people:'僕役'};

/* ---------- 西洋星盤 ---------- */
const MC_SIGN=[['pioneer'],['money','stable'],['speak'],['care'],['lead','create'],['analyze','expert'],['people','create'],['expert','analyze'],['free','speak'],['stable','lead'],['free','pioneer'],['create','care']];
const H10={Sun:'lead',Moon:'care',Mercury:'speak',Venus:'create',Mars:'pioneer',Jupiter:'speak',Saturn:'stable',Uranus:'free',Neptune:'create',Pluto:'expert'};
const H2_SIGN=['dynamic','steady','skill','cautious','spend','cautious','people','windfall','spend','steady','ups','ups'];
const H2={Sun:'dynamic',Moon:'ups',Mercury:'skill',Venus:'people',Mars:'dynamic',Jupiter:'windfall',Saturn:'cautious',Uranus:'ups',Neptune:'ups',Pluto:'windfall'};
const H8={Jupiter:'windfall',Venus:'people',Saturn:'cautious',Pluto:'windfall'};
const VENUS_EL={fire:'passionate',earth:'practical',air:'talk',water:'romantic'};
const H7_SIGN=['passionate','devoted','talk','caretaker','romantic','practical','talk','passionate','free','slow','free','romantic'];
const VENUS_ASP={Mars:'passionate',Saturn:'slow',Uranus:'free',Neptune:'romantic',Pluto:'devoted'};
const MOON_EL={fire:'overwork',earth:'digest',air:'nerve',water:'emotion'};
const H6={Sun:'overwork',Moon:'emotion',Mercury:'nerve',Venus:'digest',Mars:'overwork',Jupiter:'digest',Saturn:'rest',Uranus:'nerve',Neptune:'sleep',Pluto:'stress'};
const H11={Sun:'leader',Moon:'loyal',Mercury:'social',Venus:'social',Mars:'leader',Jupiter:'helper',Saturn:'selective',Uranus:'independent',Neptune:'mediator',Pluto:'selective'};
const ASC_EL={fire:'leader',earth:'loyal',air:'social',water:'mediator'};
const EL=['fire','earth','air','water'];

/* ---------- 人類圖 ---------- */
const HD_TYPE={career:{generator:'expert',mg:'free',manifestor:'pioneer',projector:'analyze',reflector:'analyze'},
 wealth:{generator:'steady',mg:'dynamic',manifestor:'dynamic',projector:'skill',reflector:'people'},
 love:{generator:'devoted',mg:'passionate',manifestor:'free',projector:'slow',reflector:'slow'},
 health:{generator:'body',mg:'body',manifestor:'rest',projector:'rest',reflector:'rest'},
 people:{generator:'loyal',mg:'social',manifestor:'independent',projector:'selective',reflector:'mediator'}};
const HD_CH={career:{'1-8':'create','2-14':'money','3-60':'pioneer','4-63':'analyze','5-15':'stable','6-59':'people','7-31':'lead','9-52':'expert','10-20':'free','10-34':'free','10-57':'create','11-56':'speak','12-22':'create','13-33':'speak','16-48':'expert','17-62':'analyze','18-58':'analyze','19-49':'care','20-34':'pioneer','20-57':'analyze','21-45':'lead','23-43':'expert','24-61':'analyze','25-51':'pioneer','26-44':'money','27-50':'care','28-38':'free','29-46':'expert','30-41':'create','32-54':'money','34-57':'pioneer','35-36':'free','37-40':'care','39-55':'create','42-53':'stable','47-64':'analyze'},
 wealth:{'21-45':'dynamic','26-44':'people','32-54':'dynamic','2-14':'steady','27-50':'cautious','16-48':'skill','9-52':'skill','35-36':'ups','42-53':'steady'},
 love:{'6-59':'passionate','19-49':'caretaker','37-40':'devoted','39-55':'romantic','12-22':'romantic','30-41':'romantic','35-36':'free','27-50':'caretaker','28-38':'free','10-20':'free'},
 health:{'34-57':'body','20-34':'overwork','5-15':'rest','9-52':'body','42-53':'rest','39-55':'emotion','18-58':'stress'},
 people:{'37-40':'loyal','19-49':'loyal','7-31':'leader','11-56':'social','13-33':'mediator','26-44':'social','12-22':'social','6-59':'social','21-45':'leader','27-50':'loyal','23-43':'independent','25-51':'independent'}};
const HD_LINE={love:{1:'devoted',2:'free',3:'free',4:'slow',5:'standard',6:'standard'},people:{1:'selective',2:'independent',3:'independent',4:'social',5:'leader',6:'mediator'}};



const THEMES=[['career','m-career','catM1'],['wealth','m-wealth','catM2'],['love','m-love','catM3'],['health','m-health','catM4'],['people','m-people','catM5']];
const ZO=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];
const TAG_KEYS={career:['stable','expert','pioneer','speak','care','lead','create','analyze','money','free','people'],wealth:['steady','dynamic','windfall','people','skill','cautious','spend','ups'],love:['devoted','free','romantic','practical','passionate','talk','caretaker','slow','conflict','standard'],health:['stress','overwork','sleep','digest','emotion','nerve','rest','body'],people:['helper','leader','selective','social','independent','mediator','conflict','loyal']};

/* 證據：{sys,tag,k,a}，k 是語言包 why 的函式名，a 是參數（皆為語言無關的原始值） */
function build(W,Z,HD,E){
  const signOf=l=>Math.floor(E.norm(l)/30);
  const chKey=c=>`${Math.min(c[0],c[1])}-${Math.max(c[0],c[1])}`;
  const out={};
  for(const [th] of THEMES){
    const ev=[];const add=(sys,tag,k,...a)=>{if(tag&&TAG_KEYS[th].includes(tag))ev.push({sys,tag,k,a});};
    const pal=ZW_PAL[th];
    const pi=Z.palaces.findIndex(p=>p.name===pal),P=Z.palaces[pi],opp=Z.palaces[(pi+6)%12];
    const borrowed=!P.majorStars.length,stars=borrowed?opp.majorStars:P.majorStars;
    const combo=stars.map(s=>s.name).sort((a,b)=>ZO.indexOf(a)-ZO.indexOf(b));
    stars.forEach(s=>(ZW_STAR[th][s.name]||[]).forEach(t=>add('zw',t,'palStar',pal,borrowed,s.name,s.brightness||'')));
    P.minorStars.forEach(s=>{if(ZW_MINOR[th][s.name])add('zw',ZW_MINOR[th][s.name],'palMinor',pal,s.name);});
    [...P.majorStars,...P.minorStars].forEach(s=>{if(!s.mutagen||!ZW_MUT[th][s.mutagen])return;let tg=ZW_MUT[th][s.mutagen];
      /* 財帛化祿依星性分正財／偏財：貪狼、破軍、廉貞化祿偏向機會財，其餘偏向穩健累積 */
      if(th==='wealth'&&s.mutagen==='祿'&&!['貪狼','破軍','廉貞'].includes(s.name))tg='steady';
      add('zw',tg,'palMut',pal,s.name,s.mutagen);});
    const inH=h=>E.PK.filter(k=>W.pos[k].house===h);
    if(th==='career'){const ms=signOf(W.mc);MC_SIGN[ms].forEach(t=>add('west',t,'mc',ms));inH(10).forEach(k=>add('west',H10[k],'inHouse',k,10));}
    if(th==='wealth'){const s2=signOf(W.houses[1]);add('west',H2_SIGN[s2],'cusp',2,s2);inH(2).forEach(k=>add('west',H2[k],'inHouse',k,2));inH(8).forEach(k=>add('west',H8[k],'inHouse',k,8));}
    if(th==='love'){const vs=signOf(W.pos.Venus.lon);add('west',VENUS_EL[EL[vs%4]],'planetSign','Venus',vs);const s7=signOf(W.houses[6]);add('west',H7_SIGN[s7],'cusp',7,s7);
      W.asp.forEach(a=>{const o=a.a==='Venus'?a.b:a.b==='Venus'?a.a:null;if(o&&VENUS_ASP[o]&&a.t!==1&&a.t!==3&&a.t!==5)add('west',VENUS_ASP[o],'asp','Venus',o,a.t);});}
    if(th==='health'){const ms=signOf(W.pos.Moon.lon);add('west',MOON_EL[EL[ms%4]],'planetSign','Moon',ms);inH(6).forEach(k=>add('west',H6[k],'inHouse',k,6));
      W.asp.forEach(a=>{const pr=[a.a,a.b];if(pr.includes('Saturn')&&(pr.includes('Sun')||pr.includes('Moon'))&&[0,2,4].includes(a.t))add('west','stress','asp','Saturn',pr.find(x=>x!=='Saturn'),a.t);
        if(pr.includes('Mars')&&pr.includes('Sun')&&[0,2,4].includes(a.t))add('west','overwork','asp','Sun','Mars',a.t);});}
    if(th==='people'){const as=signOf(W.asc);add('west',as===6?'mediator':ASC_EL[EL[as%4]],'asc',as);inH(11).forEach(k=>add('west',H11[k],'inHouse',k,11));}
    add('hd',HD_TYPE[th][HD.type],'hdType',HD.type);
    HD.channels.forEach(c=>{const k=chKey(c);if(HD_CH[th][k])add('hd',HD_CH[th][k],'hdCh',k);});
    if(HD_LINE[th])HD.profile.forEach((ln,j)=>add('hd',HD_LINE[th][ln],'hdLine',HD.profile.join('/'),j,ln));
    const def=c=>HD.defined.includes(c);
    if(th==='love'&&HD.authority==='emotional')add('hd','slow','emoAuth');
    if(th==='wealth'&&def('heart'))add('hd','dynamic','heartDef');
    if(th==='wealth'&&!def('heart')&&HD.type!=='reflector')add('hd','cautious','heartOpenMoney');
    if(th==='health'){if(!def('sacral')&&HD.type!=='reflector')add('hd','rest','sacralOpen');
      if(!def('sp'))add('hd','emotion','spOpen');else add('hd','emotion','spDef');
      if(!def('root'))add('hd','stress','rootOpen');
      if(!def('head')||!def('ajna'))add('hd','nerve','mindOpen',!def('head'),!def('ajna'));
      if(!def('heart')&&HD.type!=='reflector')add('hd','overwork','heartOpenWork');}
    if(th==='people'&&def('heart'))add('hd','loyal','heartLoyal');
    const score={};ev.forEach(e=>{const s=score[e.tag]||(score[e.tag]={tag:e.tag,sys:new Set(),n:0});s.sys.add(e.sys);s.n++;});
    const ranked=Object.values(score).sort((a,b)=>b.sys.size-a.sys.size||b.n-a.n||TAG_KEYS[th].indexOf(a.tag)-TAG_KEYS[th].indexOf(b.tag));
    out[th]={th,ev,ranked,pal:P,opp,borrowed,combo:combo.join('·')||'空'};
  }
  return out;
}

/* 依語言包產生 {cards, basic, adv} */
function mix(L,W,Z,HD,E){
  const R=build(W,Z,HD,E),T0=L.TAGS,U=L.ui;
  const tensionOf=(th,a,b)=>L.TENSION[th][a+'|'+b]||L.TENSION[th][b+'|'+a]||null;
  const S=n=>root['STORY_'+n+(L.suffix||'')];
  const fit=(t,p,src)=>L.fit?L.fit(t,p,src):(root.StoryFit?StoryFit.fit(t,p,src):t);
  const snippet=(th,r)=>{const cb=r.combo;let e=null;
    if(th==='career'&&S('ZW_WORK'))e=S('ZW_WORK').career[cb];
    else if(th==='wealth'&&S('ZW_WORK'))e=S('ZW_WORK').wealth[cb];
    else if(th==='love'&&S('ZW_SPOUSE'))e=S('ZW_SPOUSE')[cb];
    else if(th==='health'&&S('ZW_PAL'))e=S('ZW_PAL')['疾厄'][cb];
    else if(th==='people'&&S('ZW_PAL'))e=S('ZW_PAL')['僕役'][cb];
    return e;};
  const why=e=>L.why[e.k](...e.a);
  const cards=[],weave={};let adv='';
  for(const [th,key] of THEMES){
    const r=R[th],T=T0[th],name=L.THEME[th],lab=t=>T[t][0];
    const cons=r.ranked.filter(x=>x.sys.size>=2);
    const top=cons.length?cons.slice(0,2):r.ranked.slice(0,1);
    const agree=top.length?top[0].sys.size:0;
    const pool=(cons.length?cons:r.ranked).slice(0,4),tens=[];
    for(let i=0;i<pool.length;i++)for(let j=i+1;j<pool.length;j++){const t=tensionOf(th,pool[i].tag,pool[j].tag);if(t)tens.push([pool[i],pool[j],t]);}
    const topTen=top.length===2&&tensionOf(th,top[0].tag,top[1].tag);
    cards.push({th,key,name,labels:top.map(x=>lab(x.tag)),agree,tension:!!topTen,line:topTen?L.firstSent(topTen):top.length?L.firstSent(T[top[0].tag][1]):''});
    if(top.length)weave[th]={labels:top.map(x=>lab(x.tag)),agree,tension:!!topTen};
    let h=`<h3 data-k="${key}">${name}</h3><h4>${U.consTitle}</h4>`;
    if(cons.length)cons.slice(0,3).forEach(x=>{h+=`<p><b>${U.agreeSay(L.sysList(x.sys),lab(x.tag))}</b>${T[x.tag][1]}</p>`;});
    else{h+=`<p>${U.noneIntro(name)}</p>`;r.ranked.slice(0,2).forEach(x=>{h+=`<p><b>${U.seeSay(L.sysList(x.sys),lab(x.tag))}</b>${T[x.tag][1]}</p>`;});}
    if(tens.length)h+=`<h4>${U.tensionTitle}</h4>${tens.slice(0,2).map(([a,b,t])=>`<p><b>${U.tensionSay(lab(a.tag),lab(b.tag))}</b>${t}</p>`).join('')}`;
    const single=r.ranked.filter(x=>x.sys.size===1&&!cons.slice(0,3).includes(x)).slice(0,3);
    if(single.length&&cons.length)h+=`<h4>${U.singleTitle}</h4><ul>${single.map(x=>`<li><b>${lab(x.tag)}</b>${U.paren(L.sysList(x.sys))}${U.colon}${L.firstSent(T[x.tag][1])}</li>`).join('')}</ul>`;
    for(const s of ['zw','west','hd']){
      const es=r.ev.filter(e=>e.sys===s);
      h+=`<h4>${U.sysSays(L.SYS[s])}</h4>`;
      if(s==='zw'){const e=snippet(th,r);
        if(e)h+=`<p><b>${U.snipHead(r.pal.name,r.borrowed,e.title)}</b>${fit(L.firstSent(e.story||e.partner),r.pal,r.opp.majorStars)}</p>`;
        if(e&&e.fields)h+=`<p>${U.fields(e.fields)}</p>`;}
      if(!es.length){h+=`<p class="muted">${U.noInd}</p>`;continue;}
      const by={};es.forEach(e=>(by[e.tag]=by[e.tag]||[]).push(why(e)));
      h+=`<ul>${Object.entries(by).map(([t,w])=>`<li>${[...new Set(w)].join(U.listSep)} → <b>${lab(t)}</b></li>`).join('')}</ul>`;
    }
    h+=`<h4>${U.adviceTitle}</h4><ul>${(cons.length?cons:r.ranked).slice(0,3).map(x=>`<li><b>${lab(x.tag)}${U.colon}</b>${T[x.tag][2]}</li>`).join('')}</ul>`;
    adv+=h;
  }
  adv+=`<h3 data-k="m-how">${U.howTitle}</h3>${U.howHtml}`;
  return{cards,basic:L.basic(weave),adv,raw:R};
}
root.Themes=root.Themes||{};
root.Themes.core={mix,build,THEMES,TAG_KEYS};
/* 給小孩／學生看的盤：主題卡改名、加一句說明，並濾掉成人情境的句子（成人輸出不變） */
const AGE_TH={
 zh:{child:{career:'天賦與未來方向',wealth:'金錢觀',love:'交朋友的樣子'},student:{career:'學業與未來方向',wealth:'零用錢與金錢觀'},
   line:{career:'小時候先看天賦和學習方式，長大後的方向現在只是參考，多讓孩子嘗試。',wealth:'看的是孩子對零用錢和物品的態度。',love:'看的是孩子交朋友、和親近的人相處的樣子。'},
   rep:{child:[['工作上，你','長大後做事時，你'],['錢的方面，你','對零用錢和物品，你'],['錢的模式偏向','金錢觀偏向'],['感情裡，你','和朋友相處時，你']],student:[['工作上，你','在學業與未來方向上，你'],['錢的方面，你','對零用錢，你'],['錢的模式偏向','金錢觀偏向']]}},
 en:{child:{career:'Talents and future direction',wealth:'Money habits',love:'Friendships'},student:{career:'Studies and future direction',wealth:'Pocket money and money habits'},
   line:{career:'For a child this shows talents and ways of learning; the adult direction is only a hint for now, so let them try many things.',wealth:'This shows how the child treats pocket money and belongings.',love:'This shows how the child makes friends and gets close to people.'},
   rep:{child:[['At work, you','In how you learn and get things done, you'],['At work, your clearest','In how you learn and get things done, your clearest'],['With money, you','With pocket money and belongings, you'],['Your money pattern leans','Your money habits lean'],['In love, you','With friends, you'],['In love, your style','With friends, your style']],student:[['At work, you','In your studies and future direction, you'],['At work, your clearest','In your studies and future direction, your clearest'],['Your money pattern leans','Your money habits lean']]}},
 ja:{child:{career:'才能と将来の方向',wealth:'お金の感覚',love:'友だちづきあい'},student:{career:'学業と将来の方向',wealth:'おこづかいとお金の感覚'},
   line:{career:'子どものうちは才能と学び方を見ます。将来の方向はまだ参考程度なので、いろいろ試させてあげましょう。',wealth:'おこづかいや持ち物への向き合い方を表します。',love:'友だちのつくり方、親しい人との関わり方を表します。'},
   rep:{child:[['仕事では、','物事に取り組むときは、'],['仕事でいちばん','物事に取り組むときにいちばん'],['お金の面では、','おこづかいや持ち物については、'],['お金の傾向は','お金の感覚は'],['恋愛では、','友だちとの関わりでは、']],student:[['仕事では、','学業と将来の方向では、'],['仕事でいちばん','学業と将来の方向でいちばん'],['お金の傾向は','お金の感覚は']]}},
 fr:{child:{career:'Talents et voie future',wealth:'Rapport à l’argent',love:'Amitiés'},student:{career:'Études et avenir',wealth:'Argent de poche'},
   line:{career:'Chez un enfant, on regarde d’abord les talents et la façon d’apprendre ; la voie future n’est qu’une piste, laissez-le essayer beaucoup de choses.',wealth:'On regarde ici le rapport de l’enfant à l’argent de poche et à ses affaires.',love:'On regarde ici la façon dont l’enfant se fait des amis et s’attache aux autres.'},
   rep:{child:[['Au travail, ','Pour apprendre et agir, '],['Côté argent, ','Avec l’argent de poche et ses affaires, '],['Avec l’argent, votre tendance','Avec l’argent de poche, votre tendance'],['En amour, ','Avec les amis, ']],student:[['Au travail, ','Pour vos études et votre avenir, '],['Avec l’argent, votre tendance','Avec l’argent de poche, votre tendance']]}}};
function ageMix(r,lang,Z){const SA=root.StarlitAge;const st=SA?SA.stage(Z):'adult';if(st!=='child'&&st!=='student')return r;
  const A=AGE_TH[lang]||AGE_TH.zh,NM=A[st]||{};let adv=r.adv,basic=r.basic;
  const RL=st==='child'&&lang==='en'?[['Practical partner','Practical'],['Romantic','Tender-hearted']]:[];const rl=s=>RL.reduce((t,[a,b])=>t.split(a).join(b),s);
  adv=rl(adv);basic=rl(basic);
  const cards=r.cards.map(c0=>{const c={...c0,labels:c0.labels.map(rl),line:rl(c0.line||'')};const nm=NM[c.th];if(nm)adv=adv.replace(`<h3 data-k="${c.key}">${c.name}</h3>`,`<h3 data-k="${c.key}">${nm}</h3>`);
    const line=SA.safe(c.line||'',lang,st);return{...c,name:nm||c.name,q:nm||undefined,line:st==='child'&&A.line[c.th]?A.line[c.th]:line};});
  for(const [a,b] of A.rep[st]||[])basic=basic.split(a).join(b);
  return{...r,cards,basic:SA.safe(basic,lang,st),adv:SA.safe(adv,lang,st)};}
root.Themes.mix=(lang,W,Z,HD,E)=>{const L=root.Themes[lang]||root.Themes.zh;return ageMix(mix(L,W,Z,HD,E),root.Themes[lang]?lang:'zh',Z);};
})(typeof globalThis!=='undefined'?globalThis:this);
