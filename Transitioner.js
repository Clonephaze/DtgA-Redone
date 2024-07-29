$(document).ready(function() {
    var pageContent;
    let testing = false; // Set to true and go to the root page to add content without the transitioner changing the content on screen.

    /**
     * Fetches JSON data for page content and initializes page load based on URL hash.
     */
    $.getJSON("OtherPages/pageContent.json", function(data) {
        pageContent = data;
        loadPageFromURL();

        // Event handler for navigation clicks
        $(".pageNav").on('click', function() {
            var pageId = $(this).attr('id');
            history.pushState({ pageId: pageId }, '', '#' + pageId);
            loadPage(pageId);
        });
    }).fail(function() {
        console.error("Failed to load page content.");
    });

    $(document).on('click', '#site-button', function() {
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

    /**
     * Handles browser back/forward button clicks.
     */
    window.onpopstate = function(event) {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId);
        } else {
            loadPage('homePage');
        }
    };

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
        $('.nav-toggle').attr('aria-expanded', 'false');

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
        var content = pageContent.find(function(page) {
            return page.pageId === pageId;
        });

        if (content) {
            $('.content-section').html(content.pageContent);
            document.title = content.title;
            handlePageTransition(pageId);
            generateTOC();
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
                window.refreshParticles();
                $('.homepageBg').animate({ opacity: "100%" }, 400);
                $('nav').toggleClass('nav-with-content', false);
                $('.site-footer').css('display', 'none');
                break;
            case 'faqPage':
                $.getScript("SpecialActions.js", function() {
                    setupFAQPage();
                    handleAccordionClicks();
                });
                $('.homepageBg').css('opacity', '0');
                $('nav').toggleClass('nav-with-content', true);
                $('.site-footer').css('display', 'flex');
                break;
            case 'itemsPage':
                $.getScript("SpecialActions.js", function() {
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
                $.getScript("SpecialActions.js", function() {
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
                $.getScript("SpecialActions.js", function() {
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
                $.getScript("SpecialActions.js", function() {
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

    // If testing mode is enabled, modify the background and log testing state
    if (testing) {
        $('.homepageBg').css('background', 'none');
        console.log('testing');
    }

    function generateTOC() {
        var toc = $('.toc');
        if (toc.length) {
            toc.empty();
            $('.toc-place').each(function(index, element) {
                var id = 'toc-place-' + index;
                $(element).attr('id', id);
                toc.append('<button class="toc-button" data-target="#' + id + '">' + $(element).data('name') + '</button>');
            });

            $('.toc-button').on('click', function() {
                var target = $($(this).data('target'));
                var navbarHeight = $('nav').height();
                var navbarOffset = navbarHeight + 10;
                $('html, body').animate({ scrollTop: target.offset().top - navbarOffset }, 1250);
            });
        }
    }
});

/**
 * jQuery plugin to animate an element's height to its auto height.
 * 
 * @param {number} duration - Duration of the animation in milliseconds.
 * @param {string} easing - Easing function for the animation.
 * @param {Function} [callback] - Optional callback function to execute after the animation completes.
 */
jQuery.fn.animateAutoHeight = function(duration, easing, callback) {
    var elem = $(this),
        originalHeight = elem.height(),
        autoHeight = elem.css('height', 'auto').height();

    elem.height(originalHeight).animate({ height: autoHeight }, duration, easing, function() {
        if (typeof callback === 'function') callback.call(this);
    });
};
