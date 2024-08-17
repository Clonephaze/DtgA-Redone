// Utilities.js
export let animationDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 400; // Quick checks to see if the user prefers reduced motion

// Function to animate element height to its auto height
function animateAutoHeight(duration, easing, callback) {
    const elem = $(this),
        originalHeight = elem.height(),
        autoHeight = elem.css('height', 'auto').height();

    elem.height(originalHeight).stop().animate({ height: autoHeight }, duration, easing, function () {
        if (typeof callback === 'function') callback.call(this);
    });
}

/* Attach the function to jQuery directly, so it can be used as a jQuery plugin
* eg. $(selector).animateAutoHeight(500, 'swing'); or
* eg. $(selector).animateAutoHeight(500, 'swing', function() {});
*/
jQuery.fn.animateAutoHeight = animateAutoHeight;


export function animateMobileButtonPress(element) {
    if (!element.hasClass('accordion-button')) {
        element.addClass('button-tapped');

        setTimeout(() => {
            element.removeClass('button-tapped');
        }, 125);
    }
}