/* Starlit : générateur de lectures en français (thème astral, Zi Wei Dou Shu, Human Design) */
(function(root){
const h3=(t,k)=>`<h3${k?` data-k="${k}"`:''}>${t}</h3>`, h4=t=>`<h4>${t}</h4>`, p=t=>`<p>${t}</p>`;
const ul=items=>`<ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
const pt=(title,text)=>`<b>${title}</b> : ${text}`;
const norm=x=>((x%360)+360)%360;
const cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
const lcf=s=>s?s.charAt(0).toLowerCase()+s.slice(1):s;
const dec1=x=>x.toFixed(1).replace('.',',');
/* articles : « de » + article, « à » + article */
const deA=x=>/^le /.test(x)?'du '+x.slice(3):/^les /.test(x)?'des '+x.slice(4):/^(la |l’|l')/.test(x)?'de '+x:/^[aeiouhéèêàâîôûAEIOUHÉ]/.test(x)?'d’'+x:'de '+x;
const aA=x=>/^le /.test(x)?'au '+x.slice(3):/^les /.test(x)?'aux '+x.slice(4):'à '+x;
const andList=a=>a.length<=1?a.join(''):a.slice(0,-1).join(', ')+' et '+a[a.length-1];
const SG=['Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire','Capricorne','Verseau','Poissons'];
const signOf=l=>Math.floor(norm(l)/30);
const fmt=l=>{const x=norm(l)%30;return `${Math.floor(x)}°${String(Math.floor((x%1)*60)).padStart(2,'0')}′`;};

/* ===================================================================
   Thème astral
   =================================================================== */
const ROLE={
 ASC:['Image extérieure','Ascendant',[
  [['Franchise et énergie','Votre première impression est pleine de vitalité : vous agissez vite et votre visage ne cache rien.'],['Esprit d’initiative','Face à une situation, vous êtes souvent le premier à vous avancer, ce qui donne une image de courage.'],['Impatience','Vous marchez vite, parlez vite, et l’on vous trouve parfois un peu brusque.']],
  [['Calme et fiabilité','Vous dégagez une impression de solidité, de douceur et de sérénité.'],['Du goût','Vous tenez à la qualité et au confort, et votre allure plaît souvent.'],['Lent à s’ouvrir','Peu d’initiative au premier contact, mais une fois en confiance, vous êtes très rassurant.']],
  [['Vivacité et bagout','Au premier abord, vous êtes vif, réactif et doué pour lancer la conversation.'],['Air de jeunesse','Votre allure et votre expression paraissent souvent plus jeunes que votre âge.'],['Changeant','Beaucoup d’intérêts, des sujets qui sautent vite : on a du mal à vous cerner.']],
  [['Douceur et bienveillance','On vous trouve facile à vivre, attentionné envers les autres.'],['Réflexe de protection','À la première rencontre, vous vous protégez d’abord, et ne vous ouvrez qu’une fois en confiance.'],['Émotions sur le visage','Bonne ou mauvaise humeur, votre entourage le voit tout de suite.']],
  [['Une aura naturelle','Dès votre arrivée, on vous remarque : vous avez de l’aisance et de l’assurance.'],['Soin de l’image','L’apparence et la réputation comptent pour vous ; vous voulez faire bonne impression.'],['Chaleur','Généreux avec les autres, vous aimez réchauffer l’ambiance.']],
  [['Soin et netteté','Vous donnez une image propre, organisée et digne de confiance.'],['Modestie','Peu porté à vous mettre en avant, vous observez avant d’agir.'],['Exigence','Sensible aux détails, vous passez facilement pour quelqu’un de très exigeant.']],
  [['Élégance et courtoisie','On vous trouve agréable, plein de tact et doté d’un sens esthétique.'],['Popularité','Vous savez soigner l’ambiance et mettre les gens à l’aise.'],['Indécision','Vous semblez toujours peser le pour et le contre, sans prendre position facilement.']],
  [['Mystère et distance','Vous donnez une impression de profondeur, difficile à percer.'],['Un regard intense','Votre sens de l’observation est aigu : vous percez souvent les autres à jour d’un coup d’œil.'],['Méfiance','Vous vous livrez peu ; la confiance se construit lentement.']],
  [['Gaieté et spontanéité','Au premier abord, vous êtes franc, drôle et facile à vivre.'],['Amour de la liberté','Vous semblez libre de toute contrainte, toujours en train de prévoir le prochain voyage.'],['Franc-parler','Vous parlez sans détour, parfois avec un peu trop de franchise.']],
  [['Maturité et sérieux','Vous donnez une image sérieuse, fiable et responsable.'],['Réserve','Peu souriant au premier contact, votre humour n’apparaît qu’avec l’habitude.'],['Sens du but','Vous semblez toujours savoir ce que vous voulez.']],
  [['Originalité','Vous donnez une impression de personnalité à part, aux idées neuves.'],['Aimable mais distant','Poli avec tout le monde, mais difficile à approcher vraiment.'],['Rationalité','Vous parlez avec logique, sans vous laisser emporter par les émotions.']],
  [['Douceur et bienveillance','Votre première impression est souvent celle d’une personne accommodante et empathique, au regard doux.'],['Rêveur naturel','Vous paraissez un peu rêveur, peu attaché aux détails, avec une nonchalance d’artiste.'],['Éponge émotionnelle','Très sensible, vous captez facilement les joies et les peines des gens autour de vous.']]]],
 Sun:['Moi profond','Soleil',[
  [['Pionnier','Vous voulez naturellement être le premier ; vous aimez les défis et partir de zéro.'],['Action','Dès qu’une idée surgit, vous agissez ; vous détestez la procrastination et les paroles en l’air.'],['Esprit de compétition','La rivalité réveille votre combativité.']],
  [['Besoin de stabilité','Vous tenez aux résultats concrets et à une vie stable.'],['Endurance','Ce que vous avez décidé, vous le menez à terme pas à pas.'],['Art de vivre','Vous savez apprécier la bonne cuisine, les belles choses et le confort.']],
  [['Curiosité','Vous avez besoin d’absorber sans cesse de nouvelles informations ; le monde vous passionne.'],['Communication','Vous êtes doué pour vous exprimer et relier les gens.'],['Polyvalence','Vous développez plusieurs intérêts à la fois et refusez d’être enfermé dans une case.']],
  [['Attachement','Votre famille et vos proches sont au cœur de votre vie.'],['Protection','Vous avez un fort besoin de prendre soin des autres et vous veillez sur ceux qui comptent pour vous.'],['Nostalgie','Les souvenirs et le sentiment d’appartenance comptent beaucoup pour vous.']],
  [['Rayonnement','Vous avez besoin d’être vu et vous acceptez volontiers la scène.'],['Générosité et chaleur','Vous êtes généreux et aimez rendre votre entourage heureux.'],['Sens de l’honneur','La dignité compte pour vous ; vous voulez faire les choses avec panache.']],
  [['Perfectionnisme','Vous cherchez à faire les choses correctement et bien.'],['Esprit de service','Aider les autres vous apporte un sentiment d’accomplissement.'],['Sens de l’analyse','Vous savez organiser les détails et repérer les problèmes.']],
  [['Quête d’équilibre','L’équité, l’harmonie et la beauté comptent pour vous.'],['Orientation relationnelle','C’est dans la relation à deux que vous vous voyez le mieux.'],['Diplomatie','Vous savez concilier des positions différentes.']],
  [['Profondeur','La surface ne vous suffit pas : vous voulez toujours voir l’essence des choses.'],['Volonté','Une fois engagé, vous y allez à fond.'],['Capacité de renaissance','Après un passage à vide, vous renaissez souvent de vos cendres.']],
  [['Quête de sens','Vous voulez comprendre la direction et le sens de la vie.'],['Optimisme','Vous croyez que demain sera meilleur ; la foi vous est naturelle.'],['Goût de l’exploration','Voyages, études, philosophie : tout cela vous attire.']],
  [['Ambition','Vos objectifs sont clairs et vous êtes prêt à travailler sur la durée.'],['Sens des responsabilités','Vous portez souvent plus de responsabilités que les autres.'],['Réussite tardive','Plus vous mûrissez, plus vous réussissez.']],
  [['Indépendance d’esprit','Au fond de vous, vous êtes très lucide : vous aimez réfléchir et tenez à votre indépendance et à votre liberté.'],['Hors des cadres','Vous voyez les choses selon votre propre logique, sans suivre la mode, avec des idées originales et novatrices.'],['Humanisme','Même si vous paraissez parfois froid ou détaché, vous vous souciez réellement du groupe et des questions de société.']],
  [['Empathie','Vous ressentez la souffrance des autres ; la compassion vous est naturelle.'],['Imagination','L’art, la musique et la spiritualité vous touchent.'],['Limites floues','Vous avez tendance à vous sacrifier pour les autres ; apprenez à vous protéger.']]]],
 Moon:['Vie intérieure et émotions','Lune',[
  [['Spontanéité','Vos réactions émotionnelles sont rapides et directes ; vous ne savez pas garder les choses pour vous.'],['Impatience','Au fond, vous êtes un peu pressé : vous voulez des résultats vite et détestez que les choses traînent.'],['Un feu intérieur','Quand l’émotion éclate, elle est pleine d’élan et de combativité, mais elle retombe aussi vite qu’elle est venue.']],
  [['Stabilité émotionnelle','Vous connaissez peu les grands hauts et bas ; il vous faut un rythme de vie régulier.'],['Sécurité matérielle','Une épargne, de bons repas, un foyer confortable : voilà ce qui vous rassure.'],['Entêtement','Quand ça ne va pas, vous avez tendance à vous renfermer et à ne plus bouger.']],
  [['Parler pour digérer','Discuter ou écrire suffit à vous remettre de bonne humeur.'],['Humeur changeante','Vos émotions changent vite ; vous avez besoin de nouveauté.'],['Rationalisation','Il vous arrive d’analyser pour éviter de ressentir vraiment.']],
  [['Richesse émotionnelle','Vos émotions sont fines ; vous avez grand besoin d’attention et d’appartenance.'],['Le foyer comme refuge','C’est chez vous, avec votre famille, que vous vous sentez le plus en paix.'],['Vulnérabilité','Une seule phrase peut vous marquer longtemps.']],
  [['Besoin de reconnaissance','Vous êtes le plus heureux quand on vous apprécie et qu’on vous valorise.'],['Générosité','Vous êtes très généreux avec ceux qui comptent pour vous.'],['Fierté','Blessé, vous faites bonne figure, mais au fond cela vous touche beaucoup.']],
  [['Inquiétude','Intérieurement, vous vérifiez sans cesse ce qui n’est pas encore assez bien.'],['Agir pour se rassurer','C’est en mettant de l’ordre que vos émotions s’apaisent.'],['Exigence envers vous-même','Vous gagnerez à apprendre la douceur envers vous-même.']],
  [['Peur du conflit','Pour préserver l’harmonie, vous ravalez souvent votre mécontentement.'],['Besoin de compagnie','Vos émotions sont plus stables quand vous pouvez partager.'],['Sens de la beauté','Un bel environnement vous aide à vous détendre.']],
  [['Émotions profondes','Vos émotions sont intenses ; vous aimez et détestez sans demi-mesure.'],['Pudeur','Vous gardez vos secrets au plus profond ; seule la confiance vous ouvre.'],['Besoin de contrôle','Quand vous manquez de sécurité, vous voulez tout maîtriser.']],
  [['Besoin d’espace','Être attaché vous étouffe.'],['Optimisme réparateur','Voyager, apprendre ou rire vous change les idées.'],['Fuite de la lourdeur','Vous n’aimez pas affronter les émotions trop collantes.']],
  [['Retenue','Vous avez l’habitude de ranger vos émotions pour vous occuper d’abord de l’essentiel.'],['Sécurité par la réussite','Vous n’êtes tranquille que si tout est sous contrôle.'],['Froid dehors, chaud dedans','Les choses vous tiennent à cœur, vous savez juste mal le montrer.']],
  [['Distance','Vous avez besoin d’espace personnel ; vos émotions passent par la raison.'],['Amitié avant tout','L’amitié vous met plus à l’aise que les relations fusionnelles.'],['Retrait soudain','Quand il y a trop d’émotions, vous choisissez de prendre du recul.']],
  [['Sensibilité','L’ambiance et les émotions des autres vous influencent facilement.'],['Recharge en solitude','La foule vous fatigue ; il vous faut des moments de calme.'],['Imagination débordante','Vous construisez souvent de belles images dans votre tête.']]]],
 Venus:['Amour et valeurs','Vénus',[
  [['Conquête','Quand quelqu’un vous plaît, vous le dites ; l’ambiguïté qui dure vous agace.'],['Coup de foudre','Vos sentiments naissent vite et brûlent fort.'],['Besoin de nouveauté','Trop de routine, et vous cherchez des sensations.']],
  [['Fidélité et stabilité','Une fois votre choix fait, vous êtes très fidèle.'],['Sensualité','Se tenir la main, se serrer dans les bras, partager un bon repas : voilà votre langage amoureux.'],['Pragmatisme','Vous tenez à ce que l’autre puisse vous offrir une vie stable.']],
  [['Complicité d’esprit','Bien s’entendre compte plus que l’apparence.'],['Légèreté','Vous aimez les relations amusantes et sans lourdeur.'],['Dispersion','Vous pouvez vous intéresser à plusieurs personnes en même temps.']],
  [['Amour protecteur','Vous exprimez votre amour par l’attention et la présence.'],['Désir de foyer','Pour vous, l’amour mène à fonder un foyer chaleureux.'],['Besoin de sécurité','Les réponses stables de l’autre comptent beaucoup.']],
  [['Romantisme flamboyant','Vous aimez les amours passionnées et pleines de rituels.'],['Besoin d’admiration','Vous voulez que l’autre vous considère comme unique.'],['Loyauté','Vous aimez avec fierté et avec constance.']],
  [['Aimer par les actes','Vous organisez discrètement la vie de l’autre.'],['Prudence','Vous observez longtemps avant de vous engager.'],['Exigence','Vos critères sont élevés et vous repérez vite les défauts.']],
  [['Romantisme élégant','L’ambiance et l’esthétique d’un rendez-vous comptent pour vous.'],['Besoin d’un partenaire','Seul, vous vous sentez facilement incomplet.'],['Évitement du conflit','Pour préserver l’harmonie, vous vous sacrifiez facilement.']],
  [['Engagement total','Aimer, c’est aller jusqu’à l’âme.'],['Possessivité','Vous avez besoin d’une loyauté absolue.'],['Tout ou rien','Une fois blessé, vous avez du mal à refaire confiance.']],
  [['Amour de la liberté','Vous avez besoin de garder votre espace dans le couple.'],['Aventure à deux','Le meilleur rendez-vous : voyager ou apprendre quelque chose ensemble.'],['Franchise','Vous aimez les partenaires directs et honnêtes.']],
  [['Sérieux en amour','Vous voyez l’amour comme un engagement à long terme.'],['Lent à s’ouvrir','Vous vous livrez peu, mais vous êtes très fiable.'],['Réalisme','Vous tenez compte de la réalité et des projets d’avenir.']],
  [['Amour amical','Être amis d’abord, puis amoureux : c’est là que vous êtes le plus à l’aise.'],['Besoin d’espace','Vous ne supportez pas les relations trop fusionnelles.'],['Attrait pour l’originalité','Les personnes hors du commun vous attirent facilement.']],
  [['Romantisme absolu','En amour, vous êtes prêt à tous les sacrifices et rêvez d’une communion des âmes.'],['Cœur tendre','Face à quelqu’un qui vous plaît, vous cédez et faites des compromis très facilement, jusqu’à vous perdre dans des rêves amoureux irréalistes.'],['Amour inconditionnel','Vous savez accepter les défauts de l’autre, mais gare à ne pas vous faire exploiter.']]]],
 Mercury:['Pensée et communication','Mercure',[
  [['Réactivité','Vous dites ce que vous pensez et décidez vite.'],['Parole directe','Sans détour, parfois un peu brusque.']],
  [['Pas à pas','Une pensée lente mais solide : vous parlez une fois que c’est clair.'],['Sens pratique','Seul le savoir utile vous intéresse.']],
  [['Esprit vif','Vous apprenez tout vite et faites facilement des liens.'],['Bavard','Vous parlez avec aisance et beaucoup d’informations.']],
  [['Penser avec le cœur','Bonne mémoire, surtout des émotions.'],['Parole douce','Vous faites attention aux sentiments de l’autre.']],
  [['Expression charismatique','Votre parole est persuasive et a un sens de la scène.'],['Conviction','Une fois votre avis fait, vous en changez difficilement.']],
  [['Logique rigoureuse','Doué pour analyser, organiser et repérer les erreurs.'],['Précision','Vous choisissez vos mots avec soin.']],
  [['Sens de la médiation','Vous pensez en vous mettant à la place des deux parties.'],['Tact','Vous savez présenter vos opinions avec élégance.']],
  [['Perspicacité','Vous allez droit au but et voyez l’essence des choses.'],['Réserve','Vous ne dites pas facilement tout ce que vous pensez.']],
  [['Vision d’ensemble','Vous voyez les grandes lignes et n’aimez pas les détails.'],['Franchise','Vous parlez franchement et aimez argumenter.']],
  [['Pensée pragmatique','Des plans soignés, orientés résultats.'],['Concision','Vos paroles ont du poids.']],
  [['Pensée indépendante','Des idées d’avant-garde, créatives.'],['Goût du débat','Vous aimez remettre en cause les idées reçues par la logique.']],
  [['Pensée intuitive','Vous comprenez le monde par les sensations et les images.'],['Imagination','Parfait pour créer, mais soyez plus attentif aux détails.']]]],
 Mars:['Action et désir','Mars',[
  [['Plein d’élan','Une grande capacité d’action : aussitôt dit, aussitôt fait.'],['Tempérament vif','La colère vient vite et repart aussi vite.']],
  [['Endurance','Lentement mais sans abandonner.'],['Entêtement','Une fois en colère, vous avez du mal à vous calmer.']],
  [['Multitâche','Vous menez plusieurs choses à la fois.'],['Les mots plutôt que les poings','En cas de conflit, vous préférez débattre.']],
  [['Se battre pour protéger','Particulièrement courageux pour votre famille et ceux qui comptent.'],['Émotivité','La colère se transforme souvent en bouderie ou en silence.']],
  [['Engagement passionné','Vous agissez avec panache et voulez bien faire.'],['Besoin de scène','C’est quand on vous voit que vous êtes le plus motivé.']],
  [['Efficacité','Vous travaillez avec méthode et souci du détail.'],['Anxiété','Sous pression, vous devenez vite exigeant envers vous et les autres.']],
  [['Concilier avant d’agir','Vous n’aimez pas l’affrontement direct.'],['Se battre pour l’équité','L’injustice vous fait réagir.']],
  [['Volonté','Une fois le but fixé, vous y allez à fond.'],['Rancune','Votre colère reste contenue et dure longtemps.']],
  [['Agir pour un idéal','Seul ce qui a du sens vous motive.'],['Goût du risque','Vous partez facilement sur un coup de tête.']],
  [['Stratégie','Vous planifiez sur le long terme, étape par étape.'],['Résistance à l’effort','Endurance et discipline remarquables.']],
  [['À votre façon','Vous détestez qu’on vous impose des règles.'],['Agir pour une cause','Vous êtes le plus fort quand vous vous battez pour un groupe ou une conviction.']],
  [['Suivre le courant','Vous agissez selon l’intuition et l’inspiration.'],['Évitement du conflit','Parfois passif : entraînez-vous à prendre position.']]]]
};
const OUTER=['une énergie franche et ardente','une présence calme et solide','un air vif et enjoué','une douceur accueillante','un rayonnement plein d’assurance','une discrétion attentive','une élégance conciliante','une profondeur mystérieuse','une gaieté décontractée','une maturité posée','une originalité un peu distante','une douceur rêveuse'];
const INNER=['un cœur ardent et impatient','un besoin de stabilité','une curiosité changeante','une sensibilité nostalgique','un besoin de reconnaissance','une tendance à vous inquiéter','une peur du conflit','des sentiments intenses','une soif de liberté','une grande retenue','un détachement calme','une grande sensibilité'];
const ELQ={fire:'la passion',earth:'le pragmatisme',air:'la raison',water:'la sensibilité'};const ELN={fire:'Feu',earth:'Terre',air:'Air',water:'Eau'};
const EL=['fire','earth','air','water'];
const NODE_TXT=['apprendre l’autonomie, faire confiance à votre intuition et à votre courage, et cesser de vivre seulement pour les autres.','apprendre à bâtir votre propre stabilité et votre propre valeur, et lâcher la dépendance aux crises et aux ressources des autres.','apprendre la curiosité, l’écoute et la diversité des échanges, et lâcher l’idée de détenir toutes les réponses.','apprendre à prendre soin de votre monde intérieur et de votre foyer, et lâcher la seule quête de réussite et d’image.','apprendre à vous exprimer avec courage et à monter sur scène, et lâcher la sécurité de vous fondre dans le groupe.','apprendre le sens pratique, le service et le soin du détail, et lâcher la tendance à fuir la réalité.','apprendre à coopérer et à écouter les autres, et lâcher l’habitude de ne compter que sur vous-même.','apprendre les liens profonds et le partage, et lâcher l’attachement à la sécurité matérielle.','apprendre à faire confiance à l’intuition et à un sens plus vaste, et lâcher l’anxiété liée aux informations et aux détails.','apprendre à assumer des responsabilités et à bâtir une carrière, et lâcher la dépendance excessive au foyer.','apprendre à contribuer au groupe et à assumer votre originalité, et lâcher le besoin d’une aura personnelle.','apprendre la confiance, le lâcher-prise et la spiritualité, et lâcher l’excès de contrôle et de critique.'];
const HOUSE=['l’image de soi et la première impression','l’argent, les biens et l’estime de soi','la communication, les études et la fratrie','la famille, les racines et votre refuge intérieur','l’amour, les loisirs, la création et les enfants','le travail quotidien, les habitudes et la santé','le couple, les associations et les relations à deux','les ressources partagées, l’intimité et les transformations profondes','les voyages, les convictions et les études supérieures','la carrière, le statut et l’image publique','les amis, les groupes et les projets d’avenir','l’inconscient, la solitude et ce qui reste caché'];
const PN={Sun:'Soleil',Moon:'Lune',Mercury:'Mercure',Venus:'Vénus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturne',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluton',Node:'Nœud nord',ASC:'Ascendant',MC:'Milieu du Ciel'};
const FEM={Moon:1,Venus:1};
const THEME={Sun:'le moi',Moon:'les émotions',Mercury:'la pensée',Venus:'l’amour',Mars:'l’action',Jupiter:'la croissance',Saturn:'le devoir',Uranus:'le changement',Neptune:'les rêves',Pluto:'la métamorphose',ASC:'l’image extérieure',MC:'l’orientation professionnelle'};
const ASP=[['Conjonction','les deux forces sont liées et s’amplifient l’une l’autre'],['Sextile','un petit coup de pouce ; avec un peu d’initiative, elles s’entraident'],['Carré','elles se contrarient ; cela bloque, mais vous pousse à grandir'],['Trigone','une relation naturellement fluide ; elles s’accordent sans effort'],['Opposition','vous oscillez entre les deux et devez trouver l’équilibre']];
const DIG={Sun:{d:[4],e:[0],x:[10],f:[6]},Moon:{d:[3],e:[1],x:[9],f:[7]},Mercury:{d:[2,5],e:[5],x:[8,11],f:[11]},Venus:{d:[1,6],e:[11],x:[7,0],f:[5]},Mars:{d:[0,7],e:[9],x:[6,1],f:[3]},Jupiter:{d:[8,11],e:[3],x:[2,5],f:[9]},Saturn:{d:[9,10],e:[6],x:[3,4],f:[0]},Uranus:{d:[10],e:[],x:[4],f:[]},Neptune:{d:[11],e:[],x:[5],f:[]},Pluto:{d:[7],e:[],x:[1],f:[]}};
const DIG_TXT={d:['domicile','La planète est chez elle : son énergie est pure et s’exprime naturellement.'],e:['exaltation','La planète est reçue comme une invitée d’honneur : ses qualités sont amplifiées.'],x:['exil','La planète est en terrain peu familier : elle doit s’exprimer de façon plus laborieuse ou inhabituelle.'],f:['chute','Son énergie est bridée : il faut de la pratique pour qu’elle s’exprime.']};
const RULER=['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
const MODERN={7:'Pluto',10:'Uranus',11:'Neptune'};
const TRANSIT={Jupiter:'pendant l’année qui vient, ce domaine vous apporte facilement des occasions, des soutiens et de la croissance.',Saturn:'pendant deux ou trois ans, il faut affronter la réalité et poser des règles dans ce domaine ; c’est exigeant, mais les résultats seront solides.',Uranus:'ces années-ci, ce domaine connaît des changements inattendus, mais aussi une nouvelle liberté.',Neptune:'les limites de ce domaine deviennent floues : plus d’inspiration, mais méfiez-vous de la confusion et des illusions.',Pluto:'ce domaine traverse une transformation profonde et durable : les anciens schémas sont entièrement renouvelés.'};
const HIT_TONE={conj:'forte activation',good:'soutien favorable',bad:'défis et ajustements'};

function dignity(k,s){const g=DIG[k];if(!g)return null;const out=[];for(const t of ['d','e','x','f'])if(g[t].includes(s))out.push(t);return out.length?out:null;}
const natal=k=>`${PN[k]} ${FEM[k]?'natale':'natal'}`;

function readWest(W,E){
  const P=W.pos;let o=[];
  const s=k=>signOf(k==='ASC'?W.asc:P[k].lon);
  const sun=s('Sun'),moon=s('Moon'),asc=s('ASC'),ven=s('Venus');
  const els=[...new Set([sun,moon,asc].map(i=>EL[i%4]))];
  const opp=(els.includes('fire')&&els.includes('water'))||(els.includes('earth')&&els.includes('air'));
  let mix;
  if(els.length===1)mix=`une personnalité cohérente, où ${ELQ[els[0]]} domine très nettement`;
  else mix=`une personnalité qui réunit ${andList(els.map(e=>ELQ[e]))}, ${opp?'un mélange singulier, presque contradictoire':'aux multiples facettes'}`;
  o.push(h3('Lecture des signes'));
  o.push(p(`Avec le Soleil en ${SG[sun]}, l’Ascendant en ${SG[asc]}, la Lune en ${SG[moon]} et Vénus en ${SG[ven]}, vous dégagez à l’extérieur ${OUTER[asc]}, avec au fond de vous ${INNER[moon]} : ${mix}.`));
  let n=1;const basic=o;
  for(const k of ['ASC','Sun','Moon','Venus','Mercury','Mars']){
    const [title,pname,data]=ROLE[k];const i=s(k);
    if(k==='Mercury'){o=[];o.push(h3('Autres facettes du thème','w-more'));}
    o.push(h4(`${n++}. ${title} : ${pname} en ${SG[i]}`));
    o.push(ul(data[i].map(([a,b])=>pt(a,b))));
  }
  /* maisons */
  o.push(h3('Les planètes dans les maisons','w-houses'));
  o.push(ul(['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'].map(k=>pt(`${PN[k]} en maison ${P[k].house}`,`votre énergie liée ${aA(THEME[k])} s’exprime surtout dans ce domaine : « ${HOUSE[P[k].house-1]} ».`))));
  /* dignités */
  const dg=[];
  for(const k of E.PK){const d=dignity(k,s(k));if(d)dg.push(pt(`${PN[k]} en ${d.map(t=>DIG_TXT[t][0]).join(' et en ')} (${SG[s(k)]})`,d.map(t=>DIG_TXT[t][1]).join(' ')));}
  o.push(h3('La force des planètes (dignités et débilités)','w-dignity'));
  o.push(dg.length?ul(dg):p('Aucune planète n’est en domicile, en exaltation, en exil ou en chute : toutes agissent de façon neutre.'));
  /* maîtres */
  const ar=RULER[asc],mr=MODERN[asc];
  const ruleLine=k=>`${PN[k]} en ${SG[s(k)]}, maison ${P[k].house}`;
  o.push(h3('Maître d’Ascendant et maîtres des maisons','w-rulers'));
  o.push(p(`Avec l’Ascendant en ${SG[asc]}, votre maître d’Ascendant est <b>${PN[ar]}</b> (${ruleLine(ar)})${mr?` ; en astrologie moderne, <b>${PN[mr]}</b> en est le co-maître (${ruleLine(mr)})`:''}. Là où se trouve le maître d’Ascendant, la vie vous entraîne souvent : votre énergie se tourne naturellement vers « ${HOUSE[P[ar].house-1]} ».`));
  const rows=W.houses.map((c,i)=>{const sg=signOf(c),r=RULER[sg];const own=P[r].house===i+1;return `<tr><td class="mono">${i+1}</td><td>${SG[sg]} ${fmt(c)}</td><td>${PN[r]}${MODERN[sg]?` / ${PN[MODERN[sg]]}`:''}</td><td class="mono">${P[r].house}</td><td>${own?`Le maître revient dans sa propre maison : ce domaine (« ${HOUSE[i]} ») est entre vos mains, avec une énergie concentrée et directe.`:`Ce domaine (« ${HOUSE[i]} ») se réalise à travers celui de la maison ${P[r].house} (« ${HOUSE[P[r].house-1]} »).`}</td></tr>`;});
  if(W.equal)o.push(p('Votre lieu de naissance est à une latitude très élevée, où le système de maisons Placidus ne fonctionne pas : on utilise donc les maisons égales (une maison tous les 30° à partir de l’Ascendant).'));
  o.push(`<div class="tablewrap"><table><thead><tr><th>Maison</th><th>Cuspide</th><th>Maître</th><th>Maison du maître</th><th>Lecture</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`);
  /* aspects */
  const personal=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
  const keyAsp=W.asp.filter(a=>a.orb<=4&&(personal.includes(a.a)||personal.includes(a.b))).slice(0,10);
  o.push(h3('Aspects majeurs','w-aspects'));
  o.push(keyAsp.length?ul(keyAsp.map(a=>pt(`${PN[a.a]} ${ASP[a.t][0].toLowerCase()} ${PN[a.b]} (orbe ${dec1(a.orb)}°)`,`${cap(THEME[a.a])} et ${THEME[a.b]} — ${ASP[a.t][1]}.`))):p('Aucun aspect majeur avec un orbe inférieur à 4°.'));
  /* configurations */
  const pats=patterns(W,E);
  o.push(h3('Configurations et stelliums','w-patterns'));
  o.push(pats.length?ul(pats):p('Aucun grand trigone, T-carré, grand carré, Yod ou stellium : votre énergie est répartie de façon assez homogène.'));
  /* éléments et modes */
  const cnt={fire:0,earth:0,air:0,water:0},md=[0,0,0];
  for(const k of E.PK){const i=s(k);cnt[EL[i%4]]++;md[i%3]++;}
  const MISS={fire:'Pas de Feu : vous hésitez facilement avant d’agir ; allumez volontairement votre propre flamme, fixez-vous des échéances.',earth:'Pas de Terre : concrétiser et gérer l’argent demande plus d’efforts ; écrire vos projets noir sur blanc vous aidera beaucoup.',air:'Pas d’Air : vous prenez rarement du recul ; discuter et lire davantage vous aidera à voir l’ensemble.',water:'Pas d’Eau : vous exprimez peu vos émotions ; vous entraîner à dire ce que vous ressentez rapprochera vos relations.'};
  const MD=[['cardinaux','vous aimez lancer de nouvelles choses et vous êtes doué pour démarrer','l’élan du démarrage'],['fixes','vous avez de la persévérance et tenez bon, mais changez difficilement','la persévérance'],['mutables','vous êtes très adaptable et souple, mais facilement dispersé','l’adaptabilité']];
  const mx=Math.max(...md),tops=[0,1,2].filter(i=>md[i]===mx);
  const el=[`Répartition des dix planètes par élément : ${EL.map(e=>`${ELN[e]} ${cnt[e]}`).join(', ')} ; par mode : ${MD.map((m,i)=>`${m[0]} ${md[i]}`).join(', ')}.`,tops.length===1?`Les signes ${MD[tops[0]][0]} dominent : ${MD[tops[0]][1]}.`:`Autant de signes ${andList(tops.map(i=>MD[i][0]))} : vous alliez ${andList(tops.map(i=>MD[i][2]))}.`];
  EL.filter(e=>cnt[e]===0).forEach(e=>el.push(MISS[e]));
  EL.filter(e=>cnt[e]>=5).forEach(e=>el.push(`Élément ${ELN[e]} très présent (${cnt[e]} planètes) : ${ELQ[e]} est votre couleur de fond la plus marquée.`));
  const up=E.PK.filter(k=>P[k].house>=7).length,east=E.PK.filter(k=>[10,11,12,1,2,3].includes(P[k].house)).length;
  el.push(`Hémisphères : ${up} planète${up>1?'s':''} au-dessus de l’horizon et ${10-up} en dessous, ${up>=6?'votre énergie se tourne vers le monde extérieur et la scène sociale':up<=4?'votre énergie se tourne vers l’intérieur, le foyer et la vie privée':'intérieur et extérieur sont à peu près équilibrés'} ; ${east} à l’est et ${10-east} à l’ouest, ${east>=6?'vous préférez initier et choisir vous-même votre direction':east<=4?'vous vous réalisez plutôt à travers les autres et la coopération':'autonomie et coopération sont à peu près équilibrées'}.`);
  o.push(h3('Éléments, modes et hémisphères','w-balance'));o.push(ul(el));
  /* Nœud nord */
  const nd=signOf(P.Node.lon);
  o.push(h3('Direction de vie (Nœud nord)','w-node'));
  o.push(p(`Nœud nord en ${SG[nd]}, maison ${P.Node.house} : ${NODE_TXT[nd]} Dans cette vie, votre croissance passe par « ${HOUSE[P.Node.house-1]} ».`));
  /* transits */
  const tr=E.transits(W,new Date());
  o.push(h3('Transits actuels','w-transits'));
  o.push(ul(tr.map(t=>{const hit=t.hits.map(x=>`${ASP[x.t][0].toLowerCase()} avec votre ${natal(x.n)} (orbe ${dec1(x.orb)}°, ${HIT_TONE[x.tone]})`).join(' ; ');
    return pt(`${PN[t.k]} transite en ${SG[signOf(t.lon)]}, dans votre maison ${t.house} (${HOUSE[t.house-1]})`,`${cap(TRANSIT[t.k])}${hit?` En ce moment : ${hit}.`:''}`);})));
  return{basic:basic.join(''),adv:o.join('')};
}
function patterns(W,E){
  const P=W.pos,K=E.PK,out=[],L=k=>P[k].lon,sep=E.sep;
  const near=(a,b,ang,orb)=>Math.abs(sep(L(a),L(b))-ang)<=orb;
  const bySign={},byHouse={};
  for(const k of K){(bySign[signOf(L(k))]=bySign[signOf(L(k))]||[]).push(k);(byHouse[P[k].house]=byHouse[P[k].house]||[]).push(k);}
  for(const s in bySign)if(bySign[s].length>=3)out.push(pt(`Stellium en ${SG[s]} (${bySign[s].map(k=>PN[k]).join(', ')})`,`une énergie très concentrée : les traits du signe ${SG[s]} deviennent une marque très visible de votre personnalité.`));
  for(const h in byHouse)if(byHouse[h].length>=3)out.push(pt(`Stellium en maison ${h} (${byHouse[h].map(k=>PN[k]).join(', ')})`,`une grande part de votre attention se porte sur « ${HOUSE[h-1]} ».`));
  for(let i=0;i<K.length;i++)for(let j=i+1;j<K.length;j++)for(let k=j+1;k<K.length;k++){
    const a=K[i],b=K[j],c=K[k];
    if(near(a,b,120,7)&&near(b,c,120,7)&&near(a,c,120,7))out.push(pt(`Grand trigone (${PN[a]}, ${PN[b]}, ${PN[c]})`,'des dons fluides, les choses vous réussissent ; mais vous risquez de rester dans votre zone de confort, lancez-vous des défis volontairement.'));
  }
  for(let i=0;i<K.length;i++)for(let j=i+1;j<K.length;j++){
    const a=K[i],b=K[j];if(!near(a,b,180,8))continue;
    for(const c of K){if(c===a||c===b)continue;if(near(a,c,90,7)&&near(b,c,90,7))out.push(pt(`T-carré (${PN[a]} opposé à ${PN[b]}, ${PN[c]} au sommet)`,`la pression se concentre sur ${PN[c]}, c’est-à-dire ${THEME[c]} ; cette tension est le moteur qui vous fait avancer.`));}
  }
  for(let i=0;i<K.length;i++)for(let j=i+1;j<K.length;j++){
    const a=K[i],b=K[j];if(!near(a,b,60,4))continue;
    for(const c of K){if(c===a||c===b)continue;if(near(a,c,150,2.5)&&near(b,c,150,2.5))out.push(pt(`Yod, ou « doigt de Dieu » (${PN[a]} et ${PN[b]} pointent vers ${PN[c]})`,`un sentiment de mission particulier se concentre sur ${THEME[c]}, qui demande souvent des ajustements et des adaptations constants.`));}
  }
  return [...new Set(out)];
}

/* ===================================================================
   Zi Wei Dou Shu
   =================================================================== */
const STEM_MUT={'甲':['廉貞','破軍','武曲','太陽'],'乙':['天機','天梁','紫微','太陰'],'丙':['天同','天機','文昌','廉貞'],'丁':['太陰','天同','天機','巨門'],'戊':['貪狼','太陰','右弼','天機'],'己':['武曲','貪狼','天梁','文曲'],'庚':['太陽','武曲','太陰','天同'],'辛':['巨門','太陽','文曲','文昌'],'壬':['天梁','紫微','左輔','武曲'],'癸':['破軍','巨門','太陰','貪狼']};
const MK=['祿','權','科','忌'];
const ART={'命宮':'de la','兄弟':'de la','夫妻':'du','子女':'des','財帛':'de la','疾厄':'de la','遷移':'des','僕役':'des','官祿':'de la','田宅':'du','福德':'du','父母':'des'};
const DOM={'命宮':'vous-même et votre destin global','兄弟':'la fratrie et les amis','夫妻':'l’amour et le couple','子女':'les enfants, les investissements et les associations','財帛':'l’argent','疾厄':'la santé','遷移':'les déplacements et la vie loin de chez vous','僕役':'les relations et les collaborateurs','官祿':'la carrière','田宅':'la famille et l’immobilier','福德':'la vie intérieure et les plaisirs','父母':'les aînés, les supérieurs et les documents'};
const DOMA_T={'命宮':'à vous-même et à votre destin global','兄弟':'à la fratrie et aux amis','夫妻':'à l’amour et au couple','子女':'aux enfants, aux investissements et aux associations','財帛':'à l’argent','疾厄':'à la santé','遷移':'aux déplacements et à la vie loin de chez vous','僕役':'aux relations et aux collaborateurs','官祿':'à la carrière','田宅':'à la famille et à l’immobilier','福德':'à la vie intérieure et aux plaisirs','父母':'aux aînés, aux supérieurs et aux documents'};
const DOMA=k=>DOMA_T[k];
const LU={'命宮':'Vous êtes apprécié et avez de la chance : vous gagnez facilement la sympathie et les ressources des autres.','兄弟':'Frères, sœurs et amis vous aident ; les associations sont profitables.','夫妻':'Votre partenaire est votre bonne étoile : une vie amoureuse douce, qui peut aussi vous apporter des avantages.','子女':'De bons liens avec les enfants ; favorable aussi aux investissements, aux associations et à la romance.','財帛':'Beaucoup d’occasions de gagner de l’argent, des revenus fluides, et vous savez profiter de ce que l’argent apporte.','疾厄':'Une bonne constitution et un esprit serein ; vous aimez aussi les plaisirs de la table.','遷移':'Des soutiens à l’extérieur : vous réussissez mieux loin de chez vous que dans votre région natale.','僕役':'Amis, collègues et collaborateurs vous apportent leur aide : votre réseau est votre richesse.','官祿':'Le travail vous réussit, avec des occasions de promotion et de développement.','田宅':'Bonne fortune familiale et chance pour l’immobilier ; le foyer vous apporte de la sérénité.','福德':'Vous savez profiter de la vie, avec un esprit joyeux et une grande richesse intérieure.','父母':'De bons liens avec vos parents et vos aînés, qui vous protègent ; favorable aussi aux documents et aux examens.'};
const JI={'命宮':'Vous placez la barre très haut pour vous-même, avec une tendance à ressasser, à vous inquiéter et à vous épuiser.','兄弟':'Des tensions possibles avec la fratrie ou les amis ; prudence avec les associations et les prêts.','夫妻':'Un parcours amoureux plus mouvementé : malentendus et disputes surviennent facilement, et votre partenaire compte énormément pour vous.','子女':'Des soucis pour les enfants ; prudence dans les investissements et les associations.','財帛':'L’argent vous préoccupe et les revenus fluctuent ; évitez la spéculation à haut risque.','疾厄':'Attention à la santé et au surmenage : le stress s’accumule facilement dans le corps.','遷移':'Les déplacements sont plus fatigants ; loin de chez vous, obstacles et histoires sont plus fréquents.','僕役':'Choisissez vos amis avec soin : amis, collègues ou collaborateurs peuvent vous causer du tort.','官祿':'Forte pression au travail et grand attachement à la carrière ; votre parcours professionnel connaît souvent des remous.','田宅':'Des soucis possibles liés à la famille ou à l’immobilier ; épargner demande de la discipline.','福德':'Vous pensez beaucoup et avez du mal à vous détendre : forte pression mentale.','父母':'Une communication difficile avec vos parents, vos aînés ou vos supérieurs ; prudence avec les documents et les contrats.'};
const JI_ADV={'命宮':'Évitez de ressasser et laissez-vous de la marge.','兄弟':'Évitez les affaires d’argent avec vos proches et ne vous portez pas garant.','夫妻':'Surveillez vos paroles : écoutez davantage et ne ressortez pas les vieilles histoires.','子女':'Investissez prudemment et évitez les associations impulsives.','財帛':'Gérez vos finances prudemment, sans spéculation risquée.','疾厄':'Rythme de vie régulier, bilans de santé réguliers ; évitez le surmenage.','遷移':'Prudence sur la route, et restez discret loin de chez vous.','僕役':'Choisissez bien vos partenaires et ne vous portez garant pour personne.','官祿':'Avancez pas à pas au travail et demandez conseil avant les grandes décisions.','田宅':'Réfléchissez bien avant d’acheter, de vendre ou de rénover, et lisez attentivement les contrats.','福德':'Prévoyez des temps de détente et évitez de vous épuiser émotionnellement.','父母':'Lisez bien documents et contrats, et gardez une trace écrite de vos échanges avec vos supérieurs.'};
const STAR_JI={'太陽':'Attention aux relations avec les hommes plus âgés ou les supérieurs, aux atteintes à la réputation, ainsi qu’aux yeux et au système cardiovasculaire.','武曲':'Attention à la trésorerie et aux pertes d’investissement : privilégiez la prudence dans vos décisions financières.','太陰':'Attention aux relations avec les femmes, à la gestion financière, au moral en berne et au sommeil.','天同':'Attention aux sautes d’humeur, à la paresse et aux excès de plaisir, qui entament votre chance.','貪狼':'Attention aux désirs excessifs, aux histoires sentimentales compliquées et aux sorties trop nombreuses.','巨門':'Attention aux commérages, aux malentendus et aux soupçons : parlez moins, écoutez plus.','天機':'Attention à trop réfléchir, aux plans qui changent sans cesse et aux décisions hésitantes.','廉貞':'Attention aux litiges, aux enchevêtrements sentimentaux, au cœur et aux accidents.','文昌':'Attention aux erreurs dans les documents, les contrats et les examens : relisez mot à mot avant de signer, et ne vous portez garant pour personne.','文曲':'Attention aux paroles malheureuses, aux erreurs dans les écrits et aux promesses sentimentales faites à la légère.'};
const STAR_LU={'廉貞':'Les relations et le réseau apportent des occasions ; favorable aussi à l’amour.','破軍':'L’argent vient du changement et de l’innovation : oser changer est payant.','天機':'Les idées et les projets rapportent ; idéal pour un travail intellectuel.','天同':'Plus de chance et de plaisirs, une bonne entente et de la bonne humeur.','太陰':'Favorable à l’épargne, à l’immobilier et au soutien de femmes ; une richesse qui coule doucement mais sûrement.','貪狼':'Vie sociale, talents et romances apportent des occasions.','武曲':'Des revenus réguliers solides ; propice aux placements et au travail concret.','太陽':'Bonne réputation et soutiens : vos efforts sont remarqués.','巨門':'Votre éloquence se monnaie : idéal pour vivre de la parole ou d’une expertise.','天梁':'La protection des aînés transforme les difficultés en chance ; favorable à la fonction publique, aux assurances et au médical.'};
const SUN_POS={'寅':'le soleil se lève à l’est, son éclat grandit','卯':'le soleil levant (« soleil sur la porte du Tonnerre ») : plein d’énergie','辰':'le soleil approche du zénith, son éclat est vigoureux','巳':'le soleil brille haut dans le ciel, sa chaleur rayonne','午':'le soleil au zénith (« éclat doré ») : son éclat est à son maximum','未':'le soleil de l’après-midi décline vers l’ouest mais garde sa chaleur','申':'le soleil décline vers l’ouest, son éclat faiblit','酉':'le soleil se couche, son éclat diminue. Vous avez le cœur sur la main, mais vous donnez parfois beaucoup sans recevoir autant de reconnaissance, d’où un possible sentiment de solitude et d’impuissance','戌':'le soleil disparaît derrière les montagnes, son éclat se retire : votre générosité passe facilement inaperçue','亥':'le soleil est entré dans la nuit, son éclat reste caché : vous donnez beaucoup et recevez peu','子':'un soleil de minuit : c’est par l’effort que vous apprendrez à briller','丑':'l’aube approche, mais l’éclat n’est pas encore visible'};
const MOON_POS={'寅':'la lune se couche à l’aube, son éclat est faible','卯':'le soleil se lève et la lune s’efface : son éclat ne se voit pas','辰':'une lune de plein jour, à la force réduite','巳':'une lune de plein jour, à l’éclat voilé','午':'une lune de midi, au plus faible de sa force','未':'une lune d’après-midi, dont l’éclat commence à poindre','申':'la lune se lève à l’est, son éclat grandit','酉':'la lune monte à l’est, sa clarté apparaît','戌':'la lune au milieu du ciel, d’un éclat limpide','亥':'la lune claire à la porte du Ciel : son éclat est à son maximum','子':'une lune brillante à minuit, pleine de clarté','丑':'la lune approche de l’ouest mais garde de l’éclat'};
const ADJN={'天刑':'Tian Xing (Châtiment)','天姚':'Tian Yao (Séduction)','紅鸞':'Hong Luan (Phénix rouge)','天喜':'Tian Xi (Joie)','咸池':'Xian Chi (Bassin de Xian)','華蓋':'Hua Gai (Dais fleuri)','孤辰':'Gu Chen (Solitude)','寡宿':'Gua Su (Isolement)','天哭':'Tian Ku (Pleurs)','天虛':'Tian Xu (Vide)','三台':'San Tai (Trois Terrasses)','八座':'Ba Zuo (Huit Sièges)','恩光':'En Guang (Lumière de la grâce)','天貴':'Tian Gui (Noblesse)','台輔':'Tai Fu (Ministre)','封誥':'Feng Gao (Décret)','天才':'Tian Cai (Talent)','天壽':'Tian Shou (Longévité)','龍池':'Long Chi (Bassin du dragon)','鳳閣':'Feng Ge (Pavillon du phénix)','天官':'Tian Guan (Fonction)','天福':'Tian Fu (Bonheur céleste)','天巫':'Tian Wu (Chamane)','天月':'Tian Yue (Lune céleste)','陰煞':'Yin Sha (Influence sombre)','天空':'Tian Kong (Ciel vide)','截路':'Jie Lu (Route coupée)','旬空':'Xun Kong (Vide décadaire)','空亡':'Kong Wang (Néant)','解神':'Jie Shen (Esprit libérateur)','年解':'Nian Jie (Délivrance annuelle)','天德':'Tian De (Vertu céleste)','月德':'Yue De (Vertu lunaire)','天廚':'Tian Chu (Cuisine céleste)','蜚廉':'Fei Lian (Médisance)','破碎':'Po Sui (Brisure)','天傷':'Tian Shang (Blessure)','天使':'Tian Shi (Messager)','龍德':'Long De (Vertu du dragon)','沐浴':'Mu Yu (Bain)'};
const ADJ={'天刑':'Discipline et respect des règles ; signale aussi les litiges et les blessures par lame.','天姚':'Étoile de romance : du charme et un vrai sens de la séduction.','紅鸞':'Romance heureuse : mariage, amour et bonne entente.','天喜':'Joies et romances : fêtes et naissances.','咸池':'Étoile de romance : beaucoup de succès en amour, mais aussi des tracas sentimentaux.','華蓋':'Hauteur de vue et distance ; des dons pour la spiritualité ou l’art, et le goût de la solitude.','孤辰':'Un sentiment de solitude ; vous aimez travailler de façon autonome.','寡宿':'Un sentiment d’isolement ; en amour, des séparations plus fréquentes.','天哭':'Une tendance à la mélancolie et à la tristesse.','天虛':'Un sentiment de vide intérieur ; une tendance à exagérer.','三台':'Statut et prestige ; favorise les promotions.','八座':'Statut et honneurs ; favorise la réputation.','恩光':'Vous recevez des faveurs et l’on vous apprécie.','天貴':'Noblesse et soutiens influents.','台輔':'Soutien et promotion.','封誥':'Honneurs et récompenses.','天才':'Intelligence et talent.','天壽':'Longévité et stabilité.','龍池':'Talents artistiques et bon goût.','鳳閣':'Une belle plume et un sens esthétique.','天官':'Des honneurs officiels ; favorise la carrière publique.','天福':'Bonne fortune et plaisirs.','天巫':'Une affinité spirituelle ; signale aussi promotions et héritages.','天月':'Attention aux petits ennuis de santé ; constitution plutôt fragile.','陰煞':'Risque de rencontrer des personnes malveillantes ou des obstacles en coulisses.','天空':'Des idéaux élevés, mais les biens matériels risquent de s’évaporer.','截路':'Des obstacles à mi-parcours.','旬空':'Les choses risquent de tomber à l’eau ou de manquer de substance.','空亡':'Des pertes et des efforts peu récompensés.','解神':'La capacité de dénouer les difficultés.','年解':'Dénoue les difficultés de l’année.','天德':'Une bonne étoile qui transforme le malheur en chance.','月德':'Dissipe les malheurs ; bonne entente avec les autres.','天廚':'Un bon coup de fourchette : vous savez apprécier la bonne chère.','蜚廉':'Risque de commérages et de disputes.','破碎':'Les choses risquent de se briser ou de rester inachevées.','天傷':'Attention aux pertes et aux blessures.','天使':'Attention à la santé et aux accidents.','龍德':'Transforme le malheur en chance.'};
const PEACH=['貪狼','廉貞','天姚','紅鸞','天喜','咸池'];
const FLOW={'流祿':'祿存','流羊':'擎羊','流陀':'陀羅','流昌':'文昌','流曲':'文曲','流魁':'天魁','流鉞':'天鉞','流馬':'天馬','流鸞':'紅鸞','流喜':'天喜'};
const ZOD={'鼠':'Rat','牛':'Buffle','虎':'Tigre','兔':'Lapin','龍':'Dragon','蛇':'Serpent','馬':'Cheval','羊':'Chèvre','猴':'Singe','雞':'Coq','狗':'Chien','豬':'Cochon'};
const FIVE_EL={'水':'Eau','木':'Bois','金':'Métal','土':'Terre','火':'Feu'},FIVE_N={'二':2,'三':3,'四':4,'五':5,'六':6};
const MONTHS=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const BRS='子丑寅卯辰巳午未申酉戌亥';
const ord=n=>n===1?'1er':n+'e';

function zwHelpers(ctx){
  const S=n=>ADJN[n]||ctx.star(n);
  const ML=k=>ctx.mutLabel(k);
  const MZ=(star,k)=>`${S(star)} ${ML(k)}`;
  const PN=n=>ctx.palName(n);
  const deP=n=>`${ART[n]||'de'} ${PN(n)}`;
  const pn=n=>`palais ${deP(n)}`;
  const BL=b=>ctx.brightLabel(b);
  const starTag=s=>S(s.name)+(s.brightness?` <small class="br">(${BL(s.brightness)})</small>`:'')+(s.mutagen?' '+ML(s.mutagen):'');
  return{S,ML,MZ,PN,deP,pn,BL,starTag};
}

function readZW(Z,ctx){
  const M=ctx.major,MINOR=ctx.minor,BR=ctx.bright,PAL=ctx.palDesc;
  const X=zwHelpers(ctx),{S,ML,MZ,PN,deP,pn,BL,starTag}=X;
  const pal=Z.palaces,o=[];
  const idx=n=>pal.findIndex(x=>x.name===n);
  const allStars=i=>[...pal[i].majorStars,...pal[i].minorStars,...pal[i].adjectiveStars];
  const has=(i,n)=>allStars(i).some(s=>s.name===n);
  const findStar=n=>pal.findIndex((x,i)=>allStars(i).some(s=>s.name===n));
  const sfz=i=>[i,(i+4)%12,(i+8)%12,(i+6)%12];
  const hasIn=(set,n)=>set.some(i=>has(i,n));
  const ming=idx('命宮'),body=pal.findIndex(x=>x.isBodyPalace);
  const stLine=i=>{const m=pal[i].majorStars.map(starTag);return m.length?m.join(', '):'aucune étoile principale';};
  const minorLine=i=>pal[i].minorStars.map(starTag).join(', ');
  const withMinor=i=>stLine(i)+(minorLine(i)?' ; '+minorLine(i):'');
  const birthMut={};pal.forEach((p,i)=>[...p.majorStars,...p.minorStars].forEach(s=>{if(s.mutagen)birthMut[s.mutagen]={star:s.name,i};}));
  const sd=Z._std,rd=Z.rawDates.lunarDate;
  const yy=Z.rawDates.chineseDate.yearly;
  const male=Z.gender==='男';
  const yinyang=`${male?'homme':'femme'} ${'甲丙戊庚壬'.includes(yy[0])?'yang':'yin'}`;
  const fe=String(Z.fiveElementsClass||''),feTxt=FIVE_EL[fe[0]]?`classe ${FIVE_EL[fe[0]]} ${FIVE_N[fe[1]]||''}`.trim():fe;
  const hourBr=(String(Z.time||'').match(/[子丑寅卯辰巳午未申酉戌亥]/)||[''])[0];
  const V=pn('命宮');

  /* 1. Informations */
  o.push(h3('Analyse du thème Zi Wei Dou Shu','z-info'));
  o.push(p(`${male?'Né':'Née'} le ${sd.getUTCDate()===1?'1er':sd.getUTCDate()} ${MONTHS[sd.getUTCMonth()]} ${sd.getUTCFullYear()}${hourBr?`, à l’heure ${hourBr}`:''} (calendrier lunaire : ${ord(rd.lunarDay)} jour du ${ord(rd.lunarMonth)} mois${rd.isLeap?' intercalaire':''} de l’année ${yy.join('')}) ; ${yinyang}, ${feTxt}, signe chinois : ${ZOD[Z.zodiac]||Z.zodiac}. Le ${V} est en ${pal[ming].earthlyBranch}, le palais du Corps en ${pal[body].earthlyBranch} (${pn(pal[body].name)}) ; maître de vie : ${S(Z.soul)}, maître du corps : ${S(Z.body)}.`));

  /* 2. Configurations */
  const pats=zwPatterns(Z,{ming,has,hasIn,sfz,findStar,birthMut,pal,pn,X});
  o.push(h3('Configurations du thème','z-patterns'));
  o.push(pats.length?ul(pats):p(`Le thème ne forme pas de grande configuration classique : la lecture se concentre sur les étoiles principales du ${V} et le jeu des transformations.`));

  /* 3. Nature profonde */
  o.push(h3('Nature profonde et personnalité','z-core'));
  const mp=pal[ming],opp=pal[(ming+6)%12];
  const items=[];
  const src=mp.majorStars.length?mp.majorStars:opp.majorStars;
  if(!mp.majorStars.length)items.push(pt(`Aucune étoile principale dans le ${V}`,`Le ${V} n’a pas d’étoile principale ; on le lit à travers ${andList(opp.majorStars.map(s=>S(s.name)))}, dans le palais opposé, le ${pn('遷移')}. Votre personnalité est très souple : l’environnement et votre entourage vous influencent facilement et vous vous adaptez bien, mais veillez à ne pas vous laisser porter par le courant.`));
  for(const s of src){const m=M[s.name];if(!m)continue;
    let t=`${m[2]} Atouts : ${lcf(m[3])}. Vigilance : ${lcf(m[4])}.`;
    if(s.brightness)t+=` Éclat « ${BL(s.brightness)} » (${BR[s.brightness]}).`;
    if(s.name==='太陽')t+=` ${S('太陽')} en ${(mp.majorStars.length?mp:opp).earthlyBranch} : ${SUN_POS[(mp.majorStars.length?mp:opp).earthlyBranch]}.`;
    if(s.name==='太陰')t+=` ${S('太陰')} en ${(mp.majorStars.length?mp:opp).earthlyBranch} : ${MOON_POS[(mp.majorStars.length?mp:opp).earthlyBranch]}.`;
    if(s.mutagen&&mp.majorStars.length)t+=` ${ML(s.mutagen)} de naissance dans le ${V} : ${({'祿':'une vie bien dotée, et beaucoup de sympathie autour de vous.','權':'un avis bien à vous et une capacité à diriger.','科':'une bonne réputation, et des soutiens qui vous tirent d’affaire.','忌':'une grande sévérité envers vous-même : votre leçon de vie se concentre sur vous.'})[s.mutagen]}`;
    else if(s.mutagen)t+=` Cette étoile porte le ${ML(s.mutagen)} de naissance dans le ${pn('遷移')} ; empruntée par le ${V}, elle en transmet la force, mais de façon plus indirecte que si elle y siégeait.`;
    items.push(pt(`${S(s.name)} (${m[1]})`,t));}
  for(const s of mp.minorStars)if(MINOR[s.name])items.push(pt(S(s.name),MINOR[s.name].replace(/^([^:]{3,40}) : /,'$1 — ')+(s.mutagen?` ${ML(s.mutagen)} dans le ${V} : ${s.mutagen==='忌'?'soyez particulièrement vigilant sur ce domaine.':'ces capacités sont amplifiées.'}`:'')));
  for(const s of mp.adjectiveStars)if(ADJ[s.name])items.push(pt(S(s.name),ADJ[s.name]));
  o.push(p(`${cap(V)} en ${mp.earthlyBranch} (${withMinor(ming)}) :`));
  o.push(ul(items));
  const sf=sfz(ming);
  o.push(p(`Les palais en appui (les « trois directions et quatre côtés ») : ${pn('財帛')} : ${stLine(sf[2])} ; ${pn('官祿')} : ${stLine(sf[1])} ; ${pn('遷移')} : ${stLine(sf[3])}. Le ${V} montre votre nature innée ; ces trois palais montrent comment vous gagnez de l’argent, travaillez et agissez à l’extérieur. C’est en lisant les quatre ensemble qu’on a une vue complète.`));

  /* Palais du Corps */
  const bp=pal[body];
  o.push(h4(`Palais du Corps en ${bp.earthlyBranch} (${PN(bp.name)} : ${withMinor(body)})`));
  const bl=[pt('Centre de gravité',`le palais du Corps indique vos tendances après trente ans. ${bp.name==='命宮'?`Le vôtre coïncide avec le ${V} : votre nature innée est aussi votre centre de gravité, être vous-même est l’essentiel`:`Le vôtre se trouve dans le ${pn(bp.name)} : dans la seconde moitié de votre vie, vous accorderez beaucoup d’importance ${DOMA(bp.name)}`}.`)];
  if(has(body,'天馬')&&(has(body,'祿存')||bp.majorStars.concat(bp.minorStars).some(s=>s.mutagen==='祿')))bl.push(pt('Lu Ma Jiao Chi dans le palais du Corps','voir la configuration plus haut ; cette force qui fait naître l’argent du mouvement tombe justement sur le centre de gravité de la seconde moitié de votre vie.'));
  if(has(body,'陀羅'))bl.push(pt('Nœuds cachés',`${S('陀羅')} se trouve dans ce palais : dans ce domaine, vous avez tendance à trop réfléchir et à hésiter, et les choses traînent facilement.`));
  if(has(body,'擎羊'))bl.push(pt('Élan et conflits',`${S('擎羊')} se trouve dans ce palais : beaucoup d’énergie pour agir, mais des frictions faciles avec les autres.`));
  for(const s of bp.majorStars.concat(bp.minorStars))if(s.mutagen)bl.push(pt(MZ(s.name,s.mutagen),(s.mutagen==='祿'?LU:s.mutagen==='忌'?JI:{})[bp.name]||`${MZ(s.name,s.mutagen)} met ce domaine encore plus en avant.`));
  o.push(ul(bl));

  /* 4. Transformations de naissance */
  o.push(h3('Transformations de naissance','z-birthmut'));
  o.push(p(`Tige céleste de l’année de naissance « ${yy[0]} » : ${MK.map(k=>birthMut[k]?MZ(birthMut[k].star,k):'').filter(Boolean).join(', ')}.`));
  o.push(ul(MK.filter(k=>birthMut[k]).map(k=>{const b=birthMut[k],pnm=pal[b.i].name,oppn=pal[(b.i+6)%12].name;
    const base=k==='祿'?LU[pnm]:k==='忌'?JI[pnm]:k==='權'?`Pour ce qui touche ${DOMA(pnm)}, vous avez la main et les moyens ; vous êtes dynamique, mais risquez d’en faire trop.`:`Ce qui touche ${DOMA(pnm)} vous vaut facilement une bonne réputation ; en cas de difficulté, un soutien ou une bonne solution se présente souvent.`;
    const extra=k==='忌'?` Le ${ML('忌')} dans le ${pn(pnm)} s’oppose au ${pn(oppn)} : les affaires de ce palais en subissent aussi les effets. ${STAR_JI[b.star]||''}`:k==='祿'?(STAR_LU[b.star]?' '+STAR_LU[b.star]:''):'';
    return pt(`${MZ(b.star,k)} dans le ${pn(pnm)}`,base+extra);})));

  /* 5. Transformations volantes */
  o.push(h3('Transformations volantes (tiges des palais)','z-fly'));
  const flyRows=pal.map((p,i)=>{const mm=STEM_MUT[p.heavenlyStem];return `<tr><td class="p">${PN(p.name)}</td><td>${p.heavenlyStem}${p.earthlyBranch}</td>${mm.map((star,j)=>{const t=findStar(star);const self=t===i;const chong=t===(i+6)%12;return `<td class="${j===3&&(self||t===ming||chong)?'warn':''}">${S(star)} → ${t<0?'—':PN(pal[t].name)}${self?' (auto)':''}</td>`;}).join('')}</tr>`;});
  o.push(`<div class="tablewrap"><table><thead><tr><th>Palais</th><th>Tige</th><th>${ML('祿')}</th><th>${ML('權')}</th><th>${ML('科')}</th><th>${ML('忌')}</th></tr></thead><tbody>${flyRows.join('')}</tbody></table></div>`);
  const notes=[];
  pal.forEach((p,i)=>{const mm=STEM_MUT[p.heavenlyStem];mm.forEach((star,j)=>{const t=findStar(star);if(t===i)notes.push(pt(`${cap(pn(p.name))}, auto-${ML(MK[j])}`,['les avantages de ce palais arrivent vite et repartent aussi vite ; ils sont difficiles à retenir.','dans ce palais, vous avez tendance à décider seul : de l’autorité, mais peu de constance.','la réputation et les avantages de ce palais se voient facilement ; méfiez-vous toutefois des apparences sans fond.','les affaires de ce palais ont tendance à créer leurs propres complications et à ne pas aller jusqu’au bout.'][j]));});
    const jt=findStar(mm[3]);if(jt===ming&&i!==ming)notes.push(pt(`${cap(pn(p.name))}, ${ML('忌')} vers le ${V}`,`ce qui touche ${DOMA(p.name)} vous préoccupera toute votre vie.`));
    if(jt===(ming+6)%12&&i!==ming)notes.push(pt(`${cap(pn(p.name))}, ${ML('忌')} opposé au ${V}`,`ce qui touche ${DOMA(p.name)} peut exercer sur vous une pression directe.`));});
  if(notes.length)o.push(ul(notes));

  /* 6. Les douze palais */
  o.push(h3('Les douze palais en un coup d’œil','z-palaces'));
  const order=[ming,...[1,2,3,4,5,6,7,8,9,10,11].map(k=>(ming-k+12)%12)];
  o.push(`<div class="tablewrap"><table><thead><tr><th>Palais</th><th>Tige-branche</th><th>Étoiles principales</th><th>Étoiles secondaires</th><th>Décennie</th><th>Domaine</th></tr></thead><tbody>${order.map(i=>`<tr><td class="p">${PN(pal[i].name)}${pal[i].isBodyPalace?' (Corps)':''}</td><td>${pal[i].heavenlyStem}${pal[i].earthlyBranch}</td><td>${stLine(i)}</td><td>${minorLine(i)||'—'}</td><td class="mono">${pal[i].decadal.range.join('–')}</td><td>${PAL(pal[i].name)}</td></tr>`).join('')}</tbody></table></div>`);

  let decInfo=null,yearInfo=null,loveNow='';
  /* 7. Décennie */
  const H0=ctx.horoscope(new Date());
  const H=H0&&H0.decadal.name!=='童限'&&pal[H0.decadal.index]?H0:null;
  if(!H)o.push(h3('Votre décennie actuelle','z-decade'),p(`Vous êtes encore dans la période de l’enfance (la première décennie commence à ${pal[ming].decadal.range[0]} ans), ou vous avez dépassé les douze décennies : pas d’analyse de décennie pour l’instant.`));
  if(H){
    const d=H.decadal,di=d.index,dp=pal[di];
    o.push(h3(`Votre décennie actuelle (${dp.decadal.range.join('–')} ans, décennie ${d.heavenlyStem}${d.earthlyBranch})`,'z-decade'));
    o.push(p(`Vous traversez actuellement la décennie de ${dp.decadal.range.join(' à ')} ans, celle du ${pn(dp.name)} (en ${dp.earthlyBranch}). Étoiles principales de la décennie : ${stLine(di)}${minorLine(di)?` ; également présentes : ${minorLine(di)}`:''}.`));
    const dl=[];
    for(const s of (dp.majorStars.length?dp.majorStars:pal[(di+6)%12].majorStars)){const m=M[s.name];if(m)dl.push(pt(`Une décennie menée par ${S(s.name)}`,`${m[2]} Ces traits sont amplifiés pendant ces dix ans : ${lcf(m[3])} ; mais attention : ${lcf(m[4])}.`));}
    if(has(di,'祿存'))dl.push(pt(`${S('祿存')} dans la décennie`,`avec ${S('祿存')}, vos revenus restent plutôt stables pendant ces dix ans : une base financière solide.`));
    if(has(di,'天馬'))dl.push(pt(`${S('天馬')} dans la décennie`,'une décennie de mouvements et de déplacements, mais aussi d’occasions ailleurs ou à l’étranger.'));
    if(has(di,'擎羊')||has(di,'陀羅'))dl.push(pt(`${S('擎羊')} ou ${S('陀羅')} dans la décennie`,'des résistances ou des retards possibles : privilégiez la stabilité plutôt que la précipitation.'));
    dl.push(...mutLayer(d.mutagen,'大限',d.palaceNames,{pal,findStar,pn,birthMut,ming:di,ctxName:'pendant ces dix ans',X}));
    {const jt=findStar(d.mutagen[3]);decInfo={range:dp.decadal.range.join('–'),pal:pn(dp.name),star:andList((dp.majorStars.length?dp.majorStars:pal[(di+6)%12].majorStars).map(x=>S(x.name)))||'—',dom:DOM[dp.name],jiStar:d.mutagen[3],
      ji:jt>=0?`${MZ(d.mutagen[3],'忌')} tombe dans le ${pn(pal[jt].name)} (${pn(d.palaceNames[jt])} de la décennie) : ${JI_ADV[d.palaceNames[jt]]}`:''};}
    o.push(ul(dl));
  }

  /* 8. Années */
  let yNow=new Date().getFullYear();
  {const hn=ctx.horoscope(new Date()),hm=ctx.horoscope(ctx.yearMid(yNow));if(hn&&hm&&hn.yearly.earthlyBranch!==hm.yearly.earthlyBranch)yNow--;}
  for(const [yr,full] of [[yNow,true],[yNow+1,false]]){
    const ref=ctx.yearMid(yr);const Hy=ctx.horoscope(ref);if(!Hy||!pal[Hy.yearly.index])continue;
    const y=Hy.yearly,yi=y.index,yp=pal[yi],dec=Hy.decadal;
    const range=ctx.yearRange(yr);
    o.push(h3(`${full?'Tendances de l’année':'Aperçu de l’année prochaine'} : ${yr}, année ${y.heavenlyStem}${y.earthlyBranch}`,full?'z-year':'z-next'));
    o.push(p(`${range?`(Calendrier grégorien : ${String(range).replace(/\s*[－-]\s*/,' – ')}.) `:''}Le ${V} de l’année tombe en ${yp.earthlyBranch} (${pn(yp.name)} du thème natal) ; étoiles principales : ${stLine(yi)}. La tige « ${y.heavenlyStem} » de l’année active : ${y.mutagen.map((s,j)=>MZ(s,MK[j])).join(', ')}.`));
    const yl=[];
    if(dec.name!=='童限'&&pal[dec.index]&&yi===dec.index)yl.push(pt('Année et décennie superposées',`le ${V} de l’année coïncide avec celui de votre décennie actuelle (${dp0(pal,dec.index,pn)}) : tout ce qui arrive cette année, en bien comme en mal, a une force doublée.`));
    yl.push(...mutLayer(y.mutagen,'流年',y.palaceNames,{pal,findStar,pn,birthMut,ming:yi,ctxName:full?'cette année':'l’an prochain',decMut:dec.name!=='童限'?dec.mutagen:null,X}));
    o.push(ul(yl));
    if(full)yearInfo={yr,gz:y.heavenlyStem+y.earthlyBranch,pal:pn(yp.name),star:stLine(yi),meet:dec.name!=='童限'&&pal[dec.index]&&yi===dec.index};
    if(full){
      o.push(h4('Palais clés'));
      const keys=['命宮','財帛','官祿','夫妻','疾厄'];
      o.push(ul(keys.map(k=>{const i=y.palaceNames.indexOf(k);const p=pal[i];const marks=layerMarks(i,{pal,dec,y,findStar,X});
        return pt(`${cap(pn(k))} de l’année, en ${p.earthlyBranch} (${pn(p.name)} natal)`,`${stLine(i)}.${marks?' '+marks+'.':''}${p.majorStars.length?'':` Palais vide : on le lit à travers le palais opposé (${stLine((i+6)%12)}).`}`);})));
      const ys=Hy.yearly.stars||[];
      const fl=[];ys.forEach((arr,i)=>arr.forEach(s=>{if(['流祿','流羊','流陀','流昌','流曲','流魁','流鉞','流馬','流鸞','流喜'].includes(s.name))fl.push(`${S(FLOW[s.name])} annuel dans le ${pn(y.palaceNames[i])} de l’année`);}));
      if(fl.length)o.push(p(`Étoiles annuelles : ${fl.join(', ')}.`));
    }
  }

  /* 9. Amour */
  o.push(h3('Amour','z-love'));
  const fi=idx('夫妻'),fp=pal[fi];
  const fl=[pt(`${cap(pn('夫妻'))} natal en ${fp.earthlyBranch} (${withMinor(fi)})`,`${PAL('夫妻')}${fp.majorStars.map(s=>M[s.name]?` Votre partenaire, ou vous-même en amour, porte les traits de ${S(s.name)} : ${lcf(M[s.name][2])}`:'').join('')}`)];
  for(const s of fp.majorStars.concat(fp.minorStars))if(s.mutagen)fl.push(pt(`${MZ(s.name,s.mutagen)} dans le ${pn('夫妻')}`,(s.mutagen==='祿'?LU:s.mutagen==='忌'?JI:{})['夫妻']||`en amour, les traits de ${S(s.name)} sont amplifiés.`));
  if(has(fi,'擎羊'))fl.push(pt(`${S('擎羊')} dans le ${pn('夫妻')}`,'disputes et heurts faciles en amour : adoucissez le ton quand vous parlez.'));
  if(has(fi,'陀羅'))fl.push(pt(`${S('陀羅')} dans le ${pn('夫妻')}`,'l’amour progresse lentement ; les choses traînent et vous ressassez.'));
  if(has(fi,'地空')||has(fi,'地劫'))fl.push(pt(`${S('地空')} ou ${S('地劫')} dans le ${pn('夫妻')}`,'des attentes idéalisées en amour, souvent décalées par rapport à la réalité.'));
  const peach=PEACH.map(n=>{const i=findStar(n);return i<0?null:`${S(n)} dans le ${pn(pal[i].name)}`;}).filter(Boolean);
  const bath=pal.findIndex(p=>p.changsheng12==='沐浴');
  if(bath>=0)peach.push(`${S('沐浴')} dans le ${pn(pal[bath].name)}`);
  fl.push(pt('Étoiles de romance',peach.join(', ')+`. Quand ces étoiles se trouvent dans les palais ${andList(['命宮','遷移','夫妻','子女','福德'].map(deP))}, votre pouvoir de séduction est particulièrement visible.`));
  o.push(ul(fl));
  const cmp=[];
  for(const yr of [yNow,yNow+1]){const Hy=ctx.horoscope(ctx.yearMid(yr));if(!Hy)continue;const y=Hy.yearly;
    const fi2=y.palaceNames.indexOf('夫妻'),f2=pal[fi2];
    const luck=y.mutagen.map((s,j)=>({s,j,t:findStar(s)}));
    const hitF=luck.filter(x=>x.t===fi2||x.t===fi).map(x=>MZ(x.s,MK[x.j]));
    const ys=Hy.yearly.stars||[];let luan='',xi='';ys.forEach((arr,i)=>arr.forEach(s=>{if(s.name==='流鸞')luan=y.palaceNames[i];if(s.name==='流喜')xi=y.palaceNames[i];}));
    const ming2=pal[y.index];
    const flowerInMing=ming2.majorStars.some(s=>['貪狼','廉貞'].includes(s.name))||['流鸞','流喜'].some(n=>(ys[y.index]||[]).some(s=>s.name===n));
    let verdict;
    const ji=luck.find(x=>x.j===3),lu=luck.find(x=>x.j===0);
    const jiHit=ji&&(ji.t===fi2||ji.t===fi),luHit=lu&&(lu.t===fi2||lu.t===fi);
    if(jiHit&&luHit)verdict=`${ML('祿')} et ${ML('忌')} se croisent : ${MZ(lu.s,'祿')} apporte de belles rencontres${lu.t===fi2?` (dans le ${pn('夫妻')} de l’année)`:''}, mais ${MZ(ji.s,'忌')} peut créer des malentendus${ji.t===fi?` (dans le ${pn('夫妻')} natal)`:''}. Saisissez votre chance avec la bonne personne et surveillez vos paroles.`;
    else if(jiHit)verdict='Malentendus et remous possibles en amour : ralentissez, parlez davantage et ne vous précipitez pas pour vous engager.';
    else if(luHit)verdict='Une belle année pour l’amour : idéale pour consolider une relation ou rencontrer la bonne personne.';
    else if(flowerInMing)verdict='Beaucoup de charme et de vie sociale, mais sachez distinguer la sincérité du simple flirt.';
    else verdict='Une année calme en amour : laissez les choses venir naturellement.';
    if(!loveNow)loveNow=`${yr} : ${verdict}`;
    cmp.push(`<tr><td class="mono">${yr}</td><td>${y.heavenlyStem}${y.earthlyBranch}</td><td>En ${f2.earthlyBranch} (${pn(f2.name)} natal) : ${stLine(fi2)}</td><td>${hitF.join(', ')||'—'}</td><td>${[luan?`${S('紅鸞')} annuel dans le ${pn(luan)} de l’année`:'',xi?`${S('天喜')} annuel dans le ${pn(xi)} de l’année`:''].filter(Boolean).join(', ')||'—'}</td><td>${verdict}</td></tr>`);}
  o.push(`<div class="tablewrap"><table><thead><tr><th>Année</th><th>Tige-branche</th><th>${cap(pn('夫妻'))} de l’année</th><th>Transformations sur le couple</th><th>${S('紅鸞')} / ${S('天喜')}</th><th>En bref</th></tr></thead><tbody>${cmp.join('')}</tbody></table></div>`);

  /* 10. Vigilance */
  const adv=[];
  if(H){
    const y=H.yearly,d=H.decadal;
    const yj=findStar(y.mutagen[3]),dj=findStar(d.mutagen[3]);
    if(yj>=0)adv.push(pt(`Cette année, ${MZ(y.mutagen[3],'忌')} dans le ${pn(pal[yj].name)} natal (${pn(y.palaceNames[yj])} de l’année)`,`${JI_ADV[y.palaceNames[yj]]}${STAR_JI[y.mutagen[3]]?' '+STAR_JI[y.mutagen[3]]:''}`));
    if(dj>=0&&dj!==yj)adv.push(pt(`Décennie : ${MZ(d.mutagen[3],'忌')} dans le ${pn(pal[dj].name)} natal (${pn(d.palaceNames[dj])} de la décennie)`,`${JI_ADV[d.palaceNames[dj]]}${STAR_JI[d.mutagen[3]]?' '+STAR_JI[d.mutagen[3]]:''}`));
    if(birthMut['忌']&&(birthMut['忌'].i===yj||birthMut['忌'].i===dj))adv.push(pt(`${ML('忌')} superposés`,`le ${pn(pal[birthMut['忌'].i].name)} subit à la fois le ${ML('忌')} de naissance et celui ${birthMut['忌'].i===yj?'de l’année':'de la décennie'} : c’est le point le plus délicat de cette période.`));
    const yl=findStar(y.mutagen[0]);if(yl>=0)adv.push(pt(`Cette année, l’opportunité est dans le ${pn(pal[yl].name)} natal (${pn(y.palaceNames[yl])} de l’année)`,STAR_LU[y.mutagen[0]]||'ce domaine se déroule plutôt bien cette année.'));
  }
  if(adv.length){o.push(h3('Points de vigilance','z-advice'));o.push(ul(adv));}
  /* version essentielle */
  const b=[];
  b.push(h3('L’essentiel de votre thème Zi Wei'));
  const msrc=mp.majorStars.length?mp.majorStars:opp.majorStars;
  const bItems=[pt(`${cap(V)} (${msrc.map(x=>S(x.name)).join(', ')||'—'}${mp.majorStars.length?'':', empruntées au palais opposé'})`,msrc.map(x=>M[x.name]?M[x.name][2]:'').filter(Boolean).join(' ')),
    pt(`Palais du Corps dans le ${pn(bp.name)}`,bp.name==='命宮'?'votre nature innée est aussi votre centre de gravité : être vous-même est l’essentiel.':`avec l’âge, vous accorderez de plus en plus d’importance ${DOMA(bp.name)}.`)];
  const pn2=pats.map(x=>(x.match(/<b>(.*?)<\/b>/)||[])[1]).filter(Boolean);
  if(pn2.length)bItems.push(pt('Configurations',pn2.join(' ; ')+' (détails dans la partie avancée).'));
  if(birthMut['忌'])bItems.push(pt(`Leçon de vie (${MZ(birthMut['忌'].star,'忌')} dans le ${pn(pal[birthMut['忌'].i].name)})`,JI[pal[birthMut['忌'].i].name]));
  b.push(ul(bItems));
  if(decInfo){b.push(h4(`Ces dix ans (${decInfo.range} ans) : décennie du ${decInfo.pal}`));const dup=decInfo.jiStar&&adv.some(x=>x.includes(MZ(decInfo.jiStar,'忌')));b.push(p(`Étoiles principales : ${decInfo.star}. Pendant ces dix ans, l’accent est mis sur ${DOM_ACC(decInfo.dom)}. ${decInfo.ji&&!dup?decInfo.ji:''}${dup?`Le ${ML('忌')} de la décennie et celui de l’année portent tous deux sur ${S(decInfo.jiStar)} : redoublez d’attention aux conseils ci-dessous.`:''}`));}
  if(yearInfo){b.push(h4(`${yearInfo.yr}, année ${yearInfo.gz}`));b.push(p(`Le ${V} de l’année tombe dans le ${yearInfo.pal} natal : ${yearInfo.star}.${yearInfo.meet?' Cette année, année et décennie se superposent : le bon comme le mauvais est amplifié.':''}`));if(adv.length)b.push(ul(adv));}
  if(loveNow){b.push(h4('Amour'));b.push(p(loveNow));}
  return{basic:b.join(''),adv:o.join('')};
}
const DOM_ACC=d=>d;
function dp0(pal,i,pn){return `en ${pal[i].earthlyBranch}`;}
function layerMarks(i,{pal,dec,y,findStar,X}){
  const out=[];const all=[...pal[i].majorStars,...pal[i].minorStars];
  all.forEach(s=>{if(s.mutagen)out.push(`${X.MZ(s.name,s.mutagen)} de naissance`);});
  dec.mutagen.forEach((s,j)=>{if(findStar(s)===i)out.push(`${X.MZ(s,MK[j])} de la décennie`);});
  y.mutagen.forEach((s,j)=>{if(findStar(s)===i)out.push(`${X.MZ(s,MK[j])} de l’année`);});
  return out.join(', ');
}
function mutLayer(muts,layer,names,{pal,findStar,pn,birthMut,ming,ctxName,decMut,X}){
  const out=[];const LD=layer==='大限'?'de la décennie':'de l’année';const C=cap(ctxName);
  muts.forEach((star,j)=>{const t=findStar(star);if(t<0)return;const rel=names[t];const k=MK[j];
    let txt;
    if(k==='祿')txt=`${C}, tout ce qui touche ${DOMA(rel)} se passe bien : ${lcf(LU[rel])}${STAR_LU[star]?' '+STAR_LU[star]:''}`;
    else if(k==='忌')txt=`${C}, c’est dans ce qui touche ${DOMA(rel)} que vous risquez le plus de bloquer : ${lcf(JI[rel])}${STAR_JI[star]?' '+STAR_JI[star]:''}`;
    else if(k==='權')txt=`${C}, votre ambition grandit pour ce qui touche ${DOMA(rel)} : vous voulez prendre les commandes.`;
    else txt=`${C}, ce qui touche ${DOMA(rel)} vous apporte facilement bonne réputation et soutiens.`;
    const flags=[];
    if(k==='忌'&&birthMut['忌']&&birthMut['忌'].i===t)flags.push(`même palais que le ${X.ML('忌')} de naissance (${X.ML('忌')} sur ${X.ML('忌')}) : pression doublée`);
    if(k==='忌'&&decMut&&findStar(decMut[3])===t)flags.push(`même palais que le ${X.ML('忌')} de la décennie (double ${X.ML('忌')}) : prudence absolue`);
    if(k==='忌'&&t===(ming+6)%12)flags.push(`opposé au ${pn('命宮')} ${LD} : effet direct`);
    if(k==='忌'&&t===ming)flags.push(`dans le ${pn('命宮')} ${LD} : forte pression mentale`);
    if(k==='祿'&&birthMut['祿']&&birthMut['祿'].i===t)flags.push(`même palais que le ${X.ML('祿')} de naissance (${X.ML('祿')} sur ${X.ML('祿')}) : encore mieux`);
    if(birthMut['祿']&&birthMut['祿'].star===star&&k==='忌')flags.push(`l’étoile du ${X.ML('祿')} de naissance devient ${X.ML('忌')} : ce qui a été gagné peut se perdre, sachez vous arrêter à temps`);
    out.push(pt(`${X.MZ(star,k)} dans le ${pn(pal[t].name)} natal (${pn(rel)} ${LD})`,txt+(flags.length?` [${flags.join(' ; ')}]`:'')));
  });
  return out;
}
function zwPatterns(Z,{ming,has,hasIn,sfz,findStar,birthMut,pal,pn,X}){
  const {S,ML,MZ,PN}=X;const V=pn('命宮'),VN=PN('命宮');
  const out=[],Sx=sfz(ming),mp=pal[ming],br=mp.earthlyBranch;
  const majorIn=(i,n)=>pal[i].majorStars.some(s=>s.name===n);
  const luIn=set=>set.some(i=>has(i,'祿存')||[...pal[i].majorStars,...pal[i].minorStars].some(s=>s.mutagen==='祿'));
  const add=(n,t)=>out.push(pt(n,t));
  const SFZ='trois directions et quatre côtés';
  if(majorIn(ming,'紫微')&&majorIn(ming,'天府'))add('Zi Fu Tong Gong (l’Empereur et le Trésor réunis)',`l’étoile impériale et le trésor, ${S('紫微')} et ${S('天府')}, siègent ensemble dans le ${V} : de l’envergure, l’art de conserver comme de conquérir, et une vie plutôt comblée.`);
  else if(hasIn(Sx,'紫微')&&hasIn(Sx,'天府'))add('Zi Fu Chao Yuan (l’Empereur et le Trésor en appui)',`${S('紫微')} et ${S('天府')} se rejoignent dans les ${SFZ} du ${V} : une envergure de leader et la capacité de préserver vos acquis.`);
  if(hasIn(Sx,'天府')&&hasIn(Sx,'天相')&&!majorIn(ming,'紫微'))add('Fu Xiang Chao Yuan (le Trésor et le Sceau en appui)',`${S('天府')} et ${S('天相')} soutiennent le ${V} : vous agissez avec constance et tenez parole ; fait pour la gestion et les rôles de bras droit.`);
  if(['七殺','破軍','貪狼'].some(n=>majorIn(ming,n)))add('Sha Po Lang (le Général, l’Avant-garde et le Charme)',`les ${SFZ} du ${V} sont formés par ${S('七殺')}, ${S('破軍')} et ${S('貪狼')} : une vie de grands changements et un fort esprit pionnier ; vous vous épanouissez dans les bouleversements, avec aussi plus de hauts et de bas.`);
  if(['天機','太陰','天同','天梁'].every(n=>hasIn(Sx,n)))add('Ji Yue Tong Liang (Sagesse, Lune, Félicité et Protection)',`${S('天機')}, ${S('太陰')}, ${S('天同')} et ${S('天梁')} se rejoignent dans les ${SFZ} : un esprit fin, qui s’épanouit dans une organisation stable ou la fonction publique.`);
  if(hasIn(Sx,'太陽')&&hasIn(Sx,'天梁')){
    if(hasIn(Sx,'文昌')&&luIn(Sx))add('Yang Liang Chang Lu (Soleil, Protection, Lettré et Revenus)',`${S('太陽')}, ${S('天梁')}, ${S('文昌')} et une étoile de revenus se rejoignent dans les ${SFZ} du ${V} : intelligence et talent, favorable aux examens, à la fonction publique, à la recherche ou aux grandes institutions ; vous gagnez facilement en renom dans votre domaine.`);
    else{const wc=findStar('文昌'),lc=findStar('祿存');const miss=[];if(!hasIn(Sx,'文昌'))miss.push(`${S('文昌')} (${wc>=0?'dans le '+pn(pal[wc].name):'absente'})`);if(!luIn(Sx))miss.push(`une étoile de revenus (${S('祿存')} ${lc>=0?'est dans le '+pn(pal[lc].name):'est absente'}, et le ${ML('祿')} de naissance n’est pas non plus dans les ${SFZ})`);add('Yang Liang Chang Lu (incomplète)',`les ${SFZ} du ${V} contiennent ${S('太陽')} et ${S('天梁')}${luIn(Sx)?' ainsi qu’une étoile de revenus':''}, mais ${andList(miss)} ${miss.length>1?'n’y figurent pas':'n’y figure pas'} : à strictement parler, la configuration est incomplète. Elle garde cependant une tendance à valoriser la réputation, l’expertise et la fonction publique.`);}
  }
  if(['祿','權','科'].every(k=>birthMut[k]&&Sx.includes(birthMut[k].i)))add('San Qi Jia Hui (la réunion des trois merveilles)',`le ${ML('祿')}, le ${ML('權')} et le ${ML('科')} de naissance se trouvent tous dans les ${SFZ} du ${V} : beaucoup d’occasions dans la vie et de bonnes conditions pour allier réussite et renommée.`);
  const hasLuCun=Sx.find(i=>has(i,'祿存')),hasHuaLu=birthMut['祿']&&Sx.includes(birthMut['祿'].i);
  if(hasLuCun!==undefined&&hasHuaLu)add('Shuang Lu Jiao Liu (le double flux de revenus)',`${S('祿存')} et le ${ML('祿')} de naissance rejoignent tous deux le ${V} : deux sources de revenus ; bien géré, cela permet d’accumuler une fortune.`);
  pal.forEach((p,i)=>{if(has(i,'天馬')&&(has(i,'祿存')||[...p.majorStars,...p.minorStars].some(s=>s.mutagen==='祿')))add(`Lu Ma Jiao Chi (revenus et cheval au galop, dans le ${pn(p.name)})`,`une étoile de revenus et ${S('天馬')} dans le même palais : la configuration classique de l’argent qui naît du mouvement. Rester figé à un poste fixe ne vous convient pas ; déplacements, voyages d’affaires, ailleurs ou à distance : plus vous bougez, plus l’argent vient.`);});
  const L=(ming+11)%12,R=(ming+1)%12,both=(a,b)=>(has(L,a)&&has(R,b))||(has(L,b)&&has(R,a));
  if(both('左輔','右弼'))add(`Zuo You Jia Ming (la ${VN} encadrée par les étoiles d’appui)`,`${S('左輔')} et ${S('右弼')} encadrent le ${V} : beaucoup de soutiens tout au long de la vie.`);
  if(both('文昌','文曲'))add(`Chang Qu Jia Ming (la ${VN} encadrée par les lettrés)`,`${S('文昌')} et ${S('文曲')} encadrent le ${V} : intelligence et talent littéraire.`);
  if(both('天魁','天鉞'))add(`Kui Yue Jia Ming (la ${VN} encadrée par les protecteurs)`,`${S('天魁')} et ${S('天鉞')} encadrent le ${V} : une forte chance d’être aidé par des protecteurs.`);
  if(both('擎羊','陀羅'))add(`Yang Tuo Jia Ming (la ${VN} prise en étau)`,`${S('擎羊')} et ${S('陀羅')} encadrent le ${V} : vous êtes facilement pris entre deux feux ; avancez pas à pas.`);
  if(both('火星','鈴星'))add(`Huo Ling Jia Ming (la ${VN} encadrée par le feu)`,`${S('火星')} et ${S('鈴星')} encadrent le ${V} : un tempérament impatient et des imprévus fréquents.`);
  if(both('地空','地劫'))add(`Kong Jie Jia Ming (la ${VN} encadrée par le vide)`,`${S('地空')} et ${S('地劫')} encadrent le ${V} : des idées originales et indépendantes, mais l’argent s’accumule difficilement.`);
  const opp=(ming+6)%12;
  if((has(ming,'天魁')&&has(opp,'天鉞'))||(has(ming,'天鉞')&&has(opp,'天魁')))add('Zuo Gui Xiang Gui (les protecteurs face à face)',`${S('天魁')} et ${S('天鉞')} se partagent le ${V} et le ${pn('遷移')} : des protecteurs vous soutiennent souvent tout au long de la vie.`);
  pal.forEach((p,i)=>{if(majorIn(i,'貪狼')&&has(i,'火星'))add(`Huo Tan (le Feu et le Charme, dans le ${pn(p.name)})`,`${S('貪狼')} rencontre ${S('火星')} : chances soudaines et gains inattendus, qui arrivent vite et repartent vite.`);if(majorIn(i,'貪狼')&&has(i,'鈴星'))add(`Ling Tan (la Clochette et le Charme, dans le ${pn(p.name)})`,`${S('貪狼')} rencontre ${S('鈴星')} : des occasions inattendues et des gains imprévus.`);});
  const sun=pal.find(p=>p.majorStars.some(s=>s.name==='太陽')),moon=pal.find(p=>p.majorStars.some(s=>s.name==='太陰'));
  if(sun&&moon){const sbr=sun.earthlyBranch,mbr=moon.earthlyBranch;
    if('卯辰巳午'.includes(sbr)&&'酉戌亥子'.includes(mbr))add('Ri Yue Bing Ming (le Soleil et la Lune brillants)',`${S('太陽')} en ${sbr} (le jour) et ${S('太陰')} en ${mbr} (la nuit) : chacun est à sa place ; vous conciliez intérieur et extérieur, avec de bons soutiens et une bonne chance financière.`);
    else if('酉戌亥子丑'.includes(sbr)&&'卯辰巳午未'.includes(mbr))add('Ri Yue Fan Bei (le Soleil et la Lune à contre-jour)',`${S('太陽')} en ${sbr} (${pn(sun.name)}, après le coucher du soleil) et ${S('太陰')} en ${mbr} (${pn(moon.name)}, une lune de plein jour) : tous deux perdent leur éclat et vos efforts passent facilement inaperçus ; mieux vaut vous y mettre tôt et miser sur votre expertise.`);}
  if(majorIn(ming,'巨門')&&['子','午'].includes(br)&&mp.majorStars.some(s=>s.name==='巨門'&&s.mutagen&&s.mutagen!=='忌'))add('Shi Zhong Yin Yu (le jade caché dans la pierre)',`${S('巨門')} siège dans le ${V} en 子 ou 午 avec une transformation favorable : un talent discret, qui brille de plus en plus à mesure qu’on le polit.`);
  if(majorIn(ming,'七殺')&&['寅','申'].includes(br))add('Qi Sha Chao Dou (le Général salue la Grande Ourse)',`${S('七殺')} en 寅 ou 申, face à ${S('紫微')} et ${S('天府')} : de l’audace, de quoi accomplir de grandes choses.`);
  if(majorIn(ming,'七殺')&&['子','午'].includes(br))add('Qi Sha Yang Dou (le Général contemple la Grande Ourse)',`${S('七殺')} en 子 ou 午, face à ${S('紫微')} et ${S('天府')} : indépendance et sens de la décision, de quoi ouvrir des voies dans l’adversité.`);
  if(majorIn(ming,'破軍')&&['子','午'].includes(br))add('Ying Xing Ru Miao (l’étoile héroïque à son apogée)',`${S('破軍')} en 子 ou 午 : un grand esprit pionnier, fait pour réussir dans les bouleversements.`);
  if(majorIn(ming,'太陰')&&br==='亥')add('Yue Lang Tian Men (la lune claire à la porte du Ciel)',`${S('太陰')} en 亥 dans le ${V} : finesse et intelligence, une richesse qui coule doucement mais sûrement.`);
  if(majorIn(ming,'太陽')&&br==='卯')add('Ri Zhao Lei Men (le soleil sur la porte du Tonnerre)',`${S('太陽')} en 卯 dans le ${V} : plein d’énergie, une réputation qui porte loin.`);
  if(majorIn(ming,'太陽')&&br==='午')add('Jin Can Guang Hui (l’éclat doré)',`${S('太陽')} en 午 dans le ${V} : un éclat à son maximum, une allure de leader.`);
  if(!mp.majorStars.length&&br==='未'&&majorIn(pal.findIndex(p=>p.earthlyBranch==='卯'),'太陽')&&majorIn(pal.findIndex(p=>p.earthlyBranch==='亥'),'太陰'))add('Ming Zhu Chu Hai (la perle qui sort de la mer)',`le ${V} est en 未 sans étoile principale, soutenu par ${S('太陽')} en 卯 et ${S('太陰')} en 亥 : une réussite tardive, avec réputation et fortune.`);
  if(majorIn(ming,'紫微')&&hasIn(Sx,'左輔')&&hasIn(Sx,'右弼'))add('Jun Chen Qing Hui (le souverain et ses ministres)',`${S('紫微')} dans le ${V}, soutenu par ${S('左輔')} et ${S('右弼')} : un leadership fort, on répond à votre appel.`);
  if(birthMut['忌']&&birthMut['忌'].i===ming)add(`Hua Ji Zuo Ming (le ${ML('忌')} dans la ${VN})`,`${MZ(birthMut['忌'].star,'忌')} dans le ${V} : vous placez la barre très haut pour vous-même ; votre leçon de vie porte sur le travail sur soi.`);
  const sha=['擎羊','陀羅','火星','鈴星','地空','地劫'].filter(n=>has(ming,n));
  if(sha.length)add(`Sha Xing Ru Ming (des étoiles dures dans la ${VN})`,`le ${V} contient ${andList(sha.map(S))} : une personnalité plus anguleuse et une vie riche en épreuves ; apprenez à transformer la pression en moteur.`);
  return out;
}

/* ===================================================================
   Human Design
   =================================================================== */
function readHD(H,Z){
  const o=[],T=Z.types[H.type],A=Z.authorities[H.authority],D=Z.definitions[H.definition];
  const [l1,l2]=H.profile,pk=`${l1}/${l2}`;
  o.push(h3('Lecture Human Design'));
  o.push(p(`Vous êtes de type ${T.n}, de profil ${pk}, avec une ${lcf(A.n)} (${lcf(D[0])}). Votre vie est un voyage ${H.type==='projector'?'où il s’agit de comprendre les autres, puis d’attendre d’être vu et invité':H.type==='manifestor'?'fait d’initiatives et d’impact sur le monde':H.type==='reflector'?'où vous reflétez votre environnement et où la clarté vient peu à peu':'rempli d’expériences, de prises de conscience et d’action'}.`));
  o.push(h4(`${T.n} (${T.en})`));
  o.push(ul([T.txt,pt('Stratégie',T.strategy),pt('Signature (ce que vous ressentez quand vous vivez juste)',T.sig),pt('Thème du non-soi (le signal d’alerte quand vous déviez)',T.ns)]));
  o.push(h4(A.n));o.push(p(A.txt));
  o.push(h4(`Profil ${pk}`));
  o.push(p(Z.profiles[pk]||''));
  o.push(h4(D[0]));o.push(p(D[1]));
  const tips=[...T.tips,`${A.n} : ${({emotional:'freinez avant d’agir sur un coup de tête ; pour une décision importante, dormez au moins une nuit dessus.',sacral:'faites confiance à la réaction immédiate de votre corps, sans lui chercher de justification.',splenic:'votre première intuition est la plus juste ; n’attendez pas d’avoir tout compris.','ego-m':'avant de dire « je veux », vérifiez que vous le voulez vraiment, puis prévenez les personnes concernées.','ego-p':'une fois invité, demandez-vous « qu’est-ce que j’y gagne ? » et ne vous engagez que si cela en vaut la peine.',self:'parlez avec des personnes de confiance et écoutez ce que vous dites : la direction est dans vos mots.',mental:'choisissez quelques personnes de confiance comme caisse de résonance et exprimez vos idées dans le bon cadre.',lunar:'pour une décision importante, attendez un cycle lunaire (environ 28 jours) en parlant avec des personnes variées.'})[H.authority]}`];
  o.push(h4('Conseils pratiques'));o.push(ul(tips));
  const basic=o.join('');o.length=0;
  o.push(h3('Les deux lignes de votre profil','h-lines'));
  for(const [ln,label] of [[l1,'conscient'],[l2,'inconscient']]){const L=Z.lines[ln];
    o.push(p(`<b>Ligne ${ln} (${label}) : ${L.n}</b> — ${L.k}. ${L.d}`));
    o.push(ul([pt('Au quotidien',L.e)]));}
  const cr=crossName(H,Z);
  o.push(h3('Croix d’incarnation','h-cross'));
  o.push(p(`${cr.full}, portes ${H.cross.gates[0]}/${H.cross.gates[1]} | ${H.cross.gates[2]}/${H.cross.gates[3]}. ${Z.angles[H.cross.angle][1]}`));
  o.push(ul([['Soleil conscient',0],['Terre consciente',1],['Soleil inconscient (design)',2],['Terre inconsciente (design)',3]].map(([n,i])=>pt(`${n}, porte ${H.cross.gates[i]}`,cap(Z.gates[H.cross.gates[i]])))));
  const defd=['head','ajna','throat','g','heart','sacral','spleen','sp','root'];
  o.push(h3('Les neuf centres','h-centers'));
  o.push(h4('Centres définis'));
  o.push(H.defined.length?ul(defd.filter(c=>H.defined.includes(c)).map(c=>pt(Z.centers[c].n,Z.centers[c].d))):p('Aucun centre défini.'));
  o.push(h4('Centres ouverts'));
  o.push(ul(defd.filter(c=>!H.defined.includes(c)).map(c=>pt(Z.centers[c].n,Z.centers[c].u))));
  o.push(h3('Canaux','h-channels'));
  o.push(H.channels.length?ul(H.channels.map(([a,b])=>{const c=Z.channels[`${a}-${b}`];return pt(`${a}-${b} ${c[0]} (${c[1]})`,c[2]);})):p('Aucun canal complet.'));
  o.push(h3('Autres conseils pratiques','h-tips'));
  o.push(ul([`Ligne ${l1} : ${({1:'faites d’abord vos recherches à fond : votre sécurité vient du savoir.',2:'gardez du temps seul pour laisser votre talent grandir naturellement.',3:'autorisez-vous à tomber dans les pièges : chaque erreur est une donnée de terrain.',4:'entretenez bien votre réseau de proches : c’est là que se trouvent vos occasions.',5:'restez lucide sur les attentes des autres : vous n’avez pas à sauver tout le monde.',6:'traversez patiemment les trois étapes de votre vie et vivez de façon authentique.'})[l1]}`,...(l2!==l1?[`Ligne ${l2} : ${({1:'pour ce qui compte, posez d’abord des bases solides avant d’agir.',2:'quand on remarque votre talent, ne vous dérobez pas.',3:'un échec n’est qu’une donnée, pas un verdict.',4:'les occasions viennent souvent de vos connaissances : entretenez vos relations.',5:'quand on attend quelque chose de vous, vérifiez que vous voulez vraiment aider avant d’accepter, et posez clairement vos limites.',6:'donnez-vous le temps de prendre du recul : la sagesse vient de l’observation.'})[l2]}`]:[])]));
  return{basic,adv:o.join('')};
}
function crossName(H,Z){
  const key=(H.cross.angle==='right'?'R':H.cross.angle==='left'?'L':'J')+H.cross.gates[0];
  const c=Z.crossTable[key];const ang=Z.angles[H.cross.angle][0];
  if(!c)return{full:ang,zh:'',fr:'',en:''};
  const fr=Z.crossNames[c[0]]||c[0];
  const nm=`${fr}${c[1]?' '+c[1]:''}`;
  return{full:`${ang} ${deA(fr)}${c[1]?' '+c[1]:''} (${c[0]}${c[1]?' '+c[1]:''})`,zh:nm,fr:nm,en:c[0]};
}

root.Readings=root.Readings||{};root.Readings.fr={west:readWest,zw:readZW,hd:readHD,crossName};

})(typeof window!=='undefined'?window:globalThis);
