/**
 * This script handles navigation and content loading for my single-page web application using jQuery.
 * 
 * Features:
 * - Fetches page content from a JSON file.
 * - Loads initial page based on URL hash.
 * - Updates content dynamically on navigation clicks.
 * - Manages browser history for back/forward navigation.
 * - Animates dropdown menus based on screen size.
 * - Special handling for transitions to/from the home page.
 * 
 * Testing mode is included to disable certain behaviors during development.
 */


$(document).ready(function() {
    /**
     * @type {Object[]} pageContent - The content of the pages loaded from the JSON file.
     */
    var pageContent;

    /**
     * @type {boolean} testing - Flag to indicate testing mode.
     */
    let testing = false;

    // Fetch the JSON data containing the page content
    $.getJSON("OtherPages/pageContent.json", function(data) {
        pageContent = data;

        // Load the initial page based on the URL hash
        loadPageFromURL();

        // Attach click event listener to navigation elements after data is loaded
        $(".pageNav").on('click', function() {
            var pageId = $(this).attr('id'); // Get the ID of the clicked element
            
            // Update URL and history state
            history.pushState({ pageId: pageId }, '', '#' + pageId);

            // Load the content for the clicked page
            loadPage(pageId);
        });
    }).fail(function() {
        console.error("Failed to load page content."); // Log error if JSON fails to load
    });

    /**
     * Handle back/forward buttons to maintain page state.
     * @param {PopStateEvent} event - The popstate event triggered by the browser's navigation.
     */
    window.onpopstate = function(event) {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId);
        } else {
            loadPage('homePage'); // Default to homePage if no state is present
        }
    };

    /**
     * Load the page based on the URL hash when the page is initially loaded or refreshed.
     */
    function loadPageFromURL() {
        var pageId = window.location.hash.substring(1); // Get the page ID from the URL hash

        if (pageId && !testing) {
            loadPage(pageId);
        } else if (!testing) {
            loadPage('homePage'); // Default to homePage if no hash is present
        }
    }

    /**
     * Load the content for the specified page.
     * @param {string} pageId - The ID of the page to load.
     */
    function loadPage(pageId) {
        // Reset the navigation toggle state
        $('.nav-toggle').attr('aria-expanded', 'false');

        // Close any open dropdowns if on a mobile device
        if ($(window).width() <= 768) {
            $('.nav-list').animate({ height: "0" }, 200).attr('aria-expanded', 'false');
            $('.nav-dropdown').animate({ height: "0" }, 200);
            $('#wiki-list-dropdown').attr('aria-expanded', 'false');
        } else { // Close dropdowns on larger screens
            $('.nav-dropdown').animate({ height: "0" }, 200);
            $('#wiki-list-dropdown').attr('aria-expanded', 'false');
        }
        
        // Find the matching page content based on pageId
        var content = pageContent.find(function(page) {
            return page.pageId === pageId;
        });
        
        if (content) {
            $('.content-section').html(content.pageContent); // Update the content container

            document.title = content.title; // Update the document title
            
            // Handle transitions specific to homePage
            if (pageId === 'homePage') {
                handleHomePageTransition();
            } else {
                handleContentPageTransition();
            }
        } else {
            console.log("No content found for pageId:", pageId); // Log if no content found for the pageId
        }
    }

    /**
     * Handle transitions and special actions for the home page.
     */
    function handleHomePageTransition() {
        // Refresh the tsParticles container
        window.refreshParticles();

        // Show the homepage background
        $('.homepageBg').animate({ opacity: "100%" }, 400);
        $('nav').toggleClass('nav-with-content', false); // Adjust navigation styling for home page
    }

    /**
     * Handle transitions and special actions for content pages.
     */
    function handleContentPageTransition() {
        // Hide the homepage background
        $('.homepageBg').animate({ opacity: "0" }, 400);
        $('nav').toggleClass('nav-with-content', true); // Adjust navigation styling for content pages
    }

    // If in testing mode, apply specific styles and log message
    if (testing) {
        $('.homepageBg').css('background', 'none');
        console.log('testing');
    }
});
