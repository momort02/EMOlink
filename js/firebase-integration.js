/**
 * EMOlink - Intégration Firebase avec l'interface
 * Connecte Firebase avec le système d'amis existant
 */

// ===== VARIABLES GLOBALES =====
let firebaseInitialized = false;
let unsubscribeFunctions = []; // Pour nettoyer les listeners

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Attendre que tout soit chargé
    setTimeout(() => {
        initFirebaseIntegration();
    }, 500);
});

async function initFirebaseIntegration() {
    console.log('🔥 Initialisation de l\'intégration Firebase...');
    
    // Initialiser Firebase
    const success = initializeFirebase();
    
    if (!success) {
        console.warn('⚠️ Firebase non initialisé - Mode local actif');
        showFirebaseStatus(false);
        return;
    }
    
    firebaseInitialized = true;
    showFirebaseStatus(true);
    
    // Connexion automatique anonyme si pas connecté
    if (!getCurrentUser()) {
        await signInAnonymously();
    }
}

// ===== CALLBACKS FIREBASE =====

// Quand l'utilisateur se connecte
window.onFirebaseUserSignedIn = async function(user) {
    console.log('✅ Utilisateur Firebase connecté:', user.uid);
    
    // Charger ou créer le profil
    let profile = await loadUserProfile(user.uid);
    console.log('📁 Profil chargé:', !!profile, profile);
    
    if (!profile || !profile.profile) {
        // Nouveau compte - créer le profil
        console.log('🆕 Nouveau compte - création du profil');
        
        // Utiliser le profil local s'il existe
        const localProfile = UserProfile.load();
        console.log('💾 Profil local disponible:', !!localProfile);
        
        profile = {
            profile: {
                username: localProfile.username || 'Utilisateur' + Math.floor(Math.random() * 1000),
                avatar: localProfile.avatar,
                friendCode: localProfile.friendCode,
                createdAt: new Date().toISOString()
            },
            sharePreferences: localProfile.sharePreferences
        };
        
        console.log('📤 Sauvegarde du profil dans Firebase...');
        const saveResult = await saveUserProfile(user.uid, profile.profile);
        if (!saveResult) {
            console.error('⚠️ ERREUR: Impossible de sauvegarder le profil! Les règles Firebase peuvent bloquer l\'accès.');
            showNotification('⚠️ Impossible de sauvegarder votre profil. Vérifiez les paramètres Firebase.', 'error');
        } else {
            console.log('✅ Profil sauvegardé avec succès');
        }
    } else {
        console.log('✅ Profil existant trouvé');
    }
    
    // Vérifier que le profil a la bonne structure avant de le synchronizer
    if (!profile || !profile.profile || !profile.profile.username) {
        console.error('❌ CRITIQUE: Structure de profil invalide!', profile);
        showNotification('❌ Erreur: Structure de profil invalide. Contactez le support.', 'error');
        return;
    }
    
    // Synchroniser avec le système local
    syncFirebaseToLocal(user.uid, profile);
    
    // Démarrer les listeners temps réel
    startRealtimeListeners(user.uid);
    
    // Mettre à jour l'interface
    updateUIForFirebaseMode(true);
    
    showNotification('🔥 Connecté à Firebase - Mode temps réel activé !', 'success');
};

// Quand l'utilisateur se déconnecte
window.onFirebaseUserSignedOut = function() {
    console.log('👋 Utilisateur Firebase déconnecté');
    
    // Arrêter les listeners
    stopRealtimeListeners();
    
    // Mettre à jour l'interface
    updateUIForFirebaseMode(false);
    
    showNotification('Mode local activé', 'info');
};

// ===== SYNCHRONISATION =====

// Synchroniser Firebase vers local
function syncFirebaseToLocal(userId, firebaseProfile) {
    // Mettre à jour le profil local
    userProfile.id = userId;
    userProfile.username = firebaseProfile.profile.username;
    userProfile.avatar = firebaseProfile.profile.avatar;
    userProfile.friendCode = firebaseProfile.profile.friendCode;
    userProfile.sharePreferences = firebaseProfile.sharePreferences;
    userProfile.save();
    
    updateProfileDisplay();
}

// Synchroniser local vers Firebase
async function syncLocalToFirebase() {
    const user = getCurrentUser();
    if (!user) return;
    
    await saveUserProfile(user.uid, {
        username: userProfile.username,
        avatar: userProfile.avatar,
        friendCode: userProfile.friendCode,
        createdAt: userProfile.createdAt,
        sharePreferences: userProfile.sharePreferences
    });
    
    console.log('✅ Profil synchronisé avec Firebase');
}

// ===== LISTENERS TEMPS RÉEL =====

function startRealtimeListeners(userId) {
    console.log('👂 Démarrage des listeners temps réel...');
    
    // Écouter les amis
    const unsubFriends = listenToFriends(userId, (friends) => {
        console.log('🔄 Amis mis à jour:', friends.length);
        updateFriendsFromFirebase(friends);
    });
    unsubscribeFunctions.push(unsubFriends);
    
    // Écouter les demandes d'amis
    const unsubRequests = listenToFriendRequests(userId, (requests) => {
        console.log('🔄 Demandes mises à jour:', requests.length);
        updateRequestsFromFirebase(requests);
    });
    unsubscribeFunctions.push(unsubRequests);
    
    // Écouter les partages
    const unsubShared = listenToSharedEntries(userId, (entries) => {
        console.log('🔄 Partages mis à jour:', entries.length);
        updateSharedEntriesFromFirebase(entries);
    });
    unsubscribeFunctions.push(unsubShared);
}

function stopRealtimeListeners() {
    console.log('🛑 Arrêt des listeners temps réel...');
    unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    unsubscribeFunctions = [];
}

// ===== MISE À JOUR DE L'INTERFACE =====

function updateFriendsFromFirebase(firebaseFriends) {
    // Convertir le format Firebase vers le format local
    friendsManager.friends = firebaseFriends.map(f => new Friend({
        id: f.id,
        username: f.username,
        avatar: f.avatar,
        friendCode: f.friendCode,
        addedAt: f.addedAt,
        isFavorite: f.isFavorite || false,
        status: 'online' // Toujours online en temps réel
    }));
    
    // Mettre à jour l'affichage
    updateFriendsDisplay();
    updateStats();
}

function updateRequestsFromFirebase(firebaseRequests) {
    // Convertir le format
    friendsManager.friendRequests = firebaseRequests.map(r => new FriendRequest({
        id: r.id,
        fromUserId: r.fromUserId,
        fromUsername: r.fromUsername,
        fromAvatar: r.fromAvatar,
        status: r.status,
        createdAt: r.createdAt
    }));
    
    // Mettre à jour l'affichage
    updateRequestsDisplay();
}

function updateSharedEntriesFromFirebase(firebaseEntries) {
    // Afficher une notification s'il y a de nouvelles entrées
    const newEntries = firebaseEntries.filter(entry => {
        const entryTime = new Date(entry.sharedAt).getTime();
        const fiveSecondsAgo = Date.now() - 5000;
        return entryTime > fiveSecondsAgo;
    });
    
    if (newEntries.length > 0) {
        const entry = newEntries[0];
        const config = getEmotionConfig(entry.emotion);
        showNotification(
            `${config.icon} ${entry.fromUsername} a partagé une émotion : ${entry.emotion}`,
            'info'
        );
    }
}

// ===== SURCHARGE DES FONCTIONS EXISTANTES =====

// Sauvegarder le profil
const originalSaveProfile = window.saveProfile;
window.saveProfile = async function() {
    // Appeler la fonction originale
    if (originalSaveProfile) {
        originalSaveProfile();
    }
    
    // Synchroniser avec Firebase si connecté
    if (firebaseInitialized && getCurrentUser()) {
        await syncLocalToFirebase();
        showNotification('✅ Profil sauvegardé localement et sur Firebase !', 'success');
    }
};

// Envoyer une demande d'ami
const originalSendFriendRequest = window.sendFriendRequest;
window.sendFriendRequest = async function() {
    const code = friendsElements.friendCodeInput.value.trim().toUpperCase();
    
    if (code.length !== 8) {
        showNotification('Le code ami doit contenir 8 caractères', 'error');
        return;
    }
    
    // Si Firebase est actif, utiliser Firebase
    if (firebaseInitialized && getCurrentUser()) {
        const result = await sendFriendRequestFirebase(getCurrentUser().uid, code);
        
        if (result.success) {
            showNotification(result.message, 'success');
            friendsElements.friendCodeInput.value = '';
        } else {
            showNotification(result.message, 'error');
        }
    } else {
        // Sinon, mode local
        if (originalSendFriendRequest) {
            originalSendFriendRequest();
        }
    }
};

// Accepter une demande
window.acceptRequest = async function(requestId) {
    if (firebaseInitialized && getCurrentUser()) {
        const result = await acceptFriendRequestFirebase(getCurrentUser().uid, requestId);
        if (result.success) {
            showNotification(result.message, 'success');
        }
    } else {
        // Mode local
        const result = friendsManager.acceptFriendRequest(requestId, userProfile);
        if (result.success) {
            updateFriendsDisplay();
            updateRequestsDisplay();
            updateStats();
            showNotification(result.message, 'success');
        }
    }
};

// Refuser une demande
window.rejectRequest = async function(requestId) {
    if (firebaseInitialized && getCurrentUser()) {
        await rejectFriendRequestFirebase(getCurrentUser().uid, requestId);
        showNotification('Demande refusée', 'info');
    } else {
        friendsManager.rejectFriendRequest(requestId);
        updateRequestsDisplay();
        showNotification('Demande refusée', 'info');
    }
};

// Supprimer un ami
window.removeFriend = async function(friendId) {
    const friend = friendsManager.getFriend(friendId);
    if (!friend) return;
    
    if (confirm(`Supprimer ${friend.username} de tes amis ?`)) {
        if (firebaseInitialized && getCurrentUser()) {
            await removeFriendFirebase(getCurrentUser().uid, friendId);
            closeFriendDetailsModal();
            showNotification('Ami supprimé', 'info');
        } else {
            friendsManager.removeFriend(friendId);
            updateFriendsDisplay();
            updateStats();
            closeFriendDetailsModal();
            showNotification('Ami supprimé', 'info');
        }
    }
};

// Toggle favori
window.toggleFavoriteFriend = async function(friendId) {
    if (firebaseInitialized && getCurrentUser()) {
        await toggleFriendFavoriteFirebase(getCurrentUser().uid, friendId);
        showNotification('Favori mis à jour', 'success');
        // Le listener temps réel mettra à jour l'interface
    } else {
        friendsManager.toggleFavorite(friendId);
        updateFriendsDisplay();
        updateStats();
        openFriendDetails(friendId);
        showNotification('Favori mis à jour', 'success');
    }
};

// Partager une analyse
window.confirmShare = async function() {
    const selectedFriends = Array.from(
        document.querySelectorAll('input[name="shareFriends"]:checked')
    ).map(cb => cb.value);
    
    if (selectedFriends.length === 0) {
        showNotification('Sélectionne au moins un ami', 'error');
        return;
    }
    
    const shareLevel = document.querySelector('input[name="shareLevel"]:checked').value;
    
    // Créer l'entrée à partager
    const entry = {
        id: Date.now(),
        emotion: currentAnalysis.dominant,
        intensity: currentAnalysis.intensity,
        text: elements.emotionText.value,
        percentages: currentAnalysis.percentages
    };
    
    if (firebaseInitialized && getCurrentUser()) {
        // Partage via Firebase
        const result = await shareEntryFirebase(getCurrentUser().uid, entry, selectedFriends, shareLevel);
        
        if (result.success) {
            closeShareModal();
            showNotification(`✅ Partagé avec ${selectedFriends.length} ami(s) via Firebase !`, 'success');
        } else {
            showNotification('Erreur lors du partage', 'error');
        }
    } else {
        // Mode local
        friendsManager.shareEntry(userProfile, entry, selectedFriends, shareLevel);
        closeShareModal();
        showNotification(`✅ Partagé avec ${selectedFriends.length} ami(s) !`, 'success');
    }
};

// ===== INTERFACE FIREBASE =====

function showFirebaseStatus(connected) {
    // Ajouter un indicateur dans le header
    let indicator = document.getElementById('firebaseIndicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'firebaseIndicator';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;
        document.body.appendChild(indicator);
    }
    
    if (connected) {
        indicator.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        indicator.style.color = 'white';
        indicator.innerHTML = '🔥 <span>Mode temps réel actif</span>';
        
        // Masquer après 3 secondes
        setTimeout(() => {
            indicator.style.opacity = '0';
            indicator.style.transition = 'opacity 0.5s ease';
        }, 3000);
    } else {
        indicator.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
        indicator.style.color = 'white';
        indicator.innerHTML = '📴 <span>Mode local</span>';
        
        setTimeout(() => {
            indicator.style.opacity = '0';
            indicator.style.transition = 'opacity 0.5s ease';
        }, 3000);
    }
    
    indicator.style.opacity = '1';
}

function updateUIForFirebaseMode(isFirebase) {
    // Mettre à jour l'interface selon le mode
    const demoSection = document.querySelector('.demo-section');
    
    if (demoSection) {
        if (isFirebase) {
            demoSection.style.display = 'none';
        } else {
            demoSection.style.display = 'block';
        }
    }
}

// ===== UTILITAIRES =====

// Obtenir le statut Firebase
function getFirebaseStatus() {
    return {
        initialized: firebaseInitialized,
        connected: getCurrentUser() !== null,
        userId: getCurrentUser()?.uid || null
    };
}

// Exporter pour debugging
window.getFirebaseStatus = getFirebaseStatus;
window.firebaseDebug = {
    getCurrentUser,
    isFirebaseReady,
    loadUserProfile,
    saveUserProfile
};

console.log('🔥 Intégration Firebase chargée');


