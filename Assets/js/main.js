// Function imports
import { navbarHandler } from "./NavbarHandler.js";
import { initializeColorPicker } from "./ColorPicker.js";
import { scrollButton } from "./ScrolltoTop.js";
import { loadPageFromURL, loadPage } from "./PageLoader.js";
import { animateMobileButtonPress } from "./Utilities.js";
import { cardPopover, mousePopoverListener } from "./PopOvers.js";

let pageContent;
let testing = false;

document.addEventListener('DOMContentLoaded', () => {
    // Register service worker
    registerServiceWorker();

    // Fetches JSON data for page content and initializes page load based on URL hash.
    fetch("OtherPages/pageContent.json")
        .then(response => response.json())
        .then(data => {
            pageContent = data;
            loadPageFromURL(pageContent);
        })
        .catch(() => {
            console.error("Failed to load page content.");
        });

    // Event handler for site navigation buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('pageNav')) {
            const href = event.target.getAttribute('data-href');

            if (href.startsWith('#')) {
                // Handle internal link
                const pageId = href.substring(1);
                history.pushState({ pageId: pageId }, '', href);
                loadPage(pageId, pageContent);
            } else {
                // Handle external link
                window.open(href, '_blank', 'noopener,noreferrer');
            }
        }
    });

    document.addEventListener('touchend', (event) => {
        if (event.target.tagName === 'BUTTON') {
            let button = event.target;
            animateMobileButtonPress(button);
        }
    });

    // Load additional functions
    scrollButton();
    initializeColorPicker();
    navbarHandler();
    // cardPopover();
    mousePopoverListener();
    // Handles browser history back/forward button clicks.
    window.onpopstate = (event) => {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId, pageContent);
        } else {
            loadPage('homePage', pageContent);
        }
    };
});

function registerServiceWorker() {
    // Register the service worker if not in testing mode
    if (!testing && 'serviceWorker' in navigator) {
        navigator.serviceWorker.register('/DtgA-Redone/service-worker.js', { scope: '/DtgA-Redone/' })
            .then((registration) => {
                // Uncomment the line below to log successful registration
                // console.log('Service worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service worker registration failed:', error);
            });
    }

    // Unregister the service worker during testing
    if (testing && 'serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations()
            .then((registrations) => {
                registrations.forEach((registration) => {
                    registration.unregister()
                        .then(() => {
                            console.log('Service worker unregistered');
                        });
                });
            })
            .catch((error) => {
                console.error('Error unregistering service workers:', error);
            });
    }
}
