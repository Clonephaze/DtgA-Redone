import { generateTOC } from "./TableOfContentsGen.js";
import { handleAccordionClicks } from "./FaqPage.js";
import { initializeParticles } from "./ParticleManager.js";
import { collapseContent, addCardEventListeners } from "./Utilities.js";
import { initiatePopovers } from "./PopOvers.js";
import { appendScrollButton } from "./ScrolltoTop.js";

/**
 * Loads the page based on the current URL hash.
 */
export function loadPageFromURL() {
    const pageId = window.location.hash.substring(1);
    if (pageId) {
        loadPage(pageId);
    } else {
        loadPage('homePage');
    }
}

export function loadPage(pageId, optItemId) {
    // Close the navigation menu
    document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');

    // Apply saved primary color from local storage
    const savedColor = localStorage.getItem('color-primary-rgb-values');
    if (savedColor) {
        document.documentElement.style.setProperty('--color-primary-rgb-values', savedColor);
    }

    // Responsive handling for navigation menu animation
    if (window.innerWidth <= 768) {
        let navList = document.querySelector('.nav-list');
        let navDropdown = document.querySelector('.nav-dropdown');
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

    // Load the corresponding minified HTML file
    loadContentAndScripts(pageId, optItemId);
}

function loadContentAndScripts(pageId, optItemId) {
    let fileName;
    let pageTitle;
    switch (pageId) {
        case 'locationsPage':
            fileName = 'Locations.gen';
            pageTitle = 'Locations'; 
            break;
        case 'npcsPage':
            fileName = 'NPCs.gen';
            pageTitle = 'NPCs';
            break;
        case 'enemiesPage':
            fileName = 'Enemies.gen';
            pageTitle = 'Enemies';
            break;
        case 'aspSpellcastingPage':
            fileName = 'Spellcasting';
            pageTitle = 'Spell Casting';
            break;
        case 'itemsPage':
            fileName = 'Items.gen';
            pageTitle = 'Items';
            break;
        case 'statsPage':
            fileName = 'StatsPage.gen';
            pageTitle = 'Stats and Leveling Up';
            break;
        case 'newMechanicsPage':
            fileName = 'NewMechanics';
            pageTitle = 'New Mechanics';
            break;
        case 'faqPage':
            fileName = 'FAQ';
            pageTitle = 'FAQ';
            break;
        case 'gettingStartedPage':
            fileName = 'GettingStarted';
            pageTitle = 'Getting Started';
            break;
        case 'aboutPage':
            fileName = 'About';
            pageTitle = 'About Us';
            break;
        case 'homePage':
        default:
            fileName = 'index';
            pageTitle = 'Home';
            break;
    }

    fetch(`OtherPages/${fileName}.html`)
        .then(response => response.text())
        .then(htmlContent => {
            const contentSection = document.querySelector('.content-section');
            contentSection.innerHTML = htmlContent;
            document.title = pageTitle + ' | Dangerous to go Alone Wiki | Mod for BOTW';

            // Update the position of the indicator
            updateIndicatorOnPageLoad(pageId);

            // Handle page-specific transitions
            handlePageTransition(pageId);

            // Connect to get-popped popovers
            initiatePopovers();

            // Generate the table of contents if the requested page has the correct element
            generateTOC();

            // Handle Card Buttons 
            addCardEventListeners();

            // Create Scroll Button 
            appendScrollButton(contentSection);

            // If an optional item ID is provided, scroll to it
            handleOptionalItemId(optItemId);
        })
        .catch(() => {
            console.error(`Failed to load ${fileName}.`);
        });
}

function handleOptionalItemId(optItemId) {
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

                            // Remove the flash class after the animation is complete
                            setTimeout(() => {
                                item.classList.remove('quick-flash');
                            }, 900);
                        }
                    });
                }, { threshold: 1 }); // Trigger when 50% of the item is in view

                // Start observing the item
                observer.observe(item);
            }
        }, 100);
    } else if (optItemId === null) {
        return;
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

    if (pageId === 'homePage') {
        initializeParticles();
        homepageBg.style.opacity = '100%';
        nav.classList.remove('nav-with-content');
        siteFooter.style.display = 'none';
    } else if (pageId === 'faqPage') {
        handleAccordionClicks();
        homepageBg.style.opacity = '0';
        siteFooter.style.display = 'flex';
        nav.classList.add('nav-with-content');
    } else {
        homepageBg.style.opacity = '0';
        siteFooter.style.display = 'flex';
        nav.classList.add('nav-with-content');
    }
}
