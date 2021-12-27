const CACHE_NAME = 'verion-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log(cache);
                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for request
self.addEventListener('fetch', (event) => {

});


// Activate the SW
self.addEventListener('activate', (event) => {

});
