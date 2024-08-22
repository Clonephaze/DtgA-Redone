import { setAutoHeight, collapseContent } from "./Utilities.js";

/**
 * Fetches the generationData.json file and generates cards for each item in each subcategory for each main category.
 * The generated cards for each item will be placed in their respective subcategory container.
 * Also adds event listeners for the location reveal and weapon description reveal buttons.
 * 
 * @param {string} mainCategory - The main category to search within (e.g., 'Items', 'Enemies').
 * @param {object} subcategoryContainers - An object mapping subcategories to their container IDs.
 */
let generatedCardCount; // Keep track of the number of generated cards, used for lazy loading logic in the generateCard function
export function generatePageContent(mainCategory, subcategoryContainers) {
    generatedCardCount = 0;
    // Fetch the JSON file
    fetch('./Assets/js/generationData.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch JSON data.');
            return response.json();
        })
        .then(data => {
            data.forEach(element => {
                if (element[mainCategory]) {
                    let mainCategoryData = element[mainCategory][0];
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

            // Add event listeners for the location reveal and weapon description reveal buttons
            addCardEventListeners();
        })
        .catch(error => console.error(error.message));
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
    subcategoryData.forEach(item => {
        let cardContent;
        if (Array.isArray(item.description) && Array.isArray(item.imageSrc)) {
            cardContent = generateWeaponCard(item, weaponNumber);
        } else {
            cardContent = generateNormalCard(item);
        }

        const container = document.getElementById(subcategoryContainers[subcategory]);
        if (container) {
            container.insertAdjacentHTML('beforeend', cardContent);
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
export function generateWeaponCard(item, weaponNumber) {
    let descriptionContent = '';
    let imageContent = '';
    let imageDescNumber = 0;

    item.description.forEach(desc => {
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
    item.imageSrc.forEach(src => {
        imageContent += `<div class="carousel-item" data-weapon-number="${weaponNumber}" data-upgrade-number="${imageDescNumber++}"><img src="${src}" alt="" height="250" width="250"></div>`;
    });

    return `
        <div class="card-box on-hover-box">
            <div class="image-container">
                <div class="image-carousel" tabindex="-1">
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
    let imageType;

    if (item.imageSrc.length > 0) {
        const img = new Image();
        img.src = item.imageSrc[0];
        img.onload = function () {
            const imageElement = document.querySelector(`img[src="${item.imageSrc[0]}"]`);
            if (imageElement) {
                imageElement.setAttribute('width', img.width);
            }
        };
        const lazyLoad = generatedCardCount >= 6 ? ' loading="lazy"' : ''; // Ensures that the first 6 images are not lazy loaded to avoid FOUC
        imageType = `<div class="image-container">
        <img src="${item.imageSrc[0]}" alt="" height="250" ${lazyLoad}>
        </div>`;
        generatedCardCount++;
        console.log(`Generated card count: ${generatedCardCount}, lazy load: ${lazyLoad}`);
    }

    return `
        <div class="card-box on-hover-box">
            ${imageType}
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