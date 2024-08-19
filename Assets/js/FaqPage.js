// FAQPage.js
import { animationDuration } from "./Utilities.js";
/**
 * Sets up the FAQ page by opening the first accordion item.
 */
export function setupFAQPage() {
    // Ensure this only runs once
    if (setupFAQPage.isInitialized) return;
    setupFAQPage.isInitialized = true;

    // Open the first accordion item by default
    $('.accordion-content').first().addClass('show').css('height', 'auto');

    // Handle click events for accordion buttons
    handleAccordionClicks();
}

/**
 * Handles click events for accordion buttons.
 */
function handleAccordionClicks() {
    // Unbind previous click handlers to prevent multiple bindings
    $(document).off('click', '.accordion-button');

    // Bind the click handler
    $(document).on('click', '.accordion-button', function () {
        let content = $(this).next('.accordion-content');

        if (content.hasClass('show')) {
            content.removeClass('show').stop().animate({ height: 0 }, animationDuration);
        } else {
            $('.accordion-content.show').not(content).removeClass('show').stop().animate({ height: 0 }, animationDuration, function () {
                $(this).css('height', ''); // Reset height after animation
            });

            content.addClass('show').stop().setAutoHeight(function () {
                $(this).css('height', 'auto');
            });
        }
    });
}