/* Starlit 中文詳解產生器：西洋星盤、紫微斗數、人類圖 */
(function(root){
const esc=s=>String(s);
const h3=t=>`<h3>${t}</h3>`, h4=t=>`<h4>${t}</h4>`, p=t=>`<p>${t}</p>`;
const ul=items=>`<ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
const pt=(title,text)=>`<b>${title}</b>：${text}`;
const norm=x=>((x%360)+360)%360;
const SG=['牡羊','金牛','雙子','巨蟹','獅子','處女','天秤','天蠍','射手','摩羯','水瓶','雙魚'];
const signOf=l=>Math.floor(norm(l)/30);
const fmt=l=>{const x=norm(l)%30;return `${Math.floor(x)}°${String(Math.floor((x%1)*60)).padStart(2,'0')}′`;};

/* ===================================================================
   西洋星盤
   =================================================================== */
const ROLE={
 ASC:['外在形象','上升',[
  [['直率有朝氣','給人的第一印象很有活力、行動快，表情藏不住。'],['主動出擊','遇到事情常第一個站出來，看起來很有勇氣。'],['急性子','走路快、說話快，有時讓人覺得有點衝。']],
  [['穩重可靠','給人踏實、溫和、不慌不忙的感覺。'],['有品味','重視質感與舒適，穿著打扮常給人好感。'],['慢熟','初見面不太主動，熟了之後很有安全感。']],
  [['機靈健談','第一印象活潑、反應快，很會找話題。'],['年輕感','外表與神情常比實際年齡年輕。'],['多變','興趣多、話題跳得快，讓人覺得難以捉摸。']],
  [['溫和親切','給人好相處、會照顧人的感覺。'],['防衛心','初見面會先保護自己，熟了才放開。'],['情緒寫在臉上','心情好壞，身邊的人一看就知道。']],
  [['自帶光環','一出場就容易被注意，舉止大方有自信。'],['重視形象','在意外表與面子，希望給人好印象。'],['熱情','待人慷慨，喜歡讓氣氛熱起來。']],
  [['細心整潔','給人乾淨、有條理、靠得住的印象。'],['謙虛低調','不愛出風頭，習慣先觀察再行動。'],['挑剔','對細節敏感，容易被認為要求很高。']],
  [['優雅有禮','給人好相處、懂分寸、有美感的印象。'],['人緣好','很會照顧氣氛，讓人覺得舒服。'],['難下決定','看起來總在權衡，不輕易表態。']],
  [['神秘有距離','給人深沉、不容易看透的感覺。'],['眼神有力','觀察力強，常一眼看穿別人。'],['防備心重','不輕易透露自己，信任要慢慢建立。']],
  [['開朗隨性','第一印象爽朗、幽默、好相處。'],['愛自由','看起來不受拘束，總在計畫下一場旅程。'],['直言','說話直接，有時不小心太坦白。']],
  [['成熟穩重','給人認真、可靠、有責任感的印象。'],['嚴肅','初見面不苟言笑，熟了才會露出幽默。'],['有目標感','看起來總是知道自己要什麼。']],
  [['獨特有個性','給人與眾不同、想法新穎的印象。'],['友善但有距離','對誰都客氣，卻不容易真正靠近。'],['理性','說話講邏輯，不太被情緒左右。']],
  [['溫柔親切','你給人的第一印象通常很隨和、有同理心，眼神柔和。'],['天然迷糊','外表看起來有些夢幻、不拘小節，帶點藝術家的慵懶氣質。'],['容易吸附情緒','你很敏感，容易感受到周遭人群的喜怒哀樂。']]]],
 Sun:['核心自我','太陽',[
  [['開創者','你天生想當第一個，喜歡挑戰與從零開始。'],['行動派','想到就做，討厭拖延與空談。'],['好勝','遇到競爭會被激起鬥志。']],
  [['追求安穩','你重視實際的成果與穩定的生活。'],['耐力強','認定的事會一步一步做到底。'],['享受生活','懂得欣賞美食、美物與舒適。']],
  [['好奇心','你需要不斷吸收新資訊，對世界充滿興趣。'],['溝通者','擅長表達與連結人群。'],['多元發展','同時發展好幾個興趣，不喜歡被定型。']],
  [['重感情','家人與親近的人是你的核心。'],['保護者','你有強烈的照顧欲，會守護自己在乎的人。'],['念舊','重視回憶與歸屬感。']],
  [['自信發光','你需要被看見，也願意站上舞台。'],['慷慨熱情','對人大方，喜歡讓身邊的人開心。'],['有榮譽感','在意尊嚴，做事希望做得漂亮。']],
  [['精益求精','你追求把事情做對、做好。'],['服務精神','透過幫助別人得到成就感。'],['分析力','擅長整理細節、找出問題。']],
  [['追求平衡','你重視公平、和諧與美感。'],['關係導向','在一對一的關係中最能看見自己。'],['外交手腕','擅長協調不同的立場。']],
  [['深度','你不滿足於表面，總想看透本質。'],['意志堅定','一旦投入就全力以赴。'],['蛻變力','經歷低潮後往往能浴火重生。']],
  [['追求意義','你想知道人生的方向與道理。'],['樂觀','相信明天會更好，天生有信念。'],['愛探索','旅行、學習、哲學都吸引你。']],
  [['有野心','你目標明確，願意長期耕耘。'],['責任感','常常扛起比別人更多的責任。'],['大器晚成','越成熟越有成就。']],
  [['獨立理性','你內心深處非常清醒，喜歡思考、追求獨立與自由。'],['跳脫框架','你看事情有自己的邏輯，不喜歡跟隨大眾流行，有獨特的創新想法。'],['人道關懷','雖然有時顯得冷靜或抽離，但你其實很關心群體與社會議題。']],
  [['同理心','你能感受別人的痛苦，天生慈悲。'],['想像力','藝術、音樂、靈性都能觸動你。'],['界線模糊','容易為了別人犧牲自己，需要學會保護自己。']]]],
 Moon:['內心與情緒','月亮',[
  [['直來直往','你的情緒反應很快、很直接，心裡藏不住話。'],['缺乏耐心','內在其實有一點急躁，渴望事情趕快有結果，討厭拖泥帶水。'],['熱情如火','情緒爆發時充滿衝勁與鬥志，但來得快去得也快。']],
  [['情緒穩定','你不容易大起大落，需要穩定的生活節奏。'],['物質安全感','存款、好吃的、舒服的家能讓你安心。'],['固執','心情不好時容易悶著不動。']],
  [['用說話消化情緒','聊一聊、寫下來，心情就好了。'],['心情多變','情緒轉換快，需要新鮮感。'],['理性化','有時會用分析來逃避真正的感受。']],
  [['情感豐沛','你的情緒細膩，很需要被照顧與歸屬感。'],['家是避風港','回到家、和家人在一起最安心。'],['容易受傷','一句話就可能讓你記很久。']],
  [['需要被肯定','被欣賞、被重視時最開心。'],['熱情大方','對在乎的人很慷慨。'],['自尊心強','受傷時表面逞強，內心其實很在意。']],
  [['容易操心','心裡常常在檢查哪裡做得不夠好。'],['用做事來安心','把事情整理好，情緒才會穩定。'],['對自己嚴格','需要學著對自己溫柔。']],
  [['害怕衝突','為了和諧常壓下自己的不滿。'],['需要陪伴','有人分享時情緒最穩定。'],['重視美感','美好的環境能讓你放鬆。']],
  [['感受深刻','情緒強烈，愛恨分明。'],['不輕易表露','心事藏很深，信任才會打開。'],['掌控欲','缺乏安全感時想掌握一切。']],
  [['需要自由空間','被綁住會讓你喘不過氣。'],['樂觀療癒','靠旅行、學習或大笑轉換心情。'],['逃避沉重','不喜歡面對太黏膩的情緒。']],
  [['壓抑克制','習慣把情緒收起來，先處理正事。'],['安全感來自成就','事情在掌控中才安心。'],['外冷內熱','其實很在乎，只是不善表達。']],
  [['保持距離','需要個人空間，情緒上偏理性。'],['重視友誼','朋友比黏膩的關係更讓你自在。'],['突然抽離','情緒太多時會選擇冷處理。']],
  [['柔軟易感','容易被氣氛和別人的情緒影響。'],['需要獨處充電','人太多會累，需要安靜的時間。'],['想像力豐富','常在心裡建構美好的畫面。']]]],
 Venus:['愛情與價值觀','金星',[
  [['主動追求','喜歡就直接表白，討厭曖昧太久。'],['熱戀型','感情來得快、很熱烈。'],['需要新鮮感','平淡太久會想找刺激。']],
  [['忠誠穩定','一旦認定就很專一。'],['重視感官','牽手、擁抱、一起吃好吃的，是你的愛的語言。'],['務實','看重對方能否給你安穩的生活。']],
  [['心靈溝通','聊得來比外表更重要。'],['輕鬆有趣','喜歡有趣、不沉重的相處。'],['容易分心','可能同時對好幾個人感興趣。']],
  [['照顧型戀人','你用照顧與陪伴表達愛。'],['渴望家庭','感情的終點是建立溫暖的家。'],['需要安全感','對方穩定的回應很重要。']],
  [['浪漫大方','喜歡轟轟烈烈、有儀式感的愛。'],['需要被崇拜','希望對方把你當成唯一。'],['忠誠','愛得驕傲，也愛得專一。']],
  [['用行動愛人','默默幫對方把生活打點好。'],['慢熱謹慎','要觀察很久才放心投入。'],['挑剔','對伴侶標準高，容易看到缺點。']],
  [['浪漫優雅','重視約會的氛圍與美感。'],['需要伴侶','一個人時容易覺得不完整。'],['迴避衝突','為了和諧，容易委屈自己。']],
  [['全心投入','愛就要深入靈魂。'],['佔有欲強','需要對方全然的忠誠。'],['愛恨分明','受傷後很難再信任。']],
  [['愛自由','需要在感情裡保有自己的空間。'],['一起冒險','最好的約會是一起旅行、一起學新東西。'],['坦率','喜歡直接誠實的伴侶。']],
  [['認真看待感情','把感情當成長期的承諾。'],['慢熟','不輕易表露，但很可靠。'],['重視條件','會考慮現實與未來規劃。']],
  [['朋友式戀愛','先當朋友再當戀人最自在。'],['需要空間','無法接受太黏的關係。'],['欣賞獨特的人','容易被與眾不同的人吸引。']],
  [['極度浪漫','在感情中，你充滿犧牲奉獻的精神，渴望靈魂共鳴。'],['容易心軟','面對喜歡的人，你很容易心軟、妥協，甚至容易陷入不切實際的戀愛幻想中。'],['無條件的愛','能包容對方的缺點，但要小心被利用。']]]],
 Mercury:['思考與溝通','水星',[
  [['反應快','想到就說，決策果斷。'],['說話直','不拐彎抹角，有時太衝。']],
  [['穩紮穩打','思考慢但扎實，想清楚才開口。'],['實用導向','只對有用的知識感興趣。']],
  [['思緒敏捷','學什麼都快，舉一反三。'],['健談','很會說話，資訊量大。']],
  [['用感覺思考','記憶力好，尤其是情感的記憶。'],['說話溫和','在意對方的感受。']],
  [['表達有魅力','說話有說服力與舞台感。'],['自信堅持','一旦認定的觀點不易改變。']],
  [['邏輯縝密','擅長分析、整理與找錯。'],['精確','說話用字講究。']],
  [['善於協調','能從雙方立場思考。'],['說話得體','懂得包裝意見。']],
  [['洞察力','一針見血，看穿事情的本質。'],['保留','不會輕易說出所有想法。']],
  [['宏觀思考','看大方向，不愛鑽細節。'],['坦率','說話直白、愛講道理。']],
  [['務實思考','計畫周詳、重視結果。'],['言簡意賅','說話有分量。']],
  [['獨立思考','想法前衛、有創意。'],['愛辯論','喜歡用邏輯挑戰既有觀念。']],
  [['直覺思考','靠感覺和畫面理解世界。'],['想像力','適合創作，但需要多注意細節。']]]],
 Mars:['行動與慾望','火星',[
  [['衝勁十足','行動力強，說做就做。'],['脾氣直','來得快去得也快。']],
  [['持久力','慢慢來但不放棄。'],['固執','生氣時很難消氣。']],
  [['多工並行','同時進行好幾件事。'],['以口代手','衝突時習慣用言語辯論。']],
  [['為保護而戰','為家人和在乎的人特別勇敢。'],['情緒化','生氣常轉成冷戰或悶氣。']],
  [['熱情投入','做事有氣勢、想做得漂亮。'],['需要舞台','被看見時最有動力。']],
  [['有效率','做事講方法、重細節。'],['焦慮','壓力大時容易挑剔自己和別人。']],
  [['先協調再行動','不喜歡正面衝突。'],['為公平而戰','看到不公平會出手。']],
  [['意志堅定','目標確定就全力以赴。'],['記仇','生氣時壓著不發，記得很久。']],
  [['為理想行動','有意義的事才有動力。'],['衝動冒險','容易說走就走。']],
  [['有策略','長期規劃、按部就班。'],['能吃苦','耐力與自律都很強。']],
  [['用自己的方式做事','討厭被規定。'],['為理念行動','為群體或信念而戰最有力。']],
  [['順勢而為','靠直覺與靈感行動。'],['迴避衝突','有時顯得被動，需要練習表態。']]]]
};
const OUTER=['熱情直率','沉穩踏實','機靈活潑','溫和親切','自信耀眼','細心低調','優雅圓融','神秘深沉','開朗隨性','成熟穩重','獨特疏離','溫柔夢幻'];
const INNER=['熱情急躁','渴望安穩','好奇善變','敏感念舊','渴望肯定','容易操心','害怕衝突','愛恨強烈','嚮往自由','壓抑克制','冷靜抽離','柔軟易感'];
const ELQ={fire:'熱情',earth:'務實',air:'理性',water:'感性'};const ELN={fire:'火',earth:'土',air:'風',water:'水'};
const EL=['fire','earth','air','water'];
const NODE_TXT=['學習獨立、相信自己的直覺與勇氣，不再只為別人而活。','學習建立自己的穩定與價值，放下對危機與他人資源的依賴。','學習好奇、傾聽與多元交流，放下自以為知道所有答案。','學習照顧內在與家庭，放下只追求成就與形象。','學習勇敢表達自己、站上舞台，放下躲在群體裡的安全感。','學習務實、服務與照顧細節，放下逃避現實的傾向。','學習合作與傾聽他人，放下凡事只靠自己。','學習深度連結與共享，放下對物質安穩的執著。','學習相信直覺與更大的意義，放下對資訊和細節的焦慮。','學習承擔責任、建立事業，放下對家的過度依賴。','學習為群體貢獻、擁抱獨特，放下對個人光環的需求。','學習信任、放手與靈性，放下過度控制與挑剔。'];
const HOUSE=['自我形象與第一印象','金錢、物質與自我價值','溝通、學習與兄弟姊妹','家庭、根源與內心的安全基地','戀愛、玩樂、創作與小孩','日常工作、作息與健康','伴侶、合作與一對一關係','共享資源、親密與深層轉變','遠行、信念與進修','事業、社會地位與公眾形象','朋友、社群與未來願望','潛意識、獨處與看不見的地方'];
const PN={Sun:'太陽',Moon:'月亮',Mercury:'水星',Venus:'金星',Mars:'火星',Jupiter:'木星',Saturn:'土星',Uranus:'天王星',Neptune:'海王星',Pluto:'冥王星',Node:'北交點',ASC:'上升點',MC:'天頂'};
const THEME={Sun:'自我',Moon:'情緒',Mercury:'思考',Venus:'感情',Mars:'行動力',Jupiter:'成長',Saturn:'責任',Uranus:'突破',Neptune:'夢想',Pluto:'蛻變',ASC:'外在形象',MC:'事業方向'};
const ASP=[['合相','兩股力量綁在一起，互相放大'],['六合','小幫手，主動一點就能互相成全'],['刑相','互相拉扯，會卡住，但也逼你成長'],['拱相','天生順暢，不太費力就能配合'],['沖相','兩邊擺盪，要學會找平衡']];
const DIG={Sun:{d:[4],e:[0],x:[10],f:[6]},Moon:{d:[3],e:[1],x:[9],f:[7]},Mercury:{d:[2,5],e:[5],x:[8,11],f:[11]},Venus:{d:[1,6],e:[11],x:[7,0],f:[5]},Mars:{d:[0,7],e:[9],x:[6,1],f:[3]},Jupiter:{d:[8,11],e:[3],x:[2,5],f:[9]},Saturn:{d:[9,10],e:[6],x:[3,4],f:[0]},Uranus:{d:[10],e:[],x:[4],f:[]},Neptune:{d:[11],e:[],x:[5],f:[]},Pluto:{d:[7],e:[],x:[1],f:[]}};
const DIG_TXT={d:['入廟','在自己的主場，能量純粹、發揮自然。'],e:['入旺','像貴賓被款待，優點被放大。'],x:['落陷','在不熟悉的環境，需要用比較費力或不尋常的方式表現。'],f:['入弱','能量受到壓抑，需要後天練習才能發揮。']};
const RULER=['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
const MODERN={7:'Pluto',10:'Uranus',11:'Neptune'};
const TRANSIT={Jupiter:'未來一年在這個領域容易遇到機會、貴人與成長。',Saturn:'這兩三年在這個領域要面對現實、建立規則，過程辛苦但會留下扎實成果。',Uranus:'這幾年這個領域會出現意想不到的改變，也帶來新的自由。',Neptune:'這個領域的界線變得模糊，靈感變多，也要防範混亂與不切實際。',Pluto:'這個領域正經歷深層而長期的蛻變，舊的模式會被徹底翻新。'};
const HIT_TONE={conj:'強烈啟動',good:'順勢幫助',bad:'帶來挑戰與調整'};

function dignity(k,s){const g=DIG[k];if(!g)return null;const out=[];for(const t of ['d','e','x','f'])if(g[t].includes(s))out.push(t);return out.length?out:null;}

function readWest(W,E){
  const P=W.pos;let o=[];
  const s=k=>signOf(k==='ASC'?W.asc:P[k].lon);
  const sun=s('Sun'),moon=s('Moon'),asc=s('ASC'),ven=s('Venus');
  const els=[...new Set([sun,moon,asc].map(i=>EL[i%4]))];
  const opp=(els.includes('fire')&&els.includes('water'))||(els.includes('earth')&&els.includes('air'));
  let mix;
  if(els.length===1)mix=`內外一致、${ELQ[els[0]]}特質非常鮮明的人`;
  else mix=`同時兼具${els.map(e=>ELQ[e]).join(els.length===2?'與':'、')}的${opp?'獨特矛盾體':'多面性格'}`;
  o.push(h3('星座解析'));
  o.push(p(`這個星盤組合（太陽${SG[sun]}、上升${SG[asc]}、月亮${SG[moon]}、金星${SG[ven]}）是一個外在${OUTER[asc]}、內心${INNER[moon]}，${mix}。`));
  let n=1;const basic=o;
  for(const k of ['ASC','Sun','Moon','Venus','Mercury','Mars']){
    const [title,pname,data]=ROLE[k];const i=s(k);
    if(k==='Mercury'){o=[];o.push(h3('更多星座面向'));}
    o.push(h4(`${n++}. ${title}：${pname}${SG[i]}`));
    o.push(ul(data[i].map(([a,b])=>pt(a,b))));
  }
  /* 宮位重點 */
  o.push(h3('行星落宮'));
  o.push(ul(['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'].map(k=>pt(`${PN[k]}在第 ${P[k].house} 宮`,`${THEME[k]}的力量主要用在「${HOUSE[P[k].house-1]}」。`))));
  /* 尊貴 */
  const dg=[];
  for(const k of E.PK){const d=dignity(k,s(k));if(d)dg.push(pt(`${PN[k]}${d.map(t=>DIG_TXT[t][0]).join('、')}（${SG[s(k)]}）`,d.map(t=>DIG_TXT[t][1]).join('')));}
  o.push(h3('行星的力量狀態（尊貴與無力）'));
  o.push(dg.length?ul(dg):p('沒有行星落在入廟、入旺、失勢或落陷的位置，各行星的力量都屬於中性狀態。'));
  /* 命主星與宮主星 */
  const ar=RULER[asc],mr=MODERN[asc];
  const ruleLine=k=>`${PN[k]}在${SG[s(k)]}第 ${P[k].house} 宮`;
  o.push(h3('命主星與宮主星'));
  o.push(p(`上升${SG[asc]}的命主星是<b>${PN[ar]}</b>（${ruleLine(ar)}）${mr?`，現代占星另以<b>${PN[mr]}</b>為共同守護（${ruleLine(mr)}）`:''}。命主星落在哪裡，人生的重心就常被拉到那裡：你的能量會自然流向「${HOUSE[P[ar].house-1]}」。`));
  const rows=W.houses.map((c,i)=>{const sg=signOf(c),r=RULER[sg];const own=P[r].house===i+1;return `<tr><td class="mono">${i+1}</td><td>${SG[sg]} ${fmt(c)}</td><td>${PN[r]}${MODERN[sg]?`／${PN[MODERN[sg]]}`:''}</td><td class="mono">${P[r].house}</td><td>${own?`宮主星回到本宮：「${HOUSE[i]}」的事由你自己主導，能量集中而直接。`:`「${HOUSE[i]}」的課題，會透過「${HOUSE[P[r].house-1]}」來實現。`}</td></tr>`;});
  if(W.equal)o.push(p('出生地緯度很高，Placidus 宮位制在這裡無法成立，因此改用等宮制（從上升點起每 30° 一宮）。'));
  o.push(`<div class="tablewrap"><table><thead><tr><th>宮</th><th>宮頭</th><th>宮主星</th><th>落宮</th><th>解讀</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`);
  /* 主要相位 */
  const personal=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
  const keyAsp=W.asp.filter(a=>a.orb<=4&&(personal.includes(a.a)||personal.includes(a.b))).slice(0,10);
  o.push(h3('主要相位'));
  o.push(keyAsp.length?ul(keyAsp.map(a=>pt(`${PN[a.a]}${ASP[a.t][0]}${PN[a.b]}（容許度 ${a.orb.toFixed(1)}°）`,`${THEME[a.a]}與${THEME[a.b]}：${ASP[a.t][1]}。`))):p('沒有容許度在 4° 以內的主要相位。'));
  /* 圖形 */
  const pats=patterns(W,E);
  o.push(h3('相位圖形與星群'));
  o.push(pats.length?ul(pats):p('沒有形成大三角、T三角、大十字、上帝之指或星群等特殊圖形，能量分布比較平均。'));
  /* 元素與模式 */
  const cnt={fire:0,earth:0,air:0,water:0},md=[0,0,0];
  for(const k of E.PK){const i=s(k);cnt[EL[i%4]]++;md[i%3]++;}
  const MISS={fire:'缺火：行動前容易猶豫，需要刻意為自己點火、設定截止日。',earth:'缺土：落實與理財需要多下工夫，把計畫寫下來會很有幫助。',air:'缺風：比較少抽離思考，多和人討論、多閱讀能幫你看清全局。',water:'缺水：情緒表達比較少，練習說出感受會讓關係更親近。'};
  const MD=[['開創','喜歡開始新事物，擅長起頭'],['固定','有毅力、能堅持，但不易改變'],['變動','適應力強、彈性大，但容易分散']];
  const mx=Math.max(...md),tops=[0,1,2].filter(i=>md[i]===mx);
  const el=[`十大行星的元素分布：${EL.map(e=>`${ELN[e]} ${cnt[e]}`).join('、')}；模式分布：${MD.map((m,i)=>`${m[0]} ${md[i]}`).join('、')}。`,tops.length===1?`${MD[tops[0]][0]}星座最多：${MD[tops[0]][1]}。`:`${tops.map(i=>MD[i][0]).join('與')}星座一樣多，兼具${tops.map(i=>MD[i][1].split('，')[0]).join('與')}的特質。`];
  EL.filter(e=>cnt[e]===0).forEach(e=>el.push(MISS[e]));
  EL.filter(e=>cnt[e]>=5).forEach(e=>el.push(`${ELN[e]}元素特別多（${cnt[e]} 顆）：${ELQ[e]}是你最鮮明的底色。`));
  const up=E.PK.filter(k=>P[k].house>=7).length,east=E.PK.filter(k=>[10,11,12,1,2,3].includes(P[k].house)).length;
  el.push(`半球分布：地平線上 ${up} 顆、地平線下 ${10-up} 顆，${up>=6?'人生能量偏向外在世界與社會舞台':up<=4?'人生能量偏向內在、家庭與私人生活':'內外大致平衡'}；東半球 ${east} 顆、西半球 ${10-east} 顆，${east>=6?'偏向自主開創，自己決定方向':east<=4?'偏向透過他人與合作來實現自己':'自主與合作大致平衡'}。`);
  o.push(h3('元素、模式與半球'));o.push(ul(el));
  /* 北交點 */
  const nd=signOf(P.Node.lon);
  o.push(h3('人生方向（北交點）'));
  o.push(p(`北交點在${SG[nd]}座第 ${P.Node.house} 宮：${NODE_TXT[nd]}這一生的成長方向在「${HOUSE[P.Node.house-1]}」。`));
  /* 行運 */
  const tr=E.transits(W,new Date());
  o.push(h3('目前的行運'));
  o.push(ul(tr.map(t=>{const hit=t.hits.map(x=>`${ASP[x.t][0]}本命${PN[x.n]}（容許度 ${x.orb.toFixed(1)}°，${HIT_TONE[x.tone]}）`).join('；');
    return pt(`${PN[t.k]}行經${SG[signOf(t.lon)]}座、本命第 ${t.house} 宮`,`${HOUSE[t.house-1]}方面：${TRANSIT[t.k]}${hit?`目前${hit}。`:''}`);})));
  return{basic:basic.join(''),adv:o.join('')};
}
function patterns(W,E){
  const P=W.pos,K=E.PK,out=[],L=k=>P[k].lon,sep=E.sep;
  const near=(a,b,ang,orb)=>Math.abs(sep(L(a),L(b))-ang)<=orb;
  const bySign={},byHouse={};
  for(const k of K){(bySign[signOf(L(k))]=bySign[signOf(L(k))]||[]).push(k);(byHouse[P[k].house]=byHouse[P[k].house]||[]).push(k);}
  for(const s in bySign)if(bySign[s].length>=3)out.push(pt(`${SG[s]}星群（${bySign[s].map(k=>PN[k]).join('、')}）`,`能量高度集中，${SG[s]}的特質會成為你非常鮮明的標記。`));
  for(const h in byHouse)if(byHouse[h].length>=3)out.push(pt(`第 ${h} 宮星群（${byHouse[h].map(k=>PN[k]).join('、')}）`,`人生大量的注意力放在「${HOUSE[h-1]}」。`));
  for(let i=0;i<K.length;i++)for(let j=i+1;j<K.length;j++)for(let k=j+1;k<K.length;k++){
    const a=K[i],b=K[j],c=K[k];
    if(near(a,b,120,7)&&near(b,c,120,7)&&near(a,c,120,7))out.push(pt(`大三角（${PN[a]}、${PN[b]}、${PN[c]}）`,'天賦流暢、做事順手，但也可能安於舒適圈，需要刻意挑戰自己。'));
  }
  for(let i=0;i<K.length;i++)for(let j=i+1;j<K.length;j++){
    const a=K[i],b=K[j];if(!near(a,b,180,8))continue;
    for(const c of K){if(c===a||c===b)continue;if(near(a,c,90,7)&&near(b,c,90,7))out.push(pt(`T三角（${PN[a]}沖${PN[b]}，${PN[c]}為頂點）`,`壓力集中在${PN[c]}代表的${THEME[c]}，這股張力是推動你前進的引擎。`));}
  }
  for(let i=0;i<K.length;i++)for(let j=i+1;j<K.length;j++){
    const a=K[i],b=K[j];if(!near(a,b,60,4))continue;
    for(const c of K){if(c===a||c===b)continue;if(near(a,c,150,2.5)&&near(b,c,150,2.5))out.push(pt(`上帝之指（${PN[a]}、${PN[b]}指向${PN[c]}）`,`一種特殊的使命感集中在${THEME[c]}，常需要不斷調整與適應。`));}
  }
  return [...new Set(out)];
}

/* ===================================================================
   紫微斗數
   =================================================================== */
const STEM_MUT={'甲':['廉貞','破軍','武曲','太陽'],'乙':['天機','天梁','紫微','太陰'],'丙':['天同','天機','文昌','廉貞'],'丁':['太陰','天同','天機','巨門'],'戊':['貪狼','太陰','右弼','天機'],'己':['武曲','貪狼','天梁','文曲'],'庚':['太陽','武曲','太陰','天同'],'辛':['巨門','太陽','文曲','文昌'],'壬':['天梁','紫微','左輔','武曲'],'癸':['破軍','巨門','太陰','貪狼']};
const MK=['祿','權','科','忌'];
const DOM={'命宮':'自我與整體運勢','兄弟':'兄弟朋友','夫妻':'感情與伴侶','子女':'子女、投資與合夥','財帛':'金錢','疾厄':'健康','遷移':'外出與外地發展','僕役':'人際與部屬','官祿':'事業','田宅':'家庭與房產','福德':'心靈與享受','父母':'長輩、上司與文書'};
const LU={'命宮':'人緣好、福氣厚，容易得到別人的好感與資源。','兄弟':'兄弟朋友對你有幫助，合夥容易得利。','夫妻':'伴侶是你的福星，感情生活甜美，也能因伴侶得利。','子女':'與子女緣分好，也利於投資、合夥與桃花。','財帛':'賺錢機會多、財源順，懂得享受金錢帶來的好處。','疾厄':'體質不錯、心寬體胖，也容易注重飲食享受。','遷移':'出外有貴人，在外地發展比在家鄉順利。','僕役':'朋友、同事、部屬帶來助力，人脈就是財脈。','官祿':'工作順手，有升遷與發展機會。','田宅':'家運好、有置產運，家庭帶來安定感。','福德':'懂得享受生活、心情開朗，精神上很富足。','父母':'與父母長輩緣分好，得到庇蔭，也利於文書考試。'};
const JI={'命宮':'對自己要求高，容易鑽牛角尖、操心勞碌。','兄弟':'和兄弟朋友之間容易有心結，合夥與借貸要小心。','夫妻':'感情路比較波折，容易因溝通誤會而爭吵，對伴侶很在意。','子女':'為子女操心，投資與合夥要謹慎。','財帛':'為錢操心，收支起伏大，不宜高風險投機。','疾厄':'要注意健康與過勞，身體容易累積壓力。','遷移':'出外較辛苦，在外容易遇到阻礙或是非。','僕役':'交友要謹慎，容易因朋友、同事或部屬受累。','官祿':'工作壓力大、對事業很執著，職涯常有波折。','田宅':'家庭與房產容易有煩惱，存錢需要紀律。','福德':'想很多、不容易放鬆，精神壓力大。','父母':'與父母長輩或上司溝通不易，文書合約要小心。'};
const JI_ADV={'命宮':'少鑽牛角尖，給自己留餘裕。','兄弟':'避免與親友有金錢往來或作保。','夫妻':'管住嘴巴，多傾聽、少翻舊帳。','子女':'投資保守，避免衝動合夥。','財帛':'收支保守，不做高風險投機。','疾厄':'規律作息、定期健檢，避免過勞。','遷移':'出門注意交通安全，在外保持低調。','僕役':'慎選合作對象，不幫人作保。','官祿':'工作按部就班，重大決定多請教。','田宅':'房產買賣與裝修三思，看清合約。','福德':'安排放鬆時間，避免情緒內耗。','父母':'看清文書合約，與上司溝通留紀錄。'};
const STAR_JI={'太陽':'留意男性長輩或上司關係、名聲受損，以及眼睛與心血管。','武曲':'留意資金周轉與投資失利，金錢決策要保守。','太陰':'留意女性關係、財務規劃、情緒低落與睡眠。','天同':'留意情緒起伏、懶散與享樂過度，福氣打折。','貪狼':'留意慾望過多、桃花糾紛與應酬過度。','巨門':'留意口舌是非、誤會與猜疑，少說多聽。','天機':'留意想太多、計畫反覆、決策搖擺。','廉貞':'留意官非、感情糾纏、心血管與意外血光。','文昌':'留意文書、合約、考試出錯，簽字前逐字確認，不幫人作保。','文曲':'留意口誤、文書錯漏與感情上的口頭承諾。'};
const STAR_LU={'廉貞':'人際與公關帶來機會，也利於感情。','破軍':'開創與變動中得財，敢改變就有收穫。','天機':'點子與企劃帶來收益，適合動腦的工作。','天同':'福氣與享受增加，人緣好、心情愉快。','太陰':'利於存錢、房產與女性貴人，財運細水長流。','貪狼':'社交、才藝、桃花帶來機會。','武曲':'正財旺，適合投資理財與實務工作。','太陽':'名聲與貴人運佳，付出被看見。','巨門':'口才變現，適合靠說話、專業吃飯。','天梁':'長輩庇蔭、逢凶化吉，利於公職、保險與醫療。'};
const SUN_POS={'寅':'日出東方，光芒漸強','卯':'旭日東昇（日照雷門），朝氣蓬勃','辰':'日近中天，光芒旺盛','巳':'日麗中天，熱力四射','午':'日正當中（金燦光輝），光芒最盛','未':'午後偏西，仍有餘溫','申':'日已西斜，光芒漸弱','酉':'夕陽西下，光芒正在減弱。你做人熱心，但有時付出很多卻得不到同等的感激，容易有孤獨感與無力感','戌':'日落西山，光芒收斂，熱心容易不被看見','亥':'太陽入夜，光芒內藏，付出多而回報少','子':'夜半之日，需要靠後天努力才能發光','丑':'天將破曉，光芒尚未顯現'};
const MOON_POS={'寅':'月沉天明，光芒微弱','卯':'日出月隱，光芒不顯','辰':'白晝之月，力量較弱','巳':'白晝之月，光芒被掩','午':'正午之月，力量最弱','未':'午後之月，光芒漸起','申':'月出東方，光芒漸亮','酉':'月升東方，清輝初現','戌':'月掛中天，光輝明朗','亥':'月朗天門，光輝最盛','子':'月明夜半，清輝滿盈','丑':'月近西沉，仍有餘輝'};
const ADJ={'天刑':'自律、重規矩，也主官非與刀傷。','天姚':'桃花星，有魅力、懂風情。','紅鸞':'喜慶桃花，主婚戀與好人緣。','天喜':'喜事桃花，主喜慶與添丁。','咸池':'桃花星，異性緣強，也容易有感情困擾。','華蓋':'孤高、有宗教藝術天分，喜歡獨處。','孤辰':'孤獨感，喜歡獨立作業。','寡宿':'孤寂感，感情上較易聚少離多。','天哭':'容易憂愁、多感傷。','天虛':'心中空虛，容易言過其實。','三台':'地位與排場，利升遷。','八座':'地位與尊榮，利名聲。','恩光':'受人恩惠、得到賞識。','天貴':'貴氣與貴人。','台輔':'輔佐、得到提拔。','封誥':'榮譽與獎賞。','天才':'聰明有才華。','天壽':'長壽、穩重。','龍池':'才藝與品味。','鳳閣':'文采與審美。','天官':'有官貴，利仕途。','天福':'福氣與享受。','天巫':'有宗教緣分，也主升遷與遺產。','天月':'留意小病痛，體質較弱。','陰煞':'容易遇到小人或暗中干擾。','天空':'理想高遠，物質容易落空。','截路':'做事中途受阻。','旬空':'事情容易落空、虛而不實。','空亡':'虛耗、事倍功半。','解神':'有化解災厄的能力。','年解':'化解當年的困難。','天德':'逢凶化吉的福德。','月德':'化解災厄、人緣佳。','天廚':'有口福，懂得吃。','蜚廉':'容易招惹口舌是非。','破碎':'事情容易破損、不完整。','天傷':'留意虛耗與損傷。','天使':'留意健康與意外。','龍德':'逢凶化吉。'};
const PEACH=['貪狼','廉貞','天姚','紅鸞','天喜','咸池'];

function readZW(Z,ctx){
  const M=ctx.major,MINOR=ctx.minor,BR=ctx.bright,PAL=ctx.palDesc;
  const pal=Z.palaces,o=[];
  const idx=n=>pal.findIndex(x=>x.name===n);
  const pn=n=>n==='命宮'?'命宮':n+'宮';
  const allStars=i=>[...pal[i].majorStars,...pal[i].minorStars,...pal[i].adjectiveStars];
  const has=(i,n)=>allStars(i).some(s=>s.name===n);
  const findStar=n=>pal.findIndex((x,i)=>allStars(i).some(s=>s.name===n));
  const sfz=i=>[i,(i+4)%12,(i+8)%12,(i+6)%12];
  const hasIn=(set,n)=>set.some(i=>has(i,n));
  const ming=idx('命宮'),body=pal.findIndex(x=>x.isBodyPalace);
  const stLine=i=>{const p=pal[i];const m=p.majorStars.map(s=>s.name+(s.brightness?`<small class="br">〔${s.brightness}〕</small>`:'')+(s.mutagen?'化'+s.mutagen:''));return m.length?m.join('、'):'無主星';};
  const minorLine=i=>pal[i].minorStars.map(s=>s.name+(s.brightness?`<small class="br">〔${s.brightness}〕</small>`:'')+(s.mutagen?'化'+s.mutagen:'')).join('、');
  const birthMut={};pal.forEach((p,i)=>[...p.majorStars,...p.minorStars].forEach(s=>{if(s.mutagen)birthMut[s.mutagen]={star:s.name,i};}));
  const sd=Z._std,rd=Z.rawDates.lunarDate;
  const yinyang=('甲丙戊庚壬'.includes(Z.rawDates.chineseDate.yearly[0])?'陽':'陰')+Z.gender;

  /* 一、基本 */
  o.push(h3('紫微斗數命盤分析'));
  o.push(p(`出生於 ${sd.getUTCFullYear()} 年 ${sd.getUTCMonth()+1} 月 ${sd.getUTCDate()} 日${Z.time}（農曆${Z.rawDates.chineseDate.yearly.join('')}年${rd.isLeap?'閏':''}${rd.lunarMonth}月${rd.lunarDay}日），${yinyang}，${Z.fiveElementsClass}，生肖屬${Z.zodiac}。命宮在${pal[ming].earthlyBranch}宮，身宮在${pal[body].earthlyBranch}宮（${pn(pal[body].name)}）；命主${Z.soul}，身主${Z.body}。`));

  /* 二、格局 */
  const pats=zwPatterns(Z,{ming,has,hasIn,sfz,findStar,birthMut,pal,pn});
  o.push(h3('命盤格局'));
  o.push(pats.length?ul(pats):p('命盤沒有形成典型的大格局，看盤重點放在命宮主星與四化的互動。'));

  /* 三、核心命格 */
  o.push(h3('核心命格與性格'));
  const mp=pal[ming],opp=pal[(ming+6)%12];
  const items=[];
  const src=mp.majorStars.length?mp.majorStars:opp.majorStars;
  if(!mp.majorStars.length)items.push(pt('命無正曜',`命宮沒有主星，借對宮遷移宮的${opp.majorStars.map(s=>s.name).join('、')}來看。你的個性彈性很大，容易受環境與身邊的人影響，適應力強，但要小心隨波逐流。`));
  for(const s of src){const m=M[s.name];if(!m)continue;
    let t=`${m[2]}優點是${m[3]}；要注意${m[4]}。`;
    if(s.brightness)t+=`亮度「${s.brightness}」：${BR[s.brightness]}。`;
    if(s.name==='太陽')t+=`太陽在${(mp.majorStars.length?mp:opp).earthlyBranch}宮，${SUN_POS[(mp.majorStars.length?mp:opp).earthlyBranch]}。`;
    if(s.name==='太陰')t+=`太陰在${(mp.majorStars.length?mp:opp).earthlyBranch}宮，${MOON_POS[(mp.majorStars.length?mp:opp).earthlyBranch]}。`;
    if(s.mutagen&&mp.majorStars.length)t+=`生年化${s.mutagen}在命：${({'祿':'一生福氣厚、人緣好。','權':'主觀強、有主導力。','科':'有好名聲，遇事有貴人化解。','忌':'對自己特別嚴苛，人生課題集中在自我。'})[s.mutagen]}`;
    else if(s.mutagen)t+=`這顆星在遷移宮生年化${s.mutagen}，借入命宮時也會帶到這股力量，但影響比坐命時間接。`;
    items.push(pt(`${s.name}（${m[1]}）`,t));}
  for(const s of mp.minorStars)if(MINOR[s.name])items.push(pt(s.name,MINOR[s.name].replace(/^(.{2,4}星)：/,'$1，')+(s.mutagen?`化${s.mutagen}在命，${s.mutagen==='忌'?'相關事務要特別留意。':'相關能力被放大。'}`:'')));
  for(const s of mp.adjectiveStars)if(ADJ[s.name])items.push(pt(s.name,ADJ[s.name]));
  o.push(p(`命宮在${mp.earthlyBranch}（${stLine(ming)}${minorLine(ming)?'，'+minorLine(ming):''}）：`));
  o.push(ul(items));
  const sf=sfz(ming);
  o.push(p(`三方四正會照：財帛宮${stLine(sf[2])}、官祿宮${stLine(sf[1])}、遷移宮${stLine(sf[3])}。命宮看先天個性，三方四正看你如何賺錢、做事與出外，四者合看才完整。`));

  /* 身宮 */
  const bp=pal[body];
  o.push(h4(`身宮在${bp.earthlyBranch}（${pn(bp.name)}：${stLine(body)}${minorLine(body)?'，'+minorLine(body):''}）`));
  const bl=[pt('人生重心',`身宮代表三十歲之後的行為傾向。你的身宮${bp.name==='命宮'?'與命宮同宮，先天個性就是後天重心，做自己最重要':`在${pn(bp.name)}，代表你人生中後期會非常看重「${DOM[bp.name]}」`}。`)];
  if(has(body,'天馬')&&(has(body,'祿存')||bp.majorStars.concat(bp.minorStars).some(s=>s.mutagen==='祿')))bl.push(pt('祿馬交馳在身宮','見上方格局說明；這股動中生財的力量正好落在你後半生的重心上。'));
  if(has(body,'陀羅'))bl.push(pt('暗藏糾結','宮內有陀羅，在這個領域容易想太多、猶豫不決，事情也容易被拖延。'));
  if(has(body,'擎羊'))bl.push(pt('衝勁與衝突','宮內有擎羊，行動力強，但也容易與人起衝突。'));
  for(const s of bp.majorStars.concat(bp.minorStars))if(s.mutagen)bl.push(pt(`${s.name}化${s.mutagen}`,(s.mutagen==='祿'?LU:s.mutagen==='忌'?JI:{})[bp.name]||`${s.name}化${s.mutagen}使這個領域更加突出。`));
  o.push(ul(bl));

  /* 四、生年四化 */
  o.push(h3('生年四化'));
  o.push(p(`生年天干「${Z.rawDates.chineseDate.yearly[0]}」：${MK.map(k=>birthMut[k]?`${birthMut[k].star}化${k}`:'').filter(Boolean).join('、')}。`));
  o.push(ul(MK.filter(k=>birthMut[k]).map(k=>{const b=birthMut[k],pnm=pal[b.i].name,oppn=pal[(b.i+6)%12].name;
    const base=k==='祿'?LU[pnm]:k==='忌'?JI[pnm]:k==='權'?`你在「${DOM[pnm]}」方面有主導權與能力，做事積極，但也容易用力過猛。`:`「${DOM[pnm]}」方面容易有好名聲，遇到困難常有貴人或好方法化解。`;
    const extra=k==='忌'?`化忌在${pn(pnm)}、沖${pn(oppn)}，${pn(oppn)}的事務也容易受影響。${STAR_JI[b.star]||''}`:k==='祿'?(STAR_LU[b.star]||''):'';
    return pt(`${b.star}化${k}在${pn(pnm)}`,base+extra);})));

  /* 五、宮干飛化 */
  o.push(h3('宮干飛化'));
  const flyRows=pal.map((p,i)=>{const mm=STEM_MUT[p.heavenlyStem];return `<tr><td class="p">${pn(p.name)}</td><td>${p.heavenlyStem}${p.earthlyBranch}</td>${mm.map((star,j)=>{const t=findStar(star);const self=t===i;const chong=t===(i+6)%12;return `<td class="${j===3&&(self||t===ming||chong)?'warn':''}">${star}→${t<0?'—':pn(pal[t].name)}${self?'（自化）':''}</td>`;}).join('')}</tr>`;});
  o.push(`<div class="tablewrap"><table><thead><tr><th>宮位</th><th>宮干</th><th>化祿</th><th>化權</th><th>化科</th><th>化忌</th></tr></thead><tbody>${flyRows.join('')}</tbody></table></div>`);
  const notes=[];
  pal.forEach((p,i)=>{const mm=STEM_MUT[p.heavenlyStem];mm.forEach((star,j)=>{const t=findStar(star);if(t===i)notes.push(pt(`${pn(p.name)}自化${MK[j]}`,[`這個宮位的好處來得快也去得快，留不住。`,`這個宮位的事情容易自作主張，強勢但不持久。`,`這個宮位的名聲與好處容易外露，也要小心虛有其表。`,`這個宮位的事務容易自己製造麻煩、有始無終。`][j]));});
    const jt=findStar(mm[3]);if(jt===ming&&i!==ming)notes.push(pt(`${pn(p.name)}化忌入命`,`「${DOM[p.name]}」是你一生最牽掛的事。`));
    if(jt===(ming+6)%12&&i!==ming)notes.push(pt(`${pn(p.name)}化忌沖命`,`「${DOM[p.name]}」容易對你造成直接的壓力。`));});
  if(notes.length)o.push(ul(notes));

  /* 六、十二宮速覽 */
  o.push(h3('十二宮速覽'));
  const order=[ming,...[1,2,3,4,5,6,7,8,9,10,11].map(k=>(ming-k+12)%12)];
  o.push(`<div class="tablewrap"><table><thead><tr><th>宮位</th><th>干支</th><th>主星</th><th>輔星</th><th>大限</th><th>管什麼</th></tr></thead><tbody>${order.map(i=>`<tr><td class="p">${pn(pal[i].name)}${pal[i].isBodyPalace?'（身）':''}</td><td>${pal[i].heavenlyStem}${pal[i].earthlyBranch}</td><td>${stLine(i)}</td><td>${minorLine(i)||'—'}</td><td class="mono">${pal[i].decadal.range.join('–')}</td><td>${PAL(pal[i].name)}</td></tr>`).join('')}</tbody></table></div>`);

  let decInfo=null,yearInfo=null,loveNow='';
  /* 七、大限 */
  const H0=ctx.horoscope(new Date());
  const H=H0&&H0.decadal.name!=='童限'&&pal[H0.decadal.index]?H0:null;
  if(!H)o.push(h3('現階段大限分析'),p(`目前還在童限（第一個大限從 ${pal[ming].decadal.range[0]} 歲開始），或已超過十二個大限，暫不做大限分析。`));
  if(H){
    const d=H.decadal,di=d.index,dp=pal[di];
    o.push(h3(`現階段大限分析（${dp.decadal.range.join('–')} 歲，${d.heavenlyStem}${d.earthlyBranch}大限）`));
    o.push(p(`您目前正走在 ${dp.decadal.range.join(' 至 ')} 歲的「${pn(dp.name)}」大限（宮位在${dp.earthlyBranch}），大限主星為 ${stLine(di)}${minorLine(di)?'，同宮有'+minorLine(di):''}。`));
    const dl=[];
    for(const s of (dp.majorStars.length?dp.majorStars:pal[(di+6)%12].majorStars)){const m=M[s.name];if(m)dl.push(pt(`${s.name}主導的十年`,`${m[2]}這些特質在這十年會被放大：${m[3]}；但也要留意${m[4]}。`));}
    if(has(di,'祿存'))dl.push(pt('祿存進駐','大限有祿存，這十年的收入相對穩定，財運有基本盤。'));
    if(has(di,'天馬'))dl.push(pt('天馬進駐','這十年變動多、奔波多，也代表外出與異地的機會。'));
    if(has(di,'擎羊')||has(di,'陀羅'))dl.push(pt('羊陀同宮','這十年行事容易遇到阻力或拖延，宜穩不宜急。'));
    dl.push(...mutLayer(d.mutagen,'大限',d.palaceNames,{pal,findStar,pn,birthMut,ming:di,ctxName:'這十年'}));
    {const jt=findStar(d.mutagen[3]);decInfo={range:dp.decadal.range.join('–'),pal:pn(dp.name),star:(dp.majorStars.length?dp.majorStars:pal[(di+6)%12].majorStars).map(x=>x.name).join('、')||'—',dom:DOM[dp.name],jiStar:d.mutagen[3],
      ji:jt>=0?`${d.mutagen[3]}化忌落在${pn(pal[jt].name)}（大限${pn(d.palaceNames[jt])}）：${JI_ADV[d.palaceNames[jt]]}`:''};}
    o.push(ul(dl));
  }

  /* 八、流年 */
  let yNow=new Date().getFullYear();
  {const hn=ctx.horoscope(new Date()),hm=ctx.horoscope(ctx.yearMid(yNow));if(hn&&hm&&hn.yearly.earthlyBranch!==hm.yearly.earthlyBranch)yNow--;}
  for(const [yr,full] of [[yNow,true],[yNow+1,false]]){
    const ref=ctx.yearMid(yr);const Hy=ctx.horoscope(ref);if(!Hy||!pal[Hy.yearly.index])continue;
    const y=Hy.yearly,yi=y.index,yp=pal[yi],dec=Hy.decadal;
    const range=ctx.yearRange(yr);
    o.push(h3(`${full?'近期運勢核心':'明年預覽'}：${yr} ${y.heavenlyStem}${y.earthlyBranch}年`));
    o.push(p(`${range?`（國曆 ${range}）`:''}流年命宮在「${yp.earthlyBranch}宮」（本命${pn(yp.name)}），流年主星為 ${stLine(yi)}。流年天干「${y.heavenlyStem}」引動：${y.mutagen.map((s,j)=>`${s}化${MK[j]}`).join('、')}。`));
    const yl=[];
    if(dec.name!=='童限'&&pal[dec.index]&&yi===dec.index)yl.push(pt('歲限重逢',`流年命宮與目前的大限命宮（${dp0(pal,dec.index,pn)}）重疊，今年發生的好壞事情，力量都會加倍放大。`));
    yl.push(...mutLayer(y.mutagen,'流年',y.palaceNames,{pal,findStar,pn,birthMut,ming:yi,ctxName:full?'今年':'明年',decMut:dec.name!=='童限'?dec.mutagen:null}));
    o.push(ul(yl));
    if(full)yearInfo={yr,gz:y.heavenlyStem+y.earthlyBranch,pal:pn(yp.name),star:stLine(yi),meet:dec.name!=='童限'&&pal[dec.index]&&yi===dec.index};
    if(full){
      o.push(h4('關鍵宮位'));
      const keys=['命宮','財帛','官祿','夫妻','疾厄'];
      o.push(ul(keys.map(k=>{const i=y.palaceNames.indexOf(k);const p=pal[i];const marks=layerMarks(i,{pal,dec,y,findStar});
        return pt(`流年${k==='命宮'?'命宮':k+'宮'}：在${p.earthlyBranch}宮（本命${pn(p.name)}）`,`${stLine(i)}。${marks?marks+'。':''}${p.majorStars.length?'':`空宮，借對宮${stLine((i+6)%12)}來看。`}`);})));
      const ys=Hy.yearly.stars||[];
      const fl=[];ys.forEach((arr,i)=>arr.forEach(s=>{if(['流祿','流羊','流陀','流昌','流曲','流魁','流鉞','流馬','流鸞','流喜'].includes(s.name))fl.push(`${s.name}在流年${y.palaceNames[i]==='命宮'?'命宮':y.palaceNames[i]+'宮'}`);}));
      if(fl.length)o.push(p(`流年星曜：${fl.join('、')}。`));
    }
  }

  /* 九、桃花篇 */
  o.push(h3('桃花篇'));
  const fi=idx('夫妻'),fp=pal[fi];
  const fl=[pt(`本命夫妻宮在${fp.earthlyBranch}（${stLine(fi)}${minorLine(fi)?'，'+minorLine(fi):''}）`,`${PAL('夫妻')}${fp.majorStars.map(s=>M[s.name]?`伴侶或你在感情中的樣子帶有${s.name}的特質：${M[s.name][2]}`:'').join('')}`)];
  for(const s of fp.majorStars.concat(fp.minorStars))if(s.mutagen)fl.push(pt(`${s.name}化${s.mutagen}在夫妻宮`,(s.mutagen==='祿'?LU:s.mutagen==='忌'?JI:{})['夫妻']||`感情中${s.name}的特質被放大。`));
  if(has(fi,'擎羊'))fl.push(pt('擎羊在夫妻宮','感情中容易有爭執與衝撞，溝通時語氣要放軟。'));
  if(has(fi,'陀羅'))fl.push(pt('陀羅在夫妻宮','感情進展較慢，容易拖拖拉拉、心裡糾結。'));
  if(has(fi,'地空')||has(fi,'地劫'))fl.push(pt('空劫在夫妻宮','對感情有理想化的期待，現實中容易落差。'));
  const peach=PEACH.map(n=>{const i=findStar(n);return i<0?null:`${n}在${pn(pal[i].name)}`;}).filter(Boolean);
  const bath=pal.findIndex(p=>p.changsheng12==='沐浴');
  if(bath>=0)peach.push(`沐浴在${pn(pal[bath].name)}`);
  fl.push(pt('桃花星分布',peach.join('、')+'。桃花星落在命、遷、夫妻、子女、福德等宮時，異性緣特別明顯。'));
  o.push(ul(fl));
  const cmp=[];
  for(const yr of [yNow,yNow+1]){const Hy=ctx.horoscope(ctx.yearMid(yr));if(!Hy)continue;const y=Hy.yearly;
    const fi2=y.palaceNames.indexOf('夫妻'),f2=pal[fi2];
    const luck=y.mutagen.map((s,j)=>({s,j,t:findStar(s)}));
    const hitF=luck.filter(x=>x.t===fi2||x.t===fi).map(x=>`${x.s}化${MK[x.j]}`);
    const ys=Hy.yearly.stars||[];let luan='',xi='';ys.forEach((arr,i)=>arr.forEach(s=>{if(s.name==='流鸞')luan=y.palaceNames[i];if(s.name==='流喜')xi=y.palaceNames[i];}));
    const ming2=pal[y.index];
    const flowerInMing=ming2.majorStars.some(s=>['貪狼','廉貞'].includes(s.name))||['流鸞','流喜'].some(n=>(ys[y.index]||[]).some(s=>s.name===n));
    let verdict;
    const ji=luck.find(x=>x.j===3),lu=luck.find(x=>x.j===0);
    const jiHit=ji&&(ji.t===fi2||ji.t===fi),luHit=lu&&(lu.t===fi2||lu.t===fi);
    if(jiHit&&luHit)verdict=`祿忌交集：${lu.s}化祿帶來好緣分${lu.t===fi2?'（落在流年夫妻宮）':''}，但${ji.s}化忌容易讓溝通起誤會${ji.t===fi?'（落在本命夫妻宮）':''}。把握對象，管住嘴巴。`;
    else if(jiHit)verdict='感情容易有誤會與波折，宜放慢腳步、多溝通，不急著定下來。';
    else if(luHit)verdict='好桃花之年，適合穩定關係或認識正緣。';
    else if(flowerInMing)verdict='異性緣旺、社交多，但要分辨真心與曖昧。';
    else verdict='感情運平穩，順其自然。';
    if(!loveNow)loveNow=`${yr} 年：${verdict}`;
    cmp.push(`<tr><td class="mono">${yr}</td><td>${y.heavenlyStem}${y.earthlyBranch}</td><td>${f2.earthlyBranch}宮（本命${pn(f2.name)}）：${stLine(fi2)}</td><td>${hitF.join('、')||'—'}</td><td>${[luan?`流鸞在流年${pn(luan)}`:'',xi?`流喜在流年${pn(xi)}`:''].filter(Boolean).join('、')||'—'}</td><td>${verdict}</td></tr>`);}
  o.push(`<div class="tablewrap"><table><thead><tr><th>年</th><th>干支</th><th>流年夫妻宮</th><th>四化影響夫妻</th><th>紅鸞天喜</th><th>重點</th></tr></thead><tbody>${cmp.join('')}</tbody></table></div>`);

  /* 十、避險建議 */
  const adv=[];
  if(H){
    const y=H.yearly,d=H.decadal;
    const yj=findStar(y.mutagen[3]),dj=findStar(d.mutagen[3]);
    if(yj>=0)adv.push(pt(`今年${y.mutagen[3]}化忌在本命${pn(pal[yj].name)}（流年${pn(y.palaceNames[yj])}）`,`${JI_ADV[y.palaceNames[yj]]}${STAR_JI[y.mutagen[3]]||''}`));
    if(dj>=0&&dj!==yj)adv.push(pt(`大限${d.mutagen[3]}化忌在本命${pn(pal[dj].name)}（大限${pn(d.palaceNames[dj])}）`,`${JI_ADV[d.palaceNames[dj]]}${STAR_JI[d.mutagen[3]]||''}`));
    if(birthMut['忌']&&(birthMut['忌'].i===yj||birthMut['忌'].i===dj))adv.push(pt('忌星疊加',`${pn(pal[birthMut['忌'].i].name)}同時受到生年忌與${birthMut['忌'].i===yj?'流年':'大限'}忌影響，是這段時間最需要小心的地方。`));
    const yl=findStar(y.mutagen[0]);if(yl>=0)adv.push(pt(`今年的機會在本命${pn(pal[yl].name)}（流年${pn(y.palaceNames[yl])}）`,STAR_LU[y.mutagen[0]]||'這個領域今年比較順。'));
  }
  if(adv.length){o.push(h3('避險建議'));o.push(ul(adv));}
  /* 基本版 */
  const b=[];
  b.push(h3('你的紫微命盤重點'));
  const msrc=mp.majorStars.length?mp.majorStars:opp.majorStars;
  const bItems=[pt(`命宮（${msrc.map(x=>x.name).join('、')||'—'}${mp.majorStars.length?'':'，借對宮'}）`,msrc.map(x=>M[x.name]?M[x.name][2]:'').join('')),
    pt(`身宮在${pn(bp.name)}`,bp.name==='命宮'?'先天個性就是後天重心，做自己最重要。':`人生中後期會越來越看重「${DOM[bp.name]}」。`)];
  const pn2=pats.map(x=>(x.match(/<b>(.*?)<\/b>/)||[])[1]).filter(Boolean);
  if(pn2.length)bItems.push(pt('命盤格局',pn2.join('、')+'（細節見進階）。'));
  if(birthMut["忌"])bItems.push(pt(`一生功課（${birthMut['忌'].star}化忌在${pn(pal[birthMut['忌'].i].name)}）`,JI[pal[birthMut['忌'].i].name]));
  b.push(ul(bItems));
  if(decInfo){b.push(h4(`現在這十年（${decInfo.range} 歲）：${decInfo.pal}大限`));const dup=decInfo.jiStar&&adv.some(x=>x.includes(decInfo.jiStar+'化忌'));b.push(p(`主星${decInfo.star}，這十年的重心在「${decInfo.dom}」。${decInfo.ji&&!dup?decInfo.ji:''}${dup?`大限與流年的化忌都是${decInfo.jiStar}，今年要特別留意下面的提醒。`:''}`));}
  if(yearInfo){b.push(h4(`${yearInfo.yr} ${yearInfo.gz}年`));b.push(p(`流年命宮在本命${yearInfo.pal}（${yearInfo.star}）。${yearInfo.meet?'今年歲限重逢，好壞都會加倍放大。':''}`));if(adv.length)b.push(ul(adv));}
  if(loveNow){b.push(h4('感情'));b.push(p(loveNow));}
  return{basic:b.join(''),adv:o.join('')};
}
function dp0(pal,i,pn){return `${pal[i].earthlyBranch}宮`;}
function layerMarks(i,{pal,dec,y,findStar}){
  const out=[];const all=[...pal[i].majorStars,...pal[i].minorStars];
  all.forEach(s=>{if(s.mutagen)out.push(`${s.name}生年化${s.mutagen}`);});
  dec.mutagen.forEach((s,j)=>{if(findStar(s)===i)out.push(`${s}大限化${MK[j]}`);});
  y.mutagen.forEach((s,j)=>{if(findStar(s)===i)out.push(`${s}流年化${MK[j]}`);});
  return out.join('、');
}
function mutLayer(muts,layer,names,{pal,findStar,pn,birthMut,ming,ctxName,decMut}){
  const out=[];
  muts.forEach((star,j)=>{const t=findStar(star);if(t<0)return;const rel=names[t];const k=MK[j];
    let txt;
    if(k==='祿')txt=`${ctxName}${DOM[rel]}方面比較順：${LU[rel]}${STAR_LU[star]||''}`;
    else if(k==='忌')txt=`${ctxName}${DOM[rel]}方面最容易卡關：${JI[rel]}${STAR_JI[star]||''}`;
    else if(k==='權')txt=`${ctxName}在${DOM[rel]}方面企圖心變強、想掌握主導權。`;
    else txt=`${ctxName}${DOM[rel]}方面容易得到好名聲與貴人。`;
    const flags=[];
    if(k==='忌'&&birthMut['忌']&&birthMut['忌'].i===t)flags.push('與生年忌同宮（忌疊忌），壓力加倍');
    if(k==='忌'&&decMut&&findStar(decMut[3])===t)flags.push('與大限忌同宮（雙忌），務必謹慎');
    if(k==='忌'&&t===(ming+6)%12)flags.push(`沖${layer}命宮，影響直接`);
    if(k==='忌'&&t===ming)flags.push(`入${layer}命宮，心理壓力大`);
    if(k==='祿'&&birthMut['祿']&&birthMut['祿'].i===t)flags.push('與生年祿同宮（祿疊祿），好上加好');
    if(birthMut['祿']&&birthMut['祿'].star===star&&k==='忌')flags.push('生年祿星化忌，先得後失，見好就收');
    out.push(pt(`${star}化${k}落本命${pn(pal[t].name)}（${layer}${rel==='命宮'?'命宮':rel+'宮'}）`,txt+(flags.length?`【${flags.join('；')}】`:'')));
  });
  return out;
}
function zwPatterns(Z,{ming,has,hasIn,sfz,findStar,birthMut,pal,pn}){
  const out=[],S=sfz(ming),mp=pal[ming],br=mp.earthlyBranch;
  const majorIn=(i,n)=>pal[i].majorStars.some(s=>s.name===n);
  const luIn=set=>set.some(i=>has(i,'祿存')||[...pal[i].majorStars,...pal[i].minorStars].some(s=>s.mutagen==='祿'));
  const add=(n,t)=>out.push(pt(n,t));
  if(majorIn(ming,'紫微')&&majorIn(ming,'天府'))add('紫府同宮','帝星與財庫同坐命宮，氣度恢宏、能守能攻，一生較有福祿。');
  else if(hasIn(S,'紫微')&&hasIn(S,'天府'))add('紫府朝垣','紫微、天府在三方四正會照，有領導格局與守成能力。');
  if(hasIn(S,'天府')&&hasIn(S,'天相')&&!majorIn(ming,'紫微'))add('府相朝垣','天府、天相會照命宮，做事穩健、重信用，適合管理與輔佐角色。');
  if(['七殺','破軍','貪狼'].some(n=>majorIn(ming,n)))add('殺破狼格','命宮三方四正由七殺、破軍、貪狼構成，人生變動大、開創力強，適合在變局中求發展，起伏也較大。');
  if(['天機','太陰','天同','天梁'].every(n=>hasIn(S,n)))add('機月同梁格','天機、太陰、天同、天梁會於三方四正，心思細膩、適合在穩定的組織或公職中發揮。');
  if(hasIn(S,'太陽')&&hasIn(S,'天梁')){
    if(hasIn(S,'文昌')&&luIn(S))add('陽梁昌祿','太陽、天梁、文昌與祿星會於命宮三方四正，聰明有才華，利於考試、公職、學術或大機構，容易在專業領域獲得聲名。');
    else{const wc=findStar('文昌'),lc=findStar('祿存');const miss=[];if(!hasIn(S,'文昌'))miss.push(`文昌（在${wc>=0?pn(pal[wc].name):'—'}）`);if(!luIn(S))miss.push(`祿星（祿存在${lc>=0?pn(pal[lc].name):'—'}，生年化祿也不在三方四正）`);add('陽梁昌祿（未完整）',`命宮三方四正有太陽、天梁${luIn(S)&&!miss.some(m=>m.startsWith('祿'))?'與祿星':''}，但${miss.join('、')}不在三方四正，嚴格來說未完整成格。仍帶有重名聲、利專業與公職的傾向。`);}
  }
  if(['祿','權','科'].every(k=>birthMut[k]&&S.includes(birthMut[k].i)))add('三奇嘉會','生年祿、權、科都在命宮三方四正，一生機會多、名利雙收的條件好。');
  const hasLuCun=S.find(i=>has(i,'祿存')),hasHuaLu=birthMut['祿']&&S.includes(birthMut['祿'].i);
  if(hasLuCun!==undefined&&hasHuaLu)add('雙祿交流','祿存與化祿同會命宮，財源有兩條路，理財得當可累積財富。');
  pal.forEach((p,i)=>{if(has(i,'天馬')&&(has(i,'祿存')||[...p.majorStars,...p.minorStars].some(s=>s.mutagen==='祿')))add(`祿馬交馳（在${pn(p.name)}）`,'祿星與天馬同宮，是典型的動中生財格。不適合死守固定崗位，透過奔波、出差、異地或遠距業務，愈動愈有財。');});
  const L=(ming+11)%12,R=(ming+1)%12,both=(a,b)=>(has(L,a)&&has(R,b))||(has(L,b)&&has(R,a));
  if(both('左輔','右弼'))add('左右夾命','左輔右弼夾命宮，一生多得助力。');
  if(both('文昌','文曲'))add('昌曲夾命','文昌文曲夾命宮，聰明有文采。');
  if(both('天魁','天鉞'))add('魁鉞夾命','天魁天鉞夾命宮，貴人運強。');
  if(both('擎羊','陀羅'))add('羊陀夾命','擎羊陀羅夾命宮，做事容易受到兩面夾擊，需要穩紮穩打。');
  if(both('火星','鈴星'))add('火鈴夾命','火星鈴星夾命宮，性急，容易突發狀況。');
  if(both('地空','地劫'))add('空劫夾命','地空地劫夾命宮，想法特立獨行，錢財不易聚。');
  const opp=(ming+6)%12;
  if((has(ming,'天魁')&&has(opp,'天鉞'))||(has(ming,'天鉞')&&has(opp,'天魁')))add('坐貴向貴','天魁天鉞分坐命宮與遷移宮，一生常有貴人提攜。');
  pal.forEach((p,i)=>{if(majorIn(i,'貪狼')&&has(i,'火星'))add(`火貪格（在${pn(p.name)}）`,'貪狼遇火星，主突發的機運與橫財，來得快也去得快。');if(majorIn(i,'貪狼')&&has(i,'鈴星'))add(`鈴貪格（在${pn(p.name)}）`,'貪狼遇鈴星，主意外的機會與偏財。');});
  const sun=pal.find(p=>p.majorStars.some(s=>s.name==='太陽')),moon=pal.find(p=>p.majorStars.some(s=>s.name==='太陰'));
  if(sun&&moon){const sbr=sun.earthlyBranch,mbr=moon.earthlyBranch;
    if('卯辰巳午'.includes(sbr)&&'酉戌亥子'.includes(mbr))add('日月並明',`太陽在${sbr}（白晝）、太陰在${mbr}（夜晚），日月各得其位，內外兼顧，貴人與財運俱佳。`);
    else if('酉戌亥子丑'.includes(sbr)&&'卯辰巳午未'.includes(mbr))add('日月反背',`太陽在${sbr}（${pn(sun.name)}，日落之後）、太陰在${mbr}（${pn(moon.name)}，白晝之月），日月都失去光輝，付出容易不被看見，宜早起努力、靠專業累積。`);}
  if(majorIn(ming,'巨門')&&['子','午'].includes(br)&&mp.majorStars.some(s=>s.name==='巨門'&&s.mutagen&&s.mutagen!=='忌'))add('石中隱玉','巨門在子午坐命並化吉，才華內斂，越磨越亮。');
  if(majorIn(ming,'七殺')&&['寅','申'].includes(br))add('七殺朝斗','七殺坐寅申，對宮紫府，有魄力、能成大事。');
  if(majorIn(ming,'七殺')&&['子','午'].includes(br))add('七殺仰斗','七殺坐子午，對宮紫府，獨立有決斷，能在逆境中開創局面。');
  if(majorIn(ming,'破軍')&&['子','午'].includes(br))add('英星入廟','破軍坐子午，開創力強，適合在變局中建功。');
  if(majorIn(ming,'太陰')&&br==='亥')add('月朗天門','太陰在亥坐命，清秀聰明，財運細水長流。');
  if(majorIn(ming,'太陽')&&br==='卯')add('日照雷門','太陽在卯坐命，朝氣蓬勃，名聲遠播。');
  if(majorIn(ming,'太陽')&&br==='午')add('金燦光輝','太陽在午坐命，光芒最盛，有領袖氣質。');
  if(!mp.majorStars.length&&br==='未'&&majorIn(pal.findIndex(p=>p.earthlyBranch==='卯'),'太陽')&&majorIn(pal.findIndex(p=>p.earthlyBranch==='亥'),'太陰'))add('明珠出海','命宮在未無主星，日卯月亥會照，大器晚成、名利俱佳。');
  if(majorIn(ming,'紫微')&&hasIn(S,'左輔')&&hasIn(S,'右弼'))add('君臣慶會','紫微坐命得左輔右弼會照，領導力強、一呼百應。');
  if(birthMut['忌']&&birthMut['忌'].i===ming)add('化忌坐命',`${birthMut['忌'].star}化忌在命宮，對自己要求高，人生功課集中在自我的修煉。`);
  const sha=['擎羊','陀羅','火星','鈴星','地空','地劫'].filter(n=>has(ming,n));
  if(sha.length)add('煞星入命',`命宮有${sha.join('、')}，個性較有稜角，人生多歷練，要學會化壓力為動力。`);
  return out;
}

/* ===================================================================
   人類圖
   =================================================================== */
function readHD(H,Z){
  const o=[],T=Z.types[H.type],A=Z.authorities[H.authority],D=Z.definitions[H.definition];
  const [l1,l2]=H.profile,pk=`${l1}/${l2}`;
  o.push(h3('人類圖解析'));
  o.push(p(`你是擁有${A.n}的 ${pk} ${T.n}（${D[0]}）。這代表你的人生是一場${H.type==='projector'?'看懂他人、等待被看見與邀請':H.type==='manifestor'?'主動開創、帶來影響':H.type==='reflector'?'映照環境、慢慢清晰':'充滿實驗、體悟與行動力'}的旅程。`));
  o.push(h4(`${T.n}（${T.en}）`));
  o.push(ul([T.txt,pt('策略',T.strategy),pt('簽名（活對時的感覺）',T.sig),pt('非自己主題（偏離時的警訊）',T.ns)]));
  o.push(h4(A.n));o.push(p(A.txt));
  o.push(h4(`${pk} 人生角色`));
  o.push(p(Z.profiles[pk]||''));
  o.push(h4(D[0]));o.push(p(D[1]));
  const tips=[...T.tips,`${A.n}：${({emotional:'衝動前先踩煞車，重要決定至少睡一晚。',sacral:'相信身體當下的反應，不用替它找理由。',splenic:'第一時間的直覺最準，別等想清楚。','ego-m':'說出「我想要」之前，先確認自己真的想要，再告知會受影響的人。','ego-p':'被邀請之後，問自己「這對我有什麼好處」，值得才投入。',self:'找信任的人聊，聽自己說了什麼，方向就在話裡。',mental:'找幾位信任的人當共鳴板，在對的環境中把想法說出來。',lunar:'重大決定等一個月亮週期（約 28 天），期間多和不同的人聊。'})[H.authority]}`];
  o.push(h4('生活指引'));o.push(ul(tips));
  const basic=o.join('');o.length=0;
  o.push(h3('人生角色的兩條爻'));
  for(const [ln,label] of [[l1,'意識'],[l2,'潛意識']]){const L=Z.lines[ln];
    o.push(p(`<b>${ln} 爻（${label}）：${L.n}</b>，${L.k}。${L.d}`));
    o.push(ul([pt('生活例子',L.e)]));}
  const cr=crossName(H,Z);
  o.push(h4('輪迴交叉'));
  o.push(p(`${cr.full}，閘門 ${H.cross.gates[0]}/${H.cross.gates[1]} | ${H.cross.gates[2]}/${H.cross.gates[3]}。${Z.angles[H.cross.angle][1]}`));
  o.push(ul([['意識太陽',0],['意識地球',1],['設計太陽',2],['設計地球',3]].map(([n,i])=>pt(`${n} ${H.cross.gates[i]}號閘門`,Z.gates[H.cross.gates[i]]))));
  const defd=['head','ajna','throat','g','heart','sacral','spleen','sp','root'];
  o.push(h3('九大能量中心'));
  o.push(h4('有定義的中心'));
  o.push(H.defined.length?ul(defd.filter(c=>H.defined.includes(c)).map(c=>pt(Z.centers[c].n,Z.centers[c].d))):p('沒有有定義的中心。'));
  o.push(h4('空白的中心'));
  o.push(ul(defd.filter(c=>!H.defined.includes(c)).map(c=>pt(Z.centers[c].n,Z.centers[c].u))));
  o.push(h3('通道'));
  o.push(H.channels.length?ul(H.channels.map(([a,b])=>{const c=Z.channels[`${a}-${b}`];return pt(`${a}-${b} ${c[0]}（${c[1]}）`,c[2]);})):p('沒有完整的通道。'));
  o.push(h3('更多生活建議'));
  o.push(ul([`${l1} 爻：${({1:'先把功課做足，安全感來自知識。',2:'保留獨處時間，讓天賦自然長出來。',3:'允許自己踩坑，把每一次錯誤當成實戰數據。',4:'經營好身邊的人際網絡，機會就在其中。',5:'對外在的期待保持覺察，不需要拯救每一個人。',6:'耐心走過人生的三個階段，活出真實的樣子。'})[l1]}`,...(l2!==l1?[`${l2} 爻：${({1:'重要的事先打好基礎再出手。',2:'別人看見你的天賦時，不必推辭。',3:'失敗只是數據，不是定論。',4:'機會常來自熟人，好好維繫關係。',5:'被期待時先確認自己真的想幫，再答應，並說清楚底線。',6:'給自己時間沉澱，從旁觀中找到智慧。'})[l2]}`]:[])]));
  return{basic,adv:o.join('')};
}
function crossName(H,Z){
  const key=(H.cross.angle==='right'?'R':H.cross.angle==='left'?'L':'J')+H.cross.gates[0];
  const c=Z.crossTable[key];const ang=Z.angles[H.cross.angle][0];
  if(!c)return{full:ang,zh:'',en:''};
  const zh=Z.crossNames[c[0]]||c[0];
  return{full:`${ang}之${zh}${c[1]?c[1]:''}（${c[0]}${c[1]?' '+c[1]:''}）`,zh:`${zh}${c[1]?c[1]:''}`,en:c[0]};
}

root.Reading={west:readWest,zw:readZW,hd:readHD,crossName};
})(typeof window!=='undefined'?window:globalThis);
