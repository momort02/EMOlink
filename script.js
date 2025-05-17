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
    "grande joie", "bonheur éclatant", "extatique", "rayonnement", "jubiler", "sourire radieux", "bonheur pur",
    "rire", "fête", "célébration", "applaudir", "accompli", "admiratif", "affectueux", "aimé", "amical",
    "apprécié", "assuré", "attentif", "audacieux", "aventureux", "bienveillant", "brillant", "captivé",
    "charmé", "choyé", "comique", "complice", "consolé", "convivial", "courageux", "créatif", "curieux",
    "débordant", "démonstratif", "dévoué", "divertissant", "drôle", "éclairé", "éclatant", "éduqué",
    "élevé", "énergique", "engagé", "enjoué", "enrichi", "enthousiasmant", "épanoui", "épaté", "épris",
    "espiègle", "étonné", "éveillé", "exaltant", "exaucé", "exclusif", "exemplaire", "exquis", "fasciné",
    "fidèle", "flatteur", "flottant", "formidable", "fraternel", "fringant", "galant", "gagnant", "généreux",
    "gentil", "glorieux", "gourmand", "grandiose", "héroïque", "hilarant", "honoré", "humoristique",
    "impressionné", "indépendant", "inspirant", "intègre", "intelligent", "intense", "intime", "inventif",
    "irrésistible", "jovial", "juste", "libre", "lumineux", "magnifique", "malicieux", "marquant", "merveilleux",
    "mignon", "motivant", "naturel", "novateur", "offert", "optimiste", "original", "ouvert", "palpitant",
    "parfait", "passionné", "pétillant", "plaisant", "plein", "populaire", "positif", "précieux", "privilégié",
    "proche", "prospère", "radieux", "raffiné", "rassurant", "rayonnant", "réalisé", "réconfortant", "réjouissant",
    "remarquable", "rempli", "réussi", "riche", "rigolo", "rire", "romantique", "satisfait", "sécurisé",
    "serein", "sociable", "solide", "souriant", "spirituel", "stable", "stimulant", "subtil", "surpris",
    "sympathique", "talentueux", "tendre", "tonique", "tranquille", "triomphant", "unique", "valorisé",
    "vibrant", "victorieux", "vivant", "volontaire", "zélé"
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
    "désenchantement", "mélancolie profonde", "désolation totale", "tristesse infinie", "désespoir absolu",
    "accablé", "affaibli", "agacé", "agonie", "alourdi", "amer", "angoisse", "anéanti", "apathique", "attristé",
    "attristement", "avachi", "blessé", "bouleversé", "brisé", "chagriné", "chancelant", "choc", "condamné",
    "confus", "contrarié", "coupable", "crise", "cruel", "découragé", "défait", "délaissé", "démoralisé",
    "dénigré", "désabusé", "désarmé", "désespéré", "désillusionné", "désintéressé", "désolé", "dévalorisé",
    "difficile", "douloureux", "dramatique", "effondré", "égaré", "embarrassé", "ému", "épuisé", "esseulé",
    "exclu", "faible", "fâché", "froid", "frustré", "gêné", "honte", "humilié", "impuissant", "incertain",
    "incompris", "indifférent", "inquiet", "insatisfait", "isolé", "lassé", "lâché", "lourd", "mal", "malchanceux",
    "malheureux", "malmené", "manque", "manqué", "mécontent", "méprisé", "minable", "misérable", "morne",
    "navré", "négligé", "négatif", "nostalgique", "oublie", "outré", "paniqué", "pénible", "perdu", "pessimiste",
    "plaintif", "pleurs", "préoccupé", "privé", "problème", "rabaissé", "rejeté", "remords", "renfermé",
    "repoussé", "résigné", "ressentiment", "retiré", "ruiné", "sacrifié", "sceptique", "seul", "sombre",
    "souffrant", "stressé", "submergé", "surmené", "terne", "trahi", "triste", "troublé", "usé", "vide",
    "vulnérable"
  ],
  colere: [
    "fâché", "énervé", "furieux", "agacé", "irrité", "frustré", "rage", "exaspéré", "colère", "furibond",
    "indigné", "outré", "vexé", "mécontent", "hargneux", "irascible", "explosif", "tempétueux", "furibard",
    "enragé", "furax", "bouillant", "hors de soi", "en colère", "fulminant", "grincheux", "grognon",
    "irrité profondément", "colère noire", "rage intérieure", "fureur", "colère explosive", "colère sourde",
    "colère intense", "colère incontrôlable", "colère froide", "colère brûlante", "colère dévastatrice",
    "colère destructrice", "colère profonde", "colère accumulée", "colère refoulée", "colère latente",
    "colère éclatante", "colère violente", "colère fulgurante", "colère incontrôlée", "colère incontrôlable",
    "agressif", "amer", "animosité", "antipathique", "arrogant", "attaquant", "autoritaire", "bagarreur",
    "belliqueux", "blessant", "boudeur", "brutal", "capricieux", "cassant", "combatif", "condamnant",
    "conflit", "contrariant", "crispé", "critiquant", "cynique", "dédaigneux", "dégoûté", "dépité",
    "désagréable", "désapprobateur", "désobligeant", "désolé", "dominateur", "emporté", "énervement",
    "entêté", "exaspération", "excessif", "fâcherie", "fâcheux", "fier", "frustration", "grinçant",
    "haine", "hostile", "impatient", "impulsif", "incendiaire", "indigné", "inflexible", "insatisfait",
    "insolent", "intolérant", "irascible", "irrité", "jaloux", "lourd", "malveillant", "menaçant",
    "méprisant", "mépris", "moqueur", "négatif", "nerveux", "offensé", "oppressant", "orgueilleux",
    "outré", "peste", "piquant", "provocateur", "querelleur", "rageur", "râleur", "révolté", "rigide",
    "rude", "sarcastique", "sévère", "soupçonneux", "stressant", "strict", "suspicieux", "tendu",
    "têtu", "tyran", "ulcéré", "violent", "vindicatif", "virulent", "vitupérant", "vociférant", "zélé"
  ],
  peur: [
    "effrayé", "apeuré", "inquiet", "angoissé", "stressé", "nerveux", "paniqué", "terreur", "frayeur",
    "épouvanté", "horrifié", "alarmé", "tremblant", "craintif", "paralysé", "pétrifié", "hésitant",
    "inquiétude", "peur intense", "peur profonde", "peur viscérale", "peur incontrôlable", "peur paralysante",
    "peur dévorante", "peur constante", "peur omniprésente", "peur irrationnelle", "peur oppressante",
    "peur écrasante", "peur envahissante", "peur persistante", "peur insurmontable", "peur inexpliquée",
    "peur incontrôlée", "peur irrésistible", "peur incontrôlée", "peur incontrôlable", "affolé", "alarmé",
    "angoisse", "anxiété", "appréhendé", "appréhension", "assombri", "attentif", "averti", "blême", "bouleversé",
    "craintif", "crispé", "déconcerté", "décontenancé", "défensif", "démuni", "dérangé", "désemparé",
    "désorienté", "déstabilisé", "détecté", "doute", "effaré", "effrayant", "ému", "épouvanté", "esquivé",
    "étonné", "éveillé", "frappé", "frissonnant", "gêné", "hésitant", "horrifié", "impressionné", "incertain",
    "inconfortable", "incrédule", "inquiet", "insécurisé", "intimidé", "mal à l’aise", "maladroit", "méfiant",
    "menaçant", "méprisant", "méfiance", "méfiant", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié",
    "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié",
    "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié",
    "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié",
    "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié",
    "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié", "méfié"
  ],
  surprise: [
    "surpris", "étonné", "choqué", "stupéfait", "impressionné", "émerveillé", "abasourdi", "éberlué",
    "interloqué", "déconcerté", "étonnement", "surprise totale", "surprise agréable", "surprise inattendue",
    "surprise choquante", "surprise bouleversante", "surprise incroyable", "surprise stupéfiante",
    "surprise impressionnante", "surprise déconcertante", "surprise inattendue", "surprise choquante",
    "surprise bouleversante", "surprise incroyable", "surprise stupéfiante", "surprise impressionnante",
    "ahuri", "ahurissant", "alarmé", "amusé", "attendri", "attentif", "attrapé", "attrayant", "averti",
    "bouche bée", "captivé", "charmé", "choquant", "cloué", "coincé", "curieux", "décontenancé", "déconcerté",
    "dérouté", "désarçonné", "désorienté", "ébloui", "éclatant", "émerveillé", "épaté", "éperdu", "époustouflé",
    "étonnant", "étonné", "étonnement", "éveillé", "fasciné", "frappé", "frappant", "impressionné", "incroyable",
    "inédit", "inouï", "interloqué", "intrigué", "invisible", "méconnu", "médusé", "mystérieux", "nouveau",
    "novateur", "original", "paralysé", "perplexe", "renversant", "renversé", "saisi", "saisissant", "sceptique",
    "sensationnel", "sidéré", "singulier", "soudain", "spontané", "stupéfait", "stupéfiant", "subit", "surprenant",
    "surpris", "suspendu", "tétanisé", "troublé", "unique", "éberlué", "éclatant", "épatant", "étonnant",
    "étonné", "étonnement", "éveillé", "fasciné", "frappé", "impressionné", "incroyable", "inédit", "inouï",
    "interloqué", "intrigué", "médusé", "mystérieux", "nouveau", "novateur", "original", "paralysé", "perplexe",
    "renversant", "saisi", "saisissant", "sensationnel", "sidéré", "singulier", "soudain", "spontané", "stupéfait",
    "stupéfiant", "subit", "surprenant", "surpris", "suspendu", "tétanisé", "troublé", "unique"
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
  const chartCanvas = document.getElementById("emotionChart");
  const chartImg = chartCanvas.toDataURL("image/png", 1.0);
  doc.addImage(chartImg, 'PNG', 10, y, 90, 90); // 90x90mm (environ 340x340px)
  y += 100;

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

function getMainMoodOfDay() {
  // Prend la première émotion du dernier texte analysé aujourd'hui
  const history = JSON.parse(localStorage.getItem("emoHistory") || "[]");
  const today = new Date().toLocaleDateString();
  for (let entry of history) {
    if (entry.startsWith(today)) {
      const match = entry.match(/\[(.*?)\]/);
      if (match) return match[1];
    }
  }
  return "neutre";
}

function shareMood() {
  const name = document.getElementById("friendName").value.trim();
  if (!name) return alert("Entre ton prénom ou pseudo !");
  const mood = getMainMoodOfDay();
  let friends = JSON.parse(localStorage.getItem("friendsMoods") || "[]");
  // Remplace si déjà partagé aujourd'hui
  const today = new Date().toLocaleDateString();
  friends = friends.filter(f => !(f.name === name && f.date === today));
  friends.unshift({ name, mood, date: today });
  localStorage.setItem("friendsMoods", JSON.stringify(friends));
  updateFriendsMoods();
}

function updateFriendsMoods() {
  const ul = document.getElementById("friendsMoods");
  let friends = JSON.parse(localStorage.getItem("friendsMoods") || "[]");
  ul.innerHTML = "";
  friends
    .filter(f => f.date === new Date().toLocaleDateString())
    .forEach(f => {
      const li = document.createElement("li");
      li.textContent = `${f.name} : ${f.mood}`;
      ul.appendChild(li);
    });
}

// Appelle cette fonction au chargement
window.onload = () => {
  initCounts();
  updateHistoryList();
  updateChart();
  updateFriendsMoods(); // Ajout ici
};