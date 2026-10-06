/* Starlit 計算核心：西洋星盤、月交點、人類圖。瀏覽器與 Node 共用。 */
(function(root){
const A=root.Astronomy||(typeof require!=='undefined'?require('astronomy-engine'):null);
const D2R=Math.PI/180,R2D=180/Math.PI,norm=x=>((x%360)+360)%360;
const PK=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];

function lonOf(b,t){
  if(b==='Moon')return A.EclipticGeoMoon(t).lon;
  if(b==='Sun')return A.SunPosition(t).elon;
  if(b==='Node')return trueNode(t);
  return A.Ecliptic(A.GeoVector(b,t,true)).elon;
}
/* Meeus 第 47 章：真月交點 */
function trueNode(t){
  const T=t.tt/36525;
  const Om=125.0445479-1934.1362891*T+0.0020754*T*T+T*T*T/467441-T*T*T*T/60616000;
  const D=297.8501921+445267.1114034*T-0.0018819*T*T;
  const M=357.5291092+35999.0502909*T-0.0001536*T*T;
  const Mp=134.9633964+477198.8675055*T+0.0087414*T*T;
  const F=93.2720950+483202.0175233*T-0.0036539*T*T;
  const s=x=>Math.sin(x*D2R);
  return norm(Om-1.4979*s(2*D-2*F)-0.1500*s(M)-0.1226*s(2*D)+0.1176*s(2*F)-0.0801*s(2*Mp-2*F));
}

function houseOf(l,h){for(let i=0;i<12;i++){const a=h[i],b=h[(i+1)%12];if(norm(l-a)<norm(b-a))return i+1;}return 1;}
const ASPECTS=[{a:0,orb:8,tone:'conj'},{a:60,orb:5,tone:'good'},{a:90,orb:7,tone:'bad'},{a:120,orb:7,tone:'good'},{a:180,orb:8,tone:'bad'}];

function westChart(utc,lat,lon){
  const t=A.MakeTime(utc);
  const pos={};
  for(const k of [...PK,'Node']){const l=lonOf(k,t);let d=norm(l-lonOf(k,t.AddDays(-0.5)));if(d>180)d-=360;pos[k]={lon:l,retro:k==='Node'?false:d<0,speed:d*2};}
  const ramc=norm(A.SiderealTime(t)*15+lon);
  const e=(23.4392911-0.0130042*(t.tt/36525))*D2R,ra=ramc*D2R,ph=lat*D2R;
  const mc=norm(Math.atan2(Math.sin(ra),Math.cos(ra)*Math.cos(e))*R2D);
  const asc=norm(Math.atan2(Math.cos(ra),-(Math.sin(ra)*Math.cos(e)+Math.tan(ph)*Math.sin(e)))*R2D);
  function cusp(f,off,above){let r=ramc+off,lam;
    for(let i=0;i<60;i++){lam=norm(Math.atan2(Math.sin(r*D2R),Math.cos(r*D2R)*Math.cos(e))*R2D);
      const dec=Math.asin(Math.sin(e)*Math.sin(lam*D2R)),x=Math.tan(ph)*Math.tan(dec);
      if(Math.abs(x)>1)return null;const ad=Math.asin(x)*R2D;
      const rn=above?ramc+f*(90+ad):ramc+180-f*(90-ad);
      if(Math.abs(norm(rn-r+180)-180)<1e-7)break;r=rn;}
    return lam;}
  const c11=cusp(1/3,30,true),c12=cusp(2/3,60,true),c2=cusp(2/3,120,false),c3=cusp(1/3,150,false);
  let houses,equal=false;
  if([c11,c12,c2,c3].some(v=>v==null)){houses=[...Array(12)].map((_,i)=>norm(asc+30*i));equal=true;}
  else houses=[asc,c2,c3,norm(mc+180),norm(c11+180),norm(c12+180),norm(asc+180),norm(c2+180),norm(c3+180),mc,c11,c12];
  for(const k in pos)pos[k].house=houseOf(pos[k].lon,houses);
  const asp=aspectsBetween(pos,PK);
  return {pos,asc,mc,houses,asp,equal,utc,lat,lon};
}
function sep(a,b){let d=Math.abs(a-b)%360;return d>180?360-d:d;}
function aspectsBetween(pos,keys){
  const asp=[];
  for(let i=0;i<keys.length;i++)for(let j=i+1;j<keys.length;j++){
    const a=keys[i],b=keys[j],d=sep(pos[a].lon,pos[b].lon);
    const lum=(a==='Sun'||a==='Moon'||b==='Sun'||b==='Moon')?2:0;
    for(let s=0;s<ASPECTS.length;s++){const o=Math.abs(d-ASPECTS[s].a);if(o<=ASPECTS[s].orb+lum){asp.push({a,b,t:s,tone:ASPECTS[s].tone,deg:ASPECTS[s].a,orb:o});break;}}
  }
  return asp.sort((x,y)=>x.orb-y.orb);
}
/* 行運：目前慢行星對本命的主要相位 */
function transits(natal,when){
  const t=A.MakeTime(when),out=[];
  for(const k of ['Jupiter','Saturn','Uranus','Neptune','Pluto']){
    const l=lonOf(k,t);const house=houseOf(l,natal.houses);const hits=[];
    for(const n of ['Sun','Moon','Mercury','Venus','Mars','ASC','MC']){
      const nl=n==='ASC'?natal.asc:n==='MC'?natal.mc:natal.pos[n].lon;const d=sep(l,nl);
      for(let s=0;s<ASPECTS.length;s++){const o=Math.abs(d-ASPECTS[s].a);if(o<=(k==='Jupiter'||k==='Saturn'?3:2)){hits.push({n,t:s,tone:ASPECTS[s].tone,orb:o});break;}}
    }
    out.push({k,lon:l,house,hits});
  }
  return out;
}

/* ===================== 人類圖 ===================== */
const GATE_ORDER=[41,19,13,49,30,55,37,63,22,36,25,17,21,51,42,3,27,24,2,23,8,20,16,35,45,12,15,52,39,53,62,56,31,33,7,4,29,59,40,64,47,6,46,18,48,57,32,50,28,44,1,43,14,34,9,5,26,11,10,58,38,54,61,60];
function gateOf(l){const x=norm(l-302);const i=Math.floor(x/5.625);const line=Math.floor((x-i*5.625)/0.9375)+1;
  const r=(x-i*5.625-(line-1)*0.9375)/0.9375;const color=Math.floor(r*6)+1;return{gate:GATE_ORDER[i],line,color,lon:l};}
const CENTER_GATES={
  head:[64,61,63],ajna:[47,24,4,17,43,11],throat:[62,23,56,35,12,45,33,8,31,20,16],
  g:[7,1,13,25,46,2,15,10],heart:[21,40,26,51],sacral:[5,14,29,59,9,3,42,27,34],
  spleen:[48,57,44,50,32,28,18],sp:[36,22,37,6,49,55,30],root:[53,60,52,19,39,41,58,38,54]};
const GATE_CENTER={};for(const c in CENTER_GATES)for(const g of CENTER_GATES[c])GATE_CENTER[g]=c;
const CHANNELS=[[1,8],[2,14],[3,60],[4,63],[5,15],[6,59],[7,31],[9,52],[10,20],[10,34],[10,57],[11,56],[12,22],[13,33],[16,48],[17,62],[18,58],[19,49],[20,34],[20,57],[21,45],[23,43],[24,61],[25,51],[26,44],[27,50],[28,38],[29,46],[30,41],[32,54],[34,57],[35,36],[37,40],[39,55],[42,53],[47,64]];
const MOTORS=['sacral','heart','sp','root'];
const HD_BODIES=['Sun','Earth','Moon','Node','SNode','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
function activations(t){
  const out={};
  for(const b of HD_BODIES){let l;
    if(b==='Earth')l=norm(lonOf('Sun',t)+180);else if(b==='SNode')l=norm(trueNode(t)+180);else l=lonOf(b,t);
    out[b]=gateOf(l);}
  return out;
}
function designTime(t){ /* 太陽回推 88 度 */
  const target=norm(lonOf('Sun',t)-88);let d=t.AddDays(-89);
  for(let i=0;i<30;i++){let diff=norm(lonOf('Sun',d)-target);if(diff>180)diff-=360;if(Math.abs(diff)<1e-7)break;d=d.AddDays(-diff/0.9856);}
  return d;
}
function humanDesign(utc){
  const t=A.MakeTime(utc),dt=designTime(t);
  const P=activations(t),D=activations(dt);
  const gates={};
  for(const b of HD_BODIES){(gates[P[b].gate]=gates[P[b].gate]||{p:false,d:false}).p=true;(gates[D[b].gate]=gates[D[b].gate]||{p:false,d:false}).d=true;}
  const channels=CHANNELS.filter(([a,b])=>gates[a]&&gates[b]);
  const defined=new Set();channels.forEach(([a,b])=>{defined.add(GATE_CENTER[a]);defined.add(GATE_CENTER[b]);});
  /* 連通區塊 */
  const adj={};for(const c of defined)adj[c]=new Set();
  channels.forEach(([a,b])=>{const x=GATE_CENTER[a],y=GATE_CENTER[b];adj[x].add(y);adj[y].add(x);});
  const seen=new Set(),comps=[];
  for(const c of defined){if(seen.has(c))continue;const comp=[];const st=[c];seen.add(c);while(st.length){const x=st.pop();comp.push(x);for(const y of adj[x])if(!seen.has(y)){seen.add(y);st.push(y);}}comps.push(comp);}
  const compOf=c=>comps.find(k=>k.includes(c));
  const throatMotor=defined.has('throat')&&MOTORS.some(m=>defined.has(m)&&compOf(m)===compOf('throat'));
  let type;
  if(defined.size===0)type='reflector';
  else if(defined.has('sacral'))type=throatMotor?'mg':'generator';
  else type=throatMotor?'manifestor':'projector';
  let authority;
  if(type==='reflector')authority='lunar';
  else if(defined.has('sp'))authority='emotional';
  else if(defined.has('sacral'))authority='sacral';
  else if(defined.has('spleen'))authority='splenic';
  else if(defined.has('heart'))authority=(adj.heart&&adj.heart.has('throat'))?'ego-m':'ego-p';
  else if(defined.has('g')&&adj.g&&adj.g.has('throat'))authority='self';
  else authority='mental';
  const def=['none','single','split','triple','quad'][Math.min(comps.length,4)];
  const profile=[P.Sun.line,D.Sun.line];
  const pk=profile.join('/');
  const angle=pk==='4/1'?'jux':(['5/1','5/2','6/2','6/3'].includes(pk)?'left':'right');
  const cross={angle,gates:[P.Sun.gate,P.Earth.gate,D.Sun.gate,D.Earth.gate]};
  return {P,D,designUtc:dt.date,gates,channels,defined:[...defined],comps,type,authority,definition:def,profile,cross};
}

const api={norm,PK,westChart,transits,aspectsBetween,trueNode,lonOf,houseOf,ASPECTS,gateOf,humanDesign,CENTER_GATES,GATE_CENTER,CHANNELS,HD_BODIES,sep};
if(typeof module!=='undefined')module.exports=api;else root.Engine=api;
})(typeof window!=='undefined'?window:globalThis);
