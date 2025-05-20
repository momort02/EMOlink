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
    "fâché", "énervé", "furieux", "agacé", "irrité", "frustré", "rage", "exaspéré", "colère", "furibond",
    "indigné", "outré", "vexé", "mécontent", "hargneux", "irascible", "explosif", "tempétueux", "furibard",
    "enragé", "furax", "bouillant", "hors de soi", "en colère", "fulminant", "grincheux", "grognon",
    "irrité profondément", "colère noire", "rage intérieure", "fureur", "colère explosive", "colère sourde",
    "colère intense", "colère incontrôlable", "colère froide", "colère brûlante", "colère dévastatrice",
    "colère destructrice", "colère profonde", "colère accumulée", "colère refoulée", "colère latente",
    "colère éclatante", "colère violente", "colère fulgurante", "colère incontrôlée", "colère incontrôlable", "colere"
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
];
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
