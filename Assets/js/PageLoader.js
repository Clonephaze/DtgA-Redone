import { generateTOC } from "./TableOfContentsGen.js";
import { setupFAQPage, handleAccordionClicks } from "./FaqPage.js";
import { initializeParticles } from "./ParticleManager.js";
import { generatePageContent } from "./CardGeneration.js";
import { collapseContent } from "./Utilities.js";
import { initiatePopovers } from "./PopOvers.js";
import { appendScrollButton } from "./ScrolltoTop.js";

let testing = false; // Set to true here and in main.js and go to the root page to add content without the transitioner changing the content on screen.

/**
 * Loads the page based on the current URL hash.
 */
export function loadPageFromURL(pageContent) {
    const pageId = window.location.hash.substring(1);
    if (pageId && !testing) {
        loadPage(pageId, pageContent);
    } else if (!testing) {
        loadPage('homePage', pageContent);
    } else if (testing) {
        document.querySelector('.homepageBg').style.background = 'none';
        console.log('testing');
    }
}

/**
 * Loads the specified page content and handles related UI changes.
 * 
 * @param {string} pageId - The ID of the page to load.
 */
export function loadPage(pageId, pageContent, optItemId) {
    // Close the navigation menu
    document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');

    // Apply saved primary color from local storage
    const savedColor = localStorage.getItem('color-primary-rgb-values');
    if (savedColor) {
        document.documentElement.style.setProperty('--color-primary-rgb-values', savedColor);
    }

    // Responsive handling for navigation menu animation
    if (window.innerWidth <= 768) {
        let navList = document.querySelector('.nav-list')
        let navDropdown = document.querySelector('.nav-dropdown')
        collapseContent(navList);
        collapseContent(navDropdown);
        document.querySelector('.nav-list').setAttribute('aria-expanded', 'false');
        document.querySelector('.nav-dropdown').setAttribute('aria-expanded', 'false');
        document.getElementById('wiki-list-dropdown').setAttribute('aria-expanded', 'false');
    } else {
        document.querySelector('.nav-dropdown').style.height = '0';
        document.querySelector('.nav-dropdown').setAttribute('aria-expanded', 'false');
        document.getElementById('wiki-list-dropdown').setAttribute('aria-expanded', 'false');
    }

    // Find the content for the specified pageId
    const content = pageContent.find(page => page.pageId === pageId);

    if (content) {
        
        const contentSection = document.querySelector('.content-section');
        // Load the page content and update the document title
        contentSection.innerHTML = content.pageContent;
        document.title = content.title;

        // Update the position of the indicator
        updateIndicatorOnPageLoad(pageId);

        // Generate the table of contents if the requested page has the correct element
        generateTOC();

        // Connect to get-popped popovers
        initiatePopovers();

        // Handle page-specific transitions
        handlePageTransition(pageId);

        // Create Scroll Button
        appendScrollButton(contentSection);

        if (optItemId !== null) {
            setTimeout(() => {
                const item = document.getElementById(optItemId);
                if (item) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    const observer = new IntersectionObserver((entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // Element is in view, add the flash class
                                item.classList.add('quick-flash');
                                
                                // Stop observing the element since the animation is done
                                observer.disconnect();
                            }
                        });
                    }, { threshold: 1 }); // Trigger when 50% of the item is in view

                    // Start observing the item
                    observer.observe(item);
                }
            }, 250);
        } else if (optItemId === null) {
            return;
        }
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
    const indicator = document.querySelector('.indicator');
    const navLinks = document.querySelectorAll('.nav-item button');
    const wikiButton = document.getElementById('wiki-list-dropdown');
    const wikiPages = ['newMechanicsPage', 'itemsPage', 'aspSpellcastingPage', 'enemiesPage', 'npcsPage', 'locationsPage', 'statsPage'];

    function updateIndicator(element) {
        const leftPosition = element.getBoundingClientRect().left + window.scrollX;
        const elementWidth = element.offsetWidth;

        indicator.style.left = `${leftPosition}px`;
        indicator.style.width = `${elementWidth}px`;
    }

    // Determine which link should be active based on the pageId
    let activeLink = Array.from(navLinks).find(link => link.getAttribute('data-href') === `#${pageId}`);

    if (!activeLink && wikiPages.includes(pageId)) {
        // If the active link is not found among regular links, check if it's a wiki page
        activeLink = wikiButton;
    }

    if (activeLink) {
        updateIndicator(activeLink);
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
    }
}

/**
 * Handles page-specific transitions and loads additional scripts if necessary.
 * 
 * @param {string} pageId - The ID of the page to handle transition for.
 */
function handlePageTransition(pageId) {
    const homepageBg = document.querySelector('.homepageBg');
    const siteFooter = document.querySelector('.site-footer');
    const nav = document.querySelector('nav');

    switch (pageId) {
        case 'homePage':
            // manageTsParticles();
            initializeParticles();
            homepageBg.style.opacity = '100%';
            nav.classList.remove('nav-with-content');
            siteFooter.style.display = 'none';
            break;
        case 'faqPage':
            setupFAQPage();
            handleAccordionClicks();
            homepageBg.style.opacity = '0';
            nav.classList.add('nav-with-content');
            siteFooter.style.display = 'flex';
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
            homepageBg.style.opacity = '0';
            siteFooter.style.display = 'flex';
            nav.classList.add('nav-with-content');
            break;
        case 'enemiesPage':
            generatePageContent('Enemies', {
                'commonEnemies': 'commonEnemiesContainer',
                'Bosses': 'bossesContainer'
            });
            homepageBg.style.opacity = '0';
            siteFooter.style.display = 'flex';
            nav.classList.add('nav-with-content');
            break;
        case 'npcsPage':
            generatePageContent('NPCs', {
                'companions': 'companionsContainer',
                'vendors': 'vendorsContainer',
                'lostSouls': 'lostSoulsContainer'
            });
            homepageBg.style.opacity = '0';
            siteFooter.style.display = 'flex';
            nav.classList.add('nav-with-content');
            break;
        case 'locationsPage':
            generatePageContent('gadgetLocations', {
                'locations': 'locationsContainer'
            });
            homepageBg.style.opacity = '0';
            siteFooter.style.display = 'flex';
            nav.classList.add('nav-with-content');
            break;
        case 'statsPage':
            generatePageContent('StatsPage', {
                'Stats': 'stat-card-container'
            });
            homepageBg.style.opacity = '0';
            siteFooter.style.display = 'flex';
            nav.classList.add('nav-with-content');
            break;
        default:
            homepageBg.style.opacity = '0';
            siteFooter.style.display = 'flex';
            nav.classList.add('nav-with-content');
            break;
    }
}
