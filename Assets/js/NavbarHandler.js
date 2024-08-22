import { collapseContent, setAutoHeight } from "./Utilities.js";

/**
 * Handles the behavior of the navigation bar, including dropdown menus and mobile navigation toggles.
 * Adjusts the layout based on user interactions and viewport size.
 *
 * @function navbarHandler
 */
export function navbarHandler() {
    // Handle click event on the wiki list dropdown
    const wikiDropdown = document.getElementById('wiki-list-dropdown');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (wikiDropdown && navDropdown) {
        wikiDropdown.addEventListener('click', function () {
            const dropdownExpanded = wikiDropdown.getAttribute('aria-expanded');
            if (dropdownExpanded === 'false') {
                wikiDropdown.setAttribute('aria-expanded', 'true');
                navDropdown.setAttribute('aria-expanded', 'true');
                setAutoHeight(navDropdown);
            } else if (dropdownExpanded === 'true') {
                wikiDropdown.setAttribute('aria-expanded', 'false');
                navDropdown.setAttribute('aria-expanded', 'false');
                collapseContent(navDropdown);
            }
        });
    }
    
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function () {
            const ariaExpanded = navToggle.getAttribute('aria-expanded');
            if (ariaExpanded === 'false') {
                navToggle.setAttribute('aria-expanded', 'true');
                navList.setAttribute('aria-expanded', 'true');
                setAutoHeight(navList);
            } else if (ariaExpanded === 'true') {
                navToggle.setAttribute('aria-expanded', 'false');
                navList.setAttribute('aria-expanded', 'false');
                collapseContent(navList);
            }
        });
    }

    // Adjust padding-top of the content section based on navbar height
    const navbar = document.querySelector('nav');
    const contentSection = document.querySelector('.content-section');

    if (navbar && contentSection) {
        const navbarHeight = navbar.offsetHeight;
        const navbarOffset = navbarHeight + 25;
        contentSection.style.paddingTop = navbarOffset + 'px';
    }
}
