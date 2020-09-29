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
//| Slider carousel bootstrap modified                               |
//+------------------------------------------------------------------+

//+------------------------------------------------------------------+
//| Add background image dynamic                                     |
//+------------------------------------------------------------------+
let dinamicBackgroundImage = $('[data-background-url]');
if (dinamicBackgroundImage.length) {
    dinamicBackgroundImage.each(function (i, obj) {
        // data-background-url
        let url = obj.getAttribute('data-background-url');
        obj.style.backgroundImage = 'url(' + url + ')';
        // data-fixed
        if (obj.getAttribute('data-lazy') === 'true') {
            obj.lazy({
                attribute: 'data-background-url',
                removeAttribute: false,
                effect: 'fadeIn',
                effectTime: 2000,
                visibleOnly: true
            });
        }
        // data-fixed
        if (obj.getAttribute('data-fixed') === 'true') {
            obj.style.backgroundAttachment = 'fixed';
        }
        // data-position
        let position = obj.getAttribute('data-position');
        if (position === null || position === 'undefined' || position === '') {
            obj.style.backgroundPosition = 'center';
        } else {
            let positionSplit = obj.getAttribute('data-position').split(' ');
            let pos = [
                'left',
                'right',
                'top',
                'bottom',
                'center'
            ];
            if (position.endsWith('px')) {
                obj.style.backgroundPosition = position;
            } else if (position.endsWith('%')) {
                obj.style.backgroundPosition = position;
            } else if (positionSplit.length) {
                for (let i = 0; i < positionSplit.length; i++) {
                    if (!pos.includes(positionSplit[i])) {
                        obj.style.backgroundPosition = 'center';
                        return;
                    }
                }
                obj.style.backgroundPosition = position;
            }
        }
        // data-repeat
        let repeat = obj.getAttribute('data-repeat');
        let params = [
            'repeat',
            'repeat-x',
            'repeat-y',
            'no-repeat',
            'space',
            'round'
        ];
        if (repeat === null || repeat === 'undefined' || repeat === ' ') {
            obj.style.backgroundRepeat = 'no-repeat';
        } else {
            if (params.includes(repeat)) {
                obj.style.backgroundRepeat = repeat;
            } else if (!params.includes(repeat)) {
                obj.style.backgroundRepeat = 'no-repeat';
            }
        }
        // data-size
        let size = obj.getAttribute('data-size');
        if (size === null || size === 'undefined' || size === '') {
            obj.style.backgroundSize = 'cover';
        } else {
            if (size === 'auto') {
                obj.style.backgroundSize = 'auto';
            } else if (size.endsWith('px')) {
                obj.style.backgroundSize = size;
            } else if (size.endsWith('%')) {
                obj.style.backgroundSize = size;
            } else if (size === 'cover') {
                obj.style.backgroundSize = 'cover';
            } else if (size === 'contain') {
                obj.style.backgroundSize = 'contain';
            }
        }
    });
}
let lazyLoad = $('[class*="lazy-load"]');
/* ------------------------------------------------ */
/* Init Lazy Load
 /*------------------------------------------------- */
if (lazyLoad.length) {
    lazyLoad.lazy({
        attribute: 'data-original',
        removeAttribute: true,
        effect: 'fadeIn',
        effectTime: 2000,
        placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
        afterLoad: function (element) {
            element.addClass('loaded');
        }
    });
}
/* ------------------------------------------------ */
/* Init Lazy Load
 /*------------------------------------------------- */
/* ------------------------------------------------ */

/* Init same-height
 /*------------------------------------------------- */
function sameHeight() {
    let sameheight = $('[class*="same-height"]'),
        fitImage = $('[class*="fit-image"]');
    if (sameheight.length) {
        if (isXs() || isSm()) {
            sameheight.each(function () {
                let height = $(this).height('auto');
                $(this).innerHeight(height);
            });
        } else {
            sameheight.each(function () {
                let height = $(this).siblings().outerHeight(true) - ($(this).outerHeight(true) - $(this).innerHeight());
                $(this).innerHeight(height);
            });
        }

    }
    if (fitImage.length) {
        if (isXs() || isSm()) {
            fitImage.each(function () {
                $(this).addClass('aspect-rectangular');
                $(this).css({
                    'height': 'auto',
                    'width': '100%'
                });
            });
        } else {
            fitImage.each(function () {
                let parentHeight = $(this).parent().siblings().height();
                $(this).removeClass('aspect-rectangular');
                $(this).css({
                    'height': parentHeight + 'px',
                    'width': '100%'
                });
            });
        }

    }
}

$(window).ready(() => {
    sameHeight();
});
$(window).resize(() => {
    sameHeight();
});