/**
 * Set up the scroll button functionality to show/hide a button based on scroll position
 * and update a progress circle based on the scroll progress.
 */
export function scrollButton() {
    const button = document.getElementById('scroll-btn');
    const progressCircle = document.getElementById('progress-circle');
    const circleRadius = progressCircle.getAttribute('r');
    const circleCircumference = 2 * Math.PI * circleRadius;

    // Set the progress circle's dash array and initial dash offset
    progressCircle.style.strokeDasharray = circleCircumference;
    progressCircle.style.strokeDashoffset = circleCircumference;

    // Update the button visibility and progress circle on window scroll
    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

        const offset = circleCircumference - (scrollPercent / 100 * circleCircumference);
        progressCircle.style.strokeDashoffset = offset;

        if (scrollTop > 250) {
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
            button.style.pointerEvents = 'auto';
        } else {
            button.style.opacity = '0';
            button.style.cursor = 'unset';
            button.style.pointerEvents = 'none';
        }
    });

    // Scroll to the top of the page when the button is clicked
    button.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
