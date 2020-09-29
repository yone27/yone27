'use strict';
let menuBtn = $('[data-target="#menu"]'),
    menu = '#menu',
    dropdownSubmenu = $('.dropdown-submenu');

//Desplegando el menú y submenú de los headers
dropdownSubmenu.click(function (e) {
    // stop bootstrap.js to hide the parents
    e.stopPropagation();
    // add 'open' class to all parents with class 'dropdown-submenu'
    $(this).parents('li').addClass('open');
    // this is also open (or was)
    $(this).toggleClass('open');
});

if ($(menu).length) {
    const menuScroll = new PerfectScrollbar(menu, {suppressScrollX: true});
    menuBtn.click(function () {
        if ($(this).hasClass('collapsed')) {
            $('body').css('overflow', 'hidden')
            menuScroll.update();
        } else {
            $('body').css('overflow', '')
        }
    });
}