# 🔥 Configuration Firebase - Guide Complet

## 🔴 Erreur Actuelle

```
Error: PERMISSION_DENIED: Permission denied at /users/{userId}
```

Le Firebase Realtime Database bloque l'accès car les **règles de sécurité** ne sont pas configurées.

---

## ✅ Solution : Configurer les Règles de Sécurité

### Étape 1 : Accéder à la Console Firebase

1. Aller sur https://console.firebase.google.com/
2. Sélectionner le projet **emolink-3524b**
3. Aller dans **Realtime Database** (dans le menu de gauche)

### Étape 2 : Modifier les Règles de Sécurité

Dans l'onglet **Rules**, remplacer le contenu par :

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        "profile": {
          ".read": true,
          "friendCode": {
            ".read": true
          }
        },
        "friends": {
          ".read": "$uid === auth.uid",
          ".write": "$uid === auth.uid"
        },
        "friendRequests": {
          ".read": "$uid === auth.uid",
          ".write": true
        },
        "sharedEntries": {
          ".read": "$uid === auth.uid",
          ".write": true
        }
      }
    },
    "userCodes": {
      ".read": true,
      ".write": false,
      "$code": {
        ".write": "root.child('users').child(data.val()).child('profile').child('friendCode').val() === $code"
      }
    }
  }
}
```

### Étape 3 : Publier les Règles

Cliquer sur le bouton **"Publier"** en bas à droite.

---

## 📋 Explication des Règles

| Chemin | Règle | Raison |
|--------|-------|--------|
| `/users/{uid}` | Lecture/Écriture si `uid === auth.uid` | Chaque utilisateur ne peut voir/modifier que ses propres données |
| `/users/{uid}/profile/friendCode` | Lecture publique | Les autres utilisateurs doivent pouvoir voir le code ami pour ajouter quelqu'un |
| `/users/{uid}/friends` | Privé | Chaque utilisateur gère sa propre liste d'amis |
| `/users/{uid}/friendRequests` | Lecture privée, Écriture publique | Tout le monde peut envoyer une demande, mais seul le destinataire peut voir |
| `/userCodes` | Lecture publique | Permet de chercher un utilisateur par son code ami |

---

## 🧪 Tester Après Configuration

1. **Ouvrir la console du navigateur** (`F12`)
2. **Rafraîchir la page** (`Ctrl+R`)
3. **Observer les logs :**

✅ **Avant (Erreur) :**
```
❌ Erreur lors du chargement du profil: Error: permission_denied
❌ Erreur lors de l'envoi de la demande: Error: PERMISSION_DENIED
```

✅ **Après (Correct) :**
```
👤 Utilisateur connecté: lRqoV1WanJRSYuJe4JaltdYa7os2
🔄 Amis mis à jour: 0
🔄 Demandes mises à jour: 0
✅ Profil sauvegardé dans Firebase
✅ Demande envoyée !
```

---

## 🚀 Alternative : Rules Prédéfinies Firebase

Si vous avez un doute, Firebase propose des templates :

1. Dans **Rules**, cliquer sur **"⚡ Quickstart"**
2. Sélectionner l'option **"Start in test mode"** ou **"Start in locked mode"**

⚠️ **⚠️ ATTENTION : Mode Test est DANGEREUX en production (règles publiques) !**

---

## 🔒 Mode Production (Plus Sécurisé)

Pour un déploiement en production, utiliser ces règles plus strictes :

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users').child(auth.uid).child('friends').child($uid).exists()",
        ".write": "$uid === auth.uid",
        "profile": {
          ".read": true,
          "friendCode": {
            ".read": true
          },
          ".write": "$uid === auth.uid"
        },
        "friends": {
          ".read": "$uid === auth.uid",
          ".write": "$uid === auth.uid",
          "$friendUid": {
            ".validate": "newData.hasChildren(['id', 'username', 'avatar'])"
          }
        },
        "friendRequests": {
          ".read": "$uid === auth.uid",
          ".write": "auth != null",
          "$requestId": {
            ".validate": "newData.hasChildren(['id', 'fromUserId', 'fromUsername'])"
          }
        },
        "sharedEntries": {
          ".read": "$uid === auth.uid",
          ".write": "auth != null"
        }
      }
    },
    "userCodes": {
      ".read": true,
      ".write": false
    }
  }
}
```

---

## 📱 Vérifier que Tout Fonctionne

### Test 1 : Vérifier la Connexion
```javascript
// Dans la console du navigateur
firebase.database().ref('test').set({hello: 'world'})
.then(() => console.log('✅ Écriture OK'))
.catch(e => console.error('❌ Erreur:', e.code))
```

### Test 2 : Envoyer une Demande d'Ami
1. Créer deux sessions navigateur (ou deux appareils)
2. Dans la 1ère : Copier son code ami
3. Dans la 2ème : Coller le code et cliquer "Envoyer demande"
4. Vérifier que la demande apparaît dans la 1ère session

### Test 3 : Consulter Firebase Console
1. Aller dans **Realtime Database** → **Données**
2. Vous devriez voir `users/{uid}/friendRequests/...`

---

## 🐛 Dépannage

| Erreur | Cause | Solution |
|--------|-------|----------|
| `PERMISSION_DENIED` | Règles non configurées | Appliquer les règles ci-dessus |
| `User denied writing to users/{uid}/friendRequests` | Utilisateur anonyme non autorisé | Modifier les règles pour permettre les utilisateurs anonymes |
| `Object has unknown property` | Données invalides | Valider la structure des données |

---

## 📚 Ressources

- [Documentation Firebase Rules](https://firebase.google.com/docs/rules)
- [Firebase Realtime Database Security](https://firebase.google.com/docs/database/security)
- [Règles Prédéfinies Firebase](https://firebase.google.com/docs/rules/basics)

---

## ✨ À Faire Après Configuration

- ✅ Tester le système d'ajout d'ami
- ✅ Vérifier les logs Firebase dans la console
- ✅ Tester entre deux appareils/sessions
- ✅ Vérifier la synchronisation temps réel
- ✅ Documenter les besoins de sécurité spécifiques
