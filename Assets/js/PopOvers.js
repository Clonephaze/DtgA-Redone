const { computePosition, flip, offset, shift } = window.FloatingUIDOM;


let button = document.getElementById("color-picker-btn")
let cardPopElement = document.getElementById("cardPopover");
export function cardPopover() {
	const options = {
		placement: 'bottom',
		middleware: [
			offset(8),
			shift({ mainAxis: true }),
		],
	}
	computePosition(button, cardPopElement, options).then(({ x, y }) => {
		Object.assign(cardPopElement.style, {
			left: `${x}px`,
			top: `${y}px`,
		});
	}).catch((err) => {
		console.error("Error computing position:", err);
	});

	// Add event listeners
	['mouseenter', 'mouseleave', 'focus', 'blur'].forEach(event => {
		button.addEventListener(event, () => {
			if (event === 'mouseenter' || event === 'focus') {
				showPopover(cardPopElement);
			} else if (event === 'mouseleave' || event === 'blur') {
				hidePopover(cardPopElement);
			}
		});
	});
}

/**
 * Listens for mouse movement and updates the position of the mouse popover accordingly.
 *
 * @return {void}
 */
export function mousePopoverListener() {
	const mousePopover = document.getElementById("mousePopover");
	document.addEventListener("mousemove", ({ clientX, clientY }) => {
		const virtualEl = {
			getBoundingClientRect() {
				return {
					width: 0,
					height: 0,
					x: clientX,
					y: clientY,
					left: clientX,
					right: clientX,
					top: clientY,
					bottom: clientY,
				};
			},
		};

		computePosition(virtualEl, mousePopover, {
			placement: "left-start",
			middleware: [offset({mainAxis: 8, crossAxis: 20}), flip(), shift()],
		}).then(({ x, y }) => {
			Object.assign(mousePopover.style, {
				top: `${y}px`,
				left: `${x}px`,
			});
		});

		// TODO For testing the showing of the popover, delete when done
		button.addEventListener("mouseenter", () => {
			setTimeout(() => {
				mousePopover.classList.add("show");
			}, 500);
		})
	});

	// TODO For testing the showing of the popover, delete when done
	button.addEventListener("mouseleave", () => {
		// Hide the popover when the mouse leaves the viewport
		mousePopover.classList.remove("show");
		console.log(mousePopover + " was hidden");
	});
	document.addEventListener("click", () => {
		mousePopover.classList.remove("show");
		console.log(mousePopover + " was hidden");
	});
}



function showPopover(element) { element.style.display = "block"; console.log(element) };
function hidePopover(element) { element.style.display = "none"; console.log(element) }