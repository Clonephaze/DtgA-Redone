/**
 * StaticPageGenerator.js
 * 
 * This script generates static HTML pages by reading existing HTML files and augmenting them 
 * with dynamically generated content based on a JSON data file. The generated content includes 
 * cards for various categories (e.g., Items, Enemies, NPCs), which are inserted into predefined 
 * containers within the HTML files. The processed HTML is then saved into a new file with a `.gen.html` 
 * extension in the specified output directory. Intended to provide static pages for end users without 
 * making me do a shit load of html creation. Theres like 140+ cards to create and this makes it easier
 * to add/modify/maintain them, and its much more efficient for the end user *woop*.
 * 
 * Dependencies:
 * - fs (File System): To read and write files.
 * - path: To handle file and directory paths.
 * - jsdom: To parse and manipulate the HTML documents in a Node.js environment.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const inputDir = '../../OtherPages/';  // Directory where the original HTML files are located.
const outputDir = inputDir;  // Directory where the generated HTML files will be saved.

/**
 * Main function to generate static pages.
 * 
 * Iterates over a list of pages, reads each one, generates additional content based on the page type, 
 * and writes the modified content to a new file in the output directory.
 */
function generateStaticPages() {
    const pagesToGenerate = ['Items.html', 'Enemies.html', 'NPCs.html', 'Locations.html', 'StatsPage.html'];

    pagesToGenerate.forEach(page => {
        const filePath = path.join(inputDir, page);

        fs.readFile(filePath, 'utf8', async (err, data) => {
            if (err) return console.log(err);

            // Parse the HTML content into a DOM structure
            const dom = new JSDOM(data);
            const document = dom.window.document;

            // Generate content based on the type of page
            switch (page) {
                case 'Items.html':
                    await generatePageContent(document, 'Items', {
                        'Armors': 'armorsContainer',
                        'Consumables': 'consumablesContainer',
                        'Gadgets': 'gadgetsContainer',
                        'KeyItems': 'keyitemsContainer',
                        'Souls': 'soulsContainer',
                        'Weapons': 'weaponsContainer'
                    });
                    break;
                case 'Enemies.html':
                    await generatePageContent(document, 'Enemies', {
                        'commonEnemies': 'commonEnemiesContainer',
                        'Bosses': 'bossesContainer'
                    });
                    break;
                case 'NPCs.html':
                    await generatePageContent(document, 'NPCs', {
                        'companions': 'companionsContainer',
                        'vendors': 'vendorsContainer',
                        'lostSouls': 'lostSoulsContainer'
                    });
                    break;
                case 'Locations.html':
                    await generatePageContent(document, 'gadgetLocations', {
                        'locations': 'locationsContainer'
                    });
                    break;
                case 'StatsPage.html':
                    await generatePageContent(document, 'StatsPage', {
                        'Stats': 'stat-card-container'
                    });
                    break;
                default:
                    return console.log('Page not found');
            }

            // Strip unwanted tags like <html>, <head>, and <body>
            let outputContent = document.body.innerHTML;

            // Write the processed content to a new file
            fs.writeFileSync(path.join(outputDir, page.split('.')[0] + '.gen.html'), outputContent, err => {
                if (err) {
                    console.log(err);
                }
            });
            console.log(`Successfully generated ${page.split('.')[0] + '.gen.html'}`);
        });
    });
}

let generatedCardCount;
/**
 * Generates the page content by inserting dynamically created cards into the appropriate containers.
 * 
 * @param {Document} document - The DOM document object representing the HTML file.
 * @param {string} mainCategory - The main category to filter the data (e.g., 'Items', 'Enemies').
 * @param {Object} subcategoryContainers - An object mapping subcategories to their container IDs in the HTML.
 * @returns {Promise} - A promise that resolves when the content generation is complete.
 */
async function generatePageContent(document, mainCategory, subcategoryContainers) {
    return new Promise((resolve, reject) => {
        // Read the JSON data file containing the content to be added
        fs.readFile('./generationData.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return reject(err);
            }

            try {
                const jsonData = JSON.parse(data);
                jsonData.forEach(element => {
                    if (element[mainCategory]) {
                        let mainCategoryData = element[mainCategory][0];
                        for (let subcategory in mainCategoryData) {
                            if (mainCategoryData.hasOwnProperty(subcategory)) {
                                let subcategoryData = mainCategoryData[subcategory];
                                generateCard(document, subcategoryData, subcategory, subcategoryContainers);
                            }
                        }
                    } else {
                        console.error(`Main category '${mainCategory}' not found.`);
                    }
                });
                resolve();
                generatedCardCount = 0;  // Reset card count after processing each page
            } catch (parseError) {
                console.error(parseError.message);
                reject(parseError);
            }
        });
    });
}

/**
 * Generates a card for each item in a given subcategory and inserts it into the appropriate container.
 * 
 * @param {Document} document - The DOM document object representing the HTML file.
 * @param {Array} subcategoryData - Array of items in the subcategory.
 * @param {string} subcategory - The name of the subcategory (e.g., 'Armors', 'Weapons').
 * @param {Object} subcategoryContainers - An object mapping subcategories to their container IDs in the HTML.
 */
function generateCard(document, subcategoryData, subcategory, subcategoryContainers) {
    let weaponNumber = 0;
    subcategoryData.forEach(item => {
        let cardContent;

        // Generate a unique ID for each card element
        const itemNameShort = item.title.split(' ').join('').replace("'", "").replace("-", "");
        const itemElemId = itemNameShort;

        // Check if the item is a weapon (multiple descriptions and images)
        if (Array.isArray(item.description) && Array.isArray(item.imageSrc)) {
            cardContent = generateWeaponCard(item, weaponNumber, itemElemId);
        } else {
            cardContent = generateNormalCard(item, itemElemId);
        }

        // Insert the generated card content into the corresponding container in the document
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
 * Generates a weapon card with multiple descriptions and an image carousel.
 * 
 * @param {Object} item - The item object containing descriptions and images.
 * @param {number} weaponNumber - The index of the item in the list.
 * @param {string} itemElemId - The ID of the card element.
 * @returns {string} - The generated HTML string representing the weapon card.
 */
function generateWeaponCard(item, weaponNumber, itemElemId) {
    let descriptionContent = '';
    let imageContent = '';
    let imageDescNumber = 0;

    // Generate the description section for each weapon upgrade
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

    // Generate the image carousel for the weapon
    imageDescNumber = 0;
    item.imageSrc.forEach(src => {
        imageContent += `<div class="carousel-item" data-weapon-number="${weaponNumber}" data-upgrade-number="${imageDescNumber++}"><img src="${src}" alt="" height="250" width="250"></div>`;
    });

    return `
        <div class="card-box on-hover-box" id="${itemElemId}">
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
 * Generates a normal card with a single description and image.
 * 
 * @param {Object} item - The item object containing a single description and image.
 * @param {string} itemElemId - The ID of the card element.
 * @returns {string} - The generated HTML string representing the normal card.
 */
function generateNormalCard(item, itemElemId) {
    let imageType;

    // Generate the image section for the card
    if (item.imageSrc.length > 0) {
        const lazyLoad = generatedCardCount >= 6 ? ' loading="lazy"' : ''; // Lazy load images after the first 6 to avoid FOUC
        imageType = `<div class="image-container">
        <img src="${item.imageSrc[0]}" alt="" height="250" ${lazyLoad}>
        </div>`;
        generatedCardCount++;
    }

    return `
        <div class="card-box on-hover-box" id="${itemElemId}">
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

// Initiate the static page generation process
generateStaticPages();
