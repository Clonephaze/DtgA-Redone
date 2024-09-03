/**
 * Function to set the element height to its auto height.
 * 
 * @param {function} [callback] - Optional callback to run after the transition ends.
 */
export function setAutoHeight(element, callback) {
    let hasStyle = element.getAttribute('style');
    if (element.classList.contains('transitioning') || hasStyle === 'height: auto') return; // Prevent multiple transitions

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

/**
 * Adds event listeners for description toggles and location buttons.
 */
export function addCardEventListeners() {
    // Event listener for description toggles
    document.removeEventListener('click', handleDescToggle);
    document.addEventListener('click', handleDescToggle);

    // Event listener for location buttons
    document.removeEventListener('click', handleLocationToggle);
    document.addEventListener('click', handleLocationToggle);

    
}

function handleDescToggle(event) {
    const button = event.target.closest('.desc-title');
    if (!button) return;

    const card = button.closest('.card-box');
    const descContent = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Collapse other descriptions in the same card
    card.querySelectorAll('.desc-title').forEach(btn => {
        if (btn !== button) {
            btn.setAttribute('aria-expanded', 'false');
            const otherDescContent = btn.nextElementSibling;
            if (otherDescContent) {
                collapseContent(otherDescContent);
            }
        }
    });

    // Toggle the aria-expanded attribute for the selected description
    button.setAttribute('aria-expanded', !isExpanded);

    if (!isExpanded) {
        setAutoHeight(descContent);
    } else {
        collapseContent(descContent);
    }

    // Scroll to the corresponding image
    const weaponNumber = button.dataset.weaponNumber;
    const upgradeNumber = button.dataset.upgradeNumber;
    const carousel = card.querySelector('.image-carousel');
    const targetItem = carousel.querySelector(`.carousel-item[data-weapon-number="${weaponNumber}"][data-upgrade-number="${upgradeNumber}"]`);

    if (targetItem) {
        const targetPosition = targetItem.offsetLeft - (carousel.offsetWidth / 2) + (targetItem.offsetWidth / 2);
        carousel.scrollTo({
            left: targetPosition,
            behavior: 'smooth'
        });
    }
}

function handleLocationToggle(event) {
    if (event.target.closest('.location-button')) {
        const button = event.target.closest('.location-button');
        const locationText = button.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded');

        if (isExpanded === 'false') {
            button.setAttribute('aria-expanded', 'true');
            setAutoHeight(locationText);
        } else if (isExpanded === 'true') {
            button.setAttribute('aria-expanded', 'false');
            collapseContent(locationText);
        }

        if (button.getAttribute('aria-expanded') === 'false' && locationText.getAttribute('style') !== 'height: 0px;') {
            // This is to catch cases of the text being expanded even though it should be collapsed. 
            button.setAttribute('aria-expanded', 'false');
            locationText.removeAttribute('style');
            console.error('Location text not collapsed');
        }
    }
}