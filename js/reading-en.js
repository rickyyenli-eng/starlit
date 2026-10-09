/* Starlit English reading generator: Western chart, Zi Wei Dou Shu, Human Design */
(function(root){
const h3=(t,k)=>`<h3${k?` data-k="${k}"`:''}>${t}</h3>`, h4=t=>`<h4>${t}</h4>`, p=t=>`<p>${t}</p>`;
const ul=items=>`<ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
const pt=(title,text)=>`<b>${title}</b>: ${cap(text)}`;
const norm=x=>((x%360)+360)%360;
const cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
const lc=s=>s?s.charAt(0).toLowerCase()+s.slice(1):s;
const ord=n=>{const v=n%100;return n+((v>=11&&v<=13)?'th':({1:'st',2:'nd',3:'rd'})[n%10]||'th');};
const andList=a=>a.length<=1?(a[0]||''):a.length===2?`${a[0]} and ${a[1]}`:`${a.slice(0,-1).join(', ')} and ${a[a.length-1]}`;
const STA=()=>globalThis.STORY_WEST_ASC_EN,STW=()=>globalThis.STORY_WEST_EN,SZM=()=>globalThis.STORY_ZW_MING_EN,SZS=()=>globalThis.STORY_ZW_SPOUSE_EN,SZW=()=>globalThis.STORY_ZW_WORK_EN,SHD=()=>globalThis.STORY_HD_EN,SZP=()=>globalThis.STORY_ZW_PAL_EN;
const ZORDER=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];
const comboOf=p=>p.majorStars.map(s=>s.name).sort((a,b)=>ZORDER.indexOf(a)-ZORDER.indexOf(b)).join('·')||'空';
const firstSent=t=>{const m=String(t||'').match(/^[\s\S]*?[.!?]["”’)]?(?=\s|$)/);return m?m[0]:t;};
const scene=t=>`<p class="scene">${t}</p>`;
/* brightness markers {{B:star:bright|dim}} are resolved by StoryFit (js/story-fit.js) */
const fit=(t,p,src)=>StoryFit.fit(t,p,src);
const PAL_ORDER=['命宮','兄弟','夫妻','子女','財帛','疾厄','遷移','僕役','官祿','田宅','福德','父母'];
const SG=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const signOf=l=>Math.floor(norm(l)/30);
const fmt=l=>{const x=norm(l)%30;return `${Math.floor(x)}°${String(Math.floor((x%1)*60)).padStart(2,'0')}′`;};

/* ===================================================================
   Western chart
   =================================================================== */
const ROLE={
 ASC:['Outer image','Ascendant',[
  [['Direct and lively','People first see you as energetic and quick to act; your face hides nothing.'],['Takes the initiative','You are often the first to step forward, and you come across as brave.'],['Impatient','You walk fast and talk fast, and can seem a bit headstrong.']],
  [['Steady and reliable','You come across as grounded, gentle and unhurried.'],['Good taste','You care about quality and comfort, and your style tends to win people over.'],['Slow to warm up','You hold back at first, but once people know you, you feel very safe to be around.']],
  [['Quick and chatty','You make a lively first impression, react fast and always find something to talk about.'],['Youthful','You often look and seem younger than your age.'],['Changeable','Many interests and fast-jumping topics make you hard to pin down.']],
  [['Gentle and warm','You come across as easy to be around and caring.'],['Guarded','You protect yourself at first and open up only once you know people.'],['Feelings on your face','Whether you are happy or upset, the people around you can tell at a glance.']],
  [['Natural presence','You get noticed the moment you walk in, and carry yourself with confidence.'],['Image-conscious','You care about how you look and how you are seen, and want to make a good impression.'],['Warm-hearted','You are generous with people and love to liven up the room.']],
  [['Neat and careful','You come across as tidy, organized and dependable.'],['Modest and low-key','You don’t like the spotlight; you watch first and act later.'],['Particular','You notice details, and people may think you have high standards.']],
  [['Graceful and polite','You come across as easy to get along with, tactful and stylish.'],['Well liked','You are good at setting a pleasant mood and making people comfortable.'],['Hard to decide','You always seem to be weighing things up and rarely commit quickly.']],
  [['Mysterious and reserved','You come across as deep and hard to read.'],['Piercing gaze','You are observant and often see straight through people.'],['Guarded','You don’t reveal much about yourself; trust has to be built slowly.']],
  [['Cheerful and easygoing','Your first impression is open, funny and easy to be around.'],['Freedom-loving','You seem unbound, always planning the next trip.'],['Outspoken','You speak your mind and are sometimes a little too frank.']],
  [['Mature and steady','You come across as serious, reliable and responsible.'],['Serious','You don’t smile much at first; your humor comes out once people know you.'],['Purposeful','You always seem to know what you want.']],
  [['Unique and individual','You come across as different, with fresh ideas.'],['Friendly but distant','You are polite to everyone, yet hard to get truly close to.'],['Rational','You speak logically and are not easily swayed by emotion.']],
  [['Gentle and kind','Your first impression is usually easygoing and empathetic, with a soft look in your eyes.'],['A little dreamy','You can seem dreamy and relaxed about small things, with an artist’s laid-back air.'],['Absorbs moods','You are sensitive and easily pick up the joys and sorrows of the people around you.']]]],
 Sun:['Core self','Sun',[
  [['Pioneer','You naturally want to be first, and love challenges and starting from scratch.'],['Doer','You act as soon as an idea comes, and hate delay and empty talk.'],['Competitive','Competition fires up your fighting spirit.']],
  [['Seeks stability','You value real results and a stable life.'],['Staying power','Once you commit, you see it through step by step.'],['Enjoys life','You appreciate good food, beautiful things and comfort.']],
  [['Curious','You need a steady flow of new information and are fascinated by the world.'],['Communicator','You are good at expressing ideas and connecting people.'],['Many-sided','You develop several interests at once and hate being boxed in.']],
  [['Feeling-centered','Family and the people close to you are at your core.'],['Protector','You have a strong urge to care for and guard the people you love.'],['Sentimental','You treasure memories and a sense of belonging.']],
  [['Confident and radiant','You need to be seen, and you are willing to step on stage.'],['Generous and warm','You are open-handed and love to make the people around you happy.'],['Sense of honor','Dignity matters to you, and you want to do things well.']],
  [['Perfectionist','You want to get things right and do them well.'],['Service-minded','Helping others gives you a sense of achievement.'],['Analytical','You are good at sorting out details and spotting problems.']],
  [['Seeks balance','You value fairness, harmony and beauty.'],['Relationship-oriented','You see yourself most clearly in one-to-one relationships.'],['Diplomatic','You are good at reconciling different points of view.']],
  [['Depth','Surfaces don’t satisfy you; you always want to see to the core.'],['Strong will','Once you commit, you go all in.'],['Power to transform','After a low point you often rise again, renewed.']],
  [['Seeks meaning','You want to know where life is heading and why.'],['Optimistic','You believe tomorrow will be better and have a natural faith.'],['Explorer','Travel, learning and philosophy all draw you in.']],
  [['Ambitious','You have clear goals and are willing to work for the long haul.'],['Responsible','You often carry more responsibility than others.'],['Late bloomer','The older you get, the more you achieve.']],
  [['Independent and rational','Deep down you are very clear-headed; you love to think and you value independence and freedom.'],['Thinks outside the box','You see things with your own logic, don’t follow trends, and have original ideas.'],['Humanitarian','You can seem cool or detached, but you really care about groups and social issues.']],
  [['Empathetic','You can feel other people’s pain and are naturally compassionate.'],['Imaginative','Art, music and spirituality all move you.'],['Blurry boundaries','You easily sacrifice yourself for others and need to learn to protect yourself.']]]],
 Moon:['Inner world and emotions','Moon',[
  [['Straight to the point','Your emotional reactions are fast and direct; you can’t keep things to yourself.'],['Impatient','Inside you are a little restless, eager for quick results and irritated by dragging things out.'],['Fiery','When feelings flare you are full of drive and fight, but it passes as fast as it comes.']],
  [['Emotionally steady','You don’t swing up and down easily, and you need a stable rhythm in life.'],['Material security','Savings, good food and a comfortable home put you at ease.'],['Stubborn','When you are upset, you tend to shut down and not budge.']],
  [['Talks it through','Chatting or writing it down helps you feel better.'],['Changeable moods','Your feelings shift quickly and you need novelty.'],['Intellectualizes','You sometimes analyze to avoid what you really feel.']],
  [['Rich feelings','Your emotions are delicate, and you need to be cared for and to belong.'],['Home is your harbor','You feel safest at home with family.'],['Easily hurt','A single remark can stay with you for a long time.']],
  [['Needs recognition','You are happiest when you are appreciated and valued.'],['Warm and generous','You are very generous with the people you care about.'],['Proud','When hurt you act tough, but inside it really matters to you.']],
  [['Worrier','Part of you is always checking what isn’t good enough.'],['Calmed by doing','Once things are in order, your emotions settle.'],['Hard on yourself','You need to learn to be gentle with yourself.']],
  [['Avoids conflict','You often swallow your complaints to keep the peace.'],['Needs company','Your feelings are steadiest when you have someone to share with.'],['Values beauty','A beautiful setting helps you relax.']],
  [['Feels deeply','Your emotions are intense; you love and hate wholeheartedly.'],['Keeps it hidden','You hold your feelings deep and open up only with trust.'],['Need for control','When you feel insecure, you want to control everything.']],
  [['Needs room to breathe','Being tied down makes you feel suffocated.'],['Optimistic healer','Travel, learning or a good laugh lifts your mood.'],['Avoids heaviness','You don’t like dealing with clingy, heavy emotions.']],
  [['Restrained','You tend to put feelings away and deal with business first.'],['Security through achievement','You feel safe when things are under control.'],['Cool outside, warm inside','You care a lot, but you are not good at showing it.']],
  [['Keeps distance','You need personal space, and you lean rational about feelings.'],['Values friendship','Friends feel easier to you than clingy relationships.'],['Sudden withdrawal','When emotions get too much, you go cool and pull back.']],
  [['Soft and sensitive','You are easily affected by the atmosphere and other people’s moods.'],['Recharges alone','Crowds tire you out; you need quiet time.'],['Rich imagination','You often build beautiful pictures in your mind.']]]],
 Venus:['Love and values','Venus',[
  [['Makes the first move','If you like someone you tell them, and you hate long ambiguity.'],['Falls fast','Feelings arrive quickly and burn hot.'],['Needs novelty','Too much routine makes you look for excitement.']],
  [['Loyal and steady','Once you choose someone, you are fully committed.'],['Sensual','Holding hands, hugging and sharing good food are your love language.'],['Practical','You look at whether a partner can give you a secure life.']],
  [['Meeting of minds','Good conversation matters more than looks.'],['Light and fun','You like relationships that are playful, not heavy.'],['Easily distracted','You may be interested in several people at once.']],
  [['Caring partner','You show love by looking after and being there.'],['Longs for family','For you, love ends in building a warm home.'],['Needs security','Steady responses from your partner matter a lot.']],
  [['Romantic and generous','You like grand, passionate love with a sense of occasion.'],['Wants adoration','You want your partner to treat you as the one and only.'],['Loyal','You love proudly and faithfully.']],
  [['Loves through actions','You quietly take care of your partner’s daily life.'],['Slow and careful','You watch for a long time before you feel safe to commit.'],['Picky','You have high standards and easily see a partner’s flaws.']],
  [['Romantic and elegant','You care about the mood and beauty of a date.'],['Needs a partner','On your own you can feel incomplete.'],['Avoids conflict','To keep the peace, you may shortchange yourself.']],
  [['All in','Love has to reach the soul.'],['Possessive','You need complete loyalty from a partner.'],['All or nothing','Once hurt, it is very hard for you to trust again.']],
  [['Freedom-loving','You need to keep your own space in a relationship.'],['Adventure together','The best dates are traveling or learning something new together.'],['Candid','You like a direct, honest partner.']],
  [['Takes love seriously','You treat a relationship as a long-term commitment.'],['Slow to open up','You don’t show much at first, but you are very dependable.'],['Practical about love','You think about real-life circumstances and future plans.']],
  [['Friends first','Being friends before lovers feels most natural.'],['Needs space','You can’t stand a clingy relationship.'],['Drawn to the unusual','You are attracted to people who stand out.']],
  [['Deeply romantic','In love you are full of self-sacrifice and long for a soul connection.'],['Soft-hearted','With someone you like, you soften and give in easily, and can drift into unrealistic romantic fantasies.'],['Unconditional love','You can accept a partner’s flaws, but be careful not to be taken advantage of.']]]],
 Mercury:['Thinking and communication','Mercury',[
  [['Quick reactions','You say what you think and decide fast.'],['Blunt','You don’t beat around the bush, and sometimes come on too strong.']],
  [['Slow and sure','You think slowly but thoroughly, and speak once you are clear.'],['Practical','You are only interested in useful knowledge.']],
  [['Quick mind','You learn anything fast and easily connect ideas.'],['Talkative','You are a good talker with lots of information.']],
  [['Thinks through feeling','You have a good memory, especially for emotional moments.'],['Gentle speech','You care how the other person feels.']],
  [['Charismatic speaker','You speak persuasively and with stage presence.'],['Confident and firm','Once you hold a view, you don’t change it easily.']],
  [['Rigorous logic','You are good at analyzing, organizing and finding errors.'],['Precise','You choose your words carefully.']],
  [['Mediator','You can see both sides.'],['Tactful','You know how to frame your opinions.']],
  [['Insightful','You get straight to the heart of things.'],['Reserved','You don’t share all your thoughts easily.']],
  [['Big-picture thinker','You see the overall direction and dislike digging into details.'],['Frank','You speak plainly and love to talk about principles.']],
  [['Practical thinker','You plan thoroughly and focus on results.'],['Concise','Your words carry weight.']],
  [['Independent thinker','Your ideas are progressive and creative.'],['Loves debate','You enjoy challenging accepted ideas with logic.']],
  [['Intuitive thinker','You understand the world through feelings and images.'],['Imaginative','Suited to creative work, but watch the details.']]]],
 Mars:['Action and desire','Mars',[
  [['Full of drive','Strong at taking action: once you say it, you do it.'],['Quick temper','Anger comes fast and goes fast.']],
  [['Endurance','You go slowly but never give up.'],['Stubborn','Once angry, you are hard to calm down.']],
  [['Multitasker','You run several things at once.'],['Fights with words','In conflict you tend to argue rather than act.']],
  [['Fights to protect','You are especially brave for family and the people you care about.'],['Emotional','Anger often turns into the silent treatment or sulking.']],
  [['Passionate','You work with flair and want to do things impressively.'],['Needs a stage','You are most motivated when you are seen.']],
  [['Efficient','You work methodically and pay attention to detail.'],['Anxious','Under pressure you can become critical of yourself and others.']],
  [['Negotiates first','You don’t like head-on confrontation.'],['Fights for fairness','You step in when you see injustice.']],
  [['Determined','Once the goal is set, you give it everything.'],['Holds grudges','You keep anger in and remember for a long time.']],
  [['Acts for ideals','You are motivated only by things that mean something.'],['Adventurous','You are quick to pack up and go.']],
  [['Strategic','You plan long term and proceed step by step.'],['Can endure hardship','Your stamina and self-discipline are strong.']],
  [['Does it your way','You hate being told what to do.'],['Acts for a cause','You are strongest when fighting for a group or a belief.']],
  [['Goes with the flow','You act on intuition and inspiration.'],['Avoids conflict','You can seem passive and need to practice speaking up.']]]]
};
const OUTER=['passionate and direct','calm and grounded','quick and lively','gentle and warm','confident and radiant','careful and low-key','graceful and tactful','mysterious and deep','cheerful and easygoing','mature and steady','unique and a little detached','soft and dreamy'];
const INNER=['fiery and impatient','longing for stability','curious and changeable','sensitive and sentimental','hungry for recognition','prone to worry','afraid of conflict','intense in love and anger','longing for freedom','restrained and self-controlled','calm and detached','soft and easily moved'];
const ELQ={fire:'passionate',earth:'practical',air:'rational',water:'emotional'};const ELN={fire:'Fire',earth:'Earth',air:'Air',water:'Water'};
const EL=['fire','earth','air','water'];
const NODE_TXT=['You are here to learn independence and to trust your own instincts and courage, rather than living only for others.','You are here to build your own stability and sense of worth, letting go of reliance on crises and other people’s resources.','You are here to learn curiosity, listening and open exchange, letting go of the belief that you already have all the answers.','You are here to learn to tend your inner life and your family, letting go of chasing only achievement and image.','You are here to learn to express yourself boldly and step on stage, letting go of the safety of hiding in the crowd.','You are here to learn practicality, service and care for details, letting go of the urge to escape reality.','You are here to learn cooperation and listening to others, letting go of doing everything on your own.','You are here to learn deep connection and sharing, letting go of clinging to material security.','You are here to learn to trust your intuition and a bigger meaning, letting go of anxiety over information and details.','You are here to learn to take on responsibility and build a career, letting go of over-reliance on home.','You are here to learn to contribute to the group and embrace your uniqueness, letting go of the need for a personal spotlight.','You are here to learn trust, surrender and spirituality, letting go of over-control and fault-finding.'];
const HOUSE=['self-image and first impressions','money, possessions and self-worth','communication, learning and siblings','family, roots and your inner safe place','romance, fun, creativity and children','daily work, routines and health','partners, collaboration and one-to-one relationships','shared resources, intimacy and deep change','travel, beliefs and higher learning','career, status and public image','friends, communities and hopes for the future','the subconscious, solitude and what stays hidden'];
const PN={Sun:'Sun',Moon:'Moon',Mercury:'Mercury',Venus:'Venus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturn',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluto',Node:'North Node',ASC:'Ascendant',MC:'Midheaven'};
const THEME={Sun:'sense of self',Moon:'emotional life',Mercury:'thinking',Venus:'love life',Mars:'drive',Jupiter:'growth',Saturn:'sense of duty',Uranus:'urge to break free',Neptune:'dreams',Pluto:'power to transform',ASC:'outer image',MC:'career direction'};
const ASP=[['conjunct','the two forces are bound together and amplify each other'],['sextile','a helpful link that works once you take the first step'],['square','they pull against each other; it can feel stuck, but it pushes you to grow'],['trine','naturally smooth; they work together with little effort'],['opposite','you swing between the two and need to find balance']];
const DIG={Sun:{d:[4],e:[0],x:[10],f:[6]},Moon:{d:[3],e:[1],x:[9],f:[7]},Mercury:{d:[2,5],e:[5],x:[8,11],f:[11]},Venus:{d:[1,6],e:[11],x:[7,0],f:[5]},Mars:{d:[0,7],e:[9],x:[6,1],f:[3]},Jupiter:{d:[8,11],e:[3],x:[2,5],f:[9]},Saturn:{d:[9,10],e:[6],x:[3,4],f:[0]},Uranus:{d:[10],e:[],x:[4],f:[]},Neptune:{d:[11],e:[],x:[5],f:[]},Pluto:{d:[7],e:[],x:[1],f:[]}};
const DIG_TXT={d:['in domicile','On home ground, its energy is pure and flows naturally.'],e:['exalted','Like an honored guest, its strengths are magnified.'],x:['in detriment','In unfamiliar territory, it has to work harder or express itself in unusual ways.'],f:['in fall','Its energy is held back and takes practice to express.']};
const RULER=['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
const MODERN={7:'Pluto',10:'Uranus',11:'Neptune'};
const TRANSIT={Jupiter:'over the coming year, this area tends to bring opportunities, helpful people and growth.',Saturn:'over these two or three years, this area asks you to face reality and set rules; it is hard work, but it leaves solid results.',Uranus:'in these years, this area brings unexpected changes, and new freedom with them.',Neptune:'boundaries in this area blur; inspiration grows, but guard against confusion and wishful thinking.',Pluto:'this area is going through a deep, long-term transformation, and old patterns will be completely renewed.'};
const HIT_TONE={conj:'a strong activation',good:'smooth support',bad:'brings challenges and adjustments'};

function dignity(k,s){const g=DIG[k];if(!g)return null;const out=[];for(const t of ['d','e','x','f'])if(g[t].includes(s))out.push(t);return out.length?out:null;}

function readWest(W,E){
  const P=W.pos;let o=[];
  const s=k=>signOf(k==='ASC'?W.asc:P[k].lon);
  const sun=s('Sun'),moon=s('Moon'),asc=s('ASC'),ven=s('Venus');
  const els=[...new Set([sun,moon,asc].map(i=>EL[i%4]))];
  const opp=(els.includes('fire')&&els.includes('water'))||(els.includes('earth')&&els.includes('air'));
  let mix;
  if(els.length===1)mix=`someone who is the same inside and out, with a very clear ${ELQ[els[0]]} streak`;
  else mix=`${opp?'a one-of-a-kind bundle of contradictions':'a many-sided personality'} who is ${andList(els.map(e=>ELQ[e]))} all at once`;
  o.push(h3('Your signs at a glance'));
  o.push(p(`This combination (Sun in ${SG[sun]}, Ascendant in ${SG[asc]}, Moon in ${SG[moon]}, Venus in ${SG[ven]}) describes someone who is ${OUTER[asc]} on the outside and ${INNER[moon]} on the inside: ${mix}.`));
  if(STA())o.push(p(STA().ascSun[asc][sun]));
  if(STW())o.push(p(STW().sunMoon[sun][moon]));
  let n=1;const basic=o;
  for(const k of ['ASC','Sun','Moon','Venus','Mercury','Mars']){
    const [title,pname,data]=ROLE[k];const i=s(k);
    if(k==='Mercury'){o=[];o.push(h3('More sign placements','w-more'));}
    o.push(h4(`${n++}. ${title}: ${pname} in ${SG[i]}`));
    o.push(ul(data[i].map(([a,b])=>pt(a,b))));
    if(STW()&&STW().scenes[k]&&STW().scenes[k][i])o.push(scene(STW().scenes[k][i]));
  }
  /* houses */
  o.push(h3('Planets in houses','w-houses'));
  o.push(ul(['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'].map(k=>pt(`${PN[k]} in the ${ord(P[k].house)} house`,`your ${THEME[k]} goes mainly into ${HOUSE[P[k].house-1]}.`))));
  /* dignity */
  const dg=[];
  for(const k of E.PK){const d=dignity(k,s(k));if(d)dg.push(pt(`${PN[k]} ${d.map(t=>DIG_TXT[t][0]).join(' and ')} (${SG[s(k)]})`,d.map(t=>DIG_TXT[t][1]).join(' ')));}
  o.push(h3('Planetary strength (dignity and debility)','w-dignity'));
  o.push(dg.length?ul(dg):p('No planet is in domicile, exaltation, detriment or fall, so all of them work at a neutral strength.'));
  /* rulers */
  const ar=RULER[asc],mr=MODERN[asc];
  const ruleLine=k=>`${PN[k]} in ${SG[s(k)]}, ${ord(P[k].house)} house`;
  o.push(h3('Chart ruler and house rulers','w-rulers'));
  o.push(p(`With a ${SG[asc]} Ascendant, your chart ruler is <b>${PN[ar]}</b> (${ruleLine(ar)})${mr?`, and modern astrology adds <b>${PN[mr]}</b> as co-ruler (${ruleLine(mr)})`:''}. Wherever the chart ruler sits, the focus of your life tends to be pulled there: your energy naturally flows toward ${HOUSE[P[ar].house-1]}.`));
  const rows=W.houses.map((c,i)=>{const sg=signOf(c),r=RULER[sg];const own=P[r].house===i+1;return `<tr><td class="mono">${i+1}</td><td>${SG[sg]} ${fmt(c)}</td><td>${PN[r]}${MODERN[sg]?` / ${PN[MODERN[sg]]}`:''}</td><td class="mono">${P[r].house}</td><td>${own?`The ruler is in its own house: you steer ${HOUSE[i]} yourself, and the energy is focused and direct.`:`Matters of ${HOUSE[i]} are worked out through ${HOUSE[P[r].house-1]}.`}</td></tr>`;});
  if(W.equal)o.push(p('Your birthplace is at such a high latitude that the Placidus house system breaks down there, so equal houses are used instead (one house every 30° from the Ascendant).'));
  o.push(`<div class="tablewrap"><table><thead><tr><th>House</th><th>Cusp</th><th>Ruler</th><th>Ruler in house</th><th>Reading</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`);
  /* aspects */
  const personal=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
  const keyAsp=W.asp.filter(a=>a.orb<=4&&(personal.includes(a.a)||personal.includes(a.b))).slice(0,10);
  o.push(h3('Major aspects','w-aspects'));
  o.push(keyAsp.length?ul(keyAsp.map(a=>pt(`${PN[a.a]} ${ASP[a.t][0]} ${PN[a.b]} (orb ${a.orb.toFixed(1)}°)`,(STW()&&STW().aspects[`${a.a}-${a.b}`]&&STW().aspects[`${a.a}-${a.b}`][a.t])||`${cap(THEME[a.a])} and ${THEME[a.b]}: ${ASP[a.t][1]}.`))):p('There are no major aspects within a 4° orb.'));
  /* patterns */
  const pats=patterns(W,E);
  o.push(h3('Aspect patterns and stelliums','w-patterns'));
  o.push(pats.length?ul(pats):p('There is no grand trine, T-square, grand cross, yod or stellium, so your energy is spread fairly evenly.'));
  /* elements and modes */
  const cnt={fire:0,earth:0,air:0,water:0},md=[0,0,0];
  for(const k of E.PK){const i=s(k);cnt[EL[i%4]]++;md[i%3]++;}
  const MISS={fire:'No Fire: you may hesitate before acting, so light your own fire on purpose and set yourself deadlines.',earth:'No Earth: following through and managing money take extra effort; writing your plans down helps a lot.',air:'No Air: you step back to think less often; talking things over and reading widely help you see the whole picture.',water:'No Water: you express feelings less often; practicing saying how you feel will bring you closer to people.'};
  const MD=[['Cardinal','you like to start new things and are good at getting them going','initiative'],['Fixed','you have stamina and staying power, but change does not come easily','persistence'],['Mutable','you are adaptable and flexible, but can spread yourself thin','flexibility']];
  const mx=Math.max(...md),tops=[0,1,2].filter(i=>md[i]===mx);
  const el=[`Elements across the ten planets: ${EL.map(e=>`${ELN[e]} ${cnt[e]}`).join(', ')}; modes: ${MD.map((m,i)=>`${m[0]} ${md[i]}`).join(', ')}.`,tops.length===1?`Most planets are in ${MD[tops[0]][0]} signs: ${MD[tops[0]][1]}.`:`${andList(tops.map(i=>MD[i][0]))} signs are tied, so you combine ${andList(tops.map(i=>MD[i][2]))}.`];
  EL.filter(e=>cnt[e]===0).forEach(e=>el.push(MISS[e]));
  EL.filter(e=>cnt[e]>=5).forEach(e=>el.push(`A lot of ${ELN[e]} (${cnt[e]} planets): being ${ELQ[e]} is the strongest base note of your chart.`));
  const up=E.PK.filter(k=>P[k].house>=7).length,east=E.PK.filter(k=>[10,11,12,1,2,3].includes(P[k].house)).length;
  el.push(`Hemispheres: ${up} planets above the horizon and ${10-up} below, so ${up>=6?'your energy leans toward the outer world and the social stage':up<=4?'your energy leans toward your inner life, home and private world':'inner and outer life are roughly balanced'}; ${east} in the eastern half and ${10-east} in the western half, so ${east>=6?'you lean toward self-direction, choosing your own path':east<=4?'you tend to fulfill yourself through other people and cooperation':'self-direction and cooperation are roughly balanced'}.`);
  o.push(h3('Elements, modes and hemispheres','w-balance'));o.push(ul(el));
  /* North Node */
  const nd=signOf(P.Node.lon);
  o.push(h3('Life direction (North Node)','w-node'));
  o.push(p(`Your North Node is in ${SG[nd]}, in the ${ord(P.Node.house)} house. ${NODE_TXT[nd]} In this life, your growth points toward ${HOUSE[P.Node.house-1]}.`));
  /* transits */
  const tr=E.transits(W,new Date());
  o.push(h3('Current transits','w-transits'));
  o.push(ul(tr.map(t=>{const hit=t.hits.map(x=>`${ASP[x.t][0]} your natal ${PN[x.n]} (orb ${x.orb.toFixed(1)}°, ${HIT_TONE[x.tone]})`).join('; ');
    return pt(`${PN[t.k]} transiting ${SG[signOf(t.lon)]}, through your natal ${ord(t.house)} house`,`${cap(HOUSE[t.house-1])}: ${TRANSIT[t.k]}${hit?` Right now it is ${hit}.`:''}`);})));
  /* your story (rule-based) */
  const ws=[];
  if(STA())ws.push(`Start with how you meet the world. ${STA().ascSun[asc][sun]}`);
  if(STW())ws.push(`Then look further in. ${STW().sunMoon[sun][moon]}`);
  if(STW()){const mars=s('Mars'),strip=t=>cap(String(t).replace(/^(for example|for instance|say),?\s+/i,''));
    ws.push(`In love, your Venus in ${SG[ven]} often shows up like this: ${strip(STW().scenes.Venus[ven])} When there is a conflict, or something you want to go after, your Mars in ${SG[mars]} takes over: ${strip(STW().scenes.Mars[mars])}`);}
  {const dom=EL.filter(e=>cnt[e]===Math.max(...EL.map(x=>cnt[x])));const miss=EL.filter(e=>cnt[e]===0);
   ws.push(`Step back and look at the whole chart. Your chart ruler ${PN[ar]} sits in your ${ord(P[ar].house)} house, so your life keeps getting pulled toward ${HOUSE[P[ar].house-1]}. Among the ten planets, ${andList(dom.map(e=>ELN[e]))} ${dom.length>1?'are the most common elements':'is the most common element'}, so being ${andList(dom.map(e=>ELQ[e]))} is your base note.${miss.length?` You have no planets at all in ${andList(miss.map(e=>ELN[e]))}, and that is a skill you will need to build on purpose.`:''}`);}
  {const a=keyAsp[0];const t=a&&STW()&&STW().aspects[`${a.a}-${a.b}`]&&STW().aspects[`${a.a}-${a.b}`][a.t];
   if(t)ws.push(`The tightest aspect in your chart is ${PN[a.a]} ${ASP[a.t][0]} ${PN[a.b]} (orb ${a.orb.toFixed(1)}°), and it shows clearly in your life. ${t}`);}
  {const hit=tr.filter(x=>['Saturn','Uranus','Neptune','Pluto'].includes(x.k)).flatMap(x=>x.hits.filter(h=>['Sun','Moon','ASC'].includes(h.n)).map(h=>({...h,k:x.k}))).sort((a,b)=>a.orb-b.orb)[0];
   if(hit)ws.push(`And in these years, ${PN[hit.k]} is ${ASP[hit.t][0]} your natal ${PN[hit.n]} (${HIT_TONE[hit.tone]}). ${{Saturn:'This is a time to face reality and strengthen your foundations. It is hard work, but what you build now will truly be yours.',Uranus:'You will want to break out of your old frame, and life may take a sudden turn. Following your curiosity often leads to good surprises.',Neptune:'Your picture of your own life is changing. Inspiration grows, but things can also get blurry, so double-check important decisions.',Pluto:'This is a period of deep transformation. The old you is slowly stepping aside, and a new strength is growing in its place.'}[hit.k]}`);}
  if(ws.length)o.unshift(h3('Your story','w-story'),...ws.map(p));
  return{basic:basic.join(''),adv:o.join('')};
}
function patterns(W,E){
  const P=W.pos,K=E.PK,out=[],L=k=>P[k].lon,sep=E.sep;
  const near=(a,b,ang,orb)=>Math.abs(sep(L(a),L(b))-ang)<=orb;
  const bySign={},byHouse={};
  for(const k of K){(bySign[signOf(L(k))]=bySign[signOf(L(k))]||[]).push(k);(byHouse[P[k].house]=byHouse[P[k].house]||[]).push(k);}
  for(const s in bySign)if(bySign[s].length>=3)out.push(pt(`${SG[s]} stellium (${bySign[s].map(k=>PN[k]).join(', ')})`,`your energy is highly concentrated here, and ${SG[s]} traits become a very clear signature of yours.`));
  for(const h in byHouse)if(byHouse[h].length>=3)out.push(pt(`${ord(+h)} house stellium (${byHouse[h].map(k=>PN[k]).join(', ')})`,`a great deal of your life’s attention goes to ${HOUSE[h-1]}.`));
  for(let i=0;i<K.length;i++)for(let j=i+1;j<K.length;j++)for(let k=j+1;k<K.length;k++){
    const a=K[i],b=K[j],c=K[k];
    if(near(a,b,120,7)&&near(b,c,120,7)&&near(a,c,120,7))out.push(pt(`Grand trine (${PN[a]}, ${PN[b]}, ${PN[c]})`,'your talents flow easily and things come naturally, but you may settle into your comfort zone, so challenge yourself on purpose.'));
  }
  for(let i=0;i<K.length;i++)for(let j=i+1;j<K.length;j++){
    const a=K[i],b=K[j];if(!near(a,b,180,8))continue;
    for(const c of K){if(c===a||c===b)continue;if(near(a,c,90,7)&&near(b,c,90,7))out.push(pt(`T-square (${PN[a]} opposite ${PN[b]}, with ${PN[c]} at the apex)`,`the pressure focuses on ${PN[c]} and your ${THEME[c]}; this tension is the engine that drives you forward.`));}
  }
  for(let i=0;i<K.length;i++)for(let j=i+1;j<K.length;j++){
    const a=K[i],b=K[j];if(!near(a,b,60,4))continue;
    for(const c of K){if(c===a||c===b)continue;if(near(a,c,150,2.5)&&near(b,c,150,2.5))out.push(pt(`Yod, the Finger of God (${PN[a]} and ${PN[b]} pointing to ${PN[c]})`,`a special sense of mission centers on your ${THEME[c]}, and it often calls for constant adjustment.`));}
  }
  return [...new Set(out)];
}

/* ===================================================================
   Zi Wei Dou Shu
   =================================================================== */
const STEM_MUT={'甲':['廉貞','破軍','武曲','太陽'],'乙':['天機','天梁','紫微','太陰'],'丙':['天同','天機','文昌','廉貞'],'丁':['太陰','天同','天機','巨門'],'戊':['貪狼','太陰','右弼','天機'],'己':['武曲','貪狼','天梁','文曲'],'庚':['太陽','武曲','太陰','天同'],'辛':['巨門','太陽','文曲','文昌'],'壬':['天梁','紫微','左輔','武曲'],'癸':['破軍','巨門','太陰','貪狼']};
const MK=['祿','權','科','忌'];
const DOM={'命宮':'yourself and your overall fortune','兄弟':'siblings and friends','夫妻':'love and partnership','子女':'children, investments and partnerships','財帛':'money','疾厄':'health','遷移':'travel and life away from home','僕役':'your network and the people under you','官祿':'career','田宅':'home and property','福德':'inner life and enjoyment','父母':'elders, bosses and paperwork'};
const LU={'命宮':'you are well liked and blessed, and easily win people’s goodwill and resources.','兄弟':'siblings and friends help you, and partnerships tend to pay off.','夫妻':'your partner is your lucky star; love life is sweet, and you may benefit through your partner.','子女':'you have a good bond with children, and it favors investments, partnerships and romance.','財帛':'there are many ways to earn and money flows smoothly; you know how to enjoy what it brings.','疾厄':'your constitution is good and you are easygoing, though you may also love your food a little too much.','遷移':'you meet helpful people away from home and do better elsewhere than where you grew up.','僕役':'friends, colleagues and staff give you a boost; your network is your net worth.','官祿':'work goes smoothly, with chances for promotion and growth.','田宅':'home life is happy and property luck is good; family gives you a sense of stability.','福德':'you know how to enjoy life, stay cheerful and feel rich in spirit.','父母':'you have a good bond with parents and elders and enjoy their protection; it also favors paperwork and exams.'};
const JI={'命宮':'you set high standards for yourself and tend to overthink, worry and wear yourself out.','兄弟':'knots form easily between you and siblings or friends; be careful with partnerships and lending.','夫妻':'love has more twists and turns; misunderstandings easily lead to arguments, and your partner matters deeply to you.','子女':'you worry about children, and need to be careful with investments and partnerships.','財帛':'money is a worry; income and spending swing a lot, so avoid high-risk speculation.','疾厄':'watch your health and avoid overwork; stress builds up in your body easily.','遷移':'life away from home is harder, and you may meet obstacles or gossip out there.','僕役':'choose friends carefully; friends, colleagues or staff can drag you down.','官祿':'work brings heavy pressure and you hold on tight to your career, which often has ups and downs.','田宅':'home and property bring worries, and saving money takes discipline.','福德':'you think a lot, find it hard to relax, and carry mental stress.','父母':'communication with parents, elders or bosses is not easy; be careful with documents and contracts.'};
const JI_ADV={'命宮':'Stop overthinking and give yourself some slack.','兄弟':'Avoid money dealings with friends and family, and don’t act as a guarantor.','夫妻':'Mind your words: listen more and don’t drag up old grievances.','子女':'Invest conservatively and avoid rushing into partnerships.','財帛':'Keep spending conservative and avoid high-risk speculation.','疾厄':'Keep regular hours, get check-ups and avoid overwork.','遷移':'Take care on the road and keep a low profile when away from home.','僕役':'Choose partners carefully and don’t guarantee anyone’s debts.','官祿':'Work step by step and get advice before big decisions.','田宅':'Think twice about buying, selling or renovating property, and read contracts closely.','福德':'Schedule time to relax and avoid draining yourself emotionally.','父母':'Read documents and contracts carefully, and keep a record of talks with your boss.'};
const STAR_JI={'太陽':'Take care in dealings with older men or bosses, keep records to protect your reputation, and keep a steady routine so you do not wear yourself out.','武曲':'Watch your cash flow and think twice before big spending or major money decisions.','太陰':'Watch relationships with women, financial planning, low moods and sleep.','天同':'Watch mood swings, laziness and overindulgence, which eat into your blessings.','貪狼':'Watch excessive desires, romantic entanglements and too much socializing.','巨門':'Watch gossip, misunderstandings and suspicion; talk less and listen more.','天機':'Watch overthinking, plans that keep changing and wavering decisions.','廉貞':'Be a little more careful with paperwork and disputes, keep clear boundaries in love, rest when stress builds up, and stay safe when out and about.','文昌':'Watch for mistakes in documents, contracts and exams; check every word before you sign, and don’t act as a guarantor.','文曲':'Watch slips of the tongue, errors in paperwork and verbal promises in love.'};
const STAR_LU={'廉貞':'Networking and public relations bring opportunities, and it also favors love.','破軍':'Money comes through new ventures and change; dare to change and you will gain.','天機':'Ideas and planning pay off; it suits work that uses your head.','天同':'Blessings and enjoyment increase; you are well liked and in good spirits.','太陰':'It favors saving, property and help from women; wealth flows in steadily.','貪狼':'Socializing, talents and romance bring opportunities.','武曲':'Earned income is strong; it suits investing, money management and hands-on work.','太陽':'Reputation and helpful people are favored; your efforts get noticed.','巨門':'Your words earn money; it suits making a living through speaking or expertise.','天梁':'Elders protect you and bad luck turns to good; it favors public service, insurance and medicine.'};
const SUN_POS={'寅':'the sun is rising in the east and its light is growing','卯':'the morning sun is climbing (Sun over Thunder Gate), full of vitality','辰':'the sun is nearing its height, shining strongly','巳':'the sun is high and bright, radiating warmth','午':'the sun is at noon (Golden Radiance), at its brightest','未':'the afternoon sun is turning west but still warm','申':'the sun is sinking west and its light is fading','酉':'the sun is setting and its light is fading. You are warm-hearted, but sometimes you give a lot without getting the same gratitude back, which can leave you feeling lonely and powerless','戌':'the sun has set behind the hills; its light is drawn in, and your kindness can go unnoticed','亥':'the sun has gone into the night; its light is hidden, and you tend to give more than you get back','子':'this is a midnight sun; it takes effort over time for you to shine','丑':'dawn is about to break, but the light has not yet appeared'};
const MOON_POS={'寅':'the moon is setting as day breaks, and its light is faint','卯':'the moon fades as the sun rises, and its light barely shows','辰':'this is a daytime moon, with weaker strength','巳':'this is a daytime moon, its light hidden by the sun','午':'this is a noon moon, at its weakest','未':'this is an afternoon moon, its light starting to rise','申':'the moon is rising in the east and growing brighter','酉':'the moon is rising in the east and its clear light is appearing','戌':'the moon hangs high in the sky, bright and clear','亥':'the moon shines at Heaven’s Gate, at its brightest','子':'the moon is bright at midnight, full of clear light','丑':'the moon is close to setting, but still glowing'};
const ADJ={'天刑':['Tian Xing (Punishment)','self-disciplined and rule-minded; it can also point to legal trouble and cuts.'],'天姚':['Tian Yao (Allure)','a romance star: charming and good at flirting.'],'紅鸞':['Hong Luan (Red Phoenix)','a joyful romance star for marriage, love and popularity.'],'天喜':['Tian Xi (Celebration)','a star of happy events: celebrations and new arrivals in the family.'],'咸池':['Xian Chi (Pool of Desire)','a romance star: strong appeal to others, but also romantic trouble.'],'華蓋':['Hua Gai (Canopy)','aloof and self-contained, with a gift for religion or art; you enjoy solitude.'],'孤辰':['Gu Chen (Lonely Star)','a sense of loneliness; you prefer working on your own.'],'寡宿':['Gua Su (Solitary Star)','a lonely streak; in love, time together may be scarce.'],'天哭':['Tian Ku (Weeping)','prone to worry and melancholy.'],'天虛':['Tian Xu (Emptiness)','an inner emptiness, and a tendency to overstate things.'],'三台':['San Tai (Three Terraces)','status and presence; it helps promotion.'],'八座':['Ba Zuo (Eight Seats)','rank and honor; it helps your reputation.'],'恩光':['En Guang (Grace)','you receive kindness and recognition from others.'],'天貴':['Tian Gui (Nobility)','dignity and helpful patrons.'],'台輔':['Tai Fu (Minister)','support from others and a chance to be promoted.'],'封誥':['Feng Gao (Honors)','honors and rewards.'],'天才':['Tian Cai (Talent)','clever and gifted.'],'天壽':['Tian Shou (Longevity)','long life and steadiness.'],'龍池':['Long Chi (Dragon Pool)','artistic skill and good taste.'],'鳳閣':['Feng Ge (Phoenix Pavilion)','a way with words and an eye for beauty.'],'天官':['Tian Guan (Office)','official honors; good for a career in public life.'],'天福':['Tian Fu (Blessings)','blessings and enjoyment.'],'天巫':['Tian Wu (Shaman)','a spiritual bent; it can also point to promotion and inheritance.'],'天月':['Tian Yue (Sickly Moon)','watch out for minor ailments; your constitution is a bit delicate.'],'陰煞':['Yin Sha (Hidden Harm)','you may run into petty people or interference behind your back.'],'天空':['Tian Kong (Sky Void)','lofty ideals, but material plans may come to nothing.'],'截路':['Jie Lu (Roadblock)','things tend to get blocked halfway.'],'旬空':['Xun Kong (Void)','things may fall through or prove hollow.'],'空亡':['Kong Wang (Emptiness)','wasted effort: twice the work for half the result.'],'解神':['Jie Shen (Relief)','the ability to defuse trouble.'],'年解':['Nian Jie (Yearly Relief)','eases the difficulties of the year.'],'天德':['Tian De (Heavenly Virtue)','blessings that turn bad luck into good.'],'月德':['Yue De (Lunar Virtue)','defuses trouble and brings good rapport.'],'天廚':['Tian Chu (Kitchen)','a love of good food and a fine palate.'],'蜚廉':['Fei Lian (Gossip)','tends to attract gossip and disputes.'],'破碎':['Po Sui (Broken)','things tend to get damaged or left incomplete.'],'天傷':['Tian Shang (Injury)','watch out for losses and damage.'],'天使':['Tian Shi (Messenger)','watch your health and guard against accidents.'],'龍德':['Long De (Dragon Virtue)','turns bad luck into good.']};
const PEACH=['貪狼','廉貞','天姚','紅鸞','天喜','咸池'];
const ZODIAC={'鼠':'Rat','牛':'Ox','虎':'Tiger','兔':'Rabbit','龍':'Dragon','蛇':'Snake','馬':'Horse','羊':'Goat','猴':'Monkey','雞':'Rooster','狗':'Dog','豬':'Pig'};
const FE={'水':'Water','木':'Wood','金':'Metal','土':'Earth','火':'Fire'},FN={'二':2,'三':3,'四':4,'五':5,'六':6};
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const timeEN=t=>{const s=String(t||'');const b=s.replace(/[早晚時]/g,'');return `${s.startsWith('早')?'early ':s.startsWith('晚')?'late ':''}${b} hour`;};
const feEN=f=>{const s=String(f||'');return FE[s[0]]&&FN[s[1]]?`${FE[s[0]]}-${FN[s[1]]} class`:s;};

function readZW(Z,ctx){
  const M=ctx.major,MINOR=ctx.minor,BR=ctx.bright,PAL=ctx.palDesc;
  const S=n=>ctx.star(n),ML=k=>ctx.mutLabel(k),BL=b=>ctx.brightLabel(b);
  const SN=n=>ADJ[n]?ADJ[n][0]:S(n);
  const mt=(star,k)=>`${S(star)} ${ML(k)}`;
  const pal=Z.palaces,o=[];
  const idx=n=>pal.findIndex(x=>x.name===n);
  const pn=n=>`${ctx.palName(n)} palace`;
  const allStars=i=>[...pal[i].majorStars,...pal[i].minorStars,...pal[i].adjectiveStars];
  const has=(i,n)=>allStars(i).some(s=>s.name===n);
  const findStar=n=>pal.findIndex((x,i)=>allStars(i).some(s=>s.name===n));
  const sfz=i=>[i,(i+4)%12,(i+8)%12,(i+6)%12];
  const hasIn=(set,n)=>set.some(i=>has(i,n));
  const ming=idx('命宮'),body=pal.findIndex(x=>x.isBodyPalace);
  const sTxt=s=>S(s.name)+(s.brightness?`<small class="br"> [${BL(s.brightness)}]</small>`:'')+(s.mutagen?' '+ML(s.mutagen):'');
  const stLine=i=>{const m=pal[i].majorStars.map(sTxt);return m.length?m.join(', '):'no main star';};
  const minorLine=i=>pal[i].minorStars.map(sTxt).join(', ');
  const comboTxt=c=>c==='空'?'no main star':andList(c.split('·').map(S));
  const oppOf=i=>pal[(i+6)%12];
  const fitAt=(t,i)=>fit(t,pal[i],oppOf(i).majorStars);
  const borrowed=(oc,t)=>`This palace has no main star of its own, so it borrows ${comboTxt(oc)} from the opposite palace. Read that way: ${t}`;
  function brNote(p){const st=p.majorStars;if(!st.length)return '';
    const weak=st.filter(s=>['陷','不'].includes(s.brightness)).map(s=>`${S(s.name)} (${BL(s.brightness)})`),strong=st.filter(s=>s.brightness==='廟').map(s=>S(s.name));
    return (strong.length?` ${andList(strong)} ${strong.length>1?'are':'is'} at full brightness here, so these qualities come through completely.`:'')+(weak.length?` ${andList(weak)} ${weak.length>1?'are':'is'} dim here, though, so the strengths above take more effort to bring out, and the weak spots show more.`:'');}
  const mutNote=(s,nm)=>cap((s.mutagen==='祿'?LU:s.mutagen==='忌'?JI:{})[nm]||(s.mutagen==='權'?`you take a strong lead in ${DOM[nm]}.`:`you tend to earn a good name in ${DOM[nm]}.`));
  const birthMut={};pal.forEach((p,i)=>[...p.majorStars,...p.minorStars].forEach(s=>{if(s.mutagen)birthMut[s.mutagen]={star:s.name,i};}));
  const sd=Z._std,rd=Z.rawDates.lunarDate;
  const yinyang=('甲丙戊庚壬'.includes(Z.rawDates.chineseDate.yearly[0])?'Yang':'Yin')+' '+(Z.gender==='男'?'male':'female');
  const H_={pal,findStar,pn,birthMut,S,ML,mt};

  /* 1. basics */
  o.push(h3('Your Zi Wei Dou Shu chart','z-info'));
  o.push(p(`Born ${MONTHS[sd.getUTCMonth()]} ${sd.getUTCDate()}, ${sd.getUTCFullYear()}, in the ${Z._late?'late Zi hour (charted as the next day’s early Zi hour)':timeEN(Z.time)} (lunar calendar: ${Z.rawDates.chineseDate.yearly.join('')} year, ${rd.isLeap?'leap ':''}month ${rd.lunarMonth}, day ${rd.lunarDay}). You are ${yinyang}, ${feEN(Z.fiveElementsClass)}, born in the year of the ${ZODIAC[Z.zodiac]||Z.zodiac}. Your Life palace is in ${pal[ming].earthlyBranch} and your Body palace is in ${pal[body].earthlyBranch} (the ${pn(pal[body].name)}). Life ruler: ${S(Z.soul)}; Body ruler: ${S(Z.body)}.`));

  /* 2. patterns */
  const pats=zwPatterns(Z,{ming,has,hasIn,sfz,findStar,birthMut,pal,pn,S});
  o.push(h3('Chart patterns','z-patterns'));
  o.push(pats.length?ul(pats):p('Your chart does not form any of the classic major patterns, so the focus is on the main stars in your Life palace and how the four transformations interact.'));

  /* 3. core */
  o.push(h3('Core nature and personality','z-core'));
  const mcombo=comboOf(pal[ming]),ocombo=comboOf(pal[(ming+6)%12]);
  {const ms=SZM()&&SZM().ming[mcombo];
   if(ms){o.push(h4(ms.title));o.push(p(fitAt(ms.image+' '+ms.story,ming)+brNote(pal[ming])));
     if(mcombo==='空'&&SZM().ming[ocombo])o.push(p(borrowed(ocombo,fit(SZM().ming[ocombo].story,oppOf(ming)))));
     o.push(ms.scenes.map(scene).join(''));
     o.push(ul([pt('Strengths',ms.strengths),pt('Blind spots',ms.blind),pt('Advice',ms.advice)]));
     o.push(h4('The stars in detail'));}}
  const mp=pal[ming],opp=pal[(ming+6)%12];
  const items=[];
  const src=mp.majorStars.length?mp.majorStars:opp.majorStars;
  if(!mp.majorStars.length)items.push(pt('No main star in the Life palace',`Your Life palace has no main star, so it borrows ${opp.majorStars.map(s=>S(s.name)).join(' and ')} from the opposite Travel palace. Your personality is very flexible and easily shaped by your surroundings and the people around you. You adapt well, but be careful not to just drift with the crowd.`));
  for(const s of src){const m=M[s.name];if(!m)continue;
    const host=mp.majorStars.length?mp:opp;
    let t=`${m[2]} Strengths: ${lc(m[3])}. Watch out for: ${lc(m[4])}.`;
    if(s.brightness)t+=` Brightness ${BL(s.brightness)}: ${BR[s.brightness]}.`;
    if(s.name==='太陽')t+=` ${S('太陽')} sits in ${host.earthlyBranch}: ${SUN_POS[host.earthlyBranch]}.`;
    if(s.name==='太陰')t+=` ${S('太陰')} sits in ${host.earthlyBranch}: ${MOON_POS[host.earthlyBranch]}.`;
    if(s.mutagen&&mp.majorStars.length)t+=` Its birth-year ${ML(s.mutagen)} sits in your Life palace: ${({'祿':'you are blessed and well liked throughout life.','權':'you have strong opinions and a natural hold on the lead.','科':'you earn a good name, and helpful people appear when trouble comes.','忌':'you are especially hard on yourself, and your life lessons center on yourself.'})[s.mutagen]}`;
    else if(s.mutagen)t+=` This star carries its birth-year ${ML(s.mutagen)} in the Travel palace; borrowed into your Life palace it brings that force along, but less directly than if it sat there.`;
    items.push(pt(`${S(s.name)} (${m[1]})`,t));}
  for(const s of mp.minorStars)if(MINOR[s.name])items.push(pt(S(s.name),MINOR[s.name].replace(/^([A-Z][a-z]+ star): /,'$1 — ')+(s.mutagen?` Its ${ML(s.mutagen)} transformation sits in your Life palace, ${s.mutagen==='忌'?'so take extra care with the matters it rules.':'which amplifies these abilities.'}`:'')));
  for(const s of mp.adjectiveStars)if(ADJ[s.name])items.push(pt(ADJ[s.name][0],cap(ADJ[s.name][1])));
  o.push(p(`Your Life palace is in ${mp.earthlyBranch} (${stLine(ming)}${minorLine(ming)?'; '+minorLine(ming):''}):`));
  o.push(ul(items));
  const sf=sfz(ming);
  o.push(p(`The palaces that support your Life palace (its triad and opposite): Wealth, ${stLine(sf[2])}; Career, ${stLine(sf[1])}; Travel, ${stLine(sf[3])}. The Life palace shows your inborn personality, while these three show how you earn, how you work and how you fare away from home. Read all four together for the full picture.`));

  /* Body palace */
  const bp=pal[body];
  o.push(h4(`Body palace in ${bp.earthlyBranch} (${pn(bp.name)}: ${stLine(body)}${minorLine(body)?'; '+minorLine(body):''})`));
  const bl=[pt('Where your life’s focus goes',`The Body palace shows how you tend to act after about age thirty. ${bp.name==='命宮'?'Yours shares the Life palace, so your inborn nature is also your later focus: being yourself matters most':`Yours is the ${pn(bp.name)}, so from midlife on you will care a great deal about ${DOM[bp.name]}`}.`)];
  if(has(body,'天馬')&&(has(body,'祿存')||bp.majorStars.concat(bp.minorStars).some(s=>s.mutagen==='祿')))bl.push(pt('Lu Ma Jiao Chi in the Body palace','see the pattern notes above; this power to make money on the move lands right on the focus of the second half of your life.'));
  if(has(body,'陀羅'))bl.push(pt('Hidden knots',`${S('陀羅')} sits here, so in this area you tend to overthink and hesitate, and things are easily delayed.`));
  if(has(body,'擎羊'))bl.push(pt('Drive and friction',`${S('擎羊')} sits here: strong drive, but also a tendency to clash with people.`));
  for(const s of bp.majorStars.concat(bp.minorStars))if(s.mutagen)bl.push(pt(mt(s.name,s.mutagen),cap((s.mutagen==='祿'?LU:s.mutagen==='忌'?JI:{})[bp.name]||`${S(s.name)} ${ML(s.mutagen)} makes this area stand out even more.`)));
  o.push(ul(bl));

  /* 4. birth-year transformations */
  o.push(h3('Birth-year transformations','z-birthmut'));
  o.push(p(`Your birth-year stem is ${Z.rawDates.chineseDate.yearly[0]}: ${MK.map(k=>birthMut[k]?mt(birthMut[k].star,k):'').filter(Boolean).join(', ')}.`));
  o.push(ul(MK.filter(k=>birthMut[k]).map(k=>{const b=birthMut[k],pnm=pal[b.i].name,oppn=pal[(b.i+6)%12].name;
    const base=k==='祿'?cap(LU[pnm]):k==='忌'?cap(JI[pnm]):k==='權'?`In ${DOM[pnm]}, you hold the reins and have real ability; you act with energy, but can push too hard.`:`In ${DOM[pnm]}, you tend to earn a good name, and when trouble comes, help or a good solution usually appears.`;
    const extra=k==='忌'?` The Snag sits in your ${pn(pnm)} and clashes with the opposite ${pn(oppn)}, so ${pn(oppn)} matters are affected too.${STAR_JI[b.star]?' '+STAR_JI[b.star]:''}`:k==='祿'?(STAR_LU[b.star]?' '+STAR_LU[b.star]:''):'';
    return pt(`${mt(b.star,k)} in the ${pn(pnm)}`,base+extra);})));

  /* 5. flying transformations */
  o.push(h3('Flying transformations by palace stem','z-fly'));
  const flyRows=pal.map((p,i)=>{const mm=STEM_MUT[p.heavenlyStem];return `<tr><td class="p">${pn(p.name)}</td><td>${p.heavenlyStem}${p.earthlyBranch}</td>${mm.map((star,j)=>{const t=findStar(star);const self=t===i;const chong=t===(i+6)%12;return `<td class="${j===3&&(self||t===ming||chong)?'warn':''}">${S(star)} → ${t<0?'—':ctx.palName(pal[t].name)}${self?' (self)':''}</td>`;}).join('')}</tr>`;});
  o.push(`<div class="tablewrap"><table><thead><tr><th>Palace</th><th>Stem</th><th>${ML('祿')}</th><th>${ML('權')}</th><th>${ML('科')}</th><th>${ML('忌')}</th></tr></thead><tbody>${flyRows.join('')}</tbody></table></div>`);
  const notes=[];
  pal.forEach((p,i)=>{const mm=STEM_MUT[p.heavenlyStem];mm.forEach((star,j)=>{const t=findStar(star);if(t===i)notes.push(pt(`Self-${ML(MK[j])} in the ${pn(p.name)}`,['benefits in this palace come fast and go fast; they are hard to hold on to.','you tend to act on your own in this area; forceful, but not lasting.','the reputation and benefits of this palace show readily; beware of style over substance.','matters in this palace tend to create their own trouble or fizzle out unfinished.'][j]));});
    const jt=findStar(mm[3]);if(jt===ming&&i!==ming)notes.push(pt(`${pn(p.name)} sends its ${ML('忌')} into your Life palace`,`matters of ${DOM[p.name]} weigh on you most in life.`));
    if(jt===(ming+6)%12&&i!==ming)notes.push(pt(`${pn(p.name)} sends its ${ML('忌')} against your Life palace`,`matters of ${DOM[p.name]} tend to put direct pressure on you.`));});
  if(notes.length)o.push(ul(notes));

  /* 6. twelve palaces */
  if(SZP()){o.push(h3('Stories of your other palaces','z-palstory'));
    for(const nm of ['兄弟','子女','疾厄','遷移','僕役','田宅','福德','父母']){const i=idx(nm);if(i<0||!SZP()[nm])continue;const c=comboOf(pal[i]);const e=SZP()[nm][c];if(!e)continue;
      o.push(h4(`${cap(pn(nm))}: ${e.title}`));
      o.push(p(`Your ${pn(nm)} is in ${pal[i].earthlyBranch} (${stLine(i)}${minorLine(i)?'; '+minorLine(i):''}). ${fitAt(e.story,i)}${brNote(pal[i])}`));
      if(c==='空'){const oc=comboOf(oppOf(i));const oe=SZP()[nm][oc];if(oe&&oc!=='空')o.push(p(borrowed(oc,fit(oe.story,oppOf(i)))));}
      o.push(e.scenes.map(scene).join(''));
      const mts=[...pal[i].majorStars,...pal[i].minorStars].filter(s=>s.mutagen).map(s=>pt(`${mt(s.name,s.mutagen)} here`,mutNote(s,nm)));
      o.push(ul([pt('Advice',e.advice),...mts]));}}
  o.push(h3('The twelve palaces at a glance','z-palaces'));
  const order=[ming,...[1,2,3,4,5,6,7,8,9,10,11].map(k=>(ming-k+12)%12)];
  o.push(`<div class="tablewrap"><table><thead><tr><th>Palace</th><th>Stem-branch</th><th>Main stars</th><th>Minor stars</th><th>Decade</th><th>What it covers</th></tr></thead><tbody>${order.map(i=>`<tr><td class="p">${pn(pal[i].name)}${pal[i].isBodyPalace?' (Body)':''}</td><td>${pal[i].heavenlyStem}${pal[i].earthlyBranch}</td><td>${stLine(i)}</td><td>${minorLine(i)||'—'}</td><td class="mono">${pal[i].decadal.range.join('–')}</td><td>${PAL(pal[i].name)}</td></tr>`).join('')}</tbody></table></div>`);

  let decInfo=null,yearInfo=null,loveNow='',decTitle='',decStory='';
  /* 7. decade */
  const H0=ctx.horoscope(new Date());
  const H=H0&&H0.decadal.name!=='童限'&&pal[H0.decadal.index]?H0:null;
  if(!H)o.push(h3('Your current decade','z-decade'),p(`You are still in the childhood period (your first decade starts at age ${pal[ming].decadal.range[0]}), or past the twelfth decade, so there is no decade reading for now.`));
  if(H){
    const d=H.decadal,di=d.index,dp=pal[di];
    o.push(h3(`Your current decade (ages ${dp.decadal.range.join('–')}, ${d.heavenlyStem}${d.earthlyBranch} decade)`,'z-decade'));
    o.push(p(`From age ${dp.decadal.range[0]} to ${dp.decadal.range[1]} you are in the decade of your ${pn(dp.name)} (in ${dp.earthlyBranch}). Its main stars: ${stLine(di)}${minorLine(di)?', together with '+minorLine(di):''}.`));
    {const dc=comboOf(dp.majorStars.length?dp:oppOf(di));const de=SZM()&&SZM().decade[dc];
     if(de){decTitle=de.title;decStory=fitAt(de.story,di);o.push(h4(`This chapter: ${de.title}`));o.push(p(decStory));o.push(ul([pt('Biggest opportunity',de.chance),pt('Easiest trap to fall into',de.pitfall)]));}}
    const dl=[];
    for(const s of (dp.majorStars.length?dp.majorStars:pal[(di+6)%12].majorStars)){const m=M[s.name];if(m)dl.push(pt(`A decade led by ${S(s.name)}`,`${m[2]} These traits are amplified over these ten years: ${lc(m[3])}. But also watch out for: ${lc(m[4])}.`));}
    if(has(di,'祿存'))dl.push(pt(`${S('祿存')} in this decade`,`with ${S('祿存')} here, income is fairly stable over these ten years, giving your finances a solid base.`));
    if(has(di,'天馬'))dl.push(pt(`${S('天馬')} in this decade`,'these ten years bring a lot of change and travel, and with them chances away from home.'));
    if(has(di,'擎羊')||has(di,'陀羅'))dl.push(pt(`${S('擎羊')} or ${S('陀羅')} in this decade`,'over these ten years you may meet resistance or delays; go steady rather than rushing.'));
    dl.push(...mutLayer(d.mutagen,'decade',d.palaceNames,{...H_,ming:di,ctxName:'This decade'}));
    {const jt=findStar(d.mutagen[3]);decInfo={range:dp.decadal.range.join('–'),pal:pn(dp.name),star:(dp.majorStars.length?dp.majorStars:pal[(di+6)%12].majorStars).map(x=>S(x.name)).join(', ')||'—',dom:DOM[dp.name],jiStar:d.mutagen[3],
      ji:jt>=0?`${mt(d.mutagen[3],'忌')} falls in your ${pn(pal[jt].name)} (the decade’s ${pn(d.palaceNames[jt])}): ${JI_ADV[d.palaceNames[jt]]}`:''};}
    o.push(ul(dl));
  }

  /* life map */
  if(SZM()){
    const cur=H?H.decadal.index:-1;
    const order=pal.map((x,i)=>i).sort((a,b)=>pal[a].decadal.range[0]-pal[b].decadal.range[0]).filter(i=>pal[i].decadal.range[0]<=95);
    const rel=(t,i)=>PAL_ORDER[(i-t+12)%12];
    o.push(h3('Your life map: one chapter per decade','z-map'));
    o.push(p(`Each decade is a chapter of your life. The chapter title comes from the main stars of that decade’s Life palace, and the “watch” note comes from where that decade’s stem sends its ${ML('忌')} transformation.`));
    o.push(`<ol class="lifemap">${order.map(i=>{const x=pal[i];const de=SZM().decade[comboOf(x.majorStars.length?x:oppOf(i))];
      const mm=STEM_MUT[x.heavenlyStem],jt=findStar(mm[3]);const r=jt>=0?rel(jt,i):'';
      const lead=x.decadal.range[0]<15?'This is the stage of childhood and school, so these traits show up first at home and in the classroom. ':x.decadal.range[0]>=75?'This is the later stage of life, so these traits show up in your daily pace, your family and your health. ':'';
      return `<li class="${i===cur?'now':''}"><div class="age mono">${x.decadal.range.join('–')}</div><div class="ch"><b>${de?de.title:cap(pn(x.name))}</b> <span class="muted">${cap(pn(x.name))} · ${comboTxt(comboOf(x))}</span>${i===cur?' <span class="chip hold">Now</span>':''}<p>${de?lead+fitAt(de.story,i):''}</p>${de?`<p class="mini"><b>Opportunity</b> ${de.chance}</p>`:''}${r?`<p class="mini"><b>Watch</b> ${mt(mm[3],'忌')} falls in this decade’s ${pn(r)}. ${JI_ADV[r]}</p>`:''}</div></li>`;}).join('')}</ol>`);
  }

  /* 8. years */
  let yNow=new Date().getFullYear();
  {const hn=ctx.horoscope(new Date()),hm=ctx.horoscope(ctx.yearMid(yNow));if(hn&&hm&&hn.yearly.earthlyBranch!==hm.yearly.earthlyBranch)yNow--;}
  for(const [yr,full] of [[yNow,true],[yNow+1,false]]){
    const ref=ctx.yearMid(yr);const Hy=ctx.horoscope(ref);if(!Hy||!pal[Hy.yearly.index])continue;
    const y=Hy.yearly,yi=y.index,yp=pal[yi],dec=Hy.decadal;
    const range=ctx.yearRange(yr);
    o.push(h3(`${full?'This year at a glance':'Next year preview'}: ${yr}, the ${y.heavenlyStem}${y.earthlyBranch} year`,full?'z-year':'z-next'));
    o.push(p(`${range?`(${range}) `:''}The yearly Life palace is in ${yp.earthlyBranch} (your natal ${pn(yp.name)}), with main stars ${stLine(yi)}. The year stem ${y.heavenlyStem} triggers: ${y.mutagen.map((s,j)=>mt(s,MK[j])).join(', ')}.`));
    const yl=[];
    if(dec.name!=='童限'&&pal[dec.index]&&yi===dec.index)yl.push(pt('Year and decade meet',`the yearly Life palace overlaps your current decade Life palace (${dp0(pal,dec.index)}), so whatever happens this year, good or bad, hits twice as hard.`));
    yl.push(...mutLayer(y.mutagen,'yearly',y.palaceNames,{...H_,ming:yi,ctxName:full?'This year':'Next year',decMut:dec.name!=='童限'?dec.mutagen:null}));
    o.push(ul(yl));
    if(full)yearInfo={yr,ji:(y.mutagen||[])[3],gz:y.heavenlyStem+y.earthlyBranch,pal:pn(yp.name),star:stLine(yi),meet:dec.name!=='童限'&&pal[dec.index]&&yi===dec.index};
    if(full){
      o.push(h4('Key palaces'));
      const keys=['命宮','財帛','官祿','夫妻','疾厄'];
      o.push(ul(keys.map(k=>{const i=y.palaceNames.indexOf(k);const p=pal[i];const marks=layerMarks(i,{pal,dec,y,findStar,S,ML});
        return pt(`Yearly ${pn(k)}, in ${p.earthlyBranch} (natal ${pn(p.name)})`,`${cap(stLine(i))}.${marks?' '+marks+'.':''}${p.majorStars.length?'':` Empty, so read it through the opposite palace: ${stLine((i+6)%12)}.`}`);})));
      const ys=Hy.yearly.stars||[];
      const fl=[];ys.forEach((arr,i)=>arr.forEach(s=>{if(FLOW[s.name])fl.push(`${flowName(s.name,S,SN)} in the yearly ${pn(y.palaceNames[i])}`);}));
      if(fl.length)o.push(p(`Yearly stars: ${fl.join(', ')}.`));
    }
  }

  /* career and money */
  if(SZW()){o.push(h3('Career and money','z-work'));
    for(const [i,key,lab] of [[idx('官祿'),'career','Work'],[idx('財帛'),'wealth','Money']]){const c=comboOf(pal[i]);const e=SZW()[key][c];if(!e)continue;
      o.push(h4(`${lab} (${pn(pal[i].name)}): ${e.title}`));
      o.push(p(`Your ${pn(pal[i].name)} is in ${pal[i].earthlyBranch} (${stLine(i)}${minorLine(i)?'; '+minorLine(i):''}). ${fitAt(e.story,i)}${brNote(pal[i])}`));
      if(c==='空'){const oc=comboOf(oppOf(i));const oe=SZW()[key][oc];if(oe&&oc!=='空')o.push(p(borrowed(oc,fit(oe.story,oppOf(i)))));}
      if(e.fields)o.push(ul([pt('Directions that suit you',e.fields)]));
      o.push(e.scenes.map(scene).join(''));o.push(ul([pt('Advice',e.advice)]));
      for(const s of [...pal[i].majorStars,...pal[i].minorStars])if(s.mutagen)o.push(p(`<b>${mt(s.name,s.mutagen)} here</b>: ${mutNote(s,pal[i].name)}`));}}
  /* 9. love */
  o.push(h3('Love and romance','z-love'));
  const fi=idx('夫妻'),fp=pal[fi];
  {const sc=comboOf(fp);const e=SZS()&&SZS()[sc];
   if(e){o.push(h4(e.title));o.push(p(fitAt(e.partner+' '+e.pattern,fi)+brNote(fp)));
     if(sc==='空'){const oc=comboOf(oppOf(fi));const oe=SZS()[oc];if(oe&&oc!=='空')o.push(p(borrowed(oc,fit(oe.partner,oppOf(fi)))));}
     o.push(e.scenes.map(scene).join(''));o.push(ul([pt('Advice',e.advice)]));o.push(h4('Spouse palace details'));}}
  const fl=[pt(`Natal Spouse palace in ${fp.earthlyBranch} (${stLine(fi)}${minorLine(fi)?'; '+minorLine(fi):''})`,`${PAL('夫妻')}${fp.majorStars.map(s=>M[s.name]?` You, or your partner, carry ${S(s.name)}’s traits in love: ${lc(M[s.name][2])}`:'').join('')}`)];
  for(const s of fp.majorStars.concat(fp.minorStars))if(s.mutagen)fl.push(pt(`${mt(s.name,s.mutagen)} in the Spouse palace`,cap((s.mutagen==='祿'?LU:s.mutagen==='忌'?JI:{})['夫妻']||`${S(s.name)}’s traits are amplified in love.`)));
  if(has(fi,'擎羊'))fl.push(pt(`${S('擎羊')} in the Spouse palace`,'arguments and clashes come easily in love, so soften your tone when you talk.'));
  if(has(fi,'陀羅'))fl.push(pt(`${S('陀羅')} in the Spouse palace`,'love moves slowly; things tend to drag and you get tangled up inside.'));
  if(has(fi,'地空')||has(fi,'地劫'))fl.push(pt(`${S('地空')} or ${S('地劫')} in the Spouse palace`,'you hold idealized hopes for love, and reality can fall short.'));
  const peach=PEACH.map(n=>{const i=findStar(n);return i<0?null:`${SN(n)} in the ${pn(pal[i].name)}`;}).filter(Boolean);
  const bath=pal.findIndex(p=>p.changsheng12==='沐浴');
  if(bath>=0)peach.push(`Mu Yu (Bathing) in the ${pn(pal[bath].name)}`);
  fl.push(pt('Where your romance stars fall',peach.join(', ')+'. When romance stars land in the Life, Travel, Spouse, Children or Fortune palace, your appeal to others is especially strong.'));
  o.push(ul(fl));
  const cmp=[];
  for(const yr of [yNow,yNow+1]){const Hy=ctx.horoscope(ctx.yearMid(yr));if(!Hy)continue;const y=Hy.yearly;
    const fi2=y.palaceNames.indexOf('夫妻'),f2=pal[fi2];
    const luck=y.mutagen.map((s,j)=>({s,j,t:findStar(s)}));
    const hitF=luck.filter(x=>x.t===fi2||x.t===fi).map(x=>mt(x.s,MK[x.j]));
    const ys=Hy.yearly.stars||[];let luan='',xi='';ys.forEach((arr,i)=>arr.forEach(s=>{if(s.name==='流鸞')luan=y.palaceNames[i];if(s.name==='流喜')xi=y.palaceNames[i];}));
    const ming2=pal[y.index];
    const flowerInMing=ming2.majorStars.some(s=>['貪狼','廉貞'].includes(s.name))||['流鸞','流喜'].some(n=>(ys[y.index]||[]).some(s=>s.name===n));
    let verdict;
    const ji=luck.find(x=>x.j===3),lu=luck.find(x=>x.j===0);
    const jiHit=ji&&(ji.t===fi2||ji.t===fi),luHit=lu&&(lu.t===fi2||lu.t===fi);
    if(jiHit&&luHit)verdict=`Gain and Snag meet: ${mt(lu.s,'祿')} brings good connections${lu.t===fi2?' (in the yearly Spouse palace)':''}, but ${mt(ji.s,'忌')} can cause misunderstandings${ji.t===fi?' (in the natal Spouse palace)':''}. Hold on to the right person and watch your words.`;
    else if(jiHit)verdict='Love is prone to misunderstandings and setbacks; slow down, talk more and don’t rush to settle things.';
    else if(luHit)verdict='A good year for romance: a fine time to settle into a relationship or meet the right person.';
    else if(flowerInMing)verdict='Lots of attention and a busy social life, but learn to tell sincerity from flirting.';
    else verdict='Love is steady this year; let things take their course.';
    if(!loveNow)loveNow=`${yr}: ${verdict}`;
    cmp.push(`<tr><td class="mono">${yr}</td><td>${y.heavenlyStem}${y.earthlyBranch}</td><td>${f2.earthlyBranch} (natal ${pn(f2.name)}): ${stLine(fi2)}</td><td>${hitF.join(', ')||'—'}</td><td>${[luan?`yearly ${SN('紅鸞')} in the yearly ${pn(luan)}`:'',xi?`yearly ${SN('天喜')} in the yearly ${pn(xi)}`:''].filter(Boolean).join(', ')||'—'}</td><td>${verdict}</td></tr>`);}
  o.push(`<div class="tablewrap"><table><thead><tr><th>Year</th><th>Stem-branch</th><th>Yearly Spouse palace</th><th>Transformations touching love</th><th>Hong Luan / Tian Xi</th><th>Key point</th></tr></thead><tbody>${cmp.join('')}</tbody></table></div>`);

  /* 10. advice */
  const adv=[];
  if(H){
    const y=H.yearly,d=H.decadal;
    const yj=findStar(y.mutagen[3]),dj=findStar(d.mutagen[3]);
    if(yj>=0)adv.push(pt(`This year, ${mt(y.mutagen[3],'忌')} falls in your natal ${pn(pal[yj].name)} (yearly ${pn(y.palaceNames[yj])})`,`${JI_ADV[y.palaceNames[yj]]}${STAR_JI[y.mutagen[3]]?' '+STAR_JI[y.mutagen[3]]:''}`));
    if(dj>=0&&dj!==yj)adv.push(pt(`This decade, ${mt(d.mutagen[3],'忌')} falls in your natal ${pn(pal[dj].name)} (decade ${pn(d.palaceNames[dj])})`,`${JI_ADV[d.palaceNames[dj]]}${STAR_JI[d.mutagen[3]]?' '+STAR_JI[d.mutagen[3]]:''}`));
    if(birthMut['忌']&&(birthMut['忌'].i===yj||birthMut['忌'].i===dj))adv.push(pt('Snags stacking up',`your ${pn(pal[birthMut['忌'].i].name)} is hit by both the birth-year ${ML('忌')} and the ${birthMut['忌'].i===yj?'yearly':'decade'} ${ML('忌')}; this is where you need the most care right now.`));
    const yl=findStar(y.mutagen[0]);if(yl>=0)adv.push(pt(`This year’s opportunity: your natal ${pn(pal[yl].name)} (yearly ${pn(y.palaceNames[yl])})`,STAR_LU[y.mutagen[0]]||'things go more smoothly in this area this year.'));
  }
  if(adv.length){o.push(h3('Things to watch','z-advice'));o.push(ul(adv));}
  /* your story (rule-based) */
  const story=[];let workLine='';
  {const ms=SZM()&&SZM().ming[mcombo];
   if(ms){story.push(fitAt(ms.image+' '+ms.story,ming)+brNote(pal[ming]));
     if(mcombo==='空'&&SZM().ming[ocombo])story.push(`Your Life palace has no main star, so it borrows ${comboTxt(ocombo)} from the opposite palace. You resemble “${SZM().ming[ocombo].title}”, but you are more easily shaped by your surroundings and the people around you.`);}
   const bsrc=bp.majorStars.length?body:(body+6)%12,bc=comboOf(pal[bsrc]);
   if(bp.name==='命宮')story.push('Your Body palace sits in the same place as your Life palace, so your inborn character stays the center of your whole life, and the older you get, the more you become yourself.');
   else{let frag='';
     const ws=SZW()&&bc!=='空'&&(bp.name==='財帛'?SZW().wealth[bc]:bp.name==='官祿'?SZW().career[bc]:null);
     if(ws)frag=`Here you are “${ws.title}”: ${firstSent(fitAt(ws.story,body))}${brNote(bp)}`;
     else if(bp.name==='夫妻'&&SZS()&&SZS()[bc]&&bc!=='空')frag=firstSent(fitAt(SZS()[bc].pattern,body));
     else if(SZM()&&SZM().ming[bc]&&bc!=='空')frag=`The ${comboTxt(bc)} here ${bc.includes('·')?'read':'reads'} like “${SZM().ming[bc].title}”.`;
     const lm=has(body,'天馬')&&(has(body,'祿存')||[...bp.majorStars,...bp.minorStars].some(s=>s.mutagen==='祿'));
     story.push([`As life reaches its middle stretch, though, your focus gradually shifts to ${DOM[bp.name]}, because your Body palace is the ${pn(bp.name)}.`,frag.trim(),lm?'It also forms Lu Ma Jiao Chi (Wealth-and-Horse) here: the more you move around, the more you earn.':''].filter(Boolean).join(' '));}
   if(SZW()){const ci=idx('官祿'),wi=idx('財帛');
     const say=(i,key,lab)=>{const c=comboOf(pal[i]);if(c!=='空')return SZW()[key][c]?`${lab}, you are “${SZW()[key][c].title}”`:'';const oc=comboOf(oppOf(i));return SZW()[key][oc]&&oc!=='空'?`${lab}, your ${pn(pal[i].name)} has no main star, so it borrows ${comboTxt(oc)} from the opposite palace and you resemble “${SZW()[key][oc].title}”`:'';};
     const parts=[say(ci,'career','at work'),say(wi,'wealth','with money')].filter(Boolean);
     if(parts.length){workLine=cap(parts.join('; '))+'.';story.push(workLine);}}
   if(birthMut['忌']){const jp=pal[birthMut['忌'].i].name;story.push(`What you care about most in life, and where you most often get stuck, is ${DOM[jp]}. ${mt(birthMut['忌'].star,'忌')} sits in your ${pn(jp)}: ${JI[jp]} This is not bad luck. It is the lesson most worth your effort in this lifetime.`);}
   if(decInfo&&decTitle)story.push(`Right now you are in the chapter for ages ${decInfo.range}, and its theme is “${decTitle}”. ${decStory}`);
   if(yearInfo)story.push(`In ${yearInfo.yr}, the yearly Life palace falls in your natal ${yearInfo.pal}${yearInfo.meet?', and it overlaps your decade Life palace, so the highs and lows of the year are doubled':''}.`);}
  if(story.length)o.unshift(h3('Your story','z-story'),...story.map(p));
  /* basic */
  const b=[];
  if(story.length){b.push(h3('Your story'));b.push(...story.slice(0,2).map(p));if(decInfo&&decTitle)b.push(p(`Right now you are in the chapter for ages ${decInfo.range}: “${decTitle}”.`));}
  b.push(h3('Your Zi Wei chart highlights'));
  const msrc=mp.majorStars.length?mp.majorStars:opp.majorStars;
  const bItems=story.length?[]:[pt(`Life palace (${msrc.map(x=>S(x.name)).join(', ')||'—'}${mp.majorStars.length?'':', borrowed from the opposite palace'})`,msrc.map(x=>M[x.name]?M[x.name][2]:'').join(' ')),
    pt(`Body palace in the ${pn(bp.name)}`,bp.name==='命宮'?'your inborn nature is also your later focus: being yourself matters most.':`from midlife on, ${DOM[bp.name]} will matter more and more to you.`)];
  if(story.length&&workLine)bItems.push(pt('Work and money',workLine));
  const pn2=pats.map(x=>(x.match(/<b>(.*?)<\/b>/)||[])[1]).filter(Boolean);
  if(pn2.length)bItems.push(pt('Chart patterns',pn2.join('; ')+' (details in Advanced).'));
  if(birthMut["忌"])bItems.push(pt(`Lifelong lesson (${mt(birthMut['忌'].star,'忌')} in the ${pn(pal[birthMut['忌'].i].name)})`,JI[pal[birthMut['忌'].i].name]));
  b.push(ul(bItems));
  if(decInfo){b.push(h4(`This decade (ages ${decInfo.range}): the ${decInfo.pal} decade`));const dup=!!(decInfo.jiStar&&yearInfo&&yearInfo.ji===decInfo.jiStar);b.push(p(`Main stars: ${decInfo.star}. These ten years center on ${decInfo.dom}. ${decInfo.ji&&!dup?decInfo.ji:''}${dup?`Both the decade’s and this year’s ${ML('忌')} fall on ${S(decInfo.jiStar)}, so pay special attention to the reminders below.`:''}`));}
  if(yearInfo){b.push(h4(`${yearInfo.yr}, the ${yearInfo.gz} year`));b.push(p(`The yearly Life palace is your natal ${yearInfo.pal} (${yearInfo.star}). ${yearInfo.meet?'This year the yearly and decade Life palaces meet, so good and bad are both amplified.':''}`));if(adv.length)b.push(ul(adv));}
  if(loveNow){b.push(h4('Love'));b.push(p(loveNow));}
  return{basic:b.join(''),adv:o.join('')};
}
const FLOW={'流祿':'祿存','流羊':'擎羊','流陀':'陀羅','流昌':'文昌','流曲':'文曲','流魁':'天魁','流鉞':'天鉞','流馬':'天馬','流鸞':'紅鸞','流喜':'天喜'};
function flowName(n,S,SN){return `yearly ${SN(FLOW[n])}`;}
function dp0(pal,i){return `${pal[i].earthlyBranch}`;}
function layerMarks(i,{pal,dec,y,findStar,S,ML}){
  const out=[];const all=[...pal[i].majorStars,...pal[i].minorStars];
  all.forEach(s=>{if(s.mutagen)out.push(`${S(s.name)} birth-year ${ML(s.mutagen)}`);});
  dec.mutagen.forEach((s,j)=>{if(findStar(s)===i)out.push(`${S(s)} decade ${ML(MK[j])}`);});
  y.mutagen.forEach((s,j)=>{if(findStar(s)===i)out.push(`${S(s)} yearly ${ML(MK[j])}`);});
  return out.join(', ');
}
function mutLayer(muts,layer,names,{pal,findStar,pn,birthMut,ming,ctxName,decMut,S,ML,mt}){
  const out=[];
  muts.forEach((star,j)=>{const t=findStar(star);if(t<0)return;const rel=names[t];const k=MK[j];
    let txt;
    const extra=s=>s?' '+s:'';
    if(k==='祿')txt=`${ctxName}, things go more smoothly in the area of ${DOM[rel]}: ${LU[rel]}${extra(STAR_LU[star])}`;
    else if(k==='忌')txt=`${ctxName}, the area of ${DOM[rel]} is where you are most likely to get stuck: ${JI[rel]}${extra(STAR_JI[star])}`;
    else if(k==='權')txt=`${ctxName}, you grow more ambitious in the area of ${DOM[rel]} and want to take charge.`;
    else txt=`${ctxName}, you tend to earn a good name and find helpful people in the area of ${DOM[rel]}.`;
    const flags=[];
    if(k==='忌'&&birthMut['忌']&&birthMut['忌'].i===t)flags.push(`it shares a palace with the birth-year ${ML('忌')} (${ML('忌')} on ${ML('忌')}), doubling the pressure`);
    if(k==='忌'&&decMut&&findStar(decMut[3])===t)flags.push(`it shares a palace with the decade ${ML('忌')} (double ${ML('忌')}), so give this area a little extra attention this year`);
    if(k==='忌'&&t===(ming+6)%12)flags.push(`it clashes with the ${layer} Life palace, so the effect is direct`);
    if(k==='忌'&&t===ming)flags.push(`it enters the ${layer} Life palace, bringing heavy mental pressure`);
    if(k==='祿'&&birthMut['祿']&&birthMut['祿'].i===t)flags.push(`it shares a palace with the birth-year ${ML('祿')} (${ML('祿')} on ${ML('祿')}): good on top of good`);
    if(birthMut['祿']&&birthMut['祿'].star===star&&k==='忌')flags.push(`your birth-year ${ML('祿')} star turns into a ${ML('忌')}: what you gain may be lost later, so quit while you are ahead`);
    out.push(pt(`${mt(star,k)} in your natal ${pn(pal[t].name)} (${layer} ${pn(rel)})`,txt+(flags.length?` [Note: ${flags.join('; ')}.]`:'')));
  });
  return out;
}
function zwPatterns(Z,{ming,has,hasIn,sfz,findStar,birthMut,pal,pn,S}){
  const out=[],SS=sfz(ming),mp=pal[ming],br=mp.earthlyBranch;
  const majorIn=(i,n)=>pal[i].majorStars.some(s=>s.name===n);
  const luIn=set=>set.some(i=>has(i,'祿存')||[...pal[i].majorStars,...pal[i].minorStars].some(s=>s.mutagen==='祿'));
  const add=(n,t)=>out.push(pt(n,t));
  const TRI='the circle of four palaces around your Life palace (its triad and opposite)';
  if(majorIn(ming,'紫微')&&majorIn(ming,'天府'))add('Zi Fu Tong Gong (Emperor and Treasury together)',`the emperor star ${S('紫微')} and the treasury star ${S('天府')} share your Life palace: broad-minded, able both to defend and to advance, and generally blessed in life.`);
  else if(hasIn(SS,'紫微')&&hasIn(SS,'天府'))add('Zi Fu Chao Yuan (Emperor and Treasury in support)',`${S('紫微')} and ${S('天府')} meet in ${TRI}: you have the makings of a leader and the ability to hold on to what you build.`);
  if(hasIn(SS,'天府')&&hasIn(SS,'天相')&&!majorIn(ming,'紫微'))add('Fu Xiang Chao Yuan (Treasury and Seal in support)',`${S('天府')} and ${S('天相')} support your Life palace: you work steadily and keep your word, well suited to management and right-hand roles.`);
  if(['七殺','破軍','貪狼'].some(n=>majorIn(ming,n)))add('Sha Po Lang (General–Vanguard–Charm)',`${TRI} is built from ${S('七殺')}, ${S('破軍')} and ${S('貪狼')}: a life of big changes and strong pioneering energy. You thrive by seizing chances in times of upheaval, with bigger ups and downs along the way.`);
  if(['天機','太陰','天同','天梁'].every(n=>hasIn(SS,n)))add('Ji Yue Tong Liang (Wisdom–Moon–Blessing–Shelter)',`${S('天機')}, ${S('太陰')}, ${S('天同')} and ${S('天梁')} meet in ${TRI}: you are thoughtful and detail-minded, and do well in stable organizations or public service.`);
  if(hasIn(SS,'太陽')&&hasIn(SS,'天梁')){
    if(hasIn(SS,'文昌')&&luIn(SS))add('Yang Liang Chang Lu (Sun–Liang–Chang–Lu)',`${S('太陽')}, ${S('天梁')}, ${S('文昌')} and a Gain star meet in ${TRI}: bright and talented, favored in exams, public service, academia or large institutions, and likely to earn a name in your field.`);
    else{const wc=findStar('文昌'),lc_=findStar('祿存');const miss=[];const luMiss=!luIn(SS);if(!hasIn(SS,'文昌'))miss.push(`${S('文昌')} (in the ${wc>=0?pn(pal[wc].name):'—'})`);if(luMiss)miss.push(`a Gain star (${S('祿存')} is in the ${lc_>=0?pn(pal[lc_].name):'—'}, and the birth-year Gain is not in the triad either)`);add('Yang Liang Chang Lu, incomplete (Sun–Liang–Chang–Lu)',`${TRI} holds ${S('太陽')} and ${S('天梁')}${!luMiss?' plus a Gain star':''}, but ${andList(miss)} ${miss.length>1?'are':'is'} missing from it, so strictly speaking the pattern is not complete. It still leans toward reputation, expertise and public-sector work.`);}
  }
  if(['祿','權','科'].every(k=>birthMut[k]&&SS.includes(birthMut[k].i)))add('San Qi Jia Hui (Three Gifts Meet)',`the birth-year Gain, Power and Fame all sit in ${TRI}: plenty of opportunities in life, and good odds of both success and recognition.`);
  const hasLuCun=SS.find(i=>has(i,'祿存')),hasHuaLu=birthMut['祿']&&SS.includes(birthMut['祿'].i);
  if(hasLuCun!==undefined&&hasHuaLu)add('Shuang Lu Jiao Liu (Double Wealth)',`${S('祿存')} and the Gain transformation both reach your Life palace: two streams of income, and with good management you can build real wealth.`);
  pal.forEach((p,i)=>{if(has(i,'天馬')&&(has(i,'祿存')||[...p.majorStars,...p.minorStars].some(s=>s.mutagen==='祿')))add(`Lu Ma Jiao Chi (Wealth-and-Horse) in the ${pn(p.name)}`,`a Gain star and ${S('天馬')} share a palace: the classic sign of making money on the move. A fixed desk job is not for you; travel, business trips, working elsewhere or remote work bring more money the more you move.`);});
  const L=(ming+11)%12,R=(ming+1)%12,both=(a,b)=>(has(L,a)&&has(R,b))||(has(L,b)&&has(R,a));
  if(both('左輔','右弼'))add('Zuo You Jia Ming (Helpers flanking Life)',`${S('左輔')} and ${S('右弼')} flank your Life palace: plenty of support throughout life.`);
  if(both('文昌','文曲'))add('Chang Qu Jia Ming (Scholar and Talent flanking Life)',`${S('文昌')} and ${S('文曲')} flank your Life palace: clever, with a gift for words.`);
  if(both('天魁','天鉞'))add('Kui Yue Jia Ming (Patrons flanking Life)',`${S('天魁')} and ${S('天鉞')} flank your Life palace: strong luck with helpful patrons.`);
  if(both('擎羊','陀羅'))add('Yang Tuo Jia Ming (Qing Yang and Tuo Luo flanking Life)',`${S('擎羊')} and ${S('陀羅')} flank your Life palace: you can get squeezed from both sides, so take things step by step.`);
  if(both('火星','鈴星'))add('Huo Ling Jia Ming (Huo Xing and Ling Xing flanking Life)',`${S('火星')} and ${S('鈴星')} flank your Life palace: impatient, and prone to sudden surprises.`);
  if(both('地空','地劫'))add('Kong Jie Jia Ming (Di Kong and Di Jie flanking Life)',`${S('地空')} and ${S('地劫')} flank your Life palace: unconventional ideas, and money that is hard to keep.`);
  const opp=(ming+6)%12;
  if((has(ming,'天魁')&&has(opp,'天鉞'))||(has(ming,'天鉞')&&has(opp,'天魁')))add('Zuo Gui Xiang Gui (Patrons facing each other)',`${S('天魁')} and ${S('天鉞')} sit in your Life and Travel palaces: helpful people lift you up throughout life.`);
  pal.forEach((p,i)=>{if(majorIn(i,'貪狼')&&has(i,'火星'))add(`Huo Tan (Fire and Charm) in the ${pn(p.name)}`,`${S('貪狼')} meets ${S('火星')}: sudden luck and windfalls that come fast and go fast.`);if(majorIn(i,'貪狼')&&has(i,'鈴星'))add(`Ling Tan (Bell and Charm) in the ${pn(p.name)}`,`${S('貪狼')} meets ${S('鈴星')}: unexpected opportunities and windfall money.`);});
  const sun=pal.find(p=>p.majorStars.some(s=>s.name==='太陽')),moon=pal.find(p=>p.majorStars.some(s=>s.name==='太陰'));
  if(sun&&moon){const sbr=sun.earthlyBranch,mbr=moon.earthlyBranch;
    if('卯辰巳午'.includes(sbr)&&'酉戌亥子'.includes(mbr))add('Ri Yue Bing Ming (Sun and Moon both bright)',`${S('太陽')} is in ${sbr} (daytime) and ${S('太陰')} is in ${mbr} (night): each is in its proper place, so you balance inner and outer life, with good luck in both patrons and money.`);
    else if('酉戌亥子丑'.includes(sbr)&&'卯辰巳午未'.includes(mbr))add('Ri Yue Fan Bei (Sun and Moon turned away)',`${S('太陽')} is in ${sbr} (${pn(sun.name)}, after sunset) and ${S('太陰')} is in ${mbr} (${pn(moon.name)}, a daytime moon): both lose their light, so your efforts can go unseen. Start early, work hard and build on your expertise.`);}
  if(majorIn(ming,'巨門')&&['子','午'].includes(br)&&mp.majorStars.some(s=>s.name==='巨門'&&s.mutagen&&s.mutagen!=='忌'))add('Shi Zhong Yin Yu (Jade hidden in stone)',`${S('巨門')} sits in your Life palace in 子 or 午 with a favorable transformation: your talent is understated, and the more it is polished, the brighter it shines.`);
  if(majorIn(ming,'七殺')&&['寅','申'].includes(br))add('Qi Sha Chao Dou (General facing the Dipper)',`${S('七殺')} sits in 寅 or 申 with ${S('紫微')} and ${S('天府')} opposite: bold and capable of great things.`);
  if(majorIn(ming,'七殺')&&['子','午'].includes(br))add('Qi Sha Yang Dou (General looking up at the Dipper)',`${S('七殺')} sits in 子 or 午 with ${S('紫微')} and ${S('天府')} opposite: independent and decisive, able to break new ground in hard times.`);
  if(majorIn(ming,'破軍')&&['子','午'].includes(br))add('Ying Xing Ru Miao (Hero star at home)',`${S('破軍')} sits in 子 or 午: strong pioneering energy, made for achievements in times of change.`);
  if(majorIn(ming,'太陰')&&br==='亥')add('Yue Lang Tian Men (Bright moon at Heaven’s Gate)',`${S('太陰')} sits in your Life palace in 亥: refined and clever, with wealth that flows in steadily.`);
  if(majorIn(ming,'太陽')&&br==='卯')add('Ri Zhao Lei Men (Sun over Thunder Gate)',`${S('太陽')} sits in your Life palace in 卯: full of vitality, with a name that travels far.`);
  if(majorIn(ming,'太陽')&&br==='午')add('Jin Can Guang Hui (Golden radiance)',`${S('太陽')} sits in your Life palace in 午: at the height of its light, with a leader’s presence.`);
  if(!mp.majorStars.length&&br==='未'&&majorIn(pal.findIndex(p=>p.earthlyBranch==='卯'),'太陽')&&majorIn(pal.findIndex(p=>p.earthlyBranch==='亥'),'太陰'))add('Ming Zhu Chu Hai (Pearl rising from the sea)',`your Life palace in 未 has no main star, and is lit by ${S('太陽')} in 卯 and ${S('太陰')} in 亥: a late bloomer who gains both reputation and wealth.`);
  if(majorIn(ming,'紫微')&&hasIn(SS,'左輔')&&hasIn(SS,'右弼'))add('Jun Chen Qing Hui (Ruler and ministers meet)',`${S('紫微')} sits in your Life palace, supported by ${S('左輔')} and ${S('右弼')}: a strong leader whom people rally behind.`);
  if(birthMut['忌']&&birthMut['忌'].i===ming)add('Hua Ji Zuo Ming (Snag in the Life palace)',`${S(birthMut['忌'].star)}’s Snag sits in your Life palace: you are demanding of yourself, and your life lessons center on working on yourself.`);
  const sha=['擎羊','陀羅','火星','鈴星','地空','地劫'].filter(n=>has(ming,n));
  if(sha.length)add('Sha Xing Ru Ming (Harsh stars in the Life palace)',`your Life palace holds ${andList(sha.map(S))}: you have some sharp edges and will go through a lot in life; learn to turn pressure into drive.`);
  return out;
}

/* ===================================================================
   Human Design
   =================================================================== */
function readHD(H,Z){
  const o=[],T=Z.types[H.type],A=Z.authorities[H.authority],D=Z.definitions[H.definition];
  const [l1,l2]=H.profile,pk=`${l1}/${l2}`;
  o.push(h3('Your Human Design'));
  o.push(p(`You are a ${pk} ${T.n} with ${A.n} (${D[0]}). Your life is a journey of ${H.type==='projector'?'understanding others and waiting to be seen and invited':H.type==='manifestor'?'initiating and making an impact':H.type==='reflector'?'mirroring your surroundings and slowly gaining clarity':'experimenting, learning from experience and taking action'}.`));
  {const ta=SHD()&&SHD().typeAuth[`${H.type}|${H.authority}`];if(ta){o.push(p(ta.story));o.push(scene(ta.scene));}}
  o.push(h4(T.n===T.en?T.n:`${T.n} (${T.en})`));
  o.push(ul([T.txt,pt('Strategy',T.strategy),pt('Signature (how it feels when you are on track)',T.sig),pt('Not-self theme (the warning sign you are off track)',T.ns)]));
  o.push(h4(A.n));o.push(p(A.txt));
  {const pr=SHD()&&SHD().profiles[pk];o.push(h4(`${pk} profile${pr?`: ${pr.title}`:''}`));o.push(p(pr?pr.summary:(Z.profiles[pk]||'')));}
  o.push(h4(D[0]));o.push(p(D[1]));
  const tips=[...T.tips,`${A.n}: ${({emotional:'Hit the brakes before acting on impulse, and sleep on any important decision at least one night.',sacral:'Trust your body’s response in the moment; you don’t need to find reasons for it.',splenic:'Your very first instinct is the most accurate; don’t wait until you have thought it through.','ego-m':'Before you say “I want”, check that you really want it, then tell the people it will affect.','ego-p':'Once invited, ask yourself “what’s in it for me?”, and commit only if it is worth it.',self:'Talk with people you trust and listen to what you say; your direction is in your own words.',mental:'Use a few trusted people as sounding boards, and talk your ideas through in the right environment.',lunar:'Wait one lunar cycle (about 28 days) before big decisions, and talk with different people in the meantime.'})[H.authority]}`];
  o.push(h4('Living your design'));o.push(ul(tips));
  const basic=o.join('');o.length=0;
  o.push(h3('The two lines of your profile','h-lines'));
  for(const [ln,label] of [[l1,'conscious'],[l2,'unconscious']]){const L=Z.lines[ln];
    o.push(p(`<b>Line ${ln} (${label}): ${L.n}</b>, ${L.k}. ${L.d}`));
    const SL=SHD()&&SHD().lines[ln];
    if(SL)o.push(ul([pt('Common misreading',SL.misread),pt('A better way to see it',SL.mindset)]));
    o.push((SL?SL.examples:[L.e]).map(scene).join(''));}
  {const pr=SHD()&&SHD().profiles[pk];if(pr){o.push(h4(`The ${pk} life cycle`));o.push(p(pr.loop));o.push(h4('In love'));o.push(p(pr.love));o.push(h4('At work and in business'));o.push(p(pr.work));o.push(h4(`Tips for a ${pk}`));o.push(ul(pr.tips));}}
  const cr=crossName(H,Z);
  o.push(h3('Incarnation Cross','h-cross'));
  o.push(p(`${cr.full}, gates ${H.cross.gates[0]}/${H.cross.gates[1]} | ${H.cross.gates[2]}/${H.cross.gates[3]}. ${Z.angles[H.cross.angle][1]}`));
  o.push(ul([['Personality Sun',0],['Personality Earth',1],['Design Sun',2],['Design Earth',3]].map(([n,i])=>pt(`${n}, gate ${H.cross.gates[i]}`,Z.gates[H.cross.gates[i]]))));
  const defd=['head','ajna','throat','g','heart','sacral','spleen','sp','root'];
  o.push(h3('The nine centers','h-centers'));
  o.push(h4('Defined centers'));
  o.push(H.defined.length?ul(defd.filter(c=>H.defined.includes(c)).map(c=>pt(Z.centers[c].n,Z.centers[c].d+(SHD()&&SHD().centersDefined[c]?scene(SHD().centersDefined[c]):'')))):p('You have no defined centers.'));
  o.push(h4('Open centers'));
  o.push(ul(defd.filter(c=>!H.defined.includes(c)).map(c=>pt(Z.centers[c].n,Z.centers[c].u+(SHD()&&SHD().centersOpen[c]?scene(SHD().centersOpen[c]):'')))));
  o.push(h3('Channels','h-channels'));
  o.push(H.channels.length?ul(H.channels.map(([a,b])=>{const c=Z.channels[`${a}-${b}`];return pt(`${a}-${b} ${c[0]} (${c[1]})`,c[2]+(SHD()&&SHD().channels[`${a}-${b}`]?scene(SHD().channels[`${a}-${b}`]):''));})):p('You have no complete channels.'));
  o.push(h3('More tips for daily life','h-tips'));
  o.push(ul([`Line ${l1}: ${({1:'Do your homework first; your security comes from knowledge.',2:'Keep time for yourself so your gifts can grow naturally.',3:'Allow yourself to make mistakes; every “that didn’t work” becomes a reference point for your later judgment.',4:'Look after your network of people; your opportunities are there.',5:'Stay aware of others’ expectations; you don’t have to rescue everyone.',6:'Move patiently through the three stages of your life and live authentically.'})[l1]}`,...(l2!==l1?[`Line ${l2}: ${({1:'Lay solid foundations before you make a move on anything important.',2:'When others notice your talent, don’t brush it off.',3:'Failure is just data, not a verdict.',4:'Opportunities often come through people you know, so nurture those ties.',5:'When people expect things of you, check that you really want to help before saying yes, and be clear about your limits.',6:'Give yourself time to settle, and find wisdom by watching from the side.'})[l2]}`]:[])]));
  /* your story (rule-based) */
  {const hs=[],ta=SHD()&&SHD().typeAuth[`${H.type}|${H.authority}`],pr=SHD()&&SHD().profiles[pk];
   hs.push([`You are ${/^[AEIOU]/.test(T.n)?'an':'a'} ${T.n}.`,firstSent(T.txt),ta?ta.story:''].filter(Boolean).join(' '));
   if(pr)hs.push(`The script of your life is “${pr.title}”. ${pr.summary} ${pr.loop}`);
   hs.push(`You have ${D[0]}. ${D[1]}`);
   if(H.channels.length&&SHD()){const cs=H.channels.slice(0,2).map(([a,b])=>SHD().channels[`${a}-${b}`]?`${Z.channels[`${a}-${b}`][0]}: ${SHD().channels[`${a}-${b}`]}`:'').filter(Boolean);
     hs.push(`You have ${H.channels.length} ${H.channels.length>1?'channels':'channel'} of built-in talent that ${H.channels.length>1?'run':'runs'} all the time. ${cs.join(' ')}`);}
   if(SHD()){const oc=['sp','throat','heart','g','head','ajna','root','spleen','sacral'].find(c=>!H.defined.includes(c));if(oc&&SHD().centersOpen[oc])hs.push(`The place where the outside world sways you most is your open ${Z.centers[oc].n}. ${SHD().centersOpen[oc]}`);}
   hs.push(`And the big theme of this life is your ${cr.full}. ${Z.angles[H.cross.angle][1]}`);
   o.unshift(h3('Your story','h-story'),...hs.map(p));}
  return{basic,adv:o.join('')};
}
function crossName(H,Z){
  const key=(H.cross.angle==='right'?'R':H.cross.angle==='left'?'L':'J')+H.cross.gates[0];
  const c=Z.crossTable[key];const ang=Z.angles[H.cross.angle][0];
  if(!c)return{full:ang,zh:'',en:''};
  const nm=Z.crossNames[c[0]]||c[0];
  return{full:`${ang} of ${nm}${c[1]?` (${c[1]})`:''}`,zh:`${nm}${c[1]?' '+c[1]:''}`,en:c[0]};
}

root.Readings=root.Readings||{};root.Readings.en={west:readWest,zw:readZW,hd:readHD,crossName};
})(typeof window!=='undefined'?window:globalThis);
