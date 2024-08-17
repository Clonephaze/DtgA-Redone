// Constants for the service worker
const APP_PREFIX = 'DtgA_';  // Identifier for this app
const VERSION = 'version_22'; // Version of the offline cache, itterate this number if changes are made and old caches should be cleared
const CACHE_NAME = APP_PREFIX + VERSION; // Cache name combining app prefix and version
const REPOSITORY = '/DtgA-Redone'; // Base path for repository, required for making a service worker work for github pages.
const MAX_AGE = 24 * 60 * 60 * 1000; // Max age for cached resources in milliseconds (24 hours)

// List of files to cache
const URLS = [
    '/',
    '/index.html',
    '/style.css',
    '/manifest.json',
    '/service-worker.js',
    '/OtherPages/pageContent.json',
    '/Assets/js/CardGeneration.js',
    '/Assets/js/ColorPicker.js',
    '/Assets/js/FaqPage.js',
    '/Assets/js/main.js',
    '/Assets/js/NavbarHandler.js',
    '/Assets/js/PageLoader.js',
    '/Assets/js/ParticleManager.js',
    '/Assets/js/ScrolltoTop.js',
    '/Assets/js/TableOfContentsGen.js',
    '/Assets/js/Utilities.js',
    '/Assets/js/OtherCreatorsJs/iro.min.js',
    '/Assets/js/OtherCreatorsJs/jquery-3.7.1.min.js',
    '/Assets/js/OtherCreatorsJs/tsparticles.bundle.min.js',
    '/Assets/js/OtherCreatorsJs/TSParticlesjquery.js',
    '/Assets/js/generationData.json',
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
    '/Icons/ArmorLinkDefaultHead.webp',
    '/Icons/ArmorLinkDefaultLower.webp',
    '/Icons/ArmorLinkDoubletSet.webp',
    '/Icons/ArmorLinkFieldSet.webp',
    '/Icons/ArmorLinkleDefaultHead.webp',
    '/Icons/ArmorLinkleDefaultLower.webp',
    '/Icons/ArmorLinkleDesertSet.webp',
    '/Icons/ArmorLinkleDomainSet.webp',
    '/Icons/ArmorLinkleDoubletSet.webp',
    '/Icons/ArmorLinkleFieldSet.webp',
    '/Icons/ArmorLinkleHebraSet.webp',
    '/Icons/ArmorLinkleNecludaSet.webp',
    '/Icons/ArmorLinkleVolcanoSet.webp',
    '/Icons/ArmorZeldaDefaultHead.webp',
    '/Icons/ArmorZeldaDefaultLower.webp',
    '/Icons/ArmorZeldaDoubletSet.webp',
    '/Icons/ArmorZeldaFieldSet.webp',
    '/Icons/Balloon.webp',
    '/Icons/Beedle.webp',
    '/Icons/Belt(Adventurer).webp',
    '/Icons/Belt(Hero).webp',
    '/Icons/Belt(Soldier).webp',
    '/Icons/Belt(Traveler).webp',
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
    '/Icons/CrackedPot(Empty).webp',
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
    '/Icons/FlaskofHylianTears.webp',
    '/Icons/ForbiddenSunRite.webp',
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
    '/Icons/SoulofTheHerosShade.webp',
    '/Icons/SoulStray.webp',
    '/Icons/Spear1.webp',
    '/Icons/Spear2.webp',
    '/Icons/Spear3.webp',
    '/Icons/Spear4.webp',
    '/Icons/Spear5.webp',
    '/Icons/Spear6.webp',
    '/Icons/Spear7.webp',
    '/Icons/SpellBook.webp',
    '/Icons/StatAgility.webp',
    '/Icons/StatCourage.webp',
    '/Icons/StatDexterity.webp',
    '/Icons/StatEndurance.webp',
    '/Icons/StatFaith.webp',
    '/Icons/StatGrudge.webp',
    '/Icons/StatMana.webp',
    '/Icons/StatStrength.webp',
    '/Icons/StatVitality.webp',
    '/Icons/StatWisdom.webp',
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
    '/Icons/WeaponCrossbow.webp',
    '/Icons/WeaponStaffofWisdom.webp',
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

// Function to check if a cached response is stale
function isResponseStale(response) {
    const dateHeader = response.headers.get('date'); // Get the 'date' header from the response
    if (!dateHeader) return false; // If no date header is found, consider the response as not stale
    const age = new Date() - new Date(dateHeader); // Calculate the age of the cached response
    return age > MAX_AGE; // Return true if the age exceeds the MAX_AGE
}

// Respond to fetch events
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url);
    const strippedUrl = new URL(e.request.url);
    strippedUrl.search = ''; // Remove query parameters, timestamps, etc., from URL requests to find the correct cached file

    e.respondWith(
        caches.match(strippedUrl).then(function (response) {
            if (response && !isResponseStale(response)) {
                // If the resource is cached and not stale, return it
                console.log('responding with cache : ' + e.request.url);
                return response;
            } else {
                // If the resource is not cached or is stale, fetch it from the network
                console.log('file is not cached or is stale, fetching : ' + e.request.url);
                return fetch(e.request).then(function (networkResponse) {
                    if (networkResponse.ok) {
                        // Cache the fetched resource if the response is valid
                        return caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(strippedUrl, networkResponse.clone());
                            return networkResponse; // Return the network response
                        });
                    }
                    return networkResponse; // Return the network response even if it's not ok (e.g., 404)
                });
            }
        })
    );
});

// Cache resources during the installation of the service worker
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME);
            return cache.addAll(URLS); // Add all specified URLs to the cache
        })
    );
});

// Delete outdated caches during the activation of the service worker
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            const cacheWhitelist = keyList.filter(key => key.indexOf(APP_PREFIX) === 0);
            cacheWhitelist.push(CACHE_NAME); // Include the current cache name in the whitelist

            return Promise.all(keyList.map(function (key, i) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    // Delete caches that are not in the whitelist
                    console.log('deleting cache : ' + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    );
});
