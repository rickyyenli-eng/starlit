/* Combined reading: English language pack (tag text, evidence notes, layout text). Logic lives in themes-core.js */
(function(root){
const I=()=>(typeof I18N!=='undefined'?I18N:root.I18N).en;
const HS=()=>(typeof HDS!=='undefined'?HDS:root.HDS);
const HZ=()=>(typeof HDZ!=='undefined'?HDZ:root.HDZ);
const PK=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
const pl=k=>I().planets[PK.indexOf(k)][0];
const sign=i=>I().signs[i][0];
const EL=['fire','earth','air','water'];
const elName=s=>I().elems[EL[s%4]][0];
const aspName=t=>I().aspects[t][0].toLowerCase();
const ordn=n=>n+((n%100>=11&&n%100<=13)?'th':(['th','st','nd','rd'][n%10]||'th'));
const PAL_KEYS=['命宮','兄弟','夫妻','子女','財帛','疾厄','遷移','僕役','官祿','田宅','福德','父母'];
const MAJ=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];
const MIN=['左輔','右弼','文昌','文曲','天魁','天鉞','祿存','天馬','擎羊','陀羅','火星','鈴星','地空','地劫'];
const BRI=['廟','旺','得','利','平','不','陷'];
const MUT=['祿','權','科','忌'];
const pn=p=>{let i=PAL_KEYS.indexOf(p);if(i<0)i=PAL_KEYS.indexOf(p+'宮');if(i<0)i=PAL_KEYS.indexOf(String(p).replace(/宮$/,''));return i>=0?I().palaces[i][0]:p;};
const st=s=>{let i=MAJ.indexOf(s);if(i>=0)return I().major[i][0];i=MIN.indexOf(s);return i>=0?I().minor[i][0]:s;};
const bl=b=>{const i=BRI.indexOf(b);return i>=0?I().bright[i][0]:b;};
const mu=m=>{const i=MUT.indexOf(m);return i>=0?I().mut[i][1]:m;};
const typeName=t=>I().hd.types[t];
const center=c=>I().hd.centers[c];
const lineName=ln=>{const h=HS()&&HS().en;return h&&h.lines&&h.lines[ln]?h.lines[ln].n:'';};
const chName=k=>{const h=HS()&&HS().en;if(h&&h.channels&&h.channels[k])return h.channels[k][0];const z=HZ();return z&&z.channels&&z.channels[k]?z.channels[k][0]:k;};
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const P={
 lang:'en',suffix:'_EN',
 THEME:{career:'Career',wealth:'Money',love:'Love',health:'Health',people:'People'},
 SYS:{zw:'Zi Wei Dou Shu',west:'Western astrology',hd:'Human Design'},
 sysList:set=>{const n={zw:'Zi Wei',west:'astrology',hd:'Human Design'};const a=['zw','west','hd'].filter(s=>set.has(s)).map(s=>n[s]);return a.length===3?'all three systems':a.join(' and ');},
 firstSent:s=>{const m=String(s||'').match(/^[\s\S]*?[.!?][”’"]?(?=\s|$)/);return m?m[0]:String(s||'');},
 /* ---------- Tags: name | meaning (with everyday scenes) | advice ---------- */
TAGS:{
career:{
 stable:['Stable structure',"You do your best work where there are systems and clear rules. When roles are defined and processes are clear, you can build your position step by step. When you change jobs, you look at more than the salary: you want to know whether the company is solid and well run.","Find a stage where you can build seniority and trust over the long term, and let time earn you your position."],
 expert:['Specialist skill',"Your value comes from doing what others can’t. A craft, a qualification, a field you know in depth: that is your moat. One day you may notice that when colleagues hit a hard problem, you are the first person they come to.","Choose one field to cultivate for the long haul, and write your experience down as a body of work or a method."],
 pioneer:['Trailblazing',"You aren’t made to stay inside a frame someone else set. New teams, new products, new markets: the less trodden the path, the more alive you feel. Stay too long in a role that never changes and you start to get restless.","Ask for projects that start from zero, and give yourself a field you can conquer."],
 speak:['Communication',"Your work revolves around speaking. Persuading, teaching, presenting, writing, hosting: you shine wherever things need to be explained clearly. When a meeting goes in circles, you are often the one who sums it up in a sentence.","Treat expression as your main tool. Teaching, writing and presenting all amplify what you do."],
 care:['Helping others',"What drives you is often seeing someone better off because of your work. Education, healthcare, social work, customer support, HR: in any role that looks after people, you bring more warmth than most.","Choose work where you can see the people you help, but set boundaries so you don’t carry everyone’s problems."],
 lead:['Leadership',"You naturally end up at the front. Even if you start as an ordinary team member, people soon wait for you to make the call. You need a role with real decision-making power, or you feel tied down.","Go for management or project lead roles, and learn to delegate: it matters more than doing everything yourself."],
 create:['Creative flair',"You are sensitive to beauty and feeling. Design, content, branding, art, entertainment: work that turns feelings into something tangible gives you the most satisfaction. You may be the person in the office who cares about the colors on a slide.","Keep a space where you can create freely. Even if your job isn’t creative, build a portfolio."],
 analyze:['Analysis and strategy',"You are good at seeing the pattern in a mess. Planning, research, data, strategy, consulting: any work that needs thinking and breaking problems down suits you. You may be the one who quietly turns everyone’s opinions in a meeting into a single table.","You are better suited to being the strategist than the one charging ahead. Make sure decision-makers see your analysis."],
 money:['Business and finance',"You have a feel for numbers and the flow of money. Finance, sales, management, purchasing, investment-related work: you pick these up faster than others. You probably started working out whether things were worth it very early on.","Move toward roles that touch revenue directly; that is where your ability is easiest to measure."],
 free:['Freedom and change',"You need variety and movement. Sitting in the same office doing the same thing every day drains your enthusiasm fast. Field work, travel, freelancing and crossing between fields keep you energized.","Choose a flexible way of working, or build a path of your own alongside your main job."],
 people:['Networking',"Your opportunities often come through people. Sales, PR, brokering, events, community management: you open doors through relationships. Someone you meet at a gathering could lead to your next job.","Treat your network as an asset: keep in touch and connect people, and opportunities will come back to you."]},
wealth:{
 steady:['Steady saving',"Your money is built up little by little. A regular income, regular savings, holding for the long term: slow and steady suits you better than big swings. You may be the kind of person who moves a set amount into another account as soon as payday arrives.","Make automatic saving and long-term building your backbone. Time is your best friend."],
 dynamic:['Active earning',"Your money comes from doing. Run a bit more, take on a bit more, negotiate a bit more, and income follows. Sitting and waiting for money to arrive isn’t your script.","Tie your income to action, through commissions, freelance work or a side project, but leave room to rest."],
 windfall:['Windfall chances',"Unexpected income tends to find you: bonuses, perks, a job someone passes your way, money that arrives at just the right time. It comes quickly, but it doesn’t always stay.","Put half of any windfall straight into savings, and don’t raise your stakes because of one lucky break."],
 people:['Income through people',"Your income is closely tied to your relationships. Clients refer clients, friends invite you to collaborate, a boss spots your talent and gives you a chance. The better your network, the steadier your income.","Building a good reputation and trust will earn you more over time than chasing high returns."],
 skill:['Skill-based income',"You earn with your head and your skills. Knowledge, qualifications, a portfolio, experience: the more specialized you are, the more you earn. You may find that what pays most isn’t overtime but knowing the part nobody else knows.","Keep investing in your expertise; it is the investment with the steadiest return."],
 cautious:['Careful keeping',"You have a natural alertness about money. You compare prices before buying and think through the worst case before committing. Holding on to what you have is your strength; being too conservative can mean missed chances.","Set aside a small amount to learn new ways of managing money, so caution doesn’t turn into standing still."],
 spend:['Free spending',"You earn and you spend, and you don’t hold back on enjoyment, generosity or investing in yourself. To you, money is for using, not for looking at. At the end of the month you often wonder where it all went.","Save first, then spend. Set an “enjoyment budget” so you can spend happily without guilt."],
 ups:['Ups and downs',"Your income or finances tend to swing between high and low, whether because of your industry or a decision made on impulse. The good times are very good, and the tight times are very tight.","Keep at least six months of emergency savings, and sleep on any big decision before making it."]},
love:{
 devoted:['Devoted',"Once you decide on someone, you give your whole heart. You value commitment and the long term, and you don’t enjoy relationships that stay vague. You may remember every small thing your partner has said.","Look clearly before you commit, and once you do, keep a life of your own too."],
 free:['Needs space',"You love deeply, but you don’t want to be tied down. You need your own time, your own friends, your own plans. If a partner checks up on you or clings too tightly, your instinct is to run.","Be clear from the start about the space you need, and look for someone who is independent too."],
 romantic:['Romantic',"Feeling and atmosphere matter to you. A handwritten card or a spur-of-the-moment trip moves you more than an expensive gift. You can also tend to idealize the other person.","Enjoy the romance, but also see clearly who the other person is in everyday life."],
 practical:['Practical partner',"For you, love means building a life together. Whether you can share the housework, plan your savings and handle both families matters more than sweet words.","Let practicality be your love language, and remember to say it out loud and add a little ceremony now and then."],
 passionate:['Passionate and direct',"Your feelings arrive fast and run hot. If you like someone, you go after them; if there is a spark, you dive in. Passion matters to you in a relationship, and too much calm makes you uneasy.","Your warmth is your charm, but in an argument take ten minutes to cool down before you speak."],
 talk:['Values talking',"For you, being able to talk matters more than anything. The person who wins your heart is someone you can share ideas with and discuss a film with until midnight. The silent treatment is the thing you can stand least.","Find someone who is willing to talk, and when emotions rise, practice saying what you feel instead of making the other person guess."],
 caretaker:['Caretaker',"You are the one who looks after the other person in a relationship. You remember what they like to eat, and you are the first to bring soup when they are ill. Your love is very real, but giving too much can wear you out.","Let yourself be cared for too. Say what you need instead of waiting for them to notice."],
 slow:['Slow to warm',"You don’t hand over your heart all at once. You need time to observe, and to move slowly from friends to lovers. People who confess quickly or rush to settle down make you step back.","Give yourself time, and let the other person know you aren’t cold, just someone who takes it slowly."],
 conflict:['Frequent friction',"Your relationships spark easily, and clash easily too. Two strong personalities, or different expectations, mean arguments are common. Once you work through them, the relationship often grows steadier.","Swap “winning the argument” for “what do we do after it”: the repair afterward matters more than who was right."],
 standard:['High standards',"You have clear standards for a partner and don’t settle easily. The person needs to be capable, to see the big picture, or to be someone you admire. Better no one than the wrong one is your rule.","Your standards protect you, but leave a little room for someone imperfect yet right for you."]},
health:{
 stress:['Stress buildup',"Your body is often where stress comes out. When things pile up, your neck and shoulders, your sleep or your stomach speak up first. You may not feel especially stressed, but your body knows before you do.","Find a regular way to unwind, such as walking, exercise or journaling, and clear things out on a schedule."],
 overwork:['Prone to overwork',"You tend to charge ahead until the job is done and forget that you get tired too. Overtime, late nights, taking on other people’s work: your body is quietly keeping score.","When you plan your schedule, put rest in first, and treat “not doing” as something that also has to get done."],
 sleep:['Sleep and routine',"How you feel is closely tied to how well you sleep. A bad night and the next day your mood and focus both suffer. You may be the type who gets livelier the later it gets, and goes to bed later and later.","A fixed bedtime and putting your phone away an hour before sleep will help you more than any supplement."],
 digest:['Diet and digestion',"Your body is sensitive to food, and how well you eat directly affects your energy. When you are tense, your appetite and stomach change too.","Eat at regular times and in regular amounts, go easy on greasy and ice-cold food, and when you are tense, sip something warm and eat slowly."],
 emotion:['Mood and body',"Your emotions and your body are closely linked. When your mood is low, you tire easily and catch small ailments more often. Looking after your feelings is looking after your body.","When a feeling comes, acknowledge it. Talk to someone or move your body instead of pushing it down."],
 nerve:['Overthinking',"Your mind rarely switches off. You think too much and too far ahead, and you are still going over tomorrow while lying in bed. Often it isn’t your body that is tired, it is your mind.","Give your mind clocking-off time: meditation, exercise, crafts, anything that keeps you in the present."],
 rest:['Regular rest',"Your energy isn’t endless. After a busy stretch you need a real break to recover. Pushing through usually ends in one big crash.","Treat rest as part of the work. Stop regularly instead of waiting until you can’t go on."],
 body:['Needs movement',"Your body needs to burn energy. Sitting for long hours or staying cooped up indoors makes you restless and irritable. After a good sweat you feel completely refreshed.","Find time each day to get moving. For you, exercise is about regulating your mood, not just fitness."]},
people:{
 helper:['Helpful allies',"There are often people around you willing to give you a hand. At key moments someone introduces you or points you the right way. You may not work at it, but goodwill finds you.","Remember to say thank you and to give back; this kind of goodwill grows deeper the more it is used."],
 leader:['Takes the lead',"In a group, you are often the one who ends up deciding. Who books the restaurant, who plans the trip: it usually falls to you.","Leading is a skill, but give others a chance to contribute too; you don’t have to carry everything yourself."],
 selective:['Choosy with friends',"You don’t have many friends, but each one has stood the test of time. You rarely open up to someone you have just met, and you are especially careful about money between friends.","Keep your caution, and now and then give a new friend a chance."],
 social:['Sociable',"You warm up to people easily and can always find something to talk about at a gathering. Your circle is wide, and you know people in all kinds of fields.","Alongside the wide circle, keep time for the few people who really matter."],
 independent:['Independent',"You are used to doing things yourself, don’t lean much on others, and don’t like being tied to a group. Traveling alone or eating alone feels perfectly comfortable to you.","Independence is your strength, but asking for help when you need it isn’t weakness."],
 mediator:['Mediator',"You are often the bridge between friends. When two people fall out, both come to you, and you can see each side’s point of view.","Before stepping in as peacemaker, ask yourself whether this is really yours to handle."],
 conflict:['Prone to friction',"Your relationships with people run into friction more easily, maybe because you are direct, or because the people you meet hold strong views. After a clash, some relationships become more genuine.","When you disagree, stick to the issue, and don’t let one argument turn into a lasting grudge."],
 loyal:['Loyal',"You stand by your friends. You keep your promises, and when a friend is in trouble, you step in. You expect the same sincerity in return.","Alongside your loyalty, learn to tell who deserves that kind of commitment."]}
},
 TENSION:{
 career:{'stable|free':"You want a secure stage, yet you can’t stand things staying the same. What suits you best is often doing varied work on a stable platform, such as a new project inside a large company, or field work with steady clients.",'stable|pioneer':"Part of you wants to protect what you have built, and part of you wants to break new ground. You can build up resources somewhere stable first, then put some of your energy into something new; you don’t have to choose."},
 wealth:{'steady|ups':"You know how to save, but your income may come and go. Save extra in the good months to cover the lean ones; your steadiness is your insurance against the swings.",'cautious|spend':"You count every penny, and yet you also spend freely. A common pattern is being careful with big sums while small amounts slip away unnoticed. Track your spending for a month and you will see where your money really goes.",'cautious|windfall':"Opportunities often find you, but your instinct is to hesitate. Give yourself a rule, such as only trying things with spare money, so caution and opportunity can live side by side.",'steady|windfall':"Slow building suits you, yet unexpected chances keep turning up. Treat windfalls as a boost for your savings, not as a reason to change your whole rhythm."},
 love:{'devoted|free':"You love someone wholeheartedly, and you also need your own space. That isn’t a contradiction: what you want is to be fully in the relationship while still being yourself. With someone who understands that, you are the steadiest of partners.",'slow|passionate':"You fall for someone fast, but you hand over your heart slowly. You may start out warm, then take a step back to watch. Let the other person know this is your rhythm, not you cooling off.",'practical|romantic':"You want romance, and a life that actually works. What moves you most is someone who still remembers to create little surprises in ordinary days.",'devoted|conflict':"You give a lot, so you care a lot. The more you care, the more easily you argue, and afterward you can’t let it go. First sort out which issues are real and which are just a fear of losing each other."},
 health:{'rest|body':"You need to move, and you also need to rest. The key is rhythm: after moving, really stop; after stopping for too long, remember to get up and move.",'overwork|rest':"You tend to push too hard, yet your body needs regular rest. Writing rest into your calendar works better than relying on willpower to remind you."},
 people:{'independent|social':"You get along easily with people, but you also need time alone. You can have a great time at a gathering and then want several quiet days at home. That is how you recharge, not you being antisocial.",'selective|social':"You seem to have lots of friends, yet only a few truly know you. Wide and light, few and deep: you need both kinds of circle.",'leader|independent':"You often get pushed to the front, but deep down you would rather do your own thing. You can choose to lead only in the things you really care about."}},
 why:{
  palStar:(pal,b,star,br)=>`${pn(pal)} palace${b?' (no main star, borrowing the opposite palace)':''}: ${st(star)}${br?' ['+bl(br)+']':''}`,
  palMinor:(pal,star)=>`${st(star)} in the ${pn(pal)} palace`,
  palMut:(pal,star,m)=>`${st(star)} ${mu(m)} in the ${pn(pal)} palace`,
  mc:s=>`Midheaven in ${sign(s)}`,
  inHouse:(k,h)=>`${pl(k)} in the ${ordn(h)} house`,
  cusp:(h,s)=>`${ordn(h)} house cusp in ${sign(s)}`,
  planetSign:(k,s)=>`${pl(k)} in ${sign(s)} (${elName(s)} sign)`,
  asp:(a,b,t)=>`${pl(a)}–${pl(b)} ${aspName(t)}`,
  asc:s=>`Ascendant in ${sign(s)}`,
  hdType:t=>`Type: ${typeName(t)}`,
  hdCh:k=>`${chName(k)} (${k})`,
  hdLine:(pf,j,ln)=>`Profile ${pf}: ${j?'unconscious (Design)':'conscious (Personality)'} line ${ln}${lineName(ln)?' ('+lineName(ln)+')':''}`,
  emoAuth:()=>'Emotional authority: wait for the emotional wave to settle before deciding',
  heartDef:()=>`${center('heart')} center defined`,
  heartOpenMoney:()=>`${center('heart')} center open: you may undervalue yourself or overpromise`,
  sacralOpen:()=>`${center('sacral')} center open: no consistent, renewable work energy`,
  spOpen:()=>`${center('sp')} center open: you easily absorb other people’s emotions`,
  spDef:()=>`${center('sp')} center defined: your body rises and falls with your emotional wave`,
  rootOpen:()=>`${center('root')} center open: pressure can easily push you along`,
  mindOpen:(h,a)=>`${h&&a?center('head')+' and '+center('ajna')+' centers':h?center('head')+' center':center('ajna')+' center'} open: prone to overthinking`,
  heartOpenWork:()=>`${center('heart')} center open: you may push yourself too hard to prove yourself`,
  heartLoyal:()=>`${center('heart')} center defined: you do what you say`},
 ui:{
  consTitle:'Where the charts agree',
  agreeSay:(sys,l)=>`${cap(sys)} point to “${l}”. `,
  noneIntro:n=>`When it comes to ${n.toLowerCase()}, the three systems don’t clearly overlap; each sees a different side of you. That doesn’t mean they contradict each other. It means there are several ways ${n.toLowerCase()} can look for you, depending on where you put your energy.`,
  seeSay:(sys,l)=>`${cap(sys)} ${sys.includes(' and ')||sys.startsWith('all ')?'see':'sees'} “${l}”. `,
  tensionTitle:'Two pulls at once',
  tensionSay:(a,b)=>`“${a}” and “${b}” both appear in your charts. `,
  singleTitle:'Another side, seen by one system only',
  paren:s=>` (${s})`,colon:': ',listSep:'; ',
  sysSays:s=>`What ${s} says`,
  snipHead:(pal,b,title)=>`${pn(pal)} palace${b?' (borrowing the opposite palace)':''}: “${title}” `,
  fields:f=>`Good directions: ${f}`,
  noInd:'This chart has no standout indicators for this theme.',
  adviceTitle:'Suggestions for you',
  howTitle:'How the charts are combined',
  howHtml:`<p>The three systems speak different languages: Zi Wei Dou Shu looks at the stars in each palace, Western astrology looks at planets, signs and houses, and Human Design looks at energy centers and channels. This page translates what each system says about the same theme into one shared set of “tendency tags”, then checks which tags are pointed to by two or more systems at once.</p><p>The more systems point to a tendency, the more it deserves your attention. A tendency mentioned by only one system is another side of you, or something that may show up only at certain times.</p><ul><li><b>Career</b>: Zi Wei looks at the Career palace, astrology at the Midheaven and 10th house, and Human Design at your type and channels.</li><li><b>Money</b>: Zi Wei looks at the Wealth palace, astrology at the 2nd and 8th houses, and Human Design at your type, the Heart (Ego) center and related channels.</li><li><b>Love</b>: Zi Wei looks at the Spouse palace, astrology at Venus and the 7th house, and Human Design at your type, profile, authority and channels.</li><li><b>Health</b>: Zi Wei looks at the Health palace, astrology at the Moon, the 6th house and Saturn’s aspects, and Human Design at which centers are defined or open. These are reminders about everyday habits, not medical judgments.</li><li><b>People</b>: Zi Wei looks at the Friends palace, astrology at the Ascendant and 11th house, and Human Design at your profile and channels.</li></ul>`},
 /* Basic view: weave the five themes into one paragraph. w[th]={labels,agree,tension} */
 basic:w=>{
  const ag=n=>n>=3?'all three systems agree':n===2?'two systems agree':'one system';
  const phr=x=>`“${x.labels.join('” and “')}”`,both=x=>`have two forces at once: ${phr(x)}`;
  const L=[],c=w.career,m=w.wealth,l=w.love,p=w.people,h=w.health;
  if(c)L.push(c.tension?`At work, you ${both(c)} (${ag(c.agree)}).`:`At work, your clearest signal is ${phr(c)} (${ag(c.agree)}).`);
  if(m)L.push(m.tension?`With money, you ${both(m)}.`:`Your money pattern leans toward ${phr(m)}.`);
  if(l)L.push(l.tension?`In love, you ${both(l)}.`:`In love, your style is ${phr(l)}.`);
  if(p)L.push(p.tension?`Among people, you ${both(p)}.`:`Among people, you tend to show ${phr(p)}.`);
  if(h)L.push(h.tension?`For your body, you ${both(h)}.`:`For your body, watch out for ${phr(h)}.`);
  return `<p>Lay Zi Wei, your astrology chart and Human Design on top of one another: wherever different systems say the same thing, that is your steadiest underlying color.</p><p>${L.join(' ')}</p>`;}
};
root.Themes=root.Themes||{};root.Themes.en=P;
})(typeof globalThis!=='undefined'?globalThis:this);
