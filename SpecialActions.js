// setupFAQPage.js

/**
 * Sets up the FAQ page by opening the first accordion item.
 */
function setupFAQPage() {
    // Ensure this only runs once
    if (setupFAQPage.isInitialized) return;
    setupFAQPage.isInitialized = true;

    // Open the first accordion item by default
    $('.accordion-content').first().addClass('show').css('height', 'auto');
}

/**
 * Handles click events for accordion buttons.
 */
function handleAccordionClicks() {
    // Unbind previous click handlers to prevent multiple bindings
    $(document).off('click', '.accordion-button');

    // Bind the click handler
    $(document).on('click', '.accordion-button', function() {
        var content = $(this).next('.accordion-content');

        if (content.hasClass('show')) {
            content.removeClass('show').animate({ height: 0 }, 300);
        } else {
            $('.accordion-content.show').not(content).removeClass('show').animate({ height: 0 }, 300, function() {
                $(this).css('height', ''); // Reset height after animation
            });

            content.addClass('show').animateAutoHeight(300, 'swing', function() {
                $(this).css('height', 'auto');
            });
        }
    });
}


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
