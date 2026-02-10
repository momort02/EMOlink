/**
 * EMOlink - Interface utilisateur du système d'amis
 */

// ===== VARIABLES GLOBALES =====
let userProfile = null;
let friendsManager = null;
let currentFriendId = null;
let currentShareEntry = null;

// ===== ÉLÉMENTS DOM =====
const friendsElements = {
    // Boutons principaux
    friendsBtn: document.getElementById('friendsBtn'),
    closeFriends: document.getElementById('closeFriends'),
    shareBtn: document.getElementById('shareBtn'),
    
    // Section amis
    friendsSection: document.getElementById('friendsSection'),
    
    // Tabs
    tabs: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Stats
    friendsCount: document.getElementById('friendsCount'),
    favoritesCount: document.getElementById('favoritesCount'),
    activeCount: document.getElementById('activeCount'),
    requestsBadge: document.getElementById('requestsBadge'),
    
    // Liste d'amis
    friendsList: document.getElementById('friendsList'),
    
    // Ajouter un ami
    friendCodeInput: document.getElementById('friendCodeInput'),
    sendRequestBtn: document.getElementById('sendRequestBtn'),
    addDemoFriendsBtn: document.getElementById('addDemoFriendsBtn'),
    
    // Demandes
    requestsList: document.getElementById('requestsList'),
    
    // Profil
    profileAvatar: document.getElementById('profileAvatar'),
    profilePhoto: document.getElementById('profilePhoto'),
    changeAvatarBtn: document.getElementById('changeAvatarBtn'),
    uploadPhotoBtn: document.getElementById('uploadPhotoBtn'),
    removePhotoBtn: document.getElementById('removePhotoBtn'),
    photoInput: document.getElementById('photoInput'),
    editAvatarBtn: document.getElementById('editAvatarBtn'),
    usernameInput: document.getElementById('usernameInput'),
    myFriendCode: document.getElementById('myFriendCode'),
    copyCodeBtn: document.getElementById('copyCodeBtn'),
    autoShareCheckbox: document.getElementById('autoShareCheckbox'),
    shareLevelSelect: document.getElementById('shareLevelSelect'),
    saveProfileBtn: document.getElementById('saveProfileBtn'),
    
    // Modals
    friendDetailsModal: document.getElementById('friendDetailsModal'),
    closeFriendDetails: document.getElementById('closeFriendDetails'),
    friendDetailName: document.getElementById('friendDetailName'),
    friendDetailBody: document.getElementById('friendDetailBody'),
    
    shareModal: document.getElementById('shareModal'),
    closeShareModal: document.getElementById('closeShareModal'),
    shareWithFriends: document.getElementById('shareWithFriends'),
    confirmShareBtn: document.getElementById('confirmShareBtn')
};

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeFriendsSystem();
});

function initializeFriendsSystem() {
    // Charger ou créer le profil utilisateur
    userProfile = UserProfile.load();
    if (!userProfile.username) {
        userProfile.username = 'Utilisateur';
    }
    userProfile.save();
    
    // Initialiser le gestionnaire d'amis
    friendsManager = new FriendsManager();
    
    // Mettre à jour l'interface
    updateProfileDisplay();
    updateFriendsDisplay();
    updateRequestsDisplay();
    updateStats();
    
    // Event listeners
    setupFriendsEventListeners();
}

function setupFriendsEventListeners() {
    // Navigation
    friendsElements.friendsBtn?.addEventListener('click', openFriendsSection);
    friendsElements.closeFriends?.addEventListener('click', closeFriendsSection);
    friendsElements.shareBtn?.addEventListener('click', openShareModal);
    
    // Tabs
    friendsElements.tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    
    // Ajouter un ami
    friendsElements.sendRequestBtn?.addEventListener('click', sendFriendRequest);
    friendsElements.addDemoFriendsBtn?.addEventListener('click', addDemoFriends);
    friendsElements.friendCodeInput?.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });
    
    // Profil
    friendsElements.changeAvatarBtn?.addEventListener('click', changeAvatar);
    friendsElements.uploadPhotoBtn?.addEventListener('click', () => friendsElements.photoInput.click());
    friendsElements.removePhotoBtn?.addEventListener('click', removePhoto);
    friendsElements.photoInput?.addEventListener('change', handlePhotoUpload);
    friendsElements.editAvatarBtn?.addEventListener('click', () => friendsElements.photoInput.click());
    friendsElements.copyCodeBtn?.addEventListener('click', copyFriendCode);
    friendsElements.saveProfileBtn?.addEventListener('click', saveProfile);
    
    // Modals
    friendsElements.closeFriendDetails?.addEventListener('click', closeFriendDetailsModal);
    friendsElements.closeShareModal?.addEventListener('click', closeShareModal);
    friendsElements.confirmShareBtn?.addEventListener('click', confirmShare);
}

// ===== NAVIGATION =====
function openFriendsSection() {
    friendsElements.friendsSection.classList.add('active');
    updateFriendsDisplay();
}

function closeFriendsSection() {
    friendsElements.friendsSection.classList.remove('active');
}

function switchTab(tabName) {
    // Mettre à jour les boutons
    friendsElements.tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Mettre à jour le contenu
    friendsElements.tabContents.forEach(content => {
        if (content.id === `tab-${tabName}`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    // Rafraîchir selon l'onglet
    if (tabName === 'my-friends') updateFriendsDisplay();
    if (tabName === 'requests') updateRequestsDisplay();
    if (tabName === 'profile') updateProfileDisplay();
}

// ===== AFFICHAGE DU PROFIL =====
function updateProfileDisplay() {
    if (!userProfile) return;
    
    // Afficher la photo ou l'avatar
    if (userProfile.photoURL) {
        friendsElements.profilePhoto.src = userProfile.photoURL;
        friendsElements.profilePhoto.style.display = 'block';
        friendsElements.profileAvatar.style.opacity = '0';
        friendsElements.removePhotoBtn.style.display = 'inline-block';
    } else {
        friendsElements.profilePhoto.style.display = 'none';
        friendsElements.profileAvatar.style.opacity = '1';
        friendsElements.profileAvatar.textContent = userProfile.avatar;
        friendsElements.removePhotoBtn.style.display = 'none';
    }
    
    friendsElements.usernameInput.value = userProfile.username;
    friendsElements.myFriendCode.textContent = userProfile.friendCode;
    friendsElements.autoShareCheckbox.checked = userProfile.sharePreferences.autoShare;
    friendsElements.shareLevelSelect.value = userProfile.sharePreferences.shareLevel;
}

function changeAvatar() {
    const emojis = ['😊', '😎', '🤗', '😇', '🥳', '🤓', '😺', '🐶', '🦊', '🐼', '🐨', '🦁', '🐯', '🐸', '🐷', '🐮'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    userProfile.avatar = randomEmoji;
    userProfile.save();
    updateProfileDisplay();
    showNotification('Avatar changé ! ' + randomEmoji, 'success');
}

// ===== GESTION DES PHOTOS =====

/**
 * Gérer l'upload de photo
 */
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Vérifier que c'est bien une image
    if (!file.type.startsWith('image/')) {
        showNotification('Veuillez sélectionner une image', 'error');
        return;
    }
    
    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showNotification('L\'image est trop grande (max 5MB)', 'error');
        return;
    }
    
    // Afficher un loader
    showNotification('Chargement de l\'image...', 'info');
    
    // Lire le fichier
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        
        img.onload = function() {
            // Redimensionner l'image pour optimiser la taille
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Taille max : 400x400
            const maxDim = 400;
            let width = img.width;
            let height = img.height;
            
            if (width > height) {
                if (width > maxDim) {
                    height *= maxDim / width;
                    width = maxDim;
                }
            } else {
                if (height > maxDim) {
                    width *= maxDim / height;
                    height = maxDim;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Dessiner l'image redimensionnée
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convertir en base64 (JPEG pour compression)
            const photoURL = canvas.toDataURL('image/jpeg', 0.85);
            
            // Vérifier la taille finale
            const sizeInKB = Math.round((photoURL.length * 3) / 4 / 1024);
            
            if (sizeInKB > 500) {
                showNotification('Image trop grande après compression (max 500KB)', 'error');
                return;
            }
            
            // Sauvegarder
            userProfile.photoURL = photoURL;
            userProfile.save();
            
            // Mettre à jour l'affichage
            updateProfileDisplay();
            
            // Synchroniser avec Firebase si connecté
            if (firebaseInitialized && getCurrentUser) {
                syncLocalToFirebase();
            }
            
            showNotification('✅ Photo de profil mise à jour !', 'success');
        };
        
        img.onerror = function() {
            showNotification('Erreur lors du chargement de l\'image', 'error');
        };
        
        img.src = e.target.result;
    };
    
    reader.onerror = function() {
        showNotification('Erreur lors de la lecture du fichier', 'error');
    };
    
    reader.readAsDataURL(file);
    
    // Réinitialiser l'input
    event.target.value = '';
}

/**
 * Supprimer la photo de profil
 */
function removePhoto() {
    if (confirm('Supprimer ta photo de profil ?')) {
        userProfile.photoURL = null;
        userProfile.save();
        updateProfileDisplay();
        
        // Synchroniser avec Firebase si connecté
        if (firebaseInitialized && getCurrentUser) {
            syncLocalToFirebase();
        }
        
        showNotification('Photo supprimée', 'info');
    }
}

function copyFriendCode() {
    const code = userProfile.friendCode;
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Code copié : ' + code, 'success');
        friendsElements.copyCodeBtn.textContent = '✅';
        setTimeout(() => {
            friendsElements.copyCodeBtn.textContent = '📋';
        }, 2000);
    });
}

function saveProfile() {
    const newUsername = friendsElements.usernameInput.value.trim();
    if (newUsername.length < 2) {
        showNotification('Le nom doit contenir au moins 2 caractères', 'error');
        return;
    }
    
    userProfile.username = newUsername;
    userProfile.sharePreferences.autoShare = friendsElements.autoShareCheckbox.checked;
    userProfile.sharePreferences.shareLevel = friendsElements.shareLevelSelect.value;
    userProfile.save();
    
    showNotification('✅ Profil sauvegardé !', 'success');
}

// ===== AFFICHAGE DES AMIS =====
function updateFriendsDisplay() {
    if (friendsManager.friends.length === 0) {
        friendsElements.friendsList.innerHTML = `
            <div class="empty-friends">
                <span class="empty-icon">👥</span>
                <p>Tu n'as pas encore d'amis</p>
                <p class="empty-subtitle">Ajoute des amis pour partager tes émotions !</p>
            </div>
        `;
        return;
    }
    
    // Trier : favoris d'abord, puis par activité récente
    const sortedFriends = [...friendsManager.friends].sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        if (a.lastUpdate && b.lastUpdate) {
            return new Date(b.lastUpdate) - new Date(a.lastUpdate);
        }
        return 0;
    });
    
    friendsElements.friendsList.innerHTML = sortedFriends.map(friend => {
        const config = friend.lastEmotion ? getEmotionConfig(friend.lastEmotion) : null;
        const timeAgo = friend.lastUpdate ? getTimeAgo(new Date(friend.lastUpdate)) : 'Jamais actif';
        
        // Afficher la photo ou l'avatar
        const avatarDisplay = friend.photoURL 
            ? `<img src="${friend.photoURL}" alt="${friend.username}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` 
            : friend.avatar;
        
        return `
            <div class="friend-item" onclick="openFriendDetails('${friend.id}')">
                <div class="friend-avatar">
                    ${avatarDisplay}
                    <div class="friend-status ${friend.status}"></div>
                </div>
                <div class="friend-info">
                    <div class="friend-name">${friend.username}</div>
                    ${config ? `
                        <div class="friend-emotion">
                            ${config.icon} ${friend.lastEmotion}
                        </div>
                    ` : '<div class="friend-emotion">Pas encore d\'activité</div>'}
                    <div class="friend-time">${timeAgo}</div>
                </div>
                ${friend.isFavorite ? '<span class="friend-favorite">⭐</span>' : ''}
            </div>
        `;
    }).join('');
}

function openFriendDetails(friendId) {
    currentFriendId = friendId;
    const friend = friendsManager.getFriend(friendId);
    if (!friend) return;
    
    const config = friend.lastEmotion ? getEmotionConfig(friend.lastEmotion) : null;
    
    // Afficher la photo ou l'avatar
    const avatarDisplay = friend.photoURL 
        ? `<img src="${friend.photoURL}" alt="${friend.username}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid var(--accent);">` 
        : `<div style="font-size: 4rem;">${friend.avatar}</div>`;
    
    friendsElements.friendDetailName.textContent = friend.username;
    friendsElements.friendDetailBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            ${avatarDisplay}
            <h3 style="margin-top: 1rem;">${friend.username}</h3>
            ${config ? `
                <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                    <div style="font-size: 2rem;">${config.icon}</div>
                    <div style="font-weight: 600; margin-top: 0.5rem;">${friend.lastEmotion}</div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">
                        ${getTimeAgo(new Date(friend.lastUpdate))}
                    </div>
                </div>
            ` : '<p style="color: var(--text-secondary);">Pas encore d\'activité récente</p>'}
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-direction: column;">
            <button class="btn-secondary" onclick="toggleFavoriteFriend('${friend.id}')">
                ${friend.isFavorite ? '⭐ Retirer des favoris' : '⭐ Ajouter aux favoris'}
            </button>
            <button class="btn-secondary" onclick="sendSupportMessage('${friend.id}')">
                💙 Envoyer un message de soutien
            </button>
            <button class="btn-danger" onclick="removeFriend('${friend.id}')">
                🗑️ Supprimer cet ami
            </button>
        </div>
    `;
    
    friendsElements.friendDetailsModal.classList.add('active');
}

function closeFriendDetailsModal() {
    friendsElements.friendDetailsModal.classList.remove('active');
}

function toggleFavoriteFriend(friendId) {
    friendsManager.toggleFavorite(friendId);
    updateFriendsDisplay();
    updateStats();
    openFriendDetails(friendId); // Rafraîchir le modal
    showNotification('Favori mis à jour', 'success');
}

function sendSupportMessage(friendId) {
    const friend = friendsManager.getFriend(friendId);
    if (!friend) return;
    
    const messages = [
        'Je pense à toi 💙',
        'Courage, tu n\'es pas seul(e) !',
        'Je suis là si tu as besoin de parler',
        'Prends soin de toi ❤️',
        'Je t\'envoie plein d\'ondes positives ✨'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(`Message envoyé à ${friend.username} : "${randomMessage}"`, 'success');
    closeFriendDetailsModal();
}

function removeFriend(friendId) {
    const friend = friendsManager.getFriend(friendId);
    if (!friend) return;
    
    if (confirm(`Supprimer ${friend.username} de tes amis ?`)) {
        friendsManager.removeFriend(friendId);
        updateFriendsDisplay();
        updateStats();
        closeFriendDetailsModal();
        showNotification('Ami supprimé', 'info');
    }
}

// ===== DEMANDES D'AMIS =====
function sendFriendRequest() {
    const code = friendsElements.friendCodeInput.value.trim().toUpperCase();
    
    if (code.length !== 8) {
        showNotification('Le code ami doit contenir 8 caractères', 'error');
        return;
    }
    
    const result = friendsManager.sendFriendRequest(userProfile, code);
    
    if (result.success) {
        showNotification(result.message, 'success');
        friendsElements.friendCodeInput.value = '';
    } else {
        showNotification(result.message, 'error');
    }
}

function addDemoFriends() {
    if (confirm('Ajouter 5 amis de démonstration ?')) {
        const demoFriends = generateMockFriends(5);
        demoFriends.forEach(friend => {
            friendsManager.friends.push(friend);
        });
        friendsManager.saveFriends();
        
        updateFriendsDisplay();
        updateStats();
        switchTab('my-friends');
        showNotification('5 amis de démo ajoutés !', 'success');
    }
}

function updateRequestsDisplay() {
    const pendingRequests = friendsManager.friendRequests.filter(r => r.status === 'pending');
    
    friendsElements.requestsBadge.textContent = pendingRequests.length;
    
    if (pendingRequests.length === 0) {
        friendsElements.requestsList.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📭</span>
                <p>Aucune demande en attente</p>
            </div>
        `;
        return;
    }
    
    friendsElements.requestsList.innerHTML = pendingRequests.map(request => {
        // Afficher la photo ou l'avatar
        const avatarDisplay = request.fromPhotoURL 
            ? `<img src="${request.fromPhotoURL}" alt="${request.fromUsername}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` 
            : request.fromAvatar;
        
        return `
        <div class="request-item">
            <div class="request-avatar">${avatarDisplay}</div>
            <div class="request-info">
                <div style="font-weight: 600;">${request.fromUsername}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">
                    ${getTimeAgo(new Date(request.createdAt))}
                </div>
            </div>
            <div class="request-actions">
                <button class="btn-accept" onclick="acceptRequest('${request.id}')">✓</button>
                <button class="btn-reject" onclick="rejectRequest('${request.id}')">✕</button>
            </div>
        </div>
    `;
    }).join('');
}

function acceptRequest(requestId) {
    const result = friendsManager.acceptFriendRequest(requestId, userProfile);
    if (result.success) {
        updateFriendsDisplay();
        updateRequestsDisplay();
        updateStats();
        showNotification(result.message, 'success');
    }
}

function rejectRequest(requestId) {
    friendsManager.rejectFriendRequest(requestId);
    updateRequestsDisplay();
    showNotification('Demande refusée', 'info');
}

// ===== PARTAGE =====
function openShareModal() {
    if (!currentAnalysis) {
        showNotification('Aucune analyse à partager', 'error');
        return;
    }
    
    if (friendsManager.friends.length === 0) {
        showNotification('Tu n\'as pas encore d\'amis à qui partager', 'info');
        openFriendsSection();
        switchTab('add-friend');
        return;
    }
    
    // Générer la liste des amis
    friendsElements.shareWithFriends.innerHTML = friendsManager.friends.map(friend => `
        <label class="friend-checkbox-item">
            <input type="checkbox" name="shareFriends" value="${friend.id}">
            <span>${friend.avatar}</span>
            <span>${friend.username}</span>
        </label>
    `).join('');
    
    friendsElements.shareModal.classList.add('active');
}

function closeShareModal() {
    friendsElements.shareModal.classList.remove('active');
}

function confirmShare() {
    const selectedFriends = Array.from(
        document.querySelectorAll('input[name="shareFriends"]:checked')
    ).map(cb => cb.value);
    
    if (selectedFriends.length === 0) {
        showNotification('Sélectionne au moins un ami', 'error');
        return;
    }
    
    const shareLevel = document.querySelector('input[name="shareLevel"]:checked').value;
    
    // Créer l'entrée à partager depuis currentAnalysis
    const entry = {
        id: Date.now(),
        emotion: currentAnalysis.dominant,
        intensity: currentAnalysis.intensity,
        text: elements.emotionText.value,
        fullText: elements.emotionText.value
    };
    
    friendsManager.shareEntry(userProfile, entry, selectedFriends, shareLevel);
    
    closeShareModal();
    showNotification(`✅ Partagé avec ${selectedFriends.length} ami(s) !`, 'success');
}

// ===== STATISTIQUES =====
function updateStats() {
    const stats = friendsManager.getFriendsStats();
    friendsElements.friendsCount.textContent = stats.total;
    friendsElements.favoritesCount.textContent = stats.favorites;
    friendsElements.activeCount.textContent = stats.withRecentActivity;
}

// ===== UTILITAIRES =====
function getTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    return date.toLocaleDateString('fr-FR');
}

// Rendre les fonctions globales pour onclick
window.openFriendDetails = openFriendDetails;
window.toggleFavoriteFriend = toggleFavoriteFriend;
window.sendSupportMessage = sendSupportMessage;
window.removeFriend = removeFriend;
window.acceptRequest = acceptRequest;
window.rejectRequest = rejectRequest;
