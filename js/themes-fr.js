/* Synthèse des trois thèmes : pack de langue français (libellés, explications, textes de mise en page). Logique dans themes-core.js */
(function(root){
const I=()=>(typeof I18N!=='undefined'?I18N:root.I18N).fr;
const HS=()=>{const h=(typeof HDS!=='undefined'?HDS:root.HDS);return h&&h.fr;};
const PK=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
const pl=k=>I().planets[PK.indexOf(k)][0];
const sign=i=>I().signs[i][0];
const EL=['fire','earth','air','water'];
const elName=s=>{const e=I().elems&&I().elems[EL[s%4]];return e?e[0]:{fire:'Feu',earth:'Terre',air:'Air',water:'Eau'}[EL[s%4]];};
const aspName=t=>{const a=I().aspects&&I().aspects[t];return (a?a[0]:['Conjonction','Sextile','Carré','Trigone','Opposition'][t]).toLowerCase();};
const HN=h=>`la maison ${h}`;
/* Zi Wei : palais, étoiles, éclat, transformations */
const PALACE_KEYS=['命宮','兄弟','夫妻','子女','財帛','疾厄','遷移','僕役','官祿','田宅','福德','父母'];
const ART={'命宮':'de la','兄弟':'de la','夫妻':'du','子女':'des','財帛':'de la','疾厄':'de la','遷移':'des','僕役':'des','官祿':'de la','田宅':'du','福德':'du','父母':'des'};
const pk=p=>PALACE_KEYS.includes(p)?p:PALACE_KEYS.includes(p+'宮')?p+'宮':String(p).replace(/宮$/,'');
const palN=p=>{const i=PALACE_KEYS.indexOf(pk(p));return i>=0?I().palaces[i][0]:'';};
const pn=p=>`palais ${ART[pk(p)]||'de'} ${palN(p)}`;
const MAJ=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];
const MIN=['左輔','右弼','文昌','文曲','天魁','天鉞','祿存','天馬','擎羊','陀羅','火星','鈴星','地空','地劫'];
const starN=s=>{let i=MAJ.indexOf(s);if(i>=0)return I().major[i][0];i=MIN.indexOf(s);if(i>=0)return I().minor[i][0];return '';};
const BR=['廟','旺','得','利','平','不','陷'];
const brN=b=>{const i=BR.indexOf(b);return i>=0?I().bright[i][0]:'';};
const MUT=['祿','權','科','忌'];
const mutN=m=>{const i=MUT.indexOf(m);return i>=0?I().mut[i][0]:'';};
/* Human Design */
const typeN=t=>(I().hd&&I().hd.types[t])||t;
const chName=k=>{const s=HS();if(s&&s.channels&&s.channels[k])return s.channels[k][0];return `canal ${k}`;};
const lineN=ln=>{const s=HS();return s&&s.lines&&s.lines[ln]?s.lines[ln].n:'';};
const cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
const THA={career:'la carrière',wealth:'l’argent',love:'l’amour',health:'la santé',people:'les relations'};
const P={
 lang:'fr',suffix:'_FR',
 THEME:{career:'Carrière',wealth:'Argent',love:'Amour',health:'Santé',people:'Relations'},
 SYS:{zw:'le Zi Wei Dou Shu',west:'l’astrologie occidentale',hd:'le Human Design'},
 sysList:set=>{const n={zw:'Zi Wei',west:'l’astrologie',hd:'le Human Design'};const a=['zw','west','hd'].filter(s=>set.has(s)).map(s=>n[s]);return a.length===3?'les trois systèmes':a.join(' et ');},
 firstSent:s=>{const m=String(s||'').match(/^[\s\S]*?[.!?…](?=\s|$)/);return m?m[0]:String(s||'');},
 /* ---------- Libellés : nom | sens (avec scènes de vie) | conseil ---------- */
TAGS:{
career:{
 stable:['Cadre stable','Vous donnez le meilleur de vous-même dans un environnement structuré, avec des règles claires. Quand les rôles sont bien définis et les processus nets, vous consolidez votre place pas à pas. Quand vous changez d’emploi, vous regardez rarement le seul salaire : vous voulez savoir si l’entreprise est solide et bien organisée.','Choisissez une scène où l’ancienneté et la confiance s’accumulent sur la durée : le temps joue pour vous.'],
 expert:['Expertise','Votre valeur tient à ce que vous savez faire et que d’autres ne savent pas faire. Un savoir-faire, un diplôme, un domaine creusé en profondeur : c’est votre rempart. Un jour, vous remarquerez peut-être que vos collègues viennent d’abord vous voir quand ils sont bloqués.','Choisissez un domaine à approfondir sur le long terme, et mettez votre expérience par écrit sous forme de méthodes ou de réalisations.'],
 pioneer:['Esprit pionnier','Vous n’êtes pas fait pour rester dans un cadre fixé par d’autres. Nouveau service, nouveau produit, nouveau marché : plus la route est inexplorée, plus vous avez d’énergie. Trop longtemps dans un poste immuable, vous commencez à tourner en rond.','Proposez-vous pour les projets qui partent de zéro, et offrez-vous un terrain à conquérir.'],
 speak:['Communication','Votre travail passe par la parole. Convaincre, enseigner, présenter, écrire, animer : vous brillez là où il faut rendre les choses claires. En réunion, quand personne n’arrive à formuler le problème, c’est souvent votre phrase qui conclut.','Faites de l’expression votre arme principale : l’enseignement, l’écriture et les présentations démultiplient votre impact.'],
 care:['Prendre soin','Votre motivation vient souvent de l’idée que quelqu’un ira mieux grâce à vous. Éducation, soin, travail social, service client, ressources humaines : partout où l’on s’occupe des gens, vous apportez plus de chaleur que d’autres.','Choisissez un travail où vous voyez les personnes, mais posez des limites et ne portez pas les problèmes de tout le monde.'],
 lead:['Leadership','On vous pousse naturellement vers l’avant. Même si vous commencez comme simple membre de l’équipe, on finit par attendre votre décision. Il vous faut un poste où vous avez du pouvoir de décision, sinon vous vous sentez pieds et poings liés.','Visez un poste de manager ou de responsable de projet, et apprenez à déléguer : c’est plus important que de tout faire vous-même.'],
 create:['Créativité','Vous êtes très sensible à la beauté et aux ambiances. Design, contenus, marque, art, divertissement : les métiers qui transforment un ressenti en œuvre vous apportent le plus de satisfaction. Vous êtes peut-être la personne du bureau qui se soucie des couleurs d’une présentation.','Gardez un espace de création libre ; même si votre métier n’est pas créatif, constituez-vous un portfolio.'],
 analyze:['Analyse, stratégie','Vous savez voir une logique dans le désordre. Planification, recherche, données, stratégie, conseil : tous les métiers où il faut réfléchir et décortiquer un problème vous conviennent. Vous êtes peut-être celui ou celle qui, en réunion, résume discrètement l’avis de chacun dans un tableau.','Le rôle de conseiller vous va mieux que celui de fantassin : faites en sorte que les décideurs voient vos analyses.'],
 money:['Finance, commerce','Vous avez le sens des chiffres et de la circulation de l’argent. Finance, vente, gestion, achats, métiers liés à l’investissement : vous y apprenez plus vite que les autres. Très tôt, vous vous êtes sans doute demandé si une chose en valait la peine.','Rapprochez-vous des postes qui touchent directement au chiffre d’affaires : c’est là que vos compétences se mesurent le plus facilement.'],
 free:['Liberté, mouvement','Vous avez besoin de changement et de mouvement. Rester assis au même bureau à refaire chaque jour la même chose vous fait vite perdre votre enthousiasme. Le terrain, les déplacements, le travail en indépendant, les missions transversales vous donnent au contraire de plus en plus d’élan.','Choisissez une forme de travail flexible, ou construisez votre propre voie à côté de votre activité principale.'],
 people:['Réseau, relations','Vos occasions arrivent souvent par les gens. Vente, relations publiques, intermédiation, événementiel, animation de communauté : vous ouvrez les portes grâce à vos relations. La personne rencontrée lors d’une soirée pourrait bien être votre prochain emploi.','Entretenez votre réseau comme un capital : gardez le contact, mettez les gens en relation, et les occasions vous reviendront.']},
wealth:{
 steady:['Épargne régulière','Votre argent se construit petit à petit. Revenu fixe, épargne régulière, patience sur la durée : vous êtes fait pour la croissance lente, pas pour les montagnes russes. Peut-être virez-vous une somme sur un autre compte dès que votre salaire tombe.','Faites de l’épargne automatique et de l’accumulation à long terme votre fil conducteur : le temps est votre meilleur allié.'],
 dynamic:['Gains actifs','Votre argent, vous le gagnez en agissant. Un peu plus de démarches, un peu plus de missions, un peu plus de négociations, et les revenus suivent. Attendre que l’argent arrive tout seul, ce n’est pas votre scénario.','Liez vos revenus à l’action, par exemple primes, missions ou activité annexe, mais gardez de la marge pour vous reposer.'],
 windfall:['Gains imprévus','Vous avez souvent des rentrées inattendues : une prime, un bonus, un contrat apporté par quelqu’un, un revenu qui tombe au bon moment. L’argent arrive vite, mais ne reste pas forcément.','Mettez de côté la moitié de chaque gain imprévu, et ne misez pas plus gros à cause d’un coup de chance.'],
 people:['Gains par le réseau','Vos revenus sont liés à vos relations. Un client vous en amène un autre, des amis vous proposent de collaborer, un patron vous apprécie et vous donne votre chance. Plus votre réseau est bon, plus vos revenus sont stables.','Soignez votre réputation et votre fiabilité : cela vous rapportera plus sur la durée que de courir après les gros rendements.'],
 skill:['Gains par l’expertise','Vous gagnez votre vie grâce à votre tête et à votre savoir-faire. Connaissances, diplômes, réalisations, expérience : plus vous êtes pointu, plus vous gagnez. Vous constatez peut-être que ce qui vaut le plus, ce ne sont pas les heures sup, mais ce que vous savez et que d’autres ignorent.','Continuez à investir dans votre propre expertise : c’est le placement au rendement le plus sûr.'],
 cautious:['Prudence','Vous avez une vigilance naturelle avec l’argent. Vous comparez les prix et, avant toute décision financière, vous imaginez le pire scénario. Savoir préserver est votre force ; trop de prudence peut vous faire manquer des occasions.','Gardez une petite part de votre budget pour apprendre de nouvelles façons de gérer votre argent, afin que la prudence ne devienne pas de l’immobilisme.'],
 spend:['Dépense facile','Vous gagnez de l’argent et vous le dépensez : plaisirs, cadeaux, investissement en vous-même, vous ne lésinez pas. Pour vous, l’argent est fait pour servir, pas pour être contemplé. En fin de mois, vous vous demandez souvent où il est passé.','Épargnez d’abord, dépensez ensuite : fixez-vous un « budget plaisir » pour dépenser avec joie et sans culpabilité.'],
 ups:['Hauts et bas','Vos revenus ou votre situation financière varient facilement, à cause de votre secteur ou de décisions prises sur un coup de tête. Quand tout va bien, ça va très bien ; quand c’est serré, c’est vraiment serré.','Constituez une réserve d’au moins six mois de dépenses, et laissez passer une nuit avant toute grosse décision.']},
love:{
 devoted:['Fidélité','Quand vous choisissez quelqu’un, vous vous engagez entièrement. Vous tenez aux promesses et à la durée, et vous n’aimez pas les relations floues. Vous vous souvenez peut-être de chaque petite chose que l’autre vous a dite.','Prenez le temps de bien voir avant de vous engager, et une fois engagé, gardez aussi votre propre vie.'],
 free:['Besoin d’espace','Vous aimez, mais vous ne voulez pas être enfermé. Il vous faut votre temps, vos amis, vos projets. Si l’autre vous surveille ou vous colle trop, vous avez instinctivement envie de fuir.','Dites clairement dès le départ de quel espace vous avez besoin, et cherchez quelqu’un qui sait aussi être indépendant.'],
 romantic:['Romantisme','Vous accordez de l’importance aux sentiments et à l’ambiance. Une carte écrite à la main, un voyage improvisé vous touchent plus qu’un cadeau coûteux. Vous avez aussi tendance à idéaliser l’autre.','Savourez le romantisme, mais regardez aussi qui est l’autre dans la vie de tous les jours.'],
 practical:['Sens pratique','Pour vous, l’amour, c’est construire une vie à deux. Partager les tâches, planifier l’épargne, gérer les deux familles : cela compte plus que les mots doux.','Faites du concret votre langage amoureux, mais pensez aussi à dire les choses et à créer quelques rituels.'],
 passionate:['Passion','Vos sentiments arrivent vite et brûlent fort. Quand quelqu’un vous plaît, vous foncez ; quand il y a une étincelle, vous vous lancez. La passion compte beaucoup pour vous, et trop de routine vous inquiète.','Votre ardeur fait votre charme, mais en cas de dispute, accordez-vous dix minutes de calme avant de parler.'],
 talk:['Dialogue','Pour vous, bien s’entendre en parlant compte plus que tout. Ce qui vous fait craquer, c’est quelqu’un avec qui partager ses idées et discuter d’un film jusqu’au milieu de la nuit. Les silences boudeurs sont ce que vous supportez le moins.','Cherchez quelqu’un qui aime parler, et entraînez-vous à dire vos émotions plutôt qu’à les laisser deviner.'],
 caretaker:['Attention à l’autre','Dans le couple, c’est vous qui prenez soin de l’autre. Vous retenez ce qu’il aime manger et vous êtes le premier à apporter une soupe quand il est malade. Votre amour est concret, mais trop donner finit par fatiguer.','Laissez-vous aussi chouchouter : dites ce dont vous avez besoin au lieu d’attendre que l’autre le remarque.'],
 slow:['Lent à s’ouvrir','Vous ne donnez pas votre cœur d’un coup. Il vous faut du temps pour observer, et passer doucement de l’amitié à l’amour. Les déclarations rapides et les gens pressés de s’engager vous font plutôt reculer.','Laissez-vous du temps, et faites savoir à l’autre que vous n’êtes pas froid, simplement que vous avancez à votre rythme.'],
 conflict:['Ajustements','Vos relations font facilement des étincelles, et aussi des frictions. Deux fortes personnalités, ou des attentes différentes, et les disputes deviennent fréquentes. Une fois ces ajustements passés, le lien en sort souvent plus solide.','Remplacez « gagner la dispute » par « que faire après la dispute » : la réparation compte plus que d’avoir raison sur le moment.'],
 standard:['Exigence','Vous avez des critères pour choisir un partenaire et vous ne vous contentez pas de peu. L’autre doit avoir des capacités, de l’envergure, ou quelque chose que vous admirez. Mieux vaut seul que mal accompagné, c’est votre principe.','Vos critères vous protègent, mais laissez un peu de place à quelqu’un d’imparfait qui vous conviendrait pourtant.']},
health:{
 stress:['Stress accumulé','Votre corps sert souvent de soupape au stress. Quand les choses s’accumulent, la nuque, les épaules, le sommeil ou la digestion se manifestent en premier. Vous n’avez peut-être pas l’impression d’être stressé, mais votre corps, lui, le sait déjà.','Trouvez une façon régulière de décompresser, comme la marche, le sport ou l’écriture d’un journal, et videz le trop-plein régulièrement.'],
 overwork:['Risque de surmenage','Vous avez tendance à foncer tête baissée jusqu’au bout, en oubliant que vous aussi vous fatiguez. Heures supplémentaires, nuits courtes, travail des autres pris en charge : votre corps tient les comptes en silence.','Quand vous organisez votre agenda, placez d’abord les pauses, et considérez « ne rien faire » comme une tâche à accomplir.'],
 sleep:['Rythme et sommeil','Votre état dépend beaucoup de la qualité de votre sommeil. Une mauvaise nuit, et votre humeur comme votre concentration en pâtissent le lendemain. Vous êtes peut-être de ceux qui sont plus en forme à mesure que la soirée avance, et qui se couchent de plus en plus tard.','Une heure de coucher fixe et le téléphone posé une heure avant de dormir vous aideront plus que n’importe quel complément.'],
 digest:['Alimentation','Votre corps est sensible à l’alimentation : ce que vous mangez influence directement votre énergie. Dès que vous êtes tendu, votre appétit et votre digestion changent aussi.','Mangez à heures régulières et en quantités raisonnables, limitez le trop gras et le trop froid, et quand vous êtes tendu, buvez un peu d’eau tiède et mangez lentement.'],
 emotion:['Poids des émotions','Vos émotions et votre corps sont étroitement liés. Quand le moral est bas, vous vous fatiguez plus vite et attrapez plus facilement de petits maux. Prendre soin de vos émotions, c’est prendre soin de votre corps.','Quand une émotion arrive, reconnaissez-la, parlez-en à quelqu’un ou bougez un peu, au lieu de la refouler.'],
 nerve:['Trop de pensées','Votre tête ne s’éteint presque jamais. Vous pensez trop, trop loin, et une fois couché, vous pensez encore au lendemain. Ce qui fatigue, souvent, ce n’est pas le corps mais le cerveau.','Donnez à votre cerveau une heure de sortie : méditation, sport, travaux manuels, tout ce qui vous ramène à l’instant présent.'],
 rest:['Repos régulier','Votre énergie n’est pas inépuisable. Après une période chargée, il vous faut une vraie pause pour récupérer. Tenir à tout prix finit généralement par un gros coup de fatigue.','Considérez le repos comme une partie du travail : arrêtez-vous régulièrement, au lieu d’attendre de ne plus tenir debout.'],
 body:['Besoin de bouger','Votre corps a besoin de dépenser de l’énergie. Rester assis longtemps, enfermé à l’intérieur, vous rend maussade et irritable. Après avoir transpiré, vous vous sentez beaucoup plus léger.','Trouvez chaque jour un moment pour bouger : pour vous, le sport régule l’humeur, ce n’est pas seulement une question de forme.']},
people:{
 helper:['Bons soutiens','Il y a souvent autour de vous des gens prêts à vous tendre la main. Au moment clé, quelqu’un vous recommande, quelqu’un vous donne un conseil. Vous ne cultivez pas forcément ces liens, mais la sympathie vient à vous.','Pensez à remercier et à rendre la pareille : ces soutiens se renforcent à mesure qu’on les fait vivre.'],
 leader:['Meneur','Dans un groupe, c’est souvent vous qui finissez par décider. Qui réserve le restaurant, qui organise le voyage : au bout du compte, ça retombe sur vous.','Mener est une compétence, mais laissez aussi les autres contribuer : vous n’avez pas à tout porter seul.'],
 selective:['Amitiés choisies','Vous n’avez pas beaucoup d’amis, mais chacun a passé l’épreuve du temps. Vous ne vous confiez pas facilement à quelqu’un que vous venez de rencontrer, et vous êtes particulièrement prudent avec les prêts d’argent.','Gardez votre prudence, mais laissez de temps en temps une chance à de nouvelles personnes.'],
 social:['Sociable','Vous vous liez facilement, et dans une soirée vous trouvez toujours un sujet de conversation. Votre cercle est large, avec des connaissances dans toutes sortes de milieux.','Au-delà de ce large réseau, gardez du temps pour les quelques personnes qui comptent vraiment.'],
 independent:['Indépendance','Vous avez l’habitude de vous débrouiller seul, vous dépendez peu des autres et vous n’aimez pas être lié à un groupe. Voyager seul, manger seul : vous êtes parfaitement à l’aise.','Votre indépendance est une force, mais demander de l’aide quand il le faut n’est pas une faiblesse.'],
 mediator:['Médiateur','Vous servez souvent de pont entre vos amis. Quand deux personnes se disputent, elles viennent toutes les deux vous parler, et vous comprenez le point de vue de chacune.','Avant de jouer les médiateurs, demandez-vous si cette affaire a vraiment besoin de vous.'],
 conflict:['Frictions','Vos relations connaissent plus facilement des frictions, parce que vous êtes direct ou parce que vous croisez des gens aux positions tranchées. Après une dispute, certains liens deviennent plus vrais.','Face à un désaccord, restez sur les faits, pour qu’une dispute ne devienne pas une rancune durable.'],
 loyal:['Loyauté','Vous êtes très loyal envers vos amis : ce que vous promettez, vous le faites, et quand un ami est en difficulté, vous intervenez. Vous attendez de l’autre la même sincérité.','Au-delà de la loyauté, distinguez qui mérite vraiment que vous vous donniez autant.']}
},
 TENSION:{
 career:{'stable|free':'Vous voulez une scène stable, mais vous ne supportez pas la routine. Ce qui vous convient le mieux, c’est souvent de faire des choses variées sur une base solide, par exemple un nouveau projet dans une grande entreprise, ou un travail de terrain avec des clients fidèles.','stable|pioneer':'D’un côté, vous voulez préserver ce que vous avez acquis ; de l’autre, vous voulez conquérir de nouveaux territoires. Vous pouvez d’abord accumuler des ressources dans un cadre stable, puis consacrer une partie de votre énergie à créer : inutile de choisir l’un ou l’autre.'},
 wealth:{'steady|ups':'Vous savez épargner, mais vos revenus peuvent varier d’un mois à l’autre. Mettez davantage de côté les bons mois pour compenser les mois creux : votre régularité est votre assurance contre les hauts et les bas.','cautious|spend':'Vous comptez chaque sou, et pourtant vous dépensez facilement. Le cas typique : très prudent pour les grosses sommes, alors que les petites filent sans qu’on s’en rende compte. Notez vos dépenses pendant un mois, et vous verrez où va vraiment votre argent.','cautious|windfall':'Les occasions viennent souvent à vous, mais vous hésitez par réflexe. Donnez-vous une règle, par exemple ne tenter qu’avec de l’argent dont vous n’avez pas besoin, pour que prudence et opportunité puissent coexister.','steady|windfall':'Vous êtes fait pour accumuler lentement, et pourtant les occasions inattendues ne manquent pas. Voyez les gains imprévus comme un accélérateur de votre épargne, pas comme une raison de changer tout votre rythme.'},
 love:{'devoted|free':'Vous aimez sérieusement, mais vous avez aussi besoin de votre espace. Ce n’est pas contradictoire : ce que vous voulez, c’est être pleinement dans la relation tout en restant vous-même. Avec quelqu’un qui le comprend, vous serez le plus stable des partenaires.','slow|passionate':'Vous craquez vite, mais vous donnez votre cœur lentement. Vous pouvez être très enthousiaste au début, puis prendre du recul pour observer. Faites savoir à l’autre que c’est votre rythme, et non que vous vous êtes refroidi.','practical|romantic':'Vous voulez du romantisme, mais aussi une vie qui tienne la route. Ce qui vous touche le plus, c’est quelqu’un qui pense encore à vous surprendre au milieu du quotidien.','devoted|conflict':'Vous vous investissez beaucoup, alors tout compte pour vous. Plus vous tenez à l’autre, plus vous vous disputez, et après coup vous n’arrivez pas à lâcher prise. Commencez par distinguer les vrais problèmes de la simple peur de perdre l’autre.'},
 health:{'rest|body':'Vous avez besoin de bouger, et aussi de vous reposer. La clé, c’est le rythme : après l’effort, arrêtez-vous vraiment ; après une longue pause, pensez à vous remettre en mouvement.','overwork|rest':'Vous avez tendance à aller trop loin, alors que votre corps a besoin d’un repos régulier. Inscrire le repos dans votre agenda marche mieux que de compter sur votre volonté.'},
 people:{'independent|social':'Vous savez très bien être avec les autres, mais vous avez aussi besoin de moments seul. Vous vous amusez en soirée, puis vous avez envie de calme pendant plusieurs jours. C’est votre façon de recharger les batteries, pas de la sauvagerie.','selective|social':'Vous semblez avoir beaucoup d’amis, mais les vrais confidents se comptent sur les doigts d’une main. Un large cercle de connaissances et quelques liens profonds : vous avez besoin des deux.','leader|independent':'On vous pousse souvent à prendre la tête, alors que vous préféreriez faire vos propres affaires. Vous pouvez ne mener que là où cela vous tient vraiment à cœur.'}},
 why:{
  palStar:(pal,b,star,br)=>`${cap(pn(pal))}${b?' (sans étoile principale, emprunte au palais opposé)':''} : ${starN(star)}${br&&brN(br)?' ('+brN(br)+')':''}`,
  palMinor:(pal,star)=>`${starN(star)} dans le ${pn(pal)}`,
  palMut:(pal,star,m)=>`${starN(star)} transformé en ${mutN(m)} dans le ${pn(pal)}`,
  mc:s=>`Milieu du Ciel en ${sign(s)}`,
  inHouse:(k,h)=>`${pl(k)} en maison ${h}`,
  cusp:(h,s)=>`Cuspide de ${HN(h)} en ${sign(s)}`,
  planetSign:(k,s)=>`${pl(k)} en ${sign(s)} (signe ${(n=>/^[aeiouéè]/i.test(n)?'d’'+n:'de '+n)(elName(s).toLowerCase())})`,
  asp:(a,b,t)=>`${aspName(t).replace(/^./,c=>c.toUpperCase())} ${pl(a)}–${pl(b)}`,
  asc:s=>`Ascendant en ${sign(s)}`,
  hdType:t=>`Type : ${typeN(t)}`,
  hdCh:k=>`${chName(k)} (${k})`,
  hdLine:(pf,j,ln)=>`Profil ${pf} : ligne ${j?'inconsciente':'consciente'} ${ln}, ${lineN(ln)}`,
  emoAuth:()=>'Autorité émotionnelle : attendre que la vague émotionnelle se pose avant de décider',
  heartDef:()=>'Centre du Cœur (Ego) défini',
  heartOpenMoney:()=>'Centre du Cœur (Ego) ouvert : tendance à sous-estimer sa valeur ou à trop promettre',
  sacralOpen:()=>'Centre Sacral ouvert : pas d’énergie qui tourne en continu',
  spOpen:()=>'Plexus solaire ouvert : tendance à absorber les émotions des autres',
  spDef:()=>'Plexus solaire défini : l’état physique suit la vague émotionnelle',
  rootOpen:()=>'Centre Racine ouvert : tendance à se laisser pousser par la pression',
  mindOpen:(h,a)=>`${h&&a?'Centres de la Tête et Ajna ouverts':h?'Centre de la Tête ouvert':'Centre Ajna ouvert'} : tendance à trop réfléchir`,
  heartOpenWork:()=>'Centre du Cœur (Ego) ouvert : tendance à forcer pour faire ses preuves',
  heartLoyal:()=>'Centre du Cœur (Ego) défini : vous tenez parole'},
 ui:{
  consTitle:'Ce sur quoi les systèmes s’accordent',
  agreeSay:(sys,l)=>`${cap(sys)} pointent vers « ${l} ». `,
  noneIntro:n=>{const k=Object.keys(P.THEME).find(x=>P.THEME[x]===n);const a=THA[k]||n.toLowerCase();return `Pour ${a}, les trois systèmes ne se recoupent pas nettement : chacun voit une facette différente de vous. Ce n’est pas une contradiction ; cela veut dire que, pour ${a}, vous avez plusieurs visages possibles, selon l’endroit où vous mettez votre énergie.`;},
  seeSay:(sys,l)=>`${cap(sys)} ${sys.startsWith('les ')||sys.includes(' et ')?'voient':'voit'} « ${l} ». `,
  tensionTitle:'Deux forces qui tirent',
  tensionSay:(a,b)=>`« ${a} » et « ${b} » apparaissent ensemble dans votre thème. `,
  singleTitle:'L’autre facette, vue par un seul système',
  paren:s=>` (${s})`,colon:' : ',listSep:' ; ',
  sysSays:s=>`Ce que dit ${s}`,
  snipHead:(pal,b,title)=>`${cap(pn(pal))}${b?' (emprunté au palais opposé)':''} : « ${title} » `,
  fields:f=>`Pistes adaptées : ${f}`,
  noInd:'Ce thème ne présente pas d’indicateur marquant sur ce sujet.',
  adviceTitle:'Nos conseils',
  howTitle:'Comment fonctionne la synthèse',
  howHtml:`<p>Les trois systèmes parlent des langages différents : le Zi Wei Dou Shu regarde les étoiles dans les palais, l’astrologie occidentale les planètes, les signes et les maisons, et le Human Design les centres d’énergie et les canaux. Cette page traduit ce que chaque système dit d’un même thème en un jeu commun de « tendances », puis regarde lesquelles sont désignées par au moins deux systèmes à la fois.</p><p>Plus une tendance est désignée par un grand nombre de systèmes, plus elle mérite votre attention ; celle qu’un seul système mentionne est une autre facette de vous, ou une façon d’être qui n’apparaît qu’à certaines périodes.</p><ul><li><b>Carrière</b> : le Zi Wei regarde le palais de la Carrière, l’astrologie le Milieu du Ciel et la maison 10, le Human Design le type et les canaux.</li><li><b>Argent</b> : le Zi Wei regarde le palais de la Richesse, l’astrologie les maisons 2 et 8, le Human Design le type, le centre du Cœur (Ego) et les canaux liés.</li><li><b>Amour</b> : le Zi Wei regarde le palais du Couple, l’astrologie Vénus et la maison 7, le Human Design le type, le profil, l’autorité et les canaux.</li><li><b>Santé</b> : le Zi Wei regarde le palais de la Santé, l’astrologie la Lune, la maison 6 et les aspects de Saturne, le Human Design les centres définis et ouverts. Il s’agit seulement de repères sur les habitudes de vie, pas d’un avis médical.</li><li><b>Relations</b> : le Zi Wei regarde le palais des Amis, l’astrologie l’Ascendant et la maison 11, le Human Design le profil et les canaux.</li></ul>`},
 /* Version de base : relier les cinq thèmes en un paragraphe. w[th]={labels,agree,tension} */
 basic:w=>{
  const ag=n=>n>=3?'les trois systèmes concordent':n===2?'deux systèmes concordent':'un seul système';
  const phr=x=>`« ${x.labels.join(' » et « ')} »`,both=x=>`deux forces coexistent en vous : ${phr(x)}`;
  const L=[],c=w.career,m=w.wealth,l=w.love,p=w.people,h=w.health;
  if(c)L.push(c.tension?`Au travail, ${both(c)} (${ag(c.agree)}).`:`Au travail, le signal le plus net est ${phr(c)} (${ag(c.agree)}).`);
  if(m)L.push(m.tension?`Côté argent, ${both(m)}.`:`Avec l’argent, votre tendance est ${phr(m)}.`);
  if(l)L.push(l.tension?`En amour, ${both(l)}.`:`En amour, ce qui vous ressemble le plus : ${phr(l)}.`);
  if(p)L.push(p.tension?`Avec les autres, ${both(p)}.`:`Avec les autres, votre style est souvent ${phr(p)}.`);
  if(h)L.push(h.tension?`Côté santé, ${both(h)}.`:`Côté santé, le point à surveiller est ${phr(h)}.`);
  return `<p>En superposant le Zi Wei, le thème astral et le Human Design, ce que plusieurs systèmes disent de la même chose forme votre fond le plus solide.</p><p>${L.join(' ')}</p>`;}
};
root.Themes=root.Themes||{};root.Themes.fr=P;
})(typeof globalThis!=='undefined'?globalThis:this);
