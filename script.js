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
    "effrayé", "apeuré", "inquiet", "angoissé", "stressé", "nerveux", "paniqué", "terreur", "frayeur",
    "épouvanté", "horrifié", "alarmé", "tremblant", "craintif", "paralysé", "pétrifié", "hésitant",
    "inquiétude", "peur intense", "peur profonde", "peur viscérale", "peur incontrôlable", "peur paralysante",
    "peur dévorante", "peur constante", "peur omniprésente", "peur irrationnelle", "peur oppressante",
    "peur écrasante", "peur envahissante", "peur persistante", "peur insurmontable", "peur inexpliquée",
    "peur incontrôlée", "peur incontrôlable", "peur irrésistible", "peur incontrôlée", "peur incontrôlable"
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
