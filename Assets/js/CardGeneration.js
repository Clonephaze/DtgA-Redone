// CardGeneration.js
import { animationDuration } from "./Utilities.js";

/**
 * Fetches the generationData.json file and generates cards for each item in each subcategory for each main category.
 * The generated cards for each item will be placed in their respective subcategory container.
 * Also adds event listeners for the location reveal and weapon description reveal buttons.
 * 
 * @param {string} mainCategory - The main category to search within (e.g., 'Items', 'Enemies').
 * @param {object} subcategoryContainers - An object mapping subcategories to their container IDs.
 */


export function generatePageContent(mainCategory, subcategoryContainers) {
    // Fetch the JSON file
    $.getJSON('./Assets/js/generationData.json', function (data) {
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
        $card.find('.weapon-desc').not($descContent).animate({ height: 0 }, animationDuration);

        // Slide down the selected description and toggle its aria-expanded attribute
        $button.attr('aria-expanded', !isExpanded);

        if (!isExpanded) {
            $descContent.animateAutoHeight(animationDuration, 'swing', 5, function () {
                $(this).css('height', 'auto');
            });
        } else {
            $descContent.animate({ height: 0 }, animationDuration);
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
            $locationText.animateAutoHeight(animationDuration, 'swing', function () {
                $(this).css('height', 'auto');
            });
        } else {
            $locationText.animate({ height: 0 }, animationDuration);
        }
    });
}

