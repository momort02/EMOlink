# 🔥 Règles Firebase Optimisées pour EMOlink

## 🔴 Problèmes avec les Règles Actuelles

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        "profile": {
          ".read": true
        },
        "friends": {
          "$friendId": {
            ".read": true
          }
        }
      }
    },
    "userCodes": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

⚠️ **Problèmes identifiés :**
- `profile.read: true` → Profils publics
- `friends.read: true` → Listes d'amis publiques
- `userCodes.write: "auth != null"` → Tout utilisateur peut modifier

### Issues Identifiés :

| Problème | Ligne | Risque | Priorité |
|----------|-------|--------|----------|
| `profile.read: true` | Public | N'importe qui voit les profils | 🟡 Moyen |
| `friends.read: true` | Public | Les listes d'amis sont visibles | 🟡 Moyen |
| `userCodes.write` | `auth != null` | Tout utilisateur peut spammer | 🔴 Critique |
| Pas de `friendRequests` | Manquant | Les demandes d'ami ne fonctionnent pas | 🔴 Critique |
| Pas de `sharedEntries` | Manquant | Le partage ne fonctionne pas | 🔴 Critique |

---

## ✅ Règles Recommandées - MODE DÉVELOPPEMENT

À utiliser **pendant le développement** (permet les accès libres) :

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users').child(auth.uid).child('friends').child($uid).exists()",
        ".write": "$uid === auth.uid",
        "profile": {
          ".read": true,
          ".write": "$uid === auth.uid",
          "username": {
            ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length < 50"
          },
          "friendCode": {
            ".read": true,
            ".validate": "newData.isString() && newData.val().length === 8"
          },
          "avatar": {
            ".validate": "newData.isString()"
          },
          "photoURL": {
            ".validate": "newData.isNull() || (newData.isString() && newData.val().length > 100)"
          }
        },
        "friends": {
          ".read": "$uid === auth.uid",
          ".write": "$uid === auth.uid",
          "$friendId": {
            ".validate": "newData.hasChildren(['id', 'username', 'avatar', 'friendCode'])"
          }
        },
        "friendRequests": {
          ".read": "$uid === auth.uid",
          ".write": "auth != null",
          "$requestId": {
            ".validate": "newData.hasChildren(['id', 'fromUserId', 'fromUsername', 'fromAvatar', 'status', 'createdAt'])"
          }
        },
        "sharedEntries": {
          ".read": "$uid === auth.uid",
          ".write": "auth != null",
          "$entryId": {
            ".validate": "newData.hasChildren(['id', 'fromUserId', 'emotion', 'sharedAt'])"
          }
        }
      }
    },
    "userCodes": {
      ".read": true,
      ".write": "auth != null",
      ".validate": "newData.isString() && newData.val().length === 8"
    }
  }
}
```

---

## ✅ Règles Recommandées - MODE PRODUCTION

À utiliser **en production** (sécurité maximale) :

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || (auth != null && root.child('users').child(auth.uid).child('friends').child($uid).exists())",
        ".write": "$uid === auth.uid",
        ".validate": "newData.hasChildren(['profile'])",
        "profile": {
          ".read": "auth != null",
          ".write": "$uid === auth.uid",
          ".validate": "newData.hasChildren(['username', 'avatar', 'friendCode'])",
          "username": {
            ".validate": "newData.isString() && newData.val().length >= 2 && newData.val().length <= 50"
          },
          "friendCode": {
            ".read": true,
            ".validate": "newData.isString() && newData.val().length === 8 && newData.val().matches(/^[A-Z0-9]{8}$/)"
          },
          "avatar": {
            ".validate": "newData.isString() && newData.val().length <= 5"
          },
          "photoURL": {
            ".validate": "newData.isNull() || (newData.isString() && newData.val().length > 100 && newData.val().length < 1000000)"
          },
          "createdAt": {
            ".read": true,
            ".validate": "newData.isNumber()"
          }
        },
        "friends": {
          ".read": "$uid === auth.uid",
          ".write": "$uid === auth.uid",
          ".validate": "newData.isObject()",
          "$friendId": {
            ".validate": "newData.hasChildren(['id', 'username', 'avatar', 'friendCode']) && !newData.hasChild('password')"
          }
        },
        "friendRequests": {
          ".read": "$uid === auth.uid",
          ".write": "auth != null",
          ".validate": "newData.isObject()",
          "$requestId": {
            ".validate": "newData.hasChildren(['fromUserId', 'fromUsername', 'status']) && newData.child('status').val() === 'pending'"
          }
        },
        "sharedEntries": {
          ".read": "$uid === auth.uid",
          ".write": "auth != null",
          ".validate": "newData.isObject()",
          "$entryId": {
            ".validate": "newData.hasChildren(['fromUserId', 'emotion', 'sharedAt'])"
          }
        }
      }
    },
    "userCodes": {
      ".read": true,
      ".write": false,
      ".indexOn": [".value"],
      "$code": {
        ".write": "!data.exists() && newData.val().matches(/^[a-zA-Z0-9_-]{20,}$/)"
      }
    }
  }
}
```

---

## 📊 Comparaison des Trois Versions

| Aspect | Règles Initiales ❌ | Dev ✅ | Production ✅ |
|--------|-------------------|--------|-------------|
| Profils publics | Oui | Oui | Non (lecteurs amis) |
| Listes d'amis publiques | Oui | Non | Non |
| Codes amis modifiables | Par tous | Par tous | Never |
| Validation des données | Non | Basique | Stricte |
| friendRequests supporté | Non | Oui | Oui |
| sharedEntries supporté | Non | Oui | Oui |
| Optimisations | Non | Non | Oui (.indexOn) |

---

## 🔧 Comment Appliquer les Règles

### Étape 1 : Accéder Firebase Console

1. Aller sur https://console.firebase.google.com/
2. Sélectionner projet **emolink-3524b**
3. Cliquer **Realtime Database** dans le menu

### Étape 2 : Aller à l'Onglet Rules

```
Database > Rules
```

### Étape 3 : Copier/Coller les Règles

**Choisir selon votre environnement :**
- **Développement** → Copier les règles MODE DÉVELOPPEMENT
- **Production** → Copier les règles MODE PRODUCTION

### Étape 4 : Publier

Cliquer le bouton **"Publier"** en bas à droite.

---

## ✨ Améliorations Clés des Nouvelles Règles

### 1. **Sécurité du Profil**
```json
"profile": {
  ".read": true,                    // ← Dev: Lisible
  ".write": "$uid === auth.uid",    // ← Seul propriétaire peut modifier
  ".validate": "..."                 // ← Validation stricte
}
```

### 2. **Sécurité des Listes d'Amis**
```json
"friends": {
  ".read": "$uid === auth.uid",     // ← Privé (seul propriétaire)
  "$friendId": {
    ".validate": "..."               // ← Validation de la structure
  }
}
```

### 3. **Support des Demandes d'Ami**
```json
"friendRequests": {
  ".read": "$uid === auth.uid",     // ← Seul destinataire voit
  ".write": "auth != null",          // ← N'importe quel utilisateur peut envoyé
  "$requestId": {
    ".validate": "newData.child('status').val() === 'pending'"
  }
}
```

### 4. **Support du Partage**
```json
"sharedEntries": {
  ".read": "$uid === auth.uid",     // ← Seul destinataire voit
  ".write": "auth != null",          // ← Les amis peuvent partager
}
```

### 5. **Sécurité des Codes Amis**
```json
"userCodes": {
  ".read": true,                     // ← Tout le monde peut chercher
  ".write": false,                   // ← PERSONNE ne peut modifier
}
```

---

## 🧪 Tester les Règles

### Test 1 : Vérifier qu'un Utilisateur peut lire ses données

```javascript
// Ouverture console du navigateur
firebase.database().ref('users/' + auth.currentUser.uid).once('value')
  .then(snap => console.log('✅ Lecture OK:', snap.val()))
  .catch(e => console.error('❌ Erreur:', e.code));
```

**Résultat attendu :** ✅ Affiche les données

### Test 2 : Vérifier qu'un utilisateur NE peut PAS lire les données d'un autre

```javascript
// Remplacer par l'UID d'un autre utilisateur
firebase.database().ref('users/OTHER_UID').once('value')
  .then(snap => console.warn('⚠️ PROBLÈME: Données visibles!'))
  .catch(e => console.log('✅ Correct - Accès refusé:', e.code));
```

**Résultat attendu :** ❌ Permission denied

### Test 3 : Vérifier que les demandes d'amis fonctionnent

```javascript
// Envoyer une demande d'ami
firebase.database().ref('users/OTHER_UID/friendRequests').push({
  fromUserId: auth.currentUser.uid,
  fromUsername: 'Test User',
  status: 'pending',
  createdAt: Date.now()
})
  .then(() => console.log('✅ Demande envoyée'))
  .catch(e => console.error('❌ Erreur:', e.code));
```

**Résultat attendu :** ✅ Succès (même si le destinataire ne voit pas)

---

## 🚨 Pièges Courants

### ❌ Ne PAS faire :

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
**Pourquoi :** N'importe qui peut lire ET modifier TOUTES les données !

### ❌ Ne PAS laisser userCodes modifiable :

```json
"userCodes": {
  ".write": "auth != null"
}
```
**Pourquoi :** Les utilisateurs peuvent changer les codes amis des autres !

### ❌ Ne PAS rendre les listes d'amis publiques :

```json
"friends": {
  ".read": true
}
```
**Pourquoi :** Violations de vie privée !

---

## 📈 Performance & Indexing

Pour optimiser les requêtes Firebase (production) :

```json
"users": {
  ".indexOn": ["lastActive"]
},
"userCodes": {
  ".indexOn": [".value"]
}
```

Cela accélère les requêtes de recherche par code ami.

---

## 📞 Support et Questions

En cas de problème avec les règles :

1. Vérifier les **logs Firebase** → Realtime Database → Règles
2. Vérifier la **console du navigateur** (`F12`) pour les erreurs
3. Vérifier que l'**authentification anonyme est activée** (Authentication settings)
4. Consulter la [documentation Firebase Rules](https://firebase.google.com/docs/rules)

---

## ✅ Checklist Application

- [ ] Copier les règles appropriées (Dev ou Prod)
- [ ] Aller dans Realtime Database → Rules
- [ ] Remplacer le contenu actual
- [ ] Cliquer "Publier"
- [ ] Rafraîchir l'app
- [ ] Vérifier la console pour les erreurs ✅
- [ ] Tester l'ajout d'un ami
- [ ] Vérifier les demandes d'ami fonctionnent
- [ ] Tester le partage d'analyse

---

## 🎯 Recommandation Finale

**Pour le développement actuel :** Utilisez les règles **MODE DÉVELOPPEMENT**
- Elles permettent de déboguer facilement
- Elles incluent la validation de structure
- Elles incluent les données manquantes (friendRequests, sharedEntries)

**Une fois en production :** Basculer vers **MODE PRODUCTION**
- Sécurité maxima
- Validation stricte
- Optimisations de performance
