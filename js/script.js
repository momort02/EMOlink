/**
 * EMOlink - Script principal
 * Gestion de l'interface utilisateur et des interactions
 */

// ===== VARIABLES GLOBALES =====
let currentAnalysis = null;
let journalEntries = [];
let currentFilter = 'all';

// ===== ÉLÉMENTS DOM =====
const elements = {
    // Inputs
    emotionText: document.getElementById('emotionText'),
    charCount: document.getElementById('charCount'),
    
    // Boutons principaux
    analyzeBtn: document.getElementById('analyzeBtn'),
    saveBtn: document.getElementById('saveBtn'),
    themeToggle: document.getElementById('themeToggle'),
    journalBtn: document.getElementById('journalBtn'),
    closeJournal: document.getElementById('closeJournal'),
    clearJournal: document.getElementById('clearJournal'),
    
    // Sections
    resultsSection: document.getElementById('resultsSection'),
    journalSection: document.getElementById('journalSection'),
    
    // Résultats
    dominantEmotion: document.getElementById('dominantEmotion'),
    emotionIcon: document.getElementById('emotionIcon'),
    emotionName: document.getElementById('emotionName'),
    emotionMessage: document.getElementById('emotionMessage'),
    intensityBadge: document.getElementById('intensityBadge'),
    emotionsChart: document.getElementById('emotionsChart'),
    empathyMessage: document.getElementById('empathyMessage'),
    empathyText: document.getElementById('empathyText'),
    
    // Journal
    journalEntries: document.getElementById('journalEntries'),
    totalEntries: document.getElementById('totalEntries'),
    dominantMood: document.getElementById('dominantMood')
};

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadJournalFromStorage();
    updateJournalStats();
});

/**
 * Initialise l'application
 */
function initializeApp() {
    // Gestionnaires d'événements
    elements.emotionText.addEventListener('input', handleTextInput);
    elements.analyzeBtn.addEventListener('click', handleAnalyze);
    elements.saveBtn.addEventListener('click', saveToJournal);
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.journalBtn.addEventListener('click', openJournal);
    elements.closeJournal.addEventListener('click', closeJournal);
    elements.clearJournal.addEventListener('click', clearJournal);
    
    // Filtres du journal
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => handleFilterChange(btn));
    });
    
    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('emolink-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        elements.themeToggle.textContent = '☀️';
    }
    
    // Focus sur le textarea
    elements.emotionText.focus();
}

/**
 * Gère la saisie de texte
 */
function handleTextInput() {
    const text = elements.emotionText.value;
    const charCount = text.length;
    elements.charCount.textContent = charCount;
    
    // Changer la couleur si proche de la limite
    if (charCount > 1800) {
        elements.charCount.style.color = 'var(--anger)';
    } else {
        elements.charCount.style.color = 'var(--text-secondary)';
    }
    
    // Activer/désactiver le bouton
    elements.analyzeBtn.disabled = charCount < 10;
}

/**
 * Gère l'analyse des émotions
 */
function handleAnalyze() {
    const text = elements.emotionText.value.trim();
    
    if (text.length < 10) {
        showNotification('Écris au moins quelques mots pour une analyse précise 😊', 'info');
        return;
    }
    
    // Animation du bouton
    elements.analyzeBtn.classList.add('analyzing');
    elements.analyzeBtn.querySelector('.btn-text').textContent = 'Analyse en cours...';
    
    // Simuler un délai pour l'effet
    setTimeout(() => {
        // Analyser les émotions
        currentAnalysis = analyzeEmotions(text);
        
        if (currentAnalysis) {
            displayResults(currentAnalysis);
            elements.resultsSection.classList.add('active');
            
            // Scroll vers les résultats
            setTimeout(() => {
                elements.resultsSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
        
        // Réinitialiser le bouton
        elements.analyzeBtn.classList.remove('analyzing');
        elements.analyzeBtn.querySelector('.btn-text').textContent = 'Analyser mes émotions';
        
    }, 1500);
}

/**
 * Affiche les résultats de l'analyse
 */
function displayResults(analysis) {
    const { dominant, intensity, percentages } = analysis;
    const config = getEmotionConfig(dominant);
    
    // Mettre à jour l'émotion dominante
    elements.emotionIcon.textContent = config.icon;
    elements.emotionName.textContent = dominant.charAt(0).toUpperCase() + dominant.slice(1);
    elements.emotionMessage.textContent = getEmpathyMessage(dominant, intensity);
    
    // Badge d'intensité
    const intensityText = {
        'faible': 'Intensité faible',
        'moyenne': 'Intensité moyenne',
        'forte': 'Intensité forte'
    };
    elements.intensityBadge.textContent = intensityText[intensity];
    elements.intensityBadge.style.background = config.color;
    
    // Changer la couleur de fond de la carte selon l'émotion
    elements.dominantEmotion.style.background = `linear-gradient(135deg, ${config.color}15, ${config.color}05)`;
    
    // Afficher le graphique
    displayEmotionsChart(percentages);
    
    // Message empathique personnalisé
    const advice = getPersonalizedAdvice(dominant);
    elements.empathyText.textContent = advice;
    elements.empathyMessage.style.borderLeftColor = config.color;
    
    // Changer le thème global selon l'émotion dominante
    applyEmotionalTheme(dominant);
}

/**
 * Affiche le graphique des émotions
 */
function displayEmotionsChart(percentages) {
    elements.emotionsChart.innerHTML = '';
    
    // Trier par pourcentage décroissant
    const sortedEmotions = Object.entries(percentages)
        .sort(([, a], [, b]) => b - a)
        .filter(([, value]) => value > 0);
    
    sortedEmotions.forEach(([emotion, percentage]) => {
        const config = getEmotionConfig(emotion);
        
        const barContainer = document.createElement('div');
        barContainer.className = 'emotion-bar';
        
        barContainer.innerHTML = `
            <div class="emotion-bar-header">
                <span class="emotion-label">
                    ${config.icon} ${emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                </span>
                <span class="emotion-percentage">${percentage}%</span>
            </div>
            <div class="emotion-bar-container">
                <div class="emotion-bar-fill" style="width: 0%; background: ${config.color};"></div>
            </div>
        `;
        
        elements.emotionsChart.appendChild(barContainer);
        
        // Animation de la barre
        setTimeout(() => {
            const fill = barContainer.querySelector('.emotion-bar-fill');
            fill.style.width = `${percentage}%`;
        }, 100);
    });
}

/**
 * Applique un thème émotionnel subtil
 */
function applyEmotionalTheme(emotion) {
    const config = getEmotionConfig(emotion);
    document.documentElement.style.setProperty('--accent', config.color);
}

/**
 * Sauvegarde l'analyse dans le journal
 */
function saveToJournal() {
    if (!currentAnalysis) return;
    
    const text = elements.emotionText.value.trim();
    const entry = {
        id: Date.now(),
        date: new Date().toISOString(),
        text: text.substring(0, 150) + (text.length > 150 ? '...' : ''),
        fullText: text,
        emotion: currentAnalysis.dominant,
        intensity: currentAnalysis.intensity,
        percentages: currentAnalysis.percentages
    };
    
    journalEntries.unshift(entry);
    saveJournalToStorage();
    updateJournalDisplay();
    updateJournalStats();
    
    showNotification('✅ Sauvegardé dans ton journal !', 'success');
    
    // Animation du bouton
    elements.saveBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        elements.saveBtn.style.transform = 'scale(1)';
    }, 200);
}

/**
 * Ouvre le journal
 */
function openJournal() {
    elements.journalSection.classList.add('active');
    updateJournalDisplay();
}

/**
 * Ferme le journal
 */
function closeJournal() {
    elements.journalSection.classList.remove('active');
}

/**
 * Affiche les entrées du journal
 */
function updateJournalDisplay() {
    if (journalEntries.length === 0) {
        elements.journalEntries.innerHTML = `
            <div class="empty-journal">
                <span class="empty-icon">📝</span>
                <p>Ton journal est vide</p>
                <p class="empty-subtitle">Commence par analyser tes émotions !</p>
            </div>
        `;
        return;
    }
    
    const filteredEntries = currentFilter === 'all' 
        ? journalEntries 
        : journalEntries.filter(entry => entry.emotion === currentFilter);
    
    if (filteredEntries.length === 0) {
        elements.journalEntries.innerHTML = `
            <div class="empty-journal">
                <span class="empty-icon">🔍</span>
                <p>Aucune entrée pour ce filtre</p>
            </div>
        `;
        return;
    }
    
    elements.journalEntries.innerHTML = filteredEntries.map(entry => {
        const config = getEmotionConfig(entry.emotion);
        const date = new Date(entry.date);
        const formattedDate = formatDate(date);
        
        return `
            <div class="journal-entry" data-id="${entry.id}" style="border-left-color: ${config.color}">
                <div class="entry-header">
                    <span class="entry-emotion">${config.icon} ${entry.emotion}</span>
                    <span class="entry-date">${formattedDate}</span>
                </div>
                <p class="entry-text">${entry.text}</p>
                <div class="entry-footer">
                    <span class="entry-intensity">Intensité ${entry.intensity}</span>
                    <button class="delete-entry" onclick="deleteEntry(${entry.id})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Met à jour les statistiques du journal
 */
function updateJournalStats() {
    elements.totalEntries.textContent = journalEntries.length;
    
    if (journalEntries.length === 0) {
        elements.dominantMood.textContent = '-';
        return;
    }
    
    // Calculer l'émotion la plus fréquente
    const emotionCounts = {};
    journalEntries.forEach(entry => {
        emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;
    });
    
    let maxCount = 0;
    let dominantMood = '-';
    Object.entries(emotionCounts).forEach(([emotion, count]) => {
        if (count > maxCount) {
            maxCount = count;
            dominantMood = emotion;
        }
    });
    
    const config = getEmotionConfig(dominantMood);
    elements.dominantMood.textContent = `${config.icon} ${dominantMood}`;
}

/**
 * Supprime une entrée du journal
 */
function deleteEntry(id) {
    if (confirm('Supprimer cette entrée ?')) {
        journalEntries = journalEntries.filter(entry => entry.id !== id);
        saveJournalToStorage();
        updateJournalDisplay();
        updateJournalStats();
        showNotification('Entrée supprimée', 'info');
    }
}

/**
 * Vide tout le journal
 */
function clearJournal() {
    if (journalEntries.length === 0) {
        showNotification('Le journal est déjà vide', 'info');
        return;
    }
    
    if (confirm('Supprimer toutes les entrées du journal ? Cette action est irréversible.')) {
        journalEntries = [];
        saveJournalToStorage();
        updateJournalDisplay();
        updateJournalStats();
        showNotification('Journal vidé', 'info');
    }
}

/**
 * Gère le changement de filtre
 */
function handleFilterChange(button) {
    // Retirer la classe active de tous les boutons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ajouter la classe active au bouton cliqué
    button.classList.add('active');
    
    // Mettre à jour le filtre
    currentFilter = button.dataset.filter;
    updateJournalDisplay();
}

/**
 * Bascule entre mode clair et sombre
 */
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    
    const isLight = document.body.classList.contains('light-mode');
    elements.themeToggle.textContent = isLight ? '☀️' : '🌙';
    
    localStorage.setItem('emolink-theme', isLight ? 'light' : 'dark');
    
    showNotification(`Mode ${isLight ? 'clair' : 'sombre'} activé`, 'info');
}

/**
 * Sauvegarde le journal dans le localStorage
 */
function saveJournalToStorage() {
    try {
        localStorage.setItem('emolink-journal', JSON.stringify(journalEntries));
    } catch (e) {
        console.error('Erreur lors de la sauvegarde:', e);
        showNotification('Erreur lors de la sauvegarde', 'error');
    }
}

/**
 * Charge le journal depuis le localStorage
 */
function loadJournalFromStorage() {
    try {
        const saved = localStorage.getItem('emolink-journal');
        if (saved) {
            journalEntries = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Erreur lors du chargement:', e);
    }
}

/**
 * Formate une date
 */
function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}

/**
 * Affiche une notification
 */
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Styles de base
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        color: 'white',
        fontWeight: '600',
        zIndex: '1000',
        animation: 'fadeInUp 0.3s ease',
        boxShadow: 'var(--shadow-lg)'
    });
    
    // Couleur selon le type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Retirer après 3 secondes
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Gestion du clavier
 */
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter pour analyser
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (elements.emotionText.value.trim().length >= 10) {
            handleAnalyze();
        }
    }
    
    // Échap pour fermer le journal
    if (e.key === 'Escape' && elements.journalSection.classList.contains('active')) {
        closeJournal();
    }
});

/**
 * Effet de particules subtil (optionnel)
 */
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    Object.assign(particle.style, {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        background: 'var(--accent)',
        pointerEvents: 'none',
        zIndex: '999',
        animation: 'particleFloat 1s ease-out forwards'
    });
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

// Animation CSS pour les particules (à ajouter dynamiquement si nécessaire)
const particleAnimation = document.createElement('style');
particleAnimation.textContent = `
    @keyframes particleFloat {
        to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleAnimation);

// ===== EXPORT DES FONCTIONS GLOBALES =====
// Nécessaire pour les onclick dans le HTML
window.deleteEntry = deleteEntry;
