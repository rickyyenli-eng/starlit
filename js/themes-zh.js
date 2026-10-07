/* 三盤合參：把紫微、星盤、人類圖對同一主題的說法轉成傾向標籤，找出共識 */
(function(root){
const SYS={zw:'紫微斗數',west:'西洋星盤',hd:'人類圖'};
const SYS_S={zw:'紫微',west:'星盤',hd:'人類圖'};

/* ---------- 標籤：名稱｜意思（含生活場景）｜建議 ---------- */
const TAGS={
career:{
 stable:['穩定體制','你在有制度、有規則的地方最能發揮。分工清楚、流程明確，你就能一步一步把位置坐穩。換工作時，你看的往往不只是薪水，還有公司穩不穩、制度上不上軌道。','找一個能長期累積年資與信用的舞台，用時間換位置。'],
 expert:['專業技術','你的價值來自「別人做不來、你做得來」。一門手藝、一張證照、一個領域鑽到深，就是你的護城河。你可能會在某天發現，同事遇到難題第一個想到來問你。','選一個領域長期深耕，把經驗寫下來、整理成作品或方法。'],
 pioneer:['開創突破','你不適合一直守著別人訂好的框架。新部門、新產品、新市場，越是沒人走過的路，你越有勁。待在一成不變的位置太久，你會開始坐立不安。','主動爭取從零開始的專案，給自己一個可以打天下的戰場。'],
 speak:['表達溝通','你的工作離不開「說」。說服、教學、報告、寫作、主持，你在需要把事情講清楚的地方特別亮眼。會議上大家講不清楚的事，常常是你一句話收尾。','把表達當成主要武器經營，教學、寫作、簡報都是你的放大器。'],
 care:['照顧助人','你做事的動力常常來自「有人因此變好」。教育、醫療、社工、客服、人資，凡是能照顧人的位置，你都做得比別人有溫度。','選擇看得到人的工作，但也記得設定界線，不要把所有人的問題都扛在身上。'],
 lead:['領導管理','你天生會被推到前面。就算一開始只是普通成員，做著做著大家就開始等你拍板。你需要有決定權的位置，才不會覺得被綁手綁腳。','主動爭取管理職或專案負責人，學會授權，比自己做完更重要。'],
 create:['創意美感','你對美、對感覺很敏銳。設計、內容、品牌、藝術、娛樂，能把感受變成作品的工作最讓你有成就感。你可能是辦公室裡會在意簡報配色的那個人。','留一塊能自由創作的空間，就算本業不是創作，也要有作品集。'],
 analyze:['分析策劃','你擅長在混亂裡看出脈絡。企劃、研究、數據、策略、顧問，凡是需要動腦、拆解問題的工作都適合你。你可能是開會時默默把所有人的意見整理成一張表的人。','當軍師比當衝鋒的人更適合你，讓決策者看見你的分析。'],
 money:['財務商業','你對數字和錢的流動有感覺。金融、業務、經營、採購、投資相關的工作，你學得比別人快。你可能很早就在算一件事划不划算。','往能直接碰到營收的位置靠近，你的能力在那裡最容易被量化。'],
 free:['自由變動','你需要變化和移動。固定坐辦公室、每天重複一樣的事，會讓你很快失去熱情。外勤、出差、接案、跨領域，反而讓你越做越起勁。','選擇有彈性的工作型態，或在本業之外經營一條自己的路。'],
 people:['人脈公關','你的機會常常是「人」帶來的。業務、公關、仲介、活動、社群經營，你靠關係打開門。一場聚會認識的人，可能就是你下一份工作。','把人脈當成資產經營，定期聯絡、幫人牽線，機會會回到你身上。']},
wealth:{
 steady:['穩健累積','你的錢是一點一點存出來的。固定收入、定期存款、長期持有，你適合慢慢滾的方式，不適合大起大落。你可能每個月一領薪水就先把一筆錢轉進另一個帳戶。','把自動存錢、長期累積當成主軸，時間是你最大的朋友。'],
 dynamic:['主動開拓','你的錢是「做」出來的。多跑一點、多接一點、多談一點，收入就會跟著來。坐著等錢自己進來，不是你的劇本。','把收入和行動綁在一起，例如業績獎金、接案、副業，但記得留休息的餘裕。'],
 windfall:['偏財機會','你常有意外的進帳機會：獎金、紅利、別人介紹的案子、時機剛好的一筆收入。錢來得快，但不一定留得住。','意外之財先分一半存起來，不要因為一次好運就加大賭注。'],
 people:['靠人生財','你的財路跟人緣分不開。客戶介紹客戶、朋友找你合作、老闆賞識給機會。人脈越好，收入越穩。','經營口碑與信用，比追逐高報酬更能讓你長期賺到錢。'],
 skill:['專業生財','你靠腦袋和技術賺錢。知識、證照、作品、經驗，越專業收入越高。你可能發現，最值錢的不是加班，而是你懂別人不懂的那一塊。','持續投資自己的專業，那是報酬率最穩的投資。'],
 cautious:['謹慎守成','你對錢有天生的警覺。買東西會比價、投資前會先想最壞的情況。守得住，是你的優勢；太保守，可能錯過機會。','保留一小部分資金學習新的理財方式，讓謹慎不變成停滯。'],
 spend:['捨得花錢','你賺錢也花錢，享受、人情、自我投資都捨得。對你來說錢是拿來用的，不是拿來看的。月底常會想：錢到底去哪了？','先存後花，設一個「享受預算」，花得開心又不心虛。'],
 ups:['起伏較大','你的收入或財務狀況容易忽高忽低，可能是行業特性，也可能是一時衝動的決定。好的時候很好，緊的時候也很緊。','準備至少半年的緊急預備金，大額決定隔一晚再做。']},
love:{
 devoted:['專一投入','你一旦認定一個人，就會全心全意。你重承諾、重長久，不太喜歡曖昧不明的關係。你可能會記得對方說過的每一句小事。','投入之前先看清楚，投入之後也記得保留自己的生活。'],
 free:['需要空間','你愛一個人，但不想被綁住。你需要自己的時間、自己的朋友、自己的計畫。對方如果查勤、黏太緊，你會本能地想逃。','一開始就說清楚你需要的空間，找一個也懂得獨立的人。'],
 romantic:['浪漫感性','你重視感覺和氣氛。一封手寫卡片、一次說走就走的旅行，比貴重的禮物更打動你。你也容易把對方理想化。','享受浪漫，但也要看清楚對方在日常裡是什麼樣子。'],
 practical:['務實經營','你把感情當成一起過日子。能不能一起分擔家務、規劃存錢、處理雙方家人，比甜言蜜語更重要。','把務實當成你的愛的語言，也記得偶爾說出口、給點儀式感。'],
 passionate:['熱烈直接','你的感情來得快、溫度高。喜歡就追，有火花就投入。關係裡的激情對你很重要，平淡太久你會不安。','熱情是你的魅力，但吵架時先冷靜十分鐘再說話。'],
 talk:['重視溝通','對你來說，聊得來比什麼都重要。能分享想法、一起討論一部電影聊到半夜的人，才會讓你心動。冷戰是你最受不了的事。','找一個願意說話的人，也練習在情緒上來時用說的，而不是用猜的。'],
 caretaker:['照顧付出','你是在關係裡照顧人的那一方。記得對方愛吃什麼、生病時第一個送粥。你的愛很實在，但有時付出太多會累。','也讓自己被照顧，說出你的需要，不要只等對方發現。'],
 slow:['慢熱謹慎','你不會一下子就把心交出去。需要時間觀察、需要從朋友慢慢變成戀人。快速告白、急著定下來的人，反而會讓你退後。','給自己時間，也讓對方知道你不是冷淡，只是需要慢慢來。'],
 conflict:['磨合較多','你的感情容易有火花，也容易有摩擦。兩個人個性都強，或彼此期待不同，吵架是常有的事。磨合過了，感情反而更穩。','把「吵贏」換成「吵完怎麼辦」，事後的修復比當下的對錯重要。'],
 standard:['眼光較高','你對伴侶有一定的標準，不容易將就。對方要有能力、有格局，或讓你欣賞。寧缺勿濫是你的原則。','標準是保護你的，但也留一點空間給「不完美但合適」的人。']},
health:{
 stress:['壓力累積','你的身體常常是壓力的出口。事情一多，肩頸、睡眠、腸胃就先出聲。你可能沒覺得自己壓力大，身體卻先知道了。','找一個固定的減壓方式，例如散步、運動、寫日記，定期清空。'],
 overwork:['容易過勞','你做事容易一股腦衝到底，忘了自己也會累。加班、熬夜、扛下別人的工作，身體在後面默默記帳。','排行程時先把休息排進去，把「不做」也當成一件該完成的事。'],
 sleep:['作息睡眠','你的狀態跟睡眠品質很有關。睡不好，隔天情緒、專注都會打折。你可能是那種越晚越有精神、越睡越晚的人。','固定上床時間、睡前一小時放下手機，對你比任何保健品都有用。'],
 digest:['飲食腸胃','你的身體對飲食很敏感，吃得好不好直接影響精神。情緒一緊張，胃口和腸胃也會跟著變。','定時定量，少吃太油太冰，緊張時先喝口溫水、慢慢吃。'],
 emotion:['情緒影響','你的情緒和身體連得很緊。心情低落時特別容易累、容易生小病。照顧情緒，就是在照顧身體。','情緒來時先承認它，找人聊聊或動一動，不要硬壓下去。'],
 nerve:['思慮過多','你的腦袋很少真的關機。想太多、想太遠，晚上躺在床上還在想明天的事。累的常常不是身體，是腦。','給大腦安排下班時間：冥想、運動、做手作，任何能讓你專心在當下的事。'],
 rest:['需要規律休息','你的能量不是用不完的。一陣子忙完，需要一段真正的休息才能恢復。硬撐的結果通常是一次大累。','把休息當成工作的一部分，規律地停下來，而不是等到撐不住才停。'],
 body:['需要動起來','你的身體需要消耗能量。久坐、悶在室內，人反而會悶、會煩躁。流汗之後，你整個人會清爽很多。','每天找一段時間讓身體動起來，運動對你是情緒調節，不只是健身。']},
people:{
 helper:['貴人緣','你身邊常有願意拉你一把的人。關鍵時刻有人介紹、有人提點，你未必刻意經營，但好人緣自己找上門。','記得道謝與回報，貴人緣會越用越深。'],
 leader:['帶頭角色','在一群人裡，你常常變成那個拿主意的人。聚餐誰訂位、旅行誰排行程，最後都落到你頭上。','帶頭是能力，但也讓別人有機會出力，不用每件事都自己扛。'],
 selective:['擇友謹慎','你的朋友不多，但每一個都經過時間考驗。你不太會跟剛認識的人掏心掏肺，對金錢往來特別小心。','保持你的謹慎，也偶爾給新朋友一點機會。'],
 social:['善於交際','你很容易跟人熟起來，聚會裡總能找到話題。朋友圈廣、各行各業都有認識的人。','廣結善緣之外，也留時間給真正重要的幾個人。'],
 independent:['獨立自主','你習慣自己來，不太依賴別人，也不喜歡被團體綁住。一個人旅行、一個人吃飯，你都覺得很自在。','獨立是你的力量，但需要幫忙時開口，並不代表軟弱。'],
 mediator:['協調者','你常常是朋友之間的橋樑。兩邊吵架都來找你說，你也能看見雙方的立場。','當調停者之前先問自己：這件事真的需要我處理嗎？'],
 conflict:['易有摩擦','你的人際關係比較容易有磨擦，可能是個性直接，也可能遇到的人立場鮮明。吵過之後，有些關係會更真。','遇到分歧時就事論事，別讓一次爭執變成長期心結。'],
 loyal:['重情重義','你對朋友很講義氣，答應的事一定做到，朋友有難你會出手。你也期待對方同樣真心。','講義氣之外，也分辨誰值得你這樣付出。']}
};

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
const PL_ZH={Sun:'太陽',Moon:'月亮',Mercury:'水星',Venus:'金星',Mars:'火星',Jupiter:'木星',Saturn:'土星',Uranus:'天王星',Neptune:'海王星',Pluto:'冥王星'};
const SIGN_ZH=['牡羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座','摩羯座','水瓶座','雙魚座'];
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
const EL=['fire','earth','air','water'];const EL_ZH={fire:'火象',earth:'土象',air:'風象',water:'水象'};

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
const LINE_ZH={1:'研究者',2:'隱士',3:'實驗者',4:'機會主義者',5:'異端者',6:'角色楷模'};

const THEMES=[['career','事業','m-career'],['wealth','財運','m-wealth'],['love','感情','m-love'],['health','健康','m-health'],['people','人際','m-people']];

function build(W,Z,HD,E){
  const signOf=l=>Math.floor(E.norm(l)/30);
  const hdTypeName=t=>({generator:'生產者',mg:'顯示生產者',manifestor:'顯示者',projector:'投射者',reflector:'反映者'})[t];
  const CEN={head:'頭腦',ajna:'邏輯',throat:'喉嚨',g:'G中心',heart:'意志力',sacral:'薦骨',spleen:'直覺',sp:'情緒',root:'根部'};
  const chKey=c=>`${Math.min(c[0],c[1])}-${Math.max(c[0],c[1])}`;
  const chName=k=>(root.HDZ&&HDZ.channels&&HDZ.channels[k]?HDZ.channels[k][0]:k).replace(/通道$/,'');
  const ZO=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];
  const out={};
  for(const [th,thName] of THEMES){
    const ev=[];const add=(sys,tag,why)=>{if(tag&&TAGS[th][tag])ev.push({sys,tag,why});};
    /* 紫微 */
    const pi=Z.palaces.findIndex(p=>p.name===ZW_PAL[th]),P=Z.palaces[pi],opp=Z.palaces[(pi+6)%12];
    const borrowed=!P.majorStars.length,stars=borrowed?opp.majorStars:P.majorStars;
    const combo=stars.map(s=>s.name).sort((a,b)=>ZO.indexOf(a)-ZO.indexOf(b));
    stars.forEach(s=>(ZW_STAR[th][s.name]||[]).forEach(t=>add('zw',t,`${ZW_PAL[th]}宮${borrowed?'（無主星，借對宮）':''}${s.name}${s.brightness?'〔'+s.brightness+'〕':''}`)));
    P.minorStars.forEach(s=>{if(ZW_MINOR[th][s.name])add('zw',ZW_MINOR[th][s.name],`${ZW_PAL[th]}宮有${s.name}`);});
    [...P.majorStars,...P.minorStars].forEach(s=>{if(s.mutagen&&ZW_MUT[th][s.mutagen])add('zw',ZW_MUT[th][s.mutagen],`${ZW_PAL[th]}宮${s.name}化${s.mutagen}`);});
    /* 星盤 */
    const inH=h=>E.PK.filter(k=>W.pos[k].house===h);
    if(th==='career'){const ms=signOf(W.mc);MC_SIGN[ms].forEach(t=>add('west',t,`天頂在${SIGN_ZH[ms]}`));inH(10).forEach(k=>add('west',H10[k],`${PL_ZH[k]}在第十宮`));}
    if(th==='wealth'){const s2=signOf(W.houses[1]);add('west',H2_SIGN[s2],`第二宮起點在${SIGN_ZH[s2]}`);inH(2).forEach(k=>add('west',H2[k],`${PL_ZH[k]}在第二宮`));inH(8).forEach(k=>add('west',H8[k],`${PL_ZH[k]}在第八宮`));}
    if(th==='love'){const vs=signOf(W.pos.Venus.lon),el=EL[vs%4];add('west',VENUS_EL[el],`金星在${SIGN_ZH[vs]}（${EL_ZH[el]}）`);const s7=signOf(W.houses[6]);add('west',H7_SIGN[s7],`第七宮起點在${SIGN_ZH[s7]}`);
      W.asp.forEach(a=>{const o=a.a==='Venus'?a.b:a.b==='Venus'?a.a:null;if(o&&VENUS_ASP[o]&&a.t!==1&&a.t!==3)add('west',VENUS_ASP[o],`金星與${PL_ZH[o]}有${['合相','六分相','四分相','三分相','對分相'][a.t]}`);});}
    if(th==='health'){const ms=signOf(W.pos.Moon.lon),el=EL[ms%4];add('west',MOON_EL[el],`月亮在${SIGN_ZH[ms]}（${EL_ZH[el]}）`);inH(6).forEach(k=>add('west',H6[k],`${PL_ZH[k]}在第六宮`));
      W.asp.forEach(a=>{const pr=[a.a,a.b];if(pr.includes('Saturn')&&(pr.includes('Sun')||pr.includes('Moon'))&&[0,2,4].includes(a.t))add('west','stress',`土星與${PL_ZH[pr.find(x=>x!=='Saturn')]}有${['合相','','四分相','','對分相'][a.t]}`);
        if(pr.includes('Mars')&&pr.includes('Sun')&&[0,2,4].includes(a.t))add('west','overwork',`太陽與火星有${['合相','','四分相','','對分相'][a.t]}`);});}
    if(th==='people'){const as=signOf(W.asc),el=EL[as%4];add('west',as===6?'mediator':ASC_EL[el],`上升在${SIGN_ZH[as]}`);inH(11).forEach(k=>add('west',H11[k],`${PL_ZH[k]}在第十一宮`));}
    /* 人類圖 */
    add('hd',HD_TYPE[th][HD.type],`類型是${hdTypeName(HD.type)}`);
    HD.channels.forEach(c=>{const k=chKey(c);if(HD_CH[th][k])add('hd',HD_CH[th][k],`有 ${k} ${chName(k)}通道`);});
    if(HD_LINE[th])HD.profile.forEach((ln,j)=>add('hd',HD_LINE[th][ln],`人生角色 ${HD.profile.join('/')} 的${j?'潛意識':'意識'}爻是 ${ln} 爻（${LINE_ZH[ln]}）`));
    const def=c=>HD.defined.includes(c);
    if(th==='love'&&HD.authority==='emotional')add('hd','slow','情緒型權威，需要等情緒波穩定再決定');
    if(th==='wealth'&&def('heart'))add('hd','dynamic','意志力中心有定義');
    if(th==='wealth'&&!def('heart')&&HD.type!=='reflector')add('hd','cautious','意志力中心空白，容易低估自己的價值或過度承諾');
    if(th==='health'){if(!def('sacral')&&HD.type!=='reflector')add('hd','rest','薦骨空白，沒有持續運轉的能量');
      if(!def('sp'))add('hd','emotion','情緒中心空白，容易吸收別人的情緒');else add('hd','emotion','情緒中心有定義，身體狀態會跟著情緒波起伏');
      if(!def('root'))add('hd','stress','根部中心空白，容易被壓力推著跑');
      if(!def('head')||!def('ajna'))add('hd','nerve',`${!def('head')&&!def('ajna')?'頭腦與邏輯中心':!def('head')?'頭腦中心':'邏輯中心'}空白，容易想太多`);
      if(!def('heart')&&HD.type!=='reflector')add('hd','overwork','意志力中心空白，容易為了證明自己而硬撐');}
    if(th==='people'&&def('heart'))add('hd','loyal','意志力中心有定義，說到做到');
    /* 計分 */
    const score={};ev.forEach(e=>{const s=score[e.tag]||(score[e.tag]={tag:e.tag,sys:new Set(),n:0});s.sys.add(e.sys);s.n++;});
    const ranked=Object.values(score).sort((a,b)=>b.sys.size-a.sys.size||b.n-a.n||Object.keys(TAGS[th]).indexOf(a.tag)-Object.keys(TAGS[th]).indexOf(b.tag));
    out[th]={th,name:thName,ev,ranked,pal:P,borrowed,combo:combo.join('·')||'空'};
  }
  return out;
}

const TENSION={
 career:{'stable|free':'你想要安穩的舞台，又受不了一成不變。最適合你的常是「穩定的平台上做有變化的事」，例如大公司裡的新專案，或有固定客戶的外勤工作。','stable|pioneer':'你一邊想守住手上的成果，一邊又想開疆闢土。可以先在穩定的地方累積資源，再撥一部分力氣去開創，不必二選一。'},
 wealth:{'steady|ups':'你有存錢的本事，收入卻可能時多時少。好的月份多存一點去補淡的月份，你的穩健就是應付起伏的保險。','cautious|spend':'你一邊精打細算，一邊又捨得花。常見的情況是大錢很謹慎，小錢不知不覺流走。記帳一個月，你會看到錢真正的去向。','cautious|windfall':'機會常找上你，但你本能會猶豫。給自己一條規則，例如只拿閒錢嘗試，讓謹慎和機會可以並存。','steady|windfall':'你適合慢慢累積，偏偏又常有意外的機會。把意外之財當成存錢罐的加速器，而不是改變整個節奏的理由。'},
 love:{'devoted|free':'你認真愛一個人，卻也需要自己的空間。這不矛盾：你要的是「我全心在這段關係裡，但我還是我」。找到懂這件事的人，你會是最穩定的伴侶。','slow|passionate':'你的心動來得很快，真正交出心卻很慢。你可能一開始很熱，接著退一步觀察。讓對方知道這是你的節奏，不是冷掉了。','practical|romantic':'你要浪漫，也要過得下去的日子。最打動你的，是在平凡日常裡還記得製造驚喜的人。','devoted|conflict':'你很投入，所以也很在意。越在乎越容易吵，吵完又放不下。先分清楚哪些是真的問題，哪些只是害怕失去。'},
 health:{'rest|body':'你需要動，也需要休息。關鍵是節奏：動完要真正停下來，停太久又要記得起來動。','overwork|rest':'你容易衝過頭，偏偏身體需要規律的休息。把休息寫進行事曆，比靠意志力提醒自己有用。'},
 people:{'independent|social':'你很會跟人相處，但也需要一個人的時間。聚會玩得開心，回家卻想安靜好幾天。這是你充電的方式，不是孤僻。','selective|social':'你看起來朋友很多，真正交心的卻只有幾個。廣而淺、少而深，兩種圈子你都需要。','leader|independent':'你常被推出來帶頭，心裡卻更想做自己的事。可以只在你真正在乎的事情上帶頭。'}};
const tensionOf=(th,a,b)=>TENSION[th][a+'|'+b]||TENSION[th][b+'|'+a]||null;
const sysList=set=>{const a=['zw','west','hd'].filter(s=>set.has(s)).map(s=>SYS_S[s]);return a.length===3?'三個系統':a.join('和');};
function snippet(th,R){
  const cb=R.combo;let e=null;
  if(th==='career'&&root.STORY_ZW_WORK)e=STORY_ZW_WORK.career[cb];
  else if(th==='wealth'&&root.STORY_ZW_WORK)e=STORY_ZW_WORK.wealth[cb];
  else if(th==='love'&&root.STORY_ZW_SPOUSE)e=STORY_ZW_SPOUSE[cb];
  else if(th==='health'&&root.STORY_ZW_PAL)e=STORY_ZW_PAL['疾厄'][cb];
  else if(th==='people'&&root.STORY_ZW_PAL)e=STORY_ZW_PAL['僕役'][cb];
  return e;
}
function firstSent(s){const m=String(s||'').match(/^[^。！？]*[。！？]/);return m?m[0]:String(s||'');}

function mix(W,Z,HD,E){
  const R=build(W,Z,HD,E);
  const cards=[];let adv='';
  const weave=[];
  for(const [th,thName,key] of THEMES){
    const r=R[th],T=TAGS[th];
    const cons=r.ranked.filter(x=>x.sys.size>=2);
    const top=cons.length?cons.slice(0,2):r.ranked.slice(0,1);
    const agree=top.length?top[0].sys.size:0;
    const pool=(cons.length?cons:r.ranked).slice(0,4),tens=[];
    for(let i=0;i<pool.length;i++)for(let j=i+1;j<pool.length;j++){const t=tensionOf(th,pool[i].tag,pool[j].tag);if(t)tens.push([pool[i],pool[j],t]);}
    const topTen=top.length===2&&tensionOf(th,top[0].tag,top[1].tag);
    cards.push({th,key,name:thName,labels:top.map(x=>T[x.tag][0]),agree,tension:!!topTen,line:topTen?firstSent(topTen):top.length?firstSent(T[top[0].tag][1]):''});
    if(top.length)weave.push([thName,top.map(x=>T[x.tag][0]),agree,!!topTen]);
    /* 詳細 */
    let h=`<h3 data-k="${key}">${thName}</h3>`;
    h+=`<h4>三盤共識</h4>`;
    if(cons.length){
      cons.slice(0,3).forEach((x,i)=>{h+=`<p><b>${sysList(x.sys)}都指向「${T[x.tag][0]}」。</b>${T[x.tag][1]}</p>`;});
    }else{
      h+=`<p>在${thName}這件事上，三個系統沒有明顯重疊，各自看到你的不同面向。這不代表互相矛盾，而是你在${thName}上有好幾種可能的樣子，看你把力氣放在哪裡。</p>`;
      r.ranked.slice(0,2).forEach(x=>{h+=`<p><b>${sysList(x.sys)}看到「${T[x.tag][0]}」。</b>${T[x.tag][1]}</p>`;});
    }
    if(tens.length)h+=`<h4>兩股拉扯</h4>${tens.slice(0,2).map(([a,b,t])=>`<p><b>「${T[a.tag][0]}」和「${T[b.tag][0]}」同時出現在你的盤上。</b>${t}</p>`).join('')}`;
    const single=r.ranked.filter(x=>x.sys.size===1&&!cons.slice(0,3).includes(x)&&(cons.length||!r.ranked.slice(0,2).includes(x))).slice(0,3);
    if(single.length&&cons.length)h+=`<h4>只有一個系統提到的另一面</h4><ul>${single.map(x=>`<li><b>${T[x.tag][0]}</b>（${sysList(x.sys)}）：${firstSent(T[x.tag][1])}</li>`).join('')}</ul>`;
    for(const s of ['zw','west','hd']){
      const es=r.ev.filter(e=>e.sys===s);
      h+=`<h4>${SYS[s]}怎麼說</h4>`;
      if(s==='zw'){const e=snippet(th,r);
        if(e)h+=`<p><b>${r.pal.name}宮${r.borrowed?'（借對宮）':''}：「${e.title}」</b>${root.Readings&&Readings.zh&&Readings.zh.fit?Readings.zh.fit(firstSent(e.story||e.partner),r.pal,Z.palaces[(Z.palaces.indexOf(r.pal)+6)%12].majorStars):firstSent(e.story||e.partner)}</p>`;
        if(e&&e.fields)h+=`<p>適合的方向：${e.fields}</p>`;}
      if(!es.length){h+=`<p class="muted">這張盤在這個主題上沒有特別突出的指標。</p>`;continue;}
      const by={};es.forEach(e=>(by[e.tag]=by[e.tag]||[]).push(e.why));
      h+=`<ul>${Object.entries(by).map(([t,w])=>`<li>${[...new Set(w)].join('、')} → <b>${T[t][0]}</b></li>`).join('')}</ul>`;
    }
    h+=`<h4>給你的建議</h4><ul>${(cons.length?cons:r.ranked).slice(0,3).map(x=>`<li><b>${T[x.tag][0]}：</b>${T[x.tag][2]}</li>`).join('')}</ul>`;
    adv+=h;
  }
  adv+=`<h3 data-k="m-how">怎麼合參</h3><p>三個系統用的語言不同：紫微斗數看宮位裡的星曜，西洋星盤看行星、星座和宮位，人類圖看能量中心和通道。這一頁把每個系統對同一主題的說法，轉成同一組「傾向標籤」，再看哪些標籤被兩個以上的系統同時指到。</p><p>被越多系統指到的傾向，越值得你放在心上；只有一個系統提到的，是你的另一面，或在特定時期才會出現的樣子。</p><ul><li><b>事業</b>：紫微看官祿宮，星盤看天頂與第十宮，人類圖看類型與通道。</li><li><b>財運</b>：紫微看財帛宮，星盤看第二、第八宮，人類圖看類型、意志力中心與相關通道。</li><li><b>感情</b>：紫微看夫妻宮，星盤看金星與第七宮，人類圖看類型、人生角色、權威與通道。</li><li><b>健康</b>：紫微看疾厄宮，星盤看月亮、第六宮與土星相位，人類圖看各中心的定義與空白。這裡只談生活習慣上的提醒，不是醫療判斷。</li><li><b>人際</b>：紫微看僕役宮，星盤看上升與第十一宮，人類圖看人生角色與通道。</li></ul>`;
  /* 基本：整體故事 */
  const ag=n=>n>=3?'三個系統一致':n===2?'兩個系統一致':'單一系統';
  const pick=th=>weave.find(w=>w[0]===th);
  const phr=w=>w?`「${w[1].join('」與「')}」`:'';
  const both=w=>w[3]?`同時有${phr(w)}兩股力量`:'';
  let basic=`<p>把紫微、星盤、人類圖三張盤疊在一起看，同一件事被不同系統說中，就是你最穩的底色。</p>`;
  const c=pick('事業'),m=pick('財運'),l=pick('感情'),he=pick('健康'),p=pick('人際');
  const lines=[];
  if(c)lines.push(c[3]?`工作上，你${both(c)}（${ag(c[2])}）。`:`工作上，你最清楚的訊號是${phr(c)}（${ag(c[2])}）。`);
  if(m)lines.push(m[3]?`錢的方面，你${both(m)}。`:`錢的模式偏向${phr(m)}。`);
  if(l)lines.push(l[3]?`感情裡，你${both(l)}。`:`感情裡，你是${phr(l)}的人。`);
  if(p)lines.push(p[3]?`在人群中，你${both(p)}。`:`在人群中，你常是${phr(p)}的樣子。`);
  if(he)lines.push(he[3]?`身體方面，你${both(he)}。`:`身體要留意的是${phr(he)}。`);
  basic+=`<p>${lines.join('')}</p>`;
  return{cards,basic,adv,raw:R};
}

root.Themes=root.Themes||{};
root.Themes.zh={mix,build,TAGS,THEMES};
})(typeof globalThis!=='undefined'?globalThis:this);
