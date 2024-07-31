var APP_PREFIX = 'DtgA_';     // Identifier for this app
var VERSION = 'version_05';   // Version of the off-line cache
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
    REPOSITORY + '/Assets/DtgA-logo_Final-GaplessBW.webp',
    REPOSITORY + '/Assets/Fonts/HyliaSerifBeta-Regular.otf',
    REPOSITORY + '/Assets/Fonts/promptfont.otf',
    REPOSITORY + '/Assets/Fonts/promptfont.ttf',
    REPOSITORY + '/Assets/Fonts/TheWildBreathofZelda.otf',
    REPOSITORY + '/Assets/Fonts/Triforce-y07d.ttf',
    // Add your .webp images here
    REPOSITORY + '/Icons/Aero.webp',
    REPOSITORY + '/Icons/Argorok.webp',
    REPOSITORY + '/Icons/Balloon.webp',
    REPOSITORY + '/Icons/Beedle.webp',
    REPOSITORY + '/Icons/BlueCap.webp',
    REPOSITORY + '/Icons/Bow1.webp',
    REPOSITORY + '/Icons/Bow2.webp',
    REPOSITORY + '/Icons/Bow3.webp',
    REPOSITORY + '/Icons/Bow4.webp',
    REPOSITORY + '/Icons/Bow5.webp',
    REPOSITORY + '/Icons/Bow6.webp',
    REPOSITORY + '/Icons/Bow7.webp',
    REPOSITORY + '/Icons/BraveKnight.webp',
    REPOSITORY + '/Icons/Cannon.webp',
    REPOSITORY + '/Icons/CannonCave.webp',
    REPOSITORY + '/Icons/CoiledSword.webp',
    REPOSITORY + '/Icons/CrackedPot(Air).webp',
    REPOSITORY + '/Icons/CrackedPot(Dark).webp',
    REPOSITORY + '/Icons/CrackedPot(Earth).webp',
    REPOSITORY + '/Icons/CrackedPot(Fire).webp',
    REPOSITORY + '/Icons/CrackedPot(Holy).webp',
    REPOSITORY + '/Icons/CrackedPot(Ice).webp',
    REPOSITORY + '/Icons/CrackedPot(Metal).webp',
    REPOSITORY + '/Icons/CrackedPot(Shock).webp',
    REPOSITORY + '/Icons/CrackedPot(Water).webp',
    REPOSITORY + '/Icons/CrackedPot(Wood).webp',
    REPOSITORY + '/Icons/Cryo.webp',
    REPOSITORY + '/Icons/CubeOfZoe.webp',
    REPOSITORY + '/Icons/CurrentGemGroup.webp',
    REPOSITORY + '/Icons/CursedPuppet1.webp',
    REPOSITORY + '/Icons/Darknut.webp',
    REPOSITORY + '/Icons/Daruk.webp',
    REPOSITORY + '/Icons/DesertRuins.webp',
    REPOSITORY + '/Icons/DiveBoots.webp',
    REPOSITORY + '/Icons/DivineVessel.webp',
    REPOSITORY + '/Icons/DuelingMonastery.webp',
    REPOSITORY + '/Icons/Electro.webp',
    REPOSITORY + '/Icons/EstusFlask.webp',
    REPOSITORY + '/Icons/FortHatenoKeep.webp',
    REPOSITORY + '/Icons/FrightenedSoldiers.webp',
    REPOSITORY + '/Icons/FrozenRuins.webp',
    REPOSITORY + '/Icons/Generator.webp',
    REPOSITORY + '/Icons/Gibdo.webp',
    REPOSITORY + '/Icons/GoldenGauntlents.webp',
    REPOSITORY + '/Icons/GreenCap.webp',
    REPOSITORY + '/Icons/GustJar.webp',
    REPOSITORY + '/Icons/HeartPiece.webp',
    REPOSITORY + '/Icons/HebraMansion.webp',
    REPOSITORY + '/Icons/HerosShade.webp',
    REPOSITORY + '/Icons/Hestu.webp',
    REPOSITORY + '/Icons/HookShot.webp',
    REPOSITORY + '/Icons/HoverBoots.webp',
    REPOSITORY + '/Icons/HylianRoyalCrypt.webp',
    REPOSITORY + '/Icons/HylianWaterworks.webp',
    REPOSITORY + '/Icons/IronBoots.webp',
    REPOSITORY + '/Icons/ItemFlintStrike.webp',
    REPOSITORY + '/Icons/ItemPlaceholder.webp',
    REPOSITORY + '/Icons/LanayruWaterfall.webp',
    REPOSITORY + '/Icons/Lancelot.webp',
    REPOSITORY + '/Icons/LargeSword1.webp',
    REPOSITORY + '/Icons/LargeSword2.webp',
    REPOSITORY + '/Icons/LargeSword3.webp',
    REPOSITORY + '/Icons/LargeSword4.webp',
    REPOSITORY + '/Icons/LargeSword5.webp',
    REPOSITORY + '/Icons/LargeSword6.webp',
    REPOSITORY + '/Icons/LargeSword7.webp',
    REPOSITORY + '/Icons/MagicPouch.webp',
    REPOSITORY + '/Icons/MazKoshia.webp',
    REPOSITORY + '/Icons/Mipha.webp',
    REPOSITORY + '/Icons/Neko-Te.webp',
    REPOSITORY + '/Icons/OldCap.webp',
    REPOSITORY + '/Icons/OldMansCabin.webp',
    REPOSITORY + '/Icons/Paraglider.webp',
    REPOSITORY + '/Icons/Paya.webp',
    REPOSITORY + '/Icons/PowderKeg.webp',
    REPOSITORY + '/Icons/Purah.webp',
    REPOSITORY + '/Icons/Pyro.webp',
    REPOSITORY + '/Icons/RedCap.webp',
    REPOSITORY + '/Icons/ReDead.webp',
    REPOSITORY + '/Icons/Revali.webp',
    REPOSITORY + '/Icons/Rhoam.webp',
    REPOSITORY + '/Icons/Riju.webp',
    REPOSITORY + '/Icons/Robbie.webp',
    REPOSITORY + '/Icons/Robin.webp',
    REPOSITORY + '/Icons/RoyalGuard.webp',
    REPOSITORY + '/Icons/RoyalKnight.webp',
    REPOSITORY + '/Icons/Sidon.webp',
    REPOSITORY + '/Icons/SilverGauntlents.webp',
    REPOSITORY + '/Icons/Skulltula.webp',
    REPOSITORY + '/Icons/Slingshot.webp',
    REPOSITORY + '/Icons/SoulBoss.webp',
    REPOSITORY + '/Icons/SoulOfABraveKnight.webp',
    REPOSITORY + '/Icons/SoulOfAFrightenedSoldier.webp',
    REPOSITORY + '/Icons/SoulOfAnEnlightenedOne.webp',
    REPOSITORY + '/Icons/SoulOfARoyalGuard.webp',
    REPOSITORY + '/Icons/SoulOfAWouldBeChampion.webp',
    REPOSITORY + '/Icons/Spear1.webp',
    REPOSITORY + '/Icons/Spear2.webp',
    REPOSITORY + '/Icons/Spear3.webp',
    REPOSITORY + '/Icons/Spear4.webp',
    REPOSITORY + '/Icons/Spear5.webp',
    REPOSITORY + '/Icons/Spear6.webp',
    REPOSITORY + '/Icons/Spear7.webp',
    REPOSITORY + '/Icons/SpellBook.webp',
    REPOSITORY + '/Icons/SwiftSail.webp',
    REPOSITORY + '/Icons/Sword1.webp',
    REPOSITORY + '/Icons/Sword2.webp',
    REPOSITORY + '/Icons/Sword3.webp',
    REPOSITORY + '/Icons/Sword4.webp',
    REPOSITORY + '/Icons/Sword5.webp',
    REPOSITORY + '/Icons/Teba.webp',
    REPOSITORY + '/Icons/TwilightMirror.webp',
    REPOSITORY + '/Icons/TwilightSpinner.webp',
    REPOSITORY + '/Icons/Urbosa.webp',
    REPOSITORY + '/Icons/WoodAxe1.webp',
    REPOSITORY + '/Icons/WoodAxe2.webp',
    REPOSITORY + '/Icons/WoodAxe3.webp',
    REPOSITORY + '/Icons/WoodAxe4.webp',
    REPOSITORY + '/Icons/WoodAxe5.webp',
    REPOSITORY + '/Icons/WoodAxe6.webp',
    REPOSITORY + '/Icons/WoodAxe7.webp',
    REPOSITORY + '/Icons/WoodRaft.webp',
    REPOSITORY + '/Icons/WouldBeChampion.webp',
    REPOSITORY + '/Icons/Yunobo.webp'
];

// Respond with cached resources
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url);
    const strippedUrl = new URL(e.request.url);
    strippedUrl.search = ''; // Remove the query parameters

    e.respondWith(
        caches.match(strippedUrl).then(function (response) {
            if (response) { // if cache is available, respond with cache
                console.log('responding with cache : ' + e.request.url);
                return response;
            } else { // if there are no cache, try fetching request and cache it
                console.log('file is not cached, fetching : ' + e.request.url);
                return fetch(e.request).then(function (networkResponse) {
                    if (networkResponse.ok && strippedUrl.pathname.startsWith(REPOSITORY + '/Icons/') && strippedUrl.pathname.endsWith('.webp')) {
                        return caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(strippedUrl, networkResponse.clone());
                            return networkResponse;
                        });
                    } else {
                        return networkResponse;
                    }
                });
            }
        })
    );
});

// Cache resources
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME);
            return cache.addAll(URLS);
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