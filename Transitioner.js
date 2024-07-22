$(document).ready(function() {
    var pageContent;
    let testing = false;

    // Fetch the JSON data
    $.getJSON("OtherPages/pageContent.json", function(data) {
        pageContent = data;

        // Load the initial page based on the URL
        loadPageFromURL();

        // Attach click event listener after data is loaded
        $(".pageNav").on('click', function() {
            var pageId = $(this).attr('id'); // Get the ID of the clicked element
            
            // Update URL and history
            history.pushState({ pageId: pageId }, '', '#' + pageId);

            loadPage(pageId);
        });
    }).fail(function() {
        console.error("Failed to load page content.");
    });

    // Handle back/forward buttons
    window.onpopstate = function(event) {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId);
        } else {
            loadPage('homePage'); // Default to homePage if no state
        }
    };

    function loadPageFromURL() {
        var pageId = window.location.hash.substring(1);

        if (pageId && !testing) {
            loadPage(pageId);
        } else if (!testing) {
            loadPage('homePage'); // Default to homePage if no hash
        }
    }

    function loadPage(pageId) {
        $('.nav-toggle').attr('aria-expanded', 'false');

        // check if screen width is equal to or less than 768px
        if ($(window).width() <= 768) {
            $('.nav-list').animate({ height: "0" }, 200);
            $('.nav-list').attr('aria-expanded', 'false');
            $('.nav-dropdown').animate({ height: "0" }, 200);
            $('#wiki-list-dropdown').attr('aria-expanded', 'false');
        }
        
        // Find the matching page content
        var content = pageContent.find(function(page) {
            return page.pageId === pageId;
        });
        
        if (content) {
            $('.content-section').html(content.pageContent); // Update the content container

            document.title = content.title;
            
            // Check if navigating to homePage and refresh tsParticles
            if (pageId === 'homePage') {
                handleHomePageTransition(pageContent);
            } else {
                handleContentPageTransition(pageContent);
            }
        } else {
            console.log("No content found for pageId:", pageId);
        }
    }

    function handleHomePageTransition(pageContent) {
        // Refresh the tsParticles container
        window.refreshParticles();

        // Hide the homepage background
        $('.homepageBg').animate({ opacity: "100%" }, 400);
        $('nav').toggleClass('nav-with-content', false);

    }

    function handleContentPageTransition(pageContent) {
        $('.homepageBg').animate({ opacity: "0" }, 400);
        $('nav').toggleClass('nav-with-content', true);

    }
});
