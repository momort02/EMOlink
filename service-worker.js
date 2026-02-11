const CACHE_NAME = 'emolink-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/emotions.js',
  '/js/friends.js',
  '/js/firebase-config.js',
  '/js/firebase-integration.js',
  '/js/friends-ui.js',
  '/js/script.js'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
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

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});