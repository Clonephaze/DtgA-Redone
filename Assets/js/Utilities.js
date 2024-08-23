/**
 * Function to set the element height to its auto height.
 * 
 * @param {function} [callback] - Optional callback to run after the transition ends.
 */
export function setAutoHeight(element, callback) {
    let hasStyle = element.getAttribute('style');
    if (element.classList.contains('transitioning')|| hasStyle === 'height: auto') return; // Prevent multiple transitions

    element.classList.add('transitioning'); // Add transitioning class

    // Ensure the element has a transition set up in CSS
    const originalHeight = element.clientHeight;

    // Temporarily set height to auto to get the natural height
    element.style.height = 'auto';
    const autoHeight = element.scrollHeight + 'px';

    // Reset height to the original height to trigger the transition
    element.style.height = originalHeight + 'px';

    // Trigger a reflow to ensure the transition works correctly
    void element.offsetHeight; // This forces a reflow

    // Apply the auto height
    element.style.height = autoHeight;

    // If a callback is provided, run it after the transition ends
    const transitionEndCallback = () => {
        element.style.height = 'auto'; // Ensure height is set to auto after the transition
        element.classList.remove('transitioning'); // Remove transitioning class
        element.removeEventListener('transitionend', transitionEndCallback);
        if (typeof callback === 'function') {
            callback.call(element);
        }
    };

    element.addEventListener('transitionend', transitionEndCallback);

    // Handle cases where the transitionend event might not fire
    setTimeout(() => {
        if (element.classList.contains('transitioning')) {
            element.style.height = 'auto'; // Ensure height is set to auto if transition does not end
            element.classList.remove('transitioning'); // Remove transitioning class
        }
    }, 500); // Adjust timeout duration if needed
}

/**
 * Animates the collapse of the element's content by setting its height to 0.
 * 
 * @param {HTMLElement} element - The element to collapse.
 */
export function collapseContent(element) {
    if (element.classList.contains('transitioning')) return; // Prevent multiple transitions

    element.classList.add('transitioning'); // Add transitioning class

    const currentHeight = element.clientHeight + 'px';
    element.style.height = currentHeight;

    // Force reflow
    void element.offsetHeight;

    requestAnimationFrame(() => {
        element.style.height = '0'; // Collapse the content
    });

    // If a callback is provided, run it after the transition ends
    const transitionEndCallback = () => {
        element.removeAttribute('style'); // Ensure height is reset
        element.classList.remove('transitioning'); // Remove transitioning class
        element.removeEventListener('transitionend', transitionEndCallback);
    };

    element.addEventListener('transitionend', transitionEndCallback);

    // Handle cases where the transitionend event might not fire
    setTimeout(() => {
        if (element.classList.contains('transitioning')) {
            element.removeAttribute('style'); // Ensure height is reset if transition does not end
            element.classList.remove('transitioning'); // Remove transitioning class
        }
    }, 500); // Adjust timeout duration if needed
}

/**
 * Function to animate the button press effect on mobile.
 * 
 * @param {HTMLElement} element - The button element to animate.
 */
export function animateMobileButtonPress(element) {
    if (!element.classList.contains('accordion-button')) {
        element.classList.add('button-tapped');

        setTimeout(() => {
            element.classList.remove('button-tapped');
        }, 125);
    } else {
        const h2Element = element.querySelector('h2');
        if (h2Element) {
            h2Element.classList.add('button-tapped');

            setTimeout(() => {
                h2Element.classList.remove('button-tapped');
            }, 125);
        }
    }
}