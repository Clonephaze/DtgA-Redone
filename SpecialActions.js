$(document).ready(function() {
    // Show the first accordion content by default
    $('.accordion-content').first().addClass('show').height('auto');

    // Delegate the click event to the document for dynamically loaded content
    $(document).on('click', '.accordion-button', function() {
        var content = $(this).next('.accordion-content');
        
        // Close all accordion contents
        $('.accordion-content').not(content).each(function() {
            $(this).animate({ height: 0 }, 300, function() {
                $(this).removeClass('show');
            });
        });

        // Toggle the clicked accordion content
        if (content.hasClass('show')) {
            content.animate({ height: 0 }, 300, function() {
                $(this).removeClass('show');
            });
        } else {
            content.addClass('show').animateAutoHeight(300, 'swing', function() {
                $(this).css('height', 'auto'); // Ensure the final height is auto
            });
        }
    });
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

    elem.height(originalHeight).animate({ height: autoHeight }, duration, easing, function() {
        if (typeof callback === 'function') callback.call(this);
    });
};
