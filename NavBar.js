const navDropdown = document.getElementById('nav-dropdown');

navDropdown.addEventListener('click', () => {
    navDropdown.getAttribute('aria-expanded') === 'true' ? navDropdown.setAttribute('aria-expanded', 'false') : navDropdown.setAttribute('aria-expanded', 'true');
});