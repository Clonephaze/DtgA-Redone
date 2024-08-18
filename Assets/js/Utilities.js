// Utilities.js
export let animationDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300; // Quick checks to see if the user prefers reduced motion

// Function to animate element height to its auto height
function animateAutoHeight(callback) {
    const elem = $(this),
        originalHeight = elem.height(),
        autoHeight = elem.css('height', 'auto').height();

    // Temporarily reset height back to original height
    elem.height(originalHeight);

    // Use requestAnimationFrame to ensure the height is set after any previous animations or layout reflows
    requestAnimationFrame(function () {
        elem.height(autoHeight);

        // If a callback is provided, set it to run after the transition ends
        if (typeof callback === 'function') {
            elem.one('transitionend', function () {
                callback.call(this);
            });
        }
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
    } else {
        element.find('h2').addClass('button-tapped');

        setTimeout(() => {
            element.find('h2').removeClass('button-tapped');
        }, 125);
    }
}