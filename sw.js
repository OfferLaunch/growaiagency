const CACHE_NAME = 'grow-ai-v3';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/assets/images/logos/white and green.png',
    '/assets/images/logos/All white.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // For HTML files, always try network first, then fallback to cache
                if (event.request.url.includes('.html') || event.request.url.endsWith('/')) {
                    return fetch(event.request)
                        .then(networkResponse => {
                            // Update cache with fresh content
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, responseClone);
                            });
                            return networkResponse;
                        })
                        .catch(() => {
                            // If network fails, return cached version
                            return response;
                        });
                }
                // For other resources, return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 