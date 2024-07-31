var APP_PREFIX = 'DtgA_';     // Identifier for this app
var VERSION = 'version_03';   // Version of the off-line cache
var CACHE_NAME = APP_PREFIX + VERSION;
var REPOSITORY = '/DtgA-Redone';
var URLS = [
    REPOSITORY + '/',
    REPOSITORY + '/index.html',
    REPOSITORY + '/Transitioner.js',
    REPOSITORY + '/style.css',
    REPOSITORY + '/SpecialActions.js',
    REPOSITORY + '/NavBar.js',
    REPOSITORY + '/Particles.js',
    REPOSITORY + '/manifest.json',
    REPOSITORY + '/iro.min.js',
    REPOSITORY + '/jquery-3.7.1.min.js',
    REPOSITORY + '/tsparticles.bundle.min.js',
    REPOSITORY + '/TSParticlesjquery.js',
    REPOSITORY + '/generationData.json',
    REPOSITORY + '/OtherPages/pageContent.json',
    REPOSITORY + '/Assets/boxicons-2.1.4/css/boxicons.min.css',
    REPOSITORY + '/Assets/DtgA-logo_Final-GaplessBW.webp',
    REPOSITORY + '/Assets/Fonts/HyliaSerifBeta-Regular.otf',
    REPOSITORY + '/Assets/Fonts/promptfont.otf',
    REPOSITORY + '/Assets/Fonts/promptfont.ttf',
    REPOSITORY + '/Assets/Fonts/TheWildBreathofZelda.otf',
    REPOSITORY + '/Assets/Fonts/Triforce-y07d.ttf'
]

// Function to fetch and cache all .webp images in the Icons folder
function cacheWebpImages() {
    return fetch(REPOSITORY + '/Icons/')
        .then(response => {
            if (!response.ok) throw new TypeError('Bad response status');
            return response.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const imageLinks = Array.from(doc.querySelectorAll('a'))
                .filter(link => link.href.endsWith('.webp'))
                .map(link => REPOSITORY + '/Icons/' + link.getAttribute('href'));
            return caches.open(CACHE_NAME).then(cache => cache.addAll(imageLinks));
        });
}

// Respond with cached resources
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url);
    const strippedUrl = new URL(e.request.url);
    strippedUrl.search = ''; // Remove the query parameters

    e.respondWith(
        caches.match(strippedUrl).then(function (request) {
            if (request) { // if cache is available, respond with cache
                console.log('responding with cache : ' + e.request.url);
                return request;
            } else {       // if there are no cache, try fetching request
                console.log('file is not cached, fetching : ' + e.request.url);
                return fetch(e.request);
            }
        })
    );
});

// Cache resources
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME);
            return cache.addAll(URLS).then(() => cacheWebpImages());
        })
    );
});

// Delete outdated caches
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            // `keyList` contains all cache names under your username.github.io
            // filter out ones that have this app prefix to create a whitelist
            var cacheWhitelist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX) === 0;
            });
            // add current cache name to white list
            cacheWhitelist.push(CACHE_NAME);

            return Promise.all(keyList.map(function (key, i) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    );
});