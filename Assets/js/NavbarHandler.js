// NavbarHandler.js
let animationDurationShort = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 250;
/*
 * Handles the behavior of the navigation bar, including dropdown menus and mobile navigation toggles.
 * Adjusts the layout based on user interactions and viewport size.
 *
 * @function navbarHandler
 */
export function navbarHandler() {
    // Handle click event on the wiki list dropdown
    $('#wiki-list-dropdown').on('click', function () {
        let dropdownExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !dropdownExpanded); // Toggle aria-expanded attribute
        const dropdown = $('.nav-dropdown');

        if (!dropdownExpanded) {
            // Expand dropdown and animate height to auto
            dropdown.animateAutoHeight(function () {
                $(this).css('height', 'auto');
            });
        } else {
            // Collapse dropdown to height 0
            let currentHeight = dropdown.height(); // Get the current height of the dropdown
            dropdown.height(currentHeight); // Set to current height
            // Trigger a reflow to ensure the height is applied before animating to 0
            requestAnimationFrame(function () {
                dropdown.css({ height: "0" });
            });
        }
    });

    // Handle click event on the navigation toggle for mobile view
    $('.nav-toggle').on('click', function () {
        let ariaExpanded = $(this).attr('aria-expanded') === 'true';
        let expanding;
        $(this).attr('aria-expanded', !ariaExpanded); // Toggle aria-expanded attribute
        $('nav').toggleClass('mobile-nav-open', !ariaExpanded); // Toggle mobile-nav-open class

        if (!ariaExpanded && !expanding) {
            expanding = true;
            // Expand navigation list and animate height to auto
            $('.nav-list').animateAutoHeight(function () {
                $(this).css('height', 'auto');
            });
        } else {
            let currentHeight = $('.nav-list').height();
            $('.nav-list').height(currentHeight); // Set to current height
            // Trigger a reflow to ensure the height is applied before animating to 0
            requestAnimationFrame(function () {
                $('.nav-list').css({ height: "0" });
            });
        }
    });

    // Adjust padding-top of the content section based on navbar height
    const navbarHeight = $('nav').height();
    const navbarOffset = navbarHeight + 25;
    $('.content-section').css('padding-top', navbarOffset);
}