// Constants for the service worker
const APP_PREFIX = 'DtgA_';        // Identifier for this app
const VERSION = 'version_010';      // Version of the offline cache, itterate this number if changes are made and old caches should be cleared
const CACHE_NAME = APP_PREFIX + VERSION; // Cache name combining app prefix and version
const REPOSITORY = '/DtgA-Redone'; // Base path for repository, required for making a service worker work for github pages.

// List of files to cache
const URLS = [
    '/',
    '/index.html',
    '/Transitioner.js',
    '/style.css',
    '/SpecialActions.js',
    '/manifest.json',
    '/iro.min.js',
    '/jquery-3.7.1.min.js',
    '/tsparticles.bundle.min.js',
    '/TSParticlesjquery.js',
    '/generationData.json',
    '/OtherPages/pageContent.json',
    '/Assets/DtgA-logo_Final-GaplessBW.webp',
    '/Assets/Fonts/HyliaSerifBeta-Regular.otf',
    '/Assets/Fonts/promptfont.otf',
    '/Assets/Fonts/promptfont.ttf',
    '/Assets/Fonts/TheWildBreathofZelda.otf',
    '/Assets/Fonts/Triforce-y07d.ttf',
    '/Assets/boxicons-2.1.4/css/boxicons.min.css',
    '/Assets/boxicons-2.1.4/fonts/boxicons.eot',
    '/Assets/boxicons-2.1.4/fonts/boxicons.svg',
    '/Assets/boxicons-2.1.4/fonts/boxicons.ttf',
    '/Assets/boxicons-2.1.4/fonts/boxicons.woff',
    '/Assets/boxicons-2.1.4/fonts/boxicons.woff2',
    '/Icons/Aero.webp',
    '/Icons/Argorok.webp',
    '/Icons/Balloon.webp',
    '/Icons/Beedle.webp',
    '/Icons/BlueCap.webp',
    '/Icons/Bow1.webp',
    '/Icons/Bow2.webp',
    '/Icons/Bow3.webp',
    '/Icons/Bow4.webp',
    '/Icons/Bow5.webp',
    '/Icons/Bow6.webp',
    '/Icons/Bow7.webp',
    '/Icons/BraveKnight.webp',
    '/Icons/Cannon.webp',
    '/Icons/CannonCave.webp',
    '/Icons/CoiledSword.webp',
    '/Icons/CrackedPot(Air).webp',
    '/Icons/CrackedPot(Dark).webp',
    '/Icons/CrackedPot(Earth).webp',
    '/Icons/CrackedPot(Fire).webp',
    '/Icons/CrackedPot(Holy).webp',
    '/Icons/CrackedPot(Ice).webp',
    '/Icons/CrackedPot(Metal).webp',
    '/Icons/CrackedPot(Shock).webp',
    '/Icons/CrackedPot(Water).webp',
    '/Icons/CrackedPot(Wood).webp',
    '/Icons/Cryo.webp',
    '/Icons/CubeOfZoe.webp',
    '/Icons/CurrentGemGroup.webp',
    '/Icons/CursedPuppet1.webp',
    '/Icons/Darknut.webp',
    '/Icons/Daruk.webp',
    '/Icons/DesertRuins.webp',
    '/Icons/DiveBoots.webp',
    '/Icons/DivineVessel.webp',
    '/Icons/DuelingMonastery.webp',
    '/Icons/Electro.webp',
    '/Icons/EstusFlask.webp',
    '/Icons/FortHatenoKeep.webp',
    '/Icons/FrightenedSoldiers.webp',
    '/Icons/FrozenRuins.webp',
    '/Icons/Generator.webp',
    '/Icons/Gibdo.webp',
    '/Icons/GoldenGauntlents.webp',
    '/Icons/GreenCap.webp',
    '/Icons/GustJar.webp',
    '/Icons/HeartPiece.webp',
    '/Icons/HebraMansion.webp',
    '/Icons/HerosShade.webp',
    '/Icons/Hestu.webp',
    '/Icons/HookShot.webp',
    '/Icons/HoverBoots.webp',
    '/Icons/HylianRoyalCrypt.webp',
    '/Icons/HylianWaterworks.webp',
    '/Icons/IronBoots.webp',
    '/Icons/ItemFlintStrike.webp',
    '/Icons/ItemPlaceholder.webp',
    '/Icons/LanayruWaterfall.webp',
    '/Icons/Lancelot.webp',
    '/Icons/LargeSword1.webp',
    '/Icons/LargeSword2.webp',
    '/Icons/LargeSword3.webp',
    '/Icons/LargeSword4.webp',
    '/Icons/LargeSword5.webp',
    '/Icons/LargeSword6.webp',
    '/Icons/LargeSword7.webp',
    '/Icons/MagicPouch.webp',
    '/Icons/MazKoshia.webp',
    '/Icons/Mipha.webp',
    '/Icons/Neko-Te.webp',
    '/Icons/OldCap.webp',
    '/Icons/OldMansCabin.webp',
    '/Icons/Paraglider.webp',
    '/Icons/Paya.webp',
    '/Icons/PowderKeg.webp',
    '/Icons/Purah.webp',
    '/Icons/Pyro.webp',
    '/Icons/RedCap.webp',
    '/Icons/ReDead.webp',
    '/Icons/Revali.webp',
    '/Icons/Rhoam.webp',
    '/Icons/Riju.webp',
    '/Icons/Robbie.webp',
    '/Icons/Robin.webp',
    '/Icons/RoyalGuard.webp',
    '/Icons/RoyalKnight.webp',
    '/Icons/Sidon.webp',
    '/Icons/SilverGauntlents.webp',
    '/Icons/Skulltula.webp',
    '/Icons/Slingshot.webp',
    '/Icons/SoulBoss.webp',
    '/Icons/SoulOfABraveKnight.webp',
    '/Icons/SoulOfAFrightenedSoldier.webp',
    '/Icons/SoulOfAnEnlightenedOne.webp',
    '/Icons/SoulOfARoyalGuard.webp',
    '/Icons/SoulOfAWouldBeChampion.webp',
    '/Icons/Spear1.webp',
    '/Icons/Spear2.webp',
    '/Icons/Spear3.webp',
    '/Icons/Spear4.webp',
    '/Icons/Spear5.webp',
    '/Icons/Spear6.webp',
    '/Icons/Spear7.webp',
    '/Icons/SpellBook.webp',
    '/Icons/SwiftSail.webp',
    '/Icons/Sword1.webp',
    '/Icons/Sword2.webp',
    '/Icons/Sword3.webp',
    '/Icons/Sword4.webp',
    '/Icons/Sword5.webp',
    '/Icons/Teba.webp',
    '/Icons/TwilightMirror.webp',
    '/Icons/TwilightSpinner.webp',
    '/Icons/Urbosa.webp',
    '/Icons/WoodAxe1.webp',
    '/Icons/WoodAxe2.webp',
    '/Icons/WoodAxe3.webp',
    '/Icons/WoodAxe4.webp',
    '/Icons/WoodAxe5.webp',
    '/Icons/WoodAxe6.webp',
    '/Icons/WoodAxe7.webp',
    '/Icons/WoodRaft.webp',
    '/Icons/WouldBeChampion.webp',
    '/Icons/Yunobo.webp'
].map(url => REPOSITORY + url); // Prepend the REPOSITORY to each URL `/DtgA-Redone/index.html`

// Respond with cached resources if cache is available
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url);
    const strippedUrl = new URL(e.request.url);
    strippedUrl.search = ''; // Remove query parameters, timestamps, etc from URL requests to find the correct file

    e.respondWith(
        caches.match(strippedUrl).then(function (response) {
            if (response) {
                // If cache is available, respond with cache
                console.log('responding with cache : ' + e.request.url);
                return response;
            } else {
                // If there are no cache, try fetching the request
                console.log('file is not cached, fetching : ' + e.request.url);
                return fetch(e.request);
            }
        })
    );
});

// Cache resources during installation
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME);
            return cache.addAll(URLS);
        })
    );
});

// Delete outdated caches during activation
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            // `keyList` contains all cache names under USERNAME.github.io
            // Filter out ones that have this app prefix to create a whitelist
            const cacheWhitelist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX) === 0;
            });
            // Add current cache name to white list
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
