/* 問題入口（D）＋一題一畫面的引導式輸入（C）
 * 引導完成後把資料填回原本的表單並送出，排盤只有一條路徑。CTX 記錄使用者想問什麼與情境。 */
const CTX={intent:null,status:null,job:null};
const WIZ_TXT={
 zh:{askTitle:'你想先知道什麼？',askSub:'選一個問題，我一步一步帶你排盤。熟悉的話也可以直接填下面的表單。',
  intents:{all:'整體的我',love:'感情',work:'工作',money:'錢',year:'今年運勢'},
  back:'上一步',next:'下一步',done:'開始排盤',close:'關閉',
  steps:{
   intent:['嗨，歡迎來到 Starlit。','你今天最想知道什麼？'],
   date:['好，我們從頭開始。','你的生日是哪一天？（國曆）'],
   time:['出生時間會決定上升星座和紫微命宮。','大概幾點出生？'],
   gender:['紫微排大限會用到。','你的性別是？'],
   city:['出生地點會影響宮位。','在哪裡出生？'],
   status:['再兩題，讓解讀更貼近你。','現在的感情狀態？'],
   job:['最後一題。','你現在的工作狀態？']},
  unsure:'不確定時間，只知道大概時段',unsureNote:'會用該時辰的中間時間排盤，上升星座可能不準。',
  status:{single:'單身',crush:'曖昧中',dating:'戀愛中',married:'已婚',broke:'剛分手',none:'不想說'},
  job:{student:'學生',seeking:'正在找工作',employee:'上班族',founder:'創業／接案',change:'想轉換跑道',none:'不想說'},
  otherCity:'其他地點（用表單自訂經緯度）',shichen:['子時 23–01','丑時 01–03','寅時 03–05','卯時 05–07','辰時 07–09','巳時 09–11','午時 11–13','未時 13–15','申時 15–17','酉時 17–19','戌時 19–21','亥時 21–23']},
 en:{askTitle:'What would you like to know first?',askSub:'Pick a question and I’ll walk you through it step by step. Or fill in the form below directly.',
  intents:{all:'Who I am',love:'Love',work:'Work',money:'Money',year:'This year'},
  back:'Back',next:'Next',done:'Read my charts',close:'Close',
  steps:{intent:['Hi, welcome to Starlit.','What would you most like to know today?'],date:['Let’s start at the beginning.','When is your birthday?'],
   time:['Your birth time sets your rising sign and your Zi Wei Life palace.','Roughly what time were you born?'],gender:['Zi Wei uses this for its ten-year cycles.','Your gender?'],
   city:['Where you were born shapes the houses.','Where were you born?'],status:['Two more questions to make the reading fit you.','Your relationship status?'],job:['Last one.','Your work situation?']},
  unsure:'Not sure of the exact time, only a rough window',unsureNote:'The middle of that two-hour window will be used; your rising sign may be off.',
  status:{single:'Single',crush:'Something’s starting',dating:'In a relationship',married:'Married',broke:'Just broke up',none:'Prefer not to say'},
  job:{student:'Student',seeking:'Looking for work',employee:'Employed',founder:'Own business / freelance',change:'Thinking of a career change',none:'Prefer not to say'},
  otherCity:'Somewhere else (set coordinates in the form)',shichen:['23:00–01:00','01:00–03:00','03:00–05:00','05:00–07:00','07:00–09:00','09:00–11:00','11:00–13:00','13:00–15:00','15:00–17:00','17:00–19:00','19:00–21:00','21:00–23:00']},
 ja:{askTitle:'まず何を知りたいですか？',askSub:'質問を選ぶと、一つずつ案内しながらチャートを作ります。慣れている方は下のフォームに直接入力できます。',
  intents:{all:'自分のこと',love:'恋愛',work:'仕事',money:'お金',year:'今年の運勢'},
  back:'戻る',next:'次へ',done:'チャートを作る',close:'閉じる',
  steps:{intent:['こんにちは、Starlit へようこそ。','今日いちばん知りたいことは？'],date:['では、最初から始めましょう。','誕生日はいつですか？'],
   time:['生まれた時刻でアセンダントと紫微の命宮が決まります。','何時ごろに生まれましたか？'],gender:['紫微斗数の大限に使います。','性別は？'],
   city:['出生地はハウスに影響します。','どこで生まれましたか？'],status:['あと二問で、解説があなたにぐっと近づきます。','いまの恋愛の状況は？'],job:['最後の質問です。','いまのお仕事の状況は？']},
  unsure:'正確な時刻はわからず、だいたいの時間帯だけわかる',unsureNote:'その時間帯の中間の時刻で作成します。アセンダントがずれる可能性があります。',
  status:{single:'シングル',crush:'いい感じの人がいる',dating:'交際中',married:'既婚',broke:'最近別れた',none:'答えない'},
  job:{student:'学生',seeking:'求職中',employee:'会社員',founder:'起業／フリーランス',change:'転職を考えている',none:'答えない'},
  otherCity:'その他の場所（フォームで緯度経度を指定）',shichen:['23–01時','01–03時','03–05時','05–07時','07–09時','09–11時','11–13時','13–15時','15–17時','17–19時','19–21時','21–23時']},
 fr:{askTitle:'Que voulez-vous savoir en premier ?',askSub:'Choisissez une question, je vous guide étape par étape. Ou remplissez directement le formulaire ci-dessous.',
  intents:{all:'Qui je suis',love:'L’amour',work:'Le travail',money:'L’argent',year:'Cette année'},
  back:'Retour',next:'Suivant',done:'Lire mes thèmes',close:'Fermer',
  steps:{intent:['Bonjour, bienvenue sur Starlit.','Que voulez-vous savoir aujourd’hui ?'],date:['Commençons par le début.','Quelle est votre date de naissance ?'],
   time:['L’heure de naissance fixe votre ascendant et votre palais de la Vie.','Vers quelle heure êtes-vous né(e) ?'],gender:['Le Zi Wei l’utilise pour ses cycles de dix ans.','Votre genre ?'],
   city:['Le lieu de naissance influence les maisons.','Où êtes-vous né(e) ?'],status:['Encore deux questions pour une lecture plus personnelle.','Votre situation amoureuse ?'],job:['Dernière question.','Votre situation professionnelle ?']},
  unsure:'Je ne connais pas l’heure exacte, seulement une plage',unsureNote:'Le milieu de cette plage de deux heures sera utilisé ; l’ascendant peut être inexact.',
  status:{single:'Célibataire',crush:'Quelque chose commence',dating:'En couple',married:'Marié(e)',broke:'Rupture récente',none:'Je préfère ne pas dire'},
  job:{student:'Étudiant(e)',seeking:'En recherche d’emploi',employee:'Salarié(e)',founder:'Entrepreneur / indépendant',change:'Envie de reconversion',none:'Je préfère ne pas dire'},
  otherCity:'Ailleurs (coordonnées dans le formulaire)',shichen:['23h–01h','01h–03h','03h–05h','05h–07h','07h–09h','09h–11h','11h–13h','13h–15h','15h–17h','17h–19h','19h–21h','21h–23h']}};
const WT=()=>WIZ_TXT[LG]||WIZ_TXT.zh;

/* ---------- D：問題入口 ---------- */
function askRender(){
  const el=document.querySelector('#ask');if(!el)return;const T=WT();
  el.innerHTML=`<h2>${T.askTitle}</h2><p>${T.askSub}</p><div class="ask-chips">${Object.entries(T.intents).map(([k,v])=>`<button type="button" data-intent="${k}"${CTX.intent===k?' aria-pressed="true"':''}>${v}</button>`).join('')}</div>`;
  el.querySelectorAll('button[data-intent]').forEach(b=>b.addEventListener('click',()=>wizOpen(b.dataset.intent)));
}

/* ---------- C：引導式輸入 ---------- */
const WZ={i:0,steps:[],v:{}};
function wizOpen(intent){
  WZ.v={intent:intent||null,date:$('#f-date').value,time:$('#f-time').value,g:(document.querySelector('input[name=g]:checked')||{}).value||'',city:$('#f-city').value,status:CTX.status,job:CTX.job,unsure:false,sc:4};
  WZ.steps=[...(intent?[]:['intent']),'date','time','gender','city','status','job'];WZ.i=0;
  const d=$('#wiz');if(!d.open)d.showModal();document.body.classList.add('dlg-open');wizShow();
}
function wizClose(){$('#wiz').close();document.body.classList.remove('dlg-open');}
function wizShow(){
  const T=WT(),s=WZ.steps[WZ.i],v=WZ.v,[kick,q]=T.steps[s];
  const opt=(arr,key)=>`<div class="wz-opts">${Object.entries(arr).map(([k,t])=>`<button type="button" class="wz-opt" data-k="${key}" data-v="${k}"${v[key]===k?' aria-pressed="true"':''}>${t}</button>`).join('')}</div>`;
  let ctl='';
  if(s==='intent')ctl=opt(T.intents,'intent');
  if(s==='date')ctl=`<input class="wz-in" id="wz-date" type="date" min="1900-01-01" max="2100-12-31" value="${v.date||''}">`;
  if(s==='time')ctl=`<input class="wz-in" id="wz-time" type="time" value="${v.time||''}"${v.unsure?' hidden':''}>
    <label class="wz-check"><input type="checkbox" id="wz-unsure"${v.unsure?' checked':''}> ${T.unsure}</label>
    <div id="wz-scw"${v.unsure?'':' hidden'}><select class="wz-in" id="wz-sc">${T.shichen.map((t,i)=>`<option value="${i}"${v.sc===i?' selected':''}>${t}</option>`).join('')}</select><p class="wz-note">${T.unsureNote}</p></div>`;
  if(s==='gender')ctl=opt({'女':L.ui.female,'男':L.ui.male},'g');
  if(s==='city'){const li={zh:0,en:1,ja:2,fr:3}[LG];ctl=`<select class="wz-in" id="wz-city"><option value="">${L.ui.pick}</option>${CITIES.filter(c=>c[4]!=null).map(c=>`<option value="${c[0]}"${v.city===c[0]?' selected':''}>${c[li]}</option>`).join('')}<option value="__other">${T.otherCity}</option></select>`;}
  if(s==='status')ctl=opt(T.status,'status');
  if(s==='job')ctl=opt(T.job,'job');
  const last=WZ.i===WZ.steps.length-1;
  $('#wiz-body').innerHTML=`<div class="wz-dots">${WZ.steps.map((x,i)=>`<i class="${i<=WZ.i?'on':''}"></i>`).join('')}</div>
   <div class="wz-q"><p class="wz-kick">${kick}</p><h2>${q}</h2>${ctl}</div>
   <div class="wz-nav"><button type="button" class="wz-back"${WZ.i===0?' disabled':''}>${T.back}</button><button type="button" class="wz-next">${last?T.done:T.next}</button></div>`;
  $('#wiz-x').setAttribute('aria-label',T.close);
  const B=$('#wiz-body');
  B.querySelectorAll('.wz-opt').forEach(b=>b.addEventListener('click',()=>{v[b.dataset.k]=b.dataset.v;wizNext();}));
  B.querySelector('.wz-back').addEventListener('click',()=>{if(WZ.i>0){WZ.i--;wizShow();}});
  B.querySelector('.wz-next').addEventListener('click',wizNext);
  const un=B.querySelector('#wz-unsure');if(un)un.addEventListener('change',()=>{v.unsure=un.checked;B.querySelector('#wz-time').hidden=un.checked;B.querySelector('#wz-scw').hidden=!un.checked;wizValid();});
  B.querySelectorAll('input,select').forEach(x=>x.addEventListener('input',wizValid));
  wizValid();
  const f=B.querySelector('input.wz-in,select.wz-in');if(f&&!('ontouchstart' in window))f.focus();
}
function wizRead(){const B=$('#wiz-body'),v=WZ.v,g=id=>B.querySelector(id);
  if(g('#wz-date'))v.date=g('#wz-date').value;
  if(g('#wz-time'))v.time=g('#wz-time').value;
  if(g('#wz-sc'))v.sc=+g('#wz-sc').value;
  if(g('#wz-city'))v.city=g('#wz-city').value;}
function wizOk(){const s=WZ.steps[WZ.i],v=WZ.v;wizRead();
  if(s==='intent')return !!v.intent;if(s==='date'){const yy=+String(v.date||'').slice(0,4);return !!v.date&&yy>=1900&&yy<=2100;}if(s==='time')return v.unsure||!!v.time;
  if(s==='gender')return !!v.g;if(s==='city')return !!v.city;if(s==='status')return !!v.status;if(s==='job')return !!v.job;return true;}
function wizValid(){const n=$('#wiz-body .wz-next');if(n)n.disabled=!wizOk();}
function wizNext(){
  if(!wizOk())return;const v=WZ.v;
  if(WZ.steps[WZ.i]==='city'&&v.city==='__other'){CTX.intent=v.intent;CTX.status=null;CTX.job=null;wizFill(true);wizClose();$('.adv').open=true;$('#f-lat').focus();return;}
  if(WZ.i<WZ.steps.length-1){WZ.i++;wizShow();return;}
  CTX.intent=v.intent;CTX.status=v.status==='none'?null:v.status;CTX.job=v.job==='none'?null:v.job;
  wizFill(false);wizClose();askRender();
  {const sf=document.querySelector('#ai-focus'),m={love:'love',work:'career',money:'wealth',year:'year'}[CTX.intent];if(sf&&m)sf.value=m;}
  const f=$('#birth');if(f.requestSubmit)f.requestSubmit();else f.dispatchEvent(new Event('submit',{cancelable:true}));
}
function wizFill(partial){const v=WZ.v;
  if(v.date)$('#f-date').value=v.date;
  const mids=['23:30','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00'];
  if(v.unsure)$('#f-time').value=mids[v.sc];else if(v.time)$('#f-time').value=v.time;
  if(v.g){const r=document.querySelector(`input[name=g][value="${v.g}"]`);if(r)r.checked=true;}
  if(v.city&&v.city!=='__other'){$('#f-city').value=v.city;onCity();}else if(partial){$('#f-city').value='';}
}
function wizInit(){
  $('#wiz-x').addEventListener('click',wizClose);
  $('#wiz').addEventListener('close',()=>document.body.classList.remove('dlg-open'));
  $('#wiz').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.tagName!=='BUTTON'){e.preventDefault();wizNext();}});
  askRender();
}
/* 結果上方的答案卡 */
function intentCard(){
  if(!CTX.intent||!window.Intent)return '';const P=Intent[LG]||Intent.zh;
  try{return P.render(CTX,W,Z,HD,Engine);}catch(e){console.error(e);return '';}
}
