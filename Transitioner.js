let testing = false; // Set to true and go to the root page to add content without the transitioner changing the content on screen.
var pageContent;

$(document).ready(function () {
    serviceWorker();

    /**
     * Fetches JSON data for page content and initializes page load based on URL hash.
     */
    $.getJSON("OtherPages/pageContent.json", function (data) {
        pageContent = data;
        loadPageFromURL();

        // Event handler for navigation clicks
        $(".pageNav").on('click', function () {
            var pageId = $(this).attr('id');
            history.pushState({ pageId: pageId }, '', '#' + pageId);
            loadPage(pageId);
        });
    }).fail(function () {
        console.error("Failed to load page content.");
    });

    // Event handler for site navigation buttons
    $(document).on('click', '#site-button', function () {
        var href = $(this).data('href');

        if (href.startsWith('#')) {
            // Handle internal link
            var pageId = href.substring(1);
            history.pushState({ pageId: pageId }, '', href);
            loadPage(pageId);
        } else {
            // Handle external link
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    });

    // Load additional functions from SpecialActions.js
    $.getScript("SpecialActions.js", function () {
        navbarHandler();
        scrollButton();
        initializeColorPicker();
    });

    // If testing mode is enabled, modify the background and log testing state
    if (testing) {
        $('.homepageBg').css('background', 'none');
        console.log('testing');
    }

    /**
     * Handles browser history back/forward button clicks.
     */
    window.onpopstate = function (event) {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId);
        } else {
            loadPage('homePage');
        }
    };
});

function serviceWorker() {
    // Register the service worker if not in testing mode
    if (!testing && navigator.serviceWorker) {
        navigator.serviceWorker.register('/DtgA-Redone/service-worker.js', { scope: '/DtgA-Redone/' })
            .then(function (registration) {
                // Uncomment the line below to log successful registration
                // console.log('Service worker registered with scope:', registration.scope);
            }).catch(function (error) {
                console.error('Service worker registration failed:', error);
            });
    }

    // Unregister the service worker during testing
    if (testing && navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                registration.unregister().then(function () {
                    console.log('Service worker unregistered');
                });
            }
        }).catch(function (error) {
            console.error('Error unregistering service workers:', error);
        });
    }
}

/**
 * Loads the page based on the current URL hash.
 */
function loadPageFromURL() {
    var pageId = window.location.hash.substring(1);
    if (pageId && !testing) {
        loadPage(pageId);
    } else if (!testing) {
        loadPage('homePage');
    }
}

/**
 * Loads the specified page content and handles related UI changes.
 * 
 * @param {string} pageId - The ID of the page to load.
 */
function loadPage(pageId) {
    // Close the navigation menu
    $('.nav-toggle').attr('aria-expanded', 'false');

    // Apply saved primary color from local storage
    var savedColor = localStorage.getItem('color-primary-rgb-values');
    if (savedColor) {
        $('html').css('--color-primary-rgb-values', savedColor);
    }

    // Responsive handling for navigation menu animation
    if ($(window).width() <= 768) {
        $('.nav-list').animate({ height: "0" }, 200).attr('aria-expanded', 'false');
        $('.nav-dropdown').animate({ height: "0" }, 200);
        $('#wiki-list-dropdown').attr('aria-expanded', 'false');
    } else {
        $('.nav-dropdown').animate({ height: "0" }, 200);
        $('#wiki-list-dropdown').attr('aria-expanded', 'false');
    }

    // Find the content for the specified pageId
    var content = pageContent.find(function (page) {
        return page.pageId === pageId;
    });

    if (content) {
        // Load the page content and update the document title
        $('.content-section').html(content.pageContent);
        document.title = content.title;

        // Load additional scripts and initialize features
        $.getScript("SpecialActions.js", function () {
            generateTOC();
        });

        // Handle page-specific transitions
        handlePageTransition(pageId);
    } else {
        console.log("No content found for pageId:", pageId);
    }
}

/**
 * Handles page-specific transitions and loads additional scripts if necessary.
 * 
 * @param {string} pageId - The ID of the page to handle transition for.
 */
function handlePageTransition(pageId) {
    switch (pageId) {
        case 'homePage':
            $.getScript("SpecialActions.js", function () {
                manageTsParticles();
            })
            $('.homepageBg').animate({ opacity: "100%" }, 400);
            $('nav').toggleClass('nav-with-content', false);
            $('.site-footer').css('display', 'none');
            break;
        case 'faqPage':
            $.getScript("SpecialActions.js", function () {
                setupFAQPage();
                handleAccordionClicks();
            });
            $('.homepageBg').css('opacity', '0');
            $('nav').toggleClass('nav-with-content', true);
            $('.site-footer').css('display', 'flex');
            break;
        case 'itemsPage':
            $.getScript("SpecialActions.js", function () {
                generatePageContent('Items', {
                    'Armors': 'armorsContainer',
                    'Consumables': 'consumablesContainer',
                    'Gadgets': 'gadgetsContainer',
                    'KeyItems': 'keyitemsContainer',
                    'Souls': 'soulsContainer',
                    'Weapons': 'weaponsContainer'
                });
            });
            $('.homepageBg').css('opacity', '0');
            $('.site-footer').css('display', 'flex');
            $('nav').toggleClass('nav-with-content', true);
            break;
        case 'enemiesPage':
            $.getScript("SpecialActions.js", function () {
                generatePageContent('Enemies', {
                    'commonEnemies': 'commonEnemiesContainer',
                    'Bosses': 'bossesContainer'
                });
            });
            $('.homepageBg').css('opacity', '0');
            $('.site-footer').css('display', 'flex');
            $('nav').toggleClass('nav-with-content', true);
            break;
        case 'npcsPage':
            $.getScript("SpecialActions.js", function () {
                generatePageContent('NPCs', {
                    'companions': 'companionsContainer',
                    'vendors': 'vendorsContainer',
                    'lostSouls': 'lostSoulsContainer'
                });
            });
            $('.homepageBg').css('opacity', '0');
            $('.site-footer').css('display', 'flex');
            $('nav').toggleClass('nav-with-content', true);
            break;
        case 'locationsPage':
            $.getScript("SpecialActions.js", function () {
                generatePageContent('gadgetLocations', {
                    'locations': 'locationsContainer'
                });
            });
            $('.homepageBg').css('opacity', '0');
            $('.site-footer').css('display', 'flex');
            $('nav').toggleClass('nav-with-content', true);
            break;
        default:
            $('.homepageBg').animate({ opacity: "0" }, 400);
            $('.site-footer').css('display', 'flex');
            $('nav').toggleClass('nav-with-content', true);
            break;
    }
}
