$(document).ready(function() {
    var pageContent;
    let testing = false;

    $.getJSON("OtherPages/pageContent.json", function(data) {
        pageContent = data;
        loadPageFromURL();

        $(".pageNav").on('click', function() {
            var pageId = $(this).attr('id'); 
            history.pushState({ pageId: pageId }, '', '#' + pageId);
            loadPage(pageId);
        });
    }).fail(function() {
        console.error("Failed to load page content.");
    });

    window.onpopstate = function(event) {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId);
        } else {
            loadPage('homePage');
        }
    };

    function loadPageFromURL() {
        var pageId = window.location.hash.substring(1);
        if (pageId && !testing) {
            loadPage(pageId);
        } else if (!testing) {
            loadPage('homePage');
        }
    }

    function loadPage(pageId) {
        $('.nav-toggle').attr('aria-expanded', 'false');

        if ($(window).width() <= 768) {
            $('.nav-list').animate({ height: "0" }, 200).attr('aria-expanded', 'false');
            $('.nav-dropdown').animate({ height: "0" }, 200);
            $('#wiki-list-dropdown').attr('aria-expanded', 'false');
        } else {
            $('.nav-dropdown').animate({ height: "0" }, 200);
            $('#wiki-list-dropdown').attr('aria-expanded', 'false');
        }
        
        var content = pageContent.find(function(page) {
            return page.pageId === pageId;
        });
        
        if (content) {
            $('.content-section').html(content.pageContent);
            document.title = content.title;
            handlePageTransition(pageId);
        } else {
            console.log("No content found for pageId:", pageId);
        }
    }

    function handlePageTransition(pageId) {
        switch (pageId) {
            case 'homePage':
                window.refreshParticles();
                $('.homepageBg').animate({ opacity: "100%" }, 400);
                $('nav').toggleClass('nav-with-content', false);
                break;
            case 'faqPage':
                $.getScript("SpecialActions.js", function() {
                    setupFAQPage();
                    handleAccordionClicks();
                });
                $('.homepageBg').css('opacity', '0');
                $('nav').toggleClass('nav-with-content', true);
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
                })
                $('.homepageBg').css('opacity', '0');
                $('nav').toggleClass('nav-with-content', true);
                break;
            case 'enemiesPage':
                $.getScript("SpecialActions.js", function() {
                    generatePageContent('Enemies', {
                        'commonEnemies': 'commonEnemiesContainer',
                        'Bosses': 'bossesContainer'
                    });
                })
                $('.homepageBg').css('opacity', '0');
                $('nav').toggleClass('nav-with-content', true);
                break;
            case 'npcsPage':
                $.getScript("SpecialActions.js", function(){
                    generatePageContent('NPCs', {
                        'companions': 'companionsContainer',
                        'vendors': 'vendorsContainer',
                        'lostSouls': 'lostSoulsContainer'
                    });
                })
                $('.homepageBg').css('opacity', '0');
                $('nav').toggleClass('nav-with-content', true);
                break;
            case 'locationsPage':
                $.getScript("SpecialActions.js", function() {
                    generatePageContent('gadgetLocations', {
                        'locations': 'locationsContainer'
                    });
                })
                $('.homepageBg').css('opacity', '0');
                $('nav').toggleClass('nav-with-content', true);
                break;
            default:
                $('.homepageBg').animate({ opacity: "0" }, 400);
                $('nav').toggleClass('nav-with-content', true);
                break;
        }
    }

    if (testing) {
        $('.homepageBg').css('background', 'none');
        console.log('testing');
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