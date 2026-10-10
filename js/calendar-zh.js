/* 年度運勢行事曆（中文）：依農曆流月排出一整年，每月的重心（流月命宮）、流月四化落宮、順逆，
 * 加上西洋行運的水星／金星／火星逆行期間與木星、土星換宮。另產生「這個月」重點卡。 */
(function(root){
const T=()=>root.Highlights.zh;
const PN=n=>n==='命宮'?'命宮':n+'宮';
const CN={'正':1,'一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10,'冬':11,'腊':12,'臘':12};
const MON=['','正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','冬月','臘月'];
const RETRO={Mercury:['水星逆行','簽約、買 3C、交通與重要溝通多確認一次；適合回顧與修正，不急著開新局。'],Venus:['金星逆行','感情與花錢的決定先放慢，舊情、舊朋友容易回到生活裡。'],Mars:['火星逆行','行動容易卡住或要重來，衝突先冷處理，計畫多留緩衝。']};
const fmt=t=>{const d=new Date(t);return `${d.getUTCMonth()+1}/${d.getUTCDate()}`;};
const DAY=86400000;
const cache=new WeakMap();
/* 農曆新年（以流年地支改變的那天為準） */
function lny(Z,y){let lo=Date.UTC(y,0,15),hi=Date.UTC(y,1,25);const br=t=>{try{return Z.horoscope(new Date(t)).yearly.earthlyBranch;}catch(e){return '';}};const b0=br(lo);
  while(hi-lo>DAY){const mid=lo+Math.floor((hi-lo)/DAY/2)*DAY;if(br(mid)===b0)lo=mid;else hi=mid;}return hi;}
function lunarMonth(s){const m=String(s||'').match(/年(閏|闰)?(.)月/);if(!m)return null;return{leap:!!m[1],m:CN[m[2]]||0};}

function months(W,Z,HD,E,ly){
  let c=cache.get(Z);if(!c){c={};cache.set(Z,c);}if(c[ly])return c[ly];
  const start=lny(Z,ly),end=lny(Z,ly+1);
  const findStar=n=>Z.palaces.findIndex(p=>[...p.majorStars,...p.minorStars].some(s=>s.name===n));
  /* 逆行期間（每天取樣） */
  const AS=root.Astronomy,retro=[];
  for(const k of ['Mercury','Venus','Mars']){let prev=null,on=null;
    for(let t=start-2*DAY;t<=end+2*DAY;t+=DAY){const l=E.lonOf(k,AS.MakeTime(new Date(t)));if(prev!==null){const d=((l-prev)%360+540)%360-180,r=d<0;
        if(r&&on===null)on=t;if(!r&&on!==null){retro.push({k,from:on,to:t-DAY});on=null;}}prev=l;}
    if(on!==null)retro.push({k,from:on,to:end});}
  /* 木星、土星換宮 */
  const ing=[];for(const k of ['Jupiter','Saturn']){let prev=null;for(let t=start;t<=end;t+=2*DAY){const h=E.houseOf(E.lonOf(k,AS.MakeTime(new Date(t))),W.houses);if(prev!==null&&h!==prev)ing.push({k,h,t});prev=h;}}
  /* 流月：從新年第 15 天起，每 29.53 天取一次月中 */
  const out=[];
  for(let i=0;i<14;i++){const mid=start+14*DAY+Math.round(i*29.53*DAY);if(mid>=end)break;
    let H;try{H=Z.horoscope(new Date(mid));}catch(e){continue;}
    const lm=lunarMonth(H.lunarDate);if(!lm)continue;
    if(out.length&&out[out.length-1].m===lm.m&&out[out.length-1].leap===lm.leap)continue;
    const mo=H.monthly,yr=H.yearly;
    const muts=(mo.mutagen||[]).map((s,j)=>{const x=findStar(s);return{star:s,k:'祿權科忌'[j],pal:x>=0?Z.palaces[x].name:null};});
    const mp=Z.palaces[mo.index]?Z.palaces[mo.index].name:null;
    const from=mid-14*DAY,to=mid+15*DAY;
    let sc=0;const Tm=T();
    muts.forEach(m=>{if(!m.pal)return;if(m.k==='祿')sc+=Tm.GOOD.includes(m.pal)?2:1;if(m.k==='權'&&['命宮','官祿','財帛'].includes(m.pal))sc+=1;if(m.k==='忌')sc-=Tm.HARD.includes(m.pal)?2:1;});
    const ji=muts.find(m=>m.k==='忌'&&m.pal);if(ji){const ji_i=Z.palaces.findIndex(p=>p.name===ji.pal);if(ji_i===mo.index||ji_i===(mo.index+6)%12)sc-=1;}
    const rs=retro.filter(r=>r.from<to&&r.to>from);
    if(rs.some(r=>r.k==='Mercury'&&Math.min(r.to,to)-Math.max(r.from,from)>10*DAY))sc-=0.5;
    out.push({m:lm.m,leap:lm.leap,label:(lm.leap?'閏':'')+MON[lm.m],gz:mo.heavenlyStem+mo.earthlyBranch,from,to,mid,mp,muts,score:sc,tone:sc>=1?'up':sc<=-1?'hard':'even',retro:rs,ing:ing.filter(x=>x.t>=from&&x.t<to),yp:Z.palaces[yr.index]?Z.palaces[yr.index].name:null});}
  c[ly]=out;return out;
}
const TONE={up:['順','up'],even:['平','even'],hard:['留意','hard']};
function monthItems(x,age){
  const Tm=T(),kid=age<15,F=p=>(kid&&Tm.KID_FOCUS[p])||Tm.FOCUS[p],Lu=p=>(kid&&Tm.KID_LU[p])||Tm.LU[p],Ji=p=>(kid&&Tm.KID_JI[p])||Tm.JI[p];
  const li=[];const lu=x.muts.find(m=>m.k==='祿'&&m.pal),ji=x.muts.find(m=>m.k==='忌'&&m.pal);
  if(x.mp)li.push(`<b>流月命宮在${PN(x.mp)}</b>：${F(x.mp).replace(/這一年/g,'這個月')}`);
  if(lu)li.push(`<b>${lu.star}化祿進${PN(lu.pal)}</b>：${Lu(lu.pal)}`);
  if(ji)li.push(`<b>${ji.star}化忌進${PN(ji.pal)}</b>：${Ji(ji.pal)}`);
  x.retro.forEach(r=>li.push(`<b>${RETRO[r.k][0]}（${fmt(r.from)}–${fmt(r.to)}）</b>：${RETRO[r.k][1]}`));
  x.ing.forEach(g=>li.push(`<b>${g.k==='Jupiter'?'木星':'土星'}約 ${fmt(g.t)} 進入你的${Tm.H[g.h]}</b>`));
  return li;
}
function age(Z,y){return y-Z.rawDates.lunarDate.lunarYear+1;}
/* 「這個月」卡 */
function nowCard(W,Z,HD,E){
  const ly=T().curYear(Z);if(age(Z,ly)<1)return '';
  let ms;try{ms=months(W,Z,HD,E,ly);}catch(e){return '';}
  const now=Date.now(),x=ms.find(m=>now>=m.from&&now<m.to)||ms.find(m=>m.from>now);if(!x)return '';
  const li=monthItems(x,age(Z,ly)),tn=TONE[x.tone];
  return `<div class="hl-card mon"><div class="hl-k">這個月（農曆${x.label}，約 ${fmt(x.from)}–${fmt(x.to)}）</div><h3>重心在${T().DOM[x.mp]||'—'} <span class="tone ${tn[1]}">${tn[0]}</span></h3><ul>${li.slice(0,4).map(s=>`<li>${s}</li>`).join('')}</ul></div>`;
}
/* 年度行事曆 */
function render(W,Z,HD,E){
  const ly=T().curYear(Z);if(age(Z,ly)<1)return '';
  let ms;try{ms=months(W,Z,HD,E,ly);}catch(e){console.error(e);return '';}
  const now=Date.now(),ag=age(Z,ly);
  return `<div class="cal"><div class="tl-head"><h3>${ly} 年度運勢行事曆（農曆 ${ly} 年）</h3><p class="muted">每個月依「流月命宮」與流月四化落在你本命的哪一宮來看，再加上水星、金星、火星逆行與木星、土星換宮。日期是約略範圍，「順／平／留意」只是整體感受的估算。</p></div>
   <div class="cal-grid">${ms.map(x=>{const tn=TONE[x.tone],cur=now>=x.from&&now<x.to;return `<div class="cal-m ${tn[1]}${cur?' cur':''}"><div class="cal-h"><b>${x.label}</b><span class="muted">${fmt(x.from)}–${fmt(x.to)}・${x.gz}</span><span class="tone ${tn[1]}">${tn[0]}</span></div><p class="cal-t">重心在${T().DOM[x.mp]||'—'}</p><ul>${monthItems(x,ag).map(s=>`<li>${s}</li>`).join('')}</ul></div>`;}).join('')}</div></div>`;
}
root.Calendar=root.Calendar||{};root.Calendar.zh={months,render,nowCard};
})(typeof globalThis!=='undefined'?globalThis:this);
