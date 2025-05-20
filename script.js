const emotionsDB = {
  joie: [
    "content", "heureux", "satisfait", "ravi", "gai", "enthousiaste", "joyeux", "positif", "bien", "souriant",
    "épanoui", "comblé", "détendu", "rassuré", "serein", "amoureux", "excité", "motivé", "reconnaissant", "apaisé",
    "rayonnant", "optimiste", "vivant", "chanceux", "ragaillardi", "agréable", "adorable", "attendri", "calme",
    "chaleureux", "confiant", "dynamique", "ébloui", "émerveillé", "enchanté", "encouragé", "en forme",
    "exalté", "extrêmement heureux", "fier", "flatté", "heureux comme tout", "hilare", "inspiré", "intéressé",
    "jubilant", "motivant", "plaisant", "ravigoté", "réconforté", "réjoui", "rempli de joie", "reposant",
    "réussi", "satisfaisant", "souriant", "stimulant", "sympa", "triomphant", "valorisé", "vivifié", "zen",
    "au top", "super", "trop bien", "génial", "top", "cool", "nickel", "heureux de vivre", "bonheur", "béat",
    "plein d’énergie", "plein d’entrain", "dans un bon mood", "positive vibe", "bonne humeur", "détendu",
    "dans une bonne ambiance", "souriant jusqu’aux oreilles", "au comble du bonheur", "le cœur léger",
    "l’âme légère", "éclat de rire", "envie de sourire", "le moral au beau fixe", "rayonnant de bonheur",
    "épanouissement", "extase", "jubilation", "félicité", "béatitude", "ravissement", "allégresse", "euphorie",
    "grisé", "transporté", "triomphal", "exultation", "joie de vivre", "plénitude", "satisfaction profonde",
    "contentement", "bonheur intense", "émerveillement", "enthousiasme débordant", "positivité", "optimisme",
    "grande joie", "bonheur éclatant", "extatique", "rayonnement", "jubiler", "sourire radieux", "bonheur pur","rigoler"
  ],
  tristesse: [
    "triste", "malheureux", "déprimé", "désespéré", "morose", "abattu", "solitaire", "fatigué", "lassé",
    "affaibli", "effondré", "anéanti", "vide", "désespérant", "pleurer", "en larmes", "chagrin",
    "démoralisé", "déstabilisé", "dégoûté", "déçu", "délaissé", "abandonné", "incompris", "fragile", "inquiet",
    "désespérance", "mélancolie", "sombre", "noirceur", "coeur lourd", "envie de pleurer", "moral à zéro",
    "pas bien", "j’en peux plus", "épuisé", "blessé", "cœur brisé", "négatif", "pas d’espoir", "en détresse",
    "douloureux", "angoissé", "tristesse profonde", "en deuil", "mauvais jour", "vide intérieur", "trop dur",
    "émotionnellement épuisé", "plus envie", "plus la force", "trop seul", "lâché", "mauvais moment", "le blues",
    "baisse de moral", "moral à plat", "désolation", "désarroi", "désespoir", "affliction", "amertume",
    "détresse émotionnelle", "solitude", "désolation intérieure", "chagrin profond", "larmes silencieuses",
    "vide émotionnel", "désillusion", "perte", "souffrance", "peine", "désespoir total", "cœur lourd",
    "désenchantement", "mélancolie profonde", "désolation totale", "tristesse infinie", "désespoir absolu"
  ],
  colere: [
  "colère", "énervé", "furieux", "fâché", "agacé", "exaspéré", "enragé", "irrité", "frustré", "bouillant",
  "hors de moi", "je suis hors de moi", "j’en peux plus", "ça me rend fou", "je suis fou de rage", "exploser",
  "explosion de colère", "je vais exploser", "j’ai envie de hurler", "hurler", "crier", "cris", "cris de colère",
  "coup de sang", "je suis en colère", "rage", "rageux", "rageuse", "rager", "je râle", "râler", "râleur", "râleuse",
  "péter un câble", "je pète un plomb", "j’ai pété un plomb", "je suis au bord de l’explosion", "frustration",
  "trop c’est trop", "ça suffit", "je n’en peux plus", "j’en ai marre", "j’en ai ras le bol", "ras-le-bol",
  "marre", "je suis excédé", "c’est insupportable", "intolérable", "c’est inadmissible", "je supporte plus",
  "trop énervé", "je me retiens", "je me retiens de hurler", "j’ai envie de tout casser", "je vais tout casser",
  "casser", "balancer", "claquer la porte", "envie de frapper", "frapper", "violence", "violent", "violente",
  "j’ai frappé", "j’ai crié", "j’ai hurlé", "je suis à bout", "j’en peux vraiment plus", "bordel", "putain", 
  "ça me saoule", "saoulé", "ça me gave", "gâché", "énervement", "c’est un scandale", "scandaleux", "injustice",
  "je suis traité injustement", "je suis en pétard", "pétard", "ça m’énerve", "ça me met en colère", 
  "ça me rend dingue", "je suis irrité", "je suis tendu", "tension", "conflit", "engueulade", "dispute", 
  "crise de nerfs", "nerveux", "nerveuse", "accusation", "je l’accuse", "je suis accusé à tort", "je suis furax",
  "furax", "colère noire", "rage intérieure", "rage contenue", "rage explosive", "jaloux", "jalousie", 
  "je suis jaloux", "je suis jalouse", "je suis énervée", "colérique", "je ne me contrôle plus", 
  "perte de contrôle", "j’ai perdu le contrôle", "je suis incontrôlable", "j’ai crié fort", "j’ai gueulé",
  "gueuler", "gueulante", "colère extrême", "colère profonde", "colère rentrée", "colère refoulée", 
  "colère explosive", "c’est injuste", "je suis frustré", "frustration extrême", "je suis humilié",
  "humiliation", "je me sens humilié", "méprisé", "mépris", "mécontent", "mécontentement", "reproche", 
  "reprocher", "reproches", "je suis blessé", "blessure émotionnelle", "trahi", "trahison", "on m’a trahi",
  "j’ai été trompé", "je suis trompé", "manque de respect", "irrespect", "insulte", "insulté", "injure", 
  "injurié", "provocation", "provoqué", "je suis provoqué", "ça m’énerve grave", "ça me fout en rogne",
  "j’ai la haine", "j’ai une haine en moi", "haine", "hargne", "hargneux", "je suis hargneux", 
  "rempli de colère", "j’ai une rage immense", "rancune", "rancunier", "revanche", "vengeance", "vengeur",
  "envie de vengeance", "c’est de sa faute", "j’accuse", "j’ai envie de lui hurler dessus", 
  "je vais l’exploser", "je vais lui faire payer", "je veux me venger", "je veux qu’il souffre", 
  "je veux qu’elle paie", "je vais lui dire ses quatre vérités", "c’est lui le problème", 
  "je me sens oppressé", "je suis sur les nerfs", "nerfs à vif", "sur les nerfs", "incompréhension", 
  "je suis incompris", "je me sens ignoré", "ignorance", "je suis pas écouté", "c’est énervant", 
  "situation insupportable", "injustice criante", "abus", "abus de pouvoir", "abusé", "abusif", 
  "autorité abusive", "je ne me tairai pas", "j’ai explosé", "je me suis emporté", "emportement",
  "accès de rage", "j’ai eu un accès de colère", "envie de hurler ma colère", "c’est dégueulasse", 
  "ça me répugne", "je suis dégoûté", "dégout", "dégoût profond", "situation énervante", "je suis à bout de nerfs",
  "j’ai crié sur lui", "je lui ai hurlé dessus", "j’ai dit des choses horribles", "j’ai été méchant",
  "j’ai été agressif", "comportement agressif", "paroles blessantes", "blessures verbales", 
  "je ne regrette rien", "je regrette d’avoir crié", "j’ai honte de ma colère", "j’ai honte de mes mots",
  "c’est plus fort que moi", "je ne contrôle plus mes émotions", "colère incontrôlable", 
  "colère incontrôlée", "je suis en ébullition", "ça bout en moi", "c’est la goutte d’eau", 
  "la goutte qui fait déborder le vase", "ça suffit maintenant", "je suis à bout de patience", 
  "je suis excédé", "je ne veux plus parler", "je claque la porte", "je me ferme", "je me suis enfermé", 
  "j’ai coupé tout contact", "je l’ai bloqué", "je l’ai supprimé", "je l’ai insulté", "je regrette de m’être emporté", 
  "je déteste cette situation", "je déteste ce comportement", "je suis outré", "révolté", "indigné", 
  "j’ai honte de ce qu’on m’a fait", "j’ai tout balancé", "je veux des explications", 
  "je veux qu’il s’excuse", "je veux qu’elle assume", "j’ai mis les points sur les i", "mise au point", 
  "j’ai vidé mon sac", "trop, c’est trop", "j’ai craqué", "je suis sur le point de craquer", 
  "je retiens mes larmes de colère", "je pleure de rage", "je suis en colère contre moi-même",
  "auto-culpabilisation", "colère auto-dirigée", "colère intérieure", "je bouillonne de l’intérieur"
],
  peur: [
    "peur", "terrifié", "angoissé", "effrayé", "épouvanté", "paniqué", "horrifié", "crainte", "inquiet", "frayeur",
  "trembler", "tremblant", "sursaut", "paranoïaque", "transpirer", "sueur froide", "mal à l’aise", "je suis mort de peur",
  "je flippe", "flipper", "flippant", "panique", "hystérique", "épouvante", "trouillé", "je crains le pire", "anxiété",
  "angoisse", "frisson", "frissonner", "je me sens menacé", "menace", "dangereux", "inquiétude", "je ne suis pas rassuré",
  "rassurant", "non rassurant", "j’ai peur", "j’ai la trouille", "j’ai la frousse", "j’ai les jetons", "je suis en panique",
  "j’ai un mauvais pressentiment", "cauchemar", "je suis en alerte", "je suis stressé", "stress", "je suis méfiant",
  "méfiance", "je suis sur mes gardes", "suspicieux", "suspect", "sinistre", "effroi", "en alerte", "je redoute",
  "je redoute quelque chose", "je redoute cet endroit", "j’ai peur de perdre", "j’ai peur de mourir", "j’ai peur du noir",
  "obscurité", "hurlement", "cri de peur", "troublé", "je tremble", "insécurité", "dangereusement", "dangereuse",
  "inconnu menaçant", "je sens un danger", "danger", "zone dangereuse", "je me sens en danger", "inconfort",
  "oppressé", "oppression", "claustrophobie", "phobie", "peur irrationnelle", "je panique", "j’étouffe", "je veux fuir",
  "fuir", "fuite", "besoin de m’enfuir", "j’ai peur de rester", "angoisse nocturne", "peur nocturne", "j’ai peur de toi",
  "j’ai peur de lui", "il me fait peur", "elle me fait peur", "ça me fait peur", "film d’horreur", "scène terrifiante",
  "bruit suspect", "ombre inquiétante", "je ne suis pas serein", "situation angoissante", "stress intense",
  "choc émotionnel", "traumatisé", "traumatisme", "hypersensible", "peur soudaine", "attaque de panique",
  "je suis tétanisé", "paralysé", "bloqué par la peur", "peur panique", "je n’arrive pas à bouger", "j’ai crié de peur",
  "j’ai sursauté", "chose effrayante", "monstre", "esprit", "fantôme", "surnaturel", "je suis en danger", "alarme",
  "j’ai besoin d’aide", "je suis en détresse", "peur constante", "je vis dans la peur", "je ne peux pas dormir",
  "insomnie par peur", "peur de l’échec", "peur du rejet", "peur de l’abandon", "j’ai un noeud au ventre",
  "j’ai la gorge nouée", "angoisse sociale", "peur de parler", "j’ai peur de me ridiculiser", "je suis mal à l’aise",
  "j’ai peur d’échouer", "peur de souffrir", "peur de la douleur", "peur de l’inconnu", "angoisse du futur",
  "je suis figé", "impression de mourir", "je me cache", "je me terre", "je me sens traqué", "poursuivi", "chassé",
  "je veux disparaître", "disparaître", "j’ai peur d’être vu", "j’ai peur d’être pris", "piégé", "je suis piégé",
  "j’ai été surpris", "ça m’a glacé le sang", "glacé", "sang glacé", "sueur", "mains moites", "ventre noué",
  "j’ai hurlé", "cri strident", "visage blême", "visage pâle", "je suis livide", "je suis choqué", "je suis figé de peur",
  "je recule", "je veux m’éloigner", "je suis incapable de réagir", "j’ai perdu mes moyens", "j’ai perdu le contrôle",
  "j’ai cru que c’était la fin", "c’était horrible", "j’ai peur des araignées", "peur des hauteurs", "acrophobie",
  "agoraphobie", "claustrophobie", "phobie sociale", "hanté", "obsédé par la peur", "je n’arrive pas à oublier",
  "je revis la scène", "je cauchemarde", "j’évite certains endroits", "j’évite certaines personnes", "peur de revivre ça",
  "hypersurveillance", "je suis trop sur mes gardes", "angoisse permanente", "peur chronique", "je dors mal",
  "je suis en état de stress post-traumatique", "hypervigilance", "trouble anxieux", "souffrance mentale",
  "état de peur constant", "je me sens piégé", "je ressens une tension", "tension nerveuse", "je suis nerveux",
  "situation oppressante", "je ne respire plus", "je retiens mon souffle", "je suis figé", "paralysie émotionnelle",
  "envie de pleurer", "yeux écarquillés", "pupilles dilatées", "voix tremblante", "voix cassée", "je n’arrive pas à parler",
  "je suis sans voix", "je ne sais pas quoi faire", "sensation de malaise", "mal être", "c’est trop pour moi", 
  "je veux que ça s’arrête", "j’ai l’impression de devenir fou", "je me sens impuissant", "c’est invivable",
  "j’ai peur de rester seul", "j’ai peur d’être abandonné", "j’ai peur qu’il lui arrive quelque chose", 
  "j’ai peur qu’elle parte", "j’ai peur de ce qui va se passer", "angoisse de séparation", "stress émotionnel",
  "je suis dépassé", "je n’ai pas de solution", "je veux fuir cette situation", "j’évite de penser à ça",
  "j’évite d’en parler", "ce souvenir me hante", "je revis la scène en boucle", "j’ai peur qu’on me juge",
  "je suis terrorisé", "je suis incapable de bouger", "je veux me cacher", "je veux disparaître", 
  "je ne veux pas rester ici", "c’est trop angoissant", "c’est insoutenable", "j’ai peur que ça recommence"
],
  surprise: [
    "surpris", "étonné", "choqué", "stupéfait", "impressionné", "émerveillé", "abasourdi", "éberlué",
    "interloqué", "déconcerté", "étonnement", "surprise totale", "surprise agréable", "surprise inattendue",
    "surprise choquante", "surprise bouleversante", "surprise incroyable", "surprise stupéfiante",
    "surprise impressionnante", "surprise déconcertante", "surprise inattendue", "surprise choquante",
    "surprise bouleversante", "surprise incroyable", "surprise stupéfiante", "surprise impressionnante"
  ]
};

const negations = ["pas", "ne", "n'", "jamais", "plus", "aucun", "rien"];

const botAdvices = {
  joie: "Continue comme ça ! Garde ton énergie positive et partage-la !",
  tristesse: "Tu peux essayer d’en parler à un proche ou de faire une activité que tu aimes.",
  colere: "Respire un bon coup, écris ce que tu ressens ou va marcher quelques minutes.",
  peur: "Parle à quelqu’un, essaye de noter ce qui te fait peur et relativise.",
  surprise: "Essaie de comprendre ce qui t’a surpris, cela peut être une opportunité.",
  neutre: "Exprime-toi librement, tu peux aussi écrire ce que tu ressens."
};

let emotionCounts = {
  joie: 0,
  tristesse: 0,
  colere: 0,
  peur: 0,
  surprise: 0,
  neutre: 0
};

let chart;

function detectEmotion() {
  const text = document.getElementById("inputText").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  const adviceDiv = document.getElementById("botAdvice");

  let detectedEmotions = new Set();
  let negatedEmotions = new Set();

  // Pour chaque émotion, on cherche les mots-clés
  for (const [emotion, keywords] of Object.entries(emotionsDB)) {
    for (const word of keywords) {
      // Cherche mot clé avec ou sans négation
      const regex = new RegExp(`\\b(${negations.join("|")})?\\s*${word}\\b`, "g");
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match[1]) {
          // Si négation détectée devant le mot
          negatedEmotions.add(emotion);
        } else {
          detectedEmotions.add(emotion);
        }
      }
    }
  }

  // On enlève les émotions qui sont à la fois détectées et négatives (inversées)
  for (const emo of negatedEmotions) {
    if (detectedEmotions.has(emo)) {
      detectedEmotions.delete(emo);
      detectedEmotions.add("tristesse");  // inversion => tristesse par défaut
    }
  }

  if (detectedEmotions.size === 0) {
    detectedEmotions.add("neutre");
  }

  // Affichage résultats
  let emotionsList = Array.from(detectedEmotions);
  resultDiv.innerHTML = "Émotions détectées : <strong>" + emotionsList.join(", ") + "</strong>";
  resultDiv.className = "result " + emotionsList[0];

  // Conseils cumulés
  let conseils = emotionsList.map(e => botAdvices[e]).join("<br>") || botAdvices["neutre"];
  adviceDiv.innerHTML = conseils;
  adviceDiv.className = "result " + emotionsList[0];

  // Sauvegarde chacune
  emotionsList.forEach(emotion => saveToHistory(emotion, text));

  updateChart();
}

function saveToHistory(emotion, sentence) {
  const date = new Date().toLocaleString();
  const entry = `${date} → [${emotion}] : ${sentence}`;
  let history = JSON.parse(localStorage.getItem("emoHistory") || "[]");
  history.unshift(entry);
  localStorage.setItem("emoHistory", JSON.stringify(history));
  updateHistoryList();

  // compteur
  emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
  localStorage.setItem("emoCounts", JSON.stringify(emotionCounts));
}

function updateHistoryList() {
  const historyList = document.getElementById("historyList");
  let history = JSON.parse(localStorage.getItem("emoHistory") || "[]");
  historyList.innerHTML = "";
  history.slice(0, 10).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function updateChart() {
  const ctx = document.getElementById("emotionChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(emotionCounts),
      datasets: [{
        label: 'Émotions détectées',
        data: Object.values(emotionCounts),
        backgroundColor: [
          '#3fc380', '#546de5', '#e74c3c', '#f39c12', '#9b59b6', '#95a5a6'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

function initCounts() {
  const saved = JSON.parse(localStorage.getItem("emoCounts"));
  if (saved) emotionCounts = saved;
}

window.onload = () => {
  initCounts();
  updateHistoryList();
  updateChart();
};
function openMenu() {
  document.getElementById("sideMenu").style.width = "250px";
}

function closeMenu() {
  document.getElementById("sideMenu").style.width = "0";
}
function exportPDF() {
  const jsPDF = window.jspdf.jsPDF;
  const doc = new jsPDF();
  const history = JSON.parse(localStorage.getItem("emoHistory") || "[]");
  let y = 10;

  doc.setFontSize(12);
  doc.text("Journal Émotionnel - EMOlink", 10, y);
  y += 10;

  history.forEach((entry) => {
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
    doc.text(`- ${entry}`, 10, y);
    y += 8;
  });

  doc.save("journal_emolink.pdf");
}

function resetJournal() {
  if (confirm("Voulez-vous vraiment réinitialiser le journal des émotions ?")) {
    localStorage.removeItem("emoHistory");
    localStorage.removeItem("emoCounts");
    emotionCounts = {
      joie: 0,
      tristesse: 0,
      colere: 0,
      peur: 0,
      surprise: 0,
      neutre: 0
    };
    updateHistoryList();
    updateChart();
  }
}
