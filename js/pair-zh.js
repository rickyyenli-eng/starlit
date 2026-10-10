/* 雙人合盤（中文）：西洋比較盤＋宮位疊圖、紫微生年四化互飛＋夫妻宮對照＋生肖、人類圖兩人通道組合 */
(function(root){
const PL={Sun:'太陽',Moon:'月亮',Mercury:'水星',Venus:'金星',Mars:'火星',Jupiter:'木星',Saturn:'土星',ASC:'上升點'};
const H=['','第一宮','第二宮','第三宮','第四宮','第五宮','第六宮','第七宮','第八宮','第九宮','第十宮','第十一宮','第十二宮'];
const HT=['','自我與外在形象','金錢與安全感','溝通與日常往來','家庭與內心深處','戀愛、玩樂與創造','日常生活與工作習慣','伴侶與承諾','親密、信任與共同資源','信念、旅行與成長','事業與社會角色','朋友、群體與未來願景','潛意識與內在療癒'];
const ASP=[{a:0,orb:8,c:'conj',n:'合相'},{a:60,orb:4,c:'soft',n:'六分相'},{a:90,orb:6,c:'hard',n:'四分相'},{a:120,orb:6,c:'soft',n:'三分相'},{a:180,orb:7,c:'hard',n:'對分相'}];
/* 比較盤相位：key 為兩顆行星（排序後），c=conj/soft/hard */
const SYN={
 'Moon-Sun':{w:5,conj:'一個人的太陽碰上另一個人的月亮，是合盤裡最經典的組合：一方想做的事，另一方打從心裡支持。你們在一起常有「被懂」的感覺。',soft:'一方的方向感和另一方的情緒需求很合拍，日常相處自然，不用太費力就能配合。',hard:'一方想往前衝，另一方需要的是安全感。你們的節奏常常對不上，要多說出自己的需要，不要讓對方猜。'},
 'Sun-Sun':{w:3,conj:'你們的核心特質很像，像照鏡子：容易理解彼此，也可能都想當主角。',soft:'你們的生命方向彼此呼應，做同一件事時很有默契。',hard:'你們的自我表達方式不同，誰都不想先讓步。分工清楚、各有舞台，衝突就會少。'},
 'Moon-Moon':{w:4,conj:'你們的情緒習慣幾乎一樣，相處起來像回到家。缺點是心情低落時會一起低落。',soft:'你們處理情緒的方式很合，吵架也比較容易和好。',hard:'一個人需要說出來，另一個人需要安靜。情緒來時先問一句「你現在需要什麼？」。'},
 'Mars-Venus':{w:5,conj:'強烈的吸引力：一方的魅力剛好點燃另一方的行動力。這是很有火花的組合。',soft:'自然的化學反應，追求和被追求都很順，親密感容易建立。',hard:'吸引力很強，摩擦也很強。越在乎越容易吵，吵完又很快想靠近。'},
 'Venus-Venus':{w:3,conj:'你們喜歡的東西很像：品味、約會方式、表達愛的方式都合得來。',soft:'你們對美和享受的感覺一致，一起過生活很愉快。',hard:'你們表達愛的方式不同，一個人覺得做了很多，另一個人卻沒收到。說清楚彼此的「愛的語言」。'},
 'Mars-Mars':{w:2,conj:'你們做事的衝勁很像，一起行動很有效率，也容易同時爆炸。',soft:'你們的行動節奏合拍，一起運動、一起做專案都很順。',hard:'你們處理衝突的方式不同，容易一點小事就互不相讓。先冷靜再談。'},
 'Mercury-Mercury':{w:3,conj:'你們想事情的方式很像，常常話還沒說完對方就懂了。',soft:'你們聊得來，溝通順暢，可以一起討論很多事。',hard:'你們的思考方式不同，一個講重點、一個講細節。容易誤會，重要的事寫下來或再確認一次。'},
 'Sun-Venus':{w:4,conj:'一方很欣賞另一方，這種「我就是喜歡你這個樣子」的感覺很溫暖。',soft:'彼此欣賞，互相讓對方覺得自己有魅力。',hard:'欣賞中帶點拉扯，喜歡對方，但也會想改變對方。'},
 'Moon-Venus':{w:4,conj:'溫柔、體貼的組合，相處很舒服，像被好好照顧。',soft:'你們很會照顧彼此的感受，生活細節上很合。',hard:'一方想要被照顧，另一方想要被欣賞，期待有落差時要說出來。'},
 'Mars-Sun':{w:3,conj:'一方點燃另一方的鬥志，一起做事很有能量，也容易較勁。',soft:'你們能互相推動，一起完成目標。',hard:'容易互相刺激，爭主導權。給彼此各自做決定的空間。'},
 'Mars-Moon':{w:3,conj:'情緒和行動綁在一起，熱情也直接，偶爾會刺傷對方的敏感處。',soft:'一方的行動力能保護另一方的情緒，有安全感。',hard:'一方說話太直，另一方容易受傷。講話前想一下對方的感受。'},
 'Saturn-Sun':{w:3,conj:'有責任感的連結：一方像另一方的老師或靠山。穩定，但也可能有壓力。',soft:'彼此帶來穩定和承諾感，適合長期經營。',hard:'一方可能覺得被管、被限制。把「要求」換成「一起討論」。'},
 'Moon-Saturn':{w:3,conj:'很有承諾感的連結，但一方可能覺得情緒沒被接住。',soft:'給彼此安全感，關係越久越穩。',hard:'一方的情緒容易被另一方的冷靜或嚴格壓住。多說一句「我懂你」。'},
 'Saturn-Venus':{w:3,conj:'認真看待這段關係的組合，常見於長久的伴侶，但浪漫要刻意經營。',soft:'愛情裡有責任感，能一起規劃未來。',hard:'愛情裡有壓力感，一方覺得不夠被愛，另一方覺得被要求太多。'},
 'ASC-Sun':{w:3,conj:'一方一看到另一方就很有感，第一印象強烈，常是一見如故。',soft:'你們給彼此的第一印象很好，相處自然。',hard:'第一印象可能有點衝突，熟了之後才會看見對方的好。'},
 'ASC-Venus':{w:3,conj:'外表或氣質上的吸引，一方覺得另一方特別順眼。',soft:'外在互相欣賞，走在一起很自然。',hard:'審美或生活風格有些不同，需要互相包容。'},
 'ASC-Moon':{w:2,conj:'一方讓另一方覺得很安心，像老朋友。',soft:'相處自在，不用偽裝。',hard:'一方的情緒容易被另一方的外在表現影響。'}};
const KEYS=['Sun','Moon','Mercury','Venus','Mars','Saturn','ASC'];
const OVERLAY={Sun:'讓你在這方面更有存在感、更想發揮',Moon:'讓你在這方面感到熟悉、安心，也最容易牽動情緒',Venus:'讓你在這方面覺得愉快、被吸引',Mars:'在這方面激起你的動力，也最容易起火花或衝突'};

/* 紫微 */
const STEM_MUT={'甲':['廉貞','破軍','武曲','太陽'],'乙':['天機','天梁','紫微','太陰'],'丙':['天同','天機','文昌','廉貞'],'丁':['太陰','天同','天機','巨門'],'戊':['貪狼','太陰','右弼','天機'],'己':['武曲','貪狼','天梁','文曲'],'庚':['太陽','武曲','太陰','天同'],'辛':['巨門','太陽','文曲','文昌'],'壬':['天梁','紫微','左輔','武曲'],'癸':['破軍','巨門','太陰','貪狼']};
const LU_P={'命宮':'對方讓你整個人更有自信、更好運，你們在一起你會更像自己。','兄弟':'對方和你的朋友、手足處得好，或像夥伴一樣幫你。','夫妻':'對方帶給你感情上的甜蜜，是很典型的「有緣」組合。','子女':'對方在子女、投資、合作上帶給你好運。','財帛':'對方對你的財運有幫助，在一起錢的事情比較順。','疾厄':'對方讓你身心放鬆，在他身邊你比較會照顧自己。','遷移':'對方帶你往外走，拓展你的世界和機會。','僕役':'對方帶來人脈，讓你的社交圈更好。','官祿':'對方對你的事業有幫助，可能是你工作上的貴人。','田宅':'對方帶給你家的感覺，適合一起經營家庭或置產。','福德':'對方讓你心情好、精神上很富足。','父母':'對方和你的家人長輩處得好，或給你長輩般的支持。'};
const JI_P={'命宮':'你會很在意對方的一舉一動，也最容易因對方而情緒起伏。','兄弟':'容易因為朋友、手足或金錢往來產生心結。','夫妻':'你對這段感情很執著，越在乎越容易卡在溝通。','子女':'在子女、投資或合作上容易有不同意見。','財帛':'錢的觀念容易不同，共同財務要先講清楚。','疾厄':'和對方在一起時壓力容易累積在身上，記得各自保留休息空間。','遷移':'在外的場合、搬家或遠距容易有摩擦。','僕役':'容易因為對方的朋友圈或第三者產生誤會。','官祿':'對方容易影響你的工作決定，也可能在事業上意見不合。','田宅':'在家庭、住處或房產上容易有分歧。','福德':'對方容易讓你想很多，精神上需要調適。','父母':'和對方家人長輩的相處需要多用心。'};
const BR=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'],ANI=['鼠','牛','虎','兔','龍','蛇','馬','羊','猴','雞','狗','豬'];
const LIUHE=[[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]],SANHE=[[8,0,4],[2,6,10],[5,9,1],[11,3,7]];
/* 六害：子未、丑午、寅巳、卯辰、申亥、酉戌；六破：子酉、午卯、巳申、寅亥、辰丑、戌未（巳申、寅亥同時是六合，以合為主） */
const LIUHAI=[[0,7],[1,6],[2,5],[3,4],[8,11],[9,10]],LIUPO=[[0,9],[6,3],[5,8],[2,11],[4,1],[10,7]];
const pairIn=(L,a,b)=>L.some(([x,y])=>(x===a&&y===b)||(x===b&&y===a));
function zodiacRel(a,b){if(a===b)return['same','同生肖：個性相近、價值觀接近，相處像老朋友。'];
  if(LIUHE.some(([x,y])=>(x===a&&y===b)||(x===b&&y===a)))return['he','生肖六合：傳統上是互補、彼此扶持的組合。'];
  if(SANHE.some(g=>g.includes(a)&&g.includes(b)))return['san','生肖三合：傳統上是志同道合、容易合作的組合。'];
  if((a+6)%12===b)return['chong','生肖相沖：傳統上個性和步調差異大，需要多包容；也常是互相吸引的開始。'];
  if(pairIn(LIUHAI,a,b))return['hai',`生肖相害（${BR[a]}${BR[b]}相害）：傳統上容易因小事產生誤會或心結。這只是小提醒，多把話說清楚、別讓情緒累積就好。`];
  if(pairIn(LIUPO,a,b))return['po',`生肖相破（${BR[a]}${BR[b]}相破）：傳統上代表做事的節奏或習慣不太一樣，偶爾會打亂彼此的計畫。影響不大，事先多溝通、互相留點彈性即可。`];
  return['none','生肖之間沒有特別的合或沖，關係好壞主要看其他因素。'];}
const ZO=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];

/* 人類圖 */
const TYPE_N={generator:'生產者',mg:'顯示生產者',manifestor:'顯示者',projector:'投射者',reflector:'反映者'};
const TYPE_TIP={generator:'用「問是非題」的方式和他溝通，讓他用身體回應，而不是要他立刻主動決定。',mg:'他動得很快、常一次做很多事。跟他約好「行動前先講一聲」，可以少很多誤會。',manifestor:'他需要自由發起事情的空間。不要控制他，也請他在行動前先告知會受影響的人。',projector:'他需要被看見、被邀請。真心邀請他的意見，他會給你很準的建議。',reflector:'他需要時間（大約一個月）才能做重大決定，不要催他。他會反映你們關係的真實狀態。'};
/* 對方怎麼和「你」相處（以你的類型來寫） */
const TYPE_TIP_YOU={generator:'NB 可以用「問是非題」的方式和你溝通，讓你用身體回應，而不是要你立刻主動決定。',mg:'你動得很快、常一次做很多事。和 NB 約好「行動前先講一聲」，可以少很多誤會。',manifestor:'你需要自由發起事情的空間。NB 不需要控制你，你在行動前先告知 NB 就好。',projector:'你需要被看見、被邀請。NB 真心邀請你的意見時，你的建議會很準。',reflector:'你需要時間（大約一個月）才能做重大決定，NB 不要催你。你會反映這段關係的真實狀態。'};
const CH_KIND={em:['電磁連結','一人一半、合起來才完整的通道：這是吸引力和火花的來源，也是最容易「卡到」的地方。'],comp:['陪伴','兩人都有的通道：你們在這方面很像，相處自在，有共同語言。'],dom:['主導','只有一方有、另一方完全沒有：這方面一方會帶著另一方走，另一方會被深深影響。'],cmp:['妥協','一方有完整通道、另一方只有一半：這方面容易有一方覺得要配合對方。']};

function synastry(A,B,E){
  const lon=(W,k)=>k==='ASC'?W.asc:W.pos[k].lon;const out=[];
  for(const a of KEYS)for(const b of KEYS){
    const key=[a,b].sort().join('-');if(!SYN[key])continue;if(a==='ASC'&&b==='ASC')continue;
    const d=E.sep(lon(A,a),lon(B,b));
    for(const s of ASP){const lum=(a==='Sun'||a==='Moon'||b==='Sun'||b==='Moon')?1:0;const o=Math.abs(d-s.a);if(o<=s.orb+lum){out.push({a,b,key,c:s.c,n:s.n,orb:o,w:SYN[key].w*(1-o/(s.orb+lum+1))});break;}}}
  return out.sort((x,y)=>y.w-x.w);
}
function overlays(A,B,E){const o=[];for(const k of ['Sun','Moon','Venus','Mars']){const h=E.houseOf(B.pos[k].lon,A.houses);o.push({k,h});}return o;}

function zwCross(ZA,ZB,nameB){
  const stemB=ZB.rawDates.chineseDate.yearly[0],mut=STEM_MUT[stemB]||[];
  const where=n=>{const i=ZA.palaces.findIndex(p=>[...p.majorStars,...p.minorStars].some(s=>s.name===n));return i>=0?ZA.palaces[i].name:null;};
  const lu=mut[0]?{star:mut[0],pal:where(mut[0])}:null,ji=mut[3]?{star:mut[3],pal:where(mut[3])}:null;
  const majors=(Z,name)=>{const i=Z.palaces.findIndex(p=>p.name===name),p=Z.palaces[i];return (p.majorStars.length?p:Z.palaces[(i+6)%12]).majorStars.map(s=>s.name);};
  const spouseA=majors(ZA,'夫妻'),mingB=majors(ZB,'命宮');const match=spouseA.filter(s=>mingB.includes(s));
  return{stemB,lu,ji,spouseA,mingB,match};
}
function hdCombo(A,B,E){
  const has=(H,g)=>!!H.gates[g];const out={em:[],comp:[],dom:[],cmp:[]};
  for(const [a,b] of E.CHANNELS){const fa=has(A,a)&&has(A,b),fb=has(B,a)&&has(B,b),pa=has(A,a)||has(A,b),pb=has(B,a)||has(B,b);
    const k=`${a}-${b}`;
    if(fa&&fb)out.comp.push(k);
    else if((fa&&!pb)||(fb&&!pa))out.dom.push({k,who:fa?'A':'B'});
    else if((fa&&pb)||(fb&&pa))out.cmp.push({k,who:fa?'A':'B'});
    else if(!fa&&!fb&&((has(A,a)&&has(B,b))||(has(A,b)&&has(B,a))))out.em.push(k);}
  return out;
}

/* 計算（語言無關，各語版共用）：M 的每一項是結構化資料，由各語言自行組字 */
/* 門檻依 400 組隨機配對的分布校正（約四分位） */
const TH={attract:[4,6,8],sync:[1,2,4],stable:[2,3,4],friction:[4,6,8]};
const animalOf=Z=>BR.indexOf(Z.rawDates.chineseDate.yearly[1]);
function compute(P,E){
  const A=P.A,B=P.B;
  const syn=synastry(A.W,B.W,E),syn2=synastry(B.W,A.W,E);
  const ov=overlays(A.W,B.W,E),ov2=overlays(B.W,A.W,E);
  const zAB=zwCross(A.Z,B.Z),zBA=zwCross(B.Z,A.Z);
  const hd=hdCombo(A.HD,B.HD,E);
  const aA=animalOf(A.Z),aB=animalOf(B.Z),zr=zodiacRel(aA,aB)[0];
  /* 四個面向：吸引、默契、穩定、摩擦 */
  const M={attract:[],sync:[],stable:[],friction:[]};
  syn.forEach(s=>{const t={t:'syn',s};
    if(s.c==='hard'){if(s.key==='Mars-Venus')M.attract.push(t);else M.friction.push(t);return;}
    if(['Mars-Sun','Mars-Moon','Mars-Mars'].includes(s.key)&&s.c!=='hard'){M.attract.push(t);return;}
    if(['Mars-Venus','Sun-Venus','ASC-Venus'].includes(s.key))M.attract.push(t);
    if(['Moon-Sun','Moon-Moon','Mercury-Mercury','Moon-Venus','ASC-Moon','ASC-Sun','Sun-Sun'].includes(s.key))M.sync.push(t);
    if(['Saturn-Sun','Moon-Saturn','Saturn-Venus','Venus-Venus'].includes(s.key))M.stable.push(t);});
  /* 人類圖通道數量多時不讓它主導分數：每類最多計 2 項 */
  hd.em.slice(0,2).forEach(k=>M.attract.push({t:'hdem',k}));hd.comp.slice(0,2).forEach(k=>M.sync.push({t:'hdcomp',k}));hd.cmp.slice(0,2).forEach(x=>M.friction.push({t:'hdcmp',k:x.k}));hd.dom.slice(0,1).forEach(x=>M.stable.push({t:'hddom',k:x.k}));
  if(zAB.lu&&['命宮','夫妻','福德'].includes(zAB.lu.pal))M.attract.push({t:'zlu',dir:'AB',pal:zAB.lu.pal});
  if(zBA.lu&&['命宮','夫妻','福德'].includes(zBA.lu.pal))M.attract.push({t:'zlu',dir:'BA',pal:zBA.lu.pal});
  if(zAB.ji&&['命宮','夫妻'].includes(zAB.ji.pal))M.friction.push({t:'zji',dir:'AB',pal:zAB.ji.pal});
  if(zBA.ji&&['命宮','夫妻'].includes(zBA.ji.pal))M.friction.push({t:'zji',dir:'BA',pal:zBA.ji.pal});
  if(zAB.match.length)M.attract.push({t:'match',dir:'AB',stars:zAB.match});
  if(zBA.match.length)M.attract.push({t:'match',dir:'BA',stars:zBA.match});
  if(zr==='he'||zr==='san')M.stable.push({t:'zod',rel:zr});if(zr==='chong')M.friction.push({t:'zod',rel:zr});
  ov.forEach(o=>{if(o.k==='Venus'&&[1,5,7,8].includes(o.h))M.attract.push({t:'ov',dir:'AB',k:o.k,h:o.h});if(o.k==='Moon'&&[4,7].includes(o.h))M.stable.push({t:'ov',dir:'AB',k:o.k,h:o.h});});
  ov2.forEach(o=>{if(o.k==='Venus'&&[1,5,7,8].includes(o.h))M.attract.push({t:'ov',dir:'BA',k:o.k,h:o.h});if(o.k==='Moon'&&[4,7].includes(o.h))M.stable.push({t:'ov',dir:'BA',k:o.k,h:o.h});});
  const lv={};for(const k in M){const n=M[k].length,t=TH[k];lv[k]=n>=t[2]?3:n>=t[1]?2:n>=t[0]?1:0;}
  const strong=['attract','sync','stable'].map(k=>[k,lv[k]]).sort((a,b)=>b[1]-a[1]);
  const tips=[];if(lv.friction>=2)tips.push('friction');if(lv.attract>=2)tips.push('attract');if(lv.sync<=1)tips.push('sync');if(lv.stable<=1)tips.push('stable');
  return{syn,syn2,ov,ov2,zAB,zBA,hd,aA,aB,zr,M,lv,strong,tips};
}

function render(P,E){
  /* P={A:{W,Z,HD,name},B:{W,Z,HD,name}} */
  const A=P.A,B=P.B,esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),nb=esc((B.name||'').trim().slice(0,20))||'TA',na='你';
  const chN=k=>{const Hz=(typeof HDZ!=='undefined'?HDZ:root.HDZ);return Hz&&Hz.channels[k]?Hz.channels[k][0]:k;};
  const C=compute(P,E),{syn,ov,ov2,zAB,zBA,hd}=C;
  const animal=animalOf;
  const zr=zodiacRel(C.aA,C.aB);
  const pn=(who,k)=>`${who}的${PL[k]}`,pz=p=>p==='命宮'?'命宮':p+'宮';
  const ZOD={he:'生肖六合',san:'生肖三合',chong:'生肖相沖'};
  const itemTxt=it=>{switch(it.t){
    case 'syn':return `${pn(na,it.s.a)}${it.s.n}${pn(nb,it.s.b)}`;
    case 'hdem':return `人類圖電磁通道 ${it.k}`;case 'hdcomp':return `人類圖共同通道 ${it.k}`;case 'hdcmp':return `人類圖妥協通道 ${it.k}`;case 'hddom':return `人類圖主導通道 ${it.k}`;
    case 'zlu':return it.dir==='AB'?`${nb}的生年化祿進你的${pz(it.pal)}`:`你的生年化祿進${nb}的${pz(it.pal)}`;
    case 'zji':return it.dir==='AB'?`${nb}的生年化忌進你的${pz(it.pal)}`:`你的生年化忌進${nb}的${pz(it.pal)}`;
    case 'match':return it.dir==='AB'?`${nb}的命宮主星（${it.stars.join('、')}）正是你夫妻宮的星`:`你的命宮主星（${it.stars.join('、')}）正是${nb}夫妻宮的星`;
    case 'zod':return ZOD[it.rel];
    case 'ov':return it.dir==='AB'?`${pn(nb,it.k)}落在你的${H[it.h]}`:`${pn(na,it.k)}落在${nb}的${H[it.h]}`;}return '';};
  const M={};for(const k in C.M)M[k]=C.M[k].map(itemTxt);
  const lvk=k=>C.lv[k];
  const LV=['不明顯','有一些','明顯','很強'],LVF=['不多','有一些','不少','很多'];
  const MN={attract:['吸引力','彼此的火花與化學反應'],sync:['默契','聊不聊得來、懂不懂對方'],stable:['穩定度','能不能走得長久、給彼此安全感'],friction:['摩擦點','容易卡住、需要磨合的地方']};
  const cards=Object.entries(MN).map(([k,[t,d]])=>{const n=M[k].length,l=lvk(k);return `<div class="card pair-m ${k}"><span class="q">${t}</span><span class="big">${(k==='friction'?LVF:LV)[l]}</span><span class="agree">${[0,1,2].map(i=>`<i class="${i<l?'on':''}"></i>`).join('')} ${n} 項依據</span><p>${d}</p></div>`;}).join('');
  /* 總結 */
  const strong=Object.entries(MN).filter(([k])=>k!=='friction').map(([k,[t]])=>[t,lvk(k)]).sort((a,b)=>b[1]-a[1]);
  const fr=lvk('friction');
  let sum=strong[0][1]===0?`<p>把你和${nb}的三張盤放在一起看，吸引力、默契、穩定度都沒有特別突出的指標，這段關係的樣子比較取決於你們怎麼經營，而不是先天的牽引。`:`<p>把你和${nb}的三張盤放在一起看，你們最明顯的是<b>${strong[0][0]}</b>${strong[1][1]>=2?`，其次是<b>${strong[1][0]}</b>`:''}。`;
  sum+=fr>=2?`摩擦點也不少，這不是壞事：很多長久的關係都是吵出來的，關鍵是知道會卡在哪裡。</p>`:`摩擦點不多，相處起來比較省力。</p>`;
  const top=[...syn].slice(0,2);
  if(top.length)sum+=`<p>${top.map(s=>SYN[s.key][s.c]).join('')}</p>`;
  /* 詳細 */
  let adv=`<h3 data-k="p-sum">合盤總覽</h3>${sum}<ul>${Object.entries(MN).map(([k,[t]])=>`<li><b>${t}</b>：${M[k].length?M[k].join('、'):'沒有明顯的指標'}</li>`).join('')}</ul>`;
  adv+=`<h3 data-k="p-west">西洋比較盤</h3><h4>兩人之間的重要相位</h4>${syn.length?`<ul>${syn.slice(0,8).map(s=>`<li><b>${pn(na,s.a)}${s.n}${pn(nb,s.b)}</b>（容許度 ${s.orb.toFixed(1)}°）：${SYN[s.key][s.c]}</li>`).join('')}</ul>`:'<p class="muted">兩人的個人行星之間沒有緊密的相位，關係的重點更多在其他系統。</p>'}`;
  adv+=`<h4>${nb}的行星落在你的哪裡</h4><ul>${ov.map(o=>`<li><b>${pn(nb,o.k)}落在你的${H[o.h]}</b>（${HT[o.h]}）：${nb}${OVERLAY[o.k]}。</li>`).join('')}</ul>`;
  adv+=`<h4>你的行星落在${nb}的哪裡</h4><ul>${ov2.map(o=>`<li><b>${pn(na,o.k)}落在${nb}的${H[o.h]}</b>（${HT[o.h]}）：${OVERLAY[o.k].replace(/你/g,nb)}。</li>`).join('')}</ul>`;
  const pnz=pz;
  adv+=`<h3 data-k="p-zw">紫微合盤</h3><h4>生年四化互飛</h4><p class="muted">把一個人出生年的四化，放到另一個人的命盤上，看他帶給對方什麼、讓對方在意什麼。</p><ul>`;
  if(zAB.lu&&zAB.lu.pal)adv+=`<li><b>${nb}（${zAB.stemB}年）的化祿 ${zAB.lu.star} 進你的${pnz(zAB.lu.pal)}</b>：${LU_P[zAB.lu.pal].replace(/對方/g,nb)}</li>`;
  if(zAB.ji&&zAB.ji.pal)adv+=`<li><b>${nb}的化忌 ${zAB.ji.star} 進你的${pnz(zAB.ji.pal)}</b>：${JI_P[zAB.ji.pal]}</li>`;
  if(zBA.lu&&zBA.lu.pal)adv+=`<li><b>你（${zBA.stemB}年）的化祿 ${zBA.lu.star} 進${nb}的${pnz(zBA.lu.pal)}</b>：${LU_P[zBA.lu.pal].replace(/你/g,nb).replace(/對方/g,'你')}</li>`;
  if(zBA.ji&&zBA.ji.pal)adv+=`<li><b>你的化忌 ${zBA.ji.star} 進${nb}的${pnz(zBA.ji.pal)}</b>：${JI_P[zBA.ji.pal].replace(/你/g,nb).replace(/對方/g,'你')}</li>`;
  adv+=`</ul><h4>他是不是你夫妻宮寫的那種人？</h4><ul><li>你的夫妻宮主星：${zAB.spouseA.join('、')||'—'}；${nb}的命宮主星：${zAB.mingB.join('、')||'—'}。${zAB.match.length?`<b>重疊了 ${zAB.match.join('、')}</b>，${nb}很像你命中描述的伴侶樣子。`:'沒有重疊，對方的個性不是你夫妻宮的典型樣子，這段關係會帶你認識另一種人。'}</li>
    <li>${nb}的夫妻宮主星：${zBA.spouseA.join('、')||'—'}；你的命宮主星：${zBA.mingB.join('、')||'—'}。${zBA.match.length?`<b>重疊了 ${zBA.match.join('、')}</b>，你很像${nb}命中描述的伴侶。`:'沒有重疊。'}</li></ul>
    <h4>生肖</h4><p>你屬${ANI[animal(A.Z)]}、${nb}屬${ANI[animal(B.Z)]}（以農曆年計）。${zr[1]}<span class="muted">（民俗說法，參考就好。）</span></p>`;
  adv+=`<h3 data-k="p-hd">人類圖合盤</h3><p>你是${TYPE_N[A.HD.type]}、${nb}是${TYPE_N[B.HD.type]}。</p><ul><li><b>和${nb}相處</b>：${TYPE_TIP[B.HD.type].replace(/他/g,nb)}</li><li><b>${nb}和你相處</b>：${TYPE_TIP_YOU[A.HD.type].replace(/ ?NB ?/g,nb)}</li></ul>`;
  for(const kind of ['em','comp','dom','cmp']){const L=hd[kind];if(!L.length)continue;const [t,d]=CH_KIND[kind];
    adv+=`<h4>${t}（${L.length}）</h4><p class="muted">${d}</p><ul>${L.map(x=>{const k=typeof x==='string'?x:x.k;const who=typeof x==='string'?'':`（${x.who==='A'?'你':nb}有完整通道）`;return `<li><b>${k} ${chN(k)}</b>${who}</li>`;}).join('')}</ul>`;}
  adv+=`<h3 data-k="p-tips">給你們的建議</h3><ul>`;
  const tips=[];
  if(fr>=2)tips.push('摩擦點多的組合，吵架時先處理情緒、再處理事情。約好一個「暫停」的暗號。');
  if(lvk('attract')>=2)tips.push('吸引力強是你們的本錢，記得在忙碌的日子裡保留只屬於兩個人的時間。');
  if(lvk('sync')<=1)tips.push('默契需要培養：固定一起做一件小事（散步、做飯、看劇），比偶爾的大活動更有用。');
  if(lvk('stable')<=1)tips.push('穩定感要靠約定：把對未來的期待（錢、住哪、要不要小孩）早一點講清楚。');
  tips.push(TYPE_TIP[B.HD.type].replace(/他/g,nb));
  adv+=tips.map(t=>`<li>${t}</li>`).join('')+'</ul>';
  return{cards,basic:sum,adv,M};
}
root.Pair=root.Pair||{};root.Pair.zh={render,compute,synastry,hdCombo,zwCross,zodiacRel,STEM_MUT,BR};
})(typeof globalThis!=='undefined'?globalThis:this);
