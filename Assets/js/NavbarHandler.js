// NavbarHandler.js
let animationDurationShort = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200;
/*
 * Handles the behavior of the navigation bar, including dropdown menus and mobile navigation toggles.
 * Adjusts the layout based on user interactions and viewport size.
 *
 * @function navbarHandler
 */
export function navbarHandler() {
    // Handle click event on the wiki list dropdown
    $('#wiki-list-dropdown').on('click', function () {
        let dropdownExpanded = $(this).attr('aria-expanded');
        const navDropdown = $('.nav-dropdown');
        if (dropdownExpanded === 'false') {
            $(this).attr('aria-expanded', 'true');
            navDropdown.attr('aria-expanded', 'true');
            navDropdown.setAutoHeight(function () {
                requestAnimationFrame(function () {
                    navDropdown.css({ height: "auto" });
                })
            });
        } else if (dropdownExpanded === 'true') {
            $(this).attr('aria-expanded', 'false');
            navDropdown.attr('aria-expanded', 'false');
            navDropdown.animate({ height: "0" });
        }
    });

    // Handle click event on the navigation toggle for mobile view
    $('.nav-toggle').on('click', function () {
        let ariaExpanded = $(this).attr('aria-expanded');
        const navList = $('.nav-list');
        if (ariaExpanded === 'false') {
            $(this).attr('aria-expanded', 'true');
            navList.attr('aria-expanded', 'true');
            navList.setAutoHeight(function () {
                requestAnimationFrame(function () {
                    navList.css({ height: "auto" });
                })
            });
        } else if (ariaExpanded === 'true') {
            $(this).attr('aria-expanded', 'false');
            navList.attr('aria-expanded', 'false');
            navList.animate({ height: 0 });
        }
    });

    // Adjust padding-top of the content section based on navbar height
    const navbarHeight = $('nav').height();
    const navbarOffset = navbarHeight + 25;
    $('.content-section').css('padding-top', navbarOffset);
}