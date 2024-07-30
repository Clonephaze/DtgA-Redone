const CACHE_NAME = 'DtgA-Redone-v1';
const urlsToCache = [
    '/Transitioner.js',
    '/style.css',
    '/SpecialActions.js',
    '/NavBar.js',
    '/Particles.js',
    '/manifest.json',
    '/iro.min.js',
    '/jquery-3.7.1.min.js',
    '/tsparticles.bundle.min.js',
    '/TSParticlesjquery.js',
    '/index.html',
    '/generationData.json',
    '/OtherPages/pageContent.json',
    'Assets/DtgA-logo_Final-GaplessBW.webp',
    'Assets/Fonts/HyliaSerifBeta-Regular.otf',
    'Assets/Fonts/promptfont.otf',
    'Assets/Fonts/promptfont.ttf',
    'Assets/Fonts/TheWildBreathofZelda.otf',
    'Assets/Fonts/Triforce-y07d.ttf',

];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the response from the cache
                if (response) {
                    return response;
                }
                
                // Clone the request
                let fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        let responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Function to cache all .webp images in the Icons folder dynamically
function cacheWebPImages() {
    return fetch('/Icons/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            // Parse the HTML to find .webp images
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, 'text/html');
            let imageElements = doc.querySelectorAll('img[src$=".webp"]');
            let imageUrls = Array.from(imageElements).map(img => img.src);

            return caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.addAll(imageUrls);
                });
        })
        .catch(error => {
            console.error('Failed to cache WebP images:', error);
        });
}

// Call the function to cache WebP images
cacheWebPImages();