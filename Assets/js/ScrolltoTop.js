// ScrolltoTop.js

/**
 * Set up the scroll button functionality to show/hide a button based on scroll position
 * and update a progress circle based on the scroll progress.
 */
export function scrollButton() {
    const $button = $('#scroll-btn');
    const $progressCircle = $('#progress-circle');
    const circleRadius = $progressCircle.attr('r');
    const circleCircumference = 2 * Math.PI * circleRadius;

    // Set the progress circle's dash array and initial dash offset
    $progressCircle.css({
        strokeDasharray: circleCircumference,
        strokeDashoffset: circleCircumference
    });

    // Update the button visibility and progress circle on window scroll
    $(window).scroll(function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height();
        const winHeight = $(window).height();
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

        const offset = circleCircumference - (scrollPercent / 100 * circleCircumference);
        $progressCircle.css('stroke-dashoffset', offset);

        if (scrollTop > 250) {
            $button.css({ 'opacity': '1', 'cursor': 'pointer', 'pointer-events': 'auto' });
        } else {
            $button.css({ 'opacity': '0', 'cursor': 'unset', 'pointer-events': 'none' });
        }
    });

    // Scroll to the top of the page when the button is clicked
    $button.click(function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}