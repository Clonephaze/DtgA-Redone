// Utilities.js
export let animationDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300; // Quick checks to see if the user prefers reduced motion

// Function to animate element height to its auto height
function animateAutoHeight(duration, easing, bounceHeight, callback) {
    const elem = $(this),
        bounceHeightValue = bounceHeight || 0,
        originalHeight = elem.height(),
        autoHeight = elem.css('height', 'auto').height();
    let bounce = autoHeight + bounceHeightValue;

    if (typeof bounceHeight === 'number') {
        // Set the element's height to the original height and stop any ongoing animations
        elem.height(originalHeight).stop().animate({ height: bounce }, duration, easing, function () {
            // Transition to the actual height smoothly
            $(this).animate({ height: autoHeight }, duration*0.4, 'swing', function () {
                if (typeof callback === 'function') callback.call(this);
            });
        });
    } else {
        elem.height(originalHeight).stop().animate({ height: autoHeight }, duration, easing, function () {
            if (typeof callback === 'function') callback.call(this);
        });
    }
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