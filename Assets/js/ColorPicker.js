/**
 * Initialize the color picker and set up the modal functionality.
 * This function sets up a color picker widget using the iro.js library,
 * initializes the color picker with a saved color from local storage (if available),
 * and handles the opening and closing of the color picker modal.
 */
export async function initializeColorPicker() {
    await window.iro;
    // Clear any existing color picker content
    const pickerElement = document.getElementById('picker');
    while (pickerElement.firstChild) {
        pickerElement.removeChild(pickerElement.firstChild);
    }

    // Retrieve saved color values from local storage
    const savedColorItems = localStorage.getItem('color-primary-rgb-values');
    const savedColor = savedColorItems ? `rgb(${savedColorItems})` : null;

    // Initialize the color picker with the saved color or a default color
    const colorPicker = new iro.ColorPicker("#picker", {
        width: 300,
        color: savedColor || "rgb(133, 255, 225)",
        wheelLightness: true,
        borderWidth: 2,
        borderColor: "rgb(255, 255, 255)",
    });

    // Open the color picker modal when the button is clicked
    const colorPickerBtn = document.getElementById('color-picker-btn');
    const colorPickerModal = document.getElementById('color-picker-modal');

    colorPickerBtn.addEventListener('click', () => {
        colorPickerModal.style.right = '10px';
    });

    // Function to close the color picker modal
    function closeModal() {
        colorPickerModal.removeAttribute('style');
    }

    // Close the modal when clicking outside of it or on specific buttons
    document.addEventListener('click', (event) => {
        if (!colorPickerModal.contains(event.target) && event.target !== colorPickerBtn) {
            closeModal();
        }

        const modalCloseButton = document.getElementById('modal-close-button');
        const resetButton = document.getElementById('reset-button');

        if (modalCloseButton && modalCloseButton.contains(event.target)) {
            closeModal();
        }

        if (resetButton && resetButton.contains(event.target)) {
            localStorage.setItem('color-primary-rgb-values', '133, 255, 225');
            document.documentElement.style.setProperty('--color-primary-rgb-values', '133, 255, 225');
            closeModal();
        }
    });

    // Update the CSS variable and local storage when the color changes
    colorPicker.on('color:change', function (color) {
        const { r, g, b } = color.rgb;
        const rgbValues = `${r}, ${g}, ${b}`;
        document.documentElement.style.setProperty('--color-primary-rgb-values', rgbValues);
        localStorage.setItem('color-primary-rgb-values', rgbValues);
    });
}
