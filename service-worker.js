const CACHE_NAME = 'emolink-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'css/style.css',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'js/emotions.js',
  'js/friends.js',
  'js/firebase-config.js',
  'js/firebase-integration.js',
  'js/friends-ui.js',
  'js/script.js'
];

// Fichiers optionnels (erreurs ignorées)
const optionalUrls = [
  'manifest.json'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Mettre en cache les fichiers requis
        const requiredUrls = urlsToCache.filter(url => !optionalUrls.includes(url));
        return cache.addAll(requiredUrls)
          .then(() => {
            // Essayer de mettre en cache les fichiers optionnels sans échouer
            return Promise.all(
              optionalUrls.map(url => 
                fetch(url)
                  .then(response => response.ok ? cache.put(url, response) : Promise.resolve())
                  .catch(() => Promise.resolve()) // Ignorer silencieusement les erreurs
              )
            );
          });
      })
  );
});

// Activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch - Stratégie : Cache First, puis Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourner depuis le cache si disponible
        if (response) {
          return response;
        }
        
        // Sinon, tenter une requête réseau
        return fetch(event.request)
          .then(response => {
            // Ne pas cacher les réponses non-ok
            if (!response || response.status !== 200) {
              return response;
            }
            
            // Cloner la réponse pour la mette en cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // En cas d'erreur réseau, retourner la version en cache si disponible
            return caches.match('index.html');
          });
      })
  );
});