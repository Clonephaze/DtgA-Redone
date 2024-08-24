const { computePosition, autoPlacement, offset, shift } = window.FloatingUIDOM;


let button = document.getElementById("color-picker-btn")
let cardPopElement = document.getElementById("cardPopover");
export function cardPopover() {

	const options = {
		placement: 'right',
		middleware: [
			offset(8),
			autoPlacement({autoAlignment: true}),
			shift(),
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



function showPopover(element) { element.style.display = "block"; console.log(element) };
function hidePopover(element) { element.style.display = "none"; console.log(element) }