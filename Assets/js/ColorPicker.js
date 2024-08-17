import { animationDuration } from "./Utilities.js";
/**
 * Initialize the color picker and set up the modal functionality.
 * This function sets up a color picker widget using the iro.js library,
 * initializes the color picker with a saved color from local storage (if available),
 * and handles the opening and closing of the color picker modal.
 */
export function initializeColorPicker() {
    // Clear any existing color picker content
    $('#picker').empty();

    // Retrieve saved color values from local storage
    const savedColorItems = localStorage.getItem('color-primary-rgb-values');
    const savedColor = "rgb(" + savedColorItems + ")";

    let colorPicker
    // Initialize the color picker with the saved color or a default color
    if (savedColorItems) {
        colorPicker = new iro.ColorPicker("#picker", {
            width: 300,
            color: savedColor,
            wheelLightness: true,
            borderWidth: 2,
            borderColor: "rgb(255, 255, 255)",
        });
    } else {
        colorPicker = new iro.ColorPicker("#picker", {
            width: 300,
            color: "rgb(133, 255, 225)",
            wheelLightness: true,
            borderWidth: 2,
            borderColor: "rgb(255, 255, 255)",
        });
    }

    // Open the color picker modal when the button is clicked
    $('#color-picker-btn').on('click', function () {
        $('#color-picker-modal').stop().animate({ right: '10px' }, animationDuration);
    });

    // Function to close the color picker modal
    function closeModal() {
        $('#color-picker-modal').stop().animate({ right: '-350px' }, animationDuration);
    }

    // Close the modal when clicking outside of it or on specific buttons
    $(document).on('click', function (event) {
        if (!$(event.target).closest('#color-picker-modal, #color-picker-btn').length) {
            closeModal();
        }
        if ($('#modal-close-button') && $(event.target).closest('#modal-close-button').length) {
            closeModal();
        }
        if ($('#reset-button') && $(event.target).closest('#reset-button').length) {
            localStorage.setItem('color-primary-rgb-values', '133, 255, 225');
            $('html').css('--color-primary-rgb-values', '133, 255, 225');
            closeModal();
        }
    });

    // Update the CSS variable and local storage when the color changes
    colorPicker.on('color:change', function (color) {
        const rgb = color.rgb;
        const rgbValues = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
        $('html').css('--color-primary-rgb-values', rgbValues);
        localStorage.setItem('color-primary-rgb-values', rgbValues);
    });
}