/**
 * Generate the Table of Contents (TOC) based on elements with the class 'toc-place'
 * and set up the TOC buttons to scroll smoothly to the respective sections.
 */
export function generateTOC() {
    let toc = $('.toc');
    // Check if the TOC container exists
    if (toc.length) {
        toc.empty();

        // Iterate over each element with the class 'toc-place'
        $('.toc-place').each(function (index, element) {
            let id = 'toc-place-' + index;
            $(element).attr('id', id);
            toc.append('<button class="toc-button" data-target="#' + id + '">' + $(element).data('name') + '</button>');
        });

        // Set up click event for TOC buttons to scroll to the target section
        $('.toc-button').on('click', function () {
            let target = $($(this).data('target'));
            let navbarHeight = $('nav').height();
            let navbarOffset = navbarHeight + 10;
            let targetPosition = target.offset().top - navbarOffset;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    } else {
        return;
    }
}