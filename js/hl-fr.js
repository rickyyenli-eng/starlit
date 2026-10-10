/* L’essentiel, carte de réponse, calendrier et compatibilité : textes français (assemblés par js/hl-i18n.js) */
(function(root){
const PN={'命宮':'Vie','兄弟':'Fratrie','夫妻':'Couple','子女':'Enfants','財帛':'Richesse','疾厄':'Santé','遷移':'Déplacements','僕役':'Amis','官祿':'Carrière','田宅':'Foyer','福德':'Bien-être','父母':'Parents'};
const ART={'命宮':'de la','兄弟':'de la','夫妻':'du','子女':'des','財帛':'de la','疾厄':'de la','遷移':'des','僕役':'des','官祿':'de la','田宅':'du','福德':'du','父母':'des'};
const cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
const list=a=>a.length<=1?(a[0]||''):`${a.slice(0,-1).join(', ')} et ${a[a.length-1]}`;
const pal=n=>`palais ${ART[n]} ${PN[n]}`,palA=n=>`palais annuel ${ART[n]} ${PN[n]}`,palM=n=>`palais mensuel ${ART[n]} ${PN[n]}`;
const house=h=>`${h===1?'1re':h+'e'} maison`;
const VOW=/^[aeiouyhàâäéèêëîïôöùûü]/i;
const de=w=>VOW.test(w)?`d’${w}`:`de ${w}`;
const deA=s=>s.replace(/^le /,'du ').replace(/^les /,'des ').replace(/^(la |l’)/,'de $1');
const MUT={'祿':'Hua Lu (gain)','權':'Hua Quan (pouvoir)','科':'Hua Ke (renom)','忌':'Hua Ji (nœud)'};
const T={
 locale:'fr-FR',
 q:t=>`« ${t} »`,
 first:t=>{const m=String(t||'').match(/^[\s\S]*?[.!?…](?:\s*»)?(?=\s|$)/);return m?m[0]:String(t||'');},
 sep:', ',sep2:' ; ',colon:' : ',stop:'.',dot:' · ',paren:t=>` (${t})`,list,
 pal,your:n=>`votre ${pal(n)}`,house,mut:k=>MUT[k],asc:'Ascendant',
 lunar:(m,leap)=>`${m===1?'1er':m+'e'} mois lunaire${leap?' intercalaire':''}`,
 decade:s=>String(s).replace(/Cette année/g,'Cette décennie').replace(/cette année/g,'cette décennie'),
 month:s=>String(s).replace(/Cette année/g,'Ce mois-ci').replace(/de cette année/g,'du mois').replace(/cette année/g,'ce mois-ci'),
 TONE:{up:['Porteur','up'],even:['Stable','even'],hard:['Effort','hard']},
 DOM:{'命宮':'vous-même','兄弟':'la fratrie et les amis','夫妻':'l’amour et le couple','子女':'les enfants, les placements et les associations','財帛':'l’argent','疾厄':'le corps et le rythme de vie','遷移':'les déplacements, les voyages et les occasions ailleurs','僕役':'le réseau, les collègues et l’équipe','官祿':'le travail et la carrière','田宅':'la maison, l’immobilier et l’épargne','福德':'l’humeur et la qualité de vie','父母':'les aînés, les supérieurs et les papiers'},
 DOMY:{'命宮':'vous-même','兄弟':'la fratrie et les amis','夫妻':'l’amour','子女':'les enfants, les placements et les associations','財帛':'l’argent','疾厄':'la santé','遷移':'les déplacements','僕役':'le réseau','官祿':'le travail','田宅':'la maison et l’immobilier','福德':'le moral','父母':'les aînés et les supérieurs'},
 FOCUS:{
  '命宮':'Cette année vous ramène à vous-même. Vous vous demandez davantage qui vous voulez devenir : c’est le moment de clarifier votre direction, de changer de style et de vous fixer de nouveaux objectifs.',
  '兄弟':'Cette année, vous échangez davantage avec votre entourage : frères et sœurs, vieux amis, partenaires de projet. Quelqu’un peut vous proposer de faire équipe, ou il faudra redéfinir certaines limites.',
  '夫妻':'Cette année, l’amour est au cœur de tout. Pour un célibataire, une rencontre devient plus probable ; en couple, la question de passer à l’étape suivante se pose.',
  '子女':'Cette année tourne autour de ce que vous faites grandir hors de vous : enfants, élèves, créations, placements, associations. Vous avez envie de mettre votre énergie dans quelque chose de nouveau.',
  '財帛':'Cette année, l’argent compte davantage. Votre façon de gagner, de dépenser et d’épargner est remise à plat.',
  '疾厄':'Cette année, votre corps se rappelle à vous. Sommeil, alimentation et activité physique sont les meilleurs investissements de cette année.',
  '遷移':'Cette année invite à sortir : déplacements professionnels, voyages, déménagement, changement d’air, projets ailleurs. Les occasions sont dehors plutôt qu’à la maison.',
  '僕役':'Cette année, votre réseau est décisif. Nouveaux collègues, clients et cercles influencent la suite. Apprenez aussi à repérer qui est sincère.',
  '官祿':'Cette année, le travail passe au premier plan : promotion, changement de voie ou gros projet. Une période chargée, mais gratifiante.',
  '田宅':'Cette année, tout se recentre sur la maison : déménagement, travaux, achat immobilier, affaires de famille, ou une épargne enfin prise au sérieux.',
  '福德':'Cette année, votre vie intérieure compte davantage. Vous avez envie de ralentir et d’apprendre ce qui vous plaît ; c’est un bon moment pour prendre soin de vos émotions.',
  '父母':'Cette année, vous avez davantage affaire aux aînés, aux supérieurs et aux institutions. Examens, certifications, documents et contrats sont au premier plan.'},
 LU:{
  '命宮':'Vous vous entendez mieux avec les autres, et on vous aide plus volontiers.','兄弟':'Amis ou fratrie apportent de bonnes nouvelles, et les collaborations se concluent facilement.','夫妻':'L’amour gagne en douceur ; un partenaire ou une personne qui vous plaît vous porte chance.','子女':'Placements, associations, enfants ou créations portent leurs fruits.',
  '財帛':'L’argent circule mieux : augmentation, prime ou nouvelle source de revenus.','疾厄':'La forme est là : idéal pour prendre de bonnes habitudes.','遷移':'Des personnes bienveillantes vous aident loin de chez vous ; voyages et occasions ailleurs sont particulièrement favorables.','僕役':'Collègues, clients et amis vous apportent ressources et occasions.',
  '官祿':'Le travail se passe bien, avec des occasions de briller et d’obtenir une promotion.','田宅':'La vie de famille est sereine : bon moment pour réaménager, déménager ou équiper la maison.','福德':'Le moral est bon, la vie paraît plus riche, et vous pouvez vous faire un peu plus plaisir.','父母':'Aînés et supérieurs vous soutiennent ; examens et démarches se passent bien.'},
 JI:{
  '命宮':'Vous risquez d’exiger trop de vous-même et de trop réfléchir ; gardez de la marge.','兄弟':'Des tensions peuvent naître avec des amis ou la fratrie ; prudence avec les prêts d’argent et les cautions.','夫妻':'La communication amoureuse peut se bloquer : ressassez moins le passé, écoutez davantage.','子女':'Prudence avec les placements et les associations ; les enfants ou les élèves peuvent aussi vous inquiéter.',
  '財帛':'Revenus et dépenses fluctuent davantage : évitez les paris risqués et constituez d’abord une réserve.','疾厄':'La fatigue s’accumule facilement : gardez un rythme régulier et faites des bilans de santé.','遷移':'Les choses sont plus difficiles loin de chez vous : faites attention dans les transports et gardez un profil bas.','僕役':'Choisissez bien vos partenaires : on peut vous entraîner vers le bas ou mal vous comprendre.',
  '官祿':'La pression au travail est forte et les choses peuvent bloquer ; demandez conseil avant les grandes décisions.','田宅':'Les questions de logement ou de famille vous pèsent ; épargnez avec discipline.','福德':'Vous risquez de vous épuiser émotionnellement ou de mal dormir ; prévoyez des moments de détente.','父母':'Le dialogue avec les supérieurs ou les aînés est plus difficile ; lisez attentivement contrats et documents.'},
 KID_FOCUS:{'夫妻':'Cette année tourne autour des personnes les plus proches : meilleurs amis, camarades qu’on aime bien. Le moment d’apprendre à dire ce qu’on ressent et à respecter les autres.','子女':'Cette année est idéale pour les loisirs et les créations : dessin, musique, sport, bricolage. L’énergie a envie de s’exprimer.','財帛':'Cette année est un bon moment pour apprendre à utiliser et à économiser l’argent de poche.','遷移':'Cette année invite à sortir : voyages, colonies, changement d’école ou déménagement. Le monde extérieur ouvre l’esprit.','僕役':'Cette année, les camarades et les amis comptent beaucoup ; nouveaux groupes et clubs apportent beaucoup d’apprentissages.','官祿':'Cette année, l’école passe au premier plan : contrôles, concours et choix. Les efforts se remarquent.','田宅':'Cette année, tout se passe à la maison : déménagement, nouvelle chambre, affaires de famille. L’ambiance à la maison compte beaucoup.'},
 KID_LU:{'夫妻':'Les amitiés vont bien, et l’on rencontre facilement des personnes avec qui l’on s’entend.','財帛':'Récompenses, étrennes ou bourses arrivent facilement : bon moment pour apprendre à épargner.','官祿':'L’école se passe bien, avec de bons résultats aux contrôles et aux concours.','僕役':'Camarades et amis donnent un coup de main, et la vie de groupe est agréable.','子女':'Loisirs et créations portent leurs fruits : montrez-les davantage.','田宅':'L’ambiance à la maison est bonne et la vie est stable.'},
 KID_JI:{'夫妻':'De petits malentendus avec les amis proches sont possibles : dites ce que vous ressentez.','財帛':'L’argent de poche part vite : apprenez à noter et à répartir.','官祿':'L’école est plus stressante : organisez le temps de travail et de repos.','僕役':'Des frictions entre camarades sont possibles : si quelque chose vous gêne, parlez-en à un adulte.','子女':'Des déceptions dans les loisirs sont possibles : donnez-vous du temps.','田宅':'Les affaires de famille peuvent peser : parlez davantage avec vos proches.','遷移':'Dehors, faites attention à votre sécurité et restez avec les adultes.'},
 STU_FOCUS:{'遷移':'Cette année invite à sortir : voyages, échanges, séjours, internat ou études ailleurs. Le monde extérieur élargit vos horizons.','兄弟':'Cette année, vous passez plus de temps avec vos frères et sœurs et vos amis proches. Vous pouvez monter un projet ensemble, et apprendre à poser des limites.','夫妻':'Cette année tourne autour de l’amour et des amitiés proches : peut-être un coup de cœur, et l’apprentissage de la façon de s’exprimer et de vivre à deux.','子女':'Cette année est idéale pour développer loisirs, créations et activités associatives ; votre énergie a envie de s’exprimer.','財帛':'Cette année est un bon moment pour apprendre à gérer l’argent de poche ou les petits boulots, et à construire un rapport sain à l’argent.','官祿':'Cette année, les études passent au premier plan : examens, admissions, choix de filière ou premier stage. Vos efforts se remarquent.','僕役':'Cette année, camarades, clubs et nouveaux amis influencent fortement la suite de votre parcours.','父母':'Cette année, vous avez davantage affaire aux enseignants et aux parents ; examens, certifications et dossiers de candidature sont au premier plan.','田宅':'Cette année tourne autour de la maison et du logement : déménagement, internat, affaires de famille. L’ambiance à la maison compte beaucoup.'},
 STU_LU:{'僕役':'Camarades et amis vous apportent aide et occasions.','兄弟':'Frères, sœurs ou amis proches apportent de bonnes nouvelles, et les projets communs réussissent.','夫妻':'Vous plaisez, et la chance sourit en amour : les belles rencontres sont faciles.','財帛':'Bourses, petits boulots ou revenus en plus arrivent.','官祿':'Les études vont bien, avec de bons résultats aux examens, concours et candidatures.','父母':'Enseignants et parents vous soutiennent ; examens et démarches se passent bien.','子女':'Loisirs et créations portent leurs fruits : montrez-les davantage.'},
 STU_JI:{'僕役':'Malentendus entre camarades ou mauvaises influences possibles : choisissez des amis sincères.','兄弟':'Des tensions avec la fratrie ou des amis proches sont possibles ; prudence avec les prêts d’argent.','夫妻':'Des malentendus en amour ou en amitié sont possibles : dites ce que vous ressentez.','財帛':'L’argent part vite : apprenez à noter et à répartir.','官祿':'La pression des études est forte : organisez travail et repos.','父母':'Le dialogue avec les enseignants ou les parents est plus difficile ; relisez bien vos dossiers.','子女':'Des déceptions dans les loisirs sont possibles : donnez-vous du temps.'},
 SEN_DOM:{'官祿':'le quotidien et vos rôles','財帛':'la retraite et les dépenses','子女':'les enfants et petits-enfants','夫妻':'votre conjoint et vos proches','僕役':'les amis et la vie sociale','父母':'les papiers, les assurances et les démarches'},
 SEN_FOCUS:{'夫妻':'Cette année tourne autour de la vie avec votre conjoint ou la personne la plus proche : organisez le quotidien et les sorties ensemble, et veillez l’un sur l’autre.','子女':'Cette année, vous voyez davantage vos enfants et petits-enfants ; un bon moment pour transmettre votre expérience.','財帛':'Cette année, l’argent compte davantage : retraite, assurances et dépenses courantes méritent d’être revues, en privilégiant la stabilité.','官祿':'Cette année, votre quotidien et vos rôles évoluent : projets de retraite, bénévolat, clubs ou ce que vous avez toujours voulu apprendre peuvent apporter une nouvelle satisfaction.','僕役':'Cette année, les amis et la vie sociale comptent : clubs, retrouvailles et activités de quartier vous remontent le moral.','父母':'Cette année apporte davantage de papiers, d’assurances, de renouvellements et de démarches : lisez bien avant de signer.','遷移':'Cette année est propice aux sorties : voyages, visites à la famille, changement d’air, à votre rythme.','兄弟':'Cette année, vous voyez davantage vos frères et sœurs et vos vieux amis, et vous veillez les uns sur les autres.'},
 SEN_LU:{'兄弟':'Frères, sœurs ou vieux amis apportent de bonnes nouvelles, et l’on veille les uns sur les autres.','夫妻':'La vie avec votre conjoint ou vos proches est harmonieuse ; vous vous appuyez l’un sur l’autre.','子女':'Enfants et petits-enfants apportent de bonnes nouvelles et de l’attention.','財帛':'L’argent est plus confortable, et les projets de retraite ou financiers avancent bien.','官祿':'Le quotidien est stable, et ce à quoi vous participez vous apporte de la satisfaction.','僕役':'Amis et clubs apportent compagnie et bonne humeur.','父母':'Démarches et papiers se règlent facilement.'},
 SEN_JI:{'遷移':'Dehors, attention à la circulation et à la sécurité, et ne surchargez pas votre emploi du temps.','夫妻':'De petites chamailleries avec votre conjoint sont possibles : faites preuve d’indulgence et dites merci plus souvent.','子女':'Vous pouvez vous inquiéter pour vos enfants ou petits-enfants : restez à l’écoute sans tout prendre en main.','財帛':'Prudence avec l’argent : évitez les placements risqués et méfiez-vous des arnaques.','官祿':'Votre rythme peut être bousculé : n’en prenez pas trop à la fois.','僕役':'Des malentendus sont possibles ; prudence avec les prêts d’argent et les cautions.','父母':'Papiers et démarches sont sources d’erreurs : vérifiez les choses importantes avec la famille.','疾厄':'Votre corps demande plus d’attention : bilans réguliers et rythme stable avant tout.'},
 STU_DOM:{'官祿':'les études','子女':'les loisirs et les créations','財帛':'l’argent de poche et les petits boulots','夫妻':'l’amour et les amitiés proches','僕役':'les camarades et les amis','父母':'les parents et les enseignants'},
 KID_DOM:{'夫妻':'les amis proches et la vie avec les autres','財帛':'l’argent de poche'},
 JUP:['la confiance et la visibilité grandissent ; un bon moment pour lancer de nouveaux projets','des occasions de revenus ou de ressources en plus','davantage d’apprentissage, d’écriture et de petits déplacements','de bons changements en famille et dans votre logement','de la chance en amour, en création et dans les loisirs','les routines de travail et les habitudes de santé s’améliorent facilement','les partenariats et les relations apportent des occasions','les ressources partagées, les placements ou les transformations profondes portent leurs fruits','études, voyages à l’étranger et horizons élargis','visibilité professionnelle et occasions de promotion','votre cercle d’amis s’élargit, et les groupes apportent des occasions','un temps de repos, de recul et de réparation intérieure'],
 SAT:['vous exigez davantage de vous-même ; une période pour vous redéfinir','il faut regarder sérieusement l’argent et l’estime de soi','la communication et les études demandent plus de rigueur','les responsabilités familiales et domestiques s’alourdissent','l’amour et la création doivent faire leurs preuves','charge de travail et santé sont à gérer','les partenariats entrent dans une phase d’épreuve et d’engagement','de profondes leçons autour de l’argent partagé et de l’intimité','vos convictions et votre direction sont à revoir','vous portez plus de responsabilités au travail, et vos efforts seront vus','votre cercle se resserre autour des personnes vraiment sur votre route','vous refermez un ancien cycle et préparez le suivant'],
 JUP_Y:['la confiance grandit ; un bon moment pour essayer du nouveau','récompenses, bourses ou ressources arrivent facilement','plus de lecture, d’écriture et d’apprentissage, avec de quoi progresser à l’école','une bonne ambiance à la maison, avec le soutien de la famille','de la chance pour s’amuser, créer et se faire des amis','les habitudes s’améliorent et la forme suit','les amitiés proches apportent de belles occasions','vous comprenez les choses plus profondément','un bon moment pour les échanges à l’étranger, les séjours et les horizons élargis','on vous remarque à l’école, en compétition ou sur scène','votre cercle d’amis grandit, et les clubs apportent des occasions','un bon moment pour se reposer et prendre du recul'],
 SAT_Y:['vous commencez à exiger davantage de vous-même et apprenez l’autonomie','apprendre à gérer vos affaires et votre argent de poche','les études demandent des bases solides','plus de choses à gérer à la maison ; faites preuve de compréhension avec la famille','loisirs et amitiés sont mis à l’épreuve','les devoirs et le rythme de vie sont à bien organiser','apprendre à faire des concessions dans les amitiés proches','des leçons émotionnelles plus profondes','le moment de repenser ce que vous voulez étudier','plus de responsabilités à l’école, et vos efforts seront vus','votre cercle se resserre autour des personnes avec qui vous vous entendez vraiment','une étape se termine, et un nouvel environnement se prépare'],
 JUP_S:['de l’énergie et l’envie de nouveautés','des finances confortables, ou une famille aux petits soins','plus de plaisir à apprendre, lire et discuter','de bons changements à la maison, et des réunions de famille','loisirs, sorties et moments avec les petits-enfants sont un bonheur','les bonnes habitudes de santé s’installent facilement','de bonnes choses avec votre conjoint ou vos proches','une compréhension plus profonde de la vie','un bon moment pour voyager un peu plus loin','votre expérience est appréciée et respectée','amis et clubs vous tiennent compagnie','un bon moment pour le repos et le soin de soi'],
 SAT_S:['votre énergie et votre moral demandent de l’attention','prudence avec l’argent, et une bonne planification','de la patience dans les échanges, et une double vérification','la sécurité de la maison et les affaires de famille demandent de l’attention','profitez des loisirs à votre rythme','la santé demande un rythme régulier et des bilans','votre conjoint et vous devez faire preuve d’indulgence l’un envers l’autre','des questions de vie plus profondes','repenser l’orientation du quotidien','vous avez encore des responsabilités ; faites ce qui est raisonnable','votre cercle se réduit aux personnes qui vous sont les plus chères','un bon moment pour conclure, trier et lâcher prise']
};
const fromM=m=>`à partir ${de(m)}`;
T.hl={
 basis:'Sur la base de',
 agree:s=>`${cap(s)} s’accordent`,youAre:(th,tag)=>`${th} : ${T.q(tag)}`,
 core:'Votre cœur',
 mingWhy:(e,s)=>`Palais de la Vie${e?' (sans étoile principale, on emprunte le palais opposé)':''} : ${s}`,
 sunAsc:(s,a)=>`Soleil en ${s}, Ascendant en ${a}`,hdWhy:(t,p)=>`Human Design : ${t}, ${p}`,
 chapter:r=>`Ce chapitre (${r[0]}–${r[1]} ans)`,chapter0:'Ce chapitre',
 focusOn:d=>`Au centre : ${d}`,
 thisYear:(y,yp)=>`Cette année (${y}), votre palais annuel de la Vie passe dans votre ${pal(yp)}.`,
 decWhy:(p,g)=>`Palais de la Vie décennal dans votre ${pal(p)} natal (${g})`,
 decStars:(s,e)=>`Étoiles principales de la décennie : ${s}${e?' (palais vide, on emprunte le palais opposé)':''}`,
 yearWhy:(g,yp)=>`Année ${g} ; palais annuel de la Vie dans votre ${pal(yp)}`,
 unbornT:'Naissance à venir',unbornB:'Cette date de naissance est dans le futur : il n’y a pas encore de décennies ni d’années à lire ; le thème natal reste valable.',unbornW:by=>`Année lunaire de naissance : ${by}`,
 doneT:'Les douze décennies sont parcourues',doneB:(a,l)=>`À ${a} ans (âge chinois), vous avez dépassé la dernière décennie du thème, qui s’arrête à ${l} ans. Les lectures par décennie ne s’appliquent plus, mais le thème natal et les cycles annuels, si.`,doneW:l=>`La dernière décennie s’arrête à ${l} ans`,
 childT:'Encore dans la période d’enfance',childB:'La première décennie n’a pas encore commencé ; pour l’instant, le palais de la Vie et l’environnement familial donnent surtout le ton.',childW:f=>`La première décennie commence à ${f} ans`,
 newDec:(r,p)=>`Une nouvelle décennie commence (${r[0]}–${r[1]} ans, ${pal(p)})`,
 decFocus:d=>`Ces dix années sont centrées sur ${d}.`,
 around:(ms,first)=>` (en ${list(ms)}${first?'':', dans la continuité de l’an dernier'})`,
 satReturn:'Retour de Saturne',satReturnT:'un grand examen de vie qui revient environ tous les 29 ans. Il vous pousse à regarder en face la vie que vous voulez vraiment et à laisser partir ce qui ne vous convient plus.',
 satOpp:'Saturne en opposition à Saturne natal',satOppT:'un point de contrôle de milieu de vie : vos choix passés sont réévalués.',
 jupReturn:'Retour de Jupiter',jupReturnT:'le début d’un nouveau cycle d’environ 12 ans ; un bon moment pour repartir de zéro et voir plus grand.',
 uraOpp:'Opposition d’Uranus',uraOppT:'le fameux « tournant du milieu de vie ». L’envie de rompre et de changer est forte ; un bon moment pour faire ce dont vous rêvez depuis longtemps.',
 hd6up:'Human Design, 6e ligne : monter sur le toit',hd6upT:'vers 30 ans, vous passez de l’apprentissage par essais et erreurs à une phase d’observation et de maturation.',
 hd6down:'Human Design, 6e ligne : descendre du toit',hd6downT:'vers 50 ans, l’expérience accumulée fait de vous un modèle pour les autres.',
 decHead:(p,t)=>`Nouvelle décennie (${pal(p)})${t?' : '+t:''}`,
 ypLine:(yp,ov)=>`Palais annuel de la Vie dans votre ${pal(yp)}${ov?' (il coïncide avec le palais de la Vie décennal : le meilleur comme le plus difficile est amplifié)':''}`,
 alsoYearly:(yp,d)=>d==='vous-même'?` (c’est aussi votre ${palA(yp)} cette année, qui vous concerne aussi)`:` (c’est aussi votre ${palA(yp)} cette année, ce qui concerne également ${d})`,
 mutIn:(s,k,p)=>`${s} ${MUT[k]} entre dans votre ${pal(p)}`,
 notes:{
  nji:(s,p,d)=>`<b>Votre étoile Hua Ji de naissance, ${s}, occupe le palais annuel de la Vie</b> : d’anciens sujets peuvent refaire surface cette année ; armez-vous de patience pour ${d}.`,
  dji:(s,p)=>`<b>Double Hua Ji : ${s} est Hua Ji à la naissance et de nouveau cette année</b> : votre ${pal(p)} est le point le plus délicat de l’année ; ralentissez avant les grandes décisions.`,
  nlu:s=>`<b>Votre étoile Hua Lu de naissance, ${s}, occupe le palais annuel de la Vie</b> : votre chance naturelle s’active et les choses avancent plus facilement.`,
  dlu:(s,p)=>`<b>Double Hua Lu : ${s} est Hua Lu à la naissance et de nouveau cette année</b> : les bienfaits de votre ${pal(p)} sont doublés.`,
  dcji:s=>`<b>L’étoile Hua Ji de la décennie, ${s}, occupe le palais annuel de la Vie</b> : la pression de cette décennie se fait surtout sentir cette année.`,
  dclu:s=>`<b>L’étoile Hua Lu de la décennie, ${s}, occupe le palais annuel de la Vie</b> : les occasions de cette décennie sont plus faciles à saisir cette année.`},
 ingFrom:fromM,ingBack:m=>`de retour ${fromM(m)}`,ingInto:(m,h)=>`entrée dans votre ${house(h)} en ${m}`,
 jupLine:h=>`Jupiter traverse surtout votre ${house(h)} cette année`,
 satLine:(h,hard)=>`Saturne séjourne surtout dans votre ${house(h)} cette année${hard?', le secteur le plus exigeant de l’année':''}`,satHard:'',
 age:n=>`${n} ans`,
 past:'Avec le recul : avez-vous vécu cela cette année-là ?',
 tlTitle:'Votre chemin, année après année',
 tlIntro:(a,b)=>`De ${a} à ${b}. Les années passées servent à vérifier par vous-même. « Porteur / Stable / Effort » est une estimation globale fondée sur les palais où tombent les Si Hua (quatre transformations) de l’année et sur les transits de Jupiter et de Saturne, en tenant compte de l’effet des Si Hua de naissance et de la décennie sur le palais annuel de la Vie. Ce n’est pas un verdict. Les âges suivent le compte chinois (1 an à la naissance), comme en Zi Wei.`,
 tlUnborn:'Naissance postérieure à cette période : pas de cycles annuels à lire.'
};
T.intent={
 kicker:'Votre question',more:'Voir le rapport complet du thème →',
 kidT:'Encore en pleine croissance',kidB:a=>`Ce thème a ${a} ans (âge chinois) : le moment de l’amour, du travail et des revenus aura plus de sens un peu plus tard. Pour l’instant, les traits de fond ci-dessus et les notes sur l’école, la famille et les loisirs dans la chronologie ci-dessous sont plus utiles.`,
 STATUS:{
  single:{ask:'Quand vais-je rencontrer la bonne personne ?',good:'Les années les plus riches en occasions amoureuses',tip:'Ces années-là, sortez davantage, acceptez les invitations de vos amis ou les présentations : c’est plus efficace que d’attendre.'},
  crush:{ask:'Cette relation ambiguë peut-elle avancer ?',good:'Les années pour clarifier les choses et faire un pas',tip:'Si vous attendez depuis longtemps, choisissez un moment détendu pour dire ce que vous ressentez. C’est mieux que de deviner.'},
  dating:{ask:'Quelle est la prochaine étape pour nous ?',good:'Les années pour les étapes suivantes : vivre ensemble, rencontrer la famille, se marier',tip:'Abordez les grandes décisions pendant les années porteuses : l’accord vient plus facilement.'},
  married:{ask:'Comment faire vivre encore mieux notre couple ?',good:'Les années où la relation s’adoucit et où l’on peut faire des projets ensemble',tip:'Les années porteuses, prévoyez un voyage ou un objectif commun ; les années plus dures, un peu plus de patience et moins de vieux reproches.'},
  broke:{ask:'Comment tourner la page, et quand viendra un nouveau départ ?',good:'Les années où de nouvelles rencontres viennent plus facilement',tip:'Prenez d’abord soin de vous : dormez, mangez bien, parlez à des amis de confiance. Accordez-vous du temps sans obligation de décider. Revenir ou non, c’est à vous de choisir, pas au thème ; vous méritez une relation où vous vous sentez en sécurité.'},
  none:{ask:'Comment va évoluer ma vie amoureuse ?',good:'Les années les plus riches en occasions amoureuses',tip:''}},
 loveT:a=>`Amour : ${a}`,loveYou:t=>`Votre façon d’aimer : ${t}.`,
 threeSay:t=>`En croisant les trois thèmes, vos notes dominantes sont ${t}.`,threeType:t=>`En croisant les trois thèmes, vos notes dominantes sont ${t}.`,
 relative:' (relativement)',
 loveNone:'Aucune année ne se détache pour l’amour dans les prochaines années : les occasions sont réparties assez régulièrement, et ce qui compte le plus, c’est de prendre l’initiative.',
 loveBad:'Les années qui demandent un peu plus de patience',
 loveSen:'À ce stade, l’amour, c’est la façon de vivre avec votre conjoint ou les personnes qui comptent, et de veiller les uns sur les autres. Les années porteuses se prêtent aux sorties et aux projets communs ; les plus difficiles demandent un peu plus de compréhension.',
 JOB:{
  student:{ask:'Quelle direction prendre ?',good:'Les années pour viser les examens et choisir une voie',tip:'Pendant vos études, essayez beaucoup de choses : les forces de votre thème montrent ce qui vous vient facilement.'},
  seeking:{ask:'Quand sera-t-il plus facile de trouver un bon emploi ?',good:'Les années où recherche d’emploi et entretiens se passent mieux',tip:'Même si cette année n’est pas la plus porteuse, préparez dès maintenant votre portfolio et votre CV pour saisir l’occasion quand elle viendra.'},
  employee:{ask:'Promotion ou nouvelle scène ?',good:'Les années où votre travail se remarque et où une promotion vaut la peine d’être demandée',tip:'Les années porteuses, demandez ce que vous voulez ; les années plus dures, consolidez vos compétences sans vous précipiter.'},
  founder:{ask:'Quand se développer, et quand tenir ?',good:'Les années pour se développer et passer à l’action',tip:'Développez-vous pendant les années porteuses ; les années plus dures, protégez d’abord la trésorerie et l’équipe.'},
  change:{ask:'Quand changer de voie ?',good:'Les années pour changer de cap et commencer autre chose',tip:'Avant de changer, testez à petite échelle avec un projet parallèle ou une formation, et engagez-vous pleinement quand vous avez des retours.'},
  none:{ask:'Comment va évoluer ma carrière ?',good:'Les années les plus riches en occasions professionnelles',tip:''}},
 workT:a=>`Travail : ${a}`,moneyT:'Argent : quand est-ce plus fluide, et quand faut-il se retenir ?',
 workYou:t=>`Votre façon de travailler : ${t}.`,moneyYou:t=>`Votre façon de gagner de l’argent : ${t}.`,
 fields:f=>`Directions qui vous conviennent : ${f}`,
 moneyGood:'Les années où revenus et occasions circulent mieux',
 workNone:'Aucune année ne se détache dans les prochaines : construire régulièrement compte plus qu’attendre le bon moment.',
 workBad:'Les années pour tenir bon et consolider',moneyBad:'Les années de prudence financière',
 workSen:'À ce stade, il s’agit moins de promotion que de la façon d’occuper vos journées : les années porteuses se prêtent au bénévolat, aux clubs, à l’enseignement ou à ce que vous avez toujours voulu apprendre ; les plus difficiles, faites ce qui vous est confortable.',
 moneySen:'Les années porteuses, profitez un peu plus de la vie ; les années de prudence, misez sur la retraite et les assurances, évitez les placements risqués et méfiez-vous des arnaques.',
 moneyTip:'Les années porteuses, mettez d’abord de côté une partie des revenus en plus ; les années de prudence, évitez les placements risqués et constituez six mois de réserve.',
 yearT:y=>`Comment va se passer cette année (${y}) ?`,
 yearBody:o=>{let s=`<b>Cette année est centrée sur ${o.focus}.</b>`;const a=[];if(o.lu)a.push(`ce qui avance : ${o.lu.dom} (${o.lu.how})`);if(o.ji)a.push(`ce qui demande plus d’attention : ${o.ji.dom} (${o.ji.how})`);if(a.length)s+=' '+cap(a.join(' ; '))+'.';
   const b=[];if(o.jup)b.push(`Jupiter traverse votre ${house(o.jup)}`);if(o.sat)b.push(`Saturne se trouve dans votre ${house(o.sat)}`);if(b.length)s+=' '+b.join(' et ')+'.';return s;},
 nextYear:(y,d,dec)=>`<b>L’an prochain (${y})</b>, le centre se déplace vers ${d}${dec?', et une nouvelle décennie commence':''}.`,
 yearTip:y=>`L’année ${y} est déjà ouverte dans la chronologie ci-dessous, avec tous les détails.`,
 mixed:t=>` ; mais la même année : ${t}, donc un mélange des deux`,
 R:{yp:(s,p)=>`palais annuel de la Vie dans votre ${pal(p)}`,lu:(s,p)=>`${s} Hua Lu entre dans votre ${pal(p)}`,quan:(s,p)=>`${s} Hua Quan entre dans votre ${pal(p)}`,ji:(s,p)=>`${s} Hua Ji entre dans votre ${pal(p)}`,
   ylu:(s,p)=>`${s} Hua Lu entre dans le ${palA(p)}`,yji:(s,p)=>`${s} Hua Ji entre dans le ${palA(p)}`,jup:(s,p,h)=>`Jupiter dans votre ${house(h)}`,sat:(s,p,h)=>`Saturne dans votre ${house(h)}`}
};
T.cal={
 TONE:{up:['Fluide','up'],even:['Calme','even'],hard:['Vigilance','hard']},
 mpLine:p=>`Palais mensuel de la Vie dans votre ${pal(p)}`,monthly:p=>palM(p),
 RETRO:{Mercury:['Mercure rétrograde','vérifiez deux fois contrats, achats high-tech, trajets et échanges importants. Idéal pour revoir et corriger, moins pour lancer du neuf.'],Venus:['Vénus rétrograde','ralentissez sur les décisions amoureuses et les dépenses ; d’anciennes flammes ou de vieux amis peuvent refaire surface.'],Mars:['Mars rétrograde','l’action peut caler ou être à refaire. Laissez retomber les conflits avant de les traiter, et gardez de la marge dans vos plans.']},
 ing:(k,d,h)=>`${k==='Jupiter'?'Jupiter':'Saturne'} entre dans votre ${house(h)} vers le ${d}`,
 nowK:(lab,r)=>`Ce mois-ci (${lab}, environ ${r})`,
 title:y=>`Calendrier ${y} mois par mois (année lunaire ${y})`,
 intro:'Chaque mois se lit à partir du palais mensuel de la Vie et des palais où tombent les Si Hua (quatre transformations) du mois dans votre thème natal, avec en plus les rétrogradations de Mercure, Vénus et Mars et les changements de maison de Jupiter et de Saturne. Les dates sont approximatives, et « Fluide / Calme / Vigilance » n’est qu’une estimation d’ensemble.'
};
const PD={'命宮':'la confiance et la chance','兄弟':'les amitiés et les liens familiaux','夫妻':'la vie amoureuse','子女':'les enfants, les placements et les collaborations','財帛':'les finances','疾厄':'la santé et le bien-être','遷移':'la vie à l’extérieur','僕役':'la vie sociale','官祿':'la carrière','田宅':'la vie de famille','福德':'la paix intérieure','父母':'la famille et les aînés'};
const ASPF=['en conjonction avec','en sextile avec','en carré avec','en trigone avec','en opposition avec'];
const PLN={Sun:'Soleil',Moon:'Lune',Mercury:'Mercure',Venus:'Vénus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturne',ASC:'Ascendant'};
const PLA={Sun:'le Soleil',Moon:'la Lune',Mercury:'le Mercure',Venus:'la Vénus',Mars:'le Mars',Jupiter:'le Jupiter',Saturn:'le Saturne',ASC:'l’Ascendant'};
const LVA={'Attirance':'l’attirance','Complicité':'la complicité','Stabilité':'la stabilité'};
const du=a=>a==='Chèvre'?'de la Chèvre':`du ${a}`;
T.pair={
 who:nm=>nm?{n:nm,N:nm,de:de(nm)}:{n:'l’autre personne',N:'L’autre personne',de:'de l’autre personne'},
 item:(it,c)=>{const nb=c.nb;switch(it.t){
  case 'syn':return `votre ${PLN[it.s.a]} ${ASPF[c.ai(it.s)]} ${PLA[it.s.b]} ${nb.de}`;
  case 'hdem':return `canal électromagnétique Human Design ${it.k}`;case 'hdcomp':return `canal partagé Human Design ${it.k}`;case 'hdcmp':return `canal de compromis Human Design ${it.k}`;case 'hddom':return `canal de dominance Human Design ${it.k}`;
  case 'zlu':return it.dir==='AB'?`le Hua Lu de naissance ${nb.de} entre dans votre ${pal(it.pal)}`:`votre Hua Lu de naissance entre dans le ${pal(it.pal)} ${nb.de}`;
  case 'zji':return it.dir==='AB'?`le Hua Ji de naissance ${nb.de} entre dans votre ${pal(it.pal)}`:`votre Hua Ji de naissance entre dans le ${pal(it.pal)} ${nb.de}`;
  case 'match':return it.dir==='AB'?`les étoiles du palais de la Vie ${nb.de} (${it.stars.map(c.star).join(', ')}) sont celles de votre palais du Couple`:`les étoiles de votre palais de la Vie (${it.stars.map(c.star).join(', ')}) sont celles du palais du Couple ${nb.de}`;
  case 'zod':return {he:'signes chinois en Liu He (six harmonies)',san:'signes chinois en San He (trois harmonies)',chong:'signes chinois en opposition (clash)'}[it.rel];
  case 'ov':return it.dir==='AB'?`${PLA[it.k]} ${nb.de} dans votre ${house(it.h)}`:`votre ${PLN[it.k]} dans la ${house(it.h)} ${nb.de}`;}return '';},
 LV:['Peu marquée','Présente','Nette','Très forte'],LVF:['Peu nombreuses','Quelques-unes','Assez nombreuses','Nombreuses'],
 MN:{attract:['Attirance','L’étincelle et la chimie entre vous'],sync:['Complicité','Vous comprenez-vous, avez-vous des choses à vous dire ?'],stable:['Stabilité','Cela peut-il durer et vous rassurer ?'],friction:['Frictions','Là où ça coince et où il faut s’ajuster']},
 basis:n=>`${n} indicateur${n>1?'s':''}`,
 sumNone:nb=>`En réunissant vos trois thèmes et ceux ${nb.de}, ni l’attirance, ni la complicité, ni la stabilité ne ressortent particulièrement : la forme de cette relation dépend davantage de la façon dont vous la cultiverez que d’une attraction innée.`,
 sumTop:(nb,a,b)=>`En réunissant vos trois thèmes et ceux ${nb.de}, ce qui ressort le plus, c’est <b>${LVA[a]||a}</b>${b?`, puis <b>${LVA[b]||b}</b>`:''}.`,
 frMany:'Les frictions sont assez nombreuses, et ce n’est pas un mal : beaucoup de relations durables se construisent à travers les disputes. L’essentiel est de savoir où ça coince.',
 frFew:'Peu de frictions : être ensemble demande moins d’efforts.',
 noSign:'aucun indicateur net',
 h:{sum:'Vue d’ensemble',west:'Synastrie',aspects:'Les aspects clés entre vous',ovAB:nb=>`Où tombent les planètes ${nb.de} dans votre thème`,ovBA:nb=>`Où tombent vos planètes dans le thème ${nb.de}`,zw:'Compatibilité Zi Wei',fly:'Les Si Hua de naissance d’un thème à l’autre',match:'Cette personne correspond-elle à votre palais du Couple ?',zod:'Zodiaque chinois',hd:'Compatibilité Human Design',withB:nb=>`S’entendre avec ${nb.n}`,bWithYou:nb=>`Comment ${nb.n} peut s’entendre avec vous`,tips:'Conseils pour vous deux'},
 orb:x=>`orbe ${x}°`,
 noAsp:'Il n’y a pas d’aspect serré entre vos planètes personnelles : le cœur de cette relation se trouve plutôt dans les autres systèmes.',
 SYN:{
  'Moon-Sun':{conj:'Le Soleil de l’un rencontre la Lune de l’autre : la combinaison classique de la compatibilité. Ce que l’un veut faire, l’autre le soutient du fond du cœur ; ensemble, le sentiment d’être compris est fréquent.',soft:'Le sens de l’orientation de l’un s’accorde avec les besoins affectifs de l’autre : le quotidien est naturel, et s’ajuster demande peu d’effort.',hard:'L’un veut foncer, l’autre a besoin de sécurité. Vos rythmes se croisent souvent mal : dites ce dont vous avez besoin au lieu de laisser l’autre deviner.'},
  'Sun-Sun':{conj:'Vos traits essentiels se ressemblent beaucoup, comme dans un miroir : vous vous comprenez facilement, mais vous pouvez aussi vouloir tous les deux le premier rôle.',soft:'Vos directions de vie se répondent ; quand vous faites la même chose, l’entente est naturelle.',hard:'Vous vous exprimez différemment, et personne ne veut céder le premier. Des rôles clairs et une scène pour chacun limitent les conflits.'},
  'Moon-Moon':{conj:'Vos habitudes émotionnelles sont presque identiques : être ensemble, c’est comme rentrer à la maison. Revers de la médaille : quand l’un a le moral en berne, l’autre suit.',soft:'Vous gérez vos émotions de façon compatible, et vous vous réconciliez plus facilement après une dispute.',hard:'L’un a besoin de parler, l’autre de silence. Quand l’émotion monte, commencez par demander : « De quoi as-tu besoin, là ? »'},
  'Mars-Venus':{conj:'Une forte attirance : le charme de l’un enflamme l’élan de l’autre. Une combinaison pleine d’étincelles.',soft:'Une chimie naturelle : séduire et être séduit vient naturellement, et l’intimité naît vite.',hard:'L’attirance est forte, les frictions aussi. Plus vous tenez l’un à l’autre, plus vous vous disputez, et après, l’envie de se rapprocher revient vite.'},
  'Venus-Venus':{conj:'Vous aimez les mêmes choses : goûts, façons de sortir et manières d’exprimer l’amour s’accordent.',soft:'Vous partagez le même sens du beau et du plaisir : la vie à deux est agréable.',hard:'Vous n’exprimez pas l’amour de la même façon : l’un a l’impression de beaucoup donner, l’autre ne le reçoit pas. Explicitez vos « langages de l’amour ».'},
  'Mars-Mars':{conj:'Vous avez le même élan : ensemble, l’efficacité est au rendez-vous, mais l’explosion peut aussi être simultanée.',soft:'Vos rythmes d’action s’accordent : sport ou projets à deux avancent bien.',hard:'Vous gérez les conflits différemment, et une broutille peut tourner au bras de fer. Calmez-vous d’abord, parlez ensuite.'},
  'Mercury-Mercury':{conj:'Vous pensez de la même façon ; souvent, l’autre a compris avant la fin de votre phrase.',soft:'Vous avez de la conversation, la communication est fluide et vous pouvez parler de tout.',hard:'Vous ne pensez pas de la même façon : l’un va à l’essentiel, l’autre aux détails. Les malentendus sont faciles ; notez les choses importantes ou vérifiez-les une seconde fois.'},
  'Sun-Venus':{conj:'L’un admire profondément l’autre. Ce sentiment de « je t’aime tel que tu es » est très chaleureux.',soft:'Vous vous appréciez mutuellement et vous vous mettez en valeur l’un l’autre.',hard:'De l’admiration mêlée d’un peu de tiraillement : vous vous plaisez, mais vous pouvez aussi vouloir changer l’autre.'},
  'Moon-Venus':{conj:'Une combinaison douce et attentionnée : être ensemble est confortable, comme quand on prend bien soin de vous.',soft:'Vous savez prendre soin des sentiments de l’autre et vous vous accordez dans les détails du quotidien.',hard:'L’un veut être choyé, l’autre admiré. Quand les attentes divergent, dites-le.'},
  'Mars-Sun':{conj:'L’un attise la combativité de l’autre : beaucoup d’énergie ensemble, et un peu de rivalité aussi.',soft:'Vous vous poussez mutuellement et atteignez vos objectifs ensemble.',hard:'Vous vous provoquez facilement et vous disputez le contrôle. Laissez à chacun de la place pour décider.'},
  'Mars-Moon':{conj:'Émotions et action sont liées ; la passion est directe et peut parfois toucher les points sensibles de l’autre.',soft:'L’élan de l’un protège les émotions de l’autre, ce qui donne un sentiment de sécurité.',hard:'L’un parle trop franchement, l’autre se blesse facilement. Pensez à ce que ressent l’autre avant de parler.'},
  'Saturn-Sun':{conj:'Un lien de responsabilité : l’un est comme le mentor ou le pilier de l’autre. Stable, mais parfois pesant.',soft:'Vous vous apportez stabilité et sens de l’engagement : de quoi construire sur la durée.',hard:'L’un peut se sentir contrôlé ou bridé. Transformez les « exigences » en « parlons-en ensemble ».'},
  'Moon-Saturn':{conj:'Un lien très engagé, même si l’un peut avoir l’impression que ses émotions ne sont pas accueillies.',soft:'Vous vous rassurez mutuellement, et la relation se consolide avec le temps.',hard:'Les émotions de l’un peuvent être étouffées par le calme ou la sévérité de l’autre. Dites plus souvent « je te comprends ».'},
  'Saturn-Venus':{conj:'Une combinaison qui prend la relation au sérieux, fréquente chez les couples durables ; mais la romance demande un entretien délibéré.',soft:'L’amour s’accompagne de responsabilité, et vous pouvez construire l’avenir ensemble.',hard:'L’amour pèse : l’un ne se sent pas assez aimé, l’autre se sent trop sollicité.'},
  'ASC-Sun':{conj:'L’un est marqué par l’autre dès le premier regard : une première impression forte, souvent comme des retrouvailles.',soft:'Vous vous faites mutuellement bonne impression, et être ensemble semble naturel.',hard:'La première impression peut accrocher un peu ; c’est en vous connaissant mieux que vous verrez les qualités de l’autre.'},
  'ASC-Venus':{conj:'Une attirance d’allure ou de présence : l’un trouve l’autre particulièrement à son goût.',soft:'Vous appréciez mutuellement votre style, et vous allez naturellement bien ensemble.',hard:'Vos goûts ou modes de vie diffèrent un peu : il faut faire de la place à l’autre.'},
  'ASC-Moon':{conj:'L’un rassure profondément l’autre, comme un vieil ami.',soft:'Vous êtes à l’aise ensemble, sans avoir besoin de jouer un rôle.',hard:'L’humeur de l’un est facilement influencée par la façon dont l’autre se présente.'}},
 OV_AB:{Sun:nb=>`Ici, ${nb.n} vous donne plus de présence et l’envie de briller.`,Moon:nb=>`Ici, ${nb.n} vous apporte un sentiment de familiarité et de sécurité ; c’est aussi là que vos émotions sont le plus facilement remuées.`,Venus:nb=>`Ici, ${nb.n} vous apporte plaisir et attirance.`,Mars:nb=>`Ici, ${nb.n} stimule votre élan ; c’est aussi là que les étincelles ou les heurts surviennent le plus facilement.`},
 OV_BA:{Sun:nb=>`Ici, vous donnez à ${nb.n} plus de présence et l’envie de briller.`,Moon:nb=>`Ici, vous apportez à ${nb.n} un sentiment de familiarité et de sécurité ; c’est aussi là que ses émotions sont le plus facilement remuées.`,Venus:nb=>`Ici, vous apportez à ${nb.n} plaisir et attirance.`,Mars:nb=>`Ici, vous stimulez l’élan ${nb.de} ; c’est aussi là que les étincelles ou les heurts surviennent le plus facilement.`},
 flyIntro:'On place les Si Hua (quatre transformations) de l’année de naissance de l’un sur le thème de l’autre, pour voir ce que chacun apporte à l’autre et ce qui le préoccupe.',
 luAB:(nb,st,s,p)=>`Le Hua Lu ${nb.de} (année de naissance ${st}), ${s}, entre dans votre ${pal(p)}`,
 jiAB:(nb,s,p)=>`Le Hua Ji ${nb.de}, ${s}, entre dans votre ${pal(p)}`,
 luBA:(nb,st,s,p)=>`Votre Hua Lu (année de naissance ${st}), ${s}, entre dans le ${pal(p)} ${nb.de}`,
 jiBA:(nb,s,p)=>`Votre Hua Ji, ${s}, entre dans le ${pal(p)} ${nb.de}`,
 LU_P:{
  '命宮':nb=>`${nb.N} vous donne plus d’assurance et de chance ; à ses côtés, vous êtes davantage vous-même.`,
  '兄弟':nb=>`${nb.N} s’entend bien avec vos amis et votre fratrie, ou vous aide comme un véritable coéquipier.`,
  '夫妻':nb=>`${nb.N} apporte de la douceur à votre vie amoureuse : la combinaison classique du « destin ».`,
  '子女':nb=>`${nb.N} vous porte chance pour les enfants, les placements et les collaborations.`,
  '財帛':nb=>`${nb.N} est bénéfique à vos finances ; ensemble, les questions d’argent se règlent mieux.`,
  '疾厄':nb=>`${nb.N} vous aide à vous détendre, corps et esprit ; à ses côtés, vous prenez mieux soin de vous.`,
  '遷移':nb=>`${nb.N} vous emmène vers le monde et élargit vos horizons et vos occasions.`,
  '僕役':nb=>`${nb.N} vous apporte des contacts et enrichit votre vie sociale.`,
  '官祿':nb=>`${nb.N} est bénéfique à votre carrière et peut être un vrai soutien au travail.`,
  '田宅':nb=>`${nb.N} vous donne un sentiment de foyer : propice pour fonder une famille ou acheter un bien ensemble.`,
  '福德':nb=>`${nb.N} vous remonte le moral et vous enrichit intérieurement.`,
  '父母':nb=>`${nb.N} s’entend bien avec votre famille et vos aînés, ou vous soutient comme le ferait un aîné.`},
 JI_P:{
  '命宮':nb=>`Vous êtes très attentif à tout ce que fait ${nb.n}, et c’est cette relation qui fait le plus varier vos humeurs.`,
  '兄弟':()=>'Les amis, la fratrie ou l’argent entre vous peuvent facilement créer des rancœurs.',
  '夫妻':()=>'Vous tenez énormément à cette relation ; plus vous y tenez, plus la communication peut se bloquer.',
  '子女':()=>'Des désaccords sont possibles sur les enfants, les placements ou les collaborations.',
  '財帛':()=>'Vos visions de l’argent peuvent diverger ; parlez d’abord clairement des finances communes.',
  '疾厄':nb=>`Le stress peut s’accumuler dans votre corps quand vous êtes avec ${nb.n} ; gardez chacun des moments de repos.`,
  '遷移':()=>'Les sorties, les déménagements ou la distance peuvent créer des frictions.',
  '僕役':nb=>`Des malentendus peuvent naître autour des amis ${nb.de} ou d’une tierce personne.`,
  '官祿':nb=>`${nb.N} peut influencer vos décisions professionnelles, et des désaccords sur la carrière sont possibles.`,
  '田宅':()=>'Des divergences sont possibles sur la famille, le logement ou l’immobilier.',
  '福德':nb=>`${nb.N} peut vous faire trop réfléchir ; un ajustement émotionnel peut être nécessaire.`,
  '父母':nb=>`La relation avec la famille et les aînés ${nb.de} demande une attention particulière.`},
 luBAT:(nb,p)=>`Vous apportez facilité et chance dans ${PD[p]} ${nb.de} ; à vos côtés, ce domaine a tendance à mieux se passer.`,
 jiBAT:(nb,p)=>`C’est là que ${nb.n} est le plus sensible à ce que vous faites, et où des frictions peuvent s’accumuler (domaine concerné : ${PD[p]}). Parlez-en avant que les choses ne pèsent trop.`,
 matchAB:(nb,sp,mg,m)=>`Étoiles de votre palais du Couple : ${sp} ; étoiles du palais de la Vie ${nb.de} : ${mg}. ${m?`<b>Elles se recoupent sur ${m}</b> : ${nb.n} ressemble beaucoup au partenaire que décrit votre thème.`:`Aucun recoupement : ${nb.n} n’est pas le profil type de votre palais du Couple, et cette relation vous fait découvrir un autre genre de personne.`}`,
 matchBA:(nb,sp,mg,m)=>`Étoiles du palais du Couple ${nb.de} : ${sp} ; étoiles de votre palais de la Vie : ${mg}. ${m?`<b>Elles se recoupent sur ${m}</b> : vous ressemblez beaucoup au partenaire que décrit le thème ${nb.de}.`:'Aucun recoupement.'}`,
 ANI:['Rat','Buffle','Tigre','Lapin','Dragon','Serpent','Cheval','Chèvre','Singe','Coq','Chien','Cochon'],
 zod:(nb,a,b,rel)=>`Vous êtes du signe ${du(a)}, ${nb.n} du signe ${du(b)} (selon l’année lunaire). `+({same:'Même signe : personnalités et valeurs proches ; être ensemble ressemble à une vieille amitié.',he:'Liu He (six harmonies) : traditionnellement, une paire complémentaire où l’on se soutient.',san:'San He (trois harmonies) : traditionnellement, des esprits proches qui collaborent facilement.',chong:'Clash : traditionnellement, des tempéraments et des rythmes très différents qui demandent plus de tolérance ; c’est aussi souvent le point de départ d’une attirance.',hai:`Paire « nuisible » (${a} et ${b}) : traditionnellement sujette aux petits malentendus ou rancœurs. Ce n’est qu’un petit rappel : dites les choses clairement et ne laissez pas les émotions s’accumuler.`,po:`Paire « brisée » (${a} et ${b}) : traditionnellement, des rythmes ou des habitudes un peu différents qui bousculent parfois les plans de l’autre. L’effet est faible : parlez à l’avance et gardez de la souplesse.`,none:'Pas d’harmonie ni de clash particulier entre vos signes : d’autres facteurs comptent davantage.'})[rel],
 folk:' (Tradition populaire, à prendre avec légèreté.)',
 types:(nb,a,b)=>`Vous êtes ${a} ; ${nb.n} est ${b}.`,
 TIP:{
  generator:nb=>`Parlez à ${nb.n} avec des questions fermées (oui ou non), pour que la réponse vienne des tripes, plutôt que d’exiger une décision immédiate.`,
  mg:nb=>`${nb.N} va vite et fait souvent plusieurs choses à la fois. Convenez de vous prévenir avant d’agir : cela évite bien des malentendus.`,
  manifestor:nb=>`${nb.N} a besoin de liberté pour lancer les choses. N’essayez pas de tout contrôler, et demandez simplement un mot d’avance avant l’action.`,
  projector:nb=>`${nb.N} a besoin de reconnaissance et d’invitations. Demandez sincèrement son avis : ses conseils seront très justes.`,
  reflector:nb=>`${nb.N} a besoin de temps (environ un mois) pour les grandes décisions : ne pressez pas. ${nb.N} reflète l’état réel de votre relation.`},
 TIP_YOU:{
  generator:nb=>`${nb.N} peut vous parler avec des questions fermées (oui ou non), pour que votre réponse vienne des tripes, plutôt que d’attendre une décision immédiate.`,
  mg:nb=>`Vous allez vite et faites souvent plusieurs choses à la fois. Convenez avec ${nb.n} de prévenir avant d’agir : cela évite bien des malentendus.`,
  manifestor:nb=>`Vous avez besoin de liberté pour lancer les choses. ${nb.N} n’a pas besoin de vous contrôler ; prévenez simplement avant d’agir.`,
  projector:nb=>`Vous avez besoin de reconnaissance et d’invitations. Quand ${nb.n} vous demande sincèrement votre avis, vos conseils sont très justes.`,
  reflector:nb=>`Vous avez besoin de temps (environ un mois) pour les grandes décisions : ${nb.n} ne doit pas vous presser. Vous reflétez l’état réel de cette relation.`},
 CH:{em:['Électromagnétique','Chacun a une moitié, et ensemble le canal est complet : une source d’attirance et d’étincelles, mais aussi l’endroit où l’on « accroche » le plus facilement.'],comp:['Compagnonnage','Des canaux que vous avez tous les deux : vous vous ressemblez ici, vous êtes à l’aise ensemble et parlez la même langue.'],dom:['Dominance','Une seule personne l’a, et l’autre n’en a aucune partie : ici, l’un mène et l’autre est profondément influencé.'],cmp:['Compromis','L’un a le canal complet, l’autre seulement la moitié : ici, l’un peut avoir l’impression de toujours devoir s’adapter.']},
 full:(isA,nb)=>isA?'vous avez le canal complet':`${nb.n} a le canal complet`,
 TIPS:{friction:'Avec beaucoup de frictions, lors d’une dispute, occupez-vous d’abord des émotions, puis du sujet. Convenez d’un signal de « pause ».',attract:'Une forte attirance est votre atout : gardez du temps rien qu’à deux, même quand la vie s’accélère.',sync:'La complicité se cultive : une petite chose faite ensemble régulièrement (une promenade, la cuisine, une série) vaut mieux qu’une grande sortie de temps en temps.',stable:'La stabilité naît des accords : parlez tôt de ce que vous attendez de l’avenir (argent, lieu de vie, enfants).'}
};
if(root.HLI)root.HLI.reg('fr',T);
})(typeof globalThis!=='undefined'?globalThis:this);
