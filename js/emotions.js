/**
 * EMOlink - Système d'analyse émotionnelle
 * Analyse intelligente des émotions basée sur les mots-clés, négations et contexte
 */

// Configuration des émotions
const EMOTIONS_CONFIG = {
    joie: {
        icon: '😊',
        color: '#fbbf24',
        keywords: [
            'heureux', 'heureuse', 'joie', 'joyeux', 'content', 'contente', 'ravi', 'ravie',
            'enchanté', 'super', 'génial', 'formidable', 'merveilleux', 'fantastique',
            'excellent', 'parfait', 'bien', 'sourire', 'rire', 'enthousiasme', 'enthousiaste',
            'optimiste', 'positif', 'positive', 'épanoui', 'épanouie', 'satisfait', 'satisfaite',
            'chanceux', 'chanceuse', 'fier', 'fière', 'réjoui', 'réjouie', 'gai', 'gaie',
            'amusant', 'drôle', 'cool', 'chouette', 'top', 'adorable', 'magnifique',
            'plaisir', 'bonheur', 'célébrer', 'victoire', 'succès', 'réussite', 'gratitude',
            'reconnaissant', 'reconnaissante', 'chanceux', 'béni', 'radieux', 'radieuse'
        ],
        messages: {
            low: "Tu sembles avoir quelques moments positifs. C'est un bon début !",
            medium: "Une belle énergie positive se dégage de tes mots. Continue comme ça !",
            high: "Tu rayonnes de joie ! C'est magnifique de te voir si heureux(se) !"
        }
    },
    tristesse: {
        icon: '😢',
        color: '#3b82f6',
        keywords: [
            'triste', 'tristesse', 'déprimé', 'déprimée', 'mélancolique', 'malheureux',
            'malheureuse', 'chagrin', 'peine', 'désolé', 'désolée', 'regret', 'regretter',
            'pleurer', 'pleurs', 'larmes', 'désespoir', 'désespéré', 'désespérée',
            'abattu', 'abattue', 'découragé', 'découragée', 'morose', 'sombre',
            'nostalgie', 'manque', 'vide', 'seul', 'seule', 'solitude', 'isolé', 'isolée',
            'déçu', 'déçue', 'déception', 'blessé', 'blessée', 'souffrir', 'souffrance',
            'douleur', 'mal', 'cafard', 'blues', 'down', 'morne', 'soupir',
            'difficile', 'dur', 'pénible', 'lourd', 'accablé', 'accablée'
        ],
        messages: {
            low: "Je perçois une légère mélancolie. N'hésite pas à en parler.",
            medium: "Tu traverses un moment difficile. C'est courageux d'exprimer ces émotions.",
            high: "Ta peine est palpable. Sache que ces sentiments sont temporaires. Tu n'es pas seul(e)."
        }
    },
    colère: {
        icon: '😠',
        color: '#ef4444',
        keywords: [
            'colère', 'énervé', 'énervée', 'furieux', 'furieuse', 'rage', 'fâché', 'fâchée',
            'irrité', 'irritée', 'agacé', 'agacée', 'exaspéré', 'exaspérée', 'contrarié',
            'contrariée', 'frustré', 'frustrée', 'frustration', 'enragé', 'enragée',
            'haine', 'détester', 'déteste', 'horrible', 'insupportable', 'intolérable',
            'révoltant', 'révoltante', 'scandaleux', 'scandaleuse', 'injuste', 'injustice',
            'marre', 'assez', 'saturer', 'saturé', 'saturée', 'crier', 'hurler',
            'exploser', 'explosion', 'violent', 'violente', 'agressif', 'agressive',
            'révolté', 'révoltée', 'indigné', 'indignée', 'offensé', 'offensée',
            'nul', 'nulle', 'pourri', 'dégueulasse', 'connerie', 'débile', 'stupide'
        ],
        messages: {
            low: "Je sens une légère irritation. Prends un moment pour respirer.",
            medium: "Ta frustration est légitime. Identifie ce qui te met en colère peut aider.",
            high: "Ta colère est intense. C'est ok de ressentir ça. Trouve un moyen sain de l'exprimer."
        }
    },
    peur: {
        icon: '😰',
        color: '#8b5cf6',
        keywords: [
            'peur', 'effrayé', 'effrayée', 'terrifié', 'terrifiée', 'angoisse', 'angoissé',
            'angoissée', 'anxieux', 'anxieuse', 'anxiété', 'inquiet', 'inquiète', 'inquiétude',
            'crainte', 'craindre', 'appréhension', 'appréhender', 'nerveux', 'nerveuse',
            'tendu', 'tendue', 'tension', 'stressé', 'stressée', 'paniqué', 'paniquée',
            'panique', 'affolé', 'affolée', 'terreur', 'épouvante', 'effroi',
            'phobique', 'phobie', 'paralysé', 'paralysée', 'trembler', 'tremblements',
            'sueurs', 'cauchemar', 'horrible', 'redouter', 'menace', 'menaçant',
            'dangereux', 'dangereuse', 'risque', 'insécure', 'vulnérable', 'fragile'
        ],
        messages: {
            low: "Une légère inquiétude se fait sentir. Identifie ce qui te préoccupe.",
            medium: "Ton anxiété est présente. Respire profondément, tu es plus fort(e) que tu ne le penses.",
            high: "Ta peur est intense. C'est courageux de l'exprimer. Parle-en à quelqu'un de confiance."
        }
    },
    surprise: {
        icon: '😲',
        color: '#ec4899',
        keywords: [
            'surprise', 'surpris', 'surprise', 'étonné', 'étonnée', 'étonnement',
            'stupéfait', 'stupéfaite', 'choqué', 'choquée', 'incroyable', 'inattendu',
            'inattendue', 'imprévu', 'imprévue', 'soudain', 'soudaine', 'wow',
            'incrédule', 'ahuri', 'ahurie', 'sidéré', 'sidérée', 'déconcerté',
            'déconcertée', 'ébahi', 'ébahie', 'bouche bée', 'stupeur',
            'bouleversé', 'bouleversée', 'retourné', 'retournée', 'chamboulé',
            'chamboulée', 'renversant', 'renversante', 'foudroyant', 'foudroyante'
        ],
        messages: {
            low: "Un petit quelque chose t'a surpris(e) !",
            medium: "L'inattendu fait partie de ta journée !",
            high: "Quelle surprise ! La vie est pleine de rebondissements !"
        }
    },
    dégoût: {
        icon: '🤢',
        color: '#10b981',
        keywords: [
            'dégoût', 'dégoûtant', 'dégoûtante', 'répugnant', 'répugnante', 'écœurant',
            'écœurante', 'immonde', 'abject', 'abjecte', 'ignoble', 'infect', 'infecte',
            'horrible', 'affreux', 'affreuse', 'hideux', 'hideuse', 'repoussant',
            'repoussante', 'nauséabond', 'nauséabonde', 'répulsif', 'répulsive',
            'sale', 'saleté', 'crade', 'cracra', 'dégueulasse', 'beurk', 'berk',
            'pouah', 'vomir', 'gerber', 'nausée', 'nauseux', 'nauseuse',
            'répulsion', 'aversion', 'mépris', 'mépriser', 'haïr'
        ],
        messages: {
            low: "Quelque chose te déplaît légèrement.",
            medium: "Tu ressens du dégoût face à une situation.",
            high: "Cette aversion est forte. Éloigne-toi de ce qui te fait du mal."
        }
    },
    amour: {
        icon: '❤️',
        color: '#f43f5e',
        keywords: [
            'amour', 'aimer', 'adorer', 'adore', 'amoureux', 'amoureuse', 'affection',
            'tendresse', 'tendre', 'doux', 'douce', 'câlin', 'caresse', 'bisou',
            'baiser', 'embrasser', 'passion', 'passionné', 'passionnée', 'romantique',
            'romance', 'sentiment', 'attachement', 'attaché', 'attachée', 'cher',
            'chère', 'précieux', 'précieuse', 'adoration', 'dévotion', 'fidèle',
            'fidélité', 'complice', 'complicité', 'intimité', 'intime', 'proche',
            'chaleureux', 'chaleureuse', 'chaleur', 'cœur', 'mon cœur', 'chéri',
            'chérie', 'bébé', 'mon amour', 'ensemble', 'relation', 'couple'
        ],
        messages: {
            low: "De jolies émotions affectueuses se dessinent.",
            medium: "L'amour est présent dans tes mots. C'est beau !",
            high: "Ton cœur déborde d'amour ! Quelle belle émotion !"
        }
    },
    stress: {
        icon: '😫',
        color: '#f97316',
        keywords: [
            'stress', 'stressé', 'stressée', 'stressant', 'stressante', 'épuisé', 'épuisée',
            'épuisement', 'fatigue', 'fatigué', 'fatiguée', 'crevé', 'crevée', 'exténué',
            'exténuée', 'débordé', 'débordée', 'submergé', 'submergée', 'surchargé',
            'surchargée', 'overwhelmed', 'trop', 'beaucoup', 'surcharge', 'pression',
            'sous pression', 'deadline', 'urgent', 'urgence', 'rush', 'speed',
            'burn-out', 'burnout', 'craqué', 'craquée', 'à bout', 'limite',
            'supporter', 'tenir', 'craquer', 'lâcher', 'saturation', 'trop lourd',
            'charge mentale', 'accablant', 'accablante', 'écrasant', 'écrasante'
        ],
        messages: {
            low: "Un peu de stress pointe le bout de son nez. Respire.",
            medium: "Tu es sous pression. Pense à faire des pauses régulières.",
            high: "Ton niveau de stress est élevé. Prends soin de toi, repose-toi."
        }
    },
    neutre: {
        icon: '😐',
        color: '#6b7280',
        keywords: [],
        messages: {
            low: "Ton état émotionnel semble calme et équilibré.",
            medium: "Tu es dans un état assez neutre en ce moment.",
            high: "Ton texte est plutôt factuel, sans émotion marquée."
        }
    }
};

// Négations - mots qui inversent le sens
const NEGATIONS = [
    'ne', 'pas', 'non', 'jamais', 'rien', 'aucun', 'aucune',
    'nullement', 'point', 'guère', 'sans', 'peu', 'rarement'
];

// Intensificateurs - augmentent l'intensité émotionnelle
const INTENSIFIERS = [
    'très', 'trop', 'vraiment', 'extrêmement', 'terriblement', 'super',
    'hyper', 'ultra', 'méga', 'complètement', 'totalement', 'absolument',
    'énormément', 'infiniment', 'tellement', 'si', 'fort', 'profondément'
];

/**
 * Analyse le texte et retourne les scores émotionnels
 * @param {string} text - Le texte à analyser
 * @returns {Object} Scores par émotion et métadonnées
 */
function analyzeEmotions(text) {
    if (!text || text.trim().length === 0) {
        return null;
    }

    // Normalisation du texte
    const normalizedText = text.toLowerCase();
    const words = normalizedText.split(/\s+/);
    
    // Initialisation des scores
    const scores = {};
    Object.keys(EMOTIONS_CONFIG).forEach(emotion => {
        scores[emotion] = 0;
    });

    // Analyse mot par mot avec contexte
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        // Vérifier si un mot précédent est une négation (dans les 3 mots précédents)
        let hasNegation = false;
        for (let j = Math.max(0, i - 3); j < i; j++) {
            if (NEGATIONS.includes(words[j])) {
                hasNegation = true;
                break;
            }
        }

        // Vérifier si un mot précédent est un intensificateur
        let hasIntensifier = false;
        for (let j = Math.max(0, i - 2); j < i; j++) {
            if (INTENSIFIERS.includes(words[j])) {
                hasIntensifier = true;
                break;
            }
        }

        // Calculer le multiplicateur
        let multiplier = 1;
        if (hasIntensifier) multiplier *= 1.5;
        
        // Analyser chaque émotion
        Object.keys(EMOTIONS_CONFIG).forEach(emotion => {
            const keywords = EMOTIONS_CONFIG[emotion].keywords;
            
            keywords.forEach(keyword => {
                if (word.includes(keyword) || keyword.includes(word)) {
                    // Si négation pour les émotions positives, ne pas compter
                    if (hasNegation && ['joie', 'amour', 'surprise'].includes(emotion)) {
                        // Potentiellement augmenter la tristesse ou autre
                        scores['tristesse'] += 0.5 * multiplier;
                    } 
                    // Si négation pour les émotions négatives, diminuer
                    else if (hasNegation && ['tristesse', 'colère', 'peur', 'stress', 'dégoût'].includes(emotion)) {
                        scores[emotion] += 0.3 * multiplier;
                    }
                    // Sinon compter normalement
                    else {
                        scores[emotion] += 1 * multiplier;
                    }
                }
            });
        });
    }

    // Calcul du total
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    
    // Si aucune émotion détectée, c'est neutre
    if (totalScore === 0) {
        scores.neutre = 1;
    }

    // Conversion en pourcentages
    const percentages = {};
    Object.keys(scores).forEach(emotion => {
        const total = totalScore || 1;
        percentages[emotion] = Math.round((scores[emotion] / total) * 100);
    });

    // Trouver l'émotion dominante
    let dominantEmotion = 'neutre';
    let maxScore = 0;
    Object.keys(percentages).forEach(emotion => {
        if (percentages[emotion] > maxScore) {
            maxScore = percentages[emotion];
            dominantEmotion = emotion;
        }
    });

    // Calcul de l'intensité
    let intensity = 'faible';
    if (maxScore >= 70) intensity = 'forte';
    else if (maxScore >= 40) intensity = 'moyenne';

    // Retourner les résultats
    return {
        percentages: percentages,
        dominant: dominantEmotion,
        intensity: intensity,
        rawScores: scores,
        wordCount: words.length
    };
}

/**
 * Obtient le message empathique correspondant à l'émotion et son intensité
 * @param {string} emotion - L'émotion dominante
 * @param {string} intensity - L'intensité (faible, moyenne, forte)
 * @returns {string} Message empathique
 */
function getEmpathyMessage(emotion, intensity) {
    const messages = EMOTIONS_CONFIG[emotion]?.messages;
    if (!messages) return "Merci d'avoir partagé tes émotions avec moi.";

    if (intensity === 'forte') return messages.high;
    if (intensity === 'moyenne') return messages.medium;
    return messages.low;
}

/**
 * Obtient la configuration d'une émotion
 * @param {string} emotion - Le nom de l'émotion
 * @returns {Object} Configuration de l'émotion
 */
function getEmotionConfig(emotion) {
    return EMOTIONS_CONFIG[emotion] || EMOTIONS_CONFIG.neutre;
}

/**
 * Génère des conseils personnalisés selon l'émotion dominante
 * @param {string} emotion - L'émotion dominante
 * @returns {string} Conseil personnalisé
 */
function getPersonalizedAdvice(emotion) {
    const advice = {
        joie: "Continue à cultiver ces moments de bonheur ! Peut-être pourrais-tu partager cette joie avec quelqu'un ?",
        tristesse: "C'est ok de se sentir triste. Prends le temps dont tu as besoin. Parler à un proche peut aider.",
        colère: "Ta colère mérite d'être entendue. Essaie d'identifier sa source et trouve un moyen sain de l'exprimer.",
        peur: "L'anxiété est difficile à vivre. Respire profondément. Tu es plus fort(e) que tes peurs.",
        surprise: "Les surprises font partie de la vie ! Prends le temps d'intégrer ce qui t'arrive.",
        dégoût: "Cette aversion est un signal. Peut-être est-il temps de t'éloigner de ce qui ne te convient pas ?",
        amour: "L'amour est une belle énergie. Chéris ces sentiments et prends soin de tes relations.",
        stress: "Tu sembles sous pression. N'oublie pas de faire des pauses et de respirer. Tu ne peux pas tout faire.",
        neutre: "Tout va bien ? Parfois, la neutralité est aussi un état précieux. Profite de ce calme."
    };
    
    return advice[emotion] || "Prends soin de toi.";
}


