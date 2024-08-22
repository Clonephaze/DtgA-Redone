import { setAutoHeight, collapseContent } from "./Utilities.js";

/**
 * Sets up the FAQ page by opening the first accordion item.
 */
export function setupFAQPage() {
    // Ensure this only runs once
    if (setupFAQPage.isInitialized) return;
    setupFAQPage.isInitialized = true;

    // Open the first accordion item by default
    const firstContent = document.querySelector('.accordion-content');
    if (firstContent) {
        firstContent.classList.add('show');
        firstContent.style.height = 'auto';
    }
}

/**
 * Handles click events for accordion buttons.
 */
export function handleAccordionClicks() {
    // Unbind previous click handlers to prevent multiple bindings
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.removeEventListener('click', handleAccordionClick);
    });

    // Bind the click handler
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', handleAccordionClick);
    });
}

/**
 * Handles the individual accordion click.
 */
function handleAccordionClick(event) {
    const button = event.currentTarget;
    const content = button.nextElementSibling;

    if (content.classList.contains('show')) {
        collapseContent(content);
        content.classList.remove('show');
    } else {
        // Collapse other open accordion content
        document.querySelectorAll('.show').forEach(openContent => {
            if (openContent !== content) {
                collapseContent(openContent);
                openContent.classList.remove('show');
            }
        });

        content.classList.add('show');
        setAutoHeight(content);
    }
}
