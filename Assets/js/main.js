// Function imports
import { navbarHandler } from "./NavbarHandler.js";
import { initializeColorPicker } from "./ColorPicker.js";
import { loadPageFromURL, loadPage } from "./PageLoader.js";
import { animateMobileButtonPress } from "./Utilities.js";
import { setMobileOpenClosed } from "./PopOvers.js";

// Load the appropriate HTML content based on the URL hash.
loadPageFromURL();

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Register service worker
    registerServiceWorker();
    
    
    // Event handler for site navigation buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('pageNav')) {
            const href = event.target.getAttribute('data-href');
            const currentPage = window.location.hash.substring(1);
            const popover = document.getElementById("popoverElement");
            let itemId = null;
            if (href.startsWith('#')) {
                if (href === `#${currentPage}`) {
                    return; // Do nothing if the link is to the current page
                }
                const pageId = href.substring(1);
                if (event.target.getAttribute('data-itemID')) {
                    itemId = event.target.getAttribute('data-itemID');
                }
                history.pushState({ pageId: pageId }, '', href);
                if (popover) {
                    popover.style.display = 'none';
                    popover.classList.remove('show');
                    popover.classList.add('hide');
                    setMobileOpenClosed();
                }
                loadPage(pageId, itemId);
            } else {
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
    initializeColorPicker();
    navbarHandler();

    // Handles browser history back/forward button clicks.
    window.onpopstate = (event) => {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId);
        } else {
            loadPage('homePage');
        }
    };
});

window.addEventListener('hashchange', loadPageFromURL);

function registerServiceWorker() {
    // Register the service worker if not in testing mode
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/DtgA-Redone/service-worker.js', { scope: '/DtgA-Redone/' })
            .then((registration) => {
                // Uncomment the line below to log successful registration
                // console.log('Service worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service worker registration failed:', error);
            });
    }
}
