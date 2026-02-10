/**
 * EMOlink - Système d'amis
 * Gestion des amis, partages et cercle de soutien
 */

// ===== CONFIGURATION =====
const FRIENDS_STORAGE_KEY = 'emolink-friends';
const USER_PROFILE_KEY = 'emolink-user-profile';
const SHARED_ENTRIES_KEY = 'emolink-shared-entries';
const FRIEND_REQUESTS_KEY = 'emolink-friend-requests';

// ===== CLASSE USER PROFILE =====
class UserProfile {
    constructor(data = {}) {
        this.id = data.id || this.generateUniqueId();
        this.username = data.username || '';
        this.friendCode = data.friendCode || this.generateFriendCode();
        this.avatar = data.avatar || this.getDefaultAvatar();
        this.photoURL = data.photoURL || null; // URL base64 de la photo
        this.sharePreferences = data.sharePreferences || {
            autoShare: false,
            shareLevel: 'emotion-only' // 'emotion-only', 'summary', 'full'
        };
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    generateUniqueId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateFriendCode() {
        // Code unique à 8 caractères (facile à partager)
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sans I, O, 0, 1 pour éviter confusion
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    getDefaultAvatar() {
        const emojis = ['😊', '😎', '🤗', '😇', '🥳', '🤓', '😺', '🐶', '🦊', '🐼', '🐨', '🦁'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    save() {
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(this));
    }

    static load() {
        const data = localStorage.getItem(USER_PROFILE_KEY);
        return data ? new UserProfile(JSON.parse(data)) : new UserProfile();
    }
}

// ===== CLASSE FRIEND =====
class Friend {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.friendCode = data.friendCode;
        this.avatar = data.avatar;
        this.photoURL = data.photoURL || null; // URL de la photo de profil
        this.addedAt = data.addedAt || new Date().toISOString();
        this.lastEmotion = data.lastEmotion || null; // Dernière émotion partagée
        this.lastUpdate = data.lastUpdate || null;
        this.status = data.status || 'online'; // 'online', 'offline', 'away'
        this.shareLevel = data.shareLevel || 'emotion-only';
        this.isFavorite = data.isFavorite || false;
    }
}

// ===== CLASSE FRIEND REQUEST =====
class FriendRequest {
    constructor(data) {
        this.id = data.id || 'req_' + Date.now();
        this.fromUserId = data.fromUserId;
        this.fromUsername = data.fromUsername;
        this.fromAvatar = data.fromAvatar;
        this.fromPhotoURL = data.fromPhotoURL || null;
        this.toFriendCode = data.toFriendCode;
        this.status = data.status || 'pending'; // 'pending', 'accepted', 'rejected'
        this.createdAt = data.createdAt || new Date().toISOString();
    }
}

// ===== CLASSE SHARED ENTRY =====
class SharedEntry {
    constructor(data) {
        this.id = data.id || 'share_' + Date.now();
        this.entryId = data.entryId;
        this.fromUserId = data.fromUserId;
        this.toFriendIds = data.toFriendIds || []; // Array d'IDs d'amis
        this.emotion = data.emotion;
        this.intensity = data.intensity;
        this.text = data.text || null; // Null si pas partagé
        this.summary = data.summary || null;
        this.shareLevel = data.shareLevel; // 'emotion-only', 'summary', 'full'
        this.sharedAt = data.sharedAt || new Date().toISOString();
        this.supportMessages = data.supportMessages || []; // Messages de soutien
    }

    addSupportMessage(message) {
        this.supportMessages.push({
            id: 'msg_' + Date.now(),
            fromUserId: message.fromUserId,
            fromUsername: message.fromUsername,
            text: message.text,
            emoji: message.emoji || '💙',
            createdAt: new Date().toISOString()
        });
    }
}

// ===== GESTIONNAIRE D'AMIS =====
class FriendsManager {
    constructor() {
        this.friends = this.loadFriends();
        this.friendRequests = this.loadFriendRequests();
        this.sharedEntries = this.loadSharedEntries();
    }

    // === GESTION DES AMIS ===
    loadFriends() {
        const data = localStorage.getItem(FRIENDS_STORAGE_KEY);
        return data ? JSON.parse(data).map(f => new Friend(f)) : [];
    }

    saveFriends() {
        localStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(this.friends));
    }

    addFriend(friendData) {
        const friend = new Friend(friendData);
        this.friends.push(friend);
        this.saveFriends();
        return friend;
    }

    removeFriend(friendId) {
        this.friends = this.friends.filter(f => f.id !== friendId);
        this.saveFriends();
    }

    getFriend(friendId) {
        return this.friends.find(f => f.id === friendId);
    }

    toggleFavorite(friendId) {
        const friend = this.getFriend(friendId);
        if (friend) {
            friend.isFavorite = !friend.isFavorite;
            this.saveFriends();
        }
    }

    updateFriendEmotion(friendId, emotion, intensity) {
        const friend = this.getFriend(friendId);
        if (friend) {
            friend.lastEmotion = emotion;
            friend.lastUpdate = new Date().toISOString();
            this.saveFriends();
        }
    }

    // === GESTION DES DEMANDES ===
    loadFriendRequests() {
        const data = localStorage.getItem(FRIEND_REQUESTS_KEY);
        return data ? JSON.parse(data).map(r => new FriendRequest(r)) : [];
    }

    saveFriendRequests() {
        localStorage.setItem(FRIEND_REQUESTS_KEY, JSON.stringify(this.friendRequests));
    }

    sendFriendRequest(userProfile, friendCode) {
        // Vérifier si déjà ami
        if (this.friends.some(f => f.friendCode === friendCode)) {
            return { success: false, message: 'Déjà ami avec cette personne' };
        }

        // Vérifier si c'est son propre code
        if (friendCode === userProfile.friendCode) {
            return { success: false, message: 'Tu ne peux pas t\'ajouter toi-même !' };
        }

        const request = new FriendRequest({
            fromUserId: userProfile.id,
            fromUsername: userProfile.username,
            fromAvatar: userProfile.avatar,
            fromPhotoURL: userProfile.photoURL,
            toFriendCode: friendCode
        });

        this.friendRequests.push(request);
        this.saveFriendRequests();

        return { success: true, message: 'Demande envoyée !', request };
    }

    acceptFriendRequest(requestId, userProfile) {
        const request = this.friendRequests.find(r => r.id === requestId);
        if (!request) return { success: false, message: 'Demande introuvable' };

        // Créer l'ami
        const friend = this.addFriend({
            id: request.fromUserId,
            username: request.fromUsername,
            friendCode: 'FRIEND_' + Date.now(), // Code temporaire
            avatar: request.fromAvatar
        });

        // Marquer comme acceptée
        request.status = 'accepted';
        this.saveFriendRequests();

        return { success: true, message: 'Ami ajouté !', friend };
    }

    rejectFriendRequest(requestId) {
        const request = this.friendRequests.find(r => r.id === requestId);
        if (request) {
            request.status = 'rejected';
            this.saveFriendRequests();
        }
    }

    // === GESTION DES PARTAGES ===
    loadSharedEntries() {
        const data = localStorage.getItem(SHARED_ENTRIES_KEY);
        return data ? JSON.parse(data).map(s => new SharedEntry(s)) : [];
    }

    saveSharedEntries() {
        localStorage.setItem(SHARED_ENTRIES_KEY, JSON.stringify(this.sharedEntries));
    }

    shareEntry(userProfile, entry, friendIds, shareLevel = 'emotion-only') {
        let text = null;
        let summary = null;

        if (shareLevel === 'full') {
            text = entry.fullText || entry.text;
        } else if (shareLevel === 'summary') {
            summary = entry.text.substring(0, 100) + '...';
        }

        const sharedEntry = new SharedEntry({
            entryId: entry.id,
            fromUserId: userProfile.id,
            toFriendIds: friendIds,
            emotion: entry.emotion,
            intensity: entry.intensity,
            text: text,
            summary: summary,
            shareLevel: shareLevel
        });

        this.sharedEntries.push(sharedEntry);
        this.saveSharedEntries();

        // Mettre à jour l'émotion de l'utilisateur pour ses amis
        friendIds.forEach(friendId => {
            this.updateFriendEmotion(friendId, entry.emotion, entry.intensity);
        });

        return sharedEntry;
    }

    getSharedEntriesForFriend(friendId) {
        return this.sharedEntries.filter(s => s.toFriendIds.includes(friendId));
    }

    getMySharedEntries(userId) {
        return this.sharedEntries.filter(s => s.fromUserId === userId);
    }

    addSupportMessage(sharedEntryId, userProfile, messageText, emoji = '💙') {
        const entry = this.sharedEntries.find(s => s.id === sharedEntryId);
        if (entry) {
            entry.addSupportMessage({
                fromUserId: userProfile.id,
                fromUsername: userProfile.username,
                text: messageText,
                emoji: emoji
            });
            this.saveSharedEntries();
            return true;
        }
        return false;
    }

    // === STATISTIQUES ===
    getFriendsStats() {
        const total = this.friends.length;
        const favorites = this.friends.filter(f => f.isFavorite).length;
        const withRecentActivity = this.friends.filter(f => {
            if (!f.lastUpdate) return false;
            const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
            return new Date(f.lastUpdate).getTime() > dayAgo;
        }).length;

        return { total, favorites, withRecentActivity };
    }

    getFriendsEmotionalOverview() {
        const emotionCounts = {};
        this.friends.forEach(friend => {
            if (friend.lastEmotion) {
                emotionCounts[friend.lastEmotion] = (emotionCounts[friend.lastEmotion] || 0) + 1;
            }
        });
        return emotionCounts;
    }

    getFriendsNeedingSupport() {
        // Amis avec émotions négatives récentes
        const negativeEmotions = ['tristesse', 'colère', 'peur', 'stress', 'dégoût'];
        return this.friends.filter(f => {
            if (!f.lastEmotion || !f.lastUpdate) return false;
            const isRecent = (Date.now() - new Date(f.lastUpdate).getTime()) < 24 * 60 * 60 * 1000;
            return isRecent && negativeEmotions.includes(f.lastEmotion);
        });
    }
}

// ===== UTILITAIRES =====
function generateMockFriends(count = 5) {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
    const emotions = ['joie', 'tristesse', 'neutre', 'stress', 'amour'];
    const avatars = ['😊', '😎', '🤗', '😇', '🥳', '🤓', '😺', '🐶'];
    
    const friends = [];
    for (let i = 0; i < count; i++) {
        friends.push(new Friend({
            id: 'friend_' + i,
            username: names[i % names.length],
            friendCode: 'CODE' + i.toString().padStart(4, '0'),
            avatar: avatars[i % avatars.length],
            lastEmotion: emotions[Math.floor(Math.random() * emotions.length)],
            lastUpdate: new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000).toISOString()
        }));
    }
    return friends;
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UserProfile, Friend, FriendRequest, SharedEntry, FriendsManager, generateMockFriends };
}
