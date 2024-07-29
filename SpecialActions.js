// setupFAQPage.js

/**
 * Sets up the FAQ page by opening the first accordion item.
 */
function setupFAQPage() {
    // Ensure this only runs once
    if (setupFAQPage.isInitialized) return;
    setupFAQPage.isInitialized = true;

    // Open the first accordion item by default
    $('.accordion-content').first().addClass('show').css('height', 'auto');
}

/**
 * Handles click events for accordion buttons.
 */
function handleAccordionClicks() {
    // Unbind previous click handlers to prevent multiple bindings
    $(document).off('click', '.accordion-button');

    // Bind the click handler
    $(document).on('click', '.accordion-button', function() {
        var content = $(this).next('.accordion-content');

        if (content.hasClass('show')) {
            content.removeClass('show').animate({ height: 0 }, 300);
        } else {
            $('.accordion-content.show').not(content).removeClass('show').animate({ height: 0 }, 300, function() {
                $(this).css('height', ''); // Reset height after animation
            });

            content.addClass('show').animateAutoHeight(300, 'swing', function() {
                $(this).css('height', 'auto');
            });
        }
    });
}

/**
 * Function to fetch JSON data and generate HTML structure for a specified category.
 * The generated HTML for each item will be placed in its respective subcategory container.
 * 
 * @param {string} mainCategory - The main category to search within (e.g., 'Items', 'Enemies').
 * @param {object} subcategoryContainers - An object mapping subcategories to their container IDs.
 */
function generatePageContent(mainCategory, subcategoryContainers) {
    // Fetch the JSON file
    $.getJSON('generationData.json', function(data) {
        // Loop through the data array to find the matching main category
        data.forEach(function(element) {
            if (element[mainCategory]) {
                let mainCategoryData = element[mainCategory][0]; // Assuming the first element in the array is the relevant data

                // Loop through each subcategory in the main category
                for (let subcategory in mainCategoryData) {
                    if (mainCategoryData.hasOwnProperty(subcategory)) {
                        let subcategoryData = mainCategoryData[subcategory];

                        // Loop through each item in the subcategory
                        subcategoryData.forEach(function(item) {

                            let cardContent = `
                                <div class="card-box on-hover-box">
                                    <div class="image-container">
                                        <img src="${item.imageSrc[0]}" loading="lazy" alt="">
                                    </div>
                                    <div class="card-desc-container">
                                        <h3 class="card-title">${item.title}</h3>
                                        <p class="card-desc">${item.description}</p>
                                        <div class="location-holder">
                                            <button class="location-button">Click To Reveal Location</button>
                                            <p class="location-text">${item.location}</p>
                                        </div>
                                    </div>
                                </div>
                                `;

                            // Append the generated HTML to the respective subcategory container
                            if (subcategoryContainers[subcategory]) {
                                $(`#${subcategoryContainers[subcategory]}`).append(cardContent);
                            } else {
                                console.error(`Container for subcategory '${subcategory}' not found.`);
                            }
                        });
                    }
                }
            } else {
                console.error(`Main category '${mainCategory}' not found.`);
            }
        });
    }).fail(function() {
        console.error('Failed to fetch JSON data.');
    });
}

function initializeColorPicker() {
    $('#picker').empty();
    var savedColorItems = localStorage.getItem('color-primary-rgb-values');
    var savedColor = "rgb(" + savedColorItems + ")";

    if (savedColorItems) {
        var colorPicker = new iro.ColorPicker("#picker", {
            width: 300,
            color: savedColor,
            wheelLightness: true,
            borderWidth: 2,
            borderColor: "rgb(355, 355, 355)",
        });
    } else {
        var colorPicker = new iro.ColorPicker("#picker", {
            width: 300,
            color: "rgb(133, 255, 225)",
            wheelLightness: true,
            borderWidth: 2,
            borderColor: "rgb(355, 355, 355)",
        });
    }
    // Open the modal
    $('#color-picker-btn').on('click', function() {
        $('#color-picker-modal').stop().animate({ right: '10px' }, 500);
    });

    // Close the modal
    function closeModal() {
        $('#color-picker-modal').stop().animate({ right: '-350px' }, 500);
    }



    $(document).on('click', function(event) {
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
    colorPicker.on('color:change', function(color) {
        var rgb = color.rgb;
        var rgbValues = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
        $('html').css('--color-primary-rgb-values', rgbValues);
        localStorage.setItem('color-primary-rgb-values', rgbValues);
    });
}

/**
 * jQuery plugin to animate an element's height to its auto height.
 * 
 * @param {number} duration - Duration of the animation in milliseconds.
 * @param {string} easing - Easing function for the animation.
 * @param {Function} [callback] - Optional callback function to execute after the animation completes.
 */
jQuery.fn.animateAutoHeight = function(duration, easing, callback) {
    var elem = $(this),
        originalHeight = elem.height(),
        autoHeight = elem.css('height', 'auto').height();

    elem.height(originalHeight).animate({ height: autoHeight }, duration, easing, function() {
        if (typeof callback === 'function') callback.call(this);
    });
};
