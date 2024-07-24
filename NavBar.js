/**
 * This script manages dropdown and mobile navigation menu animations for a web application using jQuery.
 * 
 * Features:
 * - Toggles the visibility of a dropdown menu and a mobile navigation menu.
 * - Animates the height of these menus for smooth transitions.
 * - Adjusts the padding of the content section based on the navbar height.
 * 
 * Includes a jQuery plugin for animating elements to their auto height.
 */

$(document).ready(function() {
    // Handle click event on the wiki list dropdown
    $('#wiki-list-dropdown').on('click', function() {
        var dropdownExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !dropdownExpanded); // Toggle aria-expanded attribute
        var dropdown = $('.nav-dropdown');

        if (!dropdownExpanded) {
            // Expand dropdown and animate height to auto
            dropdown.animateAutoHeight(250, 'linear', function() {
                $(this).css('height', 'auto');
            });
        } else {
            // Collapse dropdown to height 0
            dropdown.animate({ height: "0" }, 200);
        }
    });

    // Handle click event on the navigation toggle for mobile view
    $('.nav-toggle').on('click', function() {
        var ariaExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !ariaExpanded); // Toggle aria-expanded attribute
        $('nav').toggleClass('mobile-nav-open', !ariaExpanded); // Toggle mobile-nav-open class

        if (!ariaExpanded) {
            // Expand navigation list and animate height to auto
            $('.nav-list').animateAutoHeight(200, 'swing', function() {
                $(this).css('height', 'auto');
            });
        } else {
            // Collapse navigation list to height 0
            $('.nav-list').animate({ height: "0" }, 200);
        }
    });

    // Adjust padding-top of the content section based on navbar height
    var navbarHeight = $('nav').height();
    var navbarOffset = navbarHeight + 25;
    $('.content-section').css('padding-top', navbarOffset);
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

    elem.height(originalHeight).animate({ height: autoHeight }, duration, easing, callback);
};
