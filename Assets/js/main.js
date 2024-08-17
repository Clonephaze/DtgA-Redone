// main.js

// Function imports
import { navbarHandler } from "./NavbarHandler.js";
import { initializeColorPicker } from "./ColorPicker.js";
import { scrollButton } from "./ScrolltoTop.js";
import { loadPageFromURL, loadPage } from "./PageLoader.js";

let pageContent;

$(document).ready(function () {

    // Fetches JSON data for page content and initializes page load based on URL hash.
    $.getJSON("OtherPages/pageContent.json", function (data) {
        pageContent = data;
        loadPageFromURL(pageContent);

        // Event handler for navigation clicks
        $(".pageNav").on('click', function () {
            const pageId = $(this).attr('id');

            history.pushState({ pageId: pageId }, '', '#' + pageId);
            loadPage(pageId, pageContent);
        });
    }).fail(function () {
        console.error("Failed to load page content.");
    });

    // Event handler for site navigation buttons
    $(document).on('click', '#site-button', function () {
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

    // Load additional functions
    scrollButton();
    initializeColorPicker();
    navbarHandler();

    // Handles browser history back/forward button clicks.
    window.onpopstate = function (event) {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId);
        } else {
            loadPage('homePage');
        }
    };
});