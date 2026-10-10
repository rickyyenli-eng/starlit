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
 '官祿':'工作順手，有表現與升遷的機會。','田宅':'家運順，適合整理住處、搬家或添購家用。','福德':'心情愉快，生活品質提升，享受多一點。','父母':'長輩或上司給你支持，考試文書順利。'};
/* 流年化忌入某宮：要用力的地方 */
const JI={
 '命宮':'容易對自己要求太高、想太多，記得留餘裕。','兄弟':'和朋友或手足之間可能有心結，借貸、作保要小心。','夫妻':'感情容易卡在溝通，少翻舊帳、多傾聽。','子女':'投資與合夥要保守，也可能為子女或學生操心。',
 '財帛':'收支起伏較大，不適合高風險投機，先把預備金準備好。','疾厄':'身體容易累積疲勞，固定作息、定期檢查。','遷移':'在外比較辛苦，交通、出差多注意，凡事保持低調。','僕役':'慎選合作對象，人際上容易被拖累或誤解。',
 '官祿':'工作壓力大，事情容易卡關，重大決定多請教人。','田宅':'家裡或房子的事讓你煩心，存錢要有紀律。','福德':'情緒容易內耗、睡不好，刻意安排放鬆時間。','父母':'和上司或長輩溝通不易，合約文件要看清楚。'};
/* 15 歲（虛歲）以下改用成長版的說法 */
const KID_FOCUS={'夫妻':'這一年和身邊親近的人互動是主題：好朋友、喜歡的同學，學著表達心意也學著尊重別人。','子女':'這一年適合發展興趣和作品：畫畫、音樂、運動、做東西，能量想往外延伸。','財帛':'這一年適合學習零用錢怎麼用、怎麼存，建立對錢的基本觀念。','遷移':'這一年適合往外走：旅行、營隊、轉學或搬家，在外面會長見識。','僕役':'這一年同學和朋友的影響很大，新的團體、社團會帶來很多學習。','官祿':'這一年學業是主軸：考試、比賽、選擇方向，努力容易被看見。','田宅':'這一年重心在家：搬家、換房間、家人的事，家裡的氣氛很重要。'};
const KID_LU={'夫妻':'和好朋友的關係很好，容易遇到談得來的人。','財帛':'容易收到獎勵、紅包或獎學金，適合學著存下來。','官祿':'學業順手，考試、比賽有好表現。','僕役':'同學和朋友帶來幫助，團體生活愉快。','子女':'興趣和作品有收穫，適合多展現。','田宅':'家裡氣氛好，生活安定。'};
const KID_JI={'夫妻':'和好朋友之間容易有小誤會，多說出自己的感受。','財帛':'零用錢容易花太快，學著記帳和分配。','官祿':'課業壓力比較大，安排好休息與讀書時間。','僕役':'同學之間容易有摩擦，遇到困擾記得告訴大人。','子女':'興趣上容易受挫，給自己多一點時間。','田宅':'家裡的事容易讓人心煩，多和家人溝通。','遷移':'出門在外多注意安全，跟著大人行動。'};
/* 學生（虛歲 13–22）與樂齡（虛歲 65 以上）的說法；童年（13 以下）用 KID_* */
const STU_FOCUS={'遷移':'這一年適合往外走：旅行、交換、營隊、住校或到外地讀書，在外面會長見識。','兄弟':'這一年和兄弟姊妹、好朋友的互動變多，可能一起做事，也要學著處理彼此的界線。','夫妻':'這一年感情與親密的朋友是主題：可能有喜歡的人，也會學著怎麼表達與相處。','子女':'這一年適合發展興趣、作品與社團，能量想往外延伸。','財帛':'這一年適合學著管理零用錢或打工收入，建立對錢的觀念。','官祿':'這一年學業是主軸：考試、升學、選科系或第一份實習，努力容易被看見。','僕役':'這一年同學、社團和新朋友的影響很大，會影響你接下來的方向。','父母':'這一年和師長、父母打交道的機會變多，考試、證照、申請文件是重點。','田宅':'這一年重心在家與住處：搬家、住宿、家人的事，家裡的氣氛很重要。'};
const STU_LU={'僕役':'同學、朋友帶來幫助與機會。','兄弟':'手足或好朋友帶來好消息，一起做事容易成功。','夫妻':'人緣與感情運好，容易遇到談得來的人。','財帛':'容易有獎學金、打工或額外收入。','官祿':'學業順手，考試、比賽、申請有好表現。','父母':'師長與父母給你支持，考試文書順利。','子女':'興趣與作品有收穫，適合多展現。'};
const STU_JI={'僕役':'同學之間容易有誤會或被拖累，選擇真心的朋友。','兄弟':'和手足或好朋友之間可能有心結，借錢給別人要小心。','夫妻':'感情或好友之間容易有誤會，多說出自己的感受。','財帛':'錢容易花太快，學著記帳和分配。','官祿':'課業壓力大，安排好讀書與休息。','父母':'和師長或父母溝通不易，申請文件要看清楚。','子女':'興趣上容易受挫，給自己多一點時間。'};
const SEN_DOM={'官祿':'生活重心與角色','財帛':'退休金與用錢','子女':'子女與孫輩','夫妻':'老伴與親密的人','僕役':'朋友與社交圈','父母':'文件、保險與手續'};
const SEN_FOCUS={'夫妻':'這一年和老伴或最親近的人的相處是主題，多一起安排生活、出遊，彼此照應。','子女':'這一年和子女、孫輩的互動變多，也適合把經驗傳承給下一代。','財帛':'這一年對錢特別有感：退休金、保險、日常開銷都值得重新整理一次，以穩為主。','官祿':'這一年生活重心與角色會調整：退休安排、志工、社團或一直想學的事，都會讓你找到新的成就感。','僕役':'這一年朋友與社交圈很重要，參加社團、同學會、鄰里活動，能帶來好心情。','父母':'這一年文件、保險、證件與各種手續比較多，看清楚再簽。','遷移':'這一年適合出門走走：旅行、探親、換環境，只要量力而為。','兄弟':'這一年和兄弟姊妹、老朋友的往來變多，彼此照應。'};
const SEN_LU={'兄弟':'兄弟姊妹或老朋友帶來好消息，彼此照應。','夫妻':'和老伴或親近的人相處融洽，彼此是依靠。','子女':'子女、孫輩帶來好消息與照顧。','財帛':'用錢比較寬裕，退休金或理財安排順利。','官祿':'生活重心穩定，參與的事情帶來成就感。','僕役':'朋友、社團帶來陪伴與好心情。','父母':'各種手續、文件辦得順利。'};
const SEN_JI={'遷移':'出門在外多注意交通與安全，行程不要排太滿。','夫妻':'和老伴容易為小事拌嘴，多體諒、多說謝謝。','子女':'容易為子女或孫輩操心，關心但不必事事插手。','財帛':'用錢要保守，不碰高風險投資，也小心詐騙。','官祿':'生活節奏被打亂，事情別一次攬太多。','僕役':'人際上容易有誤會，借錢、作保要小心。','父母':'文件與手續容易出錯，重要的事請家人一起看。','疾厄':'身體需要多照顧，定期檢查、作息規律最重要。'};
const STU_DOM={'官祿':'學業','子女':'興趣與作品','財帛':'零用錢與打工','夫妻':'感情與親密的朋友','僕役':'同學與朋友','父母':'父母與師長'};
const KID_DOM={'夫妻':'好朋友與人際','財帛':'零用錢'};
/* 依虛歲回傳該階段的說法 */
function stageOf(age){return age<13?'kid':age<=22?'stu':age>=65?'sen':'adult';}
function stageTxt(age){const st=stageOf(age);
  const pick=(K,S,N,A)=>p=>(st==='kid'&&K[p])||((st==='kid'||st==='stu')&&S[p])||(st==='sen'&&N[p])||A[p];
  return{st,F:pick(KID_FOCUS,STU_FOCUS,SEN_FOCUS,FOCUS),L:pick(KID_LU,STU_LU,SEN_LU,LU),J:pick(KID_JI,STU_JI,SEN_JI,JI),D:p=>(st==='sen'&&SEN_DOM[p])||(st==='kid'&&KID_DOM[p])||((st==='kid'||st==='stu')&&STU_DOM[p])||DOM[p],
    JUP:h=>(st==='kid'||st==='stu')&&JUP_Y[h-1]||st==='sen'&&JUP_S[h-1]||JUP[h-1],SAT:h=>(st==='kid'||st==='stu')&&SAT_Y[h-1]||st==='sen'&&SAT_S[h-1]||SAT[h-1]};}
/* 木星（約一年換一宮）、土星（約兩年半換一宮）行經本命宮位 */
const JUP=['自信與能見度提升，適合開始新計畫','收入或資源增加的機會','學習、寫作、短途移動變多','家庭、居住空間有好的變化','戀愛、創作、玩樂的運氣好','工作流程與健康習慣容易改善','合作與伴侶關係帶來機會','共同資源、投資或深層轉變有收穫','進修、出國、拓展視野','事業曝光與升遷機會','朋友圈擴大，團體帶來機會','適合休息、沉澱與內在修復'];
const SAT=['對自己的要求變高，是重新定義自己的時期','要認真面對金錢與自我價值','溝通與學習需要更踏實','家庭與居住的責任加重','感情與創作要經得起考驗','工作量與健康需要管理','伴侶與合作關係進入考驗與承諾','面對共同財務、親密關係的深層課題','信念與方向需要重新檢視','事業上扛起更大的責任，付出會被看見','朋友圈篩選，留下真正同路的人','收尾舊的循環，為下一輪做準備'];
const JUP_Y=['自信提升，適合嘗試新的事','容易收到獎勵、獎學金或資源','學習、閱讀、寫作變多，成績有進步的機會','家裡氣氛好，家人支持你','玩樂、創作、交朋友的運氣好','生活習慣容易改善，身體變好','和好朋友的關係帶來好機會','對事情有更深的體會','適合出國交流、營隊、擴大視野','在學校、比賽或表演中被看見','朋友圈擴大，社團帶來機會','適合休息與沉澱'];
const SAT_Y=['開始對自己有要求，學著獨立','學著管理自己的東西和零用錢','學習需要更踏實，基礎很重要','家裡的事比較多，要多體諒家人','興趣和友誼要經得起考驗','課業與作息需要好好管理','和好朋友的關係學著互相讓步','面對比較深的情緒課題','學習方向需要重新想一想','課業責任變重，努力會被看見','朋友圈篩選，留下真正合得來的人','收尾舊的階段，準備進入新環境'];
const JUP_S=['精神好、有興致嘗試新事物','財務寬裕，或得到家人的照顧','學習、閱讀、和人聊天的樂趣變多','家裡有好的變化，家人團聚','興趣、玩樂、和孫輩相處很愉快','健康習慣容易改善','和老伴或親近的人一起有好事','對人生有更深的體會','適合旅行、到遠一點的地方走走','你的經驗被看重，受人尊敬','朋友、社團帶來陪伴','適合靜養與修身'];
const SAT_S=['體力與精神需要好好照顧','用錢要保守，好好規劃','溝通要有耐心，多確認','居家安全與家人的事需要費心','興趣與娛樂量力而為','健康需要規律管理，定期檢查','和老伴的相處要互相體諒','面對比較深的人生課題','重新思考生活的方向','肩上仍有責任，量力而為','朋友圈縮小，留下最珍惜的人','適合收尾、整理與放下'];
const H=['','第一宮','第二宮','第三宮','第四宮','第五宮','第六宮','第七宮','第八宮','第九宮','第十宮','第十一宮','第十二宮'];
const GOOD=['命宮','財帛','官祿','遷移','福德'],HARD=['命宮','財帛','官祿','疾厄','遷移'];
const ZO=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];
const comboOf=p=>p.majorStars.map(s=>s.name).sort((a,b)=>ZO.indexOf(a)-ZO.indexOf(b)).join('·')||'空';
const firstSent=t=>{const k=String(t||'').indexOf('。');return k>0?t.slice(0,k+1):String(t||'');};
const sep=(a,b)=>{const d=Math.abs(((a-b)%360+360)%360);return d>180?360-d:d;};

/* 一整年每 6 天取樣：木星、土星停留最久的宮位與入宮月份；回歸／對分的精確月份 */
const SCAN=new WeakMap(),HC=new WeakMap();
/* 目前的「流年」以農曆年計：春節前仍算前一年 */
function curYear(Z){const y=new Date().getFullYear();try{const hn=Z.horoscope(new Date()),hm=horoY(Z,y);if(hn&&hm&&hn.yearly.earthlyBranch!==hm.yearly.earthlyBranch)return y-1;}catch(e){}return y;}
function horoY(Z,y){let m=HC.get(Z);if(!m){m={};HC.set(Z,m);}if(!(y in m)){try{m[y]=Z.horoscope(new Date(Date.UTC(y,6,1)));}catch(e){m[y]=null;}}return m[y];}
function yearScan(W,E,y){
  let m=SCAN.get(W);if(!m){m={};SCAN.set(W,m);}if(m[y])return m[y];
  const AS=root.Astronomy,norm=E.norm,signed=(a,b)=>((a-b)%360+540)%360-180;
  const T={satReturn:['Saturn',W.pos.Saturn.lon],satOpp:['Saturn',norm(W.pos.Saturn.lon+180)],jupReturn:['Jupiter',W.pos.Jupiter.lon],uraOpp:['Uranus',norm(W.pos.Uranus.lon+180)]};
  const res={house:{},ingress:{},hits:{}};const prev={};const cnt={Jupiter:{},Saturn:{}};let last={};
  const t0=Date.UTC(y,0,1),t1=Date.UTC(y+1,0,1);
  for(let t=t0-6*86400000;t<t1;t+=6*86400000){const pre=t<t0;const at=AS.MakeTime(new Date(t)),mon=new Date(t).getUTCMonth()+1;
    const lon={Jupiter:E.lonOf('Jupiter',at),Saturn:E.lonOf('Saturn',at),Uranus:E.lonOf('Uranus',at)};
    if(!pre)for(const k of ['Jupiter','Saturn']){const h=E.houseOf(lon[k],W.houses);cnt[k][h]=(cnt[k][h]||0)+1;if(last[k]&&last[k]!==h)(res.ingress[k]=res.ingress[k]||[]).push({h,mon});last[k]=h;}
    for(const [key,[pl,tg]] of Object.entries(T)){const d=signed(lon[pl],tg);if(prev[key]!==undefined&&Math.sign(d)!==Math.sign(prev[key])&&Math.abs(d)<5&&Math.abs(prev[key])<5){const tc=t-6*86400000*Math.abs(d)/(Math.abs(d)+Math.abs(prev[key])),mc=new Date(tc).getUTCMonth()+1;if(tc>=t0){const ms=res.hits[key]=res.hits[key]||[];if(!ms.includes(mc))ms.push(mc);}}prev[key]=d;}}
  for(const k of ['Jupiter','Saturn'])res.house[k]=+Object.entries(cnt[k]).sort((a,b)=>b[1]-a[1])[0][0];
  /* 年初恰好落在精確點附近（上一年最後一次取樣與今年第一次取樣跨越）也算 */
  m[y]=res;return res;
}

/* 逐年資料（語言無關，供文字層使用） */
function years(W,Z,HD,E,from,to){
  const birthY=(Z.rawDates&&Z.rawDates.lunarDate&&Z.rawDates.lunarDate.lunarYear)||(Z._std?Z._std.getUTCFullYear():new Date().getFullYear());
  const findStar=n=>Z.palaces.findIndex(p=>[...p.majorStars,...p.minorStars].some(s=>s.name===n));
  const out=[];let prevDec=null;
  for(let y=from-1;y<=to;y++){
    const H=horoY(Z,y);
    const dec=H&&H.decadal&&H.decadal.name!=='童限'?H.decadal.index:-1;
    if(y<from){prevDec=dec;continue;}
    const yr=H?H.yearly:null;
    const muts=yr?(yr.mutagen||[]).map((s,j)=>{const i=findStar(s);return{star:s,k:'祿權科忌'[j],pal:i>=0?Z.palaces[i].name:null,ypal:i>=0&&yr.palaceNames?yr.palaceNames[i]:null};}):[];
    let sc0=null;try{sc0=yearScan(W,E,y);}catch(e){}
    const jup=sc0?{house:sc0.house.Jupiter,ing:sc0.ingress.Jupiter||[]}:null,sat=sc0?{house:sc0.house.Saturn,ing:sc0.ingress.Saturn||[]}:null;
    const ms=[];
    if(dec>=0&&prevDec!==null&&dec!==prevDec)ms.push({k:'decade',pal:Z.palaces[dec].name,range:Z.palaces[dec].decadal.range,combo:comboOf(Z.palaces[dec].majorStars.length?Z.palaces[dec]:Z.palaces[(dec+6)%12])});
    const ageY=y-birthY+1,MINAGE={satReturn:25,satOpp:10,jupReturn:10,uraOpp:30};
    if(sc0)for(const k of ['satReturn','satOpp','jupReturn','uraOpp'])if(sc0.hits[k]&&ageY>=MINAGE[k]){let first=true;try{const pv=yearScan(W,E,y-1);if(pv.hits[k])first=false;}catch(e){}ms.push({k,months:sc0.hits[k],first});}
    const age=y-birthY+1;/* 虛歲，與紫微大限一致 */
    if(age<1){prevDec=dec;continue;}
    if(HD&&HD.profile.includes(6)&&(age===31||age===51))ms.push({k:'hd6',age:age-1});
    /* 估算順逆（規則透明，見說明） */
    let sc=0;
    muts.forEach(m=>{if(!m.pal)return;if(m.k==='祿')sc+=GOOD.includes(m.pal)?2:1;if(m.k==='權'&&['命宮','官祿','財帛'].includes(m.pal))sc+=1;if(m.k==='忌')sc-=HARD.includes(m.pal)?2:1;});
    if(jup&&[1,2,5,9,10,11].includes(jup.house))sc+=1;
    if(sat&&[1,4,7,10].includes(sat.house))sc-=1;
    if(ms.some(m=>m.k==='satReturn'&&m.first))sc-=1;
    const yp=yr?Z.palaces[yr.index].name:null,overlap=yr&&dec>=0&&yr.index===dec;
    /* 化忌落在流年命宮或流年遷移（沖流年命）再扣 1 */
    {const ji=muts.find(m=>m.k==='忌'&&m.pal);if(ji&&yr){const yi=yr.index,ji_i=Z.palaces.findIndex(p=>p.name===ji.pal);if(ji_i===yi||ji_i===(yi+6)%12)sc-=1;}}
    /* 疊生年四化與大限四化：生年忌（或大限忌）坐流年命宮、流年忌與生年忌同星（雙忌）扣分；生年祿、大限祿進流年命宮加分 */
    const natal={};Z.palaces.forEach((p,i)=>[...p.majorStars,...p.minorStars].forEach(s=>{if(s.mutagen)natal[s.mutagen]={star:s.name,i};}));
    const notes=[];
    if(yr){const yi=yr.index,yji=muts.find(m=>m.k==='忌'),ylu=muts.find(m=>m.k==='祿');
      if(natal['忌']&&natal['忌'].i===yi){sc-=1;notes.push({k:'nji',star:natal['忌'].star});}
      if(natal['忌']&&yji&&yji.star===natal['忌'].star){sc-=1;notes.push({k:'dji',star:yji.star,pal:yji.pal});}
      if(natal['祿']&&natal['祿'].i===yi){sc+=1;notes.push({k:'nlu',star:natal['祿'].star});}
      if(natal['祿']&&ylu&&ylu.star===natal['祿'].star){sc+=0.5;notes.push({k:'dlu',star:ylu.star,pal:ylu.pal});}
      const dm=H&&H.decadal&&H.decadal.name!=='童限'?H.decadal.mutagen||[]:[];
      const di=n=>findStar(n);
      if(dm[3]&&di(dm[3])===yi){sc-=0.5;notes.push({k:'dcji',star:dm[3]});}
      if(dm[0]&&di(dm[0])===yi){sc+=0.5;notes.push({k:'dclu',star:dm[0]});}}
    if(overlap)sc*=1.5;
    const tone=sc>=1?'up':sc<=-1?'hard':'even';
    out.push({y,age,stem:yr?yr.heavenlyStem+yr.earthlyBranch:'',yp,overlap,muts,jup:jup&&jup.house,sat:sat&&sat.house,jupIng:jup?jup.ing:[],satIng:sat?sat.ing:[],ms,notes,score:sc,tone,dec:dec>=0?Z.palaces[dec].name:null});
    prevDec=dec;
  }
  return out;
}

/* 三張重點卡的資料（語言無關，各語版共用） */
function core3(W,Z,HD,E){
  const o={best:null};
  /* 1. 三盤共識最強的一項 */
  try{const R=Themes.core.build(W,Z,HD,E);let best=null;
    for(const th of ['career','wealth','love','people','health']){const x=R[th].ranked[0];if(x&&(!best||x.sys.size>best.x.sys.size||(x.sys.size===best.x.sys.size&&x.n>best.x.n)))best={th,x,r:R[th]};}
    if(best&&best.x.sys.size>=2)o.best=best;}catch(e){}
  /* 2. 命宮核心 */
  const mi=Z.palaces.findIndex(p=>p.name==='命宮'),mp=Z.palaces[mi],opp=Z.palaces[(mi+6)%12],src=mp.majorStars.length?mp:opp;
  o.ming={mi,mp,opp,src,combo:comboOf(src)};
  /* 3. 現在這一章 */
  const CY=curYear(Z),H=horoY(Z,CY),by=Z.rawDates.lunarDate.lunarYear,ag=CY-by+1;o.CY=CY;o.H=H;o.by=by;o.age=ag;
  if(H&&H.decadal&&H.decadal.name!=='童限'&&H.decadal.index>=0&&Z.palaces[H.decadal.index]){const dp=Z.palaces[H.decadal.index],dsrc=dp.majorStars.length?dp:Z.palaces[(H.decadal.index+6)%12];
    o.cur={kind:'dec',dp,dsrc,combo:comboOf(dsrc),yp:Z.palaces[H.yearly.index].name,adult:stageOf(ag)==='adult'&&stageOf(dp.decadal.range[0])==='adult'};}
  else{const last=Math.max(...Z.palaces.map(p=>p.decadal.range[1]));o.cur={kind:ag<1?'unborn':ag>last?'done':'child',last,first:mp.decadal.range[0]};}
  return o;
}
/* 最有把握的三件事 */
function top3(W,Z,HD,E){
  const items=[],C=core3(W,Z,HD,E);
  if(C.best){const best=C.best,T=Themes.zh.TAGS,TH=Themes.zh.THEME;try{const why=best.r.ev.filter(e=>e.tag===best.x.tag).map(e=>Themes.zh.why[e.k](...e.a));
      items.push({kicker:`${Themes.zh.sysList(best.x.sys)}都這樣說`,title:`${TH[best.th]}上，你是「${T[best.th][best.x.tag][0]}」的人`,body:T[best.th][best.x.tag][1],why:[...new Set(why)].slice(0,5)});}catch(e){}}
  const {mi,mp,src}=C.ming;
  const me=root.STORY_ZW_MING&&STORY_ZW_MING.ming[C.ming.combo];
  if(me){const fit=root.Readings&&Readings.zh.fit?Readings.zh.fit:(t=>t);
    items.push({kicker:'你的核心',title:`「${me.title}」`,body:fit(firstSent(me.story),mp,Z.palaces[(mi+6)%12].majorStars),
      why:[`命宮${mp.majorStars.length?'':'（無主星，借對宮）'} ${src.majorStars.map(s=>s.name+(s.brightness?'〔'+s.brightness+'〕':'')+(s.mutagen?'化'+s.mutagen:'')).join('、')}`,`太陽${I18N.zh.signs[Math.floor(E.norm(W.pos.Sun.lon)/30)][0]}、上升${I18N.zh.signs[Math.floor(E.norm(W.asc)/30)][0]}`,`人類圖 ${I18N.zh.hd.types[HD.type]}、${HD.profile.join('/')}`]});}
  const CY=C.CY,H=C.H,cu=C.cur;
  if(cu.kind==='dec'){const dp=cu.dp,dsrc=cu.dsrc;
    const de=root.STORY_ZW_MING&&STORY_ZW_MING.decade[cu.combo];const yp=cu.yp;
    const SG3=stageTxt(C.age),ad3=cu.adult;
    items.push({kicker:`現在這一章（虛歲 ${dp.decadal.range.join('–')}）`,title:de&&ad3?`「${de.title}」`:`重心在${SG3.D(dp.name)}`,
      body:(de&&ad3?firstSent(de.story):'')+`今年（${CY}）流年命宮走到${PN(yp)}。${firstSent(SG3.F(yp))}`,
      why:[`大限命宮在本命${PN(dp.name)}（${dp.heavenlyStem}${dp.earthlyBranch}）`,`大限主星 ${dsrc.majorStars.map(s=>s.name).join('、')||'—'}${dp.majorStars.length?'':'（空宮，借對宮）'}`,`流年 ${H.yearly.heavenlyStem}${H.yearly.earthlyBranch}，流年命宮在${PN(yp)}`]});}
  else{const by=C.by,ag=C.age,last=cu.last;
    if(cu.kind==='unborn')items.push({kicker:'現在這一章',title:'還沒出生',body:'這個生日在未來，所以還沒有大限和流年可以看；本命盤的內容仍可參考。',why:[`農曆出生年 ${by}`]});
    else if(cu.kind==='done')items.push({kicker:'現在這一章',title:'十二個大限都已走完',body:`虛歲 ${ag}，已經超過命盤上最後一個大限（${last} 歲），大限的說法就不再適用，可以只看本命與流年。`,why:[`最後一個大限到 ${last} 歲`]});
    else items.push({kicker:'現在這一章',title:'還在童限',body:'第一個大限還沒開始，這段時間的走向主要看命宮與家庭環境。',why:[`第一個大限從 ${cu.first} 歲開始`]});}
  return items;
}

const TONE={up:['順勢','up'],even:['平穩','even'],hard:['要用力','hard']};
function render(W,Z,HD,E){
  const now=curYear(Z);
  const t3=top3(W,Z,HD,E);
  const ys=years(W,Z,HD,E,now-3,now+5);
  const card=x=>`<div class="hl-card"><div class="hl-k">${x.kicker}</div><h3>${x.title}</h3><p>${x.body}</p><div class="hl-why"><span>依據</span>${x.why.map(w=>`<i>${w}</i>`).join('')}</div></div>`;
  const msTxt=(m,ag)=>{
    if(m.k==='decade'){const de=root.STORY_ZW_MING&&STORY_ZW_MING.decade[m.combo],SG=stageTxt(m.range[0]);if(SG.st!=='adult')return `<b>進入新的十年大限（虛歲 ${m.range.join('–')}，${PN(m.pal)}）</b>：這十年的重心在${SG.D(m.pal)}。${SG.F(m.pal).replace(/這一年/g,'這十年')}`;return `<b>進入新的十年大限（虛歲 ${m.range.join('–')}，${PN(m.pal)}）</b>${de?`：「${de.title}」。${firstSent(de.story)}`:'。'}`;}
    const mo=m.months?`（約 ${m.months.join('、')} 月${m.first?'':'，延續上一年'}）`:'';
    if(m.k==='satReturn')return `<b>土星回歸${mo}</b>：大約每 29 年一次的人生大考，會逼你面對真正想要的生活，捨棄不適合的東西。`;
    if(m.k==='satOpp')return `<b>土星對分本命土星${mo}</b>：人生中段的檢查點，過去的選擇會被拿出來重新評估。`;
    if(m.k==='jupReturn')return `<b>木星回歸${mo}</b>：大約每 12 年一次的新循環起點，適合開新局、擴大格局。`;
    if(m.k==='uraOpp')return `<b>天王星對分${mo}</b>：常說的「中年轉折」，想突破、想改變的念頭特別強，適合做一件一直想做的事。`;
    if(m.k==='hd6')return m.age===30?'<b>人類圖 6 爻：上屋頂</b>：大約 30 歲開始從親身試錯轉為觀察與沉澱的階段。':'<b>人類圖 6 爻：下屋頂</b>：大約 50 歲開始用一路走來的經驗成為別人的榜樣。';
    return '';};
  const row=x=>{
    const past=x.y<now,cur=x.y===now,tn=TONE[x.tone];
    const lu=x.muts.find(m=>m.k==='祿'&&m.pal),ji=x.muts.find(m=>m.k==='忌'&&m.pal);
    const dms=x.ms.find(m=>m.k==='decade'),dde=dms&&root.STORY_ZW_MING&&STORY_ZW_MING.decade[dms.combo];const SG=stageTxt(x.age),adultDe=SG.st==='adult';const head=dms?`進入新大限（${PN(dms.pal)}）${dde&&adultDe?`：「${dde.title}」`:''}`:x.yp?`重心在${SG.D(x.yp)}`:'';
    const li=[];
    x.ms.forEach(m=>li.push(msTxt(m,x.age)));
    const S_=stageTxt(x.age),F_=S_.F,L_=S_.L,J_=S_.J;
    if(x.yp)li.push(`<b>流年命宮走到${PN(x.yp)}${x.overlap?'（又與大限命宮重疊，好壞都放大）':''}</b>：${F_(x.yp)}`);
    const yl=m=>m.ypal&&m.ypal!==m.pal?`（也是今年的流年${PN(m.ypal)}，${S_.D(m.ypal)}方面同樣受影響）`:'';
    if(lu)li.push(`<b>${lu.star}化祿進${PN(lu.pal)}</b>${yl(lu)}：${L_(lu.pal)}`);
    if(ji)li.push(`<b>${ji.star}化忌進${PN(ji.pal)}</b>${yl(ji)}：${J_(ji.pal)}`);
    (x.notes||[]).forEach(n=>{if(n.k==='nji')li.push(`<b>生年化忌星${n.star}坐在今年的流年命宮</b>：舊的課題容易在今年被翻出來，${S_.D(x.yp)}方面多一分耐心。`);
      if(n.k==='dji')li.push(`<b>雙忌：${n.star}生年化忌、今年又化忌</b>：${PN(n.pal)}是今年最需要小心的地方，重大決定放慢。`);
      if(n.k==='nlu')li.push(`<b>生年化祿星${n.star}坐在今年的流年命宮</b>：天生的好運被帶動，做起事來比較順。`);
      if(n.k==='dlu')li.push(`<b>雙祿：${n.star}生年化祿、今年又化祿</b>：${PN(n.pal)}的好處加倍。`);
      if(n.k==='dcji')li.push(`<b>大限化忌星${n.star}坐在今年的流年命宮</b>：這十年的壓力今年特別有感。`);
      if(n.k==='dclu')li.push(`<b>大限化祿星${n.star}坐在今年的流年命宮</b>：這十年的機會今年特別容易接到。`);});
    const ing=(a,main)=>{if(!a||!a.length)return '';const b=a.filter((i,k)=>!(a[k+1]&&a[k+1].mon===i.mon));return `（${b.map(i=>i.h===main?`${i.mon} 月起`:`${i.mon} 月進入${H[i.h]}`).join('、')}）`;};
    if(x.jup)li.push(`<b>木星這一年主要走你的${H[x.jup]}</b>${ing(x.jupIng,x.jup)}：${S_.JUP(x.jup)}。`);
    if(x.sat)li.push(`<b>土星這一年主要在你的${H[x.sat]}</b>${ing(x.satIng,x.sat)}${[1,4,7,10].includes(x.sat)?'（今年比較吃力的地方）':''}：${S_.SAT(x.sat)}。`);
    return `<details class="tl-y${past?' past':''}${cur?' cur':''}"${cur?' open':''}><summary><span class="tl-yr">${x.y}</span><span class="tl-age">${x.stem}・虛歲 ${x.age}</span><span class="tone ${tn[1]}">${tn[0]}</span><span class="tl-h">${head}</span></summary>
      ${past?'<p class="tl-past">回頭對照：這一年你是不是經歷過這些？</p>':''}<ul>${li.map(s=>`<li>${s}</li>`).join('')}</ul></details>`;};
  return `<div class="hl-cards">${t3.map(card).join('')}</div>
   <div class="tl"><div class="tl-head"><h3>人生走向</h3><p class="muted">從 ${ys.length?ys[0].y:now-3} 到 ${now+5} 年。過去的年份可以拿來對照，看看準不準；「順勢／平穩／要用力」是依流年四化落宮與木星、土星行運估算的整體感受（已疊入生年四化與大限四化對流年命宮的影響），不代表好壞定論。</p></div>
   ${ys.length?ys.map(row).join(''):'<p class="muted">這段期間還沒出生，沒有流年可以看。</p>'}</div>`;
}
root.Highlights=root.Highlights||{};
root.Highlights.zh={render,years,top3,core3,comboOf,yearScan,horoY,curYear,DOM,FOCUS,LU,JI,GOOD,HARD,H,KID_FOCUS,KID_LU,KID_JI,stageOf,stageTxt};
})(typeof globalThis!=='undefined'?globalThis:this);
