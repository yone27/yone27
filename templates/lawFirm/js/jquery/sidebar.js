'use strict';
//+------------------------------------------------------------------+
//| Affix sidebar                                                    |
//+------------------------------------------------------------------+
let sidebar = $('.sidebar-affix');
if ((sidebar).length) {
    let fixAffixWidth = function () {
        $(sidebar).each(function () {
            $(this).width($(this).parent().width());
        });
        sidebar.affix(
            {
                offset: {
                    top: 0,
                    bottom: function () {
                        return (this.bottom = $('footer').outerHeight(true) + 50);
                    }
                }
            }
        );
    };
    fixAffixWidth();
    $(window).resize(fixAffixWidth());
}