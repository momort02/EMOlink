/**
 * EMOlink - Configuration Firebase
 * Gestion de l'authentification et de la base de données temps réel
 */

// ===== CONFIGURATION FIREBASE =====
// ⚠️ IMPORTANT : Remplace ces valeurs par celles de TON projet Firebase
// Pour obtenir ces valeurs :
// 1. Va sur https://console.firebase.google.com/
// 2. Crée un nouveau projet "EMOlink"
// 3. Ajoute une application Web
// 4. Copie la configuration ici

const firebaseConfig = {
    apiKey: "AIzaSyC_8i7MB0EF7m1zrgKALxWHp-_HuAORKw0",
    authDomain: "emolink-3524b.firebaseapp.com",
    databaseURL: "https://emolink-3524b-default-rtdb.firebaseio.com",
    projectId: "emolink-3524b",
    storageBucket: "emolink-3524b.firebasestorage.app",
    messagingSenderId: "475088610114",
    appId: "1:475088610114:web:ccfa6c4e7c045b26c75edb",
    measurementId: "G-0J8KFBMXK9"
  };

// ===== EXEMPLE DE CONFIGURATION (À REMPLACER) =====
// const firebaseConfig = {
//     apiKey: "AIzaSyB1234567890abcdefghijklmnopqrs",
//     authDomain: "emolink-app.firebaseapp.com",
//     databaseURL: "https://emolink-app-default-rtdb.firebaseio.com",
//     projectId: "emolink-app",
//     storageBucket: "emolink-app.appspot.com",
//     messagingSenderId: "123456789012",
//     appId: "1:123456789012:web:abcdef1234567890"
// };

// ===== INITIALISATION =====
let app;
let auth;
let database;
let currentUser = null;

function initializeFirebase() {
    try {
        // Vérifier que Firebase est chargé
        if (typeof firebase === 'undefined') {
            console.error('Firebase SDK non chargé. Vérifiez les scripts dans index.html');
            return false;
        }

        // Initialiser Firebase
        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        database = firebase.database();

        console.log('✅ Firebase initialisé avec succès');
        
        // Écouter les changements d'authentification
        auth.onAuthStateChanged(handleAuthStateChange);
        
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de Firebase:', error);
        showNotification('Erreur de connexion à Firebase', 'error');
        return false;
    }
}

// ===== GESTION DE L'AUTHENTIFICATION =====
function handleAuthStateChange(user) {
    if (user) {
        // Utilisateur connecté
        currentUser = user;
        console.log('👤 Utilisateur connecté:', user.uid);
        onUserSignedIn(user);
    } else {
        // Utilisateur déconnecté
        currentUser = null;
        console.log('👤 Utilisateur déconnecté');
        onUserSignedOut();
    }
}

// Connexion anonyme (par défaut)
async function signInAnonymously() {
    try {
        const result = await auth.signInAnonymously();
        console.log('✅ Connexion anonyme réussie');
        return result.user;
    } catch (error) {
        console.error('❌ Erreur de connexion anonyme:', error);
        showNotification('Erreur de connexion', 'error');
        return null;
    }
}

// Connexion avec email/mot de passe
async function signInWithEmail(email, password) {
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        showNotification('Connexion réussie !', 'success');
        return result.user;
    } catch (error) {
        console.error('❌ Erreur de connexion:', error);
        let message = 'Erreur de connexion';
        if (error.code === 'auth/user-not-found') {
            message = 'Utilisateur non trouvé';
        } else if (error.code === 'auth/wrong-password') {
            message = 'Mot de passe incorrect';
        }
        showNotification(message, 'error');
        return null;
    }
}

// Inscription avec email/mot de passe
async function signUpWithEmail(email, password) {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        showNotification('Compte créé avec succès !', 'success');
        return result.user;
    } catch (error) {
        console.error('❌ Erreur lors de l\'inscription:', error);
        let message = 'Erreur lors de l\'inscription';
        if (error.code === 'auth/email-already-in-use') {
            message = 'Cet email est déjà utilisé';
        } else if (error.code === 'auth/weak-password') {
            message = 'Le mot de passe doit contenir au moins 6 caractères';
        }
        showNotification(message, 'error');
        return null;
    }
}

// Déconnexion
async function signOut() {
    try {
        await auth.signOut();
        showNotification('Déconnecté', 'info');
    } catch (error) {
        console.error('❌ Erreur de déconnexion:', error);
    }
}

// ===== GESTION DE LA BASE DE DONNÉES =====

// Références de base de données
const DB_REFS = {
    users: () => database.ref('users'),
    user: (userId) => database.ref(`users/${userId}`),
    friends: (userId) => database.ref(`users/${userId}/friends`),
    friendRequests: (userId) => database.ref(`users/${userId}/friendRequests`),
    sharedEntries: (userId) => database.ref(`users/${userId}/sharedEntries`),
    userCodes: () => database.ref('userCodes') // Mapping code -> userId
};

// ===== OPÉRATIONS UTILISATEUR =====

// Créer/Mettre à jour le profil utilisateur
async function saveUserProfile(userId, profileData) {
    try {
        await DB_REFS.user(userId).update({
            profile: {
                username: profileData.username,
                avatar: profileData.avatar,
                photoURL: profileData.photoURL || null,
                friendCode: profileData.friendCode,
                createdAt: profileData.createdAt || firebase.database.ServerValue.TIMESTAMP,
                lastActive: firebase.database.ServerValue.TIMESTAMP
            },
            sharePreferences: profileData.sharePreferences || {
                autoShare: false,
                shareLevel: 'emotion-only'
            }
        });

        // Sauvegarder le mapping code -> userId
        await database.ref(`userCodes/${profileData.friendCode}`).set(userId);

        console.log('✅ Profil sauvegardé dans Firebase');
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de la sauvegarde du profil:', error);
        return false;
    }
}

// Charger le profil utilisateur
async function loadUserProfile(userId) {
    try {
        const snapshot = await DB_REFS.user(userId).once('value');
        return snapshot.val();
    } catch (error) {
        console.error('❌ Erreur lors du chargement du profil:', error);
        return null;
    }
}

// Obtenir l'ID utilisateur par code ami
async function getUserIdByFriendCode(friendCode) {
    try {
        const snapshot = await database.ref(`userCodes/${friendCode}`).once('value');
        return snapshot.val();
    } catch (error) {
        console.error('❌ Erreur lors de la recherche du code ami:', error);
        return null;
    }
}

// ===== OPÉRATIONS AMIS =====

// Envoyer une demande d'ami
async function sendFriendRequestFirebase(fromUserId, toFriendCode) {
    try {
        // Trouver l'utilisateur cible
        const toUserId = await getUserIdByFriendCode(toFriendCode);
        
        if (!toUserId) {
            return { success: false, message: 'Code ami introuvable' };
        }

        if (toUserId === fromUserId) {
            return { success: false, message: 'Tu ne peux pas t\'ajouter toi-même !' };
        }

        // Vérifier si déjà ami
        const friendsSnapshot = await DB_REFS.friends(fromUserId).once('value');
        const friends = friendsSnapshot.val() || {};
        if (friends[toUserId]) {
            return { success: false, message: 'Déjà ami avec cette personne' };
        }

        // Charger les profils
        const fromProfile = await loadUserProfile(fromUserId);
        const toProfile = await loadUserProfile(toUserId);

        // Vérifier que les profils existent
        if (!fromProfile || !fromProfile.profile) {
            return { success: false, message: 'Votre profil n\'existe pas. Veuillez rafraîchir la page.' };
        }
        if (!toProfile || !toProfile.profile) {
            return { success: false, message: 'Le profil de cet utilisateur n\'existe pas.' };
        }

        // Créer la demande
        const requestId = database.ref().push().key;
        const requestData = {
            id: requestId,
            fromUserId: fromUserId,
            fromUsername: fromProfile.profile.username,
            fromAvatar: fromProfile.profile.avatar,
            fromPhotoURL: fromProfile.profile.photoURL || null,
            toUserId: toUserId,
            status: 'pending',
            createdAt: firebase.database.ServerValue.TIMESTAMP
        };

        // Sauvegarder la demande chez le destinataire
        await database.ref(`users/${toUserId}/friendRequests/${requestId}`).set(requestData);

        return { success: true, message: 'Demande envoyée !' };
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de la demande:', error);
        return { success: false, message: 'Erreur lors de l\'envoi' };
    }
}

// Accepter une demande d'ami
async function acceptFriendRequestFirebase(userId, requestId) {
    try {
        // Charger la demande
        const requestSnapshot = await database.ref(`users/${userId}/friendRequests/${requestId}`).once('value');
        const request = requestSnapshot.val();

        if (!request) {
            return { success: false, message: 'Demande introuvable' };
        }

        const friendId = request.fromUserId;

        // Charger les profils
        const userProfile = await loadUserProfile(userId);
        const friendProfile = await loadUserProfile(friendId);

        // Vérifier que les profils existent
        if (!userProfile || !userProfile.profile) {
            return { success: false, message: 'Votre profil n\'existe pas.' };
        }
        if (!friendProfile || !friendProfile.profile) {
            return { success: false, message: 'Le profil de votre ami n\'existe pas.' };
        }

        // Créer la relation d'amitié (bidirectionnelle)
        const updates = {};
        
        // Ajouter l'ami chez l'utilisateur
        updates[`users/${userId}/friends/${friendId}`] = {
            id: friendId,
            username: friendProfile.profile.username,
            avatar: friendProfile.profile.avatar,
            photoURL: friendProfile.profile.photoURL || null,
            friendCode: friendProfile.profile.friendCode,
            addedAt: firebase.database.ServerValue.TIMESTAMP,
            isFavorite: false
        };

        // Ajouter l'utilisateur chez l'ami
        updates[`users/${friendId}/friends/${userId}`] = {
            id: userId,
            username: userProfile.profile.username,
            avatar: userProfile.profile.avatar,
            photoURL: userProfile.profile.photoURL || null,
            friendCode: userProfile.profile.friendCode,
            addedAt: firebase.database.ServerValue.TIMESTAMP,
            isFavorite: false
        };

        // Marquer la demande comme acceptée
        updates[`users/${userId}/friendRequests/${requestId}/status`] = 'accepted';

        await database.ref().update(updates);

        return { success: true, message: 'Ami ajouté !' };
    } catch (error) {
        console.error('❌ Erreur lors de l\'acceptation:', error);
        return { success: false, message: 'Erreur lors de l\'acceptation' };
    }
}

// Refuser une demande d'ami
async function rejectFriendRequestFirebase(userId, requestId) {
    try {
        await database.ref(`users/${userId}/friendRequests/${requestId}/status`).set('rejected');
        return { success: true };
    } catch (error) {
        console.error('❌ Erreur lors du refus:', error);
        return { success: false };
    }
}

// Supprimer un ami
async function removeFriendFirebase(userId, friendId) {
    try {
        const updates = {};
        updates[`users/${userId}/friends/${friendId}`] = null;
        updates[`users/${friendId}/friends/${userId}`] = null;
        
        await database.ref().update(updates);
        return { success: true };
    } catch (error) {
        console.error('❌ Erreur lors de la suppression:', error);
        return { success: false };
    }
}

// Marquer comme favori
async function toggleFriendFavoriteFirebase(userId, friendId) {
    try {
        const snapshot = await database.ref(`users/${userId}/friends/${friendId}/isFavorite`).once('value');
        const currentValue = snapshot.val() || false;
        
        await database.ref(`users/${userId}/friends/${friendId}/isFavorite`).set(!currentValue);
        return { success: true };
    } catch (error) {
        console.error('❌ Erreur lors du toggle favori:', error);
        return { success: false };
    }
}

// ===== PARTAGE D'ANALYSES =====

// Partager une analyse
async function shareEntryFirebase(userId, entry, friendIds, shareLevel) {
    try {
        const userProfile = await loadUserProfile(userId);
        
        // Vérifier que le profil existe
        if (!userProfile || !userProfile.profile) {
            return { success: false, message: 'Votre profil n\'existe pas.' };
        }
        
        // Préparer les données selon le niveau de partage
        let sharedData = {
            emotion: entry.emotion,
            intensity: entry.intensity,
            sharedAt: firebase.database.ServerValue.TIMESTAMP,
            fromUserId: userId,
            fromUsername: userProfile.profile.username,
            fromAvatar: userProfile.profile.avatar,
            shareLevel: shareLevel
        };

        if (shareLevel === 'summary') {
            sharedData.summary = entry.text.substring(0, 100) + '...';
        } else if (shareLevel === 'full') {
            sharedData.text = entry.text;
            sharedData.percentages = entry.percentages;
        }

        // Partager avec chaque ami
        const updates = {};
        const shareId = database.ref().push().key;

        friendIds.forEach(friendId => {
            updates[`users/${friendId}/sharedEntries/${shareId}`] = sharedData;
        });

        // Mettre à jour l'émotion actuelle de l'utilisateur
        updates[`users/${userId}/profile/currentEmotion`] = {
            emotion: entry.emotion,
            intensity: entry.intensity,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };

        await database.ref().update(updates);

        return { success: true, shareId };
    } catch (error) {
        console.error('❌ Erreur lors du partage:', error);
        return { success: false };
    }
}

// ===== LISTENERS TEMPS RÉEL =====

// Écouter les changements d'amis
function listenToFriends(userId, callback) {
    const ref = DB_REFS.friends(userId);
    ref.on('value', (snapshot) => {
        const friends = snapshot.val() || {};
        callback(Object.values(friends));
    });
    return () => ref.off('value'); // Fonction pour arrêter l'écoute
}

// Écouter les demandes d'amis
function listenToFriendRequests(userId, callback) {
    const ref = DB_REFS.friendRequests(userId);
    ref.on('value', (snapshot) => {
        const requests = snapshot.val() || {};
        callback(Object.values(requests));
    });
    return () => ref.off('value');
}

// Écouter les analyses partagées
function listenToSharedEntries(userId, callback) {
    const ref = DB_REFS.sharedEntries(userId);
    ref.on('value', (snapshot) => {
        const entries = snapshot.val() || {};
        callback(Object.values(entries));
    });
    return () => ref.off('value');
}

// Écouter l'émotion actuelle d'un ami
function listenToFriendEmotion(friendId, callback) {
    const ref = database.ref(`users/${friendId}/profile/currentEmotion`);
    ref.on('value', (snapshot) => {
        callback(snapshot.val());
    });
    return () => ref.off('value');
}

// ===== CALLBACKS =====

// Appelé quand l'utilisateur se connecte
function onUserSignedIn(user) {
    if (typeof window.onFirebaseUserSignedIn === 'function') {
        window.onFirebaseUserSignedIn(user);
    }
}

// Appelé quand l'utilisateur se déconnecte
function onUserSignedOut() {
    if (typeof window.onFirebaseUserSignedOut === 'function') {
        window.onFirebaseUserSignedOut();
    }
}

// ===== UTILITAIRES =====

// Vérifier si Firebase est prêt
function isFirebaseReady() {
    return app && auth && database && currentUser;
}

// Obtenir l'utilisateur actuel
function getCurrentUser() {
    return currentUser;
}

// ===== EXPORT =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeFirebase,
        signInAnonymously,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        saveUserProfile,
        loadUserProfile,
        getUserIdByFriendCode,
        sendFriendRequestFirebase,
        acceptFriendRequestFirebase,
        rejectFriendRequestFirebase,
        removeFriendFirebase,
        toggleFriendFavoriteFirebase,
        shareEntryFirebase,
        listenToFriends,
        listenToFriendRequests,
        listenToSharedEntries,
        listenToFriendEmotion,
        isFirebaseReady,
        getCurrentUser
    };
}
