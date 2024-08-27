// PopOvers.js
// Floating UI imports
const { computePosition, flip, offset, shift, autoUpdate } = window.FloatingUIDOM;

/**
 * Initializes popover functionality by setting up event listeners on elements with the class 'get-popped'.
 * The popovers are shown or hidden based on hover or focus events.
 */
export function initiatePopovers() {
	const popElements = document.querySelectorAll('.get-popped');
	popElements.forEach(triggerElement => {
		setupPopover(triggerElement);
	})
}

/**
 * Sets up the event listeners for showing and hiding the popover associated with a specific trigger element.
 *
 * The popover is shown after a delay when the trigger element is hovered over or focused, and hidden when the 
 * hover or focus is lost. The position of the popover is updated dynamically based on the trigger element's position.
 * 
 * @param {HTMLElement} triggerElement - The element that triggers the popover on hover or focus.
 */
function setupPopover(triggerElement) {
	let hoverTimer; // Timer for showing the popover
	const popoverElement = document.getElementById("popoverElement"); // Gets everything wanting a popover in the dom
	
	// Checks if the user has a touch input
	let touchInput = false;
	window.addEventListener('touchstart', () => {
		touchInput = true;
	}, { passive: true });

	['mouseenter', 'mouseleave', 'focus', 'blur'].forEach(event => {
		triggerElement.addEventListener(event, () => {
			if (touchInput) return; // Stop the rest of the function if the user has a touch input
			if (event === 'mouseenter' || event === 'focus') {
				hoverTimer = setTimeout(() => {
					updatePopPosition(triggerElement, popoverElement);
					showPopover(popoverElement, triggerElement);
				}, 300); // Updates the position of the requested popover after 300ms then shows it.
			} else if (event === 'mouseleave' || event === 'blur') {
				clearTimeout(hoverTimer); // Clears the hover timer, avoids showing popovers if the user just moves over the trigger
				hidePopover(popoverElement); 
			}
		});
	});

	triggerElement.addEventListener('click', () => {
		clearTimeout(hoverTimer);
		hidePopover(popoverElement);
	});
}

/**
 * Updates the position of the popover relative to the trigger element using the Floating UI library.
 *
 * This function computes the position of the popover based on the trigger element's position
 * and adjusts the popover's position dynamically as the page layout changes. The placement of the popover
 * can be controlled via the 'data-popSide' attribute on the trigger element.
 * 
 * @param {HTMLElement} triggerElement - The element that triggers the popover.
 * @param {HTMLElement} popoverElement - The popover element whose position is being updated.
 */
function updatePopPosition(triggerElement, popoverElement) {
	if (!popoverElement) return; // If the popover element doesn't exist, exit the function

	// Determine placement from the data-popSide attribute
	const placement = triggerElement.getAttribute('data-popSide') || 'top';

	// Get and set the position
	document.body.appendChild(popoverElement);
	autoUpdate(
		triggerElement,
		popoverElement,
		() => {
			computePosition(triggerElement, popoverElement, {
				placement,
				middleware: [
					offset(8),
					shift({ mainAxis: true }),
					flip(),
				],
			}).then(({ x, y }) => {
				Object.assign(popoverElement.style, {
					left: `${x}px`,
					top: `${y}px`,
				});
			}).catch(err => {
				console.error("Error computing position:", err);
			});
		}
	);
}

/**
 * Displays the popover element with content based on the attributes of the trigger element.
 *
 * This function populates the popover with text or HTML content depending on whether the trigger element
 * has the 'data-popInfo' or 'data-popCard' attribute. If 'data-popCard' is present, it fetches the relevant
 * data from a JSON file and uses it to populate the popover content. If 'data-popInfo' is present, it sets
 * the popover text to the value of the 'data-popInfo' attribute.
 * 
 * @param {HTMLElement} popoverElement - The popover element to be displayed.
 * @param {HTMLElement} triggerElement - The element that triggered the popover.
 */
function showPopover(popoverElement, triggerElement) {
	const popInfo = triggerElement.getAttribute('data-popInfo');
	const popCard = triggerElement.getAttribute('data-popCard');

	if (popInfo) {
		// Set the popover text to the value of the 'data-popInfo' attribute
		popoverElement.textContent = popInfo;
	} else if (popCard) {
		fetch("./generationData.json")
			.then(response => {
				if (!response.ok) throw new Error("Failed to fetch JSON data.");
				return response.json();
			})
			.then(data => {
				jsonData = data;
			})
			.catch(error => console.error(error.message));
		const item = jsonData.find(item => item.title === popCard); // Replace 'title' with the relevant key
		if (item) {
			popoverElement.innerHTML = createPopoverContent(item); // Custom function to generate HTML content
		} else {
			popoverElement.textContent = 'Item not found';
		}
	} else if (popCard && popInfo) {
		// Error handling if both 'data-popCard' and 'data-popInfo' are present
		console.error("Both 'data-popCard' and 'data-popInfo' attributes are present on element:", triggerElement);
	}
	popoverElement.style.display = ''; // Removes initial inline display: none style to avoid flashing on page load
	popoverElement.classList.add('show'); // Adds the "show" class, which animates the popover in
}

/**
 * Hides the popover element by removing the "show" class and making it invisible.
 *
 * @param {HTMLElement} element - The popover element to be hidden.
 */
function hidePopover(element) {
	element.classList.remove("show"); // Removes the "show" class, which animates the popover out
}

/**
 * Generates HTML content for the popover based on the provided item data.
 *
 * VERY MUCH WORK IN PROGRESS, NOT BEING USED THOUGH SO PUSH ON
 * 
 * This function creates a structured HTML snippet with details such as title, description,
 * image, and location, which is then inserted into the popover element.
 * 
 * @param {Object} item - The item data used to generate the popover content.
 * @returns {string} The generated HTML content for the popover.
 */
function createPopoverContent(item) {
	return `
		<h3>${item.title}</h3>
		<p>${item.description}</p>
		<img src="${item.imageSrc}" alt="${item.title}" />
		<p>Location: ${item.location}</p>
		`
}
