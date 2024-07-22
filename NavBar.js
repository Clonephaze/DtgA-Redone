$(document).ready(function() {
    $('#wiki-list-dropdown').on('click', function() {
        var dropdownExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !dropdownExpanded);
        var dropdown = $('.nav-dropdown');

        if (!dropdownExpanded) {
            dropdown.animateAutoHeight(250, 'linear', function() {
                $(this).css('height', 'auto');
            });
        } else {
            dropdown.animate({ height: "0" }, 200);
        }
    });

    $('.nav-toggle').on('click', function() {
        var ariaExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !ariaExpanded);
        $('nav').toggleClass('mobile-nav-open', !ariaExpanded);

        if (!ariaExpanded) {
            $('.nav-list').animateAutoHeight(200, 'swing', function() {
                $(this).css('height', 'auto');
            });
        } else {
            $('.nav-list').animate({ height: "0" }, 200);
        }
    });

    var navbarHeight = $('nav').height();
    var navbarOffset = navbarHeight + 10;

    console.log(navbarOffset, navbarHeight);

    $('.content-section').css('padding-top', navbarOffset);
});

jQuery.fn.animateAutoHeight = function(duration, easing, callback) {
    var elem = $(this),
        originalHeight = elem.height(),
        autoHeight = elem.css('height', 'auto').height();

    elem.height(originalHeight).animate({ height: autoHeight }, duration, easing, callback);
};
