// main.js

// Function imports
import { navbarHandler } from "./NavbarHandler.js";
import { initializeColorPicker } from "./ColorPicker.js";
import { scrollButton } from "./ScrolltoTop.js";
import { loadPageFromURL, loadPage } from "./PageLoader.js";
import { animateMobileButtonPress } from "./Utilities.js";

let pageContent;
let testing = false;

$(document).ready(function () {
    // Register service worker
    registerServiceWorker();    

    // Fetches JSON data for page content and initializes page load based on URL hash.
    $.getJSON("OtherPages/pageContent.json", function (data) {
        pageContent = data;
        loadPageFromURL(pageContent);

    }).fail(function () {
        console.error("Failed to load page content.");
    });
    
    // Event handler for navigation clicks
    // $(".pageNav").on('click', function () {
    //     const pageId = $(this).attr('id');

    //     history.pushState({ pageId: pageId }, '', '#' + pageId);
    //     loadPage(pageId, pageContent);
    // });
    // Event handler for site navigation buttons
    $(document).on('click', '.pageNav', function () {
        const href = $(this).data('href');

        if (href.startsWith('#')) {
            // Handle internal link
            const pageId = href.substring(1);
            history.pushState({ pageId: pageId }, '', href);
            loadPage(pageId, pageContent);
        } else {
            // Handle external link
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    });

    $(document).on('touchend', 'button', function () {
        let button = $(this);
        animateMobileButtonPress(button);
    });

    // Load additional functions
    scrollButton();
    initializeColorPicker();
    navbarHandler();

    // Handles browser history back/forward button clicks.
    window.onpopstate = function (event) {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId, pageContent);
        } else {
            loadPage('homePage', pageContent);
        }
    };
});

function registerServiceWorker() {
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
