var CACHE_NAME = 'pwa_cache_xp';
var APP_SHELL = [
    '{{appUrl}}',
    '{{appUrl}}?pwa=true',
    'main.min.css',
    'main.min.js',
    'manifest.json',
    'images/background.jpg',
    'images/meetup-logo.svg',
    'images/meetup-192x192.png',
    'images/meetup-512x512.png',
    'images/svg-sprites.svg'
];

// Cache resources
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL)
    })
  )
});

// Delete outdated caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key, i) {
        if (key !== CACHE_NAME) {
          return caches.delete(keyList[i])
        }
      }))
    })
  )
});


// Respond with cached resources
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request, {
        ignoreVary: true
    }).then(function (response) {
      return response || fetch(event.request)
    })
  )
});
/*

// Stale while revalidate
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request, { ignoreVary: true })
        .then(function(response) {
          var fetchPromise = fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          return response || fetchPromise;
      })
    })
  );
});
*/
