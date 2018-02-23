jQuery(document).ready(function($) {

    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 400 });

    /* ======= Fixed header when scrolled ======= */

    $(window).on('scroll', function() {
         $('#header').toggleClass('navbar-fixed-top', $(window).scrollTop() > 50);
    });

});
