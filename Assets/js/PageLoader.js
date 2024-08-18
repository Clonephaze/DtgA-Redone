// PageLoader.js
import { generateTOC } from "./TableOfContentsGen.js";
import { setupFAQPage } from "./FaqPage.js";
import { manageTsParticles } from "./ParticleManager.js";
import { generatePageContent } from "./CardGeneration.js";
import { animationDuration } from "./Utilities.js"; // Quick check to see if the user prefers reduced motion

let testing = false; // Set to true and go to the root page to add content without the transitioner changing the content on screen.

//Loads the page based on the current URL hash.
export function loadPageFromURL(pageContent) {
    let pageId = window.location.hash.substring(1);
    if (pageId && !testing) {
        loadPage(pageId, pageContent);
    } else if (!testing) {
        loadPage('homePage', pageContent);
    } else if (testing) {
        $('.homepageBg').css('background', 'none');
        console.log('testing');
    }
}

/**
 * Loads the specified page content and handles related UI changes.
 * 
 * @param {string} pageId - The ID of the page to load.
 */
export function loadPage(pageId, pageContent) {
    // Close the navigation menu
    $('.nav-toggle').attr('aria-expanded', 'false');

    // Apply saved primary color from local storage
    let savedColor = localStorage.getItem('color-primary-rgb-values');
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
    let content = pageContent.find(function (page) {
        return page.pageId === pageId;
    });

    if (content) {
        // Load the page content and update the document title
        $('.content-section').html(content.pageContent);
        document.title = content.title;

        // Update the position of the indicator
        updateIndicatorOnPageLoad(pageId);

        // Generate the table of contents if the requested page has the correct element
        generateTOC();

        // Handle page-specific transitions
        handlePageTransition(pageId);
    } else {
        console.log("No content found for pageId:", pageId);
    }
}

/**
 * Updates the position of the indicator based on the current pageId.
 * 
 * @param {string} pageId - The ID of the current page.
 */
function updateIndicatorOnPageLoad(pageId) {
    const $indicator = $('.indicator');
    const $navLinks = $('.nav-item button');
    const $wikiButton = $('#wiki-list-dropdown');
    let wikiPages = ['newMechanicsPage', 'itemsPage', 'aspSpellcastingPage', 'enemiesPage', 'npcsPage', 'locationsPage', 'statsPage'];

    function updateIndicator($element) {
        let leftPosition = $element.position().left;
        let elementWidth = $element.outerWidth();

        $indicator.css({
            left: leftPosition,
            width: elementWidth
        });
    }

    // Determine which link should be active based on the pageId
    let $activeLink = $navLinks.filter(function() {
        return $(this).data('href') === '#' + pageId;
    });

    if ($activeLink.length > 0 && wikiPages.includes(pageId)) {
        // If the active link is not found among regular links, check if it's a wiki page
        $activeLink = $wikiButton;
    }

    if ($activeLink.length > 0) {
        updateIndicator($activeLink);
        $navLinks.removeClass('active');
        $navLinks.removeAttr('aria-current');
        $activeLink.addClass('active');
        $activeLink.attr('aria-current', 'page');
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
            manageTsParticles();
            $('.homepageBg').animate({ opacity: "100%" }, animationDuration);
            $('nav').toggleClass('nav-with-content', false);
            $('.site-footer').css('display', 'none');
            break;
        case 'faqPage':
            setupFAQPage();
            $('.homepageBg').css('opacity', '0');
            $('nav').toggleClass('nav-with-content', true);
            $('.site-footer').css('display', 'flex');
            break;
        case 'itemsPage':
            generatePageContent('Items', {
                'Armors': 'armorsContainer',
                'Consumables': 'consumablesContainer',
                'Gadgets': 'gadgetsContainer',
                'KeyItems': 'keyitemsContainer',
                'Souls': 'soulsContainer',
                'Weapons': 'weaponsContainer'
            });
            $('.homepageBg').css('opacity', '0');
            $('.site-footer').css('display', 'flex');
            $('nav').toggleClass('nav-with-content', true);
            break;
        case 'enemiesPage':
            generatePageContent('Enemies', {
                'commonEnemies': 'commonEnemiesContainer',
                'Bosses': 'bossesContainer'
            });
            $('.homepageBg').css('opacity', '0');
            $('.site-footer').css('display', 'flex');
            $('nav').toggleClass('nav-with-content', true);
            break;
        case 'npcsPage':
            generatePageContent('NPCs', {
                'companions': 'companionsContainer',
                'vendors': 'vendorsContainer',
                'lostSouls': 'lostSoulsContainer'
            });
            $('.homepageBg').css('opacity', '0');
            $('.site-footer').css('display', 'flex');
            $('nav').toggleClass('nav-with-content', true);
            break;
        case 'locationsPage':
            generatePageContent('gadgetLocations', {
                'locations': 'locationsContainer'
            });
            $('.homepageBg').css('opacity', '0');
            $('.site-footer').css('display', 'flex');
            $('nav').toggleClass('nav-with-content', true);
            break;
        case 'statsPage':
            generatePageContent('StatsPage', {
                'Stats': 'stat-card-container'
            });
            $('.homepageBg').css('opacity', '0');
            $('.site-footer').css('display', 'flex');
            $('nav').toggleClass('nav-with-content', true);
            break;
        default:
            $('.homepageBg').animate({ opacity: "0" }, animationDuration);
            $('.site-footer').css('display', 'flex');
            $('nav').toggleClass('nav-with-content', true);
            break;
    }
}