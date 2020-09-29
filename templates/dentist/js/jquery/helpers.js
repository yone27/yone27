'use strict';
//+------------------------------------------------------------------+
//| Responsive                                                       |
//+------------------------------------------------------------------+
function isXs() {
    if (window.matchMedia('(max-width : 767px)').matches) return true
}

function isSm() {
    if (window.matchMedia('(min-width : 768px) and (max-width : 991px)').matches) return true
}

function isMd() {
    if (window.matchMedia('(min-width : 992px) and (max-width : 1199px)').matches) return true
}

function isLg() {
    if (window.matchMedia('(min-width : 1200px)').matches) return true
}

//+------------------------------------------------------------------+
//| Responsive                                                       |
//+------------------------------------------------------------------+
let wrapper = $('body > .wrapper'),
    header = $('header'),
    footer = $('body > footer');
if (wrapper.length) {
    let mainWrapper = () => {
        let footerHeight = 0,
            wrapperHeight = $(wrapper).height(),
            windowHeight = $(window).height();

        if (footer.length) {
            footerHeight = footer.height();
        }

        windowHeight = windowHeight - footerHeight;

        if (wrapperHeight <= windowHeight) {
            wrapper.css('min-height', (windowHeight));
        } else {
            wrapper.removeAttr("style");
        }
    };
    $(window).ready(mainWrapper());
    $(window).resize( () => {
        mainWrapper()
    });
}
//+------------------------------------------------------------------+
//| Hover function				                                     |
//+------------------------------------------------------------------+
let eHover = $('.hover');
if (eHover.length) {
    if ('ontouchstart' in window) {
        eHover.click(function (e) {
            e.stopPropagation();
            eHover.not($(this)).removeClass('hovered');
            $(this).toggleClass('hovered');
        });
    } else {
        eHover.hover(
            function () {
                $(this).addClass('hovered');
            },
            function () {
                $(this).removeClass('hovered');
            }
        );
    }
}
//+------------------------------------------------------------------+
//| Active tooltip                                                   |
//+------------------------------------------------------------------+
let tooltip = $('[data-toggle=\'tooltip\']');
if (tooltip.length) {
    $(tooltip).tooltip();
}
//+------------------------------------------------------------------+
//| Popover de bootstrap if exist                                    |
//+------------------------------------------------------------------+
let popover = $('[data-toggle=\'popover\']');
if (popover.length) {
    $(popover).popover();
}

//+------------------------------------------------------------------+
//| Same height                                                      |
//+------------------------------------------------------------------+
$.fn.SameHeight = function (sizes = ['sm', 'md', 'lg']) {

    let diffBoxAndContent = 0;

    this.run = function () {
        // Boxes
        let bhs = this.map(function () {
            return $(this).height();
        }).get();
        let mbh = Math.max.apply(null, bhs);
        // Contents
        let chs = this.children().map(function () {
            return $(this).height();
        }).get();
        let mch = Math.max.apply(null, chs);
        diffBoxAndContent = mbh - mch;
        this.height(mbh);
    };

    this.destroy = function () {
        this.height('auto')
    };

    this.responsive = function () {
        let update = false;
        this.destroy();
        for (let i = 0; i < sizes.length; i++) {
            if (sizes[i] === 'xs' && isXs()) {
                update = true;
                break;
            } else if (sizes[i] === 'sm' && isSm()) {
                update = true;
                break;
            } else if (sizes[i] === 'md' && isMd()) {
                update = true;
                break;
            } else if (sizes[i] === 'lg' && isLg()) {
                update = true;
                break;
            }
        }

        if (update) {
            this.run();
        } else {
            this.destroy();
        }
    }

    this.responsive();

    $(window).resize(() => {
        this.responsive()
    });
};
