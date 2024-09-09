/**
 * Generate the Table of Contents (TOC) based on elements with the class 'toc-place'
 * and set up the TOC buttons to scroll smoothly to the respective sections.
 */
export function generateTOC() {
    const toc = document.querySelector('.toc');
    
    // Check if the TOC container exists
    if (toc) {
        toc.innerHTML = '';

        // Iterate over each element with the class 'toc-place'
        document.querySelectorAll('.toc-place').forEach((element) => {
            const id = element.getAttribute('data-name'), idSmall = id.split(' ').join('');
            element.setAttribute('id', idSmall);
            const button = document.createElement('button');
            button.className = 'toc-button';
            button.dataset.target = `#${idSmall}`;
            button.textContent = element.dataset.name;
            toc.appendChild(button);
        });

        // Set up click event for TOC buttons to scroll to the target section
        document.querySelectorAll('.toc-button').forEach(button => {
            button.addEventListener('click', function () {
                const target = document.querySelector(this.dataset.target);
                const navbarHeight = document.querySelector('nav').offsetHeight;
                const navbarOffset = navbarHeight + 10;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarOffset;

                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            });
        });
    } else {
        return;
    }
}
