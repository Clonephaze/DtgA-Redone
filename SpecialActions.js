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
    $(document).on('click', '.accordion-button', function () {
        var content = $(this).next('.accordion-content');

        if (content.hasClass('show')) {
            content.removeClass('show').stop().animate({ height: 0 }, 300);
        } else {
            $('.accordion-content.show').not(content).removeClass('show').stop().animate({ height: 0 }, 300, function () {
                $(this).css('height', ''); // Reset height after animation
            });

            content.addClass('show').stop().animateAutoHeight(300, 'swing', function () {
                $(this).css('height', 'auto');
            });
        }
    });
}

/**
 * Fetches the generationData.json file and generates cards for each item in each subcategory for each main category.
 * The generated cards for each item will be placed in their respective subcategory container.
 * Also adds event listeners for the location reveal and weapon description reveal buttons.
 * 
 * @param {string} mainCategory - The main category to search within (e.g., 'Items', 'Enemies').
 * @param {object} subcategoryContainers - An object mapping subcategories to their container IDs.
 */
function generatePageContent(mainCategory, subcategoryContainers) {
    // Fetch the JSON file
    $.getJSON('generationData.json', function (data) {
        // Loops through the data array to find the matching main category
        data.forEach(function (element) {
            if (element[mainCategory]) {
                let mainCategoryData = element[mainCategory][0];
                // Loops through each subcategory in the main category
                for (let subcategory in mainCategoryData) {
                    if (mainCategoryData.hasOwnProperty(subcategory)) {
                        let subcategoryData = mainCategoryData[subcategory];
                        generateCard(subcategoryData, subcategory, subcategoryContainers);
                    }
                }
            } else {
                console.error(`Main category '${mainCategory}' not found.`);
            }
        });

        // Add event listeners for the location reveal and weapon description reaveal buttons
        addCardEventListeners();

    }).fail(function () {
        console.error('Failed to fetch JSON data.');
    });
}

/**
 * Generates a card for each item in a given subcategory.
 * 
 * @param {array} subcategoryData - Array of items in the subcategory.
 * @param {string} subcategory - The name of the subcategory.
 * @param {object} subcategoryContainers - An object mapping subcategories to their container IDs.
 */
function generateCard(subcategoryData, subcategory, subcategoryContainers) {
    let weaponNumber = 0; 
    subcategoryData.forEach(function (item) {
        let cardContent;
        // Checks if the item has multiple descriptions, activates the appropriate function
        if (Array.isArray(item.description) && Array.isArray(item.imageSrc)) {
            cardContent = generateWeaponCard(item, weaponNumber);
        } else {
            cardContent = generateNormalCard(item);
        }

        // Append the generated cards to their respective subcategory container
        if (subcategoryContainers[subcategory]) {
            $(`#${subcategoryContainers[subcategory]}`).append(cardContent);
        } else {
            console.error(`Container for subcategory '${subcategory}' not found.`);
        }
        weaponNumber++;
    });
}

/**
 * Generates weapon cards. Each weapon has multiple descriptions and images, so this function generates an image carousel for each weapon with multiple attached descriptions that scroll the carousel as they are revealed.
 * 
 * @param {object} item - The item object containing descriptions and images.
 * @param {number} weaponNumber - The index of the item in the list.
 * @returns {string} - The generated HTML string.
 */
function generateWeaponCard(item, weaponNumber) {
    let descriptionContent = '';
    let imageContent = '';
    let imageDescNumber = 0;

    item.description.forEach(function (desc) {
        descriptionContent += `
            <button class="desc-title" data-weapon-number="${weaponNumber}" data-upgrade-number="${imageDescNumber}" aria-expanded="false">
                <h4>${desc.title}</h4>
                <i class='bx bx-down-arrow'></i>
            </button>
            <div class="weapon-desc">
                <p class="desc-content">${desc.content}</p>
            </div>
        `;
        imageDescNumber++;
    });

    imageDescNumber = 0;
    item.imageSrc.forEach(function (src) {
        imageContent += `<div class="carousel-item" data-weapon-number="${weaponNumber}" data-upgrade-number="${imageDescNumber++}"><img src="${src}" alt=""></div>`;
    });

    return `
        <div class="card-box on-hover-box">
            <div class="image-container">
                <div class="image-carousel">
                    ${imageContent}
                </div>
            </div>
            <div class="card-desc-container">
                <h3 class="card-title">${item.title}</h3>
                <p class="gen-desc">${item.genDesc}</p>
                ${descriptionContent}
                <button class="location-button" aria-expanded="false">Click To Reveal Location<i class='bx bxs-chevron-down'></i></button>
                <div class="location-holder">
                    <p class="location-text">${item.location}</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generates normal cards. Each card has a single description and image.
 * 
 * @param {object} item - The item object containing a single description and image.
 * @returns {string} - The generated HTML string.
 */
function generateNormalCard(item) {
    return `
        <div class="card-box on-hover-box">
            <div class="image-container">
                <img src="${item.imageSrc[0]}" alt="">
            </div>
            <div class="card-desc-container">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-desc">${item.description}</p>
                <button class="location-button" aria-expanded="false">Click To Reveal Location<i class='bx bxs-chevron-down'></i></button>
                <div class="location-holder">
                    <p class="location-text">${item.location}</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Adds event listeners for description toggles and location buttons.
 */
function addCardEventListeners() {
    // Event listener for description toggles
    $(document).off('click', '.desc-title');
    $(document).on('click', '.desc-title', function () {
        let $card = $(this).closest('.card-box');
        let $button = $(this);
        let $descContent = $(this).next('.weapon-desc');
        let isExpanded = $button.attr('aria-expanded') === 'true';

        // Collapse other descriptions in the same card and toggle their aria-expanded attribute
        $card.find('.desc-title').not($button).attr('aria-expanded', 'false');
        $card.find('.weapon-desc').not($descContent).animate({ height: 0 }, 400);

        // Slide down the selected description and toggle its aria-expanded attribute
        $button.attr('aria-expanded', !isExpanded);

        if (!isExpanded) {
            $descContent.animateAutoHeight(400, 'swing', function () {
                $(this).css('height', 'auto');
            });
        } else {
            $descContent.animate({ height: 0 }, 400);
        }

        let weaponNumber = $(this).data('weapon-number');
        let upgradeNumber = $(this).data('upgrade-number');
        let $carousel = $(this).closest('.card-box').find('.image-carousel');
        let $targetItem = $carousel.find(`.carousel-item[data-weapon-number="${weaponNumber}"][data-upgrade-number="${upgradeNumber}"]`);
        $carousel.animate({
            scrollLeft: $carousel.scrollLeft() + $targetItem.position().left
        }, 400);
    });

    // Event listener for location buttons
    $(document).off('click', '.location-button');
    $(document).on('click', '.location-button', function () {
        let $button = $(this);
        let $locationText = $button.next('.location-holder');
        let isExpanded = $button.attr('aria-expanded') === 'true';

        // Toggle aria-expanded state
        $button.attr('aria-expanded', !isExpanded);

        // Animate the location text
        if (!isExpanded) {
            $locationText.animateAutoHeight(400, 'swing', function () {
                $(this).css('height', 'auto');
            });
        } else {
            $locationText.animate({ height: 0 }, 400);
        }
    });
}


/**
 * Initialize the color picker and set up the modal functionality.
 * This function sets up a color picker widget using the iro.js library,
 * initializes the color picker with a saved color from local storage (if available),
 * and handles the opening and closing of the color picker modal.
 */
function initializeColorPicker() {
    // Clear any existing color picker content
    $('#picker').empty();

    // Retrieve saved color values from local storage
    var savedColorItems = localStorage.getItem('color-primary-rgb-values');
    var savedColor = "rgb(" + savedColorItems + ")";

    // Initialize the color picker with the saved color or a default color
    if (savedColorItems) {
        var colorPicker = new iro.ColorPicker("#picker", {
            width: 300,
            color: savedColor,
            wheelLightness: true,
            borderWidth: 2,
            borderColor: "rgb(255, 255, 255)",
        });
    } else {
        var colorPicker = new iro.ColorPicker("#picker", {
            width: 300,
            color: "rgb(133, 255, 225)",
            wheelLightness: true,
            borderWidth: 2,
            borderColor: "rgb(255, 255, 255)",
        });
    }

    // Open the color picker modal when the button is clicked
    $('#color-picker-btn').on('click', function () {
        $('#color-picker-modal').stop().animate({ right: '10px' }, 500);
    });

    // Function to close the color picker modal
    function closeModal() {
        $('#color-picker-modal').stop().animate({ right: '-350px' }, 500);
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
        var rgb = color.rgb;
        var rgbValues = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
        $('html').css('--color-primary-rgb-values', rgbValues);
        localStorage.setItem('color-primary-rgb-values', rgbValues);
    });
}

/**
 * Set up the scroll button functionality to show/hide a button based on scroll position
 * and update a progress circle based on the scroll progress.
 */
function scrollButton() {
    const $button = $('#scroll-btn');
    const $progressCircle = $('#progress-circle');
    const circleRadius = $progressCircle.attr('r');
    const circleCircumference = 2 * Math.PI * circleRadius;

    // Set the progress circle's dash array and initial dash offset
    $progressCircle.css({
        strokeDasharray: circleCircumference,
        strokeDashoffset: circleCircumference
    });

    // Update the button visibility and progress circle on window scroll
    $(window).scroll(function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height();
        const winHeight = $(window).height();
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

        const offset = circleCircumference - (scrollPercent / 100 * circleCircumference);
        $progressCircle.css('stroke-dashoffset', offset);

        if (scrollTop > 250) {
            $button.css({ 'opacity': '1', 'cursor': 'pointer', 'pointer-events': 'auto' });
        } else {
            $button.css({ 'opacity': '0', 'cursor': 'unset', 'pointer-events': 'none' });
        }
    });

    // Scroll to the top of the page when the button is clicked
    $button.click(function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Generate the Table of Contents (TOC) based on elements with the class 'toc-place'
 * and set up the TOC buttons to scroll smoothly to the respective sections.
 */
function generateTOC() {
    var toc = $('.toc');

    // Check if the TOC container exists
    if (toc.length) {
        toc.empty();

        // Iterate over each element with the class 'toc-place'
        $('.toc-place').each(function (index, element) {
            var id = 'toc-place-' + index;
            $(element).attr('id', id);
            toc.append('<button class="toc-button" data-target="#' + id + '">' + $(element).data('name') + '</button>');
        });

        // Set up click event for TOC buttons to scroll to the target section
        $('.toc-button').on('click', function () {
            var target = $($(this).data('target'));
            var navbarHeight = $('nav').height();
            var navbarOffset = navbarHeight + 10;
            var targetPosition = target.offset().top - navbarOffset;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    }
}

/**
 * Initializes or refreshes the tsParticles animation on a webpage.
 * 
 * @param {Object} customConfig - An optional object to override default configuration settings.
 */
async function manageTsParticles(customConfig = {}) {
    try {
        // Load the full tsParticles library
        await loadFull(tsParticles);

        // Retrieve custom color from local storage or use default
        let rgbValues = localStorage.getItem('color-primary-rgb-values') || '133, 255, 225';
        let particleColor = `rgb(${rgbValues})`;

        // Define default configuration for tsParticles
        const defaultConfig = {
            fpsLimit: 120,
            particles: {
                color: { value: particleColor },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce" },
                    random: true,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: { enable: true },
                    value: 150,
                },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: {
                    value: { min: 1, max: 4 },
                    animation: { enable: true, speed: 3 },
                },
            },
            detectRetina: true,
        };

        // Merge customConfig with defaultConfig, giving precedence to customConfig
        const config = { ...defaultConfig, ...customConfig };

        // Initialize or refresh tsParticles with the merged configuration
        $("#tsparticles")
            .particles()
            .init(config, function (container) {
                // Callback function after initialization or reinitialization (currently empty)
            });
    } catch (error) {
        console.error("Failed to manage tsParticles:", error);
    }
}

/**
 * Handles the behavior of the navigation bar, including dropdown menus and mobile navigation toggles.
 * Adjusts the layout based on user interactions and viewport size.
 *
 * @function navbarHandler
 */
function navbarHandler() {
    // Handle click event on the wiki list dropdown
    $('#wiki-list-dropdown').on('click', function () {
        var dropdownExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !dropdownExpanded); // Toggle aria-expanded attribute
        var dropdown = $('.nav-dropdown');

        if (!dropdownExpanded) {
            // Expand dropdown and animate height to auto
            dropdown.animateAutoHeight(250, 'linear', function () {
                $(this).css('height', 'auto');
            });
        } else {
            // Collapse dropdown to height 0
            dropdown.animate({ height: "0" }, 200);
        }
    });

    // Handle click event on the navigation toggle for mobile view
    $('.nav-toggle').on('click', function () {
        var ariaExpanded = $(this).attr('aria-expanded') === 'true';
        var expanding = false;
        $(this).attr('aria-expanded', !ariaExpanded); // Toggle aria-expanded attribute
        $('nav').toggleClass('mobile-nav-open', !ariaExpanded); // Toggle mobile-nav-open class

        if (!ariaExpanded && !expanding) {
            expanding = true;
            // Expand navigation list and animate height to auto
            $('.nav-list').animateAutoHeight(200, 'swing', function () {
                $(this).css('height', 'auto');
            });
        } else {
            expanding = false;
            // Collapse navigation list to height 0
            $('.nav-list').animate({ height: "0" }, 200);
        }
    });

    // Adjust padding-top of the content section based on navbar height
    var navbarHeight = $('nav').height();
    var navbarOffset = navbarHeight + 25;
    $('.content-section').css('padding-top', navbarOffset);
}


/**
 * jQuery plugin to animate an element's height to its auto height.
 * 
 * @param {number} duration - Duration of the animation in milliseconds.
 * @param {string} easing - Easing function for the animation.
 * @param {Function} [callback] - Optional callback function to execute after the animation completes.
 */
jQuery.fn.animateAutoHeight = function (duration, easing, callback) {
    var elem = $(this),
        originalHeight = elem.height(),
        autoHeight = elem.css('height', 'auto').height();

    elem.height(originalHeight).stop().animate({ height: autoHeight }, duration, easing, function () {
        if (typeof callback === 'function') callback.call(this);
    });
};
